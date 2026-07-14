import React, { useState } from "react";
import { Star, Save, Send, Plus, Trash2, HelpCircle } from "lucide-react";

/* ── Star Rating Row ── */
function StarRating({ label, value, onChange }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0.75rem 0", borderBottom: "1px solid var(--color-slate-100)"
    }}>
      <span style={{ fontSize: "0.875rem", color: "var(--color-slate-700)", fontWeight: 500, flex: 1 }}>{label}</span>
      <div className="star-rating">
        {[1,2,3,4,5].map(n => (
          <button
            key={n}
            type="button"
            className={`star-btn ${n <= (hovered || value) ? "filled" : ""}`}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(n)}
          >
            <Star size={18} fill={n <= (hovered || value) ? "currentColor" : "none"} />
          </button>
        ))}
        <span style={{
          marginLeft: "0.625rem", fontSize: "0.75rem",
          color: "var(--color-slate-400)", fontFamily: "var(--font-mono)", fontWeight: 600, minWidth: "30px"
        }}>
          {value > 0 ? `${value}/5` : "—"}
        </span>
      </div>
    </div>
  );
}

/* ── Quiz Question ── */
function QuizQuestion({ q, index, onDelete }) {
  return (
    <div style={{
      border: "1.5px solid var(--color-slate-200)", borderRadius: "0.875rem",
      overflow: "hidden", background: "white"
    }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "0.75rem",
        padding: "0.75rem 1rem", background: "var(--color-slate-50)",
        borderBottom: "1px solid var(--color-slate-200)"
      }}>
        <span style={{
          width: 24, height: 24, borderRadius: "50%",
          background: "var(--color-indigo-100)", color: "var(--color-indigo-700)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.75rem", fontWeight: 800, flexShrink: 0
        }}>{index + 1}</span>
        <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-slate-800)", flex: 1 }}>
          {q.question}
        </span>
        {onDelete && (
          <button className="btn btn-danger btn-icon btn-sm" onClick={() => onDelete(q.id)}>
            <Trash2 size={13} />
          </button>
        )}
      </div>
      <div style={{ padding: "0.875rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        {q.options.map((opt, oi) => (
          <div key={oi} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            padding: "0.5rem 0.75rem", borderRadius: "0.5rem",
            background: oi === q.correctAnswerIndex ? "#ecfdf5" : "#f8fafc",
            border: `1px solid ${oi === q.correctAnswerIndex ? "#a7f3d0" : "#e2e8f0"}`,
            fontSize: "0.8125rem", color: oi === q.correctAnswerIndex ? "#065f46" : "var(--color-slate-600)",
            fontWeight: oi === q.correctAnswerIndex ? 700 : 500
          }}>
            <span style={{
              width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
              background: oi === q.correctAnswerIndex ? "#10b981" : "var(--color-slate-200)",
              color: oi === q.correctAnswerIndex ? "white" : "var(--color-slate-500)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.6rem", fontWeight: 800
            }}>
              {["A","B","C","D"][oi]}
            </span>
            {opt}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AssessmentsTab({ activeCourse, quizzes, onAddQuiz }) {
  const [activeView, setActiveView] = useState("evaluation"); // "evaluation" | "quiz"

  // ── Evaluation state ──
  const [ratings, setRatings] = useState({
    courseContent: 0, instructionQuality: 0, resourceAvailability: 0, pacing: 0, overall: 0
  });
  const [writtenComment, setWrittenComment] = useState("");
  const [improvements, setImprovements]    = useState("");
  const [submitted, setSubmitted]          = useState(false);

  const handleRating = (key, val) => setRatings(prev => ({ ...prev, [key]: val }));
  const handleSubmit = () => {
    if (Object.values(ratings).some(v => v === 0)) {
      alert("Please rate all categories before submitting.");
      return;
    }
    setSubmitted(true);
  };

  // ── Quiz state ──
  const courseQuizzes = quizzes.filter(q => q.courseId === activeCourse?.id);
  const [newQuiz, setNewQuiz] = useState({ title: "", dueDate: "", maxScore: "100" });
  const [showNewQuiz, setShowNewQuiz] = useState(false);

  const handleAddQuiz = () => {
    if (!newQuiz.title || !newQuiz.dueDate) { alert("Please fill in quiz title and due date."); return; }
    onAddQuiz({
      id: `Q-${Date.now()}`,
      title: newQuiz.title,
      courseId: activeCourse?.id,
      dueDate: newQuiz.dueDate,
      maxScore: Number(newQuiz.maxScore) || 100,
      questions: []
    });
    setNewQuiz({ title: "", dueDate: "", maxScore: "100" });
    setShowNewQuiz(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ── View Toggle ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="content-tabs">
          <button className={`content-tab-btn ${activeView === "evaluation" ? "active" : ""}`} onClick={() => setActiveView("evaluation")}>
            <Star size={14} /> Teaching Evaluation
          </button>
          <button className={`content-tab-btn ${activeView === "quiz" ? "active" : ""}`} onClick={() => setActiveView("quiz")}>
            <HelpCircle size={14} /> Quizzes &amp; Exams
          </button>
        </div>
      </div>

      {/* ════ EVALUATION VIEW ════ */}
      {activeView === "evaluation" && (
        submitted ? (
          <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🎉</div>
            <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-slate-900)", marginBottom: "0.5rem" }}>Evaluation Submitted!</div>
            <div style={{ fontSize: "0.875rem", color: "var(--color-slate-500)" }}>
              Thank you for evaluating <strong>{activeCourse?.name}</strong>. Your feedback helps us improve.
            </div>
            <button className="btn btn-secondary btn-sm" style={{ marginTop: "1.5rem" }} onClick={() => { setSubmitted(false); setRatings({ courseContent:0, instructionQuality:0, resourceAvailability:0, pacing:0, overall:0 }); setWrittenComment(""); setImprovements(""); }}>
              Submit Another
            </button>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "1.25rem", alignItems: "start" }}>
            {/* Main evaluation form */}
            <div className="card">
              <div className="card-header">
                <div className="card-header-left">
                  <div className="card-icon amber" style={{ background: "#fffbeb", color: "#d97706" }}>
                    <Star size={15} />
                  </div>
                  <div>
                    <div className="card-title">Teaching Evaluation</div>
                    <div className="card-subtitle">{activeCourse?.code} — {activeCourse?.name}</div>
                  </div>
                </div>
              </div>
              <div style={{ padding: "1.25rem" }}>
                <div style={{ marginBottom: "1.25rem" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-slate-500)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "0.5rem" }}>
                    Rating Scores
                  </div>
                  <StarRating label="Course Content"         value={ratings.courseContent}         onChange={v => handleRating("courseContent", v)} />
                  <StarRating label="Instruction Quality"    value={ratings.instructionQuality}    onChange={v => handleRating("instructionQuality", v)} />
                  <StarRating label="Resource Availability"  value={ratings.resourceAvailability}  onChange={v => handleRating("resourceAvailability", v)} />
                  <StarRating label="Pacing &amp; Structure"  value={ratings.pacing}                onChange={v => handleRating("pacing", v)} />
                  <StarRating label="Overall Experience"     value={ratings.overall}               onChange={v => handleRating("overall", v)} />
                </div>

                <div className="form-group" style={{ marginBottom: "1rem" }}>
                  <label className="form-label">Written Comments</label>
                  <textarea
                    className="form-textarea"
                    value={writtenComment}
                    onChange={e => setWrittenComment(e.target.value)}
                    placeholder="What did you like most about this course? Describe the learning experience…"
                    rows={4}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Areas for Improvement</label>
                  <textarea
                    className="form-textarea"
                    value={improvements}
                    onChange={e => setImprovements(e.target.value)}
                    placeholder="How can this course be improved? Any specific suggestions…"
                    rows={3}
                  />
                </div>

                <div style={{ display: "flex", gap: "0.625rem", marginTop: "1.25rem", justifyContent: "flex-end" }}>
                  <button className="btn btn-secondary" id="teacher-save-draft-btn">
                    <Save size={14} /> Save Draft
                  </button>
                  <button className="btn btn-primary" id="teacher-submit-eval-btn" onClick={handleSubmit}>
                    <Send size={14} /> Submit to Evaluator
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar hint */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Evaluation Guide</div>
                </div>
                <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                  {[
                    { stars: "⭐⭐⭐⭐⭐", label: "Outstanding", desc: "Exceeds all expectations" },
                    { stars: "⭐⭐⭐⭐",    label: "Very Good",   desc: "Meets most expectations" },
                    { stars: "⭐⭐⭐",      label: "Good",        desc: "Meets core expectations" },
                    { stars: "⭐⭐",        label: "Fair",        desc: "Partially meets expectations" },
                    { stars: "⭐",          label: "Poor",        desc: "Does not meet expectations" },
                  ].map(g => (
                    <div key={g.label} style={{ display: "flex", gap: "0.625rem" }}>
                      <span style={{ fontSize: "0.75rem" }}>{g.stars}</span>
                      <div>
                        <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-slate-800)" }}>{g.label}</div>
                        <div style={{ fontSize: "0.6875rem", color: "var(--color-slate-400)" }}>{g.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card" style={{ background: "#ecfdf5", border: "1px solid #a7f3d0" }}>
                <div style={{ padding: "1rem" }}>
                  <div style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#065f46", marginBottom: "0.375rem" }}>
                    Responses are anonymous
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#047857", lineHeight: 1.6 }}>
                    All evaluations are confidential. Individual responses are never shared with instructors.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      {/* ════ QUIZ VIEW ════ */}
      {activeView === "quiz" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ fontSize: "0.875rem", color: "var(--color-slate-600)" }}>
              {courseQuizzes.length} quizzes for <strong>{activeCourse?.code}</strong>
            </div>
            <button className="btn btn-primary btn-sm" id="teacher-add-quiz-btn" onClick={() => setShowNewQuiz(v => !v)}>
              <Plus size={13} /> {showNewQuiz ? "Cancel" : "Add Quiz"}
            </button>
          </div>

          {/* New quiz form */}
          {showNewQuiz && (
            <div className="card" style={{ border: "1.5px solid var(--color-indigo-200)" }}>
              <div className="card-header">
                <div className="card-title">New Quiz</div>
              </div>
              <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.875rem" }}>
                <div className="form-group">
                  <label className="form-label">Quiz Title</label>
                  <input className="form-input" value={newQuiz.title} onChange={e => setNewQuiz(p => ({ ...p, title: e.target.value }))} placeholder="e.g. Chapter 5 Quiz" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.875rem" }}>
                  <div className="form-group">
                    <label className="form-label">Due Date</label>
                    <input type="date" className="form-input" value={newQuiz.dueDate} onChange={e => setNewQuiz(p => ({ ...p, dueDate: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Max Score</label>
                    <input type="number" className="form-input" value={newQuiz.maxScore} onChange={e => setNewQuiz(p => ({ ...p, maxScore: e.target.value }))} />
                  </div>
                </div>
                <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => setShowNewQuiz(false)}>Cancel</button>
                  <button className="btn btn-primary btn-sm" onClick={handleAddQuiz}><Save size={13} /> Create Quiz</button>
                </div>
              </div>
            </div>
          )}

          {courseQuizzes.length === 0 && !showNewQuiz && (
            <div className="card" style={{ padding: "3rem", textAlign: "center", color: "var(--color-slate-400)" }}>
              <HelpCircle size={48} style={{ margin: "0 auto 1rem", opacity: 0.3 }} />
              <p style={{ fontWeight: 600 }}>No quizzes for this course yet</p>
              <p style={{ fontSize: "0.8125rem", marginTop: "0.25rem" }}>Click "Add Quiz" to create one</p>
            </div>
          )}

          {courseQuizzes.map(quiz => (
            <div key={quiz.id} className="card">
              <div className="card-header">
                <div className="card-header-left">
                  <div className="card-icon indigo" style={{ background: "#eef2ff", color: "#4f46e5" }}>
                    <HelpCircle size={15} />
                  </div>
                  <div>
                    <div className="card-title">{quiz.title}</div>
                    <div className="card-subtitle">Due: {quiz.dueDate} · Max: {quiz.maxScore} pts · {quiz.questions.length} questions</div>
                  </div>
                </div>
                <span className="badge indigo">Active</span>
              </div>
              {quiz.questions.length > 0 && (
                <div style={{ padding: "0.875rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {quiz.questions.map((q, i) => <QuizQuestion key={q.id} q={q} index={i} />)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
