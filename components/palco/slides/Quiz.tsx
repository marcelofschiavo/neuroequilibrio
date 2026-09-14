"use client";

import { motion } from "motion/react";
import { degrau, escada } from "@/lib/motion";
import { QUIZ, type Alternativa } from "@/conteudo/quiz";
import { personagem } from "@/conteudo/personagens";
import { SeloEvidencia } from "@/components/ui/SeloEvidencia";
import { Fonte } from "../Fonte";
import type { Slide } from "@/conteudo/blocos";

const LETRAS: Alternativa[] = ["A", "B", "C", "D"];

export function QuizSlide({ slide }: { slide: Slide }) {
  const q = QUIZ.find((x) => x.id === slide.quizId);
  if (!q) return null;
  const p = personagem(q.personagem);

  return (
    <div className="flex flex-col gap-6 w-full">
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dados text-palco-nota text-acento">
        {p.nome} · {q.gancho}
      </motion.p>
      <motion.h2 initial="entra" animate="ativo" variants={degrau} className="text-palco-corpo font-bold leading-tight text-ink max-w-4xl">
        {q.pergunta}
      </motion.h2>
      <motion.div initial="entra" animate="ativo" variants={escada(0.08, 0.35)} className="grid grid-cols-2 gap-4">
        {LETRAS.map((l) => (
          <motion.div key={l} variants={degrau} className="flex items-baseline gap-3 rounded-md border border-line bg-surface-2 px-5 py-4">
            <span className="dados text-palco-nota font-black text-acento">{l}</span>
            <span className="text-lg font-semibold text-ink-2">{q.alternativas[l]}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export function QuizReveladoSlide({ slide }: { slide: Slide }) {
  const q = QUIZ.find((x) => x.id === slide.quizId);
  if (!q) return null;

  return (
    <div className="flex flex-col gap-5 w-full">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-4">
        <span className="dados flex h-16 w-16 items-center justify-center rounded-full bg-acento text-3xl font-black text-white">
          {q.correta}
        </span>
        <span className="text-palco-titulo font-bold text-ink">{q.alternativas[q.correta]}</span>
      </motion.div>
      <motion.p initial="entra" animate="ativo" variants={degrau} className="text-palco-corpo leading-snug text-ink-2 max-w-4xl">
        {q.explicacao}
      </motion.p>
      <motion.p initial="entra" animate="ativo" variants={degrau} className="text-palco-nota font-bold text-acento max-w-4xl">
        {q.naPratica}
      </motion.p>
      <div className="flex items-center gap-4 mt-1">
        <SeloEvidencia evidencia={q.evidencia} />
        <Fonte ids={q.fontes} />
      </div>
    </div>
  );
}
