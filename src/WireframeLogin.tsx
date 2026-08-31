// WF-01 — Login
// Low-fidelity wireframe · HaqDesk AI · BSc IT Final Year Project

// ─── Palette (greyscale only) ─────────────────────────────────────────────────
const C = {
  white: "#FFFFFF",
  bg: "#F5F5F5",
  lgrey: "#E0E0E0",
  mgrey: "#B0B0B0",
  dgrey: "#6B6B6B",
  black: "#1A1A1A",
  border: "#C4C4C4",
  inputBg: "#FAFAFA",
};

const WF_FONT = "'Plus Jakarta Sans', 'Arial', sans-serif";

// ─── Tiny wireframe icon sprites ──────────────────────────────────────────────
function WfEye() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.mgrey} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  );
}
function WfGoogle() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.dgrey} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
    </svg>
  );
}
function WfSun() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.dgrey} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M18.66 5.34l1.41-1.41"/>
    </svg>
  );
}
function WfCheck() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.dgrey} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}
function WfSpinner() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.mgrey} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: "spin 1s linear infinite", display: "inline-block" }}>
      <line x1="12" y1="2" x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="2" y1="12" x2="6" y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
    </svg>
  );
}
function WfAlert() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#1A1A1A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  );
}

// ─── Shared label chip ────────────────────────────────────────────────────────
function WfLabel({ text, pos }: { text: string; pos?: "tl" | "tr" | "bl" }) {
  const posStyle: React.CSSProperties =
    pos === "tr" ? { top: -9, right: 0 } :
    pos === "bl" ? { bottom: -9, left: 0 } :
    { top: -9, left: 0 };
  return (
    <span
      style={{
        position: "absolute",
        ...posStyle,
        fontSize: 9,
        fontFamily: WF_FONT,
        color: C.dgrey,
        background: C.white,
        padding: "0 3px",
        lineHeight: "14px",
        whiteSpace: "nowrap",
        letterSpacing: "0.04em",
      }}
    >
      {text}
    </span>
  );
}

// ─── Placeholder box ──────────────────────────────────────────────────────────
function PlaceholderBox({
  w, h, label, style = {}, cross = false,
}: {
  w?: number | string; h: number; label?: string; style?: React.CSSProperties; cross?: boolean;
}) {
  return (
    <div
      style={{
        width: w ?? "100%",
        height: h,
        background: C.lgrey,
        border: `1px solid ${C.border}`,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        flexShrink: 0,
        overflow: "hidden",
        ...style,
      }}
    >
      {cross && (
        <>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderTop: `1px solid ${C.border}`, transform: "rotate(0deg)" }} />
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
            <line x1="0" y1="0" x2="100%" y2="100%" stroke={C.border} strokeWidth="1" />
            <line x1="100%" y1="0" x2="0" y2="100%" stroke={C.border} strokeWidth="1" />
          </svg>
        </>
      )}
      {label && (
        <span style={{ fontSize: 9, fontFamily: WF_FONT, color: C.dgrey, letterSpacing: "0.04em", zIndex: 1, textAlign: "center", padding: "0 4px" }}>
          {label}
        </span>
      )}
    </div>
  );
}

