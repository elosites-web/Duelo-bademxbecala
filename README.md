# Duelo de Fim de Ano — Amigos do Badem VS Amigos do Becala

Site do jogo festivo de fim de ano entre os "Amigos do Badem" e os "Amigos do Becala": campo tático interativo, escalações, histórico das edições anteriores, votação "Bola Cheia vs Bola Murcha", galeria de fotos e mural da comunidade.

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion (`motion`)
- lucide-react (ícones)
- canvas-confetti

## Rodar localmente

**Pré-requisito:** Node.js 18+

1. Instalar dependências:
   `npm install`
2. Rodar em modo desenvolvimento:
   `npm run dev`
3. Gerar build de produção:
   `npm run build`
4. Pré-visualizar o build de produção:
   `npm run preview`

## Observações

- Não há backend: presença, votos, sugestões de atletas e recados do mural são persistidos apenas no `localStorage` do navegador (dado por dispositivo, não compartilhado entre visitantes).
- Datas, horário e local do jogo estão marcados como "a definir" propositalmente — devem ser preenchidos pela comissão organizadora assim que forem confirmados.
