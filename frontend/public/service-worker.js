const CACHE_NAME = "yellow-ochre-gas-pwa-v3";
const CORE_ASSETS = [
  "/",
  "/offline.html",
  "/manifest.json",
  "/images/Gas-engineer-at-work-in-kitchen.png",
  "/images/gas-safe-engineer-2.jpg",
  "/images/gas-safe-engineer.jpg",
  "/images/icons8-google.svg"
];

async function putIfValid(request, response) {
  if (!response || response.status !== 200 || response.type === "opaque") return response;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
  return response;
}

async function networkFirst(request, fallbackUrl = "/offline.html") {
  try {
    return await putIfValid(request, await fetch(request));
  } catch {
    return (await caches.match(request)) || caches.match(fallbackUrl);
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    return await putIfValid(request, await fetch(request));
  } catch {
    return caches.match("/offline.html");
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const { request } = event;
  const url = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "/offline.html"));
    return;
  }

  if (url.pathname.startsWith("/static/") || ["script", "style", "document"].includes(request.destination)) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (request.destination === "image" || request.destination === "font") {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(networkFirst(request));
});
