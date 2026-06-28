export interface AccessibilitySettings {
  profile: string | null;
  fontScale: number;
  lineHeight: number;
  letterSpacing: number;
  wordSpacing: number;
  dyslexicFont: boolean;
  readableFont: boolean;
  textAlign: "left" | "justify" | null;
  contrast: "normal" | "dark" | "light" | "high";
  saturation: "normal" | "high" | "low" | "monochrome";
  invertColors: boolean;
  highlightLinks: boolean;
  highlightTitles: boolean;
  readingMask: boolean;
  readingGuide: boolean;
  bigCursor: "normal" | "white" | "black";
  pauseAnimations: boolean;
  muteSounds: boolean;
  zoom: number;
}

export const defaultSettings: AccessibilitySettings = {
  profile: null,
  fontScale: 1.0,
  lineHeight: 1.5,
  letterSpacing: 0,
  wordSpacing: 0,
  dyslexicFont: false,
  readableFont: false,
  textAlign: null,
  contrast: "normal",
  saturation: "normal",
  invertColors: false,
  highlightLinks: false,
  highlightTitles: false,
  readingMask: false,
  readingGuide: false,
  bigCursor: "normal",
  pauseAnimations: false,
  muteSounds: false,
  zoom: 1.0,
};
