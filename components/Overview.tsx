import React from 'react';
import { motion } from 'framer-motion';
import { PortfolioItem, SectionType } from '../types';
import { ArrowRight } from 'lucide-react';

interface OverviewProps {
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem) => void;
}

const Overview: React.FC<OverviewProps> = ({ items, onSelect }) => {
  // Filter out INTRO, only show relevant sections
  const displayItems = items.filter(item => item.type !== SectionType.INTRO);

  return (
    <div className="absolute inset-0 overflow-y-auto no-scrollbar pt-32 pb-20 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-light text-slate-800 mb-12 tracking-tight"
        >
          Selected Works
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onSelect(item)}
              className="group cursor-pointer perspective-1000"
            >
              <div className="relative bg-white/40 backdrop-blur-sm border border-white/60 rounded-xl p-8 h-[350px] flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:bg-white/60">
                {/* Background Gradient Hint */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl ${item.colorTheme.replace('bg-', 'bg-gradient-to-br from-transparent to-')}`} />

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                     <span className="text-[10px] font-bold tracking-widest uppercase text-slate-400 border border-slate-200 px-2 py-1 rounded">
                        {item.type}
                     </span>
                     <span className="text-xs font-mono text-slate-300">0{index + 1}</span>
                  </div>
                  
                  <h3 className="text-2xl font-medium text-slate-800 mb-2 group-hover:text-black transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 font-light text-sm">
                    {item.subtitle}
                  </p>
                </div>

                <div className="relative z-10">
                   <div className="h-[1px] w-full bg-slate-200 mb-6 origin-left transform scale-x-100 group-hover:scale-x-0 transition-transform duration-500" />
                   
                   <p className="text-sm text-slate-500 mb-6 line-clamp-3">
                     {item.shortDescription}
                   </p>

                   <div className="flex items-center text-xs font-bold tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                      EXPLORE <ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;