import React from "react";
import {
  Mail, Phone, MapPin, BookOpen, User, Download,
  MessageCircle, Edit3, GraduationCap, Award, ChevronRight
} from "lucide-react";

/* ── GPA Ring ── */
function GpaRing({ gpa, size = 80 }) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * (gpa / 4.0);
  const color = gpa >= 3.5 ? "#10b981" : gpa >= 3.0 ? "#6366f1" : "#f59e0b";
  return (
    <div style={{ position: "relative", width: size, height: size, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)", position: "absolute", inset: 0 }}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={7} />
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke={color} strokeWidth={7}
          strokeDasharray={`${dash} ${circumference - dash}`} strokeLinecap="round" />
      </svg>
      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div style={{ fontSize: "1.125rem", fontWeight: 900, color, lineHeight: 1 }}>{gpa}</div>
        <div style={{ fontSize: "0.6rem", color: "var(--color-slate-400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>GPA</div>
      </div>
    </div>
  );
}

const ENROLLMENT_HISTORY = [
  { term: "Fall 2025",   code: "CS101",   name: "Intro to Computer Science", credits: 3, grade: "A",  status: "Completed" },
  { term: "Fall 2025",   code: "MATH201", name: "Calculus I",                 credits: 4, grade: "A-", status: "Completed" },
  { term: "Spring 2026", code: "PHYS102", name: "AP Physics: Mechanics",      credits: 4, grade: "B+", status: "Completed" },
  { term: "Spring 2026", code: "HIST220", name: "Ancient Civilizations",      credits: 3, grade: "A",  status: "Completed" },
  { term: "Fall 2026",   code: "MATH401", name: "Advanced Calculus",          credits: 4, grade: "—",  status: "In Progress" },
  { term: "Fall 2026",   code: "CS302",   name: "Data Structures",            credits: 3, grade: "—",  status: "In Progress" },
];

function getGradeColor(g) {
  if (!g || g === "—") return "var(--color-slate-400)";
  if (g.startsWith("A")) return "var(--color-emerald-700)";
  if (g.startsWith("B")) return "var(--color-indigo-700)";
  return "var(--color-amber-700)";
}

export default function ProfileTab({ username, courses }) {
  const initials = (username || "ST").split(/[\s-]/).map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const gpa = 3.8;
  const avatarColors = ["#dbeafe","#1e40af"];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ── Profile Header Card ── */}
      <div className="card">
        <div style={{ padding: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "1.25rem", flexWrap: "wrap" }}>
            {/* Avatar */}
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "linear-gradient(135deg,#6366f1,#06b6d4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", fontSize: "1.625rem", fontWeight: 800,
              flexShrink: 0, boxShadow: "var(--shadow-lg)"
            }}>
              {initials}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", flexWrap: "wrap", marginBottom: "0.375rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-slate-900)", letterSpacing: "-0.02em" }}>
                  {username || "Alex Rivera"}
                </h2>
                <span className="badge indigo">Active</span>
                <span className="badge cyan">Undergraduate</span>
              </div>
              <div style={{ fontSize: "0.8125rem", color: "var(--color-slate-500)", marginBottom: "0.75rem" }}>
                Student ID: <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--color-slate-700)" }}>S-300</span>
                &nbsp;·&nbsp; Computer Science, B.Sc.
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button className="btn btn-secondary btn-sm"><MessageCircle size={13} /> Message</button>
                <button className="btn btn-primary btn-sm"><Edit3 size={13} /> Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>

        {/* Academic Standing */}
        <div className="card">
          <div className="card-header">
            <div className="card-header-left">
              <div className="card-icon emerald" style={{ background: "#ecfdf5", color: "#059669" }}>
                <Award size={15} />
              </div>
              <div className="card-title">Academic Standing</div>
            </div>
          </div>
          <div style={{ padding: "1.125rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1rem" }}>
              <GpaRing gpa={gpa} size={85} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-slate-700)", marginBottom: "0.25rem" }}>
                  Good Standing
                </div>
                <div style={{ fontSize: "0.6875rem", color: "var(--color-slate-400)" }}>Year 3 · Fall 2026</div>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "Credits Earned", value: "78 / 120", pct: 65, color: "indigo" },
                { label: "Enrollment Status", value: "Full-time (18 cr)", pct: 100, color: "emerald" },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--color-slate-600)", fontWeight: 600 }}>{item.label}</span>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-slate-900)", fontFamily: "var(--font-mono)" }}>{item.value}</span>
                  </div>
                  <div className="progress-bar">
                    <div className={`progress-bar-fill ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="card">
          <div className="card-header">
            <div className="card-header-left">
              <div className="card-icon indigo" style={{ background: "#eef2ff", color: "#4f46e5" }}>
                <User size={15} />
              </div>
              <div className="card-title">Personal Information</div>
            </div>
            <button className="btn btn-ghost btn-sm"><Edit3 size={13} /></button>
          </div>
          <div style={{ padding: "1rem" }}>
            {[
              { icon: <Mail size={14} />,    label: "Email",    value: `${(username||"s300").toLowerCase().replace(/\s+/g,".").replace(/-/g,"")}@edumanager.org` },
              { icon: <Phone size={14} />,   label: "Phone",    value: "+1 (555) 234-5678" },
              { icon: <MapPin size={14} />,  label: "Address",  value: "123 Campus Drive, Hall C" },
              { icon: <BookOpen size={14} />,label: "Major",    value: "Computer Science, B.Sc." },
              { icon: <GraduationCap size={14} />, label: "Advisor", value: "Dr. Sarah Jenkins" },
            ].map(row => (
              <div key={row.label} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", padding: "0.5rem 0", borderBottom: "1px solid var(--color-slate-100)" }}>
                <span style={{ color: "var(--color-slate-400)", flexShrink: 0, marginTop: 2 }}>{row.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.6875rem", color: "var(--color-slate-400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{row.label}</div>
                  <div style={{ fontSize: "0.8125rem", color: "var(--color-slate-800)", fontWeight: 500, marginTop: "0.125rem" }}>{row.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Enrollment History Table ── */}
      <div className="card">
        <div className="card-header">
          <div className="card-header-left">
            <div className="card-title">Enrollment History</div>
          </div>
          <button className="btn btn-secondary btn-sm"><Download size={13} /> Full Transcript</button>
        </div>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Term</th>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Credits</th>
                <th>Grade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {ENROLLMENT_HISTORY.map((row, i) => (
                <tr key={i}>
                  <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--color-slate-500)", fontWeight: 600 }}>{row.term}</td>
                  <td><span className="badge indigo" style={{ fontSize: "0.6rem" }}>{row.code}</span></td>
                  <td style={{ fontWeight: 600, color: "var(--color-slate-800)" }}>{row.name}</td>
                  <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700, textAlign: "center" }}>{row.credits}</td>
                  <td>
                    <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "0.875rem", color: getGradeColor(row.grade) }}>
                      {row.grade}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${row.status === "Completed" ? "active" : "pending"}`}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Advisor + Documents ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
        <div className="card">
          <div className="card-header">
            <div className="card-title">Assigned Advisor</div>
          </div>
          <div style={{ padding: "1rem" }}>
            <div style={{ display: "flex", gap: "0.875rem", alignItems: "center" }}>
              <div className="avatar avatar-lg" style={{ background: "#dbeafe", color: "#1e40af" }}>SJ</div>
              <div>
                <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-slate-900)" }}>Dr. Sarah Jenkins</div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-slate-500)" }}>Mathematics Dept.</div>
                <div style={{ fontSize: "0.7rem", color: "var(--color-slate-400)", marginTop: "0.25rem", fontFamily: "var(--font-mono)" }}>s.jenkins@edumanager.org</div>
              </div>
            </div>
            <div style={{ marginTop: "0.875rem", padding: "0.625rem", background: "var(--color-slate-50)", borderRadius: "0.625rem" }}>
              <div style={{ fontSize: "0.7rem", color: "var(--color-slate-500)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Office Hours</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--color-slate-700)", marginTop: "0.25rem", fontWeight: 600 }}>Tue / Thu 2:00 PM – 4:00 PM</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">Official Documents</div>
          </div>
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
            {[
              { label: "Unofficial Transcript", sub: "Updated Oct 2026", icon: "📄" },
              { label: "Enrollment Certificate", sub: "Valid through Dec 2026", icon: "📋" },
            ].map(doc => (
              <div key={doc.label} style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.75rem", background: "var(--color-slate-50)",
                borderRadius: "0.75rem", border: "1px solid var(--color-slate-200)",
                cursor: "pointer", transition: "var(--transition-fast)"
              }}>
                <span style={{ fontSize: "1.25rem" }}>{doc.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-slate-900)" }}>{doc.label}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--color-slate-400)" }}>{doc.sub}</div>
                </div>
                <button className="btn btn-secondary btn-icon btn-sm">
                  <Download size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
