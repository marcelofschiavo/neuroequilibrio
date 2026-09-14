"use client";

import { motion } from "motion/react";
import type { Personagem } from "@/conteudo/personagens";

/**
 * Ilustração mockada da cena — ícone flat, traço único, sem depender de
 * fotografia real (que não temos direito de uso). Uma composição simples
 * por personagem, no verde da marca sobre o grafite do palco.
 */
export function Ilustracao({ personagemId, tamanho = 260 }: { personagemId: Personagem["id"]; tamanho?: number }) {
  return (
    <motion.svg
      width={tamanho}
      height={tamanho}
      viewBox="0 0 200 200"
      fill="none"
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <circle cx="100" cy="100" r="96" stroke="var(--line-2)" strokeWidth="1.5" />
      {DESENHOS[personagemId]}
    </motion.svg>
  );
}

const ACENTO = "var(--acento)";
const INK = "var(--ink-2)";

const DESENHOS: Record<Personagem["id"], React.ReactNode> = {
  // Rafael — tela com documento e uma onda de atenção subindo e descendo.
  rafael: (
    <g strokeLinecap="round" strokeLinejoin="round">
      <rect x="55" y="55" width="90" height="62" rx="6" stroke={INK} strokeWidth="3" />
      <line x1="70" y1="75" x2="120" y2="75" stroke={INK} strokeWidth="3" />
      <line x1="70" y1="88" x2="110" y2="88" stroke={INK} strokeWidth="3" />
      <line x1="70" y1="101" x2="95" y2="101" stroke={INK} strokeWidth="3" />
      <path
        d="M45 145 C 60 120 75 165 90 140 C 105 115 120 160 135 135 C 145 120 150 128 155 135"
        stroke={ACENTO}
        strokeWidth="4"
      />
    </g>
  ),
  // Luciana — balões de chat empilhados + uma planilha travada.
  luciana: (
    <g strokeLinecap="round" strokeLinejoin="round">
      <rect x="50" y="45" width="46" height="30" rx="8" stroke={INK} strokeWidth="3" />
      <path d="M60 75 L 56 86 L 72 75 Z" fill={INK} stroke="none" />
      <rect x="104" y="60" width="46" height="30" rx="8" stroke={ACENTO} strokeWidth="3" />
      <path d="M132 90 L 136 101 L 120 90 Z" fill={ACENTO} stroke="none" />
      <rect x="60" y="110" width="80" height="52" rx="4" stroke={INK} strokeWidth="3" />
      <line x1="60" y1="128" x2="140" y2="128" stroke={INK} strokeWidth="2" />
      <line x1="60" y1="145" x2="140" y2="145" stroke={INK} strokeWidth="2" />
      <line x1="87" y1="110" x2="87" y2="162" stroke={INK} strokeWidth="2" />
      <line x1="113" y1="110" x2="113" y2="162" stroke={INK} strokeWidth="2" />
    </g>
  ),
  // Beatriz — headset de atendimento e uma linha de batimento acelerado.
  beatriz: (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path d="M60 95 C 60 65 80 48 100 48 C 120 48 140 65 140 95" stroke={INK} strokeWidth="3" fill="none" />
      <rect x="52" y="90" width="16" height="28" rx="6" stroke={INK} strokeWidth="3" />
      <rect x="132" y="90" width="16" height="28" rx="6" stroke={ACENTO} strokeWidth="3" />
      <path d="M140 118 C 140 132 128 140 112 140" stroke={ACENTO} strokeWidth="3" fill="none" />
      <circle cx="108" cy="140" r="5" stroke={ACENTO} strokeWidth="3" />
      <path
        d="M40 158 L 62 158 L 70 142 L 80 172 L 90 158 L 98 158 L 106 148 L 114 158 L 160 158"
        stroke={ACENTO}
        strokeWidth="4"
      />
    </g>
  ),
  // Marcos — três janelas sobrepostas, uma delas com um "x" de erro.
  marcos: (
    <g strokeLinecap="round" strokeLinejoin="round">
      <rect x="42" y="55" width="70" height="50" rx="5" stroke={INK} strokeWidth="2.5" />
      <line x1="42" y1="67" x2="112" y2="67" stroke={INK} strokeWidth="2" />
      <rect x="70" y="78" width="70" height="50" rx="5" stroke={ACENTO} strokeWidth="3" fill="var(--bg)" />
      <line x1="70" y1="90" x2="140" y2="90" stroke={ACENTO} strokeWidth="2" />
      <line x1="98" y1="102" x2="114" y2="118" stroke={ACENTO} strokeWidth="3" />
      <line x1="114" y1="102" x2="98" y2="118" stroke={ACENTO} strokeWidth="3" />
      <rect x="58" y="115" width="70" height="50" rx="5" stroke={INK} strokeWidth="2.5" />
      <line x1="58" y1="127" x2="128" y2="127" stroke={INK} strokeWidth="2" />
      <line x1="68" y1="140" x2="118" y2="140" stroke={INK} strokeWidth="2" />
      <line x1="68" y1="150" x2="105" y2="150" stroke={INK} strokeWidth="2" />
    </g>
  ),
};
