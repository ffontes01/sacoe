// ============================================
// Olé Sacolé — Cardápio
// ============================================
// Para mudar sabores, descrições ou preços, edite só este arquivo.
//
// preco: valor de cada sacolé da linha, em número (ex.: 6.5 = R$ 6,50).
//        Deixe null para não mostrar preço no site.
//        Se você colocar preço, o total aparece no pedido do WhatsApp.
//
// titulo: (opcional) como a linha aparece por extenso. Se não tiver,
//         o site usa "Linha " + nome.
//
// Cada sabor tem:
//   cor     → cor do sacolé desenhado
//   textura → detalhe por cima: 'sementes', 'pontos', 'granulado',
//             'pedacos', 'calda' (fio de calda/cobertura) ou null (liso)
//   cor2    → cor da textura
// ============================================

export const LINHAS = [
  {
    id: 'raiz',
    nome: 'Raiz',
    slogan: 'Os clássicos com gosto de infância.',
    preco: 6,
    cor: '#C17A2C',
    corClara: '#FBEBD5',
    sabores: [
      { nome: 'Abacate', descricao: 'Sacolé de abacate, cremoso e nutritivo.', cor: '#B9D36E', textura: null },
      { nome: 'Paçoca', descricao: 'Sacolé de paçoca, feito de amendoim.', cor: '#DDB47F', textura: 'pontos', cor2: '#A7743F' },
      { nome: 'Cocada', descricao: 'Base de coco com um adicional de coco tostado.', cor: '#F6ECD3', textura: 'pontos', cor2: '#C2914F' },
      { nome: 'Mousse de Morango', descricao: 'Sacolé de mousse de morango, supercremoso.', cor: '#F7B5C4', textura: 'pontos', cor2: '#E05A75' },
      { nome: 'Mousse de Maracujá', descricao: 'Sacolé de mousse de maracujá, supercremoso.', cor: '#F8DD70', textura: 'sementes', cor2: '#3B2A12' },
      { nome: 'Pé de moleque', descricao: 'Base de amendoim com amendoim caramelizado.', cor: '#DDB47F', textura: 'pedacos', cor2: '#8A4E1C' },
      { nome: 'Chocolate com amendoim', descricao: 'Base de amendoim + cacau 40%.', cor: '#8A5A3A', textura: 'pontos', cor2: '#D9A96B' },
    ],
  },
  {
    id: 'ole',
    nome: 'Olé',
    selo: 'Assinatura',
    slogan: 'A linha da casa: tudo com Nutella.',
    preco: 8,
    cor: '#7E9852',
    corClara: '#EEF3DC',
    sabores: [
      { nome: 'Ninho com Nutella', descricao: 'Base de Ninho com cobertura de Nutella.', cor: '#FBF3E4', textura: 'calda', cor2: '#5A3220' },
      { nome: 'Maracujá com Nutella', descricao: 'Mousse de maracujá com cobertura de Nutella.', cor: '#F8D965', textura: 'calda', cor2: '#5A3220' },
      { nome: 'Morango com Nutella', descricao: 'Mousse de morango com cobertura de Nutella.', cor: '#F6A9B9', textura: 'calda', cor2: '#5A3220' },
    ],
  },
  {
    id: 'reserva',
    nome: 'Reserva',
    slogan: 'Sabores especiais pra quem quer ir além.',
    preco: 8,
    cor: '#A63D52',
    corClara: '#F8E3E7',
    sabores: [
      { nome: 'Romeu e Julieta', descricao: 'Massa sabor queijo com micropedaços de queijo + calda de goiabada.', cor: '#FAF0D7', textura: 'calda', cor2: '#B8303F' },
      { nome: 'Tablô', descricao: 'Cobertura de Galak com farinha de amendoim, massa leve de creme e recheio de chocolate.', cor: '#F4E8D0', textura: 'pontos', cor2: '#B98A55' },
      { nome: 'Alpineiro', descricao: 'Brigadeiro intenso + granulado e sorvete de chocolate.', cor: '#6A3A24', textura: 'granulado', cor2: '#2B140A' },
    ],
  },
  {
    id: 'fruta',
    nome: 'Da Fruta',
    titulo: 'Linha da Fruta',
    slogan: 'Refrescantes, pra matar a sede no sol.',
    preco: 5,
    cor: '#178FA8',
    corClara: '#DDF3F7',
    sabores: [
      { nome: 'Açaí', descricao: 'Sorbet de açaí com morango batido com guaraná.', cor: '#5B2A5E', textura: null },
      { nome: 'Manga', descricao: 'Sorbet de manga natural.', cor: '#FFB238', textura: null },
      { nome: 'Coco', descricao: 'Sacolé de coco com leite.', cor: '#FFFDF6', textura: 'pontos', cor2: '#E6D8BB' },
      { nome: 'Goiaba', descricao: 'Sorbet de goiaba natural.', cor: '#F07D86', textura: null },
    ],
  },
];

// "Linha Raiz", "Linha da Fruta"...
export function tituloLinha(linha) {
  return linha.titulo || `Linha ${linha.nome}`;
}

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

// Lista "achatada" de todos os sabores
export const SABORES = LINHAS.flatMap((linha) =>
  linha.sabores.map((sabor) => ({ id: idSabor(linha, sabor), linha, sabor }))
);

export const TOTAL_SABORES = SABORES.length;

// Menor preço entre as linhas (para o "a partir de")
const PRECOS = LINHAS.map((l) => l.preco).filter((v) => v != null);
export const PRECO_MINIMO = PRECOS.length ? Math.min(...PRECOS) : null;

export function formatarPreco(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
