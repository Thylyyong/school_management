import React, { useState, useEffect } from "react";
import {
  AlertTriangle, Clock, ChevronRight, ChevronDown,
  BookOpen, Users, DollarSign, TrendingUp,
  ExternalLink, Library, Calendar, Plus, FileText
} from "lucide-react";

/* ── GPA Circular Ring ── */
function GpaRing({ gpa, size = 100 }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = (gpa / 4.0);
  const dash = circumference * pct;
  const color = gpa >= 3.5 ? "#10b981" : gpa >= 3.0 ? "#6366f1" : gpa >= 2.5 ? "#f59e0b" : "#ef4444";
  return (
    <div className="gpa-ring-container" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="#f1f5f9" strokeWidth={8} />
        <circle
          cx={size/2} cy={size/2} r={radius}
          fill="none" stroke={color} strokeWidth={8}
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s ease" }}
        />
      </svg>
      <div className="gpa-ring-label">
        <div className="gpa-ring-value" style={{ color, fontSize: size > 90 ? "1.5rem" : "1.1rem" }}>{gpa}</div>
        <div className="gpa-ring-sub">GPA</div>
      </div>
    </div>
  );
}

/* ── Countdown timer ── */
function useCountdown(targetHours, targetMins) {
  const [time, setTime] = useState({ h: targetHours, m: targetMins, s: 0 });
  useEffect(() => {
    const id = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        if (s > 0) return { h, m, s: s - 1 };
        if (m > 0) return { h, m: m - 1, s: 59 };
        if (h > 0) return { h: h - 1, m: 59, s: 59 };
        return { h: 0, m: 0, s: 0 };
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function CountdownDisplay({ h, m, s }) {
  return (
    <span className="deadline-timer" style={{ fontSize: "1.25rem", animation: "countdown-tick 1s ease infinite" }}>
      {String(h).padStart(2,"0")}h {String(m).padStart(2,"0")}m {String(s).padStart(2,"0")}s
    </span>
  );
}

/* ── Weekly Schedule block colors ── */
const BLOCK_COLORS = [
  "course-block-blue",
  "course-block-indigo",
  "course-block-emerald",
  "course-block-amber",
  "course-block-violet",
  "course-block-rose",
];

const DAYS = ["MON","TUE","WED","THU","FRI"];
const TIMES = ["8:00 AM","9:30 AM","11:00 AM","1:00 PM","2:30 PM"];

/* Generate schedule grid from courses */
function buildSchedule(courses) {
  const grid = {}; // { "MON:8:00 AM": course }
  const dayMap = { Mon: "MON", Tue: "TUE", Wed: "WED", Thu: "THU", Fri: "FRI" };
  const timeMap = { "10:00 AM": "9:30 AM", "09:00 AM": "8:00 AM", "01:00 PM": "1:00 PM" };
  courses.forEach((course, ci) => {
    const sched = course.schedule || "";
    const daysMatch = sched.match(/([A-Z][a-z]+)/g) || [];
    const timeMatch = sched.match(/(\d+:\d+ [AP]M)/);
    const rawTime = timeMatch ? timeMatch[1] : null;
    const time = rawTime ? (timeMap[rawTime] || rawTime) : TIMES[ci % TIMES.length];
    daysMatch.forEach(d => {
      const day = dayMap[d];
      if (day) grid[`${day}:${time}`] = { course, colorClass: BLOCK_COLORS[ci % BLOCK_COLORS.length] };
    });
  });
  return grid;
}

export default function GradesTab({ courses, invoices, studyGroups, events, setActiveTab }) {
  const countdown = useCountdown(2, 15);
  const [expandedCourse, setExpandedCourse] = useState(null);

  const outstanding = (invoices || []).filter(i => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);
  const gpa = 3.8;
  const degreeProgress = 78;
  const scheduleGrid = buildSchedule(courses || []);

  const urgentDeadline = {
    title: `${courses[0]?.name?.split(" ")[0] || "Math"} 301 Midterm Quiz`,
    course: courses[0]?.code || "PHYS-102",
    desc: "Chapters 4-9. Multiple Choice + Problem Solving",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ── Page Header ── */}
      <div className="page-section-header">
        <div>
          <div className="page-section-title">Academic Hub</div>
          <div className="page-section-subtitle">Track your progress and upcoming assignments</div>
        </div>
        <div className="page-section-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => setActiveTab && setActiveTab("profile")}>
            <FileText size={13} /> Transcript
          </button>
          <button className="btn btn-cyan btn-sm">
            <Plus size={13} /> New Task
          </button>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.25rem", alignItems: "start" }}>

        {/* ════ LEFT COLUMN ════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Urgent Deadlines */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon rose" style={{ background: "#fff1f2", color: "#e11d48" }}>
                  <AlertTriangle size={15} />
                </div>
                <div className="card-title">Urgent Deadlines</div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: "0.75rem", color: "var(--color-primary)" }}>
                View All
              </button>
            </div>
            <div style={{ padding: "0.75rem" }}>
              {/* Urgent item */}
              <div className="deadline-item urgent" style={{ marginBottom: "0.75rem" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span className="badge rose" style={{ fontSize: "0.6rem" }}>URGENT</span>
                    <span style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", color: "var(--color-rose-600)", fontWeight: 700 }}>
                      {urgentDeadline.course}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-slate-900)", marginBottom: "0.2rem" }}>
                    {urgentDeadline.title}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-slate-500)" }}>{urgentDeadline.desc}</div>
                </div>
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <CountdownDisplay {...countdown} />
                  <div className="deadline-due-label" style={{ marginTop: "0.25rem" }}>remaining</div>
                </div>
              </div>

              {/* Normal item */}
              <div className="deadline-item normal">
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <span className="badge slate" style={{ fontSize: "0.6rem" }}>ESSAY</span>
                    <span style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", color: "var(--color-slate-500)", fontWeight: 700 }}>
                      {courses[1]?.code || "HIST-220"}
                    </span>
                  </div>
                  <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-slate-900)", marginBottom: "0.2rem" }}>
                    {courses[1]?.name?.slice(0, 28) || "History 202 Essay Draft"}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-slate-500)" }}>
                    Inclusion &amp; Education Analysis — 2,500 words minimum
                  </div>
                </div>
                <div style={{ textAlign: "center", flexShrink: 0 }}>
                  <div className="deadline-timer" style={{ color: "var(--color-slate-700)", fontSize: "1rem" }}>Tomorrow</div>
                  <div className="deadline-due-label" style={{ marginTop: "0.25rem" }}>11:59 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Schedule */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon indigo" style={{ background: "#eef2ff", color: "#4f46e5" }}>
                  <Calendar size={15} />
                </div>
                <div className="card-title">Weekly Schedule</div>
              </div>
              <span style={{ fontSize: "0.75rem", color: "var(--color-slate-400)", fontFamily: "var(--font-mono)" }}>
                Jul 14–18, 2026
              </span>
            </div>
            <div style={{ padding: "0.875rem" }}>
              {/* Day headers */}
              <div style={{ display: "grid", gridTemplateColumns: "60px repeat(5, 1fr)", gap: "0.375rem", marginBottom: "0.375rem" }}>
                <div />
                {DAYS.map(d => (
                  <div key={d} className="schedule-day-header">{d}</div>
                ))}
              </div>
              {/* Time rows */}
              {TIMES.map(time => (
                <div key={time} style={{ display: "grid", gridTemplateColumns: "60px repeat(5, 1fr)", gap: "0.375rem", marginBottom: "0.375rem" }}>
                  <div style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: "var(--color-slate-400)", paddingTop: "0.5rem", textAlign: "right", paddingRight: "0.5rem" }}>
                    {time}
                  </div>
                  {DAYS.map(day => {
                    const key = `${day}:${time}`;
                    const entry = scheduleGrid[key];
                    if (entry) {
                      return (
                        <div key={day} className={`schedule-block ${entry.colorClass}`}>
                          <div style={{ fontWeight: 700, fontSize: "0.6875rem", lineHeight: 1.3 }}>
                            {entry.course.code}
                          </div>
                          <div className="schedule-block-code">{entry.course.room}</div>
                        </div>
                      );
                    }
                    return <div key={day} className="schedule-empty" style={{ background: "#f8fafc", borderRadius: "0.5rem" }} />;
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Course Registration */}
          {courses.length > 0 && (
            <div className="card">
              <div className="card-header">
                <div className="card-header-left">
                  <div className="card-icon cyan" style={{ background: "var(--color-cyan-bg)", color: "var(--color-cyan-dark)" }}>
                    <BookOpen size={15} />
                  </div>
                  <div className="card-title">Course Registration</div>
                </div>
                <button className="btn btn-secondary btn-sm">Enroll</button>
              </div>
              <div style={{ padding: "0.875rem" }}>
                <div style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0.875rem", background: "#f8fafc", borderRadius: "0.75rem",
                  border: "1px solid var(--color-slate-200)"
                }}>
                  <div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-slate-900)" }}>
                      CS 101 Waitlist Update
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-slate-500)", marginTop: "0.2rem" }}>
                      1 seat recently opened
                    </div>
                  </div>
                  <button className="btn btn-cyan btn-sm">Enroll Now</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ════ RIGHT COLUMN ════ */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

          {/* Tuition & Fees */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon amber" style={{ background: "#fffbeb", color: "#d97706" }}>
                  <DollarSign size={15} />
                </div>
                <div className="card-title">Tuition &amp; Fees</div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: "0.75rem" }}>View All</button>
            </div>
            <div style={{ padding: "1rem" }}>
              <div style={{ fontSize: "2rem", fontWeight: 900, color: "var(--color-slate-900)", letterSpacing: "-0.04em" }}>
                ${outstanding > 0 ? outstanding.toLocaleString("en-US", { minimumFractionDigits: 2 }) : "0.00"}
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-rose-600)", fontWeight: 600, marginTop: "0.25rem" }}>
                {outstanding > 0 ? "Due Oct. 31, 2026" : "All payments cleared ✓"}
              </div>
              <button className="btn btn-primary btn-sm" style={{ width: "100%", justifyContent: "center", marginTop: "0.875rem" }}
                onClick={() => setActiveTab && setActiveTab("tuition")}>
                Make a Payment
              </button>
            </div>
          </div>

          {/* Degree Progress */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-icon emerald" style={{ background: "#ecfdf5", color: "#059669" }}>
                  <TrendingUp size={15} />
                </div>
                <div className="card-title">Degree Progress</div>
              </div>
            </div>
            <div style={{ padding: "1rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <GpaRing gpa={gpa} size={90} />
                <div style={{ flex: 1 }}>
                  <div style={{ marginBottom: "0.625rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--color-slate-600)", fontWeight: 600 }}>Credit Hours</span>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-slate-900)", fontFamily: "var(--font-mono)" }}>78/120</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-bar-fill emerald" style={{ width: `${degreeProgress}%` }} />
                    </div>
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-slate-500)", lineHeight: 1.5 }}>
                    <span style={{ fontWeight: 700, color: "var(--color-slate-700)" }}>{degreeProgress}%</span> completed · {120 - 78} credits remaining
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", marginTop: "0.875rem" }}>
                <div style={{ textAlign: "center", padding: "0.625rem", background: "#f8fafc", borderRadius: "0.625rem" }}>
                  <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--color-slate-900)" }}>42</div>
                  <div style={{ fontSize: "0.6rem", color: "var(--color-slate-400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Classrooms</div>
                </div>
                <div style={{ textAlign: "center", padding: "0.625rem", background: "#f8fafc", borderRadius: "0.625rem" }}>
                  <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--color-slate-900)" }}>{courses.length}</div>
                  <div style={{ fontSize: "0.6rem", color: "var(--color-slate-400)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Courses</div>
                </div>
              </div>
            </div>
          </div>

          {/* Current Courses */}
          <div className="card">
            <div className="card-header">
              <div className="card-header-left">
                <div className="card-title">Current Courses</div>
              </div>
              <button className="btn btn-ghost btn-sm" style={{ fontSize: "0.7rem" }} onClick={() => setActiveTab && setActiveTab("assessment")}>
                View All
              </button>
            </div>
            <div>
              {courses.map((course, i) => {
                const pct = course.avgGrade || 85;
                const colorClass = i === 0 ? "indigo" : i === 1 ? "cyan" : "emerald";
                return (
                  <div
                    key={course.id}
                    className="list-row cursor-pointer"
                    onClick={() => setExpandedCourse(expandedCourse === course.id ? null : course.id)}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem" }}>
                        <span style={{ fontSize: "0.6875rem", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--color-primary)" }}>
                          {course.code}
                        </span>
                        <span style={{ fontSize: "0.75rem", color: "var(--color-slate-600)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {course.name}
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div className={`progress-bar-fill ${colorClass}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "0.75rem" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-slate-700)", fontFamily: "var(--font-mono)" }}>
                        {pct}%
                      </span>
                      <ChevronRight size={13} style={{ color: "var(--color-slate-400)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Study Resources */}
          <div className="card" style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)", color: "white" }}>
            <div style={{ padding: "1.125rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                <Library size={18} style={{ color: "#818cf8" }} />
                <div style={{ fontSize: "0.875rem", fontWeight: 700 }}>Need Study Resources?</div>
              </div>
              <p style={{ fontSize: "0.75rem", color: "rgba(226,232,240,0.65)", marginBottom: "0.875rem", lineHeight: 1.6 }}>
                Access the digital library for past papers, e-books, and study guides.
              </p>
              <button className="btn btn-primary btn-sm" style={{ width: "100%", justifyContent: "center", background: "rgba(99,102,241,0.3)", border: "1px solid rgba(99,102,241,0.4)" }}>
                Browse Library
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}


