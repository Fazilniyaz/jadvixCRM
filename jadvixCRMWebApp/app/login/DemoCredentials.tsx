import { ArrowRight } from "lucide-react";
import { PORTALS } from "@/lib/portals";
import { loginAsDemo } from "@/lib/actions";

/**
 * Each row is its own form posting to a server action, so "open" works without
 * client JS and without ever putting the password in a query string.
 */
export default function DemoCredentials() {
  return (
    <ul className="space-y-2">
      {PORTALS.map((p) => (
        <li key={p.slug}>
          <form action={loginAsDemo}>
            <input type="hidden" name="portal" value={p.slug} />
            <button
              type="submit"
              className="group flex w-full items-center gap-3 rounded-sm border border-line bg-card p-3 text-left transition-colors hover:border-primary"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[0.8125rem] font-semibold text-heading">{p.name}</span>
                <span className="mt-0.5 block truncate font-mono text-[0.6875rem] text-muted">
                  {p.demo.email} · {p.demo.password}
                </span>
              </span>
              <ArrowRight
                size={15}
                className="shrink-0 text-muted transition-[color,transform] group-hover:translate-x-0.5 group-hover:text-primary"
              />
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
