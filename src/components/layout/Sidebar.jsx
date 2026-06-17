import {
  LayoutDashboard, Plane, Cog, Activity, GitBranch, TrendingUp, Shield,
  Package, Wrench, BookOpen, Box, Network, RefreshCw, Bot, Database,
  Table, Share2, BarChart3, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { useAmis } from '../../context/AmisContext';
import { TAB_DEFINITIONS, LAYER_COLORS } from '../../data/schemaCatalog';

const ICONS = {
  LayoutDashboard, Plane, Cog, Activity, GitBranch, TrendingUp, Shield,
  Package, Wrench, BookOpen, Box, Network, RefreshCw, Bot, Database,
  Table, Share2, BarChart3,
};

export default function Sidebar() {
  const { activeTab, setActiveTab } = useAmis();
  const [collapsed, setCollapsed] = useState(false);

  const groups = [...new Set(TAB_DEFINITIONS.map((t) => t.group))];

  return (
    <aside
      className={`${collapsed ? 'w-14' : 'w-56'} shrink-0 bg-amis-panel border-r border-amis-border flex flex-col transition-all duration-200 h-full`}
    >
      <div className="p-3 border-b border-amis-border flex items-center justify-between">
        {!collapsed && (
          <div>
            <div className="text-amis-l1 font-bold text-sm tracking-widest">AMIS</div>
            <div className="text-[9px] text-amis-text-dim tracking-wider">ADAPTIVE MAINTENANCE</div>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-amis-text-dim hover:text-amis-l1 p-1"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-2">
        {groups.map((group) => (
          <div key={group}>
            {!collapsed && (
              <div className="px-3 py-2 text-[9px] uppercase tracking-widest text-amis-text-dim">{group}</div>
            )}
            {TAB_DEFINITIONS.filter((t) => t.group === group).map((tab) => {
              const Icon = ICONS[tab.icon];
              const active = activeTab === tab.id;
              const layerColor = LAYER_COLORS[tab.layer];
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-left text-xs transition-colors ${
                    active ? 'bg-amis-bg text-amis-text-bright' : 'text-amis-text hover:bg-amis-bg/50 hover:text-amis-text-bright'
                  }`}
                  style={active ? { borderLeft: `3px solid ${layerColor}` } : { borderLeft: '3px solid transparent' }}
                  title={tab.label}
                >
                  <Icon size={16} style={{ color: active ? layerColor : undefined }} className="shrink-0" />
                  {!collapsed && (
                    <span className="truncate">
                      <span className="text-amis-text-dim mr-1">{tab.id}.</span>
                      {tab.label}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>
    </aside>
  );
}
