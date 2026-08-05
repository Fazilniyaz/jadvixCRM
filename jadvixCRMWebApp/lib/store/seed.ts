import type {
  ClockEntry,
  Employee,
  LeaveRequest,
  Notification,
  Project,
  QcReview,
  Task,
  StoreState,
} from "./types";
import { seedCalendarEvents, seedClients, seedLeads } from "./seed-crm";

/*
 * Demo seed for the three editable modules.
 *
 * Hand-written rather than generated so the relations actually hold together:
 * every task points at a project that exists, every assignee is on that
 * project's roster, and the reporting lines match the portal roster in
 * lib/portals.ts. Ids are stable strings so the seed can be re-applied over a
 * stored copy without breaking references.
 *
 * The demo clock is 04 Aug 2026, matching lib/data/mock.ts.
 */

export const TODAY = "2026-08-04";

export const seedEmployees: Employee[] = [
  { id: "emp-fazil", empId: "JDX-001", name: "Fazil Niyazdeen", email: "fazil.n@jadvix.com", phone: "+44 20 7946 0801", role: "Manager", status: "Work Assigned", kraScore: 100, createdAt: "2019-04-01", branch: "London Office", portal: "master-portal", tone: "blue" },
  { id: "emp-aarav", empId: "JDX-002", name: "Aarav Menon", email: "aarav.m@jadvix.com", phone: "+91 98470 11002", role: "Manager", status: "Work Assigned", kraScore: 98, createdAt: "2020-05-30", branch: "Kochi HQ", portal: "super-admin", tone: "sky" },

  { id: "emp-priya", empId: "JDX-010", name: "Priya Raghavan", email: "priya.r@jadvix.com", phone: "+91 98470 11010", role: "Manager", status: "Work Assigned", kraScore: 96, createdAt: "2021-09-19", branch: "Kochi HQ", portal: "manager-1", tone: "slate" },
  { id: "emp-rohan", empId: "JDX-011", name: "Rohan Kurian", email: "rohan.k@jadvix.com", phone: "+91 98470 11011", role: "Manager", status: "Work Assigned", kraScore: 92, createdAt: "2021-11-08", branch: "Bengaluru Studio", portal: "manager-2", tone: "orange" },

  { id: "emp-karthik", empId: "JDX-021", name: "Karthik Suresh", email: "karthik.s@jadvix.com", phone: "+91 98470 11021", role: "Team Leader", status: "Work Assigned", kraScore: 94, createdAt: "2022-01-04", branch: "Kochi HQ", portal: "team-leader-1", tone: "orange" },
  { id: "emp-meera", empId: "JDX-022", name: "Meera Krishnan", email: "meera.k@jadvix.com", phone: "+91 98470 11022", role: "Team Leader", status: "Work Assigned", kraScore: 99, createdAt: "2023-08-08", branch: "Bengaluru Studio", portal: "team-leader-2", tone: "sky" },

  { id: "emp-rahul", empId: "JDX-031", name: "Rahul Nair", email: "rahul.nair@jadvix.com", phone: "+91 98470 11031", role: "QC", status: "Work Assigned", kraScore: 95, createdAt: "2022-06-27", branch: "Bengaluru Studio", portal: "quality-check-1", tone: "sky" },
  { id: "emp-vishnu", empId: "JDX-032", name: "Vishnu Prasad", email: "vishnu.p@jadvix.com", phone: "+91 98470 11032", role: "QC", status: "Work Assigned", kraScore: 90, createdAt: "2024-04-21", branch: "Chennai Sales", portal: "quality-check-2", tone: "slate" },
  { id: "emp-anjali", empId: "JDX-033", name: "Anjali Thomas", email: "anjali.t@jadvix.com", phone: "+91 98470 11033", role: "QC", status: "Idle", kraScore: 88, createdAt: "2024-10-14", branch: "Kochi HQ", portal: "quality-check-3", tone: "orange" },

  { id: "emp-neha", empId: "JDX-041", name: "Neha Iyer", email: "neha.iyer@jadvix.com", phone: "+91 98470 11041", role: "Developer", status: "Work Assigned", kraScore: 97, createdAt: "2023-03-12", branch: "Kochi HQ", portal: "employee-1", tone: "blue" },
  { id: "emp-divya", empId: "JDX-042", name: "Divya Ramesh", email: "divya.r@jadvix.com", phone: "+91 98470 11042", role: "Developer", status: "Work Assigned", kraScore: 79, createdAt: "2022-07-11", branch: "Kochi HQ", portal: "employee-2", tone: "orange" },
  { id: "emp-arun", empId: "JDX-043", name: "Arun Varghese", email: "arun.v@jadvix.com", phone: "+91 98470 11043", role: "Developer", status: "Leave", kraScore: 86, createdAt: "2023-11-15", branch: "Kochi HQ", portal: "employee-3", tone: "orange" },
  { id: "emp-joel", empId: "JDX-044", name: "Joel Mathew", email: "joel.m@jadvix.com", phone: "+91 98470 11044", role: "Developer", status: "Break", kraScore: 91, createdAt: "2024-02-19", branch: "Bengaluru Studio", tone: "blue" },
  { id: "emp-fathima", empId: "JDX-045", name: "Fathima Rasheed", email: "fathima.r@jadvix.com", phone: "+91 98470 11045", role: "Developer", status: "Idle", kraScore: 93, createdAt: "2025-01-06", branch: "Bengaluru Studio", tone: "sky" },

  { id: "emp-sneha", empId: "JDX-051", name: "Sneha Pillai", email: "sneha.p@jadvix.com", phone: "+91 98470 11051", role: "Sales", status: "Work Assigned", kraScore: 89, createdAt: "2024-02-02", branch: "Chennai Sales", portal: "sales-1", tone: "blue" },
  { id: "emp-vikram", empId: "JDX-052", name: "Vikram Das", email: "vikram.d@jadvix.com", phone: "+91 98470 11052", role: "Sales", status: "Idle", kraScore: 84, createdAt: "2023-05-22", branch: "Chennai Sales", portal: "sales-2", tone: "slate" },
];

