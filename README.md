# VM Desktop

A browser-based **virtual machine desktop** with Windows 11, Android, iOS, a working in-tab browser, and built-in VPN — all simulated in the browser (not real OS installs or cloud GPUs).

## Features

| System | Details |
|--------|---------|
| **Windows 11** | RTX 4090 · 200 FPS · 128 GB RAM · Microsoft Edge browser |
| **Android 14** | Pixel-style UI · Chrome browser |
| **iOS 18** | iPhone UI · Safari browser |
| **Browser** | Full navigation, back/forward, quick links (DuckDuckGo, Wikipedia, MDN) |
| **VPN** | VM Shield — connect/disconnect, server picker, virtual IP display |

## GPU / specs (in-app)

- **GPU:** NVIDIA GeForce RTX 4090 · 24 GB VRAM
- **Display:** 200 FPS · 200 Hz
- **RAM:** 128 GB DDR5
- **Storage:** 4 TB NVMe SSD

## Usage

- **Double-click** desktop icons to open apps
- **Start menu** (⊞) to launch apps
- **Taskbar** — switch windows; **VPN** tray button opens VPN
- Turn **VPN ON** to see the shield badge in browsers
- **Windows 11** → **Microsoft Edge** tab for browsing
- **Android** → tap **Chrome** · **iOS** → tap **Safari** or dock icon

> **Note:** Browsers load real sites in iframes where allowed. Some sites block embedding; use quick links or **Open in new tab**. The VPN is a UI simulation for the demo, not real network tunneling.

## Run locally

```bash
npm install
npm run dev
```

Deploy with `npm run build`.
