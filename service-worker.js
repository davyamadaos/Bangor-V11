const CACHE = "river-v1";

const ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
  "./js/chart.js",
  "./js/ui.js",
  "./js/api.js",
  "./js/config.js",
  "./js/forecast.js",
  "./js/trend.js",
  "./js/utils.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
