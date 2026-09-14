"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";
import { Logo } from "@/components/ui/Logo";
import { pagina } from "@/lib/motion";

const PASSOS = [
  { titulo: "Olhe para longe", desc: "De preferência algo verde, por 40 segundos. É um reset de atenção, não descanso de vista.", duracao: 40 },
  { titulo: "Beba água", desc: "Sem celular nem computador por perto — só a água.", duracao: 40 },
  { titulo: "Um suspiro fisiológico", desc: "Duas inspirações, a segunda curtinha, e uma expiração longa.", duracao: 30 },
  { titulo: "Tarefa mecânica", desc: "Algo que não exija decisão: organizar uma gaveta, arrumar a mesa.", duracao: 50 },
];

export default function PaginaMicropausa() {
  const [passo, setPasso] = useState(0);
  const [segundos, setSegundos] = useState(PASSOS[0].duracao);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    if (!ativo) return;
    if (segundos <= 0) {
      if (passo < PASSOS.length - 1) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPasso((p) => p + 1);
        setSegundos(PASSOS[passo + 1].duracao);
      } else {
        setAtivo(false);
      }
      return;
    }
    const t = setTimeout(() => setSegundos((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [ativo, segundos, passo]);

  const terminou = !ativo && passo === PASSOS.length - 1 && segundos === 0;

  function comecar() {
    setPasso(0);
    setSegundos(PASSOS[0].duracao);
    setAtivo(true);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-6 py-16">
      <MarcarConcluido modulo="micropausa" />
      <Link href="/trilha" className="text-sm text-muted hover:text-ink">
        ← Trilha
      </Link>
      <Logo tamanho={32} />
      <h1 className="titulo mt-4 text-3xl text-ink">Micro-recuperação de 3 min</h1>
      <p className="mt-2 text-ink-2">O reset rápido para quando 20 minutos de pausa não são possíveis.</p>

      <div className="mt-10 flex-1">
        <AnimatePresence mode="wait">
          {!ativo && !terminou && (
            <motion.div key="inicio" initial="entra" animate="ativo" exit="sai" variants={pagina} className="rounded-lg border border-line bg-surface-2 p-6 text-center">
              <p className="text-ink-2">4 passos, cerca de 3 minutos.</p>
              <button onClick={comecar} className="mt-4 rounded-md bg-acento px-6 py-3 font-semibold text-white hover:brightness-95">
                Começar
              </button>
            </motion.div>
          )}

          {ativo && (
            <motion.div key={passo} initial="entra" animate="ativo" exit="sai" variants={pagina} className="rounded-lg border border-acento bg-acento-wash p-6 text-center">
              <p className="dados text-xs uppercase tracking-wide text-acento-2">
                passo {passo + 1} de {PASSOS.length}
              </p>
              <p className="mt-2 titulo text-2xl text-ink">{PASSOS[passo].titulo}</p>
              <p className="mt-2 text-sm text-ink-2">{PASSOS[passo].desc}</p>
              <p className="dados mt-4 text-4xl font-black text-acento">{segundos}s</p>
            </motion.div>
          )}

          {terminou && (
            <motion.div key="fim" initial="entra" animate="ativo" exit="sai" variants={pagina} className="rounded-lg border border-line bg-surface-2 p-6 text-center">
              <p className="titulo text-2xl text-ink">Pronto.</p>
              <p className="mt-2 text-ink-2">Volte pra tarefa devagar.</p>
              <button onClick={comecar} className="mt-4 text-sm font-semibold text-acento-2 underline">
                Fazer de novo
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
