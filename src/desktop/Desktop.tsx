import { useCallback, useEffect, useRef, useState } from "react";
import { AndroidApp } from "./apps/AndroidApp";
import { BrowserApp } from "./apps/BrowserApp";
import { Windows11App } from "./apps/Windows11App";
import { APP_META, type AppId, type WindowState } from "./types";
import { Window } from "./Window";
import "./Desktop.css";

function createWindow(id: AppId, z: number, offset: number): WindowState {
  const meta = APP_META[id];
  return {
    id,
    title: meta.title,
    x: 80 + offset * 28,
    y: 48 + offset * 28,
    width: meta.defaultW,
    height: meta.defaultH,
    zIndex: z,
    minimized: false,
    maximized: false,
  };
}

const INITIAL: WindowState[] = [
  createWindow("windows11", 1, 0),
  createWindow("browser", 2, 1),
  createWindow("android", 3, 2),
];

function renderApp(id: AppId) {
  switch (id) {
    case "windows11":
      return <Windows11App />;
    case "browser":
      return <BrowserApp />;
    case "android":
      return <AndroidApp />;
  }
}

export function Desktop() {
  const [windows, setWindows] = useState<WindowState[]>(INITIAL);
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState(() => new Date());
  const dragRef = useRef<{ id: AppId; ox: number; oy: number } | null>(null);
  const zRef = useRef(10);

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const focus = useCallback((id: AppId) => {
    zRef.current += 1;
    setWindows((w) =>
      w.map((win) =>
        win.id === id ? { ...win, zIndex: zRef.current, minimized: false } : win,
      ),
    );
  }, []);

  const openApp = useCallback((id: AppId) => {
    setStartOpen(false);
    setWindows((w) => {
      const existing = w.find((x) => x.id === id);
      if (existing) {
        zRef.current += 1;
        return w.map((win) =>
          win.id === id
            ? { ...win, zIndex: zRef.current, minimized: false }
            : win,
        );
      }
      zRef.current += 1;
      return [...w, createWindow(id, zRef.current, w.length)];
    });
  }, []);

  const closeApp = useCallback((id: AppId) => {
    setWindows((w) => w.filter((win) => win.id !== id));
  }, []);

  const patch = useCallback((id: AppId, patch: Partial<WindowState>) => {
    setWindows((w) =>
      w.map((win) => (win.id === id ? { ...win, ...patch } : win)),
    );
  }, []);

  const onDragStart = useCallback(
    (id: AppId, e: React.PointerEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      const win = windows.find((w) => w.id === id);
      if (!win || win.maximized) return;
      focus(id);
      dragRef.current = { id, ox: e.clientX - win.x, oy: e.clientY - win.y };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [windows, focus],
  );

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const d = dragRef.current;
      if (!d) return;
      setWindows((w) =>
        w.map((win) =>
          win.id === d.id
            ? { ...win, x: e.clientX - d.ox, y: Math.max(0, e.clientY - d.oy) }
            : win,
        ),
      );
    };
    const onUp = () => {
      dragRef.current = null;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  const clock = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="vm-host">
      <div
        className="vm-desktop"
        onClick={() => setStartOpen(false)}
      >
        <div className="vm-wallpaper" />
        <div className="vm-icons">
          {(Object.keys(APP_META) as AppId[]).map((id) => (
            <button
              key={id}
              type="button"
              className="desktop-icon"
              onDoubleClick={() => openApp(id)}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="icon">{APP_META[id].icon}</span>
              <span>{APP_META[id].title}</span>
            </button>
          ))}
        </div>

        {windows.map((win) => (
          <Window
            key={win.id}
            win={win}
            onFocus={() => focus(win.id)}
            onClose={() => closeApp(win.id)}
            onMinimize={() => patch(win.id, { minimized: true })}
            onMaximize={() =>
              patch(win.id, { maximized: !win.maximized })
            }
            onDragStart={(e) => onDragStart(win.id, e)}
          >
            {renderApp(win.id)}
          </Window>
        ))}

        {startOpen && (
          <div className="start-menu" onClick={(e) => e.stopPropagation()}>
            <p className="start-user">VM Desktop</p>
            {(Object.keys(APP_META) as AppId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => openApp(id)}
              >
                <span>{APP_META[id].icon}</span>
                {APP_META[id].title}
              </button>
            ))}
          </div>
        )}
      </div>

      <footer className="vm-taskbar">
        <button
          type="button"
          className="start-btn"
          onClick={(e) => {
            e.stopPropagation();
            setStartOpen((o) => !o);
          }}
        >
          ⊞
        </button>
        <div className="task-items">
          {(Object.keys(APP_META) as AppId[]).map((id) => {
            const win = windows.find((w) => w.id === id);
            const active = win && !win.minimized;
            return (
              <button
                key={id}
                type="button"
                className={active ? "active" : ""}
                onClick={() => (win ? focus(id) : openApp(id))}
              >
                {APP_META[id].icon} {APP_META[id].title}
              </button>
            );
          })}
        </div>
        <div className="task-tray">
          <span className="tray-spec" title="Host VM specs">
            RTX 4090 · 200 FPS · 128 GB
          </span>
          <span>{clock}</span>
        </div>
      </footer>
    </div>
  );
}
