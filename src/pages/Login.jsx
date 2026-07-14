import React, { useEffect, useMemo, useState } from "react";
import {
  GraduationCap, BookOpen, Landmark, ShieldAlert,
  User, Lock, ArrowRight, Building2, Wifi, ChevronRight
} from "lucide-react";
import "./Login.css";
import { loginWithIdUserAndPassword } from "../auth/authService";
import { setSession, clearSession, getSession } from "../auth/session";

const ROLES = [
  { id: "admin",   label: "Admin",   icon: <Landmark size={18} />,      placeholder: "A-100",  hint: "Institution administrator" },
  { id: "teacher", label: "Faculty", icon: <BookOpen size={18} />,      placeholder: "T-200",  hint: "Faculty / Instructor" },
  { id: "student", label: "Student", icon: <GraduationCap size={18} />, placeholder: "S-300",  hint: "Enrolled student" },
];

const CREDENTIALS = [
  { role: "Admin",   id: "A-100", pw: "Admin@123" },
  { role: "Faculty", id: "T-200", pw: "Teacher@123" },
  { role: "Student", id: "S-300", pw: "Student@123" },
];

export default function Login({ onLoginSuccess }) {
  const [selectedRole, setSelectedRole] = useState("student");
  const [idUser, setIdUser]       = useState("");
  const [password, setPassword]   = useState("");
  const [remember, setRemember]   = useState(false);
  const [error, setError]         = useState("");
  const [loading, setLoading]     = useState(false);

  const activeRole = ROLES.find(r => r.id === selectedRole);

  // Restore session on mount
  useEffect(() => {
    const s = getSession();
    if (s?.role && s?.idUser) onLoginSuccess(s.role, s.idUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await loginWithIdUserAndPassword({
        role: selectedRole,
        idUser: idUser.trim(),
        password,
      });
      if (!res.ok) { setError(res.error || "Login failed."); return; }
      clearSession();
      setSession(res.session);
      onLoginSuccess(res.session.role, res.session.idUser);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-screen">

      {/* ═══ LEFT HERO PANEL ═══ */}
      <div className="login-hero">
        <div className="login-hero-bg" />
        <div className="login-hero-grid" />
        <div className="login-hero-orb-1" />
        <div className="login-hero-orb-2" />
        <div className="login-hero-orb-3" />

        <div className="login-hero-content">
          {/* Logo */}
          <div className="login-hero-logo">
            <div className="login-hero-logo-icon">
              <GraduationCap size={20} />
            </div>
            <div>
              <div className="login-hero-logo-name">EduManager Pro</div>
              <div className="login-hero-logo-ver">University Portal v4.2</div>
            </div>
          </div>

          {/* Main content */}
          <div className="login-hero-main">
            <div className="login-hero-tag">
              <span className="login-hero-tag-dot" />
              Secure Academic Gateway
            </div>
            <h1 className="login-hero-headline">
              Empower your <span>academic</span> journey.
            </h1>
            <p className="login-hero-text">
              The university's high-performance management portal — designed to bring clarity and efficiency to modern educational institutions. Manage students, faculty, courses, and resources from one place.
            </p>

            {/* Stats */}
            <div className="login-hero-stats">
              <div className="login-stat-card">
                <div className="login-stat-value">1,240</div>
                <div className="login-stat-label">Students Enrolled</div>
              </div>
              <div className="login-stat-card">
                <div className="login-stat-value">86</div>
                <div className="login-stat-label">Active Faculty</div>
              </div>
              <div className="login-stat-card">
                <div className="login-stat-value">98.4%</div>
                <div className="login-stat-label">Attendance Rate</div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="login-hero-footer">
            <div className="login-hero-footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">IT Support</a>
            </div>
            <div className="login-secure-badge">
              <span className="login-secure-dot" />
              All Systems Operational
            </div>
          </div>
        </div>
      </div>

      {/* ═══ RIGHT FORM PANEL ═══ */}
      <div className="login-form-panel">
        <div className="login-form-card">
          <div className="login-form-header">
            <h2 className="login-form-title">Sign in to your account</h2>
            <p className="login-form-subtitle">
              Welcome back! Please choose your role and sign in.
            </p>
          </div>

          {/* Role Selector */}
          <div className="login-role-tabs">
            {ROLES.map(role => (
              <button
                key={role.id}
                type="button"
                onClick={() => handleRoleSelect(role.id)}
                className={`login-role-tab ${selectedRole === role.id ? "active" : ""}`}
              >
                <span className="login-role-tab-icon">{role.icon}</span>
                {role.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* ID Field */}
            <div className="login-field">
              <label className="login-label">
                {activeRole?.hint} ID
              </label>
              <div className="login-input-wrap">
                <span className="login-input-icon"><User size={15} /></span>
                <input
                  type="text"
                  value={idUser}
                  onChange={e => setIdUser(e.target.value)}
                  placeholder={activeRole?.placeholder}
                  className="login-input"
                  autoComplete="username"
                  id="login-id"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="login-field">
              <div className="login-field-row">
                <label className="login-label">Password</label>
                <span className="login-forgot">Forgot password?</span>
              </div>
              <div className="login-input-wrap">
                <span className="login-input-icon"><Lock size={15} /></span>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="login-input"
                  autoComplete="current-password"
                  id="login-password"
                />
              </div>
            </div>

            {/* Remember me */}
            <label className="login-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Keep me signed in for 30 days
            </label>

            {/* MFA notice */}
            {selectedRole === "admin" && (
              <div className="login-mfa-notice">
                <ShieldAlert size={15} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>
                  2-Factor Authentication (MFA) is required. Have your EduManager Authenticator app ready.
                </span>
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="login-error">
                <ShieldAlert size={15} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="login-submit"
              disabled={loading}
              id="login-submit-btn"
            >
              {loading ? "Signing in…" : "Sign In"}
              {!loading && <ArrowRight size={17} />}
            </button>
          </form>

          {/* Divider */}
          <div className="login-or">or</div>

          <button className="login-institutional" type="button">
            <Building2 size={15} />
            Sign in with Institutional Access
          </button>

          {/* Default Credentials */}
          <div className="login-creds-helper">
            <div className="login-creds-title">Test Credentials</div>
            {CREDENTIALS.map(c => (
              <div key={c.role} className="login-creds-row">
                <span className="login-creds-role">{c.role}</span>
                <span className="login-creds-code">{c.id}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.6rem' }}>/</span>
                <span className="login-creds-code">{c.pw}</span>
              </div>
            ))}
          </div>

          <div className="login-status-footer">
            <span className="login-status-dot" />
            <span>All services operational · EduManager Pro © 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
