import { useState } from 'react';
import { faultLog } from '../data/mockData';
import SchemaTable from '../components/ui/SchemaTable';

const dataModules = [
  { dm_code: 'DM-72-00-00', title: 'TPE331-12 Engine Removal & Installation', category: 'Propulsion', related_part: 'p-engine' },
  { dm_code: 'DM-72-10-00', title: 'Reduction Gearbox Separation & Rework', category: 'Propulsion', related_part: 'p-gearbox' },
  { dm_code: 'DM-29-10-00', title: 'MLG Actuator Bleeding & Re-sealing', category: 'Hydraulics', related_part: 'p-actuator' },
];

const procedures = {
  'DM-72-00-00': `Task 72-00-00-910-001: Turboprop Engine Installation
1. PREPARATION & SAFETY REQUIREMENTS
   - Verify electrical power is de-energized and tag-out locks are installed.
   - Position support stand SE-HYD-550 under core nacelle.
2. DISCONNECTION PROCEDURES
   - Disconnect fuel lines at primary manifold coupling and seal open ports.
   - Disconnect electrical wiring harness plugs J1 through J12 from engine core.
3. REMOVAL SEQUENCE
   - Attach engine lift sling NAS-99 to crane hoist. Tension crane to 350 lbs.
   - Remove engine mount bolts (4 places). Retain bolts and washers for QA wear inspection.
   - Carefully maneuver engine forward of fire-wall. Avoid striking engine cowl structure.`,
  'DM-72-10-00': `Task 72-10-00-910-002: Reduction Gearbox Maintenance
1. FLUID DE-DRAINAGE
   - Position drain pan under scavenge oil filter assembly.
   - Remove drain plug and collect sample. Verify chip detector is clear of metal debris.
2. GEAR SEPARATION
   - Remove perimeter casing bolts (12 places). Loosen in cross-wise pattern.
   - Disengage output coupling shaft NAS660. Use gear puller GP-4 to avoid spline wear.
3. INSPECTION
   - Inspect teeth surfaces for pitting, wear-out, or spalling. Max limit: 0.02in depth.
   - Re-torque perimeter bolts to 180 in-lbs in a cross pattern upon reassembly.`,
  'DM-29-10-00': `Task 29-10-00-910-001: Landing Gear Actuator Servicing
1. HYDRAULIC PRESSURE DE-BLEEDING
   - De-pressurize hydraulic system A. Accumulator pressure must read 0 PSI.
2. REMOVAL
   - Remove pivot pins at head and piston ends. Retain cotter keys for QA sign-off.
   - Extract actuator housing from main gear trunnion.
3. RE-SEALING
   - Replace internal packing seals. Coat new seals with MIL-H-5606 hydraulic oil.
   - Reinstall actuator and torque trunnion mounting nuts to 450 in-lbs.`
};

