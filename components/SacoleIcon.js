import { useId } from 'react';

// Desenho de sacolé em SVG, colorido por sabor.
// Assim cada sabor tem sua "cara" sem precisar de foto.

function misturar(hex, alvo, t) {
  const a = hex.replace('#', '');
  const b = alvo.replace('#', '');
  const canal = (s, i) => parseInt(s.slice(i, i + 2), 16);
  const m = (i) => Math.round(canal(a, i) + (canal(b, i) - canal(a, i)) * t);
  return `#${[0, 2, 4].map((i) => m(i).toString(16).padStart(2, '0')).join('')}`;
}

const escurecer = (hex, t) => misturar(hex, '#000000', t);
const clarear = (hex, t) => misturar(hex, '#ffffff', t);

// Posições fixas (determinísticas) para as texturas
const PONTOS = [
  [36, 58], [58, 50], [66, 74], [44, 84], [57, 98], [34, 110], [65, 120],
  [47, 132], [37, 150], [61, 152], [51, 68], [42, 168], [58, 176], [69, 98],
];

const CORPO =
  'M24 40 C24 33 29 30 36 30 L64 30 C71 30 76 33 76 40 L76 160 C76 181 66 192 50 192 C34 192 24 181 24 160 Z';

function Textura({ tipo, cor }) {
  switch (tipo) {
    case 'sementes':
      return PONTOS.map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="2.4" ry="3.4" fill={cor} opacity="0.85"
          transform={`rotate(${(i * 47) % 180} ${x} ${y})`} />
      ));
    case 'pontos':
      return PONTOS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.8 : 2} fill={cor} opacity="0.8" />
      ));
    case 'granulado':
      return PONTOS.concat(PONTOS.map(([x, y]) => [x + 6, y + 9])).map(([x, y], i) => (
        <rect key={i} x={x - 3} y={y - 1} width="6" height="2.2" rx="1.1" fill={cor}
          transform={`rotate(${(i * 61) % 180} ${x} ${y})`} />
      ));
    case 'pedacos':
      return PONTOS.filter((_, i) => i % 2 === 0).map(([x, y], i) => (
        <rect key={i} x={x - 4} y={y - 4} width="8" height="7" rx="2.2" fill={cor} opacity="0.92"
          transform={`rotate(${(i * 37) % 90} ${x} ${y})`} />
      ));
    case 'nutella':
      return (
        <>
          <path d="M52 34 C72 54 30 72 50 96 C70 120 28 136 48 160 C58 172 46 184 50 196"
            fill="none" stroke={cor} strokeWidth="10" strokeLinecap="round" opacity="0.9" />
          <path d="M52 34 C72 54 30 72 50 96 C70 120 28 136 48 160"
            fill="none" stroke={clarear(cor, 0.35)} strokeWidth="2.5" strokeLinecap="round"
            opacity="0.6" transform="translate(-2 -2)" />
        </>
      );
    default:
      return null;
  }
}

export default function SacoleIcon({ cor, textura, cor2, className }) {
  const uid = useId().replace(/:/g, '');
  const grad = `g${uid}`;
  const clip = `c${uid}`;

  return (
    <svg viewBox="0 0 100 200" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={escurecer(cor, 0.16)} />
          <stop offset="0.35" stopColor={cor} />
          <stop offset="0.7" stopColor={clarear(cor, 0.08)} />
          <stop offset="1" stopColor={escurecer(cor, 0.2)} />
        </linearGradient>
        <clipPath id={clip}>
          <path d={CORPO} />
        </clipPath>
      </defs>

      {/* Corpo do sacolé */}
      <path d={CORPO} fill={`url(#${grad})`} />

      {/* Textura (sementes, Nutella, pedaços...) recortada no formato do saquinho */}
      <g clipPath={`url(#${clip})`}>
        <Textura tipo={textura} cor={cor2} />
        {/* Gelinho: leve névoa clara no topo */}
        <rect x="0" y="28" width="100" height="26" fill="#fff" opacity="0.18" />
      </g>

      {/* Plástico: contorno e brilho */}
      <path d={CORPO} fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="2" />
      <rect x="31" y="44" width="7" height="112" rx="3.5" fill="#fff" opacity="0.5" />
      <rect x="31" y="162" width="7" height="9" rx="3.5" fill="#fff" opacity="0.35" />

      {/* Nó e "orelhinhas" do saquinho */}
      <path d="M40 31 L60 31 L56 21 L44 21 Z" fill="#fff" opacity="0.75" />
      <path d="M45 21 C38 15 29 9 21 5 C30 1 42 6 49 17 Z" fill="#fff" opacity="0.8"
        stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
      <path d="M55 21 C62 15 71 9 79 5 C70 1 58 6 51 17 Z" fill="#fff" opacity="0.8"
        stroke="#fff" strokeWidth="1" strokeLinejoin="round" />
      <rect x="42" y="16" width="16" height="7" rx="3.5" fill="#fff" />
    </svg>
  );
}
