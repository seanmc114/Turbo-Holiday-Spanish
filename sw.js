// Turbo Holiday — Service Worker
// Caches all game files for offline play

const CACHE = 'turbo-holiday-v1';

const FILES = [
  './',
  './index.html',
  './es.html',
  './fr.html',
  './de.html',
  './it.html',
  './pt.html',
  './manifest.json',
  './icon.png',
  './icon-192.png',
  './icon-512.png',
];

// Install — cache everything
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

// Activate — clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — serve from cache, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
