import React, { useState } from "react";
import { 
  GraduationCap, BookOpen, DollarSign, HelpCircle, 
  Laptop, Users, Megaphone
} from "lucide-react";

import GradesTab from "./GradesTab.jsx";
import TuitionTab from "./TuitionTab.jsx";
import StudyGroupsTab from "./StudyGroupsTab.jsx";
import EvaluationTab from "./EvaluationTab.jsx";
import QuizzesTab from "./QuizzesTab.jsx";
import EventsTab from "./EventsTab.jsx";
import ProfileTab from "./ProfileTab.jsx";

export default function StudentPortal({
  courses,
  invoices,
  studyGroups,
  quizzes,
  events,
  onAddStudyGroup,
  onPayInvoice,
  onEnrollEvent,
  onUpdateCourseGrades,
  username,
  onLogout
}) {
  
  // Outer tabs
  const [activeTab, setActiveTab] = useState("grades");

  // Helper to draw a tab button
  const renderTabBtn = (id, icon, text) => {
    const isActive = activeTab === id;
    return (
      <button
        onClick={() => setActiveTab(id)}
        className={`tab-btn ${isActive ? 'active' : ''}`}
        style={{flexShrink: 0}}
      >
        {icon}
        {text}
      </button>
    );
  };

  const outstandingTuition = invoices.filter(i => i.status !== "Paid").reduce((sum, inv) => sum + inv.amount, 0).toFixed(0);

  return (
    <div className="app-wrapper">
      
      {/* Top Banner Header bar */}
      <header className="portal-header">
        <div className="portal-header-content">
          
          <div className="header-title-group">
            <div className="header-icon indigo" style={{backgroundColor: 'var(--color-indigo-500)'}}>
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="header-title">EduManager Pro</h1>
                <span className="badge indigo">Student Hub</span>
              </div>
              <p className="header-subtitle">AP Syllabus Workspace & Grade Ledger</p>
            </div>
          </div>

          <div className="header-user-info">
            <div className="user-details">
              <span className="user-role-label">Class Cohort Account</span>
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

      {/* Sub menu tabs */}
      <div className="tab-bar-container">
        <div className="container" style={{display: 'flex', gap: '1rem', overflowX: 'auto'}}>
          {renderTabBtn("grades", <BookOpen className="w-4 h-4" />, "Academic Transcript Grades")}
          {renderTabBtn("tuition", <DollarSign className="w-4 h-4" />, `Term Invoices ($${outstandingTuition} Outstanding)`)}
          {renderTabBtn("clusters", <Users className="w-4 h-4" />, `Study clusters (${studyGroups.length})`)}
          {renderTabBtn("evaluation", <HelpCircle className="w-4 h-4" />, "Instructor Evaluation")}
          {renderTabBtn("assessments", <HelpCircle className="w-4 h-4" />, "Practice & Exams")}
          {renderTabBtn("events", <Megaphone className="w-4 h-4" />, "Events Hub")}
          {renderTabBtn("profile", <Laptop className="w-4 h-4" />, "Profile variables")}
        </div>
      </div>

      <main className="main-content">
        
        {/* Dynamic Content Views */}
        {activeTab === "grades" && (
          <GradesTab courses={courses} />
        )}

        {activeTab === "tuition" && (
          <TuitionTab invoices={invoices} onPayInvoice={onPayInvoice} />
        )}

        {activeTab === "clusters" && (
          <StudyGroupsTab courses={courses} studyGroups={studyGroups} onAddStudyGroup={onAddStudyGroup} />
        )}

        {activeTab === "evaluation" && (
          <EvaluationTab courses={courses} />
        )}

        {activeTab === "assessments" && (
          <QuizzesTab courses={courses} quizzes={quizzes} onUpdateCourseGrades={onUpdateCourseGrades} />
        )}

        {activeTab === "events" && (
          <EventsTab events={events} onEnrollEvent={onEnrollEvent} />
        )}

        {activeTab === "profile" && (
          <ProfileTab username={username} />
        )}

      </main>

    </div>
  );
}
