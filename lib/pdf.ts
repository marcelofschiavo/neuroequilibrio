"use client";

import { jsPDF } from "jspdf";

const ACENTO = "#4E9A2A";
const GRAFITE = "#1E1F21";
const CINZA = "#58595B";

let fonteCarregada = false;

async function arquivoParaBase64(url: string): Promise<string> {
  const resposta = await fetch(url);
  const buffer = await resposta.arrayBuffer();
  let binario = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) binario += String.fromCharCode(bytes[i]);
  return btoa(binario);
}

/** Registra Source Sans 3 Bold no doc — mesma identidade do site no PDF. */
export async function carregarFontesPdf(doc: jsPDF): Promise<void> {
  if (!fonteCarregada) {
    const sourceSans = await arquivoParaBase64("/fontes/SourceSans3-Bold.ttf");
    // @ts-expect-error — jsPDF injeta isso em runtime, sem tipo próprio.
    doc.SourceSans3Base64 = sourceSans;
    fonteCarregada = true;
  }
  doc.addFileToVFS("SourceSans3.ttf", (doc as unknown as { SourceSans3Base64: string }).SourceSans3Base64);
  doc.addFont("SourceSans3.ttf", "SourceSans3", "bold");
}

export function baixarPdf(doc: jsPDF, nomeArquivo: string): void {
  doc.save(nomeArquivo);
}

export const CORES_PDF = { ACENTO, GRAFITE, CINZA };
