import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import styles from '../styles/Home.module.css'

const products = [
  {
    id: 1,
    name: 'Sacolé de Maracujá',
    description: 'Sabor tropical intenso, gelado e refrescante. O clássico irresistível!',
    price: 'R$ 5,00',
    emoji: '🟡',
    color: '#FFD166',
    link: 'https://www.mercadolivre.com.br',
    badge: '⭐ Mais Vendido',
  },
  {
    id: 2,
    name: 'Sacolé de Morango',
    description: 'Cremoso, docinho e com pedaços de morango natural. Um amor!',
    price: 'R$ 5,00',
    emoji: '🔴',
    color: '#FF6B8A',
    link: 'https://www.mercadolivre.com.br',
    badge: '❤️ Favorito',
  },
  {
    id: 3,
    name: 'Sacolé de Coco',
    description: 'Sabor de praia num só gole! Coco fresco e cremoso.',
    price: 'R$ 5,00',
    emoji: '⚪',
    color: '#A8DADC',
    link: 'https://www.mercadolivre.com.br',
    badge: '🌴 Praia',
  },
  {
    id: 4,
    name: 'Sacolé de Açaí',
    description: 'A potência do açaí em forma de gelinho. Energia e sabor juntos!',
    price: 'R$ 6,00',
    emoji: '🟣',
    color: '#B5838D',
    link: 'https://www.mercadolivre.com.br',
    badge: '💜 Premium',
  },
  {
    id: 5,
    name: 'Sacolé de Limão',
    description: 'Azedinho, fresquinho e com aquela pitadinha de sal. Perfeito!',
    price: 'R$ 5,00',
    emoji: '🟢',
    color: '#A8E6CF',
    link: 'https://www.mercadolivre.com.br',
    badge: '⚡ Novo',
  },
  {
    id: 6,
    name: 'Sacolé de Tamarindo',
    description: 'O sabor que lembra a infância! Agridoce e viciante.',
    price: 'R$ 5,00',
    emoji: '🟤',
    color: '#D4A373',
    link: 'https://www.mercadolivre.com.br',
    badge: '🌟 Nostalgia',
  },
]

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [sunRays, setSunRays] = useState(false)
  const heroRef = useRef(null)

  useEffect(() => {
    setSunRays(true)
    const handleScroll = () => {
      const sections = ['home', 'produtos', 'sobre', 'contato']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 80 && rect.bottom >= 80) {
            setActiveSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    setMenuOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Head>
        <title>Olé Sacolé — Fresquinho, Gelado e Tropical!</title>
        <meta name="description" content="Os melhores sacolés artesanais com sabores tropicais. Frescos, gelados e feitos com amor!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧊</text></svg>" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet" />
      </Head>

      {/* NAVBAR */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <button className={styles.logo} onClick={() => scrollTo('home')}>
            <span className={styles.logoIcon}>☀️</span>
            <span className={styles.logoText}>Olé Sacolé</span>
          </button>

          <ul className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ''}`}>
            {['home', 'produtos', 'sobre', 'contato'].map((s) => (
              <li key={s}>
                <button
                  onClick={() => scrollTo(s)}
                  className={`${styles.navLink} ${activeSection === s ? styles.navLinkActive : ''}`}
                >
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              </li>
            ))}
          </ul>

          <button className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
            <span className={menuOpen ? styles.barOpen1 : styles.bar}></span>
            <span className={menuOpen ? styles.barOpen2 : styles.bar}></span>
            <span className={menuOpen ? styles.barOpen3 : styles.bar}></span>
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className={styles.hero} ref={heroRef}>
        <div className={`${styles.sunWrapper} ${sunRays ? styles.sunVisible : ''}`}>
          <div className={styles.sunGlow}></div>
          <div className={styles.sun}>
            {[...Array(12)].map((_, i) => (
              <div key={i} className={styles.ray} style={{ transform: `rotate(${i * 30}deg)` }}></div>
            ))}
            <div className={styles.sunFace}>☀️</div>
          </div>
        </div>

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>🌊 Feito com amor à beira-mar</div>
          <h1 className={styles.heroTitle}>
            Olé <span className={styles.heroAccent}>Sacolé!</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Os sacolés mais gostosos e refrescantes do Brasil.<br />
            Sabores tropicais que fazem você sentir o verão em cada gole! 🧊
          </p>
          <div className={styles.heroCtas}>
            <button className={styles.ctaPrimary} onClick={() => scrollTo('produtos')}>
              🛒 Ver Produtos
            </button>
            <button className={styles.ctaSecondary} onClick={() => scrollTo('sobre')}>
              Conheça a gente
            </button>
          </div>
        </div>

        {/* Floating popsicles */}
        <div className={styles.floatingItems}>
          {['🧊', '🍓', '🥭', '🌴', '🍋', '🥥'].map((emoji, i) => (
            <span key={i} className={styles.floatingItem} style={{ '--delay': `${i * 0.8}s`, '--x': `${10 + i * 15}%` }}>
              {emoji}
            </span>
          ))}
        </div>

        {/* Hero waves */}
        <div className={styles.heroWaves}>
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z" fill="rgba(255,255,255,0.15)" />
          </svg>
        </div>
      </section>

      {/* OCEAN TRANSITION */}
      <div className={styles.oceanSection}>
        <div className={styles.wavesContainer}>
          <svg className={styles.wave1} viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z" fill="var(--ocean-mid)" />
          </svg>
          <svg className={styles.wave2} viewBox="0 0 1440 80" preserveAspectRatio="none">
            <path d="M0,40 C180,0 360,80 720,40 C900,20 1260,70 1440,40 L1440,80 L0,80 Z" fill="var(--ocean-light)" />
          </svg>
        </div>
      </div>

      {/* PRODUTOS */}
      <section id="produtos" className={styles.productsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>🧊 Nosso Cardápio</span>
            <h2 className={styles.sectionTitle}>Escolha o seu favorito!</h2>
            <p className={styles.sectionSubtitle}>
              Clique em "Comprar" para adquirir pelo nosso marketplace. Rápido, fácil e seguro!
            </p>
          </div>

          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* SOBRE NÓS */}
      <section id="sobre" className={styles.aboutSection}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutIllustration}>
              <div className={styles.bigEmoji}>🌅</div>
              <div className={styles.aboutBubbles}>
                <span>🧊</span>
                <span>☀️</span>
                <span>🌊</span>
                <span>🌴</span>
              </div>
            </div>
            <div className={styles.aboutText}>
              <span className={styles.sectionTag}>🌊 Nossa História</span>
              <h2 className={styles.sectionTitle}>Feito com amor<br />à beira da praia</h2>
              <p>
                A <strong>Olé Sacolé</strong> nasceu do desejo de levar o verdadeiro sabor do verão brasileiro
                para todo lugar. Começamos numa praia ensolarada com uma receita de família e muito amor
                pelo que fazemos.
              </p>
              <p>
                Cada sacolé é feito artesanalmente com ingredientes frescos e naturais,
                sem conservantes e com aquele gostinho de infância que faz a gente sorrir. 🌞
              </p>
              <div className={styles.aboutStats}>
                <div className={styles.stat}>
                  <strong>+10</strong>
                  <span>Sabores</span>
                </div>
                <div className={styles.stat}>
                  <strong>+500</strong>
                  <span>Clientes felizes</span>
                </div>
                <div className={styles.stat}>
                  <strong>100%</strong>
                  <span>Natural</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section id="contato" className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>💬 Fale Conosco</span>
            <h2 className={styles.sectionTitle}>Adoramos ouvir você!</h2>
            <p className={styles.sectionSubtitle}>
              Dúvidas, sugestões de sabores ou apenas quer dizer oi? A gente responde rapidinho! 🤙
            </p>
          </div>

          <div className={styles.contactGrid}>
            <ContactCard icon="📱" title="WhatsApp" desc="(11) 99999-9999" link="https://wa.me/5511999999999" />
            <ContactCard icon="📸" title="Instagram" desc="@olesacole" link="https://instagram.com" />
            <ContactCard icon="🛒" title="Marketplace" desc="Loja Oficial" link="https://www.mercadolivre.com.br" />
            <ContactCard icon="📧" title="E-mail" desc="oi@olesacole.com.br" link="mailto:oi@olesacole.com.br" />
          </div>
        </div>
      </section>

      {/* FOOTER COM PRAIA */}
      <footer className={styles.footer}>
        {/* Ondas do mar */}
        <div className={styles.footerOcean}>
          <div className={styles.footerWaveWrapper}>
            {/* Onda traseira — azul profundo */}
            <svg className={styles.footerWave} viewBox="0 0 1440 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#012A5E" />
                  <stop offset="40%"  stopColor="#023E8A" />
                  <stop offset="75%"  stopColor="#01337A" />
                  <stop offset="100%" stopColor="#012A5E" />
                </linearGradient>
              </defs>
              <path
                d="M0,50 C180,90 360,10 540,50 C720,90 900,10 1080,50 C1260,90 1380,30 1440,50 L1440,100 L0,100 Z"
                fill="url(#waveGrad1)"
              />
            </svg>

            {/* Onda do meio — azul médio */}
            <svg className={styles.footerWave2} viewBox="0 0 1440 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#0077B6" />
                  <stop offset="35%"  stopColor="#0096C7" />
                  <stop offset="65%"  stopColor="#0077B6" />
                  <stop offset="100%" stopColor="#005F92" />
                </linearGradient>
              </defs>
              <path
                d="M0,60 C200,20 400,90 720,60 C900,40 1200,80 1440,60 L1440,100 L0,100 Z"
                fill="url(#waveGrad2)"
              />
            </svg>

            {/* Onda da frente — azul claro, beira da areia */}
            <svg className={styles.footerWave3} viewBox="0 0 1440 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#00B4D8" />
                  <stop offset="30%"  stopColor="#48CAE4" />
                  <stop offset="60%"  stopColor="#00B4D8" />
                  <stop offset="100%" stopColor="#0096C7" />
                </linearGradient>
              </defs>
              <path
                d="M0,70 C300,30 600,90 900,70 C1050,60 1300,50 1440,70 L1440,100 L0,100 Z"
                fill="url(#waveGrad3)"
              />
            </svg>
          </div>

          {/* Elementos do mar */}
          <div className={styles.seaElements}>
            {['🐠', '🦀', '🐚', '⭐', '🦞', '🐟'].map((el, i) => (
              <span key={i} className={styles.seaEl} style={{ '--fi': i }}>{el}</span>
            ))}
          </div>
        </div>

        {/* Areia */}
        <div className={styles.footerSand}>
          <div className={styles.sandContent}>
            <div className={styles.footerBrand}>
              <span className={styles.footerLogo}>☀️ Olé Sacolé</span>
              <p>Gelado, gostoso e tropical!</p>
            </div>

            <div className={styles.footerLinks}>
              <button onClick={() => scrollTo('home')}>Início</button>
              <button onClick={() => scrollTo('produtos')}>Produtos</button>
              <button onClick={() => scrollTo('sobre')}>Sobre</button>
              <button onClick={() => scrollTo('contato')}>Contato</button>
            </div>

            <div className={styles.footerSocial}>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">📱</a>
              <a href="https://www.mercadolivre.com.br" target="_blank" rel="noopener noreferrer" aria-label="Marketplace">🛒</a>
            </div>
          </div>

          {/* Elementos na areia */}
          <div className={styles.sandDecor}>
            <span className={styles.sandShell}>🐚</span>
            <span className={styles.sandShell2}>⭐</span>
            <span className={styles.sandUmbrella}>⛱️</span>
            <span className={styles.sandFootprint}>👣</span>
          </div>

          <p className={styles.copyright}>
            © 2024 Olé Sacolé — Feito com ☀️ e 🌊 no Brasil
          </p>
        </div>
      </footer>
    </>
  )
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`${styles.productCard} ${hovered ? styles.productCardHovered : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ '--card-color': product.color }}
    >
      {product.badge && <span className={styles.productBadge}>{product.badge}</span>}
      <div className={styles.productEmoji}>
        <div className={styles.emojiCircle} style={{ background: product.color }}>
          🧊
        </div>
        <div className={styles.productWave}></div>
      </div>
      <div className={styles.productInfo}>
        <h3 className={styles.productName}>{product.name}</h3>
        <p className={styles.productDesc}>{product.description}</p>
        <div className={styles.productFooter}>
          <span className={styles.productPrice}>{product.price}</span>
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.buyBtn}
          >
            Comprar 🛒
          </a>
        </div>
      </div>
    </div>
  )
}

function ContactCard({ icon, title, desc, link }) {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className={styles.contactCard}>
      <span className={styles.contactIcon}>{icon}</span>
      <strong className={styles.contactTitle}>{title}</strong>
      <span className={styles.contactDesc}>{desc}</span>
    </a>
  )
}
