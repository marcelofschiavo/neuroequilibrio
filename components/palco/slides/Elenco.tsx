"use client";

import { motion } from "motion/react";
import { degrau, escada } from "@/lib/motion";
import { PERSONAGENS } from "@/conteudo/personagens";
import type { Slide } from "@/conteudo/blocos";

/** Os 4 personagens lado a lado — abertura e fecho da narrativa do dia. */
export function Elenco({ slide }: { slide: Slide }) {
  return (
    <div className="flex flex-col gap-8 w-full">
      {slide.titulo && (
        <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-titulo text-acento">
          {slide.titulo}
        </motion.h2>
      )}
      <motion.div initial="entra" animate="ativo" variants={escada(0.08, 0.15)} className="grid grid-cols-4 gap-5 w-full">
        {PERSONAGENS.map((p) => (
          <motion.div key={p.id} variants={degrau} className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-5">
            <span className="dados flex h-14 w-14 items-center justify-center rounded-full border-2 border-acento text-2xl font-black text-acento">
              {p.inicial}
            </span>
            <p className="text-palco-nota font-bold text-ink">{p.nome}</p>
            <p className="text-sm text-ink-2">{p.papel}</p>
            <p className="dados text-xs uppercase tracking-wide text-muted">{p.hora} · {p.tema}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
