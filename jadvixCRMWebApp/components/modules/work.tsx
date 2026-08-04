import {
  FolderKanban,
  CircleAlert,
  CheckCircle2,
  Timer,
  Plus,
  Filter,
  Paperclip,
  Send,
  Search,
  Bug as BugIcon,
  MessageSquare,
} from "lucide-react";
import {
  Card,
  CardHeader,
  Badge,
  StatusBadge,
  Avatar,
  AvatarStack,
  Progress,
  StatTile,
  TableWrap,
  Th,
  Td,
  Tr,
  Toolbar,
  Button,
  SearchBox,
  Chip,
  Grid,
  tone,
  statusTone,
} from "@/components/ui";
import { projects, taskBoard, bugs, queries, threads, messages } from "@/lib/data/mock";

/* ==================================================== project management == */

export function ProjectManagement() {
  const active = projects.filter((p) => p.status !== "Delivered").length;
  const atRisk = projects.filter((p) => p.status === "At Risk" || p.status === "Delayed").length;

  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile label="Active Projects" value={String(active)} hint="Across 6 clients" t="blue" icon={FolderKanban} />
        <StatTile label="At Risk" value={String(atRisk)} hint="Needs attention this week" t="orange" icon={CircleAlert} />
        <StatTile label="Delivered YTD" value="11" hint="3 ahead of target" t="sky" icon={CheckCircle2} />
        <StatTile label="Avg. Cycle" value="42 d" hint="Down from 51 d" t="slate" icon={Timer} />
      </Grid>

      <Card>
        <CardHeader
          title="All Projects"
          desc="Every engagement with its budget burn and delivery date."
          action={
            <Toolbar>
              <SearchBox placeholder="Search projects…" />
              <Button variant="ghost" icon={Filter}>
                Filter
              </Button>
              <Button icon={Plus}>New Project</Button>
            </Toolbar>
          }
        />
        <TableWrap>
          <thead>
            <tr className="border-b border-line">
              <Th>Project</Th>
              <Th>Client</Th>
              <Th>Status</Th>
              <Th className="w-44">Progress</Th>
              <Th>Budget / Spent</Th>
              <Th>Team</Th>
              <Th>Due</Th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <Tr key={p.id}>
                <Td>
                  <span className="block font-semibold text-heading">{p.name}</span>
                  <span className="text-[0.75rem] text-muted">{p.id}</span>
                </Td>
                <Td className="whitespace-nowrap">{p.client}</Td>
                <Td>
                  <StatusBadge status={p.status} />
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <Progress value={p.progress} t={p.tone} />
                    <span className="w-9 shrink-0 text-right text-[0.75rem] font-semibold text-heading">
                      {p.progress}%
                    </span>
                  </div>
                </Td>
                <Td className="whitespace-nowrap">
                  <span className="font-semibold text-heading">{p.spent}</span>
                  <span className="text-muted"> / {p.budget}</span>
                </Td>
                <Td>
                  <AvatarStack items={p.team} />
                </Td>
                <Td className="whitespace-nowrap text-muted">{p.due}</Td>
              </Tr>
            ))}
          </tbody>
        </TableWrap>
      </Card>
    </div>
  );
}

/* ======================================================= task management == */

