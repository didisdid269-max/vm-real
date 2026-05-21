export type AppId = "windows11" | "browser" | "android";

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
    defaultW: 520,
    defaultH: 420,
  },
  browser: {
    title: "Browser",
    icon: "🌐",
    defaultW: 640,
    defaultH: 440,
  },
  android: {
    title: "Android",
    icon: "📱",
    defaultW: 320,
    defaultH: 580,
  },
};
