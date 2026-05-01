/* EcoDay service worker.
 * Strategy:
 *   - Same-origin GET: stale-while-revalidate. Cached shell is served
 *     instantly, then refreshed in the background. Ensures the survey
 *     keeps working with no signal once it has loaded once.
 *   - Cross-origin (Google Apps Script webhook): pass through, never cache.
 *     Both submission POSTs and dashboard GETs always go to the network.
 */
const CACHE_VERSION = "ecoday-v2";
const SHELL = ["/", "/dashboard"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      cache.addAll(SHELL).catch(() => undefined)
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_VERSION)
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) {
    // never cache the webhook or any other cross-origin call
    return;
  }

  event.respondWith(
    caches.open(CACHE_VERSION).then(async (cache) => {
      const cached = await cache.match(req);
      const network = fetch(req)
        .then((res) => {
          if (res.ok && (res.type === "basic" || res.type === "default")) {
            cache.put(req, res.clone()).catch(() => undefined);
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
