"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { MotionConfig, motion } from "motion/react";
import { Settings } from "lucide-react";
import { slide as slideVariant, semMovimento } from "@/lib/motion";
import { SEQUENCIA_PALCO as SEQUENCIA, lerPosicaoSalva, salvarPosicao } from "@/lib/palco";
import { Slide } from "./Slide";
import { Rodape } from "./Rodape";
import { NavBlocos } from "./NavBlocos";
import { PalcoCtx } from "./PalcoContext";

const ATALHOS: [string, string][] = [
  ["→ ↓ PageDown Enter Espaço", "avançar"],
  ["← ↑ PageUp Backspace", "voltar"],
  ["Home / End", "início / fim"],
  ["1 a 7", "pular para o bloco"],
  ["B ou .", "tela preta"],
  ["F", "tela cheia"],
  ["L", "alternar fundo claro / escuro"],
  ["C", "contraste máximo"],
  ["A", "parar animações"],
  ["N", "notas da apresentadora"],
  ["? ou H", "abrir as configurações"],
];

type Paleta = "verde" | "azul" | "laranja" | "roxo";

const ESCALAS = [
  { v: 0.9, rotulo: "Menor" },
  { v: 1, rotulo: "Padrão" },
  { v: 1.15, rotulo: "Maior" },
  { v: 1.3, rotulo: "Muito maior" },
];

const PALETAS: { id: Paleta; nome: string; cor: string }[] = [
  { id: "verde", nome: "Verde EDC", cor: "#5CB82A" },
  { id: "azul", nome: "Azul", cor: "#3D8FDD" },
  { id: "laranja", nome: "Laranja", cor: "#F08A1C" },
  { id: "roxo", nome: "Roxo", cor: "#8F5FCF" },
];

const FONTES = [
  { id: "padrao", nome: "Padrão", amostra: "var(--font-source-sans)" },
  { id: "acolhedora", nome: "Acolhedora (arredondada)", amostra: "var(--font-nunito)" },
  { id: "classica", nome: "Clássica (serifada)", amostra: "var(--font-lora)" },
  { id: "legivel", nome: "Alta legibilidade", amostra: "var(--font-atkinson)" },
] as const;
type Fonte = (typeof FONTES)[number]["id"];

const CHAVE_CONFIG = "ne26:palco:config";

/**
 * Motor de apresentação — puro local, sem servidor. A apresentadora conduz de
 * teclado ou mouse; nada aqui depende de rede.
 */
