import React, { useState } from "react";

export default function ProfileTab({ username }) {
  // Interactive profile customizer state
  const [studentBio, setStudentBio] = useState("Grade 12 Advanced AP tracks student. Aspiring mechanical engineer & light physics enthusiast.");
  const [guardianPhone, setGuardianPhone] = useState("+1 (555) 234-5678");
  const [profileSuccessMsg, setProfileSuccessMsg] = useState("");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileSuccessMsg("Profile variables committed locally.");
    setTimeout(() => setProfileSuccessMsg(""), 3000);
  };

  return (
    <div className="card space-y-4 max-w-xl mx-auto">
      <div className="flex items-center gap-4 border-b border-slate-100 pb-5 mb-5">
        <div className="w-12 h-12 bg-indigo-600 text-white font-black text-lg flex items-center justify-center rounded-xl">
          {username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Amira Patel</h3>
          <span className="text-[10px] text-slate-400 font-mono block mt-1">COHORT REGISTRY: S101 • ACTIVE GRADE 12</span>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-4 flex flex-col gap-4">
        
        <div className="form-group">
          <label className="form-label">Authorized Profile Bio</label>
          <textarea
            required
            value={studentBio}
            onChange={(e) => setStudentBio(e.target.value)}
            className="form-input min-h-[80px] resize-y"
            style={{minHeight: '80px'}}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Emergency Parent Guardian phone contact</label>
          <input
            type="text"
            required
            value={guardianPhone}
            onChange={(e) => setGuardianPhone(e.target.value)}
            className="form-input font-mono"
          />
        </div>

        {profileSuccessMsg && (
          <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl font-medium border border-emerald-100 mt-2">
            {profileSuccessMsg}
          </div>
        )}

        <button
          type="submit"
          className="btn-primary w-full text-center flex justify-center py-3 mt-2"
          style={{backgroundColor: 'var(--color-slate-900)'}}
        >
          Commit changes
        </button>

      </form>
    </div>
  );
}
