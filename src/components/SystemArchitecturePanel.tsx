import React, { useState, useRef, useEffect } from 'react';

type ComponentId = 'tank' | 'pv' | 'pump' | 'manifold' | 'lateral';

interface SpecInfo {
  label: string;
  value: string;
}

interface ComponentData {
  id: ComponentId;
  title: string;
  tag: string;
  subtitle: string;
  specs: SpecInfo[];
  description: string;
  reasons: string[];
  dotPosition: { left: string; top: string };
  labelPosition: { left: string; top: string };
  anchorOffset?: { x: string; y: string };
}

const componentData: ComponentData[] = [
  {
    id: 'tank',
    title: 'Elevated Storage Tank',
    tag: 'Hydraulic Buffer',
    subtitle: 'Gravity-fed hydraulic decoupling',
    specs: [
      { label: 'Capacity', value: '5.0 m³' },
      { label: 'Elevation', value: '2.4 m' },
      { label: 'Emitter Pressure', value: '0.15 bar' },
      { label: 'Buffer Duration', value: '~2.7 hrs' }
    ],
    description: 'The elevated storage tank hydraulically decouples the solar-driven pump circuit from the gravity-fed drip network, eliminating pressure instability and enabling consistent low-pressure drip emitter performance.',
    reasons: [
      '(1) Gravity head of 2.4m delivers a precise 0.15 bar at the most remote emitter.',
      '(2) Irrigation can continue outside the 6.33 PSH pumping window.',
      '(3) A mechanical float valve governs fill level — no active instrumentation required.',
      '(4) Sized against a limiting water level of 2.1m beyond which the pump cannot sustain 2.53 m³/h duty flow.'
    ],
    dotPosition: { left: '27%', top: '16%' },
    labelPosition: { left: '0%', top: '5%' },
    anchorOffset: { x: '20%', y: '5%' }
  },
  {
    id: 'pv',
    title: 'Solar Module',
    tag: 'Energy Source',
    subtitle: 'Single module · Direct-coupled DC configuration',
    specs: [
      { label: 'Rated Power', value: '510 Wp' },
      { label: 'Module Cost', value: '£76.11' },
      { label: 'Peak Sun Hours', value: '6.33 h/day' },
      { label: 'Derating Factor', value: '×1.30' }
    ],
    description: 'A single 510 Wp module powers the entire system via a direct-coupled DC architecture — no battery storage — selected for minimal capital cost and reliability in off-grid environments where battery maintenance is impractical.',
    reasons: [
      '(1) The Kirloskar\'s 0.37 kW class, after a 1.30 derating factor, requires 481 Wp — satisfied by one 510 Wp module.',
      '(2) Battery-coupled systems were eliminated due to replacement costs and rural unavailability.',
      '(3) October governs sizing: peak ETc of 6.78 mm/day produces the highest demand-to-PSH ratio of 2.14 m³/h.',
      '(4) 75% system derating accounts for module tolerance, wiring, soiling, and connection losses.',
    ],
    dotPosition: { left: '50%', top: '21.5%' },
    labelPosition: { left: '52%', top: '8%' },
  },
  {
    id: 'pump',
    title: 'Submersible Pump',
    tag: 'Optimal Selection',
    subtitle: 'Submersible centrifugal · 0.37 kW · £201.96 total system cost',
    specs: [
      { label: 'Duty Flow', value: '2.53 m³/h' },
      { label: 'Total Dynamic Head', value: '23.28 m' },
      { label: 'Rated Power', value: '0.37 kW' },
      { label: 'Pump Cost', value: '£125.85' }
    ],
    description: 'Selected from 18 screened candidates as the minimum-cost solution, the Kirloskar delivers the lowest total electro-hydraulic subsystem cost of £201.96, satisfying the duty point derived from 16.0 m³/day gross demand over 6.33 peak sun hours.',
    reasons: [
      '(1) Produces 25.4m head at 2.53 m³/h — a 9.0% deviation, within the 15% shortlisting criterion.',
      '(2) At £125.85, it is £30.25 cheaper than the nearest rival in the same 0.37 kW power class where PV cost is identical.',
      '(3) Submersible type is required by the 20m borehole depth — surface pumps are limited to ~10m theoretical lift.',
      '(4) Implied wire-to-water efficiency of 43% sits within the 30–50% typical range for 4-inch submersible pumps.'
    ],
    dotPosition: { left: '23%', top: '84%' },
    labelPosition: { left: '25.5%', top: '88%' }
  },
  {
    id: 'manifold',
    title: 'Central Manifold',
    tag: 'Distribution Network',
    subtitle: '32 mm polyethylene · 3-zone sequential operation',
    specs: [
      { label: 'Pipe Diameter', value: '32 mm PE' },
      { label: 'Flow Velocity', value: '0.97 m/s' },
      { label: 'Friction Loss', value: '0.44 m' },
      { label: 'Field Dimensions', value: '50 m × 40 m' }
    ],
    description: 'The central manifold runs the 50m length of the field supplying 53 laterals from their midpoints. Full simultaneous operation would require 5,512 L/h — over double pump capacity — so three sequential zones are operated via manual ball valves.',
    reasons: [
      '(1) 25mm diameter was rejected: velocity exceeded limit and consumed 63% of available gravity head in friction.',
      '(2) Three zones of 18, 18, and 17 laterals deliver 16.0 m³/day in ~8.6 hours from tank storage.',
      '(3) Midpoint lateral supply was required because full 40m laterals are infeasible at 0.1–0.2 bar operating pressure.',
      '(4) Distributed friction scaled by Christiansen F-factor of 0.36 (>10 outlets), yielding 0.44m design loss.'
    ],
    dotPosition: { left: '80%', top: '60%' },
    labelPosition: { left: '77.5%', top: '88%' },
    anchorOffset: { x: '91%', y: '88%' }
  },
  {
    id: 'lateral',
    title: 'Lateral Drip Emitters',
    tag: 'Irrigation Method',
    subtitle: '12 mm dripper line · 85% application efficiency',
    specs: [
      { label: 'Emitter Spacing', value: '0.25 m' },
      { label: 'Lateral Spacing', value: '0.75 m' },
      { label: 'Emitter Flow', value: '0.65 L/h' },
      { label: 'Gross Demand', value: '16.0 m³/day' }
    ],
    description: 'Drip was selected over surface and sprinkler irrigation for its 85% application efficiency — directly minimising gross pump demand, PV array size, and total system cost. Surface irrigation at 50–80% efficiency would have required up to 27.2 m³/day.',
    reasons: [
      '(1) 85% efficiency yields 16.0 m³/day gross demand; surface irrigation could double this.',
      '(2) Operating at 0.15 bar (1.5m head) — satisfied entirely by the 2.4m tank elevation after friction losses.',
      '(3) 0.75m lateral spacing aligned to recommended maize planting geometry in Chiradzulu District.',
      '(4) A 120-mesh screen filter at the tank outlet (0.30m head loss) prevents emitter clogging, incorporated into the gravity circuit head budget.'
    ],
    dotPosition: { left: '52%', top: '64%' },
    labelPosition: { left: '51.5%', top: '88%' },
    anchorOffset: { x: '56.5%', y: '88%' }
  }
];

