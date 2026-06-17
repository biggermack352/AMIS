import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';

function TreeNode({ node, labelKey, childrenKey, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2);
  const children = node[childrenKey] || [];
  const hasChildren = children.length > 0;
  const label = node[labelKey] || node.part_name || node.serial_number || node.part_number;

  return (
    <div>
      <div
        className="flex items-center gap-1 py-1 px-2 hover:bg-amis-panel rounded cursor-pointer text-xs"
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => hasChildren && setOpen(!open)}
      >
        {hasChildren ? (
          open ? <ChevronDown size={12} className="text-amis-l1 shrink-0" /> : <ChevronRight size={12} className="text-amis-text-dim shrink-0" />
        ) : (
          <span className="w-3" />
        )}
        <span className="text-amis-text-bright">{label}</span>
        {node.part_number && (
          <span className="text-amis-text-dim ml-1">P/N {node.part_number}{node.dash_number || ''}</span>
        )}
        {node.serial_number && node.part_name && (
          <span className="text-amis-l2 ml-1">S/N {node.serial_number}</span>
        )}
        {node.system_category && (
          <span className="text-[10px] text-amis-l4 ml-auto">{node.system_category}</span>
        )}
      </div>
      {open && hasChildren && children.map((child, i) => (
        <TreeNode key={child.part_uuid || child.asset_uuid || i} node={child} labelKey={labelKey} childrenKey={childrenKey} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function BomTree({ root, title, labelKey = 'part_name', childrenKey = 'children' }) {
  return (
    <div className="border border-amis-border rounded overflow-hidden h-full">
      {title && (
        <div className="bg-amis-panel px-3 py-2 border-b border-amis-border">
          <span className="text-xs text-amis-text-bright">{title}</span>
        </div>
      )}
      <div className="p-2 overflow-y-auto max-h-80 bg-amis-bg">
        <TreeNode node={root} labelKey={labelKey} childrenKey={childrenKey} />
      </div>
    </div>
  );
}
