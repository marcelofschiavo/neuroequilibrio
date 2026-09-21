"use client";

import { useId, useState } from "react";
import { motion } from "motion/react";
import { REGIOES, ORDEM_REGIOES, type RegiaoCerebro } from "@/conteudo/cerebro";
import { usePalco } from "./PalcoContext";

/*
 * Sistema de coordenadas: a imagem do cérebro (public/cerebro/cerebro.png)
 * ocupa 0..760 × 0..700; a área ao redor (margens de 230 e 30) abriga os
 * rótulos e as linhas-guia. Tudo é % do contêiner, então escala com a tela.
 */
const VB = { x: -230, y: -30, w: 1220, h: 760 };
const pctX = (x: number) => `${((x - VB.x) / VB.w) * 100}%`;
const pctY = (y: number) => `${((y - VB.y) / VB.h) * 100}%`;

type Geo = {
  /** Forma da região sobre a imagem. */
  forma: { tipo: "elipse"; cx: number; cy: number; rx: number; ry: number } | { tipo: "path"; d: string };
  /** Centro do rótulo (HTML) e a linha-guia que liga o rótulo à região. */
  rotulo: { x: number; y: number };
  linha: [number, number, number, number];
  /** Estrutura profunda: não aparece na vista lateral, então o contorno é tracejado. */
  profunda?: boolean;
};

const GEO: Record<RegiaoCerebro, Geo> = {
  preFrontal: {
    forma: { tipo: "elipse", cx: 135, cy: 240, rx: 82, ry: 128 },
    rotulo: { x: -100, y: 140 },
    linha: [-10, 150, 70, 205],
  },
  ganglios: {
    forma: { tipo: "elipse", cx: 420, cy: 230, rx: 64, ry: 52 },
    rotulo: { x: 850, y: 90 },
    linha: [790, 95, 470, 205],
    profunda: true,
  },
  limbico: {
    forma: { tipo: "elipse", cx: 335, cy: 330, rx: 44, ry: 38 },
    rotulo: { x: -100, y: 430 },
    linha: [-10, 430, 292, 346],
    profunda: true,
  },
  troncoCerebral: {
    forma: {
      tipo: "path",
      d: "M354 470 L424 470 C440 520 480 590 498 648 L462 664 C430 600 385 530 354 470 Z",
    },
    rotulo: { x: 850, y: 590 },
    linha: [782, 595, 500, 630],
  },
};

/** Trajeto dos "sinais" (do tronco até a frente do cérebro). */
const SINAL = { xs: [480, 430, 400, 300, 200, 135], ys: [640, 520, 400, 300, 260, 240] };

type Props = {
  /** Regiões acesas pelo roteiro. Em modo interativo, começa vazio e o clique escolhe. */
  ativas?: RegiaoCerebro[];
  interativo?: boolean;
  /** Sem rótulos nem linhas — só a imagem e o brilho (usado nos textos corridos da trilha). */
  compacto?: boolean;
  /** Mostra o painel "o que faz / onde fica / por que importa" da região escolhida. */
  painel?: boolean;
  /** Uma linha por região acesa sob o desenho (desligada nos atos: o texto de apoio já diz isso). */
  legenda?: boolean;
  className?: string;
};

