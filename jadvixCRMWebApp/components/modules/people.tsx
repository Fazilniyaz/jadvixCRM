import {
  Users,
  UserPlus,
  UserMinus,
  CalendarOff,
  Star,
  TrendingUp,
  RotateCcw,
  LogIn,
  LogOut,
  Check,
  X,
  Filter,
  Download,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardBody,
  Badge,
  StatusBadge,
  Avatar,
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
} from "@/components/ui";
import { Bars } from "@/components/charts/Charts";
import {
  employees,
  performance,
  throughput,
  leaveRequests,
  leaveBalance,
  timesheet,
} from "@/lib/data/mock";

/* ==================================================== employee management == */

export function EmployeeManagement() {
  const onLeave = employees.filter((e) => e.status === "On Leave").length;
  const notice = employees.filter((e) => e.status === "Notice").length;

  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile label="Headcount" value="242" hint="Across 6 branches" t="blue" icon={Users} />
        <StatTile label="Joined This Month" value="7" hint="4 engineering, 3 sales" t="sky" icon={UserPlus} />
        <StatTile label="On Leave Today" value={String(onLeave)} hint="1 planned, 0 unplanned" t="orange" icon={CalendarOff} />
        <StatTile label="Serving Notice" value={String(notice)} hint="Last day 29 Aug" t="red" icon={UserMinus} />
      </Grid>

      <Card>
        <CardHeader
          title="Employee Directory"
          desc="Everyone on the roster with their department and branch."
          action={
            <Toolbar>
              <SearchBox placeholder="Search people…" />
              <Button variant="ghost" icon={Filter}>
                Filter
              </Button>
              <Button icon={UserPlus}>Add Employee</Button>
            </Toolbar>
          }
        />
        <TableWrap>
          <thead>
            <tr className="border-b border-line">
              <Th>Employee</Th>
              <Th>ID</Th>
              <Th>Role</Th>
              <Th>Department</Th>
              <Th>Branch</Th>
              <Th>Joined</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <Tr key={e.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar initials={e.initials} t={e.tone} size={36} />
                    <div className="min-w-0">
                      <span className="block whitespace-nowrap font-semibold text-heading">
                        {e.name}
                      </span>
                      <span className="block truncate text-[0.75rem] text-muted">{e.email}</span>
                    </div>
                  </div>
                </Td>
                <Td className="whitespace-nowrap font-mono text-[0.75rem] text-muted">{e.id}</Td>
                <Td className="whitespace-nowrap">{e.role}</Td>
                <Td className="whitespace-nowrap text-muted">{e.dept}</Td>
                <Td className="whitespace-nowrap text-muted">{e.branch}</Td>
                <Td className="whitespace-nowrap text-muted">{e.joined}</Td>
                <Td>
                  <StatusBadge status={e.status} />
                </Td>
              </Tr>
            ))}
          </tbody>
        </TableWrap>
      </Card>
    </div>
  );
}

/* ============================================================ performance == */