// ─── Wireframe input ──────────────────────────────────────────────────────────
function WfInput({ label, placeholder, rightSlot, error }: {
  label: string; placeholder: string;
  rightSlot?: React.ReactNode;
  error?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <span style={{ fontSize: 11, fontFamily: WF_FONT, color: C.black, fontWeight: 500 }}>{label}</span>
      <div style={{ position: "relative" }}>
        <div
          style={{
            height: 36,
            background: C.inputBg,
            border: `1px solid ${error ? C.black : C.border}`,
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            paddingLeft: 10,
            paddingRight: rightSlot ? 34 : 10,
          }}
        >
          <span style={{ fontSize: 11, fontFamily: WF_FONT, color: C.mgrey }}>{placeholder}</span>
        </div>
        {rightSlot && (
          <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
            {rightSlot}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Single auth form ─────────────────────────────────────────────────────────
function AuthForm({ state }: { state: "default" | "loading" | "error" }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%" }}>
      {/* Error banner */}
      {state === "error" && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "8px 10px",
            border: `1px solid ${C.black}`,
            borderRadius: 3,
            background: C.lgrey,
          }}
        >
          <WfAlert />
          <span style={{ fontSize: 10, fontFamily: WF_FONT, color: C.black }}>
            Invalid email or password. Please try again.
          </span>
        </div>
      )}

      <WfInput label="Email Address" placeholder="user@example.com" error={state === "error"} />
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 11, fontFamily: WF_FONT, color: C.black, fontWeight: 500 }}>Password</span>
          <span style={{ fontSize: 10, fontFamily: WF_FONT, color: C.dgrey, textDecoration: "underline", cursor: "pointer" }}>Forgot password?</span>
        </div>
        <div style={{ position: "relative" }}>
          <div
            style={{
              height: 36,
              background: C.inputBg,
              border: `1px solid ${state === "error" ? C.black : C.border}`,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
              paddingRight: 34,
            }}
          >
            <span style={{ fontSize: 11, fontFamily: WF_FONT, color: C.mgrey }}>••••••••</span>
          </div>
          <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)" }}>
            <WfEye />
          </div>
        </div>
      </div>

      {/* Sign in button */}
      <div
        style={{
          height: 38,
          background: state === "loading" ? C.mgrey : C.black,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          cursor: state === "loading" ? "default" : "pointer",
        }}
      >
        {state === "loading" && <WfSpinner />}
        <span style={{ fontSize: 12, fontFamily: WF_FONT, color: C.white, fontWeight: 600, letterSpacing: "0.02em" }}>
          {state === "loading" ? "Signing in…" : "Sign in"}
        </span>
      </div>

      {/* OR separator */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, height: 1, background: C.lgrey }} />
        <span style={{ fontSize: 10, fontFamily: WF_FONT, color: C.mgrey }}>or</span>
        <div style={{ flex: 1, height: 1, background: C.lgrey }} />
      </div>

      {/* Google button */}
      <div
        style={{
          height: 36,
          border: `1px solid ${C.border}`,
          borderRadius: 3,
          background: C.white,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 7,
          cursor: "pointer",
        }}
      >
        <WfGoogle />
        <span style={{ fontSize: 11, fontFamily: WF_FONT, color: C.black, fontWeight: 500 }}>Continue with Google</span>
      </div>

      {/* Registration prompt */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5 }}>
        <span style={{ fontSize: 10, fontFamily: WF_FONT, color: C.dgrey }}>Don't have an account?</span>
        <span style={{ fontSize: 10, fontFamily: WF_FONT, color: C.black, fontWeight: 600, textDecoration: "underline", cursor: "pointer" }}>Create account</span>
      </div>
    </div>
  );
}

// ─── State card (small variation) ────────────────────────────────────────────
function StateCard({ title, state }: { title: string; state: "default" | "loading" | "error" }) {
  return (
    <div
      style={{
        border: `1px solid ${C.border}`,
        borderRadius: 3,
        background: C.white,
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 12,
        flex: 1,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, paddingBottom: 10, borderBottom: `1px solid ${C.lgrey}` }}>
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: C.mgrey }} />
        <span style={{ fontSize: 10, fontFamily: WF_FONT, color: C.dgrey, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" as const }}>
          {title}
        </span>
      </div>
      <AuthForm state={state} />
    </div>
  );
}