export function Cerebro({ ativas, interativo = false, compacto = false, painel = false, legenda: mostrarLegenda = true, className = "" }: Props) {
  const { reduzido } = usePalco();
  const id = useId().replace(/:/g, "");
  const [escolhida, setEscolhida] = useState<RegiaoCerebro | null>(null);
  const acesas: RegiaoCerebro[] = interativo ? (escolhida ? [escolhida] : []) : (ativas ?? []);
  const primeira = acesas[0];

  const descricao = acesas.length
    ? `Cérebro da Marina, com destaque em: ${acesas.map((r) => REGIOES[r].nome).join(" e ")}.`
    : "Cérebro da Marina, sem região em destaque.";

  function formaSvg(g: Geo, props: Record<string, unknown>) {
    return g.forma.tipo === "elipse" ? (
      <ellipse cx={g.forma.cx} cy={g.forma.cy} rx={g.forma.rx} ry={g.forma.ry} {...props} />
    ) : (
      <path d={g.forma.d} {...props} />
    );
  }

  const figura = (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio: `${VB.w} / ${VB.h}` }}
      {...(interativo ? { role: "group", "aria-label": "Regiões do cérebro da Marina" } : { role: "img", "aria-label": descricao })}
    >
      <svg
        viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter id={`${id}-b`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>

        <image href="/cerebro/cerebro.png" x="0" y="0" width="760" height="700" />

        {/* linhas-guia */}
        {!compacto &&
          ORDEM_REGIOES.map((r) => {
            const [x1, y1, x2, y2] = GEO[r].linha;
            const acesa = acesas.includes(r);
            return (
              <line
                key={r}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={acesa ? "var(--acento)" : "var(--line-2)"}
                strokeWidth={acesa ? 5 : 3}
                strokeDasharray={acesa ? undefined : "8 8"}
                strokeLinecap="round"
              />
            );
          })}

        {/* regiões: brilho pulsante + contorno */}
        {ORDEM_REGIOES.map((r) => {
          const g = GEO[r];
          const acesa = acesas.includes(r);
          if (!acesa && !interativo) return null;
          return (
            <g
              key={r}
              onClick={interativo ? () => setEscolhida(r) : undefined}
              style={{ cursor: interativo ? "pointer" : undefined }}
            >
              {interativo && formaSvg(g, { fill: "transparent", stroke: "transparent", strokeWidth: 36 })}
              {acesa && (
                <motion.g
                  style={{ filter: `url(#${id}-b)` }}
                  initial={{ opacity: 0.35 }}
                  animate={reduzido ? { opacity: 0.55 } : { opacity: [0.35, 0.75, 0.35] }}
                  transition={reduzido ? { duration: 0 } : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  {formaSvg(g, { fill: "var(--acento)" })}
                </motion.g>
              )}
              {formaSvg(g, {
                fill: acesa ? "var(--acento)" : "transparent",
                fillOpacity: acesa ? 0.32 : 0,
                stroke: acesa ? "var(--acento)" : "var(--muted)",
                strokeWidth: acesa ? 6 : 3,
                strokeDasharray: g.profunda || !acesa ? "10 8" : undefined,
                strokeLinejoin: "round",
              })}
            </g>
          );
        })}

        {/* sinais viajando do tronco à frente — só quando há região acesa e a animação está ligada */}
        {!reduzido && acesas.length > 0 && !compacto &&
          [0, 1.4].map((atraso) => (
            <motion.circle
              key={atraso}
              r={11}
              fill="var(--acento)"
              stroke="var(--bg)"
              strokeWidth={3}
              initial={{ cx: SINAL.xs[0], cy: SINAL.ys[0], opacity: 0 }}
              animate={{ cx: SINAL.xs, cy: SINAL.ys, opacity: [0, 1, 1, 1, 1, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, delay: atraso, ease: "easeInOut" }}
            />
          ))}
      </svg>

      {/* rótulos: HTML, com o tamanho de texto do palco (nunca menor que 26 px) */}
      {!compacto &&
        ORDEM_REGIOES.map((r) => {
          const acesa = acesas.includes(r);
          const [l1, l2] = REGIOES[r].rotulo;
          const classe = `text-palco-nota rounded-xl border-[3px] px-3 py-1.5 text-center font-bold leading-[1.1] transition-colors ${
            acesa
              ? "border-acento bg-acento text-sobre-acento"
              : "border-line-2 bg-surface text-ink-2 hover:border-acento"
          }`;
          const estilo = { left: pctX(GEO[r].rotulo.x), top: pctY(GEO[r].rotulo.y) };
          const conteudo = (
            <>
              {l1}
              <br />
              {l2}
            </>
          );
          return interativo ? (
            <button
              key={r}
              type="button"
              aria-pressed={acesa}
              aria-label={REGIOES[r].nome}
              onClick={() => setEscolhida(r)}
              className={`absolute -translate-x-1/2 -translate-y-1/2 ${classe}`}
              style={estilo}
            >
              {conteudo}
            </button>
          ) : (
            <span key={r} className={`absolute -translate-x-1/2 -translate-y-1/2 ${classe} ${acesa ? "" : "opacity-80"}`} style={estilo}>
              {conteudo}
            </span>
          );
        })}
    </div>
  );

  // Legenda: uma linha por região acesa (modo roteiro) ou painel completo (modo clique).
  const legenda = mostrarLegenda && !compacto && !painel && acesas.length > 0 && (
    <ul className="mt-[1.6vmin] flex flex-col gap-1 text-palco-nota leading-snug text-ink-2">
      {acesas.map((r) => (
        <li key={r}>
          <strong className="text-ink">{REGIOES[r].nome}:</strong> {REGIOES[r].oQue}
        </li>
      ))}
    </ul>
  );

  if (!painel) {
    return (
      <div className="flex w-full flex-col">
        {figura}
        {legenda}
      </div>
    );
  }

  const info = primeira ? REGIOES[primeira] : null;
  return (
    <div className="grid min-h-0 w-full flex-1 items-center gap-[3vmin] lg:grid-cols-[1.7fr_1fr]">
      {figura}
      <div
        className="min-h-[30vh] self-stretch rounded-2xl border-[3px] border-line-2 bg-surface p-[2.4vmin]"
        aria-live="polite"
      >
        {info ? (
          <dl className="flex flex-col gap-[1.6vmin] text-palco-texto leading-snug">
            <dt className="titulo text-palco-corpo text-acento">{info.nome}</dt>
            <div>
              <dt className="dados text-palco-nota uppercase tracking-wide text-muted">O que faz</dt>
              <dd>{info.oQue}</dd>
            </div>
            <div>
              <dt className="dados text-palco-nota uppercase tracking-wide text-muted">Onde fica</dt>
              <dd>{info.onde}</dd>
            </div>
            <div>
              <dt className="dados text-palco-nota uppercase tracking-wide text-muted">Por que importa</dt>
              <dd>{info.porQue}</dd>
            </div>
            <div className="border-t-2 border-line-2 pt-[1.4vmin]">
              <dt className="dados text-palco-nota uppercase tracking-wide text-muted">Na história da Marina</dt>
              <dd>{info.marina}</dd>
            </div>
          </dl>
        ) : (
          <p className="text-palco-texto text-ink-2">
            Escolha uma região: clique nela, ou use <kbd className="dados rounded border-2 border-line-2 px-2">Tab</kbd> e{" "}
            <kbd className="dados rounded border-2 border-line-2 px-2">Enter</kbd>.
          </p>
        )}
      </div>
    </div>
  );
}