export function TaskManagement() {
  return (
    <div className="space-y-4">
      <Toolbar>
        <SearchBox placeholder="Search tasks…" />
        <Chip active>All</Chip>
        <Chip>Mine</Chip>
        <Chip>High priority</Chip>
        <span className="ms-auto">
          <Button icon={Plus}>New Task</Button>
        </span>
      </Toolbar>

      {/* board scrolls horizontally on small screens rather than squashing */}
      <div className="-mx-1 overflow-x-auto px-1 pb-2">
        <div className="grid min-w-[880px] grid-cols-4 gap-4">
          {taskBoard.map((col) => (
            <section key={col.column} className="flex flex-col">
              <header className="mb-3 flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: tone[col.tone].solid }}
                />
                <h3 className="text-[0.8125rem] font-semibold text-heading">{col.column}</h3>
                <span className="rounded-sm bg-subtle px-1.5 py-0.5 text-[0.6875rem] font-semibold text-muted">
                  {col.items.length}
                </span>
              </header>

              <div className="space-y-3">
                {col.items.map((t) => (
                  <Card key={t.id} className="p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="font-mono text-[0.6875rem] text-muted">{t.id}</span>
                      <Badge
                        t={
                          t.priority === "High"
                            ? "red"
                            : t.priority === "Medium"
                              ? "orange"
                              : "slate"
                        }
                      >
                        {t.priority}
                      </Badge>
                    </div>
                    <p className="text-[0.8125rem] font-medium leading-snug text-heading">
                      {t.title}
                    </p>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="rounded-sm bg-subtle px-2 py-0.5 text-[0.6875rem] text-muted">
                        {t.tag}
                      </span>
                      <Avatar initials={t.assignee} size={26} t={col.tone} />
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ========================================================= proposed bugs == */

export function ProposedBugs() {
  const critical = bugs.filter((b) => b.severity === "Critical").length;
  const open = bugs.filter((b) => b.status !== "Closed").length;

  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile label="Open Defects" value={String(open)} hint="Awaiting fix or triage" t="orange" icon={BugIcon} />
        <StatTile label="Critical" value={String(critical)} hint="Blocking a release" t="red" icon={CircleAlert} />
        <StatTile label="Fixed This Week" value="14" hint="Up from 9 last week" t="sky" icon={CheckCircle2} />
        <StatTile label="Avg. Time To Fix" value="1.8 d" hint="Target is 2 days" t="blue" icon={Timer} />
      </Grid>

      <Card>
        <CardHeader
          title="Proposed Bugs"
          desc="Defects raised by QA and the field, newest first."
          action={
            <Toolbar>
              <SearchBox placeholder="Search defects…" />
              <Button icon={Plus}>Raise Bug</Button>
            </Toolbar>
          }
        />
        <TableWrap>
          <thead>
            <tr className="border-b border-line">
              <Th>ID</Th>
              <Th>Summary</Th>
              <Th>Project</Th>
              <Th>Severity</Th>
              <Th>Status</Th>
              <Th>Raised by</Th>
              <Th>Age</Th>
            </tr>
          </thead>
          <tbody>
            {bugs.map((b) => (
              <Tr key={b.id}>
                <Td className="whitespace-nowrap font-mono text-[0.75rem] text-muted">{b.id}</Td>
                <Td className="font-medium text-heading">{b.title}</Td>
                <Td className="whitespace-nowrap text-muted">{b.project}</Td>
                <Td>
                  <Badge
                    t={
                      b.severity === "Critical" ? "red" : b.severity === "Major" ? "orange" : "slate"
                    }
                  >
                    {b.severity}
                  </Badge>
                </Td>
                <Td>
                  <StatusBadge status={b.status} />
                </Td>
                <Td>
                  <Avatar initials={b.raisedBy} size={28} t="sky" />
                </Td>
                <Td className="whitespace-nowrap text-muted">{b.age}</Td>
              </Tr>
            ))}
          </tbody>
        </TableWrap>
      </Card>
    </div>
  );
}

/* =============================================================== queries == */

export function Queries() {
  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile label="Awaiting Reply" value="2" hint="Oldest is 1 day" t="red" icon={MessageSquare} />
        <StatTile label="In Progress" value="2" hint="Assigned to support" t="orange" icon={Timer} />
        <StatTile label="Resolved (7d)" value="23" hint="94% within SLA" t="sky" icon={CheckCircle2} />
        <StatTile label="Avg. First Response" value="38 m" hint="SLA is 2 hours" t="blue" icon={Send} />
      </Grid>

      <Card>
        <CardHeader
          title="Queries"
          desc="Questions raised through the portal, email and phone."
          action={
            <Toolbar>
              <Chip active>All</Chip>
              <Chip>Unanswered</Chip>
              <SearchBox placeholder="Search queries…" />
            </Toolbar>
          }
        />
        <ul className="divide-y divide-line">
          {queries.map((q) => (
            <li key={q.id} className="flex flex-wrap items-center gap-3 p-4 sm:flex-nowrap sm:px-5">
              <Avatar initials={q.initials} t={q.tone} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.8125rem] font-semibold text-heading">{q.subject}</p>
                <p className="mt-0.5 text-[0.75rem] text-muted">
                  {q.from} · {q.channel} · {q.received}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge t={q.priority === "High" ? "red" : q.priority === "Low" ? "slate" : "orange"}>
                  {q.priority}
                </Badge>
                <StatusBadge status={q.status} />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

/* ========================================================= communication == */

export function Communication() {
  return (
    <Card className="overflow-hidden">
      <div className="grid lg:grid-cols-[300px_1fr]">
        {/* thread list */}
        <aside className="border-b border-line lg:border-b-0 lg:border-r">
          <div className="border-b border-line p-4">
            <div className="relative">
              <Search
                size={15}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                placeholder="Search conversations…"
                className="h-9 w-full rounded-sm border border-input-border bg-form-bg pl-9 pr-3 text-[0.8125rem] text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
              />
            </div>
          </div>
          <ul className="max-h-[320px] divide-y divide-line overflow-y-auto lg:max-h-[560px]">
            {threads.map((t, i) => (
              <li key={t.id}>
                <div
                  className={`flex cursor-default items-center gap-3 p-3 transition-colors hover:bg-hover ${
                    i === 0 ? "bg-hover" : ""
                  }`}
                >
                  <Avatar initials={t.initials} t={t.tone} size={38} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-[0.8125rem] font-semibold text-heading">
                        {t.name}
                      </span>
                      <span className="shrink-0 text-[0.6875rem] text-muted">{t.time}</span>
                    </div>
                    <p className="mt-0.5 truncate text-[0.75rem] text-muted">{t.preview}</p>
                  </div>
                  {t.unread > 0 && (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[0.625rem] font-semibold text-white">
                      {t.unread}
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </aside>

        {/* thread */}
        <section className="flex min-h-[420px] flex-col">
          <header className="flex items-center gap-3 border-b border-line p-4">
            <Avatar initials="DN" t="blue" size={38} />
            <div className="min-w-0">
              <p className="truncate text-[0.875rem] font-semibold text-heading">
                Delivery — Northwind
              </p>
              <p className="text-[0.75rem] text-muted">Karthik, Rahul, Priya and 4 others</p>
            </div>
          </header>

          <div className="flex-1 space-y-4 overflow-y-auto bg-body/40 p-4 sm:p-5">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex max-w-[85%] gap-2.5 sm:max-w-[70%] ${
                  m.me ? "ms-auto flex-row-reverse" : ""
                }`}
              >
                <Avatar initials={m.initials} t={m.me ? "blue" : "slate"} size={30} />
                <div>
                  <div
                    className="rounded-card px-3 py-2 text-[0.8125rem] leading-relaxed"
                    style={
                      m.me
                        ? { background: tone.blue.solid, color: "#fff" }
                        : { background: "var(--custom-white)", border: "1px solid var(--default-border)" }
                    }
                  >
                    {m.body}
                  </div>
                  <p className={`mt-1 text-[0.6875rem] text-muted ${m.me ? "text-right" : ""}`}>
                    {m.me ? "You" : m.author} · {m.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <footer className="flex items-center gap-2 border-t border-line p-3">
            <button
              type="button"
              aria-label="Attach file"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:text-primary"
            >
              <Paperclip size={17} />
            </button>
            <input
              type="text"
              placeholder="Write a message…"
              className="h-9 min-w-0 flex-1 rounded-sm border border-input-border bg-form-bg px-3 text-[0.8125rem] text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
            />
            <button
              type="button"
              aria-label="Send"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-primary text-white transition-[filter] hover:brightness-110"
            >
              <Send size={16} />
            </button>
          </footer>
        </section>
      </div>
    </Card>
  );
}

/* Re-exported so the registry can reference a single symbol per module. */
export const _statusTone = statusTone;
