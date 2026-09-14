import Link from "next/link";
import { BLOCOS } from "@/conteudo/blocos";
import { PERSONAGENS } from "@/conteudo/personagens";
import { referencia } from "@/conteudo/referencias";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";
import { Logo } from "@/components/ui/Logo";
import { Ilustracao } from "@/components/palco/Ilustracao";
import { Cerebro } from "@/components/palco/Cerebro";

export default function PaginaReveja() {
  const blocosPersonagens = BLOCOS.filter((b) => ["rafael", "luciana", "beatriz", "marcos"].includes(b.id));

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <MarcarConcluido modulo="reveja" />
      <Link href="/trilha" className="text-sm text-muted hover:text-ink">
        ← Trilha
      </Link>
      <Logo tamanho={32} />
      <h1 className="titulo mt-4 text-4xl text-ink">Reveja o dia.</h1>
      <p className="mt-2 text-ink-2">Os quatro personagens, a ciência de cada cena e a ferramenta de cada um.</p>

      <div className="mt-10 flex flex-col gap-12">
        {blocosPersonagens.map((bloco) => {
          const p = PERSONAGENS.find((x) => x.id === bloco.id)!;
          const cenas = bloco.slides.filter((s) => s.tipo === "cena");
          const insights = bloco.slides.filter((s) => s.tipo === "insight");
          const listas = bloco.slides.filter((s) => s.tipo === "lista");
          return (
            <section key={bloco.id} className="border-t border-line pt-8">
              <div className="flex items-center gap-4">
                <div className="shrink-0 opacity-90">
                  <Ilustracao personagemId={p.id} tamanho={64} />
                </div>
                <div>
                  <p className="font-bold text-ink">{p.nome} · {p.papel}</p>
                  <p className="text-sm text-muted">{p.tema}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3">
                {cenas.map((c) => (
                  <div key={c.id} className="rounded-lg border border-line bg-surface-2 p-4">
                    <p className="dados text-xs uppercase tracking-wide text-acento">{c.hora}</p>
                    <p className="mt-1 text-ink">{c.situacao}</p>
                    {c.pensamento && <p className="mt-1 titulo text-acento">{c.pensamento}</p>}
                  </div>
                ))}
              </div>

              {insights.map((ins) => (
                <div key={ins.id} className="mt-4 flex items-start gap-4">
                  <div className="min-w-0 flex-1">
                    {ins.titulo && <p className="font-bold text-ink">{ins.titulo}</p>}
                    {ins.destaque && <p className="text-acento-2 font-semibold">{ins.destaque}</p>}
                    {ins.unidade && <p className="mt-1 text-sm text-ink-2">{ins.unidade}</p>}
                    {!!ins.fonteIds?.length && (
                      <p className="mt-1 text-xs text-muted">
                        fonte: {ins.fonteIds.map((id) => referencia(id).curta).join(" · ")}
                      </p>
                    )}
                  </div>
                  {ins.regiaoCerebro && (
                    <div className="hidden shrink-0 sm:block">
                      <Cerebro regiaoAtiva={ins.regiaoCerebro} tamanho={110} />
                    </div>
                  )}
                </div>
              ))}

              {listas.map((l) => (
                <div key={l.id} className="mt-4 rounded-lg border border-acento bg-acento-wash p-4">
                  {l.titulo && <p className="font-bold text-ink">{l.titulo}</p>}
                  <ul className="mt-2 flex flex-col gap-1">
                    {l.itens?.map((item, i) => (
                      <li key={i} className="text-sm text-ink-2">· {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
          );
        })}
      </div>

      <Link href="/trilha/referencias" className="mt-10 inline-block text-sm font-semibold text-acento-2 underline">
        Ver todas as referências científicas →
      </Link>
    </main>
  );
}
