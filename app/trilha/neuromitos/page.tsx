"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { NEUROMITOS } from "@/conteudo/neuromitos";
import { referencia } from "@/conteudo/referencias";
import { degrau, confirma } from "@/lib/motion";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";
import { Logo } from "@/components/ui/Logo";

type Resposta = "mito" | "ciencia";

export default function PaginaNeuromitos() {
  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState<Resposta | null>(null);
  const [acertos, setAcertos] = useState(0);

  const fim = indice >= NEUROMITOS.length;
  const item = NEUROMITOS[indice];

  function responder(r: Resposta) {
    if (escolha) return;
    setEscolha(r);
    if (r === item.resposta) setAcertos((a) => a + 1);
  }

  function proximo() {
    setEscolha(null);
    setIndice((i) => i + 1);
  }

  function recomecar() {
    setEscolha(null);
    setAcertos(0);
    setIndice(0);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-16">
      {fim && <MarcarConcluido modulo="neuromitos" />}
      <Link href="/trilha" className="text-sm text-muted hover:text-ink">
        ← Trilha
      </Link>
      <Logo tamanho={32} />
      <h1 className="titulo mt-4 text-3xl text-ink">Mito ou ciência?</h1>
      <p className="mt-2 text-ink-2">8 afirmações populares sobre o cérebro. Quais se sustentam?</p>

      {!fim && (
        <div className="mt-6 flex gap-1.5" role="img" aria-label={`Pergunta ${indice + 1} de ${NEUROMITOS.length}`}>
          {NEUROMITOS.map((m, i) => (
            <span key={m.id} className={`h-1.5 flex-1 rounded-full ${i <= indice ? "bg-acento" : "bg-line"}`} />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {fim ? (
          <motion.div key="fim" initial="entra" animate="ativo" variants={confirma} className="mt-8">
            <p className="dados text-5xl font-black text-acento-2">
              {acertos}/{NEUROMITOS.length}
            </p>
            <p className="mt-3 text-lg font-bold text-ink">Neurociência de verdade separa dado do achismo.</p>
            <button onClick={recomecar} className="mt-6 text-sm font-semibold text-acento-2 underline">
              Fazer de novo
            </button>
          </motion.div>
        ) : (
          <motion.div key={item.id} initial="entra" animate="ativo" exit="sai" variants={degrau} className="mt-8">
            <p className="text-xl font-bold leading-snug text-ink">“{item.afirmacao}”</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {(["mito", "ciencia"] as const).map((r) => {
                const certa = escolha && r === item.resposta;
                const errada = escolha === r && r !== item.resposta;
                return (
                  <button
                    key={r}
                    onClick={() => responder(r)}
                    disabled={!!escolha}
                    className={`rounded-md border-2 px-4 py-4 font-bold capitalize transition-colors ${
                      certa
                        ? "border-acento bg-acento-wash text-acento-2"
                        : errada
                          ? "border-alerta bg-alerta-wash text-alerta"
                          : "border-line bg-surface-2 text-ink hover:border-acento"
                    }`}
                  >
                    {r === "ciencia" ? "ciência" : r}
                    {certa && " ✓"}
                  </button>
                );
              })}
            </div>

            {escolha && (
              <motion.div initial="entra" animate="ativo" variants={degrau} className="mt-6 rounded-lg border border-line bg-surface-2 p-5">
                <p className="font-dados text-[10px] uppercase tracking-[0.14em] text-acento-2">
                  {escolha === item.resposta ? "Isso mesmo" : item.resposta === "ciencia" ? "É ciência" : "É mito"}
                </p>
                <p className="mt-2 text-ink">{item.comentario}</p>
                <p className="mt-2 text-xs text-muted">
                  fonte: {item.fontes.map((id) => referencia(id).curta).join(" · ")}
                </p>
                <button onClick={proximo} className="mt-5 w-full rounded-md bg-acento px-5 py-3 font-semibold text-white hover:brightness-95">
                  {indice + 1 < NEUROMITOS.length ? "Próxima" : "Ver resultado"}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
