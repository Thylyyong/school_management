import React, { useState } from "react";
import {
  TrendingUp, Award, Users, Save, Edit2, Plus, Upload,
  FileText, Clock, CheckCircle, Calendar, BarChart3
} from "lucide-react";

/* ── Grade Distribution Chart (SVG bars) ── */
function GradeDistChart({ grades }) {
  const buckets = { A: 0, B: 0, C: 0, D: 0, F: 0 };
  grades.forEach(g => {
    const pct = (g.score / g.maxScore) * 100;
    if (pct >= 90) buckets.A++;
    else if (pct >= 80) buckets.B++;
    else if (pct >= 70) buckets.C++;
    else if (pct >= 60) buckets.D++;
    else buckets.F++;
  });
  const maxVal = Math.max(...Object.values(buckets), 1);
  const COLORS = { A: "#10b981", B: "#6366f1", C: "#f59e0b", D: "#f97316", F: "#ef4444" };
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: "80px", paddingTop: "0.5rem" }}>
      {Object.entries(buckets).map(([letter, count]) => (
        <div key={letter} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "0.25rem" }}>
          <div style={{ fontSize: "0.625rem", fontWeight: 700, color: "var(--color-slate-400)", fontFamily: "var(--font-mono)" }}>{count}</div>
          <div style={{
            width: "100%", background: COLORS[letter], borderRadius: "0.25rem 0.25rem 0 0",
            height: `${(count / maxVal) * 56}px`, minHeight: count > 0 ? "8px" : "0",
            transition: "height 0.6s cubic-bezier(0.4,0,0.2,1)"
          }} />
          <div style={{ fontSize: "0.6875rem", fontWeight: 800, color: "var(--color-slate-500)", fontFamily: "var(--font-mono)" }}>{letter}</div>
        </div>
      ))}
    </div>
  );
}

const COURSE_MATERIALS = [
  { name: "PHY301_Lecture_Notes_Ch1.pdf", size: "2.4 MB", type: "PDF" },
  { name: "Thermodynamics_Formula_Sheet.pdf", size: "840 KB", type: "PDF" },
  { name: "Course_Syllabus_Fall2026.docx", size: "120 KB", type: "DOC" },
];

const SCHEDULE_TODAY = [
  { time: "9:00 AM",  course: "PHY-102", room: "Room 302", status: "Completed" },
  { time: "11:00 AM", course: "MATH-401",room: "Room 305", status: "Upcoming" },
  { time: "2:00 PM",  course: "PHYS-102",room: "Room 302", status: "Upcoming" },
];

