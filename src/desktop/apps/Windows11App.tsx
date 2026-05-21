import { useState } from "react";
import { MiniBrowser } from "../browser/MiniBrowser";
import "./Windows11App.css";

const SPECS = [
  { label: "Operating system", value: "Windows 11 Pro (VM)" },
  { label: "Processor", value: "Intel Core i9-14900K @ 5.8 GHz" },
  { label: "Graphics", value: "NVIDIA GeForce RTX 4090 · 24 GB VRAM" },
  { label: "Refresh rate", value: "200 FPS · 200 Hz display" },
  { label: "Installed RAM", value: "128 GB DDR5" },
  { label: "Storage", value: "4 TB NVMe SSD (3.2 TB free)" },
  { label: "Virtualization", value: "Enabled · Hyper-V · WSL2" },
  { label: "VPN", value: "VM Shield · WireGuard (built-in)" },
];

type Tab = "system" | "edge";

export function Windows11App() {
  const [tab, setTab] = useState<Tab>("system");

  return (
    <div className="win11-app">
      <aside className="win11-nav">
        <button
          type="button"
          className={tab === "system" ? "active" : ""}
          onClick={() => setTab("system")}
        >
          System
        </button>
        <button
          type="button"
          className={tab === "edge" ? "active" : ""}
          onClick={() => setTab("edge")}
        >
          Microsoft Edge
        </button>
      </aside>
      {tab === "system" ? (
        <section className="win11-body">
          <h2>Device specifications</h2>
          <p className="win11-sub">Virtual machine · RTX 4090 passthrough enabled</p>
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
              <span>GPU load (RTX 4090)</span>
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
      ) : (
        <section className="win11-edge">
          <MiniBrowser initialUrl="https://duckduckgo.com/" />
        </section>
      )}
    </div>
  );
}
