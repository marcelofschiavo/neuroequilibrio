/**
 * Vocabulário de animação do projeto. Fonte da verdade única.
 *
 * REGRAS
 * 1. Palco (projeção): duração máxima 420ms, sem overshoot. Mola com bounce numa parede
 *    lê como brinquedo. Molas só onde há metáfora física (barra crescendo, palavra caindo).
 * 2. Celular: molas liberadas, 200–320ms.
 * 3. Nada anima de `opacity: 0` esperando scroll. O primeiro quadro já é legível.
 * 4. `prefers-reduced-motion` e a tecla `A` do palco colapsam tudo para opacidade.
 *
 * Importar SEMPRE daqui. Não escrever `initial/animate` solto em componente.
 */
import type { Variants, Transition } from "motion/react";

/* ---------- curvas ---------- */
export const ENTRADA = [0.16, 1, 0.3, 1] as const;   // expo.out — chega e assenta
export const SAIDA   = [0.7, 0, 0.84, 0] as const;   // expo.in — some rápido
export const SUAVE   = [0.65, 0, 0.35, 1] as const;

export const MOLA_FIRME: Transition = { type: "spring", stiffness: 420, damping: 34, mass: 0.8 };
export const MOLA_MACIA: Transition = { type: "spring", stiffness: 210, damping: 26 };

export const DUR = { relampago: 0.14, rapido: 0.24, base: 0.32, palco: 0.42, lento: 0.7 } as const;

/* ============================================================
   PALCO
   ============================================================ */

/** Troca de slide. `custom` = 1 avançando, -1 voltando. */
export const slide: Variants = {
  entra: (dir: number = 1) => ({ opacity: 0, x: dir * 64, filter: "blur(6px)" }),
  ativo: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: DUR.palco, ease: ENTRADA } },
  sai:   (dir: number = 1) => ({ opacity: 0, x: dir * -44, filter: "blur(6px)",
           transition: { duration: DUR.rapido, ease: SAIDA } }),
};

/** Container que solta os filhos em cascata. Use com `degrau`. */
export const escada = (atraso = 0.07, inicio = 0.12): Variants => ({
  ativo: { transition: { staggerChildren: atraso, delayChildren: inicio } },
});

/** Item de cascata: sobe e entra. O padrão para bullet, card, linha de lista. */
export const degrau: Variants = {
  entra: { opacity: 0, y: 22 },
  ativo: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: ENTRADA } },
  sai:   { opacity: 0, y: -10, transition: { duration: DUR.relampago } },
};

/** Título de bloco em pincel: desenha da esquerda como se fosse escrito. */
export const escreve: Variants = {
  // Folga vertical negativa: a Caveat Brush desenha acima/abaixo da própria
  // caixa (line-height .95), e inset(0) arrancava o topo das letras.
  entra: { opacity: 0, clipPath: "inset(-30% 100% -30% 0)" },
  ativo: { opacity: 1, clipPath: "inset(-30% -2% -30% 0)",
           transition: { duration: DUR.lento, ease: ENTRADA } },
};

/** Imagem entrando por cortina + leve zoom out. Metade da tela, lei do slide. */
export const cortina: Variants = {
  entra: { clipPath: "inset(0 0 100% 0)", scale: 1.06 },
  ativo: { clipPath: "inset(0 0 0% 0)", scale: 1,
           transition: { duration: 0.62, ease: ENTRADA } },
};

/** O momento "eu tô aqui": varredura de luz âmbar atravessando a frase. Usar UMA vez. */
export const brilho: Variants = {
  entra: { backgroundPosition: "-160% 0" },
  ativo: { backgroundPosition: "260% 0", transition: { duration: 1.1, ease: SUAVE, delay: 0.35 } },
};

/** Fundo ambiente dos slides de título: respiração lentíssima. Nunca em slide com texto denso. */
export const ambiente: Variants = {
  ativo: { scale: [1, 1.08, 1], opacity: [0.45, 0.7, 0.45],
           transition: { duration: 14, repeat: Infinity, ease: "easeInOut" } },
};

/* ============================================================
   RESULTADO / DADOS
   ============================================================ */

/** Barra de enquete crescendo. `custom` = fração 0..1. origin-left obrigatório. */
export const barra: Variants = {
  entra: { scaleX: 0 },
  ativo: (fracao: number) => ({ scaleX: fracao, transition: { ...MOLA_FIRME, delay: 0.08 } }),
};

/** Revelação de mito/verdade: a carta vira. */
export const viraCarta: Variants = {
  entra: { rotateY: 0 },
  ativo: { rotateY: 180, transition: { duration: 0.55, ease: ENTRADA } },
};

/** Palavra chegando na nuvem. Escala nasce grande e assenta. */
export const estoura: Variants = {
  entra: { opacity: 0, scale: 0.55, filter: "blur(4px)" },
  ativo: { opacity: 1, scale: 1, filter: "blur(0px)", transition: MOLA_MACIA },
  sai:   { opacity: 0, scale: 0.8, transition: { duration: DUR.rapido } },
};

