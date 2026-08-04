/*
 * Demo data for the Jadvix CRM portals. Deliberately hand-written rather than
 * generated so the tables read like a real workspace: uneven numbers, mixed
 * statuses, believable names and dates.
 *
 * Everything is static — there is no backend in this build.
 */

export type Tone = "blue" | "sky" | "orange" | "red" | "slate";

/* ---------------------------------------------------------------- people -- */

export type Employee = {
  id: string;
  name: string;
  initials: string;
  role: string;
  dept: "Engineering" | "Design" | "Quality" | "Sales" | "Operations";
  branch: string;
  email: string;
  status: "Active" | "On Leave" | "Notice";
  tone: Tone;
  joined: string;
};

export const employees: Employee[] = [
  { id: "JDX-014", name: "Neha Iyer", initials: "NI", role: "Software Engineer", dept: "Engineering", branch: "Kochi", email: "neha.iyer@jadvix.com", status: "Active", tone: "blue", joined: "12 Mar 2023" },
  { id: "JDX-021", name: "Karthik Suresh", initials: "KS", role: "Team Leader", dept: "Engineering", branch: "Kochi", email: "karthik.s@jadvix.com", status: "Active", tone: "orange", joined: "04 Jan 2022" },
  { id: "JDX-033", name: "Rahul Nair", initials: "RN", role: "QA Lead", dept: "Quality", branch: "Bengaluru", email: "rahul.nair@jadvix.com", status: "Active", tone: "sky" , joined: "27 Jun 2022" },
  { id: "JDX-040", name: "Priya Raghavan", initials: "PR", role: "Delivery Manager", dept: "Operations", branch: "Kochi", email: "priya.r@jadvix.com", status: "Active", tone: "slate", joined: "19 Sep 2021" },
  { id: "JDX-052", name: "Sneha Pillai", initials: "SP", role: "Sales Executive", dept: "Sales", branch: "Chennai", email: "sneha.p@jadvix.com", status: "Active", tone: "blue", joined: "02 Feb 2024" },
  { id: "JDX-058", name: "Arun Varghese", initials: "AV", role: "UI Designer", dept: "Design", branch: "Kochi", email: "arun.v@jadvix.com", status: "On Leave", tone: "orange", joined: "15 Nov 2023" },
  { id: "JDX-061", name: "Meera Krishnan", initials: "MK", role: "Backend Engineer", dept: "Engineering", branch: "Bengaluru", email: "meera.k@jadvix.com", status: "Active", tone: "sky", joined: "08 Aug 2023" },
  { id: "JDX-067", name: "Vishnu Prasad", initials: "VP", role: "QA Engineer", dept: "Quality", branch: "Chennai", email: "vishnu.p@jadvix.com", status: "Active", tone: "slate", joined: "21 Apr 2024" },
  { id: "JDX-072", name: "Aarav Menon", initials: "AM", role: "Super Administrator", dept: "Operations", branch: "Kochi", email: "aarav.m@jadvix.com", status: "Active", tone: "blue", joined: "30 May 2020" },
  { id: "JDX-079", name: "Divya Ramesh", initials: "DR", role: "Frontend Engineer", dept: "Engineering", branch: "Kochi", email: "divya.r@jadvix.com", status: "Notice", tone: "orange", joined: "11 Jul 2022" },
];

/* -------------------------------------------------------------- projects -- */

export type Project = {
  id: string;
  name: string;
  client: string;
  status: "On Track" | "At Risk" | "Delayed" | "Delivered";
  progress: number;
  budget: string;
  spent: string;
  due: string;
  team: string[];
  tone: Tone;
};

