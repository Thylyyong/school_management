import React from "react";
import { MapPin, CheckCircle } from "lucide-react";

export default function EventsTab({ events, onEnrollEvent }) {
  // Mock user student ID. We'll assume the logged in student is S101 for demo purposes
  const studentId = "S101"; 

  return (
    <div className="flex flex-col gap-6">
      
      <div className="hero-banner" style={{background: 'linear-gradient(to top right, var(--color-amber-900), var(--color-slate-900), var(--color-amber-800))'}}>
        <div className="relative z-10 space-y-2">
          <span className="badge amber bg-amber-500 bg-opacity-30 border-amber-400 font-mono tracking-widest text-amber-100 border text-xs">Extracurricular</span>
          <h2 className="hero-title">Campus Events & Seminars</h2>
          <p className="hero-desc">Enroll in upcoming school activities to earn participation credits and expand your network.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
        {events.map(ev => {
          const isEnrolled = ev.enrolledStudentIds.includes(studentId);

          return (
            <div key={ev.id} className="card hover-shadow-sm transition-all space-y-4 flex flex-col justify-between" style={{padding: '1.25rem'}}>
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-slate-800 text-sm">{ev.title}</h4>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold font-mono whitespace-nowrap" style={{fontSize: '0.625rem'}}>{ev.date}</span>
                </div>
                <p className="text-xs text-slate-500 mb-3 leading-relaxed">{ev.description}</p>
                <div className="text-xs font-medium text-slate-600 bg-slate-50 p-2 rounded border border-slate-100 flex items-center gap-2" style={{fontSize: '0.6875rem'}}>
                  <MapPin className="w-3.5 h-3.5 text-slate-400" /> {ev.location} • {ev.time}
                </div>
              </div>
              
              <div className="mt-4 pt-2">
                {isEnrolled ? (
                  <div className="bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-xs py-2 rounded-lg text-center flex items-center justify-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Enrolled
                  </div>
                ) : (
                  <button 
                    onClick={() => onEnrollEvent(ev.id, studentId)} 
                    className="btn-primary w-full text-center flex justify-center py-2 text-xs"
                    style={{backgroundColor: 'var(--color-indigo-600)'}}
                  >
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
