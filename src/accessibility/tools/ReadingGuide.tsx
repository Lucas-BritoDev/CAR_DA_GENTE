import React, { useEffect, useState } from "react";
import { useAccessibility } from "../useAccessibility";

export const ReadingGuide: React.FC = () => {
  const { settings } = useAccessibility();
  const [mouseY, setMouseY] = useState(-1000);

  useEffect(() => {
    if (!settings.readingGuide) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [settings.readingGuide]);

  if (!settings.readingGuide) return null;

  return (
    <div
      className="fixed left-0 right-0 h-1 bg-red-500 pointer-events-none z-[9991]"
      style={{ top: `${mouseY}px` }}
    />
  );
};
