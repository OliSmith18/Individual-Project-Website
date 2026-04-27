import React from 'react';
import { CloudSun, Leaf, Droplets, Map, Waves } from 'lucide-react';

export const DemandCalculationFlow = () => {
  const StepCard = ({ icon: Icon, title, variant = 'default' }: any) => {
    let cardStyle = '';
    let iconStyle = '';
    let textStyle = '';

    if (variant === 'highlight') {
      cardStyle = 'bg-[var(--color-heading-primary)] border-[var(--color-heading-primary)] text-white drop-shadow-md';
      iconStyle = 'text-white';
      textStyle = 'text-white';
    } else if (variant === 'mid') {
      cardStyle = 'bg-[#BD8C6C] border-[#BD8C6C] text-[var(--color-heading-primary)] drop-shadow-sm';
      iconStyle = 'text-[var(--color-heading-primary)]';
      textStyle = 'text-[var(--color-heading-primary)]';
    } else {
      cardStyle = 'bg-[var(--color-bg-primary)] border-[var(--color-border-divider)] text-[var(--color-heading-primary)]';
      iconStyle = 'text-[var(--color-accent)]';
      textStyle = '';
    }

    return (
      <div className={`flex flex-col items-center justify-center p-4 h-36 w-full max-w-[200px] md:h-auto md:w-full md:flex-1 md:aspect-square md:max-w-[220px] rounded-sm border shadow-sm transition-all ${cardStyle}`}>
        <Icon className={`mb-3 md:mb-4 ${iconStyle}`} size={42} strokeWidth={2} />
        <span className={`font-serif font-black text-sm md:text-base uppercase tracking-widest text-center leading-snug ${textStyle}`}>
          {title}
        </span>
      </div>
    );
  };

  const Operator = ({ symbol }: { symbol: string }) => (
    <div className="font-mono text-4xl md:text-5xl font-medium text-[var(--color-body-light)] flex items-center justify-center shrink-0 w-full md:w-16 py-1 md:py-0">
      {symbol}
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-16 md:gap-12 max-w-6xl mx-auto px-4">
      {/* Row 1 */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-4">
        <StepCard icon={CloudSun} title="Weather" />
        <Operator symbol="+" />
        <StepCard icon={Leaf} title="Crop type" />
        <Operator symbol="=" />
        <StepCard icon={Droplets} title="Water needed per m²" variant="mid" />
      </div>

      {/* Mobile visually breaking sequence divider */}
      <div className="block md:hidden w-1/3 mx-auto border-t-[3px] border-dotted border-[var(--color-border-divider)] -my-2"></div>

      {/* Row 2 */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-2 md:gap-4">
        <StepCard icon={Droplets} title="Water needed per m²" variant="mid" />
        <Operator symbol="×" />
        <StepCard icon={Map} title="Field size" />
        <Operator symbol="=" />
        <StepCard icon={Waves} title="Total water needed" variant="highlight" />
      </div>
    </div>
  );
};
