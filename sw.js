/* ═══════════════════════════════════════════════
   SERVICE WORKER - Sistema Telão v17k
   Cache offline + atualização automática
═══════════════════════════════════════════════ */
const CACHE_NAME = 'telao-v17k-fix3';
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
/* ── Recebe pedido do index.html para ativar a versão nova na hora ── */
self.addEventListener('message', function(e) {
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
/* ── Fetch: network-first para a página principal (HTML) e Supabase,
        cache-first para os demais assets (ícones, css, js) ── */
self.addEventListener('fetch', function(e) {
  var url = e.request.url;

  /* Requisições ao Supabase sempre vão para a rede */
  if (url.includes('supabase.co')) {
    e.respondWith(fetch(e.request).catch(function() {
      return new Response('{}', { headers: { 'Content-Type': 'application/json' } });
    }));
    return;
  }

  /* Página principal (navegação / index.html / "/"): NETWORK-FIRST
     Sempre busca a versão mais nova no servidor. Só cai pro cache
     se estiver offline. Isso resolve o problema de ficar preso
     na versão antiga depois de um novo upload. */
  var isNavigation = e.request.mode === 'navigate' ||
                      e.request.destination === 'document' ||
                      url.endsWith('/index.html') ||
                      /\/$/.test(new URL(url).pathname);

  if (isNavigation) {
    e.respondWith(
      fetch(e.request).then(function(response) {
        if (response && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(e.request, clone);
          });
        }
        return response;
      }).catch(function() {
        return caches.match(e.request).then(function(cached) {
          return cached || caches.match('/index.html');
        });
      })
    );
    return;
  }

  /* Demais assets (ícones, css, js): cache-first */
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
