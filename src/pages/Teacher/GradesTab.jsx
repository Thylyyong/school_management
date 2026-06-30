import React, { useState } from "react";
import { TrendingUp, Award, Users, Save, Edit2 } from "lucide-react";

export default function GradesTab({ activeCourse, studentsInClass, onUpdateCourseGrades }) {
  const [editingGradeId, setEditingGradeId] = useState(null);
  const [editingScoreCode, setEditingScoreCode] = useState(0);

  const currentGrades = activeCourse?.grades || [];
  const averageGradePercent = currentGrades.length > 0 
    ? (currentGrades.reduce((sum, g) => sum + (g.score / g.maxScore) * g.weight, 0) / currentGrades.reduce((sum, g) => sum + g.weight, 0)) * 100
    : 0;

  const startEditingGrade = (gradeId, currentScore) => {
    setEditingGradeId(gradeId);
    setEditingScoreCode(currentScore);
  };

  const saveEditedGrade = (gradeId) => {
    if (!activeCourse) return;
    const nextArr = activeCourse.grades.map(g => {
      if (g.id === gradeId) {
        return { ...g, score: Number(editingScoreCode) };
      }
      return g;
    });
    onUpdateCourseGrades(activeCourse.id, nextArr);
    setEditingGradeId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Top Workspace Stats Card */}
      <div className="grid grid-cols-1 md-grid-cols-3 gap-4">
        <div className="card flex flex-row items-center justify-between">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Computed Course Average</span>
            <span className="text-3xl font-black text-emerald-600 block mt-1 font-mono">{averageGradePercent.toFixed(1)}%</span>
            <span className="text-xs text-slate-500 mt-1 block">Calculated via registered weighting</span>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-700" style={{borderRadius: '1rem'}}>
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="card flex flex-row items-center justify-between">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Active Graded Items</span>
            <span className="text-3xl font-black text-slate-900 block mt-1 font-mono">{currentGrades.length} tasks</span>
            <span className="text-xs text-slate-500 mt-1 block">Exams, homework sets, presentations</span>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-700" style={{borderRadius: '1rem'}}>
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="card flex flex-row items-center justify-between">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">Total Class Cohort Size</span>
            <span className="text-3xl font-black text-slate-900 block mt-1 font-mono">{studentsInClass.length} active</span>
            <span className="text-xs text-emerald-500 font-bold block mt-1">100% compliant logs</span>
          </div>
          <div className="p-3 bg-amber-50 text-amber-700" style={{borderRadius: '1rem'}}>
            <Users className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Grades editing and beautiful grade item distribution bar list */}
      <div className="grid grid-cols-1 lg-grid-cols-3 gap-6">
        
        {/* Graded registry table */}
        <div className="card lg-col-span-2">
          <div className="card-header">
            <h3 className="card-title">Course Level Assignment Grade Matrix</h3>
            <p className="card-subtitle">Instantly modify scores corresponding to syllabus tasks to dynamic compute updated averages.</p>
          </div>

          <div className="list-container mt-4">
            {currentGrades.map(grade => (
              <div key={grade.id} className="list-item flex flex-row items-center justify-between gap-4 font-mono text-xs">
                <div className="space-y-1 font-sans">
                  <span className="block font-bold text-slate-800 text-sm">{grade.title}</span>
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <span>Syllabus Weight:</span>
                    <span className="bg-slate-100 font-mono text-slate-700 px-1.5 py-0.5 rounded font-bold">{grade.weight}%</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {editingGradeId === grade.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={editingScoreCode}
                        onChange={(e) => setEditingScoreCode(Number(e.target.value))}
                        max={grade.maxScore}
                        min={0}
                        className="form-input w-16 p-1 text-center font-bold"
                        placeholder={`${grade.score}`}
                      />
                      <span className="text-slate-400">/ {grade.maxScore}</span>
                      <button
                        onClick={() => saveEditedGrade(grade.id)}
                        className="btn-primary flex items-center gap-1"
                        style={{padding: '0.25rem 0.5rem', fontSize: '0.625rem'}}
                      >
                        <Save className="w-3.5 h-3.5" /> Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-slate-700 font-bold block">{grade.score} <span className="text-slate-400">/ {grade.maxScore}</span></span>
                      <span className="text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-1.5 py-0.5 font-bold" style={{fontSize: '0.625rem'}}>
                        {((grade.score / grade.maxScore) * 100).toFixed(0)}%
                      </span>

                      <button
                        onClick={() => startEditingGrade(grade.id, grade.score)}
                        className="p-1 text-slate-400 hover-text-indigo-600"
                        title="Update assignment metrics"
                        style={{transition: 'color 0.2s'}}
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance dispersed bar diagnostics */}
        <div className="card space-y-4">
          <div className="card-header">
            <h3 className="card-title">Grade dispersal diagnostics</h3>
            <p className="card-subtitle">Relative scoring compared weight components mapping.</p>
          </div>

          <div className="space-y-4 pt-4">
            {currentGrades.map(g => {
              const pct = (g.score / g.maxScore) * 100;
              let barColor = "var(--color-amber-500)";
              if (pct >= 80) barColor = "var(--color-indigo-500)";
              if (pct >= 90) barColor = "var(--color-emerald-500)";

              return (
                <div key={g.id} className="space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 font-bold">{g.title}</span>
                    <span className="text-slate-400 font-mono">{pct.toFixed(0)}% score</span>
                  </div>
                  {/* Custom visual progress bar */}
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${pct}%`, backgroundColor: barColor }}
                      className="h-full rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs text-slate-500 mt-6 leading-relaxed">
            <span className="block font-bold text-slate-700 mb-1">Analytics evaluation</span>
            <p>Assignments tracking are mostly within the expected standard deviation. Keep monitoring homework set averages.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
