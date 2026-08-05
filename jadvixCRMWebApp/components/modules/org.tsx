import { Building2, GitBranch, Users, MapPin, Plus } from "lucide-react";
import {
  Card,
  CardHeader,
  StatusBadge,
  StatTile,
  TableWrap,
  Th,
  Td,
  Tr,
  Toolbar,
  Button,
  SearchBox,
  Grid,
  tone,
} from "@/components/ui";
import { companies } from "@/lib/data/mock";

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

