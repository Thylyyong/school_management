import React, { useState } from "react";
import { Search, PlusCircle, Trash2 } from "lucide-react";

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
    <div className="flex flex-col gap-6">
      
      <div className="flex flex-col md-flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Student Directory & Profiles</h2>
          <p className="text-xs text-slate-500">Review status, parents contact logs, registration indexes and attendance averages.</p>
        </div>

        <div className="flex items-center gap-2 w-full" style={{maxWidth: '24rem'}}>
          <div className="search-container">
            <span className="search-icon"><Search className="w-4 h-4" /></span>
            <input
              type="text"
              value={studentsSearch}
              onChange={(e) => setStudentsSearch(e.target.value)}
              placeholder="Search by name, grade, status..."
              className="search-input"
            />
          </div>

          <button
            onClick={() => setShowAddStudentForm(!showAddStudentForm)}
            className="btn-primary"
          >
            <PlusCircle className="w-4 h-4" /> Onboard
          </button>
        </div>
      </div>

      {/* Modal Onboarding form */}
      {showAddStudentForm && (
        <form onSubmit={handleCreateStudent} className="card" style={{borderColor: 'var(--color-indigo-200)'}}>
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

      {/* Students Table */}
      <div className="card" style={{padding: 0, overflow: 'hidden'}}>
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>Student ID / Name</th>
                <th>Grade level</th>
                <th>Academic Email</th>
                <th>Emergency details</th>
                <th>Attendance Percent</th>
                <th>Status</th>
                <th className="text-right">Records action</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-slate-400 py-8">
                    No matching student records found. Enter alternate query parameters.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((st) => {
                  let statusClass = "emerald";
                  if (st.status === "On Leave") statusClass = "amber";
                  if (st.status === "Suspended") statusClass = "rose";

                  return (
                    <tr key={st.id}>
                      <td>
                        <div className="flex items-center gap-2">
                          <span className="font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 rounded text-[10px] font-bold border border-indigo-100">
                            {st.id}
                          </span>
                          <span className="font-semibold text-slate-800">{st.name}</span>
                        </div>
                      </td>
                      <td>{st.gradeLevel}</td>
                      <td className="font-mono">{st.email}</td>
                      <td>{st.parentContact}</td>
                      <td className="font-mono font-bold text-indigo-600">
                        {st.attendancePercent}%
                      </td>
                      <td>
                        <span className={`badge ${statusClass}`}>
                          {st.status}
                        </span>
                      </td>
                      <td className="text-right">
                        <button
                          onClick={() => onDeleteStudent(st.id)}
                          className="p-1 text-slate-400 hover-text-rose-600"
                          style={{transition: 'color 0.2s'}}
                          title="Delete Student Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
