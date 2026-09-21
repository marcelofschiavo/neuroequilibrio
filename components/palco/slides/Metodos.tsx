"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowRight, Diamond, Eye, GitFork, Tag } from "lucide-react";
import { degrau, escada } from "@/lib/motion";
import { FUNIL, MONOTAREFA, PNE, REGRA_903 } from "@/conteudo/marina";
import { Fonte } from "../Fonte";
import { TrilhaNota } from "../TrilhaNota";
import { usePalco } from "../PalcoContext";
import type { Slide } from "@/conteudo/blocos";

/* ------------------------------------------------------------- 90-3-1 */

export function Regra({ slide }: { slide: Slide }) {
  const cores = ["bg-acento text-sobre-acento", "bg-surface-2 text-ink border-[3px] border-acento", "bg-ink text-bg"];
  return (
    <div className="flex w-full flex-col gap-[2.4vmin]">
      <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-corpo text-ink">
        {REGRA_903.titulo}
      </motion.h2>

      <div className="grid grid-cols-[1.5fr_1fr] gap-[3vmin]">
        <div className="flex flex-col gap-[2.2vmin]">
          <motion.ol initial="entra" animate="ativo" variants={escada(0.5, 0.3)} className="flex items-stretch gap-[1.4vmin]">
            {REGRA_903.etapas.map((e, i) => (
              <motion.li key={e.valor} variants={degrau} className="flex flex-1 items-center gap-[1.4vmin]">
                <div className={`flex h-full w-full flex-col justify-center rounded-2xl p-[1.8vmin] text-center ${cores[i]}`}>
                  <span className="dados text-palco-corpo font-black leading-none">{e.valor}</span>
                  <span className="mt-1 text-palco-nota font-semibold leading-snug">{e.texto}</span>
                </div>
                {i < 2 && <ArrowRight aria-hidden className="h-[4vmin] w-[4vmin] shrink-0 text-acento" strokeWidth={3} />}
              </motion.li>
            ))}
          </motion.ol>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="rounded-2xl border-[3px] border-line-2 bg-surface px-[2vmin] py-[1.2vmin] text-palco-nota font-semibold leading-snug text-ink-2"
          >
            {REGRA_903.aviso}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-col gap-[1.4vmin] rounded-3xl border-[3px] border-acento bg-acento-wash p-[2.2vmin]"
        >
          <span className="dados w-fit rounded-full bg-acento px-4 py-1 text-palco-rodape font-bold uppercase text-sobre-acento">
            Exercício ao vivo · 40 s
          </span>
          <ol className="flex flex-col gap-[1vmin] text-palco-texto font-semibold leading-snug text-ink">
            {REGRA_903.passos.map((p, i) => (
              <li key={p} className="flex gap-3">
                <span className="dados text-acento">{i + 1}.</span>
                {p}
              </li>
            ))}
          </ol>
          <p className="text-palco-texto font-black text-ink">Pergunta: {REGRA_903.pergunta}</p>
        </motion.div>
      </div>

      <Fonte ids={REGRA_903.fontes} evidencia={REGRA_903.evidencia} />
      <TrilhaNota href={slide.trilhaHref} />
    </div>
  );
}

/* --------------------------------------------------------------- funil */

const LARGURAS = ["100%", "86%", "72%", "58%"];

