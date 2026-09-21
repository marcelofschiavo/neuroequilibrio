/**
 * Estado local tipado. Prefixo ne26:. Sem cadastro, sem servidor — tudo que
 * a pessoa preenche na trilha fica só neste aparelho e só sai como PDF
 * gerado no cliente.
 */
"use client";

const PREFIXO = "ne26:";

function ok(): boolean {
  return typeof window !== "undefined" && !!window.localStorage;
}

function ler<T>(chave: string, padrao: T): T {
  if (!ok()) return padrao;
  try {
    const bruto = window.localStorage.getItem(PREFIXO + chave);
    if (!bruto) return padrao;
    return JSON.parse(bruto) as T;
  } catch {
    return padrao;
  }
}

function escrever<T>(chave: string, valor: T): void {
  if (!ok()) return;
  try {
    window.localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
  } catch {
    // Aparelho sem espaço ou modo privado — falha em silêncio, não é dado crítico.
  }
}

/* ---------------- progresso da trilha ---------------- */

export type ProgressoTrilha = { modulos: string[] };

export function lerProgresso(): ProgressoTrilha {
  return ler<ProgressoTrilha>("trilha", { modulos: [] });
}
/** Retorna true se o módulo já estava marcado. */
export function marcarModuloConcluido(modulo: string): boolean {
  const atual = lerProgresso();
  if (atual.modulos.includes(modulo)) return true;
  escrever("trilha", { modulos: [...atual.modulos, modulo] });
  return false;
}

/* ---------------- meu plano do dia ---------------- */

export type BlocoHorario = "manha" | "meioDia" | "tarde" | "fimDeTarde";
export type NivelEnergia = "pico" | "medio" | "vale";

export type PlanoDia = {
  energia: Partial<Record<BlocoHorario, NivelEnergia>>;
  blocosMonotarefa: string[];
  /** "A partir de amanhã, para proteger o meu cérebro, eu vou: ___" */
  compromisso: string;
};

const PLANO_PADRAO: PlanoDia = { energia: {}, blocosMonotarefa: ["", "", ""], compromisso: "" };

export function lerPlanoDia(): PlanoDia {
  // Planos salvos antes do campo "compromisso" existir ganham o padrão.
  return { ...PLANO_PADRAO, ...ler<Partial<PlanoDia>>("plano-dia", {}) };
}
export function gravarPlanoDia(plano: PlanoDia): void {
  escrever("plano-dia", plano);
}

/* ---------------- apagar tudo ---------------- */

export function apagarTudoLocal(): void {
  if (!ok()) return;
  Object.keys(window.localStorage)
    .filter((k) => k.startsWith(PREFIXO))
    .forEach((k) => window.localStorage.removeItem(k));
}
