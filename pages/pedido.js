import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import p from '../styles/Pedido.module.css';
import Navbar from '../components/Navbar';
import Rodape from '../components/Rodape';
import SacoleIcon from '../components/SacoleIcon';
import { IconeChat, IconeFechar, IconeMais, IconeMenos } from '../components/Icones';
import { LINHAS, formatarPreco, idSabor, tituloLinha } from '../data/cardapio';
import {
  BAIRROS_ENTREGA,
  BAIRROS_TEXTO,
  PEDIDO_MINIMO,
  SITE_URL,
  WHATSAPP_EXIBICAO,
  linkWhatsApp,
} from '../data/config';
import { montarMensagem, plural, usePedido } from '../lib/pedido';

// ============================================
// Olé Sacolé — Monte seu pedido (/pedido)
// O cliente escolhe sabores e quantidades, preenche nome e endereço,
// e o botão abre o WhatsApp com a mensagem pronta.
//
// Regras (em data/config.js):
//   - pedido mínimo: PEDIDO_MINIMO
//   - só entrega, nos bairros BAIRROS_ENTREGA
//   - nome, endereço e bairro obrigatórios; ponto de referência opcional
// ============================================

function varsLinha(linha) {
  return { '--cor-linha': linha.cor, '--cor-linha-clara': linha.corClara };
}

