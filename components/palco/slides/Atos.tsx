"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { AlertTriangle, ArrowRight } from "lucide-react";
import { degrau, escada } from "@/lib/motion";
import { ALTERNANCIA, ATOS, CENAS, CLIENTE_FALA } from "@/conteudo/marina";
import { Cerebro } from "../Cerebro";
import { Fonte } from "../Fonte";
import { usePalco } from "../PalcoContext";
import type { Slide } from "@/conteudo/blocos";

/* ------------------------------------------------------------------ cena */

/** A cena em quadrinho: hora e fala à esquerda (em ordem de leitura), imagem grande à direita. */
export function CenaMarina({ slide }: { slide: Slide }) {
  const { reduzido } = usePalco();
  const c = CENAS[slide.cena!];
  return (
    <div className="grid min-h-0 w-full flex-1 grid-cols-[1fr_auto] items-stretch gap-[4vmin]">
      <motion.div initial="entra" animate="ativo" variants={escada(0.35, 0.1)} className="flex min-w-0 flex-col justify-center gap-[3.4vmin]">
        <motion.p variants={degrau} className="dados text-palco-mega font-black leading-none text-acento">
          {c.hora}
        </motion.p>
        <motion.p variants={degrau} className="text-palco-corpo font-bold leading-tight text-ink">
          {c.situacao}
        </motion.p>
        <motion.p variants={degrau} className="titulo text-palco-corpo text-acento">
          {c.pensamento}
        </motion.p>
      </motion.div>

      <motion.figure
        initial={{ opacity: 0, scale: 0.94, rotate: -1.5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="relative h-full max-h-full max-w-[46vw] self-center overflow-hidden rounded-3xl border-[5px] border-ink shadow-xl"
        style={{ aspectRatio: "1 / 1" }}
      >
        <motion.div
          className="absolute inset-0"
          animate={reduzido ? undefined : { scale: [1, 1.06] }}
          transition={{ duration: 14, ease: "linear" }}
        >
          <Image src={c.imagem} alt={c.alt} fill sizes="45vw" className="object-cover" priority />
        </motion.div>
      </motion.figure>
    </div>
  );
}

/* ---------------------------------------------------------------- layout */

/**
 * Um ato. O olhar percorre: título → visual (à esquerda) → seta → cérebro da
 * Marina (à direita) → texto de apoio. A seta e o atraso do cérebro marcam
 * essa ordem; a fonte fica no pé, discreta.
 */
export function AtoLayout({ slide }: { slide: Slide }) {
  const { reduzido } = usePalco();
  const ato = ATOS[slide.ato!];
  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-[1.4vmin]">
      <div className="grid min-h-0 flex-1 grid-cols-[1.12fr_auto_1fr] items-stretch gap-[2vmin]">
        <div className="flex min-h-0 min-w-0 flex-col gap-[2vmin]">
          <motion.h2
            initial="entra"
            animate="ativo"
            variants={degrau}
            className="titulo shrink-0 text-[length:calc(clamp(26px,2.2vw,42px)*var(--escala-texto,1))] text-ink"
          >
            {ato.titulo}
          </motion.h2>
          <div className="flex min-h-0 flex-1 items-center">
            <div className="h-full min-h-0 w-full">
              {slide.visual === "curva" ? <VisualCurva /> : slide.visual === "mochila" ? <VisualMochila /> : slide.visual === "ecg" ? <VisualEcg /> : <VisualAlternancia />}
            </div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4 }}
            className="shrink-0 rounded-2xl border-[3px] border-acento bg-acento-wash px-[2vmin] py-[1.2vmin] text-palco-nota font-semibold leading-[1.3] text-ink"
          >
            {ato.callout}
          </motion.p>
        </div>

        <motion.span
          role="img"
          aria-label="no cérebro"
          className="self-center text-acento"
          initial={{ opacity: 0 }}
          animate={reduzido ? { opacity: 1 } : { opacity: 1, x: [0, 10, 0] }}
          transition={reduzido ? { duration: 0 } : { delay: 1.4, duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowRight aria-hidden className="h-[6vmin] w-[6vmin]" strokeWidth={3} />
        </motion.span>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex min-h-0 flex-col items-center justify-center gap-[1vmin]"
        >
          <p className="dados self-start text-palco-rodape font-bold uppercase tracking-wide text-muted">No cérebro da Marina</p>
          <Cerebro ativas={ato.regioes} legenda={false} />
        </motion.div>
      </div>
      <Fonte ids={ato.fontes} evidencia={ato.evidencia} ilustrativo={ato.ilustrativo} />
    </div>
  );
}

/* -------------------------------------------------------- Ato 1: a curva */

/** Ruído determinístico — o gráfico não pode "tremer" de forma diferente a cada visita. */
function ruido(i: number) {
  const v = Math.sin(i * 12.9898) * 43758.5453;
  return (v - Math.floor(v)) - 0.5;
}

const CURVA_FADIGA = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 44; i++) {
    const x = 450 + i * 10;
    const y = 128 + i * 2.2 + ruido(i) * 70;
    pts.push(`${i === 0 ? "M" : "L"}${x} ${Math.round(y)}`);
  }
  return pts.join(" ");
})();

