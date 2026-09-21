/**
 * Referências científicas. Todo dado citado no palco ou na trilha aponta pra
 * um id daqui — a tela mostra a forma curta, a trilha mostra a completa com DOI.
 *
 * Selo de evidência (regra do projeto — ver CLAUDE.md):
 *   consolidado  → replicado, meta-análise ou mecanismo bem estabelecido
 *   moderada     → ensaio controlado ou achado sólido, ainda com poucos estudos
 *   debate       → modelo útil, mas com evidência mista ou revisada
 */

export type Evidencia = "consolidado" | "moderada" | "debate";

export const ROTULO_EVIDENCIA: Record<Evidencia, string> = {
  consolidado: "evidência consolidada",
  moderada: "evidência moderada",
  debate: "modelo em debate",
};

export type Referencia = {
  id: string;
  curta: string;
  completa: string;
  doi?: string;
  achado: string;
};

export const REFERENCIAS: Referencia[] = [
  {
    id: "raichle2002",
    curta: "Raichle & Gusnard, PNAS 2002",
    completa: "Raichle, M. E., & Gusnard, D. A. (2002). Appraising the brain's energy budget. PNAS, 99(16), 10237–10239.",
    doi: "10.1073/pnas.172399499",
    achado: "O cérebro representa cerca de 2% da massa corporal e consome cerca de 20% da energia do corpo em repouso.",
  },
  {
    id: "warm2008",
    curta: "Warm, Parasuraman & Matthews, Human Factors 2008",
    completa: "Warm, J. S., Parasuraman, R., & Matthews, G. (2008). Vigilance, workload, and systems design. Human Factors, 50(3), 433–441.",
    doi: "10.1518/001872008X312152",
    achado: "O desempenho em tarefas de atenção sustentada cai com o tempo na tarefa (o 'decremento de vigilância').",
  },
  {
    id: "astonjones2005",
    curta: "Aston-Jones & Cohen, Annu Rev Neurosci 2005",
    completa: "Aston-Jones, G., & Cohen, J. D. (2005). An integrative theory of locus coeruleus-norepinephrine function: adaptive gain and optimal performance. Annual Review of Neuroscience, 28, 403–450.",
    doi: "10.1146/annurev.neuro.28.061604.135709",
    achado: "O sistema locus coeruleus–noradrenalina regula o nível de alerta: pouco ou demais prejudica o foco (curva em U invertido).",
  },
  {
    id: "kleitman1982",
    curta: "Kleitman, Sleep 1982",
    completa: "Kleitman, N. (1982). Basic rest-activity cycle — 22 years later. Sleep, 5(4), 311–317.",
    doi: "10.1093/sleep/5.4.311",
    achado: "Propõe um ciclo básico de repouso-atividade de ~90 minutos que continuaria durante a vigília. Em vigília, os estudos posteriores mostram ciclos variáveis entre pessoas e situações.",
  },
  {
    id: "ericsson1993",
    curta: "Ericsson, Krampe & Tesch-Römer, Psychol Rev 1993",
    completa: "Ericsson, K. A., Krampe, R. T., & Tesch-Römer, C. (1993). The role of deliberate practice in the acquisition of expert performance. Psychological Review, 100(3), 363–406.",
    doi: "10.1037/0033-295X.100.3.363",
    achado: "Mesmo especialistas de elite sustentam cerca de 4 horas diárias de prática concentrada, em sessões de até ~1 hora com pausas.",
  },
  {
    id: "albulescu2022",
    curta: "Albulescu et al., PLoS ONE 2022 (meta-análise)",
    completa: "Albulescu, P., Macsinga, I., Rusu, A., Sulea, C., Bodnaru, A., & Tulbure, B. T. (2022). \"Give me a break!\" A systematic review and meta-analysis on the efficacy of micro-breaks for increasing well-being and performance. PLoS ONE, 17(8), e0272460.",
    doi: "10.1371/journal.pone.0272460",
    achado: "Micropausas de até 10 minutos aumentam o vigor e reduzem a fadiga. O ganho de desempenho é maior em tarefas rotineiras e menor em tarefas cognitivas muito exigentes.",
  },
  {
    id: "lee2015",
    curta: "Lee et al., J Environ Psychol 2015",
    completa: "Lee, K. E., Williams, K. J. H., Sargent, L. D., Williams, N. S. G., & Johnson, K. A. (2015). 40-second green roof views sustain attention. Journal of Environmental Psychology, 42, 182–189.",
    doi: "10.1016/j.jenvp.2015.04.003",
    achado: "Uma pausa de 40 segundos olhando uma paisagem com vegetação reduziu erros e melhorou a atenção sustentada em comparação a olhar concreto.",
  },
  {
    id: "wiehler2022",
    curta: "Wiehler et al., Current Biology 2022",
    completa: "Wiehler, A., Branzoli, F., Adanyeguh, I., Mochel, F., & Pessiglione, M. (2022). A neuro-metabolic account of why daylong cognitive work alters the control of economic decisions. Current Biology, 32(16), 3564–3575.",
    doi: "10.1016/j.cub.2022.07.010",
    achado: "Após um dia de trabalho cognitivo intenso, houve acúmulo de glutamato no córtex pré-frontal lateral, e as escolhas migraram para opções de menor esforço e recompensa imediata.",
  },
  {
    id: "hagger2016",
    curta: "Hagger et al., Perspect Psychol Sci 2016",
    completa: "Hagger, M. S., Chatzisarantis, N. L. D., et al. (2016). A multilab preregistered replication of the ego-depletion effect. Perspectives on Psychological Science, 11(4), 546–573.",
    doi: "10.1177/1745691616652873",
    achado: "Replicação em 23 laboratórios não encontrou o efeito clássico de 'esgotamento do ego' (efeito próximo de zero).",
  },
  {
    id: "vohs2021",
    curta: "Vohs et al., Psychol Sci 2021",
    completa: "Vohs, K. D., Schmeichel, B. J., et al. (2021). A multisite preregistered paradigmatic test of the ego-depletion effect. Psychological Science, 32(10), 1566–1581.",
    doi: "10.1177/0956797621989733",
    achado: "Teste em 36 laboratórios encontrou um efeito de esgotamento muito pequeno — bem menor que o proposto originalmente. O modelo da 'glicose da força de vontade' não se sustentou.",
  },
  {
    id: "graybiel2008",
    curta: "Graybiel, Annu Rev Neurosci 2008",
    completa: "Graybiel, A. M. (2008). Habits, rituals, and the evaluative brain. Annual Review of Neuroscience, 31, 359–387.",
    doi: "10.1146/annurev.neuro.29.051605.112851",
    achado: "Os gânglios da base sustentam hábitos e sequências automatizadas, que exigem pouco controle deliberado do córtex pré-frontal.",
  },
  {
    id: "arnsten2009",
    curta: "Arnsten, Nat Rev Neurosci 2009",
    completa: "Arnsten, A. F. T. (2009). Stress signalling pathways that impair prefrontal cortex structure and function. Nature Reviews Neuroscience, 10(6), 410–422.",
    doi: "10.1038/nrn2648",
    achado: "Mesmo um estresse agudo leve e percebido como incontrolável provoca perda rápida das funções do córtex pré-frontal, enquanto respostas mais automáticas ganham força.",
  },
  {
    id: "li2016",
    curta: "Li et al., Nature 2016",
    completa: "Li, P., Janczewski, W. A., Yackle, K., Kam, K., Pagliardini, S., Krasnow, M. A., & Feldman, J. L. (2016). The peptidergic control circuit for sighing. Nature, 530, 293–297.",
    doi: "10.1038/nature16964",
    achado: "Identificou o circuito do tronco cerebral que gera o suspiro — uma inspiração dupla que reabre alvéolos colapsados. Humanos suspiram espontaneamente cerca de 12 vezes por hora.",
  },
  {
    id: "russo2017",
    curta: "Russo, Santarelli & O'Rourke, Breathe 2017",
    completa: "Russo, M. A., Santarelli, D. M., & O'Rourke, D. (2017). The physiological effects of slow breathing in the healthy human. Breathe, 13(4), 298–309.",
    doi: "10.1183/20734735.009817",
    achado: "Na expiração, a atividade vagal sobre o coração aumenta e a frequência cardíaca desacelera — respirações com expiração mais longa favorecem o predomínio parassimpático.",
  },
  {
    id: "balban2023",
    curta: "Balban et al., Cell Reports Medicine 2023",
    completa: "Balban, M. Y., Neri, E., Kogon, M. M., Weed, L., Nouriani, B., Jo, B., Holl, G., Zeitzer, J. M., Spiegel, D., & Huberman, A. D. (2023). Brief structured respiration practices enhance mood and reduce physiological arousal. Cell Reports Medicine, 4(1), 100895.",
    doi: "10.1016/j.xcrm.2022.100895",
    achado: "Ensaio randomizado: 5 minutos diários de suspiro cíclico, por um mês, melhoraram o humor e reduziram a frequência respiratória mais do que a meditação mindfulness.",
  },
  {
    id: "rubinstein2001",
    curta: "Rubinstein, Meyer & Evans, J Exp Psychol 2001",
    completa: "Rubinstein, J. S., Meyer, D. E., & Evans, J. E. (2001). Executive control of cognitive processes in task switching. Journal of Experimental Psychology: Human Perception and Performance, 27(4), 763–797.",
    doi: "10.1037/0096-1523.27.4.763",
    achado: "Toda troca de tarefa tem um custo de tempo — reconfigurar metas e regras — que cresce com a complexidade das tarefas.",
  },
  {
    id: "monsell2003",
    curta: "Monsell, Trends Cogn Sci 2003",
    completa: "Monsell, S. (2003). Task switching. Trends in Cognitive Sciences, 7(3), 134–140.",
    doi: "10.1016/S1364-6613(03)00028-7",
    achado: "Revisão: alternar entre tarefas deixa as respostas mais lentas e mais sujeitas a erro do que repetir a mesma tarefa.",
  },
  {
    id: "leroy2009",
    curta: "Leroy, Organ Behav Hum Decis Process 2009",
    completa: "Leroy, S. (2009). Why is it so hard to do my work? The challenge of attention residue when switching between work tasks. Organizational Behavior and Human Decision Processes, 109(2), 168–181.",
    doi: "10.1016/j.obhdp.2009.04.002",
    achado: "Ao trocar de tarefa, parte da atenção continua presa na anterior ('resíduo de atenção'), e o desempenho na nova tarefa cai.",
  },
  {
    id: "mark2008",
    curta: "Mark, Gudith & Klocke, CHI 2008",
    completa: "Mark, G., Gudith, D., & Klocke, U. (2008). The cost of interrupted work: more speed and stress. Proceedings of CHI 2008, 107–110.",
    doi: "10.1145/1357054.1357072",
    achado: "Pessoas interrompidas compensam trabalhando mais rápido — ao custo de mais estresse, frustração, pressão de tempo e esforço.",
  },
  {
    id: "ophir2009",
    curta: "Ophir, Nass & Wagner, PNAS 2009",
    completa: "Ophir, E., Nass, C., & Wagner, A. D. (2009). Cognitive control in media multitaskers. PNAS, 106(37), 15583–15587.",
    doi: "10.1073/pnas.0903620106",
    achado: "Quem mais faz multitarefa com mídias teve pior desempenho para filtrar distrações e alternar tarefas — não melhor.",
  },
  {
    id: "williamson2011",
    curta: "Williamson et al., Accid Anal Prev 2011",
    completa: "Williamson, A., Lombardi, D. A., Folkard, S., Stutts, J., Courtney, T. K., & Connor, J. L. (2011). The link between fatigue and safety. Accident Analysis & Prevention, 43(2), 498–515.",
    doi: "10.1016/j.aap.2009.11.011",
    achado: "Revisão: a fadiga prejudica o desempenho e está associada a maior risco de erros e acidentes, inclusive no trabalho.",
  },
  {
    id: "killgore2010",
    curta: "Killgore, Prog Brain Res 2010",
    completa: "Killgore, W. D. S. (2010). Effects of sleep deprivation on cognition. Progress in Brain Research, 185, 105–129.",
    doi: "10.1016/B978-0-444-53702-7.00007-5",
    achado: "A privação de sono afeta atenção, memória de trabalho e julgamento — funções muito dependentes do córtex pré-frontal.",
  },
  {
    id: "dekker2012",
    curta: "Dekker et al., Front Psychol 2012",
    completa: "Dekker, S., Lee, N. C., Howard-Jones, P., & Jolles, J. (2012). Neuromyths in education: prevalence and predictors of misconceptions among teachers. Frontiers in Psychology, 3, 429.",
    doi: "10.3389/fpsyg.2012.00429",
    achado: "Neuromitos como 'usamos só 10% do cérebro' são muito difundidos — inclusive entre pessoas interessadas em neurociência.",
  },
  {
    id: "nielsen2013",
    curta: "Nielsen et al., PLoS ONE 2013",
    completa: "Nielsen, J. A., Zielinski, B. A., Ferguson, M. A., Lainhart, J. E., & Anderson, J. S. (2013). An evaluation of the left-brain vs. right-brain hypothesis with resting state functional connectivity MRI. PLoS ONE, 8(8), e71275.",
    doi: "10.1371/journal.pone.0071275",
    achado: "Em mais de mil cérebros, não houve evidência de pessoas 'de hemisfério esquerdo' ou 'direito'.",
  },
  {
    id: "draganski2004",
    curta: "Draganski et al., Nature 2004",
    completa: "Draganski, B., Gaser, C., Busch, V., Schuierer, G., Bogdahn, U., & May, A. (2004). Changes in grey matter induced by training. Nature, 427, 311–312.",
    doi: "10.1038/427311a",
    achado: "Adultos que aprenderam malabarismo tiveram aumento de massa cinzenta em áreas visuomotoras em 3 meses — a plasticidade continua na vida adulta.",
  },
  {
    id: "kurzban2013",
    curta: "Kurzban et al., Behav Brain Sci 2013",
    completa: "Kurzban, R., Duckworth, A., Kable, J. W., & Myers, J. (2013). An opportunity cost model of subjective effort and task performance. Behavioral and Brain Sciences, 36(6), 661–679.",
    doi: "10.1017/S0140525X12003196",
    achado: "Propõe que a sensação de cansaço mental funciona como um sinal do custo de continuar naquela tarefa em vez de outra — hipótese influente, ainda em debate.",
  },
  {
    id: "gollwitzer2006",
    curta: "Gollwitzer & Sheeran, Adv Exp Soc Psychol 2006 (meta-análise)",
    completa: "Gollwitzer, P. M., & Sheeran, P. (2006). Implementation intentions and goal achievement: a meta-analysis of effects and processes. Advances in Experimental Social Psychology, 38, 69–119.",
    doi: "10.1016/S0065-2601(06)38002-1",
    achado: "Planos do tipo 'se acontecer X, então faço Y' aumentam de forma consistente a chance de cumprir o que se planejou — inclusive quando há distrações.",
  },
  {
    id: "lieberman2007",
    curta: "Lieberman et al., Psychol Sci 2007",
    completa: "Lieberman, M. D., Eisenberger, N. I., Crockett, M. J., Tom, S. M., Pfeifer, J. H., & Way, B. M. (2007). Putting feelings into words: affect labeling disrupts amygdala activity in response to affective stimuli. Psychological Science, 18(5), 421–428.",
    doi: "10.1111/j.1467-9280.2007.01916.x",
    achado: "Nomear a emoção que se sente reduziu a atividade da amígdala em resposta a estímulos emocionais — base do passo 'Nomeie'.",
  },
  {
    id: "eisenberger2003",
    curta: "Eisenberger, Lieberman & Williams, Science 2003",
    completa: "Eisenberger, N. I., Lieberman, M. D., & Williams, K. D. (2003). Does rejection hurt? An fMRI study of social exclusion. Science, 302(5643), 290–292.",
    doi: "10.1126/science.1089134",
    achado: "Ser excluído socialmente ativou regiões cerebrais também envolvidas na dor física — a 'dor social' é real no cérebro.",
  },
  {
    id: "woo2014",
    curta: "Woo et al., Nat Commun 2014",
    completa: "Woo, C.-W., Koban, L., Kross, E., Lindquist, M. A., Banich, M. T., Ruzic, L., Andrews-Hanna, J. R., & Wager, T. D. (2014). Separate neural representations for physical pain and social rejection. Nature Communications, 5, 5380.",
    doi: "10.1038/ncomms6380",
    achado: "Contrapeso importante: os padrões cerebrais da dor física e da rejeição social se sobrepõem em parte, mas são distintos — por isso falamos em sobreposição parcial.",
  },
];

export function referencia(id: string): Referencia {
  const r = REFERENCIAS.find((x) => x.id === id);
  if (!r) throw new Error(`Referência desconhecida: ${id}`);
  return r;
}

export function fontesCurtas(ids: string[]): string {
  return ids.map((id) => referencia(id).curta).join(" · ");
}

/** Forma mínima para a tela do palco: "Autor et al. 2022". A referência completa fica na trilha. */
export function citacaoCurta(id: string): string {
  const { curta } = referencia(id);
  const primeiro = curta.split(",")[0].replace(/ et al\.?$/, "").trim();
  const ano = curta.match(/\b(19|20)\d{2}\b/)?.[0] ?? "";
  const varios = /et al|&/.test(curta) && !primeiro.includes("&");
  return `${primeiro}${varios ? " et al." : ""} ${ano}`.trim();
}

