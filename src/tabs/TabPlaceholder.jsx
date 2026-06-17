import { TAB_DEFINITIONS, PLACEHOLDER_SPECS, LAYER_COLORS } from '../data/schemaCatalog';

export default function TabPlaceholder({ tabId }) {
  const tab = TAB_DEFINITIONS.find((t) => t.id === tabId);
  const specs = PLACEHOLDER_SPECS[tabId] || [];
  const layerColor = LAYER_COLORS[tab?.layer] || '#a8c0d8';

  return (
    <div className="p-6 max-w-3xl">
      <div className="mb-6 p-4 border border-amis-l5/50 bg-amis-l5/5 rounded">
        <span className="text-amis-l5 text-xs font-bold uppercase tracking-wider">Phase 4 — Pending Feedback</span>
        <p className="text-xs text-amis-text mt-1">
          Tabs 1–5 are complete. This module will be built after your review of the initial dashboards.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span
          className="text-[10px] uppercase tracking-widest px-2 py-1 rounded border font-bold"
          style={{ color: layerColor, borderColor: layerColor }}
        >
          Layer {tab?.layer}
        </span>
        <h1 className="text-lg font-bold text-amis-text-bright tracking-wide">
          {tabId}. {tab?.label}
        </h1>
      </div>

      <p className="text-sm text-amis-text mb-6">
        Planned widgets for this module:
      </p>

      <ul className="space-y-2">
        {specs.map((spec, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-amis-text">
            <span className="text-amis-l1 mt-0.5">▸</span>
            {spec}
          </li>
        ))}
      </ul>

      <div className="mt-8 p-4 border border-amis-border rounded bg-amis-panel">
        <div className="text-[10px] uppercase tracking-widest text-amis-text-dim mb-2">Mock UI Preview Area</div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-20 bg-amis-bg border border-amis-border rounded flex items-center justify-center">
              <span className="text-[10px] text-amis-text-dim">Widget {n}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