// ─── Main wireframe export ────────────────────────────────────────────────────
export default function WireframeLogin() {
  return (
    <div
      style={{
        background: C.bg,
        fontFamily: WF_FONT,
        minHeight: "100vh",
        padding: "32px 48px 48px",
      }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {/* ── Canvas header ─────────────────────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span
              style={{
                fontSize: 10, fontFamily: WF_FONT, fontWeight: 700,
                color: C.white, background: C.black,
                padding: "2px 8px", borderRadius: 2,
                letterSpacing: "0.08em", textTransform: "uppercase" as const,
              }}
            >
              WF-01
            </span>
            <span style={{ fontSize: 14, fontFamily: WF_FONT, fontWeight: 700, color: C.black, letterSpacing: "-0.01em" }}>
              Login
            </span>
          </div>
          <span style={{ fontSize: 10, fontFamily: WF_FONT, color: C.dgrey }}>
            Low-Fidelity Wireframe · HaqDesk AI · Desktop 1440 × 900 · Chapter 4.4 Interface Design
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", border: `1px solid ${C.mgrey}`, background: "transparent" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", border: `1px solid ${C.mgrey}`, background: "transparent" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", border: `1px solid ${C.mgrey}`, background: "transparent" }} />
          <span style={{ fontSize: 9, fontFamily: WF_FONT, color: C.mgrey, marginLeft: 4 }}>greyscale · no colour · no branding</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          PRIMARY FRAME — desktop 1440 × 900
      ══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          width: "100%",
          maxWidth: 1100,
          aspectRatio: "1440 / 900",
          border: `1.5px solid ${C.black}`,
          borderRadius: 4,
          background: C.white,
          display: "flex",
          overflow: "hidden",
          position: "relative",
          marginBottom: 8,
        }}
      >
        {/* Frame label */}
        <div
          style={{
            position: "absolute",
            top: -22,
            left: 0,
            fontSize: 9,
            fontFamily: WF_FONT,
            color: C.dgrey,
            letterSpacing: "0.04em",
          }}
        >
          Desktop frame · 1440 × 900 · Default state
        </div>

        {/* ── LEFT COLUMN · 52% ─────────────────────────────────────────── */}
        <div
          style={{
            width: "52%",
            borderRight: `1px solid ${C.border}`,
            background: C.lgrey,
            padding: "40px 44px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
            position: "relative",
          }}
        >
          {/* Column annotation */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              fontSize: 8,
              fontFamily: WF_FONT,
              color: C.mgrey,
              letterSpacing: "0.04em",
            }}
          >
            LEFT PANEL · 52% · Branding / Info
          </div>

          {/* Logo + wordmark area */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: `1.5px solid ${C.dgrey}`,
                  borderRadius: 4,
                  background: C.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 9, fontFamily: WF_FONT, color: C.dgrey, fontWeight: 700 }}>H</span>
              </div>
              <div style={{ position: "relative" }}>
                <WfLabel text="Logo / Wordmark area" />
                <PlaceholderBox w={140} h={18} label="HaqDesk AI" style={{ background: "transparent", border: `1px dashed ${C.mgrey}` }} />
              </div>
            </div>
            <div style={{ position: "relative", display: "inline-block" }}>
              <WfLabel text="Tagline label" />
              <PlaceholderBox w={200} h={16} label="AI-Powered Support Platform" style={{ background: "transparent", border: `1px dashed ${C.mgrey}` }} />
            </div>
          </div>

          {/* Main headline */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ position: "relative" }}>
              <WfLabel text="Main headline — H1" />
              <div style={{ border: `1px dashed ${C.mgrey}`, borderRadius: 2, padding: "6px 8px", background: "transparent" }}>
                <span style={{ fontSize: 18, fontFamily: WF_FONT, fontWeight: 700, color: C.black, lineHeight: 1.2 }}>
                  "Your customers deserve<br />faster answers."
                </span>
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <WfLabel text="Supporting description — body copy block" pos="bl" />
              <PlaceholderBox h={40} label="Description paragraph placeholder (2 lines)" style={{ background: C.white, opacity: 0.6, border: `1px dashed ${C.border}` }} />
            </div>
          </div>

          {/* Feature items */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ position: "relative" }}>
              <WfLabel text="Feature / value proposition list" />
              <div style={{ height: 1 }} />
            </div>
            {[
              "Unified multi-channel inbox",
              "AI-assisted response suggestions",
              "Real-time team collaboration",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 18,
                    height: 18,
                    border: `1px solid ${C.dgrey}`,
                    borderRadius: 2,
                    background: C.white,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <WfCheck />
                </div>
                <div style={{ position: "relative", flex: 1 }}>
                  <PlaceholderBox
                    h={22}
                    label={item}
                    style={{ background: "transparent", border: `1px dashed ${C.border}` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Stats cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ position: "relative" }}>
              <WfLabel text="Statistics / info cards (3 items)" />
              <div style={{ height: 1 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { stat: "[ Stat ]", label: "Support tickets resolved" },
                { stat: "[ Stat ]", label: "Average response time" },
                { stat: "[ Stat ]", label: "Customer satisfaction" },
              ].map((card, i) => (
                <div
                  key={i}
                  style={{
                    border: `1px solid ${C.border}`,
                    borderRadius: 3,
                    background: C.white,
                    padding: "12px 10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  <PlaceholderBox h={20} label={card.stat} style={{ background: C.lgrey, border: `1px solid ${C.border}` }} />
                  <span style={{ fontSize: 8, fontFamily: WF_FONT, color: C.dgrey, lineHeight: 1.3, textAlign: "center" }}>
                    {card.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Background filler to fill remaining vertical space */}
          <div style={{ flex: 1, position: "relative" }}>
            <PlaceholderBox h={80} label="[ Background fill / decorative area — not rendered in wireframe ]" cross style={{ opacity: 0.4 }} />
          </div>
        </div>

        {/* ── RIGHT COLUMN · 48% ────────────────────────────────────────── */}
        <div
          style={{
            width: "48%",
            background: C.white,
            padding: "36px 52px",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {/* Column annotation */}
          <div
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              fontSize: 8,
              fontFamily: WF_FONT,
              color: C.mgrey,
              letterSpacing: "0.04em",
            }}
          >
            RIGHT PANEL · 48% · Authentication Form
          </div>

          {/* Theme toggle — top right */}
          <div
            style={{
              position: "absolute",
              top: 18,
              right: 20,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <div style={{ position: "relative" }}>
              <WfLabel text="Theme toggle" pos="bl" />
              <div
                style={{
                  width: 32,
                  height: 32,
                  border: `1px solid ${C.border}`,
                  borderRadius: 3,
                  background: C.white,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <WfSun />
              </div>
            </div>
          </div>

          {/* Vertical centering wrapper */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 28 }}>
            {/* Welcome heading */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ position: "relative" }}>
                <WfLabel text="Welcome heading — H2" />
                <span style={{ fontSize: 22, fontFamily: WF_FONT, fontWeight: 700, color: C.black, letterSpacing: "-0.02em" }}>
                  Welcome back
                </span>
              </div>
              <div style={{ position: "relative" }}>
                <WfLabel text="Supporting text — body small" pos="bl" />
                <PlaceholderBox h={16} label="Short supporting subheading text" style={{ background: "transparent", border: `1px dashed ${C.border}`, maxWidth: 260 }} />
              </div>
            </div>

            {/* Form */}
            <AuthForm state="default" />
          </div>
        </div>
      </div>

      {/* Dimension label */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
        <div style={{ height: 1, background: C.border, flex: 1 }} />
        <span style={{ fontSize: 9, fontFamily: WF_FONT, color: C.mgrey }}>1440 px</span>
        <div style={{ height: 1, background: C.border, flex: 1 }} />
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          STATE VARIATIONS
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <div style={{ height: 1, background: C.border, width: 24 }} />
          <span style={{ fontSize: 10, fontFamily: WF_FONT, color: C.dgrey, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
            UI State Variations — Authentication Form only
          </span>
          <div style={{ height: 1, background: C.border, flex: 1 }} />
        </div>

        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          <StateCard title="Default state" state="default" />
          <StateCard title="Loading state — 'Signing in…'" state="loading" />
          <StateCard title="Error state — inline error message" state="error" />
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          RESPONSIVE ANNOTATION
      ══════════════════════════════════════════════════════════════════════ */}
      <div style={{ marginTop: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ height: 1, background: C.border, width: 24 }} />
          <span style={{ fontSize: 10, fontFamily: WF_FONT, color: C.dgrey, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
            Responsive Breakpoint Annotation
          </span>
          <div style={{ height: 1, background: C.border, flex: 1 }} />
        </div>

        <div
          style={{
            border: `1px solid ${C.border}`,
            borderRadius: 3,
            background: C.white,
            padding: "16px 20px",
            display: "flex",
            gap: 32,
            alignItems: "flex-start",
            maxWidth: 860,
          }}
        >
          {/* Desktop mini diagram */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 9, fontFamily: WF_FONT, color: C.mgrey, letterSpacing: "0.04em" }}>≥ Breakpoint</span>
            <div style={{ display: "flex", border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden", width: 120, height: 72 }}>
              <div style={{ flex: 52, background: C.lgrey, borderRight: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 7, fontFamily: WF_FONT, color: C.dgrey, writingMode: "vertical-rl" as const, letterSpacing: "0.04em" }}>Branding</span>
              </div>
              <div style={{ flex: 48, background: C.white, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 7, fontFamily: WF_FONT, color: C.dgrey, textAlign: "center", padding: 2, letterSpacing: "0.02em" }}>Auth Form</span>
              </div>
            </div>
            <span style={{ fontSize: 8, fontFamily: WF_FONT, color: C.dgrey }}>Two-column · 52% / 48%</span>
          </div>

          {/* Arrow */}
          <div style={{ display: "flex", alignItems: "center", paddingTop: 36 }}>
            <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
              <path d="M0 6h22M17 1l5 5-5 5" stroke={C.mgrey} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Mobile mini diagram */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 }}>
            <span style={{ fontSize: 9, fontFamily: WF_FONT, color: C.mgrey, letterSpacing: "0.04em" }}>{"< Breakpoint (e.g. < 1024px)"}</span>
            <div style={{ border: `1px solid ${C.border}`, borderRadius: 2, overflow: "hidden", width: 80, height: 72, background: C.white, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: 7, fontFamily: WF_FONT, color: C.dgrey, textAlign: "center", padding: 4, letterSpacing: "0.02em" }}>Auth Form only · full width</span>
            </div>
            <span style={{ fontSize: 8, fontFamily: WF_FONT, color: C.dgrey }}>Branding panel hidden</span>
          </div>

          {/* Text note */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                border: `1px solid ${C.border}`,
                borderLeft: `3px solid ${C.black}`,
                borderRadius: 2,
                padding: "10px 14px",
                background: C.bg,
              }}
            >
              <span style={{ fontSize: 11, fontFamily: WF_FONT, color: C.black, lineHeight: 1.6 }}>
                Below the large desktop breakpoint, the branding panel is hidden and the authentication form becomes full width.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 40,
          paddingTop: 16,
          borderTop: `1px solid ${C.lgrey}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontSize: 9, fontFamily: WF_FONT, color: C.mgrey }}>
          WF-01 — Login · Low-Fidelity Wireframe · HaqDesk AI · BSc IT Final Year Project
        </span>
        <span style={{ fontSize: 9, fontFamily: WF_FONT, color: C.mgrey }}>
          Greyscale only · structure & hierarchy only · not visual styling
        </span>
      </div>
    </div>
  );
}