export const projects: Project[] = [
  { id: "PRJ-101", name: "Northwind Commerce Replatform", client: "Northwind Ltd", status: "On Track", progress: 72, budget: "$148,000", spent: "$96,400", due: "18 Sep 2026", team: ["NI", "KS", "AV"], tone: "blue" },
  { id: "PRJ-104", name: "Harbour Freight Portal", client: "Harbour Logistics", status: "At Risk", progress: 41, budget: "$92,500", spent: "$61,300", due: "02 Aug 2026", team: ["MK", "DR"], tone: "orange" },
  { id: "PRJ-107", name: "Lumen Health Mobile App", client: "Lumen Health", status: "On Track", progress: 88, budget: "$210,000", spent: "$171,900", due: "29 Aug 2026", team: ["NI", "RN", "VP"], tone: "blue" },
  { id: "PRJ-112", name: "Orbit Analytics Dashboard", client: "Orbit Systems", status: "Delayed", progress: 27, budget: "$64,000", spent: "$48,700", due: "14 Jul 2026", team: ["DR", "AV"], tone: "red" },
  { id: "PRJ-118", name: "Kestrel Payments Gateway", client: "Kestrel Bank", status: "On Track", progress: 55, budget: "$305,000", spent: "$142,000", due: "20 Nov 2026", team: ["MK", "KS", "NI"], tone: "sky" },
  { id: "PRJ-096", name: "Vantage CRM Migration", client: "Vantage Group", status: "Delivered", progress: 100, budget: "$78,000", spent: "$76,150", due: "30 Apr 2026", team: ["PR", "RN"], tone: "slate" },
];

/* ----------------------------------------------------------------- tasks -- */

export type Task = {
  id: string;
  title: string;
  project: string;
  assignee: string;
  priority: "High" | "Medium" | "Low";
  tag: string;
};

export const taskBoard: { column: string; tone: Tone; items: Task[] }[] = [
  {
    column: "Backlog",
    tone: "slate",
    items: [
      { id: "TSK-412", title: "Split checkout bundle to cut TTI", project: "PRJ-101", assignee: "DR", priority: "Medium", tag: "Performance" },
      { id: "TSK-418", title: "Draft data-retention policy copy", project: "PRJ-107", assignee: "PR", priority: "Low", tag: "Compliance" },
      { id: "TSK-421", title: "Audit unused Tailwind tokens", project: "PRJ-104", assignee: "AV", priority: "Low", tag: "Cleanup" },
    ],
  },
  {
    column: "In Progress",
    tone: "blue",
    items: [
      { id: "TSK-396", title: "Wire refund flow to payments API", project: "PRJ-118", assignee: "MK", priority: "High", tag: "Backend" },
      { id: "TSK-403", title: "Rebuild consignment tracking table", project: "PRJ-104", assignee: "NI", priority: "High", tag: "Frontend" },
      { id: "TSK-409", title: "Empty and error states for search", project: "PRJ-101", assignee: "AV", priority: "Medium", tag: "Design" },
    ],
  },
  {
    column: "In Review",
    tone: "orange",
    items: [
      { id: "TSK-388", title: "Session expiry banner", project: "PRJ-107", assignee: "KS", priority: "Medium", tag: "Frontend" },
      { id: "TSK-391", title: "Regression pack for appointments", project: "PRJ-107", assignee: "VP", priority: "High", tag: "QA" },
    ],
  },
  {
    column: "Done",
    tone: "sky",
    items: [
      { id: "TSK-370", title: "Migrate legacy contact records", project: "PRJ-096", assignee: "MK", priority: "High", tag: "Data" },
      { id: "TSK-377", title: "Two-factor enrolment screen", project: "PRJ-118", assignee: "NI", priority: "Medium", tag: "Security" },
      { id: "TSK-381", title: "Invoice PDF template", project: "PRJ-096", assignee: "DR", priority: "Low", tag: "Frontend" },
    ],
  },
];

/* ------------------------------------------------------------------ bugs -- */

export type Bug = {
  id: string;
  title: string;
  project: string;
  severity: "Critical" | "Major" | "Minor";
  status: "Open" | "Triaged" | "In Fix" | "Closed";
  raisedBy: string;
  age: string;
};

