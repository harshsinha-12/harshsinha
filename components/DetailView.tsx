import React from "react";
import { motion } from "framer-motion";
import { PortfolioItem } from "../types";
import { ArrowLeft, ExternalLink, Github, Trophy } from "lucide-react";

interface DetailViewProps {
  item: PortfolioItem;
  onClose: () => void;
}

const DetailView: React.FC<DetailViewProps> = ({ item, onClose }) => {
  return (
    <motion.div
      initial={{ clipPath: "circle(0% at 90% 50%)", opacity: 0 }}
      animate={{ clipPath: "circle(150% at 90% 50%)", opacity: 1 }}
      exit={{ clipPath: "circle(0% at 50% 50%)", opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-0 z-40 flex overflow-hidden bg-white/90 backdrop-blur-xl ${item.colorTheme}`}
    >
      <div className="w-full h-full overflow-y-auto no-scrollbar relative">
        {/* Back Button */}
        <button
          onClick={onClose}
          className="fixed top-8 left-8 z-50 flex items-center space-x-2 text-slate-800 hover:opacity-60 transition-opacity mix-blend-multiply"
        >
          <div className="bg-white p-3 rounded-full shadow-lg border border-slate-100">
            <ArrowLeft size={24} />
          </div>
          <span className="font-medium tracking-wide">BACK TO ROAD</span>
        </button>

        <div className="container mx-auto px-6 py-32 md:py-40 min-h-screen flex flex-col md:flex-row gap-16">
          {/* Left: Content */}
          <div className="flex-1 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-8xl font-bold text-slate-900 tracking-tight mb-4">
                {item.title}
              </h1>
              <p className="text-2xl md:text-3xl font-light text-slate-500">
                {item.subtitle}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm uppercase tracking-widest border-t border-slate-200 pt-8"
            >
              {item.client && (
                <div>
                  <h3 className="text-slate-400 mb-1">Client</h3>
                  <p className="font-semibold text-slate-800">{item.client}</p>
                </div>
              )}
              {item.year && (
                <div>
                  <h3 className="text-slate-400 mb-1">Year</h3>
                  <p className="font-semibold text-slate-800">{item.year}</p>
                </div>
              )}
              {item.techStack && (
                <div className="col-span-2 md:col-span-1">
                  <h3 className="text-slate-400 mb-1">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {item.techStack.map((t) => (
                      <span key={t} className="font-semibold text-slate-800">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="prose prose-lg prose-slate font-light text-slate-600 leading-relaxed max-w-2xl"
            >
              <p>{item.description}</p>
            </motion.div>

            {item.bullets && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8 }}
                className="prose prose-lg prose-slate font-light text-slate-600 leading-relaxed max-w-2xl"
              >
                <ul className="list-disc pl-5 space-y-2">
                  {item.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            {item.stats && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="flex gap-8"
              >
                {item.stats.map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white p-6 rounded-lg shadow-sm border border-slate-100"
                  >
                    <Trophy className="text-yellow-500 mb-2" size={20} />
                    <div className="text-2xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="text-xs uppercase tracking-wider text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4 pt-8"
            >
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-700 transition-colors flex items-center gap-2"
                >
                  Visit Website <ExternalLink size={18} />
                </a>
              )}
              {item.github && (
                <a
                  href={item.github}
                  target="_blank"
                  rel="noreferrer"
                  className="px-8 py-4 border border-slate-300 text-slate-900 rounded-full font-medium hover:bg-slate-50 transition-colors flex items-center gap-2"
                >
                  GitHub <Github size={18} />
                </a>
              )}
            </motion.div>
          </div>

          {/* Right: Abstract Visuals */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            {/* Decorative abstract cards mimicking portfolio images */}
            <div className="w-full aspect-[4/5] bg-slate-200 rounded-2xl overflow-hidden relative shadow-inner">
              <div
                className={`absolute inset-0 opacity-30 ${item.colorTheme.replace(
                  "bg-",
                  "bg-gradient-to-tr from-transparent to-"
                )}`}
              />
              <div className="absolute bottom-8 left-8">
                <h4 className="text-6xl font-bold text-white opacity-50 mix-blend-overlay">
                  {item.title.substring(0, 2)}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DetailView;
