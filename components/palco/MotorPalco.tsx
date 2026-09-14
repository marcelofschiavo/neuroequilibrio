"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { slide as slideVariant, semMovimento } from "@/lib/motion";
import { SEQUENCIA_PALCO as SEQUENCIA, lerPosicaoSalva, salvarPosicao } from "@/lib/palco";
import { Slide } from "./Slide";
import { Rodape } from "./Rodape";

/**
 * Motor de apresentação — puro local, sem Supabase. A apresentadora conduz
 * de teclado; a plateia não interage pelo celular.
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
  const [claro, setClaro] = useState(false);
  const [animOff, setAnimOff] = useState(false);
  const [notasOn, setNotasOn] = useState(false);

  const atual = SEQUENCIA[indice];

  const irPara = useCallback((novoIndice: number, dir: number) => {
    const alvo = Math.min(Math.max(novoIndice, 0), SEQUENCIA.length - 1);
    setDirecao(dir);
    setIndice(alvo);
    salvarPosicao(alvo);
  }, []);

  useEffect(() => {
    function aoTeclar(e: KeyboardEvent) {
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
      }
    }
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [indice, irPara]);

  const variantes = useMemo(() => semMovimento(animOff, slideVariant), [animOff]);

  useEffect(() => {
    const raiz = document.documentElement;
    if (contraste) raiz.setAttribute("data-contraste", "max");
    else raiz.removeAttribute("data-contraste");
    if (blackout) raiz.setAttribute("data-blackout", "on");
    else raiz.removeAttribute("data-blackout");
    if (claro) raiz.setAttribute("data-claro", "on");
    else raiz.removeAttribute("data-claro");
    return () => {
      raiz.removeAttribute("data-contraste");
      raiz.removeAttribute("data-blackout");
      raiz.removeAttribute("data-claro");
    };
  }, [contraste, blackout, claro]);

  if (!montado) return <div className="min-h-screen bg-bg" />;

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="palco-grade">
        <AnimatePresence mode="wait" custom={direcao}>
          <motion.div key={atual.slide.id} custom={direcao} initial="entra" animate="ativo" exit="sai" variants={variantes} className="palco-conteudo">
            <Slide slide={atual.slide} />
          </motion.div>
        </AnimatePresence>

        <Rodape />
      </div>

      <div
        className="fixed left-0 top-0 h-1 bg-acento transition-all"
        style={{ width: `${((indice + 1) / SEQUENCIA.length) * 100}%` }}
      />

      {notasOn && (
        <div className="fixed bottom-3 left-1/2 -translate-x-1/2 flex max-w-[80vw] items-center gap-3 rounded-full bg-black/70 px-4 py-2 text-xs text-white/80 dados">
          <span>
            {atual.bloco.titulo} · {atual.slide.id}
          </span>
          {atual.slide.notaApresentador && <span className="text-acento truncate">· {atual.slide.notaApresentador}</span>}
        </div>
      )}
    </div>
  );
}
