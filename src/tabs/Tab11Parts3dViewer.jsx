import { useState } from 'react';
import { partCatalog, assetInstances, healthPredictions, discrepancies, installationHistory } from '../data/mockData';
import { SeverityBadge } from '../components/ui/StatusBadge';

export default function Tab11Parts3dViewer() {
  const [selectedPartId, setSelectedPartId] = useState('p-gearbox');
  const [searchQuery, setSearchQuery] = useState('');

  const handleComponentClick = (partId) => {
    setSelectedPartId(partId);
  };

  // Find part details
  const partDetail = partCatalog[selectedPartId] || { part_name: 'Unknown Component', part_number: 'N/A', stock_number: 'N/A' };
  
  // Find physical instances of this part
  const instances = assetInstances.filter(a => a.part_uuid === selectedPartId);
  const activeInstance = instances[0]; // pick first one for drilldown
  
  // Find health predictions
  const health = activeInstance ? healthPredictions.find(h => h.asset_uuid === activeInstance.asset_uuid) : null;

  // Find discrepancies
  const relatedDiscrepancies = activeInstance 
    ? discrepancies.filter(d => d.suspected_asset_uuid === activeInstance.asset_uuid) 
    : [];

  // Find install history
  const installLog = activeInstance 
    ? installationHistory.filter(ih => ih.child_asset_uuid === activeInstance.asset_uuid) 
    : [];

  // List of all searchable parts
  const partOptions = Object.entries(partCatalog).map(([id, info]) => ({ id, ...info }));
  const filteredOptions = partOptions.filter(p => 
    p.part_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.part_number.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.stock_number.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">3D Parts Viewer & Integration</h1>
          <p className="text-xs text-amis-text-dim mt-1">Layer 1 · Physical · Interactive airframe integration schema, part catalog data bindings, and installation lineage</p>
        </div>
        
        {/* PART SEARCH */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search catalog by NSN / PN / name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-amis-panel border border-amis-border rounded px-3 py-1.5 text-xs text-amis-text-bright focus:outline-none focus:border-amis-l1 min-w-[240px]"
          />
        </div>
      </div>

      <div className="p-4 border border-amis-l5/50 bg-amis-l5/5 rounded text-xs text-amis-text leading-relaxed">
        <span className="text-amis-l5 font-bold uppercase tracking-wider block mb-1">DATA INTEGRATION LAYER EXPLAINER</span>
        Full 3D model visualization requires OEM CAD geometry. This interface serves as the **AMIS Data Integration Layer** which maps glTF/Three.js node indices (by part catalog UUID) to live database keys. Click on the airframe parts in the vector wireframe below to test data binding.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* INTERACTIVE SVG AIRFRAME LAYOUT */}
        <div className="lg:col-span-2 bg-amis-panel border border-amis-border rounded p-4 flex flex-col items-center justify-center min-h-[360px] relative">
          <div className="absolute top-3 left-3 text-[10px] text-amis-text-dim uppercase font-mono">
            MQ-9B SkyGuardian Vector Schematic
          </div>

          <svg viewBox="0 0 800 400" className="w-full max-w-[600px] h-auto">
            {/* Airframe body outline */}
            <path d="M 400 60 L 400 340 M 300 240 L 500 240" stroke="#1a2a40" strokeWidth="2" strokeDasharray="3 3" />
            
            {/* Left Wing */}
            <polygon 
              points="400,100 100,120 100,125 400,135" 
              fill="#070b12" 
              stroke={selectedPartId === 'p-airframe' ? '#00c8ff' : '#1a2a40'} 
              strokeWidth={selectedPartId === 'p-airframe' ? '2.5' : '1.5'}
              className="cursor-pointer hover:stroke-amis-l1 transition-all"
              onClick={() => handleComponentClick('p-airframe')}
            />
            {/* Right Wing */}
            <polygon 
              points="400,100 700,120 700,125 400,135" 
              fill="#070b12" 
              stroke={selectedPartId === 'p-airframe' ? '#00c8ff' : '#1a2a40'} 
              strokeWidth={selectedPartId === 'p-airframe' ? '2.5' : '1.5'}
              className="cursor-pointer hover:stroke-amis-l1 transition-all"
              onClick={() => handleComponentClick('p-airframe')}
            />

            {/* Fuselage Core */}
            <polygon 
              points="385,60 415,60 420,310 380,310" 
              fill="#0b1120" 
              stroke={selectedPartId === 'p-airframe' ? '#00c8ff' : '#1a2a40'} 
              strokeWidth={selectedPartId === 'p-airframe' ? '2.5' : '1.5'}
              className="cursor-pointer hover:stroke-amis-l1 transition-all"
              onClick={() => handleComponentClick('p-airframe')}
            />

            {/* Avionics Compartment (Nose) */}
            <path 
              d="M 385,60 Q 400,15 415,60 Z" 
              fill={selectedPartId === 'p-avionics' ? 'rgba(199,125,255,0.1)' : '#070b12'} 
              stroke={selectedPartId === 'p-avionics' ? '#c77dff' : '#1a2a40'} 
              strokeWidth={selectedPartId === 'p-avionics' ? '2.5' : '1.5'}
              className="cursor-pointer hover:stroke-amis-l4 transition-all"
              onClick={() => handleComponentClick('p-avionics')}
            />

            {/* Engine Core (Upper Mid) */}
            <rect 
              x="385" y="140" width="30" height="70" rx="3"
              fill={selectedPartId === 'p-engine' ? 'rgba(255,107,53,0.1)' : '#070b12'} 
              stroke={selectedPartId === 'p-engine' ? '#ff6b35' : '#1a2a40'} 
              strokeWidth={selectedPartId === 'p-engine' ? '2.5' : '1.5'}
              className="cursor-pointer hover:stroke-amis-l2 transition-all"
              onClick={() => handleComponentClick('p-engine')}
            />

            {/* Reduction Gearbox (Upper Engine interface) */}
            <polygon 
              points="385,210 415,210 410,245 390,245" 
              fill={selectedPartId === 'p-gearbox' ? 'rgba(255,209,102,0.1)' : '#070b12'} 
              stroke={selectedPartId === 'p-gearbox' ? '#ffd166' : '#1a2a40'} 
              strokeWidth={selectedPartId === 'p-gearbox' ? '2.5' : '1.5'}
              className="cursor-pointer hover:stroke-amis-l5 transition-all"
              onClick={() => handleComponentClick('p-gearbox')}
            />

            {/* MLG Landing Gear/Actuator nodes */}
            <circle 
              cx="330" cy="240" r="10" 
              fill={selectedPartId === 'p-hydraulic' ? 'rgba(57,255,122,0.15)' : '#070b12'} 
              stroke={selectedPartId === 'p-hydraulic' ? '#39ff7a' : '#1a2a40'} 
              strokeWidth={selectedPartId === 'p-hydraulic' ? '2.5' : '1.5'}
              className="cursor-pointer hover:stroke-amis-l3 transition-all"
              onClick={() => handleComponentClick('p-hydraulic')}
            />
            <circle 
              cx="470" cy="240" r="10" 
              fill={selectedPartId === 'p-hydraulic' ? 'rgba(57,255,122,0.15)' : '#070b12'} 
              stroke={selectedPartId === 'p-hydraulic' ? '#39ff7a' : '#1a2a40'} 
              strokeWidth={selectedPartId === 'p-hydraulic' ? '2.5' : '1.5'}
              className="cursor-pointer hover:stroke-amis-l3 transition-all"
              onClick={() => handleComponentClick('p-hydraulic')}
            />

            {/* Labels and lines */}
            <line x1="400" y1="40" x2="520" y2="40" stroke="#5a7a9a" strokeWidth="1" />
            <text x="525" y="43" fill="#dceeff" fontSize="11" fontFamily="monospace">Avionics (Nose)</text>

            <line x1="400" y1="175" x2="520" y2="175" stroke="#5a7a9a" strokeWidth="1" />
            <text x="525" y="178" fill="#dceeff" fontSize="11" fontFamily="monospace">TPE331 Turbine</text>

            <line x1="400" y1="225" x2="520" y2="225" stroke="#5a7a9a" strokeWidth="1" />
            <text x="525" y="228" fill="#dceeff" fontSize="11" fontFamily="monospace">Reduction Gearbox</text>

            <line x1="330" y1="240" x2="250" y2="240" stroke="#5a7a9a" strokeWidth="1" />
            <text x="130" y="243" fill="#dceeff" fontSize="11" fontFamily="monospace">Retraction Actuators</text>
          </svg>

          {/* Quick list of search filter results */}
          {searchQuery && (
            <div className="absolute bottom-3 right-3 left-3 bg-amis-bg/95 border border-amis-border rounded p-2 max-h-32 overflow-y-auto space-y-1">
              <div className="text-[9px] text-amis-text-dim uppercase">Search Matches:</div>
              {filteredOptions.map(opt => (
                <button 
                  key={opt.id}
                  onClick={() => { setSelectedPartId(opt.id); setSearchQuery(''); }}
                  className="w-full text-left text-xs p-1 hover:bg-amis-panel rounded text-amis-l1 flex justify-between"
                >
                  <span>{opt.part_name}</span>
                  <span className="font-mono text-[10px] text-amis-text-dim">PN: {opt.part_number}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* SIDE DATA PROPERTY DRILL DOWN */}
        <div className="bg-amis-panel border border-amis-border rounded p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-amis-text-dim border-b border-amis-border pb-1.5 mb-3 flex justify-between">
              <span>Part Catalog Binding</span>
              <span className="text-amis-l1 font-mono">{selectedPartId}</span>
            </div>
            
            <div className="space-y-2.5">
              <div>
                <span className="text-[10px] text-amis-text-dim block uppercase">part_name</span>
                <span className="text-xs text-amis-text-bright font-bold">{partDetail.part_name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] text-amis-text-dim block uppercase">part_number</span>
                  <span className="text-xs font-mono text-amis-text">{partDetail.part_number}</span>
                </div>
                <div>
                  <span className="text-[10px] text-amis-text-dim block uppercase">stock_number (NSN)</span>
                  <span className="text-xs font-mono text-amis-text">{partDetail.stock_number || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-amis-border/50 pt-3 space-y-3">
            <div className="text-[10px] uppercase text-amis-text-dim font-bold">Active Physical Instance</div>
            {activeInstance ? (
              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-amis-text-dim">asset_uuid:</span>
                  <span className="text-amis-text">{activeInstance.asset_uuid}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amis-text-dim">serial_number:</span>
                  <span className="text-amis-l1 font-bold">{activeInstance.serial_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-amis-text-dim">manufacture_date:</span>
                  <span className="text-amis-text">{activeInstance.manufacture_date}</span>
                </div>
              </div>
            ) : (
              <span className="text-xs text-amis-text-dim">No physical serial-tracked component installed.</span>
            )}
          </div>

          <div className="border-t border-amis-border/50 pt-3 space-y-2">
            <div className="text-[10px] uppercase text-amis-text-dim font-bold">Asset Health Prediction</div>
            {health ? (
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amis-text-dim">current_health_score:</span>
                  <span className={`font-bold ${health.current_health_score > 0.8 ? 'text-amis-l3' : health.current_health_score > 0.6 ? 'text-amis-l5' : 'text-amis-red'}`}>
                    {(health.current_health_score * 100).toFixed(0)}%
                  </span>
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-amis-text-dim">predicted_rul:</span>
                  <span className="text-amis-text-bright font-bold">{health.predicted_remaining_useful_life_hours} hrs</span>
                </div>
              </div>
            ) : (
              <span className="text-xs text-amis-text-dim">No diagnostic health predictions logged.</span>
            )}
          </div>

          <div className="border-t border-amis-border/50 pt-3 space-y-2">
            <div className="text-[10px] uppercase text-amis-text-dim font-bold">Open Discrepancies ({relatedDiscrepancies.length})</div>
            <div className="space-y-1 max-h-24 overflow-y-auto">
              {relatedDiscrepancies.map(d => (
                <div key={d.discrepancy_uuid} className="text-[11px] bg-amis-bg p-1.5 border border-amis-border rounded flex items-start gap-1.5">
                  <SeverityBadge severity={d.severity_level} />
                  <span className="text-amis-text-bright truncate">{d.narrative}</span>
                </div>
              ))}
              {relatedDiscrepancies.length === 0 && (
                <div className="text-[10px] text-amis-text-dim font-mono">No active discrepancy reports.</div>
              )}
            </div>
          </div>

          <div className="border-t border-amis-border/50 pt-3 space-y-1">
            <div className="text-[10px] uppercase text-amis-text-dim font-bold">Installation History</div>
            <div className="space-y-1 text-[10px] font-mono max-h-20 overflow-y-auto text-amis-text-dim">
              {installLog.map(ih => (
                <div key={ih.install_uuid} className="flex justify-between border-b border-amis-border/30 pb-0.5">
                  <span>Installed: {ih.install_date.slice(0, 10)}</span>
                  <span>{ih.removal_date ? `Removed: ${ih.removal_date.slice(0, 10)}` : 'ACTIVE'}</span>
                </div>
              ))}
              {installLog.length === 0 && (
                <div>No installation history events found.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
