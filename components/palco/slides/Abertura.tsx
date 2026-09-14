"use client";

import { motion } from "motion/react";
import { ENTRADA } from "@/lib/motion";

/** Abre cada bloco: número sobe, linha cresce, título escreve. Orienta a sala. */
export function Abertura({
  numero,
  total,
  titulo,
}: {
  numero: number;
  total: number;
  titulo: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="overflow-hidden">
        <motion.span
          className="dados block font-black leading-none text-acento text-palco-mega"
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.55, ease: ENTRADA }}
        >
          {String(numero).padStart(2, "0")}
        </motion.span>
      </div>
      <motion.div
        className="h-2 w-[42vw] rounded-full bg-acento"
        style={{ transformOrigin: "left" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: ENTRADA }}
      />
      <motion.h2
        className="titulo text-palco-mega text-ink"
        initial={{ opacity: 0, clipPath: "inset(-30% 100% -30% 0)" }}
        animate={{ opacity: 1, clipPath: "inset(-30% -2% -30% 0)" }}
        transition={{ duration: 0.8, delay: 0.4, ease: ENTRADA }}
      >
        {titulo}
      </motion.h2>
      <motion.p
        className="dados text-palco-rodape uppercase tracking-[0.18em] text-muted"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        bloco {numero} de {total}
      </motion.p>
    </div>
  );
}
