import { VPN_SERVERS, useVpn } from "../vpn/VpnContext";
import "./VpnApp.css";

export function VpnApp() {
  const {
    connected,
    connecting,
    server,
    setServer,
    connect,
    disconnect,
    bytesSecured,
  } = useVpn();

  return (
    <div className="vpn-app">
      <header className="vpn-header">
        <span className="vpn-logo">🛡️</span>
        <div>
          <h2>VM Shield VPN</h2>
          <p>Built-in · WireGuard · No logs</p>
        </div>
      </header>

      <div className={`vpn-status-ring ${connected ? "on" : ""} ${connecting ? "busy" : ""}`}>
        <button
          type="button"
          className="vpn-power"
          onClick={connected ? disconnect : connect}
          disabled={connecting}
        >
          {connecting ? "…" : connected ? "ON" : "OFF"}
        </button>
      </div>

      <p className="vpn-state">
        {connecting
          ? "Connecting…"
          : connected
            ? `Protected · ${server.flag} ${server.city}`
            : "Not connected"}
      </p>

      {connected && (
        <dl className="vpn-stats">
          <div>
            <dt>Virtual IP</dt>
            <dd>{server.ip}</dd>
          </div>
          <div>
            <dt>Encrypted</dt>
            <dd>{bytesSecured}</dd>
          </div>
          <div>
            <dt>Protocol</dt>
            <dd>WireGuard · AES-256</dd>
          </div>
        </dl>
      )}

      <section className="vpn-servers">
        <h3>Server location</h3>
        <ul>
          {VPN_SERVERS.map((s) => (
            <li key={s.id}>
              <button
                type="button"
                className={server.id === s.id ? "active" : ""}
                onClick={() => setServer(s.id)}
              >
                <span>{s.flag}</span>
                <span>
                  {s.name}
                  <small>{s.city}</small>
                </span>
                {server.id === s.id && connected && <span className="check">✓</span>}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <p className="vpn-note">
        Simulated VPN for this demo VM. Traffic still uses your real network; enable a real VPN
        on your host for production privacy.
      </p>
    </div>
  );
}
