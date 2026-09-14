"use client";

import { motion } from "motion/react";
import Image from "next/image";
import type { Slide as TipoSlide } from "@/conteudo/blocos";
import { escreve, degrau, escada, ambiente } from "@/lib/motion";
import { Insight } from "./slides/Insight";
import { Grafico } from "./slides/Grafico";
import { Exercicio } from "./slides/Exercicio";
import { Abertura } from "./slides/Abertura";
import { RespiracaoColetiva } from "./slides/RespiracaoColetiva";
import { Cena } from "./slides/Cena";
import { Elenco } from "./slides/Elenco";
import { Fecho } from "./slides/Fecho";
import { PALESTRANTE } from "@/conteudo/palestrante";
import { Logo } from "@/components/ui/Logo";

export function Slide({ slide }: { slide: TipoSlide }) {
  switch (slide.tipo) {
    case "capa":
      return (
        <div className="palco-conteudo">
          <div className="grid w-full grid-cols-[1fr_auto] items-center gap-12">
            <div className="flex min-w-0 flex-col gap-8">
              <motion.h1
                initial="entra"
                animate="ativo"
                variants={escreve}
                className="titulo text-palco-titulo text-acento"
              >
                {slide.titulo}
              </motion.h1>
              {slide.destaque && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="dados text-palco-nota uppercase tracking-[0.18em] text-ink-2"
                >
                  {slide.destaque}
                </motion.p>
              )}
            </div>
            <div className="relative flex h-[56vmin] w-[48vmin] items-center justify-center">
              <motion.div
                aria-hidden
                className="absolute h-[44vmin] w-[44vmin] rounded-full bg-acento"
                initial="ativo"
                animate="ativo"
                variants={ambiente}
                style={{ opacity: 0.16 }}
              />
              <div className="relative">
                <Logo tamanho={140} branco />
              </div>
            </div>
          </div>
        </div>
      );

    case "abertura":
      return (
        <div className="palco-conteudo">
          <Abertura numero={slide.numeroBloco ?? 1} total={slide.totalBlocos ?? 1} titulo={slide.titulo ?? ""} />
        </div>
      );

    case "titulo":
      return (
        <div className="palco-conteudo gap-6">
          <motion.h1 initial="entra" animate="ativo" variants={escreve} className="titulo text-palco-mega text-acento">
            {slide.titulo}
          </motion.h1>
          {slide.destaque && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-palco-nota text-ink-2"
            >
              {slide.destaque}
            </motion.p>
          )}
          {slide.titulo === "Priscila Ramos" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute right-[6vw] top-1/2 h-[46vmin] w-[36vmin] -translate-y-1/2 overflow-hidden rounded-2xl border-2 border-acento"
            >
              <Image src={PALESTRANTE.foto} alt={PALESTRANTE.nome} fill className="object-cover" sizes="36vmin" />
            </motion.div>
          )}
        </div>
      );

    case "frase":
      return (
        <div className="palco-conteudo gap-6">
          <motion.p initial="entra" animate="ativo" variants={degrau} className="text-palco-titulo font-bold leading-[1.05] text-ink max-w-5xl">
            {slide.titulo}
          </motion.p>
          {slide.destaque && (
            <motion.p
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-palco-titulo font-bold leading-[1.05] text-acento max-w-5xl"
            >
              {slide.destaque}
            </motion.p>
          )}
        </div>
      );

    case "lista":
      return (
        <div className="palco-conteudo gap-8">
          {slide.titulo && (
            <motion.h2 initial="entra" animate="ativo" variants={escreve} className="titulo text-palco-titulo text-acento">
              {slide.titulo}
            </motion.h2>
          )}
          <motion.ul initial="entra" animate="ativo" variants={escada()} className="flex flex-col gap-4">
            {slide.itens?.map((item, i) => (
              <motion.li key={i} variants={degrau} className="text-palco-corpo font-semibold leading-tight text-ink flex items-baseline gap-4">
                <span className="text-acento">·</span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      );

    case "duasColunas": {
      const temItens = slide.colunas?.some((c) => c.itens.length > 0);
      return (
        <div className="palco-conteudo items-center justify-center text-center">
          <div className="grid grid-cols-2 gap-16 w-full items-center">
            {slide.colunas?.map((coluna, i) => {
              const aceso = coluna.tom === "aceso";
              return (
                <div key={i} className="flex flex-col items-center gap-6">
                  <motion.h2
                    initial="entra"
                    animate="ativo"
                    variants={escreve}
                    className={`titulo ${temItens ? "text-palco-titulo" : "text-palco-mega"}`}
                    style={{ color: aceso ? "var(--acento)" : "var(--muted)" }}
                  >
                    {coluna.titulo}
                  </motion.h2>
                  {temItens && (
                    <motion.ul initial="entra" animate="ativo" variants={escada(0.06, 0.4)} className="flex flex-col items-center gap-3">
                      {coluna.itens.map((item, j) => (
                        <motion.li key={j} variants={degrau} className="text-palco-corpo font-semibold" style={{ color: aceso ? "var(--ink)" : "var(--ink-2)" }}>
                          {item}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case "elenco":
      return (
        <div className="palco-conteudo">
          <Elenco slide={slide} />
        </div>
      );

    case "cena":
      return (
        <div className="palco-conteudo">
          <Cena slide={slide} />
        </div>
      );

    case "insight":
      return (
        <div className="palco-conteudo">
          <Insight slide={slide} />
        </div>
      );

    case "grafico":
      return (
        <div className="palco-conteudo">
          <Grafico slide={slide} />
        </div>
      );

    case "exercicio":
      return (
        <div className="palco-conteudo">
          <Exercicio slide={slide} />
        </div>
      );

    case "respiracao":
      return (
        <div className="palco-conteudo">
          <RespiracaoColetiva titulo={slide.titulo} ciclos={slide.ciclos} />
        </div>
      );

    case "fecho":
      return (
        <div className="palco-conteudo">
          <Fecho slide={slide} />
        </div>
      );

    default:
      return null;
  }
}
