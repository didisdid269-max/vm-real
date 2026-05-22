import { useState } from "react";
import { MiniBrowser } from "../browser/MiniBrowser";
import "./IosApp.css";

const APPS = [
  { id: "safari", name: "Safari", color: "#007aff", icon: "🧭" },
  { id: "messages", name: "Messages", color: "#34c759", icon: "💬" },
  { id: "mail", name: "Mail", color: "#5ac8fa", icon: "✉️" },
  { id: "photos", name: "Photos", color: "#ff9500", icon: "🖼️" },
  { id: "maps", name: "Maps", color: "#30d158", icon: "🗺️" },
  { id: "settings", name: "Settings", color: "#8e8e93", icon: "⚙️" },
  { id: "music", name: "Music", color: "#ff2d55", icon: "🎵" },
  { id: "appstore", name: "App Store", color: "#0a84ff", icon: "⬇️" },
];

export function IosApp() {
  const [screen, setScreen] = useState<"home" | "safari">("home");

  if (screen === "safari") {
    return (
      <div className="ios-shell">
        <div className="ios-status">
          <span>9:41</span>
          <span className="ios-notch-area" />
          <span>📶 🔋</span>
        </div>
        <div className="ios-safari">
          <button type="button" className="ios-back" onClick={() => setScreen("home")}>
            ‹ Home
          </button>
          <MiniBrowser compact variant="mobile" />
        </div>
        <div className="ios-home-indicator" />
      </div>
    );
  }

  return (
    <div className="ios-shell">
      <div className="ios-status">
        <span>9:41</span>
        <span className="ios-notch-area" />
        <span>📶 🔋</span>
      </div>
      <div className="ios-home">
        <p className="ios-label">iOS 18 · iPhone 16 Pro · VM</p>
        <div className="ios-grid">
          {APPS.map((app) => (
            <button
              key={app.id}
              type="button"
              className="ios-app"
              onClick={() => app.id === "safari" && setScreen("safari")}
            >
              <span className="ios-icon" style={{ background: app.color }}>
                {app.icon}
              </span>
              <span>{app.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="ios-dock">
        <span className="dock-icon" style={{ background: "#007aff" }}>
          📞
        </span>
        <span className="dock-icon" style={{ background: "#34c759" }}>
          💬
        </span>
        <span
          className="dock-icon safari"
          style={{ background: "#007aff" }}
          onClick={() => setScreen("safari")}
          onKeyDown={(e) => e.key === "Enter" && setScreen("safari")}
          role="button"
          tabIndex={0}
        >
          🧭
        </span>
        <span className="dock-icon" style={{ background: "#5856d6" }}>
          🎵
        </span>
      </div>
      <footer className="ios-specs">A18 Pro · 8 GB · Secure Enclave VM</footer>
    </div>
  );
}
