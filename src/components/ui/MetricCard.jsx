export default function MetricCard({ label, value, delta, deltaColor = 'normal', accent = 'l1' }) {
  const accents = {
    l1: 'text-amis-l1',
    l2: 'text-amis-l2',
    l3: 'text-amis-l3',
    l4: 'text-amis-l4',
    l5: 'text-amis-l5',
    l6: 'text-amis-l6',
    red: 'text-amis-red',
  };

  return (
    <div className="bg-amis-panel border border-amis-border rounded p-4">
      <div className="text-[10px] uppercase tracking-widest text-amis-text-dim mb-2">{label}</div>
      <div className={`text-2xl font-bold ${accents[accent] || accents.l1}`}>{value}</div>
      {delta !== undefined && (
        <div className={`text-xs mt-1 ${deltaColor === 'inverse' ? 'text-amis-red' : 'text-amis-l3'}`}>
          {delta}
        </div>
      )}
    </div>
  );
}
