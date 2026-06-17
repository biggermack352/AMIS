import { useState } from 'react';
import { Bot, X, Send, ThumbsUp, ThumbsDown, AlertTriangle } from 'lucide-react';
import { useAmis } from '../../context/AmisContext';
import { ariaResponses } from '../../data/mockData';
import { TAB_DEFINITIONS } from '../../data/schemaCatalog';

function getResponse(tab, tail, partSn) {
  const tabDef = TAB_DEFINITIONS.find((t) => t.id === tab);
  if (tab === 1) return ariaResponses.home;
  if (tab === 2) return ariaResponses.aircraftHealth.replace('{tail}', tail);
  if (tab === 3) return ariaResponses.partHealth.replace('{sn}', partSn).replace('{rul}', '72.0');
  if (tab === 4) return ariaResponses.cbm;
  if (tab === 5) return ariaResponses.config;
  return ariaResponses.default;
}

export default function AriaDrawer() {
  const {
    ariaOpen, closeAria, toggleAria, ariaPersona, setAriaPersona,
    ariaMessages, sendAriaMessage, rateMessage,
    activeTab, selectedTail, selectedPartSn,
  } = useAmis();
  const [input, setInput] = useState('');
  const [showOverride, setShowOverride] = useState(false);
  const [overrideText, setOverrideText] = useState('');

  const tabLabel = TAB_DEFINITIONS.find((t) => t.id === activeTab)?.label || 'Unknown';

  const handleSend = () => {
    if (!input.trim()) return;
    const response = getResponse(activeTab, selectedTail, selectedPartSn);
    const prefix = ariaPersona === 'technician'
      ? '[Technician Mode] '
      : '[Expert Mode] ';
    sendAriaMessage(input, prefix + response);
    setInput('');
  };

  if (!ariaOpen) {
    return (
      <button
        onClick={toggleAria}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-4 py-3 bg-amis-l4 text-amis-bg rounded-full shadow-lg hover:bg-amis-l4/90 transition-colors font-bold text-sm"
      >
        <Bot size={18} />
        ARIA
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={closeAria} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-amis-panel border-l border-amis-border z-50 flex flex-col shadow-2xl">
        <div className="p-4 border-b border-amis-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot size={20} className="text-amis-l4" />
            <div>
              <div className="text-sm font-bold text-amis-text-bright">ARIA</div>
              <div className="text-[10px] text-amis-text-dim">Enterprise Maintenance Intelligence</div>
            </div>
          </div>
          <button onClick={closeAria} className="text-amis-text-dim hover:text-amis-text-bright">
            <X size={20} />
          </button>
        </div>

        <div className="px-4 py-2 border-b border-amis-border flex flex-wrap gap-2">
          <span className="text-[10px] px-2 py-1 bg-amis-bg border border-amis-border rounded text-amis-l1">
            Tab: {tabLabel}
          </span>
          <span className="text-[10px] px-2 py-1 bg-amis-bg border border-amis-border rounded text-amis-l2">
            T-{selectedTail}
          </span>
          <span className="text-[10px] px-2 py-1 bg-amis-bg border border-amis-border rounded text-amis-l5">
            {selectedPartSn}
          </span>
        </div>

        <div className="px-4 py-2 border-b border-amis-border flex gap-2">
          {['expert', 'technician'].map((p) => (
            <button
              key={p}
              onClick={() => setAriaPersona(p)}
              className={`text-[10px] uppercase tracking-wider px-3 py-1 rounded border transition-colors ${
                ariaPersona === p
                  ? 'border-amis-l4 text-amis-l4 bg-amis-l4/10'
                  : 'border-amis-border text-amis-text-dim hover:text-amis-text'
              }`}
            >
              {p} Mode
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {ariaMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded px-3 py-2 text-xs ${
                  msg.role === 'user'
                    ? 'bg-amis-l4/20 text-amis-text-bright border border-amis-l4/30'
                    : 'bg-amis-bg text-amis-text border border-amis-border'
                }`}
              >
                {msg.text}
                {msg.role === 'aria' && (
                  <div className="flex gap-2 mt-2 pt-2 border-t border-amis-border/50">
                    <button onClick={() => rateMessage(i, 'up')} className={msg.rating === 'up' ? 'text-amis-l3' : 'text-amis-text-dim hover:text-amis-l3'}>
                      <ThumbsUp size={12} />
                    </button>
                    <button onClick={() => rateMessage(i, 'down')} className={msg.rating === 'down' ? 'text-amis-red' : 'text-amis-text-dim hover:text-amis-red'}>
                      <ThumbsDown size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {showOverride && (
          <div className="px-4 py-2 border-t border-amis-border bg-amis-bg">
            <div className="flex items-center gap-1 text-[10px] text-amis-l5 mb-1">
              <AlertTriangle size={10} /> sme_override_report capture
            </div>
            <textarea
              value={overrideText}
              onChange={(e) => setOverrideText(e.target.value)}
              placeholder="ARIA was wrong — here's what actually happened..."
              className="w-full bg-amis-panel border border-amis-border rounded p-2 text-xs text-amis-text resize-none h-16"
            />
          </div>
        )}

        <div className="p-4 border-t border-amis-border">
          <button
            onClick={() => setShowOverride(!showOverride)}
            className="text-[10px] text-amis-l5 hover:underline mb-2 block"
          >
            {showOverride ? 'Hide override capture' : 'ARIA was wrong — capture override'}
          </button>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask ARIA..."
              className="flex-1 bg-amis-bg border border-amis-border rounded px-3 py-2 text-xs text-amis-text-bright placeholder:text-amis-text-dim"
            />
            <button
              onClick={handleSend}
              className="px-3 py-2 bg-amis-l4 text-amis-bg rounded hover:bg-amis-l4/90"
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
