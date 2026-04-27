import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface DesignBasisCardProps {
  label: string;
  value: string;
  description: string;
  expandedDetail: string;
  buttonLabel?: string;
}

export function DesignBasisCard({ label, value, description, expandedDetail, buttonLabel = "More detail" }: DesignBasisCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-[#BD8C6C] border border-[#BD8C6C] p-6 shadow-sm flex flex-col h-full">
      <div className="text-[11px] uppercase tracking-[0.15em] font-semibold text-[var(--color-bg-secondary)] mb-4">
        {label}
      </div>
      
      <div className="font-serif text-[32px] md:text-[40px] font-bold text-[var(--color-body-light)] mb-3 leading-tight">
        {value}
      </div>
      
      <p className="text-[var(--color-body)] leading-relaxed mb-6 flex-grow">
        {description}
      </p>
      
      <div>
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1.5 text-sm text-[var(--color-body-light)] hover:text-[var(--color-accent)] transition-colors focus:outline-none focus:text-[var(--color-accent)] group"
        >
          <span>{buttonLabel}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="bg-[var(--color-bg-primary)] border border-[var(--color-border-divider)] p-4 text-[var(--color-body)] text-sm leading-relaxed shadow-inner">
                {expandedDetail}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
