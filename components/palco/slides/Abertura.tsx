"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { AlertTriangle, BatteryLow, Bell, Brain, Mail, MessageCircle, MessageSquare, Phone, Clock } from "lucide-react";
import { degrau, escada } from "@/lib/motion";
import { ENGOLIDO, MODELO_OPERACIONAL, NOTIFICACOES } from "@/conteudo/marina";
import { PALESTRANTE } from "@/conteudo/palestrante";
import { LogosParceiras } from "@/components/ui/Logo";
import { usePalco } from "../PalcoContext";
import { Cerebro } from "../Cerebro";
import type { Slide } from "@/conteudo/blocos";

/* ------------------------------------------------------------------ capa */

export function Capa({ slide }: { slide: Slide }) {
  return (
    <div className="grid w-full grid-cols-[1.25fr_1fr] items-center gap-[3vmin]">
      <div className="flex min-w-0 flex-col items-start gap-[5vmin]">
        <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo max-w-[14ch] text-palco-mega text-acento">
          {slide.titulo}
        </motion.h2>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <LogosParceiras altura={72} />
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
        <Cerebro ativas={["preFrontal", "limbico", "troncoCerebral"]} compacto />
      </motion.div>
    </div>
  );
}

/* --------------------------------------------------------------- relógio */

const FLUTUANTES = [
  { Icone: Mail, x: "10%", y: "22%", rotulo: "e-mail" },
  { Icone: MessageCircle, x: "78%", y: "12%", rotulo: "mensagem" },
  { Icone: AlertTriangle, x: "86%", y: "52%", rotulo: "alerta" },
  { Icone: Bell, x: "4%", y: "58%", rotulo: "notificação" },
];

export function Relogio({ slide }: { slide: Slide }) {
  const { reduzido } = usePalco();
  return (
    <div className="relative flex w-full flex-col items-center gap-[4vmin] text-center">
      {FLUTUANTES.map(({ Icone, x, y, rotulo }, i) => (
        <motion.span
          key={rotulo}
          aria-hidden
          className="absolute flex h-[9vmin] w-[9vmin] items-center justify-center rounded-2xl border-[3px] border-line-2 bg-surface text-acento"
          style={{ left: x, top: y }}
          animate={reduzido ? undefined : { y: [0, -18, 0] }}
          transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icone className="h-[55%] w-[55%]" strokeWidth={2.2} />
        </motion.span>
      ))}

      <motion.div
        aria-label="Oito horas da manhã"
        role="img"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl border-[5px] border-acento bg-surface px-[6vmin] py-[2vmin]"
      >
        <span className="dados text-palco-mega font-black leading-none text-ink">08:00</span>
      </motion.div>

      <motion.h2
        initial="entra"
        animate="ativo"
        variants={degrau}
        transition={{ delay: 0.4 }}
        className="titulo text-palco-titulo text-ink"
      >
        {slide.titulo}
      </motion.h2>
    </div>
  );
}

/* --------------------------------------------------------- 08:15 engolido */

const ICONE_NOTIF = { alerta: AlertTriangle, mensagem: MessageCircle, tempo: Clock, telefone: Phone } as const;

