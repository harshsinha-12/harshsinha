import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { PORTFOLIO_ITEMS } from "./constants";
import { PortfolioItem, ViewMode } from "./types";
import Scene from "./components/Scene";
import Road from "./components/Road";
import Overview from "./components/Overview";
import ListView from "./components/ListView";
import DetailView from "./components/DetailView";
import UIOverlay from "./components/UIOverlay";
import CustomCursor from "./components/CustomCursor";

const App: React.FC = () => {
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.ROAD);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Background Music State
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);

  React.useEffect(() => {
    // Define interaction handler for fallback
    const enableAudio = async () => {
      if (audioRef.current && audioRef.current.paused) {
        try {
          await audioRef.current.play();
          setIsMusicPlaying(true);
          // Remove listeners once successful
          document.removeEventListener("click", enableAudio);
          document.removeEventListener("touchstart", enableAudio);
          document.removeEventListener("keydown", enableAudio);
        } catch (e) {
          console.error("Interaction play failed", e);
        }
      }
    };

    const play = async () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.4;
        try {
          await audioRef.current.play();
          // State is already true, but confirm it stays true
          setIsMusicPlaying(true);
        } catch {
          console.log("Autoplay blocked");
          // Revert state if blocked
          setIsMusicPlaying(false);

          // Add listeners for next interaction
          document.addEventListener("click", enableAudio);
          document.addEventListener("touchstart", enableAudio);
          document.addEventListener("keydown", enableAudio);
        }
      }
    };

    play();

    // Proper cleanup on unmount
    return () => {
      document.removeEventListener("click", enableAudio);
      document.removeEventListener("touchstart", enableAudio);
      document.removeEventListener("keydown", enableAudio);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.play();
        setIsMusicPlaying(true);
      }
    }
  };

  // Dynamic background color derived from active item or scroll progress
  const blobColor = React.useMemo(() => {
    if (activeItem) {
      // Extract color from tailwind class roughly
      if (activeItem.colorTheme.includes("blue")) return "#93c5fd";
      if (activeItem.colorTheme.includes("purple")) return "#d8b4fe";
      if (activeItem.colorTheme.includes("green")) return "#86efac";
      if (activeItem.colorTheme.includes("orange")) return "#fdba74";
      if (activeItem.colorTheme.includes("red")) return "#fca5a5";
      return "#cbd5e1";
    } else {
      // Gradient logic based on scroll progress (0 to 1)
      // 0 = blue, 0.5 = purple, 1 = green
      if (scrollProgress < 0.3) return "#bfdbfe"; // blue-200
      if (scrollProgress < 0.6) return "#e9d5ff"; // purple-200
      return "#bbf7d0"; // green-200
    }
  }, [scrollProgress, activeItem]);

  return (
    <>
      <div className="grain-overlay" />
      <CustomCursor />

      {/* Background 3D Scene */}
      <Scene color={blobColor} scrollProgress={scrollProgress} />

      {/* Main UI Overlay */}
      <UIOverlay
        activeItem={activeItem}
        viewMode={viewMode}
        setViewMode={setViewMode}
        isMusicPlaying={isMusicPlaying}
        toggleMusic={toggleMusic}
      />

      {/* Persistent Audio Element */}
      <audio ref={audioRef} src="/background-music.mp3" loop />

      {/* Content Views */}
      <AnimatePresence mode="wait">
        {!activeItem && viewMode === ViewMode.ROAD && (
          <Road
            key="road"
            items={PORTFOLIO_ITEMS}
            onSelect={setActiveItem}
            setScrollProgress={setScrollProgress}
          />
        )}

        {!activeItem && viewMode === ViewMode.OVERVIEW && (
          <Overview
            key="overview"
            items={PORTFOLIO_ITEMS}
            onSelect={setActiveItem}
          />
        )}

        {!activeItem && viewMode === ViewMode.LIST && (
          <ListView
            key="list"
            items={PORTFOLIO_ITEMS}
            onSelect={setActiveItem}
          />
        )}
      </AnimatePresence>

      {/* Detailed View Modal - Overlays everything */}
      <AnimatePresence>
        {activeItem && (
          <DetailView item={activeItem} onClose={() => setActiveItem(null)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
