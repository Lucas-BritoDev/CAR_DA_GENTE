import React, { createContext, useState, useEffect, ReactNode } from "react";
import { AccessibilitySettings, defaultSettings } from "./types";
import { applyProfile, ProfileName } from "./profiles";

import "./accessibility.css";

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSetting: <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
  ) => void;
  setProfile: (profile: ProfileName) => void;
  resetSettings: () => void;
}

export const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

const STORAGE_KEY = "a11y-settings-v1";

export const AccessibilityProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<AccessibilitySettings>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return { ...defaultSettings, ...JSON.parse(stored) };
      }
    } catch (e) {
      console.warn("Failed to parse a11y settings", e);
    }
    // Default to reduced motion if user prefers it
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return { ...defaultSettings, pauseAnimations: true };
    }
    return defaultSettings;
  });

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K],
  ) => {
    setSettings((prev) => ({ ...prev, profile: null, [key]: value }));
  };

  const setProfile = (profile: ProfileName) => {
    setSettings((prev) => applyProfile(prev, profile));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));

    const html = document.documentElement;

    // Apply CSS Variables
    html.style.setProperty("--a11y-font-scale", settings.fontScale.toString());
    html.style.setProperty(
      "--a11y-line-height",
      settings.lineHeight.toString(),
    );
    html.style.setProperty(
      "--a11y-letter-spacing",
      `${settings.letterSpacing}px`,
    );
    html.style.setProperty("--a11y-word-spacing", `${settings.wordSpacing}px`);
    html.style.setProperty("--a11y-zoom", settings.zoom.toString());

    // Apply classes for discrete modes
    const classList = [];
    if (settings.dyslexicFont) classList.push("a11y-dyslexic-font");
    if (settings.readableFont) classList.push("a11y-readable-font");
    if (settings.textAlign) classList.push(`a11y-text-${settings.textAlign}`);
    if (settings.contrast !== "normal")
      classList.push(`a11y-contrast-${settings.contrast}`);
    if (settings.saturation !== "normal")
      classList.push(`a11y-saturation-${settings.saturation}`);
    if (settings.invertColors) classList.push("a11y-invert-colors");
    if (settings.highlightLinks) classList.push("a11y-highlight-links");
    if (settings.highlightTitles) classList.push("a11y-highlight-titles");
    if (settings.bigCursor !== "normal")
      classList.push(`a11y-cursor-${settings.bigCursor}`);
    if (settings.pauseAnimations) classList.push("a11y-pause-animations");

    if (settings.profile === "screenReader")
      classList.push("a11y-profile-screen-reader");
    if (settings.profile === "motor") classList.push("a11y-profile-motor");

    // Clean up old classes
    const currentA11yClasses = Array.from(html.classList).filter((c) =>
      c.startsWith("a11y-"),
    );
    currentA11yClasses.forEach((c) => html.classList.remove(c));

    // Add new classes
    classList.forEach((c) => html.classList.add(c));

    // Handle sounds mute
    if (settings.muteSounds) {
      document.querySelectorAll("audio, video").forEach((media) => {
        if (media instanceof HTMLMediaElement) {
          media.muted = true;
          media.pause();
        }
      });
    }
  }, [settings]);

  // Live region for screen readers
  return (
    <AccessibilityContext.Provider
      value={{ settings, updateSetting, setProfile, resetSettings }}
    >
      <div
        className="a11y-wrapper"
        style={{
          minHeight: "100vh",
          zoom: settings.zoom,
        }}
      >
        {children}
      </div>
      <div aria-live="polite" className="sr-only"></div>
    </AccessibilityContext.Provider>
  );
};
