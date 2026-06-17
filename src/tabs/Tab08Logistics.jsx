import { supplyRequisitions, vendorPerformance, supportEquipment, discrepancies } from '../data/mockData';
import SchemaTable from '../components/ui/SchemaTable';
import MetricCard from '../components/ui/MetricCard';
import { ChartCard } from '../components/ui/Charts';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';

const TOOLTIP_STYLE = {
  contentStyle: { background: '#0b1120', border: '1px solid #1a2a40', fontFamily: 'Courier New', fontSize: 11 },
  labelStyle: { color: '#dceeff' },
};

export default function Tab08Logistics() {
  const reqColumns = [
    { key: 'document_number', label: 'document_number' },
    { key: 'part_uuid', label: 'part_uuid' },
    { key: 'quantity_ordered', label: 'qty' },
    { key: 'order_date', label: 'order_date' },
    { key: 'estimated_delivery_date', label: 'est_delivery' },
    { key: 'actual_delivery_date', label: 'actual_delivery', render: (v) => v || 'PENDING' },
    { key: 'status_code', label: 'status_code', render: (v) => (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${v === 'DELIVERED' ? 'text-amis-l3 bg-amis-l3/10' : v === 'BACKORDERED' ? 'text-amis-red bg-amis-red/10' : 'text-amis-l5 bg-amis-l5/10'}`}>
        {v}
      </span>
    )},
  ];

  const vendorColumns = [
    { key: 'cage_code', label: 'cage_code' },
    { key: 'name', label: 'vendor_name' },
    { key: 'avg_latency_days', label: 'avg_latency_days', render: (v) => `${v} days` },
    { key: 'quality_rating', label: 'quality_rating', render: (v) => `${v}%` },
    { key: 'order_count', label: 'order_count' },
  ];

  const seColumns = [
    { key: 'se_serial_number', label: 'se_serial_number' },
    { key: 'se_name', label: 'se_name' },
    { key: 'last_calibration_date', label: 'last_cal_date' },
    { key: 'next_calibration_due_date', label: 'next_cal_due' },
    { key: 'status_code', label: 'status_code', render: (v) => (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${v === 'Ready for Use' ? 'text-amis-l3 bg-amis-l3/10' : 'text-amis-red bg-amis-red/10'}`}>
        {v}
      </span>
    )},
  ];

  const awpDiscrepancies = discrepancies.filter((d) => d.status === 'AWP' || d.narrative.toLowerCase().includes('awp'));

  const awpColumns = [
    { key: 'discrepancy_uuid', label: 'discrepancy_uuid' },
    { key: 'narrative', label: 'narrative' },
    { key: 'discovered_date', label: 'discovered_date', render: (v) => v.slice(0, 10) },
    { key: 'severity_level', label: 'severity' },
  ];

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">Logistics Dashboard</h1>
        <p className="text-xs text-amis-text-dim mt-1">Layer 5 · Effector · Supply requisitions, vendor performance (CAGE), AWP blockers, calibrated support equipment</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="AWP Blockers" value={awpDiscrepancies.length} accent="red" delta="Driving fleet NMC" />
        <MetricCard label="Pending Requisitions" value={supplyRequisitions.filter((r) => !r.actual_delivery_date).length} accent="l5" />
        <MetricCard label="Avg Parts Latency" value="12.4 days" accent="l1" />
        <MetricCard label="Out-of-Cal Tools" value={supportEquipment.filter((s) => s.status_code !== 'Ready for Use').length} accent="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* REQUISITION LIST */}
        <div className="lg:col-span-2">
          <SchemaTable tableName="supply_requisition" columns={reqColumns} rows={supplyRequisitions} />
        </div>

        {/* LATENCY CHART */}
        <ChartCard title="Vendor Requisition Latency (CAGE)" tableName="vendor_performance_log">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={vendorPerformance}>
              <CartesianGrid stroke="#1a2a40" strokeDasharray="3 3" />
              <XAxis dataKey="cage_code" tick={{ fill: '#3a5570', fontSize: 10 }} />
              <YAxis tick={{ fill: '#3a5570', fontSize: 10 }} label={{ value: 'Avg Days', angle: -90, position: 'insideLeft', fill: '#3a5570', fontSize: 10 }} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Bar dataKey="avg_latency_days" fill="#ffd166" radius={[2, 2, 0, 0]}>
                {vendorPerformance.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.avg_latency_days > 14 ? '#ff3a3a' : '#ffd166'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="text-[10px] text-amis-text-dim mt-2 text-center">
            Red indicate latency &gt; 14 days threshold
          </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* AWP LIST */}
        <SchemaTable tableName="Awaiting Parts (AWP) Discrepancies" columns={awpColumns} rows={awpDiscrepancies} />

        {/* VENDOR CAGE CARD */}
        <SchemaTable tableName="vendor_performance (CAGE Scores)" columns={vendorColumns} rows={vendorPerformance} />
      </div>

      {/* SUPPORT EQUIPMENT */}
      <SchemaTable tableName="support_equipment_instance + support_equipment_catalog" columns={seColumns} rows={supportEquipment} />
    </div>
  );
}
