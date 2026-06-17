import { useAmis } from '../context/AmisContext';

export default function Tab12MbseDiagram() {
  const { setActiveTab } = useAmis();

  // Navigation handlers
  const handleBlockClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">MBSE / SysML Block Definition Diagram</h1>
        <p className="text-xs text-amis-text-dim mt-1">Layer 4 · Decision · Cameo-style systems architecture model, signal flow mappings, and cross-module navigation</p>
      </div>

      <div className="p-4 border border-amis-l1/40 bg-amis-l1/5 rounded text-xs text-amis-text leading-relaxed">
        <span className="text-amis-l1 font-bold uppercase tracking-wider block mb-1">INTERACTIVE Cameo Block Definition Diagram (BDD)</span>
        This diagram represents the **AMIS cybernetic architecture** modeled in SysML. The structural blocks map directly to the operational layers. 
        **Hover and click on any block** to drill down into the live data module tracking that system state.
      </div>

      <div className="bg-amis-panel border border-amis-border rounded p-6 flex flex-col items-center justify-center min-h-[480px]">
        <svg viewBox="0 0 900 500" className="w-full max-w-[800px] h-auto">
          {/* Definitions for arrow heads */}
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#1a2a40" />
            </marker>
            <marker id="arrow-active" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00c8ff" />
            </marker>
          </defs>

          {/* Core feedback paths (dashed circle) */}
          <path d="M 450 60 A 200 200 0 1 1 449 60" fill="none" stroke="#1a2a40" strokeWidth="1.5" strokeDasharray="5 5" />

          {/* L6: Meta Loop (Top, Center) */}
          <g className="cursor-pointer group" onClick={() => handleBlockClick(13)}>
            <rect x="360" y="20" width="180" height="70" rx="2" fill="#0b1120" stroke="#ff4da6" strokeWidth="2" className="group-hover:fill-[#ff4da6]/5 transition-colors" />
            <text x="450" y="40" textAnchor="middle" fill="#ff4da6" fontSize="9" fontWeight="bold" fontFamily="monospace">«block»</text>
            <text x="450" y="55" textAnchor="middle" fill="#dceeff" fontSize="11" fontWeight="bold" fontFamily="monospace">L6: Meta Loop</text>
            <text x="450" y="72" textAnchor="middle" fill="#5a7a9a" fontSize="9" fontFamily="monospace">[Observations on observing]</text>
          </g>

          {/* L3: Comparator (Left, Mid) */}
          <g className="cursor-pointer group" onClick={() => handleBlockClick(4)}>
            <rect x="120" y="150" width="180" height="70" rx="2" fill="#0b1120" stroke="#39ff7a" strokeWidth="2" className="group-hover:fill-[#39ff7a]/5 transition-colors" />
            <text x="210" y="170" textAnchor="middle" fill="#39ff7a" fontSize="9" fontWeight="bold" fontFamily="monospace">«block»</text>
            <text x="210" y="185" textAnchor="middle" fill="#dceeff" fontSize="11" fontWeight="bold" fontFamily="monospace">L3: Comparator</text>
            <text x="210" y="202" textAnchor="middle" fill="#5a7a9a" fontSize="9" fontFamily="monospace">[Models & ML predictions]</text>
          </g>

          {/* L4: Decision (Right, Mid) */}
          <g className="cursor-pointer group" onClick={() => handleBlockClick(9)}>
            <rect x="600" y="150" width="180" height="70" rx="2" fill="#0b1120" stroke="#c77dff" strokeWidth="2" className="group-hover:fill-[#c77dff]/5 transition-colors" />
            <text x="690" y="170" textAnchor="middle" fill="#c77dff" fontSize="9" fontWeight="bold" fontFamily="monospace">«block»</text>
            <text x="690" y="185" textAnchor="middle" fill="#dceeff" fontSize="11" fontWeight="bold" fontFamily="monospace">L4: Decision</text>
            <text x="690" y="202" textAnchor="middle" fill="#5a7a9a" fontSize="9" fontFamily="monospace">[ARIA dispositions / projects]</text>
          </g>

          {/* L2: Sensing (Left, Bottom) */}
          <g className="cursor-pointer group" onClick={() => handleBlockClick(2)}>
            <rect x="120" y="300" width="180" height="70" rx="2" fill="#0b1120" stroke="#ff6b35" strokeWidth="2" className="group-hover:fill-[#ff6b35]/5 transition-colors" />
            <text x="210" y="320" textAnchor="middle" fill="#ff6b35" fontSize="9" fontWeight="bold" fontFamily="monospace">«block»</text>
            <text x="210" y="335" textAnchor="middle" fill="#dceeff" fontSize="11" fontWeight="bold" fontFamily="monospace">L2: Sensing</text>
            <text x="210" y="352" textAnchor="middle" fill="#5a7a9a" fontSize="9" fontFamily="monospace">[Telemetry & logs ingest]</text>
          </g>

          {/* L5: Effector (Right, Bottom) */}
          <g className="cursor-pointer group" onClick={() => handleBlockClick(8)}>
            <rect x="600" y="300" width="180" height="70" rx="2" fill="#0b1120" stroke="#ffd166" strokeWidth="2" className="group-hover:fill-[#ffd166]/5 transition-colors" />
            <text x="690" y="320" textAnchor="middle" fill="#ffd166" fontSize="9" fontWeight="bold" fontFamily="monospace">«block»</text>
            <text x="690" y="335" textAnchor="middle" fill="#dceeff" fontSize="11" fontWeight="bold" fontFamily="monospace">L5: Effector</text>
            <text x="690" y="352" textAnchor="middle" fill="#5a7a9a" fontSize="9" fontFamily="monospace">[Maintenance & supply orders]</text>
          </g>

          {/* L1: Physical System (Bottom, Center) */}
          <g className="cursor-pointer group" onClick={() => handleBlockClick(5)}>
            <rect x="360" y="410" width="180" height="70" rx="2" fill="#0b1120" stroke="#00c8ff" strokeWidth="2" className="group-hover:fill-[#00c8ff]/5 transition-colors" />
            <text x="450" y="430" textAnchor="middle" fill="#00c8ff" fontSize="9" fontWeight="bold" fontFamily="monospace">«block»</text>
            <text x="450" y="445" textAnchor="middle" fill="#dceeff" fontSize="11" fontWeight="bold" fontFamily="monospace">L1: Physical System</text>
            <text x="450" y="462" textAnchor="middle" fill="#5a7a9a" fontSize="9" fontFamily="monospace">[Aircaft & serialized parts]</text>
          </g>

          {/* Information Flow Connector Lines (Signals upward, Actions downward) */}
          {/* L1 -> L2 */}
          <path d="M 360 445 L 210 445 L 210 370" fill="none" stroke="#ff6b35" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="280" y="440" fill="#ff6b35" fontSize="9" textAnchor="middle" fontFamily="monospace">telemetry / logs</text>

          {/* L2 -> L3 */}
          <path d="M 210 300 L 210 220" fill="none" stroke="#39ff7a" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="210" y="265" fill="#39ff7a" fontSize="9" textAnchor="middle" transform="rotate(-90 210 265)" fontFamily="monospace" offset="5">sensed state</text>

          {/* L3 -> L4 */}
          <path d="M 300 185 L 600 185" fill="none" stroke="#c77dff" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="450" y="180" fill="#c77dff" fontSize="9" textAnchor="middle" fontFamily="monospace">deviation flag</text>

          {/* L4 -> L5 */}
          <path d="M 690 220 L 690 300" fill="none" stroke="#ffd166" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="690" y="265" fill="#ffd166" fontSize="9" textAnchor="middle" transform="rotate(90 690 265)" fontFamily="monospace">disposition decision</text>

          {/* L5 -> L1 */}
          <path d="M 690 370 L 690 445 L 540 445" fill="none" stroke="#00c8ff" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="615" y="440" fill="#00c8ff" fontSize="9" textAnchor="middle" fontFamily="monospace">rework / replace</text>

          {/* Second-order Feedback (L6 monitoring comparator and decision) */}
          <path d="M 360 55 L 210 55 L 210 150" fill="none" stroke="#ff4da6" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="280" y="50" fill="#ff4da6" fontSize="9" textAnchor="middle" fontFamily="monospace">retrain / adjust</text>

          <path d="M 540 55 L 690 55 L 690 150" fill="none" stroke="#ff4da6" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="615" y="50" fill="#ff4da6" fontSize="9" textAnchor="middle" fontFamily="monospace">override audits</text>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="bg-amis-panel border border-amis-border rounded p-3">
          <span className="text-amis-l4 font-bold uppercase tracking-widest block mb-2">First-Order Control Loop</span>
          The inner loop regulates physical systems: telemetry moves from **L1 Physical** to **L2 Sensing**, compares against expected profiles in **L3 Comparator**, triggers maintenance instructions in **L4 Decision**, orders parts and clocks hours in **L5 Effector**, which physically rewires or replaces hardware in **L1**, completing the loop.
        </div>
        <div className="bg-amis-panel border border-amis-border rounded p-3">
          <span className="text-amis-l6 font-bold uppercase tracking-widest block mb-2">Second-Order (Meta) Loop</span>
          The outer loop observes the control loops themselves: **L6 Meta Loop** checks for model drift and false positive rates (Sensing Adequacy) and intercepts expert override reports when engineers disagree with AI output. It triggers retraining runs to adjust baseline thresholds dynamically.
        </div>
      </div>
    </div>
  );
}
