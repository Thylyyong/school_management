import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function LessonsTab({ activeCourse, lessonPlans, onAddLessonPlan, onUpdateLessonPlan }) {
  // Lesson planner helper state
  const [newLessonTitle, setNewLessonTitle] = useState("");
  const [newLessonDesc, setNewLessonDesc] = useState("");
  const [newLessonDue, setNewLessonDue] = useState("");

  const handleCreateLesson = (e) => {
    e.preventDefault();
    if (!newLessonTitle.trim()) return;

    const plan = {
      id: "LP-" + (10 + lessonPlans.length + Math.floor(Math.random() * 20)),
      title: newLessonTitle,
      description: newLessonDesc || "No supplementary description supplied.",
      dueDate: newLessonDue || new Date().toISOString().split('T')[0],
      status: "Draft",
      classCode: activeCourse?.code || "PHYS-102"
    };

    onAddLessonPlan(plan);
    setNewLessonTitle("");
    setNewLessonDesc("");
    setNewLessonDue("");
  };

  // Drag and drop or simple click-to-move lesson status shifts
  const shiftLessonStatus = (lessonId, currentStatus) => {
    let nextStatus = "Draft";
    if (currentStatus === "Draft") nextStatus = "Review";
    else if (currentStatus === "Review") nextStatus = "Completed";
    else nextStatus = "Draft";

    onUpdateLessonPlan(lessonId, { status: nextStatus });
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Quick deployment input form */}
      <form onSubmit={handleCreateLesson} className="card text-white shadow-md" style={{background: 'linear-gradient(to top right, var(--color-emerald-900), var(--color-emerald-700))', borderColor: 'transparent'}}>
        <div className="mb-4">
          <h3 className="font-bold text-emerald-100 text-sm">Deploy lesson material outline</h3>
          <p className="text-xs text-white" style={{opacity: 0.8}}>Establish study goals, required templates, or review items details.</p>
        </div>

        <div className="grid grid-cols-1 md-grid-cols-3 gap-3">
          <input
            type="text"
            required
            value={newLessonTitle}
            onChange={(e) => setNewLessonTitle(e.target.value)}
            placeholder="Task Outline (e.g. Laser Refraction Calculations)"
            className="form-input"
            style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)'}}
          />
          <input
            type="text"
            value={newLessonDesc}
            onChange={(e) => setNewLessonDesc(e.target.value)}
            placeholder="Brief resources summary / lab kits allocation"
            className="form-input"
            style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)'}}
          />
          <div className="flex gap-2">
            <input
              type="date"
              value={newLessonDue}
              onChange={(e) => setNewLessonDue(e.target.value)}
              className="form-input font-mono flex-1"
              style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'rgba(255,255,255,0.2)'}}
            />
            <button type="submit" className="shrink-0 font-extrabold text-xs px-4" style={{backgroundColor: 'white', color: 'var(--color-emerald-900)', borderRadius: '0.75rem', transition: 'background-color 0.2s'}}>
              Add outline
            </button>
          </div>
        </div>
      </form>

      {/* Kanban Columns Status Lists */}
      <div className="grid grid-cols-1 md-grid-cols-3 gap-6">
        
        {/* STATUS COLUMN 1: DRAFT */}
        <div className="card" style={{padding: '1rem'}}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-slate-400 rounded-full" />
              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Draft Material</h4>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-bold font-mono">
              {lessonPlans.filter(lp => lp.status === "Draft" && lp.classCode === activeCourse?.code).length}
            </span>
          </div>

          <div className="flex flex-col gap-3 min-h-[200px]">
            {lessonPlans.filter(lp => lp.status === "Draft" && lp.classCode === activeCourse?.code).map(plan => (
              <div key={plan.id} className="p-4 bg-slate-50 border border-slate-200 hover-border-slate-300 transition-all text-xs" style={{borderRadius: '1rem'}}>
                <div className="mb-3">
                  <span className="block font-bold text-slate-800 text-sm">{plan.title}</span>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{plan.description}</p>
                </div>
                <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Due: {plan.dueDate}</span>
                  <button
                    onClick={() => shiftLessonStatus(plan.id, "Draft")}
                    className="text-xs font-bold text-indigo-600 hover-text-indigo-800 flex items-center gap-1 font-sans"
                  >
                    Review <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STATUS COLUMN 2: REVIEW */}
        <div className="card" style={{padding: '1rem'}}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-amber-400 rounded-full" />
              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">In Review</h4>
            </div>
            <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded font-bold font-mono">
              {lessonPlans.filter(lp => lp.status === "Review" && lp.classCode === activeCourse?.code).length}
            </span>
          </div>

          <div className="flex flex-col gap-3 min-h-[200px]">
            {lessonPlans.filter(lp => lp.status === "Review" && lp.classCode === activeCourse?.code).map(plan => (
              <div key={plan.id} className="p-4 bg-white border border-amber-200 hover-border-amber-300 transition-all text-xs" style={{borderRadius: '1rem', boxShadow: 'var(--shadow-sm)'}}>
                <div className="mb-3">
                  <span className="block font-bold text-slate-800 text-sm">{plan.title}</span>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">{plan.description}</p>
                </div>
                <div className="border-t border-amber-100 pt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Due: {plan.dueDate}</span>
                  <button
                    onClick={() => shiftLessonStatus(plan.id, "Review")}
                    className="text-xs font-bold text-emerald-600 hover-text-emerald-800 flex items-center gap-1 font-sans"
                  >
                    Finalize <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STATUS COLUMN 3: COMPLETED */}
        <div className="card" style={{padding: '1rem'}}>
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-emerald-500 rounded-full" />
              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Completed</h4>
            </div>
            <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded font-bold font-mono">
              {lessonPlans.filter(lp => lp.status === "Completed" && lp.classCode === activeCourse?.code).length}
            </span>
          </div>

          <div className="flex flex-col gap-3 min-h-[200px]">
            {lessonPlans.filter(lp => lp.status === "Completed" && lp.classCode === activeCourse?.code).map(plan => (
              <div key={plan.id} className="p-4 bg-emerald-50/50 border border-emerald-100 transition-all text-xs" style={{borderRadius: '1rem'}}>
                <div className="mb-3">
                  <span className="block font-bold text-slate-800 text-sm" style={{textDecoration: 'line-through', opacity: 0.7}}>{plan.title}</span>
                </div>
                <div className="border-t border-emerald-100 pt-3 flex items-center justify-between">
                  <span className="text-xs text-slate-400 font-mono">Archived</span>
                  <span className="text-emerald-700 font-bold flex items-center gap-1 font-sans">
                    Published
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
