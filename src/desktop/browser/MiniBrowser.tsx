import { useCallback, useRef, useState } from "react";
import { useVpn } from "../vpn/VpnContext";
import "./MiniBrowser.css";

const HOME = "https://duckduckgo.com/";
const QUICK_LINKS = [
  { label: "DuckDuckGo", url: "https://duckduckgo.com/" },
  { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Main_Page" },
  { label: "MDN", url: "https://developer.mozilla.org/" },
  { label: "Example", url: "https://example.com/" },
];

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return HOME;
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes(".") && !trimmed.includes(" ")) return `https://${trimmed}`;
  return `https://duckduckgo.com/?q=${encodeURIComponent(trimmed)}`;
}

type MiniBrowserProps = {
  initialUrl?: string;
  compact?: boolean;
  variant?: "desktop" | "mobile";
};

export function MiniBrowser({
  initialUrl = HOME,
  compact = false,
  variant = "desktop",
}: MiniBrowserProps) {
  const { connected, server } = useVpn();
  const [input, setInput] = useState(initialUrl);
  const [url, setUrl] = useState(initialUrl);
  const [history, setHistory] = useState<string[]>([initialUrl]);
  const [histIdx, setHistIdx] = useState(0);
  const [frameBlocked, setFrameBlocked] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadTimerRef = useRef<number | null>(null);

  const navigate = useCallback(
    (next: string) => {
      const normalized = normalizeUrl(next);
      setUrl(normalized);
      setInput(normalized);
      setFrameBlocked(false);
      setHistory((h) => {
        const slice = h.slice(0, histIdx + 1);
        return [...slice, normalized];
      });
      setHistIdx((i) => i + 1);
    },
    [histIdx],
  );

  const go = () => navigate(input);

  const back = () => {
    if (histIdx <= 0) return;
    const next = histIdx - 1;
    setHistIdx(next);
    const u = history[next];
    setUrl(u);
    setInput(u);
    setFrameBlocked(false);
  };

  const forward = () => {
    if (histIdx >= history.length - 1) return;
    const next = histIdx + 1;
    setHistIdx(next);
    const u = history[next];
    setUrl(u);
    setInput(u);
    setFrameBlocked(false);
  };

  const refresh = () => {
    setFrameBlocked(false);
    if (iframeRef.current) iframeRef.current.src = url;
  };

  const onFrameLoad = () => {
    if (loadTimerRef.current) window.clearTimeout(loadTimerRef.current);
    loadTimerRef.current = window.setTimeout(() => {
      try {
        const doc = iframeRef.current?.contentDocument;
        if (doc && doc.body && doc.body.innerHTML === "") {
          setFrameBlocked(true);
        } else {
          setFrameBlocked(false);
        }
      } catch {
        setFrameBlocked(false);
      }
    }, 400);
  };

  return (
    <div className={`mini-browser ${compact ? "compact" : ""} ${variant}`}>
      <form
        className="mini-browser-bar"
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
      >
        <div className="nav-btns">
          <button type="button" onClick={back} disabled={histIdx <= 0} aria-label="Back">
            ←
          </button>
          <button
            type="button"
            onClick={forward}
            disabled={histIdx >= history.length - 1}
            aria-label="Forward"
          >
            →
          </button>
          <button type="button" onClick={refresh} aria-label="Refresh">
            ↻
          </button>
        </div>
        {connected && (
          <span className="vpn-badge" title={`VPN · ${server.city}`}>
            🛡️
          </span>
        )}
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="Search or enter URL"
        />
        <button type="submit">Go</button>
        <a
          className="open-ext"
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          title="Open in new tab"
        >
          ↗
        </a>
      </form>

      {!compact && (
        <div className="quick-links">
          {QUICK_LINKS.map((link) => (
            <button key={link.url} type="button" onClick={() => navigate(link.url)}>
              {link.label}
            </button>
          ))}
        </div>
      )}

      <div className="mini-browser-viewport">
        {frameBlocked && (
          <div className="frame-fallback">
            <p>This site blocks embedded views.</p>
            <button type="button" onClick={() => window.open(url, "_blank")}>
              Open in new tab
            </button>
            <button type="button" onClick={() => navigate(HOME)}>
              Go home
            </button>
          </div>
        )}
        <iframe
          ref={iframeRef}
          key={url}
          src={url}
          title="Browser"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads"
          onLoad={onFrameLoad}
          onError={() => setFrameBlocked(true)}
        />
      </div>
    </div>
  );
}
