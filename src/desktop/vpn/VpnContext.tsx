import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type VpnServer = {
  id: string;
  name: string;
  flag: string;
  city: string;
  ip: string;
};

export const VPN_SERVERS: VpnServer[] = [
  { id: "us", name: "United States", flag: "🇺🇸", city: "New York", ip: "104.28.14.42" },
  { id: "uk", name: "United Kingdom", flag: "🇬🇧", city: "London", ip: "185.199.108.153" },
  { id: "jp", name: "Japan", flag: "🇯🇵", city: "Tokyo", ip: "103.86.99.22" },
  { id: "de", name: "Germany", flag: "🇩🇪", city: "Frankfurt", ip: "91.198.174.192" },
  { id: "sg", name: "Singapore", flag: "🇸🇬", city: "Singapore", ip: "172.217.194.100" },
];

type VpnContextValue = {
  connected: boolean;
  connecting: boolean;
  server: VpnServer;
  setServer: (id: string) => void;
  connect: () => void;
  disconnect: () => void;
  bytesSecured: string;
};

const VpnContext = createContext<VpnContextValue | null>(null);

export function VpnProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [serverId, setServerId] = useState("us");
  const [bytesSecured, setBytesSecured] = useState("0 B");

  const server = VPN_SERVERS.find((s) => s.id === serverId) ?? VPN_SERVERS[0];

  const connect = useCallback(() => {
    if (connected || connecting) return;
    setConnecting(true);
    window.setTimeout(() => {
      setConnecting(false);
      setConnected(true);
      setBytesSecured("2.4 GB");
    }, 900);
  }, [connected, connecting]);

  const disconnect = useCallback(() => {
    setConnected(false);
    setConnecting(false);
    setBytesSecured("0 B");
  }, []);

  const setServer = useCallback(
    (id: string) => {
      setServerId(id);
      if (connected) setBytesSecured("2.4 GB");
    },
    [connected],
  );

  const value = useMemo(
    () => ({
      connected,
      connecting,
      server,
      setServer,
      connect,
      disconnect,
      bytesSecured,
    }),
    [connected, connecting, server, setServer, connect, disconnect, bytesSecured],
  );

  return <VpnContext.Provider value={value}>{children}</VpnContext.Provider>;
}

export function useVpn() {
  const ctx = useContext(VpnContext);
  if (!ctx) throw new Error("useVpn must be used within VpnProvider");
  return ctx;
}
