import React, { useState, useEffect, useRef } from "react";
import {
  X, Search, MessageCircle, BookOpen, Video, Mail,
  Phone, ChevronRight, ChevronDown, CheckCircle2,
  ExternalLink, LifeBuoy, Clock, Send, Star
} from "lucide-react";

/* ─────────────────────────────────────────────────
   FAQ Data
───────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: "How do I reset my password?",
    a: "Go to the login page and click 'Forgot password?' link. Enter your institutional email and you'll receive a reset link within 2 minutes.",
    tag: "Account"
  },
  {
    q: "How do I view my transcript?",
    a: "Navigate to My Profile → Official Documents → 'Unofficial Transcript'. You can download a PDF copy at any time.",
    tag: "Academics"
  },
  {
    q: "How do I pay my tuition fees?",
    a: "Go to Tuition & Fees in the sidebar. Click 'Pay Now' on any outstanding invoice. We accept credit cards, bank transfers, and campus payment portals.",
    tag: "Billing"
  },
  {
    q: "How do I join a study group?",
    a: "Navigate to Study Groups from the sidebar. Click 'Join Team' on any available group. You'll receive the meeting link via email.",
    tag: "Academics"
  },
  {
    q: "Why can't I see my grades?",
    a: "Grades are published by instructors after grading is completed. Check the Gradebook section and contact your instructor if grades are overdue.",
    tag: "Grades"
  },
  {
    q: "How do I contact my advisor?",
    a: "Visit My Profile → Assigned Advisor for office hours and email. You can also message them directly from your profile page.",
    tag: "Account"
  },
  {
    q: "How do I enroll in events?",
    a: "Go to Events Hub in the sidebar and click 'Enroll Now' on any upcoming event. You'll receive a confirmation email.",
    tag: "Events"
  },
  {
    q: "Who do I contact for technical issues?",
    a: "Email it-support@edumanager.org or call +1 (555) 123-0000 ext. 4 during business hours (Mon–Fri, 8AM–6PM).",
    tag: "Technical"
  },
];

const QUICK_LINKS = [
  { label: "Student Handbook",   icon: BookOpen,       href: "#" },
  { label: "Video Tutorials",    icon: Video,           href: "#" },
  { label: "IT Help Desk",       icon: Phone,           href: "#" },
  { label: "Email Support",      icon: Mail,            href: "#" },
];

/* ─────────────────────────────────────────────────
   SupportCenter Drawer Component
───────────────────────────────────────────────── */
export default function SupportCenter({ isOpen, onClose, role }) {
  const [searchQuery, setSearchQuery]   = useState("");
  const [activeTab, setActiveTab]       = useState("faq"); // faq | contact | ticket
  const [expandedFaq, setExpandedFaq]   = useState(null);
  const [ticketTitle, setTicketTitle]   = useState("");
  const [ticketBody, setTicketBody]     = useState("");
  const [ticketCategory, setTicketCategory] = useState("Technical");
  const [ticketSent, setTicketSent]     = useState(false);
  const [rating, setRating]             = useState(0);
  const drawerRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const filteredFaqs = FAQ_ITEMS.filter(f =>
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.a.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.tag.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    if (!ticketTitle.trim() || !ticketBody.trim()) {
      alert("Please fill in all required fields.");
      return;
    }
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setTicketTitle("");
      setTicketBody("");
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0, background: "rgba(15,23,42,0.4)",
          backdropFilter: "blur(3px)", zIndex: 200,
          animation: "fadeIn 0.2s ease both"
        }}
      />

      {/* Drawer */}
      <aside
        ref={drawerRef}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(520px, 95vw)",
          background: "white",
          boxShadow: "-4px 0 48px -8px rgba(15,23,42,0.25)",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          animation: "slideInRight 0.3s cubic-bezier(0.4,0,0.2,1) both",
          overflowY: "hidden"
        }}
      >

        {/* ── Drawer Header ── */}
        <div style={{
          padding: "1.25rem 1.5rem",
          borderBottom: "1px solid var(--color-slate-200)",
          background: "linear-gradient(135deg,#0f172a,#1e1b4b)",
          color: "white",
          flexShrink: 0
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.875rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div style={{
                width: 36, height: 36, borderRadius: "0.625rem",
                background: "rgba(99,102,241,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <LifeBuoy size={18} style={{ color: "#818cf8" }} />
              </div>
              <div>
                <div style={{ fontSize: "1rem", fontWeight: 800, letterSpacing: "-0.02em" }}>Support Center</div>
                <div style={{ fontSize: "0.6875rem", color: "rgba(255,255,255,0.5)" }}>EduManager Pro Help Desk</div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 32, height: 32, borderRadius: "0.5rem",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "rgba(255,255,255,0.7)", cursor: "pointer", transition: "all 0.15s"
              }}
              id="support-close-btn"
            >
              <X size={15} />
            </button>
          </div>

          {/* Status badge */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "0.375rem",
            padding: "0.25rem 0.75rem", background: "rgba(16,185,129,0.15)",
            border: "1px solid rgba(16,185,129,0.3)", borderRadius: "999px",
            fontSize: "0.6875rem", fontWeight: 700, color: "#6ee7b7"
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", animation: "pulse-dot 2s ease infinite" }} />
            All Systems Operational · Avg. reply: 2h
          </div>
        </div>

        {/* ── Tab Nav ── */}
        <div style={{
          display: "flex", borderBottom: "1px solid var(--color-slate-200)",
          padding: "0 1.5rem", background: "white", flexShrink: 0
        }}>
          {[
            { id: "faq",     label: "FAQ",         icon: <BookOpen size={13} /> },
            { id: "contact", label: "Contact",      icon: <Phone size={13} /> },
            { id: "ticket",  label: "Submit Ticket",icon: <MessageCircle size={13} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: "0.375rem",
                padding: "0.75rem 1rem", fontSize: "0.8125rem", fontWeight: 600,
                color: activeTab === tab.id ? "var(--color-primary-dark)" : "var(--color-slate-500)",
                borderBottom: `2px solid ${activeTab === tab.id ? "var(--color-primary)" : "transparent"}`,
                background: "none", border: "none", borderBottom: `2px solid ${activeTab === tab.id ? "var(--color-primary)" : "transparent"}`,
                cursor: "pointer", transition: "all 0.15s", marginBottom: "-1px"
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Scrollable Content ── */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem" }}>

          {/* ═══ FAQ TAB ═══ */}
          {activeTab === "faq" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {/* Search */}
              <div style={{ position: "relative" }}>
                <Search size={14} style={{
                  position: "absolute", left: "0.75rem", top: "50%",
                  transform: "translateY(-50%)", color: "var(--color-slate-400)"
                }} />
                <input
                  type="text"
                  placeholder="Search help articles…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  id="support-search-input"
                  style={{
                    width: "100%", padding: "0.625rem 0.875rem 0.625rem 2.25rem",
                    border: "1.5px solid var(--color-slate-200)", borderRadius: "0.75rem",
                    fontSize: "0.875rem", background: "var(--color-slate-50)", fontFamily: "inherit",
                    color: "var(--color-slate-800)", transition: "all 0.15s"
                  }}
                  onFocus={e => { e.target.style.borderColor = "var(--color-primary)"; e.target.style.background = "white"; }}
                  onBlur={e => { e.target.style.borderColor = "var(--color-slate-200)"; e.target.style.background = "var(--color-slate-50)"; }}
                />
              </div>

              {/* Quick Links */}
              <div>
                <div style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-slate-400)", marginBottom: "0.625rem" }}>
                  Quick Links
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  {QUICK_LINKS.map(link => {
                    const Icon = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        style={{
                          display: "flex", alignItems: "center", gap: "0.5rem",
                          padding: "0.625rem 0.875rem", borderRadius: "0.75rem",
                          border: "1px solid var(--color-slate-200)", background: "var(--color-slate-50)",
                          fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-slate-700)",
                          transition: "all 0.15s", textDecoration: "none"
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.color = "var(--color-primary-dark)"; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "var(--color-slate-50)"; e.currentTarget.style.borderColor = "var(--color-slate-200)"; e.currentTarget.style.color = "var(--color-slate-700)"; }}
                      >
                        <Icon size={14} style={{ color: "var(--color-primary)" }} />
                        {link.label}
                        <ExternalLink size={11} style={{ marginLeft: "auto", opacity: 0.4 }} />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* FAQ List */}
              <div>
                <div style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-slate-400)", marginBottom: "0.625rem" }}>
                  {searchQuery ? `Results for "${searchQuery}"` : "Frequently Asked Questions"}
                  {searchQuery && <span style={{ marginLeft: "0.5rem", color: "var(--color-primary)" }}>({filteredFaqs.length})</span>}
                </div>

                {filteredFaqs.length === 0 ? (
                  <div style={{ padding: "2rem", textAlign: "center", color: "var(--color-slate-400)" }}>
                    <Search size={32} style={{ margin: "0 auto 0.75rem", opacity: 0.3 }} />
                    <div style={{ fontWeight: 600 }}>No results found</div>
                    <div style={{ fontSize: "0.8125rem", marginTop: "0.25rem" }}>Try different keywords or browse all categories</div>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {filteredFaqs.map((faq, i) => (
                      <div
                        key={i}
                        style={{
                          border: `1px solid ${expandedFaq === i ? "var(--color-indigo-200)" : "var(--color-slate-200)"}`,
                          borderRadius: "0.875rem",
                          overflow: "hidden",
                          background: expandedFaq === i ? "#fafbff" : "white",
                          transition: "all 0.2s ease"
                        }}
                      >
                        <button
                          onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                          style={{
                            width: "100%", display: "flex", alignItems: "flex-start",
                            justifyContent: "space-between", gap: "0.75rem",
                            padding: "0.875rem 1rem", background: "none", border: "none",
                            cursor: "pointer", textAlign: "left"
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem" }}>
                              <span style={{
                                fontSize: "0.6rem", fontWeight: 700, textTransform: "uppercase",
                                letterSpacing: "0.06em", background: "var(--color-indigo-50)",
                                color: "var(--color-primary-dark)", padding: "0.1rem 0.4rem",
                                borderRadius: "0.25rem"
                              }}>{faq.tag}</span>
                            </div>
                            <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-slate-900)", lineHeight: 1.4 }}>
                              {faq.q}
                            </div>
                          </div>
                          <div style={{ color: "var(--color-slate-400)", flexShrink: 0, marginTop: 2 }}>
                            {expandedFaq === i ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                          </div>
                        </button>
                        {expandedFaq === i && (
                          <div style={{
                            padding: "0 1rem 0.875rem", fontSize: "0.8125rem",
                            color: "var(--color-slate-600)", lineHeight: 1.7
                          }} className="animate-fade-slide">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rating */}
              <div style={{
                padding: "1rem", background: "var(--color-slate-50)", borderRadius: "0.875rem",
                border: "1px solid var(--color-slate-200)", textAlign: "center"
              }}>
                <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-slate-700)", marginBottom: "0.625rem" }}>
                  Was this help center useful?
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: "0.375rem" }}>
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      onClick={() => setRating(n)}
                      className="star-btn"
                      style={{ color: n <= rating ? "#f59e0b" : "var(--color-slate-300)" }}
                    >
                      <Star size={22} fill={n <= rating ? "#f59e0b" : "none"} />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <div style={{ fontSize: "0.75rem", color: "var(--color-emerald-700)", marginTop: "0.5rem", fontWeight: 600 }}>
                    Thanks for your feedback!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ═══ CONTACT TAB ═══ */}
          {activeTab === "contact" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ fontSize: "0.8125rem", color: "var(--color-slate-500)", lineHeight: 1.6 }}>
                Reach our support team through any of these channels. We typically respond within 2 business hours.
              </div>

              {[
                {
                  icon: <Phone size={18} />,
                  color: ["#ecfdf5","#059669"],
                  label: "Phone Support",
                  value: "+1 (555) 123-0000 ext. 4",
                  sub: "Mon–Fri · 8:00 AM – 6:00 PM EST",
                  action: "Call Now"
                },
                {
                  icon: <Mail size={18} />,
                  color: ["#eef2ff","#4f46e5"],
                  label: "Email Support",
                  value: "it-support@edumanager.org",
                  sub: "Usually responds within 2 hours",
                  action: "Send Email"
                },
                {
                  icon: <MessageCircle size={18} />,
                  color: ["var(--color-cyan-bg)","var(--color-cyan-dark)"],
                  label: "Live Chat",
                  value: "Chat with an agent",
                  sub: "Available Mon–Fri · 9:00 AM – 5:00 PM",
                  action: "Start Chat"
                },
              ].map(ch => (
                <div key={ch.label} style={{
                  display: "flex", alignItems: "center", gap: "1rem",
                  padding: "1rem 1.125rem", border: "1.5px solid var(--color-slate-200)",
                  borderRadius: "1rem", background: "white", transition: "all 0.2s"
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--color-primary)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--color-slate-200)"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: "0.75rem",
                    background: ch.color[0], color: ch.color[1],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0
                  }}>{ch.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-slate-900)" }}>{ch.label}</div>
                    <div style={{ fontSize: "0.8125rem", fontWeight: 600, color: "var(--color-primary)" }}>{ch.value}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.7rem", color: "var(--color-slate-400)", marginTop: "0.125rem" }}>
                      <Clock size={11} />{ch.sub}
                    </div>
                  </div>
                  <button className="btn btn-secondary btn-sm">{ch.action}</button>
                </div>
              ))}

              {/* Office Info */}
              <div style={{
                padding: "1rem", background: "var(--color-slate-50)", borderRadius: "0.875rem",
                border: "1px solid var(--color-slate-200)", fontSize: "0.8125rem", color: "var(--color-slate-600)"
              }}>
                <div style={{ fontWeight: 700, color: "var(--color-slate-800)", marginBottom: "0.5rem" }}>IT Support Office</div>
                <div>📍 Building C, Room 103, University Campus</div>
                <div style={{ marginTop: "0.25rem" }}>🕐 Walk-in hours: Mon–Thu 10:00 AM – 3:00 PM</div>
              </div>
            </div>
          )}

          {/* ═══ TICKET TAB ═══ */}
          {activeTab === "ticket" && (
            ticketSent ? (
              <div style={{ padding: "2.5rem", textAlign: "center" }} className="animate-scale-in">
                <div style={{
                  width: 64, height: 64, borderRadius: "50%", background: "#ecfdf5",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  margin: "0 auto 1rem"
                }}>
                  <CheckCircle2 size={32} style={{ color: "#059669" }} />
                </div>
                <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--color-slate-900)", marginBottom: "0.5rem" }}>
                  Ticket Submitted!
                </div>
                <div style={{ fontSize: "0.875rem", color: "var(--color-slate-500)", lineHeight: 1.6 }}>
                  Your support ticket has been received. A reference number will be sent to your institutional email within 5 minutes.
                </div>
                <div style={{
                  marginTop: "1.25rem", padding: "0.75rem 1rem",
                  background: "var(--color-slate-50)", borderRadius: "0.75rem",
                  fontSize: "0.8125rem", color: "var(--color-slate-600)"
                }}>
                  Expected response time: <strong style={{ color: "var(--color-primary-dark)" }}>Within 2 business hours</strong>
                </div>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ fontSize: "0.8125rem", color: "var(--color-slate-500)", lineHeight: 1.6 }}>
                  Describe your issue and our team will get back to you as soon as possible.
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-select"
                    value={ticketCategory}
                    onChange={e => setTicketCategory(e.target.value)}
                    id="ticket-category"
                  >
                    {["Technical", "Billing", "Academics", "Account Access", "Other"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject <span style={{ color: "var(--color-rose-500)" }}>*</span></label>
                  <input
                    className="form-input"
                    placeholder="Brief description of your issue"
                    value={ticketTitle}
                    onChange={e => setTicketTitle(e.target.value)}
                    required
                    id="ticket-subject"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description <span style={{ color: "var(--color-rose-500)" }}>*</span></label>
                  <textarea
                    className="form-textarea"
                    placeholder="Please provide as much detail as possible, including steps to reproduce the issue, any error messages you saw, and what you expected to happen."
                    value={ticketBody}
                    onChange={e => setTicketBody(e.target.value)}
                    rows={5}
                    required
                    id="ticket-description"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Priority</label>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {[
                      { label: "Low",    color: "var(--color-emerald-700)", bg: "var(--color-emerald-50)" },
                      { label: "Medium", color: "var(--color-amber-700)",   bg: "var(--color-amber-50)" },
                      { label: "High",   color: "var(--color-rose-700)",    bg: "var(--color-rose-50)" },
                    ].map(p => (
                      <button
                        key={p.label}
                        type="button"
                        style={{
                          flex: 1, padding: "0.5rem", borderRadius: "0.625rem",
                          fontSize: "0.75rem", fontWeight: 700, cursor: "pointer",
                          background: p.bg, color: p.color,
                          border: `1.5px solid ${p.bg}`, transition: "all 0.15s"
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ justifyContent: "center" }}
                  id="ticket-submit-btn"
                >
                  <Send size={14} /> Submit Support Ticket
                </button>
              </form>
            )
          )}
        </div>
      </aside>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to   { transform: translateX(0);   opacity: 1; }
        }
      `}</style>
    </>
  );
}
