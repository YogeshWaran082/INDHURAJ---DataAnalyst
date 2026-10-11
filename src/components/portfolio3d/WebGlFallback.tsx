import React from "react";

interface WebGlFallbackProps {
  title: string;
  description: string;
  badge?: string;
  children?: React.ReactNode;
}

export function WebGlFallback({ title, description, badge = "3D Interactive Simulation", children }: WebGlFallbackProps) {
  return (
    <div className="webgl-fallback-container" role="region" aria-label={title}>
      <div className="webgl-fallback-badge">
        <span className="pulse-dot" />
        {badge}
      </div>
      <h4 className="webgl-fallback-title">{title}</h4>
      <p className="webgl-fallback-desc">{description}</p>
      {children}
    </div>
  );
}

export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}
