import type { BackgroundVariant } from "@/lib/settings";

type SoothingBackgroundProps = {
  variant: BackgroundVariant;
};

export function SoothingBackground({ variant }: SoothingBackgroundProps) {
  const isAurora = variant === "aurora";
  const isGrid = variant === "grid";
  const isMist = variant === "mist";

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
        {isAurora ? (
          <linearGradient id="bg-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0b1022" />
            <stop offset="40%" stopColor="#0a1a2b" />
            <stop offset="100%" stopColor="#06050b" />
          </linearGradient>
        ) : isGrid ? (
          <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#070913" />
            <stop offset="60%" stopColor="#05060a" />
            <stop offset="100%" stopColor="#020205" />
          </linearGradient>
        ) : (
          <linearGradient id="bg-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#060b0f" />
            <stop offset="55%" stopColor="#04080c" />
            <stop offset="100%" stopColor="#020205" />
          </linearGradient>
        )}

        <radialGradient id="glow-a" cx="35%" cy="30%" r="55%">
          <stop
            offset="0%"
            stopColor={isAurora ? "#3aa9ff" : isGrid ? "#22c55e" : "#2dd4bf"}
            stopOpacity={isAurora ? "0.25" : isGrid ? "0.18" : "0.14"}
          />
          <stop
            offset="60%"
            stopColor={isAurora ? "#3aa9ff" : isGrid ? "#22c55e" : "#2dd4bf"}
            stopOpacity={isAurora ? "0.05" : "0.05"}
          />
          <stop
            offset="100%"
            stopColor={isAurora ? "#3aa9ff" : isGrid ? "#22c55e" : "#2dd4bf"}
            stopOpacity="0"
          />
        </radialGradient>

        <radialGradient id="glow-b" cx="70%" cy="70%" r="60%">
          <stop
            offset="0%"
            stopColor={isAurora ? "#a855f7" : isGrid ? "#f59e0b" : "#fb7185"}
            stopOpacity={isAurora ? "0.12" : "0.12"}
          />
          <stop
            offset="55%"
            stopColor={isAurora ? "#a855f7" : isGrid ? "#f59e0b" : "#fb7185"}
            stopOpacity={isAurora ? "0.03" : "0.03"}
          />
          <stop
            offset="100%"
            stopColor={isAurora ? "#a855f7" : isGrid ? "#f59e0b" : "#fb7185"}
            stopOpacity="0"
          />
        </radialGradient>

        <filter id="blur-24" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="24" />
        </filter>

        <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path
            d="M 36 0 L 0 0 0 36"
            fill="none"
            stroke="#94a3b8"
            strokeOpacity="0.08"
            strokeWidth="1"
          />
          <path
            d="M 12 0 L 12 36"
            fill="none"
            stroke="#94a3b8"
            strokeOpacity="0.04"
            strokeWidth="1"
          />
          <path
            d="M 24 0 L 24 36"
            fill="none"
            stroke="#94a3b8"
            strokeOpacity="0.04"
            strokeWidth="1"
          />
          <path
            d="M 0 12 L 36 12"
            fill="none"
            stroke="#94a3b8"
            strokeOpacity="0.04"
            strokeWidth="1"
          />
          <path
            d="M 0 24 L 36 24"
            fill="none"
            stroke="#94a3b8"
            strokeOpacity="0.04"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect x="0" y="0" width="1200" height="800" fill="url(#bg-grad)" />
      {isGrid ? (
        <rect
          x="0"
          y="0"
          width="1200"
          height="800"
          fill="url(#grid)"
          opacity="0.85"
        />
      ) : null}

      <g filter="url(#blur-24)">
        <circle cx="360" cy="220" r="260" fill="url(#glow-a)" />
        <circle cx="860" cy="580" r="320" fill="url(#glow-b)" />
        {isMist ? (
          <>
            <path
              d="M 120 610 C 320 520 440 540 600 620 C 780 700 910 710 1120 600"
              fill="none"
              stroke="#2dd4bf"
              strokeOpacity="0.05"
              strokeWidth="72"
              strokeLinecap="round"
            />
            <path
              d="M 60 560 C 260 520 420 520 620 560 C 820 600 980 610 1180 560"
              fill="none"
              stroke="#fb7185"
              strokeOpacity="0.035"
              strokeWidth="62"
              strokeLinecap="round"
            />
          </>
        ) : (
          <path
            d="M 140 620 C 320 520 420 520 600 620 C 780 720 900 720 1100 610"
            fill="none"
            stroke={isAurora ? "#3aa9ff" : "#22c55e"}
            strokeOpacity={isAurora ? "0.08" : "0.06"}
            strokeWidth="64"
            strokeLinecap="round"
          />
        )}
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