export const bugs: Bug[] = [
  { id: "BUG-2291", title: "Cart total ignores multi-currency rounding", project: "Northwind Commerce", severity: "Critical", status: "In Fix", raisedBy: "RN", age: "2h" },
  { id: "BUG-2288", title: "Consignment filter resets on back nav", project: "Harbour Freight", severity: "Major", status: "Triaged", raisedBy: "VP", age: "6h" },
  { id: "BUG-2284", title: "Appointment slots off by one on DST", project: "Lumen Health", severity: "Critical", status: "Open", raisedBy: "RN", age: "1d" },
  { id: "BUG-2279", title: "Chart legend overlaps on 320px", project: "Orbit Analytics", severity: "Minor", status: "Open", raisedBy: "AV", age: "1d" },
  { id: "BUG-2271", title: "Duplicate webhook on retry", project: "Kestrel Payments", severity: "Major", status: "In Fix", raisedBy: "MK", age: "3d" },
  { id: "BUG-2264", title: "Password reset email renders raw HTML", project: "Vantage CRM", severity: "Minor", status: "Closed", raisedBy: "VP", age: "5d" },
];

/* --------------------------------------------------------------- queries -- */

export type Query = {
  id: string;
  subject: string;
  from: string;
  initials: string;
  channel: "Email" | "Portal" | "Phone";
  priority: "High" | "Normal" | "Low";
  status: "Awaiting Reply" | "In Progress" | "Resolved";
  received: string;
  tone: Tone;
};

export const queries: Query[] = [
  { id: "QRY-881", subject: "Can we add a second billing contact?", from: "Daniel Fernandes", initials: "DF", channel: "Portal", priority: "Normal", status: "Awaiting Reply", received: "22 min ago", tone: "blue" },
  { id: "QRY-879", subject: "Invoice INV-2291 shows the wrong PO", from: "Ritu Malhotra", initials: "RM", channel: "Email", priority: "High", status: "In Progress", received: "1 hr ago", tone: "orange" },
  { id: "QRY-874", subject: "Request for staging environment access", from: "Samuel Barnes", initials: "SB", channel: "Portal", priority: "Normal", status: "In Progress", received: "3 hrs ago", tone: "sky" },
  { id: "QRY-870", subject: "Export is timing out on large date ranges", from: "Anita Desai", initials: "AD", channel: "Email", priority: "High", status: "Awaiting Reply", received: "Yesterday", tone: "red" },
  { id: "QRY-863", subject: "Clarification on the SLA response window", from: "Tom Whelan", initials: "TW", channel: "Phone", priority: "Low", status: "Resolved", received: "2 days ago", tone: "slate" },
];

/* ---------------------------------------------------------- conversation -- */

export type Thread = {
  id: string;
  name: string;
  initials: string;
  preview: string;
  time: string;
  unread: number;
  tone: Tone;
};

export const threads: Thread[] = [
  { id: "T1", name: "Delivery — Northwind", initials: "DN", preview: "Karthik: Staging is up, please retest the cart.", time: "09:41", unread: 3, tone: "blue" },
  { id: "T2", name: "Priya Raghavan", initials: "PR", preview: "Can you send the revised timeline before 4?", time: "09:12", unread: 1, tone: "slate" },
  { id: "T3", name: "QA Guild", initials: "QG", preview: "Rahul: Regression pack passed on build 218.", time: "Yesterday", unread: 0, tone: "sky" },
  { id: "T4", name: "Daniel Fernandes", initials: "DF", preview: "Thanks — that clears it up.", time: "Yesterday", unread: 0, tone: "orange" },
  { id: "T5", name: "Design Review", initials: "DR", preview: "Arun: New empty states in Figma.", time: "Mon", unread: 0, tone: "blue" },
];

export type Message = { id: string; author: string; initials: string; body: string; time: string; me?: boolean };

export const messages: Message[] = [
  { id: "M1", author: "Karthik Suresh", initials: "KS", body: "Staging is up with the cart rewrite. Rounding fix is in too.", time: "09:31" },
  { id: "M2", author: "You", initials: "ME", body: "Nice. Did the multi-currency case get covered in the regression pack?", time: "09:34", me: true },
  { id: "M3", author: "Rahul Nair", initials: "RN", body: "Added three cases this morning — GBP, AED and INR. Two passed, the AED one still rounds down by a cent.", time: "09:38" },
  { id: "M4", author: "Karthik Suresh", initials: "KS", body: "That'll be the banker's rounding. I'll patch it and push before lunch.", time: "09:41" },
  { id: "M5", author: "You", initials: "ME", body: "Great — ping me when it's on staging and I'll walk the client through it.", time: "09:42", me: true },
];

