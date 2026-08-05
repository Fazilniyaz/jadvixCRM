"use client";

import { useMemo } from "react";
import { MapPin, Check, Building2, Users, Star, X } from "lucide-react";
import {
  Card,
  Badge,
  Avatar,
  Progress,
  StatTile,
  Button,
  Grid,
  ModuleSkeleton,
} from "@/components/ui";
import { useStore } from "@/lib/store/StoreProvider";
import {
  canSetDefaultBranch,
} from "@/lib/store/selectors";

import { branches as knownBranches } from "@/lib/data/mock";

/*
 * The two organisation views that had to become store-aware: Branches, because
 * pinning one re-scopes the whole workspace, and Clients, because a project now
 * belongs to a client account rather than just naming one.
 */

/* ------------------------------------------------------------- branches -- */

export function Branches() {
  const { hydrated, state, settings, setDefaultBranch, currentPortal } = useStore();
  const canPin = canSetDefaultBranch(currentPortal);

  // Headcount comes from the roster, not the static branch record — the number
  // has to agree with what Employee Management shows once a branch is pinned.
  const rows = useMemo(
    () =>
      knownBranches.map((b) => {
        const people = state.employees.filter((e) => e.branch === b.name);
        const ids = new Set(people.map((e) => e.id));
        return {
          ...b,
          people,
          headcount: people.length,
          projects: state.projects.filter(
            (p) => p.assignedEmployees.some((id) => ids.has(id)) || p.reportTo.some((id) => ids.has(id)),
          ).length,
        };
      }),
    [state],
  );

  if (!hydrated) return <ModuleSkeleton rows={4} />;

  const max = Math.max(1, ...rows.map((b) => b.headcount));
  const pinned = settings.defaultBranch;

  return (
    <div className="space-y-4">
      <Grid cols={4}>
        <StatTile
          label="Branches"
          value={String(rows.length)}
          hint="Across 4 countries"
          t="blue"
          icon={Building2}
        />
        <StatTile
          label="Group Headcount"
          value={String(state.employees.length)}
          hint="Everyone on the roster"
          t="sky"
          icon={Users}
        />
        <StatTile
          label="Largest Branch"
          value={rows.reduce((a, b) => (b.headcount > a.headcount ? b : a), rows[0])?.name ?? "—"}
          hint="By headcount"
          t="orange"
          icon={MapPin}
        />
        <StatTile
          label="Default Branch"
          value={pinned ?? "All"}
          hint={pinned ? "Workspace is scoped" : "Nothing pinned"}
          t={pinned ? "orange" : "slate"}
          icon={Star}
        />
      </Grid>

      {canPin && (
        <div className="flex flex-wrap items-center gap-2 rounded-sm bg-subtle p-3">
          <Star size={15} className="text-muted" />
          <p className="min-w-0 flex-1 text-[0.75rem] leading-relaxed text-muted">
            Setting a default branch scopes <strong>every module</strong> to that office — employee
            counts, projects, tasks, leave and attendance. It applies to this workspace, not just
            to you.
          </p>
          {pinned && (
            <Button variant="ghost" icon={X} onClick={() => setDefaultBranch(null)}>
              Clear
            </Button>
          )}
        </div>
      )}

      <Grid cols={3}>
        {rows.map((b) => {
          const isDefault = pinned === b.name;
          return (
            <Card
              key={b.id}
              // The pinned card is outlined rather than tinted, so the accent
              // stays available for status inside the card.
              className={`flex flex-col p-4 ${isDefault ? "ring-2 ring-primary" : ""}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-[0.9375rem] font-semibold text-heading">{b.name}</p>
                  <p className="mt-0.5 flex items-center gap-1 truncate text-[0.75rem] text-muted">
                    <MapPin size={12} className="shrink-0" />
                    {b.city}
                  </p>
                </div>
                {isDefault ? (
                  <Badge t="blue">Default</Badge>
                ) : (
                  <Badge t={b.tone}>{b.id}</Badge>
                )}
              </div>

              <p className="mt-3 text-[0.75rem] text-muted">{b.company}</p>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-line pt-3">
                <div>
                  <p className="text-[0.6875rem] text-muted">Headcount</p>
                  <p className="text-[1rem] font-bold text-heading">{b.headcount}</p>
                </div>
                <div>
                  <p className="text-[0.6875rem] text-muted">Projects</p>
                  <p className="text-[1rem] font-bold text-heading">{b.projects}</p>
                </div>
              </div>

              <div className="mt-3">
                <Progress value={(b.headcount / max) * 100} t={b.tone} />
              </div>

              <div className="mt-4 flex items-center gap-2.5">
                <Avatar initials={b.initials} t={b.tone} size={30} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[0.75rem] font-medium text-heading">{b.lead}</p>
                  <p className="text-[0.6875rem] text-muted">Branch lead</p>
                </div>
              </div>

              {canPin && (
                <div className="mt-4 border-t border-line pt-3">
                  {isDefault ? (
                    <Button variant="ghost" icon={X} onClick={() => setDefaultBranch(null)}>
                      Clear default
                    </Button>
                  ) : (
                    <Button icon={Check} onClick={() => setDefaultBranch(b.name)}>
                      Set as default
                    </Button>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </Grid>
    </div>
  );
}

