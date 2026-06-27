/* =========================================================================
   Pole Position service worker.
   Job: open offline after first load, and update cleanly with no surprise reload.
   Strategy: precache the shell on install; serve cache-first; on a new version,
   activate and let the page show an "Update available" banner (controllerchange).
   ========================================================================= */

// Bump on every release. MUST match the in-app APP_VERSION constant in index.html.
const VERSION = "1.5.0";
const CACHE = "pole-position-v" + VERSION;

// Let the page force a waiting worker to activate ("Check for updates" button).
self.addEventListener("message", (e) => { if (e.data === "skip-waiting") self.skipWaiting(); });

// Full offline shell. Relative URLs so it works on the /pole-position/ subpath.
const SHELL = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "src/sync.js",
  "src/i18n.js",
  "vendor/peerjs.min.js",
  "vendor/qrcode.min.js",
  "vendor/jsqr.min.js",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/icon-maskable-512.png",
];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // new version applies on next load
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // add individually with {cache:"reload"} so one 404 doesn't fail the whole
      // install and so a new version never precaches a stale shell.
      Promise.all(
        SHELL.map((url) =>
          cache
            .add(new Request(url, { cache: "reload" }))
            .catch((err) => console.warn("[sw] precache miss:", url, err && err.message))
        )
      )
    )
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys.filter((k) => k.startsWith("pole-position-v") && k !== CACHE).map((k) => caches.delete(k))
      );
      await self.clients.claim();
    })()
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // sync brokers are reached by PeerJS, not fetch

  event.respondWith(
    (async () => {
      const cached = await caches.match(req, { ignoreSearch: true });
      if (cached) return cached;
      try {
        const res = await fetch(req);
        if (res && res.ok && res.type === "basic") {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      } catch (err) {
        if (req.mode === "navigate") {
          const shell = (await caches.match("index.html")) || (await caches.match("./"));
          if (shell) return shell;
        }
        throw err;
      }
    })()
  );
});
