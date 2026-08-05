"use client";

import { useEffect, useState, useSyncExternalStore, useTransition } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import type { ModuleSlug } from "@/lib/modules";
import { logout, switchPortal } from "@/lib/actions";
import { RAIL_COOKIE } from "@/lib/ui-prefs";
import { StoreProvider } from "@/lib/store/StoreProvider";
import { BranchBanner } from "./StatusControl";

const DESKTOP = "(min-width: 1024px)";

/** Subscribes to the viewport instead of setting state from an effect. */
function useIsDesktop() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(DESKTOP);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(DESKTOP).matches,
    () => true, // server render assumes desktop, matching the default layout
  );
}

export default function DashboardShell({
  children,
  portal,
  portalName,
  tag,
  modules,
  user,
  role,
  initialCollapsed,
}: {
  children: React.ReactNode;
  portal: string;
  portalName: string;
  tag: string;
  modules: readonly ModuleSlug[];
  user: string;
  role: string;
  initialCollapsed: boolean;
}) {
  const isDesktop = useIsDesktop();

  /*
   * Two independent things, deliberately not merged:
   *   mobileOpen — the overlay drawer on small screens
   *   collapsed  — the desktop rail squeeze
   * The same button drives whichever one applies at the current width.
   */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(initialCollapsed);

  const [dark, setDark] = useState(false);
  const [, startTransition] = useTransition();

  // Valex drives the theme from a root data attribute, not a class
  useEffect(() => {
    document.documentElement.setAttribute("data-theme-mode", dark ? "dark" : "light");
  }, [dark]);

  const toggleRail = () => {
    if (!isDesktop) {
      setMobileOpen((v) => !v);
      return;
    }
    setCollapsed((v) => {
      const next = !v;
      // Persisted client-side so the server can render the right width on the
      // next load — a readable cookie is enough, it's only a UI preference.
      document.cookie = `${RAIL_COOKIE}=${next ? "1" : "0"};path=/;max-age=31536000;samesite=lax`;
      return next;
    });
  };

  // On desktop the sidebar is always on screen; on mobile it slides in.
  const visible = isDesktop || mobileOpen;

  return (
    // Projects, Tasks and Employees read and write through this provider. It
    // sits inside the shell so `user` is available for createdBy / updatedBy,
    // and so the store is shared across every module in the portal.
    <StoreProvider currentUser={user} currentPortal={portal}>
      <div className="min-h-screen">
        <Sidebar
          open={visible}
          onClose={() => setMobileOpen(false)}
          portal={portal}
          portalName={portalName}
          tag={tag}
          modules={modules}
          collapsed={collapsed}
        />

        <div
          className={`transition-[padding] duration-300 ease-out ${
            collapsed ? "lg:pl-rail" : "lg:pl-sidebar"
          }`}
        >
          <Header
            onToggle={toggleRail}
            collapsed={collapsed}
            dark={dark}
            onThemeToggle={() => setDark((v) => !v)}
            portal={portal}
            portalName={portalName}
            user={user}
            role={role}
            onSwitchPortal={(slug) =>
              startTransition(() => {
                const fd = new FormData();
                fd.set("portal", slug);
                void switchPortal(fd);
              })
            }
            onLogout={() => startTransition(() => void logout())}
          />
          <main className="px-2">
            <div className="px-2 py-4">
              <BranchBanner />
              {children}
            </div>
          </main>
        </div>
      </div>
    </StoreProvider>
  );
}