/** Frase curada subindo para a parede, uma de cada vez. */
export const sobeParaParede: Variants = {
  entra: { opacity: 0, y: 40, scale: 0.96 },
  ativo: { opacity: 1, y: 0, scale: 1, transition: { duration: DUR.palco, ease: ENTRADA } },
};

/* ============================================================
   CELULAR / TRILHA
   ============================================================ */

/** Aparece ao entrar na viewport. Nunca parte de opacidade 0 no primeiro quadro visível. */
export const surgeNoScroll = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.35, margin: "0px 0px -12% 0px" },
  transition: { duration: DUR.base, ease: ENTRADA },
} as const;

/** Card clicável: sobe um fio ao passar o dedo/mouse. */
export const levanta = {
  whileHover: { y: -3, transition: { duration: DUR.rapido, ease: SUAVE } },
  whileTap: { scale: 0.985 },
} as const;

/** Botão de resposta confirmada. Um pulso só, sem festa. */
export const confirma: Variants = {
  ativo: { scale: [1, 1.06, 1], transition: { duration: 0.34, ease: SUAVE } },
};

/** QR pedindo atenção na parede. Loop lento, quase imperceptível. */
export const pulsa: Variants = {
  ativo: { scale: [1, 1.035, 1], transition: { duration: 2.6, repeat: Infinity, ease: "easeInOut" } },
};

/** Troca de página na trilha. */
export const pagina: Variants = {
  entra: { opacity: 0, y: 10 },
  ativo: { opacity: 1, y: 0, transition: { duration: DUR.base, ease: ENTRADA } },
  sai:   { opacity: 0, y: -6, transition: { duration: DUR.relampago } },
};

/* ============================================================
   EXERCÍCIOS GUIADOS
   ============================================================ */

/**
 * Respiração 4-7-8. Ciclo de 19s: inspira 4, segura 7, solta 8.
 * O círculo é a única coisa na tela; o texto muda junto pela fase.
 */
export const respira478: Variants = {
  ativo: {
    scale: [1, 1.75, 1.75, 1],
    opacity: [0.55, 1, 1, 0.55],
    transition: {
      duration: 19,
      times: [0, 4 / 19, 11 / 19, 1],
      repeat: Infinity,
      ease: ["easeInOut", "linear", "easeInOut"],
    },
  },
};

/** Passo do aterramento 5-4-3-2-1 entrando. */
export const passoAterramento: Variants = {
  entra: { opacity: 0, x: -18 },
  ativo: { opacity: 1, x: 0, transition: { duration: DUR.base, ease: ENTRADA } },
  sai:   { opacity: 0, x: 18, transition: { duration: DUR.rapido } },
};

/* ============================================================
   ASSINATURA
   ============================================================ */

/** Fita amarela do Setembro Amarelo se desenhando. Capa e certificado. */
export const desenhaFita: Variants = {
  entra: { pathLength: 0, opacity: 0 },
  ativo: { pathLength: 1, opacity: 1,
           transition: { pathLength: { duration: 1.5, ease: ENTRADA }, opacity: { duration: 0.2 } } },
};

/** Anel de progresso da trilha. `custom` = fração concluída 0..1. */
export const anelProgresso: Variants = {
  entra: { pathLength: 0 },
  ativo: (fracao: number) => ({ pathLength: fracao,
           transition: { duration: 0.9, ease: ENTRADA } }),
};

/* ============================================================
   COCKPIT
   ============================================================ */

/** Item novo chegando na fila de moderação. */
export const chegaNaFila: Variants = {
  entra: { opacity: 0, height: 0, marginBottom: 0 },
  ativo: { opacity: 1, height: "auto", marginBottom: 8, transition: { duration: DUR.rapido, ease: ENTRADA } },
  sai:   { opacity: 0, height: 0, marginBottom: 0, transition: { duration: DUR.rapido } },
};

/** Alerta de sinal de risco na fila. Cutuca, não pisca — piscar é agressivo aqui. */
export const cutuca: Variants = {
  ativo: { x: [0, -3, 3, -2, 0], transition: { duration: 0.42, ease: SUAVE } },
};

/* ============================================================
   DESLIGAMENTO
   ============================================================ */

/**
 * Devolve variantes neutras quando o usuário pede menos movimento
 * ou quando o apresentador aperta `A`. Envolver TODA variante com isto.
 *
 *   const v = semMovimento(reduzir, degrau);
 */
export function semMovimento(reduzir: boolean, variantes: Variants): Variants {
  if (!reduzir) return variantes;
  return {
    entra: { opacity: 0 },
    ativo: { opacity: 1, transition: { duration: 0.001 } },
    sai:   { opacity: 0, transition: { duration: 0.001 } },
  };
}
