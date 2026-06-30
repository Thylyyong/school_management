import React, { useState } from "react";
import { Users, Link2, Plus } from "lucide-react";

export default function StudyGroupsTab({ courses, studyGroups, onAddStudyGroup }) {
  // Study Group Addition Form state
  const [newGroupName, setNewGroupName] = useState("");
  const [targetCourseCode, setTargetCourseCode] = useState("PHYS-102");
  const [zoomUrl, setZoomUrl] = useState("https://meet.google.com/xyz-optics");

  const handleCreateCluster = (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) return alert("Please supply a valid cluster group name.");

    const group = {
      id: "SG-" + (10 + studyGroups.length + Math.floor(Math.random() * 20)),
      name: newGroupName,
      courseCode: targetCourseCode,
      memberCount: 1, // local student initial joiner
      meetingLink: zoomUrl || "https://meet.google.com/custom"
    };

    onAddStudyGroup(group);
    setNewGroupName("");
    setZoomUrl("https://meet.google.com/");
    alert("Study cluster deployed successfully! Other students can join your team corridor.");
  };

  return (
    <div className="grid grid-cols-1 lg-grid-cols-3 gap-6">
      
      {/* Active groups list */}
      <div className="lg-col-span-2 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 text-base">Active Study peer groups</h3>
          <span className="text-xs text-slate-400">Total available corridors: {studyGroups.length}</span>
        </div>

        <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
          {studyGroups.map(group => (
            <div key={group.id} className="card hover-shadow-sm transition-all space-y-4 flex flex-col justify-between" style={{padding: '1rem'}}>
              <div className="space-y-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-slate-100 text-indigo-700 rounded px-2 py-0.5 font-bold font-mono uppercase" style={{fontSize: '0.625rem'}}>{group.courseCode}</span>
                  <span className="text-xs text-slate-400 font-mono" style={{fontSize: '0.625rem'}}>Cluster ID: {group.id}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm mb-1">{group.name}</h4>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-slate-400" /> {group.memberCount} active colleagues connected
                </span>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <a 
                  href={group.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-100 hover-bg-slate-200 text-slate-700 text-xs font-bold p-1 px-3 rounded-md flex items-center gap-1 select-none transition-colors"
                  style={{fontSize: '0.625rem'}}
                >
                  <Link2 className="w-3 h-3" /> Zoom Link
                </a>
                <button
                  onClick={() => alert("Simulating student enrollment join cluster logic...")}
                  className="text-xs font-black text-indigo-600 hover-underline font-sans"
                >
                  Join Team
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create group sidebar form */}
      <div className="card h-fit space-y-4">
        <div className="mb-4">
          <h3 className="card-title">Register study room cluster</h3>
          <p className="card-subtitle">Assemble colleagues to prepare for linear transformations or Optics midterms together.</p>
        </div>

        <form onSubmit={handleCreateCluster} className="space-y-3 flex flex-col gap-3">
          <div className="form-group">
            <label className="form-label">Group Identifier Topic</label>
            <input
              type="text"
              required
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              placeholder="e.g. Mechanical Mechanics Prep"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Target Course Code</label>
            <select
              value={targetCourseCode}
              onChange={(e) => setTargetCourseCode(e.target.value)}
              className="form-select"
            >
              {courses.map(course => (
                <option key={course.id} value={course.code}>{course.code} - {course.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Interactive URL Corridor</label>
            <input
              type="url"
              required
              value={zoomUrl}
              onChange={(e) => setZoomUrl(e.target.value)}
              className="form-input font-mono"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-900 text-white font-bold text-xs py-2 px-4 rounded-lg mt-2 flex items-center justify-center gap-2"
            style={{transition: 'background-color 0.2s', backgroundColor: 'var(--color-slate-900)'}}
          >
            <Plus className="w-4 h-4" /> Deploy Study Group
          </button>
        </form>
      </div>

    </div>
  );
}
