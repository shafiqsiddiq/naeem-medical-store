// Illustrated medicine packs (SVG). Brand text is fitted with textLength so it never overflows.
const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16);
  const c = (v) => Math.max(0, Math.min(255, v + amt));
  const r = c(n >> 16), g = c((n >> 8) & 255), b = c(n & 255);
  return `rgb(${r},${g},${b})`;
};

function Brand({ x, y, name, size = 9, color = "#111827", max = 56, weight = 800 }) {
  const t = name.split(/[ /']/)[0].toUpperCase();
  const len = Math.min(max, Math.max(18, t.length * size * 0.62));
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fontWeight={weight} fill={color} textLength={len} lengthAdjust="spacingAndGlyphs" fontFamily="Poppins, Arial, sans-serif">{t}</text>
  );
}

const Cross = ({ x, y, s = 1, color }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <rect x="-2" y="-7" width="4" height="14" rx="1.2" fill={color} />
    <rect x="-7" y="-2" width="14" height="4" rx="1.2" fill={color} />
  </g>
);

export default function Pack({ form, color, name }) {
  const dark = shade(color, -55);
  const light = shade(color, 55);
  const shapes = {
    strip: (
      <g>
        <rect x="12" y="24" width="96" height="74" rx="10" fill="url(#foil)" stroke="#fff" strokeWidth="1.5" />
        {[0, 1, 2, 3].map((c) => [0, 1].map((r) => (
          <g key={`${c}${r}`}>
            <rect x={17 + c * 22} y={29 + r * 24} width="19" height="21" rx="9.5" fill="#fff" opacity=".55" />
            <ellipse cx={26.5 + c * 22} cy={39.5 + r * 24} rx="6.2" ry="8" fill={color} />
            <ellipse cx={24.5 + c * 22} cy={35.5 + r * 24} rx="2" ry="3" fill="#fff" opacity=".55" />
          </g>
        )))}
        <rect x="12" y="79" width="96" height="19" rx="0" fill={color} opacity=".95" />
        <rect x="12" y="88" width="96" height="10" rx="0" fill={dark} opacity=".5" />
        <Brand x={60} y={92} name={name} size={9} color="#fff" max={64} />
      </g>
    ),
    syrup: (
      <g>
        <rect x="47" y="10" width="26" height="15" rx="3" fill="#1f2937" />
        {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={50 + i * 5} y="12" width="1.4" height="11" fill="#fff" opacity=".18" />)}
        <rect x="51" y="25" width="18" height="10" fill="#cbd5e1" opacity=".7" />
        <path d="M51 34 Q34 40 34 56 V98 Q34 108 44 108 H76 Q86 108 86 98 V56 Q86 40 69 34 Z" fill={color} />
        <path d="M51 34 Q34 40 34 56 V98 Q34 108 44 108 H76 Q86 108 86 98 V56 Q86 40 69 34 Z" fill="url(#glass)" />
        <rect x="34" y="54" width="52" height="40" fill="#fff" />
        <rect x="34" y="54" width="52" height="8" fill={color} />
        <rect x="34" y="86" width="52" height="8" fill={dark} />
        <Cross x={46} y={74} s={0.9} color={color} />
        <Brand x={66} y={76} name={name} size={9} max={34} />
        <rect x="40" y="40" width="4" height="60" rx="2" fill="#fff" opacity=".4" />
      </g>
    ),
    bottle: (
      <g>
        <rect x="32" y="14" width="56" height="20" rx="6" fill={dark} />
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => <rect key={i} x={36 + i * 6.5} y="16" width="1.4" height="16" fill="#fff" opacity=".2" />)}
        <path d="M36 34 H84 Q90 34 90 42 V100 Q90 108 82 108 H38 Q30 108 30 100 V42 Q30 34 36 34 Z" fill={color} />
        <path d="M36 34 H84 Q90 34 90 42 V100 Q90 108 82 108 H38 Q30 108 30 100 V42 Q30 34 36 34 Z" fill="url(#glass)" />
        <rect x="30" y="50" width="60" height="44" fill="#fff" />
        <rect x="30" y="50" width="60" height="9" fill={color} />
        <rect x="30" y="85" width="60" height="9" fill={dark} />
        <Cross x={44} y={72} s={0.9} color={color} />
        <Brand x={68} y={74} name={name} size={10} max={38} />
        <rect x="36" y="38" width="4" height="64" rx="2" fill="#fff" opacity=".4" />
      </g>
    ),
    box: (
      <g>
        <polygon points="22,34 84,34 98,22 36,22" fill={light} />
        <rect x="22" y="34" width="62" height="68" fill={color} />
        <polygon points="84,34 98,22 98,88 84,102" fill={dark} />
        <rect x="22" y="34" width="62" height="68" fill="url(#shine)" />
        <rect x="22" y="48" width="62" height="30" fill="#fff" opacity=".96" />
        <rect x="22" y="48" width="62" height="4" fill={dark} />
        <Cross x={34} y={63} s={0.85} color={color} />
        <Brand x={59} y={66} name={name} size={9.5} max={38} />
        <rect x="22" y="84" width="62" height="3" fill="#fff" opacity=".6" />
        <circle cx="30" cy="94" r="3" fill="#fff" opacity=".8" /><circle cx="40" cy="94" r="3" fill="#fff" opacity=".6" />
      </g>
    ),
    sachet: (
      <g>
        <path d="M26 24 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 V100 l-4 5 l-4 -5 l-4 5 l-4 -5 l-4 5 l-4 -5 l-4 5 l-4 -5 l-4 5 l-4 -5 l-4 5 l-4 -5 l-4 5 Z" fill={color} />
        <path d="M26 24 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 l4 -5 l4 5 V100 l-4 5 l-4 -5 l-4 5 l-4 -5 l-4 5 l-4 -5 l-4 5 l-4 -5 l-4 5 l-4 -5 l-4 5 l-4 -5 l-4 5 Z" fill="url(#shine)" />
        <path d="M26 70 Q43 58 60 70 T94 70 V100 H26 Z" fill="#fff" opacity=".22" />
        <circle cx="60" cy="46" r="13" fill="#fff" opacity=".95" />
        <path d="M60 37 q8 10 0 17 q-8 -7 0 -17 Z" fill={color} />
        <Brand x={60} y={86} name={name} size={11} color="#fff" max={56} />
      </g>
    ),
    lozenge: (
      <g>
        <polygon points="8,46 24,56 24,66 8,76" fill={dark} />
        <polygon points="112,46 96,56 96,66 112,76" fill={dark} />
        <rect x="20" y="40" width="80" height="42" rx="12" fill={color} />
        <rect x="20" y="40" width="80" height="42" rx="12" fill="url(#glass)" />
        <circle cx="30" cy="30" r="9" fill="#fde68a" /><circle cx="30" cy="30" r="4" fill="#fff" opacity=".7" />
        <circle cx="92" cy="94" r="9" fill="#fb923c" /><circle cx="92" cy="94" r="4" fill="#fff" opacity=".7" />
        <rect x="20" y="52" width="80" height="18" fill="#fff" opacity=".95" />
        <Brand x={60} y={65} name={name} size={11} color={dark} max={60} />
      </g>
    ),
    tin: (
      <g>
        <ellipse cx="60" cy="100" rx="34" ry="8" fill={dark} />
        <rect x="26" y="34" width="68" height="66" fill={color} />
        <ellipse cx="60" cy="34" rx="34" ry="8" fill={light} />
        <ellipse cx="60" cy="31" rx="34" ry="8" fill="#e5e7eb" />
        <rect x="26" y="34" width="68" height="66" fill="url(#cyl)" />
        <rect x="26" y="52" width="68" height="34" fill="#fff" opacity=".95" />
        <circle cx="42" cy="69" r="10" fill="#fde0c8" /><circle cx="39" cy="67" r="1.3" fill="#111827" /><circle cx="45" cy="67" r="1.3" fill="#111827" />
        <path d="M39 72 q3 3 6 0" stroke="#e11d48" strokeWidth="1.2" fill="none" />
        <Brand x={74} y={72} name={name} size={9.5} color={dark} max={30} />
      </g>
    ),
    diaper: (
      <g>
        <path d="M24 34 Q24 26 32 26 H46 Q50 32 60 32 T74 26 H88 Q96 26 96 34 V92 Q96 102 86 102 H34 Q24 102 24 92 Z" fill={color} />
        <path d="M24 34 Q24 26 32 26 H46 Q50 32 60 32 T74 26 H88 Q96 26 96 34 V92 Q96 102 86 102 H34 Q24 102 24 92 Z" fill="url(#shine)" />
        <circle cx="60" cy="60" r="17" fill="#fde0c8" />
        <circle cx="54" cy="58" r="1.8" fill="#111827" /><circle cx="66" cy="58" r="1.8" fill="#111827" />
        <path d="M54 66 q6 5 12 0" stroke="#e11d48" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <circle cx="49" cy="64" r="2.6" fill="#fda4af" opacity=".7" /><circle cx="71" cy="64" r="2.6" fill="#fda4af" opacity=".7" />
        <path d="M54 44 q6 -8 12 0" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <rect x="24" y="82" width="72" height="14" fill="#fff" opacity=".92" />
        <Brand x={60} y={92.5} name={name} size={9} color={dark} max={50} />
      </g>
    ),
    device: (
      <g transform="rotate(-18 60 60)">
        <rect x="46" y="10" width="28" height="86" rx="14" fill="#f8fafc" />
        <rect x="46" y="10" width="28" height="86" rx="14" fill="url(#glass)" />
        <rect x="51" y="24" width="18" height="22" rx="4" fill="#0f172a" />
        <text x="60" y="39" textAnchor="middle" fontSize="8" fontWeight="800" fill="#22d3ee" fontFamily="monospace">36.6</text>
        <circle cx="60" cy="62" r="6" fill={color} />
        <rect x="55" y="74" width="10" height="3" rx="1.5" fill="#cbd5e1" />
        <path d="M52 96 H68 L64 108 H56 Z" fill={dark} />
      </g>
    ),
    bandage: (
      <g>
        <g transform="rotate(-20 60 60)">
          <rect x="12" y="42" width="96" height="30" rx="15" fill={color} />
          <rect x="12" y="42" width="96" height="30" rx="15" fill="url(#shine)" />
          <rect x="40" y="42" width="40" height="30" fill="#fde68a" />
          <rect x="40" y="42" width="40" height="30" fill="url(#shine)" />
          {[[22, 52], [22, 62], [98, 52], [98, 62], [30, 57], [90, 57]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="1.5" fill="#fff" opacity=".6" />)}
        </g>
        <ellipse cx="86" cy="92" rx="18" ry="10" fill="#fff" /><ellipse cx="86" cy="89" rx="18" ry="10" fill="#f1f5f9" /><ellipse cx="86" cy="89" rx="7" ry="4" fill="#cbd5e1" />
      </g>
    ),
  };
  return (
    <svg viewBox="0 0 120 120" className="pack" aria-hidden="true">
      <defs>
        <linearGradient id="foil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f8fafc" /><stop offset=".5" stopColor="#cbd5e1" /><stop offset="1" stopColor="#f1f5f9" />
        </linearGradient>
        <linearGradient id="shine" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset=".5" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".22" />
        </linearGradient>
        <linearGradient id="glass" x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".3" /><stop offset=".35" stopColor="#fff" stopOpacity="0" /><stop offset=".8" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".3" />
        </linearGradient>
        <linearGradient id="cyl" x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".3" /><stop offset=".3" stopColor="#fff" stopOpacity=".28" /><stop offset=".7" stopColor="#fff" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".35" />
        </linearGradient>
      </defs>
      <ellipse cx="60" cy="110" rx="36" ry="5" fill="#000" opacity=".4" />
      {shapes[form] || shapes.box}
    </svg>
  );
}
