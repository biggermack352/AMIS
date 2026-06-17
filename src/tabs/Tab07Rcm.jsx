import { useState, useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Legend } from 'recharts';
import { fmeaModes, reliabilityModels, generateWeibullCurve } from '../data/mockData';
import SchemaTable from '../components/ui/SchemaTable';
import MetricCard from '../components/ui/MetricCard';
import { ChartCard } from '../components/ui/Charts';

const TOOLTIP_STYLE = {
  contentStyle: { background: '#0b1120', border: '1px solid #1a2a40', fontFamily: 'Courier New', fontSize: 11 },
  labelStyle: { color: '#dceeff' },
};

const fleetReliabilityTrend = [
  { chapter: 'ATA 72 (Propulsion)', reliability: 0.94, limit: 0.95 },
  { chapter: 'ATA 29 (Hydraulics)', reliability: 0.91, limit: 0.92 },
  { chapter: 'ATA 53 (Structure)', reliability: 0.98, limit: 0.95 },
  { chapter: 'ATA 24 (Electrical)', reliability: 0.89, limit: 0.90 },
  { chapter: 'ATA 32 (Landing Gear)', reliability: 0.95, limit: 0.95 },
];

export default function Tab07Rcm() {
  const [beta, setBeta] = useState(2.8);
  const [eta, setEta] = useState(4200);

  const dynamicWeibullData = useMemo(() => {
    return generateWeibullCurve(beta, eta, 60);
  }, [beta, eta]);

  const rcmRecommendation = useMemo(() => {
    if (beta > 1.0) {
      if (beta > 2.5) {
        return `WEIBULL EXPLAINER: Shape parameter β = ${beta} indicates RAPID WEAR-OUT behavior. The probability of failure increases sharply with age. 
RECOMMENDED DECISION: Implement age-based scheduled replacement at approximately ${Math.round(eta * 0.75)} hours (approx. 75% of characteristic life η). Run-to-failure is strictly counter-indicated.`;
      } else {
        return `WEIBULL EXPLAINER: Shape parameter β = ${beta} indicates MODERATE WEAR-OUT behavior. The probability of failure increases with age.
RECOMMENDED DECISION: Implement scheduled inspection intervals (e.g. borescope or NDI check) every ${Math.round(eta * 0.4)} hours to detect early failure signatures before functional fault.`;
      }
    } else if (Math.abs(beta - 1.0) < 0.1) {
      return `WEIBULL EXPLAINER: Shape parameter β = ${beta} indicates RANDOM (NORMAL) behavior. Failure rate is constant over time, typical of electronic components.
RECOMMENDED DECISION: Age-based replacement is ineffective. Implement continuous condition indicators monitoring (HUMS) or run-to-failure with hot-spare logistics support.`;
    } else {
      return `WEIBULL EXPLAINER: Shape parameter β = ${beta} indicates INFANT MORTALITY behavior. The probability of failure decreases over time, typical of manufacturing or maintenance defects.
RECOMMENDED DECISION: Implement pre-installation stress screening (burn-in testing) and review maintenance QA procedures. Age-based replacement will worsen reliability.`;
    }
  }, [beta, eta]);

  const fmeaColumns = [
    { key: 'mode_uuid', label: 'mode_uuid' },
    { key: 'failure_mode_description', label: 'failure_mode_description' },
    { key: 'severity_score', label: 'severity_score' },
    { key: 'probability_score', label: 'probability_score' },
    { key: 'calculated_hri', label: 'calculated_hri', render: (v) => (
      <span className={`px-2 py-0.5 rounded font-bold ${v >= 12 ? 'text-amis-red bg-amis-red/10' : v >= 8 ? 'text-amis-l5 bg-amis-l5/10' : 'text-amis-l3 bg-amis-l3/10'}`}>
        {v}
      </span>
    )},
  ];

  const modelColumns = [
    { key: 'model_uuid', label: 'model_uuid' },
    { key: 'model_version', label: 'model_version' },
    { key: 'part_uuid', label: 'part_uuid' },
    { key: 'weibull_beta', label: 'weibull_beta', render: (v) => <span className="text-amis-l3 font-bold">{v}</span> },
    { key: 'weibull_eta', label: 'weibull_eta', render: (v) => <span className="text-amis-l3 font-bold">{v}</span> },
    { key: 'calculated_mtbf_hours', label: 'calculated_mtbf_hours', render: (v) => <span className="text-amis-l1">{v}</span> },
    { key: 'data_points_used', label: 'data_points_used' },
  ];

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">Reliability Centered Maintenance (RCM)</h1>
        <p className="text-xs text-amis-text-dim mt-1">Layer 3 · Comparator · Weibull parameter tuning, FMEA risk assessments, model history</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Weibull Beta (Active)" value={beta} accent="l3" />
        <MetricCard label="Weibull Eta (Active)" value={`${eta}h`} accent="l1" />
        <MetricCard label="FMEA Baseline Docs" value="3 active" accent="l5" />
        <MetricCard label="Avg Fleet HRI" value="9.75" accent="l4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* WEIBULL TUNER */}
        <div className="border border-amis-border rounded overflow-hidden flex flex-col bg-amis-panel">
          <div className="px-3 py-2 border-b border-amis-border flex justify-between items-center">
            <span className="text-xs text-amis-text-bright">Dynamic Weibull Parameter Tuner</span>
            <span className="text-[10px] text-amis-l1">reliability_model_parameters</span>
          </div>
          <div className="p-4 flex-1 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-amis-text-dim">weibull_beta (Shape β)</span>
                <span className="text-amis-l3 font-bold">{beta}</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="5.0"
                step="0.1"
                value={beta}
                onChange={(e) => setBeta(parseFloat(e.target.value))}
                className="w-full accent-amis-l3"
              />
              <div className="flex justify-between text-[9px] text-amis-text-dim font-mono">
                <span>0.5 (Infant Mortality)</span>
                <span>1.0 (Random)</span>
                <span>5.0 (Wear-out)</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-amis-text-dim">weibull_eta (Characteristic Life η)</span>
                <span className="text-amis-l1 font-bold">{eta} hrs</span>
              </div>
              <input
                type="range"
                min="1000"
                max="8000"
                step="100"
                value={eta}
                onChange={(e) => setEta(parseInt(e.target.value))}
                className="w-full accent-amis-l1"
              />
              <div className="flex justify-between text-[9px] text-amis-text-dim font-mono">
                <span>1000h</span>
                <span>8000h</span>
              </div>
            </div>

            <div className="p-3 bg-amis-bg border border-amis-border rounded text-xs font-mono leading-relaxed whitespace-pre-line text-amis-text-bright">
              <span className="text-amis-l4 font-bold block mb-1">ARIA RCM DISPOSITION RECOMMENDATION</span>
              {rcmRecommendation}
            </div>
          </div>
        </div>

        {/* WEIBULL CHART */}
        <ChartCard title="Probability Density Function (PDF)" tableName="weibull_probability_distribution">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={dynamicWeibullData}>
              <CartesianGrid stroke="#1a2a40" strokeDasharray="3 3" />
              <XAxis dataKey="t" tick={{ fill: '#3a5570', fontSize: 10 }} label={{ value: 'Age (operating hours)', position: 'insideBottom', offset: -2, fill: '#3a5570', fontSize: 10 }} />
              <YAxis tick={{ fill: '#3a5570', fontSize: 10 }} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Area type="monotone" dataKey="pdf" stroke="#39ff7a" fill="#39ff7a20" strokeWidth={2} name="Probability Density (x10^3)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* FLEET RELIABILITY CHAPTERS */}
        <ChartCard title="Fleet System Reliability vs. Control Limits" tableName="reliability_by_ata_chapter">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={fleetReliabilityTrend}>
              <CartesianGrid stroke="#1a2a40" strokeDasharray="3 3" />
              <XAxis dataKey="chapter" tick={{ fill: '#3a5570', fontSize: 10 }} />
              <YAxis domain={[0.8, 1.0]} tick={{ fill: '#3a5570', fontSize: 10 }} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'Courier New' }} />
              <Bar dataKey="reliability" fill="#00c8ff" radius={[2, 2, 0, 0]} name="Actual Reliability" />
              <Bar dataKey="limit" fill="#ff3a3a" radius={[2, 2, 0, 0]} name="Lower Control Limit" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* FMEA TABLE */}
        <SchemaTable tableName="fmea_failure_mode" columns={fmeaColumns} rows={fmeaModes} />
      </div>

      {/* RELIABILITY MODELS LEDGER */}
      <SchemaTable tableName="reliability_model_parameters" columns={modelColumns} rows={reliabilityModels} />
    </div>
  );
}
