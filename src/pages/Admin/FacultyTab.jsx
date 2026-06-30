import React, { useState } from "react";
import { Search, Plus, Trash2, Users } from "lucide-react";

export default function FacultyTab({ faculty, onAddFaculty, onDeleteFaculty }) {
  const [facultySearch, setFacultySearch] = useState("");
  const [showAddFacultyForm, setShowAddFacultyForm] = useState(false);

  // Form states
  const [fName, setFName] = useState("");
  const [fEmail, setFEmail] = useState("");
  const [fDept, setFDept] = useState("Science & Physics");
  const [fPhone, setFPhone] = useState("");

  const handleCreateFaculty = (e) => {
    e.preventDefault();
    const newFaculty = {
      id: "F" + (300 + faculty.length + Math.floor(Math.random() * 900)),
      name: fName,
      email: fEmail,
      department: fDept,
      phone: fPhone,
      status: "Active",
      assignedClassesCount: 0
    };
    onAddFaculty(newFaculty);

    setFName("");
    setFEmail("");
    setFDept("Science & Physics");
    setFPhone("");
    setShowAddFacultyForm(false);
  };

  // Filter faculty members
  const filteredFaculties = faculty.filter(fa => {
    const matchName = fa.name.toLowerCase().includes(facultySearch.toLowerCase());
    const matchDept = fa.department.toLowerCase().includes(facultySearch.toLowerCase());
    return matchName || matchDept;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md-flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Faculty & Department Instructors</h2>
          <p className="text-xs text-slate-500">Track assigned course schedules, department divisions, active status and phone contact indexes.</p>
        </div>

        <div className="flex items-center gap-2 w-full" style={{maxWidth: '24rem'}}>
          <div className="search-container">
            <span className="search-icon"><Search className="w-4 h-4" /></span>
            <input
              type="text"
              value={facultySearch}
              onChange={(e) => setFacultySearch(e.target.value)}
              placeholder="Search by name or department..."
              className="search-input"
            />
          </div>

          <button
            onClick={() => setShowAddFacultyForm(!showAddFacultyForm)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" /> Add Academic Staff
          </button>
        </div>
      </div>

      {/* Modal Add Faculty Form */}
      {showAddFacultyForm && (
        <form onSubmit={handleCreateFaculty} className="card" style={{borderColor: 'var(--color-indigo-200)'}}>
          <div className="card-header">
            <h3 className="card-title" style={{color: 'var(--color-indigo-900)'}}>Deploy New Academic Instruction Staff</h3>
            <button type="button" onClick={() => setShowAddFacultyForm(false)} className="text-xs text-slate-400">Cancel</button>
          </div>
          <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-4 gap-4">
            <div className="form-group">
              <label className="form-label">Instructor Name</label>
              <input
                type="text"
                required
                value={fName}
                onChange={(e) => setFName(e.target.value)}
                placeholder="Dr. Eleanor Vance"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Professional Email</label>
              <input
                type="email"
                required
                value={fEmail}
                onChange={(e) => setFEmail(e.target.value)}
                placeholder="e.vance@edumanager.org"
                className="form-input font-mono"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Target Department</label>
              <select
                value={fDept}
                onChange={(e) => setFDept(e.target.value)}
                className="form-select"
              >
                <option value="Science & Physics">Science & Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="History & Hum.">History & Hum.</option>
                <option value="Languages">Languages</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Contact Phone</label>
              <input
                type="text"
                required
                value={fPhone}
                onChange={(e) => setFPhone(e.target.value)}
                placeholder="+1 (555) 123-1122"
                className="form-input"
              />
            </div>
          </div>

          <div className="flex justify-end pt-2 mt-2" style={{borderTop: '1px solid var(--color-slate-100)'}}>
            <button type="submit" className="btn-primary">
              Approve & Deploy Staff
            </button>
          </div>
        </form>
      )}

      {/* Faculty List layout */}
      <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
        {filteredFaculties.length === 0 ? (
          <div className="card text-center text-slate-400 lg-col-span-2 py-8">
            No matching faculty members found.
          </div>
        ) : (
          filteredFaculties.map((fac) => (
            <div key={fac.id} className="card" style={{position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
              <button
                onClick={() => onDeleteFaculty(fac.id)}
                className="text-slate-400 hover-text-rose-600"
                style={{position: 'absolute', top: '1rem', right: '1rem', transition: 'color 0.2s', padding: '0.25rem'}}
                title="Terminate Faculty Entry"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-700" style={{borderRadius: '0.75rem'}}>
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{fac.name}</h3>
                    <span className="text-xs text-slate-400 font-mono tracking-wider">MEMBER ID: {fac.id}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2" style={{borderTop: '1px solid var(--color-slate-100)', fontSize: '0.75rem'}}>
                  <div>
                    <span className="text-slate-400 block font-bold uppercase" style={{fontSize: '0.625rem'}}>Department</span>
                    <span className="text-slate-700 font-medium">{fac.department}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block font-bold uppercase" style={{fontSize: '0.625rem'}}>Active classes</span>
                    <span className="text-slate-700 font-medium">{fac.assignedClassesCount} slots</span>
                  </div>
                </div>

                <div className="text-xs space-y-1 pt-1 font-mono">
                  <span className="text-slate-500 block">📞 {fac.phone}</span>
                  <span className="text-slate-500 block">✉️ {fac.email}</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between p-2 bg-slate-50 border border-slate-100" style={{borderRadius: '0.75rem'}}>
                <span className={`badge ${fac.status === "Active" ? "emerald" : "amber"}`}>
                  {fac.status}
                </span>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
