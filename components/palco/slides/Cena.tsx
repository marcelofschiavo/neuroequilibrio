"use client";

import { motion } from "motion/react";
import { degrau, escada } from "@/lib/motion";
import { personagem } from "@/conteudo/personagens";
import { Ilustracao } from "../Ilustracao";
import type { Slide } from "@/conteudo/blocos";

/**
 * A cena de um personagem: hora grande à esquerda (linha do tempo do dia),
 * situação e — quando há — o pensamento dele, como se fosse dito baixinho.
 * À direita, uma ilustração mockada (ícone flat, não foto) do momento.
 */
export function Cena({ slide }: { slide: Slide }) {
  const p = slide.personagemId ? personagem(slide.personagemId) : undefined;
  if (!p) return null;

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute right-[3vw] top-1/2 -translate-y-1/2 opacity-90">
        <Ilustracao personagemId={p.id} tamanho={280} />
      </div>
      <motion.div initial="entra" animate="ativo" variants={escada(0.1, 0.05)} className="relative flex max-w-[62vw] flex-col gap-5">
        <motion.div variants={degrau} className="flex items-baseline gap-4">
          <span className="dados font-black leading-none text-acento text-palco-mega">{slide.hora}</span>
          <span className="text-palco-nota font-semibold text-ink-2">
            {p.nome} · {p.papel}
          </span>
        </motion.div>
        {slide.situacao && (
          <motion.p variants={degrau} className="text-palco-corpo font-bold leading-tight text-ink">
            {slide.situacao}
          </motion.p>
        )}
        {slide.pensamento && (
          <motion.p variants={degrau} className="titulo text-palco-titulo text-acento">
            {slide.pensamento}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
