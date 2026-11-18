// ============================================
// Olé Sacolé — Contatos e links de venda
// Edite aqui e o site inteiro atualiza.
// ============================================

// WhatsApp: só números, com 55 (Brasil) + DDD + número
export const WHATSAPP_NUMERO = '5521996530559';
export const WHATSAPP_EXIBICAO = '(21) 99653-0559';

// Link da loja no iFood. Enquanto estiver vazio, o site mostra
// "Em breve no iFood". Cole aqui o link da loja quando tiver, ex.:
// 'https://www.ifood.com.br/delivery/cidade-rj/ole-sacole-bairro/xxxx'
export const IFOOD_URL = '';

export const INSTAGRAM_URL = 'https://instagram.com/olesacoleoficial';
export const INSTAGRAM_USUARIO = '@olesacoleoficial';

export const EMAIL = 'olesacole@gmail.com';

export const LOCALIZACAO = 'Peró - Cabo Frio';

// Regras do pedido pelo site
export const PEDIDO_MINIMO = 20; // em reais
export const BAIRROS_ENTREGA = ['Peró', 'Cajueiro']; // só entregamos nesses bairros

// "Peró e Cajueiro" (ou "A, B e C" se tiver mais bairros)
export const BAIRROS_TEXTO =
  BAIRROS_ENTREGA.length > 1
    ? `${BAIRROS_ENTREGA.slice(0, -1).join(', ')} e ${BAIRROS_ENTREGA[BAIRROS_ENTREGA.length - 1]}`
    : BAIRROS_ENTREGA[0];

export const SITE_URL = 'https://www.olesacole.com.br';

// Monta o link do WhatsApp com uma mensagem já escrita
export function linkWhatsApp(mensagem) {
  const base = `https://wa.me/${WHATSAPP_NUMERO}`;
  return mensagem ? `${base}?text=${encodeURIComponent(mensagem)}` : base;
}
