import {
  ArrowUpCircle,
  ArrowDownCircle,
  MoreHorizontal,
  Boxes,
  ShoppingCart,
  Wallet,
  PiggyBank,
  Users,
  Star,
  MapPin,
} from "lucide-react";
import { Sparkline, AreaChart, Bars, Gauge } from "@/components/charts/Charts";
import {
  kpis,
  orderStatus,
  salesRevenue,
  recentCustomers,
  salesActivity,
  recentOrders,
  topCountries,
  recentEarnings,
} from "@/data/dashboard";

// Pin the locale: a bare toLocaleString() follows the runtime locale, which both
// renders 1,20,750 instead of 120,750 here and can desync server/client markup.
const num = (n: number) => n.toLocaleString("en-US");

const iconMap: Record<string, React.ElementType> = {
  Boxes,
  ShoppingCart,
  Wallet,
  PiggyBank,
  Users,
  Star,
};

/*
 * Tints are rgba() over the brand triplets rather than separate hex tokens,
 * so they follow the theme automatically.
 *   solid = filled surface carrying white text -> uses the text-safe shade
 *   text  = coloured type on a light surface    -> same text-safe shade
 *   soft  = 12% wash behind `text`              -> uses the raw logo hue
 * Only Jadvix hues appear here; there is no green or pink in the identity.
 */
type Tone = { soft: string; solid: string; text: string };
const tint: Record<string, Tone> = {
  blue: {
    soft: "rgba(var(--brand-blue-rgb),0.12)",
    solid: "rgb(var(--primary-rgb))",
    text: "rgb(var(--primary-rgb))",
  },
  sky: {
    soft: "rgba(var(--brand-blue-rgb),0.12)",
    solid: "rgb(var(--brand-blue-rgb))",
    text: "rgb(var(--primary-rgb))",
  },
  orange: {
    soft: "rgba(var(--brand-orange-rgb),0.12)",
    solid: "rgb(var(--warning-rgb))",
    text: "rgb(var(--warning-rgb))",
  },
  red: {
    soft: "rgba(var(--brand-red-rgb),0.12)",
    solid: "rgb(var(--danger-rgb))",
    text: "rgb(var(--danger-rgb))",
  },
  slate: {
    soft: "rgba(var(--secondary-rgb),0.12)",
    solid: "rgb(var(--secondary-rgb))",
    text: "rgb(var(--secondary-rgb))",
  },
};

/* ---------- Card primitives (.card / .card-header / .card-title / .card-body) ---------- */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`h-full rounded-card border border-line bg-card text-text shadow-card ${className}`}
    >
      {children}
    </div>
  );
}

function CardHeader({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-line p-5">
      <div>
        <h4 className="text-[14px] font-bold uppercase text-heading">{title}</h4>
        {desc && <p className="mt-1 text-[13px] leading-snug text-muted normal-case">{desc}</p>}
      </div>
      <button className="shrink-0 text-muted transition-colors hover:text-primary">
        <MoreHorizontal size={16} />
      </button>
    </div>
  );
}

function CardBody({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`p-5 ${className}`}>{children}</div>;
}

/* ============ Sales cards (gradient, white text, flush sparkline) ============ */
function SalesCards() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {kpis.map((k) => (
        <div
          key={k.label}
          className={`overflow-hidden rounded-card shadow-card ${k.gradient}`}
        >
          <div className="px-3 pb-2 pt-3">
            <h6 className="mb-3 text-[0.75rem] font-medium text-fixed-white">{k.label}</h6>
            <div className="flex items-center">
              <div>
                <h4 className="mb-1 text-[1.25rem] font-bold text-fixed-white">{k.value}</h4>
                <p className="mb-0 text-[0.75rem] text-fixed-white opacity-70">{k.note}</p>
              </div>
              <span className="ms-auto flex items-center gap-1 text-fixed-white">
                {k.up ? <ArrowUpCircle size={15} /> : <ArrowDownCircle size={15} />}
                <span className="text-[0.8125rem] opacity-70">{k.delta}</span>
              </span>
            </div>
          </div>
          <Sparkline id={k.label.replace(/\s+/g, "")} data={k.spark} height={58} />
        </div>
      ))}
    </div>
  );
}

/* ============ Order status ============ */
function OrderStatus() {
  return (
    <Card>
      <CardHeader
        title="Order status"
        desc="Order Status and Tracking. Track your order from ship date to arrival."
      />
      <CardBody>
        <div className="flex flex-wrap gap-6">
          {orderStatus.totals.map((t) => (
            <div key={t.label} className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: t.color }} />
              <div>
                <span className="block text-[1.125rem] font-semibold text-heading">
                  {num(t.value)}
                </span>
                <span className="text-[13px] text-muted">{t.label}</span>
              </div>
            </div>
          ))}
        </div>
        {/* taller than it needs to be on its own, so the card fills the row
            height set by the Sales Revenue card beside it */}
        <div className="mt-4">
          <Bars series={orderStatus.series} labels={orderStatus.months} height={310} />
        </div>
      </CardBody>
    </Card>
  );
}

