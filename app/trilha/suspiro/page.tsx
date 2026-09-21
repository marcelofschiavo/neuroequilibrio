"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";
import { Marcas } from "@/components/trilha/Marcas";
import { referencia } from "@/conteudo/referencias";

const FASES = [
  { label: "Inspire", duracao: 2 },
  { label: "De novo — puxa mais um pouco", duracao: 1 },
  { label: "Solte devagar, bem longo", duracao: 6 },
] as const;

export default function PaginaSuspiro() {
  const [fase, setFase] = useState(0);
  const [ciclos, setCiclos] = useState(0);
  const [ativo, setAtivo] = useState(false);

  useEffect(() => {
    if (!ativo) return;
    const t = setTimeout(() => {
      setFase((f) => {
        const proxima = (f + 1) % FASES.length;
        if (proxima === 0) setCiclos((c) => c + 1);
        return proxima;
      });
    }, FASES[fase].duracao * 1000);
    return () => clearTimeout(t);
  }, [fase, ativo]);

  const ref = referencia("balban2023");

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center px-6 py-12 text-center">
      <MarcarConcluido modulo="suspiro" />
      <div className="w-full">
      </div>
      <Marcas />
      <h1 className="titulo mt-8 text-4xl text-ink sm:text-5xl">Suspiro fisiológico</h1>
      <p className="mt-3 max-w-prose text-lg leading-relaxed text-ink-2">
        Duas inspirações pelo nariz — a segunda, curtinha — e uma expiração longa pela boca. A ferramenta
        mais rápida para acalmar o corpo no calor da hora.
      </p>

      <div className="relative mt-12 flex h-64 w-64 items-center justify-center">
        <motion.div
          className="absolute h-32 w-32 rounded-full bg-acento"
          animate={{
            scale: ativo ? (fase === 0 ? 1.5 : fase === 1 ? 1.85 : 1) : 1,
            opacity: ativo ? (fase < 2 ? 1 : 0.55) : 0.55,
          }}
          transition={{ duration: ativo ? FASES[fase].duracao : 0.4, ease: "easeInOut" }}
        />
        <div className="relative z-10 max-w-[10rem] text-center">
          <p className="titulo text-2xl text-[#1E1F21] mix-blend-difference">{ativo ? FASES[fase].label : "Pronto"}</p>
        </div>
      </div>

      <button
        onClick={() => {
          setAtivo((a) => !a);
          setFase(0);
        }}
        className="mt-10 rounded-md bg-acento px-8 py-4 font-semibold text-white hover:brightness-95 transition"
      >
        {ativo ? "Parar" : "Começar"}
      </button>

      {ciclos > 0 && <p className="dados mt-4 text-base text-muted">{ciclos} {ciclos === 1 ? "ciclo completo" : "ciclos completos"}</p>}

      <p className="mt-10 text-sm text-muted max-w-xs">
        Funciona sem internet. Pare a qualquer momento se sentir tontura — respire no seu ritmo normal.
      </p>
      <p className="mt-6 text-sm text-muted max-w-xs">
        {ref.achado}{" "}
        <a href={`https://doi.org/${ref.doi}`} target="_blank" rel="noreferrer" className="underline">
          {ref.curta}
        </a>
      </p>
    </main>
  );
}
