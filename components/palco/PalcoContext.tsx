"use client";

import { createContext, useContext } from "react";

/**
 * Estado do palco que os slides precisam saber. `reduzido` vale quando a
 * apresentadora apertou A OU o sistema pede menos movimento — os slides usam
 * isso para parar as animações em laço (que a biblioteca de movimento não
 * consegue desligar sozinha).
 */
export const PalcoCtx = createContext<{ reduzido: boolean }>({ reduzido: false });

export function usePalco() {
  return useContext(PalcoCtx);
}
