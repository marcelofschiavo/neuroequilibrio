"use client";

import { motion } from "motion/react";
import { Info } from "lucide-react";
import { degrau } from "@/lib/motion";
import { citacaoCurta, type Evidencia } from "@/conteudo/referencias";
import { SeloEvidencia } from "@/components/ui/SeloEvidencia";

/**
 * Rodapé de um slide de dado técnico: só o selo de rigor fica à vista. Os
 * autores aparecem ao passar o mouse (ou ao focar com Tab) — menos poluição
 * na tela, e a informação continua lá para quem procura (e para o leitor de
 * tela, que lê o texto mesmo com ele invisível).
 */
export function Fonte({ ids, evidencia, ilustrativo }: { ids?: string[]; evidencia?: Evidencia; ilustrativo?: boolean }) {
  if (!ids?.length && !evidencia) return null;
  return (
    <motion.div
      initial="entra"
      animate="ativo"
      variants={degrau}
      tabIndex={ids?.length ? 0 : undefined}
      className="group relative flex w-fit flex-wrap items-center gap-x-4 gap-y-1 rounded-md text-palco-rodape leading-snug text-muted outline-offset-4"
    >
      {evidencia && <SeloEvidencia evidencia={evidencia} />}
      {ilustrativo && <span className="dados font-bold uppercase">gráfico ilustrativo</span>}
      {!!ids?.length && (
        <>
          <span aria-hidden className="dados flex items-center gap-1 opacity-70 group-hover:opacity-100 group-focus:opacity-100">
            <Info className="h-[1.1em] w-[1.1em]" /> fontes
          </span>
          <span
            role="note"
            className="dados pointer-events-none absolute bottom-full left-0 z-20 mb-2 w-max max-w-[70vw] rounded-xl border-2 border-line-2 bg-surface px-4 py-2 text-ink opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus:opacity-100"
          >
            fonte: {ids.map(citacaoCurta).join(" · ")}
          </span>
        </>
      )}
    </motion.div>
  );
}
