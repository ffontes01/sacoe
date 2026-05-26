import Head from 'next/head';
import styles from '../styles/Home.module.css';

// ============================================
// Olé Sacolé — Página Inicial
// Edite os links dos produtos em PRODUTOS abaixo
// ============================================

const PRODUTOS = [
  {
    nome: 'Sacolé de Manga',
    emoji: '🥭',
    descricao: 'Manga madurinha, doce na medida certa. Um verão tropical em cada mordida!',
    preco: 'R$ 5,00',
    link: 'https://marketplace.com/seu-produto-manga', // <-- substitua pelo seu link
  },
  {
    nome: 'Sacolé de Coco',
    emoji: '🥥',
    descricao: 'Coco fresquinho com leite cremoso. Pura brisa de praia gelada!',
    preco: 'R$ 5,00',
    link: 'https://marketplace.com/seu-produto-coco',
  },
  {
    nome: 'Sacolé de Maracujá',
    emoji: '🍋',
    descricao: 'Azedinho na medida, refrescante e perfeito pros dias quentes.',
    preco: 'R$ 4,50',
    link: 'https://marketplace.com/seu-produto-maracuja',
  },
  {
    nome: 'Sacolé de Limão',
    emoji: '🍈',
    descricao: 'Clássico que nunca falha. Geladinho que mata a sede de verdade!',
    preco: 'R$ 4,00',
    link: 'https://marketplace.com/seu-produto-limao',
  },
];

const SABORES_DESTAQUE = [
  { nome: 'Açaí com Leite Condensado', emoji: '🫐', tag: 'TOP VENDAS' },
  { nome: 'Morango Cremoso', emoji: '🍓', tag: 'NOVO' },
  { nome: 'Abacaxi com Hortelã', emoji: '🍍', tag: 'REFRESCANTE' },
  { nome: 'Chocolate Belga', emoji: '🍫', tag: 'PREMIUM' },
];

