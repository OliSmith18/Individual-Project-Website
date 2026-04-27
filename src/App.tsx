import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Chart } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { SystemArchitecturePanel } from './components/SystemArchitecturePanel';
import { DemandCalculationFlow } from './components/DemandCalculationFlow';
import { DesignBasisCard } from './components/DesignBasisCard';
import { MalawiCaseStudy } from './components/MalawiCaseStudy';
import qrCodeImage from './components/qr-code.png';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const averageLinePlugin = {
  id: 'averageLine',
  afterDraw: (chart: any) => {
    const { ctx, chartArea: { top, bottom }, scales: { x } } = chart;
    const avgValue = 467.44; // Average of Leo, Lubi, Franklin, Pedrollo
    const xPos = x.getPixelForValue(avgValue);
    
    ctx.save();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#A82D21'; // Brick Red
    ctx.setLineDash([5, 5]);
    ctx.moveTo(xPos, top);
    ctx.lineTo(xPos, bottom);
    ctx.stroke();
    
    const centerY = top + (bottom - top) / 2;
    ctx.fillStyle = '#A82D21'; // Brick Red
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 12px "Courier New"';
    ctx.fillText('£467 Avg', xPos + 8, centerY);
    ctx.restore();
  }
};

const DemandChart = () => {
  const data = {
    labels: ['August', 'September', 'October', 'November'],
    datasets: [
      {
        type: 'bar' as const,
        label: 'Water Demand (m³/day)',
        data: [6.28, 13.2, 13.56, 8.98],
        backgroundColor: (ctx: any) => ctx.dataIndex === 2 ? '#DD4B3D' : '#CEA48E', // Cinnabar (Oct) / Light Bronze (Rest)
        yAxisID: 'y',
        order: 2,
      },
      {
        type: 'line' as const,
        label: 'Solar Availability (PSH)',
        data: [5.28, 6.19, 6.33, 6.19],
        borderColor: '#884828', // Saddle Brown
        backgroundColor: '#884828',
        borderWidth: 3,
        pointRadius: 6,
        yAxisID: 'y1',
        order: 1,
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        padding: { bottom: 40 },
        labels: { font: { family: 'Helvetica Neue', weight: 'bold' as const }, color: '#884828' }
      },
      title: { display: false },
      datalabels: {
        display: (context: any) => context.dataset.type === 'bar',
        formatter: (value: any, context: any) => ['1.19', '2.13', '2.14', '1.45'][context.dataIndex],
        align: 'top' as const,
        anchor: 'end' as const,
        offset: 8,
        font: { family: 'Courier New', weight: 'bold' as const, size: 14 },
        color: (ctx: any) => ctx.dataIndex === 2 ? '#DD4B3D' : '#884828', // Cinnabar (Oct) / Saddle Brown
      }
    },
    scales: {
      x: { 
        ticks: { font: { family: 'Courier New', weight: 'bold' as const }, color: '#A82D21' },
        grid: { display: false }
      },
      y: { 
        type: 'linear' as const, position: 'left' as const, min: 0, max: 20, 
        title: { display: true, text: 'Water Demand (m³/day)', font: { family: 'Helvetica Neue', weight: 'bold' as const, size: 12 }, color: '#884828' },
        ticks: { font: { family: 'Courier New' }, color: '#A82D21' },
        grid: { color: 'var(--color-border-divider)' }
      },
      y1: { 
        type: 'linear' as const, position: 'right' as const, min: 4, max: 10, 
        title: { display: true, text: 'Solar Availability (PSH h/day)', font: { family: 'Helvetica Neue', weight: 'bold' as const, size: 12 }, color: '#884828' },
        grid: { drawOnChartArea: false },
        ticks: { font: { family: 'Courier New' }, color: '#A82D21' }
      },
    }
  };

  return (
    <div className="h-[400px] w-full">
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

const TDHChart = () => {
  const data = {
    labels: ['Gravity circuit', 'Pump circuit'],
    datasets: [
      {
        label: 'Static Head',
        data: [1.5, 20.0],
        backgroundColor: '#884828', // Saddle Brown
      },
      {
        label: 'Elevation (2.4m)',
        data: [0, 2.4],
        backgroundColor: '#DD4B3D', // Cinnabar
      },
      {
        label: 'Disc / Screen Filter (0.3m)',
        data: [0.3, 0],
        backgroundColor: '#A82D21', // Brick Red
      },
      {
        label: 'Friction Losses',
        data: [0.524, 0.877],
        backgroundColor: '#CEA48E', // Light Bronze
      }
    ]
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      datalabels: { display: false },
      legend: {
        padding: { bottom: 40 },
        labels: { font: { family: 'Helvetica Neue', weight: 'bold' as const }, color: '#884828' }
      },
      title: { display: false }
    },
    scales: {
      x: { 
        stacked: true, min: 0, max: 25,
        ticks: { font: { family: 'Courier New', weight: 'bold' as const }, color: '#A82D21' },
        grid: { color: 'var(--color-border-divider)' }
      },
      y: { 
        stacked: true,
        ticks: { font: { family: 'Helvetica Neue', weight: 'bold' as const }, color: '#884828' },
        grid: { display: false }
      }
    }
  };

  return (
    <div className="h-[250px] w-full">
      <Bar data={data} options={options} />
    </div>
  );
};

const PumpCostChart = () => {
  const data = {
    labels: ['Kirloskar', 'Leo', 'Lubi', 'Franklin', 'Pedrollo'],
    datasets: [
      {
        label: 'Pump Cost (£)',
        data: [125.85, 156.10, 158.78, 356.75, 769.14],
        backgroundColor: (ctx: any) => ctx.dataIndex === 0 ? '#DD4B3D' : '#884828', // Cinnabar / Saddle Brown
      },
      {
        label: 'PV Cost (£)',
        data: [76.11, 76.11, 152.22, 76.11, 124.54],
        backgroundColor: (ctx: any) => ctx.dataIndex === 0 ? '#CEA48E' : '#A82D21', // Light Bronze / Brick Red
      }
    ]
  };

  const options = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        padding: { bottom: 60 },
        labels: { font: { family: 'Helvetica Neue', weight: 'bold' as const }, color: '#884828' }
      },
      datalabels: { 
        display: (ctx: any) => ctx.datasetIndex === 1 && ctx.dataIndex === 0,
        formatter: () => '56% less than the average of the 4 other competitors',
        anchor: 'end' as const,
        align: 'right' as const,
        color: '#884828',
        font: { family: 'Courier New', weight: 'bold' as const, size: 14 }
      },
      title: { display: false }
    },
    layout: { padding: { top: 40 } },
    scales: {
      x: {  
        stacked: true,
        max: 1400,
        ticks: { font: { family: 'Courier New', weight: 'bold' as const }, color: '#A82D21' },
        grid: { color: 'var(--color-border-divider)' },
      },
      y: { 
        stacked: true,
        ticks: { font: { family: 'Helvetica Neue', weight: 'bold' as const }, color: '#884828' },
        grid: { display: false }
      }
    }
  };

  return (
    <div className="h-[300px] w-full">
      <Bar data={data} options={options} plugins={[averageLinePlugin]} />
    </div>
  );
};