export const seedProjects: Project[] = [
  /*
   * Northwind carries three engagements — one delivered, one mid-flight, one
   * early. That is what the client portal opens on, so between them Monitor
   * shows a finished timeline, an in-progress one and a plan barely started.
   */
  {
    id: "prj-northwind-pos",
    code: "PRJ-088",
    name: "Northwind Store POS Refresh",
    description:
      "Replaced the till software across 140 Northwind stores, moving card handling onto a supported terminal and cutting the end-of-day close from 40 minutes to under five.",
    client: "Northwind Ltd",
    clientId: "CL-08",
    problemStatement:
      "The till estate ran on an unsupported Windows build, so card handling was out of PCI scope and every store manager spent 40 minutes on the nightly close.",
    solution:
      "A supported terminal with an automated close and a rollout schedule that took no store offline for more than one trading hour.",
    startDate: "2025-04-07",
    endDate: "2025-12-05",
    assignedEmployees: ["emp-karthik", "emp-joel"],
    reportTo: ["emp-priya", "emp-rahul"],
    status: "Delivered",
    plan: [
      { id: "ms-nwpos-1", label: "Store survey and hardware selection", due: "2025-05-16", status: "Done", note: "All 140 stores surveyed. Two sites needed a network upgrade first." },
      { id: "ms-nwpos-2", label: "Terminal build and PCI review", due: "2025-07-11", status: "Done", note: "Passed external PCI assessment first time." },
      { id: "ms-nwpos-3", label: "Pilot — 12 stores", due: "2025-09-05", status: "Done", note: "Pilot ran four weeks. Close time measured at 4m 20s average." },
      { id: "ms-nwpos-4", label: "National rollout", due: "2025-11-21", status: "Done", note: "Completed two weeks early. No store lost more than one trading hour." },
      { id: "ms-nwpos-5", label: "Handover and support transition", due: "2025-12-05", status: "Done", note: "Support handed to Northwind's own service desk on 05 Dec." },
    ],
    secrets: [
      { id: "sec-nwpos-1", key: "TERMINAL_FLEET_API", value: "https://fleet.northwind.test/v1", env: "local", updatedAt: "2025-11-20", updatedBy: "Aarav Menon" },
    ],
    createdAt: "2025-03-18",
    updatedAt: "2025-12-05",
  },
  {
    id: "prj-northwind-crm",
    code: "PRJ-121",
    name: "Northwind Retail Insights",
    description:
      "A store-level reporting layer for Northwind's regional managers, replacing the weekly spreadsheet that ops assembles by hand.",
    client: "Northwind Ltd",
    clientId: "CL-08",
    problemStatement:
      "Regional managers get last week's numbers on a Tuesday, assembled manually from four systems, so a bad week is only visible once it is over.",
    solution:
      "Nightly ingestion into a reporting store with a store-level dashboard, so each region sees yesterday's trading by 07:00 without anyone building it.",
    startDate: "2026-06-15",
    endDate: "2026-12-11",
    assignedEmployees: ["emp-divya", "emp-fathima"],
    reportTo: ["emp-priya", "emp-meera", "emp-anjali"],
    status: "On Track",
    plan: [
      { id: "ms-nwcrm-1", label: "Data audit across the four source systems", due: "2026-07-10", status: "Done", note: "Audit complete across all four source systems. Two feeds need a nightly export rather than an API." },
      { id: "ms-nwcrm-2", label: "Nightly ingestion pipeline", due: "2026-08-21", status: "In Progress", note: "Pipeline is building. First region's data lands in the reporting store this week." },
      { id: "ms-nwcrm-3", label: "Store-level dashboard", due: "2026-10-02", status: "Planned", note: "Store-level dashboard, one view per region, yesterday's trading by 07:00." },
      { id: "ms-nwcrm-4", label: "Regional manager rollout", due: "2026-11-13", status: "Planned", note: "Phased rollout — three pilot regions first, then the remaining eleven." },
      { id: "ms-nwcrm-5", label: "Handover and training", due: "2026-12-11", status: "Planned", note: "Handover pack and two training sessions for the regional manager group." },
    ],
    secrets: [
      { id: "sec-nwcrm-1", key: "REPORTING_DB_DSN", value: "postgres://localhost:5432/nw_reporting", env: "local", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-nwcrm-2", key: "SFTP_INGEST_HOST", value: "sftp.northwind.test", env: "development", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
    ],
    createdAt: "2026-06-02",
    updatedAt: "2026-08-02",
  },
  {
    id: "prj-northwind",
    code: "PRJ-101",
    name: "Northwind Commerce Replatform",
    description:
      "Rebuild the Northwind storefront and checkout on a headless stack, keeping the existing ERP integration intact through the cutover.",
    client: "Northwind Ltd",
    problemStatement:
      "The legacy Magento storefront takes 6.4s to interactive on mobile and cannot support multi-currency pricing, so 41% of overseas carts are abandoned before payment.",
    solution:
      "Headless Next.js storefront over a commerce API, with a currency-aware pricing service and a phased cutover that runs both checkouts in parallel for two weeks.",
    startDate: "2026-02-02",
    endDate: "2026-09-18",
    assignedEmployees: ["emp-neha", "emp-karthik", "emp-arun", "emp-joel"],
    reportTo: ["emp-priya", "emp-karthik", "emp-rahul"],
    status: "On Track",
    createdAt: "2026-01-20",
    updatedAt: "2026-07-28",
    clientId: "CL-08",
    plan: [
      { id: "ms-northwind-1", label: "Discovery and technical audit", due: "2026-02-27", status: "Done", note: "Audit delivered 27 Feb. Confirmed the ERP integration can stay in place through cutover." },
      { id: "ms-northwind-2", label: "Design system and storefront shell", due: "2026-04-10", status: "Done", note: "Design system signed off and the storefront shell is live on staging." },
      { id: "ms-northwind-3", label: "Catalogue and search", due: "2026-05-29", status: "Done", note: "Catalogue and search complete — 41,000 SKUs migrated with no data loss." },
      { id: "ms-northwind-4", label: "Checkout and multi-currency pricing", due: "2026-07-24", status: "In Progress", note: "Checkout is built; multi-currency rounding is in final testing with QC." },
      { id: "ms-northwind-5", label: "Parallel-run cutover", due: "2026-08-28", status: "Planned", note: "Both checkouts run side by side for two weeks. No customer impact expected." },
      { id: "ms-northwind-6", label: "Go-live and hypercare", due: "2026-09-18", status: "Planned", note: "Go-live, then two weeks of hypercare with the delivery team on standby." },
    ],
    secrets: [
      { id: "sec-northwind-1", key: "COMMERCE_API_URL", value: "https://api.northwind.test/v2", env: "local", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-northwind-2", key: "COMMERCE_API_KEY", value: "nw_test_4f2b8c91de", env: "local", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-northwind-3", key: "CURRENCY_FEED_KEY", value: "cx_dev_2f19aa", env: "development", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-northwind-4", key: "COMMERCE_API_URL", value: "https://api.northwind.co.uk/v2", env: "production", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-northwind-5", key: "STRIPE_SECRET_KEY", value: "sk_live_PLACEHOLDER_ROTATE_ME", env: "production", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
    ],
  },
  {
    id: "prj-harbour",
    code: "PRJ-104",
    name: "Harbour Freight Portal",
    description:
      "A self-service consignment tracking portal for Harbour's B2B customers, replacing the phone-and-spreadsheet process the ops desk runs today.",
    client: "Harbour Logistics",
    problemStatement:
      "Ops handles roughly 300 status calls a day because customers have no way to see where a consignment is, which costs three full-time desk staff.",
    solution:
      "Customer portal fed by the existing TMS event stream, with saved filters, email digests and a public tracking link per consignment.",
    startDate: "2026-03-09",
    endDate: "2026-08-02",
    assignedEmployees: ["emp-meera", "emp-divya", "emp-fathima"],
    reportTo: ["emp-rohan", "emp-meera", "emp-vishnu"],
    status: "At Risk",
    createdAt: "2026-02-24",
    updatedAt: "2026-08-01",
    clientId: "CL-15",
    plan: [
      { id: "ms-harbour-1", label: "TMS event stream ingestion", due: "2026-05-11", status: "Done" },
      { id: "ms-harbour-2", label: "Consignment tracking table", due: "2026-08-08", status: "In Progress" },
      { id: "ms-harbour-3", label: "Saved filters and email digests", due: "2026-08-22", status: "Delayed" },
      { id: "ms-harbour-4", label: "Public tracking links", due: "2026-09-05", status: "Planned" },
    ],
    secrets: [
      { id: "sec-harbour-1", key: "TMS_STREAM_URL", value: "amqp://localhost:5672/harbour", env: "local", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-harbour-2", key: "TMS_CONSUMER_GROUP", value: "portal-dev", env: "development", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-harbour-3", key: "TMS_STREAM_URL", value: "amqps://mq.harbour.co/harbour", env: "staging", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
    ],
  },
  {
    id: "prj-lumen",
    code: "PRJ-107",
    name: "Lumen Health Mobile App",
    description:
      "Patient-facing appointment booking and results app for Lumen's five clinics, with clinician-side confirmation.",
    client: "Lumen Health",
    problemStatement:
      "Booking is phone-only during office hours, so 22% of slots go unfilled and no-shows sit at 18% with no reminder mechanism.",
    solution:
      "React Native app with real-time slot availability, automated reminders at 48h and 2h, and a clinician web console for rescheduling.",
    startDate: "2026-01-12",
    endDate: "2026-08-29",
    assignedEmployees: ["emp-neha", "emp-joel", "emp-arun"],
    reportTo: ["emp-priya", "emp-karthik", "emp-rahul", "emp-anjali"],
    status: "On Track",
    createdAt: "2025-12-18",
    updatedAt: "2026-07-30",
    clientId: "CL-12",
    plan: [
      { id: "ms-lumen-1", label: "Clinic discovery and slot model", due: "2026-02-13", status: "Done" },
      { id: "ms-lumen-2", label: "Booking flow", due: "2026-04-24", status: "Done" },
      { id: "ms-lumen-3", label: "Reminders at 48h and 2h", due: "2026-06-19", status: "Done" },
      { id: "ms-lumen-4", label: "Clinician console", due: "2026-08-14", status: "In Progress" },
      { id: "ms-lumen-5", label: "App store submission", due: "2026-08-29", status: "Planned" },
    ],
    secrets: [
      { id: "sec-lumen-1", key: "FHIR_BASE_URL", value: "https://sandbox.lumen.health/fhir", env: "local", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-lumen-2", key: "PUSH_CERT_ID", value: "lumen-dev-8821", env: "development", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-lumen-3", key: "FHIR_BASE_URL", value: "https://api.lumen.health/fhir", env: "production", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
    ],
  },
  {
    id: "prj-orbit",
    code: "PRJ-112",
    name: "Orbit Analytics Dashboard",
    description:
      "An embedded analytics surface for Orbit's own SaaS product, sold on as a paid tier to their customers.",
    client: "Orbit Systems",
    problemStatement:
      "Orbit's customers export CSVs into spreadsheets to answer basic usage questions, and Orbit has no upsell to offer against a competitor that ships analytics natively.",
    solution:
      "Embeddable dashboard with a query builder over their warehouse, themed per tenant, metered so Orbit can bill it as a tier.",
    startDate: "2026-04-06",
    endDate: "2026-07-14",
    assignedEmployees: ["emp-divya", "emp-arun"],
    reportTo: ["emp-rohan", "emp-meera", "emp-anjali"],
    status: "Delayed",
    createdAt: "2026-03-23",
    updatedAt: "2026-07-22",
    clientId: "CL-21",
    plan: [
      { id: "ms-orbit-1", label: "Warehouse connector", due: "2026-05-15", status: "Done" },
      { id: "ms-orbit-2", label: "Query builder", due: "2026-06-26", status: "In Progress" },
      { id: "ms-orbit-3", label: "Per-tenant theming", due: "2026-07-31", status: "Delayed" },
      { id: "ms-orbit-4", label: "Metering and billing hooks", due: "2026-08-21", status: "Planned" },
    ],
    secrets: [
      { id: "sec-orbit-1", key: "WAREHOUSE_DSN", value: "postgres://localhost:5432/orbit", env: "local", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-orbit-2", key: "TENANT_SIGNING_SECRET", value: "dev_only_not_a_real_secret", env: "development", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
    ],
  },
  {
    id: "prj-kestrel",
    code: "PRJ-118",
    name: "Kestrel Payments Gateway",
    description:
      "A PSD2-compliant payment orchestration layer sitting between Kestrel's core banking system and four acquirers.",
    client: "Kestrel Bank",
    problemStatement:
      "Each acquirer is integrated point-to-point, so adding a fifth takes nine months and a failed acquirer takes the whole payment path down with it.",
    solution:
      "Single orchestration API with per-acquirer adapters, automatic failover on health checks, and idempotent retries with a replayable event log.",
    startDate: "2026-05-04",
    endDate: "2026-11-20",
    assignedEmployees: ["emp-meera", "emp-karthik", "emp-neha", "emp-fathima"],
    reportTo: ["emp-priya", "emp-rohan", "emp-vishnu"],
    status: "On Track",
    createdAt: "2026-04-14",
    updatedAt: "2026-08-03",
    clientId: "CL-19",
    plan: [
      { id: "ms-kestrel-1", label: "Orchestration contract", due: "2026-06-05", status: "Done" },
      { id: "ms-kestrel-2", label: "First two acquirer adapters", due: "2026-07-17", status: "Done" },
      { id: "ms-kestrel-3", label: "Failover and health checks", due: "2026-08-12", status: "In Progress" },
      { id: "ms-kestrel-4", label: "Refunds and reconciliation", due: "2026-09-25", status: "Planned" },
      { id: "ms-kestrel-5", label: "PSD2 certification", due: "2026-10-30", status: "Planned" },
      { id: "ms-kestrel-6", label: "Production cutover", due: "2026-11-20", status: "Planned" },
    ],
    secrets: [
      { id: "sec-kestrel-1", key: "ACQUIRER_SANDBOX_URL", value: "https://sandbox.kestrel.bank/psp", env: "local", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-kestrel-2", key: "ACQUIRER_CLIENT_ID", value: "kb-dev-01", env: "development", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-kestrel-3", key: "ACQUIRER_CLIENT_SECRET", value: "PLACEHOLDER_USE_VAULT", env: "staging", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
      { id: "sec-kestrel-4", key: "HSM_PARTITION", value: "kestrel-prod-1", env: "production", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
    ],
  },
  {
    id: "prj-vantage",
    code: "PRJ-096",
    name: "Vantage CRM Migration",
    description:
      "Lift Vantage's 11 years of CRM history off a discontinued on-premise product onto a supported cloud platform.",
    client: "Vantage Group",
    problemStatement:
      "The incumbent CRM went end-of-life with no security patches, and 1.2m contact records sit in a schema no supported product reads.",
    solution:
      "Staged migration with a reconciliation harness that diffs source and target after every batch, plus a two-week dual-run before switchover.",
    startDate: "2025-11-03",
    endDate: "2026-04-30",
    assignedEmployees: ["emp-meera", "emp-divya"],
    reportTo: ["emp-priya", "emp-rahul"],
    status: "Delivered",
    createdAt: "2025-10-15",
    updatedAt: "2026-04-30",
    clientId: "CL-06",
    plan: [
      { id: "ms-vantage-1", label: "Schema mapping", due: "2025-12-19", status: "Done" },
      { id: "ms-vantage-2", label: "Batch migration harness", due: "2026-02-06", status: "Done" },
      { id: "ms-vantage-3", label: "Dual run", due: "2026-04-10", status: "Done" },
      { id: "ms-vantage-4", label: "Switchover", due: "2026-04-30", status: "Done" },
    ],
    secrets: [
      { id: "sec-vantage-1", key: "LEGACY_DB_DSN", value: "mssql://localhost/vantage_archive", env: "local", updatedAt: "2026-07-30", updatedBy: "Aarav Menon" },
    ],
  },
];

/*
 * Shorthand so the seed below stays readable.
 *
 * `points` defaults to 1 — most acceptance lines are worth the same, and only
 * the ones that carry real risk are weighted higher.
 */
const cl = (label: string, score: number, n: number, points = 1) => ({
  id: `c${n}`,
  label,
  score,
  points,
});
const up = (n: number, at: string, by: string, summary: string) => ({ id: `u${n}`, at, by, summary });

const baseTasks: Omit<Task, "qcReviews">[] = [
  {
    id: "tsk-396",
    taskId: "TSK-396",
    title: "Wire refund flow to the payments API",
    description:
      "Refunds currently stop at the orchestration layer. Connect the refund intent to each acquirer adapter and make partial refunds idempotent on retry.",
    status: "In Progress",
    priority: 1,
    projectIds: ["prj-kestrel"],
    assignedTo: ["emp-meera"],
    reportTo: ["emp-rohan", "emp-vishnu"],
    createdBy: "Priya Raghavan",
    createdAt: "2026-07-21",
    updatedBy: [
      up(1, "2026-07-23", "Meera Krishnan", "Adapter interface agreed with Kestrel — added the idempotency key to the contract."),
      up(2, "2026-07-30", "Rohan Kurian", "Moved to P1 after Kestrel flagged it as a launch blocker."),
    ],
    checklist: [
      cl("Refund intent modelled on all four adapters", 1, 1),
      cl("Idempotency key threaded through retries", 0.6, 2, 3),
      cl("Partial refund covered by tests", 0.3, 3, 2),
      cl("Runbook updated", 0, 4),
    ],
    startDate: "2026-07-21",
    endDate: "2026-08-14",
    prUrl: "https://github.com/jadvix/kestrel-gateway/pull/412",
  },
  {
    id: "tsk-403",
    taskId: "TSK-403",
    title: "Rebuild the consignment tracking table",
    description:
      "The current table renders all 12k rows at once and locks the tab on mobile. Virtualise it and add the saved-filter chips from the spec.",
    status: "In Progress",
    priority: 1,
    projectIds: ["prj-harbour"],
    assignedTo: ["emp-divya", "emp-fathima"],
    reportTo: ["emp-rohan", "emp-meera"],
    createdBy: "Rohan Kurian",
    createdAt: "2026-07-14",
    updatedBy: [
      up(1, "2026-07-25", "Divya Ramesh", "Virtualisation landed; filter chips still to do."),
    ],
    checklist: [
      cl("Row virtualisation", 1, 1),
      cl("Saved filter chips", 0.4, 2),
      cl("Keyboard navigation", 0, 3),
      cl("Mobile card fallback", 0.2, 4),
    ],
    startDate: "2026-07-14",
    endDate: "2026-08-08",
    prUrl: "https://github.com/jadvix/harbour-portal/pull/188",
  },
  {
    id: "tsk-409",
    taskId: "TSK-409",
    title: "Empty and error states for storefront search",
    description:
      "Search currently shows a blank panel for no results and a raw stack trace on a failed query. Design and build both states.",
    status: "In Progress",
    priority: 3,
    projectIds: ["prj-northwind"],
    assignedTo: ["emp-arun"],
    reportTo: ["emp-karthik", "emp-rahul"],
    createdBy: "Karthik Suresh",
    createdAt: "2026-07-27",
    updatedBy: [],
    checklist: [
      cl("No-results state with suggestions", 0.8, 1),
      cl("Network error state with retry", 0.5, 2),
      cl("Copy reviewed", 0, 3),
    ],
    startDate: "2026-07-27",
    endDate: "2026-08-11",
  },
  {
    id: "tsk-415",
    taskId: "TSK-415",
    title: "Multi-currency rounding on the cart total",
    description:
      "AED totals round down by a cent because the cart sums in minor units after conversion instead of before. Move the conversion ahead of the sum.",
    status: "In Progress",
    priority: 1,
    projectIds: ["prj-northwind"],
    assignedTo: ["emp-neha"],
    reportTo: ["emp-karthik", "emp-rahul"],
    createdBy: "Rahul Nair",
    createdAt: "2026-08-01",
    updatedBy: [
      up(1, "2026-08-03", "Neha Iyer", "Reproduced against GBP, AED and INR — AED is the only failing case."),
    ],
    checklist: [
      cl("Root cause confirmed", 1, 1, 2),
      cl("Conversion moved ahead of the sum", 0.7, 2, 3),
      cl("Regression cases for GBP / AED / INR", 0.5, 3, 2),
      cl("Signed off by QC", 0, 4),
    ],
    startDate: "2026-08-01",
    endDate: "2026-08-07",
    prUrl: "https://github.com/jadvix/northwind-web/pull/731",
  },
  {
    id: "tsk-388",
    taskId: "TSK-388",
    title: "Session expiry banner",
    description:
      "Warn the patient two minutes before the session times out, with a one-click extend that refreshes the token.",
    status: "In Review",
    priority: 3,
    projectIds: ["prj-lumen"],
    assignedTo: ["emp-joel"],
    reportTo: ["emp-karthik", "emp-anjali"],
    createdBy: "Karthik Suresh",
    createdAt: "2026-07-09",
    updatedBy: [
      up(1, "2026-07-18", "Joel Mathew", "Ready for review — extend refreshes without dropping the booking in progress."),
      up(2, "2026-07-31", "Anjali Thomas", "Two checklist lines still open; holding sign-off."),
    ],
    checklist: [
      cl("Banner at T-2 minutes", 1, 1),
      cl("Extend refreshes the token", 1, 2),
      cl("Booking in progress survives the refresh", 0.6, 3, 2),
      cl("Screen-reader announcement", 0.4, 4),
    ],
    startDate: "2026-07-09",
    endDate: "2026-08-06",
    prUrl: "https://github.com/jadvix/lumen-app/pull/264",
  },
  {
    id: "tsk-391",
    taskId: "TSK-391",
    title: "Regression pack for appointments",
    description:
      "Full regression suite for booking, rescheduling and cancellation, including the DST boundary that broke slots last month.",
    status: "In Review",
    priority: 2,
    projectIds: ["prj-lumen"],
    assignedTo: ["emp-vishnu", "emp-anjali"],
    reportTo: ["emp-rahul", "emp-priya"],
    createdBy: "Rahul Nair",
    createdAt: "2026-07-06",
    updatedBy: [
      up(1, "2026-07-29", "Vishnu Prasad", "38 of 44 cases automated; DST boundary cases still manual."),
    ],
    checklist: [
      cl("Booking happy path", 1, 1),
      cl("Reschedule and cancel", 1, 2),
      cl("DST boundary cases", 0.5, 3, 3),
      cl("Runs in CI under 10 minutes", 0.8, 4),
    ],
    startDate: "2026-07-06",
    endDate: "2026-08-09",
  },
  {
    id: "tsk-420",
    taskId: "TSK-420",
    title: "Acquirer failover health checks",
    description:
      "Poll each acquirer every 15s and drain traffic off one that fails three consecutive checks, without dropping in-flight authorisations.",
    status: "In Review",
    priority: 2,
    projectIds: ["prj-kestrel"],
    assignedTo: ["emp-karthik"],
    reportTo: ["emp-priya", "emp-vishnu"],
    createdBy: "Priya Raghavan",
    createdAt: "2026-07-13",
    updatedBy: [
      up(1, "2026-08-02", "Karthik Suresh", "Drain works; in-flight authorisations need one more pass."),
    ],
    checklist: [
      cl("Health check per adapter", 1, 1),
      cl("Drain after three failures", 1, 2),
      cl("In-flight authorisations complete", 0.5, 3, 3),
      cl("Alert fires on drain", 0.7, 4),
    ],
    startDate: "2026-07-13",
    endDate: "2026-08-12",
    prUrl: "https://github.com/jadvix/kestrel-gateway/pull/398",
  },
  {
    id: "tsk-412",
    taskId: "TSK-412",
    title: "Split the checkout bundle to cut time-to-interactive",
    description:
      "Checkout ships 780KB of JS on first load. Route-split the payment providers and defer the address autocomplete.",
    status: "Backlog",
    priority: 3,
    projectIds: ["prj-northwind"],
    assignedTo: ["emp-divya"],
    reportTo: ["emp-karthik"],
    createdBy: "Karthik Suresh",
    createdAt: "2026-07-19",
    updatedBy: [],
    checklist: [
      cl("Payment providers route-split", 0, 1),
      cl("Address autocomplete deferred", 0, 2),
      cl("TTI measured before and after", 0, 3),
    ],
    startDate: "2026-08-11",
  },
  {
    id: "tsk-418",
    taskId: "TSK-418",
    title: "Draft the data-retention policy copy",
    description:
      "Patient-facing wording for how long results and appointment history are kept, cleared with Lumen's DPO.",
    status: "Backlog",
    priority: 4,
    projectIds: ["prj-lumen"],
    assignedTo: ["emp-arun"],
    reportTo: ["emp-priya", "emp-anjali"],
    createdBy: "Priya Raghavan",
    createdAt: "2026-07-22",
    updatedBy: [],
    checklist: [
      cl("First draft", 0, 1),
      cl("Reviewed by Lumen's DPO", 0, 2),
      cl("Placed in-app and in the FAQ", 0, 3),
    ],
    startDate: "2026-08-17",
  },
  {
    id: "tsk-421",
    taskId: "TSK-421",
    title: "Audit unused design tokens",
    description:
      "The token file has drifted from the design system. Remove what nothing references and document what stays.",
    status: "Backlog",
    priority: 5,
    projectIds: ["prj-harbour", "prj-orbit"],
    assignedTo: ["emp-fathima"],
    reportTo: ["emp-meera"],
    createdBy: "Meera Krishnan",
    createdAt: "2026-07-24",
    updatedBy: [],
    checklist: [cl("Usage scan", 0, 1), cl("Unused tokens removed", 0, 2)],
    startDate: "2026-08-19",
  },
  {
    id: "tsk-424",
    taskId: "TSK-424",
    title: "Per-tenant theming for the embedded dashboard",
    description:
      "Orbit's customers need the dashboard to inherit their own brand colours and logo without a rebuild per tenant.",
    status: "Backlog",
    priority: 2,
    projectIds: ["prj-orbit"],
    assignedTo: ["emp-arun", "emp-divya"],
    reportTo: ["emp-rohan", "emp-meera"],
    createdBy: "Rohan Kurian",
    createdAt: "2026-07-26",
    updatedBy: [
      up(1, "2026-07-31", "Rohan Kurian", "Blocked until Orbit confirms the tenant config shape."),
    ],
    checklist: [
      cl("Token contract agreed with Orbit", 0.3, 1),
      cl("Runtime theme injection", 0, 2),
      cl("Contrast validation per tenant", 0, 3, 2),
    ],
    startDate: "2026-08-10",
  },
  {
    id: "tsk-427",
    taskId: "TSK-427",
    title: "Warehouse query builder — saved queries",
    description:
      "Let a user name and save a query, then reopen it from a list. Sharing across a tenant comes later.",
    status: "New",
    priority: 3,
    projectIds: ["prj-orbit"],
    assignedTo: ["emp-divya"],
    reportTo: ["emp-meera", "emp-anjali"],
    createdBy: "Meera Krishnan",
    createdAt: "2026-08-03",
    updatedBy: [],
    checklist: [cl("Save and name a query", 0, 1), cl("Reopen from a list", 0, 2), cl("Delete a saved query", 0, 3)],
    startDate: "2026-08-12",
  },
  {
    id: "tsk-429",
    taskId: "TSK-429",
    title: "Public consignment tracking link",
    description:
      "A shareable, tokenised link that shows one consignment's status without a login, expiring on delivery plus 30 days.",
    status: "New",
    priority: 2,
    projectIds: ["prj-harbour"],
    assignedTo: ["emp-fathima"],
    reportTo: ["emp-rohan", "emp-vishnu"],
    createdBy: "Rohan Kurian",
    createdAt: "2026-08-03",
    updatedBy: [],
    checklist: [
      cl("Tokenised route", 0, 1),
      cl("Expiry on delivery + 30 days", 0, 2),
      cl("No PII beyond the consignment", 0, 3, 3),
    ],
    startDate: "2026-08-10",
  },
  {
    id: "tsk-431",
    taskId: "TSK-431",
    title: "Clinician console — bulk reschedule",
    description:
      "When a clinic session is cancelled, let the clinician move every affected appointment in one action with automatic patient notification.",
    status: "New",
    priority: 2,
    projectIds: ["prj-lumen"],
    assignedTo: ["emp-joel", "emp-neha"],
    reportTo: ["emp-karthik", "emp-rahul"],
    createdBy: "Karthik Suresh",
    createdAt: "2026-08-04",
    updatedBy: [],
    checklist: [
      cl("Select a session and its appointments", 0, 1),
      cl("Propose new slots", 0, 2),
      cl("Notify every affected patient", 0, 3, 2),
      cl("Audit trail of the bulk move", 0, 4),
    ],
    startDate: "2026-08-13",
  },
  {
    id: "tsk-433",
    taskId: "TSK-433",
    title: "Acquirer #5 adapter — Sterling",
    description:
      "First adapter written against the new orchestration contract rather than point-to-point, to prove the nine-month integration drops to weeks.",
    status: "New",
    priority: 4,
    projectIds: ["prj-kestrel"],
    assignedTo: ["emp-fathima"],
    reportTo: ["emp-priya", "emp-rohan"],
    createdBy: "Priya Raghavan",
    createdAt: "2026-08-04",
    updatedBy: [],
    checklist: [cl("Sandbox credentials", 0, 1), cl("Authorise and capture", 0, 2), cl("Refund", 0, 3)],
    startDate: "2026-08-24",
  },
  {
    id: "tsk-370",
    taskId: "TSK-370",
    title: "Migrate legacy contact records",
    description: "All 1.2m Vantage contacts moved with a reconciliation diff after every batch.",
    status: "Done",
    priority: 1,
    projectIds: ["prj-vantage"],
    assignedTo: ["emp-meera"],
    reportTo: ["emp-priya", "emp-rahul"],
    createdBy: "Priya Raghavan",
    createdAt: "2026-02-10",
    updatedBy: [
      up(1, "2026-03-28", "Meera Krishnan", "All batches reconciled — zero unresolved diffs."),
      up(2, "2026-04-02", "Rahul Nair", "Signed off."),
    ],
    checklist: [
      cl("Batch migration harness", 1, 1),
      cl("Reconciliation diff per batch", 1, 2, 2),
      cl("Zero unresolved diffs", 1, 3, 2),
      cl("Sign-off from Vantage", 1, 4),
    ],
    startDate: "2026-02-10",
    endDate: "2026-04-02",
    prUrl: "https://github.com/jadvix/vantage-migration/pull/91",
  },
  {
    id: "tsk-377",
    taskId: "TSK-377",
    title: "Two-factor enrolment screen",
    description: "TOTP enrolment with recovery codes, gated behind a password re-prompt.",
    status: "Done",
    priority: 2,
    projectIds: ["prj-kestrel"],
    assignedTo: ["emp-neha"],
    reportTo: ["emp-karthik", "emp-vishnu"],
    createdBy: "Karthik Suresh",
    createdAt: "2026-05-18",
    updatedBy: [up(1, "2026-06-24", "Vishnu Prasad", "Passed regression; signed off.")],
    checklist: [
      cl("TOTP enrolment", 1, 1, 2),
      cl("Recovery codes", 1, 2, 2),
      cl("Password re-prompt", 1, 3),
    ],
    startDate: "2026-05-18",
    endDate: "2026-06-24",
    prUrl: "https://github.com/jadvix/kestrel-gateway/pull/302",
  },
  {
    id: "tsk-381",
    taskId: "TSK-381",
    title: "Invoice PDF template",
    description: "Branded invoice PDF with VAT breakdown and a payable-by line.",
    status: "Done",
    priority: 4,
    projectIds: ["prj-vantage"],
    assignedTo: ["emp-divya"],
    reportTo: ["emp-priya"],
    createdBy: "Priya Raghavan",
    createdAt: "2026-03-02",
    updatedBy: [up(1, "2026-03-30", "Divya Ramesh", "Template approved by finance.")],
    checklist: [cl("Layout", 1, 1), cl("VAT breakdown", 1, 2), cl("Approved by finance", 1, 3)],
    startDate: "2026-03-02",
    endDate: "2026-03-30",
  },
  {
    id: "tsk-384",
    taskId: "TSK-384",
    title: "Storefront design system audit",
    description: "Catalogue every component in the Northwind storefront against the design system before the rebuild.",
    status: "Done",
    priority: 3,
    projectIds: ["prj-northwind"],
    assignedTo: ["emp-arun"],
    reportTo: ["emp-karthik"],
    createdBy: "Karthik Suresh",
    createdAt: "2026-02-09",
    updatedBy: [up(1, "2026-03-06", "Arun Varghese", "62 components catalogued, 19 flagged as one-offs.")],
    checklist: [cl("Component inventory", 1, 1), cl("One-offs flagged", 1, 2), cl("Handover to build", 1, 3)],
    startDate: "2026-02-09",
    endDate: "2026-03-06",
  },
  {
    id: "tsk-386",
    taskId: "TSK-386",
    title: "TMS event stream ingestion",
    description: "Consume Harbour's consignment event stream into the portal's read model, with replay from any offset.",
    status: "Done",
    priority: 1,
    projectIds: ["prj-harbour"],
    assignedTo: ["emp-meera"],
    reportTo: ["emp-rohan", "emp-vishnu"],
    createdBy: "Rohan Kurian",
    createdAt: "2026-03-16",
    updatedBy: [up(1, "2026-05-11", "Meera Krishnan", "Replay verified from a cold start.")],
    checklist: [
      cl("Consumer with at-least-once delivery", 1, 1),
      cl("Read model projection", 1, 2),
      cl("Replay from any offset", 1, 3, 2),
    ],
    startDate: "2026-03-16",
    endDate: "2026-05-11",
    prUrl: "https://github.com/jadvix/harbour-portal/pull/104",
  },
];

/*
 * QC history for the seed, keyed by task. Anything not listed starts
 * unreviewed, which is what puts it in the checklist module's queue.
 *
 * `affected` records the KRA move as it stood at review time; the employee
 * scores above are already net of these.
 */
const seedReviews: Record<string, QcReview[]> = {
  // Signed off first time.
  "tsk-370": [
    {
      id: "qc-370-1",
      at: "2026-04-02",
      by: "Rahul Nair",
      verdict: "Approved",
      note: "Reconciliation report clean across all 41 batches. Signed off.",
      failedItemIds: [],
      pointsDeducted: 0,
      affected: [],
    },
  ],
  // Came back once with an error, was redone, then approved. This is the
  // history the task detail renders as a rework trail.
  "tsk-386": [
    {
      id: "qc-386-1",
      at: "2026-04-27",
      by: "Vishnu Prasad",
      verdict: "Error",
      note: "Replay from a cold start dropped 14 events. Marked as not satisfying.",
      failedItemIds: ["c3"],
      pointsDeducted: 2,
      affected: [{ employeeId: "emp-meera", from: 101, to: 99 }],
    },
    {
      id: "qc-386-2",
      at: "2026-05-11",
      by: "Vishnu Prasad",
      verdict: "Approved",
      note: "Re-tested from cold — no drops. Cleared.",
      failedItemIds: [],
      pointsDeducted: 0,
      affected: [],
    },
  ],
  // Sent back for corrections without a penalty, then cleared.
  "tsk-381": [
    {
      id: "qc-381-1",
      at: "2026-03-21",
      by: "Rahul Nair",
      verdict: "Corrections",
      note: "VAT line rounds to 2dp but the total rounds to 0dp. Cosmetic — no KRA impact.",
      failedItemIds: ["c2"],
      pointsDeducted: 0,
      affected: [],
    },
    {
      id: "qc-381-2",
      at: "2026-03-30",
      by: "Rahul Nair",
      verdict: "Approved",
      failedItemIds: [],
      pointsDeducted: 0,
      affected: [],
    },
  ],
};

/*
 * Defects QC has raised. They are ordinary tasks carrying an `origin`, so they
 * get an assignee, a checklist and a QC pass like any other work — Proposed
 * Bugs is a filtered view of these, not a separate list.
 */
const bugTasksSeed: Omit<Task, "qcReviews">[] = [
  {
    id: "tsk-501",
    taskId: "TSK-501",
    title: "Cart total ignores multi-currency rounding",
    description:
      "AED and SAR totals round down by a cent at checkout. Reproduced on staging build 218 with a three-item basket.",
    status: "In Progress",
    priority: 1,
    projectIds: ["prj-northwind"],
    assignedTo: ["emp-neha"],
    reportTo: ["emp-karthik", "emp-rahul"],
    createdBy: "Rahul Nair",
    createdAt: "2026-08-02",
    updatedBy: [],
    checklist: [
      { id: "c1", label: "Reproduced on a clean build", score: 1, points: 1 },
      { id: "c2", label: "Rounding corrected", score: 0.4, points: 3 },
      { id: "c3", label: "Regression case added", score: 0, points: 2 },
    ],
    startDate: "2026-08-02",
    endDate: "2026-08-08",
    origin: { kind: "qc-bug", severity: "Critical", raisedBy: "Rahul Nair", foundIn: "Staging build 218" },
  },
  {
    id: "tsk-502",
    taskId: "TSK-502",
    title: "Consignment filter resets on back navigation",
    description:
      "Applying a saved filter then using the browser back button clears it and reloads the unfiltered list.",
    status: "Backlog",
    priority: 2,
    projectIds: ["prj-harbour"],
    assignedTo: ["emp-divya"],
    reportTo: ["emp-meera", "emp-vishnu"],
    createdBy: "Vishnu Prasad",
    createdAt: "2026-08-03",
    updatedBy: [],
    checklist: [
      { id: "c1", label: "Filter state survives history navigation", score: 0, points: 2 },
      { id: "c2", label: "Covered by a browser test", score: 0, points: 1 },
    ],
    startDate: "2026-08-10",
    origin: { kind: "qc-bug", severity: "Major", raisedBy: "Vishnu Prasad", foundIn: "Chrome 141, macOS" },
  },
  {
    id: "tsk-503",
    taskId: "TSK-503",
    title: "Appointment slots off by one across a DST boundary",
    description:
      "Slots on the day the clocks change render an hour out for patients, and the clinician console disagrees with the app.",
    status: "In Review",
    priority: 1,
    projectIds: ["prj-lumen"],
    assignedTo: ["emp-joel", "emp-neha"],
    reportTo: ["emp-karthik", "emp-anjali"],
    createdBy: "Anjali Thomas",
    createdAt: "2026-07-28",
    updatedBy: [],
    checklist: [
      { id: "c1", label: "Slot generation moved to UTC", score: 1, points: 3 },
      { id: "c2", label: "Clinician console agrees with the app", score: 0.8, points: 2 },
      { id: "c3", label: "DST cases in the regression pack", score: 0.5, points: 3 },
    ],
    startDate: "2026-07-28",
    endDate: "2026-08-09",
    origin: { kind: "qc-bug", severity: "Critical", raisedBy: "Anjali Thomas", foundIn: "iOS 19 build 44" },
  },
  {
    id: "tsk-504",
    taskId: "TSK-504",
    title: "Chart legend overlaps the plot at 320px",
    description: "On the narrowest supported viewport the legend sits over the first two bars.",
    status: "New",
    priority: 4,
    projectIds: ["prj-orbit"],
    assignedTo: ["emp-arun"],
    reportTo: ["emp-meera", "emp-anjali"],
    createdBy: "Anjali Thomas",
    createdAt: "2026-08-04",
    updatedBy: [],
    checklist: [{ id: "c1", label: "Legend wraps below the plot under 360px", score: 0, points: 1 }],
    startDate: "2026-08-12",
    origin: { kind: "qc-bug", severity: "Minor", raisedBy: "Anjali Thomas", foundIn: "iPhone SE" },
  },
];

/** Tasks with their QC history attached. */
export const seedTasks: Task[] = [...baseTasks, ...bugTasksSeed].map((task) => ({
  ...task,
  qcReviews: seedReviews[task.id] ?? [],
}));

/*
 * Leave requests.
 *
 * `requestedAt` carries the clock, not just the date, because the short-notice
 * flag is measured in hours against midnight on the first day off. LV-004 is
 * deliberately inside 24 hours so the red warning has something to show.
 */
export const seedLeaveRequests: LeaveRequest[] = [
  {
    id: "lv-004",
    code: "LV-004",
    employeeId: "emp-arun",
    type: "Annual",
    from: "2026-08-05",
    to: "2026-08-09",
    days: 5,
    reason: "Family wedding in Thrissur — travelling the night before.",
    status: "Pending",
    requestedAt: "2026-08-04T09:15:00.000Z", // well under a day → short notice
    history: [
      {
        id: "lve-004-1",
        at: "2026-08-04T09:15:00.000Z",
        by: "Arun Varghese",
        action: "Raised",
        note: "Family wedding in Thrissur — travelling the night before.",
      },
    ],
  },
  {
    id: "lv-003",
    code: "LV-003",
    employeeId: "emp-vishnu",
    type: "Casual",
    from: "2026-08-11",
    to: "2026-08-12",
    days: 2,
    reason: "Moving flat.",
    status: "Pending",
    requestedAt: "2026-08-03T14:20:00.000Z", // over a week → in good time
    history: [
      {
        id: "lve-003-1",
        at: "2026-08-03T14:20:00.000Z",
        by: "Vishnu Prasad",
        action: "Raised",
        note: "Moving flat.",
      },
    ],
  },
  {
    id: "lv-002",
    code: "LV-002",
    employeeId: "emp-divya",
    type: "Sick",
    from: "2026-08-04",
    to: "2026-08-04",
    days: 1,
    reason: "Migraine, seeing the doctor this morning.",
    status: "Approved",
    requestedAt: "2026-08-04T07:40:00.000Z", // same day → short notice
    decidedAt: "2026-08-04T08:05:00.000Z",
    decidedBy: "Priya Raghavan",
    decisionNote: "Get well — no need to make the hours up.",
    history: [
      {
        id: "lve-002-1",
        at: "2026-08-04T07:40:00.000Z",
        by: "Divya Ramesh",
        action: "Raised",
        note: "Migraine, seeing the doctor this morning.",
      },
      {
        id: "lve-002-2",
        at: "2026-08-04T08:05:00.000Z",
        by: "Priya Raghavan",
        action: "Approved",
        note: "Get well — no need to make the hours up.",
      },
    ],
  },
  {
    id: "lv-001",
    code: "LV-001",
    employeeId: "emp-meera",
    type: "Annual",
    from: "2026-08-18",
    to: "2026-08-29",
    days: 10,
    reason: "Booked holiday.",
    status: "Approved",
    requestedAt: "2026-07-02T11:05:00.000Z",
    decidedAt: "2026-07-03T09:30:00.000Z",
    decidedBy: "Rohan Kurian",
    history: [
      {
        id: "lve-001-1",
        at: "2026-07-02T11:05:00.000Z",
        by: "Meera Krishnan",
        action: "Raised",
        note: "Booked holiday.",
      },
      { id: "lve-001-2", at: "2026-07-03T09:30:00.000Z", by: "Rohan Kurian", action: "Approved" },
    ],
  },
  {
    id: "lv-000",
    code: "LV-000",
    employeeId: "emp-neha",
    type: "Unpaid",
    from: "2026-07-01",
    to: "2026-07-03",
    days: 3,
    reason: "Personal.",
    status: "Rejected",
    requestedAt: "2026-06-30T18:10:00.000Z", // night before → short notice
    decidedAt: "2026-06-30T19:00:00.000Z",
    decidedBy: "Priya Raghavan",
    decisionNote: "Clashes with the Northwind cutover. Happy to approve the week after.",
    history: [
      {
        id: "lve-000-1",
        at: "2026-06-30T18:10:00.000Z",
        by: "Neha Iyer",
        action: "Raised",
        note: "Personal.",
      },
      {
        id: "lve-000-2",
        at: "2026-06-30T19:00:00.000Z",
        by: "Priya Raghavan",
        action: "Rejected",
        note: "Clashes with the Northwind cutover. Happy to approve the week after.",
      },
    ],
  },
];

/*
 * A few notifications already in people's inboxes, so the module is not empty
 * on a first visit. Everything after this is generated by the events
 * themselves — see notify() in StoreProvider.
 */
export const seedNotifications: Notification[] = [
  {
    id: "ntf-001",
    to: "emp-priya",
    kind: "leave-requested",
    title: "You have a leave request to review",
    detail:
      "Arun Varghese requested 5 days of Annual leave from 2026-08-05 — short notice.",
    at: "2026-08-04T09:15:00.000Z",
    read: false,
    leaveId: "lv-004",
  },
  {
    id: "ntf-002",
    to: "emp-rohan",
    kind: "leave-requested",
    title: "You have a leave request to review",
    detail: "Vishnu Prasad requested 2 days of Casual leave from 2026-08-11.",
    at: "2026-08-03T14:20:00.000Z",
    read: false,
    leaveId: "lv-003",
  },
  {
    id: "ntf-003",
    to: "emp-divya",
    kind: "leave-approved",
    title: "Your leave request was approved",
    detail:
      "LV-002 — 1 day of Sick leave from 2026-08-04, approved by Priya Raghavan. “Get well — no need to make the hours up.”",
    at: "2026-08-04T08:05:00.000Z",
    read: false,
    leaveId: "lv-002",
  },
  {
    id: "ntf-004",
    to: "emp-meera",
    kind: "qc-approved",
    title: "Your task was approved by QC",
    detail: "TSK-386 — TMS event stream ingestion passed review. “Re-tested from cold — no drops. Cleared.”",
    at: "2026-05-11T10:12:00.000Z",
    read: true,
    taskId: "tsk-386",
  },
  {
    id: "ntf-005",
    to: "emp-meera",
    kind: "qc-error",
    title: "QC marked errors on your task",
    detail:
      "TSK-386 — TMS event stream ingestion is back In Progress. 2 KRA points deducted. “Replay from a cold start dropped 14 events.”",
    at: "2026-04-27T15:44:00.000Z",
    read: true,
    taskId: "tsk-386",
  },
  {
    id: "ntf-006",
    to: "emp-neha",
    kind: "task-assigned",
    title: "Rahul Nair assigned a task to you",
    detail: "TSK-415 — Multi-currency rounding on the cart total",
    at: "2026-08-01T10:02:00.000Z",
    read: false,
    taskId: "tsk-415",
  },
  {
    id: "ntf-007",
    to: "emp-neha",
    kind: "leave-rejected",
    title: "Your leave request was rejected",
    detail:
      "LV-000 — 3 days of Unpaid leave from 2026-07-01, rejected by Priya Raghavan. “Clashes with the Northwind cutover. Happy to approve the week after.”",
    at: "2026-06-30T19:00:00.000Z",
    read: true,
    leaveId: "lv-000",
  },
];

/*
 * Attendance for the last working week.
 *
 * Built rather than listed: five days across the roster is 70-odd rows, and
 * the point of the data is the shape — most people in around nine, a couple of
 * late finishes, one person still clocked in today.
 */
function buildClock(): ClockEntry[] {
  const days = ["2026-07-29", "2026-07-30", "2026-07-31", "2026-08-03", "2026-08-04"];

  // Per-person rhythm, so the timesheet reads like people rather than noise.
  const rhythm: Record<string, { in: string; out: string; brk: number }> = {
    "emp-neha": { in: "09:04", out: "18:12", brk: 45 },
    "emp-divya": { in: "09:26", out: "18:40", brk: 50 },
    "emp-joel": { in: "08:52", out: "17:44", brk: 40 },
    "emp-fathima": { in: "09:10", out: "18:02", brk: 45 },
    "emp-karthik": { in: "08:45", out: "18:30", brk: 35 },
    "emp-meera": { in: "09:00", out: "18:55", brk: 40 },
    "emp-rahul": { in: "09:15", out: "18:05", brk: 45 },
    "emp-vishnu": { in: "09:35", out: "18:20", brk: 50 },
    "emp-anjali": { in: "09:20", out: "17:50", brk: 45 },
    "emp-priya": { in: "08:40", out: "18:35", brk: 30 },
    "emp-rohan": { in: "09:05", out: "18:25", brk: 40 },
    "emp-sneha": { in: "09:30", out: "18:10", brk: 45 },
    "emp-vikram": { in: "09:45", out: "18:00", brk: 60 },
    "emp-aarav": { in: "08:30", out: "18:15", brk: 35 },
    "emp-fazil": { in: "09:00", out: "17:30", brk: 45 },
  };

  const out: ClockEntry[] = [];
  for (const [employeeId, r] of Object.entries(rhythm)) {
    for (const date of days) {
      // Arun is on leave, so he has no attendance for the current week.
      if (employeeId === "emp-arun") continue;

      // Today's last row is left open for a couple of people, so the module
      // has a live "still clocked in" state to render.
      const stillIn = date === "2026-08-04" && (employeeId === "emp-neha" || employeeId === "emp-priya");

      const inAt = `${date}T${r.in}:00.000Z`;
      const outAt = stillIn ? undefined : `${date}T${r.out}:00.000Z`;
      const worked = outAt
        ? Math.round(
            (new Date(outAt).getTime() - new Date(inAt).getTime()) / 60000 - r.brk,
          )
        : 0;

      out.push({
        id: `clk-${employeeId.slice(4)}-${date}`,
        employeeId,
        date,
        inAt,
        outAt,
        breakMinutes: stillIn ? Math.round(r.brk / 2) : r.brk,
        status: stillIn ? "Running" : worked > 8 * 60 ? "Overtime" : "Complete",
      });
    }
  }
  return out;
}

export const seedClockEntries: ClockEntry[] = buildClock();

export function seedState(): StoreState {
  return {
    employees: seedEmployees.map((e) => ({ ...e })),
    projects: seedProjects.map((p) => ({ ...p })),
    tasks: seedTasks.map((t) => ({ ...t })),
    leaveRequests: seedLeaveRequests.map((l) => ({ ...l })),
    notifications: seedNotifications.map((n) => ({ ...n })),
    clockEntries: seedClockEntries.map((c) => ({ ...c })),
    clients: seedClients.map((c) => ({ ...c })),
    leads: seedLeads.map((l) => ({ ...l })),
    calendarEvents: seedCalendarEvents.map((c) => ({ ...c })),
    settings: { autoEmployeeId: true, defaultBranch: null },
  };
}
