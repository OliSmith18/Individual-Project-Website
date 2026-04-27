import React, { useEffect, useRef } from 'react';

export function MalawiCaseStudy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2, // Trigger when 20% of the section is visible
    };

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger animations
          if (leftColRef.current) {
            leftColRef.current.style.opacity = '1';
            leftColRef.current.style.transform = 'translateX(0)';
          }
          if (rightColRef.current) {
            rightColRef.current.style.opacity = '1';
            rightColRef.current.style.transform = 'translateX(0)';
          }
          // Unobserve once animated
          if (sectionRef.current) {
            observer.unobserve(sectionRef.current);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className="max-w-[900px] mx-auto flex flex-col md:flex-row gap-12 items-center mb-16 overflow-hidden"
    >
      {/* SVG Filter Definition for the Map */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <filter id="malawi-palette-filter">
          {/* 
            This feColorMatrix remaps the typical map colors (red, blue, pink, white) 
            into our poster palette while maintaining Chriadulu's prominence.
          */}
          <feColorMatrix
            type="matrix"
            values="
              0.8   0.1   0.1   0   0
              0.2   0.7   0.1   0   0
              0.1   0.1   0.6   0   0
              0     0     0     1   0
            "
          />
        </filter>
      </svg>

      {/* Left Column: Map */}
      <div 
        ref={leftColRef}
        className="w-full md:w-1/2 flex flex-col items-center justify-center opacity-0 transition-all duration-700 ease-out bg-transparent"
        style={{ transform: 'translateX(-40px)' }}
      >
        <svg viewBox="0 0 160 480" className="max-h-[480px] w-auto drop-shadow-md" style={{ mixBlendMode: 'multiply' }}> <path d="M113.441,152.848L95.728,153.736L93.582,165.869L84.477,179.694L83.186,184.54L90.146,209.297L92.865,233.276L92.665,241.759L97.387,250.245L109.964,252.405L119.361,261.046L137.775,283.136L141.099,289.565L157.46,310.275L160,321.518L154.065,337.336L156.84,348.74L154.618,378.993L149.758,384.279L133.755,386.006L128.015,392.742L125.818,403.726L121.732,406.488L128.978,414.921L130.565,422.676L129.659,437.117L119.222,436.844L117.005,432.274L120.815,428.355L119.939,420.953L115.417,420.814L91.646,394.251L84.733,388.352L84.856,380.645L77.2,373.06L77.891,368.131L85.665,360.55L85.967,352.034L93.843,341.237L94.591,326.521L90.509,305.575L82.695,295.939L60.142,301.094L51.793,301.174L48.049,306.909L37.859,295.595L30.495,284.155L29.983,279.245L23.756,272.901L16.09,278.717L14.922,273.307L6.575,260.788L0,257.162L6.836,252.073L15.854,234.893L16.348,219.742L14.021,211.218L18.553,204.191L24.176,205.896L34.592,200.723L42.14,191.426L35.155,191.667L28.621,181.501L31.591,169.302L31.094,154.677L26.634,152.356L27.509,144.91L35.467,132.189L31.145,125.614L31.908,114.693L37.603,114.187L49.504,102.534L43.804,93.832L42.521,85.113L31.832,77.606L34.213,68.387L26.836,59.75L24.79,53.48L20.084,56.492L14.845,53.428L15.716,42.883L24.667,48.894L30.976,47.949L36.128,53.61L52.497,52.566L61.279,59.292L66.277,47.207L79.919,58.814L89.593,70.768L94.647,88.61L94.437,100.654L99.092,111.377L95.026,124.685L103.26,140.914L109.574,142.831ZM100.039,174.453ZM93.474,173.348Z" fill="#BD8C6C" stroke="var(--color-heading-primary)" strokeWidth="1.5" strokeLinejoin="round" /> <g transform="translate(123.3, 362.7)"><circle cx="0" cy="0" r="4" fill="none" stroke="var(--color-accent)" strokeWidth="3" className="animate-ping opacity-75" /><path d="M 0 0 C -4 -6 -8 -10 -8 -15 A 8 8 0 1 1 8 -15 C 8 -10 4 -6 0 0 Z" fill="var(--color-accent)" /><circle cx="0" cy="-15" r="3" fill="var(--color-bg-primary)" /></g></svg>
        <div className="text-[10px] text-center uppercase tracking-[0.2em] font-semibold text-[var(--color-body-light)] mt-4">
          Chiradzulu District, Southern Malawi
        </div>
      </div>

      {/* Right Column: Text */}
      <div 
        ref={rightColRef}
        className="w-full md:w-1/2 flex flex-col opacity-0 transition-all duration-700 ease-out"
        style={{ transform: 'translateX(40px)' }}
      >
        <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-accent)] mb-4">
          STUDY LOCATION
        </div>
        
        <p className="text-[18px] text-[var(--color-body-text)] leading-[1.7] mb-8">
          Chiradzulu District in southern Malawi was selected as the representative case for this study. A rural plateau region with no grid electricity and a population dependent on smallholder rainfed agriculture, it embodies the structural conditions that make solar-powered irrigation both necessary and viable. Groundwater from the weathered Precambrian basement aquifer provides reliable dry-season abstraction at depths of 10 to 20 metres — the critical water source that makes the system feasible where surface water and shallow wells fail seasonally.
        </p>

        <div className="flex flex-row gap-4">
          {/* Pill 1 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] uppercase tracking-wider text-[var(--color-body-light)] font-bold ml-1">
              Coordinates
            </span>
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-divider)] rounded-full px-4 py-1.5 text-sm font-mono text-[var(--color-heading-primary)] whitespace-nowrap">
              −15.78° N 35.03° E
            </div>
          </div>

          {/* Pill 2 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[9px] uppercase tracking-wider text-[var(--color-body-light)] font-bold ml-1">
              District Area
            </span>
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-divider)] rounded-full px-4 py-1.5 text-sm font-mono text-[var(--color-heading-primary)] whitespace-nowrap">
              ~767 km²
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
