"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";

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
    // apply some delay, otherwise on slower devices, it errors with uniform images not being fully loaded.
    setTimeout(() => {
      setShowShaders(true);
    }, 400);
  }, []);

  return (
    <>
      {showShaders && (
        <GrainGradient
          className="absolute inset-0 animate-fd-fade-in duration-800"
          colors={
            resolvedTheme === "dark"
              ? ["#ff8800", "#ff6b6b", "#ff99aa", "#cc5577"]
              : ["#f25208", "#e63946", "#ff88aa", "#c9184a"]
          }
          colorBack={resolvedTheme === "dark" ? "#121212" : "#fff"}
          softness={0.5}
          intensity={0.5}
          noise={0.25}
          shape="corners"
          speed={0.4}
          scale={1.5}
          rotation={60}
          offsetX={1.5}
          offsetY={1.8}
        />
      )}
    </>
  );
}