const PASSOS = [
  { numero: 1, icone: '🛒', titulo: 'Escolha seu sabor', texto: 'Navegue pelos nossos sacolés e escolha o que mais combina com você.' },
  { numero: 2, icone: '🔗', titulo: 'Clique no link', texto: 'Você será direcionado para o marketplace onde estamos disponíveis.' },
  { numero: 3, icone: '📦', titulo: 'Faça seu pedido', texto: 'Finalize a compra de forma rápida e segura no marketplace.' },
  { numero: 4, icone: '🏖️', titulo: 'Aproveite!', texto: 'Receba em casa e curta aquele verão geladinho com a família.' },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Olé Sacolé — Sabor de Verão Geladinho!</title>
        <meta name="description" content="Olé Sacolé: sacolés artesanais com sabor de praia. Encontre nossos sabores nos principais marketplaces." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:wght@400;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className={styles.page}>
        {/* ============== NAVBAR ============== */}
        <nav className={styles.navbar}>
          <div className={styles.logo}>
            {/* Coloque o arquivo em /public/logo.svg
                (o Next serve tudo de /public/ na raiz "/"). */}
            <img
              src="/logo.svg"
              alt="Olé Sacolé"
              className={styles.logoImg}
            />
          </div>
          <ul className={styles.navLinks}>
            <li><a href="#sobre">Sobre</a></li>
            <li><a href="#destaques">Sabores</a></li>
            <li><a href="#produtos">Produtos</a></li>
            <li><a href="#como-pedir">Como Pedir</a></li>
            <li><a href="#contato">Contato</a></li>
          </ul>
        </nav>

        {/* ============== HERO ============== */}
        <section className={styles.hero}>
          <div className={styles.solContainer} aria-hidden="true">
            <div className={styles.solRaios} />
            <div className={styles.sol} />
          </div>
          <div className={`${styles.nuvem} ${styles.nuvem1}`} aria-hidden="true" />
          <div className={`${styles.nuvem} ${styles.nuvem2}`} aria-hidden="true" />

          <div className={styles.heroContent}>
            <h1 className={styles.heroTitulo}>
              Sabor de <span>Verão</span><br />
              em cada Sacolé!
            </h1>
            <p className={styles.heroSubtitulo}>
              Geladinhos artesanais feitos com frutas de verdade e muito carinho.
              É o pedacinho de praia que você leva pra casa! 🌊☀️
            </p>
            <div className={styles.botoesHero}>
              <a href="#produtos" className={styles.btnPrimario}>
                Ver Sabores
              </a>
              <a href="#como-pedir" className={styles.btnSecundario}>
                Como Pedir 🛒
              </a>
            </div>
          </div>
        </section>

        {/* ============== SOBRE ============== */}
        <section id="sobre" className={`${styles.secao} ${styles.sobre}`}>
          <div className={styles.sobreGrid}>
            <div className={styles.sobreTexto}>
              <h2 className={styles.secaoTitulo}>
                Sobre a <span>Olé Sacolé</span>
              </h2>
              <p>
                Nascemos do amor pelo verão e por aquele momento mágico de
                tomar um sacolé geladinho na beira do mar. Cada um dos nossos
                sabores é feito artesanalmente, com frutas selecionadas e
                receitas de família.
              </p>
              <p>
                Acreditamos que felicidade tem gosto de fruta gelada — e é isso
                que queremos entregar em cada mordida! 🌞
              </p>
              <div className={styles.sobreStats}>
                <div className={styles.stat}>
                  <div className={styles.statNumero}>+20</div>
                  <div className={styles.statLabel}>Sabores</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumero}>100%</div>
                  <div className={styles.statLabel}>Natural</div>
                </div>
                <div className={styles.stat}>
                  <div className={styles.statNumero}>+5k</div>
                  <div className={styles.statLabel}>Clientes felizes</div>
                </div>
              </div>
            </div>
            <div className={styles.sobreVisual}>
              <div className={styles.circuloSobre} aria-hidden="true" />
            </div>
          </div>
        </section>

        {/* ============== SABORES EM DESTAQUE ============== */}
        <section id="destaques" className={`${styles.secao} ${styles.destaques}`}>
          <h2 className={styles.secaoTitulo}>
            Sabores em <span>Destaque</span>
          </h2>
          <p className={styles.secaoSubtitulo}>
            Os queridinhos do verão direto da nossa cozinha pra você!
          </p>
          <div className={styles.saboresGrid}>
            {SABORES_DESTAQUE.map((sabor, i) => (
              <div key={i} className={styles.saborCard}>
                <span className={styles.saborEmoji}>{sabor.emoji}</span>
                <h3 className={styles.saborNome}>{sabor.nome}</h3>
                <span className={styles.saborTag}>{sabor.tag}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ============== PRODUTOS ============== */}
        <section id="produtos" className={`${styles.secao} ${styles.produtos}`}>
          <h2 className={styles.secaoTitulo}>
            Nossos <span>Sacolés</span>
          </h2>
          <p className={styles.secaoSubtitulo}>
            Clique e compre direto no nosso marketplace 🛍️
          </p>
          <div className={styles.produtosGrid}>
            {PRODUTOS.map((produto, i) => (
              <article key={i} className={styles.produtoCard}>
                <div className={styles.produtoImagem} aria-hidden="true">
                  {produto.emoji}
                </div>
                <div className={styles.produtoInfo}>
                  <h3 className={styles.produtoNome}>{produto.nome}</h3>
                  <p className={styles.produtoDesc}>{produto.descricao}</p>
                  <div className={styles.produtoRodape}>
                    <span className={styles.produtoPreco}>{produto.preco}</span>
                    <a
                      href={produto.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.produtoBtn}
                    >
                      Comprar →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ============== COMO PEDIR ============== */}
        <section id="como-pedir" className={`${styles.secao} ${styles.comoPedir}`}>
          <h2 className={styles.secaoTitulo}>
            Como <span>Pedir</span>
          </h2>
          <p className={styles.secaoSubtitulo}>
            Em 4 passinhos simples seu sacolé chega na sua casa!
          </p>
          <div className={styles.passosGrid}>
            {PASSOS.map((passo) => (
              <div key={passo.numero} className={styles.passoCard}>
                <div className={styles.passoNumero}>{passo.numero}</div>
                <div className={styles.passoIcone}>{passo.icone}</div>
                <h3 className={styles.passoTitulo}>{passo.titulo}</h3>
                <p className={styles.passoTexto}>{passo.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============== CONTATO ============== */}
        <section id="contato" className={`${styles.secao} ${styles.contato}`}>
          <h2 className={styles.secaoTitulo}>
            Fale com a <span>gente!</span>
          </h2>
          <p className={styles.secaoSubtitulo}>
            Tá com vontade de um sacolé ou quer fazer uma encomenda especial?
            Manda mensagem pra gente nas redes sociais!
          </p>
          <div className={styles.redesSociais}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.redeBtn} aria-label="Instagram">📸</a>
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className={styles.redeBtn} aria-label="WhatsApp">💬</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.redeBtn} aria-label="Facebook">👍</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className={styles.redeBtn} aria-label="TikTok">🎵</a>
          </div>
          <a href="mailto:contato@olesacole.com.br" className={styles.contatoEmail}>
            📧 contato@olesacole.com.br
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
              <div className={styles.footerLogoArea}>Olé Sacolé</div>
              <p>O sabor de verão que cabe no bolso. Geladinho do jeitinho que você ama!</p>
            </div>
            <div className={styles.footerColuna}>
              <h4>Navegação</h4>
              <a href="#sobre">Sobre nós</a>
              <a href="#destaques">Sabores</a>
              <a href="#produtos">Produtos</a>
              <a href="#como-pedir">Como pedir</a>
            </div>
            <div className={styles.footerColuna}>
              <h4>Contato</h4>
              <p>📧 contato@olesacole.com.br</p>
              <p>📱 (00) 00000-0000</p>
              <p>📍 Brasil</p>
            </div>
            <div className={styles.footerColuna}>
              <h4>Siga a gente</h4>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">📸 Instagram</a>
              <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">🎵 TikTok</a>
            </div>
          </div>

          <div className={styles.copyright}>
            © {new Date().getFullYear()} Olé Sacolé — Feito com ☀️ e 🌊 para você
          </div>
        </footer>
      </div>
    </>
  );
}
