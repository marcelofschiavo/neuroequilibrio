# Neurociências & Equilíbrio Emocional · EDC Group

Site-apresentação para a palestra de **Priscila Ramos** na SIPAT 2026 da EDC Group —
**23/09/2026, 10h05, convite de 1h** (5 min de chegada + 40 min de palestra + 15 min de
dinâmica final) — e a trilha de conteúdo que continua depois.

Produção: `neuroequilibrioemocional.vercel.app`

## Narrativa

Um dia de trabalho — 8h às 18h — de quatro personagens fictícios (Rafael, Luciana,
Beatriz, Marcos), cada um vivendo o mecanismo de uma das 4 perguntas do quiz final da
palestrante. Ver `conteudo/blocos.ts` (roteiro do palco), `conteudo/personagens.ts`,
`conteudo/quiz.ts` e `conteudo/referencias.ts` (toda citação científica, com selo de
evidência e DOI).

## Decisões de produto

- **A plateia não usa o celular durante a palestra.** `/palco` é um slide deck local,
  sem backend — navega de teclado/passador, funciona offline (service worker).
- **Sem Supabase, sem cadastro, sem backoffice.** Tudo que a trilha coleta
  (mapa de energia, blocos de monotarefa, resultado do quiz, nome do certificado) fica
  só no `localStorage` do aparelho — nada trafega para servidor.
- **Rigor científico.** Toda explicação do quiz final foi revisada contra a
  literatura atual (`conteudo/quiz.ts` guarda o texto original da palestrante em
  `explicacaoOriginal` e a nota do ajuste em `notaAjuste`, para ela aprovar). Cada dado
  técnico leva um selo — 🟢 consolidado, 🟡 evidência moderada, ⚪ modelo em debate.
- **Identidade EDC Group.** Fundo grafite + verde (`app/globals.css`), com o traço
  horizontal do logo (o `<Traco>` em `components/ui/Logo.tsx`) como elemento recorrente.

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
  trilha/...                   pós-palestra (reveja, suspiro, micropausa, plano, quiz…)
  palestrante/page.tsx         bio e contatos da Priscila Ramos
components/
  palco/    trilha/    ui/
conteudo/
  blocos.ts          o roteiro do palco — fonte da verdade
  personagens.ts     Rafael, Luciana, Beatriz, Marcos
  quiz.ts            as 4 perguntas do quiz final, com explicação revisada
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

Marcadas como `// TODO(...)` no código:
- Aprovação da Priscila para as explicações ajustadas do quiz (`conteudo/quiz.ts`).
- Ícones do PWA (`public/icon-192.png`, `icon-512.png`) ainda são placeholder — trocar
  por um ícone com o traço EDC.
- Deploy Vercel do projeto (`neuroequilibrioemocional.vercel.app` ainda sem build).
