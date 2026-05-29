import { createSignal, onMount, onCleanup, For } from 'solid-js';

interface ExperienceItem {
  id: string;
  title: string;
  summary: string;
  period: string;
  role: string;
  description: string;
  flagPosition: { cx: number; cy: number };
}

const experiences: ExperienceItem[] = [
  {
    id: 'akdigital',
    title: 'AK Digital',
    summary: 'Social media design & reel direction',
    period: 'Sept 2024 – Jan 2026',
    role: 'Graphic Designer',
    description:
      'Designed high-performing graphics for social media campaigns, developed visual systems for brand accounts, and directed reel content from concept through to final cut.',
    flagPosition: { cx: 490, cy: 415 },
  },
  {
    id: 'freelance',
    title: 'Freelance',
    summary: 'Independent creative — brand, art & content',
    period: 'Feb 2026 – Ongoing',
    role: 'Creative Director',
    description:
      'Specialising in high-impact social media graphics, concept art, and brand aesthetics. Working directly with founders and studios to craft visual identities that last.',
    flagPosition: { cx: 310, cy: 148 },
  },
];

// Path waypoints: base → AK Digital flag → Freelance flag (summit)
const PATH_PTS: [number, number][] = [[320, 690], [490, 415], [310, 148]];
const SEG_LENGTHS = [323.3, 322.0];
const TOTAL_LENGTH = 645.3;
// AK Digital flag appears when path reaches t=0.501
// Freelance (summit) flag always shown faintly as the unreached destination
const FLAG_THRESHOLDS = [0.501, 999];
// SVG path string (straight segments; dashed look created in stroke)
const PATH_D = `M ${PATH_PTS.map(p => p.join(',')).join(' L ')}`;

function getClimberPos(t: number): { x: number; y: number } {
  const dist = t * TOTAL_LENGTH;
  let rem = dist;
  for (let i = 0; i < SEG_LENGTHS.length; i++) {
    if (rem <= SEG_LENGTHS[i]) {
      const frac = rem / SEG_LENGTHS[i];
      const x = PATH_PTS[i][0] + (PATH_PTS[i + 1][0] - PATH_PTS[i][0]) * frac;
      const y = PATH_PTS[i][1] + (PATH_PTS[i + 1][1] - PATH_PTS[i][1]) * frac;
      return { x, y };
    }
    rem -= SEG_LENGTHS[i];
  }
  return { x: PATH_PTS[PATH_PTS.length - 1][0], y: PATH_PTS[PATH_PTS.length - 1][1] };
}

