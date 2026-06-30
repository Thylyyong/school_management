import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function EvaluationTab({ courses }) {
  const [evalCourseId, setEvalCourseId] = useState("C-101");
  const [instructorRating, setInstructorRating] = useState("5");
  const [courseReviewText, setCourseReviewText] = useState("");
  const [isEvaluationSubmitted, setIsEvaluationSubmitted] = useState(false);

  const handleSubmitEvaluation = (e) => {
    e.preventDefault();
    if (!courseReviewText.trim()) return alert("Please specify detailed structured evaluation comments.");
    
    setIsEvaluationSubmitted(true);
    setTimeout(() => {
      setIsEvaluationSubmitted(false);
      setCourseReviewText("");
    }, 4000);
  };

  return (
    <div className="card space-y-4 max-w-2xl mx-auto">
      <div className="card-header border-b border-slate-100 pb-3 mb-4">
        <h3 className="card-title text-base">Teacher Course Evaluation Surveys</h3>
        <p className="card-subtitle">Conduct fully anonymous, professional evaluations. Your critical structural remarks improve academic guidelines.</p>
      </div>

      {isEvaluationSubmitted ? (
        <div className="p-8 text-center space-y-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 flex flex-col items-center">
          <CheckCircle className="w-12 h-12 text-indigo-600 mb-2" />
          <h4 className="font-bold text-indigo-900">Evaluation committed to Registry</h4>
          <p className="text-xs text-indigo-700 max-w-sm">Thank you for your valuable feedback loop. Comments cleared for processing under anonymous protocols.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmitEvaluation} className="space-y-4 flex flex-col gap-4">
          
          <div className="form-group">
            <label className="form-label">Course Under evaluation</label>
            <select
              value={evalCourseId}
              onChange={(e) => setEvalCourseId(e.target.value)}
              className="form-select font-semibold"
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.code} - {c.name} ({c.teacherName})</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Instruction Quality Rating</label>
            <div className="flex gap-2">
              {["1", "2", "3", "4", "5"].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setInstructorRating(num)}
                  className={`w-10 h-10 rounded-xl font-bold font-sans text-xs transition-colors flex items-center justify-center border ${
                    instructorRating === num 
                      ? "bg-slate-900 text-white border-slate-900" 
                      : "bg-slate-50 hover-bg-slate-100 border-slate-200 text-slate-700"
                  }`}
                  style={{
                    backgroundColor: instructorRating === num ? 'var(--color-slate-900)' : 'var(--color-slate-50)',
                    color: instructorRating === num ? 'white' : 'var(--color-slate-700)'
                  }}
                >
                  {num} ★
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Comments and suggestions remarks</label>
            <textarea
              required
              value={courseReviewText}
              onChange={(e) => setCourseReviewText(e.target.value)}
              placeholder="Comment on syllabus speed, lab kit configurations, and grading guidelines clarity..."
              className="form-input min-h-[100px] resize-y"
              style={{minHeight: '100px'}}
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full text-center flex justify-center py-3"
            style={{backgroundColor: 'var(--color-indigo-600)'}}
          >
            Confirm & Dispatch Anonymous Evaluation
          </button>

        </form>
      )}

    </div>
  );
}
