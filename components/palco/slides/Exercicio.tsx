"use client";

import { motion } from "motion/react";
import { degrau, escada } from "@/lib/motion";
import type { Slide } from "@/conteudo/blocos";

/**
 * Momento conduzido por você — mão levantada, pausa, pergunta em voz alta.
 * O pulso lento fica à direita, na metade vazia da tela: dá ao público algo
 * pra olhar durante o silêncio sem passar por cima do texto.
 */
export function Exercicio({ slide }: { slide: Slide }) {
  return (
    <div className="relative w-full">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[7vw] top-1/2 h-[30vmin] w-[30vmin] -translate-y-1/2 rounded-full bg-acento"
        initial={{ opacity: 0.12, scale: 1 }}
        animate={{ opacity: [0.12, 0.32, 0.12], scale: [1, 1.2, 1] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial="entra"
        animate="ativo"
        variants={escada(0.1, 0.05)}
        className="relative flex max-w-[62vw] flex-col gap-6"
      >
        {slide.duracaoSugerida && (
          <motion.span
            variants={degrau}
            className="dados w-fit rounded-full border-2 border-acento px-5 py-1.5 text-palco-rodape uppercase tracking-wide text-acento"
          >
            {slide.duracaoSugerida}
          </motion.span>
        )}
        {slide.titulo && (
          <motion.h2 variants={degrau} className="titulo text-palco-titulo text-acento">
            {slide.titulo}
          </motion.h2>
        )}
        {slide.instrucao && (
          <motion.p variants={degrau} className="text-palco-corpo font-semibold text-ink">
            {slide.instrucao}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
