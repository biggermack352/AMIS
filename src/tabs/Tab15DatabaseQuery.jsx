import { useState } from 'react';
import { schemaCatalog } from '../data/schemaCatalog';
import { discrepancies, cbmAlerts, reliabilityModels, assetInstances } from '../data/mockData';
import SchemaTable from '../components/ui/SchemaTable';

export default function Tab15DatabaseQuery() {
  const [selectedTable, setSelectedTable] = useState('cbm_predictive_alert');
  const [sqlQuery, setSqlQuery] = useState('SELECT * FROM cbm_predictive_alert WHERE confidence_score >= 0.85;');
  const [queryResult, setQueryResult] = useState(null);

  const handleRunQuery = (e) => {
    e.preventDefault();
    
    // Simple mock query engine
    const queryLower = sqlQuery.toLowerCase();
    let rows = [];
    let cols = [];

    if (queryLower.includes('cbm_predictive_alert')) {
      rows = cbmAlerts;
      cols = [
        { key: 'alert_uuid', label: 'alert_uuid' },
        { key: 'asset_uuid', label: 'asset_uuid' },
        { key: 'predicted_failure_mode_uuid', label: 'predicted_failure_mode_uuid' },
        { key: 'predicted_time_to_failure_hours', label: 'predicted_time_to_failure_hours' },
        { key: 'confidence_score', label: 'confidence_score' },
      ];
    } else if (queryLower.includes('maintenance_discrepancy')) {
      rows = discrepancies;
      cols = [
        { key: 'discrepancy_uuid', label: 'discrepancy_uuid' },
        { key: 'aircraft_asset_uuid', label: 'aircraft_asset_uuid' },
        { key: 'narrative', label: 'narrative' },
        { key: 'severity_level', label: 'severity_level' },
        { key: 'discovered_date', label: 'discovered_date' },
      ];
    } else if (queryLower.includes('reliability_model_parameters')) {
      rows = reliabilityModels;
      cols = [
        { key: 'model_uuid', label: 'model_uuid' },
        { key: 'part_uuid', label: 'part_uuid' },
        { key: 'model_version', label: 'model_version' },
        { key: 'weibull_beta', label: 'weibull_beta' },
        { key: 'weibull_eta', label: 'weibull_eta' },
      ];
    } else {
      // default fallback
      rows = assetInstances;
      cols = [
        { key: 'asset_uuid', label: 'asset_uuid' },
        { key: 'part_uuid', label: 'part_uuid' },
        { key: 'serial_number', label: 'serial_number' },
        { key: 'manufacture_date', label: 'manufacture_date' },
      ];
    }

    setQueryResult({ columns: cols, rows });
  };

  const schemaInfo = schemaCatalog[selectedTable];

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full bg-amis-bg">
      <div>
        <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">Database Catalog Explorer & Query Runner</h1>
        <p className="text-xs text-amis-text-dim mt-1">Layer 1 · Physical · Full relational schema dictionary browser and mock SQL query console</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* TABLE LIST CATALOG */}
        <div className="lg:col-span-1 bg-amis-panel border border-amis-border rounded p-3 space-y-2">
          <div className="text-[10px] uppercase tracking-widest text-amis-text-dim border-b border-amis-border pb-1.5 mb-2">
            Schema Tables catalog
          </div>
          <div className="space-y-1 overflow-y-auto max-h-[420px] pr-1">
            {Object.keys(schemaCatalog).map((tbl) => (
              <button
                key={tbl}
                onClick={() => {
                  setSelectedTable(tbl);
                  setSqlQuery(`SELECT * FROM ${tbl};`);
                  setQueryResult(null);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded font-mono text-xs transition-all flex items-center justify-between ${selectedTable === tbl ? 'bg-amis-l1/10 border border-amis-l1 text-amis-l1' : 'bg-amis-bg/50 border border-amis-border text-amis-text hover:border-amis-text-dim'}`}
              >
                <span>{tbl}</span>
                <span className="text-[9px] text-amis-text-dim">»</span>
              </button>
            ))}
          </div>
        </div>

        {/* SCHEMA FIELD INSPECTOR */}
        <div className="lg:col-span-3 bg-amis-panel border border-amis-border rounded flex flex-col justify-between p-4">
          <div>
            <div className="text-xs font-bold text-amis-text-bright border-b border-amis-border pb-1.5 mb-2 flex justify-between items-center">
              <span className="font-mono text-amis-l1">{selectedTable}</span>
              <span className="text-[10px] text-amis-text-dim uppercase font-normal">Field Inspector</span>
            </div>
            {schemaInfo && (
              <>
                <p className="text-xs text-amis-text leading-relaxed mb-4 italic">
                  💡 {schemaInfo.note}
                </p>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs font-mono">
                    <thead>
                      <tr className="bg-amis-bg border-b border-amis-border">
                        {['field_name', 'data_type', 'key_constraints'].map((h) => (
                          <th key={h} className="px-3 py-1.5 text-[9px] uppercase text-amis-text-dim text-left">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {schemaInfo.fields.map((f) => (
                        <tr key={f.name} className="border-b border-amis-border/30 hover:bg-amis-bg/40">
                          <td className="px-3 py-1.5 text-amis-text-bright font-bold">{f.name}</td>
                          <td className="px-3 py-1.5 text-amis-text">{f.type}</td>
                          <td className="px-3 py-1.5 text-amis-text-dim">
                            {f.pk && <span className="text-amis-l3 font-bold mr-2">PRIMARY KEY</span>}
                            {f.fk && <span className="text-amis-l2 font-bold mr-2">FOREIGN KEY ➔ {f.fk}</span>}
                            {f.unique && <span className="text-amis-l5 mr-2">UNIQUE</span>}
                            {f.notNull && <span className="text-amis-red mr-2">NOT NULL</span>}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* SQL CONSOLE AND QUERY RESULTS */}
      <div className="bg-amis-panel border border-amis-border rounded p-4 space-y-4">
        <div className="text-xs font-bold text-amis-text-bright uppercase tracking-wider">
          Interactive SQL Query Console
        </div>
        <form onSubmit={handleRunQuery} className="space-y-3">
          <textarea
            rows={2}
            value={sqlQuery}
            onChange={(e) => setSqlQuery(e.target.value)}
            className="w-full bg-amis-bg border border-amis-border rounded p-3 font-mono text-xs text-amis-l3 focus:outline-none focus:border-amis-l3"
          />
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-amis-text-dim">
              Try: <code>SELECT * FROM cbm_predictive_alert;</code> or <code>SELECT * FROM maintenance_discrepancy;</code>
            </span>
            <button
              type="submit"
              className="bg-amis-l3 border border-amis-l3 text-amis-bg font-bold px-6 py-2 rounded text-xs hover:bg-amis-l3/80 transition-colors"
            >
              Run Query
            </button>
          </div>
        </form>

        {queryResult && (
          <div className="border border-amis-border rounded overflow-hidden">
            <div className="bg-amis-panel px-3 py-2 border-b border-amis-border flex justify-between text-[10px] text-amis-text-dim font-mono">
              <span>Query Result Set</span>
              <span>Rows count: {queryResult.rows.length}</span>
            </div>
            <SchemaTable columns={queryResult.columns} rows={queryResult.rows} compact />
          </div>
        )}
      </div>
    </div>
  );
}