const AnimatedCounter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return <span ref={ref}>{count}</span>;
};

const SunMotif = ({ className }: { className?: string }) => {
  return (
    <svg className={className} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="sunGradient">
          <stop offset="0%" stopColor="var(--color-accent-light)"/>
          <stop offset="100%" stopColor="var(--color-bg-primary)" stopOpacity="0"/>
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="80" fill="url(#sunGradient)"/>
      <g stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.4">
        <circle cx="100" cy="100" r="40" fill="none"/>
        <circle cx="100" cy="100" r="60" fill="none"/>
        <line x1="100" y1="20" x2="100" y2="180"/>
        <line x1="20" y1="100" x2="180" y2="100"/>
        <line x1="43" y1="43" x2="157" y2="157"/>
        <line x1="43" y1="157" x2="157" y2="43"/>
      </g>
    </svg>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState("");

  const navLinks = [
    { id: 'problem', label: 'Problem' },
    { id: 'objective', label: 'Objective' },
    { id: 'design-basis', label: 'Design Basis' },
    { id: 'demand', label: 'Demand' },
    { id: 'architecture', label: 'Architecture' },
    { id: 'hydraulics', label: 'Hydraulics' },
    { id: 'pump-selection', label: 'Pump Selection' },
    { id: 'results', label: 'Results' },
    { id: 'about', label: 'About' },
  ];

  return (
    <div className="font-sans min-h-screen text-[var(--color-body-text)]">
      <div className="relative flex flex-col justify-between border-[12px] md:border-[20px] border-[var(--color-bg-secondary)] m-0 md:m-4 lg:m-8 p-6 md:p-12 min-h-screen md:min-h-[calc(100vh-2rem)] lg:min-h-[calc(100vh-4rem)] bg-[var(--color-bg-primary)] box-border">
        
        {/* Sun Motif */}
        <div className="absolute -top-10 -right-10 pointer-events-none z-0 opacity-80 mix-blend-multiply">
          <SunMotif className="w-[300px] h-[300px] md:w-[400px] md:h-[400px]" />
        </div>

        <div>
          {/* Header/Nav */}
          <header className="relative z-50 flex flex-col md:flex-row md:items-center justify-between pb-6 mb-10 border-b border-[var(--color-border-divider)] gap-4">
            <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-heading-primary)]">
              Foundation
            </div>
            
            <nav className="flex gap-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
              {navLinks.map((link) => (
                <a 
                  key={link.id} 
                  href={`#${link.id}`} 
                  className={`text-[10px] uppercase tracking-[0.1em] font-bold text-[var(--color-body-light)] no-underline px-2 py-1 border border-transparent transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] whitespace-nowrap focus:outline-none focus:border-[var(--color-accent)] focus:text-[var(--color-accent)] ${
                    activeSection === link.id ? 'border-[var(--color-accent)] text-[var(--color-accent)]' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </header>

          {/* Main Hero Content */}
          <main className="relative z-10 max-w-4xl">
            <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-accent)] mb-4">
              Case Study: Engineering Design
            </div>

            <h1 className="font-serif text-[40px] md:text-[56px] leading-[1.05] font-extrabold text-[var(--color-heading-primary)] max-w-[800px] tracking-tight">
              Solar-Powered Irrigation System<br />
              for Smallholder Agriculture<br />
              in <span className="text-[var(--color-accent)] italic font-serif">Malawi</span>
            </h1>

            <p className="text-lg text-[var(--color-body-light)] mt-6 leading-[1.5] max-w-[600px]">
              Addressing the dry-season food security risk for smallholder farming systems in Malawi through a representative design case.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-[var(--color-border-divider)]">
              <div className="flex flex-col gap-2 border-l-[4px] border-[var(--color-accent)] pl-5">
                <span className="font-mono text-3xl md:text-4xl font-black text-[var(--color-heading-primary)] tracking-tight">£201.96</span>
                <span className="text-xs lg:text-sm uppercase tracking-[0.2em] text-[var(--color-body-light)] font-bold">Total system cost</span>
              </div>
              <div className="flex flex-col gap-2 border-l-[4px] border-[var(--color-accent)] pl-5">
                <span className="font-mono text-3xl md:text-4xl font-black text-[var(--color-heading-primary)] tracking-tight">56%</span>
                <span className="text-xs lg:text-sm uppercase tracking-[0.2em] text-[var(--color-body-light)] font-bold">Cheaper than alternatives</span>
              </div>
              <div className="flex flex-col gap-2 border-l-[4px] border-[var(--color-accent)] pl-5">
                <span className="font-mono text-3xl md:text-4xl font-black text-[var(--color-heading-primary)] tracking-tight">16 m³/day</span>
                <span className="text-xs lg:text-sm uppercase tracking-[0.2em] text-[var(--color-body-light)] font-bold">Peak irrigation demand</span>
              </div>
            </div>

            <a 
              href="https://drive.google.com/uc?export=download&id=1gicH2MM8Rs99_n1LnDnWMZrYlsXVrbXu" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[var(--color-heading-primary)] text-white px-6 py-3 uppercase text-xs font-bold tracking-[0.1em] border-none cursor-pointer mt-8 transition-colors hover:bg-[var(--color-accent)] inline-block no-underline"
            >
              Download Full Report
            </a>
          </main>

          {/* Phase 2: Problem Context (Section 2) */}
          <section id="problem" className="relative z-10 mt-8 pt-8 border-t border-[var(--color-border-divider)] scroll-mt-[25vh]">
            <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-accent)] mb-4">Problem Context</div>
            <h2 className="font-serif text-[32px] md:text-[40px] font-bold text-[var(--color-heading-primary)] mb-12">Sub-Saharan crops are rain-dependent</h2>

            <div className="flex flex-col md:flex-row gap-16 items-start">
              <div className="w-full md:w-1/3 flex flex-col items-center">
                {/* 5% Animated Donut Chart */}
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-sm">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-border-divider)" strokeWidth="12" />
                    {/* Circumference = 2*PI*40 = 251.2. 5% of 251.2 = 12.56 */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--color-heading-primary)" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset={251.2 - 12.56} className="transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-mono text-5xl font-extrabold text-[var(--color-heading-primary)]"><AnimatedCounter target={5}/>%</span>
                  </div>
                </div>
                
                {/* Visual Attachment Line */}
                <div className="flex flex-col items-center mt-2">
                  <div className="w-px h-3 bg-[var(--color-heading-primary)] opacity-30"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-heading-primary)] opacity-40 -mt-0.5"></div>
                </div>

                <p className="text-center mt-1 font-black uppercase tracking-[0.15em] text-[11px] md:text-sm text-[var(--color-heading-primary)] leading-relaxed">
                  Sub-Saharan Crops<br/>Are Irrigated
                </p>
              </div>

              <div className="w-full md:w-2/3 space-y-6 text-lg text-[var(--color-body-light)] leading-[1.6]">
                <p>
                  Malawi's staple crop, rainfed maize is planted at the onset of the rainy season (November–December), harvested around April, and must sustain households through the dry season (May–October), until the following year's harvest.
                </p>
                <p>
                  <span className="font-bold text-[var(--color-heading-primary)]">This creates a structural food gap:</span> a survey of 324 households in Central Malawi reported a mean food supply duration of only 8.22 months, implying recurrent shortages during the pre-harvest period, particularly between January and March as household stocks are depleted.
                </p>

                {/* Removed SVG from here */}
              </div>
            </div>

            {/* Full-width Timeline Chart (Custom SVG) */}
            <div className="mt-8 w-full">
              <h3 className="font-serif text-[24px] md:text-[28px] font-bold text-[var(--color-heading-primary)] mb-6">Annual pre-harvest shortage</h3>
              <div className="w-full overflow-x-auto bg-[var(--color-bg-primary)] p-0 py-6 md:p-8 shadow-sm border border-[var(--color-border-divider)] pb-4 md:pb-8">
                <svg viewBox="-30 0 1060 220" className="w-full h-auto min-w-[550px] md:min-w-[700px]">
                  <defs>
                    <pattern id="hatch" patternUnits="userSpaceOnUse" width="10" height="10">
                      <path d="M-2,2 l4,-4 M0,10 l10,-10 M8,12 l4,-4" stroke="#DD4B3D" strokeWidth="1.5" opacity="0.4"/>
                    </pattern>
                  </defs>

                  {/* Rainy Season Bands */}
                  <rect x="0" y="50" width="166.6" height="130" fill="#884828" opacity="0.1" />
                  <rect x="666.6" y="50" width="333.4" height="130" fill="#884828" opacity="0.1" />
                  <text x="83.3" y="70" textAnchor="middle" className="font-sans font-bold text-[12px] uppercase tracking-widest fill-[var(--color-heading-primary)]" style={{textShadow: "0px 0px 4px var(--color-bg-primary)"}}>Rainy Season</text>
                  <text x="833.3" y="70" textAnchor="middle" className="font-sans font-bold text-[12px] uppercase tracking-widest fill-[var(--color-heading-primary)]" style={{textShadow: "0px 0px 4px var(--color-bg-primary)"}}>Rainy Season</text>

                  {/* Harvest Band */}
                  <rect x="83.3" y="50" width="166.7" height="130" fill="#884828" opacity="0.25" />
                  <text x="166.6" y="93" textAnchor="middle" className="font-sans font-bold text-[12px] uppercase tracking-widest fill-[var(--color-heading-primary)]">Harvest</text>

                  {/* Shortage Gap Zones */}
                  <rect x="0" y="50" width="83.3" height="130" fill="var(--color-accent)" opacity="0.1" />
                  <rect x="0" y="50" width="83.3" height="130" fill="url(#hatch)" />
                  
                  <rect x="833.3" y="50" width="166.7" height="130" fill="var(--color-accent)" opacity="0.1" />
                  <rect x="833.3" y="50" width="166.7" height="130" fill="url(#hatch)" />

                  {/* Food Supply Polygon */}
                  <polygon points="0,180 83.3,180 250,85 833.3,180 1000,180" fill="var(--color-heading-primary)" opacity="0.35" />
                  <text x="270" y="105" textAnchor="start" className="font-sans font-bold text-[12px] uppercase tracking-widest fill-[var(--color-heading-primary)] drop-shadow-sm">Food Supply</text>

                  {/* Bracket & Shortage Annotation */}
                  <text x="500" y="18" textAnchor="middle" className="font-sans font-bold text-[14px] uppercase tracking-[0.15em] fill-[var(--color-accent)]">Pre-harvest shortage: 3.78 months</text>
                  <path d="M 320 12 L 20 12 L 20 45" stroke="var(--color-accent)" strokeWidth="2" fill="none" />
                  <polygon points="16,42 24,42 20,48" fill="var(--color-accent)" />
                  
                  <path d="M 680 12 L 950 12 L 950 45" stroke="var(--color-accent)" strokeWidth="2" fill="none" />
                  <polygon points="946,42 954,42 950,48" fill="var(--color-accent)" />

                  {/* X Axis & Ticks */}
                  <line x1="0" y1="180" x2="1000" y2="180" stroke="var(--color-heading-primary)" strokeWidth="2" />
                  {[...Array(13)].map((_, i) => (
                    <line key={`line-${i}`} x1={i * 83.33} y1="180" x2={i * 83.33} y2="186" stroke="var(--color-heading-primary)" strokeWidth="1.5" />
                  ))}
                  
                  {/* Month Labels */}
                  {['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb'].map((m, i) => (
                    <text key={m} x={i * 83.33 + 41.66} y="206" textAnchor="middle" className="font-sans text-[14px] font-medium fill-[var(--color-body-light)]">{m}</text>
                  ))}
                </svg>
              </div>
            </div>
          </section>

          {/* Phase 2: Engineering Objective (Section 3) */}
          <section id="objective" className="relative z-10 mt-8 pt-8 border-t border-[var(--color-border-divider)] scroll-mt-[25vh]">
            <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-accent)] mb-4">Engineering Objective</div>
            
            <div className="relative my-20 max-w-4xl mx-auto px-4 sm:px-8">
              <div className="absolute -top-12 -left-2 sm:-left-6 text-[120px] md:text-[160px] text-[var(--color-accent)] opacity-20 font-serif leading-none select-none">
                &ldquo;
              </div>
              <p className="relative z-10 font-serif text-2xl md:text-3xl lg:text-4xl leading-[1.4] font-bold text-[var(--color-heading-primary)] text-center">
                Design a cost-optimised solar-powered irrigation system that reliably meets peak dry-season demand for a representative Malawian smallholder farm.
              </p>
              <div className="absolute -bottom-24 -right-2 sm:-right-6 text-[120px] md:text-[160px] text-[var(--color-accent)] opacity-20 font-serif leading-none select-none">
                &rdquo;
              </div>
            </div>

            {/* Pill Methodology Row */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-[var(--color-heading-primary)] mb-6">Methodology Stream</h3>
              <div className="flex flex-wrap items-center gap-y-4 font-mono text-[11px] md:text-xs font-bold uppercase tracking-widest">
                {['Agronomy', 'System Boundary Definition', 'System Architecture Selection', 'Hydraulics', 'Pump Selection', 'PV Sizing', 'Cost'].map((step, i) => (
                  <React.Fragment key={step}>
                    <div className="bg-[var(--color-heading-primary)] text-[var(--color-bg-primary)] px-4 py-3 shadow-sm border border-[var(--color-heading-primary)]">
                      {step}
                    </div>
                    {i < 6 && <div className="text-[var(--color-accent)] text-lg px-2 md:px-4">→</div>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </section>

          {/* Phase 2: Design Basis */}
          <section id="design-basis" className="relative z-10 mt-8 pt-8 border-t border-[var(--color-border-divider)] scroll-mt-[25vh]">
            <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-accent)] mb-4">DESIGN BASIS</div>
            
            <h2 className="font-serif text-[32px] md:text-[40px] font-bold text-[var(--color-heading-primary)] mb-6">
              The representative case
            </h2>

            <MalawiCaseStudy />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DesignBasisCard
                label="FUNCTIONAL UNIT"
                value="0.2 ha"
                description="Modelled as the average smallholder plot size for Chiradzulu District, Malawi."
                expandedDetail="240 cultivated fields were identified and digitised from satellite imagery using QGIS modelling across eight randomly sampled grid cells in Chiradzulu District. The dataset yielded a mean field area of 0.20 ha (median 0.17 ha, standard deviation 0.13 ha). The mean is adopted as the design basis as hydraulic demand and PV sizing scale directly with area. This value is independently confirmed by local field evidence reporting typical plot sizes of 0.1–0.3 ha."
                buttonLabel="Modelling details"
              />
              <DesignBasisCard
                label="GOVERNING CROP"
                value="Maize"
                description="Malawi's dominant smallholder staple crop, governing peak water demand."
                expandedDetail="Maize is selected as the governing crop due to its dominance in smallholder systems in Chiradzulu District. FAO standard crop parameters are applied: Kc initial 0.30, Kc mid-season 1.20–1.23, Kc end 0.35, total growing period 125 days. Planting date is optimised to align the mid-season growth stage — when crop coefficient and therefore water demand is highest — with October, the month of peak reference evapotranspiration. This maximises the governing demand and ensures the system is designed for the worst-case condition."
              />
              <DesignBasisCard
                label="WATER SOURCE"
                value="20 m borehole"
                description="Drilled borehole abstracting from the Precambrian basement aquifer."
                expandedDetail="Three source options were evaluated: surface water, shallow hand-dug wells, and drilled boreholes. Surface water was rejected due to seasonally reduced dry-season flows and siltation risk. Shallow wells were rejected due to dependence on seasonal recharge — the same dry-season reliability problem as surface water. Drilled boreholes accessing the weathered Precambrian basement aquifer provide reliable year-round abstraction at 10–20 m depth across Malawi's plateau regions. A conservative upper bound of 20 m static lift is adopted to ensure robust system performance under worst-case conditions."
              />
              <DesignBasisCard
                label="CLIMATE ASSUMPTION"
                value="Zero rainfall"
                description="A conservative design envelope simulating draught conditions."
                expandedDetail="Effective rainfall is set to zero across all months. This defines a worst-case irrigation demand scenario based solely on crop evaporative requirements with no rainfall contribution. Designing to this conservative envelope ensures the system performs reliably even in below-average rainfall years."
              />
            </div>
          </section>

          {/* Phase 3: Demand Calculation Flow (Standalone) */}
          <section id="agronomy" className="relative z-10 mt-12 scroll-mt-[25vh]">
            <div className="w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] -ml-6 md:-ml-12 px-6 md:px-12 py-10 md:py-16 bg-[var(--color-bg-secondary)] border-y border-[var(--color-border-divider)]">
              <div className="max-w-7xl mx-auto">
                <div className="flex flex-col items-start mb-8 md:mb-10">
                  <div className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[var(--color-accent)] mb-4">Agronomy</div>
                  <h2 className="font-serif text-[32px] md:text-[44px] font-bold text-[var(--color-heading-primary)] leading-tight">
                    Calculation Logic
                  </h2>
                </div>
                <DemandCalculationFlow />
              </div>
            </div>
          </section>

          {/* Phase 4: Demand Output */}
          <section id="demand" className="relative z-10 mt-12 scroll-mt-[25vh]">
            <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-accent)] mb-8">System Demand</div>
            
            <h2 className="font-serif text-[32px] md:text-[40px] font-bold text-[var(--color-heading-primary)] mb-8">Water Demand vs Solar Availability</h2>

            <div className="flex flex-col lg:flex-row gap-12">
              <div className="w-full lg:w-2/3 bg-[var(--color-bg-secondary)] border border-[var(--color-border-divider)] shadow-sm p-6 md:p-8">
                <div className="overflow-x-auto -mx-2">
                  <div className="min-w-[500px] w-full px-2">
                    <DemandChart />
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/3 flex flex-col justify-center">
                <div className="border-l-[4px] border-[var(--color-accent)] pl-6 py-2">
                  <p className="text-lg text-[var(--color-body-light)] leading-[1.6]">
                    <span className="font-bold text-[var(--color-heading-primary)]">October has the highest irrigation demand</span> of 13.6 m³/day (Net Volume), 2.14 m³/hour based on solar availability. 
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* New Section: System Architecture Selection */}
          <section id="architecture" className="relative z-10 mt-12 scroll-mt-[25vh]">
            <div className="w-[calc(100%+3rem)] md:w-[calc(100%+6rem)] -ml-6 md:-ml-12 px-6 md:px-12 py-10 bg-[var(--color-heading-primary)] border-y border-[var(--color-border-divider)]">
              <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-bg-secondary)] mb-4">Architecture</div>
              <h2 className="font-serif text-[32px] md:text-[40px] font-bold text-[var(--color-bg-secondary)] mb-8">System Architecture</h2>
              <p className="text-lg md:text-xl text-[var(--color-bg-primary)] opacity-90 leading-[1.6]">
                The elevated storage tank creates two independent hydraulic circuits — a pump circuit driving water from the borehole to the tank, and a gravity-fed irrigation circuit supplying the drip network. This decoupling eliminates the need for batteries, stabilises emitter pressure, and enables simple passive control.
              </p>
            </div>
            <SystemArchitecturePanel />
          </section>

          {/* Phase 3: Hydraulics Chart (Section 6) */}
          <section id="hydraulics" className="relative z-10 mt-8 pt-8 border-t border-[var(--color-border-divider)] scroll-mt-[25vh]">
            <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-accent)] mb-4">Hydraulics</div>
            <h2 className="font-serif text-[32px] md:text-[40px] font-bold text-[var(--color-heading-primary)] mb-12">TDH for each System</h2>

            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-divider)] shadow-sm p-6 md:p-8 mb-12">
              <div className="overflow-x-auto -mx-2">
                <div className="min-w-[600px] w-full px-2">
                  <TDHChart />
                </div>
              </div>
            </div>
          </section>

          {/* Phase 3: Pump Selection Chart (Section 7) */}
          <section id="pump-selection" className="relative z-10 mt-8 pt-8 border-t border-[var(--color-border-divider)] scroll-mt-[25vh]">
            <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-accent)] mb-4">Pump Selection</div>
            <h2 className="font-serif text-[32px] md:text-[40px] font-bold text-[var(--color-heading-primary)] mb-12">Pump & PV Array Cost Comparison</h2>

            <div className="bg-[#BD8C6C] border border-[#A67B5B] shadow-sm p-6 md:p-8">
              <div className="overflow-x-auto -mx-2">
                <div className="min-w-[800px] w-full px-2">
                  <PumpCostChart />
                </div>
              </div>
            </div>
          </section>

          {/* Phase 2: Results & Conclusion (Section 8) */}
          <section id="results" className="relative z-10 mt-8 pt-8 border-t border-[var(--color-border-divider)] scroll-mt-[25vh]">
            <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-accent)] mb-4">Results & Conclusion</div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-12 bg-[var(--color-bg-secondary)] p-8 md:p-12 border border-[var(--color-border-divider)] shadow-sm">
              <div>
                <div className="font-mono text-6xl md:text-7xl font-extrabold text-[var(--color-heading-primary)] mb-3">£201.96</div>
                <div className="text-xs uppercase tracking-widest font-bold text-[var(--color-body-light)] mb-10 border-b border-[var(--color-border-divider)] pb-6">
                  total electro-hydraulic subsystem cost
                </div>
                
                <div className="inline-block bg-[var(--color-accent)] text-white font-mono text-base md:text-lg lg:text-xl font-bold px-6 py-3 mb-12 shadow-sm">
                  56% less than the average of the 4 other competitors
                </div>
                
                <div className="border border-[var(--color-accent-light)] bg-yellow-50/50 p-6 relative">
                  <div className="absolute -top-3 left-4 bg-[var(--color-bg-primary)] px-3 text-[10px] uppercase tracking-widest font-bold text-[var(--color-accent)]">
                    Selected Configuration
                  </div>
                  <p className="text-[15px] leading-relaxed text-[var(--color-heading-primary)]">
                    <span className="font-bold text-lg">Kirloskar KS4BN-0506</span> submersible centrifugal pump
                  </p>
                  <p className="text-[13px] font-mono font-bold text-[var(--color-body-light)] mt-3">
                    + Paired with a single 510 Wp PV module
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <div className="space-y-6 text-[15px] text-[var(--color-body-light)] leading-relaxed">
                  <h3 className="font-serif text-2xl font-bold text-[var(--color-heading-primary)] pb-2">Core Conclusions</h3>
                  <ul className="space-y-4">
                    <li className="flex gap-4">
                      <span className="text-[var(--color-accent)] font-bold">01.</span>
                      <span>System cost is governed by discrete pump power class and photovoltaic module count thresholds, rather than continuous hydraulic variation.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-[var(--color-accent)] font-bold">02.</span>
                      <span>The selection remains robust to ±24% pump price variation and system efficiency uncertainty.</span>
                    </li>
                    <li className="flex gap-4">
                      <span className="text-[var(--color-accent)] font-bold">03.</span>
                      <span>The design and methodology can be replicated across similar smallholder contexts with comparable environments.</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-10 pt-6 border-t border-[var(--color-border-divider)] text-[11px] uppercase tracking-wider font-semibold text-[var(--color-body-light)] bg-gray-50 p-4">
                  <span className="text-[var(--color-heading-primary)] font-bold">Limitations Note:</span> Evaluation relies on steady-state assumptions (mean solar irradiance, fixed system efficiencies) and excludes broader infrastructure/installation costs.
                </div>
              </div>
            </div>
          </section>

          {/* Phase 2: About (Section 9) */}
          <section id="about" className="relative z-10 mt-8 mb-12 scroll-mt-[25vh]">
            <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-accent)] mb-4 hidden">Download</div>
            <div className="bg-[var(--color-bg-secondary)] p-8 md:p-12 border-2 border-[var(--color-heading-primary)] flex flex-col md:flex-row justify-between items-center gap-12 shadow-sm">
              <div className="space-y-5 text-center md:text-left">
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-heading-primary)]">Download Documentation</h3>
                <p className="text-[var(--color-body-light)] font-medium text-sm md:text-base max-w-md">Access the complete engineering methodology, data tables, and high-resolution design visuals.</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <a 
                    href="https://drive.google.com/uc?export=download&id=1gicH2MM8Rs99_n1LnDnWMZrYlsXVrbXu" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[var(--color-heading-primary)] text-[var(--color-bg-secondary)] px-6 py-4 uppercase text-xs font-bold tracking-[0.1em] text-center transition-colors hover:bg-[var(--color-accent)] no-underline"
                  >
                    Download Report (PDF)
                  </a>
                  <a 
                    href="https://drive.google.com/uc?export=download&id=1iokbGBiOiMbRgmHFTb-f6rMoIWEY29aL" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-[var(--color-heading-primary)] text-[var(--color-heading-primary)] px-6 py-4 uppercase text-xs font-bold tracking-[0.1em] text-center transition-colors hover:bg-[var(--color-heading-primary)] hover:text-white no-underline"
                  >
                    Download Poster (PNG)
                  </a>
                </div>
              </div>
              
              {/* Real QR Code */}
              <div className="flex flex-col items-center gap-4 shrink-0 bg-white p-6 border border-[var(--color-border-divider)]">
                <img 
                  src={qrCodeImage} 
                  alt="Project QR Code"
                  className="w-24 h-24"
                />
                <div className="text-[9px] uppercase font-bold tracking-[0.2em] text-[var(--color-body-light)] max-w-[120px] text-center">scan for sharable website link</div>
              </div>
            </div>
          </section>

        </div>

        {/* Footer */}
        <footer className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end pt-10 mt-16 border-t border-[var(--color-border-divider)] gap-4">
          <div className="text-xs text-[var(--color-body-light)] font-medium uppercase tracking-[0.1em]">
            Loughborough University
          </div>
          <div className="text-xs text-[var(--color-body-light)] font-medium">
            Oliver Smith &middot; Product Design Engineering
          </div>
        </footer>

      </div>
    </div>
  );
}
