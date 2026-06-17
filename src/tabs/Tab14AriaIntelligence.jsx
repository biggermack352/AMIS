import { useState, useRef, useEffect } from 'react';
import { useAmis } from '../context/AmisContext';
import { Bot, User, ThumbsUp, ThumbsDown, ShieldAlert } from 'lucide-react';

export default function Tab14AriaIntelligence() {
  const {
    ariaMessages,
    sendAriaMessage,
    rateMessage,
    selectedTail,
    selectedPartSn,
    ariaPersona,
    setAriaPersona,
  } = useAmis();

  const [inputVal, setInputVal] = useState('');
  const [overrideOpen, setOverrideOpen] = useState(false);
  
  // Override form state
  const [overrideAction, setOverrideAction] = useState('INSPECT_ONLY');
  const [overrideReason, setOverrideReason] = useState('FALSE_POSITIVE');
  const [overrideRationale, setOverrideRationale] = useState('');
  const [overrideSubmitted, setOverrideSubmitted] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ariaMessages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const query = inputVal;
    setInputVal('');

    // Generate context-aware canned response
    let response = "ARIA INTELLIGENCE AGENT: ";
    if (query.toLowerCase().includes('health') || query.toLowerCase().includes('tail')) {
      response += `Currently analyzing asset_instance T-${selectedTail}. Health score is at 72% with a 30-day wear-out trend noted. Telemetry shows recent vibration anomaly alerts. Recommend scheduling routine borescope inspection (DM-72-00-00).`;
    } else if (query.toLowerCase().includes('part') || query.toLowerCase().includes('gearbox')) {
      response += `Part S/N ${selectedPartSn} remaining useful life is calculated at 48.5 hours. Current Weibull parameters: Beta = 2.8 (wear-out acceleration). Requisitions for replacement are backordered under Cage 3XYZ4.`;
    } else if (query.toLowerCase().includes('manual') || query.toLowerCase().includes('procedure')) {
      response += `Procedure DM-72-10-00 requires support torque wrench SE-TRQ-100. Double check reassembly torque limits (180 in-lbs) as casing spalling rates have increased.`;
    } else {
      response += `Reviewing current context (Tail: ${selectedTail}, Part S/N: ${selectedPartSn}). Telemetry and logistics pipelines indicate nominal SLA latency scores. How can I expand on this diagnostic check?`;
    }

    sendAriaMessage(query, response);
  };

  const handleOverrideSubmit = (e) => {
    e.preventDefault();
    if (!overrideRationale.trim()) return;

    // Simulate database write
    setOverrideSubmitted(true);
    setTimeout(() => {
      setOverrideOpen(false);
      setOverrideSubmitted(false);
      setOverrideRationale('');
      
      // Append a system message to chat log
      sendAriaMessage(
        "SME Override Submission Request",
        `[SYSTEM NOTIFICATION]: SME Override successfully logged in database table: sme_override_report. Rationale: "${overrideRationale}". Action: ${overrideAction}. Reason Code: ${overrideReason}. Retraining pipeline notified.`
      );
    }, 2000);
  };

  return (
    <div className="p-4 flex flex-col h-full overflow-hidden bg-amis-bg">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-amis-border pb-3 mb-3">
        <div>
          <h1 className="text-sm font-bold text-amis-text-bright tracking-widest uppercase">ARIA Intelligence Chat</h1>
          <p className="text-xs text-amis-text-dim mt-1">Layer 4 · Decision · Enterprise conversational AI assistant context-aware with SME override reporting</p>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-amis-panel border border-amis-border rounded p-1">
            <button
              onClick={() => setAriaPersona('technician')}
              className={`px-2 py-1 text-[10px] font-bold uppercase rounded transition-colors ${ariaPersona === 'technician' ? 'bg-amis-l2 text-amis-bg' : 'text-amis-text-dim hover:text-amis-text'}`}
            >
              Technician Mode
            </button>
            <button
              onClick={() => setAriaPersona('expert')}
              className={`px-2 py-1 text-[10px] font-bold uppercase rounded transition-colors ${ariaPersona === 'expert' ? 'bg-amis-l4 text-amis-bg' : 'text-amis-text-dim hover:text-amis-text'}`}
            >
              Expert Mode
            </button>
          </div>
          
          <button
            onClick={() => setOverrideOpen(!overrideOpen)}
            className="flex items-center gap-1.5 bg-amis-red/10 border border-amis-red/40 rounded px-3 py-1.5 text-xs text-amis-red font-bold hover:bg-amis-red/20 transition-colors"
          >
            <ShieldAlert size={14} />
            SME Override Form
          </button>
        </div>
      </div>

      {/* CONTEXT STRIP */}
      <div className="bg-amis-panel/40 border border-amis-border rounded px-3 py-2 text-[10px] font-mono text-amis-text flex justify-between items-center mb-3">
        <span>Active context: <strong className="text-amis-l1">Tail T-{selectedTail}</strong></span>
        <span>Selected Part: <strong className="text-amis-l1">{selectedPartSn}</strong></span>
        <span>Persona: <strong className="text-amis-l4 uppercase">{ariaPersona}</strong></span>
      </div>

      {/* CHAT AREA AND OVERRIDE SPLIT */}
      <div className="flex-1 flex gap-4 min-h-0 overflow-hidden">
        {/* MESSAGES LOG */}
        <div className="flex-1 flex flex-col bg-amis-panel border border-amis-border rounded overflow-hidden min-h-0">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {ariaMessages.map((m, index) => (
              <div
                key={index}
                className={`flex gap-3 text-xs leading-relaxed max-w-[85%] ${m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
              >
                {/* Avatar */}
                <div className={`h-8 w-8 rounded-full border flex items-center justify-center flex-shrink-0 ${m.role === 'user' ? 'bg-amis-bg border-amis-l1 text-amis-l1' : 'bg-amis-l4/10 border-amis-l4 text-amis-l4'}`}>
                  {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                </div>

                {/* Text body */}
                <div className={`p-3 rounded-lg border flex flex-col space-y-2 ${m.role === 'user' ? 'bg-amis-l1/5 border-amis-l1/30 text-amis-text-bright' : 'bg-amis-bg border-amis-border text-amis-text'}`}>
                  <div className="whitespace-pre-wrap font-mono">{m.text}</div>
                  
                  {/* Rating indicators for AI response */}
                  {m.role === 'aria' && !m.text.includes('[SYSTEM') && (
                    <div className="flex items-center gap-3 border-t border-amis-border/30 pt-1.5 mt-1 text-[10px] text-amis-text-dim justify-between">
                      <span>Was this helpful?</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => rateMessage(index, 'up')}
                          className={`hover:text-amis-l3 transition-colors ${m.rating === 'up' ? 'text-amis-l3' : ''}`}
                        >
                          <ThumbsUp size={12} />
                        </button>
                        <button
                          onClick={() => rateMessage(index, 'down')}
                          className={`hover:text-amis-red transition-colors ${m.rating === 'down' ? 'text-amis-red' : ''}`}
                        >
                          <ThumbsDown size={12} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* CHAT INPUT */}
          <form onSubmit={handleSend} className="p-3 border-t border-amis-border bg-amis-bg flex gap-2">
            <input
              type="text"
              placeholder="Ask ARIA about health scoring, part Weibull models, or tech manuals..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-amis-panel border border-amis-border rounded px-3 py-2 text-xs text-amis-text-bright focus:outline-none focus:border-amis-l4"
            />
            <button
              type="submit"
              className="bg-amis-l4 border border-amis-l4 text-amis-bg font-bold px-6 py-2 rounded text-xs hover:bg-amis-l4/85 transition-colors"
            >
              Send
            </button>
          </form>
        </div>

        {/* COLLAPSIBLE OVERRIDE SIDEBAR */}
        {overrideOpen && (
          <div className="w-80 bg-amis-panel border border-amis-border rounded p-4 flex flex-col overflow-y-auto">
            <div className="text-xs font-bold text-amis-red uppercase tracking-wider border-b border-amis-border pb-1.5 mb-3 flex items-center gap-1.5">
              <ShieldAlert size={14} className="text-amis-red" />
              SME Override Capture
            </div>
            
            <p className="text-[11px] text-amis-text leading-relaxed mb-4">
              Submit a formal correction if you believe the model inference recommendation or health assessment is incorrect. 
              Submissions are logged into the database and trigger pipeline retraining.
            </p>

            <form onSubmit={handleOverrideSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-amis-text-dim block">Inference ID Being Overridden</label>
                <input
                  type="text"
                  value="inf-0891-9921"
                  disabled
                  className="w-full bg-amis-bg border border-amis-border/50 rounded px-3 py-1.5 font-mono text-amis-text-dim"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-amis-text-dim block">Actual Action Taken</label>
                <select 
                  value={overrideAction} 
                  onChange={(e) => setOverrideAction(e.target.value)}
                  className="w-full bg-amis-bg border border-amis-border rounded px-3 py-1.5 text-amis-text"
                >
                  <option value="INSPECT_ONLY">INSPECT_ONLY — Routine inspection</option>
                  <option value="NO_ACTION_REQUIRED">NO_ACTION_REQUIRED — False alarm</option>
                  <option value="REPLACE_PART">REPLACE_PART — Immediate swap</option>
                  <option value="DEFER_MAINTENANCE">DEFER_MAINTENANCE — Low severity delay</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-amis-text-dim block">Override Reason Code</label>
                <select 
                  value={overrideReason} 
                  onChange={(e) => setOverrideReason(e.target.value)}
                  className="w-full bg-amis-bg border border-amis-border rounded px-3 py-1.5 text-amis-text"
                >
                  <option value="FALSE_POSITIVE">FALSE_POSITIVE — Sensor glitch/nuisance</option>
                  <option value="MISSING_CONTEXT">MISSING_CONTEXT — Operations detail missing</option>
                  <option value="INCORRECT_PART_IDENTIFIED">INCORRECT_PART_IDENTIFIED — Misdiagnosis</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-amis-text-dim block font-bold">SME Rationale & Explanation</label>
                <textarea
                  rows={4}
                  placeholder="Detail exactly why the AI diagnosis was incorrect. What physical evidence was observed?"
                  value={overrideRationale}
                  onChange={(e) => setOverrideRationale(e.target.value)}
                  className="w-full bg-amis-bg border border-amis-border rounded p-2.5 text-xs text-amis-text-bright focus:outline-none focus:border-amis-red"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={overrideSubmitted}
                className="w-full bg-amis-red border border-amis-red text-white font-bold py-2 rounded text-xs hover:bg-amis-red/80 transition-colors"
              >
                {overrideSubmitted ? 'Logging Override (sme_override_report)...' : 'Log SME Override'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
