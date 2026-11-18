import styles from '../styles/Home.module.css';
import {
  EMAIL,
  IFOOD_URL,
  INSTAGRAM_URL,
  LOCALIZACAO,
  MENSAGEM_GERAL,
  WHATSAPP_EXIBICAO,
  linkWhatsApp,
} from '../data/config';

const LINKS_RODAPE = [
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#cardapio', label: 'Cardápio' },
  { href: '/pedido', label: 'Monte seu pedido' },
  { href: '/#como-pedir', label: 'Como Pedir' },
];

// Mar animado + rodapé de areia, usados em todas as páginas
export default function Rodape() {
  return (
    <>
      <div className={styles.mar} aria-hidden="true">
        <div className={`${styles.ondaMar} ${styles.ondaMar1}`} />
        <div className={`${styles.ondaMar} ${styles.ondaMar2}`} />
        <div className={`${styles.ondaMar} ${styles.ondaMar3}`} />
      </div>

      {/* Beira da praia: faixas de mar onduladas, espuma e areia */}
      <div className={styles.beira} aria-hidden="true" />

      <footer className={styles.footer}>
        <div className={styles.footerConteudo}>
          <div className={styles.footerColuna}>
            <img src="/logo.svg" alt="Olé Sacolé" className={styles.footerLogoImg} />
            <p>O sabor do verão, direto pra você!</p>
          </div>
          <div className={styles.footerColuna}>
            <h4>Navegação</h4>
            {LINKS_RODAPE.map((item) => (
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
    </>
  );
}
