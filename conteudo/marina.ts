/**
 * A história de um dia da Marina — texto e dados de todos os slides visuais.
 * Estrutura e falas seguem o modelo enviado pela Priscila (Produtividade
 * Sustentável: O Cérebro da Marina no Expediente), com as correções de
 * ciência e de português apontadas na revisão. Marina é fictícia.
 */

import type { Evidencia } from "./referencias";
import type { RegiaoCerebro } from "./cerebro";

export const MARINA = {
  nome: "Marina",
  papel: "Coordenadora de Operações",
} as const;

/** Marcadores da linha do tempo vertical que acompanha o dia. */
export const HORAS_DO_DIA = ["08:00", "11:40", "14:00", "16:20", "17:00"] as const;
export type HoraDoDia = (typeof HORAS_DO_DIA)[number];

export type Cena = {
  hora: HoraDoDia;
  imagem: string;
  alt: string;
  situacao: string;
  pensamento: string;
};

export const CENAS: Record<"c1" | "c2" | "c3" | "c4", Cena> = {
  c1: {
    hora: "08:00",
    imagem: "/marina/marina-1.jpg",
    alt: "Marina, de blazer verde-petróleo, chega ao escritório sorrindo, com uma lista de tarefas na mão.",
    situacao:
      "Marina, coordenadora de operações, chega decidida: hoje ela fecha a folha de ponto e a apresentação mensal — sem levantar.",
    pensamento: "“Hoje eu foco. Sem pausa.”",
  },
  c2: {
    hora: "11:40",
    imagem: "/marina/marina-2.jpg",
    alt: "Marina à mesa, de olhos fechados e com a mão na testa, cansada, diante do notebook e de bilhetes.",
    situacao:
      "Desde as 8h: WhatsApp, e-mails, aprovações pequenas. Agora entra um turno descoberto num cliente — e ela não consegue decidir nada.",
    pensamento: "“Não consigo nem escolher por onde começar.”",
  },
  c3: {
    hora: "14:00",
    imagem: "/marina/marina-3.jpg",
    alt: "Marina ao telefone, de sobrancelhas franzidas e com a mão no peito, tensa diante do monitor.",
    situacao: "O gestor do cliente liga: um posto ficou descoberto. Coração acelerado, mandíbula tensa, mão no peito.",
    pensamento: "“Preciso responder — mas meu corpo está a mil.”",
  },
  c4: {
    hora: "16:20",
    imagem: "/marina/marina-4.jpg",
    alt: "Marina de olhos arregalados, com papéis voando, um tablet na mão e pontos de interrogação sobre a cabeça.",
    situacao:
      "E-mail de três clientes, chat interno e a planilha de propostas abertos ao mesmo tempo. “Respondo tudo junto.”",
    pensamento: "“Eu revisei… será que revisei mesmo?”",
  },
};

export type Ato = {
  hora: HoraDoDia;
  titulo: string;
  callout: string;
  evidencia: Evidencia;
  fontes: string[];
  regioes: RegiaoCerebro[];
  ilustrativo?: boolean;
};

