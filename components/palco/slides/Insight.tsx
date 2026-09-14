"use client";

import { motion } from "motion/react";
import { degrau, escada, ambiente } from "@/lib/motion";
import { ContagemNumero } from "../ContagemNumero";
import { Fonte } from "../Fonte";
import { Cerebro } from "../Cerebro";
import type { Slide } from "@/conteudo/blocos";

/**
 * Slide de dado técnico. O número conta do zero (quando há). À direita, o
 * cérebro-diagrama acende a região do mecanismo (quando o slide indica uma),
 * senão um anel decorativo ocupa o espaço. Fonte sempre visível.
 */
export function Insight({ slide }: { slide: Slide }) {
  return (
    <div className="relative w-full">
      {slide.regiaoCerebro ? (
        <div className="pointer-events-none absolute right-[2vw] top-1/2 -translate-y-1/2">
          <Cerebro regiaoAtiva={slide.regiaoCerebro} tamanho={300} />
        </div>
      ) : (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute right-[3vw] top-1/2 h-[44vmin] w-[44vmin] -translate-y-1/2 rounded-full border-[1.1vmin] border-acento"
          initial="ativo"
          animate="ativo"
          variants={ambiente}
        />
      )}
      <motion.div initial="entra" animate="ativo" variants={escada(0.12, 0.05)} className="relative flex max-w-[62vw] flex-col gap-6">
        {slide.numeroValor !== undefined && (
          <motion.div variants={degrau} className="flex flex-wrap items-baseline gap-x-4">
            <span className="dados font-black leading-none text-acento text-palco-mega">
              <ContagemNumero valor={slide.numeroValor} />
            </span>
            {slide.numeroSufixo && (
              <span className="dados font-black leading-none text-acento text-palco-titulo">{slide.numeroSufixo.trim()}</span>
            )}
          </motion.div>
        )}
        {slide.unidade && (
          <motion.p variants={degrau} className="text-palco-nota text-ink-2">
            {slide.unidade}
          </motion.p>
        )}
        {slide.titulo && (
          <motion.p variants={degrau} className="text-palco-corpo font-bold text-ink">
            {slide.titulo}
          </motion.p>
        )}
        {slide.destaque && (
          <motion.p variants={degrau} className="text-palco-corpo font-bold text-acento">
            {slide.destaque}
          </motion.p>
        )}
        <Fonte ids={slide.fonteIds} />
      </motion.div>
    </div>
  );
}
