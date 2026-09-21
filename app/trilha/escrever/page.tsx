"use client";

import { motion } from "motion/react";
import { PORQUES } from "@/conteudo/escrever";
import { citacaoCurta } from "@/conteudo/referencias";
import { escada, degrau } from "@/lib/motion";
import { Marcas } from "@/components/trilha/Marcas";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";
import { PraticaEscrita } from "@/components/trilha/PraticaEscrita";
import { SeloEvidencia } from "@/components/ui/SeloEvidencia";

export default function PaginaEscrever() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <MarcarConcluido modulo="escrever" />
      <Marcas />
      <p className="dados mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-acento-2">Ferramenta · escrita</p>
      <h1 className="titulo mt-2 text-4xl text-ink sm:text-5xl">Escrever fixa o que importa.</h1>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-2">
        Anotar não é burocracia. É uma das formas mais baratas de fixar o que importa, dar nome ao que se sente e transformar intenção em ação.
      </p>

      <motion.ol initial="entra" animate="ativo" variants={escada(0.1, 0.2)} className="mt-10 grid gap-4 sm:grid-cols-2">
        {PORQUES.map((p, i) => (
          <motion.li key={p.titulo} variants={degrau} className="flex flex-col rounded-2xl border border-line bg-surface-2 p-5 shadow-sm">
            <span aria-hidden className="dados flex h-8 w-8 items-center justify-center rounded-full bg-acento text-sm font-bold text-sobre-acento">
              {i + 1}
            </span>
            <h2 className="mt-3 text-xl font-bold leading-snug text-ink">{p.titulo}</h2>
            <p className="mt-2 text-base leading-relaxed text-ink-2">{p.texto}</p>
            <p className="mt-3 rounded-xl bg-acento-wash px-3 py-2 text-sm font-semibold leading-snug text-ink">
              <span className="text-acento-2">Na Marina · </span>
              {p.marina}
            </p>
            <div className="mt-auto pt-4 text-xs">
              <SeloEvidencia evidencia={p.evidencia} className="text-ink-2" />
              <p className="mt-1 text-muted">fonte: {p.fontes.map(citacaoCurta).join(" · ")}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>

      <section className="mt-12" aria-labelledby="praticar">
        <h2 id="praticar" className="titulo text-3xl text-ink">
          Experimente agora
        </h2>
        <p className="mt-2 mb-5 text-ink-2">Escolha um dos três formatos. Leva de um a três minutos.</p>
        <PraticaEscrita />
      </section>

      <p className="mt-8 rounded-xl border border-line-2 p-4 text-sm leading-relaxed text-ink-2">
        Escrever ajuda, mas com efeito pequeno a moderado, e não substitui acompanhamento profissional. Se o que vem ao papel pesar demais, procure apoio de um profissional de saúde mental.
      </p>
    </main>
  );
}
