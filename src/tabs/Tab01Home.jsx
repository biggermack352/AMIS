import { Bot } from 'lucide-react';
import { useAmis } from '../context/AmisContext';
import { fleetAap, discrepancies, slaMetrics, cbmAlerts, metaMetrics } from '../data/mockData';
import AapGauge from '../components/ui/AapGauge';
import MetricCard from '../components/ui/MetricCard';
import SlaStrip from '../components/ui/SlaStrip';
import { SeverityBadge } from '../components/ui/StatusBadge';

export default function Tab01Home() {
  const { openAria } = useAmis();

  const openDisc = discrepancies.filter((d) => d.status !== 'CLOSED');
  const critical = openDisc.filter((d) => d.severity_level === 'Critical').length;
  const major = openDisc.filter((d) => d.severity_level === 'Major').length;
  const minor = openDisc.filter((d) => d.severity_level === 'Minor').length;
  const activeAlerts = cbmAlerts.filter((a) => a.status === 'OPEN').length;

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">AMIS Command Dashboard</h1>
        <p className="text-xs text-amis-text-dim mt-1">Aircraft Availability Probability · Fleet readiness at a glance</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        <div className="lg:col-span-1 flex justify-center bg-amis-panel border border-amis-border rounded p-4">
          <AapGauge value={fleetAap.fleet} target={fleetAap.target} size="lg" title="Fleet AAP" subtitle={`Target ${fleetAap.target}%`} />
        </div>
        <div className="lg:col-span-3 grid grid-cols-3 gap-4">
          {fleetAap.perTail.map((t) => (
            <div key={t.serial_number} className="bg-amis-panel border border-amis-border rounded p-4 flex flex-col items-center">
              <AapGauge value={t.aap} target={fleetAap.target} size="md" title={`T-${t.serial_number}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Critical Discrepancies" value={critical} accent="red" delta={`${openDisc.length} total open`} />
        <MetricCard label="Major Discrepancies" value={major} accent="l2" />
        <MetricCard label="Minor Discrepancies" value={minor} accent="l5" />
        <MetricCard label="CBM+ Active Alerts" value={activeAlerts} accent="l3" delta="cbm_predictive_alert" />
      </div>

      <div>
        <h2 className="text-xs uppercase tracking-widest text-amis-text-dim mb-3">Latency SLA Health</h2>
        <SlaStrip metrics={slaMetrics} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-amis-panel border border-amis-border rounded p-4">
          <h2 className="text-xs uppercase tracking-widest text-amis-text-dim mb-3">Open Discrepancies — maintenance_discrepancy</h2>
          <div className="space-y-2">
            {openDisc.slice(0, 5).map((d) => (
              <div key={d.discrepancy_uuid} className="flex items-start gap-2 text-xs border-b border-amis-border/50 pb-2">
                <SeverityBadge severity={d.severity_level} />
                <div className="min-w-0">
                  <div className="text-amis-text-bright truncate">{d.narrative}</div>
                  <div className="text-amis-text-dim text-[10px]">{d.discrepancy_uuid} · {d.discovered_date.slice(0, 10)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-amis-panel border border-amis-border rounded p-4">
          <h2 className="text-xs uppercase tracking-widest text-amis-text-dim mb-3">ARIA Quick Query</h2>
          <p className="text-xs text-amis-text mb-3">Enterprise-wide maintenance intelligence agent. Context-aware across all modules.</p>
          <button
            onClick={openAria}
            className="flex items-center gap-2 px-4 py-2 bg-amis-l4/20 border border-amis-l4 rounded text-xs text-amis-l4 hover:bg-amis-l4/30 transition-colors"
          >
            <Bot size={14} />
            Open ARIA Chat
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xs uppercase tracking-widest text-amis-text-dim mb-3">Meta-Metrics — AMIS Building AMIS</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {metaMetrics.map((m) => (
            <div key={m.metric_name} className="bg-amis-panel border border-amis-border rounded p-3 text-center">
              <div className="text-[10px] uppercase tracking-wider text-amis-text-dim">{m.metric_name.replace(/_/g, ' ')}</div>
              <div className="text-lg font-bold text-amis-l1 mt-1">
                {typeof m.value === 'number' ? m.value.toLocaleString() : m.value}
                {m.unit && <span className="text-sm">{m.unit}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
