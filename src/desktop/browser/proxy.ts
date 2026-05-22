export const PROXY_ORIGIN =
  "https://v0-proxy-test-kqyr6y4qg-logina269.vercel.app";

export const DEFAULT_HOME = "https://www.google.com";

export const QUICK_LINKS = [
  { label: "Google", url: "https://www.google.com" },
  { label: "Wikipedia", url: "https://en.wikipedia.org/wiki/Main_Page" },
  { label: "Hacker News", url: "https://news.ycombinator.com" },
  { label: "Example", url: "https://example.com" },
];

export function toProxyUrl(targetUrl: string): string {
  return `${PROXY_ORIGIN}/api/proxy?url=${encodeURIComponent(targetUrl)}`;
}

/** Turn address bar input into a real site URL (not proxied). */
export function normalizeTargetUrl(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return DEFAULT_HOME;

  if (trimmed.startsWith(PROXY_ORIGIN)) {
    try {
      const parsed = new URL(trimmed);
      const inner = parsed.searchParams.get("url");
      if (inner) return inner;
      if (parsed.pathname.startsWith("/api/proxy")) return DEFAULT_HOME;
    } catch {
      /* fall through */
    }
  }

  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes(".") && !trimmed.includes(" ")) return `https://${trimmed}`;
  return `https://www.google.com/search?q=${encodeURIComponent(trimmed)}`;
}
