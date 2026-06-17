import { useState } from 'react';

const dbmlSnippet = `// ==========================================
// AMIS Unified Schema (Core Loop Slice)
// ==========================================

Table part_catalog {
  part_uuid varchar [primary key]
  part_number varchar [not null]
  dash_number varchar [not null]
  part_name varchar [not null]
  system_category varchar // e.g. Propulsion, Avionics
  nha_part_uuid varchar   // Link to Parent Part Catalog
  is_life_limited bool
  stock_number varchar [unique]
  unit_cost float
}

Ref: part_catalog.nha_part_uuid > part_catalog.part_uuid

Table asset_instance {
  asset_uuid varchar [primary key]
  part_uuid varchar [ref: > part_catalog.part_uuid]
  serial_number varchar [unique, not null] // Tail number / S/N
  manufacture_date date
  parent_asset_uuid varchar [ref: > asset_instance.asset_uuid]
  offset_hours_or_landings float
}

Table asset_installation_history {
  install_uuid varchar [primary key]
  parent_asset_uuid varchar [ref: > asset_instance.asset_uuid]
  child_asset_uuid varchar [ref: > asset_instance.asset_uuid]
  install_date timestamptz [not null]
  removal_date timestamptz
}

Table asset_status_log {
  log_uuid varchar [primary key]
  asset_uuid varchar [ref: > asset_instance.asset_uuid]
  status_code varchar // flyable, nf, AWP
  effective_date timestamptz
  end_date timestamptz
  duration_hours float
  driving_discrepancy_uuid varchar [ref: > maintenance_discrepancy.discrepancy_uuid]
}

Table maintenance_discrepancy {
  discrepancy_uuid varchar [primary key]
  aircraft_asset_uuid varchar [ref: > asset_instance.asset_uuid]
  suspected_asset_uuid varchar [ref: > asset_instance.asset_uuid]
  discovered_date timestamptz [not null]
  narrative text
  severity_level varchar // Critical, Major, Minor
  related_faults varchar [ref: > triggered_fault_log.event_uuid]
}

Table maintenance_action {
  action_uuid varchar [primary key]
  discrepancy_uuid varchar [ref: > maintenance_discrepancy.discrepancy_uuid]
  asset_removed_uuid varchar [ref: > asset_instance.asset_uuid]
  asset_installed_uuid varchar [ref: > asset_instance.asset_uuid]
  completed_date timestamptz
  corrective_action_text text
  performed_by_uuid varchar [ref: > maintainer.maintainer_uuid]
  inspected_by_uuid varchar [ref: > maintainer.maintainer_uuid]
}

Table cbm_predictive_alert {
  alert_uuid varchar [primary key]
  asset_uuid varchar [ref: > asset_instance.asset_uuid]
  alert_timestamp timestamptz
  predicted_failure_mode_uuid varchar [ref: > fmea_failure_mode.mode_uuid]
  predicted_time_to_failure_hours float
  confidence_score float
  resulting_discrepancy_uuid varchar [ref: > maintenance_discrepancy.discrepancy_uuid]
}`;

