"use client";

import { motion } from "motion/react";
import { anelProgresso } from "@/lib/motion";

export function AnelProgresso({ fracao, tamanho = 64 }: { fracao: number; tamanho?: number }) {
  const raio = (tamanho - 8) / 2;

  return (
    <div className="relative" style={{ width: tamanho, height: tamanho }}>
      <svg width={tamanho} height={tamanho} className="-rotate-90">
        <circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          stroke="var(--line)"
          strokeWidth={5}
        />
        <motion.circle
          cx={tamanho / 2}
          cy={tamanho / 2}
          r={raio}
          fill="none"
          stroke="var(--acento)"
          strokeWidth={5}
          strokeLinecap="round"
          custom={fracao}
          initial="entra"
          animate="ativo"
          variants={anelProgresso}
        />
      </svg>
      <span className="dados absolute inset-0 flex items-center justify-center text-xs font-bold text-ink">
        {Math.round(fracao * 100)}%
      </span>
    </div>
  );
}
