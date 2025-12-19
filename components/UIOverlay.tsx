import React from "react";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { PortfolioItem, ViewMode } from "../types";
import BackgroundMusic from "./BackgroundMusic";

interface UIOverlayProps {
  activeItem: PortfolioItem | null;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  isMusicPlaying: boolean;
  toggleMusic: () => void;
}

const UIOverlay: React.FC<UIOverlayProps> = ({
  activeItem,
  viewMode,
  setViewMode,
  isMusicPlaying,
  toggleMusic,
}) => {
  // If we are in detail view, hide some UI elements to avoid clutter
  if (activeItem) return null;

  const isActive = (mode: ViewMode) =>
    viewMode === mode
      ? "text-slate-900 border-b border-slate-900"
      : "text-slate-400 hover:text-slate-800 opacity-60 hover:opacity-100";

  return (
    <div className="fixed inset-0 pointer-events-none z-30">
      {/* Top Left Logo */}
      <div
        className="absolute top-8 left-8 pointer-events-auto cursor-pointer"
        onClick={() => setViewMode(ViewMode.ROAD)}
      >
        <div className="flex flex-col">
          <span className="font-bold text-xl tracking-tighter text-slate-800">
            HARSH SINHA
          </span>
          <span className="text-xs text-slate-400 font-mono">
            PORTFOLIO '25
          </span>
        </div>
      </div>

      {/* Top Right Navigation */}
      <div className="absolute top-8 right-8 pointer-events-auto flex gap-6 text-sm font-medium transition-all">
        <button
          onClick={() => setViewMode(ViewMode.ROAD)}
          className={`${isActive(ViewMode.ROAD)} transition-all pb-1`}
        >
          ROAD
        </button>
        <button
          onClick={() => setViewMode(ViewMode.OVERVIEW)}
          className={`${isActive(ViewMode.OVERVIEW)} transition-all pb-1`}
        >
          OVERVIEW
        </button>
        <button
          onClick={() => setViewMode(ViewMode.LIST)}
          className={`${isActive(ViewMode.LIST)} transition-all pb-1`}
        >
          LIST
        </button>
      </div>

      {/* Bottom Right Socials */}
      <div className="absolute bottom-8 right-8 pointer-events-auto flex items-center gap-4 text-slate-400">
        {/* Background Music Visualizer */}
        <BackgroundMusic isPlaying={isMusicPlaying} onToggle={toggleMusic} />
        <div className="w-px h-6 bg-slate-300 mx-2" /> {/* Divider */}
        <a
          href="https://github.com/harshsinha-12"
          target="_blank"
          rel="noreferrer"
          className="hover:text-slate-800 transition-colors hover:scale-110 transform duration-200"
        >
          <Github size={20} />
        </a>
        <a
          href="https://linkedin.com/in/harshsinha12"
          target="_blank"
          rel="noreferrer"
          className="hover:text-slate-800 transition-colors hover:scale-110 transform duration-200"
        >
          <Linkedin size={20} />
        </a>
        <a
          href="mailto:sinha.harshsep@gmail.com"
          className="hover:text-slate-800 transition-colors hover:scale-110 transform duration-200"
        >
          <Mail size={20} />
        </a>
        <a
          href="#"
          className="hover:text-slate-800 transition-colors hover:scale-110 transform duration-200"
        >
          <Twitter size={20} />
        </a>
      </div>

      {/* Bottom Left Instructions - Only show on ROAD view */}
      {viewMode === ViewMode.ROAD && (
        <div className="hidden md:block absolute bottom-8 left-8 text-xs text-slate-400 max-w-[200px] leading-relaxed opacity-60">
          <div className="flex gap-1 mb-2">
            <div className="w-2 h-2 rounded-full bg-slate-300"></div>
            <div className="w-2 h-2 rounded-full border border-slate-300"></div>
            <div className="w-2 h-2 rounded-full border border-slate-300"></div>
          </div>
          Scroll horizontally to navigate the path. Click markers for details.
        </div>
      )}
    </div>
  );
};

export default UIOverlay;
