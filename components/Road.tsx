import React, { useRef, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { PortfolioItem, SectionType } from "../types";
import { ArrowRight, Box, User, Briefcase, Mail } from "lucide-react";

interface RoadProps {
  items: PortfolioItem[];
  onSelect: (item: PortfolioItem) => void;
  setScrollProgress: (progress: number) => void;
}

const Road: React.FC<RoadProps> = ({ items, onSelect, setScrollProgress }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: containerRef });

  // Smooth out the scroll progress reporting
  const smoothProgress = useSpring(scrollXProgress, {
    stiffness: 100,
    damping: 30,
  });

  useEffect(() => {
    return smoothProgress.onChange((v) => setScrollProgress(v));
  }, [smoothProgress, setScrollProgress]);

  // Handle horizontal scroll via vertical wheel for desktop ergonomics
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      // If we are scrolling vertically, translate to horizontal
      container.scrollLeft += e.deltaY;
      // prevent default browser back/forward history actions if touch pad
    };

    container.addEventListener("wheel", handleWheel, { passive: true }); // passive true for performance
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar scroll-smooth"
      style={{ cursor: "none" }} // Hide default cursor for custom one
    >
      <div className="flex items-center h-full px-[20vw] gap-[40vw]">
        {/* Intro Text - Not a clickable card, just visual anchor */}
        <div className="inline-block align-middle h-screen flex flex-col justify-center min-w-[50vw] pr-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center h-full whitespace-normal"
          >
            <h1 className="text-6xl md:text-8xl font-thin tracking-tighter text-slate-800 mb-6">
              Harsh Sinha
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light max-w-xl leading-relaxed">
              Building at the intersection of Finance, AI, and Engineering.
            </p>
            <div className="flex items-center mt-8 text-slate-400 animate-pulse">
              <span className="mr-4 text-sm tracking-widest uppercase">
                Scroll horizontally to explore
              </span>
              <ArrowRight size={20} />
            </div>
          </motion.div>
        </div>

        {items
          .filter((i) => i.type !== SectionType.INTRO)
          .map((item) => {
            if (item.type === SectionType.SECTION_HEADER) {
              return <SectionHeader key={item.id} item={item} />;
            }
            // Calculate index only among non-header items for the "01", "02" numbering
            const cardIndex = items
              .filter(
                (i) =>
                  i.type !== SectionType.INTRO &&
                  i.type !== SectionType.SECTION_HEADER
              )
              .findIndex((i) => i.id === item.id);

            return (
              <Flag
                key={item.id}
                item={item}
                index={cardIndex}
                onClick={() => onSelect(item)}
              />
            );
          })}

        {/* End Spacer */}
        <div className="w-[20vw] inline-block h-full"></div>
      </div>
    </div>
  );
};

interface FlagProps {
  item: PortfolioItem;
  index: number;
  onClick: () => void;
}

const Flag: React.FC<FlagProps> = ({ item, index, onClick }) => {
  const getIcon = () => {
    switch (item.type) {
      case SectionType.PROJECT:
        return <Box size={16} />;
      case SectionType.EXPERIENCE:
        return <Briefcase size={16} />;
      case SectionType.ABOUT:
        return <User size={16} />;
      case SectionType.CONTACT:
        return <Mail size={16} />;
      default:
        return <Box size={16} />;
    }
  };

  return (
    <div className="inline-block h-full align-middle relative group perspective-1000">
      <div className="flex flex-col h-full justify-center items-start relative">
        {/* Vertical Line Anchor */}
        <div className="absolute left-6 top-1/2 w-[1px] h-[30vh] bg-slate-300 origin-top transform -translate-y-1/2 scale-y-0 group-hover:scale-y-100 transition-transform duration-700 delay-100 ease-out" />

        <div className="relative">
          {/* Decorative Number */}
          <span className="absolute -top-40 -left-6 text-[10rem] font-bold text-slate-900/5 select-none pointer-events-none z-0 leading-none">
            0{index + 1}
          </span>

          {/* The Card */}
          <motion.button
            onClick={onClick}
            initial={{ opacity: 0.5, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotateY: 5, x: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative z-10 text-left bg-white/40 backdrop-blur-md border border-white/50 p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 w-[400px] whitespace-normal"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400 bg-white/60 px-2 py-1 rounded">
                {item.type}
              </span>
              <span className="text-slate-400">{getIcon()}</span>
            </div>

            <h2 className="text-3xl font-medium text-slate-800 mb-2">
              {item.title}
            </h2>
            <p className="text-lg text-slate-600 font-light mb-4">
              {item.subtitle}
            </p>

            <div className="h-[1px] w-12 bg-slate-800/20 mb-4 group-hover:w-full transition-all duration-500" />

            <p className="text-sm text-slate-500 font-light leading-relaxed">
              {item.shortDescription}
            </p>

            <div className="mt-6 flex items-center text-xs font-medium text-slate-400 group-hover:text-slate-800 transition-colors">
              VIEW CASE STUDY{" "}
              <ArrowRight
                size={12}
                className="ml-2 group-hover:translate-x-1 transition-transform"
              />
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

const SectionHeader: React.FC<{ item: PortfolioItem }> = ({ item }) => {
  return (
    <div
      className={`inline-flex h-full items-center justify-center min-w-[80vw] relative overflow-hidden ${
        item.colorTheme || ""
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-[90%]"
      >
        <h2
          className={`text-[10vw] font-black uppercase tracking-widest select-none whitespace-pre leading-none ${
            item.accentClass || "text-slate-900/10"
          }`}
          style={{ opacity: 0.5 }}
        >
          {item.title}
        </h2>
      </motion.div>
    </div>
  );
};

export default Road;
