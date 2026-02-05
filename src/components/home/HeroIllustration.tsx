"use client";

export function HeroIllustration() {
  return (
    <section className="px-6 py-4">
      <div className="max-w-6xl mx-auto">
        <div className="w-full aspect-[4/5] lg:max-h-[70vh] relative rounded-xl overflow-hidden ios-shadow bg-gradient-to-br from-[#f5f3f0] to-[#e8e4de] dark:from-[#2a2518] dark:to-[#1a170e] flex items-center justify-center">
        <svg
          viewBox="0 0 400 500"
          className="w-full h-full p-8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="pencilGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#e8ba30" />
              <stop offset="100%" stopColor="#c9a028" />
            </linearGradient>
            <linearGradient id="woodGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4a574" />
              <stop offset="50%" stopColor="#c49a6c" />
              <stop offset="100%" stopColor="#b8906a" />
            </linearGradient>
          </defs>

          {/* Artistic brush strokes in background */}
          <g opacity="0.15" className="dark:opacity-25">
            <path
              d="M50 150 Q100 100 200 120 T350 100"
              stroke="#e8ba30"
              strokeWidth="40"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M30 250 Q150 200 250 230 T380 200"
              stroke="#8b7734"
              strokeWidth="30"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M60 350 Q120 300 220 340 T370 320"
              stroke="#e8ba30"
              strokeWidth="25"
              fill="none"
              strokeLinecap="round"
            />
          </g>

          {/* Main pencil */}
          <g transform="translate(100, 80) rotate(25)">
            {/* Pencil body */}
            <rect
              x="0"
              y="0"
              width="180"
              height="35"
              rx="2"
              fill="url(#woodGrad)"
            />
            {/* Gold band */}
            <rect x="150" y="0" width="20" height="35" fill="url(#pencilGrad)" />
            {/* Eraser */}
            <rect
              x="170"
              y="2"
              width="25"
              height="31"
              rx="2"
              fill="#e8a5a5"
            />
            {/* Pencil tip */}
            <polygon
              points="-25,17.5 0,0 0,35"
              fill="#f5e6d3"
            />
            {/* Graphite tip */}
            <polygon
              points="-25,17.5 -5,12 -5,23"
              fill="#4a4a4a"
            />
          </g>

          {/* Second pencil */}
          <g transform="translate(140, 180) rotate(-15)">
            <rect
              x="0"
              y="0"
              width="160"
              height="30"
              rx="2"
              fill="#e8ba30"
            />
            <rect x="130" y="0" width="18" height="30" fill="#c9a028" />
            <rect
              x="148"
              y="2"
              width="22"
              height="26"
              rx="2"
              fill="#d4a5a5"
            />
            <polygon
              points="-22,15 0,0 0,30"
              fill="#fff8e7"
            />
            <polygon
              points="-22,15 -4,10 -4,20"
              fill="#3a3a3a"
            />
          </g>

          {/* Sketch lines */}
          <g stroke="#1a1a1a" className="dark:stroke-gray-400" strokeWidth="1.5" fill="none" opacity="0.4">
            <path d="M180 320 Q200 300 240 310 T300 290" strokeLinecap="round" />
            <path d="M160 350 Q190 330 230 340 T290 325" strokeLinecap="round" />
            <path d="M200 380 Q220 360 260 370 T310 355" strokeLinecap="round" />
          </g>

          {/* Small decorative elements */}
          <circle cx="320" cy="400" r="8" fill="#e8ba30" opacity="0.6" />
          <circle cx="80" cy="420" r="6" fill="#e8ba30" opacity="0.4" />
          <circle cx="340" cy="450" r="5" fill="#8b7734" opacity="0.5" />

          {/* "Draw" text hint */}
          <text
            x="200"
            y="470"
            textAnchor="middle"
            className="fill-muted-gray dark:fill-gray-400"
            fontSize="14"
            fontFamily="serif"
            fontStyle="italic"
            opacity="0.5"
          >
            where ideas take form
          </text>
        </svg>
        </div>
      </div>
    </section>
  );
}
