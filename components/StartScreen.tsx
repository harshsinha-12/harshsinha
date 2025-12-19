import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    // Delay the actual callback slightly to allow the ripple to expand
    setTimeout(() => {
      onStart();
    }, 800);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
        >
          {/* Main Container */}
          <div className="relative flex flex-col items-center justify-center">
            {/* Concentric Circles Container - Clicking this triggers enter */}
            <button
              onClick={handleEnter}
              className="group relative flex items-center justify-center w-64 h-64 outline-none"
              aria-label="Enter Site"
            >
              {/* Circle 1 (Outer) */}
              <div className="absolute inset-0 border border-neutral-300 rounded-full animate-[spin_10s_linear_infinite] group-hover:scale-105 transition-transform duration-700 opacity-60" />

              {/* Circle 2 (Middle) */}
              <div className="absolute w-48 h-48 border border-neutral-400 rounded-full animate-[spin_8s_linear_infinite_reverse] group-hover:scale-105 transition-transform duration-700 delay-75 opacity-70" />

              {/* Circle 3 (Inner) */}
              <div className="absolute w-32 h-32 border border-neutral-500 rounded-full group-hover:scale-95 transition-transform duration-500 opacity-80" />

              {/* Text */}
              <span className="relative z-10 text-neutral-800 text-sm tracking-[0.2em] font-light uppercase group-hover:tracking-[0.3em] transition-all duration-500">
                Enter
              </span>
            </button>

            {/* Name/Title - Similar to reference */}
            <div className="absolute -top-24 text-center">
              <h1 className="text-neutral-800 text-lg font-bold tracking-widest uppercase mb-2">
                Harsh Sinha
              </h1>
            </div>

            <div className="absolute -bottom-24 text-center">
              <p className="text-neutral-500 text-xs tracking-[0.2em] uppercase">
                AI × Product x Finance
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Ripple Expand Effect on Exit */}
      {isExiting && (
        <motion.div
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 50, opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="fixed inset-0 z-[90] bg-neutral-900 pointer-events-none origin-center rounded-full"
          style={{
            left: "50%",
            top: "50%",
            width: "100px",
            height: "100px",
            marginLeft: "-50px",
            marginTop: "-50px",
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default StartScreen;
