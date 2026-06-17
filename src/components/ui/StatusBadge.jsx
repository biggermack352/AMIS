const STATUS_COLORS = {
  FMC: '#39ff7a',
  PMC: '#ffd166',
  NMC: '#ff3a3a',
  AWP: '#ff6b35',
  flyable: '#39ff7a',
  nf: '#ff3a3a',
};

export default function StatusBadge({ status }) {
  const display = status === 'flyable' ? 'FMC' : status === 'nf' ? 'NMC' : status;
  const color = STATUS_COLORS[display] || STATUS_COLORS[status] || '#a8c0d8';
  return (
    <span
      className="inline-block px-2 py-0.5 text-[10px] font-bold rounded border"
      style={{ color, borderColor: color, backgroundColor: `${color}15` }}
    >
      {display}
    </span>
  );
}

export function SeverityBadge({ severity }) {
  const colors = { Critical: '#ff3a3a', Major: '#ff6b35', Minor: '#ffd166' };
  const c = colors[severity] || '#a8c0d8';
  return (
    <span className="inline-block px-2 py-0.5 text-[10px] font-bold rounded" style={{ color: c, backgroundColor: `${c}20` }}>
      {severity}
    </span>
  );
}

export function RagBadge({ status }) {
  const colors = { GREEN: '#39ff7a', YELLOW: '#ffd166', RED: '#ff3a3a' };
  const c = colors[status] || '#a8c0d8';
  return (
    <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: c }} title={status} />
  );
}
