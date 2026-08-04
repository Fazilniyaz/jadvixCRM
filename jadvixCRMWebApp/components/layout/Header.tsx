"use client";

import { useEffect, useRef, useState } from "react";
import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Bell,
  MessageSquare,
  Moon,
  Sun,
  ChevronDown,
  LogOut,
  Check,
  Building2,
} from "lucide-react";
import { PORTALS } from "@/lib/portals";

export default function Header({
  onToggle,
  collapsed,
  dark,
  onThemeToggle,
  portal,
  portalName,
  user,
  role,
  onSwitchPortal,
  onLogout,
}: {
  onToggle: () => void;
  collapsed: boolean;
  dark: boolean;
  onThemeToggle: () => void;
  portal: string;
  portalName: string;
  user: string;
  role: string;
  onSwitchPortal: (slug: string) => void;
  onLogout: () => void;
}) {
  const [menu, setMenu] = useState<null | "portal" | "user">(null);
  const wrap = useRef<HTMLDivElement>(null);

  // close either dropdown on an outside click or Escape
  useEffect(() => {
    if (!menu) return;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const initials = user
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  return (
    <header className="sticky top-0 z-20 h-header border-b border-(--header-border-color) bg-header">
      <div className="flex h-full items-center gap-2 px-3 sm:px-4">
        <button
          onClick={onToggle}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-(--header-prime-color) transition-colors hover:bg-hover hover:text-primary"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {/* hamburger on mobile (it opens a drawer), panel icons on desktop
              where the same button squeezes and expands the rail */}
          <Menu size={20} className="lg:hidden" />
          {collapsed ? (
            <PanelLeftOpen size={19} className="hidden lg:block" />
          ) : (
            <PanelLeftClose size={19} className="hidden lg:block" />
          )}
        </button>

        {/* search collapses away on small screens to leave room for the actions */}
        <div className="relative hidden min-w-0 flex-1 sm:block sm:max-w-xs lg:max-w-sm">
          <Search
            size={15}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            type="search"
            placeholder="Search…"
            className="h-9 w-full rounded-sm border border-input-border bg-form-bg pl-9 pr-3 text-[0.875rem] text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
          />
        </div>

        <div ref={wrap} className="ms-auto flex items-center gap-1">
          {/* portal switcher */}
          <div className="relative">
            <button
              onClick={() => setMenu((m) => (m === "portal" ? null : "portal"))}
              aria-expanded={menu === "portal"}
              aria-haspopup="menu"
              className="flex h-9 items-center gap-1.5 rounded-sm border border-line px-2.5 text-[0.75rem] font-medium text-text transition-colors hover:border-primary hover:text-primary"
            >
              <Building2 size={15} />
              <span className="hidden max-w-[8rem] truncate md:inline">{portalName}</span>
              <ChevronDown size={13} />
            </button>

            {menu === "portal" && (
              <div
                role="menu"
                className="absolute right-0 z-30 mt-1.5 w-64 overflow-hidden rounded-card border border-line bg-card shadow-pop"
              >
                <p className="border-b border-line px-3 py-2 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">
                  Switch portal
                </p>
                <ul className="max-h-80 overflow-y-auto py-1">
                  {PORTALS.map((p) => (
                    <li key={p.slug}>
                      <button
                        role="menuitem"
                        onClick={() => {
                          setMenu(null);
                          onSwitchPortal(p.slug);
                        }}
                        className="flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-hover"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-[0.8125rem] font-medium text-heading">
                            {p.name}
                          </span>
                          <span className="block truncate text-[0.6875rem] text-muted">
                            {p.blurb}
                          </span>
                        </span>
                        {p.slug === portal && (
                          <Check size={15} className="shrink-0 text-primary" />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <IconBtn label="Notifications" dot="danger">
            <Bell size={18} />
          </IconBtn>
          <IconBtn label="Messages" dot="success">
            <MessageSquare size={18} />
          </IconBtn>

          <button
            onClick={onThemeToggle}
            className="flex h-9 w-9 items-center justify-center rounded-sm text-(--header-prime-color) transition-colors hover:bg-hover hover:text-primary"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* user menu */}
          <div className="relative">
            <button
              onClick={() => setMenu((m) => (m === "user" ? null : "user"))}
              aria-expanded={menu === "user"}
              aria-haspopup="menu"
              className="flex items-center gap-2 rounded-sm px-1.5 py-1 transition-colors hover:bg-hover"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-avatar bg-primary text-[0.75rem] font-medium text-white">
                {initials}
              </span>
              <span className="hidden text-left leading-tight lg:block">
                <span className="block max-w-[9rem] truncate text-[0.8125rem] font-semibold text-heading">
                  {user}
                </span>
                <span className="block max-w-[9rem] truncate text-[0.6875rem] text-muted">
                  {role}
                </span>
              </span>
              <ChevronDown size={14} className="hidden text-muted lg:block" />
            </button>

            {menu === "user" && (
              <div
                role="menu"
                className="absolute right-0 z-30 mt-1.5 w-56 overflow-hidden rounded-card border border-line bg-card shadow-pop"
              >
                <div className="border-b border-line px-3 py-2.5">
                  <p className="truncate text-[0.8125rem] font-semibold text-heading">{user}</p>
                  <p className="truncate text-[0.6875rem] text-muted">{role}</p>
                </div>
                <button
                  role="menuitem"
                  onClick={onLogout}
                  className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[0.8125rem] transition-colors hover:bg-hover"
                  style={{ color: "rgb(var(--danger-rgb))" }}
                >
                  <LogOut size={15} />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function IconBtn({
  children,
  label,
  dot,
}: {
  children: React.ReactNode;
  label: string;
  dot?: "danger" | "success";
}) {
  return (
    <button
      aria-label={label}
      className="relative hidden h-9 w-9 items-center justify-center rounded-sm text-(--header-prime-color) transition-colors hover:bg-hover hover:text-primary sm:flex"
    >
      {children}
      {dot && (
        <span
          className={`absolute right-2 top-2 h-1.5 w-1.5 rounded-full ${
            dot === "danger" ? "bg-danger" : "bg-primary"
          }`}
        />
      )}
    </button>
  );
}