function VisualCurva() {
  const legenda = [
    { cor: "bg-acento", txt: "Ondas naturais do foco" },
    { cor: "bg-alerta", txt: "Fadiga: foco irregular" },
  ];
  return (
    <div className="flex h-full min-h-0 flex-col gap-[1vmin]">
      <div className="flex min-h-0 flex-1 items-stretch gap-2">
        <span className="dados text-palco-rodape font-bold text-ink-2 [text-orientation:mixed] [writing-mode:vertical-rl] rotate-180">
          Capacidade de foco →
        </span>
        <svg viewBox="0 0 900 250" className="h-full min-h-0 w-full flex-1" role="img" aria-label="Gráfico ilustrativo: o foco oscila em ondas naturais e, depois de horas sem pausa, cai e fica irregular, abaixo da expectativa de quatro horas sem levantar.">
          <line x1="10" y1="10" x2="10" y2="240" stroke="var(--ink-2)" strokeWidth="4" />
          <line x1="10" y1="240" x2="890" y2="240" stroke="var(--ink-2)" strokeWidth="4" />
          <line x1="10" y1="30" x2="890" y2="30" stroke="var(--ink-2)" strokeWidth="4" strokeDasharray="14 10" />
          <motion.path
            d="M10 110 C 80 110 110 195 190 195 C 270 195 300 85 380 85 C 420 85 440 110 450 128"
            fill="none"
            stroke="var(--acento)"
            strokeWidth="9"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          />
          <motion.path
            d={CURVA_FADIGA}
            fill="none"
            stroke="var(--alerta)"
            strokeWidth="7"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.6, delay: 1.5, ease: "linear" }}
          />
        </svg>
      </div>
      <ul className="flex flex-wrap items-center gap-x-[2.4vmin] gap-y-1 text-palco-rodape font-semibold text-ink">
        {legenda.map((l) => (
          <li key={l.txt} className="flex items-center gap-2">
            <span aria-hidden className={`h-2 w-8 rounded-full ${l.cor}`} />
            {l.txt}
          </li>
        ))}
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-0 w-8 border-t-4 border-dashed border-ink-2" />A expectativa: 4 horas sem levantar
        </li>
        <li className="ml-auto dados text-ink-2">Tempo →</li>
      </ul>
    </div>
  );
}

/* ------------------------------------------------------- Ato 2: a mochila */

const PEDRINHAS = [
  { cx: 92, cy: 292 }, { cx: 132, cy: 300 }, { cx: 172, cy: 294 }, { cx: 212, cy: 300 },
  { cx: 112, cy: 266 }, { cx: 152, cy: 270 }, { cx: 192, cy: 268 },
];

function VisualMochila() {
  const { reduzido } = usePalco();
  return (
    <div className="grid h-full min-h-0 grid-cols-[auto_1fr] items-center gap-[2vmin]">
      <motion.svg
        viewBox="0 0 300 340"
        className="h-full max-h-full w-auto"
        role="img"
        aria-label="Uma mochila transparente cheia de pedrinhas, com uma pedra grande e vermelha em cima: o turno descoberto."
        animate={reduzido ? undefined : { scaleY: [1, 1, 0.965] }}
        style={{ transformOrigin: "50% 100%" }}
        transition={{ duration: 3.2, times: [0, 0.8, 1] }}
      >
        <path d="M70 150 C 70 120 230 120 230 150 L 236 300 C 236 322 224 330 200 330 L 100 330 C 76 330 64 322 64 300 Z" fill="var(--surface-2)" stroke="var(--ink-2)" strokeWidth="6" />
        <path d="M100 150 C 100 100 200 100 200 150" fill="none" stroke="var(--ink-2)" strokeWidth="6" />
        <rect x="88" y="232" width="124" height="80" rx="16" fill="none" stroke="var(--ink-2)" strokeWidth="5" />
        <path d="M76 170 C 40 200 40 270 70 300" fill="none" stroke="var(--ink-2)" strokeWidth="6" strokeLinecap="round" />
        <path d="M224 170 C 262 200 262 270 232 300" fill="none" stroke="var(--ink-2)" strokeWidth="6" strokeLinecap="round" strokeDasharray="22 8" />
        {PEDRINHAS.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.cx}
            cy={p.cy}
            r={19}
            fill="var(--acento)"
            stroke="var(--ink)"
            strokeWidth="3"
            initial={{ y: -180, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 14, delay: 0.3 + i * 0.22 }}
          />
        ))}
        <motion.path
          d="M96 118 C 84 84 116 44 160 44 C 208 44 232 84 214 116 C 200 138 120 140 96 118 Z"
          fill="var(--alerta)"
          stroke="var(--ink)"
          strokeWidth="5"
          initial={{ y: -220, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 110, damping: 11, delay: 2 }}
        />
      </motion.svg>

      <ul className="flex flex-col gap-[1.2vmin] text-palco-nota font-semibold leading-snug text-ink">
        <li className="flex items-start gap-3 rounded-xl border-[3px] border-alerta bg-alerta-wash px-3 py-2">
          <span aria-hidden className="mt-[0.35em] h-[0.9em] w-[0.9em] shrink-0 rounded-full bg-alerta" />
          <span>
            <strong>A pedra:</strong> turno descoberto — acionar RH e cliente
          </span>
        </li>
        <li className="flex items-start gap-3 rounded-xl border-[3px] border-acento bg-acento-wash px-3 py-2">
          <span aria-hidden className="mt-[0.35em] h-[0.9em] w-[0.9em] shrink-0 rounded-full bg-acento" />
          <span>
            <strong>As pedrinhas:</strong> responder WhatsApp · aprovar solicitação · pausar tarefa? · qual canal usar?
          </span>
        </li>
      </ul>
    </div>
  );
}

