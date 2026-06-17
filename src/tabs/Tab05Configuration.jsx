import { useAmis } from '../context/AmisContext';
import { bomTree, physicalInstallTree, tdCompliance, softwareReleases, TAIL_NUMBERS } from '../data/mockData';
import BomTree from '../components/ui/BomTree';
import SchemaTable from '../components/ui/SchemaTable';

function TdStatusBadge({ status }) {
  const colors = { COMPLIANT: '#39ff7a', OVERDUE: '#ff3a3a', SCHEDULED: '#ffd166' };
  const c = colors[status] || '#a8c0d8';
  return (
    <span className="text-[10px] font-bold px-2 py-0.5 rounded" style={{ color: c, backgroundColor: `${c}20` }}>
      {status}
    </span>
  );
}

export default function Tab05Configuration() {
  const { selectedTail, setSelectedTail } = useAmis();

  const tdColumns = [
    { key: 'compliance_uuid', label: 'compliance_uuid' },
    { key: 'td_number', label: 'td_number' },
    { key: 'serial_number', label: 'serial_number', render: (v) => `T-${v}` },
    { key: 'pre_mod_asset_uuid', label: 'pre_mod_asset_uuid' },
    { key: 'post_mod_asset_uuid', label: 'post_mod_asset_uuid', render: (v) => v || '—' },
    { key: 'completion_date', label: 'completion_date', render: (v) => v ? v.slice(0, 10) : 'PENDING' },
    { key: 'status', label: 'status', render: (v) => <TdStatusBadge status={v} /> },
  ];

  const swColumns = [
    { key: 'release_uuid', label: 'release_uuid' },
    { key: 'part_uuid', label: 'part_uuid' },
    { key: 'version', label: 'version' },
    { key: 'release_date', label: 'release_date' },
    { key: 'airworthiness_certification_date', label: 'airworthiness_certification_date' },
    { key: 'is_active', label: 'is_active', render: (v) => (
      <span className={v ? 'text-amis-l3' : 'text-amis-text-dim'}>{v ? 'TRUE' : 'FALSE'}</span>
    )},
  ];

  const filteredTd = tdCompliance.filter((t) => t.serial_number === selectedTail);
  const allTd = tdCompliance;

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">Configuration Management</h1>
          <p className="text-xs text-amis-text-dim mt-1">Layer 1 · Physical · Engineering BOM vs physical installation, TD compliance, software releases</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-[10px] uppercase text-amis-text-dim">TD filter — tail</label>
          <select
            value={selectedTail}
            onChange={(e) => setSelectedTail(e.target.value)}
            className="bg-amis-panel border border-amis-border rounded px-3 py-1.5 text-xs text-amis-l1"
          >
            <option value="">All tails</option>
            {TAIL_NUMBERS.map((t) => (
              <option key={t} value={t}>T-{t}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BomTree
          root={bomTree}
          title="Engineering BOM — part_catalog (nha_part_uuid hierarchy)"
        />
        <BomTree
          root={physicalInstallTree}
          title="Physical Installation — asset_instance + asset_installation_history"
          labelKey="part_name"
        />
      </div>

      <SchemaTable
        tableName="td_compliance_log → technical_directive"
        columns={tdColumns}
        rows={selectedTail ? filteredTd : allTd}
      />

      <SchemaTable
        tableName="software_release"
        columns={swColumns}
        rows={softwareReleases}
      />
    </div>
  );
}
