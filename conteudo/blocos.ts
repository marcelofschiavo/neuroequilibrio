/**
 * O roteiro do palco. Puro conteúdo — sem Supabase, sem sessão, sem celular
 * na mão da plateia. A apresentadora conduz verbalmente (mão levantada,
 * leitura de sala) e avança de teclado ou passador.
 *
 * Narrativa: um dia de trabalho — 8h às 18h — de quatro personagens
 * fictícios, cada um vivendo o mecanismo de uma das 4 perguntas do quiz
 * final. Ritmo de cada bloco: cena → mecanismo (com fonte e selo de
 * evidência) → ferramenta, conduzida ao vivo sempre que possível.
 *
 * Convite: 60 min. 5 min de chegada (fora desta sequência, ver
 * app/palco/aguardando) + 40 min de palestra + 15 min de dinâmica final
 * (quiz + perguntas abertas), tudo no mesmo deck.
 */

import type { Personagem } from "./personagens";

export type TipoSlide =
  | "capa"
  | "abertura"
  | "titulo"
  | "frase"
  | "lista"
  | "duasColunas"
  | "elenco"
  | "cena"
  | "insight"
  | "grafico"
  | "exercicio"
  | "respiracao"
  | "cerebro"
  | "fecho";

export type PontoGrafico = { rotulo: string; valor: number; destaque?: boolean };

