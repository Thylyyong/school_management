import React from "react";

export default function TuitionTab({ invoices, onPayInvoice }) {
  return (
    <div className="card space-y-4">
      <div className="card-header border-b border-slate-100 pb-2 mb-2">
        <h3 className="card-title">Active balance accounting statement</h3>
        <p className="card-subtitle">Maintain timely fee clears to satisfy class enrollment standing. Click payment actions for simulation clearing.</p>
      </div>

      <div className="list-container font-mono">
        {invoices.map(inv => {
          let statusClass = "rose";
          if (inv.status === "Paid") statusClass = "emerald";
          if (inv.status === "Pending") statusClass = "amber";

          return (
            <div key={inv.id} className="list-item flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-indigo-700 text-sm">{inv.id}</span>
                  <span className="text-xs bg-slate-100 text-slate-500 rounded px-1.5 py-0.5 font-bold" style={{fontSize: '0.5625rem'}}>{inv.issueDate} Issue</span>
                </div>
                <span className="block font-sans text-slate-800 font-semibold mb-1 text-sm">{inv.description}</span>
                <span className="block text-xs text-slate-400 mt-1">Due timeline deadline: <strong className="text-slate-600">{inv.dueDate}</strong></span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-lg font-black text-slate-950">${inv.amount.toFixed(2)}</span>
                <span className={`badge ${statusClass} font-sans`}>
                  {inv.status}
                </span>

                {inv.status !== "Paid" && (
                  <button
                    onClick={() => onPayInvoice(inv.id)}
                    className="btn-primary font-sans text-xs font-bold transition-all"
                    style={{padding: '0.375rem 0.75rem', fontSize: '0.6875rem'}}
                  >
                    Simulate settlement
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