/* ----------------------------------------------------------------- leave -- */

export type LeaveRequest = {
  id: string;
  name: string;
  initials: string;
  type: "Annual" | "Sick" | "Casual" | "Unpaid";
  from: string;
  to: string;
  days: number;
  status: "Pending" | "Approved" | "Rejected";
  tone: Tone;
};

export const leaveRequests: LeaveRequest[] = [
  { id: "LV-311", name: "Arun Varghese", initials: "AV", type: "Annual", from: "05 Aug", to: "09 Aug", days: 5, status: "Pending", tone: "orange" },
  { id: "LV-309", name: "Divya Ramesh", initials: "DR", type: "Sick", from: "04 Aug", to: "04 Aug", days: 1, status: "Approved", tone: "blue" },
  { id: "LV-306", name: "Vishnu Prasad", initials: "VP", type: "Casual", from: "11 Aug", to: "12 Aug", days: 2, status: "Pending", tone: "slate" },
  { id: "LV-301", name: "Meera Krishnan", initials: "MK", type: "Annual", from: "18 Aug", to: "29 Aug", days: 10, status: "Approved", tone: "sky" },
  { id: "LV-297", name: "Neha Iyer", initials: "NI", type: "Unpaid", from: "01 Jul", to: "03 Jul", days: 3, status: "Rejected", tone: "red" },
];

export const leaveBalance = [
  { label: "Annual", used: 8, total: 24, tone: "blue" as Tone },
  { label: "Sick", used: 3, total: 12, tone: "orange" as Tone },
  { label: "Casual", used: 5, total: 10, tone: "sky" as Tone },
  { label: "Unpaid", used: 0, total: 30, tone: "slate" as Tone },
];

/* ---------------------------------------------------------------- salary -- */

export type Payslip = {
  id: string;
  name: string;
  initials: string;
  role: string;
  gross: string;
  deductions: string;
  net: string;
  status: "Paid" | "Processing" | "Hold";
  tone: Tone;
};

export const payslips: Payslip[] = [
  { id: "PS-4401", name: "Neha Iyer", initials: "NI", role: "Software Engineer", gross: "$4,850.00", deductions: "$712.40", net: "$4,137.60", status: "Paid", tone: "blue" },
  { id: "PS-4402", name: "Karthik Suresh", initials: "KS", role: "Team Leader", gross: "$6,200.00", deductions: "$998.10", net: "$5,201.90", status: "Paid", tone: "orange" },
  { id: "PS-4403", name: "Rahul Nair", initials: "RN", role: "QA Lead", gross: "$5,400.00", deductions: "$824.60", net: "$4,575.40", status: "Processing", tone: "sky" },
  { id: "PS-4404", name: "Meera Krishnan", initials: "MK", role: "Backend Engineer", gross: "$5,050.00", deductions: "$761.25", net: "$4,288.75", status: "Paid", tone: "slate" },
  { id: "PS-4405", name: "Divya Ramesh", initials: "DR", role: "Frontend Engineer", gross: "$4,600.00", deductions: "$690.00", net: "$3,910.00", status: "Hold", tone: "red" },
];

/* -------------------------------------------------------------- payments -- */

export type Invoice = {
  id: string;
  client: string;
  issued: string;
  due: string;
  amount: string;
  status: "Paid" | "Pending" | "Overdue";
  method: string;
};

export const invoices: Invoice[] = [
  { id: "INV-2291", client: "Northwind Ltd", issued: "01 Jul 2026", due: "31 Jul 2026", amount: "$24,500.00", status: "Paid", method: "Bank transfer" },
  { id: "INV-2294", client: "Lumen Health", issued: "08 Jul 2026", due: "07 Aug 2026", amount: "$41,200.00", status: "Pending", method: "Bank transfer" },
  { id: "INV-2297", client: "Harbour Logistics", issued: "12 Jun 2026", due: "12 Jul 2026", amount: "$18,750.00", status: "Overdue", method: "Card" },
  { id: "INV-2301", client: "Kestrel Bank", issued: "19 Jul 2026", due: "18 Aug 2026", amount: "$76,000.00", status: "Pending", method: "Bank transfer" },
  { id: "INV-2305", client: "Orbit Systems", issued: "22 Jul 2026", due: "21 Aug 2026", amount: "$9,400.00", status: "Pending", method: "Card" },
  { id: "INV-2288", client: "Vantage Group", issued: "02 Jun 2026", due: "02 Jul 2026", amount: "$31,150.00", status: "Paid", method: "Bank transfer" },
];

