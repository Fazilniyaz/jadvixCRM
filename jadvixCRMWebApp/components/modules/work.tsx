import { Paperclip, Send, Search } from "lucide-react";
import { Card, Avatar, tone } from "@/components/ui";
import { threads, messages } from "@/lib/data/mock";

/*
 * Projects and Tasks used to live here as static views. They are now
 * store-backed CRUD modules in project-management.tsx and task-management.tsx;
 * what is left in this file is still demo-only.
 */

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
