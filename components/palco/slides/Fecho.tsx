"use client";

import { motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { degrau, pulsa, ENTRADA } from "@/lib/motion";
import { EVENTO, PALESTRANTE } from "@/conteudo/palestrante";
import type { Slide } from "@/conteudo/blocos";

/**
 * Fecho com QR da trilha e os contatos da palestrante — o que a plateia leva
 * consigo. O QR é gerado localmente (funciona offline).
 */
export function Fecho({ slide }: { slide: Slide }) {
  const url = slide.url ?? `${EVENTO.url}/trilha`;
  const rotuloUrl = url.replace(/^https?:\/\//, "");

  return (
    <div className="grid w-full grid-cols-[1fr_auto] items-center gap-14">
      <div className="flex flex-col gap-7">
        <motion.h1 initial="entra" animate="ativo" variants={degrau} className="titulo text-palco-titulo text-acento">
          {slide.titulo}
        </motion.h1>
        {slide.destaque && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: ENTRADA }}
            className="text-palco-nota text-ink-2"
          >
            {slide.destaque}
          </motion.p>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col gap-1 border-t-2 border-line pt-6"
        >
          <p className="text-palco-nota font-semibold text-ink">{PALESTRANTE.nome}</p>
          <p className="dados text-sm uppercase tracking-wide text-acento">
            {PALESTRANTE.contatos.map((c) => c.rotulo).join("  ·  ")}
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: ENTRADA }}
        className="flex flex-col items-center gap-4"
      >
        <motion.div initial="ativo" animate="ativo" variants={pulsa} className="rounded-3xl bg-white p-[2.4vmin]">
          <QRCodeSVG
            value={url}
            size={512}
            level="M"
            bgColor="#FFFFFF"
            fgColor="#1E1F21"
            style={{ width: "30vmin", height: "30vmin", display: "block" }}
          />
        </motion.div>
        <p className="dados text-palco-rodape uppercase tracking-[0.14em] text-ink">{rotuloUrl}</p>
      </motion.div>
    </div>
  );
}
