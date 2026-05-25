import '../styles/globals.css';

// _app.js — Padrão do Next.js (Pages Router)
// Necessário para que o globals.css seja aplicado em todas as páginas.
export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
