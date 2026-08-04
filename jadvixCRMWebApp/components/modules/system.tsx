import {
  Bell,
  BellRing,
  ChevronLeft,
  ChevronRight,
  Plus,
  Activity,
  Server,
  ShieldCheck,
  Gauge,
  CircleAlert,
  CheckCircle2,
  Bug as BugIcon,
  CalendarOff,
  CreditCard,
  ListChecks,
  MessageSquare,
  Settings as SettingsIcon,
  User,
  Lock,
  Palette,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  StatusBadge,
  Avatar,
  StatTile,
  TableWrap,
  Th,
  Td,
  Tr,
  Toolbar,
  Button,
  Chip,
  Grid,
  Progress,
  tone,
} from "@/components/ui";
import {
  calendarEvents,
  notifications,
  services,
  activityLog,
  resourceUse,
  type Tone,
} from "@/lib/data/mock";

/* =============================================================== calendar == */

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function Calendar() {
  // August 2026 starts on a Saturday; 31 days.
  const firstWeekday = 5; // 0 = Mon
  const daysInMonth = 31;
  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const eventsFor = (day: number) => calendarEvents.filter((e) => e.day === day);

  return (
    <div className="grid gap-4 xl:grid-cols-12">
      <div className="xl:col-span-8">
        <Card className="h-full">
          <CardHeader
            title="August 2026"
            desc="Releases, leave and company events."
            action={
              <Toolbar>
                <button
                  type="button"
                  aria-label="Previous month"
                  className="flex h-8 w-8 items-center justify-center rounded-sm border border-line text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronLeft size={15} />
                </button>
                <button
                  type="button"
                  aria-label="Next month"
                  className="flex h-8 w-8 items-center justify-center rounded-sm border border-line text-muted transition-colors hover:border-primary hover:text-primary"
                >
                  <ChevronRight size={15} />
                </button>
                <Button icon={Plus}>Event</Button>
              </Toolbar>
            }
          />
          <CardBody className="overflow-x-auto">
            <div className="min-w-[560px]">
              <div className="grid grid-cols-7 gap-1.5">
                {WEEKDAYS.map((d) => (
                  <div
                    key={d}
                    className="pb-2 text-center text-[0.6875rem] font-semibold uppercase tracking-wide text-muted"
                  >
                    {d}
                  </div>
                ))}
                {cells.map((day, i) => {
                  const evs = day ? eventsFor(day) : [];
                  const isToday = day === 4;
                  return (
                    <div
                      key={i}
                      className={`min-h-[84px] rounded-sm border p-1.5 transition-colors ${
                        day ? "border-line bg-card hover:bg-hover" : "border-transparent"
                      }`}
                    >
                      {day && (
                        <>
                          <span
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-[0.6875rem] font-semibold ${
                              isToday ? "bg-primary text-white" : "text-muted"
                            }`}
                          >
                            {day}
                          </span>
                          <div className="mt-1 space-y-1">
                            {evs.map((e) => (
                              <p
                                key={e.label}
                                className="truncate rounded-sm px-1.5 py-0.5 text-[0.625rem] font-medium leading-tight"
                                style={{ background: tone[e.tone].soft, color: tone[e.tone].text }}
                                title={e.label}
                              >
                                {e.label}
                              </p>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      <div className="xl:col-span-4">
        <Card className="h-full">
          <CardHeader title="Upcoming" desc="Next events on the calendar." />
          <ul className="divide-y divide-line">
            {calendarEvents.slice(0, 7).map((e) => (
              <li key={e.label} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                <span
                  className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-sm text-[0.625rem] font-semibold leading-none"
                  style={{ background: tone[e.tone].soft, color: tone[e.tone].text }}
                >
                  <span className="text-[0.875rem]">{e.day}</span>
                  <span className="mt-0.5 opacity-70">Aug</span>
                </span>
                <span className="min-w-0 flex-1 truncate text-[0.8125rem] text-heading">
                  {e.label}
                </span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

/* ========================================================== notifications == */

const KIND_ICON = {
  task: ListChecks,
  leave: CalendarOff,
  payment: CreditCard,
  bug: BugIcon,
  message: MessageSquare,
  system: Server,
} as const;

const KIND_TONE: Record<string, Tone> = {
  task: "blue",
  leave: "orange",
  payment: "sky",
  bug: "red",
  message: "blue",
  system: "slate",
};

export function Notifications() {
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile label="Unread" value={String(unread)} hint="Since yesterday" t="orange" icon={BellRing} />
        <StatTile label="Today" value="4" hint="3 need an action" t="blue" icon={Bell} />
        <StatTile label="Mentions" value="2" hint="In Delivery — Northwind" t="sky" icon={MessageSquare} />
        <StatTile label="Muted Threads" value="1" hint="QA Guild" t="slate" icon={CheckCircle2} />
      </Grid>

      <Card>
        <CardHeader
          title="Notifications"
          desc="Everything that needed your attention recently."
          action={
            <Toolbar>
              <Chip active>All</Chip>
              <Chip>Unread</Chip>
              <Button variant="ghost">Mark all read</Button>
            </Toolbar>
          }
        />
        <ul className="divide-y divide-line">
          {notifications.map((n) => {
            const Icon = KIND_ICON[n.kind];
            const t = KIND_TONE[n.kind];
            return (
              <li
                key={n.id}
                className={`flex gap-3 p-4 transition-colors hover:bg-hover sm:px-5 ${
                  n.unread ? "bg-subtle/50" : ""
                }`}
              >
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-avatar"
                  style={{ background: tone[t].soft, color: tone[t].text }}
                >
                  <Icon size={17} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-[0.8125rem] font-semibold text-heading">{n.title}</p>
                    <span className="shrink-0 whitespace-nowrap text-[0.6875rem] text-muted">
                      {n.time}
                    </span>
                  </div>
                  <p className="mt-0.5 text-[0.75rem] leading-relaxed text-muted">{n.detail}</p>
                </div>
                {n.unread && (
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />
                )}
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
}

/* ================================================================ monitor == */

export function Monitor() {
  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile label="Uptime (30d)" value="99.94%" hint="SLA is 99.9%" t="sky" icon={Activity} />
        <StatTile label="Services Up" value="3 / 5" hint="1 degraded, 1 incident" t="orange" icon={Server} />
        <StatTile label="Open Incidents" value="1" hint="Reporting batch timeout" t="red" icon={CircleAlert} />
        <StatTile label="Avg. Latency" value="181 ms" hint="p95 across services" t="blue" icon={Gauge} />
      </Grid>

      <div className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <Card className="h-full">
            <CardHeader title="Services" desc="Health of each platform component." />
            <TableWrap>
              <thead>
                <tr className="border-b border-line">
                  <Th>Service</Th>
                  <Th>Uptime</Th>
                  <Th>Latency</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <Tr key={s.name}>
                    <Td className="whitespace-nowrap font-medium text-heading">{s.name}</Td>
                    <Td className="font-mono text-[0.75rem]">{s.uptime}</Td>
                    <Td className="font-mono text-[0.75rem]">{s.latency}</Td>
                    <Td>
                      <StatusBadge status={s.status} />
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </TableWrap>
          </Card>
        </div>

        <div className="xl:col-span-5">
          <Card className="h-full">
            <CardHeader title="Resource Use" desc="Current utilisation on the primary cluster." />
            <CardBody className="space-y-5">
              {resourceUse.map((r) => (
                <div key={r.label}>
                  <div className="mb-1.5 flex items-center justify-between text-[0.8125rem]">
                    <span>{r.label}</span>
                    <span className="font-semibold text-heading">{r.value}%</span>
                  </div>
                  <Progress value={r.value} t={r.tone} />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader title="Activity Log" desc="Most recent platform events, newest first." />
        <ul className="divide-y divide-line">
          {activityLog.map((a, i) => (
            <li key={i} className="flex items-start gap-3 px-4 py-2.5 sm:px-5">
              <span className="w-16 shrink-0 font-mono text-[0.6875rem] text-muted">{a.time}</span>
              <span
                className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: tone[a.tone].solid }}
              />
              <span className="min-w-0 flex-1 text-[0.8125rem] leading-relaxed">{a.text}</span>
              <span className="hidden shrink-0 font-mono text-[0.6875rem] text-muted sm:block">
                {a.actor}
              </span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/* =============================================================== settings == */

function Field({
  label,
  value,
  type = "text",
  hint,
}: {
  label: string;
  value: string;
  type?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-[0.8125rem] font-medium text-heading">{label}</label>
      <input
        type={type}
        defaultValue={value}
        className="h-10 w-full rounded-sm border border-input-border bg-form-bg px-3 text-[0.8125rem] text-text outline-none transition-colors focus:border-primary"
      />
      {hint && <p className="mt-1 text-[0.6875rem] text-muted">{hint}</p>}
    </div>
  );
}

function Toggle({ label, desc, on = false }: { label: string; desc: string; on?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line py-3 last:border-0">
      <div className="min-w-0">
        <p className="text-[0.8125rem] font-medium text-heading">{label}</p>
        <p className="mt-0.5 text-[0.75rem] text-muted">{desc}</p>
      </div>
      <span
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${
          on ? "bg-primary" : "bg-light"
        }`}
        role="switch"
        aria-checked={on}
        aria-label={label}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-[left] ${
            on ? "left-[1.125rem]" : "left-0.5"
          }`}
        />
      </span>
    </div>
  );
}

export function Settings({
  user,
  role,
  accessEditor,
}: {
  user: string;
  role: string;
  /** Rendered above the profile cards for portals that can manage access. */
  accessEditor?: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      {accessEditor}

      <div className="grid gap-4 xl:grid-cols-12">
      <div className="xl:col-span-7 xl:space-y-4">
        <Card>
          <CardHeader title="Profile" desc="How you appear to the rest of the workspace." />
          <CardBody className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar
                initials={user
                  .split(" ")
                  .map((w) => w[0])
                  .slice(0, 2)
                  .join("")}
                t="blue"
                size={56}
              />
              <div>
                <Button variant="ghost">Change photo</Button>
                <p className="mt-1.5 text-[0.6875rem] text-muted">PNG or JPG, up to 2 MB.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" value={user} />
              <Field label="Job title" value={role} />
              <Field label="Email" value="you@jadvix.com" type="email" />
              <Field label="Phone" value="+44 20 7946 0812" />
            </div>
          </CardBody>
        </Card>

        <Card className="mt-4 xl:mt-0">
          <CardHeader title="Notifications" desc="Choose what reaches your inbox." />
          <CardBody className="py-1">
            <Toggle label="Task assignments" desc="When something is assigned to you." on />
            <Toggle label="Leave decisions" desc="Approvals and rejections on your requests." on />
            <Toggle label="Invoice activity" desc="When an invoice is raised or settled." />
            <Toggle label="Weekly digest" desc="A Monday summary of the week ahead." on />
          </CardBody>
        </Card>
      </div>

      <div className="mt-4 space-y-4 xl:col-span-5 xl:mt-0">
        <Card>
          <CardHeader title="Security" desc="Protect your account." />
          <CardBody className="space-y-4">
            <Field label="Current password" value="" type="password" />
            <Field
              label="New password"
              value=""
              type="password"
              hint="At least 12 characters, with a number and a symbol."
            />
            <div className="flex items-center justify-between rounded-sm bg-subtle p-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck size={17} style={{ color: tone.sky.text }} />
                <div>
                  <p className="text-[0.8125rem] font-medium text-heading">Two-factor auth</p>
                  <p className="text-[0.6875rem] text-muted">Enabled via authenticator app</p>
                </div>
              </div>
              <Badge t="sky">On</Badge>
            </div>
            <Button>Update password</Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader title="Workspace" desc="Defaults for this portal." />
          <CardBody className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Language" value="English (UK)" />
              <Field label="Time zone" value="GMT+05:30 — Kolkata" />
              <Field label="Date format" value="DD MMM YYYY" />
              <Field label="Currency" value="USD ($)" />
            </div>
            <div className="flex flex-wrap items-center gap-2 rounded-sm bg-subtle p-3">
              <Palette size={16} className="text-muted" />
              <p className="flex-1 text-[0.75rem] text-muted">
                Theme follows the toggle in the header.
              </p>
            </div>
          </CardBody>
        </Card>
        </div>
      </div>
    </div>
  );
}

export const _icons = { SettingsIcon, User, Lock };
