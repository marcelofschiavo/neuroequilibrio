import { ROTULO_EVIDENCIA, type Evidencia } from "@/conteudo/referencias";

const MARCA: Record<Evidencia, string> = { consolidado: "●●●", moderada: "●●○", debate: "●○○" };

/** Selo de rigor científico: texto + marcador de 3 pontos (nunca só cor nem só emoji). */
export function SeloEvidencia({ evidencia, className = "" }: { evidencia: Evidencia; className?: string }) {
  return (
    <span className={`dados inline-flex items-center gap-2 font-bold uppercase tracking-wide ${className}`}>
      <span aria-hidden>{MARCA[evidencia]}</span>
      {ROTULO_EVIDENCIA[evidencia]}
    </span>
  );
}
