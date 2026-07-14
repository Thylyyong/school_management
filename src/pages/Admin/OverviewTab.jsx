import React, { useState } from "react";
import {
  Users, GraduationCap, Laptop, DollarSign, Building2,
  TrendingUp, ArrowUpRight, ArrowDownRight, GripVertical,
  Plus, Download, Filter, MoreHorizontal, CheckCircle2
} from "lucide-react";

/* ── Tiny inline sparkline ── */
function Sparkline({ data, color }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const W = 64, H = 24, step = W / (data.length - 1);
  const pts = data.map((v, i) => `${i * step},${H - ((v - min) / range) * (H - 2) - 1}`).join(" ");
  return (
    <svg width={W} height={H} className="sparkline">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Stat card ── */
function StatCard({ icon: Icon, label, value, trend, trendDir, accent, sparkData }) {
  return (
    <div className="stat-card">
      <div className="stat-card-accent" style={{
        background: {
          indigo: "linear-gradient(180deg,#6366f1,#4f46e5)",
          cyan: "linear-gradient(180deg,#06b6d4,#0891b2)",
          emerald: "linear-gradient(180deg,#10b981,#047857)",
          amber: "linear-gradient(180deg,#f59e0b,#b45309)",
          rose: "linear-gradient(180deg,#f43f5e,#be123c)",
        }[accent]
      }} />
      <div className="stat-card-header" style={{ paddingLeft: "0.5rem" }}>
        <div className={`stat-card-icon ${accent}`}><Icon size={18} /></div>
        {trend && (
          <span className={`stat-card-trend ${trendDir === "up" ? "up" : "down"}`}>
            {trendDir === "up" ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
            {trend}
          </span>
        )}
      </div>
      <div style={{ paddingLeft: "0.5rem" }}>
        <div className="stat-card-value">{value}</div>
        <div className="stat-card-label">{label}</div>
        {sparkData && (
          <div style={{ marginTop: "0.625rem" }}>
            <Sparkline data={sparkData} color={
              { indigo: "#6366f1", cyan: "#06b6d4", emerald: "#10b981", amber: "#f59e0b", rose: "#f43f5e" }[accent]
            } />
          </div>
        )}
      </div>
    </div>
  );
}

function getInitials(name) {
  return (name || "??").split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

function avatarColor(i) {
  const colors = [
    ["#dbeafe","#1e40af"],
    ["#d1fae5","#065f46"],
    ["#ede9fe","#5b21b6"],
    ["#fef3c7","#92400e"],
    ["#ffe4e6","#9f1239"],
  ];
  return colors[i % colors.length];
}

/* ── Sections for drag-and-drop UI (visual only) ── */
const SECTIONS = [
  { id: 1, course: "Physics 401",    teacher: "Dr. Sarah Jenkins", room: "Rm 302", count: 24 },
  { id: 2, course: "History 202",    teacher: "Tom Wright",        room: "Rm 201", count: 18 },
  { id: 3, course: "Calculus III",   teacher: "Dr. Marcus Vance",  room: "Rm 105", count: 30 },
  { id: 4, course: "Intro Biology",  teacher: "Elena Rodriguez",   room: "Rm 210", count: 22 },
];

export default function OverviewTab({ students, faculty, assets, invoices, setActiveSubTab }) {
  const totalPaid    = invoices.filter(i => i.status === "Paid").reduce((a, c) => a + c.amount, 0);
  const totalPending = invoices.filter(i => i.status !== "Paid").reduce((a, c) => a + c.amount, 0);
  const activeStudents = students.filter(s => s.status === "Active").length;
  const activeFaculty  = faculty.filter(f => f.status === "Active").length;

  const [filterRole, setFilterRole] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 4;

  const allUsers = [
    ...faculty.map(f => ({ ...f, role: "Faculty" })),
    ...students.slice(0, 6).map(s => ({ ...s, role: "Student" })),
  ];
  const filtered = filterRole === "All" ? allUsers : allUsers.filter(u => u.role === filterRole);
  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paged = filtered.slice((currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* ── Stat Cards ── */}
      <div className="stat-cards-grid">
        <StatCard
          icon={Users} label="Total Students" value={`${students.length + 1234}`}
          trend="+4.8%" trendDir="up" accent="indigo"
          sparkData={[820,850,890,920,960,980,1010,1050,1080,1120,1180,1240]}
        />
        <StatCard
          icon={GraduationCap} label="Active Faculty" value={activeFaculty || 86}
          trend="+2.1%" trendDir="up" accent="cyan"
          sparkData={[70,72,74,75,78,80,80,82,84,85,86,86]}
        />
        <StatCard
          icon={Building2} label="Classrooms" value={42}
          trend="Stable" trendDir="up" accent="emerald"
          sparkData={[40,40,41,41,42,42,42,42,42,42,42,42]}
        />
        <StatCard
          icon={DollarSign} label="Open Courses" value={12}
          trend="+3 new" trendDir="up" accent="amber"
          sparkData={[7,7,8,8,9,9,10,10,11,11,12,12]}
        />
      </div>

      {/* ── Directory & Access Control ── */}
      <div className="card">
        <div className="card-header">
          <div className="card-header-left">
            <div className="card-icon indigo" style={{ background: "#eef2ff", color: "#4f46e5" }}>
              <Users size={16} />
            </div>
            <div>
              <div className="card-title">Directory &amp; Access Control</div>
              <div className="card-subtitle">Manage system access and user assignments</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
            <select
              className="form-select"
              style={{ width: "auto", fontSize: "0.75rem", padding: "0.3rem 0.625rem" }}
              value={filterRole}
              onChange={e => { setFilterRole(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Roles</option>
              <option value="Faculty">Faculty</option>
              <option value="Student">Student</option>
            </select>
            <button className="btn btn-secondary btn-sm" id="admin-export-btn">
              <Download size={13} /> Export
            </button>
            <button className="btn btn-primary btn-sm" onClick={() => setActiveSubTab("students")} id="admin-new-user-btn">
              <Plus size={13} /> New User
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department / Grade</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((user, i) => {
                const [bgC, txtC] = avatarColor(i);
                const isActive = user.status === "Active";
                return (
                  <tr key={user.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <div className="avatar avatar-sm" style={{ background: bgC, color: txtC }}>
                          {getInitials(user.name)}
                        </div>
                        <div>
                          <div className="user-row-name">{user.name}</div>
                          <div className="user-row-email">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={`badge ${user.role === "Faculty" ? "indigo" : "cyan"}`}>{user.role}</span></td>
                    <td style={{ fontSize: "0.8125rem", color: "var(--color-slate-600)" }}>
                      {user.department || user.gradeLevel || "—"}
                    </td>
                    <td>
                      <span className={`status-pill ${isActive ? "active" : "on-leave"}`}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: isActive ? "#10b981" : "#94a3b8", flexShrink: 0 }} />
                        {user.status}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.75rem", color: "var(--color-slate-400)", fontFamily: "var(--font-mono)" }}>
                      {["Today, 09:41","Yesterday, 14:20","Today, 11:05","Sunday, 22:10","Today, 08:30","Sat, 16:45"][i % 6]}
                    </td>
                    <td>
                      <button className="btn btn-ghost btn-icon btn-sm"><MoreHorizontal size={14} /></button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.75rem 1.25rem", borderTop: "1px solid var(--color-slate-100)" }}>
          <span style={{ fontSize: "0.75rem", color: "var(--color-slate-500)" }}>
            Showing {(currentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(currentPage * ROWS_PER_PAGE, filtered.length)} of {filtered.length} entries
          </span>
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`page-btn ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            {currentPage < totalPages && (
              <button className="page-btn" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}>
                Next →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Resource Allocation Section ── */}
      <div className="card">
        <div className="card-header">
          <div className="card-header-left">
            <div className="card-icon emerald" style={{ background: "#ecfdf5", color: "#059669" }}>
              <GripVertical size={16} />
            </div>
            <div>
              <div className="card-title">Resource Allocation — Term 3 Sections</div>
              <div className="card-subtitle">Drag and drop to assign teachers to class sections</div>
            </div>
          </div>
          <button className="btn btn-secondary btn-sm">Auto-Assign Draft</button>
        </div>
        <div className="card-body" style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
          {SECTIONS.map(sec => (
            <div key={sec.id} className="drag-item">
              <GripVertical size={16} className="drag-handle" />
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flex: 1 }}>
                <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-slate-900)", minWidth: "140px" }}>
                  {sec.course}
                </span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-slate-500)", flex: 1 }}>
                  {sec.teacher}
                </span>
                <span className="badge slate">{sec.room}</span>
                <span style={{ fontSize: "0.75rem", color: "var(--color-slate-600)", fontFamily: "var(--font-mono)", fontWeight: 600 }}>
                  {sec.count} students
                </span>
              </div>
              <CheckCircle2 size={15} style={{ color: "var(--color-emerald-500)", flexShrink: 0 }} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
