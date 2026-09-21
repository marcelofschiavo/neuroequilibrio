"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ORDEM_REGIOES, REGIOES, type RegiaoCerebro } from "@/conteudo/cerebro";
import { ATOS } from "@/conteudo/marina";
import { degrau } from "@/lib/motion";

/** Posição de cada região sobre a imagem (0..760 × 0..700) e o tamanho do brilho. */
const POS: Record<RegiaoCerebro, { x: number; y: number; rx: number; ry: number; profunda?: boolean }> = {
  preFrontal: { x: 135, y: 240, rx: 82, ry: 128 },
  ganglios: { x: 420, y: 230, rx: 64, ry: 52, profunda: true },
  limbico: { x: 335, y: 330, rx: 44, ry: 38, profunda: true },
  troncoCerebral: { x: 430, y: 560, rx: 46, ry: 100 },
};

const FERRAMENTA: Record<RegiaoCerebro, { href: string; rotulo: string }> = {
  preFrontal: { href: "/trilha/micropausa", rotulo: "Regra 90-3-1: uma pausa para o córtex" },
  ganglios: { href: "/trilha/plano", rotulo: "Meu plano do dia: regras que rodam sozinhas" },
  limbico: { href: "/trilha/rifo", rotulo: "Protocolo P.N.E. para o alarme" },
  troncoCerebral: { href: "/trilha/suspiro", rotulo: "Suspiro fisiológico guiado" },
};

const ATO_LISTA = Object.values(ATOS);

export function CerebroTrilha() {
  const [regiao, setRegiao] = useState<RegiaoCerebro>("preFrontal");
  const [hora, setHora] = useState<string | null>(null);

  const acesas: RegiaoCerebro[] = hora ? (ATO_LISTA.find((a) => a.hora === hora)?.regioes ?? []) : [regiao];
  const info = REGIOES[regiao];
  const ferramenta = FERRAMENTA[regiao];

  function escolher(r: RegiaoCerebro) {
    setHora(null);
    setRegiao(r);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.05fr_1fr]">
      {/* o cérebro */}
      <div>
        <div className="relative mx-auto aspect-[760/700] w-full max-w-[520px] rounded-3xl border border-line bg-surface-2 p-3 shadow-sm">
          <Image src="/cerebro/cerebro.png" alt="Vista lateral de um cérebro, com quatro regiões marcadas por botões numerados." fill sizes="(min-width:1024px) 520px, 90vw" className="object-contain p-4" priority />
          <svg viewBox="0 0 760 700" className="absolute inset-0 h-full w-full p-4" aria-hidden>
            {ORDEM_REGIOES.map((r) => {
              const p = POS[r];
              const ligada = acesas.includes(r);
              return (
                <motion.ellipse
                  key={r}
                  cx={p.x}
                  cy={p.y}
                  rx={p.rx}
                  ry={p.ry}
                  fill="var(--acento)"
                  stroke="var(--acento-2)"
                  strokeWidth={5}
                  strokeDasharray={p.profunda ? "12 8" : undefined}
                  initial={false}
                  animate={{ opacity: ligada ? [0.35, 0.6, 0.35] : 0.06, scale: ligada ? 1 : 0.92 }}
                  transition={ligada ? { duration: 2, repeat: Infinity } : { duration: 0.3 }}
                  style={{ transformOrigin: `${p.x}px ${p.y}px`, transformBox: "view-box" }}
                />
              );
            })}
          </svg>
          {ORDEM_REGIOES.map((r, i) => {
            const p = POS[r];
            const ligada = acesas.includes(r);
            return (
              <button
                key={r}
                type="button"
                onClick={() => escolher(r)}
                aria-label={`${REGIOES[r].nome}${ligada ? " (em destaque)" : ""}`}
                aria-pressed={regiao === r && !hora}
                className={`dados absolute flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] text-base font-black shadow-md transition-transform hover:scale-110 sm:h-12 sm:w-12 sm:text-lg ${
                  ligada ? "border-white bg-acento text-sobre-acento" : "border-acento bg-white text-acento-2"
                }`}
                style={{ left: `${(((p.x + (r === "preFrontal" ? -60 : 0)) / 760) * 92) + 4}%`, top: `${((p.y + (r === "troncoCerebral" ? -60 : 0)) / 700) * 92 + 4}%` }}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-center text-sm text-muted">Toque nos números. Contornos tracejados são estruturas profundas, que não aparecem por fora.</p>
      </div>

      {/* os controles e o texto */}
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="dados text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Explorar uma região</h2>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {ORDEM_REGIOES.map((r, i) => (
              <button
                key={r}
                type="button"
                onClick={() => escolher(r)}
                aria-pressed={regiao === r && !hora}
                className={`flex items-center gap-2 rounded-xl border-2 px-3 py-2 text-left text-sm font-bold ${
                  regiao === r && !hora ? "border-acento bg-acento text-sobre-acento" : "border-line-2 bg-surface-2 text-ink"
                }`}
              >
                <span aria-hidden className="dados">{i + 1}</span> {REGIOES[r].nome}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="dados text-[11px] font-bold uppercase tracking-[0.14em] text-muted">Ou veja um momento do dia da Marina</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {ATO_LISTA.map((a) => (
              <button
                key={a.hora}
                type="button"
                onClick={() => setHora(hora === a.hora ? null : a.hora)}
                aria-pressed={hora === a.hora}
                className={`dados rounded-full border-2 px-4 py-2 font-bold ${
                  hora === a.hora ? "border-acento bg-acento text-sobre-acento" : "border-line-2 bg-surface-2 text-ink"
                }`}
              >
                {a.hora}
              </button>
            ))}
          </div>
        </div>

        <div aria-live="polite">
          <AnimatePresence mode="wait">
            {hora ? (
              <motion.div key={hora} initial="entra" animate="ativo" exit="sai" variants={degrau} className="rounded-2xl border-2 border-acento bg-acento-wash p-5">
                <p className="dados text-xs font-bold uppercase text-acento-2">Às {hora} acendem</p>
                <p className="mt-1 text-xl font-bold text-ink">{acesas.map((r) => REGIOES[r].nome).join(" e ")}</p>
                <p className="mt-2 text-base leading-relaxed text-ink-2">{ATO_LISTA.find((a) => a.hora === hora)?.callout}</p>
              </motion.div>
            ) : (
              <motion.div key={regiao} initial="entra" animate="ativo" exit="sai" variants={degrau} className="rounded-2xl border-2 border-acento bg-acento-wash p-5">
                <h3 className="titulo text-2xl text-ink">{info.nome}</h3>
                <dl className="mt-3 grid gap-3 text-base leading-relaxed">
                  {(
                    [
                      ["O que faz", info.oQue],
                      ["Onde fica", info.onde],
                      ["Por que importa", info.porQue],
                      ["Na Marina", info.marina],
                    ] as const
                  ).map(([k, v]) => (
                    <div key={k}>
                      <dt className="dados text-[11px] font-bold uppercase tracking-[0.14em] text-acento-2">{k}</dt>
                      <dd className="text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={ferramenta.href} className="mt-4 inline-flex items-center gap-2 rounded-full bg-acento px-4 py-2 text-sm font-bold text-sobre-acento">
                  {ferramenta.rotulo} <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