/* ----------------------------------------------------------------- leads -- */

export type Lead = {
  id: string;
  company: string;
  contact: string;
  initials: string;
  value: string;
  owner: string;
  source: "Referral" | "Website" | "Outbound" | "Event";
  tone: Tone;
};

export const leadStages: { stage: string; tone: Tone; items: Lead[] }[] = [
  {
    stage: "New",
    tone: "slate",
    items: [
      { id: "LD-551", company: "Brightwave Media", contact: "Elena Voss", initials: "EV", value: "$18,000", owner: "SP", source: "Website", tone: "slate" },
      { id: "LD-554", company: "Ferro Manufacturing", contact: "Hugo Lindqvist", initials: "HL", value: "$46,500", owner: "SP", source: "Outbound", tone: "slate" },
    ],
  },
  {
    stage: "Qualified",
    tone: "blue",
    items: [
      { id: "LD-547", company: "Anchor Retail", contact: "Marcus Bell", initials: "MB", value: "$62,000", owner: "SP", source: "Referral", tone: "blue" },
      { id: "LD-549", company: "Pinecrest Schools", contact: "Grace Kim", initials: "GK", value: "$27,400", owner: "PR", source: "Event", tone: "blue" },
    ],
  },
  {
    stage: "Proposal",
    tone: "orange",
    items: [
      { id: "LD-541", company: "Solaris Energy", contact: "Yusuf Rahman", initials: "YR", value: "$134,000", owner: "SP", source: "Referral", tone: "orange" },
    ],
  },
  {
    stage: "Won",
    tone: "sky",
    items: [
      { id: "LD-532", company: "Kestrel Bank", contact: "Ritu Malhotra", initials: "RM", value: "$305,000", owner: "PR", source: "Outbound", tone: "sky" },
    ],
  },
];

/* --------------------------------------------------------------- clients -- */

export type Client = {
  id: string;
  name: string;
  contact: string;
  initials: string;
  industry: string;
  projects: number;
  value: string;
  since: string;
  status: "Active" | "Onboarding" | "Dormant";
  tone: Tone;
};

export const clients: Client[] = [
  { id: "CL-08", name: "Northwind Ltd", contact: "Daniel Fernandes", initials: "DF", industry: "Retail", projects: 3, value: "$412,000", since: "2021", status: "Active", tone: "blue" },
  { id: "CL-12", name: "Lumen Health", contact: "Anita Desai", initials: "AD", industry: "Healthcare", projects: 2, value: "$286,500", since: "2022", status: "Active", tone: "sky" },
  { id: "CL-15", name: "Harbour Logistics", contact: "Samuel Barnes", initials: "SB", industry: "Logistics", projects: 1, value: "$92,500", since: "2023", status: "Active", tone: "orange" },
  { id: "CL-19", name: "Kestrel Bank", contact: "Ritu Malhotra", initials: "RM", industry: "Financial", projects: 1, value: "$305,000", since: "2026", status: "Onboarding", tone: "slate" },
  { id: "CL-06", name: "Vantage Group", contact: "Tom Whelan", initials: "TW", industry: "Consulting", projects: 0, value: "$78,000", since: "2020", status: "Dormant", tone: "slate" },
  { id: "CL-21", name: "Orbit Systems", contact: "Leah Cortez", initials: "LC", industry: "Software", projects: 1, value: "$64,000", since: "2025", status: "Active", tone: "blue" },
];

/* ------------------------------------------------------------- companies -- */

export type Company = {
  id: string;
  name: string;
  reg: string;
  country: string;
  branches: number;
  headcount: number;
  status: "Operating" | "Dormant";
};

