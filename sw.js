/* ═══════════════════════════════════════════════
   SERVICE WORKER - Sistema Telão v17k
   Cache offline + atualização automática
═══════════════════════════════════════════════ */

const CACHE_NAME = 'telao-v17k';
const ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png'
];

/* ── Instala e faz cache dos assets principais ── */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

/* ── Ativa e limpa caches antigos ── */
self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE_NAME; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

/* ── Fetch: network-first para API, cache-first para assets ── */
self.addEventListener('fetch', function(e) {
  var url = e.request.url;

  /* Requisições ao Supabase sempre vão para a rede */
  if (url.includes('supabase.co')) {
    e.respondWith(fetch(e.request).catch(function() {
      return new Response('{}', { headers: { 'Content-Type': 'application/json' } });
    }));
    return;
  }

  /* Assets: cache-first */
  e.respondWith(
    caches.match(e.request).then(function(cached) {
      return cached || fetch(e.request).then(function(response) {
        /* Armazena em cache se for OK */
        if (response && response.status === 200 && response.type === 'basic') {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, clone);
          });
        }
        return response;
      }).catch(function() {
        /* Offline sem cache → retorna index.html */
        return caches.match('/index.html');
      });
    })
  );
});
