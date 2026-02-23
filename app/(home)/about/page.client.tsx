"use client";

import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const GrainGradient = dynamic(
  () => import("@paper-design/shaders-react").then((mod) => mod.GrainGradient),
  {
    ssr: false,
  },
);

export function Gimmick() {
  const { resolvedTheme } = useTheme();
  const [showShaders, setShowShaders] = useState(false);

  useEffect(() => {
    // Show after window load to avoid affecting LCP measurement.
    // Also prevents errors on slower devices where uniform images aren't fully loaded.
    const show = () => setShowShaders(true);
    if (document.readyState === "complete") {
      show();
    } else {
      window.addEventListener("load", show);
      return () => window.removeEventListener("load", show);
    }
  }, []);

  return (
    <>
      {showShaders && (
        <GrainGradient
          className="absolute inset-0 animate-fd-fade-in duration-800"
          colors={
            resolvedTheme === "dark"
              ? ["#ff8800", "#ff6b6b", "#ff99aa"]
              : ["#f25208", "#e63946", "#ff88aa"]
          }
          colorBack={resolvedTheme === "dark" ? "#121212" : "#fff"}
          softness={0.5}
          intensity={0.5}
          noise={0.5}
          shape="sphere"
          speed={2}
          scale={0.4}
          rotation={1}
          offsetX={0}
          offsetY={0}
        />
      )}
    </>
  );
}
