import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LanyardBadge } from "./App";

let reducedMotionPreference = false;

describe("LanyardBadge", () => {
  beforeEach(() => {
    reducedMotionPreference = false;
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query.includes("prefers-reduced-motion") && reducedMotionPreference,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    vi.stubGlobal("requestAnimationFrame", vi.fn(() => 1));
    vi.stubGlobal("cancelAnimationFrame", vi.fn());
    vi.stubGlobal("PointerEvent", class extends MouseEvent {
      readonly pointerId: number;
      constructor(type: string, init: PointerEventInit = {}) {
        super(type, init);
        this.pointerId = init.pointerId ?? 0;
      }
    });
    Object.defineProperty(HTMLElement.prototype, "setPointerCapture", { configurable: true, value: vi.fn() });
    vi.spyOn(HTMLElement.prototype, "setPointerCapture").mockImplementation(() => {});
  });

  afterEach(() => {
    cleanup();
    reducedMotionPreference = false;
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("captures pointer drag, bounds the badge, and exposes a reset action", () => {
    render(<LanyardBadge />);
    const badge = screen.getByRole("group", { name: /interactive indhuraj l identity badge/i });
    fireEvent.pointerDown(badge, { pointerId: 4, clientX: 20, clientY: 20 });
    fireEvent.pointerMove(badge, { pointerId: 4, clientX: 1000, clientY: -1000 });
    expect(badge).toHaveClass("is-dragging");
    expect(badge.style.getPropertyValue("--badge-x")).toBe("38px");
    expect(badge.style.getPropertyValue("--badge-y")).toBe("-30px");
    expect(HTMLElement.prototype.setPointerCapture).toHaveBeenCalledWith(4);

    fireEvent.pointerCancel(badge, { pointerId: 4 });
    expect(badge).not.toHaveClass("is-dragging");
    fireEvent.click(screen.getByRole("button", { name: "Reset card" }));
    expect(badge.style.getPropertyValue("--badge-x")).toBe("0px");
    expect(badge.style.getPropertyValue("--badge-y")).toBe("0px");
    expect(badge.style.getPropertyValue("--badge-rotation")).toBe("0deg");
  });

  it("supports direct dragging without swing when reduced motion is preferred", () => {
    reducedMotionPreference = true;
    render(<LanyardBadge />);
    const badge = screen.getByRole("group", { name: /interactive indhuraj l identity badge/i });
    fireEvent.pointerDown(badge, { pointerId: 2, clientX: 5, clientY: 5 });
    fireEvent.pointerMove(badge, { pointerId: 2, clientX: 25, clientY: 15 });
    fireEvent.pointerUp(badge, { pointerId: 2 });
    expect(badge).not.toHaveClass("is-dragging");
    expect(badge.style.getPropertyValue("--badge-x")).toBe("20px");
    expect(badge.style.getPropertyValue("--badge-y")).toBe("10px");
    expect(badge.style.getPropertyValue("--badge-rotation")).toBe("0deg");
  });

  it("keeps the badge within a narrow visual scene while dragging", () => {
    render(<LanyardBadge />);
    const badge = screen.getByRole("group", { name: /interactive indhuraj l identity badge/i });
    const scene = badge.parentElement;
    expect(scene).not.toBeNull();
    Object.defineProperties(scene, {
      clientWidth: { configurable: true, value: 300 },
      clientHeight: { configurable: true, value: 400 },
    });
    Object.defineProperties(badge, {
      offsetWidth: { configurable: true, value: 260 },
      offsetHeight: { configurable: true, value: 326 },
      offsetTop: { configurable: true, value: 40 },
    });

    fireEvent.pointerDown(badge, { pointerId: 8, clientX: 20, clientY: 20 });
    fireEvent.pointerMove(badge, { pointerId: 8, clientX: 1020, clientY: 1020 });
    const x = Number.parseFloat(badge.style.getPropertyValue("--badge-x"));
    const y = Number.parseFloat(badge.style.getPropertyValue("--badge-y"));
    const rotation = Number.parseFloat(badge.style.getPropertyValue("--badge-rotation"));
    expect(x).toBeGreaterThan(0);
    expect(x).toBeLessThan(38);
    expect(y).toBe(30);
    expect(rotation).toBeLessThan(11);
  });
});
