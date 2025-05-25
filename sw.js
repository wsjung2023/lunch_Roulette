const CACHE_NAME = "lunch-roulette-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./appicon1.png",
  "./og_image1.png",
  "./sw.js"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => k !== CACHE_NAME)
          .map((k) => caches.delete(k))
      )
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(
      (resp) => resp || fetch(e.request)
    )
  );
});
