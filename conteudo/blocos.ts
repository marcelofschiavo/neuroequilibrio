/**
 * O roteiro do palco — fonte da verdade da sequência de slides. O conteúdo
 * de cada tela mora em conteudo/marina.ts (texto) e conteudo/cerebro.ts
 * (regiões); aqui só a ordem, o tipo e as notas da apresentadora.
 *
 * Narrativa: um dia da Marina, coordenadora de operações da EDC, em quatro
 * atos (08:00, 11:40, 14:00, 16:20) e o fecho às 17:00. Cada ato tem uma
 * cena em quadrinho, o mecanismo (com o cérebro da Marina e a fonte) e o
 * método prático. Modelo: apresentação enviada pela Priscila Ramos.
 *
 * Convite: 60 min. 5 min de chegada (app/palco/aguardando) + 40 min de
 * palestra (blocos 1–6) + 15 min de perguntas e respostas (bloco 7).
 */

import type { ATOS, CENAS, HoraDoDia } from "./marina";

export type TipoSlide =
  | "capa"
  | "relogio"
  | "palestrante"
  | "engolido"
  | "modelo"
  | "cena"
  | "ato"
  | "regra"
  | "funil"
  | "pne"
  | "respiracao"
  | "monotarefa"
  | "arco"
  | "rifo"
  | "compromisso"
  | "encerramento"
  | "titulo"
  | "cerebro"
  | "fecho";

export type VisualAto = "curva" | "mochila" | "ecg" | "alternancia";

export type Slide = {
  id: string;
  tipo: TipoSlide;
  titulo?: string;
  destaque?: string;
  /** Mostra a linha do tempo do dia com este horário aceso. */
  marcaHora?: HoraDoDia;
  cena?: keyof typeof CENAS;
  ato?: keyof typeof ATOS;
  visual?: VisualAto;
  ciclos?: number;
  trilhaHref?: string;
  url?: string;
  notaApresentador?: string;
};

export type Bloco = {
  id: string;
  numero: number;
  titulo: string;
  duracaoMin: number;
  slides: Slide[];
};