export default function PaginaPedido() {
  const { pedido, itens, totalQtd, totalValor, alterar, remover, limpar } = usePedido();
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [referencia, setReferencia] = useState('');
  const [observacao, setObservacao] = useState('');
  const [tentouEnviar, setTentouEnviar] = useState(false);
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

  // Pedido mínimo
  const valor = totalValor || 0;
  const falta = Math.max(0, PEDIDO_MINIMO - valor);
  const atingiuMinimo = totalValor == null || falta === 0;
  const progresso = Math.min(100, Math.round((valor / PEDIDO_MINIMO) * 100));

  // Campos obrigatórios
  const erros = {
    nome: !nome.trim() ? 'Coloque seu nome.' : '',
    endereco: !endereco.trim() ? 'Coloque o endereço com rua e número.' : '',
    bairro: !bairro ? `Escolha o bairro (${BAIRROS_TEXTO}).` : '',
  };
  const dadosOk = !erros.nome && !erros.endereco && !erros.bairro;
  const mostrarErro = (campo) => tentouEnviar && erros[campo];

  const mensagem = montarMensagem({
    itens,
    totalQtd,
    totalValor,
    nome,
    endereco,
    bairro,
    referencia,
    observacao,
  });
  const textoTotal =
    `${totalQtd} ${plural(totalQtd, 'sacolé', 'sacolés')}` +
    (totalValor != null ? ` · ${formatarPreco(totalValor)}` : '');

  // Se faltar nome/endereço/bairro, não abre o WhatsApp: mostra o que falta
  function aoEnviar(evento) {
    if (dadosOk) return;
    evento.preventDefault();
    setTentouEnviar(true);
    const primeiro = erros.nome ? 'campo-nome' : erros.endereco ? 'campo-endereco' : 'campo-bairro-0';
    const el = document.getElementById(primeiro);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.focus({ preventScroll: true });
    }
  }

  return (
    <>
      <Head>
        <title>Monte seu pedido — Olé Sacolé</title>
        <meta
          name="description"
          content={`Escolha seus sacolés e envie o pedido pronto pelo WhatsApp da Olé Sacolé. Pedido mínimo de ${formatarPreco(PEDIDO_MINIMO)}, entrega no ${BAIRROS_TEXTO}.`}
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
          <p className={p.regras}>
            <span>🧾 Pedido mínimo {formatarPreco(PEDIDO_MINIMO)}</span>
            <span>🛵 Entrega só no {BAIRROS_TEXTO}</span>
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

              {/* Pedido mínimo */}
              {totalValor != null || vazio ? (
                <div className={p.minimo} data-ok={atingiuMinimo && !vazio ? 'sim' : 'nao'} aria-live="polite">
                  <p>
                    {vazio
                      ? `Pedido mínimo: ${formatarPreco(PEDIDO_MINIMO)}`
                      : atingiuMinimo
                        ? '✓ Pedido mínimo atingido'
                        : `Faltam ${formatarPreco(falta)} para o pedido mínimo de ${formatarPreco(PEDIDO_MINIMO)}`}
                  </p>
                  <div className={p.minimoBarra} aria-hidden="true">
                    <span style={{ width: `${vazio ? 0 : progresso}%` }} />
                  </div>
                </div>
              ) : null}

              {/* Aviso de entrega */}
              <div className={p.aviso}>
                <span aria-hidden="true">🛵</span>
                <p>
                  Só fazemos <strong>entrega</strong>, e somente nos bairros{' '}
                  <strong>{BAIRROS_TEXTO}</strong>.
                </p>
              </div>

              <form className={p.form} onSubmit={(e) => e.preventDefault()} noValidate>
                <p className={p.legendaObrigatorio}>
                  <span className={p.asterisco}>*</span> obrigatório
                </p>

                <label className={p.campo} htmlFor="campo-nome">
                  <span>
                    Seu nome <span className={p.asterisco}>*</span>
                  </span>
                  <input
                    id="campo-nome"
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    autoComplete="name"
                    placeholder="Como podemos te chamar?"
                    maxLength={60}
                    required
                    aria-invalid={mostrarErro('nome') ? 'true' : undefined}
                    aria-describedby={mostrarErro('nome') ? 'erro-nome' : undefined}
                  />
                  {mostrarErro('nome') && <small id="erro-nome" className={p.erro}>{erros.nome}</small>}
                </label>

                <label className={p.campo} htmlFor="campo-endereco">
                  <span>
                    Endereço <span className={p.asterisco}>*</span>
                  </span>
                  <input
                    id="campo-endereco"
                    type="text"
                    value={endereco}
                    onChange={(e) => setEndereco(e.target.value)}
                    autoComplete="street-address"
                    placeholder="Rua e número"
                    maxLength={160}
                    required
                    aria-invalid={mostrarErro('endereco') ? 'true' : undefined}
                    aria-describedby={mostrarErro('endereco') ? 'erro-endereco' : undefined}
                  />
                  {mostrarErro('endereco') && (
                    <small id="erro-endereco" className={p.erro}>{erros.endereco}</small>
                  )}
                </label>

                <fieldset
                  className={p.campo}
                  aria-invalid={mostrarErro('bairro') ? 'true' : undefined}
                  aria-describedby={mostrarErro('bairro') ? 'erro-bairro' : undefined}
                >
                  <legend>
                    Bairro <span className={p.asterisco}>*</span>
                  </legend>
                  <div className={`${p.opcoes} ${mostrarErro('bairro') ? p.opcoesErro : ''}`}>
                    {BAIRROS_ENTREGA.map((b, i) => (
                      <label key={b} className={p.opcao}>
                        <input
                          id={`campo-bairro-${i}`}
                          type="radio"
                          name="bairro"
                          value={b}
                          checked={bairro === b}
                          onChange={() => setBairro(b)}
                          required
                        />
                        <span>📍 {b}</span>
                      </label>
                    ))}
                  </div>
                  {mostrarErro('bairro') && <small id="erro-bairro" className={p.erro}>{erros.bairro}</small>}
                </fieldset>

                <label className={p.campo} htmlFor="campo-referencia">
                  <span>
                    Ponto de referência <small>(opcional)</small>
                  </span>
                  <input
                    id="campo-referencia"
                    type="text"
                    value={referencia}
                    onChange={(e) => setReferencia(e.target.value)}
                    placeholder="Ex.: perto da padaria, casa de muro azul"
                    maxLength={160}
                  />
                </label>

                <label className={p.campo} htmlFor="campo-observacao">
                  <span>
                    Observação <small>(opcional)</small>
                  </span>
                  <textarea
                    id="campo-observacao"
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
                  Escolha seus sacolés
                </button>
              ) : !atingiuMinimo ? (
                <button type="button" className={p.enviar} disabled>
                  Faltam {formatarPreco(falta)} pro mínimo
                </button>
              ) : (
                <a
                  href={linkWhatsApp(mensagem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={p.enviar}
                  onClick={aoEnviar}
                >
                  <IconeChat /> Enviar pedido no WhatsApp
                </a>
              )}

              {tentouEnviar && !dadosOk && (
                <p className={p.erroGeral} role="alert">
                  Preencha nome, endereço e bairro pra gente poder entregar. 😉
                </p>
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
            <span className={p.barraMobileResumo}>
              <strong>{textoTotal}</strong>
              <small>
                {atingiuMinimo ? 'Pedido mínimo ok ✓' : `Faltam ${formatarPreco(falta)} pro mínimo`}
              </small>
            </span>
            <span className={p.barraMobileAcao}>Revisar e enviar ↓</span>
          </a>
        )}
      </div>
    </>
  );
}
