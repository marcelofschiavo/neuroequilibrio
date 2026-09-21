"use client";

import { motion } from "motion/react";
import type { Slide as TipoSlide } from "@/conteudo/blocos";
import { degrau } from "@/lib/motion";
import { Cerebro } from "./Cerebro";
import { LinhaDoDia } from "./LinhaDoDia";
import { Capa, Engolido, Modelo, Palestrante, Relogio } from "./slides/Abertura";
import { AtoLayout, CenaMarina } from "./slides/Atos";
import { Funil, Monotarefa, Pne, Regra } from "./slides/Metodos";
import { Arco, Compromisso, Encerramento, Rifo } from "./slides/Fechamento";
import { RespiracaoColetiva } from "./slides/RespiracaoColetiva";
import { Fecho } from "./slides/Fecho";

function Corpo({ slide }: { slide: TipoSlide }) {
  switch (slide.tipo) {
    case "capa":
      return <Capa slide={slide} />;
    case "relogio":
      return <Relogio slide={slide} />;
    case "palestrante":
      return <Palestrante slide={slide} />;
    case "engolido":
      return <Engolido />;
    case "modelo":
      return <Modelo />;
    case "cena":
      return <CenaMarina slide={slide} />;
    case "ato":
      return <AtoLayout slide={slide} />;
    case "regra":
      return <Regra slide={slide} />;
    case "funil":
      return <Funil slide={slide} />;
    case "pne":
      return <Pne />;
    case "respiracao":
      return <RespiracaoColetiva titulo={slide.titulo} ciclos={slide.ciclos} trilhaHref={slide.trilhaHref} />;
    case "monotarefa":
      return <Monotarefa slide={slide} />;
    case "arco":
      return <Arco />;
    case "rifo":
      return <Rifo slide={slide} />;
    case "compromisso":
      return <Compromisso />;
    case "encerramento":
      return <Encerramento />;
    case "cerebro":
      return (
        <div className="flex min-h-0 w-full flex-1 flex-col gap-[1.6vmin]">
          {slide.titulo && (
            <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-corpo text-acento">
              {slide.titulo}
            </motion.h2>
          )}
          <Cerebro interativo painel />
        </div>
      );
    case "fecho":
      return <Fecho slide={slide} />;
    case "titulo":
    default:
      return (
        <div className="flex min-h-0 w-full flex-1 flex-col justify-center gap-[3vmin]">
          <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-mega text-acento">
            {slide.titulo}
          </motion.h2>
          {slide.destaque && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-[26ch] text-palco-corpo font-semibold leading-snug text-ink-2"
            >
              {slide.destaque}
            </motion.p>
          )}
        </div>
      );
  }
}

/**
 * Todo slide ocupa a altura inteira da área de conteúdo: o título fica no alto,
 * os blocos se esticam e a fonte desce para o pé. Nada de conteúdo "boiando"
 * no meio com faixas vazias em cima e embaixo.
 */
export function Slide({ slide }: { slide: TipoSlide }) {
  return (
    <div className="flex min-h-0 w-full flex-1 gap-[2.4vmin]">
      {slide.marcaHora && <LinhaDoDia hora={slide.marcaHora} />}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Corpo slide={slide} />
      </div>
    </div>
  );
}
