import { useState } from 'react';
import { surpriseAuditLog, vsmMetrics } from '../data/mockData';
import SchemaTable from '../components/ui/SchemaTable';
import MetricCard from '../components/ui/MetricCard';
import { ChartCard } from '../components/ui/Charts';
import AapGauge from '../components/ui/AapGauge';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TOOLTIP_STYLE = {
  contentStyle: { background: '#0b1120', border: '1px solid #1a2a40', fontFamily: 'Courier New', fontSize: 11 },
  labelStyle: { color: '#dceeff' },
};

const retrainingAccuracyHistory = [
  { cycle: 'Run 81', accuracy: 0.82, drift: 0.02 },
  { cycle: 'Run 82', accuracy: 0.84, drift: 0.01 },
  { cycle: 'Run 83', accuracy: 0.86, drift: 0.03 },
  { cycle: 'Run 84', accuracy: 0.83, drift: 0.04 },
  { cycle: 'Run 85', accuracy: 0.88, drift: 0.02 },
];

export default function Tab13MetaLoop() {
  const [pipelineRunning, setPipelineRunning] = useState(false);
  const [pipelineComplete, setPipelineComplete] = useState(false);

  const handleRetrainClick = () => {
    setPipelineRunning(true);
    setPipelineComplete(false);
    setTimeout(() => {
      setPipelineRunning(false);
      setPipelineComplete(true);
    }, 2000);
  };

  const auditColumns = [
    { key: 'event_uuid', label: 'event_uuid' },
    { key: 'fault_code', label: 'fault_code' },
    { key: 'serial_number', label: 'tail_number' },
    { key: 'occurrence_timestamp', label: 'occurrence_timestamp', render: (v) => v.slice(0, 16) },
    { key: 'gap_description', label: 'surprise_description' },
    { key: 'severity', label: 'severity' },
  ];

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">Meta Loop — Second-Order Cybernetics</h1>
        <p className="text-xs text-amis-text-dim mt-1">Layer 6 · Meta Loop · Sensing adequacy, model drift audits, retraining pipelines, Stafford Beer VSM system health</p>
      </div>

      <div className="p-4 border border-amis-l6/40 bg-amis-l6/5 rounded text-xs text-amis-text leading-relaxed">
        <span className="text-amis-l6 font-bold uppercase tracking-wider block mb-1">THE ACADEMIC / THESIS CORE: SECOND-ORDER CYBERNETICS</span>
        Most maintenance programs operate as first-order feedback loops (if X occurs, do Y). AMIS implements **second-order cybernetics** — the system observes its own prediction errors and retraining efficacy. This tab displays whether the AMIS control architecture is maintaining homeostatic viability.
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
        <div className="lg:col-span-1 flex justify-center bg-amis-panel border border-amis-border rounded p-4">
          <AapGauge value={vsmMetrics.overall_cybernetic_health} target={90} size="lg" title="VSM Loop Health" subtitle="Homeostatic Viability" />
        </div>
        
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard label="Sensing Adequacy Score" value="94.2%" accent="l2" delta="Sensed vs Actual variety" />
          <MetricCard label="Model Drift Index" value="0.02" accent="l3" delta="Below 0.05 limit (Nominal)" />
          <MetricCard label="Surprise Audits" value={surpriseAuditLog.length} accent="red" delta="Unpredicted failure events" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* DRIFT & ACCURACY HISTOGRAM */}
        <ChartCard title="Accuracy & Drift Trends (Last 5 Training Run Cycles)" tableName="cybernetic_feedback_loop + database_sync_log">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={retrainingAccuracyHistory}>
              <CartesianGrid stroke="#1a2a40" strokeDasharray="3 3" />
              <XAxis dataKey="cycle" tick={{ fill: '#3a5570', fontSize: 10 }} />
              <YAxis yAxisId="left" tick={{ fill: '#3a5570', fontSize: 10 }} label={{ value: 'Accuracy Score', angle: -90, position: 'insideLeft', fill: '#3a5570', fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#3a5570', fontSize: 10 }} label={{ value: 'K-S Drift Score', angle: 90, position: 'insideRight', fill: '#3a5570', fontSize: 10 }} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'Courier New' }} />
              <Line yAxisId="left" type="monotone" dataKey="accuracy" stroke="#39ff7a" strokeWidth={2} name="Prediction Accuracy" />
              <Line yAxisId="right" type="monotone" dataKey="drift" stroke="#ff3a3a" strokeWidth={2} name="Model Drift (KS)" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* PIPELINE CONTROL */}
        <div className="bg-amis-panel border border-amis-border rounded p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-amis-text-bright mb-2">ML retraining_pipeline Controller</h2>
            <p className="text-xs text-amis-text leading-relaxed mb-4">
              AMIS triggers automated model tuning upon drift limits exceeding 0.05, or manually via administrative command.
              Retraining recalculates Weibull parameters ($\beta, \eta$) in `reliability_model_parameters` and re-weights XGBoost nodes.
            </p>
            <div className="space-y-1.5 font-mono text-xs mb-4">
              <div className="flex justify-between"><span className="text-amis-text-dim">last_pipeline_run:</span><span className="text-amis-text">2026-06-16T04:22:18Z</span></div>
              <div className="flex justify-between"><span className="text-amis-text-dim">next_scheduled_run:</span><span className="text-amis-text">2026-06-23T04:00:00Z</span></div>
              <div className="flex justify-between"><span className="text-amis-text-dim">pipeline_status:</span><span className="text-amis-l3 font-bold">STANDBY</span></div>
            </div>
          </div>
          <div>
            <button
              onClick={handleRetrainClick}
              disabled={pipelineRunning}
              className={`w-full font-bold px-4 py-2.5 rounded text-xs border transition-colors ${pipelineRunning ? 'bg-amis-border border-amis-border text-amis-text-dim cursor-not-allowed' : 'bg-amis-l6/15 border-amis-l6 text-amis-l6 hover:bg-amis-l6/35'}`}
            >
              {pipelineRunning ? 'Re-training Models (Running pipeline_retrain.py)...' : 'Trigger Manual Retraining Pipeline'}
            </button>
            {pipelineComplete && (
              <p className="text-[11px] text-amis-l3 font-mono mt-2 text-center">
                ✓ Retraining run complete. Models updated in DB. Drift index reset to 0.01.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* STAFFORD BEER VSM VISUALIZATION */}
      <div className="border border-amis-border rounded p-4 bg-amis-panel/40">
        <h2 className="text-xs uppercase tracking-widest text-amis-text-bright mb-3">Stafford Beer Viable System Model (VSM) Diagnostics</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-xs font-mono">
          <div className="bg-amis-bg p-3 border border-amis-border rounded space-y-1">
            <span className="text-amis-l1 font-bold">System 1: Operation</span>
            <div className="text-lg font-bold text-amis-text-bright">{vsmMetrics.system1_viability}%</div>
            <p className="text-[10px] text-amis-text-dim leading-relaxed">Tail availability & flight line actions (L1, L2, L5).</p>
          </div>
          <div className="bg-amis-bg p-3 border border-amis-border rounded space-y-1">
            <span className="text-amis-l2 font-bold">System 2: Coordination</span>
            <div className="text-lg font-bold text-amis-text-bright">{vsmMetrics.system2_coordination}%</div>
            <p className="text-[10px] text-amis-text-dim leading-relaxed">Logistics order scheduling & discrepancy SLAs.</p>
          </div>
          <div className="bg-amis-bg p-3 border border-amis-border rounded space-y-1">
            <span className="text-amis-l3 font-bold">System 3: Control</span>
            <div className="text-lg font-bold text-amis-text-bright">{vsmMetrics.system3_control}%</div>
            <p className="text-[10px] text-amis-text-dim leading-relaxed">QA inspections & technical compliance checking.</p>
          </div>
          <div className="bg-amis-bg p-3 border border-amis-border rounded space-y-1">
            <span className="text-amis-l4 font-bold">System 4: Intelligence</span>
            <div className="text-lg font-bold text-amis-text-bright">{vsmMetrics.system4_intelligence}%</div>
            <p className="text-[10px] text-amis-text-dim leading-relaxed">CBM+ predictive modeling & RCM Weibull curves.</p>
          </div>
          <div className="bg-amis-bg p-3 border border-amis-border rounded space-y-1">
            <span className="text-amis-l6 font-bold">System 5: Policy</span>
            <div className="text-lg font-bold text-amis-text-bright">{vsmMetrics.system5_policy}%</div>
            <p className="text-[10px] text-amis-text-dim leading-relaxed">Airworthiness directives & structural envelope limits.</p>
          </div>
        </div>
      </div>

      {/* SURPRISE AUDITS */}
      <SchemaTable tableName="surprise_audits (failures without predictions)" columns={auditColumns} rows={surpriseAuditLog} />
    </div>
  );
}
