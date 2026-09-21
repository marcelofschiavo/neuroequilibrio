"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Marcas } from "@/components/trilha/Marcas";
import { lerProgresso } from "@/lib/local";
import { MODULOS_TRILHA } from "@/conteudo/trilha";
import { gerarCertificado } from "@/lib/pdf-docs/certificado";

export default function PaginaCertificado() {
  const [concluidos, setConcluidos] = useState<string[]>([]);
  const [nome, setNome] = useState("");
  const [baixando, setBaixando] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setConcluidos(lerProgresso().modulos);
  }, []);

  const feitos = MODULOS_TRILHA.filter((id) => concluidos.includes(id)).length;
  const faltam = MODULOS_TRILHA.length - feitos;
  const completo = faltam === 0;

  async function baixar() {
    if (!nome.trim()) return;
    setBaixando(true);
    await gerarCertificado(nome.trim());
    setBaixando(false);
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16 text-center">
      <div className="flex justify-center">
        <Marcas voltar={false} />
      </div>
      <h1 className="titulo mt-4 text-3xl text-ink">Certificado</h1>

      {!completo ? (
        <div className="mt-8 rounded-lg border border-line bg-surface-2 p-6">
          <p className="text-ink-2">
            {faltam === 1 ? "Falta 1 módulo essencial para liberar o certificado." : `Faltam ${faltam} módulos essenciais para liberar o certificado.`}
          </p>
          <p className="mt-1 dados text-sm text-muted">
            {feitos}/{MODULOS_TRILHA.length} concluídos
          </p>
          <Link href="/trilha" className="mt-4 inline-block text-sm font-semibold text-acento-2 underline">
            Voltar para a trilha
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <p className="text-ink-2">
            Trilha completa. Digite seu nome — ele só existe neste PDF, gerado aqui no seu navegador. Não é
            enviado a lugar nenhum.
          </p>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="mt-6 w-full rounded-md border border-line bg-surface-2 px-4 py-3.5 text-center text-lg text-ink outline-none focus:border-acento"
          />
          <button
            onClick={baixar}
            disabled={!nome.trim() || baixando}
            className="mt-4 w-full rounded-md bg-acento px-6 py-4 font-semibold text-white hover:brightness-95 transition disabled:opacity-40"
          >
            {baixando ? "Gerando…" : "Baixar certificado em PDF"}
          </button>
        </div>
      )}
    </main>
  );
}
