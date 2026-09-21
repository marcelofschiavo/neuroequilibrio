"use client";

import { motion } from "motion/react";
import { ArrowRight, Compass, ListChecks, Timer, Wind, LayoutList } from "lucide-react";
import { degrau, escada } from "@/lib/motion";
import { ARCO, COMPROMISSO, ENCERRAMENTO, NOTIFICACOES, RIFO } from "@/conteudo/marina";
import { TrilhaNota } from "../TrilhaNota";
import { usePalco } from "../PalcoContext";
import type { Slide } from "@/conteudo/blocos";

/* ------------------------------------------------------------------ arco */

export function Arco() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-[2vmin]">
      <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-corpo text-ink">
        {ARCO.titulo}
      </motion.h2>
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_auto_1fr] grid-rows-[auto_repeat(4,minmax(0,1fr))] items-stretch gap-x-[2vmin] gap-y-[1.4vmin]">
        <span className="dados text-palco-nota font-black uppercase tracking-wide text-alerta">{ARCO.de}</span>
        <span aria-hidden />
        <span className="dados text-palco-nota font-black uppercase tracking-wide text-acento">{ARCO.para}</span>
        {ARCO.linhas.map((l, i) => (
          <motion.div key={l.de} className="contents" initial="entra" animate="ativo" variants={escada(0, 0.3 + i * 0.55)}>
            <motion.p variants={degrau} className="flex items-center rounded-2xl border-[3px] border-alerta bg-alerta-wash px-[2vmin] py-[1vmin] text-palco-texto font-semibold leading-snug text-ink">
              {l.de}
            </motion.p>
            <motion.span variants={degrau} className="flex items-center">
              <ArrowRight aria-label="vira" className="h-[5vmin] w-[5vmin] text-ink-2" strokeWidth={3} />
            </motion.span>
            <motion.p variants={degrau} className="flex items-center rounded-2xl border-[3px] border-acento bg-acento-wash px-[2vmin] py-[1vmin] text-palco-texto font-semibold leading-snug text-ink">
              {l.para}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ R.I.F.O. */

export function Rifo({ slide }: { slide: Slide }) {
  const { reduzido } = usePalco();
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-[2vmin]">
      <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-corpo text-ink">
        {RIFO.titulo}
      </motion.h2>

      <div className="relative grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-[2vmin]">
        {RIFO.quadrantes.map((q, i) => (
          <motion.div
            key={q.letra}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.4 }}
            className="flex items-center gap-[2vmin] rounded-3xl border-[3px] border-acento bg-surface-2 p-[2.2vmin]"
          >
            <span
              aria-hidden
              className="titulo flex h-[13vmin] w-[13vmin] shrink-0 items-center justify-center rounded-full bg-acento text-[length:calc(clamp(48px,6vw,104px)*var(--escala-texto,1))] leading-none text-sobre-acento"
            >
              {q.letra}
            </span>
            <div className="min-w-0">
              <p className="titulo text-palco-corpo leading-tight text-ink">
                <span className="sr-only">{q.letra}: </span>
                {q.nome}
              </p>
              <p className="mt-1 text-palco-texto font-semibold leading-snug text-ink-2">{q.texto}</p>
            </div>
          </motion.div>
        ))}

        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 flex h-[11vmin] w-[11vmin] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[4px] border-acento bg-bg text-acento"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={reduzido ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, rotate: [0, 25, -25, 0] }}
          transition={reduzido ? { duration: 0 } : { delay: 1.8, duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Compass className="h-[62%] w-[62%]" strokeWidth={2.2} />
        </motion.span>
      </div>
      <TrilhaNota href={slide.trilhaHref} />
    </div>
  );
}

/* ------------------------------------------------------------ compromisso */

const ICONES_COMP = [Timer, ListChecks, Wind, LayoutList];

export function Compromisso() {
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col justify-center gap-[3vmin]">
      <p className="dados flex items-center gap-3 text-palco-nota font-bold uppercase tracking-wide text-muted">
        {COMPROMISSO.chamada}
      </p>
      <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-titulo leading-tight text-ink">
        {COMPROMISSO.frase}{" "}
        <motion.span
          aria-hidden
          className="inline-block w-[5ch] border-b-[6px] border-acento align-baseline"
          animate={{ opacity: [1, 0.35, 1] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          &nbsp;
        </motion.span>
      </motion.h2>
      <motion.ul initial="entra" animate="ativo" variants={escada(0.25, 0.8)} className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-[2vmin]">
        {COMPROMISSO.opcoes.map((o, i) => {
          const Icone = ICONES_COMP[i];
          return (
            <motion.li
              key={o}
              variants={degrau}
              className="flex items-center gap-[1.6vmin] rounded-2xl border-[3px] border-acento bg-acento-wash p-[1.8vmin] text-palco-texto font-semibold leading-snug text-ink"
            >
              <Icone aria-hidden className="mt-1 h-[1.5em] w-[1.5em] shrink-0 text-acento" strokeWidth={2.4} />
              {o}
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}

/* ---------------------------------------------------------- 17:00 encerramento */

export function Encerramento() {
  const { reduzido } = usePalco();
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-[4vmin] text-center">
      <div aria-hidden className="flex max-w-[64vw] flex-wrap justify-center gap-[1.4vmin] opacity-30">
        {NOTIFICACOES.slice(0, 6).map((n, i) => (
          <motion.span
            key={n.texto}
            className="rounded-lg border-2 border-line-2 px-3 py-1 text-palco-rodape text-ink-2"
            animate={reduzido ? undefined : { opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, delay: i * 0.7 }}
          >
            {n.texto}
          </motion.span>
        ))}
      </div>
      <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-titulo text-ink">
        {ENCERRAMENTO.titulo}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="max-w-[32ch] text-palco-corpo leading-tight text-acento [font-family:Georgia,serif]"
      >
        {ENCERRAMENTO.citacao}
      </motion.p>
    </div>
  );
}
