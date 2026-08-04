import {
  Target,
  Handshake,
  Building2,
  GitBranch,
  Plus,
  MapPin,
  TrendingUp,
  Users,
  Briefcase,
  Filter,
} from "lucide-react";
import {
  Card,
  CardHeader,
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
  SearchBox,
  Grid,
  Progress,
  tone,
} from "@/components/ui";
import { leadStages, clients, companies, branches } from "@/lib/data/mock";

/* ================================================================== leads == */

export function Leads() {
  const total = leadStages.reduce((n, s) => n + s.items.length, 0);

  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile label="Open Leads" value={String(total)} hint="Across 4 stages" t="blue" icon={Target} />
        <StatTile label="Pipeline Value" value="$592.9k" hint="Weighted: $274.1k" t="sky" icon={TrendingUp} />
        <StatTile label="Won This Quarter" value="1" hint="$305,000 booked" t="orange" icon={Handshake} />
        <StatTile label="Win Rate" value="31%" hint="Up 4 pts on last quarter" t="slate" icon={Briefcase} />
      </Grid>

      <div className="-mx-1 overflow-x-auto px-1 pb-2">
        <div className="grid min-w-[880px] grid-cols-4 gap-4">
          {leadStages.map((s) => (
            <section key={s.stage}>
              <header className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: tone[s.tone].solid }} />
                <h3 className="text-[0.8125rem] font-semibold text-heading">{s.stage}</h3>
                <span className="rounded-sm bg-subtle px-1.5 py-0.5 text-[0.6875rem] font-semibold text-muted">
                  {s.items.length}
                </span>
              </header>

              <div className="space-y-3">
                {s.items.map((l) => (
                  <Card key={l.id} className="p-3">
                    <div className="flex items-start gap-2.5">
                      <Avatar initials={l.initials} t={s.tone} size={32} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[0.8125rem] font-semibold text-heading">
                          {l.company}
                        </p>
                        <p className="truncate text-[0.6875rem] text-muted">{l.contact}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-[0.875rem] font-bold text-heading">{l.value}</span>
                      <Badge t={s.tone}>{l.source}</Badge>
                    </div>
                  </Card>
                ))}
                {s.items.length === 0 && (
                  <p className="rounded-card border border-dashed border-line p-4 text-center text-[0.75rem] text-muted">
                    Nothing here yet
                  </p>
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================ clients == */

export function Clients() {
  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile label="Active Clients" value="4" hint="Of 6 total accounts" t="blue" icon={Handshake} />
        <StatTile label="Lifetime Value" value="$1.24m" hint="Across all accounts" t="sky" icon={TrendingUp} />
        <StatTile label="Onboarding" value="1" hint="Kestrel Bank, week 2" t="orange" icon={Users} />
        <StatTile label="Dormant" value="1" hint="No activity in 9 months" t="slate" icon={Briefcase} />
      </Grid>

      <Grid cols={3}>
        {clients.map((c) => (
          <Card key={c.id} className="flex flex-col p-4">
            <div className="flex items-start gap-3">
              <Avatar initials={c.initials} t={c.tone} size={44} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[0.9375rem] font-semibold text-heading">{c.name}</p>
                <p className="truncate text-[0.75rem] text-muted">{c.industry}</p>
              </div>
              <StatusBadge status={c.status} />
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3">
              {[
                { k: "Projects", v: String(c.projects) },
                { k: "Value", v: c.value },
                { k: "Since", v: c.since },
              ].map((s) => (
                <div key={s.k}>
                  <dt className="text-[0.6875rem] text-muted">{s.k}</dt>
                  <dd className="mt-0.5 truncate text-[0.8125rem] font-bold text-heading">{s.v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-3 text-[0.75rem] text-muted">
              Primary contact · <span className="text-text">{c.contact}</span>
            </p>
          </Card>
        ))}
      </Grid>
    </div>
  );
}

/* ============================================================== companies == */

export function Companies() {
  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile label="Group Companies" value="4" hint="3 operating, 1 dormant" t="blue" icon={Building2} />
        <StatTile label="Total Branches" value="8" hint="Across 4 countries" t="sky" icon={GitBranch} />
        <StatTile label="Group Headcount" value="242" hint="Including contractors" t="orange" icon={Users} />
        <StatTile label="Jurisdictions" value="4" hint="UK, IN, AE, US" t="slate" icon={MapPin} />
      </Grid>

      <Card>
        <CardHeader
          title="Group Companies"
          desc="Legal entities operating under Jadvix LTD."
          action={
            <Toolbar>
              <SearchBox placeholder="Search companies…" />
              <Button icon={Plus}>Add Company</Button>
            </Toolbar>
          }
        />
        <TableWrap>
          <thead>
            <tr className="border-b border-line">
              <Th>Company</Th>
              <Th>Registration</Th>
              <Th>Country</Th>
              <Th>Branches</Th>
              <Th>Headcount</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <Tr key={c.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-avatar"
                      style={{ background: tone.blue.soft, color: tone.blue.text }}
                    >
                      <Building2 size={17} />
                    </span>
                    <span className="whitespace-nowrap font-semibold text-heading">{c.name}</span>
                  </div>
                </Td>
                <Td className="whitespace-nowrap font-mono text-[0.75rem] text-muted">{c.reg}</Td>
                <Td className="whitespace-nowrap">{c.country}</Td>
                <Td className="font-semibold text-heading">{c.branches}</Td>
                <Td className="font-semibold text-heading">{c.headcount}</Td>
                <Td>
                  <StatusBadge status={c.status} />
                </Td>
              </Tr>
            ))}
          </tbody>
        </TableWrap>
      </Card>
    </div>
  );
}

/* =============================================================== branches == */

export function Branches() {
  const max = Math.max(...branches.map((b) => b.headcount));

  return (
    <div className="space-y-4">
      <Toolbar>
        <SearchBox placeholder="Search branches…" />
        <Button variant="ghost" icon={Filter}>
          Filter
        </Button>
        <span className="ms-auto">
          <Button icon={Plus}>Add Branch</Button>
        </span>
      </Toolbar>

      <Grid cols={3}>
        {branches.map((b) => (
          <Card key={b.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-[0.9375rem] font-semibold text-heading">{b.name}</p>
                <p className="mt-0.5 flex items-center gap-1 truncate text-[0.75rem] text-muted">
                  <MapPin size={12} className="shrink-0" />
                  {b.city}
                </p>
              </div>
              <Badge t={b.tone}>{b.id}</Badge>
            </div>

            <p className="mt-3 text-[0.75rem] text-muted">{b.company}</p>

            <div className="mt-4 border-t border-line pt-3">
              <div className="mb-1.5 flex items-center justify-between text-[0.75rem]">
                <span className="text-muted">Headcount</span>
                <span className="font-bold text-heading">{b.headcount}</span>
              </div>
              <Progress value={(b.headcount / max) * 100} t={b.tone} />
            </div>

            <div className="mt-4 flex items-center gap-2.5">
              <Avatar initials={b.initials} t={b.tone} size={30} />
              <div className="min-w-0">
                <p className="truncate text-[0.75rem] font-medium text-heading">{b.lead}</p>
                <p className="text-[0.6875rem] text-muted">Branch lead</p>
              </div>
            </div>
          </Card>
        ))}
      </Grid>
    </div>
  );
}
