import React, { useState } from "react";

export default function EventsTab({ events, onAddEvent }) {
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [newEventTime, setNewEventTime] = useState("");
  const [newEventLoc, setNewEventLoc] = useState("");
  const [newEventDesc, setNewEventDesc] = useState("");

  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!newEventTitle) return;
    const ev = {
      id: "EV-" + Math.floor(Math.random() * 10000),
      title: newEventTitle,
      date: newEventDate || new Date().toISOString().split('T')[0],
      time: newEventTime,
      location: newEventLoc,
      description: newEventDesc,
      enrolledStudentIds: []
    };
    onAddEvent(ev);
    setNewEventTitle("");
    setNewEventDate("");
    setNewEventTime("");
    setNewEventLoc("");
    setNewEventDesc("");
  };

  return (
    <div className="grid grid-cols-1 lg-grid-cols-2 gap-6">
      
      {/* Create Event Form */}
      <div className="card space-y-4">
        <div className="card-header border-b border-slate-100 pb-2 mb-2">
          <h3 className="card-title">Publish School Event</h3>
        </div>
        <form onSubmit={handleCreateEvent} className="space-y-4 flex flex-col gap-3">
          <input 
            type="text" 
            required 
            placeholder="Event Title" 
            value={newEventTitle} 
            onChange={e => setNewEventTitle(e.target.value)} 
            className="form-input" 
          />
          <div className="flex gap-2">
            <input 
              type="date" 
              required 
              value={newEventDate} 
              onChange={e => setNewEventDate(e.target.value)} 
              className="form-input flex-1" 
            />
            <input 
              type="text" 
              required 
              placeholder="Time (e.g. 10:00 AM)" 
              value={newEventTime} 
              onChange={e => setNewEventTime(e.target.value)} 
              className="form-input flex-1" 
            />
          </div>
          <input 
            type="text" 
            required 
            placeholder="Location" 
            value={newEventLoc} 
            onChange={e => setNewEventLoc(e.target.value)} 
            className="form-input" 
          />
          <textarea 
            required 
            placeholder="Event Description..." 
            value={newEventDesc} 
            onChange={e => setNewEventDesc(e.target.value)} 
            className="form-input min-h-[80px] resize-y" 
            style={{minHeight: '80px'}}
          />
          <button type="submit" className="btn-primary w-full text-center flex justify-center py-2">
            Create Event
          </button>
        </form>
      </div>

      {/* List of Events */}
      <div className="card space-y-4">
        <div className="card-header border-b border-slate-100 pb-2 mb-2">
          <h3 className="card-title">Upcoming Events</h3>
        </div>
        <div className="space-y-3 flex flex-col gap-3">
          {events.map(ev => (
            <div key={ev.id} className="p-4 bg-slate-50 border border-slate-200 space-y-1" style={{borderRadius: '1rem'}}>
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-indigo-900 text-sm">{ev.title}</span>
                <span className="text-[10px] text-slate-500 bg-slate-200 px-1.5 py-0.5 rounded font-mono font-bold">{ev.date}</span>
              </div>
              <div className="text-xs text-slate-600 font-bold mb-1">{ev.location} • {ev.time}</div>
              <p className="text-xs text-slate-500 leading-relaxed mb-2">{ev.description}</p>
              <div className="pt-2 mt-2 text-xs font-bold text-emerald-700" style={{borderTop: '1px solid var(--color-slate-200)'}}>
                {ev.enrolledStudentIds.length} Students Enrolled
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
