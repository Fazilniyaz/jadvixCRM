import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPortal, PORTALS } from "@/lib/portals";
import { getModule } from "@/lib/modules";
import { getEffectiveModules, canManageAccess } from "@/lib/access";
import { PageHead } from "@/components/ui";
import { renderModule } from "@/components/modules/registry";

/** Pre-render every portal/module pair. Access is still checked per request. */
export function generateStaticParams() {
  return PORTALS.flatMap((p) => p.modules.map((m) => ({ portal: p.slug, module: m })));
}

export async function generateMetadata({
  params,
}: PageProps<"/[portal]/[module]">): Promise<Metadata> {
  const { portal: pSlug, module: mSlug } = await params;
  const portal = getPortal(pSlug);
  const mod = getModule(mSlug);
  if (!portal || !mod) return { title: "Jadvix CRM" };
  return { title: `${mod.label} · ${portal.name} – Jadvix CRM` };
}

export default async function ModulePage({ params }: PageProps<"/[portal]/[module]">) {
  const { portal: pSlug, module: mSlug } = await params;

  const portal = getPortal(pSlug);
  const mod = getModule(mSlug);
  if (!portal || !mod) notFound();

  // This is the real gate. Hiding an item from the sidebar is cosmetic; a
  // revoked module must 404 even when someone types the URL directly.
  const modules = await getEffectiveModules(portal.slug);
  if (!modules.includes(mod.slug)) notFound();

  return (
    <>
      <PageHead title={mod.label} blurb={mod.blurb} />
      {renderModule(mod.slug, {
        user: portal.demo.user,
        role: portal.demo.role,
        portal: portal.slug,
        canManageAccess: canManageAccess(portal.slug),
      })}
    </>
  );
}

export const dynamicParams = false;
