"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";
import { Logo } from "@/components/ui/Logo";
import { pagina } from "@/lib/motion";

const PASSOS = [
  { titulo: "Afaste as mãos do teclado", desc: "Solte o mouse e o teclado. Você acabou de fechar um bloco de foco intenso.", duracao: 15 },
  { titulo: "Olhe para um ponto distante", desc: "De preferência algo verde, por 40 segundos. É um reset de atenção, não descanso de vista.", duracao: 40 },
  { titulo: "Faça 3 respirações confortáveis", desc: "No seu ritmo, sem forçar. Se quiser mais, use o suspiro fisiológico guiado.", duracao: 30 },
  { titulo: "Escolha uma única ação de retorno", desc: "Qual é a primeira coisa, uma só, que você vai fazer ao voltar? E a pergunta: sua sensação mudou?", duracao: 25 },
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
      <h1 className="titulo mt-4 text-3xl text-ink">Regra 90-3-1: pausa de 3 min</h1>
      <p className="mt-2 text-ink-2">Depois de 90 minutos de foco: 3 minutos de pausa deliberada e 1 única ação de retorno. Regra prática — o ritmo varia de pessoa para pessoa.</p>

      <div className="mt-10 flex-1">
        <AnimatePresence mode="wait">
          {!ativo && !terminou && (
            <motion.div key="inicio" initial="entra" animate="ativo" exit="sai" variants={pagina} className="rounded-lg border border-line bg-surface-2 p-6 text-center">
              <p className="text-ink-2">4 passos, cerca de 2 minutos.</p>
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
