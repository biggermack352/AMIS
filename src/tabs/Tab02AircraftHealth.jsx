import { useAmis } from '../context/AmisContext';
import {
  TAIL_NUMBERS, statusTimeline, getAssetByTail, getHealthByAsset,
  getFaultsByTail, getIndicatorsByTail, getCorrosionByTail, conditionIndicators,
} from '../data/mockData';
import MetricCard from '../components/ui/MetricCard';
import SchemaTable from '../components/ui/SchemaTable';
import StatusGantt from '../components/ui/StatusGantt';
import { ChartCard, SensorSparkline } from '../components/ui/Charts';

export default function Tab02AircraftHealth() {
  const { selectedTail, setSelectedTail } = useAmis();
  const asset = getAssetByTail(selectedTail);
  const health = asset ? getHealthByAsset(asset.asset_uuid) : null;
  const faults = getFaultsByTail(selectedTail);
  const indicators = getIndicatorsByTail(selectedTail);
  const corrosion = getCorrosionByTail(selectedTail);
  const timeline = statusTimeline[selectedTail] || [];

  const sensorData = conditionIndicators
    .filter((c) => indicators.some((i) => i.ci_uuid === c.ci_uuid) || c.asset_uuid === asset?.asset_uuid)
    .map((c) => ({
      time: c.measurement_timestamp.slice(11, 16),
      value: c.ci_value,
      is_anomaly: c.ci_name.includes('Vibration') ? c.ci_value > 0.45 : c.ci_value > 100,
    }));

  const faultColumns = [
    { key: 'event_uuid', label: 'event_uuid' },
    { key: 'fault_code_uuid', label: 'fault_code_uuid' },
    { key: 'fault_code', label: 'fault_code' },
    { key: 'trigger_timestamp', label: 'trigger_timestamp', render: (v) => v?.slice(0, 19) },
    { key: 'clear_timestamp', label: 'clear_timestamp', render: (v) => v ? v.slice(0, 19) : 'ACTIVE' },
  ];

  const indicatorColumns = [
    { key: 'ci_uuid', label: 'ci_uuid' },
    { key: 'ci_name', label: 'ci_name' },
    { key: 'ci_value', label: 'ci_value' },
    { key: 'sensor_uuid', label: 'sensor_uuid' },
    { key: 'measurement_timestamp', label: 'measurement_timestamp', render: (v) => v?.slice(0, 19) },
  ];

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">Aircraft Health — Live Feed</h1>
          <p className="text-xs text-amis-text-dim mt-1">Layer 2 · Sensing · Per-tail health, status, faults, sensors, corrosion</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[10px] uppercase text-amis-text-dim">asset_instance.serial_number</label>
          <select
            value={selectedTail}
            onChange={(e) => setSelectedTail(e.target.value)}
            className="bg-amis-panel border border-amis-border rounded px-3 py-1.5 text-xs text-amis-l1"
          >
            {TAIL_NUMBERS.map((t) => (
              <option key={t} value={t}>T-{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          label="current_health_score"
          value={health ? `${(health.current_health_score * 100).toFixed(0)}%` : '—'}
          accent="l3"
        />
        <MetricCard
          label="probability_of_failure_next_flight"
          value={health ? `${(health.probability_of_failure_next_flight * 100).toFixed(1)}%` : '—'}
          accent="l2"
        />
        <MetricCard
          label="predicted_remaining_useful_life_hours"
          value={health ? `${health.predicted_remaining_useful_life_hours} hrs` : '—'}
          accent="l1"
        />
        <MetricCard
          label="cumulative_corrosion_score"
          value={corrosion ? corrosion.cumulative_corrosion_score.toFixed(1) : '—'}
          accent="l5"
        />
      </div>

      <StatusGantt segments={timeline} title={`Status Timeline — T-${selectedTail} (90 days)`} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SchemaTable tableName="triggered_fault_log" columns={faultColumns} rows={faults} />
        <SchemaTable tableName="condition_indicator_log" columns={indicatorColumns} rows={indicators.length ? indicators : conditionIndicators.slice(0, 3)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Sensor Anomaly Indicators" tableName="condition_indicator_log">
          <SensorSparkline data={sensorData.length ? sensorData : [{ time: '00', value: 0.3, is_anomaly: false }]} />
          <p className="text-[10px] text-amis-text-dim mt-2">Red markers = anomaly exceedance</p>
        </ChartCard>

        <div className="border border-amis-border rounded overflow-hidden">
          <div className="bg-amis-panel px-3 py-2 border-b border-amis-border">
            <span className="text-amis-l1 text-xs font-bold">asset_corrosion_exposure_ledger</span>
          </div>
          <div className="p-4 bg-amis-bg space-y-3">
            {corrosion ? (
              <>
                <div className="flex justify-between text-xs">
                  <span className="text-amis-text-dim">exposure_uuid</span>
                  <span className="text-amis-text">{corrosion.exposure_uuid}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-amis-text-dim">cumulative_corrosion_score</span>
                  <span className="text-amis-l5 font-bold">{corrosion.cumulative_corrosion_score}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-amis-text-dim">predicted_inspection_due_date</span>
                  <span className="text-amis-text-bright">{corrosion.predicted_inspection_due_date}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-amis-text-dim">last_calculated_date</span>
                  <span className="text-amis-text">{corrosion.last_calculated_date.slice(0, 19)}</span>
                </div>
                <div className="h-2 bg-amis-panel rounded overflow-hidden mt-2">
                  <div
                    className="h-full bg-gradient-to-r from-amis-l3 to-amis-l5"
                    style={{ width: `${Math.min(100, corrosion.cumulative_corrosion_score)}%` }}
                  />
                </div>
              </>
            ) : (
              <p className="text-xs text-amis-text-dim">No corrosion data for selected tail.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
