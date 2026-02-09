export function SoothingBackground() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    >
      <defs>
        <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b1022" />
          <stop offset="40%" stopColor="#0a1a2b" />
          <stop offset="100%" stopColor="#06050b" />
        </linearGradient>

        <radialGradient id="glow-a" cx="35%" cy="30%" r="55%">
          <stop offset="0%" stopColor="#3aa9ff" stopOpacity="0.25" />
          <stop offset="60%" stopColor="#3aa9ff" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#3aa9ff" stopOpacity="0" />
        </radialGradient>

        <radialGradient id="glow-b" cx="70%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#a855f7" stopOpacity="0.12" />
          <stop offset="55%" stopColor="#a855f7" stopOpacity="0.03" />
          <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
        </radialGradient>

        <filter id="blur-24" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
      </defs>

      <rect x="0" y="0" width="1200" height="800" fill="url(#bg-grad)" />

      <g filter="url(#blur-24)">
        <circle cx="360" cy="220" r="260" fill="url(#glow-a)" />
        <circle cx="860" cy="580" r="320" fill="url(#glow-b)" />
        <path
          d="M 140 620 C 320 520 420 520 600 620 C 780 720 900 720 1100 610"
          fill="none"
          stroke="#3aa9ff"
          strokeOpacity="0.08"
          strokeWidth="64"
          strokeLinecap="round"
        />
      </g>

      <g opacity="0.18">
        <circle cx="190" cy="120" r="2" fill="#ffffff" />
        <circle cx="260" cy="160" r="1.5" fill="#ffffff" />
        <circle cx="330" cy="110" r="1.2" fill="#ffffff" />
        <circle cx="980" cy="140" r="1.5" fill="#ffffff" />
        <circle cx="1040" cy="190" r="2.2" fill="#ffffff" />
        <circle cx="920" cy="220" r="1.3" fill="#ffffff" />
        <circle cx="820" cy="120" r="1.1" fill="#ffffff" />
        <circle cx="640" cy="140" r="1.4" fill="#ffffff" />
      </g>
    </svg>
  );
}

