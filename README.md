# Olé Sacolé — site

Site da Olé Sacolé feito em Next.js (uma página só).

## Rodar no computador

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## Onde mexer

| O que você quer mudar | Arquivo |
| --- | --- |
| Sabores, descrições, cores dos sacolés e **preços** | `data/cardapio.js` |
| WhatsApp, link do **iFood**, Instagram, e-mail | `data/config.js` |
| Textos e seções da página inicial | `pages/index.js` |
| Página "Monte seu pedido" (/pedido) | `pages/pedido.js` |
| Texto da mensagem que vai pro WhatsApp | `lib/pedido.js` (função `montarMensagem`) |
| Barra superior e rodapé (usados nas duas páginas) | `components/Navbar.js`, `components/Rodape.js` |
| Visual (cores, tamanhos, celular) | `styles/Home.module.css`, `styles/Pedido.module.css` |

### Preços
Em `data/cardapio.js`, cada linha (Raiz, Olé, Reserva, Fruta) tem `preco: null`.
Troque por um número (ex.: `preco: 7.5` = R$ 7,50) e o preço aparece no cardápio
e o total vai junto na mensagem do WhatsApp.

### iFood
Em `data/config.js`, cole o link da loja em `IFOOD_URL`. Enquanto estiver vazio,
o site mostra "Em breve no iFood".

## Como funciona o pedido
- Na página **/pedido** ("Monte seu pedido") o cliente escolhe sabores e
  quantidades, coloca nome, entrega ou retirada e uma observação. O botão
  **Enviar pedido no WhatsApp** abre o (21) 99653-0559 com a mensagem pronta,
  separada por linha, com as quantidades e o total.
- Na página inicial ele também pode ir tocando no **+** do cardápio; o botão
  **Finalizar** leva pra /pedido com tudo já escolhido (o pedido fica salvo
  no navegador dele).