const Experience = () => {
  const [activeId, setActiveId] = createSignal<string | null>(null);
  const [pathProgress, setPathProgress] = createSignal(0);
  const [mounted, setMounted] = createSignal(false);
  const [parallax, setParallax] = createSignal({ x: 0, y: 0 });
  let sectionRef: HTMLElement | undefined;
  let animFrameId: number;

  // ── Scroll-triggered path animation ──────────────────────────────
  onMount(() => {
    setMounted(true);

    // Parallax on mouse move
    let mouseReq: number | null = null;
    const onMouseMove = (e: MouseEvent) => {
      if (mouseReq) return;
      mouseReq = requestAnimationFrame(() => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const nx = (e.clientX / w - 0.5) * 2; // -1 to 1
        const ny = (e.clientY / h - 0.5) * 2;
        setParallax({ x: nx * 3, y: ny * 2 });
        mouseReq = null;
      });
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Intersection observer → trigger draw
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          let start: number | null = null;
          const duration = 2600;
          // Target: 0.70 = mid-climb (past AK Digital, heading to summit)
          const TARGET = 0.70;
          const step = (ts: number) => {
            if (!start) start = ts;
            const raw = Math.min((ts - start) / duration, 1);
            // ease-in-out expo
            const eased =
              raw === 0
                ? 0
                : raw === 1
                ? 1
                : raw < 0.5
                ? Math.pow(2, 20 * raw - 10) / 2
                : (2 - Math.pow(2, -20 * raw + 10)) / 2;
            setPathProgress(eased * TARGET);
            if (raw < 1) animFrameId = requestAnimationFrame(step);
          };
          animFrameId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.25 }
    );
    if (sectionRef) observer.observe(sectionRef);

    onCleanup(() => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animFrameId);
    });
  });

  const dashOffset = () => TOTAL_LENGTH * (1 - pathProgress());
  const climber = () => getClimberPos(pathProgress());

  return (
    <section
      ref={sectionRef}
      id="experience"
      class="relative w-full min-h-screen bg-black overflow-hidden py-16 md:py-24 flex flex-col justify-center"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        @keyframes climberPulse {
          0%   { r: 9;  opacity: 0.55; }
          50%  { r: 18; opacity: 0.15; }
          100% { r: 9;  opacity: 0.55; }
        }
        @keyframes climberPulse2 {
          0%   { r: 6;  opacity: 0.4; }
          50%  { r: 14; opacity: 0.08; }
          100% { r: 6;  opacity: 0.4; }
        }
        .exp-card {
          position: relative;
        }
        .connector-line {
          transition: transform 0.6s ease, opacity 0.6s ease;
          transform-origin: top;
        }
      `}</style>

      {/* ── Faint grid lines ──────────────────────────────────── */}
      <div class="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            class="absolute w-full"
            style={{
              top: `${(i + 1) * 10}%`,
              height: '1px',
              background: 'rgba(255,255,255,0.018)',
            }}
          />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            class="absolute h-full"
            style={{
              left: `${(i + 1) * 16.66}%`,
              width: '1px',
              background: 'rgba(255,255,255,0.012)',
            }}
          />
        ))}
      </div>

      {/* ── Main content ─────────────────────────────────────── */}
      <div class="relative z-10 w-full px-6 md:px-12">
        <div class="mx-auto w-full max-w-7xl">

          {/* Header */}
          <div
            class="mb-14 md:mb-20"
            style={{
              opacity: mounted() ? 1 : 0,
              transform: mounted() ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.9s ease, transform 0.9s ease',
            }}
          >
            <p
              style={{
                'font-family': "'DM Mono', monospace",
                'font-size': '10px',
                'letter-spacing': '0.35em',
                color: 'rgba(255,255,255,0.28)',
                'text-transform': 'uppercase',
                'margin-bottom': '12px',
              }}
            >
              — Experience
            </p>
            <h2
              style={{
                'font-family': "'Bebas Neue', Impact, sans-serif",
                'font-size': 'clamp(3.5rem, 10vw, 7rem)',
                color: 'white',
                'line-height': '0.92',
                'letter-spacing': '0.02em',
                margin: 0,
              }}
            >
              THE CLIMB
            </h2>
            <p
              style={{
                'margin-top': '16px',
                'font-size': '13px',
                color: 'rgba(255,255,255,0.32)',
                'font-weight': '300',
                'max-width': '280px',
                'line-height': '1.7',
                'font-family': "'DM Mono', monospace",
                'font-style': 'italic',
              }}
            >
              Every summit demands its path.
            </p>
          </div>

          {/* Two-column: Mountain SVG | Cards */}
          <div class="flex flex-col lg:flex-row items-start gap-10 lg:gap-14">

            {/* ── Mountain SVG ────────────────────────────────── */}
            <div
              class="relative w-full lg:w-[54%] flex-shrink-0"
              style={{
                opacity: mounted() ? 1 : 0,
                transition: 'opacity 1.1s ease 0.2s',
              }}
            >
              <svg
                viewBox="0 0 700 780"
                xmlns="http://www.w3.org/2000/svg"
                class="w-full"
                style={{ 'max-height': '580px' }}
              >
                <defs>
                  <radialGradient id="summitGlow" cx="44%" cy="19%" r="30%">
                    <stop
                      offset="0%"
                      stop-color="white"
                      stop-opacity="0.05"
                    />
                    <stop offset="100%" stop-color="white" stop-opacity="0" />
                  </radialGradient>
                  <filter id="softBlur">
                    <feGaussianBlur stdDeviation="2" />
                  </filter>
                  <clipPath id="mountainClip">
                    <rect width="700" height="780" />
                  </clipPath>
                </defs>

                {/* Sky */}
                <rect width="700" height="780" fill="#000" />
                <rect width="700" height="780" fill="url(#summitGlow)" />

                {/* Stars — parallax layer 3 (slowest) */}
                <g
                  style={{
                    transform: `translate(${parallax().x * 0.3}px, ${parallax().y * 0.3}px)`,
                    transition: 'transform 0.8s ease-out',
                  }}
                >
                  {([
                    [55,72,0.22],[118,38,0.18],[182,95,0.28],[244,28,0.14],[79,158,0.2],
                    [592,48,0.24],[628,108,0.16],[662,72,0.2],[576,128,0.18],[548,38,0.26],
                    [396,58,0.18],[448,88,0.22],[502,42,0.16],[148,62,0.2],[196,18,0.28],
                    [340,32,0.14],[66,220,0.12],[620,200,0.16],[460,160,0.18],[280,48,0.2],
                  ] as [number,number,number][]).map(([x, y, op], i) => (
                    <circle cx={x} cy={y} r={i % 3 === 0 ? 1.2 : 0.7} fill="white" opacity={op} />
                  ))}
                </g>

                {/* Far range — parallax layer 2 */}
                <g
                  style={{
                    transform: `translate(${parallax().x * 0.5}px, ${parallax().y * 0.4}px)`,
                    transition: 'transform 0.7s ease-out',
                  }}
                >
                  <path
                    d="M0 500 L80 320 L160 410 L260 260 L360 360 L460 240 L560 330 L640 280 L700 350 L700 780 L0 780 Z"
                    fill="#0c0c0c"
                  />
                </g>

                {/* Mid range — parallax layer 1 */}
                <g
                  style={{
                    transform: `translate(${parallax().x * 0.75}px, ${parallax().y * 0.55}px)`,
                    transition: 'transform 0.6s ease-out',
                  }}
                >
                  <path
                    d="M0 560 L100 400 L200 480 L310 300 L420 420 L530 330 L620 400 L700 360 L700 780 L0 780 Z"
                    fill="#101010"
                  />
                </g>

                {/* Main mountain — slight parallax */}
                <g
                  style={{
                    transform: `translate(${parallax().x * 1}px, ${parallax().y * 0.7}px)`,
                    transition: 'transform 0.5s ease-out',
                  }}
                >
                  {/* Main mass */}
                  <path d="M30 780 L310 148 L590 600 L700 780 Z" fill="#181818" />
                  {/* Right ridge */}
                  <path d="M420 780 L590 600 L700 780 Z" fill="#131313" />

                  {/* Left face — subtle lighter plane */}
                  <path
                    d="M310 148 L170 500 L310 440 L420 520 L490 415 L390 280 Z"
                    fill="white"
                    opacity="0.022"
                  />

                  {/* Ridge edge highlight */}
                  <line x1="310" y1="148" x2="128" y2="600"
                    stroke="white" stroke-width="0.6" stroke-opacity="0.12"
                  />

                  {/* Rock strata lines */}
                  {([
                    ['M 240 360 L 290 348', 0.09],
                    ['M 218 430 L 278 414', 0.07],
                    ['M 198 510 L 268 492', 0.06],
                    ['M 348 310 L 388 303', 0.08],
                    ['M 368 380 L 418 370', 0.07],
                    ['M 418 458 L 460 448', 0.06],
                    ['M 252 560 L 300 548', 0.05],
                  ] as [string, number][]).map(([d, op]) => (
                    <path d={d} stroke="white" stroke-width="1" stroke-opacity={op} fill="none" />
                  ))}

                  {/* Snow cap */}
                  <path
                    d="M310 148 L276 238 L332 218 L368 258 L392 228 L358 148 Z"
                    fill="white" opacity="0.88"
                  />
                  {/* Snow shadow crease */}
                  <path d="M310 148 L276 238 L302 230 Z" fill="white" opacity="0.45" />
                  {/* Snow glint */}
                  <path d="M318 152 L308 180 L322 175 Z" fill="white" opacity="0.6" />
                </g>

                {/* Foreground ground */}
                <path
                  d="M0 730 Q150 710 300 725 Q450 738 600 718 Q660 710 700 720 L700 780 L0 780 Z"
                  fill="#080808"
                />

                {/* ── Altitude meter (right) ─── */}
                <g opacity={mounted() ? 0.22 : 0}
                   style={{ transition: 'opacity 1s ease 1s' }}>
                  <line x1="622" y1="148" x2="622" y2="690"
                    stroke="white" stroke-width="0.5"
                    stroke-dasharray="3 8" stroke-opacity="0.5"
                  />
                  {([
                    { y: 690, label: 'BASE' },
                    { y: 415, label: 'MID' },
                    { y: 148, label: 'PEAK' },
                  ]).map(({ y, label }) => (
                    <>
                      <line x1="614" y1={y} x2="622" y2={y}
                        stroke="white" stroke-width="0.5"
                      />
                      <text
                        x="608" y={y}
                        text-anchor="end"
                        font-family="'DM Mono', 'Courier New', monospace"
                        font-size="8" fill="white"
                        dominant-baseline="middle"
                      >
                        {label}
                      </text>
                    </>
                  ))}
                </g>

                {/* ── Climbing path ─────────────────────────────── */}
                <g
                  style={{
                    transform: `translate(${parallax().x * 1}px, ${parallax().y * 0.7}px)`,
                    transition: 'transform 0.5s ease-out',
                  }}
                >
                {/* Glow halo */}
                <path
                  d={PATH_D}
                  fill="none"
                  stroke="white"
                  stroke-width="6"
                  stroke-opacity="0.04"
                  stroke-linecap="round"
                  filter="url(#softBlur)"
                  stroke-dasharray={`${TOTAL_LENGTH}`}
                  stroke-dashoffset={dashOffset()}
                />
                {/* Main line */}
                <path
                  d={PATH_D}
                  fill="none"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-opacity="0.65"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-dasharray={`${TOTAL_LENGTH}`}
                  stroke-dashoffset={dashOffset()}
                />
                {/* Dotted texture overlay */}
                <path
                  d={PATH_D}
                  fill="none"
                  stroke="white"
                  stroke-width="1"
                  stroke-opacity="0.18"
                  stroke-linecap="round"
                  stroke-dasharray="2 12"
                  stroke-dashoffset={dashOffset()}
                />

                {/* ── Flags ─────────────────────────────────────── */}
                <For each={experiences}>
                  {(exp, i) => {
                    const { cx, cy } = exp.flagPosition;
                    const isActive = activeId() === exp.id;
                    const flagVisible = pathProgress() >= FLAG_THRESHOLDS[i()];

                    return (
                      <g
                        style={{
                          opacity: flagVisible ? 1 : (i() === 1 ? 0.18 : 0),
                          transform: flagVisible ? 'scale(1)' : (i() === 1 ? 'scale(0.9)' : 'scale(0.6)'),
                          'transform-origin': `${cx}px ${cy}px`,
                          transition: 'opacity 0.6s cubic-bezier(0.34,1.56,0.64,1), transform 0.6s cubic-bezier(0.34,1.56,0.64,1)',
                          cursor: 'pointer',
                        }}
                        onMouseEnter={() => setActiveId(exp.id)}
                        onMouseLeave={() => setActiveId(null)}
                        onClick={() => setActiveId(activeId() === exp.id ? null : exp.id)}
                      >
                        {/* Outer ping ring */}
                        {isActive && (
                          <circle
                            cx={cx} cy={cy} r="15"
                            fill="none"
                            stroke="white"
                            stroke-opacity="0.2"
                            style={{ animation: 'climberPulse 2s ease-in-out infinite' }}
                          />
                        )}
                        {/* Hover halo */}
                        <circle
                          cx={cx} cy={cy}
                          r={isActive ? 22 : 14}
                          fill="white"
                          opacity={isActive ? 0.05 : 0.02}
                          style={{ transition: 'r 0.3s ease, opacity 0.3s ease' }}
                        />

                        {/* Pole */}
                        <line
                          x1={cx} y1={cy - 2}
                          x2={cx} y2={cy - 42}
                          stroke="white"
                          stroke-width={isActive ? 1.5 : 1.2}
                          stroke-opacity={isActive ? 1 : 0.6}
                          stroke-linecap="round"
                        />

                        {/* Flag cloth — waves subtly on active */}
                        <path
                          d={`M${cx},${cy - 42} L${cx + 22},${cy - 34} L${cx},${cy - 26} Z`}
                          fill={isActive ? 'white' : 'rgba(255,255,255,0.12)'}
                          stroke="white"
                          stroke-width="0.8"
                          stroke-opacity={isActive ? 0.9 : 0.5}
                          style={{
                            transition: 'fill 0.3s ease',
                          }}
                        />

                        {/* Label on flag */}
                        {isActive && (
                          <text
                            x={cx + 5} y={cy - 33}
                            text-anchor="start"
                            font-family="'DM Mono', monospace"
                            font-size="6.5"
                            fill="black"
                            font-weight="500"
                            dominant-baseline="middle"
                          >
                            {`0${i() + 1}`}
                          </text>
                        )}

                        {/* Base dot */}
                        <circle
                          cx={cx} cy={cy}
                          r={isActive ? 5.5 : 4}
                          fill={isActive ? 'white' : 'black'}
                          stroke="white"
                          stroke-width={isActive ? 0 : 1}
                          stroke-opacity="0.55"
                          style={{ transition: 'r 0.3s ease' }}
                        />
                        <circle cx={cx} cy={cy} r="1.5"
                          fill={isActive ? 'black' : 'white'}
                          opacity={isActive ? 1 : 0.35}
                        />
                      </g>
                    );
                  }}
                </For>

                {/* ── Remaining path to summit (dashed, dim) ───── */}
                {pathProgress() >= 0.68 && (() => {
                  const { x, y } = climber();
                  return (
                    <path
                      d={`M ${x},${y} L 310,148`}
                      fill="none"
                      stroke="white"
                      stroke-width="1.2"
                      stroke-opacity="0.18"
                      stroke-dasharray="4 8"
                      stroke-linecap="round"
                      style={{ transition: 'opacity 1s ease' }}
                    />
                  );
                })()}

                {/* ── Climber marker ────────────────────────────── */}
                {pathProgress() > 0.01 && (() => {
                  const { x, y } = climber();
                  return (
                    <g>
                      {/* CSS-animated outer pulse ring 1 — no JS jank */}
                      <circle
                        cx={x} cy={y}
                        r="9"
                        fill="none"
                        stroke="white"
                        stroke-width="1"
                        style={{ animation: 'climberPulse 2s ease-in-out infinite' }}
                      />
                      {/* CSS-animated outer pulse ring 2 — offset phase */}
                      <circle
                        cx={x} cy={y}
                        r="6"
                        fill="none"
                        stroke="white"
                        stroke-width="0.8"
                        style={{ animation: 'climberPulse2 2s ease-in-out infinite 0.6s' }}
                      />
                      {/* Dark filled backdrop for contrast against mountain */}
                      <circle
                        cx={x} cy={y}
                        r="7"
                        fill="black"
                        opacity="0.85"
                      />
                      {/* Bright white border ring */}
                      <circle
                        cx={x} cy={y}
                        r="6"
                        fill="none"
                        stroke="white"
                        stroke-width="1.8"
                        opacity="1"
                      />
                      {/* Solid white core */}
                      <circle
                        cx={x} cy={y}
                        r="3"
                        fill="white"
                        opacity="1"
                      />
                      {/* "Currently here" label */}
                      <g
                        style={{
                          opacity: pathProgress() >= 0.70 ? 1 : 0,
                          transition: 'opacity 0.8s ease',
                        }}
                      >
                        <rect
                          x={x + 12} y={y - 14}
                          width="82" height="18"
                          rx="4"
                          fill="white"
                          opacity="0.95"
                        />
                        <text
                          x={x + 53} y={y - 5}
                          text-anchor="middle"
                          font-family="'DM Mono', 'Courier New', monospace"
                          font-size="8.5"
                          font-weight="500"
                          fill="black"
                          dominant-baseline="middle"
                        >
                          ↑ Currently here
                        </text>
                      </g>
                    </g>
                  );
                })()}
                </g>
              </svg>
            </div>

            {/* ── Experience Cards ──────────────────────────────── */}
            <div
              class="w-full lg:w-[46%] flex flex-col gap-1 self-center"
              style={{ 'padding-top': '12px' }}
            >
              <For each={experiences}>
                {(exp, i) => {
                  const isActive = () => activeId() === exp.id;
                  const delay = `${0.5 + i() * 0.18}s`;

                  return (
                    <div
                      class="relative"
                      style={{
                        opacity: mounted() ? 1 : 0,
                        transform: mounted() ? 'translateX(0)' : 'translateX(24px)',
                        transition: `opacity 0.8s ease ${delay}, transform 0.8s ease ${delay}`,
                      }}
                    >
                      {/* Vertical connector between cards */}
                      {i() < experiences.length - 1 && (
                        <div
                          class="connector-line absolute"
                          style={{
                            left: '18px',
                            top: '54px',
                            width: '1px',
                            height: 'calc(100% - 24px)',
                            background: `linear-gradient(to bottom, rgba(255,255,255,${isActive() ? 0.2 : 0.08}), rgba(255,255,255,0.02))`,
                          }}
                        />
                      )}

                      <div
                        class={`exp-card rounded-xl ${isActive() ? 'active' : ''}`}
                        style={{
                          background: 'transparent',
                          padding: '20px 20px 22px',
                          'margin-bottom': '4px',
                        }}
                        onMouseEnter={() => setActiveId(exp.id)}
                        onMouseLeave={() => setActiveId(null)}
                        onClick={() => setActiveId(isActive() ? null : exp.id)}
                      >
                        <div class="flex items-start gap-4">

                          {/* Index circle */}
                          <div
                            style={{
                              'flex-shrink': 0,
                              width: '36px',
                              height: '36px',
                              'border-radius': '50%',
                              border: `1px solid ${isActive() ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.1)'}`,
                              background: isActive() ? 'rgba(255,255,255,0.07)' : 'transparent',
                              display: 'flex',
                              'align-items': 'center',
                              'justify-content': 'center',
                              transition: 'all 0.35s ease',
                              'margin-top': '2px',
                            }}
                          >
                            <span
                              style={{
                                'font-family': "'DM Mono', monospace",
                                'font-size': '9px',
                                color: isActive() ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.22)',
                                transition: 'color 0.35s ease',
                              }}
                            >
                              {`0${i() + 1}`}
                            </span>
                          </div>

                          {/* Text content */}
                          <div style={{ flex: 1 }}>
                            {/* Role badge */}
                            <div
                              style={{
                                display: 'inline-flex',
                                'align-items': 'center',
                                'margin-bottom': '8px',
                              }}
                            >
                              <span
                                style={{
                                  'font-family': "'DM Mono', monospace",
                                  'font-size': '9px',
                                  'letter-spacing': '0.18em',
                                  'text-transform': 'uppercase',
                                  color: isActive() ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)',
                                  transition: 'color 0.35s ease',
                                }}
                              >
                                {exp.period}
                              </span>
                            </div>

                            {/* Title */}
                            <h3
                              style={{
                                'font-family': "'Bebas Neue', Impact, sans-serif",
                                'font-size': '2rem',
                                'letter-spacing': '0.04em',
                                'line-height': '1',
                                color: isActive() ? 'white' : 'rgba(255,255,255,0.5)',
                                margin: '0 0 4px',
                                transition: 'color 0.35s ease',
                              }}
                            >
                              {exp.title}
                            </h3>

                            {/* Role subtitle */}
                            <p
                              style={{
                                'font-family': "'DM Mono', monospace",
                                'font-size': '10px',
                                'font-style': 'italic',
                                color: isActive() ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.15)',
                                margin: '0 0 10px',
                                transition: 'color 0.35s ease',
                              }}
                            >
                              {exp.role}
                            </p>

                            {/* ── Summary line (always visible) ── */}
                            <p
                              style={{
                                'font-size': '12.5px',
                                'font-weight': '300',
                                color: isActive() ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.28)',
                                margin: '0 0 0',
                                'line-height': '1.5',
                                transition: 'color 0.4s ease',
                                'letter-spacing': '0.01em',
                              }}
                            >
                              {exp.summary}
                            </p>

                            {/* ── Description (permanently visible) ── */}
                            <div
                              style={{
                                'margin-top': '12px',
                                'padding-top': '12px',
                                'border-top': '1px solid rgba(255,255,255,0.07)',
                              }}
                            >
                              <p
                                style={{
                                  'font-size': '12px',
                                  'font-weight': '300',
                                  color: isActive() ? 'rgba(255,255,255,0.48)' : 'rgba(255,255,255,0.28)',
                                  'line-height': '1.75',
                                  margin: 0,
                                  transition: 'color 0.4s ease',
                                }}
                              >
                                {exp.description}
                              </p>
                            </div>

                            {/* Bottom accent bar */}
                            <div
                              style={{
                                'margin-top': '14px',
                                height: '1px',
                                background: 'white',
                                'transform-origin': 'left',
                                transform: isActive() ? 'scaleX(1)' : 'scaleX(0)',
                                opacity: isActive() ? 0.12 : 0,
                                transition: 'transform 0.5s ease, opacity 0.5s ease',
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }}
              </For>

              {/* ── CTA ─────────────────────────────────────────── */}
              <div
                style={{
                  'margin-top': '32px',
                  'padding-left': '56px',
                  opacity: mounted() ? 1 : 0,
                  transition: 'opacity 0.8s ease 1.1s',
                }}
              >
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    'align-items': 'center',
                    gap: '12px',
                    'text-decoration': 'none',
                  }}
                  class="group"
                >
                  <span
                    style={{
                      'font-family': "'DM Mono', monospace",
                      'font-size': '10px',
                      'letter-spacing': '0.22em',
                      'text-transform': 'uppercase',
                      color: 'rgba(255,255,255,0.3)',
                      transition: 'color 0.3s ease',
                    }}
                    class="group-hover:text-white/60"
                  >
                    Let's connect
                  </span>
                  <span
                    style={{
                      display: 'block',
                      height: '1px',
                      background: 'rgba(255,255,255,0.2)',
                      transition: 'width 0.4s ease, background 0.3s ease',
                    }}
                    class="w-8 group-hover:w-16 group-hover:bg-white/40"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;