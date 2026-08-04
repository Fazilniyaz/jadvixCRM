import {
  Wallet,
  Banknote,
  Receipt,
  TrendingDown,
  Download,
  Plus,
  CircleAlert,
  CheckCircle2,
  Clock3,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardBody,
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
  Chip,
  Grid,
  Progress,
  tone,
} from "@/components/ui";
import { payslips, invoices } from "@/lib/data/mock";

/* ================================================================= salary == */

export function Salary() {
  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile label="Payroll (Aug)" value="$486,240" hint="242 employees" t="blue" icon={Wallet} />
        <StatTile label="Net Payable" value="$412,880" hint="After deductions" t="sky" icon={Banknote} />
        <StatTile label="Deductions" value="$73,360" hint="Tax, PF and insurance" t="orange" icon={TrendingDown} />
        <StatTile label="On Hold" value="1" hint="Bank details pending" t="red" icon={CircleAlert} />
      </Grid>

      <Card>
        <CardHeader
          title="August 2026 Payroll"
          desc="Cut-off is 11 Aug. Payslips release on the 28th."
          action={
            <Toolbar>
              <SearchBox placeholder="Search payslips…" />
              <Button variant="ghost" icon={Download}>
                Export
              </Button>
              <Button icon={Plus}>Run Payroll</Button>
            </Toolbar>
          }
        />
        <TableWrap>
          <thead>
            <tr className="border-b border-line">
              <Th>Employee</Th>
              <Th>Payslip</Th>
              <Th>Gross</Th>
              <Th>Deductions</Th>
              <Th>Net Pay</Th>
              <Th>Status</Th>
            </tr>
          </thead>
          <tbody>
            {payslips.map((p) => (
              <Tr key={p.id}>
                <Td>
                  <div className="flex items-center gap-3">
                    <Avatar initials={p.initials} t={p.tone} size={36} />
                    <div>
                      <span className="block whitespace-nowrap font-semibold text-heading">
                        {p.name}
                      </span>
                      <span className="text-[0.75rem] text-muted">{p.role}</span>
                    </div>
                  </div>
                </Td>
                <Td className="whitespace-nowrap font-mono text-[0.75rem] text-muted">{p.id}</Td>
                <Td className="whitespace-nowrap">{p.gross}</Td>
                <Td className="whitespace-nowrap">
                  <span style={{ color: tone.red.text }}>−{p.deductions}</span>
                </Td>
                <Td className="whitespace-nowrap font-semibold text-heading">{p.net}</Td>
                <Td>
                  <StatusBadge status={p.status} />
                </Td>
              </Tr>
            ))}
          </tbody>
        </TableWrap>
      </Card>
    </div>
  );
}

/* =============================================================== payments == */

export function Payments() {
  const outstanding = invoices.filter((i) => i.status !== "Paid");
  const collected = invoices.filter((i) => i.status === "Paid");

  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile label="Collected (Q3)" value="$55,650" hint={`${collected.length} invoices settled`} t="sky" icon={CheckCircle2} />
        <StatTile label="Outstanding" value="$145,350" hint={`${outstanding.length} invoices open`} t="orange" icon={Clock3} />
        <StatTile label="Overdue" value="$18,750" hint="1 invoice, 23 days late" t="red" icon={CircleAlert} />
        <StatTile label="Avg. Days To Pay" value="26 d" hint="Terms are 30 days" t="blue" icon={Receipt} />
      </Grid>

      <div className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-8">
          <Card className="h-full">
            <CardHeader
              title="Invoices"
              desc="Everything raised this quarter."
              action={
                <Toolbar>
                  <Chip active>All</Chip>
                  <Chip>Unpaid</Chip>
                  <Button icon={Plus}>New Invoice</Button>
                </Toolbar>
              }
            />
            <TableWrap>
              <thead>
                <tr className="border-b border-line">
                  <Th>Invoice</Th>
                  <Th>Client</Th>
                  <Th>Issued</Th>
                  <Th>Due</Th>
                  <Th>Amount</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((inv) => (
                  <Tr key={inv.id}>
                    <Td>
                      <span className="block whitespace-nowrap font-mono text-[0.75rem] font-semibold text-heading">
                        {inv.id}
                      </span>
                      <span className="text-[0.6875rem] text-muted">{inv.method}</span>
                    </Td>
                    <Td className="whitespace-nowrap">{inv.client}</Td>
                    <Td className="whitespace-nowrap text-muted">{inv.issued}</Td>
                    <Td className="whitespace-nowrap text-muted">{inv.due}</Td>
                    <Td className="whitespace-nowrap font-semibold text-heading">{inv.amount}</Td>
                    <Td>
                      <StatusBadge status={inv.status} />
                    </Td>
                  </Tr>
                ))}
              </tbody>
            </TableWrap>
          </Card>
        </div>

        <div className="xl:col-span-4">
          <Card className="h-full">
            <CardHeader title="Collection Rate" desc="Share of invoiced value received." />
            <CardBody className="space-y-5">
              {[
                { label: "Northwind Ltd", pct: 100, t: "sky" as const },
                { label: "Lumen Health", pct: 64, t: "blue" as const },
                { label: "Kestrel Bank", pct: 38, t: "blue" as const },
                { label: "Harbour Logistics", pct: 12, t: "red" as const },
                { label: "Orbit Systems", pct: 0, t: "orange" as const },
              ].map((r) => (
                <div key={r.label}>
                  <div className="mb-1.5 flex items-center justify-between text-[0.8125rem]">
                    <span>{r.label}</span>
                    <span className="font-semibold text-heading">{r.pct}%</span>
                  </div>
                  <Progress value={r.pct} t={r.t} />
                </div>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
