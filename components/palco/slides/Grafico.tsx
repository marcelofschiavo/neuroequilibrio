"use client";

import { motion } from "motion/react";
import { escada, degrau } from "@/lib/motion";
import { Fonte } from "../Fonte";
import type { Slide } from "@/conteudo/blocos";

/**
 * Comparação de 2-3 pontos. Sem eixo, sem grade — numa parede, ticks finos
 * não se leem a 4m. O comprimento da barra + o número grande carregam a
 * comparação sozinhos. Ver docs/02-animacoes.md § orçamento de desempenho.
 */
export function Grafico({ slide }: { slide: Slide }) {
  const pontos = slide.pontos ?? [];
  const max = Math.max(...pontos.map((p) => p.valor), 1);

  return (
    <div className="flex flex-col gap-8 w-full">
      {slide.titulo && (
        <motion.h2
          initial="entra"
          animate="ativo"
          variants={degrau}
          className="titulo text-palco-titulo text-acento"
        >
          {slide.titulo}
        </motion.h2>
      )}

      <motion.div
        initial="entra"
        animate="ativo"
        variants={escada(0.15, 0.2)}
        className="flex flex-col gap-6 w-full"
      >
        {pontos.map((ponto) => {
          const fracao = ponto.valor / max;
          return (
            <motion.div key={ponto.rotulo} variants={degrau} className="flex flex-col gap-2">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="min-w-0 text-palco-corpo font-bold text-ink">
                  {ponto.rotulo}
                </span>
                <span className="dados shrink-0 text-palco-corpo font-black text-acento">
                  {ponto.valor.toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="h-8 w-full rounded-md bg-surface-2 overflow-hidden">
                <motion.div
                  className="h-full rounded-md"
                  style={{
                    background: ponto.destaque ? "var(--acento)" : "var(--acento-2)",
                    transformOrigin: "left",
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: fracao }}
                  transition={{ type: "spring", stiffness: 90, damping: 20, delay: 0.3 }}
                />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {slide.unidadeGrafico && (
        <motion.p initial="entra" animate="ativo" variants={degrau} className="text-palco-nota text-ink-2">
          {slide.unidadeGrafico}
        </motion.p>
      )}
      <Fonte ids={slide.fonteIds} />
    </div>
  );
}
