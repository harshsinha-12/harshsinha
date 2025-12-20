import { useCallback } from "react";

export const useHapticFeedback = () => {
  const triggerHaptic = useCallback((pattern: number | number[] = 20) => {
    // Check for navigator support
    if (
      typeof window !== "undefined" &&
      window.navigator &&
      window.navigator.vibrate
    ) {
      try {
        const success = window.navigator.vibrate(pattern);
        if (!success) {
          console.debug(
            "Haptic feedback returned false (interaction required?)"
          );
        }
      } catch (e) {
        console.debug("Haptic feedback failed:", e);
      }
    }
  }, []);

  return { triggerHaptic };
};
