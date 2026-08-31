import { useState } from "react";
import WireframeLogin from "./WireframeLogin";
import { WireframeHub, WireframeScreen, WIREFRAMES, type WireframeId } from "./WireframeScreens";

// ─── Icon primitives (Lucide-style outline SVGs) ─────────────────────────────
const Icon = {
  Search: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
    </svg>
  ),
  Eye: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/>
    </svg>
  ),
  ChevronDown: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  ),
  Bell: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  ),
  Settings: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Inbox: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
    </svg>
  ),
  MessageSquare: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
  Users: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  BookOpen: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  ),
  BarChart2: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" x2="18" y1="20" y2="10"/><line x1="12" x2="12" y1="20" y2="4"/><line x1="6" x2="6" y1="20" y2="14"/>
    </svg>
  ),
  Paperclip: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
    </svg>
  ),
  Smile: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/>
    </svg>
  ),
  Send: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>
    </svg>
  ),
  Mic: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/>
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  CheckCheck: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 7 17l-5-5"/><path d="m22 10-7.5 7.5L13 16"/>
    </svg>
  ),
  Sparkles: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    </svg>
  ),
  X: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
    </svg>
  ),
  Edit3: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
  ),
  Info: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
    </svg>
  ),
  AlertCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  WifiOff: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" x2="22" y1="2" y2="22"/><path d="M8.5 16.5a5 5 0 0 1 7 0"/><path d="M2 8.82a15 15 0 0 1 4.17-2.65"/><path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76"/><path d="M16.85 11.25a10 10 0 0 1 2.22 1.68"/><path d="M5 13a10 10 0 0 1 5.24-2.76"/><line x1="12" x2="12.01" y1="20" y2="20"/>
    </svg>
  ),
  Wifi: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" x2="12.01" y1="20" y2="20"/>
    </svg>
  ),
  Image: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
    </svg>
  ),
  Loader: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin">
      <line x1="12" x2="12" y1="2" y2="6"/><line x1="12" x2="12" y1="18" y2="22"/><line x1="4.93" x2="7.76" y1="4.93" y2="7.76"/><line x1="16.24" x2="19.07" y1="16.24" y2="19.07"/><line x1="2" x2="6" y1="12" y2="12"/><line x1="18" x2="22" y1="12" y2="12"/><line x1="4.93" x2="7.76" y1="19.07" y2="16.24"/><line x1="16.24" x2="19.07" y1="7.76" y2="4.93"/>
    </svg>
  ),
  InboxEmpty: () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
    </svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  ),
  User: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Instagram: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  ),
  Mail: () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Phone: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.99 12 19.79 19.79 0 0 1 1.93 3.4 2 2 0 0 1 3.9 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9A16 16 0 0 0 13 13.91l1.14-1.16a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 14.91z"/>
    </svg>
  ),
};

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px flex-1 bg-[#E2E8F0]" />
        <span
          className="text-[10px] font-semibold tracking-[0.18em] uppercase"
          style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#64748B" }}
        >
          {label}
        </span>
        <div className="h-px flex-1 bg-[#E2E8F0]" />
      </div>
      {children}
    </section>
  );
}

function SubGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <p className="text-[10px] font-semibold tracking-widest uppercase mb-4" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {label}
      </p>
      {children}
    </div>
  );
}

// ─── Channel badge ────────────────────────────────────────────────────────────
function ChannelBadge({ channel }: { channel: "facebook" | "instagram" | "gmail" }) {
  const cfg = {
    facebook: { bg: "#1877F2", icon: <Icon.Facebook />, label: "FB" },
    instagram: { bg: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", icon: <Icon.Instagram />, label: "IG" },
    gmail: { bg: "#EA4335", icon: <Icon.Mail />, label: "GM" },
  }[channel];
  return (
    <span
      className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-white border border-white"
      style={{ background: cfg.bg, fontSize: 7 }}
    >
      {cfg.icon}
    </span>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, size = 32, channel, className = "" }: { name: string; size?: number; channel?: "facebook" | "instagram" | "gmail"; className?: string }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const colors = ["#6D4AE2", "#0F9B72", "#D97706", "#0891B2", "#7C3AED"];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div className={`relative inline-flex flex-shrink-0 ${className}`} style={{ width: size, height: size }}>
      <div
        className="flex items-center justify-center rounded-full text-white font-semibold w-full h-full"
        style={{ background: colors[idx], fontSize: size * 0.35, fontFamily: "'Outfit', sans-serif" }}
      >
        {initials}
      </div>
      {channel && <ChannelBadge channel={channel} />}
    </div>
  );
}

// ─── Role badge ───────────────────────────────────────────────────────────────
function RoleBadge({ role }: { role: "Admin" | "Supervisor" | "Agent" }) {
  const cfg = {
    Admin: "bg-[#EDE9FE] text-[#6D4AE2]",
    Supervisor: "bg-[#DBEAFE] text-[#2563EB]",
    Agent: "bg-[#D1FAE5] text-[#065F46]",
  }[role];
  return (
    <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full ${cfg}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {role}
    </span>
  );
}

