"use client";

import { useEffect } from "react";

/** Registra o Service Worker em produção — só pra abrir /palco offline no dia. */
export function Inicializacao() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => navigator.serviceWorker.ready)
        .then((registro) => {
          const urls = performance
            .getEntriesByType("resource")
            .map((entrada) => entrada.name)
            .filter((url) => url.startsWith(location.origin));
          urls.push(location.href);
          registro.active?.postMessage({ tipo: "cachear", urls });
        })
        .catch(() => {
          // Sem SW a página funciona igual — só não abre offline.
        });
    }
  }, []);

  return null;
}
