import React, { useState } from "react";
import {
  LayoutDashboard, Users, GraduationCap, Laptop,
  DollarSign, BarChart3, Settings, LifeBuoy,
  LogOut, Bell, Search, ChevronRight, TrendingUp, BookOpen, Menu
} from "lucide-react";

import OverviewTab  from "./OverviewTab.jsx";
import StudentsTab  from "./StudentsTab.jsx";
import FacultyTab   from "./FacultyTab.jsx";
import AssetsTab    from "./AssetsTab.jsx";
import BillingTab   from "./BillingTab.jsx";
import SupportCenter from "../SupportCenter.jsx";
import SearchOverlay from "../SearchOverlay.jsx";

const NAV_ITEMS = [
  { id: "overview",  icon: LayoutDashboard, label: "Dashboard" },
  { id: "students",  icon: Users,           label: "Students" },
  { id: "faculty",   icon: GraduationCap,   label: "Faculty" },
  { id: "assets",    icon: Laptop,          label: "Assets" },
  { id: "billing",   icon: DollarSign,      label: "Billing" },
  { id: "reports",   icon: BarChart3,       label: "Reports" },
];

const PAGE_TITLES = {
  overview: { title: "Admin Dashboard",      subtitle: "Overview of institutional metrics and user management" },
  students: { title: "Student Registry",     subtitle: "Manage enrolled students and enrollment status" },
  faculty:  { title: "Faculty Roster",       subtitle: "Manage instructors, departments, and class assignments" },
  assets:   { title: "Asset Management",     subtitle: "Track classroom hardware, software, and lab equipment" },
  billing:  { title: "Fee Ledger & Billing", subtitle: "Manage tuition invoices and payment status" },
  reports:  { title: "Reports",              subtitle: "Analytics and institutional performance data" },
};

function getInitials(str) {
  return (str || "AD").split(/[\s-]/).map(w => w[0]).join("").toUpperCase().slice(0, 2);
}

export default function AdminPortal({
  students, faculty, assets, invoices,
  onAddStudent, onDeleteStudent,
  onAddFaculty, onDeleteFaculty,
  onUpdateAsset, onAddAsset,
  onAddInvoice, username, onLogout
}) {
  const [activeTab, setActiveTab]     = useState("overview");
  const [supportOpen, setSupportOpen] = useState(false);
  const [searchOpen, setSearchOpen]   = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const page = PAGE_TITLES[activeTab] || PAGE_TITLES.overview;

  /* Trigger global search overlay when user types in topbar */
  const handleSearchFocus = () => setSearchOpen(true);
  const handleSearchKey   = (e) => {
    if (e.key === "Enter" || e.key === "ArrowDown") setSearchOpen(true);
  };

  /* Navigate from search result to the matching tab */
  const handleNavigate = (section) => {
    const sectionMap = {
      students: "students", faculty: "faculty",
      billing: "billing", courses: "overview", events: "overview"
    };
    setActiveTab(sectionMap[section] || "overview");
  };

  return (
    <>
      {/* ── Support Center Drawer ── */}
      <SupportCenter isOpen={supportOpen} onClose={() => setSupportOpen(false)} role="admin" />

      {/* ── Global Search Overlay ── */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        searchData={{ students, faculty, invoices }}
        onNavigate={handleNavigate}
        role="admin"
      />

      {sidebarOpen && (
        <div className="mobile-overlay active" onClick={() => setSidebarOpen(false)}></div>
      )}

      <div className="portal-layout animate-fade-in">

        {/* ═══ SIDEBAR ═══ */}
        <aside className={`sidebar ${sidebarOpen ? 'mobile-open' : ''}`}>
          {/* Logo */}
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <GraduationCap size={18} />
            </div>
            <div className="sidebar-logo-text">
              <div className="sidebar-logo-title">EduManager Pro</div>
              <div className="sidebar-logo-sub">Admin Portal</div>
            </div>
          </div>

          {/* Main nav */}
          <div className="sidebar-section" style={{ flex: 1 }}>
            <div className="sidebar-section-label">Main Menu</div>
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
                    {item.id === "students" && (
                      <span className="sidebar-link-badge">{students.length}</span>
                    )}
                    {item.id === "faculty" && (
                      <span className="sidebar-link-badge">{faculty.length}</span>
                    )}
                  </button>
                );
              })}
            </nav>

            <div className="sidebar-divider" style={{ margin: "1rem 1rem 0.75rem" }} />

            <div className="sidebar-section-label">System</div>
            <nav className="sidebar-nav">
              <button className="sidebar-link">
                <Settings size={16} className="sidebar-link-icon" />
                Settings
              </button>
              {/* ── WORKING Support Center link ── */}
              <button
                className="sidebar-link"
                id="admin-support-btn"
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

          {/* User area */}
          <div className="sidebar-user">
            <div className="sidebar-user-card">
              <div className="sidebar-avatar" style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}>
                {getInitials(username)}
              </div>
              <div className="sidebar-user-info">
                <div className="sidebar-user-name">{username}</div>
                <div className="sidebar-user-role">Administrator</div>
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
                id="admin-logout-btn"
              >
                <LogOut size={13} />
              </button>
            </div>
          </div>
        </aside>

        {/* ═══ MAIN PANEL ═══ */}
        <div className="main-panel">
          {/* Top Bar */}
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
              {/* ── WORKING Search Bar ── */}
              <div
                className="topbar-search"
                onClick={handleSearchFocus}
                style={{ cursor: "text" }}
              >
                <Search size={14} className="topbar-search-icon" />
                <input
                  type="text"
                  placeholder="Search students, faculty… (⌘K)"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={handleSearchFocus}
                  onKeyDown={handleSearchKey}
                  readOnly
                  id="admin-search-bar"
                  style={{ cursor: "text" }}
                />
              </div>
              <button className="topbar-btn" id="admin-notif-btn" title="Notifications">
                <Bell size={16} />
                <span className="topbar-notif-dot" />
              </button>
              <div className="topbar-avatar" title={username}>
                {getInitials(username)}
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="page-content animate-fade-slide">
            {activeTab === "overview" && (
              <OverviewTab
                students={students}
                faculty={faculty}
                assets={assets}
                invoices={invoices}
                setActiveSubTab={setActiveTab}
              />
            )}
            {activeTab === "students" && (
              <StudentsTab
                students={students}
                onAddStudent={onAddStudent}
                onDeleteStudent={onDeleteStudent}
              />
            )}
            {activeTab === "faculty" && (
              <FacultyTab
                faculty={faculty}
                onAddFaculty={onAddFaculty}
                onDeleteFaculty={onDeleteFaculty}
              />
            )}
            {activeTab === "assets" && (
              <AssetsTab
                assets={assets}
                onAddAsset={onAddAsset}
                onUpdateAsset={onUpdateAsset}
              />
            )}
            {activeTab === "billing" && (
              <BillingTab
                invoices={invoices}
                onAddInvoice={onAddInvoice}
              />
            )}
            {activeTab === "reports" && (
              <div className="card card-body" style={{ padding: "3rem", textAlign: "center", color: "var(--color-slate-400)" }}>
                <BarChart3 size={48} style={{ margin: "0 auto 1rem", opacity: 0.3 }} />
                <p style={{ fontWeight: 600 }}>Reports module coming soon</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}
