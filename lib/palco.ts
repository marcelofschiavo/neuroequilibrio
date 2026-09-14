"use client";

import { slidesEmSequencia } from "@/conteudo/blocos";

/**
 * Navegação do palco. Puramente local — sem Supabase, sem sessão, sem
 * celular de plateia. A apresentadora conduz ao vivo; isto só guarda a
 * posição atual (para sobreviver a um F5 sem perder o lugar).
 */
export const SEQUENCIA_PALCO = slidesEmSequencia();

const CHAVE_POSICAO = "ne26:palco:posicao";

export function indiceDoSlide(slideId: string | null): number {
  if (!slideId) return 0;
  const i = SEQUENCIA_PALCO.findIndex((s) => s.slide.id === slideId);
  return i === -1 ? 0 : i;
}

export function lerPosicaoSalva(): number {
  if (typeof window === "undefined") return 0;
  const id = window.localStorage.getItem(CHAVE_POSICAO);
  return indiceDoSlide(id);
}

export function salvarPosicao(indice: number): void {
  if (typeof window === "undefined") return;
  const slide = SEQUENCIA_PALCO[indice];
  if (slide) window.localStorage.setItem(CHAVE_POSICAO, slide.slide.id);
}
