"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Play, RotateCcw } from "lucide-react";

/**
 * Suspiro fisiológico, em ritmo confortável: inspira pelo nariz (4s), dá uma
 * segunda inspiração curta (2s) e solta devagar pela boca (8s). Só começa
 * quando o palestrante clica em "Começar" (ou aperta Enter com o botão em
 * foco), e cada fase mostra a contagem regressiva na tela — assim a turma
 * sabe quanto falta antes da próxima troca.
 */
const FASES = [
  { rotulo: "Inspire pelo nariz", duracao: 4, escala: 1.5 },
  { rotulo: "De novo — só um pouquinho mais", duracao: 2, escala: 1.85 },
  { rotulo: "Solte devagar pela boca", duracao: 8, escala: 1 },
] as const;
const CICLO = FASES.reduce((s, f) => s + f.duracao, 0); // 14 s

function faseEm(t: number) {
  let resto = t % CICLO;
  for (const f of FASES) {
    if (resto < f.duracao) return { fase: f, restante: Math.ceil(f.duracao - resto) };
    resto -= f.duracao;
  }
  return { fase: FASES[0], restante: FASES[0].duracao };
}

export function RespiracaoColetiva({ titulo, ciclos = 3 }: { titulo?: string; ciclos?: number; trilhaHref?: string }) {
  const [iniciou, setIniciou] = useState(false);
  const [t, setT] = useState(0);
  const t0 = useRef(0);
  const botao = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!iniciou) return;
    t0.current = performance.now();
    const id = setInterval(() => setT((performance.now() - t0.current) / 1000), 200);
    return () => clearInterval(id);
  }, [iniciou]);

  useEffect(() => {
    if (!iniciou) botao.current?.focus();
  }, [iniciou]);

  const total = ciclos * CICLO;
  const terminou = iniciou && t >= total;
  const { fase, restante } = faseEm(Math.min(t, total - 0.01));
  const cicloAtual = Math.min(Math.floor(t / CICLO) + 1, ciclos);

  function comecar() {
    setT(0);
    setIniciou(true);
  }

  return (
    <div className="grid min-h-0 w-full flex-1 grid-cols-[1fr_auto] items-center gap-12">
      <div className="flex min-w-0 flex-col gap-6">
        {titulo && <h2 className="titulo text-palco-titulo text-acento">{titulo}</h2>}

        {!iniciou && (
          <>
            <p className="text-palco-corpo font-semibold leading-snug text-ink">
              Inspire pelo nariz, inspire de novo um pouquinho e solte devagar pela boca. Vamos fazer {ciclos} vezes, juntos.
            </p>
            <button
              ref={botao}
              type="button"
              onClick={comecar}
              className="inline-flex w-fit items-center gap-4 rounded-2xl bg-acento px-[4vmin] py-[2vmin] text-palco-corpo font-bold text-sobre-acento shadow-lg"
            >
              <Play aria-hidden className="h-[1em] w-[1em]" /> Começar
            </button>
          </>
        )}

        {iniciou && !terminou && (
          <>
            <p className="text-palco-titulo font-black leading-tight text-ink" aria-live="polite">
              {fase.rotulo}
            </p>
            <div className="flex items-center gap-4" aria-hidden>
              {FASES.map((f) => (
                <span
                  key={f.rotulo}
                  className={`h-[1.4vmin] rounded-full transition-colors ${f === fase ? "bg-acento" : "bg-line-2"}`}
                  style={{ width: `${f.duracao * 2.4}vmin` }}
                />
              ))}
            </div>
            <p className="dados text-palco-nota text-ink-2">
              ciclo {cicloAtual} de {ciclos} · próxima troca em {restante}s
            </p>
          </>
        )}

        {terminou && (
          <>
            <p className="text-palco-titulo font-black leading-none text-ink">Pronto.</p>
            <p className="text-palco-corpo font-semibold text-ink-2">O que mudou no corpo?</p>
            <button
              type="button"
              onClick={comecar}
              className="inline-flex w-fit items-center gap-3 rounded-xl border-2 border-line-2 bg-surface-2 px-[2.4vmin] py-[1.2vmin] text-palco-nota font-semibold text-ink"
            >
              <RotateCcw aria-hidden className="h-[1em] w-[1em]" /> Repetir
            </button>
          </>
        )}
      </div>

      <div className="relative flex h-[54vmin] w-[54vmin] items-center justify-center">
        <motion.div
          aria-hidden
          className="absolute h-[27vmin] w-[27vmin] rounded-full bg-acento"
          initial={{ scale: 1, opacity: 0.45 }}
          animate={{ scale: iniciou && !terminou ? fase.escala : 1, opacity: iniciou && !terminou && fase.escala > 1 ? 1 : 0.45 }}
          transition={{ duration: iniciou && !terminou ? fase.duracao : 0.6, ease: "easeInOut" }}
        />
        {iniciou && !terminou && (
          <span className="dados relative text-[length:calc(clamp(64px,9vw,150px)*var(--escala-texto,1))] font-black leading-none text-sobre-acento" aria-hidden>
            {restante}
          </span>
        )}
      </div>
    </div>
  );
}
