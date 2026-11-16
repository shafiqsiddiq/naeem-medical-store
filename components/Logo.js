export default function Logo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" style={{ flexShrink: 0 }}>
      <defs>
        <linearGradient id="lg-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5b4bff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="lg-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6ee7b7" />
          <stop offset="1" stopColor="#10b981" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="19" fill="url(#lg-bg)" />
      <rect width="64" height="64" rx="19" fill="#fff" opacity=".08" />
      <path d="M32 9 c8 4 15 5 20 4 c0 20 -6 33 -20 41 c-14 -8 -20 -21 -20 -41 c5 1 12 0 20 -4 Z" fill="#fff" opacity=".16" />
      <rect x="27.5" y="15" width="9" height="30" rx="2.6" fill="#fff" />
      <rect x="17" y="25.5" width="30" height="9" rx="2.6" fill="#fff" />
      <g transform="rotate(-38 32 32)">
        <rect x="22" y="28.4" width="20" height="7.2" rx="3.6" fill="#fff" />
        <rect x="32" y="28.4" width="10" height="7.2" rx="3.6" fill="#ff5d8f" />
        <rect x="32" y="28.4" width="4" height="7.2" fill="#ff5d8f" />
      </g>
      <path d="M40 52 c0 -8 6 -12 14 -12 c0 8 -5 13 -14 12 Z" fill="url(#lg-leaf)" />
      <path d="M41 51 c4 -3 7 -6 11 -9" stroke="#065f46" strokeWidth="1" fill="none" strokeLinecap="round" opacity=".6" />
    </svg>
  );
}
