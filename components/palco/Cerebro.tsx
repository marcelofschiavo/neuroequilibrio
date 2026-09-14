"use client";

import { useState } from "react";
import { motion } from "motion/react";

export type RegiaoCerebro = "preFrontal" | "limbico" | "troncoCerebral" | "ganglios";

const REGIOES: Record<RegiaoCerebro, { nome: string; fato: string }> = {
  preFrontal: {
    nome: "Córtex pré-frontal",
    fato: "Decide, planeja e freia impulsos. É a área mais cara de manter ativa — e a primeira a cansar.",
  },
  limbico: {
    nome: "Sistema límbico (amígdala)",
    fato: "Dispara a resposta de estresse. Sob ameaça percebida, assume o controle antes do pensamento racional.",
  },
  troncoCerebral: {
    nome: "Tronco cerebral",
    fato: "Comanda a respiração — e por isso é a porta de entrada mais rápida pra acalmar o corpo.",
  },
  ganglios: {
    nome: "Gânglios da base",
    fato: "Rodam hábitos e sequências automáticas, quase sem gastar controle deliberado.",
  },
};

/**
 * Perfil de cérebro em SVG, com 4 regiões clicáveis. Não é anatomicamente
 * exato — é um diagrama didático, no traço da marca (contorno fino, uma
 * região acesa em verde por vez). Funciona em dois modos:
 *
 * - `regiaoAtiva` fixa (controlada pelo roteiro): ilustra o insight do slide.
 * - sem `regiaoAtiva`: fica interativo — a apresentadora clica pra explorar,
 *   útil no bloco de perguntas abertas.
 */
export function Cerebro({
  regiaoAtiva,
  tamanho = 320,
  interativo = false,
}: {
  regiaoAtiva?: RegiaoCerebro;
  tamanho?: number;
  interativo?: boolean;
}) {
  const [selecionada, setSelecionada] = useState<RegiaoCerebro | null>(null);
  const ativa = regiaoAtiva ?? selecionada;
  const info = ativa ? REGIOES[ativa] : null;

  function corDe(regiao: RegiaoCerebro) {
    return ativa === regiao ? "var(--acento)" : "var(--line-2)";
  }

  const ROTULO: Record<RegiaoCerebro, string> = {
    preFrontal: "pré-frontal",
    ganglios: "gânglios da base",
    limbico: "límbico",
    troncoCerebral: "tronco",
  };

  function regiao(
    id: RegiaoCerebro,
    cx: number,
    cy: number,
    r: number,
    rotulo: { x: number; y: number; ancora?: "start" | "middle" | "end" },
    path?: string
  ) {
    const cor = corDe(id);
    const acesa = ativa === id;
    return (
      <g
        onClick={interativo ? () => setSelecionada(id) : undefined}
        style={{ cursor: interativo ? "pointer" : "default" }}
      >
        {/* alvo de clique generoso, invisível — a forma visível pode ser menor */}
        {interativo && <circle cx={cx} cy={cy} r={r + 16} fill="transparent" />}
        {path ? (
          <motion.path d={path} fill={cor} fillOpacity={acesa ? 0.85 : 0.22} stroke={cor} strokeWidth="2" animate={{ fillOpacity: acesa ? 0.85 : 0.22 }} />
        ) : (
          <motion.circle cx={cx} cy={cy} r={r} fill={cor} fillOpacity={acesa ? 0.85 : 0.22} stroke={cor} strokeWidth="2" animate={{ fillOpacity: acesa ? 0.85 : 0.22 }} />
        )}
        {/* rótulo sempre visível, apagado — só acende quando a região está ativa */}
        <text
          x={rotulo.x}
          y={rotulo.y}
          textAnchor={rotulo.ancora ?? "middle"}
          fontSize="10"
          fontFamily="var(--font-dados)"
          letterSpacing="0.02em"
          fill={acesa ? "var(--acento)" : "var(--muted)"}
          opacity={acesa ? 1 : 0.75}
        >
          {ROTULO[id]}
        </text>
      </g>
    );
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <svg width={tamanho} height={tamanho * 0.83} viewBox="0 0 300 250" fill="none">
        {/*
          Contorno geral do cérebro — só 4 âncoras (topo/direita/base/esquerda), com
          tangentes contínuas em cada uma, pra fechar num blob liso — sem o efeito
          "flor" de curvas com cúspide em cada ponto.
        */}
        <path
          d="M150 20 C 215 20 270 55 270 110 C 270 165 220 212 150 225
             C 90 238 30 195 25 140 C 20 85 78 20 150 20 Z"
          stroke="var(--muted)"
          strokeWidth="2.5"
          fill="none"
          strokeLinejoin="round"
        />
        {/* cerebelo — pequeno lobo na base traseira, só decorativo */}
        <path d="M50 168 C 40 181 49 197 69 195 C 63 181 57 173 50 168 Z" stroke="var(--muted)" strokeWidth="2" fill="none" />

        {regiao(
          "preFrontal",
          222,
          88,
          0,
          { x: 232, y: 24 },
          "M195 55 C 226 52 252 68 258 94 C 261 110 253 121 240 124 C 226 110 208 100 192 96 C 183 80 184 63 195 55 Z"
        )}
        {regiao("ganglios", 140, 130, 25, { x: 140, y: 168 })}
        {regiao("limbico", 176, 152, 15, { x: 197, y: 155, ancora: "start" })}
        {regiao(
          "troncoCerebral",
          148,
          198,
          0,
          { x: 148, y: 246 },
          "M136 188 C 133 202 137 218 149 226 C 161 232 175 228 179 216 C 181 204 175 192 163 186 C 153 182 143 184 136 188 Z"
        )}
      </svg>

      {info && (
        <motion.div
          key={ativa}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[34vmin] text-center"
        >
          <p className="dados text-xs uppercase tracking-wide text-acento">{info.nome}</p>
          {interativo && <p className="mt-1 text-sm text-ink-2">{info.fato}</p>}
        </motion.div>
      )}

      {interativo && !ativa && (
        <p className="dados text-xs uppercase tracking-wide text-muted">clique numa região</p>
      )}
    </div>
  );
}