export const companies: Company[] = [
  { id: "CO-01", name: "Jadvix LTD", reg: "UK 09823411", country: "United Kingdom", branches: 3, headcount: 84, status: "Operating" },
  { id: "CO-02", name: "Jadvix Technologies Pvt Ltd", reg: "IN U72900KL", country: "India", branches: 3, headcount: 132, status: "Operating" },
  { id: "CO-03", name: "Jadvix Labs FZ-LLC", reg: "AE 2291884", country: "United Arab Emirates", branches: 1, headcount: 19, status: "Operating" },
  { id: "CO-04", name: "Jadvix Ventures Inc", reg: "US 84-2913746", country: "United States", branches: 1, headcount: 7, status: "Dormant" },
];

export type Branch = {
  id: string;
  name: string;
  company: string;
  city: string;
  lead: string;
  initials: string;
  headcount: number;
  tone: Tone;
};

export const branches: Branch[] = [
  { id: "BR-01", name: "Kochi HQ", company: "Jadvix Technologies", city: "Kochi, IN", lead: "Priya Raghavan", initials: "PR", headcount: 62, tone: "blue" },
  { id: "BR-02", name: "Bengaluru Studio", company: "Jadvix Technologies", city: "Bengaluru, IN", lead: "Rahul Nair", initials: "RN", headcount: 41, tone: "sky" },
  { id: "BR-03", name: "Chennai Sales", company: "Jadvix Technologies", city: "Chennai, IN", lead: "Sneha Pillai", initials: "SP", headcount: 29, tone: "orange" },
  { id: "BR-04", name: "London Office", company: "Jadvix LTD", city: "London, UK", lead: "Tom Whelan", initials: "TW", headcount: 34, tone: "slate" },
  { id: "BR-05", name: "Manchester Hub", company: "Jadvix LTD", city: "Manchester, UK", lead: "Grace Kim", initials: "GK", headcount: 22, tone: "blue" },
  { id: "BR-06", name: "Dubai Lab", company: "Jadvix Labs", city: "Dubai, AE", lead: "Yusuf Rahman", initials: "YR", headcount: 19, tone: "sky" },
];

/* --------------------------------------------------------- notifications -- */

export type Notification = {
  id: string;
  title: string;
  detail: string;
  time: string;
  kind: "task" | "leave" | "payment" | "bug" | "message" | "system";
  unread: boolean;
};

export const notifications: Notification[] = [
  { id: "N1", title: "BUG-2284 escalated to Critical", detail: "Rahul Nair raised the severity on Lumen Health appointment slots.", time: "12 min ago", kind: "bug", unread: true },
  { id: "N2", title: "Leave request awaiting your approval", detail: "Arun Varghese requested 5 days annual leave from 05 Aug.", time: "48 min ago", kind: "leave", unread: true },
  { id: "N3", title: "Invoice INV-2291 settled", detail: "Northwind Ltd paid $24,500.00 by bank transfer.", time: "2 hrs ago", kind: "payment", unread: true },
  { id: "N4", title: "TSK-403 moved to In Review", detail: "Neha Iyer finished the consignment tracking table.", time: "4 hrs ago", kind: "task", unread: false },
  { id: "N5", title: "New message in Delivery — Northwind", detail: "Karthik Suresh: Staging is up, please retest the cart.", time: "Yesterday", kind: "message", unread: false },
  { id: "N6", title: "Scheduled maintenance completed", detail: "Primary database failover test finished with no downtime.", time: "2 days ago", kind: "system", unread: false },
];

/* ------------------------------------------------------------- calendar -- */

export type CalEvent = { day: number; label: string; tone: Tone };

export const calendarEvents: CalEvent[] = [
  { day: 4, label: "Sprint 42 planning", tone: "blue" },
  { day: 5, label: "Arun on leave", tone: "orange" },
  { day: 7, label: "Northwind demo", tone: "sky" },
  { day: 11, label: "Payroll cut-off", tone: "slate" },
  { day: 12, label: "Kestrel kickoff", tone: "blue" },
  { day: 14, label: "Release 2.9", tone: "red" },
  { day: 18, label: "Meera on leave", tone: "orange" },
  { day: 21, label: "QA regression day", tone: "sky" },
  { day: 26, label: "All-hands", tone: "blue" },
  { day: 28, label: "Invoice run", tone: "slate" },
];

