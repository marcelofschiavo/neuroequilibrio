import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { EVENTO, PALESTRANTE } from "@/conteudo/palestrante";

export default function PaginaInicial() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col justify-center px-6 py-16">
        <Logo tamanho={48} />

        <p className="mt-6 font-dados text-[11px] uppercase tracking-[0.18em] text-acento">
          {EVENTO.ocasiao} · {EVENTO.dataExtenso}
        </p>
        <h1 className="titulo mt-3 text-5xl sm:text-6xl text-ink">{EVENTO.titulo}</h1>
        <p className="mt-4 max-w-md text-ink-2 leading-relaxed">
          Uma palestra sobre o cérebro no dia de trabalho, com {PALESTRANTE.nome} — e uma trilha que
          continua depois, com as ferramentas e as fontes científicas de cada uma delas.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/trilha" className="rounded-md bg-acento px-7 py-4 text-base font-semibold text-white hover:brightness-95 transition">
            Abrir a trilha →
          </Link>
          <Link href="/palestrante" className="rounded-md border border-line px-7 py-4 text-base font-semibold text-ink hover:border-acento transition">
            Sobre a palestrante
          </Link>
        </div>

        <div className="mt-16 border-t border-line pt-6">
          <p className="text-sm text-muted">
            {EVENTO.horario} · {EVENTO.cliente}
          </p>
        </div>
      </div>
    </main>
  );
}
