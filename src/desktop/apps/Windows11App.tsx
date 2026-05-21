import "./Windows11App.css";

const SPECS = [
  { label: "Operating system", value: "Windows 11 Pro (VM)" },
  { label: "Processor", value: "Intel Core i9-14900K @ 5.8 GHz" },
  { label: "Graphics", value: "NVIDIA GeForce RTX 4090 · 24 GB VRAM" },
  { label: "Refresh rate", value: "200 FPS · 200 Hz display" },
  { label: "Installed RAM", value: "128 GB DDR5" },
  { label: "Storage", value: "4 TB NVMe SSD (3.2 TB free)" },
  { label: "Virtualization", value: "Enabled · Hyper-V · WSL2" },
];

export function Windows11App() {
  return (
    <div className="win11-app">
      <aside className="win11-nav">
        <button type="button" className="active">
          System
        </button>
        <button type="button">Display</button>
        <button type="button">Storage</button>
        <button type="button">About</button>
      </aside>
      <section className="win11-body">
        <h2>Device specifications</h2>
        <p className="win11-sub">This virtual machine is running in your browser.</p>
        <dl className="spec-list">
          {SPECS.map((s) => (
            <div key={s.label} className="spec-row">
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
        <div className="perf-meter">
          <div className="perf-label">
            <span>GPU load</span>
            <span className="perf-val">12%</span>
          </div>
          <div className="bar">
            <div className="fill gpu" style={{ width: "12%" }} />
          </div>
          <div className="perf-label">
            <span>Frame rate</span>
            <span className="perf-val accent">200 FPS</span>
          </div>
          <div className="bar">
            <div className="fill fps" style={{ width: "100%" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
