import React, { useState } from "react";
import {
  CreditCard, CheckCircle2, Clock, AlertCircle,
  Download, ChevronDown, ChevronUp, DollarSign, CalendarDays
} from "lucide-react";

function InvoiceCard({ inv, onPayInvoice }) {
  const [expanded, setExpanded] = useState(false);
  const isPaid = inv.status === "Paid";
  const isPending = inv.status === "Pending";

  const statusConfig = {
    Paid:    { cls: "emerald", dot: "#10b981", icon: <CheckCircle2 size={14} /> },
    Pending: { cls: "amber",   dot: "#f59e0b", icon: <Clock size={14} /> },
    Overdue: { cls: "rose",    dot: "#ef4444", icon: <AlertCircle size={14} /> },
  };
  const sc = statusConfig[inv.status] || statusConfig.Pending;

  return (
    <div style={{
      background: "white",
      border: `1.5px solid ${isPaid ? "#d1fae5" : isPending ? "#fef3c7" : "#fecdd3"}`,
      borderRadius: "1rem",
      overflow: "hidden",
      transition: "box-shadow 0.2s ease",
      boxShadow: "var(--shadow-sm)",
    }}>
      {/* Top accent strip */}
      <div style={{
        height: "3px",
        background: isPaid
          ? "linear-gradient(90deg,#10b981,#059669)"
          : isPending
            ? "linear-gradient(90deg,#f59e0b,#d97706)"
            : "linear-gradient(90deg,#ef4444,#dc2626)"
      }} />

      <div style={{ padding: "1.125rem 1.25rem" }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "0.75rem" }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.375rem", flexWrap: "wrap" }}>
              <span style={{
                fontFamily: "var(--font-mono)", fontWeight: 800, fontSize: "0.8125rem",
                color: "var(--color-primary-dark)"
              }}>{inv.id}</span>
              <span style={{
                fontSize: "0.6rem", background: "var(--color-slate-100)", color: "var(--color-slate-500)",
                padding: "0.15rem 0.45rem", borderRadius: "0.25rem", fontFamily: "var(--font-mono)",
                fontWeight: 700, textTransform: "uppercase"
              }}>Issued {inv.issueDate}</span>
            </div>
            <div style={{ fontSize: "0.9375rem", fontWeight: 700, color: "var(--color-slate-900)", lineHeight: 1.4, marginBottom: "0.375rem" }}>
              {inv.description}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", fontSize: "0.75rem", color: "var(--color-slate-500)" }}>
              <CalendarDays size={12} />
              Due: <strong style={{ color: isPaid ? "var(--color-emerald-700)" : "var(--color-rose-600)" }}>{inv.dueDate}</strong>
            </div>
          </div>

          {/* Amount + status */}
          <div style={{ textAlign: "right", flexShrink: 0 }}>
            <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--color-slate-900)", letterSpacing: "-0.04em", lineHeight: 1 }}>
              ${inv.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.375rem", justifyContent: "flex-end", marginTop: "0.375rem" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: sc.dot, flexShrink: 0 }} />
              <span style={{
                fontSize: "0.6875rem", fontWeight: 700,
                color: { Paid: "var(--color-emerald-700)", Pending: "var(--color-amber-700)", Overdue: "var(--color-rose-700)" }[inv.status] || "var(--color-amber-700)"
              }}>{inv.status}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginTop: "1rem", paddingTop: "0.875rem", borderTop: "1px solid var(--color-slate-100)" }}>
          {!isPaid && (
            <button
              className="btn btn-primary btn-sm"
              id={`pay-invoice-${inv.id}`}
              onClick={() => onPayInvoice(inv.id)}
              style={{ flex: 1, justifyContent: "center" }}
            >
              <CreditCard size={13} /> Pay Now — ${inv.amount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </button>
          )}
          {isPaid && (
            <div style={{
              flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
              gap: "0.5rem", padding: "0.4375rem 0.875rem", background: "#ecfdf5",
              borderRadius: "0.625rem", fontSize: "0.8125rem", fontWeight: 700, color: "#047857"
            }}>
              <CheckCircle2 size={14} /> Payment Cleared
            </div>
          )}
          <button
            className="btn btn-secondary btn-icon btn-sm"
            title="Download receipt"
            onClick={() => alert("Downloading receipt PDF…")}
          >
            <Download size={13} />
          </button>
          <button
            className="btn btn-ghost btn-icon btn-sm"
            onClick={() => setExpanded(v => !v)}
            title="View details"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {/* Expandable breakdown */}
        {expanded && (
          <div style={{
            marginTop: "0.875rem", padding: "0.875rem", background: "var(--color-slate-50)",
            borderRadius: "0.75rem", border: "1px solid var(--color-slate-200)", fontSize: "0.8125rem"
          }} className="animate-fade-slide">
            <div style={{ fontWeight: 700, color: "var(--color-slate-700)", marginBottom: "0.625rem", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Invoice Breakdown
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
              <span style={{ color: "var(--color-slate-600)" }}>Base Amount</span>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>${(inv.amount * 0.9).toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.375rem" }}>
              <span style={{ color: "var(--color-slate-600)" }}>Administrative Fee (10%)</span>
              <span style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>${(inv.amount * 0.1).toFixed(2)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "0.5rem", borderTop: "1px solid var(--color-slate-200)", fontWeight: 800 }}>
              <span style={{ color: "var(--color-slate-900)" }}>Total Due</span>
              <span style={{ fontFamily: "var(--font-mono)", color: "var(--color-primary-dark)" }}>${inv.amount.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function TuitionTab({ invoices, onPayInvoice }) {
  const totalPaid    = invoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
  const totalPending = invoices.filter(i => i.status !== "Paid").reduce((s, i) => s + i.amount, 0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

      {/* ── Summary cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
        {[
          { label: "Outstanding Balance", value: `$${totalPending.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: "var(--color-rose-600)", bg: "#fff1f2", border: "#fecdd3", icon: <AlertCircle size={16} />, iconColor: "#e11d48" },
          { label: "Total Paid",           value: `$${totalPaid.toLocaleString("en-US", { minimumFractionDigits: 2 })}`, color: "var(--color-emerald-700)", bg: "#ecfdf5", border: "#a7f3d0", icon: <CheckCircle2 size={16} />, iconColor: "#059669" },
          { label: "Total Invoices",       value: invoices.length, color: "var(--color-primary-dark)", bg: "#eef2ff", border: "#c7d2fe", icon: <DollarSign size={16} />, iconColor: "#4f46e5" },
        ].map(s => (
          <div key={s.label} style={{
            background: s.bg, border: `1.5px solid ${s.border}`, borderRadius: "1rem",
            padding: "1.125rem", display: "flex", alignItems: "center", gap: "0.875rem"
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: "0.625rem", background: "white",
              display: "flex", alignItems: "center", justifyContent: "center", color: s.iconColor,
              boxShadow: "var(--shadow-sm)", flexShrink: 0
            }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: "0.6875rem", color: "var(--color-slate-500)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</div>
              <div style={{ fontSize: "1.375rem", fontWeight: 900, color: s.color, letterSpacing: "-0.03em", lineHeight: 1.2 }}>{s.value}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Page Header ── */}
      <div className="page-section-header">
        <div>
          <div className="page-section-title">Fee Statements</div>
          <div className="page-section-subtitle">Review and pay your tuition invoices and outstanding balances</div>
        </div>
        <button className="btn btn-secondary btn-sm">
          <Download size={13} /> Download All
        </button>
      </div>

      {/* ── Invoice Cards ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
        {invoices.map(inv => (
          <InvoiceCard key={inv.id} inv={inv} onPayInvoice={onPayInvoice} />
        ))}
      </div>

      {/* ── Payment methods info card ── */}
      <div className="card" style={{ background: "linear-gradient(135deg,#0f172a,#1e1b4b)", color: "white" }}>
        <div style={{ padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Payment Methods Accepted</div>
            <div style={{ fontSize: "0.75rem", color: "rgba(226,232,240,0.6)" }}>
              Credit Card · Bank Transfer · Campus Payment Portal · Financial Aid
            </div>
          </div>
          <button className="btn btn-secondary btn-sm" style={{ background: "rgba(255,255,255,0.1)", color: "white", borderColor: "rgba(255,255,255,0.2)" }}>
            Manage Payment Methods
          </button>
        </div>
      </div>
    </div>
  );
}
