/** "Mito ou ciência?" — módulo extra da trilha. */

export type Neuromito = {
  id: string;
  afirmacao: string;
  resposta: "mito" | "ciencia";
  comentario: string;
  fontes: string[];
};

export const NEUROMITOS: Neuromito[] = [
  {
    id: "n1",
    afirmacao: "Usamos só 10% do cérebro.",
    resposta: "mito",
    comentario:
      "Exames de imagem mostram atividade em praticamente todo o cérebro ao longo do dia. Um órgão que consome 20% da energia do corpo não teria 90% ocioso.",
    fontes: ["dekker2012", "raichle2002"],
  },
  {
    id: "n2",
    afirmacao: "Existem pessoas de 'cérebro esquerdo' (lógicas) e de 'cérebro direito' (criativas).",
    resposta: "mito",
    comentario:
      "Algumas funções são mais lateralizadas, como a linguagem, mas ninguém usa predominantemente um hemisfério. Um estudo com mais de mil cérebros não encontrou esses 'tipos'.",
    fontes: ["nielsen2013"],
  },
  {
    id: "n3",
    afirmacao: "Com treino, dá pra ficar bom em fazer várias tarefas de atenção ao mesmo tempo.",
    resposta: "mito",
    comentario:
      "Quem mais pratica multitarefa com mídias tende a ser pior em filtrar distrações e alternar tarefas. O custo da troca não desaparece.",
    fontes: ["ophir2009", "rubinstein2001"],
  },
  {
    id: "n4",
    afirmacao: "O cérebro adulto continua mudando com o que a gente pratica.",
    resposta: "ciencia",
    comentario:
      "Neuroplasticidade não é coisa só de criança: adultos que aprenderam malabarismo mostraram mudanças mensuráveis na massa cinzenta em três meses.",
    fontes: ["draganski2004"],
  },
  {
    id: "n5",
    afirmacao: "Pausa curta no trabalho é tempo perdido.",
    resposta: "mito",
    comentario:
      "Micropausas aumentam o vigor e reduzem a fadiga. Até 40 segundos olhando uma paisagem com verde já melhoraram a atenção em laboratório.",
    fontes: ["albulescu2022", "lee2015"],
  },
  {
    id: "n6",
    afirmacao: "Força de vontade é movida a glicose: um docinho recupera o autocontrole.",
    resposta: "mito",
    comentario:
      "Essa hipótese foi popular, mas não resistiu a replicações com milhares de participantes. O cansaço mental é real; a explicação pela glicose, não.",
    fontes: ["hagger2016", "vohs2021"],
  },
  {
    id: "n7",
    afirmacao: "Sob estresse forte, fica mais difícil pensar com clareza.",
    resposta: "ciencia",
    comentario:
      "O estresse agudo derruba rapidamente as funções do córtex pré-frontal e fortalece respostas automáticas. Por isso regular o corpo vem antes de 'pensar positivo'.",
    fontes: ["arnsten2009"],
  },
  {
    id: "n8",
    afirmacao: "Dormir mal uma semana não afeta o desempenho de quem 'já se acostumou'.",
    resposta: "mito",
    comentario:
      "A privação de sono prejudica atenção, memória de trabalho e julgamento — e as pessoas costumam subestimar o próprio prejuízo.",
    fontes: ["killgore2010"],
  },
];
