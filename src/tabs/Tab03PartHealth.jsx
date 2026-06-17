import { useState } from 'react';
import { useAmis } from '../context/AmisContext';
import {
  getPartInstances, getHealthByAsset, installationHistory,
  fmeaModes, inspectionDue, assetInstances,
} from '../data/mockData';
import MetricCard from '../components/ui/MetricCard';
import SchemaTable from '../components/ui/SchemaTable';
import { RulBar } from '../components/ui/Charts';
import { SeverityBadge } from '../components/ui/StatusBadge';

export default function Tab03PartHealth() {
  const { selectedPartSn, setSelectedPartSn } = useAmis();
  const parts = getPartInstances();
  const part = parts.find((p) => p.serial_number === selectedPartSn) || parts[0];
  const health = part ? getHealthByAsset(part.asset_uuid) : null;
  const insp = part ? inspectionDue[part.asset_uuid] : null;
  const history = installationHistory.filter(
    (h) => h.child_asset_uuid === part?.asset_uuid || h.parent_asset_uuid === part?.asset_uuid
  );
  const [fmeaOpen, setFmeaOpen] = useState(true);

  const installColumns = [
    { key: 'install_uuid', label: 'install_uuid' },
    { key: 'parent_asset_uuid', label: 'parent_asset_uuid' },
    { key: 'child_asset_uuid', label: 'child_asset_uuid' },
    { key: 'install_date', label: 'install_date', render: (v) => v?.slice(0, 10) },
    { key: 'removal_date', label: 'removal_date', render: (v) => v ? v.slice(0, 10) : 'CURRENT' },
  ];

  const fmeaColumns = [
    { key: 'mode_uuid', label: 'mode_uuid' },
    { key: 'failure_mode_description', label: 'failure_mode_description' },
    { key: 'severity_score', label: 'severity_score' },
    { key: 'probability_score', label: 'probability_score' },
    { key: 'calculated_hri', label: 'calculated_hri', render: (v) => (
      <span className={v >= 12 ? 'text-amis-red font-bold' : v >= 8 ? 'text-amis-l5' : 'text-amis-l3'}>{v}</span>
    )},
  ];

  const parentAsset = assetInstances.find((a) => a.asset_uuid === part?.parent_asset_uuid);

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">Part Health — Live Feed</h1>
          <p className="text-xs text-amis-text-dim mt-1">Layer 2 · Serialized component health, RUL, installation, FMEA drill-down</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[10px] uppercase text-amis-text-dim">asset_instance.serial_number</label>
          <select
            value={part?.serial_number}
            onChange={(e) => setSelectedPartSn(e.target.value)}
            className="bg-amis-panel border border-amis-border rounded px-3 py-1.5 text-xs text-amis-l1"
          >
            {parts.map((p) => (
              <option key={p.serial_number} value={p.serial_number}>{p.serial_number}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <MetricCard
          label="current_health_score"
          value={health ? `${(health.current_health_score * 100).toFixed(0)}%` : '—'}
          accent="l3"
        />
        <MetricCard
          label="Installed On"
          value={parentAsset ? `T-${parentAsset.serial_number}` : '—'}
          accent="l1"
        />
        <MetricCard
          label="Next Inspection"
          value={insp ? `${insp.days} days` : '—'}
          accent={insp && insp.days <= 14 ? 'red' : 'l5'}
          delta={insp?.type}
        />
      </div>

      {health && (
        <div className="bg-amis-panel border border-amis-border rounded p-4">
          <RulBar value={health.predicted_remaining_useful_life_hours} max={1000} />
        </div>
      )}

      <SchemaTable tableName="asset_installation_history" columns={installColumns} rows={history} />

      <div className="border border-amis-border rounded overflow-hidden">
        <button
          onClick={() => setFmeaOpen(!fmeaOpen)}
          className="w-full bg-amis-panel px-3 py-2 border-b border-amis-border flex items-center justify-between text-left"
        >
          <span className="text-xs text-amis-text-bright">FMEA Drill-Down — fmea_failure_mode</span>
          <span className="text-amis-text-dim text-xs">{fmeaOpen ? '▼' : '▶'}</span>
        </button>
        {fmeaOpen && (
          <div className="p-2">
            <div className="mb-3 p-3 bg-amis-bg border border-amis-border rounded">
              <div className="text-[10px] uppercase text-amis-text-dim mb-2">HRI Matrix Legend</div>
              <div className="flex gap-4 text-[10px]">
                <span><SeverityBadge severity="Critical" /> HRI ≥ 12</span>
                <span className="text-amis-l5">HRI 8–11</span>
                <span className="text-amis-l3">HRI &lt; 8</span>
              </div>
            </div>
            <SchemaTable columns={fmeaColumns} rows={fmeaModes} compact />
          </div>
        )}
      </div>
    </div>
  );
}
