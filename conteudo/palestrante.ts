/** Dados do evento e da palestrante — fonte única pra palco, trilha e certificado. */

export const EVENTO = {
  titulo: "Neurociências & Equilíbrio Emocional",
  cliente: "EDC Group",
  ocasiao: "SIPAT 2026",
  dataExtenso: "23 de setembro de 2026",
  /** Início efetivo da fala (10h05) — a tela de espera conta até aqui. */
  inicioFala: "2026-09-23T10:05:00-03:00",
  horario: "10h às 11h",
  url: "https://neuroequilibrioemocional.vercel.app",
} as const;

export const PALESTRANTE = {
  nome: "Priscila Ramos",
  nomeCompleto: "Priscila da Silva Ramos",
  foto: "/palestrante/priscila.jpg",
  titulos: ["Psicóloga", "Neuropsicóloga", "Fundadora da Mindheart Human Development"],
  bioCurta: [
    "Psicóloga e Neuropsicóloga",
    "14 anos de RH em multinacionais",
    "Care Coach pela BetterUp",
    "Fundadora da Mindheart Human Development",
  ],
  bio:
    "Priscila Ramos é Psicóloga, Neuropsicóloga e fundadora da Mindheart Human Development. Com 14 anos de trajetória em Recursos Humanos em multinacionais, atua hoje como Consultora de RH, Care Coach pela BetterUp e na prática clínica focada em saúde mental e qualidade de vida. Especialista em Terapia Cognitivo-Comportamental e Executive & Life Coaching, dedica-se a contribuir para que pessoas alcancem o seu potencial na vida e na carreira, com equilíbrio, propósito e saúde cerebral.",
  contatos: [
    { rede: "Instagram", rotulo: "@priscilaramos.psi", href: "https://www.instagram.com/priscilaramos.psi/" },
    { rede: "LinkedIn", rotulo: "in/priscilasilvaramos", href: "https://www.linkedin.com/in/priscilasilvaramos/" },
    { rede: "E-mail", rotulo: "silvaramos.priscila@gmail.com", href: "mailto:silvaramos.priscila@gmail.com" },
  ],
} as const;
