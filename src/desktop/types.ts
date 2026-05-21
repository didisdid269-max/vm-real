export type AppId = "windows11" | "browser" | "android" | "ios" | "vpn";

export type WindowState = {
  id: AppId;
  title: string;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
};

export const APP_META: Record<
  AppId,
  { title: string; icon: string; defaultW: number; defaultH: number }
> = {
  windows11: {
    title: "Windows 11",
    icon: "🪟",
    defaultW: 560,
    defaultH: 440,
  },
  browser: {
    title: "Browser",
    icon: "🌐",
    defaultW: 720,
    defaultH: 520,
  },
  android: {
    title: "Android",
    icon: "📱",
    defaultW: 320,
    defaultH: 600,
  },
  ios: {
    title: "iOS",
    icon: "🍎",
    defaultW: 300,
    defaultH: 620,
  },
  vpn: {
    title: "VPN",
    icon: "🛡️",
    defaultW: 380,
    defaultH: 480,
  },
};
