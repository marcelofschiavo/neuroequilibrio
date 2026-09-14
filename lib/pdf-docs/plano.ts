import { jsPDF } from "jspdf";
import { carregarFontesPdf, baixarPdf, CORES_PDF } from "@/lib/pdf";
import type { PlanoDia, BlocoHorario, NivelEnergia } from "@/lib/local";

const ROTULO_BLOCO: Record<BlocoHorario, string> = {
  manha: "Manhã",
  meioDia: "Meio-dia",
  tarde: "Tarde",
  fimDeTarde: "Fim de tarde",
};

const ROTULO_ENERGIA: Record<NivelEnergia, string> = {
  pico: "Pico — decisões importantes aqui",
  medio: "Médio — segue o fluxo",
  vale: "Vale — rotina e automatismos",
};

/** PDF gerado no navegador — nada disso vai para servidor. */
export async function gerarPlanoDia(plano: PlanoDia): Promise<void> {
  const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
  await carregarFontesPdf(doc);
  const largura = doc.internal.pageSize.getWidth();
  let y = 24;

  doc.setFillColor(247, 247, 246);
  doc.rect(0, 0, largura, doc.internal.pageSize.getHeight(), "F");

  doc.setFont("SourceSans3", "bold");
  doc.setFontSize(10);
  doc.setTextColor(CORES_PDF.ACENTO);
  doc.text("NEUROCIÊNCIAS & EQUILÍBRIO EMOCIONAL · EDC GROUP", largura / 2, y, { align: "center" });
  y += 10;

  doc.setFontSize(20);
  doc.setTextColor(CORES_PDF.GRAFITE);
  doc.text("Meu plano do dia", largura / 2, y, { align: "center" });
  y += 14;

  doc.setDrawColor(CORES_PDF.ACENTO);
  doc.setLineWidth(1);
  doc.line(20, y, largura - 20, y);
  y += 12;

  doc.setFontSize(13);
  doc.setTextColor(CORES_PDF.GRAFITE);
  doc.text("Meu mapa de energia", 20, y);
  y += 8;

  (Object.keys(ROTULO_BLOCO) as BlocoHorario[]).forEach((bloco) => {
    const nivel = plano.energia[bloco];
    doc.setFontSize(11);
    doc.setTextColor(CORES_PDF.CINZA);
    doc.text(`${ROTULO_BLOCO[bloco]}:`, 22, y);
    doc.setTextColor(CORES_PDF.GRAFITE);
    doc.text(nivel ? ROTULO_ENERGIA[nivel] : "não preenchido", 62, y);
    y += 8;
  });

  y += 8;
  doc.setDrawColor(CORES_PDF.ACENTO);
  doc.line(20, y, largura - 20, y);
  y += 12;

  doc.setFontSize(13);
  doc.setTextColor(CORES_PDF.GRAFITE);
  doc.text("Meus blocos de monotarefa", 20, y);
  y += 8;

  plano.blocosMonotarefa.forEach((bloco, i) => {
    doc.setFontSize(11);
    doc.setTextColor(CORES_PDF.CINZA);
    const linhas = doc.splitTextToSize(`${i + 1}. ${bloco || "—"}`, largura - 44);
    doc.text(linhas, 22, y);
    y += 7 * linhas.length + 2;
  });

  y += 10;
  doc.setDrawColor(CORES_PDF.ACENTO);
  doc.line(20, y, largura - 20, y);
  y += 10;

  doc.setFontSize(9);
  doc.setTextColor(CORES_PDF.CINZA);
  const rodape = "Priscila Ramos · Psicóloga e Neuropsicóloga · Mindheart Human Development";
  doc.text(rodape, largura / 2, y, { align: "center" });

  baixarPdf(doc, "meu-plano-do-dia.pdf");
}
