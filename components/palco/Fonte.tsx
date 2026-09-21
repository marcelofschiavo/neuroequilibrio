"use client";

import { motion } from "motion/react";
import { degrau } from "@/lib/motion";
import { citacaoCurta, type Evidencia } from "@/conteudo/referencias";
import { SeloEvidencia } from "@/components/ui/SeloEvidencia";

/** Rodapé de citação de um slide de dado técnico: selo de rigor + fontes curtas. */
export function Fonte({ ids, evidencia, ilustrativo }: { ids?: string[]; evidencia?: Evidencia; ilustrativo?: boolean }) {
  if (!ids?.length && !evidencia) return null;
  return (
    <motion.p
      initial="entra"
      animate="ativo"
      variants={degrau}
      className="flex flex-wrap items-center gap-x-4 gap-y-1 text-palco-rodape leading-snug text-muted"
    >
      {evidencia && <SeloEvidencia evidencia={evidencia} />}
      {ilustrativo && <span className="dados font-bold uppercase">gráfico ilustrativo</span>}
      {!!ids?.length && <span className="dados">fonte: {ids.map(citacaoCurta).join(" · ")}</span>}
    </motion.p>
  );
}
