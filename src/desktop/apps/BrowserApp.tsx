import { useState } from "react";
import "./BrowserApp.css";

const START_PAGE = {
  title: "New Tab",
  url: "https://vm.local/home",
  body: (
    <>
      <h1>VM Browser</h1>
      <p>Welcome to the in-browser virtual machine network.</p>
      <ul>
        <li>Windows 11 — RTX 4090 · 200 FPS · 128 GB RAM</li>
        <li>Android 14 — mobile sandbox</li>
        <li>All systems run inside this tab (no real OS install)</li>
      </ul>
    </>
  ),
};

export function BrowserApp() {
  const [url, setUrl] = useState(START_PAGE.url);
  const [input, setInput] = useState(START_PAGE.url);

  const go = () => {
    const next = input.trim() || START_PAGE.url;
    setUrl(next.startsWith("http") ? next : `https://${next}`);
  };

  return (
    <div className="browser-app">
      <div className="browser-tabs">
        <div className="tab active">{START_PAGE.title}</div>
        <button type="button" className="tab-add" aria-label="New tab">
          +
        </button>
      </div>
      <form
        className="browser-bar"
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
      >
        <span className="lock">🔒</span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
        />
        <button type="submit">Go</button>
      </form>
      <div className="browser-page">
        <p className="page-url">{url}</p>
        <div className="page-content">{START_PAGE.body}</div>
      </div>
    </div>
  );
}
