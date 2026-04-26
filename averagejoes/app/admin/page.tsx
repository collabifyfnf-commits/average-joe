"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/admin/dashboard");
  }

  const inputStyle = {
    width: "100%",
    background: "#111111",
    border: "1px solid #222",
    color: "#F5F5F5",
    padding: "12px 16px",
    fontSize: "0.95rem",
    fontFamily: "var(--font-dm-sans)",
    outline: "none",
    marginBottom: 16,
    transition: "border-color 150ms",
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0A0A0A",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          background: "#111111",
          border: "1px solid #222",
          padding: "40px 36px",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: "0.68rem",
            letterSpacing: "0.25em",
            color: "#4A6FFF",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          ADMIN PANEL
        </p>
        <h1
          style={{
            fontFamily: "var(--font-bebas)",
            fontSize: "2.2rem",
            letterSpacing: "0.06em",
            color: "#F5F5F5",
            marginBottom: 32,
          }}
        >
          AVERAGE JOE&apos;S GYM
        </h1>

        <form onSubmit={handleLogin}>
          <label
            style={{
              display: "block",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              color: "#9A9A9A",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#4A6FFF")}
            onBlur={(e) => (e.target.style.borderColor = "#222")}
          />

          <label
            style={{
              display: "block",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              color: "#9A9A9A",
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#4A6FFF")}
            onBlur={(e) => (e.target.style.borderColor = "#222")}
          />

          {error && (
            <p style={{ color: "#ff4444", fontSize: "0.8rem", marginBottom: 16 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#333" : "#4A6FFF",
              color: "#F5F5F5",
              padding: "13px 20px",
              fontFamily: "var(--font-bebas)",
              fontSize: "1.1rem",
              letterSpacing: "0.12em",
              border: "none",
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
              transition: "all 150ms",
              marginTop: 8,
            }}
          >
            {loading ? "SIGNING IN..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
}
