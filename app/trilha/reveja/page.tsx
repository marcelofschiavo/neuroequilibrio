import Link from "next/link";
import Image from "next/image";
import { referencia } from "@/conteudo/referencias";
import { REGIOES } from "@/conteudo/cerebro";
import { ATOS, CENAS } from "@/conteudo/marina";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";
import { Logo } from "@/components/ui/Logo";
import { SeloEvidencia } from "@/components/ui/SeloEvidencia";
import { Cerebro } from "@/components/palco/Cerebro";

const DIA = [
  { cena: CENAS.c1, ato: ATOS.ato1 },
  { cena: CENAS.c2, ato: ATOS.ato2 },
  { cena: CENAS.c3, ato: ATOS.ato3 },
  { cena: CENAS.c4, ato: ATOS.ato4 },
] as const;

export default function PaginaReveja() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <MarcarConcluido modulo="reveja" />
      <Link href="/trilha" className="text-sm text-muted hover:text-ink">
        ← Trilha
      </Link>
      <div className="mt-2">
        <Logo tamanho={32} />
      </div>
      <h1 className="titulo mt-4 text-4xl text-ink">Reveja o dia da Marina.</h1>
      <p className="mt-2 text-ink-2">
        Quatro atos, das 08:00 às 17:00: o que aconteceu, o que o cérebro estava fazendo e a ciência por trás.
      </p>

      <div className="mt-10 flex flex-col gap-14">
        {DIA.map(({ cena, ato }) => (
          <section key={cena.hora} className="border-t-2 border-line pt-8" aria-labelledby={`ato-${cena.hora}`}>
            <p className="dados text-lg font-black text-acento-2">{cena.hora}</p>
            <h2 id={`ato-${cena.hora}`} className="titulo mt-1 text-2xl text-ink">
              {ato.titulo}
            </h2>

            <figure className="relative mt-5 aspect-square w-full overflow-hidden rounded-2xl border-[3px] border-ink">
              <Image src={cena.imagem} alt={cena.alt} fill sizes="(max-width: 672px) 100vw, 672px" className="object-cover" />
            </figure>
            <p className="mt-4 text-lg font-semibold leading-snug text-ink">{cena.situacao}</p>
            <p className="titulo mt-2 text-xl text-acento-2">{cena.pensamento}</p>

            <div className="mt-6 grid items-center gap-4 sm:grid-cols-[1fr_1.1fr]">
              <Cerebro ativas={ato.regioes} compacto />
              <ul className="flex flex-col gap-2 text-base leading-snug text-ink-2">
                {ato.regioes.map((r) => (
                  <li key={r}>
                    <strong className="text-ink">{REGIOES[r].nome}:</strong> {REGIOES[r].oQue} {REGIOES[r].onde}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-5 rounded-xl border-2 border-acento bg-acento-wash p-4 text-base font-semibold leading-snug text-ink">
              {ato.callout}
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
              <SeloEvidencia evidencia={ato.evidencia} />
              {ato.ilustrativo && <span className="dados font-bold uppercase">gráfico ilustrativo na palestra</span>}
            </p>
            <p className="mt-1 text-sm text-muted">fonte: {ato.fontes.map((id) => referencia(id).curta).join(" · ")}</p>
          </section>
        ))}
      </div>

      <div className="mt-12 flex flex-col gap-2 border-t-2 border-line pt-8">
        <Link href="/trilha/rifo" className="font-bold text-acento-2 underline">
          Ver os métodos do dia (R.I.F.O. e P.N.E.) →
        </Link>
        <Link href="/trilha/referencias" className="font-bold text-acento-2 underline">
          Ver todas as referências científicas →
        </Link>
      </div>
    </main>
  );
}
