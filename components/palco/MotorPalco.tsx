"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { slide as slideVariant, semMovimento } from "@/lib/motion";
import { SEQUENCIA_PALCO as SEQUENCIA, lerPosicaoSalva, salvarPosicao } from "@/lib/palco";
import { Slide } from "./Slide";
import { Rodape } from "./Rodape";
import { PalcoCtx } from "./PalcoContext";

const ATALHOS: [string, string][] = [
  ["→ ↓ PageDown Enter Espaço", "avançar"],
  ["← ↑ PageUp Backspace", "voltar"],
  ["Home / End", "início / fim"],
  ["1 a 8", "pular para o bloco"],
  ["B ou .", "tela preta"],
  ["F", "tela cheia"],
  ["L", "alternar fundo claro / escuro"],
  ["C", "contraste máximo"],
  ["A", "parar animações"],
  ["N", "notas da apresentadora"],
  ["? ou H", "esta ajuda"],
];

/**
 * Motor de apresentação — puro local, sem servidor. A apresentadora conduz de
 * teclado ou mouse; nada aqui depende de rede.
 */
export function MotorPalco() {
  // Começa em 0 e só restaura a posição salva depois de montar: o servidor não
  // tem localStorage, e ler na primeira renderização causa erro de hidratação.
  const [indice, setIndice] = useState(0);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndice(lerPosicaoSalva());
    setMontado(true);
  }, []);
  const [direcao, setDirecao] = useState(1);
  const [blackout, setBlackout] = useState(false);
  const [contraste, setContraste] = useState(false);
  const [claro, setClaro] = useState(true);
  const [animOff, setAnimOff] = useState(false);
  const [sistemaReduz, setSistemaReduz] = useState(false);
  const [notasOn, setNotasOn] = useState(false);
  const [ajudaOn, setAjudaOn] = useState(false);
  const fecharRef = useRef<HTMLButtonElement>(null);

  const atual = SEQUENCIA[indice];
  const reduzido = animOff || sistemaReduz;
  // O tema só muda quando a apresentadora aperta L — nunca por slide.
  const claroEfetivo = claro;

  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSistemaReduz(m.matches);
    const aoMudar = (e: MediaQueryListEvent) => setSistemaReduz(e.matches);
    m.addEventListener("change", aoMudar);
    return () => m.removeEventListener("change", aoMudar);
  }, []);

  const irPara = useCallback((novoIndice: number, dir: number) => {
    const alvo = Math.min(Math.max(novoIndice, 0), SEQUENCIA.length - 1);
    setDirecao(dir);
    setIndice(alvo);
    salvarPosicao(alvo);
  }, []);

  useEffect(() => {
    function aoTeclar(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      // Com um botão do slide (ex.: região do cérebro) focado, Enter e Espaço
      // ativam o botão — não avançam o slide.
      const alvoBotao = (e.target as HTMLElement | null)?.closest("button");
      if (alvoBotao && (e.key === "Enter" || e.key === " ")) return;

      if (ajudaOn) {
        if (e.key === "Escape" || e.key === "?" || e.key === "h" || e.key === "H") {
          e.preventDefault();
          setAjudaOn(false);
        }
        return;
      }
      // 1–8 pula direto pro começo do bloco — pra quando o tempo apertar.
      if (/^[1-9]$/.test(e.key)) {
        const alvo = SEQUENCIA.findIndex((s) => s.bloco.numero === Number(e.key));
        if (alvo !== -1) irPara(alvo, alvo >= indice ? 1 : -1);
        return;
      }
      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
        case "Enter":
        case " ":
          e.preventDefault();
          irPara(indice + 1, 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
        case "Backspace":
          e.preventDefault();
          irPara(indice - 1, -1);
          break;
        case "Home":
          irPara(0, -1);
          break;
        case "End":
          irPara(SEQUENCIA.length - 1, 1);
          break;
        case "b":
        case "B":
        case ".":
          setBlackout((b) => !b);
          break;
        case "f":
        case "F":
          if (document.fullscreenElement) document.exitFullscreen();
          else document.documentElement.requestFullscreen().catch(() => {});
          break;
        case "c":
        case "C":
          setContraste((c) => !c);
          break;
        case "l":
        case "L":
          setClaro((l) => !l);
          break;
        case "a":
        case "A":
          setAnimOff((a) => !a);
          break;
        case "n":
        case "N":
          setNotasOn((n) => !n);
          break;
        case "?":
        case "h":
        case "H":
          setAjudaOn(true);
          break;
      }
    }
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [indice, irPara, ajudaOn]);

  useEffect(() => {
    if (ajudaOn) fecharRef.current?.focus();
  }, [ajudaOn]);

  const variantes = useMemo(() => semMovimento(reduzido, slideVariant), [reduzido]);

  useEffect(() => {
    const raiz = document.documentElement;
    if (contraste) raiz.setAttribute("data-contraste", "max");
    else raiz.removeAttribute("data-contraste");
    if (claroEfetivo) raiz.setAttribute("data-claro", "on");
    else raiz.removeAttribute("data-claro");
    if (blackout) raiz.setAttribute("data-blackout", "on");
    else raiz.removeAttribute("data-blackout");
    return () => {
      raiz.removeAttribute("data-contraste");
      raiz.removeAttribute("data-claro");
      raiz.removeAttribute("data-blackout");
    };
  }, [contraste, claroEfetivo, blackout]);

  if (!montado) return <div className="min-h-screen bg-bg" />;

  const anuncio = `Slide ${indice + 1} de ${SEQUENCIA.length}${atual.slide.titulo ? `: ${atual.slide.titulo}` : ""}`;

  return (
    <PalcoCtx.Provider value={{ reduzido }}>
      <MotionConfig reducedMotion={reduzido ? "always" : "user"}>
        <div className="min-h-screen bg-bg text-ink">
          <div className="sr-only" aria-live="polite" role="status">
            {anuncio}
          </div>

          <main className="palco-grade">
            <h1 className="sr-only">Neurociências &amp; Equilíbrio Emocional — palestra com Priscila Ramos</h1>
            <AnimatePresence mode="wait" custom={direcao}>
              <motion.div
                key={atual.slide.id}
                custom={direcao}
                initial="entra"
                animate="ativo"
                exit="sai"
                variants={variantes}
                className="palco-conteudo"
              >
                <Slide slide={atual.slide} />
              </motion.div>
            </AnimatePresence>

            <Rodape />
          </main>

          <aside aria-label="Controles da apresentação">
          <div
            role="progressbar"
            aria-label="Progresso da apresentação"
            aria-valuemin={1}
            aria-valuemax={SEQUENCIA.length}
            aria-valuenow={indice + 1}
            className="fixed left-0 top-0 h-1.5 bg-acento transition-all"
            style={{ width: `${((indice + 1) / SEQUENCIA.length) * 100}%` }}
          />

          <button
            onClick={() => setAjudaOn(true)}
            aria-label="Teclas de atalho (?)"
            className="dados fixed right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full border-2 border-line-2 bg-surface text-lg font-bold text-ink-2 opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100"
          >
            ?
          </button>

          {ajudaOn && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
              onClick={() => setAjudaOn(false)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-label="Teclas de atalho"
                onClick={(e) => e.stopPropagation()}
                className="max-w-2xl rounded-2xl border-2 border-line-2 bg-surface p-8 text-ink"
              >
                <h2 className="titulo mb-5 text-3xl text-acento">Teclas de atalho</h2>
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5 text-xl">
                  {ATALHOS.map(([tecla, acao]) => (
                    <div key={tecla} className="contents">
                      <dt className="dados text-muted">{tecla}</dt>
                      <dd>{acao}</dd>
                    </div>
                  ))}
                </dl>
                <button
                  ref={fecharRef}
                  onClick={() => setAjudaOn(false)}
                  className="mt-6 rounded-lg bg-acento px-6 py-3 text-lg font-bold text-sobre-acento"
                >
                  Fechar (Esc)
                </button>
              </div>
            </div>
          )}

          {notasOn && (
            <div className="fixed bottom-3 left-1/2 flex max-w-[86vw] -translate-x-1/2 flex-col gap-1 rounded-2xl border-2 border-line-2 bg-surface px-5 py-3 text-lg text-ink shadow-lg">
              <span className="dados text-sm uppercase tracking-wide text-muted">
                {atual.bloco.titulo} · slide {atual.slide.id}
              </span>
              <span>{atual.slide.notaApresentador ?? "Sem nota neste slide."}</span>
            </div>
          )}
          </aside>
        </div>
      </MotionConfig>
    </PalcoCtx.Provider>
  );
}