export function MotorPalco() {
  // Começa em 0 e só restaura a posição salva depois de montar: o servidor não
  // tem localStorage, e ler na primeira renderização causa erro de hidratação.
  const [indice, setIndice] = useState(0);
  const [montado, setMontado] = useState(false);

  const [direcao, setDirecao] = useState(1);
  const [blackout, setBlackout] = useState(false);
  const [contraste, setContraste] = useState(false);
  const [claro, setClaro] = useState(true);
  const [animOff, setAnimOff] = useState(false);
  const [sistemaReduz, setSistemaReduz] = useState(false);
  const [notasOn, setNotasOn] = useState(false);
  const [ajudaOn, setAjudaOn] = useState(false);
  const [escala, setEscala] = useState(1);
  const [paleta, setPaleta] = useState<Paleta>("verde");
  const [fonte, setFonte] = useState<Fonte>("padrao");
  const fecharRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIndice(lerPosicaoSalva());
    try {
      const c = JSON.parse(window.localStorage.getItem(CHAVE_CONFIG) ?? "null");
      if (c) {
        if (ESCALAS.some((e) => e.v === c.escala)) setEscala(c.escala);
        if (PALETAS.some((p) => p.id === c.paleta)) setPaleta(c.paleta);
        if (FONTES.some((f) => f.id === c.fonte)) setFonte(c.fonte);
        if (typeof c.claro === "boolean") setClaro(c.claro);
        if (typeof c.animOff === "boolean") setAnimOff(c.animOff);
      }
    } catch {
      // sem localStorage ou JSON inválido: segue com o padrão
    }
    setMontado(true);
  }, []);

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
      // 1–7 pula direto pro começo do bloco — pra quando o tempo apertar.
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

  // Guarda as preferências (só depois de carregar, para não sobrescrever com o padrão).
  useEffect(() => {
    if (!montado) return;
    try {
      window.localStorage.setItem(CHAVE_CONFIG, JSON.stringify({ escala, paleta, fonte, claro, animOff }));
    } catch {
      // modo privado: a configuração vale só nesta sessão
    }
  }, [montado, escala, paleta, fonte, claro, animOff]);

  useEffect(() => {
    const raiz = document.documentElement;
    raiz.style.setProperty("--escala-texto", String(escala));
    return () => {
      raiz.style.removeProperty("--escala-texto");
    };
  }, [escala]);

  useEffect(() => {
    const raiz = document.documentElement;
    if (fonte !== "padrao") raiz.setAttribute("data-fonte", fonte);
    else raiz.removeAttribute("data-fonte");
    return () => {
      raiz.removeAttribute("data-fonte");
    };
  }, [fonte]);

  const variantes = useMemo(() => semMovimento(reduzido, slideVariant), [reduzido]);

  useEffect(() => {
    const raiz = document.documentElement;
    if (contraste) raiz.setAttribute("data-contraste", "max");
    else raiz.removeAttribute("data-contraste");
    if (claroEfetivo) raiz.setAttribute("data-claro", "on");
    else raiz.removeAttribute("data-claro");
    if (blackout) raiz.setAttribute("data-blackout", "on");
    else raiz.removeAttribute("data-blackout");
    // O contraste máximo ignora a paleta escolhida.
    if (paleta !== "verde" && !contraste) raiz.setAttribute("data-paleta", paleta);
    else raiz.removeAttribute("data-paleta");
    return () => {
      raiz.removeAttribute("data-contraste");
      raiz.removeAttribute("data-claro");
      raiz.removeAttribute("data-blackout");
      raiz.removeAttribute("data-paleta");
    };
  }, [contraste, claroEfetivo, blackout, paleta]);

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
            {/* Sem AnimatePresence "wait": com setas apertadas depressa, a saída
                pendente travava a navegação. Cada slide só anima a entrada. */}
            <motion.div
              key={atual.slide.id}
              custom={direcao}
              initial="entra"
              animate="ativo"
              variants={variantes}
              className="palco-conteudo"
            >
              <Slide slide={atual.slide} />
            </motion.div>

            <Rodape />
          </main>

          <aside aria-label="Controles da apresentação">
          <NavBlocos atual={atual.bloco.numero} />
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
            aria-label="Configurações e atalhos (?)"
            className="fixed right-3 top-3 flex h-12 w-12 items-center justify-center rounded-full border-2 border-line-2 bg-surface text-ink-2 opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100"
          >
            <Settings aria-hidden className="h-6 w-6" strokeWidth={2.2} />
          </button>

          {ajudaOn && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
              onClick={() => setAjudaOn(false)}
            >
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="titulo-config"
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  // Mantém o Tab dentro do painel.
                  if (e.key !== "Tab") return;
                  const foco = Array.from(e.currentTarget.querySelectorAll<HTMLElement>("button"));
                  const primeiro = foco[0];
                  const ultimo = foco[foco.length - 1];
                  if (e.shiftKey && document.activeElement === primeiro) {
                    e.preventDefault();
                    ultimo.focus();
                  } else if (!e.shiftKey && document.activeElement === ultimo) {
                    e.preventDefault();
                    primeiro.focus();
                  }
                }}
                className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl border-2 border-line-2 bg-surface p-6 text-ink"
              >
                <h2 id="titulo-config" className="titulo mb-5 text-3xl text-acento">
                  Configurações
                </h2>

                <div className="flex flex-col gap-6 text-lg">
                  <section aria-labelledby="cfg-letra">
                    <h3 id="cfg-letra" className="mb-2 font-bold">Tamanho da letra</h3>
                    <div className="flex flex-wrap gap-2" role="group" aria-labelledby="cfg-letra">
                      {ESCALAS.map((e) => (
                        <button
                          key={e.v}
                          type="button"
                          aria-pressed={escala === e.v}
                          onClick={() => setEscala(e.v)}
                          className={`rounded-lg border-2 px-4 py-2 font-semibold ${
                            escala === e.v ? "border-acento bg-acento text-sobre-acento" : "border-line-2 bg-surface-2 text-ink"
                          }`}
                        >
                          {e.rotulo} <span className="dados text-base opacity-80">{Math.round(e.v * 100)}%</span>
                        </button>
                      ))}
                    </div>
                    {escala > 1 && (
                      <p className="mt-2 text-base text-muted">Letra maior pode empurrar o conteúdo de alguns slides para baixo.</p>
                    )}
                  </section>

                  <section aria-labelledby="cfg-tema">
                    <h3 id="cfg-tema" className="mb-2 font-bold">Fundo</h3>
                    <div className="flex flex-wrap gap-2" role="group" aria-labelledby="cfg-tema">
                      {(
                        [
                          ["claro", "Claro"],
                          ["escuro", "Escuro"],
                          ["contraste", "Contraste máximo"],
                        ] as const
                      ).map(([id, rotulo]) => {
                        const ativo = (contraste ? "contraste" : claro ? "claro" : "escuro") === id;
                        return (
                          <button
                            key={id}
                            type="button"
                            aria-pressed={ativo}
                            onClick={() => {
                              setContraste(id === "contraste");
                              if (id !== "contraste") setClaro(id === "claro");
                            }}
                            className={`rounded-lg border-2 px-4 py-2 font-semibold ${
                              ativo ? "border-acento bg-acento text-sobre-acento" : "border-line-2 bg-surface-2 text-ink"
                            }`}
                          >
                            {rotulo}
                          </button>
                        );
                      })}
                    </div>
                  </section>

                  <section aria-labelledby="cfg-fonte">
                    <h3 id="cfg-fonte" className="mb-2 font-bold">Tipo de letra</h3>
                    <div className="flex flex-wrap gap-2" role="group" aria-labelledby="cfg-fonte">
                      {FONTES.map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          aria-pressed={fonte === f.id}
                          onClick={() => setFonte(f.id)}
                          style={{ fontFamily: `${f.amostra}, sans-serif` }}
                          className={`rounded-lg border-2 px-4 py-2 font-semibold ${
                            fonte === f.id ? "border-acento bg-acento text-sobre-acento" : "border-line-2 bg-surface-2 text-ink"
                          }`}
                        >
                          {f.nome}
                          {fonte === f.id && <span aria-hidden> ✓</span>}
                        </button>
                      ))}
                    </div>
                  </section>

                  <section aria-labelledby="cfg-cor">
                    <h3 id="cfg-cor" className="mb-2 font-bold">Cor de destaque</h3>
                    <div className="flex flex-wrap gap-2" role="group" aria-labelledby="cfg-cor">
                      {PALETAS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          aria-pressed={paleta === p.id}
                          onClick={() => setPaleta(p.id)}
                          className={`flex items-center gap-2 rounded-lg border-2 px-4 py-2 font-semibold ${
                            paleta === p.id ? "border-acento bg-surface-2 text-ink ring-2 ring-acento" : "border-line-2 bg-surface-2 text-ink"
                          }`}
                        >
                          <span aria-hidden className="h-5 w-5 rounded-full border-2 border-ink" style={{ background: p.cor }} />
                          {p.nome}
                          {paleta === p.id && <span aria-hidden>✓</span>}
                        </button>
                      ))}
                    </div>
                    {contraste && <p className="mt-2 text-base text-muted">No contraste máximo a cor de destaque é fixa.</p>}
                  </section>

                  <section aria-labelledby="cfg-extra">
                    <h3 id="cfg-extra" className="mb-2 font-bold">Movimento e notas</h3>
                    <div className="flex flex-wrap gap-2" role="group" aria-labelledby="cfg-extra">
                      <button
                        type="button"
                        aria-pressed={animOff}
                        onClick={() => setAnimOff((a) => !a)}
                        className={`rounded-lg border-2 px-4 py-2 font-semibold ${
                          animOff ? "border-acento bg-acento text-sobre-acento" : "border-line-2 bg-surface-2 text-ink"
                        }`}
                      >
                        Parar animações
                      </button>
                      <button
                        type="button"
                        aria-pressed={notasOn}
                        onClick={() => setNotasOn((n) => !n)}
                        className={`rounded-lg border-2 px-4 py-2 font-semibold ${
                          notasOn ? "border-acento bg-acento text-sobre-acento" : "border-line-2 bg-surface-2 text-ink"
                        }`}
                      >
                        Mostrar notas da apresentadora
                      </button>
                    </div>
                  </section>

                  <section aria-labelledby="cfg-teclas">
                    <h3 id="cfg-teclas" className="mb-2 font-bold">Teclas de atalho</h3>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-base">
                      {ATALHOS.map(([tecla, acao]) => (
                        <div key={tecla} className="contents">
                          <dt className="dados text-muted">{tecla}</dt>
                          <dd>{acao}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    ref={fecharRef}
                    onClick={() => setAjudaOn(false)}
                    className="rounded-lg bg-acento px-6 py-3 text-lg font-bold text-sobre-acento"
                  >
                    Fechar (Esc)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEscala(1);
                      setPaleta("verde");
                      setClaro(true);
                      setContraste(false);
                      setAnimOff(false);
                    }}
                    className="rounded-lg border-2 border-line-2 bg-surface-2 px-6 py-3 text-lg font-semibold text-ink"
                  >
                    Restaurar padrão
                  </button>
                </div>
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