export function Funil({ slide }: { slide: Slide }) {
  const { reduzido } = usePalco();
  return (
    <div className="flex w-full flex-col gap-[1.8vmin]">
      <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-corpo text-ink">
        {FUNIL.titulo}
      </motion.h2>

      <div className="grid grid-cols-[1.35fr_1fr] items-center gap-[3vmin]">
        <div className="flex flex-col items-center gap-[1vmin]">
          {/* pedidos caindo no funil */}
          <div className="relative flex h-[8vh] w-full items-end justify-center gap-[1vmin] overflow-hidden" aria-hidden>
            {FUNIL.entradas.map((e, i) => (
              <motion.span
                key={e}
                className="rounded-lg border-[3px] border-line-2 bg-surface px-2 py-0.5 text-palco-rodape font-bold text-ink-2"
                initial={{ y: -60, opacity: 0 }}
                animate={reduzido ? { y: 0, opacity: 1 } : { y: [-60, 0, 0], opacity: [0, 1, 1] }}
                transition={{ duration: 1.4, delay: i * 0.25, repeat: reduzido ? 0 : Infinity, repeatDelay: 2.4 }}
              >
                {e}
              </motion.span>
            ))}
          </div>

          <motion.ol initial="entra" animate="ativo" variants={escada(0.45, 0.6)} className="flex w-full flex-col items-center gap-[0.8vmin]">
            {FUNIL.perguntas.map((q, i) => (
              <motion.li
                key={q}
                variants={degrau}
                className="flex items-center justify-center gap-3 rounded-xl border-[3px] border-acento bg-acento-wash px-[1.6vmin] py-[1vmin] text-center text-palco-nota font-bold leading-tight text-ink"
                style={{ width: LARGURAS[i] }}
              >
                <span className="dados text-acento">{i + 1}</span>
                {q}
              </motion.li>
            ))}
          </motion.ol>

          <ArrowDown aria-hidden className="h-[4vmin] w-[4vmin] text-acento" strokeWidth={3} />
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.6 }}
            className="flex items-center gap-3 rounded-xl bg-acento px-[2vmin] py-[1vmin] text-palco-nota font-black text-sobre-acento"
          >
            <Diamond aria-hidden className="h-[1.2em] w-[1.2em]" strokeWidth={2.6} />
            {FUNIL.saida}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="rounded-2xl border-[3px] border-line-2 bg-surface p-[2vmin] text-palco-nota font-semibold leading-snug text-ink"
        >
          {FUNIL.aviso}
        </motion.p>
      </div>

      <Fonte ids={FUNIL.fontes} evidencia={FUNIL.evidencia} />
      <TrilhaNota href={slide.trilhaHref} />
    </div>
  );
}

/* ----------------------------------------------------------------- P.N.E. */

const ICONES_PNE = [Eye, Tag, GitFork];