export const BLOCOS: Bloco[] = [
  {
    id: "abertura",
    numero: 1,
    titulo: "Abertura",
    duracaoMin: 8,
    slides: [
      { id: "1.1", tipo: "capa", titulo: "Neurociências & Equilíbrio Emocional" },
      {
        id: "1.2",
        tipo: "palestrante",
        titulo: "Priscila Ramos",
        notaApresentador: "30 s: 14 anos de RH em multinacionais, hoje clínica, Care Coach BetterUp e Mindheart.",
      },
      {
        id: "1.3",
        tipo: "relogio",
        titulo: "O cérebro da Marina",
        notaApresentador: "Apresente a personagem: Marina é fictícia, mas o dia dela é o de muita gente aqui. 30 s.",
      },
      {
        id: "1.4",
        tipo: "engolido",
        titulo: "Às 08:15, o plano já foi engolido.",
        notaApresentador: "Pergunta no chat do Meet, uma palavra. Leia 3 ou 4 respostas em voz alta — 1 a 2 min.",
      },
      { id: "1.5", tipo: "modelo", titulo: "O desafio não é mudar quem somos, é mudar o modelo operacional." },
    ],
  },
  {
    id: "ato1",
    numero: 2,
    titulo: "Ato 1 · 08:00",
    duracaoMin: 7,
    slides: [
      { id: "2.1", tipo: "cena", cena: "c1", marcaHora: "08:00" },
      {
        id: "2.2",
        tipo: "ato",
        ato: "ato1",
        visual: "curva",
        marcaHora: "08:00",
        notaApresentador: "A curva é ilustrativa. Diga isso. O ponto é: fadiga é sinal, não falha de caráter.",
      },
      {
        id: "2.3",
        tipo: "regra",
        titulo: "Regra 90-3-1",
        trilhaHref: "/trilha/micropausa",
        notaApresentador: "Faça o exercício junto, 40 s. Depois: 'sua sensação mudou?' — deixe 3 respostas.",
      },
    ],
  },
  {
    id: "ato2",
    numero: 3,
    titulo: "Ato 2 · 11:40",
    duracaoMin: 7,
    slides: [
      { id: "3.1", tipo: "cena", cena: "c2", marcaHora: "11:40" },
      {
        id: "3.2",
        tipo: "ato",
        ato: "ato2",
        visual: "mochila",
        marcaHora: "11:40",
        notaApresentador: "As pedrinhas são decisões banais; a pedra é o turno descoberto. Quando a mochila enche de pedrinhas, a pedra não cabe.",
      },
      { id: "3.3", tipo: "funil", titulo: "Arquitetura de decisão", trilhaHref: "/trilha/plano" },
    ],
  },
  {
    id: "ato3",
    numero: 4,
    titulo: "Ato 3 · 14:00",
    duracaoMin: 8,
    slides: [
      { id: "4.1", tipo: "cena", cena: "c3", marcaHora: "14:00" },
      {
        id: "4.2",
        tipo: "ato",
        ato: "ato3",
        visual: "ecg",
        marcaHora: "14:00",
        notaApresentador: "Cuidado com o tom: não é 'controle emocional', é fisiologia. Sobreposição PARCIAL entre dor social e física.",
      },
      { id: "4.3", tipo: "pne", titulo: "Protocolo P.N.E." },
      {
        id: "4.4",
        tipo: "respiracao",
        titulo: "Suspira com a gente.",
        ciclos: 3,
        trilhaHref: "/trilha/suspiro",
        notaApresentador: "Momento de pico. Conduza em voz baixa. Depois: 'o que mudou no corpo?'",
      },
    ],
  },
  {
    id: "ato4",
    numero: 5,
    titulo: "Ato 4 · 16:20",
    duracaoMin: 7,
    slides: [
      { id: "5.1", tipo: "cena", cena: "c4", marcaHora: "16:20" },
      {
        id: "5.2",
        tipo: "ato",
        ato: "ato4",
        visual: "alternancia",
        marcaHora: "16:20",
        notaApresentador: "Experimento com quem está online (cada um faz em silêncio, no seu ritmo): contar A B C… e 1 2 3…, depois intercalar A1 B2 C3. Cronometre em voz alta.",
      },
      { id: "5.3", tipo: "monotarefa", titulo: "Monotarefa sequencial", trilhaHref: "/trilha/plano" },
    ],
  },
  {
    id: "transformacao",
    numero: 6,
    titulo: "O arco da Marina",
    duracaoMin: 5,
    slides: [
      { id: "6.1", tipo: "arco", titulo: "O arco de transformação da Marina" },
      { id: "6.2", tipo: "rifo", titulo: "O mapa R.I.F.O.", trilhaHref: "/trilha/rifo" },
      {
        id: "6.3",
        tipo: "compromisso",
        titulo: "Aplicação imediata",
        notaApresentador: "Peça o compromisso no chat do Meet. Leia 3 em voz alta.",
      },
      { id: "6.4", tipo: "encerramento", marcaHora: "17:00" },
    ],
  },
  {
    id: "perguntas",
    numero: 7,
    titulo: "Perguntas",
    duracaoMin: 6,
    slides: [
      {
        id: "7.1",
        tipo: "titulo",
        titulo: "Pergunte à Priscila.",
        notaApresentador: "Perguntas abertas. O cérebro da Marina no próximo slide é clicável — use se perguntarem 'onde isso acontece?'.",
      },
      { id: "7.2", tipo: "cerebro", titulo: "O cérebro da Marina" },
      {
        id: "7.3",
        tipo: "fecho",
        titulo: "Obrigada.",
        destaque: "O link vai no chat. A trilha continua com as ferramentas, o mapa R.I.F.O. e as fontes científicas.",
      },
    ],
  },
];

export function blocoPorId(id: string): Bloco | undefined {
  return BLOCOS.find((b) => b.id === id);
}

/** Sequência achatada do palco. */
export function slidesEmSequencia(): { bloco: Bloco; slide: Slide }[] {
  return BLOCOS.flatMap((bloco) => bloco.slides.map((slide) => ({ bloco, slide })));
}
