import React from "react";
import { motion } from "framer-motion";
import { PortfolioItem, SectionType } from "../types";
import { ArrowUpRight } from "lucide-react";

interface ListViewProps {
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem) => void;
}

const ListView: React.FC<ListViewProps> = ({ items, onSelect }) => {
  const displayItems = items.filter(
    (item) =>
      item.type !== SectionType.INTRO &&
      item.type !== SectionType.SECTION_HEADER
  );

  return (
    <div className="absolute inset-0 overflow-y-auto no-scrollbar pt-32 pb-20 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-light text-slate-800 mb-16 tracking-tight"
        >
          Index
        </motion.h2>

        <div className="w-full">
          {/* Header */}
          <div className="grid grid-cols-12 gap-4 pb-4 border-b border-slate-300 text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">
            <div className="col-span-4 md:col-span-5">Project</div>
            <div className="col-span-2 hidden md:block">Year</div>
            <div className="col-span-3 hidden md:block">Client</div>
            <div className="col-span-4 md:col-span-2 text-right">Type</div>
          </div>

          {/* Rows */}
          {displayItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onSelect(item)}
              className="group grid grid-cols-12 gap-4 py-8 border-b border-slate-200 items-baseline cursor-pointer transition-colors hover:bg-white/40 px-2 -mx-2 rounded-lg"
            >
              <div className="col-span-4 md:col-span-5">
                <h3 className="text-xl md:text-3xl font-light text-slate-800 group-hover:translate-x-2 transition-transform duration-300 flex items-center gap-2">
                  {item.title}
                  <ArrowUpRight
                    size={16}
                    className="opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all text-slate-400"
                  />
                </h3>
              </div>
              <div className="col-span-2 hidden md:block text-slate-500 font-mono text-sm">
                {item.year || "—"}
              </div>
              <div className="col-span-3 hidden md:block text-slate-500 text-sm">
                {item.client || "—"}
              </div>
              <div className="col-span-4 md:col-span-2 text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border ${
                    item.type === SectionType.PROJECT
                      ? "border-blue-200 text-blue-600 bg-blue-50"
                      : item.type === SectionType.EXPERIENCE
                      ? "border-purple-200 text-purple-600 bg-purple-50"
                      : "border-slate-200 text-slate-500"
                  }`}
                >
                  {item.type}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListView;