// ─── Status badge ─────────────────────────────────────────────────────────────
function StatusBadge({ status }: { status: "online" | "away" | "busy" | "offline" }) {
  const cfg = {
    online: { color: "#10B981", label: "Online" },
    away: { color: "#D97706", label: "Away" },
    busy: { color: "#DC2626", label: "Busy" },
    offline: { color: "#94A3B8", label: "Offline" },
  }[status];
  return (
    <span className="flex items-center gap-1.5 text-[11px]" style={{ color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
}

// ─── Priority badge ───────────────────────────────────────────────────────────
function PriorityBadge({ priority }: { priority: "High" | "Medium" | "Low" }) {
  const cfg = {
    High: "bg-[#FEE2E2] text-[#DC2626]",
    Medium: "bg-[#FEF3C7] text-[#D97706]",
    Low: "bg-[#D1FAE5] text-[#065F46]",
  }[priority];
  return (
    <span className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full ${cfg}`} style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {priority}
    </span>
  );
}

// ─── Sentiment badge ──────────────────────────────────────────────────────────
function SentimentBadge({ sentiment }: { sentiment: "Positive" | "Neutral" | "Negative" }) {
  const cfg = {
    Positive: { bg: "#D1FAE5", color: "#065F46", dot: "#10B981" },
    Neutral: { bg: "#F1F5F9", color: "#64748B", dot: "#94A3B8" },
    Negative: { bg: "#FEE2E2", color: "#DC2626", dot: "#DC2626" },
  }[sentiment];
  return (
    <span
      className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
      style={{ background: cfg.bg, color: cfg.color, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ background: cfg.dot }} />
      {sentiment}
    </span>
  );
}

// ─── Unread count badge ───────────────────────────────────────────────────────
function UnreadBadge({ count }: { count: number }) {
  return (
    <span
      className="flex items-center justify-center text-[10px] font-bold text-white rounded-full"
      style={{ background: "#6D4AE2", minWidth: 18, height: 18, padding: "0 5px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

// ─── Connected/disconnected badge ─────────────────────────────────────────────
function ConnectedBadge({ connected }: { connected: boolean }) {
  return (
    <span
      className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full"
      style={{
        background: connected ? "#D1FAE5" : "#FEE2E2",
        color: connected ? "#065F46" : "#DC2626",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {connected ? <Icon.Wifi /> : <Icon.WifiOff />}
      {connected ? "Connected" : "Disconnected"}
    </span>
  );
}

// ─── Toggle switch ────────────────────────────────────────────────────────────
function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className="relative flex-shrink-0 transition-colors duration-200 rounded-full cursor-pointer"
      style={{
        width: 40, height: 22,
        background: on ? "#6D4AE2" : "#CBD5E1",
        border: "none", padding: 0,
      }}
    >
      <span
        className="absolute top-[3px] rounded-full bg-white shadow-sm transition-transform duration-200"
        style={{ width: 16, height: 16, left: on ? 21 : 3, transform: "translateX(0)" }}
      />
    </button>
  );
}

// ─── Checkbox ─────────────────────────────────────────────────────────────────
function Checkbox({ checked, label }: { checked: boolean; label: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <span
        className="flex items-center justify-center rounded flex-shrink-0"
        style={{
          width: 16, height: 16,
          background: checked ? "#6D4AE2" : "transparent",
          border: checked ? "none" : "1.5px solid #CBD5E1",
        }}
      >
        {checked && <Icon.Check />}
      </span>
      <span className="text-sm" style={{ color: "#1E293B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
    </label>
  );
}

// ─── Radio ────────────────────────────────────────────────────────────────────
function Radio({ checked, label }: { checked: boolean; label: string }) {
  return (
    <label className="flex items-center gap-2.5 cursor-pointer select-none">
      <span
        className="flex items-center justify-center rounded-full flex-shrink-0"
        style={{
          width: 16, height: 16,
          border: checked ? "none" : "1.5px solid #CBD5E1",
          background: checked ? "#6D4AE2" : "transparent",
        }}
      >
        {checked && <span className="block w-2 h-2 rounded-full bg-white" />}
      </span>
      <span className="text-sm" style={{ color: "#1E293B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
    </label>
  );
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────
function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative inline-flex" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1.5 rounded-lg text-white text-[11px] whitespace-nowrap z-50 shadow-lg"
          style={{ background: "#1E293B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-1 overflow-hidden">
            <div className="w-2 h-2 rotate-45 -mt-1" style={{ background: "#1E293B" }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ type, message }: { type: "success" | "error" | "warning" | "info"; message: string }) {
  const cfg = {
    success: { icon: <Icon.CheckCircle />, color: "#10B981", bg: "#F0FDF4", border: "#BBF7D0" },
    error: { icon: <Icon.AlertCircle />, color: "#DC2626", bg: "#FFF5F5", border: "#FECACA" },
    warning: { icon: <Icon.AlertCircle />, color: "#D97706", bg: "#FFFBEB", border: "#FDE68A" },
    info: { icon: <Icon.Info />, color: "#6D4AE2", bg: "#F5F3FF", border: "#DDD6FE" },
  }[type];
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl shadow-sm text-sm"
      style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, color: "#1E293B", fontFamily: "'Plus Jakarta Sans', sans-serif", maxWidth: 320 }}
    >
      <span style={{ color: cfg.color, flexShrink: 0 }}>{cfg.icon}</span>
      <span>{message}</span>
    </div>
  );
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
function Tabs({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex" style={{ borderBottom: "1px solid #E2E8F0" }}>
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className="px-4 py-2.5 text-sm font-medium transition-colors relative"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: active === tab ? "#6D4AE2" : "#64748B",
            background: "none", border: "none", cursor: "pointer",
          }}
        >
          {tab}
          {active === tab && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-t" style={{ background: "#6D4AE2" }} />
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Segmented control ────────────────────────────────────────────────────────
function SegmentedControl({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex rounded-xl p-1" style={{ background: "#F1F5F9" }}>
      {options.map(opt => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className="px-3 py-1.5 text-xs font-semibold rounded-lg transition-all"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            background: value === opt ? "#FFFFFF" : "transparent",
            color: value === opt ? "#1E293B" : "#64748B",
            border: "none", cursor: "pointer",
            boxShadow: value === opt ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
          }}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function Skeleton({ w, h, rounded = "8px" }: { w: string | number; h: number; rounded?: string }) {
  return (
    <div
      className="animate-pulse"
      style={{ width: w, height: h, borderRadius: rounded, background: "linear-gradient(90deg,#F1F5F9 25%,#E2E8F0 50%,#F1F5F9 75%)", backgroundSize: "200% 100%" }}
    />
  );
}

// ─── Navigation bar ───────────────────────────────────────────────────────────
function NavBar({ role }: { role: "admin" | "supervisor" | "agent" }) {
  const navLinks: Record<string, { label: string; icon: React.ReactNode }[]> = {
    admin: [
      { label: "Messages", icon: <Icon.MessageSquare /> },
      { label: "Inbox", icon: <Icon.Inbox /> },
      { label: "Team", icon: <Icon.Users /> },
      { label: "Knowledge", icon: <Icon.BookOpen /> },
      { label: "Analytics", icon: <Icon.BarChart2 /> },
      { label: "Settings", icon: <Icon.Settings /> },
    ],
    supervisor: [
      { label: "Messages", icon: <Icon.MessageSquare /> },
      { label: "Inbox", icon: <Icon.Inbox /> },
      { label: "Team", icon: <Icon.Users /> },
      { label: "Analytics", icon: <Icon.BarChart2 /> },
    ],
    agent: [
      { label: "Messages", icon: <Icon.MessageSquare /> },
      { label: "Inbox", icon: <Icon.Inbox /> },
    ],
  };

  const [active, setActive] = useState(navLinks[role][1].label);
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="relative w-full">
      <div
        className="flex items-center px-6 gap-2"
        style={{
          height: 60, background: "#FFFFFF",
          borderBottom: "1px solid #E2E8F0",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 mr-6 flex-shrink-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#6D4AE2" }}>
            <span className="text-white text-xs font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>H</span>
          </div>
          <span className="font-bold text-sm" style={{ color: "#1E293B", fontFamily: "'Outfit', sans-serif" }}>HaqDesk AI</span>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-1 flex-1">
          {navLinks[role].map(link => (
            <button
              key={link.label}
              onClick={() => setActive(link.label)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all"
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                color: active === link.label ? "#6D4AE2" : "#64748B",
                background: active === link.label ? "#F5F3FF" : "transparent",
                border: "none", cursor: "pointer",
              }}
            >
              <span style={{ color: active === link.label ? "#6D4AE2" : "#94A3B8" }}>{link.icon}</span>
              {link.label}
              {link.label === "Inbox" && <UnreadBadge count={5} />}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors" style={{ border: "none", background: "none", cursor: "pointer", color: "#64748B" }}>
            <Icon.Bell />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full" style={{ background: "#DC2626" }} />
          </button>
          <button
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-[#F8FAFC] transition-colors"
            style={{ border: "none", background: "none", cursor: "pointer" }}
            onClick={() => setShowProfile(v => !v)}
          >
            <Avatar name="Sarah Ahmed" size={28} />
            <span className="text-sm font-medium" style={{ color: "#1E293B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sarah Ahmed</span>
            <span style={{ color: "#94A3B8" }}><Icon.ChevronDown /></span>
          </button>
        </div>
      </div>

      {/* Profile dropdown */}
      {showProfile && (
        <div
          className="absolute top-[62px] right-4 w-56 rounded-2xl shadow-xl z-50 overflow-hidden"
          style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
        >
          <div className="p-4 border-b border-[#F1F5F9]">
            <div className="flex items-center gap-3">
              <Avatar name="Sarah Ahmed" size={36} />
              <div>
                <p className="text-sm font-semibold" style={{ color: "#1E293B", fontFamily: "'Outfit', sans-serif" }}>Sarah Ahmed</p>
                <RoleBadge role={role === "admin" ? "Admin" : role === "supervisor" ? "Supervisor" : "Agent"} />
              </div>
            </div>
          </div>
          <div className="py-1">
            {[{ label: "Profile", icon: <Icon.User /> }, { label: "Settings", icon: <Icon.Settings /> }].map(item => (
              <button
                key={item.label}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-[#F8FAFC] transition-colors"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#1E293B", border: "none", background: "none", cursor: "pointer" }}
              >
                <span style={{ color: "#94A3B8" }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div className="py-1 border-t border-[#F1F5F9]">
            <button
              className="flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-[#FFF5F5] transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#DC2626", border: "none", background: "none", cursor: "pointer" }}
            >
              <Icon.LogOut />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mobile nav drawer ────────────────────────────────────────────────────────
function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className="flex items-center justify-between px-4"
        style={{ height: 56, background: "#FFFFFF", borderBottom: "1px solid #E2E8F0" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "#6D4AE2" }}>
            <span className="text-white text-[10px] font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>H</span>
          </div>
          <span className="font-bold text-sm" style={{ color: "#1E293B", fontFamily: "'Outfit', sans-serif" }}>HaqDesk AI</span>
        </div>
        <button
          onClick={() => setOpen(v => !v)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#64748B" }}
        >
          <Icon.Menu />
        </button>
      </div>
      {open && (
        <div
          className="absolute top-[57px] left-0 right-0 z-50"
          style={{ background: "#FFFFFF", borderBottom: "1px solid #E2E8F0", boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
        >
          {[
            { label: "Messages", icon: <Icon.MessageSquare /> },
            { label: "Inbox", icon: <Icon.Inbox /> },
            { label: "Team", icon: <Icon.Users /> },
            { label: "Knowledge", icon: <Icon.BookOpen /> },
            { label: "Analytics", icon: <Icon.BarChart2 /> },
            { label: "Settings", icon: <Icon.Settings /> },
          ].map(item => (
            <button
              key={item.label}
              className="flex items-center gap-3 w-full px-5 py-3.5 text-sm font-medium hover:bg-[#F8FAFC] transition-colors"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#1E293B", border: "none", background: "none", cursor: "pointer", borderBottom: "1px solid #F1F5F9" }}
            >
              <span style={{ color: "#94A3B8" }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Platform rail item ───────────────────────────────────────────────────────
function PlatformRailItem({ icon, label, count, active }: { icon: React.ReactNode; label: string; count?: number; active?: boolean }) {
  return (
    <div
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all"
      style={{
        background: active ? "#F5F3FF" : "transparent",
        border: active ? "1px solid #EDE9FE" : "1px solid transparent",
      }}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white flex-shrink-0"
        style={{ background: active ? "#6D4AE2" : "#94A3B8" }}
      >
        {icon}
      </div>
      <span className="text-sm font-medium flex-1" style={{ color: active ? "#6D4AE2" : "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</span>
      {count !== undefined && <UnreadBadge count={count} />}
    </div>
  );
}

// ─── Conversation row ─────────────────────────────────────────────────────────
function ConversationRow({ name, preview, time, channel, unread, selected }: {
  name: string; preview: string; time: string;
  channel: "facebook" | "instagram" | "gmail";
  unread?: boolean; selected?: boolean;
}) {
  return (
    <div
      className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-all"
      style={{
        background: selected ? "#F5F3FF" : unread ? "#FAFBFF" : "transparent",
        borderLeft: selected ? "3px solid #6D4AE2" : "3px solid transparent",
        borderBottom: "1px solid #F1F5F9",
      }}
    >
      <Avatar name={name} size={38} channel={channel} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span
            className="text-sm truncate"
            style={{ color: "#1E293B", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: unread ? 600 : 500 }}
          >
            {name}
          </span>
          <span className="text-[10px] flex-shrink-0 ml-2" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{time}</span>
        </div>
        <div className="flex items-center justify-between">
          <p
            className="text-xs truncate"
            style={{ color: unread ? "#475569" : "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: unread ? 500 : 400 }}
          >
            {preview}
          </p>
          {unread && <UnreadBadge count={2} />}
        </div>
      </div>
    </div>
  );
}

// ─── Message bubbles ──────────────────────────────────────────────────────────
function CustomerBubble({ text, time }: { text: string; time: string }) {
  return (
    <div className="flex gap-3 items-end">
      <Avatar name="Liam Torres" size={28} />
      <div>
        <div
          className="px-4 py-3 rounded-2xl rounded-bl-sm text-sm max-w-xs"
          style={{ background: "#F1F5F9", color: "#1E293B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {text}
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[10px]" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{time}</span>
        </div>
      </div>
    </div>
  );
}

function AgentBubble({ text, time, read }: { text: string; time: string; read?: boolean }) {
  return (
    <div className="flex gap-3 items-end justify-end">
      <div className="text-right">
        <div
          className="px-4 py-3 rounded-2xl rounded-br-sm text-sm max-w-xs"
          style={{ background: "#6D4AE2", color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          {text}
        </div>
        <div className="flex items-center gap-1 mt-1 justify-end">
          <span className="text-[10px]" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{time}</span>
          <span style={{ color: read ? "#6D4AE2" : "#94A3B8" }}>{read ? <Icon.CheckCheck /> : <Icon.Check />}</span>
        </div>
      </div>
      <Avatar name="Sarah Ahmed" size={28} />
    </div>
  );
}

// ─── AI Suggestion card ───────────────────────────────────────────────────────
function AISuggestionCard() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ border: "1px solid #EDE9FE", background: "#FDFCFF" }}
    >
      <div className="flex items-center justify-between px-4 py-2.5" style={{ borderBottom: "1px solid #EDE9FE", background: "#F5F3FF" }}>
        <div className="flex items-center gap-2">
          <span style={{ color: "#6D4AE2" }}><Icon.Sparkles /></span>
          <span className="text-xs font-semibold" style={{ color: "#6D4AE2", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>AI Assistant</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
            style={{ background: "#EDE9FE", color: "#6D4AE2", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            92% Match
          </span>
          <span
            className="text-[10px] font-medium px-2 py-0.5 rounded-full"
            style={{ background: "#F0FDF4", color: "#065F46", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Knowledge Base
          </span>
          <button onClick={() => setDismissed(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8", display: "flex" }}>
            <Icon.X />
          </button>
        </div>
      </div>
      <div className="px-4 py-3">
        <p className="text-sm leading-relaxed mb-3" style={{ color: "#1E293B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Thank you for reaching out! Your refund request has been received and is being processed. You can expect the amount to appear in your account within 5–7 business days. Please don't hesitate to ask if you need further assistance.
        </p>
        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
            style={{ background: "#6D4AE2", color: "#FFFFFF", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <Icon.Check />
            Accept
          </button>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:bg-[#F1F5F9]"
            style={{ background: "#F8FAFC", color: "#64748B", border: "1px solid #E2E8F0", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            <Icon.Edit3 />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Composer ─────────────────────────────────────────────────────────────────
function Composer() {
  const [text, setText] = useState("");
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0", background: "#FFFFFF" }}>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Type a reply…"
        rows={3}
        className="w-full px-4 pt-3 text-sm resize-none outline-none"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#1E293B", background: "transparent", border: "none" }}
      />
      <div className="flex items-center justify-between px-3 pb-2.5 pt-1">
        <div className="flex items-center gap-2">
          {[<Icon.Paperclip />, <Icon.Image />, <Icon.Smile />, <Icon.Mic />].map((icon, i) => (
            <button
              key={i}
              className="p-1.5 rounded-lg hover:bg-[#F1F5F9] transition-colors"
              style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}
            >
              {icon}
            </button>
          ))}
        </div>
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
          style={{ background: text ? "#6D4AE2" : "#E2E8F0", color: text ? "#FFFFFF" : "#94A3B8", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          <Icon.Send />
          Send
        </button>
      </div>
    </div>
  );
}

// ─── Customer details card ────────────────────────────────────────────────────
function CustomerDetailsCard() {
  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0", background: "#FFFFFF" }}>
      <div className="px-4 py-3" style={{ borderBottom: "1px solid #F1F5F9" }}>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Customer</p>
        <div className="flex items-center gap-3">
          <Avatar name="Liam Torres" size={40} channel="facebook" />
          <div>
            <p className="text-sm font-semibold" style={{ color: "#1E293B", fontFamily: "'Outfit', sans-serif" }}>Liam Torres</p>
            <p className="text-xs" style={{ color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>via Facebook Messenger</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-3 space-y-2.5">
        {[
          { label: "Email", value: "liam.torres@email.com" },
          { label: "Phone", value: "+1 555 234 5678" },
          { label: "Location", value: "New York, US" },
          { label: "Tickets", value: "4 total · 1 open" },
        ].map(row => (
          <div key={row.label} className="flex justify-between">
            <span className="text-[11px] uppercase tracking-wide font-medium" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.label}</span>
            <span className="text-xs" style={{ color: "#475569", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{row.value}</span>
          </div>
        ))}
        <div className="flex justify-between items-center pt-1">
          <span className="text-[11px] uppercase tracking-wide font-medium" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Sentiment</span>
          <SentimentBadge sentiment="Neutral" />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[11px] uppercase tracking-wide font-medium" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Priority</span>
          <PriorityBadge priority="Medium" />
        </div>
      </div>
    </div>
  );
}

// ─── Attachment preview ───────────────────────────────────────────────────────
function AttachmentPreview() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl" style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", maxWidth: 200 }}>
      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "#E2E8F0" }}>
        <Icon.Image />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate" style={{ color: "#1E293B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>screenshot.png</p>
        <p className="text-[10px]" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>1.2 MB · PNG</p>
      </div>
      <button style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><Icon.X /></button>
    </div>
  );
}

// ─── Voice recording state ────────────────────────────────────────────────────
function VoiceRecordingState() {
  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
      style={{ background: "#FFF5F5", border: "1px solid #FECACA" }}
    >
      <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: "#DC2626" }} />
      <span className="text-sm font-medium" style={{ color: "#DC2626", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Recording…</span>
      <span className="text-sm font-mono" style={{ color: "#DC2626" }}>0:12</span>
      <div className="flex items-end gap-0.5 h-5">
        {[3, 6, 4, 8, 5, 7, 3, 6, 4, 7].map((h, i) => (
          <div key={i} className="w-1 rounded-sm animate-pulse" style={{ height: h * 2, background: "#DC2626", animationDelay: `${i * 80}ms` }} />
        ))}
      </div>
    </div>
  );
}

// ─── Metric/KPI card ──────────────────────────────────────────────────────────
function MetricCard({ label, value, delta, positive }: { label: string; value: string; delta: string; positive: boolean }) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-3" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
      <p className="text-xs font-medium uppercase tracking-wide" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</p>
      <p className="text-3xl font-bold" style={{ color: "#1E293B", fontFamily: "'Outfit', sans-serif", letterSpacing: "-0.02em" }}>{value}</p>
      <span
        className="text-xs font-semibold px-2 py-0.5 rounded-full self-start"
        style={{
          background: positive ? "#D1FAE5" : "#FEE2E2",
          color: positive ? "#065F46" : "#DC2626",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {delta}
      </span>
    </div>
  );
}

// ─── Modal/dialog ─────────────────────────────────────────────────────────────
function ModalExample() {
  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", maxWidth: 420 }}
    >
      <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid #F1F5F9" }}>
        <p className="text-base font-semibold" style={{ color: "#1E293B", fontFamily: "'Outfit', sans-serif" }}>Assign Conversation</p>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}><Icon.X /></button>
      </div>
      <div className="px-6 py-4">
        <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Agent</label>
        <div
          className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm"
          style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#1E293B" }}
        >
          <span>Select agent…</span>
          <Icon.ChevronDown />
        </div>
        <label className="block text-xs font-medium mb-1.5 mt-3" style={{ color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Priority</label>
        <div className="flex gap-2">
          {(["Low", "Medium", "High"] as const).map(p => (
            <PriorityBadge key={p} priority={p} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-end gap-2 px-6 py-4" style={{ borderTop: "1px solid #F1F5F9" }}>
        <button
          className="px-4 py-2 rounded-xl text-sm font-medium"
          style={{ background: "#F1F5F9", color: "#64748B", border: "1px solid #E2E8F0", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ background: "#6D4AE2", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Assign
        </button>
      </div>
    </div>
  );
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-5 ${className}`}
      style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}
    >
      {children}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: "#F5F3FF", color: "#818CF8" }}
      >
        <Icon.InboxEmpty />
      </div>
      <div className="text-center">
        <p className="text-base font-semibold mb-1" style={{ color: "#1E293B", fontFamily: "'Outfit', sans-serif" }}>No conversations yet</p>
        <p className="text-sm" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>New messages from connected channels will appear here</p>
      </div>
    </div>
  );
}