export function Engolido() {
  const { reduzido } = usePalco();
  return (
    <div className="flex w-full flex-col gap-[1.8vmin]">
      <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-[clamp(40px,4.6vw,84px)] text-ink">
        {ENGOLIDO.titulo}
      </motion.h2>

      <div className="grid grid-cols-[0.8fr_1.4fr] gap-[3vmin]">
        <div className="flex flex-col gap-[1.6vmin]">
          <span className="dados text-palco-corpo font-black text-acento">08:00</span>
          <div className="rounded-2xl border-[3px] border-acento bg-surface p-[2vmin] text-palco-texto font-semibold leading-snug">
            <span aria-hidden className="mr-3 inline-block h-[0.8em] w-[0.8em] translate-y-[0.1em] rounded border-[3px] border-acento" />
            {ENGOLIDO.tarefa}
          </div>
        </div>

        <div className="flex flex-col gap-[1.6vmin]">
          <span className="dados text-palco-corpo font-black text-alerta">08:15</span>
          <div className="relative rounded-2xl border-[3px] border-alerta bg-alerta-wash p-[2vmin]">
            <p className="text-palco-texto font-semibold leading-snug text-ink opacity-70">
              <span aria-hidden className="mr-3 inline-block h-[0.8em] w-[0.8em] translate-y-[0.1em] rounded border-[3px] border-ink-2" />
              {ENGOLIDO.tarefa}
            </p>
            <motion.ul
              initial="entra"
              animate="ativo"
              variants={escada(reduzido ? 0 : 0.28, 0.5)}
              className="mt-[1.6vmin] flex flex-wrap gap-[1.2vmin]"
              aria-label="Notificações que chegaram"
            >
              {NOTIFICACOES.map((n) => {
                const Icone = ICONE_NOTIF[n.tipo];
                return (
                  <motion.li
                    key={n.texto}
                    variants={degrau}
                    className="flex items-center gap-2 rounded-xl border-[3px] border-alerta bg-surface px-3 py-1.5 text-palco-nota font-bold text-ink"
                  >
                    <Icone aria-hidden className="h-[1.1em] w-[1.1em] shrink-0 text-alerta" strokeWidth={2.6} />
                    {n.texto}
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduzido ? 0 : 3.2 }}
        className="flex items-start gap-4 rounded-2xl bg-ink px-[2.4vmin] py-[1.4vmin] text-bg"
      >
        <MessageSquare aria-hidden className="mt-1 h-[1.5em] w-[1.5em] shrink-0 text-palco-nota" />
        <p className="text-palco-nota font-semibold leading-snug">{ENGOLIDO.chat}</p>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------ modelo operacional */

export function Modelo() {
  const { reduzido } = usePalco();
  return (
    <div className="flex w-full flex-col gap-[3vmin]">
      <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo max-w-[40ch] text-palco-corpo text-ink">
        {MODELO_OPERACIONAL.titulo}
      </motion.h2>
      <div className="grid grid-cols-2 gap-[3vmin]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center gap-[2vmin] rounded-3xl border-[3px] border-alerta bg-alerta-wash p-[2.4vmin] text-center"
        >
          <motion.span
            aria-hidden
            animate={reduzido ? undefined : { x: [0, -6, 6, -4, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 1.6 }}
            className="text-alerta"
          >
            <BatteryLow className="h-[16vmin] w-[16vmin]" strokeWidth={1.8} />
          </motion.span>
          <p className="titulo text-palco-corpo text-alerta">{MODELO_OPERACIONAL.bruta.titulo}</p>
          <p className="text-palco-texto leading-snug text-ink">{MODELO_OPERACIONAL.bruta.texto}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-[2vmin] rounded-3xl border-[3px] border-acento bg-acento-wash p-[2.4vmin] text-center"
        >
          <motion.span
            aria-hidden
            animate={reduzido ? undefined : { scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-acento"
          >
            <Brain className="h-[16vmin] w-[16vmin]" strokeWidth={1.8} />
          </motion.span>
          <p className="titulo text-palco-corpo text-acento">{MODELO_OPERACIONAL.biologica.titulo}</p>
          <p className="text-palco-texto leading-snug text-ink">{MODELO_OPERACIONAL.biologica.texto}</p>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ palestrante */

export function Palestrante({ slide }: { slide: Slide }) {
  return (
    <div className="grid w-full grid-cols-[auto_1fr] items-center gap-[4vmin]">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative h-[62vh] overflow-hidden rounded-3xl border-[4px] border-acento"
        style={{ aspectRatio: "2 / 3" }}
      >
        <Image src={PALESTRANTE.foto} alt={`Foto de ${PALESTRANTE.nome}`} fill className="object-cover" sizes="42vh" priority />
      </motion.div>

      <div className="flex min-w-0 flex-col gap-[2.6vmin]">
        <motion.h2 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-titulo text-acento">
          {slide.titulo}
        </motion.h2>
        <motion.ul
          initial="entra"
          animate="ativo"
          variants={escada(0.12, 0.3)}
          className="flex flex-col gap-[1.2vmin] text-palco-texto font-semibold leading-snug text-ink"
        >
          {PALESTRANTE.bioCurta.map((linha) => (
            <motion.li key={linha} variants={degrau} className="flex items-baseline gap-3">
              <span aria-hidden className="text-acento">
                ▸
              </span>
              {linha}
            </motion.li>
          ))}
        </motion.ul>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <LogosParceiras altura={64} />
        </motion.div>
      </div>
    </div>
  );
}
