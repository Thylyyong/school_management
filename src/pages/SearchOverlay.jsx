import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, X, Users, BookOpen, DollarSign, Calendar, GraduationCap, ArrowRight } from "lucide-react";

/* ──────────────────────────────────────────────────────────
   Global search overlay that indexes all portal content
────────────────────────────────────────────────────────── */

function buildIndex({ students = [], faculty = [], courses = [], invoices = [], events = [], studyGroups = [], role }) {
  const results = [];

  if (role === "admin" || role === "student") {
    students.forEach(s => results.push({
      id: s.id,
      type: "Student",
      icon: <Users size={14} />,
      primary: s.name,
      secondary: `${s.id} · ${s.gradeLevel} · ${s.status}`,
      tag: s.status,
      tagColor: s.status === "Active" ? "emerald" : "amber",
      section: "students"
    }));
  }

  if (role === "admin" || role === "teacher") {
    faculty.forEach(f => results.push({
      id: f.id,
      type: "Faculty",
      icon: <GraduationCap size={14} />,
      primary: f.name,
      secondary: `${f.id} · ${f.department} · ${f.status}`,
      tag: f.status,
      tagColor: "cyan",
      section: "faculty"
    }));
  }

  courses.forEach(c => results.push({
    id: c.id,
    type: "Course",
    icon: <BookOpen size={14} />,
    primary: c.name,
    secondary: `${c.code} · ${c.teacherName} · ${c.room}`,
    tag: c.term,
    tagColor: "indigo",
    section: "courses"
  }));

  invoices.forEach(inv => results.push({
    id: inv.id,
    type: "Invoice",
    icon: <DollarSign size={14} />,
    primary: inv.description,
    secondary: `${inv.id} · $${inv.amount} · ${inv.status}`,
    tag: inv.status,
    tagColor: inv.status === "Paid" ? "emerald" : "amber",
    section: "billing"
  }));

  events.forEach(ev => results.push({
    id: ev.id,
    type: "Event",
    icon: <Calendar size={14} />,
    primary: ev.title,
    secondary: `${ev.date} · ${ev.location}`,
    tag: ev.date,
    tagColor: "violet",
    section: "events"
  }));

  return results;
}

