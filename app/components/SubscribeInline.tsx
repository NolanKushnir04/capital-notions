"use client";

import { useActionState, useEffect, useRef } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";

const initialState: SubscribeState = { status: "idle" };

/** Compact one-line email signup (uses the same Supabase action as /subscribe). */
export default function SubscribeInline() {
  const [state, formAction, isPending] = useActionState(subscribe, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <div>
      <form ref={formRef} action={formAction} className="inline-form">
        <label htmlFor="inline-email" className="sr-only">
          Email address
        </label>
        <input
          id="inline-email"
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          className="inline-form__input"
        />
        <button type="submit" className="button" disabled={isPending}>
          {isPending ? "Subscribing…" : "Subscribe"}
        </button>
      </form>

      <p
        className={`form-message form-message--${state.status}`}
        role="status"
        aria-live="polite"
      >
        {state.status !== "idle" ? state.message : ""}
      </p>
    </div>
  );
}