export function Pne() {
  return (
    <div className="flex w-full flex-col gap-[2.2vmin]">
      <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-corpo text-ink">
        {PNE.titulo}
      </motion.h2>

      <div className="grid grid-cols-[0.8fr_1.3fr] items-stretch gap-[3vmin]">
        <div className="flex flex-col items-center justify-center gap-[1.6vmin] rounded-3xl border-[3px] border-line-2 bg-surface p-[2vmin] text-center">
          <h3 className="dados text-palco-nota font-black uppercase tracking-wide text-muted">{PNE.freio.titulo}</h3>
          <Respiro />
          <p className="titulo text-palco-corpo text-acento">{PNE.freio.texto}</p>
          <p className="text-palco-nota font-semibold text-ink-2">{PNE.freio.detalhe}</p>
        </div>

        <div className="flex flex-col gap-[1.4vmin]">
          <h3 className="dados text-palco-nota font-black uppercase tracking-wide text-muted">{PNE.metodo.titulo}</h3>
          <motion.ol initial="entra" animate="ativo" variants={escada(0.5, 0.5)} className="flex flex-col gap-[1.4vmin]">
            {PNE.metodo.passos.map((p, i) => {
              const Icone = ICONES_PNE[i];
              return (
                <motion.li
                  key={p.verbo}
                  variants={degrau}
                  className="flex items-center gap-[2vmin] rounded-2xl border-[3px] border-acento bg-acento-wash p-[1.8vmin]"
                >
                  <Icone aria-hidden className="h-[6vmin] w-[6vmin] shrink-0 text-acento" strokeWidth={2.2} />
                  <p className="text-palco-texto leading-snug text-ink">
                    <strong className="titulo text-acento">{p.verbo}:</strong> {p.texto}
                  </p>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>

      <Fonte ids={PNE.fontes} evidencia={PNE.evidencia} />
    </div>
  );
}

/** A curva do suspiro: duas subidas (a segunda menor) e uma descida longa. */
function Respiro() {
  const { reduzido } = usePalco();
  return (
    <svg viewBox="0 0 400 140" className="h-auto w-full max-w-[30vw]" role="img" aria-label="Curva do suspiro fisiológico: duas inspirações seguidas e uma expiração longa.">
      <line x1="10" y1="120" x2="390" y2="120" stroke="var(--line-2)" strokeWidth="4" />
      <motion.path
        d="M10 120 C 40 120 50 30 90 30 C 120 30 120 70 130 70 C 150 70 150 14 185 14 C 250 14 300 120 390 120"
        fill="none"
        stroke="var(--acento)"
        strokeWidth="9"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={reduzido ? { pathLength: 1 } : { pathLength: [0, 1, 1] }}
        transition={reduzido ? { duration: 0 } : { duration: 4, times: [0, 0.75, 1], repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
      />
    </svg>
  );
}

/* ------------------------------------------------------------ monotarefa */

/** Faixas finas e coloridas: a multitarefa como um tecido cheio de trocas. */
const FAIXAS = Array.from({ length: 46 }, (_, i) => {
  const troca = i % 6 === 2;
  const largura = 1.4 + ((i * 7) % 5) * 0.55;
  return { troca, largura, cor: ["var(--acento)", "var(--ink-2)", "var(--line-2)", "var(--acento-2)"][i % 4] };
});

export function Monotarefa({ slide }: { slide: Slide }) {
  const total = FAIXAS.reduce((s, f) => s + f.largura, 0);
  return (
    <div className="flex w-full flex-col gap-[2vmin]">
      <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-corpo text-ink">
        {MONOTAREFA.titulo}
      </motion.h2>

      <div className="flex flex-col gap-[2vmin]">
        <div className="flex flex-col gap-2">
          <p className="text-palco-texto font-black text-alerta">{MONOTAREFA.caos}</p>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.6, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
            className="flex h-[8vh] w-full overflow-hidden rounded-xl border-[3px] border-ink"
            role="img"
            aria-label="Barra longa, cortada por muitas faixas de troca de tarefa"
          >
            {FAIXAS.map((f, i) => (
              <span
                key={i}
                style={{ width: `${(f.largura / total) * 100}%`, background: f.troca ? "var(--alerta)" : f.cor }}
              />
            ))}
          </motion.div>
          <p className="flex items-center gap-2 text-palco-nota font-bold text-alerta">
            <span aria-hidden className="inline-block h-[1em] w-3 rounded-sm bg-alerta" />
            faixas vermelhas = custo de troca
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-palco-texto font-black text-acento">{MONOTAREFA.sequencial}</p>
          <div className="flex h-[8vh] w-[66%] overflow-hidden rounded-xl border-[3px] border-ink">
            {MONOTAREFA.blocos.map((b, i) => (
              <motion.span
                key={b.texto}
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.7, delay: 1.8 + i * 0.6 }}
                style={{ width: `${b.parte}%`, transformOrigin: "left" }}
                className={`flex items-center justify-center px-2 text-center text-palco-nota font-bold leading-tight ${
                  i === 1 ? "bg-acento text-sobre-acento" : "bg-surface-2 text-ink"
                } ${i > 0 ? "border-l-[3px] border-ink" : ""}`}
              >
                {b.texto}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6 }}
        className="max-w-[40ch] text-palco-texto italic leading-snug text-ink [font-family:Georgia,serif]"
      >
        {MONOTAREFA.citacao}
      </motion.p>

      <Fonte ids={MONOTAREFA.fontes} evidencia={MONOTAREFA.evidencia} ilustrativo />
      <TrilhaNota href={slide.trilhaHref} />
    </div>
  );
}
