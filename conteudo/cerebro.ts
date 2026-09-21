/**
 * As quatro regiões do "cérebro da Marina". Texto curto e direto: o que faz,
 * onde fica, por que importa — é o que aparece na tela e o que o leitor de
 * tela lê. Anatomia simplificada de propósito (didática, não atlas).
 */

export type RegiaoCerebro = "preFrontal" | "limbico" | "ganglios" | "troncoCerebral";

export type InfoRegiao = {
  id: RegiaoCerebro;
  /** Nome no rótulo grande do diagrama (2 linhas). */
  rotulo: [string, string];
  nome: string;
  oQue: string;
  onde: string;
  porQue: string;
  /** Como isso aparece na história da Marina. */
  marina: string;
};

export const REGIOES: Record<RegiaoCerebro, InfoRegiao> = {
  preFrontal: {
    id: "preFrontal",
    rotulo: ["Córtex", "pré-frontal"],
    nome: "Córtex pré-frontal",
    oQue: "Decide, planeja e segura impulsos.",
    onde: "Na frente do cérebro, logo atrás da testa.",
    porQue: "Gasta muita energia — por isso é o primeiro a sentir o cansaço.",
    marina: "É ele que a Marina esgota ao decidir tudo, o dia inteiro.",
  },
  limbico: {
    id: "limbico",
    rotulo: ["Amígdala", "(límbico)"],
    nome: "Amígdala (sistema límbico)",
    oQue: "Detecta ameaças e dispara o alarme do corpo.",
    onde: "Fundo do lobo temporal, dos dois lados — não aparece por fora.",
    porQue: "Reage em frações de segundo, antes do pensamento racional entrar.",
    marina: "É o alarme que dispara quando o cliente cobra o posto descoberto.",
  },
  ganglios: {
    id: "ganglios",
    rotulo: ["Gânglios", "da base"],
    nome: "Gânglios da base",
    oQue: "Rodam hábitos e rotinas no piloto automático.",
    onde: "No centro do cérebro, abaixo do córtex.",
    porQue: "O que vira regra ou hábito quase não gasta energia de decisão.",
    marina: "É onde a triagem por regras da Marina passa a rodar sozinha.",
  },
  troncoCerebral: {
    id: "troncoCerebral",
    rotulo: ["Tronco", "cerebral"],
    nome: "Tronco cerebral",
    oQue: "Controla respiração, batimentos e nível de alerta.",
    onde: "Na base do cérebro, ligando-o ao resto do corpo.",
    porQue: "A respiração é o botão que a gente consegue apertar para acalmar o corpo.",
    marina: "É por onde o suspiro fisiológico devolve o controle à Marina.",
  },
};

export const ORDEM_REGIOES: RegiaoCerebro[] = ["preFrontal", "ganglios", "limbico", "troncoCerebral"];
