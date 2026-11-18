import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import styles from '../styles/Home.module.css';
import SacoleIcon from '../components/SacoleIcon';
import {
  IconeCamera,
  IconeChat,
  IconeEmail,
  IconeFechar,
  IconeLocal,
  IconeMais,
  IconeMenos,
  IconeMenu,
  IconeSacola,
} from '../components/Icones';
import { LINHAS, TOTAL_SABORES, formatarPreco, idSabor } from '../data/cardapio';
import {
  EMAIL,
  IFOOD_URL,
  INSTAGRAM_URL,
  LOCALIZACAO,
  SITE_URL,
  WHATSAPP_EXIBICAO,
  linkWhatsApp,
} from '../data/config';

// ============================================
// Olé Sacolé — Página Inicial
// Cardápio e preços: data/cardapio.js
// WhatsApp, iFood e redes: data/config.js
// ============================================

const NAV = [
  { href: '#sobre', label: 'Sobre' },
  { href: '#linhas', label: 'Linhas' },
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#como-pedir', label: 'Como Pedir' },
  { href: '#contato', label: 'Contato' },
];

const PASSOS = [
  { numero: 1, icone: '🍦', titulo: 'Escolha seus sabores', texto: 'Navegue pelas 4 linhas e toque no + pra montar seu pedido.' },
  { numero: 2, icone: '💬', titulo: 'Envie no WhatsApp', texto: 'A mensagem já vai prontinha, com os sabores e as quantidades.' },
  { numero: 3, icone: '🤝', titulo: 'Combine com a gente', texto: 'A gente confirma o pedido, o valor e a entrega ou retirada.' },
  { numero: 4, icone: '🏖️', titulo: 'Aproveite!', texto: 'Sacolé geladinho na mão. É verão o ano inteiro!' },
];

const MENSAGEM_GERAL = 'Olá, Olé Sacolé! 👋 Vim pelo site e quero fazer um pedido.';

// Lista "achatada" de todos os sabores, para montar o pedido
const SABORES = LINHAS.flatMap((linha) =>
  linha.sabores.map((sabor) => ({ id: idSabor(linha, sabor), linha, sabor }))
);

const CHAVE_PEDIDO = 'ole-sacole-pedido';

function plural(n, singular, pluralTexto) {
  return n === 1 ? singular : pluralTexto;
}

function montarMensagem(itens, totalQtd, totalValor) {
  const linhasPedido = itens.map(
    (i) => `• ${i.qtd}x ${i.sabor.nome} (linha ${i.linha.nome})`
  );
  const total =
    `Total: ${totalQtd} ${plural(totalQtd, 'sacolé', 'sacolés')}` +
    (totalValor != null ? ` — ${formatarPreco(totalValor)}` : '');

  return [
    'Olá, Olé Sacolé! 👋 Quero fazer um pedido:',
    '',
    ...linhasPedido,
    '',
    total,
    '',
    'Nome:',
    'Entrega ou retirada:',
  ].join('\n');
}

function varsLinha(linha) {
  return { '--cor-linha': linha.cor, '--cor-linha-clara': linha.corClara };
}

