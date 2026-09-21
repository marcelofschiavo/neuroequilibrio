"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { surgeNoScroll, levanta } from "@/lib/motion";
import { lerProgresso, apagarTudoLocal } from "@/lib/local";
import { MODULOS_ESSENCIAIS, MODULOS_EXTRAS, MODULOS_TRILHA, type ModuloTrilha } from "@/conteudo/trilha";
import { AnelProgresso } from "@/components/trilha/AnelProgresso";
import { Logo } from "@/components/ui/Logo";
import { EVENTO } from "@/conteudo/palestrante";

function ListaModulos({ modulos, concluidos }: { modulos: ModuloTrilha[]; concluidos: string[] }) {
  return (
    <div className="grid gap-3">
      {modulos.map((m, i) => {
        const feito = concluidos.includes(m.id);
        return (
          <motion.div key={m.id} {...surgeNoScroll} transition={{ ...surgeNoScroll.transition, delay: i * 0.04 }}>
            <motion.div {...levanta}>
              <Link href={m.href} className="flex items-center justify-between gap-4 rounded-lg border border-line bg-surface-2 px-5 py-4">
                <div>
                  <p className="font-bold text-ink">{m.rotulo}</p>
                  <p className="text-sm text-ink-2">{m.desc}</p>
                </div>
                <span className={`dados shrink-0 text-xs ${feito ? "text-acento" : "text-muted"}`}>{feito ? "feito ✓" : "→"}</span>
              </Link>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function PaginaTrilha() {
  const [concluidos, setConcluidos] = useState<string[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConcluidos(lerProgresso().modulos);
  }, []);

  const essenciaisFeitos = MODULOS_TRILHA.filter((id) => concluidos.includes(id)).length;
  const fracao = essenciaisFeitos / MODULOS_TRILHA.length;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Logo tamanho={32} />
          <p className="mt-4 font-dados text-[11px] uppercase tracking-[0.18em] text-acento">
            Trilha · {EVENTO.ocasiao}
          </p>
          <h1 className="titulo mt-2 text-4xl text-ink">Continua depois.</h1>
        </div>
        <AnelProgresso fracao={fracao} tamanho={72} />
      </div>

      <p className="mt-4 text-ink-2 max-w-prose">
        Sem cadastro. Tudo que você preenche aqui fica só neste aparelho.
      </p>

      <section className="mt-10">
        <h2 className="mb-1 text-lg font-bold text-ink">O essencial</h2>
        <p className="mb-4 text-sm text-muted">Os {MODULOS_TRILHA.length} liberam o certificado de participação.</p>
        <ListaModulos modulos={MODULOS_ESSENCIAIS} concluidos={concluidos} />
      </section>

      <div className="mt-6">
        <Link
          href="/trilha/certificado"
          className="block rounded-lg border border-acento bg-acento-wash px-5 py-4 text-center font-bold text-ink hover:brightness-95 transition"
        >
          {fracao >= 1
            ? "Gerar certificado de participação →"
            : `Complete o essencial para liberar o certificado (${essenciaisFeitos}/${MODULOS_TRILHA.length})`}
        </Link>
      </div>

      <section className="mt-12">
        <h2 className="mb-1 text-lg font-bold text-ink">Pra ir além</h2>
        <p className="mb-4 text-sm text-muted">Neuromitos, as referências completas e a palestrante.</p>
        <ListaModulos modulos={MODULOS_EXTRAS} concluidos={concluidos} />
      </section>

      <button
        onClick={() => {
          if (confirm("Apagar tudo o que está guardado neste aparelho? Não tem como desfazer.")) {
            apagarTudoLocal();
            setConcluidos([]);
          }
        }}
        className="mt-10 text-xs text-muted underline hover:text-alerta"
      >
        Apagar tudo o que está neste aparelho
      </button>
    </main>
  );
}
