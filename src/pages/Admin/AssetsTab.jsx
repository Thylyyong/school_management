import React, { useState } from "react";
import { Search, Plus, Laptop, MapPin, RefreshCcw } from "lucide-react";

export default function AssetsTab({ assets, onAddAsset, onUpdateAsset }) {
  const [assetSearch, setAssetSearch] = useState("");
  const [showAddAssetForm, setShowAddAssetForm] = useState(false);

  // Form states
  const [astName, setAstName] = useState("");
  const [astType, setAstType] = useState("Hardware");
  const [astRoom, setAstRoom] = useState("Unassigned");

  const handleCreateAsset = (e) => {
    e.preventDefault();
    const newAst = {
      id: "AST-" + (1000 + assets.length + Math.floor(Math.random() * 500)),
      name: astName,
      type: astType,
      status: astRoom === "Unassigned" ? "Available" : "Assigned",
      allocatedTo: astRoom
    };
    onAddAsset(newAst);

    setAstName("");
    setAstType("Hardware");
    setAstRoom("Unassigned");
    setShowAddAssetForm(false);
  };

  const triggerReallocate = (assetId, currentRoom) => {
    const rooms = ["Room 302 (Physics Lab)", "Room 105 (Computer Science Lab)", "Room 201 (History Studio)", "Room 305 (Calculus Suite)", "Room 101", "Unassigned"];
    const currentIndex = rooms.indexOf(currentRoom);
    const nextIndex = (currentIndex + 1) % rooms.length;
    const nextRoom = rooms[nextIndex];
    onUpdateAsset(assetId, {
      allocatedTo: nextRoom,
      status: nextRoom === "Unassigned" ? "Available" : "Assigned"
    });
  };

  // Filter classroom resources
  const filteredAssets = assets.filter(as => {
    const matchName = as.name.toLowerCase().includes(assetSearch.toLowerCase());
    const matchType = as.type.toLowerCase().includes(assetSearch.toLowerCase());
    const matchRoom = as.allocatedTo.toLowerCase().includes(assetSearch.toLowerCase());
    return matchName || matchType || matchRoom;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md-flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Capital Assets & Classroom Equipment</h2>
          <p className="text-xs text-slate-500">Live tracker for physical hardware, digital suites and laboratory resources.</p>
        </div>

        <div className="flex items-center gap-2 w-full" style={{maxWidth: '24rem'}}>
          <div className="search-container">
            <span className="search-icon"><Search className="w-4 h-4" /></span>
            <input
              type="text"
              value={assetSearch}
              onChange={(e) => setAssetSearch(e.target.value)}
              placeholder="Type name, category, room..."
              className="search-input"
            />
          </div>

          <button
            onClick={() => setShowAddAssetForm(!showAddAssetForm)}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" /> Register Asset
          </button>
        </div>
      </div>

      {/* Modal Add Asset Form */}
      {showAddAssetForm && (
        <form onSubmit={handleCreateAsset} className="card" style={{borderColor: 'var(--color-indigo-200)'}}>
          <div className="card-header">
            <h3 className="card-title" style={{color: 'var(--color-indigo-900)'}}>Register Physical/Digital Educational Asset</h3>
            <button type="button" onClick={() => setShowAddAssetForm(false)} className="text-xs text-slate-400">Cancel</button>
          </div>
          <div className="grid grid-cols-1 md-grid-cols-3 gap-4">
            <div className="form-group">
              <label className="form-label">Equipment / License Name</label>
              <input
                type="text"
                required
                value={astName}
                onChange={(e) => setAstName(e.target.value)}
                placeholder="e.g. Chromebook Cart C"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Asset Category Typology</label>
              <select
                value={astType}
                onChange={(e) => setAstType(e.target.value)}
                className="form-select"
              >
                <option value="Hardware">Hardware Equipment</option>
                <option value="Digital License">Software & Digital License</option>
                <option value="Lab Material">Lab Tools & Consumables</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Initial Room Assignment</label>
              <select
                value={astRoom}
                onChange={(e) => setAstRoom(e.target.value)}
                className="form-select"
              >
                <option value="Unassigned">Unassigned (Reserve Locker)</option>
                <option value="Room 302 (Physics Lab)">Room 302 (Physics Lab)</option>
                <option value="Room 105 (Computer Science Lab)">Room 105 (Computer Science Lab)</option>
                <option value="Room 201 (History Studio)">Room 201 (History Studio)</option>
                <option value="Room 305 (Calculus Suite)">Room 305 (Calculus Suite)</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end pt-2 mt-2" style={{borderTop: '1px solid var(--color-slate-100)'}}>
            <button type="submit" className="btn-primary">
              Approve Registry Allocation
            </button>
          </div>
        </form>
      )}

      {/* Asset Items Display and Reassign triggers */}
      <div className="card" style={{padding: 0, overflow: 'hidden'}}>
        <div className="card-header" style={{margin: 0, padding: '1rem', backgroundColor: 'var(--color-slate-50)'}}>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Active Equipment Registry Database</span>
          <span className="text-xs text-slate-400">Total counted: {assets.length} items</span>
        </div>
        <div className="list-container" style={{gap: 0}}>
          {filteredAssets.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No classroom equipment tags matching active filter.
            </div>
          ) : (
            filteredAssets.map(asset => {
              const iconClass = asset.status === "Assigned" ? "indigo" : asset.status === "Maintenance" ? "amber" : "emerald";

              return (
                <div key={asset.id} className="list-item" style={{border: 'none', borderBottom: '1px solid var(--color-slate-100)', borderRadius: 0, backgroundColor: 'white'}}>
                  <div className="list-item-content">
                    <div className={`list-item-icon ${iconClass}`} style={{backgroundColor: `var(--color-${iconClass}-50)`, color: `var(--color-${iconClass}-700)`}}>
                      <Laptop className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="list-item-title block text-sm">{asset.name}</span>
                      <span className="list-item-subtitle font-mono mt-1">ID: {asset.id} • Type: <strong className="text-slate-600">{asset.type}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <div className="text-right pr-4" style={{borderRight: '1px solid var(--color-slate-100)'}}>
                      <span className="block text-xs uppercase font-bold text-slate-400 mb-1" style={{fontSize: '0.5625rem'}}>Current Facility deployment</span>
                      <span className="font-semibold text-slate-700 flex items-center justify-end gap-1">
                        <MapPin className="w-3 h-3 text-indigo-500" />
                        {asset.allocatedTo}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`badge ${iconClass}`}>
                        {asset.status}
                      </span>

                      <button
                        onClick={() => triggerReallocate(asset.id, asset.allocatedTo)}
                        className="btn-secondary"
                        style={{padding: '0.25rem 0.5rem', fontSize: '0.625rem', display: 'flex', alignItems: 'center', gap: '0.25rem'}}
                        title="Interactive Shift Room Allocation"
                      >
                        <RefreshCcw className="w-3 h-3" />
                        Reallocate
                      </button>
                    </div>
                  </div>

                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  );
}
