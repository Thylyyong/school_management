import React, { useState } from "react";
import {
  LayoutDashboard, TrendingUp, ClipboardList, Calendar,
  HelpCircle, Megaphone, LogOut, Bell, Search,
  BookOpen, LifeBuoy
} from "lucide-react";

import GradesTab      from "./GradesTab.jsx";
import AttendanceTab  from "./AttendanceTab.jsx";
import LessonsTab     from "./LessonsTab.jsx";
import AssessmentsTab from "./AssessmentsTab.jsx";
import EventsTab      from "./EventsTab.jsx";
import SupportCenter  from "../SupportCenter.jsx";
import SearchOverlay  from "../SearchOverlay.jsx";

const NAV_ITEMS = [
  { id: "dashboard",   icon: LayoutDashboard, label: "Dashboard" },
  { id: "grades",      icon: TrendingUp,      label: "Gradebook" },
  { id: "attendance",  icon: ClipboardList,   label: "Attendance" },
  { id: "lessons",     icon: Calendar,        label: "Lesson Plans" },
  { id: "assessments", icon: HelpCircle,      label: "Assessments" },
  { id: "events",      icon: Megaphone,       label: "Events" },
];

const PAGE_TITLES = {
  dashboard:   { title: "Faculty Dashboard",    subtitle: "Research and course management overview" },
  grades:      { title: "Gradebook",            subtitle: "Manage student grades and performance analytics" },
  attendance:  { title: "Attendance Tracker",   subtitle: "Monitor daily class attendance" },
  lessons:     { title: "Lesson Plans",         subtitle: "Create and manage your lesson plan board" },
  assessments: { title: "Assessments & Quizzes",subtitle: "Create quizzes and teaching evaluations" },
  events:      { title: "School Events",        subtitle: "Manage and create campus events" },
};

