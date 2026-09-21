# Neurociências & Equilíbrio Emocional · EDC Group

Site-apresentação para a palestra de **Priscila Ramos** na SIPAT 2026 da EDC Group —
**23/09/2026, 10h05, convite de 1h** (5 min de chegada + 40 min de palestra + 15 min de
dinâmica final) — e a trilha de conteúdo que continua depois.

Produção: `neuroequilibrioemocional.vercel.app`

## Narrativa

Um dia de trabalho da **Marina**, coordenadora de operações da EDC (personagem
fictícia), em quatro atos — 08:00, 11:40, 14:00 e 16:20 — e o fecho às 17:00.
Cada ato tem uma cena em quadrinho, o mecanismo com o **cérebro da Marina**
(regiões que acendem) e o método prático: Regra 90-3-1, Arquitetura de Decisão,
Protocolo P.N.E. (Perceba · Nomeie · Escolha) e Monotarefa Sequencial, que se
juntam no mapa **R.I.F.O.** Estrutura e textos seguem o modelo enviado pela
Priscila ("Produtividade Sustentável: O Cérebro da Marina no Expediente").

Onde mora cada coisa:
- `conteudo/blocos.ts` — a ordem dos slides e as notas da apresentadora
- `conteudo/marina.ts` — todo o texto dos slides (cenas, atos, métodos)
- `conteudo/cerebro.ts` — as 4 regiões (o que faz / onde fica / por que importa)
- `conteudo/referencias.ts` — cada citação, com DOI e selo de evidência

## Decisões de produto

- **Interação da plateia:** só duas perguntas, no chat de texto da sessão
  ("uma palavra" no slide 08:15 e o compromisso no fim). O site não coleta nada.
- **Sem servidor:** tudo que a trilha guarda fica no `localStorage` do aparelho.
- **Rigor científico:** todo dado leva selo (consolidado / moderada / em debate)
  e fonte. Gráficos são marcados como ilustrativos. A "Regra 90-3-1" é
  apresentada como regra prática, não como lei da biologia.
- **Identidade:** verde-petróleo e verde da EDC, com a marca Mindheart ao lado.
  Fundo claro por padrão; a tecla L alterna para escuro (o tema nunca muda sozinho entre slides).

## Acessibilidade do palco

Texto mínimo de 26 px (26–44 px no corpo), contraste ≥ 4,5:1 nos dois temas
(medido), estado nunca só por cor, animações desligáveis (tecla `A` ou preferência
do sistema), regiões do cérebro acessíveis por Tab/Enter, leitor de tela avisa o
slide atual. Teclas: `?` abre a ajuda no próprio palco.

## Rodar localmente

```bash
npm install
npm run dev          # localhost:3000
npm run build         # precisa passar antes de qualquer push
npx tsc --noEmit
npx eslint .
```

## Estrutura

```
app/
  page.tsx                    porta de entrada
  palco/page.tsx               a apresentação — puro local, sem backend
  palco/aguardando/page.tsx    tela de espera dos 5 min de chegada
  trilha/...                   pós-palestra (reveja, suspiro, micropausa, plano…)
  palestrante/page.tsx         bio e contatos da Priscila Ramos
components/
  palco/    trilha/    ui/
conteudo/
  blocos.ts          o roteiro do palco — fonte da verdade
  marina.ts          o dia da Marina: cenas, atos, métodos (texto dos slides)
  cerebro.ts         as 4 regiões do cérebro da Marina
  neuromitos.ts       módulo extra "mito ou ciência?"
  referencias.ts     toda referência científica citada, com DOI e selo de evidência
  palestrante.ts     dados do evento e da Priscila Ramos
  trilha.ts          módulos da trilha
lib/
  motion.ts          variantes de animação nomeadas
  palco.ts           navegação local do slide deck
  local.ts           localStorage tipado
  pdf.ts, pdf-docs/  geração de PDF no cliente (plano do dia, certificado)
```

## Pendências

- Priscila decidir o "O" do R.I.F.O. (hoje "Uma coisa por vez", como no modelo — a sigla não fecha).
- As cenas da Marina são ilustrações geradas por IA (Cloudflare Workers AI); a Priscila deve validar o visual.