export function Performance() {
  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile label="Delivered (6 mo)" value="282" hint="Tickets closed" t="blue" icon={TrendingUp} />
        <StatTile label="Reopen Rate" value="3.4%" hint="Down from 5.1%" t="orange" icon={RotateCcw} />
        <StatTile label="On-Time Rate" value="92%" hint="Target is 90%" t="sky" icon={Check} />
        <StatTile label="Avg. Rating" value="4.5" hint="Across 6 reviewers" t="slate" icon={Star} />
      </Grid>

      <div className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <Card className="h-full">
            <CardHeader title="Throughput" desc="Delivered against reopened, last six months." />
            <CardBody>
              <Bars series={throughput.series} labels={throughput.months} height={280} />
              <div className="mt-3 flex flex-wrap gap-4">
                {throughput.series.map((s) => (
                  <span key={s.name} className="flex items-center gap-2 text-[0.75rem] text-muted">
                    <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                    {s.name}
                  </span>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="xl:col-span-5">
          <Card className="h-full">
            <CardHeader title="By Person" desc="Sorted by delivery volume this quarter." />
            <ul className="divide-y divide-line">
              {performance.map((p) => (
                <li key={p.name} className="flex items-center gap-3 px-4 py-3 sm:px-5">
                  <Avatar initials={p.initials} t={p.tone} size={36} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="truncate text-[0.8125rem] font-semibold text-heading">
                        {p.name}
                      </span>
                      <span className="flex shrink-0 items-center gap-1 text-[0.75rem] font-semibold text-heading">
                        <Star size={12} className="fill-warning text-warning" />
                        {p.rating}
                      </span>
                    </div>
                    <div className="mt-1.5">
                      <Progress value={p.onTime} t={p.tone} />
                    </div>
                    <p className="mt-1 text-[0.6875rem] text-muted">
                      {p.delivered} delivered · {p.reopened} reopened · {p.onTime}% on time
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ========================================================== leave requests == */

export function LeaveRequests() {
  return (
    <div className="space-y-4">
      <Grid cols={4}>
        {leaveBalance.map((b) => (
          <Card key={b.label} className="p-4">
            <div className="flex items-baseline justify-between">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">
                {b.label}
              </p>
              <p className="text-[0.75rem] text-muted">
                <span className="text-[1rem] font-bold text-heading">{b.total - b.used}</span> /{" "}
                {b.total}
              </p>
            </div>
            <div className="mt-3">
              <Progress value={(b.used / b.total) * 100} t={b.tone} />
            </div>
            <p className="mt-2 text-[0.6875rem] text-muted">{b.used} days taken</p>
          </Card>
        ))}
      </Grid>

      <Card>
        <CardHeader
          title="Leave Requests"
          desc="Pending requests need an approve or reject decision."
          action={
            <Toolbar>
              <Chip active>All</Chip>
              <Chip>Pending</Chip>
              <Button icon={CalendarOff}>Request Leave</Button>
            </Toolbar>
          }
        />
        <TableWrap>
          <thead>
            <tr className="border-b border-line">
              <Th>Employee</Th>
              <Th>Type</Th>
              <Th>From</Th>
              <Th>To</Th>
              <Th>Days</Th>
              <Th>Status</Th>
              <Th className="text-right">Action</Th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((l) => (
              <Tr key={l.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar initials={l.initials} t={l.tone} size={34} />
                    <div>
                      <span className="block whitespace-nowrap font-semibold text-heading">
                        {l.name}
                      </span>
                      <span className="font-mono text-[0.6875rem] text-muted">{l.id}</span>
                    </div>
                  </div>
                </Td>
                <Td className="whitespace-nowrap">{l.type}</Td>
                <Td className="whitespace-nowrap text-muted">{l.from}</Td>
                <Td className="whitespace-nowrap text-muted">{l.to}</Td>
                <Td className="font-semibold text-heading">{l.days}</Td>
                <Td>
                  <StatusBadge status={l.status} />
                </Td>
                <Td>
                  <div className="flex justify-end gap-1.5">
                    {l.status === "Pending" ? (
                      <>
                        <button
                          type="button"
                          aria-label={`Approve ${l.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-sm transition-[filter] hover:brightness-110"
                          style={{ background: tone.sky.soft, color: tone.sky.text }}
                        >
                          <Check size={15} />
                        </button>
                        <button
                          type="button"
                          aria-label={`Reject ${l.id}`}
                          className="flex h-8 w-8 items-center justify-center rounded-sm transition-[filter] hover:brightness-110"
                          style={{ background: tone.red.soft, color: tone.red.text }}
                        >
                          <X size={15} />
                        </button>
                      </>
                    ) : (
                      <span className="text-[0.75rem] text-muted">—</span>
                    )}
                  </div>
                </Td>
              </Tr>
            ))}
          </tbody>
        </TableWrap>
      </Card>
    </div>
  );
}

/* ================================================================== clock == */

export function Clock() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-12">
        {/* clock-in panel */}
        <div className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader title="Today" desc="Monday, 04 August 2026" />
            <CardBody className="text-center">
              <p className="font-mono text-[2.5rem] font-bold leading-none text-heading">06:18</p>
              <p className="mt-2 text-[0.8125rem] text-muted">Clocked in at 09:02</p>

              <div className="mt-5 flex gap-2">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-primary py-2.5 text-[0.8125rem] font-semibold text-white transition-[filter] hover:brightness-110"
                >
                  <LogIn size={15} />
                  Break
                </button>
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-sm py-2.5 text-[0.8125rem] font-semibold transition-[filter] hover:brightness-110"
                  style={{ background: tone.red.soft, color: tone.red.text }}
                >
                  <LogOut size={15} />
                  Clock Out
                </button>
              </div>

              <dl className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4 text-left">
                {[
                  { k: "This week", v: "43h 13m" },
                  { k: "Overtime", v: "1h 11m" },
                  { k: "Breaks", v: "48m" },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="text-[0.6875rem] text-muted">{s.k}</dt>
                    <dd className="mt-0.5 text-[0.875rem] font-bold text-heading">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </CardBody>
          </Card>
        </div>

        {/* timesheet */}
        <div className="lg:col-span-8">
          <Card className="h-full">
            <CardHeader
              title="Timesheet"
              desc="Your recorded hours for the current pay period."
              action={
                <Button variant="ghost" icon={Download}>
                  Export
                </Button>
              }
            />
            <TableWrap>
              <thead>
                <tr className="border-b border-line">
                  <Th>Day</Th>
                  <Th>Clock in</Th>
                  <Th>Clock out</Th>
                  <Th>Hours</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {timesheet.map((t) => (
                  <Tr key={t.day}>
                    <Td className="whitespace-nowrap font-medium text-heading">{t.day}</Td>
                    <Td className="font-mono text-[0.75rem]">{t.inAt}</Td>
                    <Td className="font-mono text-[0.75rem]">{t.outAt}</Td>
                    <Td className="whitespace-nowrap font-semibold text-heading">{t.hours}</Td>
                    <Td>
                      <Badge
                        t={
                          t.status === "Running"
                            ? "blue"
                            : t.status === "Overtime"
                              ? "orange"
                              : "sky"
                        }
                      >
                        {t.status}
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </TableWrap>
          </Card>
        </div>
      </div>
    </div>
  );
}
