const CACHE='saude-reprodutiva-pwa-v1';
const FILES=['./','./index.html','./manifest.json','./service-worker.js','./assets/icon-192.png','./assets/icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES))));
self.addEventListener('fetch',e=>e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request))));
