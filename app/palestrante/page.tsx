import Link from "next/link";
import Image from "next/image";
import { PALESTRANTE } from "@/conteudo/palestrante";
import { Logo } from "@/components/ui/Logo";
import { MarcarConcluido } from "@/components/trilha/MarcarConcluido";

export default function PaginaPalestrante() {
  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <MarcarConcluido modulo="palestrante" />
      <Link href="/trilha" className="text-sm text-muted hover:text-ink">
        ← Trilha
      </Link>
      <Logo tamanho={32} />

      <div className="mt-6 overflow-hidden rounded-2xl border border-line">
        <Image src={PALESTRANTE.foto} alt={PALESTRANTE.nome} width={800} height={1000} className="w-full object-cover" />
      </div>

      <h1 className="titulo mt-6 text-3xl text-ink">{PALESTRANTE.nomeCompleto}</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        {PALESTRANTE.titulos.map((t) => (
          <span key={t} className="dados rounded-full border border-line px-3 py-1 text-xs text-ink-2">
            {t}
          </span>
        ))}
      </div>

      <p className="mt-5 text-ink-2 leading-relaxed">{PALESTRANTE.bio}</p>

      <div className="mt-8 flex flex-col gap-2">
        {PALESTRANTE.contatos.map((c) => (
          <a
            key={c.rede}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-md border border-line bg-surface-2 px-4 py-3 text-sm font-semibold text-ink hover:border-acento"
          >
            <span>{c.rede}</span>
            <span className="text-acento-2">{c.rotulo}</span>
          </a>
        ))}
      </div>
    </main>
  );
}
