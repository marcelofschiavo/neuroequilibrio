import { jsPDF } from "jspdf";
import { carregarFontesPdf, baixarPdf, CORES_PDF } from "@/lib/pdf";
import { EVENTO, PALESTRANTE } from "@/conteudo/palestrante";

/**
 * PDF gerado inteiramente no navegador — o nome digitado NUNCA vira request.
 */
export async function gerarCertificado(nome: string): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "landscape" });
  await carregarFontesPdf(doc);
  const largura = doc.internal.pageSize.getWidth();
  const altura = doc.internal.pageSize.getHeight();

  doc.setFillColor(247, 247, 246);
  doc.rect(0, 0, largura, altura, "F");

  doc.setDrawColor(78, 154, 42);
  doc.setLineWidth(1.2);
  doc.rect(10, 10, largura - 20, altura - 20);

  // O traço da marca — a barra que corta o "EDC" — em vetor simples.
  doc.setFillColor(108, 195, 49);
  doc.rect(largura / 2 - 22, 24, 44, 5, "F");

  doc.setFont("SourceSans3", "bold");
  doc.setFontSize(10);
  doc.setTextColor(CORES_PDF.ACENTO);
  doc.text(`NEUROCIÊNCIAS & EQUILÍBRIO EMOCIONAL · ${EVENTO.cliente.toUpperCase()} · ${EVENTO.ocasiao.toUpperCase()}`, largura / 2, 40, { align: "center" });

  doc.setFontSize(13);
  doc.setTextColor(CORES_PDF.CINZA);
  doc.text("Certificado de participação", largura / 2, 50, { align: "center" });

  doc.setFontSize(38);
  doc.setTextColor(CORES_PDF.GRAFITE);
  doc.text(nome || "Participante", largura / 2, 78, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(CORES_PDF.CINZA);
  const texto = `participou da palestra Neurociências & Equilíbrio Emocional, com ${PALESTRANTE.nome}, na ${EVENTO.ocasiao} da ${EVENTO.cliente}, e completou a trilha de conteúdo.`;
  const linhas = doc.splitTextToSize(texto, largura - 80);
  doc.text(linhas, largura / 2, 92, { align: "center" });

  doc.setFontSize(10);
  doc.setTextColor(CORES_PDF.CINZA);
  doc.text(EVENTO.dataExtenso, largura / 2, altura - 26, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(CORES_PDF.ACENTO);
  doc.text(PALESTRANTE.nome, largura / 2, altura - 18, { align: "center" });
  doc.setFontSize(8);
  doc.setTextColor(CORES_PDF.CINZA);
  doc.text("Psicóloga · Neuropsicóloga · Mindheart Human Development", largura / 2, altura - 13, { align: "center" });

  baixarPdf(doc, `certificado-neuroequilibrio-${(nome || "participante").toLowerCase().replace(/\s+/g, "-")}.pdf`);
}
