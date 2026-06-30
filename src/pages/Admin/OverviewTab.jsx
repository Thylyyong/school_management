import React from "react";
import { Building, Users, GraduationCap, Laptop, DollarSign } from "lucide-react";

export default function OverviewTab({ students, faculty, assets, invoices, setActiveSubTab }) {
  // Calculate statistics
  const totalPaid = invoices.filter(i => i.status === "Paid").reduce((acc, current) => acc + current.amount, 0);
  const totalPending = invoices.filter(i => i.status === "Pending").reduce((acc, current) => acc + current.amount, 0);

  return (
    <div className="flex flex-col gap-6">
      <div className="hero-banner">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Building className="w-44 h-44" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="hero-title">Active Academic Session Control</h2>
          <p className="hero-desc">
            The institution ledger is synchronized with live classrooms. Maintain complete authority over student enrollments, school asset allocation protocols, instructor courses, and fee invoices.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <button onClick={() => setActiveSubTab("students")} className="btn-primary">
              <Users className="w-4 h-4" /> Enroll Student
            </button>
            <button onClick={() => setActiveSubTab("assets")} className="btn-secondary" style={{color: 'white', borderColor: 'rgba(255,255,255,0.2)'}}>
              <Laptop className="w-4 h-4" /> Check Assets
            </button>
          </div>
        </div>
      </div>

      {/* Grid of Key Admin KPIs */}
      <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-4 gap-4">
        <div className="stat-box">
          <div className="stat-icon-wrapper indigo">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="stat-label">Total Active Students</span>
            <span className="stat-value">{students.length}</span>
            <span className="stat-subtext" style={{color: 'var(--color-emerald-600)'}}>97% High engagement</span>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon-wrapper emerald">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div>
            <span className="stat-label">Faculty Instructors</span>
            <span className="stat-value">{faculty.length} Assigned</span>
            <span className="stat-subtext" style={{color: 'var(--color-indigo-600)'}}>2 Departments active</span>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon-wrapper amber">
            <Laptop className="w-6 h-6" />
          </div>
          <div>
            <span className="stat-label">Monitored Lab Equipment</span>
            <span className="stat-value">{assets.length} Units</span>
            <span className="stat-subtext" style={{color: 'var(--color-amber-600)'}}>{assets.filter(a => a.status === "Assigned").length} currently deployed</span>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon-wrapper rose">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="stat-label">Collected Revenue</span>
            <span className="stat-value">${totalPaid.toLocaleString()}</span>
            <span className="stat-subtext" style={{color: 'var(--color-rose-600)'}}>${totalPending.toLocaleString()} outstanding</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg-grid-cols-3 gap-6">
        {/* Asset Snapshot */}
        <div className="card lg-col-span-2">
          <div className="card-header">
            <div>
              <h3 className="card-title">Classroom Resource Allocation Diagnostics</h3>
              <p className="card-subtitle">Live deployment of technology and core laboratory assets.</p>
            </div>
            <button onClick={() => setActiveSubTab("assets")} className="text-xs font-bold" style={{color: 'var(--color-indigo-600)'}}>
              View list
            </button>
          </div>
          <div className="list-container">
            {assets.slice(0, 3).map(asset => {
               const iconClass = asset.status === "Assigned" ? "indigo" : asset.status === "Maintenance" ? "amber" : "emerald";
               return (
                <div key={asset.id} className="list-item">
                  <div className="list-item-content">
                    <div className={`list-item-icon ${iconClass}`} style={{backgroundColor: `var(--color-${iconClass}-50)`, color: `var(--color-${iconClass}-600)`}}>
                      <Laptop className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="list-item-title block">{asset.name}</span>
                      <span className="list-item-subtitle">{asset.type} • ID: {asset.id}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`badge ${iconClass}`}>
                      {asset.status}
                    </span>
                    <span className="block text-xs text-slate-500 mt-1">{asset.allocatedTo}</span>
                  </div>
                </div>
               );
            })}
          </div>
        </div>

        {/* Institution Quick Settings Checklist */}
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Operations checklist</h3>
          </div>
          <div className="list-container">
            <div className="flex gap-3 items-start p-2" style={{borderRadius: '0.5rem'}}>
              <input type="checkbox" defaultChecked className="mt-1" />
              <div>
                <span className="block text-xs font-bold text-slate-800">Audit Science Laboratory supplies</span>
                <p className="text-xs text-slate-500 mt-1">Coordinate spectrometer restoration under ticket #411</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-2" style={{borderRadius: '0.5rem'}}>
              <input type="checkbox" defaultChecked className="mt-1" />
              <div>
                <span className="block text-xs font-bold text-slate-800">Approve AP Physics syllabus amendments</span>
                <p className="text-xs text-emerald-600 mt-1">Completed by Marcus Vance</p>
              </div>
            </div>
            <div className="flex gap-3 items-start p-2" style={{borderRadius: '0.5rem'}}>
              <input type="checkbox" className="mt-1" />
              <div>
                <span className="block text-xs font-bold text-slate-800">Collect pending Grade 12 high tuition balances</span>
                <p className="text-xs text-slate-500 mt-1">S101, S106 pending dispatch notice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
