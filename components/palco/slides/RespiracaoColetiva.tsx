"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TrilhaNota } from "../TrilhaNota";

/** Suspiro fisiológico: duas inspirações (a 2ª curta) + uma expiração longa. */
const CICLO = 9; // inspira 2s + inspira curto 1s + solta 6s

function faseDe(segundoNoCiclo: number) {
  if (segundoNoCiclo < 2) return { rotulo: "Inspire", escala: 1.5, duracao: 2 };
  if (segundoNoCiclo < 3) return { rotulo: "De novo — puxa mais um pouco", escala: 1.85, duracao: 1 };
  return { rotulo: "Solte devagar, bem longo", escala: 1, duracao: 6 };
}

/**
 * A sala inteira faz o suspiro fisiológico junto. Um cronômetro a partir da
 * entrada no slide deriva a fase — texto e círculo nunca saem de sincronia.
 */
export function RespiracaoColetiva({
  titulo,
  ciclos = 3,
  trilhaHref,
}: {
  titulo?: string;
  ciclos?: number;
  trilhaHref?: string;
}) {
  const [segundos, setSegundos] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const terminou = segundos >= ciclos * CICLO;
  const fase = faseDe(segundos % CICLO);
  const cicloAtual = Math.min(Math.floor(segundos / CICLO) + 1, ciclos);

  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center gap-12">
      <div className="flex min-w-0 flex-col gap-6">
        {titulo && <h2 className="titulo text-palco-titulo text-acento">{titulo}</h2>}
        <p className="text-palco-titulo font-black leading-none text-ink">{terminou ? "Pronto." : fase.rotulo}</p>
        <p className="dados text-palco-nota text-ink-2">
          {terminou ? "O que mudou no corpo?" : `ciclo ${cicloAtual} de ${ciclos}`}
        </p>
        {terminou && <TrilhaNota href={trilhaHref} />}
      </div>
      <div className="flex h-[52vmin] w-[52vmin] items-center justify-center">
        <motion.div
          aria-hidden
          className="h-[26vmin] w-[26vmin] rounded-full bg-acento"
          initial={{ scale: 1, opacity: 0.55 }}
          animate={{ scale: terminou ? 1 : fase.escala, opacity: fase.escala > 1 && !terminou ? 1 : 0.55 }}
          transition={{ duration: terminou ? 1 : fase.duracao, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