/* --------------------------------------------------------- Ato 3: o ECG */

function VisualEcg() {
  const { reduzido } = usePalco();
  return (
    <div className="flex h-full min-h-0 flex-col gap-[1.4vmin]">
      <div className="min-h-0 flex-1 overflow-hidden rounded-2xl border-[4px] border-ink bg-[#0A1F1A] px-2 py-1">
        <svg viewBox="0 0 600 150" className="h-full w-full" role="img" aria-label="Eletrocardiograma ilustrativo: batimentos calmos que, de repente, disparam em picos altos e irregulares.">
          <g stroke="#1E4A3C" strokeWidth="1.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="150" />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 50} x2="600" y2={i * 50} />
            ))}
          </g>
          <motion.path
            d="M0 85 L120 85 C140 85 150 66 165 66 C180 66 190 85 210 85 L250 85 L262 92 L275 14 L292 138 L306 72 L322 85 L350 85 L364 42 L378 118 L392 28 L406 132 L420 48 L436 112 L452 62 L470 104 L488 76 L600 84"
            fill="none"
            stroke="#8BE04A"
            strokeWidth="6"
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={reduzido ? { pathLength: 1 } : { pathLength: [0, 1, 1] }}
            transition={reduzido ? { duration: 0 } : { duration: 4.5, times: [0, 0.7, 1], repeat: Infinity, repeatDelay: 0.8, ease: "linear" }}
          />
        </svg>
      </div>
      <blockquote className="shrink-0 rounded-2xl border-[4px] border-alerta bg-alerta-wash px-[2vmin] py-[1.2vmin]">
        <span className="dados block text-palco-rodape font-bold uppercase text-alerta">Fala do cliente</span>
        <p className="titulo text-palco-texto leading-tight text-ink">{CLIENTE_FALA}</p>
      </blockquote>
    </div>
  );
}

/* ------------------------------------------------- Ato 4: a alternância */

function Linha({ itens, destaque = false, atraso = 0 }: { itens: string[]; destaque?: boolean; atraso?: number }) {
  return (
    <motion.ol
      initial="entra"
      animate="ativo"
      variants={escada(0.12, atraso)}
      className={`flex justify-start gap-[2.4vmin] ${destaque ? "text-alerta" : "text-ink"}`}
      aria-label={itens.join(" ")}
    >
      {itens.map((t, i) => (
        <motion.li
          key={`${t}${i}`}
          variants={degrau}
          className={`titulo relative text-[length:calc(clamp(44px,5.4vw,92px)*var(--escala-texto,1))] leading-none ${destaque && i % 2 === 1 ? "opacity-90" : ""}`}
          aria-hidden
        >
          {t}
          {destaque && i % 2 === 1 && <span className="absolute inset-x-[-4px] top-1/2 h-[6px] -rotate-12 rounded-full bg-alerta" />}
        </motion.li>
      ))}
    </motion.ol>
  );
}

function VisualAlternancia() {
  return (
    <div className="flex h-full min-h-0 flex-col justify-around gap-[1vmin]">
      <Linha itens={ALTERNANCIA.letras} />
      <Linha itens={ALTERNANCIA.numeros} atraso={0.9} />
      <Linha itens={ALTERNANCIA.misto} destaque atraso={2} />
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.4 }}
        className="flex items-center gap-2 text-palco-nota font-bold text-alerta"
      >
        <AlertTriangle aria-hidden className="h-[1.3em] w-[1.3em]" strokeWidth={2.6} />
        Alternar: cada troca custa tempo e atenção.
      </motion.p>
    </div>
  );
}
