import React, { useState } from "react";
import { Plus } from "lucide-react";

export default function BillingTab({ invoices, onAddInvoice }) {
  const [showInvoiceForm, setShowInvoiceForm] = useState(false);
  const [invDesc, setInvDesc] = useState("");
  const [invAmount, setInvAmount] = useState("");
  const [invStatus, setInvStatus] = useState("Pending");

  const handleCreateInvoice = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(invAmount);
    if (isNaN(parsedAmount)) return;

    const newInv = {
      id: "INV-" + (5000 + invoices.length + Math.floor(Math.random() * 1000)),
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days
      amount: parsedAmount,
      status: invStatus,
      description: invDesc
    };
    onAddInvoice(newInv);

    setInvDesc("");
    setInvAmount("");
    setShowInvoiceForm(false);
  };

  const totalPaid = invoices.filter(i => i.status === "Paid").reduce((acc, current) => acc + current.amount, 0);
  const totalPending = invoices.filter(i => i.status === "Pending").reduce((acc, current) => acc + current.amount, 0);
  const totalOverdue = invoices.filter(i => i.status === "Overdue").reduce((acc, current) => acc + current.amount, 0);

  return (
    <div className="flex flex-col gap-6">

      <div className="flex flex-col md-flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Tuition Fees & Financial Operations</h2>
          <p className="text-xs text-slate-500">Monitor school accounts, post new student outstanding debit invoices and track receipt balances.</p>
        </div>

        <button
          onClick={() => setShowInvoiceForm(!showInvoiceForm)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4" /> Issue Billing Invoice
        </button>
      </div>

      {/* Financial summaries card indices */}
      <div className="grid grid-cols-1 md-grid-cols-3 gap-4 font-mono">
        <div className="card" style={{backgroundColor: 'var(--color-emerald-50)', borderColor: 'var(--color-emerald-100)'}}>
          <span className="block font-sans text-xs uppercase font-bold" style={{color: 'var(--color-emerald-800)'}}>Collected Tuition Receivables</span>
          <span className="block text-2xl font-black mt-2 mb-1" style={{color: 'var(--color-emerald-900)'}}>${totalPaid.toLocaleString()}</span>
          <span className="font-sans text-xs font-semibold" style={{color: 'var(--color-emerald-700)'}}>Active bank clearings checked today</span>
        </div>
        <div className="card" style={{backgroundColor: 'var(--color-amber-50)', borderColor: 'var(--color-amber-100)'}}>
          <span className="block font-sans text-xs uppercase font-bold" style={{color: 'var(--color-amber-800)'}}>Pending Class Fees</span>
          <span className="block text-2xl font-black mt-2 mb-1" style={{color: 'var(--color-amber-900)'}}>${totalPending.toLocaleString()}</span>
          <span className="font-sans text-xs font-semibold" style={{color: 'var(--color-amber-700)'}}>Dispatched with standard grace cycle</span>
        </div>
        <div className="card" style={{backgroundColor: 'var(--color-rose-50)', borderColor: 'var(--color-rose-100)'}}>
          <span className="block font-sans text-xs uppercase font-bold" style={{color: 'var(--color-rose-800)'}}>Overdue Uncollected balances</span>
          <span className="block text-2xl font-black mt-2 mb-1" style={{color: 'var(--color-rose-900)'}}>${totalOverdue.toLocaleString()}</span>
          <span className="font-sans text-xs font-semibold" style={{color: 'var(--color-rose-700)'}}>3 student registries pending lock checks</span>
        </div>
      </div>

      {/* Modal Add Invoice Form */}
      {showInvoiceForm && (
        <form onSubmit={handleCreateInvoice} className="card" style={{borderColor: 'var(--color-indigo-200)'}}>
          <div className="card-header">
            <h3 className="card-title" style={{color: 'var(--color-indigo-900)'}}>Post New Student Body Enrollment Invoice</h3>
            <button type="button" onClick={() => setShowInvoiceForm(false)} className="text-xs text-slate-400">Cancel</button>
          </div>
          <div className="grid grid-cols-1 md-grid-cols-3 gap-4">
            <div className="form-group">
              <label className="form-label">Fee Description / Terms</label>
              <input
                type="text"
                required
                value={invDesc}
                onChange={(e) => setInvDesc(e.target.value)}
                placeholder="e.g. AP Chemistry Lab Kit Charge"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Debit Amount ($ USD)</label>
              <input
                type="number"
                required
                value={invAmount}
                onChange={(e) => setInvAmount(e.target.value)}
                placeholder="e.g. 120.00"
                className="form-input font-mono"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Initial Payment Status</label>
              <select
                value={invStatus}
                onChange={(e) => setInvStatus(e.target.value)}
                className="form-select"
              >
                <option value="Pending">Pending Dispatch</option>
                <option value="Paid">Prepaid Full</option>
                <option value="Overdue">Overdue Immediately</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2 mt-2" style={{borderTop: '1px solid var(--color-slate-100)'}}>
            <button type="submit" className="btn-primary">
              Post Invoice to Ledger
            </button>
          </div>
        </form>
      )}

      {/* Invoice receipts log table */}
      <div className="card" style={{padding: 0, overflow: 'hidden'}}>
        <div className="table-wrapper">
          <table className="table font-mono">
            <thead>
              <tr>
                <th>Invoice ID</th>
                <th>Description of services</th>
                <th>Issue / Due date</th>
                <th>Amount Invoice</th>
                <th>Ledger Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map(inv => {
                const statusClass = inv.status === "Paid" ? "emerald" : inv.status === "Pending" ? "amber" : "rose";
                return (
                  <tr key={inv.id}>
                    <td className="font-bold text-indigo-700">{inv.id}</td>
                    <td className="font-sans font-medium">{inv.description}</td>
                    <td>{inv.issueDate} • <span className="font-bold">{inv.dueDate}</span></td>
                    <td className="font-black text-slate-900">${inv.amount.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${statusClass}`}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
