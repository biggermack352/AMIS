import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const TOOLTIP_STYLE = {
  contentStyle: { background: '#0b1120', border: '1px solid #1a2a40', fontFamily: 'Courier New', fontSize: 11 },
  labelStyle: { color: '#dceeff' },
};

export function ChartCard({ title, tableName, children, className = '' }) {
  return (
    <div className={`border border-amis-border rounded overflow-hidden ${className}`}>
      {(title || tableName) && (
        <div className="bg-amis-panel px-3 py-2 border-b border-amis-border flex items-center gap-2">
          {title && <span className="text-xs text-amis-text-bright">{title}</span>}
          {tableName && <span className="text-[10px] text-amis-l1">{tableName}</span>}
        </div>
      )}
      <div className="p-3 bg-amis-bg">{children}</div>
    </div>
  );
}

export function RulTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data}>
        <CartesianGrid stroke="#1a2a40" strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fill: '#3a5570', fontSize: 10 }} />
        <YAxis tick={{ fill: '#3a5570', fontSize: 10 }} label={{ value: 'RUL (hrs)', angle: -90, position: 'insideLeft', fill: '#3a5570', fontSize: 10 }} />
        <Tooltip {...TOOLTIP_STYLE} />
        <Line type="monotone" dataKey="engine" stroke="#00c8ff" strokeWidth={2} dot={false} name="Engine" />
        <Line type="monotone" dataKey="gearbox" stroke="#ff6b35" strokeWidth={2} dot={false} name="Gearbox" />
        <Line type="monotone" dataKey="actuator" stroke="#c77dff" strokeWidth={2} dot={false} name="Actuator" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function WeibullChart({ data, beta, eta }) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart data={data}>
        <CartesianGrid stroke="#1a2a40" strokeDasharray="3 3" />
        <XAxis dataKey="t" tick={{ fill: '#3a5570', fontSize: 10 }} label={{ value: 'Time (hrs)', position: 'insideBottom', offset: -2, fill: '#3a5570', fontSize: 10 }} />
        <YAxis tick={{ fill: '#3a5570', fontSize: 10 }} />
        <Tooltip {...TOOLTIP_STYLE} />
        <Area type="monotone" dataKey="pdf" stroke="#39ff7a" fill="#39ff7a20" strokeWidth={2} name={`PDF (β=${beta}, η=${eta})`} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function AlertLatencyChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data}>
        <CartesianGrid stroke="#1a2a40" strokeDasharray="3 3" />
        <XAxis dataKey="alert" tick={{ fill: '#3a5570', fontSize: 10 }} />
        <YAxis tick={{ fill: '#3a5570', fontSize: 10 }} label={{ value: 'Hours', angle: -90, position: 'insideLeft', fill: '#3a5570', fontSize: 10 }} />
        <Tooltip {...TOOLTIP_STYLE} />
        <Bar dataKey="hours" fill="#ffd166" radius={[2, 2, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SensorSparkline({ data, anomalyKey = 'is_anomaly' }) {
  return (
    <ResponsiveContainer width="100%" height={120}>
      <LineChart data={data}>
        <CartesianGrid stroke="#1a2a40" strokeDasharray="3 3" />
        <XAxis dataKey="time" tick={{ fill: '#3a5570', fontSize: 9 }} hide />
        <YAxis tick={{ fill: '#3a5570', fontSize: 10 }} />
        <Tooltip {...TOOLTIP_STYLE} />
        <Line type="monotone" dataKey="value" stroke="#ff6b35" strokeWidth={2} dot={(props) => {
          const { cx, cy, payload } = props;
          if (payload[anomalyKey]) return <circle cx={cx} cy={cy} r={4} fill="#ff3a3a" stroke="#ff3a3a" key={cx} />;
          return null;
        }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function AccuracyDonut({ stats }) {
  const data = [
    { name: 'True Positive', value: stats.truePositive, color: '#39ff7a' },
    { name: 'False Positive', value: stats.falsePositive, color: '#ffd166' },
    { name: 'False Negative', value: stats.falseNegative, color: '#ff3a3a' },
  ];
  const total = data.reduce((s, d) => s + d.value, 0);
  const tpRate = ((stats.truePositive / (stats.truePositive + stats.falsePositive)) * 100).toFixed(1);
  const fpRate = ((stats.falsePositive / (stats.truePositive + stats.falsePositive)) * 100).toFixed(1);

  return (
    <div className="flex items-center gap-4">
      <ResponsiveContainer width={140} height={140}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={40} outerRadius={60} dataKey="value" stroke="none">
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip {...TOOLTIP_STYLE} />
        </PieChart>
      </ResponsiveContainer>
      <div className="space-y-2 text-xs">
        <div><span className="text-amis-l3 font-bold">{tpRate}%</span> <span className="text-amis-text-dim">True Positive Rate</span></div>
        <div><span className="text-amis-l5 font-bold">{fpRate}%</span> <span className="text-amis-text-dim">False Positive Rate</span></div>
        <div><span className="text-amis-text-dim">Total classified: {total}</span></div>
      </div>
    </div>
  );
}

export function RulBar({ value, max = 1000 }) {
  const pct = Math.min(100, (value / max) * 100);
  const color = pct > 50 ? '#39ff7a' : pct > 20 ? '#ffd166' : '#ff3a3a';
  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] text-amis-text-dim mb-1">
        <span>predicted_remaining_useful_life_hours</span>
        <span className="text-amis-text-bright font-bold">{value.toFixed(1)} hrs</span>
      </div>
      <div className="h-3 bg-amis-panel border border-amis-border rounded overflow-hidden">
        <div className="h-full rounded transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
    </div>
  );
}
