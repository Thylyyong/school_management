import React, { useEffect, useMemo, useState } from "react";
import { GraduationCap, Landmark, ShieldAlert, BookOpen, UserCheck, Key, ArrowRight, Star } from "lucide-react";
import "./Login.css";

import { loginWithIdUserAndPassword } from "../auth/authService";
import { setSession, clearSession, getSession } from "../auth/session";

/**
 * Login Component
 *
 * Secure-ish prototype login using ID + password and role selection.
 * No auto-available launch users and no demo quick buttons.
 */
export default function Login({ onLoginSuccess }) {
  const [selectedRole, setSelectedRole] = useState("student");
  const [idUser, setIdUser] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const roleLabel = useMemo(() => {
    if (selectedRole === "admin") return "Admin Identifier";
    if (selectedRole === "teacher") return "Teacher Identifier";
    return "Student Identifier";
  }, [selectedRole]);

  useEffect(() => {
    // If a session exists, restore it immediately.
    const s = getSession();
    if (s?.role && s?.idUser) {
      onLoginSuccess(s.role, s.idUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setError("");
  }, [selectedRole]);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIdUser("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!idUser.trim() || !password.trim()) {
      setError("Please fill in all security fields.");
      return;
    }

    // Normalize common user input errors
    const normalizedRole = selectedRole;
    const normalizedId = idUser.trim();
    const normalizedPassword = password;


    setLoading(true);
    try {
      const res = await loginWithIdUserAndPassword({
        role: normalizedRole,
        idUser: normalizedId,
        password: normalizedPassword,
      });

      if (!res.ok) {
        setError(res.error || "Login failed.");
        return;
      }

      clearSession();
      setSession(res.session);
      onLoginSuccess(res.session.role, res.session.idUser);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="login-screen">
      
      {/* Left side: Premium Backdrop with school metrics */}
      <div className="login-sidebar">
        
        {/* Soft decorative background glow circles */}
        <div className="login-sidebar-glow-1" />
        <div className="login-sidebar-glow-2" />

        {/* Top school branding */}
        <div style={{position: 'relative', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
          <div style={{padding: '0.625rem', backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.25)', boxShadow: 'var(--shadow-md)'}}>
            <GraduationCap className="w-8 h-8" style={{color: 'white'}} />
          </div>
          <div>
            <h1 style={{fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.025em', color: 'white'}}>
              EduManager Pro
            </h1>
            <p style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em', fontWeight: 700}}>ARTISAN ACADEMIC v4.2</p>
          </div>
        </div>

        {/* Dynamic center messaging with modern statistics */}
        <div className="login-sidebar-content">
          <span style={{display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.25rem 0.875rem', backgroundColor: 'rgba(30,20,10,0.2)', color: 'var(--color-light)', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.025em', borderRadius: '9999px', border: '1px solid rgba(255,255,255,0.2)', marginBottom: '1.5rem'}}>
            <Star className="w-3.5 h-3.5" style={{color: 'var(--color-accent-yellow)', fill: 'var(--color-accent-yellow)'}} /> Authorized craft workspace
          </span>
          <h2 style={{fontSize: '2.25rem', fontWeight: 900, color: 'var(--color-light)', letterSpacing: '-0.025em', lineHeight: 1.3}}>
            A beautiful, hand-styled core for admin, teachers, and student portfolios.
          </h2>
          <p style={{marginTop: '1rem', color: 'rgba(255, 251, 235, 0.95)', fontSize: '0.875rem', lineHeight: 1.6}}>
            Welcome back to your educational creation workshop. Streamline structural class guidelines, coordinate custom lesson planners, and track grading lists with style.
          </p>

          <div className="login-stats-grid">
            <div className="login-stat-card">
              <span style={{display: 'block', fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-primary)'}}>640+</span>
              <span style={{fontSize: '0.625rem', color: 'var(--color-slate-500)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.025em'}}>Students Status</span>
            </div>
            <div className="login-stat-card">
              <span style={{display: 'block', fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-accent-blue)'}}>98.4%</span>
              <span style={{fontSize: '0.625rem', color: 'var(--color-slate-500)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.025em'}}>Daily Attend</span>
            </div>
            <div className="login-stat-card">
              <span style={{display: 'block', fontSize: '1.5rem', fontWeight: 900, color: 'var(--color-accent-pink)'}}>AP</span>
              <span style={{fontSize: '0.625rem', color: 'var(--color-slate-500)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.025em'}}>Curriculums</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div style={{position: 'relative', zIndex: 10, paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: '0.75rem', color: 'rgba(254, 243, 199, 0.8)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'var(--font-mono)'}}>
          <span>© 2026 EduManager Infrastructure Inc.</span>
          <span style={{display: 'flex', alignItems: 'center', gap: '0.375rem', fontWeight: 700}}>
            <span style={{width: '6px', height: '6px', backgroundColor: 'var(--color-accent-yellow)', borderRadius: '50%'}} />
            TLS 1.3 Certified
          </span>
        </div>
      </div>

      {/* Right side: Modern interactive credentials section */}
      <div className="login-form-area">
        <div className="login-form-container">
          <div style={{marginBottom: '2rem', position: 'relative'}}>
            <h3 className="login-title">
              System Sign In
              <span className="login-title-underline" />
            </h3>
            <p style={{fontSize: '0.75rem', fontWeight: 500, color: 'var(--color-slate-500)', marginTop: '0.5rem'}}>Choose your custom portal to initialize your design deck.</p>
          </div>

          {/* Role selection tab button system */}
          <div className="role-tab-group">
            <button
              type="button"
              onClick={() => handleRoleSelect("student")}
              className={`role-tab-btn ${selectedRole === "student" ? "active" : ""}`}
            >
              <GraduationCap className="w-4 h-4" /> Student
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect("teacher")}
              className={`role-tab-btn ${selectedRole === "teacher" ? "active" : ""}`}
            >
              <BookOpen className="w-4 h-4" /> Teacher
            </button>
            <button
              type="button"
              onClick={() => handleRoleSelect("admin")}
              className={`role-tab-btn ${selectedRole === "admin" ? "active" : ""}`}
            >
              <Landmark className="w-4 h-4" /> Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <div>
              <label style={{display: 'block', fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-dark)', marginBottom: '0.375rem'}}>
                {roleLabel}
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon"><UserCheck className="w-4 h-4" /></span>
                <input
                  type="text"
                  value={idUser}
                  onChange={(e) => setIdUser(e.target.value)}
                  placeholder={selectedRole === 'admin' ? 'A-100' : selectedRole === 'teacher' ? 'T-200' : 'S-300'}
                  className="login-input"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label style={{display: 'block', fontSize: '0.625rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-dark)', marginBottom: '0.375rem'}}>
                Access Passphrase
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon"><Key className="w-4 h-4" /></span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••••"
                  className="login-input"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="login-error">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button type="submit" className="login-submit-btn" disabled={loading} style={{opacity: loading ? 0.7 : 1}}>
              {loading ? 'Signing in...' : 'Initialize Command Deck'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div style={{marginTop: '1rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-slate-500)', lineHeight: 1.6}}>
            Default test accounts (enter ID + password):
            <div style={{fontFamily: 'var(--font-mono)', marginTop: '0.5rem'}}>
              Admin: <b>A-100</b> / <b>Admin@123</b>
              <br />
              Teacher: <b>T-200</b> / <b>Teacher@123</b>
              <br />
              Student: <b>S-300</b> / <b>Student@123</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

