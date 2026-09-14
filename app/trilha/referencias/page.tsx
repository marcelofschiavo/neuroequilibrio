import Link from "next/link";
import { REFERENCIAS } from "@/conteudo/referencias";
import { Logo } from "@/components/ui/Logo";

export default function PaginaReferencias() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <Link href="/trilha" className="text-sm text-muted hover:text-ink">
        ← Trilha
      </Link>
      <Logo tamanho={32} />
      <h1 className="titulo mt-4 text-4xl text-ink">Referências científicas</h1>
      <p className="mt-2 text-ink-2 max-w-prose">
        Todo dado citado na palestra e na trilha, com a referência completa e o link para o artigo.
      </p>

      <div className="mt-10 flex flex-col gap-5">
        {REFERENCIAS.map((r) => (
          <div key={r.id} className="rounded-lg border border-line bg-surface-2 p-5">
            <p className="text-sm text-ink">{r.completa}</p>
            <p className="mt-2 text-sm font-semibold text-ink-2">{r.achado}</p>
            {r.doi && (
              <a href={`https://doi.org/${r.doi}`} target="_blank" rel="noreferrer" className="mt-2 inline-block text-xs font-semibold text-acento-2 underline">
                doi.org/{r.doi}
              </a>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
