"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";
import { Logo } from "@/components/ui/Logo";
import { lerPlanoDia, gravarPlanoDia, type PlanoDia, type BlocoHorario, type NivelEnergia } from "@/lib/local";
import { gerarPlanoDia } from "@/lib/pdf-docs/plano";

const BLOCOS: { id: BlocoHorario; rotulo: string }[] = [
  { id: "manha", rotulo: "Manhã" },
  { id: "meioDia", rotulo: "Meio-dia" },
  { id: "tarde", rotulo: "Tarde" },
  { id: "fimDeTarde", rotulo: "Fim de tarde" },
];

const NIVEIS: { id: NivelEnergia; rotulo: string }[] = [
  { id: "pico", rotulo: "Pico" },
  { id: "medio", rotulo: "Médio" },
  { id: "vale", rotulo: "Vale" },
];

export default function PaginaPlano() {
  const [plano, setPlano] = useState<PlanoDia>({ energia: {}, blocosMonotarefa: ["", "", ""] });
  const [baixando, setBaixando] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPlano(lerPlanoDia());
  }, []);

  function atualizar(novo: PlanoDia) {
    setPlano(novo);
    gravarPlanoDia(novo);
  }

  async function baixar() {
    setBaixando(true);
    await gerarPlanoDia(plano);
    setBaixando(false);
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <MarcarConcluido modulo="plano" />
      <Link href="/trilha" className="text-sm text-muted hover:text-ink">
        ← Trilha
      </Link>
      <Logo tamanho={32} />
      <h1 className="titulo mt-4 text-3xl text-ink">Meu plano do dia</h1>
      <p className="mt-2 text-ink-2">Fica só neste aparelho. Sai em PDF quando você quiser.</p>

      <section className="mt-8">
        <h2 className="font-bold text-ink">Meu mapa de energia</h2>
        <p className="mt-1 text-sm text-muted">Como costuma ser cada período do seu dia?</p>
        <div className="mt-4 flex flex-col gap-3">
          {BLOCOS.map((b) => (
            <div key={b.id} className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-ink">{b.rotulo}</span>
              <div className="flex gap-1.5">
                {NIVEIS.map((n) => {
                  const ativo = plano.energia[b.id] === n.id;
                  return (
                    <button
                      key={n.id}
                      onClick={() => atualizar({ ...plano, energia: { ...plano.energia, [b.id]: n.id } })}
                      className={`rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors ${
                        ativo ? "border-acento bg-acento-wash text-acento-2" : "border-line bg-surface-2 text-ink-2 hover:border-acento"
                      }`}
                    >
                      {n.rotulo}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="font-bold text-ink">Meus blocos de monotarefa</h2>
        <p className="mt-1 text-sm text-muted">Agrupe o que exige o mesmo tipo de atenção.</p>
        <div className="mt-4 flex flex-col gap-3">
          {plano.blocosMonotarefa.map((valor, i) => (
            <input
              key={i}
              value={valor}
              onChange={(e) => {
                const novos = [...plano.blocosMonotarefa];
                novos[i] = e.target.value;
                atualizar({ ...plano, blocosMonotarefa: novos });
              }}
              placeholder={`Bloco ${i + 1}, ex.: e-mail e chat das 9h às 9h40`}
              className="w-full rounded-md border border-line bg-surface-2 px-4 py-3 text-sm text-ink outline-none focus:border-acento"
            />
          ))}
        </div>
      </section>

      <button
        onClick={baixar}
        disabled={baixando}
        className="mt-10 w-full rounded-md bg-acento px-6 py-4 font-semibold text-white hover:brightness-95 transition disabled:opacity-40"
      >
        {baixando ? "Gerando…" : "Baixar meu plano em PDF"}
      </button>
    </main>
  );
}
