import { useState } from 'react';
import { flightTelemetryTrace } from '../data/mockData';
import { ChartCard } from '../components/ui/Charts';
import MetricCard from '../components/ui/MetricCard';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';

const TOOLTIP_STYLE = {
  contentStyle: { background: '#0b1120', border: '1px solid #1a2a40', fontFamily: 'Courier New', fontSize: 11 },
  labelStyle: { color: '#dceeff' },
};

export default function Tab18Performance() {
  const [activeMetric, setActiveMetric] = useState('vibration');

  const metricLimits = {
    vibration: 0.45,
    temperature: 110,
    speed: 220,
    altitude: 16000
  };

  const metricUnits = {
    vibration: 'IPS',
    temperature: '°C',
    speed: 'KTAS',
    altitude: 'ft'
  };

  const metricColors = {
    vibration: '#ff6b35',
    temperature: '#ffd166',
    speed: '#39ff7a',
    altitude: '#00c8ff'
  };

  const activeLimit = metricLimits[activeMetric];
  const activeUnit = metricUnits[activeMetric];
  const activeColor = metricColors[activeMetric];

  // Calculate stats
  const traceValues = flightTelemetryTrace.map(t => t[activeMetric]);
  const maxValue = Math.max(...traceValues);
  const exceedances = flightTelemetryTrace.filter(t => t[activeMetric] > activeLimit);
  const timeInExceedance = exceedances.length * 5; // each point represents 5 min

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full bg-amis-bg">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amis-border pb-3">
        <div>
          <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">Flight Telemetry Trace & Envelopes</h1>
          <p className="text-xs text-amis-text-dim mt-1">Layer 2 · Sensing · High-frequency flight sensor recordings vs. airworthiness design limits</p>
        </div>

        {/* METRIC SELECTOR */}
        <div className="flex items-center gap-1.5 bg-amis-panel border border-amis-border rounded p-1">
          {['vibration', 'temperature', 'speed', 'altitude'].map((metric) => (
            <button
              key={metric}
              onClick={() => setActiveMetric(metric)}
              className={`px-3 py-1.5 text-xs font-bold uppercase rounded transition-colors ${activeMetric === metric ? 'bg-amis-l2 text-amis-bg' : 'text-amis-text-dim hover:text-amis-text'}`}
            >
              {metric}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="flight_uuid Reference" value="fl-042" accent="l1" />
        <MetricCard label={`Peak Observed ${activeMetric}`} value={`${maxValue} ${activeUnit}`} accent={maxValue > activeLimit ? 'red' : 'l3'} />
        <MetricCard label="Envelope Safety Limit" value={`${activeLimit} ${activeUnit}`} accent="l5" />
        <MetricCard label="Duration In Exceedance" value={`${timeInExceedance} mins`} accent={timeInExceedance > 0 ? 'red' : 'l3'} />
      </div>

      {/* TELEMETRY CHART */}
      <ChartCard title={`Flight Telemetry Trace — ${activeMetric.toUpperCase()} vs. Safety Envelope`} tableName="condition_indicator_log (telemetry stream)">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={flightTelemetryTrace}>
            <CartesianGrid stroke="#1a2a40" strokeDasharray="3 3" />
            <XAxis dataKey="t" tick={{ fill: '#3a5570', fontSize: 10 }} label={{ value: 'Flight Time (minutes)', position: 'insideBottom', offset: -2, fill: '#3a5570', fontSize: 10 }} />
            <YAxis tick={{ fill: '#3a5570', fontSize: 10 }} />
            <Tooltip {...TOOLTIP_STYLE} />
            <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'Courier New' }} />
            <Line type="monotone" dataKey={activeMetric} stroke={activeColor} strokeWidth={2.5} name={`Observed ${activeMetric} (${activeUnit})`} />
            <ReferenceLine y={activeLimit} stroke="#ff3a3a" strokeDasharray="5 5" label={{ value: 'Safety Envelope Limit', fill: '#ff3a3a', fontSize: 9, position: 'top' }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
        <div className="bg-amis-panel border border-amis-border rounded p-4 space-y-2">
          <span className="text-amis-l2 font-bold uppercase tracking-widest block">Telemetry Event Logger</span>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between"><span className="text-amis-text-dim">flight_date:</span><span className="text-amis-text-bright">2026-06-15</span></div>
            <div className="flex justify-between"><span className="text-amis-text-dim">aircraft_asset_uuid:</span><span className="text-amis-text-bright">a1-168042 (T-168042)</span></div>
            <div className="flex justify-between"><span className="text-amis-text-dim">flight_hours_logged:</span><span className="text-amis-text-bright">2.4 hours</span></div>
            <div className="flex justify-between"><span className="text-amis-text-dim">landings_logged:</span><span className="text-amis-text-bright">4 full stops</span></div>
          </div>
        </div>
        <div className="bg-amis-panel border border-amis-border rounded p-4 space-y-2">
          <span className="text-amis-l6 font-bold uppercase tracking-widest block">UAS Contingency Event Logging</span>
          <p className="text-xs text-amis-text leading-relaxed">
            {timeInExceedance > 0 ? (
              <span className="text-amis-red font-bold">
                ⚠️ WARNING: Exceedance detected in telemetry trace. A uas_contingency_event has been created in the database and linked to flight_uuid fl-042 and operating_limit record limit-042.
              </span>
            ) : (
              <span className="text-amis-l3 font-bold">
                ✓ Nominal flight. No envelope limits exceeded. No emergency recovery actions initiated.
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
