import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import p from '../styles/Pedido.module.css';
import Navbar from '../components/Navbar';
import Rodape from '../components/Rodape';
import SacoleIcon from '../components/SacoleIcon';
import { IconeChat, IconeFechar, IconeMais, IconeMenos } from '../components/Icones';
import { LINHAS, formatarPreco, idSabor, tituloLinha } from '../data/cardapio';
import { SITE_URL, WHATSAPP_EXIBICAO, linkWhatsApp } from '../data/config';
import { montarMensagem, plural, usePedido } from '../lib/pedido';

// ============================================
// Olé Sacolé — Monte seu pedido (/pedido)
// O cliente escolhe sabores e quantidades, preenche nome e entrega,
// e o botão abre o WhatsApp com a mensagem pronta.
// ============================================

function varsLinha(linha) {
  return { '--cor-linha': linha.cor, '--cor-linha-clara': linha.corClara };
}

export default function PaginaPedido() {
  const { pedido, itens, totalQtd, totalValor, alterar, remover, limpar } = usePedido();
  const [nome, setNome] = useState('');
  const [modo, setModo] = useState(''); // 'entrega' | 'retirada'
  const [endereco, setEndereco] = useState('');
  const [observacao, setObservacao] = useState('');
  const [resumoVisivel, setResumoVisivel] = useState(false);

  // No celular, esconde a barra de baixo quando o resumo já está na tela
  useEffect(() => {
    const alvo = document.getElementById('resumo');
    if (!alvo || !('IntersectionObserver' in window)) return undefined;
    const obs = new IntersectionObserver(([e]) => setResumoVisivel(e.isIntersecting), {
      threshold: 0.15,
    });
    obs.observe(alvo);
    return () => obs.disconnect();
  }, []);

  const vazio = totalQtd === 0;
  const mensagem = montarMensagem({ itens, totalQtd, totalValor, nome, modo, endereco, observacao });
  const textoTotal =
    `${totalQtd} ${plural(totalQtd, 'sacolé', 'sacolés')}` +
    (totalValor != null ? ` · ${formatarPreco(totalValor)}` : '');

  return (
    <>
      <Head>
        <title>Monte seu pedido — Olé Sacolé</title>
        <meta
          name="description"
          content="Escolha seus sacolés e as quantidades e envie o pedido pronto pelo WhatsApp da Olé Sacolé."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="canonical" href={`${SITE_URL}/pedido`} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:title" content="Monte seu pedido — Olé Sacolé" />
        <meta property="og:description" content="Escolha seus sacolés e envie o pedido pelo WhatsApp." />
        <meta property="og:url" content={`${SITE_URL}/pedido`} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={styles.page} data-pedido={vazio ? 'nao' : 'sim'}>
        <Navbar paginaAtual="pedido" />

        {/* ============== TOPO ============== */}
        <header className={p.topo}>
          <div className={styles.solContainer} aria-hidden="true">
            <div className={styles.solRaios} />
          </div>
          <h1 className={p.titulo}>
            Monte seu <span>pedido</span>
          </h1>
          <p className={p.subtitulo}>
            Escolha os sabores e as quantidades. No final, a mensagem vai prontinha pro nosso
            WhatsApp. 💬
          </p>
          <nav className={p.atalhos} aria-label="Ir para a linha">
            {LINHAS.map((linha) => (
              <a key={linha.id} href={`#linha-${linha.id}`} style={varsLinha(linha)}>
                {linha.nome}
              </a>
            ))}
          </nav>
        </header>

        <main className={p.layout}>
          {/* ============== SABORES ============== */}
          <div className={p.lista}>
            {LINHAS.map((linha) => (
              <section
                key={linha.id}
                id={`linha-${linha.id}`}
                className={p.grupo}
                style={varsLinha(linha)}
              >
                <div className={p.grupoTopo}>
                  <h2>
                    {tituloLinha(linha)}
                    {linha.selo && <span className={styles.linhaSelo}>{linha.selo}</span>}
                  </h2>
                  {linha.preco != null && (
                    <span className={p.grupoPreco}>{formatarPreco(linha.preco)} cada</span>
                  )}
                </div>
                <p className={p.grupoSlogan}>{linha.slogan}</p>

                <ul className={p.itens}>
                  {linha.sabores.map((sabor) => {
                    const id = idSabor(linha, sabor);
                    const qtd = pedido[id] || 0;
                    return (
                      <li key={id} className={`${p.item} ${qtd > 0 ? p.itemAtivo : ''}`}>
                        <div className={p.itemIconeBox} aria-hidden="true">
                          <SacoleIcon cor={sabor.cor} textura={sabor.textura} cor2={sabor.cor2} className={p.itemIcone} />
                        </div>
                        <div className={p.itemTexto}>
                          <h3>{sabor.nome}</h3>
                          <p>{sabor.descricao}</p>
                        </div>
                        <div className={p.stepper}>
                          <button
                            type="button"
                            onClick={() => alterar(id, -1)}
                            disabled={qtd === 0}
                            aria-label={`Tirar um ${sabor.nome}`}
                          >
                            <IconeMenos width={18} height={18} />
                          </button>
                          <span aria-live="polite" aria-label={`${qtd} de ${sabor.nome}`}>{qtd}</span>
                          <button
                            type="button"
                            className={p.mais}
                            onClick={() => alterar(id, 1)}
                            aria-label={`Adicionar um ${sabor.nome}`}
                          >
                            <IconeMais width={18} height={18} />
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </div>

          {/* ============== RESUMO ============== */}
          <aside id="resumo" className={p.resumo} aria-label="Resumo do pedido">
            <div className={p.resumoCaixa}>
              <h2>Seu pedido 🧺</h2>

              {vazio ? (
                <p className={p.vazio}>
                  Ainda não tem nenhum sacolé aqui. Toque no <strong>+</strong> ao lado dos sabores.
                </p>
              ) : (
                <ul className={p.resumoLista}>
                  {itens.map((i) => (
                    <li key={i.id}>
                      <span className={p.resumoQtd}>{i.qtd}x</span>
                      <span className={p.resumoNome}>
                        {i.sabor.nome}
                        <small>{tituloLinha(i.linha)}</small>
                      </span>
                      {i.linha.preco != null && (
                        <span className={p.resumoPreco}>{formatarPreco(i.qtd * i.linha.preco)}</span>
                      )}
                      <button
                        type="button"
                        onClick={() => remover(i.id)}
                        aria-label={`Remover ${i.sabor.nome} do pedido`}
                      >
                        <IconeFechar width={16} height={16} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className={p.total}>
                <span>Total</span>
                <strong>{textoTotal}</strong>
              </div>

              <form className={p.form} onSubmit={(e) => e.preventDefault()}>
                <label className={p.campo}>
                  <span>Seu nome</span>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    autoComplete="given-name"
                    placeholder="Como podemos te chamar?"
                    maxLength={60}
                  />
                </label>

                <fieldset className={p.campo}>
                  <legend>Entrega ou retirada?</legend>
                  <div className={p.opcoes}>
                    <label className={p.opcao}>
                      <input
                        type="radio"
                        name="modo"
                        value="entrega"
                        checked={modo === 'entrega'}
                        onChange={() => setModo('entrega')}
                      />
                      <span>🛵 Entrega</span>
                    </label>
                    <label className={p.opcao}>
                      <input
                        type="radio"
                        name="modo"
                        value="retirada"
                        checked={modo === 'retirada'}
                        onChange={() => setModo('retirada')}
                      />
                      <span>📍 Retirada</span>
                    </label>
                  </div>
                </fieldset>

                {modo === 'entrega' && (
                  <label className={p.campo}>
                    <span>Endereço ou ponto de referência</span>
                    <input
                      type="text"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      autoComplete="street-address"
                      placeholder="Rua, número e bairro"
                      maxLength={160}
                    />
                  </label>
                )}

                <label className={p.campo}>
                  <span>
                    Observação <small>(opcional)</small>
                  </span>
                  <textarea
                    rows={2}
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    placeholder="Ex.: é pra uma festa no sábado"
                    maxLength={300}
                  />
                </label>
              </form>

              {vazio ? (
                <button type="button" className={p.enviar} disabled>
                  Escolha pelo menos 1 sacolé
                </button>
              ) : (
                <a
                  href={linkWhatsApp(mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={p.enviar}
                >
                  <IconeChat /> Enviar pedido no WhatsApp
                </a>
              )}
              <p className={p.ajuda}>
                Abre o WhatsApp {WHATSAPP_EXIBICAO} com a mensagem pronta. É só tocar em enviar.
              </p>

              {!vazio && (
                <>
                  <details className={p.previa}>
                    <summary>Ver como a mensagem vai ficar</summary>
                    <pre>{mensagem}</pre>
                  </details>
                  <button type="button" className={p.limpar} onClick={limpar}>
                    Limpar pedido
                  </button>
                </>
              )}
            </div>
          </aside>
        </main>

        <Rodape />

        {/* Barra fixa no celular: leva até o resumo */}
        {!vazio && (
          <a
            href="#resumo"
            className={`${p.barraMobile} ${resumoVisivel ? p.barraMobileOculta : ''}`}
            aria-hidden={resumoVisivel ? 'true' : undefined}
            tabIndex={resumoVisivel ? -1 : undefined}
          >
            <strong>{textoTotal}</strong>
            <span className={p.barraMobileAcao}>Revisar e enviar ↓</span>
          </a>
        )}
      </div>
    </>
  );
}
