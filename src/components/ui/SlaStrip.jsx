import { RagBadge } from './StatusBadge';

export default function SlaStrip({ metrics }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      {metrics.map((m) => (
        <div key={m.name} className="bg-amis-panel border border-amis-border rounded p-3 flex items-start gap-2">
          <RagBadge status={m.status} />
          <div className="min-w-0">
            <div className="text-[10px] uppercase tracking-wider text-amis-text-dim truncate">{m.name}</div>
            <div className="text-sm font-bold text-amis-text-bright">{m.value}</div>
            <div className="text-[10px] text-amis-text-dim">Target: {m.target}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
