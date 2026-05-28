import { createSignal, onMount, type Component, Show } from 'solid-js';

const Loader: Component = () => {
  const [loading, setLoading] = createSignal(true);
  const [progress, setProgress] = createSignal(0);
  const [render, setRender] = createSignal(true);

  onMount(() => {
    document.body.style.overflow = 'hidden';

    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = '';
            setTimeout(() => setRender(false), 900);
          }, 400);
          return 100;
        }
        return Math.min(p + Math.floor(Math.random() * 15) + 5, 100);
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        document.body.style.overflow = '';
        setTimeout(() => setRender(false), 900);
      }, 400);
    }, 2000);
  });

  return (
    <Show when={render()}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        /*
          GPU-only properties: transform (translate3d) + opacity
          NO translateY — use translate3d so the browser composites on the GPU
          and never touches layout.
        */
        @keyframes cardFloat {
          0%, 100% { transform: translate3d(0, 0px, 0); }
          50%       { transform: translate3d(0, -12px, 0); }
        }

        /* Two staggered shimmer lines sweeping across the card */
        @keyframes shimmer {
          0%   { transform: translate3d(-100%, 0, 0); }
          100% { transform: translate3d(250%, 0, 0); }
        }

        /* Fade the whole overlay out — opacity only, GPU-composited */
        @keyframes fadeOut {
          to { opacity: 0; pointer-events: none; }
        }

        .loader-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #000;
          /* tell the browser to composite this layer upfront */
          will-change: opacity;
        }
        .loader-overlay.fade-out {
          animation: fadeOut 0.85s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        .card-wrap {
          /* promote to its own compositor layer */
          will-change: transform;
          animation: cardFloat 3.8s ease-in-out infinite;
        }
      `}</style>

      <div class={`loader-overlay${!loading() ? ' fade-out' : ''}`}>

        {/* Faint grid — pure CSS, no JS */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            'pointer-events': 'none',
            'background-image':
              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            'background-size': '10% 10%',
          }}
        />

        {/* Ace Card */}
        <div class="card-wrap" style={{ 'margin-bottom': '72px' }}>
          <div
            style={{
              position: 'relative',
              width: '160px',
              height: '224px',
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.18)',
              'border-radius': '14px',
              display: 'flex',
              'align-items': 'center',
              'justify-content': 'center',
              overflow: 'hidden',
              'box-shadow': '0 32px 80px rgba(0,0,0,0.8)',
            }}
          >
            {/* Subtle top-left sheen — static gradient, zero JS */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)',
                'border-radius': '14px',
                'pointer-events': 'none',
              }}
            />

            {/* Shimmer sweep — GPU-only, pure CSS */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
                'border-radius': '14px',
                'pointer-events': 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '40%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)',
                  animation: 'shimmer 2.2s ease-in-out infinite',
                  'will-change': 'transform',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '28%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                  animation: 'shimmer 2.2s ease-in-out infinite 0.7s',
                  'will-change': 'transform',
                }}
              />
            </div>

            {/* Top-left corner */}
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                display: 'flex',
                'flex-direction': 'column',
                'align-items': 'center',
                gap: '2px',
              }}
            >
              <span
                style={{
                  'font-family': "'Bebas Neue', Impact, sans-serif",
                  'font-size': '22px',
                  'line-height': 1,
                  color: 'white',
                }}
              >
                A
              </span>
              <SpadeIcon size={16} />
            </div>

            {/* Centre spade */}
            <SpadeIcon size={64} opacity={0.9} />

            {/* Bottom-right corner (rotated) */}
            <div
              style={{
                position: 'absolute',
                bottom: '14px',
                right: '14px',
                display: 'flex',
                'flex-direction': 'column',
                'align-items': 'center',
                gap: '2px',
                transform: 'rotate(180deg)',
              }}
            >
              <span
                style={{
                  'font-family': "'Bebas Neue', Impact, sans-serif",
                  'font-size': '22px',
                  'line-height': 1,
                  color: 'white',
                }}
              >
                A
              </span>
              <SpadeIcon size={16} />
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div
          style={{
            display: 'flex',
            'flex-direction': 'column',
            gap: '10px',
            width: '256px',
            position: 'relative',
            'z-index': 10,
          }}
        >
          <div
            style={{
              display: 'flex',
              'justify-content': 'space-between',
              'font-family': "'DM Mono', 'Courier New', monospace",
              'font-size': '10px',
              color: 'rgba(255,255,255,0.45)',
              'letter-spacing': '0.15em',
              'text-transform': 'uppercase',
            }}
          >
            <span>Loading Experience</span>
            <span>{Math.min(100, progress())}%</span>
          </div>

          {/* Track */}
          <div
            style={{
              height: '1px',
              width: '100%',
              background: 'rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Fill — transition on width only, no layout side-effects at this scale */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                background: 'white',
                width: `${Math.min(100, progress())}%`,
                transition: 'width 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            />
          </div>
        </div>
      </div>
    </Show>
  );
};

/* Inline spade — no external dependency */
const SpadeIcon = (props: { size: number; opacity?: number }) => (
  <svg
    width={props.size}
    height={props.size}
    viewBox="0 0 24 24"
    fill="white"
    style={{ opacity: props.opacity ?? 1, display: 'block' }}
  >
    <path d="M12 2C8 6 4 11 4 15c0 3 2 5 4 5 1.5 0 2.5-1 4-2 1.5 1 2.5 2 4 2 2 0 4-2 4-5 0-4-4-9-8-13z" />
  </svg>
);

export default Loader;