function getInitials(str) {
  return (str || "TC").split(/[\s-]/).map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function TeacherPortal({
  courses, lessonPlans, students, quizzes, events,
  onUpdateCourseGrades, onAddLessonPlan, onUpdateLessonPlan,
  onDeleteLessonPlan, onAddQuiz, onAddEvent,
  username, onLogout
}) {
  const [activeTab, setActiveTab]           = useState("dashboard");
  const [selectedCourseId, setSelectedCourseId] = useState(courses[0]?.id || "");
  const [supportOpen, setSupportOpen]       = useState(false);
  const [searchOpen, setSearchOpen]         = useState(false);

  const activeCourse     = courses.find(c => c.id === selectedCourseId) || courses[0];
  const studentsInClass  = students.filter(s => s.status === "Active");
  const page             = PAGE_TITLES[activeTab] || PAGE_TITLES.dashboard;

  const handleNavigate = (section) => {
    const map = { students: "attendance", courses: "grades", faculty: "dashboard" };
    setActiveTab(map[section] || "dashboard");
  };

  return (
    <>
      <SupportCenter isOpen={supportOpen} onClose={() => setSupportOpen(false)} role="teacher" />
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchData={{ students, courses, events }}
        onNavigate={handleNavigate}
        role="teacher"
      />

      <div className="portal-layout animate-fade-in">

        {/* ═══ SIDEBAR ═══ */}
        <aside className="sidebar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon" style={{ background: "linear-gradient(135deg,#059669,#6366f1)" }}>
              <BookOpen size={18} />
            </div>
            <div className="sidebar-logo-text">
              <div className="sidebar-logo-title">EduManager Pro</div>
              <div className="sidebar-logo-sub">Faculty Console</div>
            </div>
          </div>

          {/* Course selector */}
          <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--sidebar-border)" }}>
            <div style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.375rem" }}>
              Active Course
            </div>
            <select
              value={selectedCourseId}
              onChange={e => setSelectedCourseId(e.target.value)}
              id="teacher-course-select"
              style={{
                width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "0.5rem", padding: "0.375rem 0.5rem", fontSize: "0.75rem",
                color: "rgba(255,255,255,0.8)", fontFamily: "var(--font-mono)", fontWeight: 600,
                cursor: "pointer"
              }}
            >
              {courses.map(c => (
                <option key={c.id} value={c.id} style={{ background: "#1e293b" }}>
                  {c.code} — {c.name.slice(0, 22)}
                </option>
              ))}
            </select>
          </div>

          <div className="sidebar-section" style={{ flex: 1 }}>
            <div className="sidebar-section-label">Navigation</div>
            <nav className="sidebar-nav">
              {NAV_ITEMS.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`sidebar-link ${isActive ? "active" : ""}`}
                  >
                    <Icon className="sidebar-link-icon" size={16} />
                    {item.label}
                  </button>
                );
              })}
            </nav>

            <div className="sidebar-divider" style={{ margin: "1rem 1rem 0.75rem" }} />
            <div className="sidebar-section-label">System</div>
            <nav className="sidebar-nav">
              {/* ── WORKING Support Center ── */}
              <button
                className="sidebar-link"
                id="teacher-support-btn"
                onClick={() => setSupportOpen(true)}
              >
                <LifeBuoy size={16} className="sidebar-link-icon" />
                Support Center
                <span style={{
                  marginLeft: "auto", fontSize: "0.55rem", fontWeight: 700,
                  background: "rgba(16,185,129,0.2)", color: "#6ee7b7",
                  padding: "0.1rem 0.375rem", borderRadius: "999px"
                }}>LIVE</span>
              </button>
            </nav>
          </div>

          <div className="sidebar-user">
            <div className="sidebar-user-card">
              <div className="sidebar-avatar" style={{ background: "linear-gradient(135deg,#059669,#0891b2)" }}>
                {getInitials(username)}
              </div>
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{username}</div>
                <div className="sidebar-user-role">Instructor</div>
              </div>
              <button
                onClick={onLogout}
                style={{
                  padding: "0.3rem 0.5rem", background: "rgba(239,68,68,0.12)",
                  border: "1px solid rgba(239,68,68,0.2)", borderRadius: "0.5rem",
                  color: "#f87171", cursor: "pointer", display: "flex",
                  alignItems: "center", transition: "all 0.15s"
                }}
                title="Sign out"
                id="teacher-logout-btn"
              >
                <LogOut size={13} />
              </button>
            </div>
          </div>
        </aside>

        {/* ═══ MAIN PANEL ═══ */}
        <div className="main-panel">
          <header className="topbar">
            <div className="topbar-left">
              <div>
                <div className="topbar-title">{page.title}</div>
                <div className="topbar-subtitle">
                  {activeCourse
                    ? `${activeCourse.code} · ${activeCourse.room} · ${activeCourse.term}`
                    : page.subtitle}
                </div>
              </div>
            </div>
            <div className="topbar-right">
              {/* ── Working Search ── */}
              <div
                className="topbar-search"
                onClick={() => setSearchOpen(true)}
                style={{ cursor: "text" }}
              >
                <Search size={14} className="topbar-search-icon" />
                <input
                  type="text"
                  placeholder="Search students, lessons… (⌘K)"
                  readOnly
                  id="teacher-search-bar"
                  style={{ cursor: "text" }}
                />
              </div>
              <button className="topbar-btn" id="teacher-notif-btn">
                <Bell size={16} />
                <span className="topbar-notif-dot" />
              </button>
              <div className="topbar-avatar">{getInitials(username)}</div>
            </div>
          </header>

          <main className="page-content animate-fade-slide">
            {activeTab === "dashboard" && (
              <GradesTab
                activeCourse={activeCourse}
                studentsInClass={studentsInClass}
                onUpdateCourseGrades={onUpdateCourseGrades}
                lessonPlans={lessonPlans}
                events={events}
                isDashboard={true}
              />
            )}
            {activeTab === "grades" && (
              <GradesTab
                activeCourse={activeCourse}
                studentsInClass={studentsInClass}
                onUpdateCourseGrades={onUpdateCourseGrades}
              />
            )}
            {activeTab === "attendance" && (
              <AttendanceTab studentsInClass={studentsInClass} />
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
              <EventsTab events={events} onAddEvent={onAddEvent} />
            )}
          </main>
        </div>
      </div>
    </>
  );
}
