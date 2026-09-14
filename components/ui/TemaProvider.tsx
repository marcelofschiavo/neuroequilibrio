"use client";

import { useEffect } from "react";

/**
 * Aplica `data-tema` no <html> por rota. Ver docs/01-design-system.md.
 * Rotas de palco montam `palco`; todo o resto, `leitura`.
 */
export function TemaProvider({
  tema,
  children,
}: {
  tema: "leitura" | "palco";
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.setAttribute("data-tema", tema);
    return () => {
      document.documentElement.setAttribute("data-tema", "leitura");
    };
  }, [tema]);

  return <>{children}</>;
}
