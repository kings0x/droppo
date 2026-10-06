/**
 * Prerender dist/index.html so the lab site has full no-JS parity (DESIGN.md §9).
 *
 * The app is client-rendered; without JS, dist/index.html is an empty #root.
 * This script loads the built site in headless Chromium (real animations run,
 * IntersectionObserver reveals fire for above-fold content), then snapshots
 * the DOM back into dist/index.html with one adjustment: the runtime-added
 * `js` class is stripped from <html> so `.reveal` blocks below the fold
 * render at rest instead of waiting for an observer that will never run.
 * CSS-only entrance (hero copy, marquee) still animates on its own.
 *
 * Usage: npm run build; then npm run prerender
 * Env:   CHROME_PATH — explicit browser binary (else common paths are probed)
 *        PREVIEW_PORT — static server port (default 5199)
 */
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { writeFileSync, existsSync } from "node:fs";
import { chromium } from "playwright-core";

const PORT = process.env.PREVIEW_PORT ?? "5199";
const DIST = new URL("../dist/", import.meta.url);

const CANDIDATES = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

async function main() {
  const root = fileURLToPath(new URL("../dist/", import.meta.url));
  // minimal static server (no child processes — sandbox-safe)
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
      const file = join(root, urlPath === "/" ? "index.html" : urlPath);
      const body = await readFile(file);
      res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404);
      res.end("not found");
    }
  });
  await new Promise((r) => server.listen(Number(PORT), "127.0.0.1", r));
  const stop = () => server.close();
  process.on("exit", stop);

  // wait for the preview server
  const base = `http://127.0.0.1:${PORT}/`;
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(base);
      if (res.ok) break;
    } catch {
      /* retry */
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  let executablePath;
  for (const p of CANDIDATES) {
    if (existsSync(p)) {
      executablePath = p;
      break;
    }
  }
  if (!executablePath) throw new Error("No Chrome binary found (set CHROME_PATH)");

  const browser = await chromium.launch({ executablePath });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base, { waitUntil: "networkidle" });
  // entrance choreography: hero .9s + .8s, flows 1.9s, reveals .6s
  await page.waitForTimeout(3000);
  let html = await page.content();
  await browser.close();
  stop();

  // Without JS there is no IntersectionObserver: drop the runtime `js` flag
  // so .reveal never hides content (CSS default is visible-at-rest).
  html = html.replace(/<html([^>]*?)class="js"/, "<html$1class=\"\"");
  html = html.replace(/<html([^>]*?)class="([^"]*)\bjs\b([^"]*)"/, '<html$1class="$2$3"');

  const out = fileURLToPath(new URL("index.html", DIST));
  writeFileSync(out, "<!-- prerendered: static snapshot for no-JS parity; app hydrates on load -->\n" + html);
  console.log("prerendered", out);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
