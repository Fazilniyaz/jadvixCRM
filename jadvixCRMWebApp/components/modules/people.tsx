import { Star, TrendingUp, RotateCcw, Check } from "lucide-react";
import { Card, CardHeader, CardBody, Avatar, Progress, StatTile, Grid } from "@/components/ui";
import { Bars } from "@/components/charts/Charts";
import { performance, throughput } from "@/lib/data/mock";

/*
 * The employee directory moved to employee-management.tsx when it became a
 * store-backed CRUD module. What is left here is still demo-only.
 */

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

