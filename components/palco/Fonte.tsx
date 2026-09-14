"use client";

import { motion } from "motion/react";
import { degrau } from "@/lib/motion";
import { fontesCurtas } from "@/conteudo/referencias";

/** Rodapé de citação — some no rodapé de qualquer slide de dado técnico. */
export function Fonte({ ids }: { ids?: string[] }) {
  if (!ids?.length) return null;
  return (
    <motion.p initial="entra" animate="ativo" variants={degrau} className="dados text-palco-rodape text-muted mt-2">
      fonte: {fontesCurtas(ids)}
    </motion.p>
  );
}
