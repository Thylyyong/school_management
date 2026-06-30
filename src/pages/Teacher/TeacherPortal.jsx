import React, { useState } from "react";
import { 
  BookOpen, TrendingUp, ClipboardList, Calendar, HelpCircle, Megaphone
} from "lucide-react";

// Import Refactored Tabs
import GradesTab from "./GradesTab.jsx";
import AttendanceTab from "./AttendanceTab.jsx";
import LessonsTab from "./LessonsTab.jsx";
import AssessmentsTab from "./AssessmentsTab.jsx";
import EventsTab from "./EventsTab.jsx";

export default function TeacherPortal({
  courses,
  lessonPlans,
  students,
  quizzes,
  events,
  onUpdateCourseGrades,
  onAddLessonPlan,
  onUpdateLessonPlan,
  onDeleteLessonPlan,
  onAddQuiz,
  onAddEvent,
  username,
  onLogout
}) {
  
  // Select active course workspace
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || "");
  const activeCourse = courses.find(c => c.id === selectedCourseId) || courses[0];

  // Tab views
  const [activeTab, setActiveTab] = useState("grades");

  const studentsInClass = students.filter(s => s.status === "Active");

  // Helper to draw a tab button
  const renderTabBtn = (id, icon, text) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`tab-btn ${isActive ? 'active' : ''}`}
        style={{flex: 1, minWidth: '150px'}}
      >
        {icon}
        {text}
      </button>
    );
  };

  return (
    <div className="app-wrapper">
      
      {/* Top Header of Teacher portal */}
      <header className="portal-header bg-slate-900" style={{backgroundColor: 'var(--color-slate-900)'}}>
        <div className="portal-header-content">
          
          <div className="header-title-group">
            <div className="header-icon emerald">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="header-title">EduManager Pro</h1>
                <span className="badge emerald">Faculty Console</span>
              </div>
              <p className="header-subtitle">Instructor Workspace & Performance Analyst</p>
            </div>
          </div>

          <div className="header-user-info">
            <div className="user-details">
              <span className="user-role-label">Instructor Account</span>
              <span className="user-name">{username}</span>
            </div>
            <button
              onClick={onLogout}
              className="btn-logout"
            >
              Sign Out
            </button>
          </div>

        </div>
      </header>

      {/* Course workspace Selector Header bar */}
      <div className="tab-bar-container" style={{padding: '0.75rem 0', display: 'flex', alignItems: 'center'}}>
        <div className="container" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap'}}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Workspace:</span>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="form-select"
              style={{padding: '0.375rem 0.75rem', fontSize: '0.75rem', fontWeight: 800, backgroundColor: 'var(--color-slate-100)', borderColor: 'var(--color-slate-300)', width: 'auto'}}
            >
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.code} - {course.name}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-mono font-bold">
            <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">🏫 {activeCourse?.room || "Room 302"}</span>
            <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full border border-slate-200">🕒 {activeCourse?.schedule || "N/A"}</span>
            <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-100">🎯 TERM: {activeCourse?.term || "Fall 2026"}</span>
          </div>
        </div>
      </div>

      <main className="main-content">
        
        {/* Three Primary Classroom Tabs inside workspace */}
        <div className="flex overflow-x-auto bg-white p-1 mb-6 border border-slate-200 shadow-sm" style={{borderRadius: '1rem'}}>
          {renderTabBtn("grades", <TrendingUp className="w-4 h-4" />, "Grade Registry & Analytics")}
          {renderTabBtn("attendance", <ClipboardList className="w-4 h-4" />, "Modern Attendance Tracker")}
          {renderTabBtn("lessons", <Calendar className="w-4 h-4" />, "Lesson Plans Board")}
          {renderTabBtn("assessments", <HelpCircle className="w-4 h-4" />, "Quizzes & Exams")}
          {renderTabBtn("events", <Megaphone className="w-4 h-4" />, "School Events")}
        </div>

        {/* Dynamic Content Views */}
        {activeTab === "grades" && (
          <GradesTab 
            activeCourse={activeCourse} 
            studentsInClass={studentsInClass} 
            onUpdateCourseGrades={onUpdateCourseGrades} 
          />
        )}

        {activeTab === "attendance" && (
          <AttendanceTab 
            studentsInClass={studentsInClass} 
          />
        )}

        {activeTab === "lessons" && (
          <LessonsTab 
            activeCourse={activeCourse}
            lessonPlans={lessonPlans}
            onAddLessonPlan={onAddLessonPlan}
            onUpdateLessonPlan={onUpdateLessonPlan}
            onDeleteLessonPlan={onDeleteLessonPlan}
          />
        )}

        {activeTab === "assessments" && (
          <AssessmentsTab 
            activeCourse={activeCourse}
            quizzes={quizzes}
            onAddQuiz={onAddQuiz}
          />
        )}

        {activeTab === "events" && (
          <EventsTab 
            events={events}
            onAddEvent={onAddEvent}
          />
        )}

      </main>

    </div>
  );
}
