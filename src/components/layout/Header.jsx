import { Bot, Clock } from 'lucide-react';
import { useAmis } from '../../context/AmisContext';
import { fleetAap } from '../../data/mockData';
import AapGauge from '../ui/AapGauge';

export default function Header() {
  const { selectedTail, openAria } = useAmis();
  const tailAap = fleetAap.perTail.find((t) => t.serial_number === selectedTail);

  return (
    <header className="bg-amis-panel border-b border-amis-border px-4 py-3 flex items-center justify-between gap-4 shrink-0">
      <div className="flex items-center gap-6">
        <AapGauge value={fleetAap.fleet} target={fleetAap.target} size="md" title="Fleet AAP" subtitle={`Target ${fleetAap.target}%`} />
        {tailAap && (
          <AapGauge value={tailAap.aap} target={fleetAap.target} size="sm" title={`T-${tailAap.serial_number}`} />
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 text-[10px] text-amis-text-dim">
          <Clock size={12} />
          <span>Last ETL sync · 2026-06-16 14:32 UTC</span>
        </div>
        <button
          onClick={openAria}
          className="flex items-center gap-2 px-3 py-1.5 bg-amis-bg border border-amis-l4 rounded text-xs text-amis-l4 hover:bg-amis-l4/10 transition-colors"
        >
          <Bot size={14} />
          ARIA
        </button>
      </div>
    </header>
  );
}
