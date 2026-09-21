"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, BookOpen, Brain, Check, ClipboardList, Compass, HelpCircle, Library, PenLine, Timer, User, Wind, type LucideIcon } from "lucide-react";
import { surgeNoScroll, levanta } from "@/lib/motion";
import { lerProgresso, apagarTudoLocal } from "@/lib/local";
import { MODULOS_ESSENCIAIS, MODULOS_EXTRAS, MODULOS_TRILHA, type ModuloTrilha } from "@/conteudo/trilha";
import { AnelProgresso } from "@/components/trilha/AnelProgresso";
import { Marcas } from "@/components/trilha/Marcas";
import { EVENTO } from "@/conteudo/palestrante";

const ICONE: Record<string, LucideIcon> = {
  reveja: BookOpen,
  suspiro: Wind,
  micropausa: Timer,
  rifo: Compass,
  plano: ClipboardList,
  neuromitos: HelpCircle,
  cerebro: Brain,
  escrever: PenLine,
  referencias: Library,
  palestrante: User,
};

function ListaModulos({ modulos, concluidos, grade = false }: { modulos: ModuloTrilha[]; concluidos: string[]; grade?: boolean }) {
  return (
    <ul className={grade ? "grid gap-4 sm:grid-cols-2" : "grid gap-4"}>
      {modulos.map((m, i) => {
        const feito = concluidos.includes(m.id);
        const Icone = ICONE[m.id] ?? BookOpen;
        return (
          <motion.li key={m.id} {...surgeNoScroll} transition={{ ...surgeNoScroll.transition, delay: i * 0.05 }}>
            <motion.div {...levanta} className="h-full">
              <Link
                href={m.href}
                className={`group flex h-full items-center gap-4 rounded-2xl border-2 bg-surface-2 p-5 shadow-sm transition-colors hover:border-acento ${feito ? "border-acento" : "border-line"}`}
              >
                <span aria-hidden className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${feito ? "bg-acento text-sobre-acento" : "bg-acento-wash text-acento-2"}`}>
                  {feito ? <Check className="h-7 w-7" strokeWidth={3} /> : <Icone className="h-7 w-7" strokeWidth={2} />}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-lg font-bold leading-snug text-ink">{m.rotulo}</span>
                  <span className="mt-0.5 block text-base leading-snug text-ink-2">{m.desc}</span>
                  {feito && <span className="dados mt-1 block text-xs font-bold uppercase text-acento-2">feito</span>}
                </span>
                <ArrowRight aria-hidden className="h-5 w-5 shrink-0 text-muted transition-transform group-hover:translate-x-1 group-hover:text-acento" />
              </Link>
            </motion.div>
          </motion.li>
        );
      })}
    </ul>
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
    <main className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Marcas voltar={false} />
          <p className="mt-8 font-dados text-[11px] uppercase tracking-[0.18em] text-acento">
            Trilha · {EVENTO.ocasiao}
          </p>
          <h1 className="titulo mt-2 text-5xl text-ink">Continua depois.</h1>
        </div>
        <AnelProgresso fracao={fracao} tamanho={72} />
      </div>

      <p className="mt-4 max-w-prose text-lg text-ink-2">
        Sem cadastro. Tudo que você preenche aqui fica só neste aparelho.
      </p>

      <section className="mt-10">
        <h2 className="mb-1 text-2xl font-black text-ink">O essencial</h2>
        <p className="mb-5 text-base text-muted">Os {MODULOS_TRILHA.length} liberam o certificado de participação.</p>
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
        <h2 className="mb-1 text-2xl font-black text-ink">Pra ir além</h2>
        <p className="mb-5 text-base text-muted">Cérebro interativo, escrita, as referências completas e a palestrante.</p>
        <ListaModulos modulos={MODULOS_EXTRAS} concluidos={concluidos} grade />
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
