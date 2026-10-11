import React from "react";

interface SceneLoaderProps {
  label?: string;
}

export function SceneLoader({ label = "Initializing 3D Workspace..." }: SceneLoaderProps) {
  return (
    <div className="scene-loader-wrapper" aria-live="polite" aria-busy="true">
      <div className="scene-loader-rings">
        <div className="scene-loader-ring scene-loader-ring--outer" />
        <div className="scene-loader-ring scene-loader-ring--inner" />
        <div className="scene-loader-core" />
      </div>
      <div className="scene-loader-text">
        <span className="scene-loader-pulse-dot" />
        <span>{label}</span>
      </div>
    </div>
  );
}
