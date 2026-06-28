import React, { useEffect, useState } from "react";
import { useAccessibility } from "../useAccessibility";

export const ReadingMask: React.FC = () => {
  const { settings } = useAccessibility();
  const [mouseY, setMouseY] = useState(-1000);

  useEffect(() => {
    if (!settings.readingMask) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [settings.readingMask]);

  if (!settings.readingMask) return null;

  const maskHeight = 100; // pixels of clear space

  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 bg-black/50 pointer-events-none z-[9990]"
        style={{ height: `${Math.max(0, mouseY - maskHeight / 2)}px` }}
      />
      <div
        className="fixed left-0 right-0 bottom-0 bg-black/50 pointer-events-none z-[9990]"
        style={{ top: `${mouseY + maskHeight / 2}px` }}
      />
    </>
  );
};
