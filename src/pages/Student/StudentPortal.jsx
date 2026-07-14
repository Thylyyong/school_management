import React, { useState } from "react";
import {
  LayoutDashboard, BookOpen, Calendar, Users,
  FileText, UserCircle, LogOut, Bell, Search,
  GraduationCap, LifeBuoy, DollarSign, Menu
} from "lucide-react";

import AcademicHubTab from "./GradesTab.jsx";
import TuitionTab     from "./TuitionTab.jsx";
import StudyGroupsTab from "./StudyGroupsTab.jsx";
import EvaluationTab  from "./EvaluationTab.jsx";
import QuizzesTab     from "./QuizzesTab.jsx";
import EventsTab      from "./EventsTab.jsx";
import ProfileTab     from "./ProfileTab.jsx";
import SupportCenter  from "../SupportCenter.jsx";
import SearchOverlay  from "../SearchOverlay.jsx";

const NAV_ITEMS = [
  { id: "hub",        icon: LayoutDashboard, label: "Academic Hub" },
  { id: "tuition",    icon: DollarSign,      label: "Tuition & Fees" },
  { id: "groups",     icon: Users,           label: "Study Groups" },
  { id: "assessment", icon: BookOpen,        label: "Assessments" },
  { id: "evaluation", icon: FileText,        label: "Evaluations" },
  { id: "events",     icon: Calendar,        label: "Events" },
  { id: "profile",    icon: UserCircle,      label: "My Profile" },
];

const PAGE_TITLES = {
  hub:        { title: "Academic Hub",       subtitle: "Track your progress and upcoming assignments" },
  tuition:    { title: "Tuition & Fees",     subtitle: "Manage your payments and outstanding invoices" },
  groups:     { title: "Study Groups",       subtitle: "Join and manage collaborative study sessions" },
  assessment: { title: "Practice & Exams",   subtitle: "Complete quizzes and practice assessments" },
  evaluation: { title: "Course Evaluation",  subtitle: "Rate and evaluate your instructors" },
  events:     { title: "Events Hub",         subtitle: "Discover and enroll in campus events" },
  profile:    { title: "Student Profile",    subtitle: "View and manage your academic profile" },
};

function getInitials(str) {
  return (str || "ST").split(/[\s-]/).map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function StudentPortal({
  courses, invoices, studyGroups, quizzes, events,
  onAddStudyGroup, onPayInvoice, onEnrollEvent,
  onUpdateCourseGrades, username, onLogout
}) {
  const [activeTab, setActiveTab]     = useState("hub");
  const [supportOpen, setSupportOpen] = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const outstanding = invoices.filter(i => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);
  const page = PAGE_TITLES[activeTab] || PAGE_TITLES.hub;

  const handleNavigate = (section) => {
    const map = {
      courses: "hub", billing: "tuition", events: "events",
      students: "profile", faculty: "profile"
    };
    setActiveTab(map[section] || "hub");
  };

  return (
    <>
      <SupportCenter isOpen={supportOpen} onClose={() => setSupportOpen(false)} role="student" />
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchData={{ courses, invoices, events, studyGroups }}
        onNavigate={handleNavigate}
        role="student"
      />

      {sidebarOpen && (
        <div className="mobile-overlay active" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className="portal-layout animate-fade-in">

        {/* ═══ SIDEBAR ═══ */}
        <aside className={`sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon" style={{ background: "linear-gradient(135deg,#6366f1,#06b6d4)" }}>
              <GraduationCap size={18} />
            </div>
            <div className="sidebar-logo-text">
              <div className="sidebar-logo-title">EduManager Pro</div>
              <div className="sidebar-logo-sub">Student Hub</div>
            </div>
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
                    {item.id === "tuition" && outstanding > 0 && (
                      <span className="sidebar-link-badge" style={{ background: "rgba(239,68,68,0.2)", color: "#f87171" }}>!</span>
                    )}
                    {item.id === "events" && events.length > 0 && (
                      <span className="sidebar-link-badge">{events.length}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="sidebar-divider" style={{ margin: "1rem 1rem 0.75rem" }} />
            <div className="sidebar-section-label">System</div>
            <nav className="sidebar-nav">
              <button
                className="sidebar-link"
                id="student-support-btn"
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
              <div className="sidebar-avatar" style={{ background: "linear-gradient(135deg,#06b6d4,#6366f1)" }}>
                {getInitials(username)}
              </div>
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{username}</div>
                <div className="sidebar-user-role">Student</div>
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
                id="student-logout-btn"
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
              <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
                <Menu size={20} />
              </button>
              <div>
                <div className="topbar-title">{page.title}</div>
                <div className="topbar-subtitle">{page.subtitle}</div>
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
                  placeholder="Search courses, events… (⌘K)"
                  readOnly
                  id="student-search-bar"
                  style={{ cursor: "text" }}
                />
              </div>
              <button className="topbar-btn" id="student-notif-btn">
                <Bell size={16} />
                <span className="topbar-notif-dot" />
              </button>
              <div className="topbar-avatar">{getInitials(username)}</div>
            </div>
          </header>

          <main className="page-content animate-fade-slide">
            {activeTab === "hub" && (
              <AcademicHubTab
                courses={courses}
                invoices={invoices}
                studyGroups={studyGroups}
                events={events}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === "tuition" && (
              <TuitionTab invoices={invoices} onPayInvoice={onPayInvoice} />
            )}
            {activeTab === "groups" && (
              <StudyGroupsTab courses={courses} studyGroups={studyGroups} onAddStudyGroup={onAddStudyGroup} />
            )}
            {activeTab === "assessment" && (
              <QuizzesTab courses={courses} quizzes={quizzes} onUpdateCourseGrades={onUpdateCourseGrades} />
            )}
            {activeTab === "evaluation" && (
              <EvaluationTab courses={courses} />
            )}
            {activeTab === "events" && (
              <EventsTab events={events} onEnrollEvent={onEnrollEvent} />
            )}
            {activeTab === "profile" && (
              <ProfileTab username={username} courses={courses} />
            )}
          </main>
        </div>
      </div>
    </>
  );
}
