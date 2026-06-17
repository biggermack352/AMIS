import { engineeringInstructions, fracasInvestigations, engineeringProjects, documentRepository } from '../data/mockData';
import SchemaTable from '../components/ui/SchemaTable';
import MetricCard from '../components/ui/MetricCard';

export default function Tab09Engineering() {
  const eiColumns = [
    { key: 'tracking_number', label: 'tracking_number' },
    { key: 'instruction_type', label: 'type' },
    { key: 'submitted_date', label: 'submitted', render: (v) => v.slice(0, 16) },
    { key: 'response_date', label: 'responded', render: (v) => v ? v.slice(0, 16) : 'PENDING' },
    { key: 'engineer_name', label: 'engineer' },
    { key: 'status', label: 'status', render: (v) => (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${v === 'Closed' ? 'text-amis-l3 bg-amis-l3/10' : 'text-amis-l2 bg-amis-l2/10'}`}>
        {v}
      </span>
    )},
  ];

  const fracasColumns = [
    { key: 'fracas_tracking_number', label: 'tracking_number' },
    { key: 'problem_statement', label: 'problem_statement' },
    { key: 'opened_date', label: 'opened_date', render: (v) => v.slice(0, 10) },
    { key: 'closed_date', label: 'closed_date', render: (v) => v ? v.slice(0, 10) : 'OPEN' },
    { key: 'lead_investigator', label: 'lead_engineer' },
    { key: 'status', label: 'status', render: (v) => (
      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${v.includes('Closed') ? 'text-amis-l3 bg-amis-l3/10' : 'text-amis-red bg-amis-red/10'}`}>
        {v}
      </span>
    )},
  ];

  const docColumns = [
    { key: 'document_title', label: 'document_title' },
    { key: 'document_type', label: 'type' },
    { key: 'author', label: 'author' },
    { key: 'revision', label: 'rev' },
    { key: 'publication_date', label: 'pub_date' },
    { key: 'storage_location', label: 's3_storage_path', render: (v) => <span className="font-mono text-amis-l1 underline cursor-pointer">{v}</span> },
  ];

  // Group projects for Kanban board
  const kanbanColumns = {
    Proposed: engineeringProjects.filter(p => p.status === 'Proposed'),
    Active: engineeringProjects.filter(p => p.status === 'Active'),
    'On Hold': engineeringProjects.filter(p => p.status === 'On Hold'),
    Completed: engineeringProjects.filter(p => p.status === 'Completed'),
  };

  return (
    <div className="p-4 space-y-6 overflow-y-auto h-full">
      <div>
        <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">Engineering Dashboard</h1>
        <p className="text-xs text-amis-text-dim mt-1">Layer 4 · Decision · Engineering instructions (EI), FRACAS investigations, Kanban boards, documentation library</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Open EI Requests" value={engineeringInstructions.filter(e => e.status === 'Open').length} accent="l2" />
        <MetricCard label="FRACAS In-Analysis" value={fracasInvestigations.filter(f => f.status === 'Under Analysis').length} accent="red" />
        <MetricCard label="Active Projects" value={engineeringProjects.filter(p => p.status === 'Active').length} accent="l1" />
        <MetricCard label="Avg Response SLA" value="26.5h" accent="l3" />
      </div>

      {/* EI QUEUE & FRACAS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SchemaTable tableName="engineering_instruction (Fleet Requests)" columns={eiColumns} rows={engineeringInstructions} />
        <SchemaTable tableName="fracas_investigation (Root Cause Analysis)" columns={fracasColumns} rows={fracasInvestigations} />
      </div>

      {/* KANBAN BOARD */}
      <div className="border border-amis-border rounded overflow-hidden">
        <div className="bg-amis-panel px-3 py-2 border-b border-amis-border flex justify-between items-center">
          <span className="text-amis-l1 text-xs font-bold">engineering_project (Kanban Board)</span>
          <span className="text-[9px] text-amis-text-dim uppercase">Design & Reliability Studies</span>
        </div>
        <div className="p-4 bg-amis-bg grid grid-cols-1 md:grid-cols-4 gap-4">
          {Object.entries(kanbanColumns).map(([status, projects]) => (
            <div key={status} className="bg-amis-panel/40 border border-amis-border rounded p-3 flex flex-col space-y-3">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amis-text-bright border-b border-amis-border pb-1.5 flex justify-between">
                <span>{status}</span>
                <span className="px-1.5 bg-amis-border rounded text-amis-text text-[9px]">{projects.length}</span>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto max-h-60">
                {projects.map(p => (
                  <div key={p.project_uuid} className="bg-amis-bg border border-amis-border rounded p-2.5 space-y-2 hover:border-amis-l1 transition-colors">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] font-mono text-amis-text-dim">{p.project_id}</span>
                      <span className={`text-[8px] font-bold px-1.5 rounded ${p.priority === 'High' ? 'text-amis-red bg-amis-red/10' : p.priority === 'Medium' ? 'text-amis-l5 bg-amis-l5/10' : 'text-amis-text-dim'}`}>{p.priority}</span>
                    </div>
                    <div className="text-xs font-bold text-amis-text-bright">{p.project_title}</div>
                    <p className="text-[10px] text-amis-text-dim leading-relaxed truncate">{p.project_description}</p>
                    <div className="flex justify-between items-center text-[9px] text-amis-text-dim font-mono pt-1 border-t border-amis-border/30">
                      <span>Lead: {p.lead_engineer}</span>
                      <span>Target: {p.target_completion_date.slice(5)}</span>
                    </div>
                  </div>
                ))}
                {projects.length === 0 && (
                  <div className="h-16 flex items-center justify-center border border-dashed border-amis-border rounded text-[10px] text-amis-text-dim">
                    No items in {status.toLowerCase()}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DOCUMENT REPOSITORY */}
      <SchemaTable tableName="document_repository (Engineering Library)" columns={docColumns} rows={documentRepository} />
    </div>
  );
}
