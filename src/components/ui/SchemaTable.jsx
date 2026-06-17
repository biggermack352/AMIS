export default function SchemaTable({ tableName, columns, rows, compact = false }) {
  return (
    <div className="border border-amis-border rounded overflow-hidden">
      {tableName && (
        <div className="bg-amis-panel px-3 py-2 border-b border-amis-border flex items-center gap-2">
          <span className="text-amis-l1 text-xs font-bold">{tableName}</span>
          <span className="text-amis-text-dim text-[10px]">({rows.length} rows)</span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-amis-bg border-b border-amis-border">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-3 py-2 text-[10px] uppercase tracking-wider text-amis-l1 font-normal whitespace-nowrap ${compact ? 'py-1.5' : ''}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-amis-border/50 hover:bg-amis-panel/50 transition-colors">
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={`px-3 text-xs text-amis-text whitespace-nowrap ${compact ? 'py-1.5' : 'py-2'}`}
                  >
                    {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
