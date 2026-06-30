import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function GradesTab({ courses }) {
  // Accordion track for individual course details
  const [expandedCourseId, setExpandedCourseId] = useState("C-101");

  const toggleCourseRow = (id) => {
    if (expandedCourseId === id) {
      setExpandedCourseId(null);
    } else {
      setExpandedCourseId(id);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      <div className="hero-banner">
        <div className="relative z-10 space-y-2">
          <span className="badge indigo bg-indigo-500 bg-opacity-30 border-indigo-400 font-mono tracking-widest text-indigo-100 border text-xs">Continuous assessments active</span>
          <h2 className="hero-title">Full Cumulative Transcript Overview</h2>
          <p className="hero-desc">Below contains registered AP coursework terms. Open accordion nodes to view physical laboratory scores, essay remarks, and homework items averages.</p>
        </div>
      </div>

      {/* Courses accordion lists */}
      <div className="flex flex-col gap-3">
        {courses.map(course => {
          const isExpanded = expandedCourseId === course.id;
          
          // Calculate Course overall percent instantly
          const percent = course.grades.length > 0
            ? (course.grades.reduce((sum, g) => sum + (g.score / g.maxScore) * g.weight, 0) / course.grades.reduce((sum, g) => sum + g.weight, 0)) * 100
            : 0;

          return (
            <div key={course.id} className="card" style={{padding: 0, overflow: 'hidden'}}>
              
              {/* Header trigger bar */}
              <div 
                onClick={() => toggleCourseRow(course.id)}
                className="flex flex-col sm-flex-row sm:items-center justify-between gap-4 p-4 cursor-pointer select-none transition-colors border-b border-transparent hover-bg-slate-50"
              >
                
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold font-mono text-xs">
                    {course.code}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm">{course.name}</h3>
                    <span className="text-xs text-slate-400 block font-medium mt-1">Instructor: <strong className="text-slate-600">{course.teacherName}</strong> • {course.schedule}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block" style={{fontSize: '0.625rem'}}>Standalone Standing</span>
                    <span className="text-sm font-black text-slate-900 font-mono mt-1 block">{percent.toFixed(1)}% ({percent >= 90 ? 'Grade A' : percent >= 80 ? 'Grade B' : 'Grade C'})</span>
                  </div>

                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5 text-indigo-600" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

              </div>

              {/* Collapsible Panel contents */}
              {isExpanded && (
                <div className="p-4 bg-slate-50 border-t border-slate-100 font-mono text-xs flex flex-col gap-2">
                  <div className="pb-3 border-b border-slate-200 text-slate-500 font-sans text-xs flex justify-between items-center">
                    <strong className="text-slate-700">Individual assignment breakdowns</strong>
                    <span className="text-xs font-mono bg-indigo-100 text-indigo-800 rounded px-2 py-0.5 font-bold" style={{fontSize: '0.625rem'}}>Weighted GPA scale calculations</span>
                  </div>
                  {course.grades.map(g => (
                    <div key={g.id} className="py-2 flex justify-between items-center" style={{borderBottom: '1px solid var(--color-slate-100)'}}>
                      <span className="font-sans text-slate-700 font-medium">{g.title}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400" style={{fontSize: '0.6875rem'}}>Weight value: {g.weight}%</span>
                        <span className="font-black text-slate-900">{g.score} <span className="text-slate-400 font-medium">/ {g.maxScore}</span></span>
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 rounded px-1.5 py-0.5 font-black uppercase text-center" style={{fontSize: '0.5625rem'}}>
                          {((g.score / g.maxScore) * 100).toFixed(0)}% score
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
}