export default function GradesTab({
  activeCourse, studentsInClass, onUpdateCourseGrades,
  lessonPlans, events, isDashboard = false
}) {
  const [editingGradeId, setEditingGradeId]     = useState(null);
  const [editingScore, setEditingScore]         = useState(0);

  const currentGrades = activeCourse?.grades || [];
  const totalWeight   = currentGrades.reduce((s, g) => s + g.weight, 0);
  const avgPct        = totalWeight > 0
    ? (currentGrades.reduce((s, g) => s + (g.score / g.maxScore) * g.weight, 0) / totalWeight) * 100
    : 0;

  const startEditing = (id, score) => { setEditingGradeId(id); setEditingScore(score); };
  const saveEdited   = (id) => {
    if (!activeCourse) return;
    const updated = currentGrades.map(g => g.id === id ? { ...g, score: Number(editingScore) } : g);
    onUpdateCourseGrades(activeCourse.id, updated);
    setEditingGradeId(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ── Course Hero Header ── */}
      <div className="hero-banner">
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <span className="badge cyan" style={{ background: "rgba(6,182,212,0.2)", color: "#22d3ee", border: "1px solid rgba(6,182,212,0.3)" }}>
                  {activeCourse?.term || "Fall 2026"}
                </span>
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono)" }}>
                  {activeCourse?.room}
                </span>
              </div>
              <h2 className="hero-title">{activeCourse?.code} — {activeCourse?.name}</h2>
              <p className="hero-desc">{activeCourse?.schedule} · Instructor: {activeCourse?.teacherName}</p>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button className="btn btn-secondary btn-sm"><Users size={13} /> Enroll Student</button>
              <button className="btn btn-cyan btn-sm"><FileText size={13} /> Print Roster</button>
            </div>
          </div>
          {/* Quick stats row */}
          <div style={{ display: "flex", gap: "1.5rem", marginTop: "1.25rem" }}>
            {[
              { label: "Enrolled",       value: studentsInClass.length || 24 },
              { label: "Avg. Grade",     value: `${avgPct.toFixed(1)}%` },
              { label: "Assignments",    value: currentGrades.length },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "white", letterSpacing: "-0.03em" }}>{s.value}</div>
                <div style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.5)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: "1.25rem", alignItems: "start" }}>

        {/* ── LEFT ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Gradebook Entry */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon indigo" style={{ background: "#eef2ff", color: "#4f46e5" }}>
                  <Edit2 size={15} />
                </div>
                <div>
                  <div className="card-title">Gradebook Entry</div>
                  <div className="card-subtitle">{activeCourse?.code} — {activeCourse?.name?.slice(0, 30)}</div>
                </div>
              </div>
              <button
                className="btn btn-primary btn-sm"
                id="teacher-save-grades-btn"
                onClick={() => setEditingGradeId(null)}
              >
                <Save size={13} /> Save All
              </button>
            </div>

            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Assignment</th>
                    <th style={{ textAlign: "center" }}>Points</th>
                    <th style={{ textAlign: "center" }}>Max</th>
                    <th style={{ textAlign: "center" }}>Weight</th>
                    <th style={{ textAlign: "center" }}>Score %</th>
                    <th>Status</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentGrades.map(g => {
                    const pct = (g.score / g.maxScore) * 100;
                    const isEditing = editingGradeId === g.id;
                    const chipColor = pct >= 90 ? "emerald" : pct >= 80 ? "indigo" : pct >= 70 ? "amber" : "rose";
                    return (
                      <tr key={g.id}>
                        <td style={{ fontWeight: 600, color: "var(--color-slate-900)" }}>{g.title}</td>
                        <td style={{ textAlign: "center" }}>
                          {isEditing ? (
                            <input
                              type="number"
                              value={editingScore}
                              onChange={e => setEditingScore(e.target.value)}
                              className="form-input"
                              style={{ width: "60px", textAlign: "center", padding: "0.25rem 0.375rem", fontSize: "0.8125rem" }}
                              min={0} max={g.maxScore}
                              autoFocus
                            />
                          ) : (
                            <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{g.score}</span>
                          )}
                        </td>
                        <td style={{ textAlign: "center", fontFamily: "var(--font-mono)", color: "var(--color-slate-500)" }}>{g.maxScore}</td>
                        <td style={{ textAlign: "center", fontFamily: "var(--font-mono)", color: "var(--color-slate-500)" }}>{g.weight}%</td>
                        <td style={{ textAlign: "center" }}>
                          <span className={`badge ${chipColor}`} style={{ fontFamily: "var(--font-mono)" }}>
                            {pct.toFixed(0)}%
                          </span>
                        </td>
                        <td>
                          <span className={`status-pill ${pct >= 60 ? "active" : "suspended"}`}>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "currentColor", flexShrink: 0 }} />
                            {pct >= 80 ? "Excellent" : pct >= 70 ? "Passing" : "Needs Work"}
                          </span>
                        </td>
                        <td>
                          {isEditing ? (
                            <button className="btn btn-primary btn-icon btn-sm" onClick={() => saveEdited(g.id)}>
                              <CheckCircle size={13} />
                            </button>
                          ) : (
                            <button className="btn btn-ghost btn-icon btn-sm" onClick={() => startEditing(g.id, g.score)}>
                              <Edit2 size={13} />
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Course Materials */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon amber" style={{ background: "#fffbeb", color: "#d97706" }}>
                  <FileText size={15} />
                </div>
                <div className="card-title">Course Materials</div>
              </div>
              <button className="btn btn-secondary btn-sm"><Upload size={13} /> Upload</button>
            </div>
            <div>
              {COURSE_MATERIALS.map((m, i) => (
                <div key={i} className="list-row">
                  <div className="list-row-left">
                    <span style={{
                      fontSize: "0.6rem", fontWeight: 800, background: m.type === "PDF" ? "#fff1f2" : "#eef2ff",
                      color: m.type === "PDF" ? "#be123c" : "#4338ca",
                      padding: "0.2rem 0.4rem", borderRadius: "0.25rem", fontFamily: "var(--font-mono)"
                    }}>{m.type}</span>
                    <div>
                      <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-slate-900)" }}>{m.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--color-slate-400)" }}>{m.size}</div>
                    </div>
                  </div>
                  <button className="btn btn-ghost btn-sm">Download</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Grade Distribution */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon indigo" style={{ background: "#eef2ff", color: "#4f46e5" }}>
                  <BarChart3 size={15} />
                </div>
                <div className="card-title">Grade Distribution</div>
              </div>
            </div>
            <div style={{ padding: "0.875rem" }}>
              <GradeDistChart grades={currentGrades} />
              <div style={{ marginTop: "0.75rem", padding: "0.625rem", background: "#f8fafc", borderRadius: "0.625rem", textAlign: "center" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--color-slate-500)" }}>Course Average: </span>
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 800, color: "var(--color-emerald-700)", fontSize: "0.875rem" }}>
                  {avgPct.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon emerald" style={{ background: "#ecfdf5", color: "#059669" }}>
                  <Calendar size={15} />
                </div>
                <div className="card-title">Today's Schedule</div>
              </div>
            </div>
            <div>
              {SCHEDULE_TODAY.map((s, i) => {
                const isDone = s.status === "Completed";
                return (
                  <div key={i} className="list-row">
                    <div className="list-row-left">
                      <div style={{
                        width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
                        background: isDone ? "var(--color-emerald-500)" : "var(--color-primary)"
                      }} />
                      <div>
                        <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-slate-900)" }}>
                          {s.course}
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "var(--color-slate-400)", fontFamily: "var(--font-mono)" }}>
                          {s.time} · {s.room}
                        </div>
                      </div>
                    </div>
                    <span className={`status-pill ${isDone ? "active" : "pending"}`} style={{ fontSize: "0.6rem" }}>
                      {s.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Quick Stats</div>
            </div>
            <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[
                { label: "Pass Rate",    value: `${Math.round(currentGrades.filter(g => (g.score/g.maxScore)*100 >= 60).length / Math.max(currentGrades.length,1) * 100)}%`, color: "var(--color-emerald-600)" },
                { label: "Avg Score",   value: `${avgPct.toFixed(1)}%`, color: "var(--color-indigo-600)" },
                { label: "Assignments", value: `${currentGrades.length} items`, color: "var(--color-amber-600)" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.8125rem", color: "var(--color-slate-600)", fontWeight: 600 }}>{s.label}</span>
                  <span style={{ fontSize: "0.875rem", fontWeight: 800, color: s.color, fontFamily: "var(--font-mono)" }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
