// ============================================
// Olé Sacolé — Cardápio
// ============================================
// Para mudar sabores, descrições ou preços, edite só este arquivo.
//
// preco: valor de cada sacolé da linha, em número (ex.: 6.5 = R$ 6,50).
//        Deixe null para não mostrar preço no site.
//        Se você colocar preço, o total aparece no pedido do WhatsApp.
//
// Cada sabor tem:
//   cor     → cor do sacolé desenhado
//   textura → detalhe por cima: 'sementes', 'pontos', 'granulado',
//             'pedacos', 'nutella' ou null (liso)
//   cor2    → cor da textura
// ============================================

export const LINHAS = [
  {
    id: 'raiz',
    nome: 'Raiz',
    slogan: 'Os clássicos com gosto de infância.',
    preco: null,
    cor: '#C17A2C',
    corClara: '#FBEBD5',
    sabores: [
      { nome: 'Abacate', descricao: 'Cremoso, docinho e bem levinho.', cor: '#B9D36E', textura: null },
      { nome: 'Paçoca', descricao: 'Amendoim cremoso com sabor de festa junina.', cor: '#DDB47F', textura: 'pontos', cor2: '#A7743F' },
      { nome: 'Cocada', descricao: 'Coco cremoso com gostinho de doce de tabuleiro.', cor: '#F6ECD3', textura: 'pontos', cor2: '#D9BC86' },
      { nome: 'Brigadeiro', descricao: 'O doce de festa, agora geladinho.', cor: '#7A452C', textura: 'granulado', cor2: '#3A1D10' },
      { nome: 'Mousse de Morango', descricao: 'Leve, cremoso e rosinha.', cor: '#F7B5C4', textura: 'pontos', cor2: '#E05A75' },
      { nome: 'Mousse de Maracujá', descricao: 'Azedinho e cremoso na medida.', cor: '#F8DD70', textura: 'sementes', cor2: '#3B2A12' },
      { nome: 'Pé de moleque', descricao: 'Amendoim caramelizado em versão gelada.', cor: '#C98A40', textura: 'pedacos', cor2: '#8A5525' },
      { nome: 'Chocolate com amendoim', descricao: 'Chocolate cremoso e amendoim, dupla clássica.', cor: '#7B4A2E', textura: 'pedacos', cor2: '#D9A96B' },
    ],
  },
  {
    id: 'ole',
    nome: 'Olé',
    selo: 'Assinatura',
    slogan: 'A linha da casa: tudo com Nutella.',
    preco: null,
    cor: '#7E9852',
    corClara: '#EEF3DC',
    sabores: [
      { nome: 'Ninho com Nutella', descricao: 'Leite Ninho cremoso com Nutella.', cor: '#FBF3E4', textura: 'nutella', cor2: '#5A3220' },
      { nome: 'Maracujá com Nutella', descricao: 'O azedinho do maracujá com Nutella.', cor: '#F8D965', textura: 'nutella', cor2: '#5A3220' },
      { nome: 'Morango com Nutella', descricao: 'Morango e Nutella, dupla imbatível.', cor: '#F6A9B9', textura: 'nutella', cor2: '#5A3220' },
    ],
  },
  {
    id: 'reserva',
    nome: 'Reserva',
    slogan: 'Sabores especiais pra quem quer ir além.',
    preco: null,
    cor: '#A63D52',
    corClara: '#F8E3E7',
    sabores: [
      { nome: 'Romeu e Julieta', descricao: 'Queijo e goiabada, o casal mais famoso do Brasil.', cor: '#FAF0D7', textura: 'pedacos', cor2: '#B8303F' },
      { nome: 'Tablô', descricao: 'Receita especial da casa.', cor: '#9C6B4E', textura: 'pontos', cor2: '#F3E3C8' },
    ],
  },
  {
    id: 'fruta',
    nome: 'Fruta',
    slogan: 'Refrescantes, pra matar a sede no sol.',
    preco: null,
    cor: '#178FA8',
    corClara: '#DDF3F7',
    sabores: [
      { nome: 'Açaí', descricao: 'Energia de praia em forma de sacolé.', cor: '#5B2A5E', textura: null },
      { nome: 'Manga', descricao: 'Manga madurinha, doce na medida certa.', cor: '#FFB238', textura: null },
      { nome: 'Coco', descricao: 'Pura brisa de praia, bem geladinho.', cor: '#FFFDF6', textura: 'pontos', cor2: '#E6D8BB' },
      { nome: 'Goiaba', descricao: 'Goiaba vermelhinha e refrescante.', cor: '#F07D86', textura: null },
    ],
  },
];

// Gera um id estável para cada sabor (ex.: 'raiz-pacoca')
export function idSabor(linha, sabor) {
  const slug = sabor.nome
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return `${linha.id}-${slug}`;
}

export const TOTAL_SABORES = LINHAS.reduce((soma, l) => soma + l.sabores.length, 0);

export function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
