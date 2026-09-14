"use client";

import { motion } from "motion/react";
import { EVENTO } from "@/conteudo/palestrante";

/**
 * Nota discreta apontando que o exercício também existe na trilha, pra
 * praticar depois. A plateia não usa celular durante a palestra — isto não
 * é um convite pra escanear agora, é a apresentadora mencionando em voz
 * alta ("isso fica guardado na trilha") com o lembrete visual de apoio.
 */
export function TrilhaNota({ href }: { href?: string }) {
  if (!href) return null;
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.9 }}
      className="dados mt-2 text-palco-rodape text-muted"
    >
      também na trilha · {EVENTO.url.replace(/^https?:\/\//, "")}
      {href}
    </motion.p>
  );
}
