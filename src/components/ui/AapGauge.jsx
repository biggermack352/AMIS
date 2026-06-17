export default function AapGauge({ value, target = 90, size = 'md', title, subtitle }) {
  const pct = Math.min(100, Math.max(0, value));
  const r = size === 'lg' ? 70 : size === 'sm' ? 28 : 45;
  const stroke = size === 'lg' ? 10 : size === 'sm' ? 4 : 7;
  const cx = r + stroke;
  const cy = r + stroke;
  const circ = 2 * Math.PI * r;
  const arc = circ * 0.75;
  const offset = arc - (arc * pct) / 100;
  const color = pct >= target ? '#39ff7a' : pct >= target - 5 ? '#ffd166' : '#ff3a3a';
  const dim = (r + stroke) * 2;

  return (
    <div className="flex flex-col items-center">
      {title && (
        <span className="text-[10px] uppercase tracking-widest text-amis-text-dim mb-1">{title}</span>
      )}
      <svg width={dim} height={dim * 0.85} viewBox={`0 0 ${dim} ${dim * 0.85}`}>
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#1a2a40"
          strokeWidth={stroke}
          strokeDasharray={`${arc} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
        />
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeDasharray={`${arc - offset} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(135 ${cx} ${cy})`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fill="#dceeff"
          fontSize={size === 'lg' ? 22 : size === 'sm' ? 11 : 16}
          fontFamily="Courier New, monospace"
          fontWeight="bold"
        >
          {pct.toFixed(1)}%
        </text>
        {size !== 'sm' && (
          <text x={cx} y={cy + 14} textAnchor="middle" fill="#3a5570" fontSize={9} fontFamily="Courier New">
            AAP
          </text>
        )}
      </svg>
      {subtitle && (
        <span className="text-[10px] text-amis-text-dim mt-0.5">{subtitle}</span>
      )}
    </div>
  );
}
