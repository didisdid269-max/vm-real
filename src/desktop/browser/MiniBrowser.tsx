import { useCallback, useRef, useState } from "react";
import { useVpn } from "../vpn/VpnContext";
import {
  DEFAULT_HOME,
  QUICK_LINKS,
  normalizeTargetUrl,
  toProxyUrl,
} from "./proxy";
import "./MiniBrowser.css";

type MiniBrowserProps = {
  initialUrl?: string;
  compact?: boolean;
  variant?: "desktop" | "mobile";
};

export function MiniBrowser({
  initialUrl = DEFAULT_HOME,
  compact = false,
  variant = "desktop",
}: MiniBrowserProps) {
  const { connected, server } = useVpn();
  const startTarget = normalizeTargetUrl(initialUrl);
  const [input, setInput] = useState(startTarget);
  const [targetUrl, setTargetUrl] = useState(startTarget);
  const [history, setHistory] = useState<string[]>([startTarget]);
  const [histIdx, setHistIdx] = useState(0);
  const [loadError, setLoadError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const iframeSrc = toProxyUrl(targetUrl);

  const navigate = useCallback(
    (next: string) => {
      const normalized = normalizeTargetUrl(next);
      setTargetUrl(normalized);
      setInput(normalized);
      setLoadError(false);
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
    setTargetUrl(u);
    setInput(u);
    setLoadError(false);
  };

  const forward = () => {
    if (histIdx >= history.length - 1) return;
    const next = histIdx + 1;
    setHistIdx(next);
    const u = history[next];
    setTargetUrl(u);
    setInput(u);
    setLoadError(false);
  };

  const refresh = () => {
    setLoadError(false);
    if (iframeRef.current) iframeRef.current.src = toProxyUrl(targetUrl);
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
        <span className="proxy-badge" title="Traffic routed via VM proxy">
          Proxy
        </span>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          spellCheck={false}
          placeholder="Enter URL (e.g. google.com)"
        />
        <button type="submit">Go</button>
        <a
          className="open-ext"
          href={iframeSrc}
          target="_blank"
          rel="noopener noreferrer"
          title="Open proxied page in new tab"
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
        {loadError && (
          <div className="frame-fallback">
            <p>Could not load this page through the proxy.</p>
            <button type="button" onClick={() => window.open(iframeSrc, "_blank")}>
              Open in new tab
            </button>
            <button type="button" onClick={() => navigate(DEFAULT_HOME)}>
              Go home
            </button>
          </div>
        )}
        <iframe
          ref={iframeRef}
          key={iframeSrc}
          src={iframeSrc}
          title="Browser"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals allow-downloads"
          onLoad={() => setLoadError(false)}
          onError={() => setLoadError(true)}
        />
      </div>
    </div>
  );
}