export default function Tab16DatabaseSchema() {
  const [activeView, setActiveView] = useState('diagram');
  const [highlightedTable, setHighlightedTable] = useState(null);

  const handleTableHover = (tableName) => {
    setHighlightedTable(tableName);
  };

  // Helper to determine line coloring
  const getLineColor = (fromTable, toTable) => {
    if (!highlightedTable) return '#1a2a40';
    if (highlightedTable === fromTable || highlightedTable === toTable) return '#00c8ff';
    return '#1a2a40/30';
  };

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full bg-amis-bg">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amis-border pb-3">
        <div>
          <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">Database Relational Schema</h1>
          <p className="text-xs text-amis-text-dim mt-1">Layer 1 · Physical · Relational ERD mapping, primary-foreign key lineages, and DBML structural declarations</p>
        </div>

        {/* VIEW SELECTOR */}
        <div className="flex items-center gap-1.5 bg-amis-panel border border-amis-border rounded p-1">
          <button
            onClick={() => setActiveView('diagram')}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded transition-colors ${activeView === 'diagram' ? 'bg-amis-l1 text-amis-bg' : 'text-amis-text-dim hover:text-amis-text'}`}
          >
            Interactive ERD Map
          </button>
          <button
            onClick={() => setActiveView('dbml')}
            className={`px-3 py-1.5 text-xs font-bold uppercase rounded transition-colors ${activeView === 'dbml' ? 'bg-amis-l1 text-amis-bg' : 'text-amis-text-dim hover:text-amis-text'}`}
          >
            DBML Declaration
          </button>
        </div>
      </div>

      {activeView === 'diagram' ? (
        <div className="space-y-4">
          <div className="p-4 border border-amis-l1/40 bg-amis-l1/5 rounded text-xs text-amis-text leading-relaxed">
            <span className="text-amis-l1 font-bold uppercase tracking-wider block mb-1">INTERACTIVE ER DIAGRAM INSTRUCTION</span>
            This ERD maps the core aviation maintenance loop from `Amis_public.dbml`. 
            **Hover over any table box** to highlight its direct primary-foreign key relationships and see how entities link.
          </div>

          <div className="bg-amis-panel border border-amis-border rounded p-6 flex flex-col items-center justify-center min-h-[500px]">
            <svg viewBox="0 0 950 500" className="w-full max-w-[850px] h-auto font-mono">
              <defs>
                <marker id="dot" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                  <circle cx="5" cy="5" r="3" fill="#5a7a9a" />
                </marker>
                <marker id="dot-active" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6">
                  <circle cx="5" cy="5" r="3" fill="#00c8ff" />
                </marker>
              </defs>

              {/* FOREIGN KEY LINES */}
              {/* part_catalog -> asset_instance */}
              <path d="M 210 120 L 350 120" fill="none" stroke={getLineColor('part_catalog', 'asset_instance')} strokeWidth="1.5" markerStart="url(#dot)" />
              
              {/* asset_instance -> asset_status_log */}
              <path d="M 430 150 L 430 240" fill="none" stroke={getLineColor('asset_instance', 'asset_status_log')} strokeWidth="1.5" markerStart="url(#dot)" />
              
              {/* asset_instance -> asset_installation_history */}
              <path d="M 510 120 L 650 120" fill="none" stroke={getLineColor('asset_instance', 'asset_installation_history')} strokeWidth="1.5" markerStart="url(#dot)" />

              {/* asset_instance -> maintenance_discrepancy */}
              <path d="M 430 80 L 430 30 L 760 30 L 760 80" fill="none" stroke={getLineColor('asset_instance', 'maintenance_discrepancy')} strokeWidth="1.5" />

              {/* maintenance_discrepancy -> asset_status_log */}
              <path d="M 760 210 L 760 275 L 510 275" fill="none" stroke={getLineColor('maintenance_discrepancy', 'asset_status_log')} strokeWidth="1.5" markerStart="url(#dot)" />

              {/* maintenance_discrepancy -> maintenance_action */}
              <path d="M 760 210 L 760 360" fill="none" stroke={getLineColor('maintenance_discrepancy', 'maintenance_action')} strokeWidth="1.5" markerStart="url(#dot)" />

              {/* asset_instance -> cbm_predictive_alert */}
              <path d="M 350 140 L 150 140 L 150 360" fill="none" stroke={getLineColor('asset_instance', 'cbm_predictive_alert')} strokeWidth="1.5" />

              {/* TABLE CARDS */}
              {/* part_catalog */}
              <g onMouseEnter={() => handleTableHover('part_catalog')} onMouseLeave={() => handleTableHover(null)} className="cursor-pointer">
                <rect x="50" y="80" width="160" height="90" rx="3" fill="#0b1120" stroke={highlightedTable === 'part_catalog' ? '#00c8ff' : '#1a2a40'} strokeWidth="1.5" />
                <rect x="50" y="80" width="160" height="24" rx="2" fill="#0d1f35" />
                <text x="60" y="96" fill="#00c8ff" fontSize="10" fontWeight="bold">part_catalog</text>
                <text x="60" y="122" fill="#dceeff" fontSize="9">🔑 part_uuid [PK]</text>
                <text x="60" y="138" fill="#a8c0d8" fontSize="9">part_number</text>
                <text x="60" y="154" fill="#a8c0d8" fontSize="9">dash_number</text>
              </g>

              {/* asset_instance */}
              <g onMouseEnter={() => handleTableHover('asset_instance')} onMouseLeave={() => handleTableHover(null)} className="cursor-pointer">
                <rect x="350" y="80" width="160" height="110" rx="3" fill="#0b1120" stroke={highlightedTable === 'asset_instance' ? '#00c8ff' : '#1a2a40'} strokeWidth="1.5" />
                <rect x="350" y="80" width="160" height="24" rx="2" fill="#0d1f35" />
                <text x="360" y="96" fill="#00c8ff" fontSize="10" fontWeight="bold">asset_instance</text>
                <text x="360" y="122" fill="#dceeff" fontSize="9">🔑 asset_uuid [PK]</text>
                <text x="360" y="138" fill="#ff6b35" fontSize="9">🔗 part_uuid [FK]</text>
                <text x="360" y="154" fill="#a8c0d8" fontSize="9">serial_number</text>
                <text x="360" y="170" fill="#ff6b35" fontSize="9">🔗 parent_asset_uuid</text>
              </g>

              {/* asset_installation_history */}
              <g onMouseEnter={() => handleTableHover('asset_installation_history')} onMouseLeave={() => handleTableHover(null)} className="cursor-pointer">
                <rect x="650" y="80" width="220" height="110" rx="3" fill="#0b1120" stroke={highlightedTable === 'asset_installation_history' ? '#00c8ff' : '#1a2a40'} strokeWidth="1.5" />
                <rect x="650" y="80" width="220" height="24" rx="2" fill="#0d1f35" />
                <text x="660" y="96" fill="#00c8ff" fontSize="10" fontWeight="bold">asset_installation_history</text>
                <text x="660" y="122" fill="#dceeff" fontSize="9">🔑 install_uuid [PK]</text>
                <text x="660" y="138" fill="#ff6b35" fontSize="9">🔗 parent_asset_uuid [FK]</text>
                <text x="660" y="154" fill="#ff6b35" fontSize="9">🔗 child_asset_uuid [FK]</text>
                <text x="660" y="170" fill="#a8c0d8" fontSize="9">install_date</text>
              </g>

              {/* asset_status_log */}
              <g onMouseEnter={() => handleTableHover('asset_status_log')} onMouseLeave={() => handleTableHover(null)} className="cursor-pointer">
                <rect x="350" y="240" width="160" height="110" rx="3" fill="#0b1120" stroke={highlightedTable === 'asset_status_log' ? '#00c8ff' : '#1a2a40'} strokeWidth="1.5" />
                <rect x="350" y="240" width="160" height="24" rx="2" fill="#0d1f35" />
                <text x="360" y="256" fill="#00c8ff" fontSize="10" fontWeight="bold">asset_status_log</text>
                <text x="360" y="282" fill="#dceeff" fontSize="9">🔑 log_uuid [PK]</text>
                <text x="360" y="298" fill="#ff6b35" fontSize="9">🔗 asset_uuid [FK]</text>
                <text x="360" y="314" fill="#a8c0d8" fontSize="9">status_code</text>
                <text x="360" y="330" fill="#ff6b35" fontSize="9">🔗 driving_disc_uuid</text>
              </g>

              {/* maintenance_discrepancy */}
              <g onMouseEnter={() => handleTableHover('maintenance_discrepancy')} onMouseLeave={() => handleTableHover(null)} className="cursor-pointer">
                <rect x="670" y="240" width="200" height="110" rx="3" fill="#0b1120" stroke={highlightedTable === 'maintenance_discrepancy' ? '#00c8ff' : '#1a2a40'} strokeWidth="1.5" />
                <rect x="670" y="240" width="200" height="24" rx="2" fill="#0d1f35" />
                <text x="680" y="256" fill="#00c8ff" fontSize="10" fontWeight="bold">maintenance_discrepancy</text>
                <text x="680" y="282" fill="#dceeff" fontSize="9">🔑 discrepancy_uuid [PK]</text>
                <text x="680" y="298" fill="#ff6b35" fontSize="9">🔗 aircraft_asset_uuid [FK]</text>
                <text x="680" y="314" fill="#a8c0d8" fontSize="9">severity_level</text>
                <text x="680" y="330" fill="#a8c0d8" fontSize="9">discovered_date</text>
              </g>

              {/* maintenance_action */}
              <g onMouseEnter={() => handleTableHover('maintenance_action')} onMouseLeave={() => handleTableHover(null)} className="cursor-pointer">
                <rect x="670" y="380" width="200" height="110" rx="3" fill="#0b1120" stroke={highlightedTable === 'maintenance_action' ? '#00c8ff' : '#1a2a40'} strokeWidth="1.5" />
                <rect x="670" y="380" width="200" height="24" rx="2" fill="#0d1f35" />
                <text x="680" y="396" fill="#00c8ff" fontSize="10" fontWeight="bold">maintenance_action</text>
                <text x="680" y="422" fill="#dceeff" fontSize="9">🔑 action_uuid [PK]</text>
                <text x="680" y="438" fill="#ff6b35" fontSize="9">🔗 discrepancy_uuid [FK]</text>
                <text x="680" y="454" fill="#ff6b35" fontSize="9">🔗 asset_removed_uuid [FK]</text>
                <text x="680" y="470" fill="#ff6b35" fontSize="9">🔗 asset_installed_uuid [FK]</text>
              </g>

              {/* cbm_predictive_alert */}
              <g onMouseEnter={() => handleTableHover('cbm_predictive_alert')} onMouseLeave={() => handleTableHover(null)} className="cursor-pointer">
                <rect x="50" y="360" width="200" height="110" rx="3" fill="#0b1120" stroke={highlightedTable === 'cbm_predictive_alert' ? '#00c8ff' : '#1a2a40'} strokeWidth="1.5" />
                <rect x="50" y="360" width="200" height="24" rx="2" fill="#0d1f35" />
                <text x="60" y="376" fill="#00c8ff" fontSize="10" fontWeight="bold">cbm_predictive_alert</text>
                <text x="60" y="402" fill="#dceeff" fontSize="9">🔑 alert_uuid [PK]</text>
                <text x="60" y="418" fill="#ff6b35" fontSize="9">🔗 asset_uuid [FK]</text>
                <text x="60" y="434" fill="#a8c0d8" fontSize="9">predicted_time_to_failure</text>
                <text x="60" y="450" fill="#a8c0d8" fontSize="9">confidence_score</text>
              </g>
            </svg>
          </div>
        </div>
      ) : (
        <div className="bg-amis-panel border border-amis-border rounded overflow-hidden flex flex-col">
          <div className="px-3 py-2 border-b border-amis-border flex justify-between items-center bg-amis-panel/75">
            <span className="text-xs text-amis-text-bright font-mono">Amis_public.dbml</span>
            <span className="text-[10px] text-amis-l1 uppercase">Schema Definition (DBML Format)</span>
          </div>
          <pre className="p-4 bg-amis-bg/60 font-mono text-xs text-amis-text-bright leading-relaxed overflow-x-auto select-all whitespace-pre max-h-[500px]">
            {dbmlSnippet}
          </pre>
        </div>
      )}
    </div>
  );
}
