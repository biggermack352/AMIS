import {
  cbmAlerts, reliabilityModels, rulTrend, alertLatency,
  cbmAccuracy, fmeaModes, generateWeibullCurve, assetInstances, partCatalog,
} from '../data/mockData';
import SchemaTable from '../components/ui/SchemaTable';
import MetricCard from '../components/ui/MetricCard';
import { ChartCard, RulTrendChart, WeibullChart, AlertLatencyChart, AccuracyDonut } from '../components/ui/Charts';

export default function Tab04CbmPlus() {
  const alertRows = cbmAlerts.map((a) => {
    const asset = assetInstances.find((i) => i.asset_uuid === a.asset_uuid);
    const mode = fmeaModes.find((m) => m.mode_uuid === a.predicted_failure_mode_uuid);
    return {
      ...a,
      serial_number: asset?.serial_number,
      failure_mode: mode?.failure_mode_description,
      confidence_pct: `${(a.confidence_score * 100).toFixed(0)}%`,
    };
  });

  const alertColumns = [
    { key: 'alert_uuid', label: 'alert_uuid' },
    { key: 'asset_uuid', label: 'asset_uuid' },
    { key: 'serial_number', label: 'serial_number' },
    { key: 'predicted_failure_mode_uuid', label: 'predicted_failure_mode_uuid' },
    { key: 'failure_mode', label: 'failure_mode' },
    { key: 'predicted_time_to_failure_hours', label: 'predicted_time_to_failure_hours' },
    { key: 'confidence_score', label: 'confidence_score', render: (v) => (
      <span className={v >= 0.85 ? 'text-amis-l3 font-bold' : 'text-amis-l5'}>{v.toFixed(2)}</span>
    )},
    { key: 'alert_timestamp', label: 'alert_timestamp', render: (v) => v?.slice(0, 19) },
  ];

  const weibullModel = reliabilityModels[1];
  const weibullData = generateWeibullCurve(weibullModel.weibull_beta, weibullModel.weibull_eta);

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">CBM+ — Condition Based Maintenance Plus</h1>
        <p className="text-xs text-amis-text-dim mt-1">Layer 3 · Comparator · Predictive alerts, RUL trends, Weibull models, alert latency</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Active Alerts" value={cbmAlerts.length} accent="l3" />
        <MetricCard label="High Confidence (>0.85)" value={cbmAlerts.filter((a) => a.confidence_score >= 0.85).length} accent="l1" />
        <MetricCard label="Avg RUL (hrs)" value={(cbmAlerts.reduce((s, a) => s + a.predicted_time_to_failure_hours, 0) / cbmAlerts.length).toFixed(0)} accent="l5" />
        <MetricCard label="Model Version" value={weibullModel.model_version} accent="l4" />
      </div>

      <SchemaTable tableName="cbm_predictive_alert" columns={alertColumns} rows={alertRows} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="RUL Trend — Critical Components" tableName="asset_health_prediction_ledger">
          <RulTrendChart data={rulTrend} />
        </ChartCard>

        <ChartCard title="Alert-to-Action Latency" tableName="cbm_predictive_alert → maintenance_action">
          <AlertLatencyChart data={alertLatency} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Weibull Distribution" tableName="reliability_model_parameters">
          <div className="grid grid-cols-3 gap-2 mb-3 text-[10px]">
            <div><span className="text-amis-text-dim">weibull_beta</span><div className="text-amis-l3 font-bold">{weibullModel.weibull_beta}</div></div>
            <div><span className="text-amis-text-dim">weibull_eta</span><div className="text-amis-l3 font-bold">{weibullModel.weibull_eta}</div></div>
            <div><span className="text-amis-text-dim">calculated_mtbf_hours</span><div className="text-amis-l1 font-bold">{weibullModel.calculated_mtbf_hours}</div></div>
          </div>
          <WeibullChart data={weibullData} beta={weibullModel.weibull_beta} eta={weibullModel.weibull_eta} />
          <p className="text-[10px] text-amis-text-dim mt-2">
            Part: {partCatalog['p-gearbox']?.part_name} · {weibullModel.data_points_used} data points
          </p>
        </ChartCard>

        <ChartCard title="Classification Accuracy" tableName="cybernetic_feedback_loop">
          <AccuracyDonut stats={cbmAccuracy} />
        </ChartCard>
      </div>

      <div className="border border-amis-border rounded overflow-hidden">
        <div className="bg-amis-panel px-3 py-2 border-b border-amis-border">
          <span className="text-amis-l1 text-xs font-bold">reliability_model_parameters</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-amis-bg border-b border-amis-border">
                {['model_uuid', 'part_uuid', 'model_version', 'weibull_beta', 'weibull_eta', 'calculated_mtbf_hours', 'data_points_used'].map((h) => (
                  <th key={h} className="px-3 py-2 text-[10px] uppercase text-amis-l1 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reliabilityModels.map((m) => (
                <tr key={m.model_uuid} className="border-b border-amis-border/50">
                  <td className="px-3 py-2 text-amis-text">{m.model_uuid}</td>
                  <td className="px-3 py-2 text-amis-text">{m.part_uuid}</td>
                  <td className="px-3 py-2 text-amis-text">{m.model_version}</td>
                  <td className="px-3 py-2 text-amis-l3">{m.weibull_beta}</td>
                  <td className="px-3 py-2 text-amis-l3">{m.weibull_eta}</td>
                  <td className="px-3 py-2 text-amis-l1">{m.calculated_mtbf_hours}</td>
                  <td className="px-3 py-2 text-amis-text-dim">{m.data_points_used}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
