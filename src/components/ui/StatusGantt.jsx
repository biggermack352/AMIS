import StatusBadge from './StatusBadge';

const STATUS_COLORS = {
  FMC: '#39ff7a',
  PMC: '#ffd166',
  NMC: '#ff3a3a',
  AWP: '#ff6b35',
};

export default function StatusGantt({ segments, title }) {
  if (!segments?.length) return null;

  const startMs = Math.min(...segments.map((s) => new Date(s.effective_date).getTime()));
  const endMs = Math.max(
    ...segments.map((s) => (s.end_date ? new Date(s.end_date).getTime() : Date.now()))
  );
  const range = endMs - startMs || 1;

  return (
    <div className="border border-amis-border rounded overflow-hidden">
      {title && (
        <div className="bg-amis-panel px-3 py-2 border-b border-amis-border">
          <span className="text-xs text-amis-text-bright">{title}</span>
          <span className="text-[10px] text-amis-text-dim ml-2">asset_status_log</span>
        </div>
      )}
      <div className="p-4 bg-amis-bg">
        <div className="relative h-10 bg-amis-panel rounded border border-amis-border overflow-hidden">
          {segments.map((seg) => {
            const left = ((new Date(seg.effective_date).getTime() - startMs) / range) * 100;
            const end = seg.end_date ? new Date(seg.end_date).getTime() : Date.now();
            const width = ((end - new Date(seg.effective_date).getTime()) / range) * 100;
            const display = seg.display || seg.status_code;
            const color = STATUS_COLORS[display] || '#a8c0d8';
            return (
              <div
                key={seg.log_uuid}
                className="absolute top-1 bottom-1 rounded-sm opacity-90 hover:opacity-100 transition-opacity cursor-default"
                style={{ left: `${left}%`, width: `${Math.max(width, 0.5)}%`, backgroundColor: color }}
                title={`${display} · ${seg.duration_hours}h · ${seg.status_code}`}
              />
            );
          })}
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          {['FMC', 'PMC', 'NMC', 'AWP'].map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <span className="w-3 h-2 rounded-sm" style={{ backgroundColor: STATUS_COLORS[s] }} />
              <span className="text-[10px] text-amis-text-dim">{s}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-amis-text-dim mt-2 italic">
          DBML mapping: flyable→FMC · nf→NMC · AWP→AWP · PMC shown where partial capability applies
        </p>
      </div>
    </div>
  );
}
