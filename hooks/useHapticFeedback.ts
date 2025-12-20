import { useCallback } from "react";

export const useHapticFeedback = () => {
  const triggerHaptic = useCallback((pattern: number | number[] = 10) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Fail silently if vibration is not supported or allowed
        console.debug("Haptic feedback failed:", e);
      }
    }
  }, []);

  return { triggerHaptic };
};
