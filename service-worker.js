var STATIC_CACHE = 'bunny-static-v1';
var STATIC_FILES = [
  '/',
  '/index.html',
  '/js/main.js',
  '/js/app.js',
  '/app.css',
  'main.css',
  '/jewel0.png',
  '/jewel1.png',
  '/jewel2.png',
  '/jewel3.png',
  '/jewel4.png',
  '/jewel5.png',
  'img/jewelBunny.png',
  'fonts/Palatino.ttf',
  'fonts/Plantagenet_Cherokee.ttf'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(STATIC_CACHE).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(STATIC_FILES);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== STATIC_CACHE) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});