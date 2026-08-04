import type { ModuleSlug } from "./modules";
import { ALL_MODULES } from "./modules";

export type PortalSlug =
  | "master-portal"
  | "super-admin"
  | "manager"
  | "team-leader"
  | "employee"
  | "quality-check"
  | "sales"
  | "client";

export type Portal = {
  slug: PortalSlug;
  name: string;
  /** Shown under the portal name in the switcher. */
  blurb: string;
  /** Short tag rendered next to the logo. */
  tag: string;
  modules: readonly ModuleSlug[];
  /** May open the Module Access editor and change other portals' grants. */
  canManageAccess?: boolean;
  demo: { email: string; password: string; user: string; role: string };
};

/*
 * `modules` is the ceiling — the most a portal could ever be granted. What a
 * portal actually sees is resolved at request time by lib/access.ts, which
 * layers the super admin's grants on top of the mandatory baseline.
 */
export const PORTALS: readonly Portal[] = [
  {
    slug: "master-portal",
    name: "Master Portal",
    blurb: "Full control across every company and branch",
    tag: "Master",
    modules: ALL_MODULES,
    canManageAccess: true,
    demo: {
      email: "master@jadvix.com",
      password: "master@123",
      user: "Fazil Niyazdeen",
      role: "Master Administrator",
    },
  },
  {
    slug: "super-admin",
    name: "Super Admin",
    blurb: "Organisation-wide administration",
    tag: "Super Admin",
    modules: ALL_MODULES,
    canManageAccess: true,
    demo: {
      email: "superadmin@jadvix.com",
      password: "super@123",
      user: "Aarav Menon",
      role: "Super Administrator",
    },
  },
  {
    slug: "manager",
    name: "Manager Portal",
    blurb: "Department delivery and approvals",
    tag: "Manager",
    modules: ALL_MODULES,
    demo: {
      email: "manager@jadvix.com",
      password: "manager@123",
      user: "Priya Raghavan",
      role: "Delivery Manager",
    },
  },
  {
    slug: "team-leader",
    name: "Team Leader",
    blurb: "Squad planning and daily standups",
    tag: "Team Lead",
    modules: ALL_MODULES,
    demo: {
      email: "teamlead@jadvix.com",
      password: "teamlead@123",
      user: "Karthik Suresh",
      role: "Team Leader",
    },
  },
  {
    slug: "employee",
    name: "Employee Portal",
    blurb: "Your work, hours and requests",
    tag: "Employee",
    modules: ALL_MODULES,
    demo: {
      email: "employee@jadvix.com",
      password: "employee@123",
      user: "Neha Iyer",
      role: "Software Engineer",
    },
  },
  {
    slug: "quality-check",
    name: "Quality Check",
    blurb: "Review queues, defects and sign-off",
    tag: "QC",
    modules: ALL_MODULES,
    demo: {
      email: "qc@jadvix.com",
      password: "qc@123",
      user: "Rahul Nair",
      role: "QA Lead",
    },
  },
  {
    slug: "sales",
    name: "Sales Portal",
    blurb: "Pipeline, leads and proposals",
    tag: "Sales",
    modules: ALL_MODULES,
    demo: {
      email: "sales@jadvix.com",
      password: "sales@123",
      user: "Sneha Pillai",
      role: "Sales Executive",
    },
  },
  {
    slug: "client",
    name: "Client Portal",
    blurb: "Your projects, invoices and requests",
    tag: "Client",
    modules: ALL_MODULES,
    demo: {
      email: "client@jadvix.com",
      password: "client@123",
      user: "Daniel Fernandes",
      role: "Client — Northwind Ltd",
    },
  },
];

export const PORTAL_MAP = new Map(PORTALS.map((p) => [p.slug, p]));

export function getPortal(slug: string): Portal | undefined {
  return PORTAL_MAP.get(slug as PortalSlug);
}

export function isPortalSlug(slug: string): slug is PortalSlug {
  return PORTAL_MAP.has(slug as PortalSlug);
}

/** Demo-only credential check. Never ship this shape against real users. */
export function findPortalByCredentials(email: string, password: string): Portal | undefined {
  const e = email.trim().toLowerCase();
  return PORTALS.find((p) => p.demo.email === e && p.demo.password === password);
}
