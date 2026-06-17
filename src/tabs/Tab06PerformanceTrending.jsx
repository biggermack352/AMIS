import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import MetricCard from '../components/ui/MetricCard';
import { ChartCard } from '../components/ui/Charts';

const TOOLTIP_STYLE = {
  contentStyle: { background: '#0b1120', border: '1px solid #1a2a40', fontFamily: 'Courier New', fontSize: 11 },
  labelStyle: { color: '#dceeff' },
};

const aapHistory = [
  { date: '06-10', '7-Day': 88.2, '30-Day': 87.1, '90-Day': 86.8 },
  { date: '06-11', '7-Day': 87.9, '30-Day': 87.2, '90-Day': 86.8 },
  { date: '06-12', '7-Day': 87.5, '30-Day': 87.1, '90-Day': 86.9 },
  { date: '06-13', '7-Day': 86.4, '30-Day': 87.0, '90-Day': 86.9 },
  { date: '06-14', '7-Day': 86.9, '30-Day': 87.1, '90-Day': 87.0 },
  { date: '06-15', '7-Day': 87.1, '30-Day': 87.2, '90-Day': 87.1 },
  { date: '06-16', '7-Day': 87.3, '30-Day': 87.3, '90-Day': 87.2 },
];

const mtbfComparison = [
  { component: 'TPE331 Engine', Actual: 3550, Weibull: 3800 },
  { component: 'GBX-4400 Gearbox', Actual: 2150, Weibull: 2500 },
  { component: 'ACT-7710 Actuator', Actual: 5800, Weibull: 5400 },
];

const workcenterRates = [
  { workcenter: 'Power Plants', discrepancies: 24, avgFixTime: 4.8 },
  { workcenter: 'Airframes', discrepancies: 18, avgFixTime: 3.2 },
  { workcenter: 'Avionics', discrepancies: 31, avgFixTime: 2.1 },
  { workcenter: 'Corrosion Control', discrepancies: 8, avgFixTime: 6.5 },
];

const maintainerPerformance = [
  { id: 'M-0819', rank: 'Sgt', workcenter: 'Power Plants', sla_compliance: '94.2%', avg_fix_time: '3.8h', qa_pass_rate: '98.5%' },
  { id: 'M-1240', rank: 'Cpl', workcenter: 'Avionics', sla_compliance: '96.8%', avg_fix_time: '1.9h', qa_pass_rate: '97.2%' },
  { id: 'M-2103', rank: 'SSgt', workcenter: 'Airframes', sla_compliance: '91.5%', avg_fix_time: '4.2h', qa_pass_rate: '100.0%' },
  { id: 'M-3081', rank: 'Sgt', workcenter: 'Power Plants', sla_compliance: '88.9%', avg_fix_time: '5.1h', qa_pass_rate: '95.0%' },
];

export default function Tab06PerformanceTrending() {
  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">Performance Trending & Grading</h1>
        <p className="text-xs text-amis-text-dim mt-1">Layer 3 · Comparator · Fleet AAP trends, actual MTBF vs. Weibull predictions, workcenter metrics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="7-Day Avg AAP" value="87.3%" accent="l1" delta="-0.9% vs last week" />
        <MetricCard label="MTBF Deficit (Fleet)" value="-380 hrs" accent="red" delta="GBX spalling driver" />
        <MetricCard label="Avionics Backlog" value="31 open" accent="l4" />
        <MetricCard label="Overall QA Pass Rate" value="97.7%" accent="l3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="AAP Historical Trend (7 / 30 / 90-Day Rolling)" tableName="fleet_availability_index">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={aapHistory}>
              <CartesianGrid stroke="#1a2a40" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: '#3a5570', fontSize: 10 }} />
              <YAxis domain={[80, 95]} tick={{ fill: '#3a5570', fontSize: 10 }} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'Courier New' }} />
              <Line type="monotone" dataKey="7-Day" stroke="#00c8ff" strokeWidth={2} dot name="7-Day Rolling" />
              <Line type="monotone" dataKey="30-Day" stroke="#ff6b35" strokeWidth={2} dot={false} name="30-Day Rolling" />
              <Line type="monotone" dataKey="90-Day" stroke="#c77dff" strokeWidth={2} dot={false} name="90-Day Rolling" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="MTBF Actual vs. Weibull Parameterized Life" tableName="reliability_model_parameters">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mtbfComparison}>
              <CartesianGrid stroke="#1a2a40" strokeDasharray="3 3" />
              <XAxis dataKey="component" tick={{ fill: '#3a5570', fontSize: 10 }} />
              <YAxis tick={{ fill: '#3a5570', fontSize: 10 }} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'Courier New' }} />
              <Bar dataKey="Actual" fill="#ff6b35" radius={[2, 2, 0, 0]} name="Actual Mean Life (hrs)" />
              <Bar dataKey="Weibull" fill="#39ff7a" radius={[2, 2, 0, 0]} name="Weibull Parameterized (hrs)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Discrepancy Load by Workcenter" tableName="maintenance_discrepancy (workcenter groupings)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={workcenterRates}>
              <CartesianGrid stroke="#1a2a40" strokeDasharray="3 3" />
              <XAxis dataKey="workcenter" tick={{ fill: '#3a5570', fontSize: 10 }} />
              <YAxis yAxisId="left" tick={{ fill: '#3a5570', fontSize: 10 }} label={{ value: 'Discrepancy Count', angle: -90, position: 'insideLeft', fill: '#3a5570', fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: '#3a5570', fontSize: 10 }} label={{ value: 'Avg Fix Time (hrs)', angle: 90, position: 'insideRight', fill: '#3a5570', fontSize: 10 }} />
              <Tooltip {...TOOLTIP_STYLE} />
              <Legend wrapperStyle={{ fontSize: 10, fontFamily: 'Courier New' }} />
              <Bar yAxisId="left" dataKey="discrepancies" fill="#c77dff" radius={[2, 2, 0, 0]} name="Active Gripes" />
              <Bar yAxisId="right" dataKey="avgFixTime" fill="#ffd166" radius={[2, 2, 0, 0]} name="Avg Fix Time" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <div className="border border-amis-border rounded overflow-hidden">
          <div className="bg-amis-panel px-3 py-2 border-b border-amis-border flex justify-between items-center">
            <span className="text-amis-l1 text-xs font-bold">maintainer_performance_ledger (Anonymized)</span>
            <span className="text-[9px] text-amis-text-dim uppercase">LMS & NALCOMIS Clockings</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-amis-bg border-b border-amis-border">
                  {['maintainer_id', 'rank_rate', 'workcenter', 'sla_compliance', 'avg_repair_time', 'qa_pass_rate'].map((h) => (
                    <th key={h} className="px-3 py-2 text-[10px] uppercase text-amis-l1 text-left">{h.replace(/_/g, ' ')}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {maintainerPerformance.map((m) => (
                  <tr key={m.id} className="border-b border-amis-border/50 hover:bg-amis-panel/20 transition-colors">
                    <td className="px-3 py-2 text-amis-text-bright font-mono">{m.id}</td>
                    <td className="px-3 py-2 text-amis-text">{m.rank}</td>
                    <td className="px-3 py-2 text-amis-text-dim">{m.workcenter}</td>
                    <td className="px-3 py-2 text-amis-l5 font-bold">{m.sla_compliance}</td>
                    <td className="px-3 py-2 text-amis-text">{m.avg_fix_time}</td>
                    <td className="px-3 py-2 text-amis-l3 font-bold">{m.qa_pass_rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
