"use client";

import { useEffect } from "react";
import { marcarModuloConcluido } from "@/lib/local";

/** Marca o módulo como concluído ao abrir a página. Só local — sem servidor. */
export function MarcarConcluido({ modulo }: { modulo: string }) {
  useEffect(() => {
    marcarModuloConcluido(modulo);
  }, [modulo]);
  return null;
}
