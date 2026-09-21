"use client";

import { BLOCOS } from "@/conteudo/blocos";

/**
 * Barra fixa logo abaixo da barra de progresso: mostra todos os blocos da
 * palestra e destaca o atual, para a turma saber onde está. O estado aparece
 * por forma e texto (bloco atual preenchido; os já vistos com ✓), nunca só cor.
 */
export function NavBlocos({ atual }: { atual: number }) {
  return (
    <nav aria-label="Blocos da palestra" className="pointer-events-none fixed left-0 right-16 top-[10px] z-10 px-[5vmin]">
      <ol className="flex flex-wrap items-center justify-between gap-x-[0.6vmin] gap-y-1">
        {BLOCOS.map((b) => {
          const ativo = b.numero === atual;
          const feito = b.numero < atual;
          return (
            <li
              key={b.id}
              aria-current={ativo ? "step" : undefined}
              aria-label={`${b.numero}, ${b.curto}`}
              className={`dados whitespace-nowrap rounded-full px-[0.9vmin] py-[0.5vmin] text-[length:calc(clamp(14px,1.05vw,20px)*var(--escala-texto,1))] font-bold ${
                ativo ? "bg-acento text-sobre-acento" : feito ? "text-ink-2" : "text-muted"
              }`}
            >
              {feito && <span aria-hidden>✓ </span>}
              {b.numero} · {b.curto}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
