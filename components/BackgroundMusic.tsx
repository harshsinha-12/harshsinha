import React from "react";

interface BackgroundMusicProps {
  isPlaying: boolean;
  onToggle: () => void;
}

const BackgroundMusic: React.FC<BackgroundMusicProps> = ({
  isPlaying,
  onToggle,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onToggle}
        className="group relative flex items-center justify-center gap-[3px] h-8 px-2 cursor-pointer hover:opacity-80 transition-opacity"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {/* Visualizer Bars */}
        {[1, 2, 3, 4, 5].map((bar, index) => (
          <div
            key={bar}
            className={`w-[3px] bg-slate-400 rounded-full transition-all duration-300 group-hover:bg-slate-800 ${
              isPlaying ? "animate-music-bar" : "h-[3px]"
            }`}
            style={{
              height: isPlaying ? undefined : "4px",
              animationDelay: isPlaying
                ? `${[0.2, 0.5, 0.1, 0.4, 0.3][index]}s`
                : "0s",
            }}
          />
        ))}
      </button>

      <style>{`
        @keyframes music-bar {
          0%, 100% { height: 4px; }
          50% { height: 16px; }
        }
        .animate-music-bar {
          animation: music-bar 0.8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default BackgroundMusic;