export default function Home() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [filtro, setFiltro] = useState('todas');
  const [pedido, setPedido] = useState({}); // { idDoSabor: quantidade }

  // Guarda o pedido no navegador, pra não perder se a pessoa recarregar a página
  useEffect(() => {
    try {
      const salvo = JSON.parse(window.localStorage.getItem(CHAVE_PEDIDO) || '{}');
      const validos = Object.fromEntries(
        Object.entries(salvo).filter(
          ([id, qtd]) => SABORES.some((s) => s.id === id) && Number.isInteger(qtd) && qtd > 0
        )
      );
      setPedido(validos);
    } catch (e) {
      /* sem armazenamento disponível — segue sem salvar */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CHAVE_PEDIDO, JSON.stringify(pedido));
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
          content={`Olé Sacolé: ${TOTAL_SABORES} sabores de sacolé artesanal nas linhas Raiz, Olé, Reserva e Fruta. Monte seu pedido e envie pelo WhatsApp.`}
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
        {/* ============== NAVBAR ============== */}
        <nav className={styles.navbar} aria-label="Navegação principal">
          <a href="#topo" className={styles.logo} aria-label="Olé Sacolé — início">
            <img src="/logo.svg" alt="Olé Sacolé" className={styles.logoImg} />
          </a>

          <ul className={`${styles.navLinks} ${menuAberto ? styles.navLinksAberto : ''}`} id="menu-principal">
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setMenuAberto(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.navAcoes}>
            <a href="#cardapio" className={styles.navPedir}>
              Pedir agora
            </a>
            <button
              type="button"
              className={styles.navToggle}
              aria-expanded={menuAberto}
              aria-controls="menu-principal"
              aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setMenuAberto((v) => !v)}
            >
              {menuAberto ? <IconeFechar /> : <IconeMenu />}
            </button>
          </div>
        </nav>

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
              <a href="#cardapio" className={styles.btnPrimario}>
                Ver Cardápio
              </a>
              <a
                href={linkWhatsApp(MENSAGEM_GERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnSecundario}
              >
                <IconeChat /> Pedir no WhatsApp
              </a>
            </div>
            <p className={styles.heroCanais}>
              {TOTAL_SABORES} sabores · 4 linhas · {IFOOD_URL ? 'WhatsApp e iFood' : 'Em breve no iFood'}
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
            Toque no <strong>+</strong> pra montar seu pedido e enviar direto no WhatsApp. 💬
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
                  Linha {linha.nome}
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
              <p>Pedidos e encomendas especiais.</p>
              <a
                href={linkWhatsApp(MENSAGEM_GERAL)}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.canalBtn}
              >
                Chamar no WhatsApp
              </a>
              <span className={styles.canalDetalhe}>{WHATSAPP_EXIBICAO}</span>
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

        {/* ============== MAR (final do body) ============== */}
        <div className={styles.mar} aria-hidden="true">
          <div className={`${styles.ondaMar} ${styles.ondaMar1}`} />
          <div className={`${styles.ondaMar} ${styles.ondaMar2}`} />
          <div className={`${styles.ondaMar} ${styles.ondaMar3}`} />
        </div>

        {/* ============== FOOTER (AREIA) ============== */}
        <footer className={styles.footer}>
          <div className={styles.footerConteudo}>
            <div className={styles.footerColuna}>
              <img src="/logo.svg" alt="Olé Sacolé" className={styles.footerLogoImg} />
              <p>O sabor do verão, direto pra você!</p>
            </div>
            <div className={styles.footerColuna}>
              <h4>Navegação</h4>
              {NAV.slice(0, 4).map((item) => (
                <a key={item.href} href={item.href}>{item.label}</a>
              ))}
            </div>
            <div className={styles.footerColuna}>
              <h4>Contato</h4>
              <a href={linkWhatsApp(MENSAGEM_GERAL)} target="_blank" rel="noopener noreferrer">
                💬 {WHATSAPP_EXIBICAO}
              </a>
              <a href={`mailto:${EMAIL}`}>📧 {EMAIL}</a>
              <p>📍 {LOCALIZACAO}</p>
            </div>
            <div className={styles.footerColuna}>
              <h4>Siga a gente</h4>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">📸 Instagram</a>
              <a href={linkWhatsApp(MENSAGEM_GERAL)} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
              {IFOOD_URL && (
                <a href={IFOOD_URL} target="_blank" rel="noopener noreferrer">🛵 iFood</a>
              )}
            </div>
          </div>

          <div className={styles.copyright}>
            © {new Date().getFullYear()} Olé Sacolé — Feito entre ☀️ e 🌊
          </div>
        </footer>

        {/* ============== PEDIDO / WHATSAPP FIXO ============== */}
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
            <button type="button" className={styles.barraLimpar} onClick={() => setPedido({})}>
              Limpar
            </button>
            <a
              href={linkWhatsApp(montarMensagem(itens, totalQtd, totalValor))}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.barraEnviar}
            >
              <IconeChat /> Enviar<span className={styles.textoLongo}> no WhatsApp</span>
            </a>
          </div>
        ) : (
          <a
            href={linkWhatsApp(MENSAGEM_GERAL)}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.whatsFlutuante}
            aria-label="Pedir pelo WhatsApp"
          >
            <IconeChat width={26} height={26} />
            <span>Pedir no WhatsApp</span>
          </a>
        )}
      </div>
    </>
  );
}
