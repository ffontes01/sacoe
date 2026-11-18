import { useEffect, useMemo, useRef, useState } from 'react';
import { LINHAS, SABORES, formatarPreco, tituloLinha } from '../data/cardapio';

// ============================================
// Pedido (carrinho) compartilhado entre a página inicial e /pedido.
// Fica guardado no navegador do cliente (localStorage), assim ele pode
// escolher na home e finalizar na página de pedido sem perder nada.
// ============================================

const CHAVE = 'ole-sacole-pedido';

export function plural(n, singular, pluralTexto) {
  return n === 1 ? singular : pluralTexto;
}

export function usePedido() {
  const [pedido, setPedido] = useState({}); // { idDoSabor: quantidade }
  const carregado = useRef(false);

  useEffect(() => {
    try {
      const salvo = JSON.parse(window.localStorage.getItem(CHAVE) || '{}');
      const validos = Object.fromEntries(
        Object.entries(salvo).filter(
          ([id, qtd]) => SABORES.some((s) => s.id === id) && Number.isInteger(qtd) && qtd > 0
        )
      );
      setPedido(validos);
    } catch (e) {
      /* sem armazenamento disponível — segue sem salvar */
    }
    carregado.current = true;
  }, []);

  useEffect(() => {
    if (!carregado.current) return;
    try {
      window.localStorage.setItem(CHAVE, JSON.stringify(pedido));
    } catch (e) {
      /* ignora */
    }
  }, [pedido]);

  const itens = useMemo(
    () => SABORES.filter((s) => pedido[s.id] > 0).map((s) => ({ ...s, qtd: pedido[s.id] })),
    [pedido]
  );
  const totalQtd = itens.reduce((soma, i) => soma + i.qtd, 0);
  const todosComPreco = itens.length > 0 && itens.every((i) => i.linha.preco != null);
  const totalValor = todosComPreco
    ? itens.reduce((soma, i) => soma + i.qtd * i.linha.preco, 0)
    : null;

  function alterar(id, delta) {
    setPedido((atual) => {
      const qtd = Math.max(0, Math.min(99, (atual[id] || 0) + delta));
      const novo = { ...atual };
      if (qtd === 0) delete novo[id];
      else novo[id] = qtd;
      return novo;
    });
  }

  function remover(id) {
    setPedido((atual) => {
      const novo = { ...atual };
      delete novo[id];
      return novo;
    });
  }

  function limpar() {
    setPedido({});
  }

  return { pedido, itens, totalQtd, totalValor, alterar, remover, limpar };
}

// Monta o texto que vai pro WhatsApp, agrupado por linha.
// *texto* fica em negrito no WhatsApp.
export function montarMensagem({
  itens,
  totalQtd,
  totalValor,
  nome,
  endereco,
  bairro,
  referencia,
  observacao,
}) {
  const partes = ['Olá, Olé Sacolé! 👋 Quero fazer um pedido para entrega:', ''];

  LINHAS.forEach((linha) => {
    const daLinha = itens.filter((i) => i.linha.id === linha.id);
    if (daLinha.length === 0) return;
    partes.push(`*${tituloLinha(linha)}*`);
    daLinha.forEach((i) => partes.push(`• ${i.qtd}x ${i.sabor.nome}`));
    partes.push('');
  });

  partes.push(
    `*Total:* ${totalQtd} ${plural(totalQtd, 'sacolé', 'sacolés')}` +
      (totalValor != null ? ` — ${formatarPreco(totalValor)}` : '')
  );

  const limpo = (v) => (v && v.trim() ? v.trim() : '');
  const enderecoCompleto = [limpo(endereco), limpo(bairro)].filter(Boolean).join(' — ');

  partes.push('', `*Nome:* ${limpo(nome)}`, `*Endereço:* ${enderecoCompleto}`);
  if (limpo(referencia)) partes.push(`*Ponto de referência:* ${limpo(referencia)}`);
  if (limpo(observacao)) partes.push(`*Obs.:* ${limpo(observacao)}`);

  return partes.join('\n');
}
