/**
 * Os quatro personagens do dia. Composições fictícias — não representam
 * nenhuma pessoa real. Cada um carrega um dos quatro temas do quiz final.
 */

export type Personagem = {
  id: "rafael" | "luciana" | "beatriz" | "marcos";
  nome: string;
  papel: string;
  hora: string;
  tema: string;
  ferramenta: string;
  inicial: string;
};

export const PERSONAGENS: Personagem[] = [
  {
    id: "rafael",
    nome: "Rafael",
    papel: "Analista, 34",
    hora: "8h",
    tema: "Atenção tem maré",
    ferramenta: "Micro-recuperação",
    inicial: "R",
  },
  {
    id: "luciana",
    nome: "Luciana",
    papel: "Coordenadora, 41",
    hora: "9h",
    tema: "Decisão tem custo",
    ferramenta: "Arquitetura de decisão",
    inicial: "L",
  },
  {
    id: "beatriz",
    nome: "Beatriz",
    papel: "Atendimento, 28",
    hora: "14h",
    tema: "O corpo chega antes",
    ferramenta: "Suspiro fisiológico",
    inicial: "B",
  },
  {
    id: "marcos",
    nome: "Marcos",
    papel: "Gerente comercial, 45",
    hora: "16h",
    tema: "Uma coisa de cada vez",
    ferramenta: "Blocos de monotarefa",
    inicial: "M",
  },
];

export function personagem(id: Personagem["id"]): Personagem {
  return PERSONAGENS.find((p) => p.id === id)!;
}
