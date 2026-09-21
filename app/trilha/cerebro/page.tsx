import { CerebroTrilha } from "@/components/trilha/CerebroTrilha";
import { Marcas } from "@/components/trilha/Marcas";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";

export default function PaginaCerebro() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <MarcarConcluido modulo="cerebro" />
      <Marcas />
      <p className="dados mt-8 text-[11px] font-bold uppercase tracking-[0.18em] text-acento-2">Interativo</p>
      <h1 className="titulo mt-2 text-4xl text-ink sm:text-5xl">O cérebro da Marina</h1>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-ink-2">
        Quatro regiões, em anatomia simplificada de propósito. Explore uma a uma ou veja quais se acendem em cada momento do dia dela.
      </p>
      <div className="mt-10">
        <CerebroTrilha />
      </div>
    </main>
  );
}
