import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

/**
 * Cabeçalho das páginas da trilha: "← Trilha" e, ao lado, as marcas EDC Group
 * e Mindheart, juntas, com proporção travada (nunca esticam).
 */
export function Marcas({ voltar = true, altura = 34 }: { voltar?: boolean; altura?: number }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
      <div
        className="inline-flex w-fit items-center gap-4 rounded-2xl border border-line bg-white px-4 py-2 shadow-sm"
        role="group"
        aria-label="EDC Group e Mindheart"
      >
        <Logo tamanho={altura} />
        <span aria-hidden className="h-7 w-px bg-line-2" />
        <Image
          src="/logo/mindheart.png"
          alt="Mindheart"
          width={Math.round((altura * 727) / 550)}
          height={altura}
          style={{ height: altura, width: "auto" }}
        />
      </div>
      {voltar && (
        <Link href="/trilha" className="rounded-full border border-line-2 px-4 py-1.5 text-sm font-semibold text-ink-2 hover:border-acento hover:text-ink">
          ← Trilha
        </Link>
      )}
    </div>
  );
}