/* ============ Sales revenue ============ */
function SalesRevenue() {
  return (
    <Card>
      <CardHeader
        title="Sales Revenue by Customers in USA"
        desc="Sales Performance of all states in the United States."
      />
      <CardBody>
        <AreaChart data={salesRevenue.series} labels={salesRevenue.months} height={190} />
        <div className="mt-4 space-y-3">
          {salesRevenue.states.map((s) => (
            <div key={s.name}>
              <div className="mb-1 flex items-center justify-between text-[13px]">
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-primary" />
                  {s.name}
                </span>
                <span className="font-semibold text-heading">{s.value}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded bg-light">
                <div className="h-full rounded bg-primary" style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

/* ============ Recent customers ============ */
function RecentCustomers() {
  return (
    <Card>
      <CardHeader
        title="Recent Customers"
        desc="A customer is an individual or business that purchases the goods."
      />
      <ul className="divide-y divide-line">
        {recentCustomers.map((c) => (
          <li key={c.name} className="flex items-center gap-3 px-5 py-3">
            <span
              className="flex h-10.5 w-10.5 items-center justify-center rounded-avatar text-[13px] font-medium text-white"
              style={{ background: tint[c.tone].solid }}
            >
              {c.initials}
            </span>
            <div className="flex-1">
              <p className="text-[13px] font-semibold text-heading">{c.name}</p>
              <p className="text-[0.75rem] text-muted">User ID: {c.id}</p>
            </div>
            <span
              className="rounded-sm px-[0.45em] pb-[0.25em] pt-[0.39em] text-[75%] font-medium leading-none"
              style={{
                background: c.status === "Paid" ? tint.blue.soft : tint.orange.soft,
                color: c.status === "Paid" ? tint.blue.text : tint.orange.text,
              }}
            >
              {c.status}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

/* ============ Sales activity ============ */
function SalesActivity() {
  return (
    <Card>
      <CardHeader title="Sales Activity" desc="Tactics your team uses to hit its goals." />
      <CardBody className="space-y-4">
        {salesActivity.map((a) => {
          const Icon = iconMap[a.icon];
          const t = tint[a.color];
          return (
            <div key={a.title} className="flex items-center gap-3">
              <span
                className="flex h-10.5 w-10.5 items-center justify-center rounded-avatar"
                style={{ background: t.soft, color: t.text }}
              >
                <Icon size={18} />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] font-semibold text-heading">{a.title}</p>
                  <span className="text-[0.75rem] text-muted">{a.when}</span>
                </div>
                <p className="text-[0.75rem] text-muted">{a.detail}</p>
              </div>
            </div>
          );
        })}
      </CardBody>
    </Card>
  );
}

/* ============ Recent orders (gauge) ============ */
function RecentOrders() {
  const r = recentOrders;
  return (
    <Card>
      <CardHeader
        title="Recent Orders"
        desc="An order is an investor's instruction to buy or sell."
      />
      <CardBody className="flex flex-col items-center">
        <Gauge percent={r.deliveredPct}>
          <span className="text-[1.375rem] font-bold text-heading">{r.deliveredPct}%</span>
          <span className="mt-1 text-[0.75rem] text-muted">Delivered</span>
        </Gauge>
        <div className="mt-4 grid w-full grid-cols-2 gap-3">
          {[
            { k: "Delivered", v: num(r.delivered), c: "blue" },
            { k: "Cancelled", v: num(r.cancelled), c: "red" },
            { k: "Total Sales", v: r.totalSales, c: "sky" },
            { k: "Active Users", v: r.activeUsers, c: "orange" },
          ].map((s) => (
            <div key={s.k} className="rounded bg-subtle px-3 py-2">
              <p className="text-[0.75rem] text-muted">{s.k}</p>
              <p className="text-[0.875rem] font-bold" style={{ color: tint[s.c].text }}>
                {s.v}
              </p>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
}

/* ============ Top countries ============ */
const flag: Record<string, string> = {
  us: "🇺🇸",
  in: "🇮🇳",
  nl: "🇳🇱",
  gb: "🇬🇧",
  ca: "🇨🇦",
  au: "🇦🇺",
};

function TopCountries() {
  return (
    <Card>
      <CardHeader title="Your Top Countries" desc="Sales revenue by country." />
      <CardBody className="space-y-4">
        {topCountries.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <span className="text-xl leading-none">{flag[c.code]}</span>
            <div className="flex-1">
              <div className="mb-1 flex items-center justify-between text-[13px]">
                <span>{c.name}</span>
                <span className="font-semibold text-heading">{c.value}</span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded bg-light">
                <div className="h-full rounded bg-primary" style={{ width: `${c.pct}%` }} />
              </div>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}

/* ============ Recent earnings ============ */
function RecentEarnings() {
  return (
    <Card className="xl:col-span-2">
      <CardHeader
        title="Your Most Recent Earnings"
        desc="Most recent earnings for today's date."
      />
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead>
            <tr className="border-b border-line text-left text-[0.75rem] uppercase text-muted">
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Sales Count</th>
              <th className="px-5 py-3 font-semibold">Earnings</th>
              <th className="px-5 py-3 font-semibold">Tax Withheld</th>
            </tr>
          </thead>
          <tbody>
            {recentEarnings.map((e) => (
              <tr
                key={e.date}
                className="border-b border-line transition-colors last:border-0 hover:bg-hover"
              >
                <td className="px-5 py-3 font-medium text-heading">{e.date}</td>
                <td className="px-5 py-3">
                  <span
                    className="rounded-sm px-[0.45em] pb-[0.25em] pt-[0.39em] text-[75%] font-medium leading-none"
                    style={{ background: tint.blue.soft, color: tint.blue.text }}
                  >
                    {e.count}
                  </span>
                </td>
                <td className="px-5 py-3 font-semibold text-heading">{e.earnings}</td>
                <td className="px-5 py-3 font-semibold text-danger">{e.tax}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

/* ============ Compose ============ */
export default function Dashboard() {
  return (
    <div className="space-y-4">
      <SalesCards />

      {/* Valex splits this row 7 / 5 */}
      <div className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-7">
          <OrderStatus />
        </div>
        <div className="xl:col-span-5">
          <SalesRevenue />
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <RecentCustomers />
        <SalesActivity />
        <RecentOrders />
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <TopCountries />
        <RecentEarnings />
      </div>
    </div>
  );
}
