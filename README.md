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
| Textos e seções da página | `pages/index.js` |
| Visual (cores, tamanhos, celular) | `styles/Home.module.css` |

### Preços
Em `data/cardapio.js`, cada linha (Raiz, Olé, Reserva, Fruta) tem `preco: null`.
Troque por um número (ex.: `preco: 7.5` = R$ 7,50) e o preço aparece no cardápio
e o total vai junto na mensagem do WhatsApp.

### iFood
Em `data/config.js`, cole o link da loja em `IFOOD_URL`. Enquanto estiver vazio,
o site mostra "Em breve no iFood".

## Como funciona o pedido
O cliente toca no **+** dos sabores, e a barra de baixo monta a mensagem com
sabores e quantidades. Ao tocar em **Enviar**, abre o WhatsApp
(21) 99653-0559 com a mensagem pronta.