// ─── Error state ──────────────────────────────────────────────────────────────
function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-4">
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center"
        style={{ background: "#FFF5F5", color: "#DC2626" }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>
        </svg>
      </div>
      <div className="text-center">
        <p className="text-base font-semibold mb-1" style={{ color: "#1E293B", fontFamily: "'Outfit', sans-serif" }}>Something went wrong</p>
        <p className="text-sm mb-4" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>We couldn't load your inbox. Please try again.</p>
        <button
          className="px-4 py-2 rounded-xl text-sm font-semibold"
          style={{ background: "#DC2626", color: "#FFFFFF", border: "none", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

// ─── Input field ──────────────────────────────────────────────────────────────
function InputField({ label, placeholder, type = "text", disabled }: { label: string; placeholder: string; type?: string; disabled?: boolean }) {
  const [val, setVal] = useState("");
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium" style={{ color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{label}</label>
      <div className="relative">
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="w-full px-3 py-2.5 text-sm rounded-xl outline-none transition-all"
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            background: disabled ? "#F8FAFC" : "#F1F5F9",
            border: "1px solid #E2E8F0",
            color: disabled ? "#94A3B8" : "#1E293B",
            cursor: disabled ? "not-allowed" : "text",
          }}
        />
        {isPassword && (
          <button
            onClick={() => setShow(v => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
            style={{ background: "none", border: "none", cursor: "pointer", color: "#94A3B8" }}
          >
            {show ? <Icon.EyeOff /> : <Icon.Eye />}
          </button>
        )}
      </div>
    </div>
  );
}

function SearchInput() {
  const [val, setVal] = useState("");
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#94A3B8" }}><Icon.Search /></span>
      <input
        type="text"
        value={val}
        onChange={e => setVal(e.target.value)}
        placeholder="Search conversations…"
        className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl outline-none"
        style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#F1F5F9", border: "1px solid #E2E8F0", color: "#1E293B" }}
      />
    </div>
  );
}

function SelectField() {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-medium" style={{ color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Status</label>
      <div
        className="relative flex items-center justify-between px-3 py-2.5 rounded-xl text-sm cursor-pointer"
        style={{ background: "#F1F5F9", border: "1px solid #E2E8F0", fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#1E293B" }}
      >
        <span>Open</span>
        <Icon.ChevronDown />
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState<"system" | "wf-login" | "wf-hub" | WireframeId>("system");
  const [activeTab, setActiveTab] = useState("All");
  const [activeSegment, setActiveSegment] = useState("Today");
  const [toggleOn, setToggleOn] = useState(true);
  const [navRole, setNavRole] = useState<"admin" | "supervisor" | "agent">("admin");

  if (page === "wf-hub") {
    return <WireframeHub onOpen={(id) => setPage(id)} />;
  }

  if (page === "wf-login" || page.startsWith("wf-")) {
    const ids = ["wf-login", ...WIREFRAMES.map(w => w.id)] as ("wf-login" | WireframeId)[];
    const current = ids.indexOf(page as "wf-login" | WireframeId);
    const prev = current > 0 ? ids[current - 1] : null;
    const next = current >= 0 && current < ids.length - 1 ? ids[current + 1] : null;
    return (
      <div>
        {page === "wf-login" ? <WireframeLogin /> : <WireframeScreen id={page as WireframeId} />}
        <div style={{ position: "fixed", bottom: 18, right: 18, zIndex: 999, display: "flex", gap: 7 }}>
          <button onClick={() => setPage("system")} style={{ background: "#FFFFFF", color: "#1A1A1A", border: "1px solid #B8B8B8", borderRadius: 6, padding: "8px 11px", fontSize: 10, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, cursor: "pointer" }}>Design System</button>
          <button onClick={() => setPage("wf-hub")} style={{ background: "#FFFFFF", color: "#1A1A1A", border: "1px solid #B8B8B8", borderRadius: 6, padding: "8px 11px", fontSize: 10, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, cursor: "pointer" }}>All Wireframes</button>
          {prev && <button onClick={() => setPage(prev)} style={{ background: "#1A1A1A", color: "#FFFFFF", border: "none", borderRadius: 6, padding: "8px 11px", fontSize: 10, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, cursor: "pointer" }}>← Previous</button>}
          {next && <button onClick={() => setPage(next)} style={{ background: "#1A1A1A", color: "#FFFFFF", border: "none", borderRadius: 6, padding: "8px 11px", fontSize: 10, fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, cursor: "pointer" }}>Next →</button>}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* dummy fragment start placeholder */}
      {/* Canvas header */}
      <div
        className="sticky top-0 z-40 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(248,250,252,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #E2E8F0" }}
      >
        <div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "'Outfit', sans-serif", color: "#1E293B", letterSpacing: "-0.02em" }}>
            HaqDesk AI — Design System
          </h1>
          <p className="text-xs mt-0.5" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            UI Foundation & Component Library · BSc IT Final Year Project
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPage("wf-hub")}
            className="text-[11px] font-semibold px-3 py-1.5 rounded-lg transition-colors hover:bg-[#F1F5F9]"
            style={{ color: "#64748B", border: "1px solid #E2E8F0", background: "#FFFFFF", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            15 Low-Fidelity Wireframes →
          </button>
          <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full" style={{ background: "#EDE9FE", color: "#6D4AE2" }}>
            Light Theme
          </span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-8 py-12">

        {/* ─── 1. TYPOGRAPHY ─────────────────────────────────────────────── */}
        <Section label="01 · Typography">
          <div className="grid grid-cols-1 gap-10">
            <SubGroup label="Type scale — Outfit headings + Plus Jakarta Sans body">
              <div className="space-y-6">
                <div className="pb-6" style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <p className="text-[10px] font-medium uppercase tracking-widest mb-3" style={{ color: "#94A3B8" }}>Display — Outfit 48px / weight 700 / tracking −0.03em</p>
                  <p style={{ fontSize: 48, fontFamily: "'Outfit', sans-serif", fontWeight: 700, letterSpacing: "-0.03em", color: "#1E293B", lineHeight: 1.1 }}>
                    HaqDesk AI Platform
                  </p>
                </div>
                <div className="pb-6" style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <p className="text-[10px] font-medium uppercase tracking-widest mb-3" style={{ color: "#94A3B8" }}>Page Title — Outfit 36px / weight 700 / tracking −0.025em</p>
                  <p style={{ fontSize: 36, fontFamily: "'Outfit', sans-serif", fontWeight: 700, letterSpacing: "-0.025em", color: "#1E293B", lineHeight: 1.15 }}>
                    Unified Inbox
                  </p>
                </div>
                <div className="pb-6" style={{ borderBottom: "1px solid #F1F5F9" }}>
                  <p className="text-[10px] font-medium uppercase tracking-widest mb-3" style={{ color: "#94A3B8" }}>Section Title — Outfit 22px / weight 600 / tracking −0.015em</p>
                  <p style={{ fontSize: 22, fontFamily: "'Outfit', sans-serif", fontWeight: 600, letterSpacing: "-0.015em", color: "#1E293B" }}>
                    Team Management
                  </p>
                </div>
                {[
                  { label: "Body — Plus Jakarta Sans 14px / weight 400", text: "Manage all your customer conversations across Facebook Messenger, Instagram Direct, and Gmail from a single intelligent inbox.", fs: 14, fw: 400, ff: "'Plus Jakarta Sans', sans-serif", color: "#1E293B" },
                  { label: "Body Small — Plus Jakarta Sans 13px / weight 400", text: "Your AI-assisted response has been queued. It will be sent once an agent reviews and approves it.", fs: 13, fw: 400, ff: "'Plus Jakarta Sans', sans-serif", color: "#1E293B" },
                  { label: "Label — Plus Jakarta Sans 11px / weight 600 / uppercase / tracking 0.1em", text: "PRIORITY · HIGH · ASSIGNED", fs: 11, fw: 600, ff: "'Plus Jakarta Sans', sans-serif", color: "#64748B", transform: "uppercase" as const, spacing: "0.1em" },
                  { label: "Caption — Plus Jakarta Sans 11px / weight 400", text: "Last active 3 minutes ago · 2 open tickets", fs: 11, fw: 400, ff: "'Plus Jakarta Sans', sans-serif", color: "#94A3B8" },
                  { label: "Button Text — Plus Jakarta Sans 12px / weight 600", text: "Accept Suggestion   Send Reply   Assign Agent   View Analytics", fs: 12, fw: 600, ff: "'Plus Jakarta Sans', sans-serif", color: "#6D4AE2" },
                ].map(item => (
                  <div key={item.label} className="pb-6" style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <p className="text-[10px] font-medium uppercase tracking-widest mb-3" style={{ color: "#94A3B8" }}>{item.label}</p>
                    <p style={{ fontSize: item.fs, fontWeight: item.fw, fontFamily: item.ff, color: item.color, textTransform: item.transform, letterSpacing: item.spacing }}>
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </SubGroup>
          </div>
        </Section>

        {/* ─── 2. COLOUR TOKENS ──────────────────────────────────────────── */}
        <Section label="02 · Colour Tokens — Light Theme">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { token: "--haq-bg", hex: "#F8FAFC", name: "Background", dark: false },
              { token: "--haq-surface", hex: "#FFFFFF", name: "Surface", dark: false, border: true },
              { token: "--haq-surface-input", hex: "#F1F5F9", name: "Surface / Input", dark: false },
              { token: "--haq-border", hex: "#E2E8F0", name: "Border", dark: false },
              { token: "--haq-text-primary", hex: "#1E293B", name: "Text Primary", dark: true },
              { token: "--haq-text-secondary", hex: "#64748B", name: "Text Secondary", dark: true },
              { token: "--haq-purple", hex: "#6D4AE2", name: "Primary / Accent Purple", dark: true },
              { token: "--haq-purple-light", hex: "#818CF8", name: "Accent Highlight", dark: true },
              { token: "--haq-success", hex: "#10B981", name: "Success", dark: true },
              { token: "--haq-warning", hex: "#D97706", name: "Warning", dark: true },
              { token: "--haq-error", hex: "#DC2626", name: "Error", dark: true },
              { token: "--haq-teal", hex: "#0F9B72", name: "Teal / Supporting Accent", dark: true },
            ].map(c => (
              <div key={c.token}>
                <div
                  className="w-full h-16 rounded-xl mb-3"
                  style={{
                    background: c.hex,
                    border: c.border ? "1px solid #E2E8F0" : c.hex === "#F8FAFC" || c.hex === "#F1F5F9" ? "1px solid #E2E8F0" : "none",
                    boxShadow: c.hex === "#FFFFFF" ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  }}
                />
                <p className="text-[11px] font-semibold mb-0.5" style={{ color: "#1E293B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{c.name}</p>
                <p className="text-[10px] font-mono" style={{ color: "#94A3B8" }}>{c.hex}</p>
                <p className="text-[10px]" style={{ color: "#CBD5E1", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{c.token}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── 3. SPACING ────────────────────────────────────────────────── */}
        <Section label="03 · Spacing System">
          <div className="flex items-end gap-6 flex-wrap">
            {[4, 8, 12, 16, 24, 32, 40, 48, 64].map(s => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className="rounded" style={{ width: s, height: s, background: "#6D4AE2", opacity: 0.15 + (s / 64) * 0.7, minWidth: 4 }} />
                <p className="text-[10px] font-semibold" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s}px</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── 4. BORDER RADIUS ──────────────────────────────────────────── */}
        <Section label="04 · Border Radius">
          <div className="flex items-center gap-8 flex-wrap">
            {[
              { r: 12, label: "12px", desc: "Controls, inputs, buttons" },
              { r: 16, label: "16px", desc: "Cards, panels" },
              { r: 24, label: "24px", desc: "Large surfaces" },
              { r: 32, label: "32px", desc: "App shells, modals" },
            ].map(item => (
              <div key={item.r} className="flex flex-col items-center gap-3">
                <div
                  className="w-20 h-20 flex items-center justify-center"
                  style={{ borderRadius: item.r, background: "#EDE9FE", border: "1.5px dashed #818CF8" }}
                />
                <div className="text-center">
                  <p className="text-xs font-semibold" style={{ color: "#1E293B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.label}</p>
                  <p className="text-[10px]" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── 5. CORE COMPONENTS ────────────────────────────────────────── */}
        <Section label="05 · Core Components">

          <SubGroup label="Buttons">
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { label: "Primary", bg: "#6D4AE2", color: "#FFFFFF", border: "none" },
                { label: "Secondary", bg: "#F1F5F9", color: "#1E293B", border: "1px solid #E2E8F0" },
                { label: "Danger", bg: "#DC2626", color: "#FFFFFF", border: "none" },
                { label: "Disabled", bg: "#F1F5F9", color: "#94A3B8", border: "1px solid #E2E8F0", disabled: true },
              ].map(btn => (
                <button
                  key={btn.label}
                  disabled={btn.disabled}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all"
                  style={{ background: btn.bg, color: btn.color, border: btn.border, cursor: btn.disabled ? "not-allowed" : "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </SubGroup>

          <SubGroup label="Form Inputs">
            <div className="grid grid-cols-2 gap-4 max-w-xl">
              <InputField label="Text input" placeholder="Enter value…" />
              <InputField label="Password input" placeholder="Password" type="password" />
              <div className="col-span-2"><SearchInput /></div>
              <div className="col-span-2">
                <label className="block text-xs font-medium mb-1.5" style={{ color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Textarea</label>
                <textarea
                  rows={3}
                  placeholder="Enter your message here…"
                  className="w-full px-3 py-2.5 text-sm rounded-xl outline-none resize-none"
                  style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", background: "#F1F5F9", border: "1px solid #E2E8F0", color: "#1E293B" }}
                />
              </div>
              <SelectField />
              <InputField label="Disabled input" placeholder="Not editable" disabled />
            </div>
          </SubGroup>

          <SubGroup label="Toggle · Checkbox · Radio">
            <div className="flex items-start gap-12 flex-wrap">
              <div className="flex flex-col gap-3">
                <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#94A3B8" }}>Toggle switch</p>
                <div className="flex items-center gap-3">
                  <Toggle on={toggleOn} onChange={setToggleOn} />
                  <span className="text-sm" style={{ color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{toggleOn ? "Enabled" : "Disabled"}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Toggle on={false} onChange={() => {}} />
                  <span className="text-sm" style={{ color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Off state</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#94A3B8" }}>Checkbox</p>
                <Checkbox checked={true} label="AI suggestions enabled" />
                <Checkbox checked={false} label="Email notifications" />
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#94A3B8" }}>Radio</p>
                <Radio checked={true} label="Agent view" />
                <Radio checked={false} label="Supervisor view" />
              </div>
            </div>
          </SubGroup>

          <SubGroup label="Card">
            <div className="grid grid-cols-3 gap-4 max-w-2xl">
              <Card>
                <p className="text-sm font-semibold mb-1" style={{ color: "#1E293B", fontFamily: "'Outfit', sans-serif" }}>Standard Card</p>
                <p className="text-xs" style={{ color: "#64748B", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>16px border-radius, 1px #E2E8F0 border, white surface.</p>
              </Card>
              <div className="col-span-2 grid grid-cols-2 gap-4">
                <MetricCard label="Open Tickets" value="142" delta="↑ 12% vs last week" positive={false} />
                <MetricCard label="Resolved Today" value="87" delta="↑ 23% vs yesterday" positive={true} />
              </div>
            </div>
          </SubGroup>

          <SubGroup label="Tabs · Segmented control">
            <div className="flex flex-col gap-6 max-w-xl">
              <div>
                <Tabs tabs={["All", "Open", "Pending", "Resolved"]} active={activeTab} onChange={setActiveTab} />
              </div>
              <div>
                <SegmentedControl options={["Today", "7 Days", "30 Days"]} value={activeSegment} onChange={setActiveSegment} />
              </div>
            </div>
          </SubGroup>

          <SubGroup label="Badges">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#94A3B8" }}>Role</p>
                <div className="flex gap-2"><RoleBadge role="Admin" /><RoleBadge role="Supervisor" /><RoleBadge role="Agent" /></div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#94A3B8" }}>Status</p>
                <div className="flex flex-col gap-1.5">
                  <StatusBadge status="online" /><StatusBadge status="away" /><StatusBadge status="busy" /><StatusBadge status="offline" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#94A3B8" }}>Priority</p>
                <div className="flex gap-2"><PriorityBadge priority="High" /><PriorityBadge priority="Medium" /><PriorityBadge priority="Low" /></div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#94A3B8" }}>Sentiment</p>
                <div className="flex gap-2"><SentimentBadge sentiment="Positive" /><SentimentBadge sentiment="Neutral" /><SentimentBadge sentiment="Negative" /></div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#94A3B8" }}>Connection</p>
                <div className="flex gap-2"><ConnectedBadge connected={true} /><ConnectedBadge connected={false} /></div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-[10px] uppercase tracking-widest font-medium" style={{ color: "#94A3B8" }}>Unread</p>
                <div className="flex gap-2"><UnreadBadge count={3} /><UnreadBadge count={12} /><UnreadBadge count={99} /><UnreadBadge count={104} /></div>
              </div>
            </div>
          </SubGroup>

          <SubGroup label="Avatar">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Sarah Ahmed" size={40} />
                <span className="text-[10px]" style={{ color: "#94A3B8" }}>Default</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Liam Torres" size={40} channel="facebook" />
                <span className="text-[10px]" style={{ color: "#94A3B8" }}>+ Facebook</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar name="Maya Patel" size={40} channel="instagram" />
                <span className="text-[10px]" style={{ color: "#94A3B8" }}>+ Instagram</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Avatar name="James Wilson" size={40} channel="gmail" />
                <span className="text-[10px]" style={{ color: "#94A3B8" }}>+ Gmail</span>
              </div>
              <div className="flex items-end gap-1 ml-4">
                {[24, 32, 40, 48].map(s => (
                  <div key={s} className="flex flex-col items-center gap-2">
                    <Avatar name="Omar Hassan" size={s} />
                    <span className="text-[10px]" style={{ color: "#94A3B8" }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </SubGroup>

          <SubGroup label="Tooltip">
            <div className="flex items-center gap-8">
              <Tooltip text="Copy conversation link">
                <button
                  className="px-4 py-2 rounded-xl text-sm font-medium"
                  style={{ background: "#F1F5F9", color: "#64748B", border: "1px solid #E2E8F0", cursor: "pointer", fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                >
                  Hover me
                </button>
              </Tooltip>
            </div>
          </SubGroup>

          <SubGroup label="Toast Notifications">
            <div className="flex flex-col gap-3 max-w-xs">
              <Toast type="success" message="Conversation resolved successfully." />
              <Toast type="error" message="Failed to send message. Try again." />
              <Toast type="warning" message="Agent is approaching their ticket limit." />
              <Toast type="info" message="AI suggestion is ready to review." />
            </div>
          </SubGroup>

          <SubGroup label="Modal / Dialog">
            <ModalExample />
          </SubGroup>

          <SubGroup label="Empty state · Error state · Loading skeleton">
            <div className="grid grid-cols-3 gap-6 max-w-2xl">
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0", background: "#FFFFFF" }}>
                <EmptyState />
              </div>
              <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0", background: "#FFFFFF" }}>
                <ErrorState />
              </div>
              <div className="p-5 rounded-2xl flex flex-col gap-3" style={{ border: "1px solid #E2E8F0", background: "#FFFFFF" }}>
                <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#94A3B8" }}>Loading skeleton</p>
                <div className="flex items-center gap-3">
                  <Skeleton w={40} h={40} rounded="50%" />
                  <div className="flex-1 flex flex-col gap-2">
                    <Skeleton w="60%" h={12} />
                    <Skeleton w="80%" h={10} />
                  </div>
                </div>
                <Skeleton w="100%" h={10} />
                <Skeleton w="90%" h={10} />
                <Skeleton w="70%" h={10} />
                <Skeleton w="100%" h={40} rounded="12px" />
              </div>
            </div>
          </SubGroup>
        </Section>

        {/* ─── 6. NAVIGATION COMPONENTS ──────────────────────────────────── */}
        <Section label="06 · Navigation Components">
          <SubGroup label="Desktop Top Navigation — role switcher">
            <div className="flex gap-2 mb-4">
              {(["admin", "supervisor", "agent"] as const).map(r => (
                <button
                  key={r}
                  onClick={() => setNavRole(r)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
                  style={{
                    background: navRole === r ? "#6D4AE2" : "#F1F5F9",
                    color: navRole === r ? "#FFFFFF" : "#64748B",
                    border: "none", cursor: "pointer",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                  }}
                >
                  {r === "admin" ? "Business Admin" : r === "supervisor" ? "Supervisor" : "Agent"}
                </button>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #E2E8F0" }}>
              <NavBar role={navRole} />
            </div>
            <p className="text-[10px] mt-3" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Fixed 60px top bar · Click "Sarah Ahmed" to open profile dropdown · Click nav items to activate
            </p>
          </SubGroup>

          <SubGroup label="Mobile Navigation Drawer">
            <div className="rounded-2xl overflow-hidden max-w-sm" style={{ border: "1px solid #E2E8F0" }}>
              <MobileNavDrawer />
            </div>
            <p className="text-[10px] mt-3" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Tap the hamburger icon to open/close the drawer
            </p>
          </SubGroup>
        </Section>

        {/* ─── 7. INBOX COMPONENTS ───────────────────────────────────────── */}
        <Section label="07 · Inbox-Specific Components">

          <SubGroup label="Communication platform rail">
            <div className="flex flex-col gap-1 max-w-xs p-3 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
              <PlatformRailItem icon={<Icon.Facebook />} label="Facebook Messenger" count={7} active={true} />
              <PlatformRailItem icon={<Icon.Instagram />} label="Instagram Direct" count={3} />
              <PlatformRailItem icon={<Icon.Mail />} label="Gmail / Email" count={1} />
            </div>
          </SubGroup>

          <SubGroup label="Conversation list rows">
            <div className="rounded-2xl overflow-hidden max-w-sm" style={{ border: "1px solid #E2E8F0", background: "#FFFFFF" }}>
              <ConversationRow
                name="Liam Torres"
                preview="Hi, I haven't received my refund yet and it's been 10 days…"
                time="2m ago"
                channel="facebook"
                unread
              />
              <ConversationRow
                name="Maya Patel"
                preview="Can I change the delivery address for my order?"
                time="14m ago"
                channel="instagram"
                selected
              />
              <ConversationRow
                name="James Wilson"
                preview="Thank you for your help! Everything is resolved now."
                time="1h ago"
                channel="gmail"
              />
              <ConversationRow
                name="Amira Khalil"
                preview="I'm having trouble logging into my account after the password reset."
                time="3h ago"
                channel="facebook"
                unread
              />
            </div>
          </SubGroup>

          <SubGroup label="Message bubbles · Timestamp · Read receipt">
            <div className="flex flex-col gap-4 max-w-sm p-5 rounded-2xl" style={{ background: "#FFFFFF", border: "1px solid #E2E8F0" }}>
              <div className="flex justify-center">
                <span className="text-[10px] px-3 py-1 rounded-full" style={{ background: "#F1F5F9", color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Today, 14:32</span>
              </div>
              <CustomerBubble text="Hi, I haven't received my refund yet and it's been 10 days since I returned the item." time="14:32" />
              <AgentBubble text="Thank you for reaching out! Let me check the status of your refund right away." time="14:33" />
              <CustomerBubble text="I have the return tracking number: TRK-445892." time="14:34" />
              <AgentBubble text="I can see your return was processed. The refund of £45.00 will appear in 5–7 business days." time="14:35" read={true} />
            </div>
          </SubGroup>

          <SubGroup label="Attachment preview · Voice recording state">
            <div className="flex flex-col gap-4 max-w-xs">
              <AttachmentPreview />
              <VoiceRecordingState />
            </div>
          </SubGroup>

          <SubGroup label="Composer">
            <div className="max-w-md">
              <Composer />
            </div>
          </SubGroup>

          <SubGroup label="Customer details card">
            <div className="max-w-xs">
              <CustomerDetailsCard />
            </div>
          </SubGroup>
        </Section>

        {/* ─── 8. AI SUGGESTION ──────────────────────────────────────────── */}
        <Section label="08 · AI Suggestion Card">
          <div className="max-w-md">
            <AISuggestionCard />
            <p className="text-[10px] mt-3" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              92% Match and Knowledge Base source reflect current static frontend state. Dismiss button resets the card.
            </p>
          </div>
        </Section>

        {/* Footer */}
        <div className="mt-16 pt-8 flex items-center justify-between" style={{ borderTop: "1px solid #E2E8F0" }}>
          <div>
            <p className="text-sm font-semibold" style={{ color: "#1E293B", fontFamily: "'Outfit', sans-serif" }}>HaqDesk AI Design System</p>
            <p className="text-xs mt-0.5" style={{ color: "#94A3B8", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              BSc IT Final Year Project · UI Foundation v1.0 · Light theme · Outfit + Plus Jakarta Sans
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "#6D4AE2" }}>
              <span className="text-white text-[10px] font-bold" style={{ fontFamily: "'Outfit', sans-serif" }}>H</span>
            </div>
            <span className="text-sm font-bold" style={{ color: "#1E293B", fontFamily: "'Outfit', sans-serif" }}>HaqDesk AI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
