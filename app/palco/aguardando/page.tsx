"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TemaProvider } from "@/components/ui/TemaProvider";
import { Logo } from "@/components/ui/Logo";
import { ambiente, escada, degrau } from "@/lib/motion";
import { EVENTO, PALESTRANTE } from "@/conteudo/palestrante";

/**
 * Tela de espera — os 5 min de chegada do convite, antes da fala começar.
 * Loop simples, sem interação. A apresentadora troca pra /palco na hora.
 */
export default function PaginaAguardando() {
  const [agora, setAgora] = useState<Date | null>(() => (typeof window === "undefined" ? null : new Date()));

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAgora(new Date());
    const t = setInterval(() => setAgora(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const inicio = new Date(EVENTO.inicioFala);
  const restante = agora ? Math.max(0, Math.round((inicio.getTime() - agora.getTime()) / 1000)) : null;
  const min = restante !== null ? Math.floor(restante / 60) : null;
  const seg = restante !== null ? restante % 60 : null;

  return (
    <TemaProvider tema="palco">
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-10 bg-bg px-8 text-center">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute h-[60vmin] w-[60vmin] rounded-full bg-acento"
          initial="ativo"
          animate="ativo"
          variants={ambiente}
          style={{ opacity: 0.1 }}
        />
        <motion.div initial="entra" animate="ativo" variants={escada(0.15, 0.1)} className="relative flex flex-col items-center gap-8">
          <motion.div variants={degrau}>
            <Logo tamanho={64} branco />
          </motion.div>
          <motion.h1 variants={degrau} className="titulo text-palco-titulo text-ink max-w-4xl">
            Neurociências &amp; Equilíbrio Emocional
          </motion.h1>
          <motion.p variants={degrau} className="dados text-palco-nota uppercase tracking-[0.18em] text-acento">
            {EVENTO.ocasiao} · {PALESTRANTE.nome}
          </motion.p>
          <motion.p variants={degrau} className="text-palco-nota text-ink-2">
            Já pode se acomodar. Já pode respirar fundo.
          </motion.p>
          {restante !== null && restante > 0 && (
            <motion.p variants={degrau} className="dados text-palco-mega font-black text-acento">
              {min}:{String(seg).padStart(2, "0")}
            </motion.p>
          )}
        </motion.div>
      </div>
    </TemaProvider>
  );
}
