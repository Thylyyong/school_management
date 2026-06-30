import React, { useState } from "react";
import { CheckCircle } from "lucide-react";

export default function QuizzesTab({ courses, quizzes, onUpdateCourseGrades }) {
  // Quiz taking state
  const [activeQuizId, setActiveQuizId] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResult, setQuizResult] = useState(null);

  const startQuiz = (quizId) => {
    setActiveQuizId(quizId);
    setQuizAnswers({});
    setQuizResult(null);
  };

  const submitQuiz = () => {
    const quiz = quizzes.find(q => q.id === activeQuizId);
    if (!quiz) return;
    
    let correctCount = 0;
    quiz.questions.forEach((q) => {
      if (quizAnswers[q.id] === q.correctAnswerIndex) correctCount++;
    });
    
    const score = Math.round((correctCount / quiz.questions.length) * quiz.maxScore);
    setQuizResult({ score, max: quiz.maxScore });
    
    // Simulate updating grades
    const course = courses.find(c => c.id === quiz.courseId);
    if (course) {
      const newGrade = {
        id: "g-quiz-" + quiz.id,
        title: quiz.title,
        score: score,
        maxScore: quiz.maxScore,
        weight: 10 // Mock weight
      };
      const existing = course.grades.find(g => g.id === newGrade.id);
      let newGrades;
      if (existing) {
        newGrades = course.grades.map(g => g.id === newGrade.id ? newGrade : g);
      } else {
        newGrades = [...course.grades, newGrade];
      }
      onUpdateCourseGrades(course.id, newGrades);
    }
  };

  return (
    <div className="card space-y-4">
      <div className="card-header border-b border-slate-100 pb-3 mb-4">
        <h3 className="card-title text-base">Active Course Quizzes</h3>
      </div>
      
      {!activeQuizId ? (
        <div className="grid grid-cols-1 md-grid-cols-2 gap-4">
          {quizzes.map(quiz => {
            const course = courses.find(c => c.id === quiz.courseId);
            return (
              <div key={quiz.id} className="p-5 bg-slate-50 border border-slate-200 hover-border-indigo-300 rounded-xl transition-all flex flex-col justify-between" style={{borderRadius: '1rem'}}>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-bold font-mono" style={{fontSize: '0.625rem'}}>{course?.code || "COURSE"}</span>
                    <span className="text-[10px] text-slate-400 font-mono" style={{fontSize: '0.625rem'}}>Due: {quiz.dueDate}</span>
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm mb-1">{quiz.title}</h4>
                  <span className="text-xs text-slate-500 block">{quiz.questions.length} Questions • Max Score: {quiz.maxScore}</span>
                </div>
                <button onClick={() => startQuiz(quiz.id)} className="btn-primary w-full text-center flex justify-center py-2" style={{backgroundColor: 'var(--color-indigo-600)'}}>
                  Start Attempt
                </button>
              </div>
            );
          })}
          {quizzes.length === 0 && <p className="text-sm text-slate-400 col-span-2 text-center py-8">No active quizzes at the moment.</p>}
        </div>
      ) : (
        <div className="space-y-6 flex flex-col gap-6">
          {quizzes.filter(q => q.id === activeQuizId).map(quiz => (
            <div key={quiz.id} className="flex flex-col gap-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <h4 className="font-black text-xl text-indigo-900">{quiz.title}</h4>
                <button onClick={() => {setActiveQuizId(null); setQuizResult(null);}} className="text-xs font-bold text-slate-500 hover-text-slate-800 transition-colors">Exit</button>
              </div>

              {quizResult ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center space-y-3 flex flex-col items-center">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mb-2" />
                  <h4 className="font-bold text-emerald-900 text-lg">Quiz Completed!</h4>
                  <p className="text-emerald-700 font-mono text-xl">{quizResult.score} / {quizResult.max}</p>
                  <p className="text-xs text-emerald-600">Your score has been updated in the grade registry.</p>
                  <button onClick={() => {setActiveQuizId(null); setQuizResult(null);}} className="btn-primary mt-6" style={{backgroundColor: 'var(--color-emerald-600)'}}>
                    Return to Assessments
                  </button>
                </div>
              ) : (
                <div className="space-y-6 flex flex-col gap-6">
                  {quiz.questions.map((q, qIndex) => (
                    <div key={q.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3" style={{borderRadius: '1rem'}}>
                      <p className="font-bold text-slate-800 text-sm mb-3">{qIndex + 1}. {q.question}</p>
                      <div className="space-y-2 flex flex-col gap-2">
                        {q.options.map((opt, optIndex) => (
                          <label key={optIndex} className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover-bg-indigo-50 transition-colors">
                            <input 
                              type="radio" 
                              name={`question-${q.id}`} 
                              checked={quizAnswers[q.id] === optIndex}
                              onChange={() => setQuizAnswers(prev => ({...prev, [q.id]: optIndex}))}
                              style={{accentColor: 'var(--color-indigo-600)'}}
                            />
                            <span className="text-sm font-medium text-slate-700">{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button onClick={submitQuiz} className="btn-primary w-full py-3 text-center flex justify-center text-sm mt-4" style={{backgroundColor: 'var(--color-indigo-600)'}}>
                    Submit Attempt
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
