import React, { useState } from "react";
import {
  Users, Landmark, Laptop, DollarSign, Building, GraduationCap
} from "lucide-react";

// Import our individual tab components
import OverviewTab from "./OverviewTab.jsx";
import StudentsTab from "./StudentsTab.jsx";
import FacultyTab from "./FacultyTab.jsx";
import AssetsTab from "./AssetsTab.jsx";
import BillingTab from "./BillingTab.jsx";

/**
 * Admin Portal Container
 * 
 * This is the main screen for the Administrator. It handles the navigation menu
 * and decides which sub-tab to show on the screen.
 */
export default function AdminPortal({
  students,
  faculty,
  assets,
  invoices,
  onAddStudent,
  onDeleteStudent,
  onAddFaculty,
  onDeleteFaculty,
  onUpdateAsset,
  onAddAsset,
  onAddInvoice,
  username,
  onLogout
}) {
  // State to track which tab we are currently viewing
  const [activeSubTab, setActiveSubTab] = useState("overview");

  // Helper to draw a tab button
  const renderTabBtn = (id, icon, text, count = null) => {
    const isActive = activeSubTab === id;
    return (
      <button
        onClick={() => setActiveSubTab(id)}
        className={`tab-btn ${isActive ? 'active' : ''}`}
      >
        {icon}
        {text} {count !== null ? `(${count})` : ''}
      </button>
    );
  };

  return (
    <div className="app-wrapper">
      {/* Top Main Navigation Header Bar */}
      <header className="portal-header">
        <div className="portal-header-content">
          <div className="header-title-group">
            <div className="header-icon indigo">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="header-title">EduManager Pro</h1>
                <span className="badge indigo">Admin Desk</span>
              </div>
              <p className="header-subtitle">Institution Management & Resource Ledger</p>
            </div>
          </div>

          <div className="header-user-info">
            <div className="user-details">
              <span className="user-role-label">Signed in as</span>
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

      {/* Admin Operations Sub-menus Bar */}
      <div className="tab-bar-container">
        <div className="container">
          <div className="tab-list">
            {renderTabBtn("overview", <Building className="w-4 h-4" />, "Administrative Overview")}
            {renderTabBtn("students", <Users className="w-4 h-4" />, "Student Registration", students.length)}
            {renderTabBtn("faculty", <GraduationCap className="w-4 h-4" />, "Faculty Roster", faculty.length)}
            {renderTabBtn("assets", <Laptop className="w-4 h-4" />, "Classroom Assets & Equipment")}
            {renderTabBtn("billing", <DollarSign className="w-4 h-4" />, "Fee Ledger", invoices.length)}
          </div>
        </div>
      </div>

      <main className="main-content">
        
        {/* Render the correct tab based on state */}
        {activeSubTab === "overview" && (
          <OverviewTab 
            students={students} 
            faculty={faculty} 
            assets={assets} 
            invoices={invoices} 
            setActiveSubTab={setActiveSubTab} 
          />
        )}

        {activeSubTab === "students" && (
          <StudentsTab 
            students={students} 
            onAddStudent={onAddStudent} 
            onDeleteStudent={onDeleteStudent} 
          />
        )}

        {activeSubTab === "faculty" && (
          <FacultyTab 
            faculty={faculty} 
            onAddFaculty={onAddFaculty} 
            onDeleteFaculty={onDeleteFaculty} 
          />
        )}

        {activeSubTab === "assets" && (
          <AssetsTab 
            assets={assets} 
            onAddAsset={onAddAsset} 
            onUpdateAsset={onUpdateAsset} 
          />
        )}

        {activeSubTab === "billing" && (
          <BillingTab 
            invoices={invoices} 
            onAddInvoice={onAddInvoice} 
          />
        )}

      </main>

    </div>
  );
}