export default function Tab10IetmViewer() {
  const [activeDm, setActiveDm] = useState('DM-72-10-00');
  const [ariaQuery, setAriaQuery] = useState('');
  const [ariaResponse, setAriaResponse] = useState('');
  const [tmcrDescription, setTmcrDescription] = useState('');
  const [tmcrSubmitted, setTmcrSubmitted] = useState(false);

  const handleAriaAsk = (e) => {
    e.preventDefault();
    if (!ariaQuery.trim()) return;
    
    let resp = "IETM CONTEXT AGENT: ";
    if (activeDm === 'DM-72-10-00') {
      if (ariaQuery.toLowerCase().includes('torque') || ariaQuery.toLowerCase().includes('bolt')) {
        resp += "For step 3 (reassembly), perimeter casing bolts must be torqued to 180 in-lbs in a cross pattern. Do NOT exceed 200 in-lbs as this causes casing stress and gasket leakage.";
      } else if (ariaQuery.toLowerCase().includes('chip') || ariaQuery.toLowerCase().includes('metal')) {
        resp += "If the chip detector is active (GBX-007), verify metal particles size. If particle dimensions exceed 0.05in, catalog as spalling failure mode and schedule depot teardown.";
      } else {
        resp += "Reduction Gearbox maintenance (72-10-00) requires Support Equipment SE-TRQ-100 (torque wrench) and GP-4 gear puller. Verify calibration status before proceed.";
      }
    } else if (activeDm === 'DM-72-00-00') {
      resp += "Engine removal (72-00-00) requires lift sling NAS-99. Verify hoist is certified to 1000 lbs. Ensure the J1-J12 harnesses are labeled to prevent crossing pins during reinstallation.";
    } else {
      resp += "Actuator servicing (29-10-00) requires hydraulic system A de-pressurization. Do NOT attempt removal with positive accumulator pressure.";
    }
    
    setAriaResponse(resp);
  };

  const handleTmcrSubmit = (e) => {
    e.preventDefault();
    if (!tmcrDescription.trim()) return;
    setTmcrSubmitted(true);
    setTmcrDescription('');
    setTimeout(() => setTmcrSubmitted(false), 3000);
  };

  const selectedDm = dataModules.find(d => d.dm_code === activeDm);
  const relatedPartUuid = selectedDm?.related_part;

  // Filter fault logs related to the active DM
  const relatedFaults = faultLog.filter(f => {
    if (relatedPartUuid === 'p-engine') return f.fault_code.includes('ENG');
    if (relatedPartUuid === 'p-gearbox') return f.fault_code.includes('GBX');
    if (relatedPartUuid === 'p-actuator') return f.fault_code.includes('HYD');
    return false;
  });

  const faultColumns = [
    { key: 'event_uuid', label: 'event_uuid' },
    { key: 'fault_code', label: 'fault_code' },
    { key: 'trigger_timestamp', label: 'trigger_timestamp', render: (v) => v.slice(0, 16) },
    { key: 'clear_timestamp', label: 'clear_timestamp', render: (v) => v ? v.slice(0, 16) : 'ACTIVE' },
  ];

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">IETM Viewer</h1>
        <p className="text-xs text-amis-text-dim mt-1">Layer 5 · Effector · Interactive Electronic Technical Manuals, change requests, and real-time fault history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* DM NAVIGATION LIST */}
        <div className="lg:col-span-1 bg-amis-panel border border-amis-border rounded p-3 space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-amis-text-dim border-b border-amis-border pb-1.5 mb-2">
            data_module Catalog
          </div>
          {dataModules.map((dm) => (
            <button
              key={dm.dm_code}
              onClick={() => {
                setActiveDm(dm.dm_code);
                setAriaResponse('');
              }}
              className={`w-full text-left p-2.5 rounded border text-xs transition-colors flex flex-col space-y-1 ${activeDm === dm.dm_code ? 'bg-amis-l1/10 border-amis-l1 text-amis-l1' : 'bg-amis-bg border-amis-border text-amis-text hover:border-amis-text-dim'}`}
            >
              <div className="font-mono font-bold">{dm.dm_code}</div>
              <div className="font-bold truncate">{dm.title}</div>
              <div className="text-[9px] text-amis-text-dim">{dm.category} System</div>
            </button>
          ))}
        </div>

        {/* PROCEDURE TEXT VIEWER */}
        <div className="lg:col-span-2 bg-amis-panel border border-amis-border rounded flex flex-col">
          <div className="px-3 py-2 border-b border-amis-border flex justify-between items-center">
            <span className="text-xs text-amis-text-bright font-bold">{selectedDm?.dm_code} — Procedure Text</span>
            <span className="text-[9px] text-amis-l1 uppercase">IETM Database Read</span>
          </div>
          <div className="p-4 bg-amis-bg/60 font-mono text-xs text-amis-text-bright whitespace-pre-wrap leading-relaxed flex-1 min-h-[300px] border-b border-amis-border overflow-y-auto">
            {procedures[activeDm]}
          </div>
          <div className="p-3 bg-amis-panel/40 flex flex-col space-y-2">
            <form onSubmit={handleAriaAsk} className="flex gap-2">
              <input
                type="text"
                placeholder="Ask ARIA about this procedure..."
                value={ariaQuery}
                onChange={(e) => setAriaQuery(e.target.value)}
                className="flex-1 bg-amis-bg border border-amis-border rounded px-3 py-1.5 text-xs text-amis-text-bright focus:outline-none focus:border-amis-l4"
              />
              <button
                type="submit"
                className="bg-amis-l4 border border-amis-l4 text-amis-bg font-bold px-4 py-1.5 rounded text-xs hover:bg-amis-l4/80 transition-colors"
              >
                Ask
              </button>
            </form>
            {ariaResponse && (
              <div className="p-2.5 bg-amis-l4/5 border border-amis-l4/20 rounded text-[11px] font-mono text-amis-text-bright leading-relaxed">
                {ariaResponse}
              </div>
            )}
          </div>
        </div>

        {/* SIDE-BY-SIDE FAULTS */}
        <div className="lg:col-span-1">
          <SchemaTable
            tableName={`triggered_fault_log (Related to ${selectedDm?.dm_code})`}
            columns={faultColumns}
            rows={relatedFaults}
          />
          <div className="mt-3 p-3 bg-amis-panel/30 border border-amis-border rounded text-[10px] text-amis-text-dim font-mono leading-relaxed">
            💡 This panel matches historical component failure events to procedures so technicians can read lessons learned during maintenance.
          </div>
        </div>
      </div>

      {/* TMCR SUBMISSION FORM */}
      <div className="bg-amis-panel border border-amis-border rounded p-4">
        <h2 className="text-xs uppercase tracking-widest text-amis-text-bright mb-3">Submit Tech Manual Change Request (TMCR)</h2>
        <form onSubmit={handleTmcrSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-amis-text-dim block">Target Data Module Code</label>
            <input
              type="text"
              value={activeDm}
              disabled
              className="w-full bg-amis-bg border border-amis-border/50 rounded px-3 py-1.5 text-xs text-amis-text-dim font-mono"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase text-amis-text-dim block">Severity Category</label>
            <select className="w-full bg-amis-bg border border-amis-border rounded px-3 py-1.5 text-xs text-amis-text">
              <option value="routine">Routine — Typo or standard update</option>
              <option value="safety">Safety / Grounded — Danger of component damage or injury</option>
            </select>
          </div>
          <div className="md:col-span-3 space-y-1">
            <label className="text-[10px] uppercase text-amis-text-dim block">Manual Deficiency Description</label>
            <textarea
              rows={3}
              placeholder="Detail what is incorrect or missing in the technical manual procedure..."
              value={tmcrDescription}
              onChange={(e) => setTmcrDescription(e.target.value)}
              className="w-full bg-amis-bg border border-amis-border rounded p-3 text-xs text-amis-text-bright focus:outline-none focus:border-amis-l1"
            />
          </div>
          <div className="md:col-span-3 flex justify-between items-center">
            {tmcrSubmitted ? (
              <span className="text-xs text-amis-l3 font-bold">✓ Tech Manual Change Request submitted successfully! Added to tmcr_log.</span>
            ) : (
              <span className="text-[10px] text-amis-text-dim">Creates record in tech_manual_change_request.</span>
            )}
            <button
              type="submit"
              className="bg-amis-l1 border border-amis-l1 text-amis-bg font-bold px-6 py-2 rounded text-xs hover:bg-amis-l1/80 transition-colors"
            >
              Submit Change Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
