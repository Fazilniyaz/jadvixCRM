"use client";

import { useActionState, useState } from "react";
import { AlertCircle, Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { login, type LoginState } from "@/lib/actions";

export default function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  const [show, setShow] = useState(false);

  return (
    <form action={action} className="space-y-4" noValidate>
      <div>
        <label htmlFor="email" className="mb-1.5 block text-[0.8125rem] font-medium text-heading">
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          defaultValue="master@jadvix.com"
          placeholder="you@jadvix.com"
          className="h-11 w-full rounded-sm border border-input-border bg-form-bg px-3 text-[0.875rem] text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-[0.8125rem] font-medium text-heading"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={show ? "text" : "password"}
            autoComplete="current-password"
            defaultValue="master@123"
            placeholder="••••••••"
            className="h-11 w-full rounded-sm border border-input-border bg-form-bg px-3 pr-11 text-[0.875rem] text-text outline-none transition-colors placeholder:text-muted focus:border-primary"
          />
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            aria-label={show ? "Hide password" : "Show password"}
            className="absolute right-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-sm text-muted transition-colors hover:text-primary"
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      {state.error && (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-sm px-3 py-2 text-[0.8125rem]"
          style={{
            background: "rgba(var(--brand-red-rgb),0.12)",
            color: "rgb(var(--danger-rgb))",
          }}
        >
          <AlertCircle size={15} className="mt-px shrink-0" />
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="flex h-11 w-full items-center justify-center gap-2 rounded-sm bg-primary text-[0.875rem] font-semibold text-white transition-[filter] hover:brightness-110 disabled:opacity-70"
      >
        {pending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Signing in…
          </>
        ) : (
          <>
            <LogIn size={16} />
            Sign in
          </>
        )}
      </button>
    </form>
  );
}
