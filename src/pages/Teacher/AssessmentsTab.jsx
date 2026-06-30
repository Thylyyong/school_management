import React, { useState } from "react";

export default function AssessmentsTab({ activeCourse, quizzes, onAddQuiz }) {
  const [newQuizTitle, setNewQuizTitle] = useState("");
  const [newQuizDue, setNewQuizDue] = useState("");
  const [newQuizMaxScore, setNewQuizMaxScore] = useState(100);
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState("");
  const [currentOpts, setCurrentOpts] = useState(["", "", "", ""]);
  const [currentCorrectIdx, setCurrentCorrectIdx] = useState(0);

  const handleAddQuestionToBuilder = () => {
    if (!currentQ || currentOpts.some(o => !o)) return alert("Fill question and all 4 options.");
    setQuizQuestions(prev => [...prev, { q: currentQ, opts: [...currentOpts], correctIdx: currentCorrectIdx }]);
    setCurrentQ("");
    setCurrentOpts(["", "", "", ""]);
    setCurrentCorrectIdx(0);
  };

  const handleCreateQuiz = () => {
    if (!newQuizTitle || quizQuestions.length === 0) return alert("Add title and at least 1 question.");
    const quiz = {
      id: "Q-" + Math.floor(Math.random() * 10000),
      title: newQuizTitle,
      courseId: activeCourse.id,
      dueDate: newQuizDue || new Date().toISOString().split('T')[0],
      maxScore: newQuizMaxScore,
      questions: quizQuestions.map((q) => ({
        id: "qq-" + Math.floor(Math.random() * 100000),
        question: q.q,
        options: q.opts,
        correctAnswerIndex: q.correctIdx
      }))
    };
    onAddQuiz(quiz);
    setNewQuizTitle("");
    setQuizQuestions([]);
  };

  return (
    <div className="grid grid-cols-1 lg-grid-cols-2 gap-6">
      
      {/* Create Quiz Form */}
      <div className="card space-y-4">
        <div className="card-header border-b border-slate-100 pb-2 mb-2">
          <h3 className="card-title">Quiz & Exam Builder</h3>
        </div>
        
        <div className="space-y-3">
          <input 
            type="text" 
            placeholder="Quiz Title" 
            value={newQuizTitle} 
            onChange={e => setNewQuizTitle(e.target.value)} 
            className="form-input" 
          />
          <div className="flex gap-2">
            <input 
              type="date" 
              value={newQuizDue} 
              onChange={e => setNewQuizDue(e.target.value)} 
              className="form-input flex-1" 
            />
            <input 
              type="number" 
              placeholder="Max Score (e.g. 100)" 
              value={newQuizMaxScore} 
              onChange={e => setNewQuizMaxScore(Number(e.target.value))} 
              className="form-input flex-1 font-mono" 
            />
          </div>
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 mt-4">
          <h4 className="text-xs font-bold text-slate-700">Add Question</h4>
          <input 
            type="text" 
            placeholder="Question Text" 
            value={currentQ} 
            onChange={e => setCurrentQ(e.target.value)} 
            className="form-input" 
          />
          {currentOpts.map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input 
                type="radio" 
                name="correctOpt" 
                checked={currentCorrectIdx === idx} 
                onChange={() => setCurrentCorrectIdx(idx)} 
                style={{accentColor: 'var(--color-emerald-600)'}}
              />
              <input 
                type="text" 
                placeholder={`Option ${idx + 1}`} 
                value={opt} 
                onChange={e => {
                  const newOpts = [...currentOpts];
                  newOpts[idx] = e.target.value;
                  setCurrentOpts(newOpts);
                }} 
                className="form-input flex-1" 
                style={{padding: '0.375rem 0.5rem', fontSize: '0.75rem'}}
              />
            </div>
          ))}
          <button 
            onClick={handleAddQuestionToBuilder} 
            className="w-full text-xs font-bold py-2 rounded"
            style={{backgroundColor: 'var(--color-indigo-50)', color: 'var(--color-indigo-700)', border: '1px solid var(--color-indigo-100)'}}
          >
            Add Question to Quiz
          </button>
        </div>

        {quizQuestions.length > 0 && (
          <div className="text-xs text-slate-600 font-bold p-2 rounded text-center" style={{backgroundColor: 'var(--color-indigo-50)'}}>
            {quizQuestions.length} Questions Added
          </div>
        )}

        <button 
          onClick={handleCreateQuiz} 
          className="btn-primary w-full text-center flex justify-center py-2"
          style={{backgroundColor: 'var(--color-emerald-600)', borderColor: 'var(--color-emerald-700)'}}
        >
          Publish Quiz to Class
        </button>
      </div>

      {/* List of Quizzes for this course */}
      <div className="card space-y-4">
        <div className="card-header border-b border-slate-100 pb-2 mb-2">
          <h3 className="card-title">Active Quizzes</h3>
        </div>
        <div className="space-y-3 flex flex-col gap-3">
          {quizzes.filter(q => q.courseId === activeCourse.id).map(quiz => (
            <div key={quiz.id} className="p-4 bg-slate-50 border border-slate-200 space-y-2" style={{borderRadius: '1rem'}}>
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-800 text-sm">{quiz.title}</span>
                <span className="text-xs text-slate-400 font-mono">Due: {quiz.dueDate}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-slate-500">
                <span>{quiz.questions.length} Questions</span>
                <span>Max Score: {quiz.maxScore}</span>
              </div>
            </div>
          ))}
          {quizzes.filter(q => q.courseId === activeCourse.id).length === 0 && (
            <div className="text-xs text-slate-400 text-center py-4">No quizzes created for this course yet.</div>
          )}
        </div>
      </div>

    </div>
  );
}
