import { Desktop } from "./desktop/Desktop";
import { VpnProvider } from "./desktop/vpn/VpnContext";

export default function App() {
  return (
    <VpnProvider>
      <Desktop />
    </VpnProvider>
  );
}
