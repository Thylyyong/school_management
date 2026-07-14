import React, { useState } from "react";
import { Search, Plus, Trash2, UserPlus } from "lucide-react";

export default function StudentsTab({ students, onAddStudent, onDeleteStudent }) {
  // Local state for this tab
  const [studentsSearch, setStudentsSearch] = useState("");
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);

  // Form states
  const [sName, setSName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sGrade, setSGrade] = useState("Grade 10");
  const [sParent, setSParent] = useState("");

  const handleCreateStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      id: "S" + (100 + students.length + Math.floor(Math.random() * 900)),
      name: sName,
      email: sEmail,
      gradeLevel: sGrade,
      parentContact: sParent,
      status: "Active",
      attendancePercent: 100.0
    };
    onAddStudent(newStudent);

    // Reset form
    setSName("");
    setSEmail("");
    setSGrade("Grade 10");
    setSParent("");
    setShowAddStudentForm(false);
  };

  // Filter students based on search query
  const filteredStudents = students.filter(st => {
    const matchName = st.name.toLowerCase().includes(studentsSearch.toLowerCase());
    const matchEmail = st.email.toLowerCase().includes(studentsSearch.toLowerCase());
    const matchGrade = st.gradeLevel.toLowerCase().includes(studentsSearch.toLowerCase());
    return matchName || matchEmail || matchGrade;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      
      <div className="page-section-header">
        <div>
          <div className="page-section-title">Student Directory</div>
          <div className="page-section-subtitle">Review enrollment status, attendance, and contact information.</div>
        </div>
        <div className="page-section-actions">
          <div className="search-container" style={{ minWidth: 220 }}>
            <Search size={14} className="search-icon" />
            <input
              type="text"
              value={studentsSearch}
              onChange={e => setStudentsSearch(e.target.value)}
              placeholder="Search students…"
              className="search-input"
            />
          </div>
          <button className="btn btn-primary btn-sm" id="admin-add-student-btn" onClick={() => setShowAddStudentForm(v => !v)}>
            <UserPlus size={14} /> {showAddStudentForm ? "Cancel" : "Add Student"}
          </button>
        </div>
      </div>

      {showAddStudentForm && (
        <form onSubmit={handleCreateStudent} className="card" style={{ border: "1.5px solid var(--color-indigo-200)" }}>
          <div className="card-header">
            <h3 className="card-title" style={{color: 'var(--color-indigo-900)'}}>Add New Student Profile on Core Registry</h3>
            <button type="button" onClick={() => setShowAddStudentForm(false)} className="text-xs text-slate-400">Cancel</button>
          </div>
          <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-4 gap-4">
            <div className="form-group">
              <label className="form-label">Full Legal Name</label>
              <input
                type="text"
                required
                value={sName}
                onChange={(e) => setSName(e.target.value)}
                placeholder="e.g. Liam Sterling"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Academic Email</label>
              <input
                type="email"
                required
                value={sEmail}
                onChange={(e) => setSEmail(e.target.value)}
                placeholder="l.sterling@edumanager.org"
                className="form-input font-mono"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Grade Placement</label>
              <select
                value={sGrade}
                onChange={(e) => setSGrade(e.target.value)}
                className="form-select"
              >
                <option value="Grade 10">Grade 10</option>
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Emergency Parent Contact</label>
              <input
                type="text"
                required
                value={sParent}
                onChange={(e) => setSParent(e.target.value)}
                placeholder="+1 (555) 777-8899"
                className="form-input"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 mt-2" style={{borderTop: '1px solid var(--color-slate-100)'}}>
            <button type="submit" className="btn-primary">
              Confirm & Onboard
            </button>
          </div>
        </form>
      )}

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Student</th>
                <th>Grade</th>
                <th>Email</th>
                <th>Parent Contact</th>
                <th>Attendance</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "2rem", color: "var(--color-slate-400)" }}>
                    No matching students found.
                  </td>
                </tr>
              ) : filteredStudents.map((st, i) => {
                const statusCls = st.status === "Active" ? "active" : st.status === "On Leave" ? "on-leave" : "suspended";
                const bgColors = [["#dbeafe","#1e40af"],["#d1fae5","#065f46"],["#ede9fe","#5b21b6"],["#fef3c7","#92400e"],["#ffe4e6","#9f1239"]];
                const [bg, tx] = bgColors[i % bgColors.length];
                return (
                  <tr key={st.id}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                        <div className="avatar avatar-sm" style={{ background: bg, color: tx }}>
                          {st.name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase()}
                        </div>
                        <div>
                          <div className="user-row-name">{st.name}</div>
                          <div style={{ fontSize: "0.6875rem", color: "var(--color-slate-400)", fontFamily: "var(--font-mono)" }}>{st.id}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: "0.8125rem", color: "var(--color-slate-600)" }}>{st.gradeLevel}</td>
                    <td style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--color-slate-500)" }}>{st.email}</td>
                    <td style={{ fontSize: "0.8125rem", color: "var(--color-slate-600)" }}>{st.parentContact}</td>
                    <td>
                      <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: "0.8125rem", color: st.attendancePercent >= 90 ? "var(--color-emerald-700)" : "var(--color-amber-700)" }}>
                        {st.attendancePercent}%
                      </span>
                    </td>
                    <td><span className={`status-pill ${statusCls}`}><span style={{ width:5,height:5,borderRadius:"50%",background:"currentColor",flexShrink:0 }} />{st.status}</span></td>
                    <td style={{ textAlign: "right" }}>
                      <button className="btn btn-danger btn-icon btn-sm" onClick={() => onDeleteStudent(st.id)} title="Remove student">
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