export const ATOS: Record<"ato1" | "ato2" | "ato3" | "ato4", Ato> = {
  ato1: {
    hora: "08:00",
    titulo: "Ato 1: a fadiga mental e a ilusão do foco contínuo",
    callout:
      "O córtex pré-frontal lateral sinaliza que manter o controle cognitivo está ficando metabolicamente custoso. A fadiga pode ser um sinal de proteção contra a sobrecarga — não uma falha de disciplina.",
    evidencia: "moderada",
    fontes: ["wiehler2022", "kurzban2013", "warm2008"],
    regioes: ["preFrontal"],
    ilustrativo: true,
  },
  ato2: {
    hora: "11:40",
    titulo: "Ato 2: a fadiga decisória e o custo invisível das manhãs",
    callout:
      "Nossa capacidade de controle deliberado é limitada. Quando gastamos energia nobre decidindo o banal, travamos diante da complexidade.",
    evidencia: "moderada",
    fontes: ["wiehler2022", "graybiel2008", "hagger2016"],
    regioes: ["preFrontal", "ganglios"],
  },
  ato3: {
    hora: "14:00",
    titulo: "Ato 3: o corpo em alerta e o sequestro da atenção",
    callout:
      "Ameaças sociais (injustiça, humilhação, perda de status) ativam sistemas de alarme que se sobrepõem, em parte, aos das ameaças físicas. O corpo se prepara antes de o cérebro formular uma resposta ponderada.",
    evidencia: "moderada",
    fontes: ["arnsten2009", "eisenberger2003", "woo2014"],
    regioes: ["limbico", "troncoCerebral"],
  },
  ato4: {
    hora: "16:20",
    titulo: "Ato 4: o colapso da multitarefa e o custo da alternância",
    callout:
      "O cérebro não processa várias tarefas complexas em paralelo: ele alterna. Cada troca custa velocidade, faz perder contexto e aumenta a chance de erro.",
    evidencia: "consolidado",
    fontes: ["rubinstein2001", "monsell2003", "leroy2009"],
    regioes: ["preFrontal"],
  },
};

/* ---------------- 08:00 e 08:15 ---------------- */

export const NOTIFICACOES: { texto: string; tipo: "alerta" | "mensagem" | "tempo" | "telefone" }[] = [
  { texto: "Cliente na linha", tipo: "telefone" },
  { texto: "URGENTE: reunião imediata", tipo: "alerta" },
  { texto: "3 novas mensagens", tipo: "mensagem" },
  { texto: "Erro na planilha", tipo: "alerta" },
  { texto: "Prazo expirando", tipo: "tempo" },
  { texto: "Responder AGORA!", tipo: "alerta" },
  { texto: "Alerta de sistema", tipo: "alerta" },
  { texto: "Prioridade alta", tipo: "alerta" },
];

export const ENGOLIDO = {
  titulo: "Às 08:15, o plano já foi engolido.",
  tarefa: "Fechar folha de ponto e apresentação mensal",
  chat: "Responda no chat com uma palavra: qual é o maior ladrão de energia mental no seu dia (mensagens, reuniões, urgências, decisões ou interrupções)?",
};

export const MODELO_OPERACIONAL = {
  titulo: "O desafio não é mudar quem somos, é mudar o modelo operacional.",
  bruta: { titulo: "Produtividade por força bruta", texto: "A crença de que produzir mais é simplesmente aguentar mais." },
  biologica: {
    titulo: "Produtividade por compatibilidade biológica",
    texto: "Trabalhar a favor da biologia, e não contra ela.",
  },
};

/* ---------------- métodos ---------------- */

export const REGRA_903 = {
  titulo: "Regra 90-3-1: micro-recuperações antes do colapso",
  etapas: [
    { valor: "90 min", texto: "de foco intenso" },
    { valor: "3 min", texto: "de pausa deliberada" },
    { valor: "1", texto: "única ação de retorno" },
  ],
  passos: ["Afaste as mãos do teclado.", "Olhe para um ponto distante.", "Faça 3 respirações confortáveis."],
  pergunta: "Sua sensação mudou?",
  aviso: "Regra prática, não lei da biologia: o ritmo de ~90 min varia de pessoa para pessoa.",
  evidencia: "debate" as Evidencia,
  fontes: ["kleitman1982", "albulescu2022", "lee2015"],
};

export const FUNIL = {
  titulo: "Arquitetura de decisão: o que é repetitivo vira regra de triagem",
  entradas: ["E-mail do cliente", "Nova tarefa", "Revisão de projeto", "Solicitação urgente", "Lembrete", "Reunião"],
  perguntas: [
    "Precisa ser decidido agora?",
    "É reversível ou irreversível?",
    "Posso criar uma regra para não decidir isso de novo?",
    "É prioridade ou só o último estímulo?",
  ],
  saida: "Próxima ação estratégica",
  aviso: "As 4 perguntas são uma ferramenta prática. O que tem evidência forte é transformar decisão repetitiva em regra “se X, então Y”.",
  evidencia: "consolidado" as Evidencia,
  fontes: ["gollwitzer2006"],
};

