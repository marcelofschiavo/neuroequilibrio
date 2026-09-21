"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Search } from "lucide-react";
import { REFERENCIAS, type Referencia } from "@/conteudo/referencias";
import { Marcas } from "@/components/trilha/Marcas";
import { escada, degrau } from "@/lib/motion";

/** Separa "Autores (ano). Título. Periódico, vol(n), pág." nas três partes que o leitor precisa distinguir. */
function partes(r: Referencia) {
  const m = r.completa.match(/^(.*?\(\d{4}[a-z]?\))\.\s*([\s\S]*)$/);
  if (!m) return { autores: "", titulo: r.completa, revista: "" };
  const [, autores, resto] = m;
  const i = resto.indexOf(". ");
  return i < 0
    ? { autores, titulo: resto, revista: "" }
    : { autores, titulo: resto.slice(0, i + 1), revista: resto.slice(i + 2) };
}

export default function PaginaReferencias() {
  const [busca, setBusca] = useState("");
  const lista = useMemo(() => {
    const q = busca.trim().toLowerCase();
    return q ? REFERENCIAS.filter((r) => `${r.completa} ${r.achado}`.toLowerCase().includes(q)) : REFERENCIAS;
  }, [busca]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <Marcas />
      <h1 className="titulo mt-8 text-4xl text-ink sm:text-5xl">Referências científicas</h1>
      <p className="mt-3 max-w-prose text-lg text-ink-2">
        Todo dado citado na palestra e na trilha, com a referência completa e o link para o artigo.
      </p>

      <label className="mt-8 flex items-center gap-3 rounded-xl border-2 border-line-2 bg-surface-2 px-4 py-3 focus-within:border-acento">
        <Search aria-hidden className="h-5 w-5 shrink-0 text-muted" />
        <span className="sr-only">Buscar por autor, tema ou revista</span>
        <input
          type="search"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          placeholder="Buscar por autor, tema ou revista…"
          className="w-full bg-transparent text-base text-ink outline-none placeholder:text-muted"
        />
      </label>
      <p className="mt-2 text-sm text-muted" aria-live="polite">
        {lista.length} de {REFERENCIAS.length} referências
      </p>

      <motion.ol initial="entra" animate="ativo" variants={escada(0.05, 0.1)} className="mt-6 flex flex-col gap-5">
        {lista.map((r, i) => {
          const p = partes(r);
          return (
            <motion.li key={r.id} variants={degrau} className="rounded-2xl border border-line bg-surface-2 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <span aria-hidden className="dados flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-acento text-sm font-bold text-sobre-acento">
                  {i + 1}
                </span>
                <div className="min-w-0">
                  {p.autores && <p className="text-sm font-semibold text-muted">{p.autores}</p>}
                  <h2 className="mt-1 text-lg font-bold leading-snug text-ink">{p.titulo}</h2>
                  {p.revista && <p className="mt-1 text-sm italic text-ink-2">{p.revista}</p>}
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-acento-wash px-4 py-3">
                <p className="dados text-[11px] font-bold uppercase tracking-[0.14em] text-acento-2">O que o estudo mostra</p>
                <p className="mt-1 text-base leading-relaxed text-ink">{r.achado}</p>
              </div>

              {r.doi && (
                <a
                  href={`https://doi.org/${r.doi}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border-2 border-acento px-4 py-1.5 text-sm font-bold text-acento-2 hover:bg-acento hover:text-sobre-acento"
                >
                  Abrir o artigo <ExternalLink aria-hidden className="h-4 w-4" />
                  <span className="dados text-xs font-medium opacity-70">doi:{r.doi}</span>
                </a>
              )}
            </motion.li>
          );
        })}
      </motion.ol>
      {lista.length === 0 && <p className="mt-8 text-ink-2">Nada encontrado para “{busca}”.</p>}
    </main>
  );
}
