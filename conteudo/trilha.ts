/**
 * Módulos da trilha. Os essenciais liberam o certificado; os extras são pra
 * quem quer continuar.
 */

export type ModuloTrilha = {
  id: string;
  rotulo: string;
  desc: string;
  href: string;
};

export const MODULOS_ESSENCIAIS: ModuloTrilha[] = [
  { id: "reveja", rotulo: "Reveja o dia", desc: "O dia da Marina em quatro atos, com a ciência de cada cena. ~12 min.", href: "/trilha/reveja" },
  { id: "suspiro", rotulo: "Suspiro fisiológico guiado", desc: "O protocolo de 5 minutos do estudo de Stanford.", href: "/trilha/suspiro" },
  { id: "micropausa", rotulo: "Regra 90-3-1: pausa de 3 min", desc: "Um timer com os passos da micro-recuperação.", href: "/trilha/micropausa" },
  { id: "rifo", rotulo: "Mapa R.I.F.O. e protocolo P.N.E.", desc: "Os quatro métodos do dia da Marina, num só lugar.", href: "/trilha/rifo" },
  { id: "plano", rotulo: "Meu plano do dia", desc: "Mapa de energia, blocos de monotarefa e seu compromisso, em PDF.", href: "/trilha/plano" },
  { id: "neuromitos", rotulo: "Mito ou ciência?", desc: "8 afirmações populares sobre o cérebro. Quais se sustentam?", href: "/trilha/neuromitos" },
];

// O quiz final roda ao vivo no Kahoot da EDC durante a SIPAT — não pode estar
// disponível na trilha antes disso, ou as respostas vazam. Ver conteudo/quiz.ts.
export const MODULOS_EXTRAS: ModuloTrilha[] = [
  { id: "referencias", rotulo: "Referências científicas", desc: "Todos os estudos citados, com link para o artigo.", href: "/trilha/referencias" },
  { id: "palestrante", rotulo: "Sobre a palestrante", desc: "Priscila Ramos — bio e contatos.", href: "/palestrante" },
];

export const MODULOS_TRILHA = MODULOS_ESSENCIAIS.map((m) => m.id);