export default function SearchOverlay({ isOpen, onClose, searchData, onNavigate, role }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const allItems = buildIndex({ ...searchData, role });
  const filtered = query.trim().length > 1
    ? allItems.filter(item =>
        item.primary.toLowerCase().includes(query.toLowerCase()) ||
        item.secondary.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const groups = filtered.reduce((acc, item) => {
    if (!acc[item.type]) acc[item.type] = [];
    acc[item.type].push(item);
    return acc;
  }, {});

  const RECENT = [
    { label: "Physics 401 Midterm Quiz", type: "Assessment" },
    { label: "INV-6671 Fall 2026 Tuition", type: "Invoice" },
    { label: "Dr. Sarah Jenkins", type: "Faculty" },
  ];

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(15,23,42,0.5)",
          backdropFilter: "blur(4px)", zIndex: 300,
          animation: "fadeIn 0.15s ease both"
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", top: "10vh", left: "50%", transform: "translateX(-50%)",
        width: "min(640px, 92vw)", maxHeight: "70vh",
        background: "white", borderRadius: "1.25rem",
        boxShadow: "0 32px 80px -12px rgba(15,23,42,0.4)",
        zIndex: 301, display: "flex", flexDirection: "column",
        overflow: "hidden",
        animation: "scaleIn 0.2s cubic-bezier(0.4,0,0.2,1) both"
      }}>

        {/* Search Input */}
        <div style={{
          display: "flex", alignItems: "center", gap: "0.75rem",
          padding: "1rem 1.25rem",
          borderBottom: "1px solid var(--color-slate-200)"
        }}>
          <Search size={18} style={{ color: query ? "var(--color-primary)" : "var(--color-slate-400)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search students, faculty, courses, invoices, events…"
            id="global-search-input"
            style={{
              flex: 1, border: "none", outline: "none",
              fontSize: "1rem", color: "var(--color-slate-900)",
              fontFamily: "inherit", background: "transparent"
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                width: 24, height: 24, borderRadius: "50%",
                background: "var(--color-slate-200)", border: "none",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "var(--color-slate-600)", flexShrink: 0
              }}
            >
              <X size={12} />
            </button>
          )}
          <kbd style={{
            fontSize: "0.6875rem", fontFamily: "var(--font-mono)",
            background: "var(--color-slate-100)", color: "var(--color-slate-500)",
            padding: "0.2rem 0.4rem", borderRadius: "0.3rem", flexShrink: 0
          }}>Esc</kbd>
        </div>

        {/* Results */}
        <div style={{ flex: 1, overflowY: "auto", padding: "0.875rem 1rem" }}>
          {query.trim().length <= 1 && (
            <div>
              <div style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-slate-400)", marginBottom: "0.5rem", padding: "0 0.25rem" }}>
                Recent Searches
              </div>
              {RECENT.map((r, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "0.5rem 0.625rem", borderRadius: "0.625rem", cursor: "pointer",
                  transition: "background 0.15s"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--color-slate-50)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                  onClick={() => setQuery(r.label)}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
                    <Search size={13} style={{ color: "var(--color-slate-400)" }} />
                    <span style={{ fontSize: "0.875rem", color: "var(--color-slate-700)", fontWeight: 500 }}>{r.label}</span>
                  </div>
                  <span style={{
                    fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
                    background: "var(--color-slate-100)", color: "var(--color-slate-500)",
                    padding: "0.15rem 0.4rem", borderRadius: "0.25rem"
                  }}>{r.type}</span>
                </div>
              ))}
            </div>
          )}

          {query.trim().length > 1 && filtered.length === 0 && (
            <div style={{ padding: "2.5rem", textAlign: "center", color: "var(--color-slate-400)" }}>
              <Search size={40} style={{ margin: "0 auto 0.875rem", opacity: 0.25 }} />
              <div style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>No results for "{query}"</div>
              <div style={{ fontSize: "0.8125rem" }}>Try a different keyword or check the spelling</div>
            </div>
          )}

          {Object.entries(groups).map(([type, items]) => (
            <div key={type} style={{ marginBottom: "0.75rem" }}>
              <div style={{
                fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase",
                letterSpacing: "0.08em", color: "var(--color-slate-400)",
                marginBottom: "0.375rem", padding: "0 0.25rem"
              }}>{type}s</div>
              {items.slice(0, 5).map(item => (
                <div
                  key={item.id}
                  onClick={() => { onNavigate && onNavigate(item.section, item); onClose(); }}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.625rem 0.75rem", borderRadius: "0.75rem",
                    cursor: "pointer", transition: "background 0.15s"
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--color-slate-50)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: "0.5rem",
                    background: "var(--color-indigo-50)", color: "var(--color-primary)",
                    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
                  }}>{item.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: "0.875rem", fontWeight: 600, color: "var(--color-slate-900)",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                    }}>
                      {/* Highlight match */}
                      {item.primary}
                    </div>
                    <div style={{
                      fontSize: "0.75rem", color: "var(--color-slate-400)",
                      overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                    }}>{item.secondary}</div>
                  </div>
                  <span className={`badge ${item.tagColor}`} style={{ fontSize: "0.6rem", flexShrink: 0 }}>{item.tag}</span>
                  <ArrowRight size={13} style={{ color: "var(--color-slate-300)", flexShrink: 0 }} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", alignItems: "center", gap: "1.25rem",
          padding: "0.625rem 1.25rem", borderTop: "1px solid var(--color-slate-100)",
          background: "var(--color-slate-50)", fontSize: "0.6875rem", color: "var(--color-slate-400)"
        }}>
          <span><kbd style={{ background: "white", border: "1px solid var(--color-slate-200)", padding: "0.15rem 0.35rem", borderRadius: "0.25rem", fontFamily: "var(--font-mono)" }}>↑↓</kbd> navigate</span>
          <span><kbd style={{ background: "white", border: "1px solid var(--color-slate-200)", padding: "0.15rem 0.35rem", borderRadius: "0.25rem", fontFamily: "var(--font-mono)" }}>↵</kbd> select</span>
          <span><kbd style={{ background: "white", border: "1px solid var(--color-slate-200)", padding: "0.15rem 0.35rem", borderRadius: "0.25rem", fontFamily: "var(--font-mono)" }}>Esc</kbd> close</span>
          <span style={{ marginLeft: "auto" }}>{filtered.length > 0 ? `${filtered.length} result${filtered.length !== 1 ? "s" : ""}` : ""}</span>
        </div>
      </div>
    </>
  );
}
