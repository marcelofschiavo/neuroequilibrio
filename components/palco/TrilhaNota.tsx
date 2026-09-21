"use client";

import { motion } from "motion/react";
import { EVENTO } from "@/conteudo/palestrante";

/**
 * Nota apontando que o exercício também existe na trilha, pra praticar
 * depois. Não é convite pra abrir agora: é a apresentadora mencionando em
 * voz alta ("isso fica guardado na trilha") com o lembrete visual de apoio.
 */
export function TrilhaNota({ href }: { href?: string }) {
  // Link da trilha fica só no slide final e no chat: nos slides polui.
  if (!href || true) return null;
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="dados mt-1 text-palco-rodape font-semibold text-muted [overflow-wrap:anywhere]"
    >
      também na trilha · {EVENTO.url.replace(/^https?:\/\//, "")}
      {href}
    </motion.p>
  );
}
