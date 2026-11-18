import { useState } from 'react';
import styles from '../styles/Home.module.css';
import { IconeFechar, IconeMenu } from './Icones';

// Barra superior usada em todas as páginas.
// Os links usam "/#secao" para funcionar também fora da página inicial.
export const NAV = [
  { href: '/#sobre', label: 'Sobre' },
  { href: '/#linhas', label: 'Linhas' },
  { href: '/#cardapio', label: 'Cardápio' },
  { href: '/#como-pedir', label: 'Como Pedir' },
  { href: '/#contato', label: 'Contato' },
];

export default function Navbar({ paginaAtual = 'inicio' }) {
  const [menuAberto, setMenuAberto] = useState(false);
  const fechar = () => setMenuAberto(false);
  const naPaginaPedido = paginaAtual === 'pedido';

  return (
    <nav className={styles.navbar} aria-label="Navegação principal">
      <a href="/" className={styles.logo} aria-label="Olé Sacolé — página inicial">
        <img src="/logo.svg" alt="Olé Sacolé" className={styles.logoImg} />
      </a>

      <ul className={`${styles.navLinks} ${menuAberto ? styles.navLinksAberto : ''}`} id="menu-principal">
        {NAV.map((item) => (
          <li key={item.href}>
            <a href={item.href} onClick={fechar}>
              {item.label}
            </a>
          </li>
        ))}
        <li className={styles.navSoMenu}>
          <a href="/pedido" onClick={fechar} aria-current={naPaginaPedido ? 'page' : undefined}>
            Monte seu pedido
          </a>
        </li>
      </ul>

      <div className={styles.navAcoes}>
        <a
          href="/pedido"
          className={`${styles.navPedir} ${naPaginaPedido ? styles.navPedirAtual : ''}`}
          aria-current={naPaginaPedido ? 'page' : undefined}
        >
          <span className={styles.textoLongo}>Monte seu pedido</span>
          <span className={styles.textoCurto}>Fazer pedido</span>
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
  );
}