export type Slide = {
  id: string;
  tipo: TipoSlide;
  titulo?: string;
  destaque?: string;
  itens?: string[];
  colunas?: { titulo: string; itens: string[]; tom?: "apagado" | "aceso" }[];
  notaApresentador?: string;

  // abertura (gerada)
  numeroBloco?: number;
  totalBlocos?: number;

  // cena
  personagemId?: Personagem["id"];
  hora?: string;
  situacao?: string;
  pensamento?: string;

  // insight / gráfico
  numeroValor?: number;
  numeroSufixo?: string;
  unidade?: string;
  fonteIds?: string[];
  pontos?: PontoGrafico[];
  unidadeGrafico?: string;
  /** Acende essa região no cérebro que ilustra o insight (ver components/palco/Cerebro.tsx). */
  regiaoCerebro?: "preFrontal" | "limbico" | "troncoCerebral" | "ganglios";

  // exercicio / respiração
  instrucao?: string;
  duracaoSugerida?: string;
  ciclos?: number;
  /** Rota da trilha com a versão pra praticar depois — vira uma nota discreta na tela. */
  trilhaHref?: string;

  // fecho
  url?: string;
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
    titulo: "Um dia de trabalho, por dentro do cérebro",
    duracaoMin: 4,
    slides: [
      {
        id: "1.1",
        tipo: "capa",
        titulo: "Neurociências & Equilíbrio Emocional",
        destaque: "EDC Group · SIPAT 2026",
      },
      {
        id: "1.2",
        tipo: "titulo",
        titulo: "Priscila Ramos",
        destaque: "Psicóloga · Neuropsicóloga · Mindheart Human Development",
        notaApresentador: "30s: trajetória de 14 anos em RH, hoje clínica + Care Coach BetterUp. Por que fala disso com propriedade.",
      },
      {
        id: "1.3",
        tipo: "insight",
        numeroValor: 20,
        numeroSufixo: "%",
        unidade: "da energia do corpo, consumida por um órgão que pesa só 2% do peso corporal",
        titulo: "O cérebro é caro.",
        destaque: "Por isso ele economiza, cansa e cobra recuperação.",
        fonteIds: ["raichle2002"],
      },
      {
        id: "1.4",
        tipo: "exercicio",
        titulo: "Levanta a mão.",
        instrucao: "Quem aqui, às 15h de algum dia, já releu o mesmo e-mail três vezes sem entender nada?",
        duracaoSugerida: "30s",
        notaApresentador: "Leia a sala em voz alta — não precisa de número exato. Emenda: hoje vamos acompanhar um dia de 4 pessoas comuns.",
      },
      {
        id: "1.5",
        tipo: "elenco",
        titulo: "Quatro pessoas. Um dia. 8h às 18h.",
      },
    ],
  },
  {
    id: "rafael",
    numero: 2,
    titulo: "Rafael · Atenção tem maré",
    duracaoMin: 8,
    slides: [
      {
        id: "2.1",
        tipo: "cena",
        personagemId: "rafael",
        hora: "8h00",
        situacao: "Analista de Recrutamento e Seleção, 34 anos. Chega cedo e promete a si mesmo: hoje eu triei 5 horas de currículos sem levantar.",
      },
      {
        id: "2.2",
        tipo: "cena",
        personagemId: "rafael",
        hora: "11h40",
        situacao: "Terceira vez que relê o mesmo currículo. Não entra — não lembra se essa candidata já passou pela triagem.",
        pensamento: "\"Por que eu não consigo focar hoje?\"",
      },
      {
        id: "2.3",
        tipo: "insight",
        titulo: "Foco não é interruptor. É maré.",
        destaque: "O cérebro oscila em ciclos — os ritmos ultradianos — ao longo do dia.",
        unidade: "Estimativa clássica: ~90 minutos por ciclo, com variação grande entre pessoas.",
        fonteIds: ["kleitman1982", "warm2008"],
        regiaoCerebro: "troncoCerebral",
      },
      {
        id: "2.4",
        tipo: "grafico",
        titulo: "Atenção sustentada, minuto a minuto",
        pontos: [
          { rotulo: "Início da tarefa", valor: 95 },
          { rotulo: "40 min depois", valor: 78 },
          { rotulo: "90 min, sem pausa", valor: 52 },
          { rotulo: "90 min, com micropausa", valor: 88, destaque: true },
        ],
        unidadeGrafico: "Desempenho relativo em tarefas de atenção sustentada (ilustrativo, a partir da literatura).",
        fonteIds: ["warm2008", "albulescu2022"],
      },
      {
        id: "2.5",
        tipo: "exercicio",
        titulo: "Olhe para o ponto mais distante da sala.",
        instrucao: "40 segundos. Não é descanso de vista — é um reset de atenção.",
        duracaoSugerida: "40s",
        notaApresentador: "Conduzir junto. Depois: 'sentiram a diferença?' — ligar ao estudo de Lee (2015), 40s de vista verde.",
        fonteIds: ["lee2015"],
        trilhaHref: "/trilha/micropausa",
      },
      {
        id: "2.6",
        tipo: "lista",
        titulo: "Micro-recuperação · 3 a 5 min",
        itens: [
          "Olhar para longe da tela — de preferência algo verde",
          "Beber água, sem celular nem computador por perto",
          "Um suspiro fisiológico (bloco 4)",
          "Trocar para uma tarefa mecânica, sem decisão",
        ],
        fonteIds: ["albulescu2022"],
      },
      {
        id: "2.7",
        tipo: "frase",
        titulo: "Pausa não é o oposto de produtividade.",
        destaque: "É parte dela.",
      },
    ],
  },
  {
    id: "luciana",
    numero: 3,
    titulo: "Luciana · Decisão tem custo",
    duracaoMin: 8,
    slides: [
      {
        id: "3.1",
        tipo: "cena",
        personagemId: "luciana",
        hora: "9h00",
        situacao: "Coordenadora de Operações, 41 anos. A manhã inteira no WhatsApp com os times terceirizados nos clientes, apagando pequenos incêndios de escala.",
      },
      {
        id: "3.2",
        tipo: "cena",
        personagemId: "luciana",
        hora: "15h00",
        situacao: "Precisa decidir a escala do próximo mês para um cliente grande. Olha a planilha e não consegue decidir nada.",
        pensamento: "\"Deixa pra amanhã.\"",
      },
      {
        id: "3.3",
        tipo: "insight",
        titulo: "O córtex pré-frontal é quem decide, planeja e freia impulsos.",
        destaque: "E ele fica mais caro de usar depois de um dia de trabalho cognitivo intenso.",
        unidade: "Um estudo de 2022 mediu acúmulo de um subproduto metabólico (glutamato) no pré-frontal ao fim do expediente — e as escolhas migraram para a opção de menor esforço.",
        fonteIds: ["wiehler2022"],
        regiaoCerebro: "preFrontal",
      },
      {
        id: "3.4",
        tipo: "duasColunas",
        colunas: [
          {
            titulo: "Pré-frontal",
            tom: "aceso",
            itens: ["Decide", "Planeja", "Freia impulsos", "É caro de usar"],
          },
          {
            titulo: "Gânglios da base",
            tom: "apagado",
            itens: ["Repete", "Automatiza", "Roda no piloto automático", "É barato de usar"],
          },
        ],
        notaApresentador: "30s: a ciência achava que era falta de glicose. Testou, revisou (Hagger 2016, Vohs 2021) — mostra como a ciência se corrige.",
        fonteIds: ["graybiel2008"],
      },
      {
        id: "3.5",
        tipo: "lista",
        titulo: "Arquitetura de decisão do dia",
        itens: [
          "Decisões estratégicas no seu pico de energia",
          "Rotina e tarefas automáticas depois do vale",
          "Regras prévias reduzem microdecisões (\"e-mail só às 11h e 16h\")",
        ],
        trilhaHref: "/trilha/plano",
      },
      {
        id: "3.6",
        tipo: "frase",
        titulo: "Não guarde a decisão mais importante",
        destaque: "para o fim do tanque.",
      },
    ],
  },
  {
    id: "beatriz",
    numero: 4,
    titulo: "Beatriz · O corpo chega antes",
    duracaoMin: 8,
    slides: [
      {
        id: "4.1",
        tipo: "cena",
        personagemId: "beatriz",
        hora: "14h00",
        situacao: "Analista de Relacionamento, 28 anos. Um gestor de cliente grita ao telefone sobre um turno descoberto na operação.",
      },
      {
        id: "4.2",
        tipo: "cena",
        personagemId: "beatriz",
        hora: "14h10",
        situacao: "Desliga o telefone. Coração acelerado, nó na garganta, vontade de chorar no banheiro.",
        pensamento: "\"Preciso me acalmar antes da próxima ligação.\"",
      },
      {
        id: "4.3",
        tipo: "insight",
        titulo: "Sob estresse, o pré-frontal sai do ar primeiro.",
        destaque: "É por isso que \"pensa positivo\" não funciona no calor da hora.",
        unidade: "Mesmo um estresse agudo leve já reduz o controle deliberado e fortalece respostas automáticas.",
        fonteIds: ["arnsten2009"],
        regiaoCerebro: "limbico",
      },
      {
        id: "4.4",
        tipo: "insight",
        titulo: "A respiração é a única função automática que você também controla por vontade.",
        destaque: "Por isso é a porta de entrada mais rápida para acalmar o corpo.",
        unidade: "O suspiro — duas inspirações, a segunda curtinha, e uma expiração longa — reabre alvéolos e ativa o freio vagal do coração.",
        fonteIds: ["li2016", "russo2017"],
        regiaoCerebro: "troncoCerebral",
      },
      {
        id: "4.5",
        tipo: "respiracao",
        titulo: "Suspira com a gente.",
        ciclos: 3,
        notaApresentador: "Momento de pico emocional da palestra. Conduzir em voz baixa. Depois: 'o que mudou no corpo?' Citar Balban et al. 2023 — 5 min/dia por 1 mês melhoraram humor.",
        fonteIds: ["balban2023"],
        trilhaHref: "/trilha/suspiro",
      },
      {
        id: "4.6",
        tipo: "frase",
        titulo: "Quando a mente acelera,",
        destaque: "comece pelo corpo.",
      },
    ],
  },
  {
    id: "marcos",
    numero: 5,
    titulo: "Marcos · Uma coisa de cada vez",
    duracaoMin: 8,
    slides: [
      {
        id: "5.1",
        tipo: "cena",
        personagemId: "marcos",
        hora: "16h00",
        situacao: "Gerente de Contas, 45 anos. E-mail de três clientes, chat interno e a planilha de propostas abertos ao mesmo tempo — \"respondo tudo junto\".",
      },
      {
        id: "5.2",
        tipo: "cena",
        personagemId: "marcos",
        hora: "16h20",
        situacao: "Manda a proposta de terceirização para o cliente errado. Um zero a mais no valor. Ninguém percebe até o cliente ligar.",
        pensamento: "\"Eu revisei... será que revisei mesmo?\"",
      },
      {
        id: "5.3",
        tipo: "exercicio",
        titulo: "Experimento rápido com a sala.",
        instrucao: "No ar: conte 1 a 10, depois A a J. Agora: intercale — 1, A, 2, B, 3, C... Sentiu a diferença?",
        duracaoSugerida: "1 min",
        notaApresentador: "Cronometrar as duas rodadas em voz alta. A sala sente o custo de troca na própria pele.",
      },
      {
        id: "5.4",
        tipo: "insight",
        titulo: "O cérebro não faz duas coisas ao mesmo tempo.",
        destaque: "Ele alterna — e cada troca cobra um pedágio de tempo e precisão.",
        unidade: "Parte da atenção fica presa na tarefa anterior: o \"resíduo de atenção\".",
        fonteIds: ["rubinstein2001", "leroy2009"],
        regiaoCerebro: "preFrontal",
      },
      {
        id: "5.5",
        tipo: "grafico",
        titulo: "Custo de alternar tarefas",
        pontos: [
          { rotulo: "Uma tarefa por vez", valor: 100, destaque: true },
          { rotulo: "Alternando 2 tarefas", valor: 60 },
          { rotulo: "Interrompido sem aviso", valor: 45 },
        ],
        unidadeGrafico: "Precisão relativa, ilustrativo a partir da literatura de custo de troca.",
        fonteIds: ["monsell2003", "mark2008"],
      },
      {
        id: "5.6",
        tipo: "lista",
        titulo: "Agrupamento de tarefas",
        itens: [
          "Blocos de tempo por tipo de trabalho (ex.: 40 min só comunicação)",
          "Uma urgência de cada vez, não todas juntas",
          "Notificações fora do bloco de foco",
        ],
        trilhaHref: "/trilha/plano",
      },
      {
        id: "5.7",
        tipo: "frase",
        titulo: "Uma coisa de cada vez",
        destaque: "termina mais coisas.",
      },
    ],
  },
  {
    id: "voltaCasa",
    numero: 6,
    titulo: "18h · De volta pra casa",
    duracaoMin: 4,
    slides: [
      {
        id: "6.1",
        tipo: "elenco",
        titulo: "Qual deles foi você hoje?",
        notaApresentador: "Pausa real — deixar a pergunta no ar antes de avançar.",
      },
      {
        id: "6.2",
        tipo: "lista",
        titulo: "Um cérebro sustentável, em 4 palavras",
        itens: ["Ritmo — respeite a maré da atenção", "Energia — proteja a decisão que importa", "Regulação — o corpo primeiro, o pensamento depois", "Foco — uma coisa de cada vez"],
      },
      {
        id: "6.3",
        tipo: "frase",
        titulo: "Saúde mental não é o oposto de produtividade.",
        destaque: "É o que sustenta a segurança e a qualidade do trabalho.",
      },
    ],
  },
  {
    id: "quiz",
    numero: 7,
    titulo: "Salve o dia do personagem",
    duracaoMin: 9,
    slides: [
      {
        id: "7.1",
        tipo: "titulo",
        titulo: "Agora é sua vez.",
        destaque: "Abra o Kahoot — 4 perguntas, uma pra cada personagem do dia.",
        notaApresentador: "Dinâmica roda no Kahoot da EDC, não neste deck. Trocar pra tela/app do Kahoot aqui.",
      },
    ],
  },
  {
    id: "perguntas",
    numero: 8,
    titulo: "Pergunte à Priscila",
    duracaoMin: 6,
    slides: [
      {
        id: "8.1",
        tipo: "titulo",
        titulo: "Pergunte à Priscila.",
        notaApresentador: "Perguntas abertas. O cérebro interativo do próximo slide fica de apoio visual — clique numa região se alguém perguntar 'onde isso acontece?'.",
      },
      {
        id: "8.2",
        tipo: "cerebro",
        titulo: "Onde, no cérebro?",
        notaApresentador: "Clicável ao vivo — mouse liberado no palco. Use se a pergunta pedir 'em que parte do cérebro isso acontece'.",
      },
      {
        id: "8.3",
        tipo: "fecho",
        titulo: "Cada dia é um experimento.",
        destaque: "Ritmo, energia, regulação, foco — teste um de cada vez.",
      },
    ],
  },
];

export function blocoPorId(id: string): Bloco | undefined {
  return BLOCOS.find((b) => b.id === id);
}

/** Sequência achatada do palco, com a abertura de cada bloco (a partir do 2). */
export function slidesEmSequencia(): { bloco: Bloco; slide: Slide }[] {
  return BLOCOS.flatMap((bloco) => {
    const abertura: Slide[] =
      bloco.numero > 1
        ? [
            {
              id: `${bloco.numero}.0`,
              tipo: "abertura",
              titulo: bloco.titulo,
              numeroBloco: bloco.numero,
              totalBlocos: BLOCOS.length,
            },
          ]
        : [];
    return [...abertura, ...bloco.slides].map((slide) => ({ bloco, slide }));
  });
}
