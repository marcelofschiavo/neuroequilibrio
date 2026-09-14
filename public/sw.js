/**
 * Service Worker — mantém o /palco abrindo mesmo se a internet da sala cair.
 *
 * Estratégia: CacheFirst para asset estático, NetworkFirst com fallback em
 * cache para navegação. Precache é resiliente de propósito: um item que
 * falhe não pode derrubar a instalação inteira.
 */
const VERSAO = "ne26-v1";
const CACHE_ESTATICO = `${VERSAO}-estatico`;
const CACHE_PAGINAS = `${VERSAO}-paginas`;

const PRECACHE = [
  "/",
  "/palco",
  "/palco/aguardando",
  "/trilha",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
];

function cachearCadaUm(nomeCache, urls) {
  return caches.open(nomeCache).then((cache) => Promise.allSettled(urls.map((url) => cache.add(url))));
}

self.addEventListener("install", (evento) => {
  evento.waitUntil(cachearCadaUm(CACHE_ESTATICO, PRECACHE).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((chaves) =>
        Promise.all(
          chaves.filter((chave) => chave.startsWith("ne26-") && !chave.startsWith(VERSAO)).map((chave) => caches.delete(chave))
        )
      )
      .then(() => self.clients.claim())
  );
});

// A primeira visita carrega JS/CSS/fontes antes de o SW existir. A página
// manda a lista do que já baixou, e o SW guarda — basta abrir o palco uma
// vez com internet (no ensaio) para ele funcionar offline no dia.
self.addEventListener("message", (evento) => {
  if (evento.data && evento.data.tipo === "cachear" && Array.isArray(evento.data.urls)) {
    evento.waitUntil(cachearCadaUm(CACHE_ESTATICO, evento.data.urls));
  }
});

function ehAssetEstatico(url) {
  return (
    url.pathname.startsWith("/fontes/") ||
    url.pathname.startsWith("/logo/") ||
    url.pathname.startsWith("/palestrante/") ||
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/_next/image") ||
    /\.(png|jpg|jpeg|webp|svg|woff2?|ttf)$/.test(url.pathname)
  );
}

self.addEventListener("fetch", (evento) => {
  if (evento.request.method !== "GET") return;
  const url = new URL(evento.request.url);
  if (url.origin !== self.location.origin) return;

  if (ehAssetEstatico(url)) {
    evento.respondWith(
      caches.match(evento.request).then(
        (cacheado) =>
          cacheado ||
          fetch(evento.request).then((resposta) => {
            if (resposta.ok) {
              const clone = resposta.clone();
              caches.open(CACHE_ESTATICO).then((cache) => cache.put(evento.request, clone));
            }
            return resposta;
          })
      )
    );
    return;
  }

  if (evento.request.mode === "navigate") {
    evento.respondWith(
      fetch(evento.request)
        .then((resposta) => {
          if (resposta.ok) {
            const clone = resposta.clone();
            caches.open(CACHE_PAGINAS).then((cache) => cache.put(evento.request, clone));
          }
          return resposta;
        })
        .catch(() => caches.match(evento.request, { ignoreSearch: true }).then((r) => r || caches.match("/")))
    );
  }
});
