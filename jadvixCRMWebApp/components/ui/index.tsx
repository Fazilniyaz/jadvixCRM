/*
 * Shared primitives. Every module composes these so the whole product reads as
 * one system — same card chrome, same badge shape, same table rhythm.
 * All colour comes from the Jadvix tokens in globals.css.
 */
import type { Tone } from "@/lib/data/mock";

/* Tints resolve through CSS variables so they follow the light/dark theme.
   `solid` and `text` use the contrast-safe shades; `soft` uses the raw logo
   hue at 12% as a wash. */
export const tone: Record<Tone, { soft: string; solid: string; text: string }> = {
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

/** Maps a free-text status onto a brand tone. Red stays reserved for genuinely
 *  bad states so it keeps its meaning. */
export function statusTone(status: string): Tone {
  const s = status.toLowerCase();
  if (/(overdue|rejected|delayed|critical|incident|hold|failed|open)/.test(s)) return "red";
  if (/(pending|at risk|awaiting|processing|degraded|major|notice|in review|triaged)/.test(s))
    return "orange";
  if (/(paid|approved|delivered|resolved|closed|operational|complete|won|done)/.test(s))
    return "sky";
  return "blue";
}

/* ------------------------------------------------------------------ card -- */

export function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-card border border-line bg-card text-text shadow-card ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  desc,
  action,
}: {
  title: string;
  desc?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line p-4 sm:p-5">
      <div className="min-w-0">
        <h3 className="text-[14px] font-bold uppercase text-heading">{title}</h3>
        {desc && <p className="mt-1 text-[13px] leading-snug text-muted">{desc}</p>}
      </div>
      {action}
    </div>
  );
}

export function CardBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`p-4 sm:p-5 ${className}`}>{children}</div>;
}

/* ------------------------------------------------------------- page head -- */

export function PageHead({
  title,
  blurb,
  actions,
}: {
  title: string;
  blurb?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        <h1 className="text-[1.125rem] font-semibold text-heading">{title}</h1>
        {blurb && <p className="mt-0.5 text-[13px] text-muted">{blurb}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/* --------------------------------------------------------------- badge -- */

export function Badge({ children, t }: { children: React.ReactNode; t: Tone }) {
  return (
    <span
      className="inline-block whitespace-nowrap rounded-sm px-[0.45em] pb-[0.25em] pt-[0.39em] text-[75%] font-medium leading-none"
      style={{ background: tone[t].soft, color: tone[t].text }}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return <Badge t={statusTone(status)}>{status}</Badge>;
}

/* -------------------------------------------------------------- avatar -- */

export function Avatar({
  initials,
  t = "blue",
  size = 42,
}: {
  initials: string;
  t?: Tone;
  size?: number;
}) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-avatar font-medium text-white"
      style={{
        background: tone[t].solid,
        width: size,
        height: size,
        fontSize: Math.max(10, Math.round(size * 0.31)),
      }}
    >
      {initials}
    </span>
  );
}

export function AvatarStack({ items }: { items: string[] }) {
  return (
    <span className="flex -space-x-2">
      {items.map((i, idx) => (
        <span
          key={i + idx}
          className="inline-flex h-7 w-7 items-center justify-center rounded-avatar text-[10px] font-medium text-white ring-2 ring-[var(--custom-white)]"
          style={{ background: tone[(["blue", "orange", "sky", "slate"] as Tone[])[idx % 4]].solid }}
        >
          {i}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------ progress -- */

export function Progress({ value, t = "blue" }: { value: number; t?: Tone }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded bg-light">
      <div
        className="h-full rounded transition-[width] duration-500"
        style={{ width: `${Math.min(Math.max(value, 0), 100)}%`, background: tone[t].solid }}
      />
    </div>
  );
}

/* ----------------------------------------------------------- stat tile -- */

export function StatTile({
  label,
  value,
  hint,
  t = "blue",
  icon: Icon,
}: {
  label: string;
  value: string;
  hint?: string;
  t?: Tone;
  icon?: React.ElementType;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted">
            {label}
          </p>
          <p className="mt-1.5 text-[1.375rem] font-bold leading-none text-heading">{value}</p>
          {hint && <p className="mt-1.5 text-[0.75rem] text-muted">{hint}</p>}
        </div>
        {Icon && (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-avatar"
            style={{ background: tone[t].soft, color: tone[t].text }}
          >
            <Icon size={18} />
          </span>
        )}
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------- table -- */

/** Horizontal scroll is kept on the wrapper so narrow screens never push the
 *  page itself sideways. */
export function TableWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[640px] text-[13px]">{children}</table>
    </div>
  );
}

export function Th({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <th
      className={`whitespace-nowrap px-4 py-3 text-left text-[0.6875rem] font-semibold uppercase tracking-wide text-muted sm:px-5 ${className}`}
    >
      {children}
    </th>
  );
}

export function Td({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <td className={`px-4 py-3 align-middle sm:px-5 ${className}`}>{children}</td>;
}

export function Tr({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b border-line transition-colors last:border-0 hover:bg-hover">
      {children}
    </tr>
  );
}

/* ------------------------------------------------------------- toolbar -- */

export function Toolbar({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-center gap-2">{children}</div>;
}

export function Button({
  children,
  variant = "primary",
  icon: Icon,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  icon?: React.ElementType;
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-[0.8125rem] font-medium transition-colors";
  const styles =
    variant === "primary"
      ? "bg-primary text-white hover:brightness-110"
      : "border border-line bg-card text-text hover:border-primary hover:text-primary";
  return (
    <button type="button" className={`${base} ${styles}`}>
      {Icon && <Icon size={15} />}
      {children}
    </button>
  );
}

export function SearchBox({ placeholder = "Search…" }: { placeholder?: string }) {
  return (
    <input
      type="search"
      placeholder={placeholder}
      className="h-9 w-full rounded-sm border border-input-border bg-form-bg px-3 text-[0.8125rem] text-text outline-none transition-colors placeholder:text-muted focus:border-primary sm:w-56"
    />
  );
}

export function Chip({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={`cursor-default rounded-sm px-2.5 py-1.5 text-[0.75rem] font-medium transition-colors ${
        active ? "bg-primary text-white" : "border border-line bg-card text-muted"
      }`}
    >
      {children}
    </span>
  );
}

/* ----------------------------------------------------------- empty note -- */

export function Hint({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-sm bg-subtle px-3 py-2 text-[0.75rem] text-muted">{children}</p>
  );
}

/* -------------------------------------------------------------- layout -- */

export function Grid({
  cols = 4,
  children,
}: {
  cols?: 2 | 3 | 4;
  children: React.ReactNode;
}) {
  const map = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  } as const;
  return <div className={`grid gap-4 ${map[cols]}`}>{children}</div>;
}
