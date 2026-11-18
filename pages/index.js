import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';
import Navbar from '../components/Navbar';
import Rodape from '../components/Rodape';
import SacoleIcon from '../components/SacoleIcon';
import {
  IconeCamera,
  IconeChat,
  IconeEmail,
  IconeLocal,
  IconeMais,
  IconeMenos,
  IconeSacola,
} from '../components/Icones';
import { LINHAS, PRECO_MINIMO, TOTAL_SABORES, formatarPreco, idSabor, tituloLinha } from '../data/cardapio';
import {
  BAIRROS_TEXTO,
  EMAIL,
  IFOOD_URL,
  INSTAGRAM_URL,
  MENSAGEM_GERAL,
  PEDIDO_MINIMO,
  SITE_URL,
  WHATSAPP_EXIBICAO,
  linkWhatsApp,
} from '../data/config';
import { plural, usePedido } from '../lib/pedido';

// ============================================
// Olé Sacolé — Página Inicial
// Cardápio e preços: data/cardapio.js
// WhatsApp, iFood e redes: data/config.js
// Página de pedido: pages/pedido.js
// ============================================

const PASSOS = [
  { numero: 1, icone: '🍦', titulo: 'Monte seu pedido', texto: 'Escolha os sabores e as quantidades na página de pedido.' },
  { numero: 2, icone: '💬', titulo: 'Envie no WhatsApp', texto: 'A mensagem já vai prontinha, com os sabores e as quantidades.' },
  { numero: 3, icone: '🛵', titulo: 'Receba em casa', texto: `A gente confirma o pedido e entrega no ${BAIRROS_TEXTO}.` },
  { numero: 4, icone: '🏖️', titulo: 'Aproveite!', texto: 'Sacolé geladinho na mão. É verão o ano inteiro!' },
];

function varsLinha(linha) {
  return { '--cor-linha': linha.cor, '--cor-linha-clara': linha.corClara };
}