export const PNE = {
  titulo: "Protocolo P.N.E.: criando margem de manobra entre o estímulo e a resposta",
  freio: { titulo: "O freio", texto: "O suspiro fisiológico", detalhe: "2 inspirações + 1 expiração longa" },
  metodo: {
    titulo: "O método",
    passos: [
      { verbo: "Perceba", texto: "Meu corpo está acelerado." },
      { verbo: "Nomeie", texto: "Estou sentindo pressão e irritação." },
      { verbo: "Escolha", texto: "Qual resposta protege melhor o objetivo da conversa?" },
    ],
  },
  evidencia: "moderada" as Evidencia,
  fontes: ["li2016", "russo2017", "balban2023", "lieberman2007"],
};

export const CLIENTE_FALA = "“Como esse posto ficou descoberto?! Isso não pode acontecer novamente.”";

export const ALTERNANCIA = {
  letras: ["A", "B", "C", "D", "E", "F"],
  numeros: ["1", "2", "3", "4", "5", "6"],
  misto: ["A", "1", "B", "2", "C", "3", "D", "4"],
};

export const MONOTAREFA = {
  titulo: "Monotarefa sequencial: agrupamento estruturado",
  caos: "Multitarefa caótica",
  sequencial: "Monotarefa sequencial",
  blocos: [
    { texto: "Planilhas", parte: 34 },
    { texto: "Mensagens operacionais", parte: 38 },
    { texto: "Relatórios", parte: 28 },
  ],
  citacao:
    "“Uma urgência por vez não significa ignorar o trabalho. Significa escolher conscientemente qual tarefa merece interromper a anterior.”",
  evidencia: "consolidado" as Evidencia,
  fontes: ["leroy2009", "mark2008", "monsell2003"],
};

/* ---------------- fechamento ---------------- */

export const ARCO = {
  titulo: "O arco de transformação da Marina",
  de: "Antes",
  para: "Depois",
  linhas: [
    { de: "Presença física contínua na cadeira", para: "Sustentação de ritmo e micro-recuperações" },
    { de: "Tratar todo estímulo como urgência", para: "Filtrar demandas por impacto e reversibilidade" },
    { de: "Reagir no pico da ativação física (estresse)", para: "Regular a fisiologia antes de escolher a resposta" },
    { de: "Multitarefa caótica tentando salvar o dia", para: "Blocos intencionais (monotarefa sequencial)" },
  ],
};

export const RIFO = {
  titulo: "O mapa R.I.F.O.: seu sistema operacional de navegação",
  /** Ordem no círculo, sentido horário a partir do alto à esquerda. */
  quadrantes: [
    { letra: "R", nome: "Ritmo", texto: "Alternar esforço intenso com a regra 90-3-1." },
    { letra: "I", nome: "Intenção", texto: "Proteger energia com a arquitetura de decisões." },
    { letra: "F", nome: "Fisiologia", texto: "Recuperar o controle com suspiro + P.N.E." },
    { letra: "O", nome: "Uma coisa por vez", texto: "Agrupar tarefas e eliminar o custo de troca." },
  ],
};

export const COMPROMISSO = {
  chamada: "Aplicação imediata: escreva seu compromisso no chat",
  frase: "A partir de amanhã, para proteger o meu cérebro, eu vou:",
  opcoes: [
    "Fazer uma pausa de 3 minutos (sem tela) após blocos intensos.",
    "Criar uma regra fixa para uma decisão repetitiva da manhã.",
    "Fazer 3 ciclos respiratórios antes de responder a mensagens críticas.",
    "Reservar 40 minutos de monotarefa para planilhas complexas.",
  ],
};

export const ENCERRAMENTO = {
  titulo: "A engenharia de um cérebro sustentável.",
  citacao:
    "Pausa não é o oposto de produtividade. É a condição que a torna sustentável. O cérebro de alta performance ajusta o comportamento antes do esgotamento.",
};
