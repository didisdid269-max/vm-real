import { useState } from "react";
import { MiniBrowser } from "../browser/MiniBrowser";
import "./AndroidApp.css";

const APPS = [
  { id: "chrome", name: "Chrome", color: "#ea4335" },
  { id: "play", name: "Play Store", color: "#01875f" },
  { id: "gmail", name: "Gmail", color: "#c5221f" },
  { id: "maps", name: "Maps", color: "#34a853" },
  { id: "photos", name: "Photos", color: "#fbbc04" },
  { id: "settings", name: "Settings", color: "#5f6368" },
  { id: "camera", name: "Camera", color: "#4285f4" },
  { id: "files", name: "Files", color: "#f9ab00" },
];

export function AndroidApp() {
  const [screen, setScreen] = useState<"home" | "chrome">("home");

  if (screen === "chrome") {
    return (
      <div className="android-shell">
        <div className="android-status">
          <span>9:41</span>
          <span className="android-icons">📶 🔋</span>
        </div>
        <div className="android-browser">
          <button type="button" className="android-back" onClick={() => setScreen("home")}>
            ‹ Apps
          </button>
          <MiniBrowser compact variant="mobile" />
        </div>
        <div className="android-nav">
          <span />
          <span className="home-pill" />
          <span />
        </div>
      </div>
    );
  }

  return (
    <div className="android-shell">
      <div className="android-status">
        <span>9:41</span>
        <span className="android-icons">📶 🔋</span>
      </div>
      <div className="android-home">
        <p className="android-label">Android 14 · Pixel 8 · VM</p>
        <div className="app-grid">
          {APPS.map((app) => (
            <button
              key={app.id}
              type="button"
              className="app-icon"
              onClick={() => app.id === "chrome" && setScreen("chrome")}
            >
              <span className="icon-circle" style={{ background: app.color }} />
              <span className="icon-name">{app.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="android-nav">
        <span />
        <span className="home-pill" />
        <span />
      </div>
      <footer className="android-specs">
        RTX 4090 host · 12 GB RAM · ARM64 VM
      </footer>
    </div>
  );
}