export default function Home() {
  const [filtro, setFiltro] = useState('todas');
  const { pedido, itens, totalQtd, totalValor, alterar, limpar } = usePedido();

  // Troca o filtro e, se a pessoa já rolou pra dentro do cardápio,
  // volta pro começo dele (senão a lista "some" debaixo dela)
  function escolherFiltro(id) {
    setFiltro(id);
    const secao = document.getElementById('cardapio');
    if (secao && secao.getBoundingClientRect().top < 0) {
      requestAnimationFrame(() => secao.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }
  }

  const linhasVisiveis = filtro === 'todas' ? LINHAS : LINHAS.filter((l) => l.id === filtro);
  const temPedido = totalQtd > 0;

  return (
    <>
      <Head>
        <title>Olé Sacolé — Sacolés artesanais | Peça pelo WhatsApp</title>
        <meta
          name="description"
          content={`Olé Sacolé: ${TOTAL_SABORES} sabores de sacolé artesanal nas linhas Raiz, Olé, Reserva e da Fruta. Monte seu pedido e envie pelo WhatsApp.`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:site_name" content="Olé Sacolé" />
        <meta property="og:title" content="Olé Sacolé — Sabor do Verão em cada Sacolé!" />
        <meta
          property="og:description"
          content={`${TOTAL_SABORES} sabores de sacolé artesanal. Monte seu pedido no site e envie pelo WhatsApp.`}
        />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className={styles.page} data-pedido={temPedido ? 'sim' : 'nao'}>
        <Navbar paginaAtual="inicio" />

        {/* ============== HERO ============== */}
        <section className={styles.hero} id="topo">
          <div className={styles.solContainer} aria-hidden="true">
            <div className={styles.solRaios} />
          </div>
          <div className={`${styles.nuvem} ${styles.nuvem1}`} aria-hidden="true" />
          <div className={`${styles.nuvem} ${styles.nuvem2}`} aria-hidden="true" />

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitulo}>
              Sabor do <span>Verão</span>
              <br />
              em cada Sacolé!
            </h1>
            <p className={styles.heroSubtitulo}>
              Sacolés artesanais, cremosos e de fruta, feitos com muito carinho. 🌊☀️
            </p>
            <div className={styles.botoesHero}>
              <a href="/pedido" className={styles.btnPrimario}>
                Monte seu pedido
              </a>
              <a href="#cardapio" className={styles.btnSecundario}>
                Ver Cardápio
              </a>
            </div>
            <p className={styles.heroCanais}>
              {TOTAL_SABORES} sabores
              {PRECO_MINIMO != null && ` · a partir de ${formatarPreco(PRECO_MINIMO)}`}
              {' · '}
              {IFOOD_URL ? 'WhatsApp e iFood' : 'Em breve no iFood'}
            </p>
          </div>
        </section>

        {/* ============== SOBRE ============== */}
        <section id="sobre" className={`${styles.secao} ${styles.sobre}`}>
          <div className={styles.sobreGrid}>
            <div className={styles.sobreTexto}>
              <h2 className={styles.secaoTitulo}>
                Sobre a <span>Olé</span>
              </h2>
              <p>
                Nascemos entre as praias da Região dos Lagos, amamos praia e o Verão. Cada um
                dos nossos sabores é feito artesanalmente e com ingredientes selecionados.
              </p>
              <p>
                Acreditamos que felicidade tem gosto de sacolé gelado, e é isso que queremos
                entregar! 🌞 Vai um sacolé?
              </p>
              <div className={styles.sobreStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumero}>{TOTAL_SABORES}</div>
                  <div className={styles.statLabel}>Sabores</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumero}>{LINHAS.length}</div>
                  <div className={styles.statLabel}>Linhas</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumero}>+100</div>
                  <div className={styles.statLabel}>Clientes felizes</div>
                </div>
              </div>
            </div>
            <div className={styles.sobreVisual}>
              <picture>
                <source srcSet="/sacole.webp" type="image/webp" />
                <img src="/sacole.png" alt="Dois sacolés da Olé" className={styles.sacoleFoto} />
              </picture>
              <div className={styles.circuloSobre} aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ============== NOSSAS LINHAS ============== */}
        <section id="linhas" className={`${styles.secao} ${styles.linhasSecao}`}>
          <h2 className={styles.secaoTitulo}>
            Nossas <span>Linhas</span>
          </h2>
          <p className={styles.secaoSubtitulo}>
            {TOTAL_SABORES} sabores em 4 linhas. Tem pra todo gosto!
          </p>
          <div className={styles.linhasGrid}>
            {LINHAS.map((linha) => (
              <a
                key={linha.id}
                href="#cardapio"
                onClick={() => setFiltro(linha.id)}
                className={styles.linhaCard}
                style={varsLinha(linha)}
              >
                <div className={styles.linhaLeque} aria-hidden="true">
                  {linha.sabores.slice(0, 3).map((s) => (
                    <SacoleIcon key={s.nome} cor={s.cor} textura={s.textura} cor2={s.cor2} className={styles.linhaLequeItem} />
                  ))}
                </div>
                <div className={styles.linhaInfo}>
                  <span className={styles.linhaRotulo}>Linha</span>
                  <h3 className={styles.linhaNome}>
                    {linha.nome}
                    {linha.selo && <span className={styles.linhaSelo}>{linha.selo}</span>}
                  </h3>
                  <p className={styles.linhaSlogan}>{linha.slogan}</p>
                  <span className={styles.linhaVer}>
                    Ver {linha.sabores.length} sabores →
                  </span>
                  {linha.preco != null && (
                    <span className={styles.linhaCardPreco}>{formatarPreco(linha.preco)}</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ============== CARDÁPIO ============== */}
        <section id="cardapio" className={`${styles.secao} ${styles.cardapio}`}>
          <h2 className={styles.secaoTitulo}>
            Nosso <span>Cardápio</span>
          </h2>
          <p className={styles.secaoSubtitulo}>
            Toque no <strong>+</strong> pra ir separando os sabores, ou{' '}
            <a href="/pedido" className={styles.linkTexto}>monte seu pedido</a> de uma vez. 💬
          </p>

          <div className={styles.filtros} role="group" aria-label="Filtrar por linha">
            <button
              type="button"
              className={styles.filtroBtn}
              aria-pressed={filtro === 'todas'}
              onClick={() => escolherFiltro('todas')}
            >
              Todas
            </button>
            {LINHAS.map((linha) => (
              <button
                key={linha.id}
                type="button"
                className={styles.filtroBtn}
                style={varsLinha(linha)}
                aria-pressed={filtro === linha.id}
                onClick={() => escolherFiltro(linha.id)}
              >
                {linha.nome}
              </button>
            ))}
          </div>

          {linhasVisiveis.map((linha) => (
            <div key={linha.id} className={styles.linhaBloco} style={varsLinha(linha)}>
              <div className={styles.linhaCabecalho}>
                <h3 className={styles.linhaBlocoTitulo}>
                  {tituloLinha(linha)}
                  {linha.selo && <span className={styles.linhaSelo}>{linha.selo}</span>}
                </h3>
                <p className={styles.linhaBlocoSlogan}>{linha.slogan}</p>
                {linha.preco != null && (
                  <span className={styles.linhaPreco}>
                    {formatarPreco(linha.preco)} <small>cada</small>
                  </span>
                )}
              </div>

              <div className={styles.saboresGrid}>
                {linha.sabores.map((sabor) => {
                  const id = idSabor(linha, sabor);
                  const qtd = pedido[id] || 0;
                  return (
                    <article
                      key={id}
                      className={`${styles.saborCard} ${qtd > 0 ? styles.saborCardAtivo : ''}`}
                    >
                      <div className={styles.saborVisual}>
                        <SacoleIcon cor={sabor.cor} textura={sabor.textura} cor2={sabor.cor2} className={styles.saborIcone} />
                        {qtd > 0 && <span className={styles.saborBadge}>{qtd}</span>}
                      </div>
                      <div className={styles.saborInfo}>
                        <h4 className={styles.saborNome}>{sabor.nome}</h4>
                        <p className={styles.saborDesc}>{sabor.descricao}</p>
                        {qtd === 0 ? (
                          <button
                            type="button"
                            className={styles.btnAdicionar}
                            onClick={() => alterar(id, 1)}
                            aria-label={`Adicionar ${sabor.nome} ao pedido`}
                          >
                            <IconeMais width={18} height={18} /> Adicionar
                          </button>
                        ) : (
                          <div className={styles.stepper}>
                            <button
                              type="button"
                              onClick={() => alterar(id, -1)}
                              aria-label={`Tirar um ${sabor.nome}`}
                            >
                              <IconeMenos width={18} height={18} />
                            </button>
                            <span aria-live="polite" aria-label={`${qtd} no pedido`}>
                              {qtd}
                            </span>
                            <button
                              type="button"
                              onClick={() => alterar(id, 1)}
                              aria-label={`Adicionar mais um ${sabor.nome}`}
                            >
                              <IconeMais width={18} height={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}

          <div className={styles.cardapioCta}>
            <a href="/pedido" className={styles.btnPrimario}>
              Monte seu pedido →
            </a>
          </div>
        </section>

        {/* ============== COMO PEDIR ============== */}
        <section id="como-pedir" className={`${styles.secao} ${styles.comoPedir}`}>
          <h2 className={styles.secaoTitulo}>
            Como <span>Pedir</span>
          </h2>
          <p className={styles.secaoSubtitulo}>
            Em 4 passinhos o seu sacolé tá garantido!
          </p>
          <div className={styles.passosGrid}>
            {PASSOS.map((passo) => (
              <div key={passo.numero} className={styles.passoCard}>
                <div className={styles.passoNumero}>{passo.numero}</div>
                <div className={styles.passoIcone} aria-hidden="true">{passo.icone}</div>
                <h3 className={styles.passoTitulo}>{passo.titulo}</h3>
                <p className={styles.passoTexto}>{passo.texto}</p>
              </div>
            ))}
          </div>

          <div className={styles.canais}>
            <div className={`${styles.canalCard} ${styles.canalWhats}`}>
              <div className={styles.canalIcone}><IconeChat width={28} height={28} /></div>
              <h3>WhatsApp</h3>
              <p>
                Pedido mínimo {formatarPreco(PEDIDO_MINIMO)}.
                <br />
                Entrega no {BAIRROS_TEXTO}.
              </p>
              <a href="/pedido" className={styles.canalBtn}>
                Monte seu pedido
              </a>
              <a
                href={linkWhatsApp(MENSAGEM_GERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.canalDetalhe}
              >
                ou chame no {WHATSAPP_EXIBICAO}
              </a>
            </div>

            <div className={`${styles.canalCard} ${styles.canalIfood}`}>
              <div className={styles.canalIcone}><IconeSacola width={28} height={28} /></div>
              <h3>iFood</h3>
              {IFOOD_URL ? (
                <>
                  <p>Peça pelo app e receba em casa.</p>
                  <a href={IFOOD_URL} target="_blank" rel="noopener noreferrer" className={styles.canalBtn}>
                    Pedir no iFood
                  </a>
                </>
              ) : (
                <>
                  <p>Nossa loja no iFood está chegando!</p>
                  <span className={styles.emBreve}>Em breve</span>
                </>
              )}
            </div>

            <div className={`${styles.canalCard} ${styles.canalPraia}`}>
              <div className={styles.canalIcone}><IconeLocal width={28} height={28} /></div>
              <h3>Na praia</h3>
              <p>Também vendemos direto na areia. ☀️</p>
            </div>
          </div>
        </section>

        {/* ============== CONTATO ============== */}
        <section id="contato" className={`${styles.secao} ${styles.contato}`}>
          <h2 className={styles.secaoTitulo}>
            Fale com a <span>gente!</span>
          </h2>
          <p className={styles.secaoSubtitulo}>
            Tá com vontade de um sacolé ou quer fazer uma encomenda especial? Chama a gente!
          </p>
          <div className={styles.redesSociais}>
            <a
              href={linkWhatsApp(MENSAGEM_GERAL)}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.redeBtn} ${styles.redeWhats}`}
            >
              <IconeChat /> WhatsApp
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.redeBtn}>
              <IconeCamera /> Instagram
            </a>
            {IFOOD_URL && (
              <a href={IFOOD_URL} target="_blank" rel="noopener noreferrer" className={styles.redeBtn}>
                <IconeSacola /> iFood
              </a>
            )}
          </div>
          <a href={`mailto:${EMAIL}`} className={styles.contatoEmail}>
            <IconeEmail /> {EMAIL}
          </a>
        </section>

        <Rodape />

        {/* ============== PEDIDO EM ANDAMENTO / WHATSAPP FIXO ============== */}
        {temPedido ? (
          <div className={styles.barraPedido} role="region" aria-label="Seu pedido">
            <div className={styles.barraResumo}>
              <strong>
                {totalQtd} {plural(totalQtd, 'sacolé', 'sacolés')}
              </strong>
              <span>
                {totalValor != null
                  ? formatarPreco(totalValor)
                  : `${itens.length} ${plural(itens.length, 'sabor', 'sabores')}`}
              </span>
            </div>
            <button type="button" className={styles.barraLimpar} onClick={limpar}>
              Limpar
            </button>
            <a href="/pedido" className={styles.barraEnviar}>
              Finalizar<span className={styles.textoLongo}> pedido</span> →
            </a>
          </div>
        ) : (
          <a
            href={linkWhatsApp(MENSAGEM_GERAL)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsFlutuante}
            aria-label="Falar no WhatsApp"
          >
            <IconeChat width={26} height={26} />
            <span>Fale no WhatsApp</span>
          </a>
        )}
      </div>
    </>
  );
}
