import type { Evidencia } from "./referencias";
import type { Personagem } from "./personagens";

/**
 * Quiz final — perguntas e respostas corretas da Priscila, sem alteração.
 *
 * A dinâmica ao vivo roda no Kahoot da EDC durante a SIPAT, não neste site —
 * por isso nada daqui é renderizado em `/palco` nem em `/trilha` (as
 * respostas não podem vazar antes do Kahoot). Este arquivo é só a fonte
 * pronta pra importar as perguntas no Kahoot e, depois do evento, pra
 * eventualmente publicar a explicação revisada na trilha.
 *
 * `explicacao` é a versão alinhada à literatura atual. `explicacaoOriginal`
 * guarda o texto enviado pela palestrante, para ela comparar e aprovar.
 * // TODO(palestrante): aprovar os ajustes das explicações.
 */

export type Alternativa = "A" | "B" | "C" | "D";

export type PerguntaQuiz = {
  id: string;
  personagem: Personagem["id"];
  gancho: string;
  pergunta: string;
  alternativas: Record<Alternativa, string>;
  correta: Alternativa;
  explicacao: string;
  naPratica: string;
  evidencia: Evidencia;
  fontes: string[];
  explicacaoOriginal: string;
  notaAjuste?: string;
};

export const QUIZ: PerguntaQuiz[] = [
  {
    id: "q1",
    personagem: "rafael",
    gancho: "Rafael, 11h40, relendo o mesmo currículo pela quarta vez.",
    pergunta:
      "Muitos profissionais tentam manter o foco ininterrupto por 4 ou 5 horas seguidas. Do ponto de vista da neurociência da produtividade, por que essa estratégia costuma falhar?",
    alternativas: {
      A: "O sistema visual sofre de adaptação sensorial grave.",
      B: "O cerebelo interrompe o controle motor fino.",
      C: "O cérebro opera em ritmos ultradianos.",
      D: "O cérebro esgota suas reservas de dopamina rapidamente.",
    },
    correta: "C",
    explicacao:
      "Além do ritmo circadiano de 24 horas, o cérebro oscila em ciclos mais curtos ao longo do dia — os ritmos ultradianos, estimados em torno de 90 minutos, com variação entre pessoas. Somado a isso, a atenção sustentada cai com o tempo na mesma tarefa. Foco não é um interruptor que fica ligado: é uma maré, que sobe e desce.",
    naPratica:
      "Micro-recuperações de 3 a 5 minutos: olhar para longe da tela (de preferência uma paisagem com verde), beber água sem celular, fazer um suspiro fisiológico ou trocar por uma tarefa mecânica, sem decisão.",
    evidencia: "debate",
    fontes: ["kleitman1982", "warm2008", "albulescu2022", "lee2015"],
    explicacaoOriginal:
      "Assim como temos o ritmo circadiano de 24 horas, durante o dia o nosso cérebro opera em ritmos ultradianos, com ciclos de foco intenso de cerca de 90 a 120 minutos, seguidos por uma necessidade biológica de 20 minutos de descanso. Como no ambiente corporativo uma pausa de 20 minutos nem sempre é possível, a neurociência recomenda as \"micro recuperações\". O cérebro precisa de um \"reset\" rápido que pode ser feito em 3 a 5 minutos: afastar os olhos da tela (focar no horizonte reduz a ativação do sistema de alerta), beber uma água sem contato com o celular ou computador, fazer o suspiro fisiológico ou alternar temporariamente para uma tarefa mecânica que não exija tomada de decisão.",
    notaAjuste:
      "O ciclo de ~90 min em vigília (Kleitman) tem evidência variável; não há base para uma 'necessidade biológica de 20 min' fixa. A recomendação de micropausas é sustentada por meta-análise (Albulescu 2022) e o benefício de olhar paisagem verde por Lee 2015.",
  },
  {
    id: "q2",
    personagem: "luciana",
    gancho: "Luciana, 15h, travada diante da escala do cliente depois de uma manhã de incêndios.",
    pergunta:
      "Um colaborador passa a manhã inteira respondendo dezenas de mensagens curtas e apagando pequenos incêndios. À tarde, ele não consegue tomar uma decisão estratégica importante. Como a neurociência explica esse fenômeno?",
    alternativas: {
      A: "Hiperativação da rede de modo padrão.",
      B: "Inibição latente do sistema límbico.",
      C: "Neuroplasticidade adaptativa reversa.",
      D: "Fadiga decisória do córtex pré-frontal.",
    },
    correta: "D",
    explicacao:
      "O córtex pré-frontal é a área do controle deliberado: planejar, pesar opções, frear impulsos. Trabalho cognitivo intenso e prolongado deixa esse controle mais 'caro' — um estudo de 2022 mediu acúmulo de glutamato no pré-frontal lateral ao fim do dia, e as pessoas passaram a escolher o caminho de menor esforço. A antiga explicação de que 'acaba a glicose' não se sustentou em testes, mas o fenômeno de decidir pior depois de muito esforço mental é real.",
    naPratica:
      "Decisões estratégicas no seu horário de maior energia. Depois de uma sequência pesada, migre para tarefas de rotina, apoiadas em hábitos (gânglios da base): limpar a caixa de entrada, relatórios padronizados, organizar pastas. E reduza microdecisões com regras prévias.",
    evidencia: "moderada",
    fontes: ["wiehler2022", "graybiel2008", "vohs2021"],
    explicacaoOriginal:
      "O córtex pré-frontal, área responsável por decisões complexas e autocontrole, consome muita energia (glicose). Tomar muitas decisões pequenas esgota a sua capacidade temporariamente, prejudicando decisões maiores depois. Quando o córtex pré-frontal se esgota (a área da estratégia e deliberação), o recomendado é mudar para tarefas que acionam os gânglios da base (a área dos hábitos e automatismos). É o momento mais adequado para realizar atividades mais rotineiras, como limpar a caixa de entrada, preencher relatórios padronizados ou organizar pastas. O cérebro continua produzindo, mas a área de alta complexidade reduz a atividade.",
    notaAjuste:
      "O modelo da glicose e o 'esgotamento do ego' falharam em replicações multicêntricas (Hagger 2016; Vohs 2021). O mecanismo mais atual é neurometabólico (glutamato — Wiehler 2022). A recomendação prática permanece.",
  },
  {
    id: "q3",
    personagem: "beatriz",
    gancho: "Beatriz, 14h10, coração disparado depois de uma ligação difícil.",
    pergunta:
      "No meio de uma tarde exaustiva no trabalho, qual ferramenta com comprovação neurobiológica atua de forma mais rápida (em tempo real) para 'frear' o estresse e promover calma imediata?",
    alternativas: {
      A: "A revisão da lista de tarefas.",
      B: "O suspiro fisiológico.",
      C: "O alongamento de membros inferiores.",
      D: "A interrupção total dos pensamentos.",
    },
    correta: "B",
    explicacao:
      "A respiração é a única função automática do corpo que também controlamos por vontade — por isso é uma porta de entrada direta para o sistema nervoso. O suspiro fisiológico (duas inspirações pelo nariz, a segunda curtinha, e uma expiração longa pela boca) reabre alvéolos pulmonares, e a expiração prolongada aumenta o freio vagal sobre o coração, que desacelera. Um ensaio randomizado mostrou que 5 minutos por dia melhoram o humor e reduzem a ativação fisiológica.",
    naPratica:
      "Um a três suspiros fisiológicos no momento do pico. Para efeito mais duradouro, 5 minutos por dia de suspiro cíclico.",
    evidencia: "moderada",
    fontes: ["li2016", "russo2017", "balban2023"],
    explicacaoOriginal:
      "O suspiro fisiológico (duas inspirações curtas seguidas de uma expiração longa) expande os alvéolos pulmonares e envia um sinal rápido do coração para o cérebro, ativando o sistema nervoso parassimpático de forma quase instantânea.",
    notaAjuste:
      "Mecanismo respiratório e vagal bem estabelecidos. O ensaio de Balban (2023) avaliou prática diária por um mês — 'quase instantâneo' é plausível pela fisiologia, mas não foi o que o estudo mediu. Ajustado para não prometer além da evidência.",
  },
  {
    id: "q4",
    personagem: "marcos",
    gancho: "Marcos, 16h, três janelas abertas e um zero a mais na proposta.",
    pergunta:
      "Quando você tenta lidar com várias demandas \"urgentes\" ao mesmo tempo (multitarefa), o que realmente acontece no seu cérebro?",
    alternativas: {
      A: "Ele expande a capacidade de processamento, tornando você mais produtivo.",
      B: "Ele divide o foco em partes iguais, mantendo a qualidade de todas as tarefas.",
      C: "Ele não faz duas coisas ao mesmo tempo; ele alterna rapidamente entre elas, gastando muita energia e aumentando o erro.",
      D: "Ele entra em estado de \"flow\" mais facilmente devido à pressão.",
    },
    correta: "C",
    explicacao:
      "Em tarefas que exigem atenção, o cérebro não processa em paralelo: ele alterna. Cada troca tem um custo de reconfiguração — mais tempo e mais erro — e deixa um 'resíduo de atenção' preso na tarefa anterior. Quem é interrompido compensa acelerando, e paga em estresse. E quem mais faz multitarefa não fica melhor nisso: fica pior em filtrar distrações.",
    naPratica:
      "Agrupamento de tarefas e monotarefa sequencial: blocos de tempo por tipo de trabalho (ex.: 40 minutos só para comunicação e aprovações), uma urgência de cada vez, notificações fora do bloco de foco.",
    evidencia: "consolidado",
    fontes: ["rubinstein2001", "monsell2003", "leroy2009", "mark2008", "ophir2009"],
    explicacaoOriginal:
      "O córtex pré-frontal não processa tarefas cognitivas simultâneas. A alternância rápida entre atividades gasta muita energia (glicose) e aumenta significativamente a fadiga decisória e a margem de erro. Como no dia a dia corporativo o volume de demandas é alto, a neurociência recomenda substituir a tentativa de multitarefa pelo \"Agrupamento de Tarefas\" e pela \"Monotarefa Sequencial\". Em vez de alternar a atenção entre um e-mail, o chat e uma planilha, agrupe atividades que exigem o mesmo tipo de processamento em blocos de tempo (ex.: 40 minutos só para comunicação e aprovações) e resolva uma urgência por vez. Isso reduz o desperdício de energia mental e acelera a finalização das entregas.",
    notaAjuste:
      "Conteúdo consolidado. Apenas trocado 'gasta glicose' por 'custo de reconfiguração', que é o que os estudos medem.",
  },
];
