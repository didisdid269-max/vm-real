import "./AndroidApp.css";

const APPS = [
  { name: "Play Store", color: "#01875f" },
  { name: "Chrome", color: "#ea4335" },
  { name: "Gmail", color: "#c5221f" },
  { name: "Maps", color: "#34a853" },
  { name: "Photos", color: "#fbbc04" },
  { name: "Settings", color: "#5f6368" },
  { name: "Camera", color: "#4285f4" },
  { name: "Files", color: "#f9ab00" },
];

export function AndroidApp() {
  return (
    <div className="android-shell">
      <div className="android-status">
        <span>9:41</span>
        <span className="android-icons">📶 🔋</span>
      </div>
      <div className="android-home">
        <p className="android-label">Android 14 · VM</p>
        <div className="app-grid">
          {APPS.map((app) => (
            <button key={app.name} type="button" className="app-icon">
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
        12 GB RAM · 256 GB · ARM64 VM
      </footer>
    </div>
  );
}
