"use client";

import { useActionState, useEffect, useRef } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";

const initialState: SubscribeState = { status: "idle" };

const PERKS = [
  "New equity research reports the day they publish",
  "Occasional market commentary and updates",
  "No spam, no promotions. Unsubscribe anytime",
];

export default function SubscribePage() {
  const [state, formAction, isPending] = useActionState(subscribe, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Clear the form after a successful signup.
  useEffect(() => {
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <main className="page">
      <div className="subscribe">
        <div className="subscribe__intro">
          <p className="eyebrow">Newsletter</p>
          <h1 className="page-title">Connect with Capital Notions</h1>
          <p className="page-intro">
            Sign up to receive every update and be notified whenever Capital
            Notions releases a new report. We respect your time and privacy.
          </p>

          <ul className="perks">
            {PERKS.map((perk) => (
              <li key={perk}>{perk}</li>
            ))}
          </ul>

          <p className="subscribe__contact">
            Want to reach the team directly? Email{" "}
            <a href="mailto:nolansnotions@gmail.com">nolansnotions@gmail.com</a>.
          </p>
        </div>

        <form ref={formRef} action={formAction} className="form-card">
          <div className="field-row">
            <div className="field">
              <label htmlFor="first_name">First name</label>
              <input id="first_name" name="first_name" autoComplete="given-name" />
            </div>
            <div className="field">
              <label htmlFor="last_name">Last name</label>
              <input id="last_name" name="last_name" autoComplete="family-name" />
            </div>
          </div>

          <div className="field">
            <label htmlFor="email">
              Email address <span className="field__req" aria-hidden="true">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="field">
            <label htmlFor="phone">
              Phone number <span className="field__opt">(optional)</span>
            </label>
            <input id="phone" type="tel" name="phone" autoComplete="tel" />
          </div>

          <button type="submit" className="button form-card__submit" disabled={isPending}>
            {isPending ? "Subscribing…" : "Subscribe"}
          </button>

          <p
            className={`form-message form-message--${state.status}`}
            role="status"
            aria-live="polite"
          >
            {state.status !== "idle" ? state.message : ""}
          </p>
        </form>
      </div>
    </main>
  );
}