export const SystemArchitecturePanel = () => {
  const [activeComponentId, setActiveComponentId] = useState<ComponentId | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const toggleComponent = (id: ComponentId) => {
    setActiveComponentId(prev => {
      const next = prev === id ? null : id;
      if (next && panelRef.current) {
        setTimeout(() => {
          panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
      }
      return next;
    });
  };

  const activeData = componentData.find(c => c.id === activeComponentId);

  const formatReason = (text: string) => {
    const cleanText = text.replace(/^\(\d+\)\s*/, '');
    const firstDash = cleanText.indexOf('—');
    const splitIndex = firstDash > -1 ? firstDash : cleanText.indexOf(' ', 20);
    
    if (splitIndex === -1) return <span className="font-bold text-[#f0dfc4]">{cleanText}</span>;
    
    const lead = cleanText.substring(0, splitIndex);
    const rest = cleanText.substring(splitIndex);
    return (
      <>
        <span className="font-bold text-[#f0dfc4]">{lead}</span>
        {rest}
      </>
    );
  };

  return (
    <div className="w-full relative mt-8">
      {/* 1. Schematic Diagram Section */}
      <div className="w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] -ml-6 md:-ml-12 relative border-y border-[#4a2912] overflow-x-auto overflow-y-hidden">
        <div className="min-w-[900px] lg:min-w-0 w-full relative mx-auto max-w-[2000px] aspect-[2959/1394] overflow-visible">
          <img 
            src="/3D-Schematic.png"
            alt="System Architecture Schematic" 
            className="absolute inset-0 w-full h-full object-contain"
          />
          
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            {componentData.map(comp => {
              const isActive = activeComponentId === comp.id;
              return (
                <line
                  key={`line-${comp.id}`}
                  x1={comp.dotPosition.left}
                  y1={comp.dotPosition.top}
                  x2={comp.anchorOffset ? comp.anchorOffset.x : comp.labelPosition.left}
                  y2={comp.anchorOffset ? comp.anchorOffset.y : comp.labelPosition.top}
                  stroke={isActive ? '#e8b96a' : '#c9963a'}
                  strokeWidth={isActive ? '2' : '1'}
                  opacity={isActive ? 1 : 0.6}
                  className="transition-all duration-300"
                />
              );
            })}
          </svg>

          {componentData.map((comp) => {
            const isActive = activeComponentId === comp.id;
            return (
              <React.Fragment key={comp.id}>
                {/* Dot */}
                <div 
                  style={{ left: comp.dotPosition.left, top: comp.dotPosition.top }} 
                  className="absolute z-20 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                >
                  <button
                    onClick={() => toggleComponent(comp.id)}
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all shadow-[0_0_8px_rgba(201,150,58,0.8)] cursor-pointer hover:scale-125 pointer-events-auto ${isActive ? 'bg-[#e8b96a] ring-2 ring-[#e8b96a]' : 'bg-[#c9963a]'}`}
                    aria-label={`Select ${comp.title}`}
                  />
                </div>
                
                {/* Label Box */}
                <div
                  style={{ left: comp.labelPosition.left, top: comp.labelPosition.top }}
                  className="absolute z-20 -translate-y-1/2 pointer-events-none overflow-visible"
                >
                  <button
                    onClick={() => toggleComponent(comp.id)}
                    className={`px-3 py-1.5 md:px-4 md:py-2 bg-[#1e0f07] border ${isActive ? 'border-[#e8b96a] shadow-[0_0_12px_rgba(201,150,58,0.4)] text-[#e8b96a]' : 'border-[#4a2912] text-[#d4c0a8]'} hover:border-[#c9963a] hover:text-[#f0dfc4] hover:shadow-[0_0_12px_rgba(201,150,58,0.4)] transition-all font-['Jost',_sans-serif] text-[10px] md:text-sm uppercase tracking-[0.08em] whitespace-nowrap cursor-pointer pointer-events-auto`}
                  >
                    {comp.title}
                  </button>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* 2. Detail Panel */}
      <div 
        ref={panelRef}
        className="w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] -ml-6 md:-ml-12 min-h-[280px] bg-[#884828] border-b border-[#70391b] p-6 md:p-12 flex items-center justify-center transition-all duration-500 overflow-hidden"
      >
        {!activeData ? (
          <div className="text-center animate-[fadeInUp_0.6s_ease-out]">
            <h3 className="font-['Cormorant_Garamond',_serif] font-bold text-3xl md:text-5xl text-[#f0dfc4] mb-4">
              Click Any Label for Component Details
            </h3>
            <p className="font-['Jost',_sans-serif] text-[11px] uppercase tracking-[0.15em] font-semibold text-[#f0dfc4] opacity-90">
              Five key components · Optimised for Chiradzulu District, Malawi
            </p>
          </div>
        ) : (
          <div key={activeData.id} className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 lg:gap-10 animate-[fadeInUp_0.6s_ease-out] relative">
            
            {/* Close Button */}
            <button 
              onClick={() => setActiveComponentId(null)}
              className="absolute -top-2 -right-2 md:-top-6 md:-right-6 p-2 text-[#f0dfc4] opacity-50 hover:opacity-100 transition-opacity z-10"
              aria-label="Close panel"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
              </svg>
            </button>

            {/* Left Column: Identity & Specs */}
            <div className="w-full md:w-2/5 flex flex-col gap-6">
              <div>
                <div className="inline-block text-[#c9963a] font-['Jost',_sans-serif] text-[11px] uppercase tracking-[0.15em] font-semibold mb-3">
                  {activeData.tag}
                </div>
                <h4 className="font-['Cormorant_Garamond',_serif] font-bold text-3xl md:text-4xl lg:text-5xl text-[#f0dfc4] leading-tight mb-2">
                  {activeData.title}
                </h4>
                <p className="font-['Jost',_sans-serif] text-sm md:text-base text-[#f0dfc4] opacity-70">
                  {activeData.subtitle}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-auto">
                {activeData.specs.map((spec, i) => (
                  <div key={i} className="bg-[#9c5736] border border-[#70391b] p-4 flex flex-col justify-center">
                    <span className="font-['Jost',_sans-serif] text-[#f0dfc4] opacity-60 text-[10px] md:text-xs uppercase tracking-widest mb-1">
                      {spec.label}
                    </span>
                    <span className="font-['Cormorant_Garamond',_serif] font-bold text-xl md:text-2xl text-[#e8b96a]">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Description & Reasons */}
            <div className="w-full md:w-3/5">
              <div className="bg-[#9c5736] border border-[#70391b] p-6 md:p-8 h-full">
                <p className="font-['Jost',_sans-serif] text-base md:text-lg text-[#f0dfc4] leading-relaxed mb-8">
                  {activeData.description}
                </p>
                <ul className="space-y-4">
                  {activeData.reasons.map((reason, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#f0dfc4] font-['Jost',_sans-serif] text-sm md:text-base leading-relaxed">
                      <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#c9963a] flex items-center justify-center">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#884828" strokeWidth="3" className="w-3 h-3">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div className="opacity-90">
                        {formatReason(reason)}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};
