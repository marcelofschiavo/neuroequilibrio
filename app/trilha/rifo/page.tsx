import Link from "next/link";
import { FUNIL, PNE, REGRA_903, RIFO, MONOTAREFA } from "@/conteudo/marina";
import { referencia } from "@/conteudo/referencias";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";
import { Marcas } from "@/components/trilha/Marcas";
import { SeloEvidencia } from "@/components/ui/SeloEvidencia";

function Fontes({ ids }: { ids: string[] }) {
  return <p className="mt-2 text-sm text-muted">fonte: {ids.map((id) => referencia(id).curta).join(" · ")}</p>;
}

export default function PaginaRifo() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <MarcarConcluido modulo="rifo" />
      <Marcas />
      <h1 className="titulo mt-8 text-4xl text-ink sm:text-5xl">Mapa R.I.F.O.</h1>
      <p className="mt-2 text-ink-2">Os quatro métodos do dia da Marina, para levar e usar.</p>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2" aria-label="As quatro partes do mapa R.I.F.O.">
        {RIFO.quadrantes.map((q) => (
          <li key={q.letra} className="rounded-xl border-2 border-acento bg-acento-wash p-4">
            <p className="titulo text-xl text-acento-2">
              {q.letra} · {q.nome}
            </p>
            <p className="mt-1 text-base font-semibold leading-snug text-ink">{q.texto}</p>
          </li>
        ))}
      </ol>

      <section className="mt-12" aria-labelledby="r">
        <h2 id="r" className="titulo text-2xl text-ink">
          R · Ritmo: a regra 90-3-1
        </h2>
        <ol className="mt-3 flex flex-wrap gap-2">
          {REGRA_903.etapas.map((e) => (
            <li key={e.valor} className="rounded-lg border-2 border-line-2 bg-surface px-3 py-2 font-semibold text-ink">
              <span className="dados font-black text-acento-2">{e.valor}</span> {e.texto}
            </li>
          ))}
        </ol>
        <ol className="mt-3 list-decimal pl-6 text-ink-2">
          {REGRA_903.passos.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ol>
        <p className="mt-2 font-bold text-ink">{REGRA_903.pergunta}</p>
        <p className="mt-2 text-sm text-ink-2">{REGRA_903.aviso}</p>
        <p className="mt-2 text-sm"><SeloEvidencia evidencia={REGRA_903.evidencia} className="text-muted" /></p>
        <Fontes ids={REGRA_903.fontes} />
        <Link href="/trilha/micropausa" className="mt-2 inline-block font-bold text-acento-2 underline">
          Fazer a pausa de 3 minutos agora →
        </Link>
      </section>

      <section className="mt-10" aria-labelledby="i">
        <h2 id="i" className="titulo text-2xl text-ink">I · Intenção: arquitetura de decisão</h2>
        <ol className="mt-3 list-decimal pl-6 text-ink">
          {FUNIL.perguntas.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
        <p className="mt-2 text-sm text-ink-2">{FUNIL.aviso}</p>
        <p className="mt-2 text-sm"><SeloEvidencia evidencia={FUNIL.evidencia} className="text-muted" /></p>
        <Fontes ids={FUNIL.fontes} />
      </section>

      <section className="mt-10" aria-labelledby="f">
        <h2 id="f" className="titulo text-2xl text-ink">F · Fisiologia: suspiro + P.N.E.</h2>
        <p className="mt-2 text-ink-2">
          <strong className="text-ink">{PNE.freio.titulo}:</strong> {PNE.freio.texto} ({PNE.freio.detalhe}).
        </p>
        <ol className="mt-3 flex flex-col gap-2">
          {PNE.metodo.passos.map((p) => (
            <li key={p.verbo} className="rounded-lg border-2 border-acento bg-acento-wash px-3 py-2 text-ink">
              <strong className="text-acento-2">{p.verbo}:</strong> {p.texto}
            </li>
          ))}
        </ol>
        <p className="mt-2 text-sm"><SeloEvidencia evidencia={PNE.evidencia} className="text-muted" /></p>
        <Fontes ids={PNE.fontes} />
        <Link href="/trilha/suspiro" className="mt-2 inline-block font-bold text-acento-2 underline">
          Praticar o suspiro guiado →
        </Link>
      </section>

      <section className="mt-10" aria-labelledby="o">
        <h2 id="o" className="titulo text-2xl text-ink">O · Uma coisa por vez</h2>
        <p className="mt-2 text-ink-2">{MONOTAREFA.citacao}</p>
        <p className="mt-2 text-sm"><SeloEvidencia evidencia={MONOTAREFA.evidencia} className="text-muted" /></p>
        <Fontes ids={MONOTAREFA.fontes} />
        <Link href="/trilha/plano" className="mt-2 inline-block font-bold text-acento-2 underline">
          Montar meus blocos de monotarefa →
        </Link>
      </section>
    </main>
  );
}
