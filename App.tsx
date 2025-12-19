import React, { useState, useEffect } from "react";
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
import { useAudio } from "./hooks/useAudio";
import StartScreen from "./components/StartScreen";

const App: React.FC = () => {
  const { playClick } = useAudio();
  const [activeItem, setActiveItem] = useState<PortfolioItem | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.ROAD);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Background Music State
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  React.useEffect(() => {
    // Only attempt playback if already started (e.g. persistent state) or rely on StartScreen
    if (hasStarted && audioRef.current) {
      audioRef.current.play().catch((e) => console.log("Playback failed:", e));
    }
  }, [hasStarted]);

  useEffect(() => {
    const handleClick = () => {
      playClick();
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [playClick]);

  const handleStart = () => {
    setHasStarted(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current
        .play()
        .then(() => {
          setIsMusicPlaying(true);
        })
        .catch((err) => {
          console.error("Audio play failed on start:", err);
        });
    }
  };

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

      {/* Start Screen Overlay */}
      {!hasStarted && <StartScreen onStart={handleStart} />}

      {/* Background 3D Scene */}
      <Scene color={blobColor} scrollProgress={scrollProgress} />

      {/* Main UI Overlay - visible only after start */}
      {hasStarted && (
        <UIOverlay
          activeItem={activeItem}
          viewMode={viewMode}
          setViewMode={setViewMode}
          isMusicPlaying={isMusicPlaying}
          toggleMusic={toggleMusic}
        />
      )}

      {/* Persistent Audio Element */}
      {/* <audio ref={audioRef} src="/background-music.mp3" loop /> */}
      <audio ref={audioRef} src="/Interstellar Main Theme - Hans Zimmer (1).mp3" loop />

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
