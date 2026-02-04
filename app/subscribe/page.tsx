"use client";

import { useActionState } from "react";
import { subscribe, type SubscribeState } from "@/app/actions/subscribe";

const initialState: SubscribeState = { status: "idle" };

export default function SubscribePage() {
  const [state, formAction] = useActionState(subscribe, initialState);

  return (
    <main
      style={{
        maxWidth: 620,
        margin: "120px auto",
        padding: "0 16px",
        fontFamily: "Roboto, system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: 32 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 600,
            marginBottom: 16,
            letterSpacing: "-0.02em"
          }}
        >
          Connect with Capital Notions
        </h1>

        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            color: "#555"
          }}
        >
          We encourage you to sign up to Capital Notion's newsletter 
          with the form below to recieve all updates and be notified 
          whenever Capital Notions releases a new report. We respect 
          your time and privacy. No spam, no promotions. Unsubscribe anytime.
        </p>
      </header>

      {/* Form */}
      <form action={formAction}>
        <div style={{ display: "flex", gap: 12 }}>
          <input
            name="first_name"
            placeholder="First name"
            style={inputStyle}
          />
          <input
            name="last_name"
            placeholder="Last name"
            style={inputStyle}
          />
        </div>

        <input
          name="phone"
          placeholder="Phone number (optional)"
          style={{ ...inputStyle, marginTop: 12 }}
        />

        <input
          type="email"
          name="email"
          required
          placeholder="Email address"
          style={{ ...inputStyle, marginTop: 12 }}
        />

        <button type="submit" style={buttonStyle}>
          Subscribe
        </button>
      </form>

      <p
  style={{
    marginTop: 20,
    fontSize: 14,
    lineHeight: 1.6,
    color: "#667085"
  }}
>
  If you would like to reach out to the Capital Notion's team for 
  any reason at all, please send an email to the address at the bottom 
  of the page, or a text to the phone number.
</p>

      {/* Feedback */}
      {state.status === "success" && (
        <p style={{ marginTop: 16, color: "#1a7f37", fontSize: 14 }}>
          {state.message}
        </p>
      )}

      {state.status === "error" && (
        <p style={{ marginTop: 16, color: "#b42318", fontSize: 14 }}>
          {state.message}
        </p>
      )}
    </main>
  );
}

/* ---------- styles ---------- */

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  marginTop: -8,
  fontSize: 14,
  borderRadius: 6,
  border: "1px solid #d0d5dd",
  outline: "none"
};

const buttonStyle: React.CSSProperties = {
  width: "100%",
  marginTop: 20,
  padding: "11px 12px",
  fontSize: 14,
  fontWeight: 500,
  borderRadius: 6,
  border: "none",
  backgroundColor: "#111",
  color: "#fff",
  cursor: "pointer"
};
