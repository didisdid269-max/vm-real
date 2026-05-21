import type { ReactNode } from "react";
import type { WindowState } from "./types";
import "./Window.css";

type WindowProps = {
  win: WindowState;
  children: ReactNode;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onDragStart: (e: React.PointerEvent) => void;
};

export function Window({
  win,
  children,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onDragStart,
}: WindowProps) {
  if (win.minimized) return null;

  const style: React.CSSProperties = win.maximized
    ? { inset: "0 0 48px 0", width: "auto", height: "auto" }
    : {
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
      };

  return (
    <div
      className={`vm-window ${win.maximized ? "maximized" : ""}`}
      style={{ ...style, zIndex: win.zIndex }}
      onPointerDown={onFocus}
    >
      <header
        className="vm-titlebar"
        onPointerDown={onDragStart}
      >
        <span className="vm-title">{win.title}</span>
        <div className="vm-controls">
          <button type="button" onClick={onMinimize} aria-label="Minimize">
            ─
          </button>
          <button type="button" onClick={onMaximize} aria-label="Maximize">
            ▢
          </button>
          <button type="button" className="close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>
      </header>
      <div className="vm-content">{children}</div>
    </div>
  );
}