/* ---------------------------------------------------------------- clock -- */

export const timesheet = [
  { day: "Mon 28 Jul", inAt: "09:04", outAt: "18:12", hours: "8h 42m", status: "Complete" },
  { day: "Tue 29 Jul", inAt: "09:12", outAt: "18:31", hours: "8h 54m", status: "Complete" },
  { day: "Wed 30 Jul", inAt: "08:56", outAt: "17:48", hours: "8h 26m", status: "Complete" },
  { day: "Thu 31 Jul", inAt: "09:21", outAt: "19:02", hours: "9h 11m", status: "Overtime" },
  { day: "Fri 01 Aug", inAt: "09:08", outAt: "17:35", hours: "8h 02m", status: "Complete" },
  { day: "Mon 04 Aug", inAt: "09:02", outAt: "—", hours: "6h 18m", status: "Running" },
];

/* ---------------------------------------------------------- performance -- */

export const performance = [
  { name: "Neha Iyer", initials: "NI", tone: "blue" as Tone, delivered: 34, reopened: 1, onTime: 96, rating: 4.8 },
  { name: "Karthik Suresh", initials: "KS", tone: "orange" as Tone, delivered: 28, reopened: 2, onTime: 92, rating: 4.6 },
  { name: "Meera Krishnan", initials: "MK", tone: "sky" as Tone, delivered: 31, reopened: 0, onTime: 98, rating: 4.9 },
  { name: "Divya Ramesh", initials: "DR", tone: "slate" as Tone, delivered: 22, reopened: 4, onTime: 81, rating: 3.9 },
  { name: "Vishnu Prasad", initials: "VP", tone: "blue" as Tone, delivered: 26, reopened: 1, onTime: 94, rating: 4.5 },
  { name: "Arun Varghese", initials: "AV", tone: "orange" as Tone, delivered: 19, reopened: 2, onTime: 88, rating: 4.2 },
];

export const throughput = {
  months: ["Feb", "Mar", "Apr", "May", "Jun", "Jul"],
  series: [
    { name: "Delivered", color: "#4599d3", data: [38, 44, 41, 52, 49, 58] },
    { name: "Reopened", color: "#f05623", data: [6, 4, 7, 3, 5, 2] },
  ],
};

/* -------------------------------------------------------------- monitor -- */

export const services = [
  { name: "API Gateway", uptime: "99.98%", latency: "142 ms", status: "Operational" as const },
  { name: "Auth Service", uptime: "99.99%", latency: "88 ms", status: "Operational" as const },
  { name: "Payments Worker", uptime: "99.71%", latency: "410 ms", status: "Degraded" as const },
  { name: "Notification Queue", uptime: "99.95%", latency: "63 ms", status: "Operational" as const },
  { name: "Reporting Batch", uptime: "98.42%", latency: "1.8 s", status: "Incident" as const },
];

export const activityLog = [
  { time: "10:42:18", actor: "system", text: "Reporting batch retried after timeout (attempt 2 of 3)", tone: "red" as Tone },
  { time: "10:39:02", actor: "meera.k", text: "Deployed payments-worker v2.14.1 to production", tone: "blue" as Tone },
  { time: "10:31:55", actor: "system", text: "Payments worker latency above 400 ms threshold", tone: "orange" as Tone },
  { time: "10:12:40", actor: "aarav.m", text: "Granted staging access to samuel.barnes@harbour.co", tone: "slate" as Tone },
  { time: "09:58:11", actor: "system", text: "Nightly backup completed — 41.2 GB", tone: "sky" as Tone },
  { time: "09:44:07", actor: "karthik.s", text: "Rolled back northwind-web v3.7.0", tone: "orange" as Tone },
];

export const resourceUse = [
  { label: "CPU", value: 62, tone: "blue" as Tone },
  { label: "Memory", value: 74, tone: "sky" as Tone },
  { label: "Storage", value: 48, tone: "slate" as Tone },
  { label: "Queue depth", value: 88, tone: "orange" as Tone },
];
