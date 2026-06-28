import { AccessibilitySettings, defaultSettings } from "./types";

export type ProfileName =
  | "screenReader"
  | "lowVision"
  | "motor"
  | "colorBlind"
  | "epilepsy"
  | "adhd"
  | "dyslexia"
  | null;

export const profiles: Record<
  NonNullable<ProfileName>,
  Partial<AccessibilitySettings>
> = {
  screenReader: {
    // Garante navegação por teclado robusta (simulado via classes globais),
    // foco visível (a11y-focus-visible) - será tratado no CSS global.
  },
  lowVision: {
    fontScale: 1.3,
    contrast: "high",
    highlightLinks: true,
    highlightTitles: true,
    bigCursor: "black",
    saturation: "high",
  },
  motor: {
    // Alvos grandes, foco persistente tratado em CSS (a11y-motor)
  },
  colorBlind: {
    saturation: "high",
    highlightLinks: true,
  },
  epilepsy: {
    saturation: "low",
    pauseAnimations: true,
    muteSounds: true,
  },
  adhd: {
    readableFont: true,
    pauseAnimations: true,
    readingMask: true,
    readingGuide: true,
  },
  dyslexia: {
    dyslexicFont: true,
    pauseAnimations: true,
    highlightLinks: true,
    highlightTitles: true,
    letterSpacing: 2,
    lineHeight: 1.8,
  },
};

export const applyProfile = (
  currentSettings: AccessibilitySettings,
  profile: ProfileName,
): AccessibilitySettings => {
  if (!profile) {
    return { ...defaultSettings };
  }
  return {
    ...defaultSettings,
    profile,
    ...profiles[profile],
  };
};
