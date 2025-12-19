import { useCallback, useEffect, useRef } from "react";

export const useAudio = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize AudioContext on first user interaction if needed,
    // but here we just prepare it.
    // Modern browsers require user interaction to resume AudioContext.
    const AudioContextClass =
      window.AudioContext ||
      (
        window as unknown as Window & {
          webkitAudioContext: typeof AudioContext;
        }
      ).webkitAudioContext;
    if (AudioContextClass) {
      audioContextRef.current = new AudioContextClass();
    }

    return () => {
      if (
        audioContextRef.current &&
        audioContextRef.current.state !== "closed"
      ) {
        audioContextRef.current.close().catch(console.error);
      }
    };
  }, []);

  const playClick = useCallback((variant: keyof typeof PRESETS = "thud") => {
    if (!audioContextRef.current) return;

    // Resume context if suspended (common in browsers)
    if (audioContextRef.current.state === "suspended") {
      audioContextRef.current.resume().catch(console.error);
    }

    const ctx = audioContextRef.current;
    const config = PRESETS[variant] || PRESETS.classic;

    // Create oscillator
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.type = config.type;

    const now = ctx.currentTime;

    // Frequency Envelope
    osc.frequency.setValueAtTime(config.frequencyStart, now);
    if (config.frequencyEnd) {
      if (config.frequencyDuration) {
        osc.frequency.exponentialRampToValueAtTime(
          config.frequencyEnd,
          now + config.frequencyDuration
        );
      } else {
        osc.frequency.exponentialRampToValueAtTime(
          config.frequencyEnd,
          now + config.attackDuration + config.decayDuration
        );
      }
    }

    // Gain Envelope
    gainNode.gain.setValueAtTime(config.gainStart || 0, now);
    gainNode.gain.linearRampToValueAtTime(
      config.configGainPeak || 0.15,
      now + config.attackDuration
    );
    gainNode.gain.exponentialRampToValueAtTime(
      config.gainEnd || 0.001,
      now + config.attackDuration + config.decayDuration
    );

    osc.start(now);
    osc.stop(now + config.attackDuration + config.decayDuration + 0.1);
  }, []);

  return { playClick };
};

type SoundConfig = {
  type: OscillatorType;
  frequencyStart: number;
  frequencyEnd?: number;
  frequencyDuration?: number; // duration for freq ramp
  gainStart?: number;
  configGainPeak?: number; // max volume
  gainEnd?: number;
  attackDuration: number;
  decayDuration: number;
};

export const PRESETS: Record<string, SoundConfig> = {
  classic: {
    type: "sine",
    frequencyStart: 800,
    frequencyEnd: 400,
    frequencyDuration: 0.1,
    attackDuration: 0.01,
    decayDuration: 0.1,
    configGainPeak: 0.15,
  },
  mechanical: {
    type: "square",
    frequencyStart: 300,
    frequencyEnd: 100,
    attackDuration: 0.005,
    decayDuration: 0.05,
    configGainPeak: 0.05,
  },
  softBubble: {
    type: "sine",
    frequencyStart: 600,
    frequencyEnd: 200,
    attackDuration: 0.02,
    decayDuration: 0.2,
    configGainPeak: 0.1,
  },
  highTech: {
    type: "sine",
    frequencyStart: 1200,
    frequencyEnd: 2000,
    attackDuration: 0.005,
    decayDuration: 0.05,
    configGainPeak: 0.08,
  },
  woodblock: {
    type: "triangle",
    frequencyStart: 800,
    frequencyEnd: 800, // static pitch
    attackDuration: 0.001,
    decayDuration: 0.08,
    configGainPeak: 0.2,
  },
  retroSelect: {
    type: "sawtooth",
    frequencyStart: 150,
    frequencyEnd: 300,
    attackDuration: 0.01,
    decayDuration: 0.15,
    configGainPeak: 0.05,
  },
  glass: {
    type: "sine",
    frequencyStart: 2000,
    attackDuration: 0.001,
    decayDuration: 0.1,
    configGainPeak: 0.05,
  },
  thud: {
    type: "sine",
    frequencyStart: 100,
    frequencyEnd: 50,
    attackDuration: 0.01,
    decayDuration: 0.1,
    configGainPeak: 0.3,
  },
  cursor: {
    type: "sine",
    frequencyStart: 900,
    frequencyEnd: 900,
    attackDuration: 0.002,
    decayDuration: 0.03,
    configGainPeak: 0.1,
  },
  subtle: {
    type: "sine",
    frequencyStart: 400,
    frequencyEnd: 200,
    attackDuration: 0.01,
    decayDuration: 0.05,
    configGainPeak: 0.05,
  },
};
