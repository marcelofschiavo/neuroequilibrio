import { ROTULO_EVIDENCIA, type Evidencia } from "@/conteudo/referencias";

const COR: Record<Evidencia, string> = {
  consolidado: "🟢",
  moderada: "🟡",
  debate: "⚪",
};

/** Selo de rigor científico — regra do projeto: todo dado leva um. */
export function SeloEvidencia({ evidencia, className = "" }: { evidencia: Evidencia; className?: string }) {
  return (
    <span className={`dados inline-flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted ${className}`}>
      <span aria-hidden>{COR[evidencia]}</span>
      {ROTULO_EVIDENCIA[evidencia]}
    </span>
  );
}
