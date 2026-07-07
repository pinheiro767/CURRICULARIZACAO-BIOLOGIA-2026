const CACHE_NAME='bio-repro-studio-v1';
const ASSETS=['./','./index.html','./style.css','./app.js','./relatorio.js','./prompts.js','./manifest.json','./assets/img/fundo-repro.png','./assets/img/robo-repro.png','./assets/img/capa-repro.png','./assets/img/memoria-repro.png','./assets/img/quiz-repro.png','./assets/img/cartas-repro.png','./assets/img/cruzadas-repro.png','./assets/img/mapa-repro.png','./assets/img/trofeu-repro.png','./assets/icons/icon-192.png','./assets/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(ASSETS)))})
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))))})
self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)))})
