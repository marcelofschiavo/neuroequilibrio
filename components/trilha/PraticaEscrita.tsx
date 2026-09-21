"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Pause, Play, RotateCcw, Trash2 } from "lucide-react";
import { degrau } from "@/lib/motion";

type Modo = "despejar" | "nomear" | "seentao";

const MODOS: { id: Modo; rotulo: string; titulo: string; como: string }[] = [
  {
    id: "despejar",
    rotulo: "Despejar",
    titulo: "Três minutos, sem parar",
    como: "Escreva o que estiver na cabeça, sem corrigir e sem se preocupar com o certo. Se travar, repita a última palavra até vir a próxima. Ninguém lê isto: nada é enviado nem guardado.",
  },
  {
    id: "nomear",
    rotulo: "Nomear",
    titulo: "Uma frase para o que você sente",
    como: "Complete a frase com o mais específico que conseguir. “Chateada” é vago; “frustrada porque o combinado mudou de novo” já organiza.",
  },
  {
    id: "seentao",
    rotulo: "Se… então…",
    titulo: "Um gatilho e uma ação",
    como: "Escolha um momento concreto do seu dia e uma ação pequena. Exemplo: “Se eu terminar uma reunião, então respiro três vezes antes de abrir o e-mail.”",
  },
];

const TEMPO = 180;

function Cronometro() {
  const [resta, setResta] = useState(TEMPO);
  const [rodando, setRodando] = useState(false);
  const ref = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!rodando) return;
    ref.current = setInterval(() => setResta((r) => (r <= 1 ? 0 : r - 1)), 1000);
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [rodando]);

  const fim = resta === 0;
  const frac = 1 - resta / TEMPO;
  const mm = Math.floor(resta / 60);
  const ss = String(resta % 60).padStart(2, "0");

  return (
    <div className="mt-4 flex items-center gap-4">
      <div className="relative h-16 w-16 shrink-0" role="timer" aria-label={`Tempo restante: ${mm} minutos e ${ss} segundos`}>
        <svg viewBox="0 0 64 64" className="-rotate-90">
          <circle cx="32" cy="32" r="28" fill="none" stroke="var(--line)" strokeWidth="6" />
          <circle cx="32" cy="32" r="28" fill="none" stroke="var(--acento)" strokeWidth="6" strokeLinecap="round" strokeDasharray={2 * Math.PI * 28} strokeDashoffset={2 * Math.PI * 28 * (1 - frac)} style={{ transition: "stroke-dashoffset 1s linear" }} />
        </svg>
        <span className="dados absolute inset-0 flex items-center justify-center text-sm font-bold text-ink">
          {mm}:{ss}
        </span>
      </div>
      <button
        type="button"
        onClick={() => setRodando((r) => !r)}
        disabled={fim}
        className="inline-flex items-center gap-2 rounded-full bg-acento px-5 py-2 font-bold text-sobre-acento disabled:opacity-50"
      >
        {rodando ? <Pause aria-hidden className="h-4 w-4" /> : <Play aria-hidden className="h-4 w-4" />}
        {rodando ? "Pausar" : resta === TEMPO ? "Começar" : "Continuar"}
      </button>
      <button
        type="button"
        onClick={() => {
          setRodando(false);
          setResta(TEMPO);
        }}
        className="inline-flex items-center gap-2 rounded-full border-2 border-line-2 px-4 py-2 font-semibold text-ink-2"
      >
        <RotateCcw aria-hidden className="h-4 w-4" /> Zerar
      </button>
      {fim && <p className="font-bold text-acento-2">Tempo! Releia só se quiser.</p>}
    </div>
  );
}

export function PraticaEscrita() {
  const [modo, setModo] = useState<Modo>("despejar");
  const [textos, setTextos] = useState<Record<Modo, string>>({ despejar: "", nomear: "", seentao: "" });
  const [copiado, setCopiado] = useState(false);
  const m = MODOS.find((x) => x.id === modo)!;
  const texto = textos[modo];

  const prefixo = modo === "nomear" ? "Agora eu me sinto " : modo === "seentao" ? "Se " : "";
  const dica = modo === "nomear" ? "Agora eu me sinto ___ porque ___." : modo === "seentao" ? "Se ___, então eu ___." : "Comece por qualquer palavra…";

  async function copiar() {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      // sem permissão de área de transferência: o texto continua na tela
    }
  }

  return (
    <div className="rounded-3xl border-2 border-acento bg-surface-2 p-5 shadow-sm sm:p-7">
      <div role="tablist" aria-label="Tipo de exercício de escrita" className="flex flex-wrap gap-2">
        {MODOS.map((x) => (
          <button
            key={x.id}
            role="tab"
            id={`tab-${x.id}`}
            aria-selected={modo === x.id}
            aria-controls="painel-escrita"
            type="button"
            onClick={() => setModo(x.id)}
            className={`rounded-full border-2 px-4 py-2 font-bold ${
              modo === x.id ? "border-acento bg-acento text-sobre-acento" : "border-line-2 bg-surface text-ink"
            }`}
          >
            {x.rotulo}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={modo} id="painel-escrita" role="tabpanel" aria-labelledby={`tab-${modo}`} initial="entra" animate="ativo" exit="sai" variants={degrau} className="mt-5">
          <h3 className="titulo text-2xl text-ink">{m.titulo}</h3>
          <p className="mt-2 max-w-prose text-base leading-relaxed text-ink-2">{m.como}</p>
          {modo === "despejar" && <Cronometro />}

          <label className="mt-4 block">
            <span className="sr-only">{m.titulo}</span>
            <textarea
              value={texto}
              onChange={(e) => setTextos((t) => ({ ...t, [modo]: e.target.value }))}
              placeholder={dica}
              rows={modo === "despejar" ? 8 : 3}
              className="w-full resize-y rounded-2xl border-2 border-line-2 bg-surface p-4 text-lg leading-relaxed text-ink outline-none placeholder:text-muted focus:border-acento"
            />
          </label>
          {prefixo && !texto && (
            <button type="button" onClick={() => setTextos((t) => ({ ...t, [modo]: prefixo }))} className="mt-2 text-sm font-semibold text-acento-2 underline">
              Começar com “{prefixo.trim()}…”
            </button>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-3">
            {modo === "seentao" && (
              <button type="button" onClick={copiar} disabled={!texto} className="inline-flex items-center gap-2 rounded-full bg-acento px-5 py-2 font-bold text-sobre-acento disabled:opacity-50">
                {copiado ? <Check aria-hidden className="h-4 w-4" /> : <Copy aria-hidden className="h-4 w-4" />}
                {copiado ? "Copiado" : "Copiar para levar"}
              </button>
            )}
            <button
              type="button"
              onClick={() => setTextos((t) => ({ ...t, [modo]: "" }))}
              disabled={!texto}
              className="inline-flex items-center gap-2 rounded-full border-2 border-line-2 px-4 py-2 font-semibold text-ink-2 disabled:opacity-40"
            >
              <Trash2 aria-hidden className="h-4 w-4" /> Apagar
            </button>
            <p className="text-sm text-muted">Fica só nesta tela: some ao fechar a página.</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
