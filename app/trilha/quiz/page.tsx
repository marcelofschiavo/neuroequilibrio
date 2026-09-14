"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { QUIZ, type Alternativa } from "@/conteudo/quiz";
import { personagem } from "@/conteudo/personagens";
import { degrau, confirma } from "@/lib/motion";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";
import { SeloEvidencia } from "@/components/ui/SeloEvidencia";
import { Logo } from "@/components/ui/Logo";
import { gravarResultadoQuiz } from "@/lib/local";

const LETRAS: Alternativa[] = ["A", "B", "C", "D"];

export default function PaginaQuiz() {
  const [indice, setIndice] = useState(0);
  const [escolha, setEscolha] = useState<Alternativa | null>(null);
  const [acertos, setAcertos] = useState(0);

  const fim = indice >= QUIZ.length;
  const q = QUIZ[indice];

  function responder(l: Alternativa) {
    if (escolha) return;
    setEscolha(l);
    const acertou = l === q.correta;
    if (acertou) setAcertos((a) => a + 1);
    if (indice === QUIZ.length - 1) {
      gravarResultadoQuiz({ acertos: acertou ? acertos + 1 : acertos, total: QUIZ.length, concluidoEm: new Date().toISOString() });
    }
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
      {fim && <MarcarConcluido modulo="quiz" />}
      <Link href="/trilha" className="text-sm text-muted hover:text-ink">
        ← Trilha
      </Link>
      <Logo tamanho={32} />
      <h1 className="titulo mt-4 text-3xl text-ink">Quiz final</h1>
      <p className="mt-2 text-ink-2">As mesmas 4 perguntas da palestra — agora no seu tempo.</p>

      {!fim && (
        <div className="mt-6 flex gap-1.5" aria-label={`Pergunta ${indice + 1} de ${QUIZ.length}`}>
          {QUIZ.map((item, i) => (
            <span key={item.id} className={`h-1.5 flex-1 rounded-full ${i <= indice ? "bg-acento" : "bg-line"}`} />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {fim ? (
          <motion.div key="fim" initial="entra" animate="ativo" variants={confirma} className="mt-8">
            <p className="dados text-5xl font-black text-acento-2">
              {acertos}/{QUIZ.length}
            </p>
            <p className="mt-3 text-lg font-bold text-ink">
              {acertos === QUIZ.length ? "Todas certas." : "Vale rever a explicação de cada uma."}
            </p>
            <p className="mt-2 text-ink-2">Ritmo, energia, regulação e foco — um mecanismo cada.</p>
            <button onClick={recomecar} className="mt-6 text-sm font-semibold text-acento-2 underline">
              Fazer de novo
            </button>
          </motion.div>
        ) : (
          <motion.div key={q.id} initial="entra" animate="ativo" exit="sai" variants={degrau} className="mt-8">
            <p className="dados text-xs uppercase tracking-wide text-acento">
              {personagem(q.personagem).nome} · {q.gancho}
            </p>
            <p className="mt-3 text-lg font-bold leading-snug text-ink">{q.pergunta}</p>

            <div className="mt-6 flex flex-col gap-2.5">
              {LETRAS.map((l) => {
                const certa = escolha && l === q.correta;
                const errada = escolha === l && l !== q.correta;
                return (
                  <button
                    key={l}
                    onClick={() => responder(l)}
                    disabled={!!escolha}
                    className={`flex items-start gap-3 rounded-md border-2 px-4 py-3 text-left font-semibold transition-colors ${
                      certa
                        ? "border-acento bg-acento-wash text-acento-2"
                        : errada
                          ? "border-alerta bg-alerta-wash text-alerta"
                          : "border-line bg-surface-2 text-ink hover:border-acento"
                    }`}
                  >
                    <span className="dados">{l}</span>
                    <span>{q.alternativas[l]}{certa && " ✓"}</span>
                  </button>
                );
              })}
            </div>

            {escolha && (
              <motion.div initial="entra" animate="ativo" variants={degrau} className="mt-6 rounded-lg border border-line bg-surface-2 p-5">
                <p className="font-dados text-[10px] uppercase tracking-[0.14em] text-acento-2">
                  {escolha === q.correta ? "Isso mesmo" : `É a ${q.correta}`}
                </p>
                <p className="mt-2 text-ink">{q.explicacao}</p>
                <p className="mt-2 font-semibold text-acento-2">{q.naPratica}</p>
                <div className="mt-3">
                  <SeloEvidencia evidencia={q.evidencia} />
                </div>
                <button
                  onClick={proximo}
                  className="mt-5 w-full rounded-md bg-acento px-5 py-3 font-semibold text-white hover:brightness-95"
                >
                  {indice + 1 < QUIZ.length ? "Próxima" : "Ver resultado"}
                </button>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
