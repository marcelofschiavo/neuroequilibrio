/**
 * "Por que escrever" — quatro achados, cada um com selo e fonte. O texto é
 * cauteloso de propósito: escrita ajuda, mas com efeito pequeno a moderado
 * (Baikie & Wilhelm, 2005) e não substitui cuidado profissional.
 */

import type { Evidencia } from "./referencias";

export const PORQUES: { titulo: string; texto: string; marina: string; evidencia: Evidencia; fontes: string[] }[] = [
  {
    titulo: "Produzir fixa mais que receber",
    texto:
      "Lembramos melhor o que nós mesmos produzimos (escrevemos, completamos, explicamos) do que o que só lemos ou ouvimos. É o chamado efeito de geração.",
    marina: "Às 08:15 o plano da Marina já tinha sido engolido. Escrito por ela, e não só pensado, teria mais chance de sobreviver à primeira notificação.",
    evidencia: "moderada",
    fontes: ["slamecka1978"],
  },
  {
    titulo: "Nomear acalma o alarme",
    texto:
      "Colocar a emoção em palavras (“estou ansiosa porque…”) reduziu a resposta da amígdala em experimentos de imagem cerebral e recrutou o córtex pré-frontal.",
    marina: "Às 14:00, com o coração acelerado, é o “Nomeie” do protocolo P.N.E.: uma frase já muda o rumo.",
    evidencia: "moderada",
    fontes: ["lieberman2007"],
  },
  {
    titulo: "Escrever sobre o que pesa",
    texto:
      "A escrita expressiva (escrever sobre uma experiência difícil, em dias diferentes) traz benefícios pequenos a moderados para saúde e bem-estar. Funciona melhor repetida, e não substitui tratamento.",
    marina: "No fim do dia, cinco minutos para despejar o que ficou aberto ajudam a fechar o expediente de verdade.",
    evidencia: "moderada",
    fontes: ["pennebaker1986", "baikie2005"],
  },
  {
    titulo: "Escrever o “se… então…”",
    texto:
      "Intenção genérica (“vou me cuidar mais”) quase nunca vira ação. O plano escrito com gatilho — se X acontecer, então eu faço Y — aumenta a chance de cumprir.",
    marina: "É o compromisso do slide final: um gatilho e uma ação, escritos, valem mais que uma promessa.",
    evidencia: "moderada",
    fontes: ["gollwitzer1999"],
  },
];
