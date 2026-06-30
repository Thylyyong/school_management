import React, { useState } from "react";

export default function AttendanceTab({ studentsInClass }) {
  // Local Attendance list state mock for physical checks
  const [attendanceRecords, setAttendanceRecords] = useState({
    "S101": "Present",
    "S102": "Present",
    "S103": "Late",
    "S104": "Absent",
    "S105": "Present",
    "S106": "Present"
  });

  // Toggle single attendance state
  const handleToggleAttendance = (studentId) => {
    const current = attendanceRecords[studentId] || "Present";
    let next = "Present";
    if (current === "Present") next = "Absent";
    else if (current === "Absent") next = "Late";
    else next = "Present";

    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: next
    }));
  };

  // Attendance stats for selected checking grid
  const attendanceValues = Object.values(attendanceRecords);
  const countPresent = attendanceValues.filter(v => v === "Present").length;
  const countLate = attendanceValues.filter(v => v === "Late").length;
  const countAbsent = attendanceValues.filter(v => v === "Absent").length;
  const currentAttendanceRate = studentsInClass.length > 0 
    ? ((countPresent + (countLate * 0.5)) / studentsInClass.length) * 100 
    : 100;

  return (
    <div className="card space-y-4">
      
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-bold text-slate-800 text-sm">Class-wide attendance ledger checks</h3>
          <p className="text-xs text-slate-400">Maintain daily checklists. Simply click records to rotate metrics instantly.</p>
        </div>

        {/* Attendance metrics */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="badge emerald border border-emerald-200">Present: {countPresent}</span>
          <span className="badge amber border border-amber-200">Late: {countLate}</span>
          <span className="badge rose border border-rose-200">Absent: {countAbsent}</span>
          <span className="badge indigo border border-indigo-200">Session Rate: {currentAttendanceRate.toFixed(0)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {studentsInClass.map(student => {
          const status = attendanceRecords[student.id] || "Present";
          let statusClass = "bg-emerald-100 text-emerald-800 border-emerald-200";
          if (status === "Absent") statusClass = "bg-rose-100 text-rose-800 border-rose-200";
          if (status === "Late") statusClass = "bg-amber-100 text-amber-800 border-amber-200";

          return (
            <div 
              key={student.id} 
              onClick={() => handleToggleAttendance(student.id)}
              className="p-4 bg-slate-50 border border-slate-200 hover:border-indigo-600 transition-all cursor-pointer flex justify-between items-center select-none"
              style={{borderRadius: '1rem'}}
            >
              <div>
                <span className="block text-sm font-bold text-slate-800">{student.name}</span>
                <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">{student.id} • {student.gradeLevel}</span>
              </div>

              <div className="text-right">
                <span className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider border ${statusClass}`}>
                  {status}
                </span>
                <span className="block text-[9px] text-slate-400 mt-1 uppercase font-bold tracking-widest">Click to Toggle</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
