import { createSignal, For } from 'solid-js';
import { Motion } from 'solid-motionone';

export default function Footer() {
  const [hoveredIcon, setHoveredIcon] = createSignal<string | null>(null);

  const socialLinks = [
    { id: 'linkedin', href: 'https://www.linkedin.com/in/pranaya-pradhan-2a029837b/', label: 'LinkedIn' },
    { id: 'behance', href: 'https://www.behance.net/botxdemon', label: 'Behance' },
    { id: 'email', href: 'mailto:pranaya878@gmail.com', label: 'Email' },
  ];

  const renderIcon = (id: string) => {
    switch (id) {
      case 'linkedin':
        return (
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        );
      case 'behance':
        return (
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.908 5.375 5.425.043.372.049 1.152-.045 1.547h-8.083c.121 2.052 1.583 2.922 3.09 2.922 1.579 0 2.213-.671 2.628-1.558l2.234 1.259zm-6.223-5.539c-.198-1.127-1.144-1.89-2.222-1.89-1.251 0-2.072.825-2.276 1.89h4.498zm-11.503-4.461v14h5.665c3.279 0 4.954-2.181 4.954-4.526 0-1.854-1.026-3.32-2.73-3.799 1.282-.578 2.071-1.796 2.071-3.385 0-2.427-1.649-4.29-5.044-4.29h-4.916zm2.348 5.408h2.09c1.678 0 2.457.753 2.457 1.956 0 1.275-.853 1.904-2.585 1.904h-1.962v-3.86zm0 5.409v-3.83h2.381c1.557 0 2.659.544 2.659 1.996 0 1.233-.761 1.834-2.452 1.834h-2.588z"/>
          </svg>
        );
      case 'email':
        return (
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer class="relative overflow-hidden bg-black py-16 md:py-24 px-6 border-t border-white/10">
      {/* Artistic Background - Textured overlay */}
      <div class="absolute inset-0 overflow-hidden">
        {/* Animated gradient background */}
        <div class="absolute inset-0 bg-gradient-to-b from-neutral-900/50 via-black to-black" />

        {/* Decorative geometric shapes */}
        <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse" />
        <div
          class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 animate-pulse"
          style="animation-delay: 2s"
        />
        <div class="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 animate-pulse" />

        {/* 8-Bit Continuous Animation */}
        <div class="absolute bottom-6 left-0 w-full overflow-visible pointer-events-none opacity-20">
          <style>
            {`
              @keyframes float-across {
                0% { transform: translateX(-200px); }
                100% { transform: translateX(100vw); }
              }
              @keyframes frame-toggle-1 {
                0%, 49.9% { opacity: 1; }
                50%, 100% { opacity: 0; }
              }
              @keyframes frame-toggle-2 {
                0%, 49.9% { opacity: 0; }
                50%, 100% { opacity: 1; }
              }
            `}
          </style>
          <div style="animation: float-across 20s linear infinite;" class="flex items-center gap-6">
            
            {/* Pacman */}
            <svg width="42" height="42" viewBox="0 0 14 14" class="text-white fill-current">
              <rect x="4" y="0" width="6" height="1" />
              <rect x="2" y="1" width="10" height="1" />
              <rect x="1" y="2" width="12" height="1" />
              <rect x="0" y="3" width="14" height="1" />
              
              <g style="animation: frame-toggle-1 0.3s steps(1) infinite;">
                <rect x="0" y="4" width="10" height="1" />
                <rect x="0" y="5" width="8" height="1" />
                <rect x="0" y="6" width="6" height="1" />
                <rect x="0" y="7" width="6" height="1" />
                <rect x="0" y="8" width="8" height="1" />
                <rect x="0" y="9" width="10" height="1" />
              </g>
              <g style="animation: frame-toggle-2 0.3s steps(1) infinite;">
                <rect x="0" y="4" width="14" height="1" />
                <rect x="0" y="5" width="12" height="1" />
                <rect x="0" y="6" width="9" height="1" />
                <rect x="0" y="7" width="9" height="1" />
                <rect x="0" y="8" width="12" height="1" />
                <rect x="0" y="9" width="14" height="1" />
              </g>

              <rect x="0" y="10" width="14" height="1" />
              <rect x="1" y="11" width="12" height="1" />
              <rect x="2" y="12" width="10" height="1" />
              <rect x="4" y="13" width="6" height="1" />
            </svg>

            <svg width="6" height="6" viewBox="0 0 4 4" class="text-white fill-current"><rect x="1" y="1" width="2" height="2" /></svg>
            <svg width="6" height="6" viewBox="0 0 4 4" class="text-white fill-current"><rect x="1" y="1" width="2" height="2" /></svg>

            {/* Ghost */}
            <svg width="42" height="42" viewBox="0 0 14 14" class="text-white fill-current">
              <rect x="5" y="0" width="4" height="1" />
              <rect x="3" y="1" width="8" height="1" />
              <rect x="2" y="2" width="10" height="1" />
              <rect x="1" y="3" width="12" height="1" />
              <rect x="0" y="4" width="14" height="6" />
              
              <rect x="4" y="4" width="2" height="2" fill="black" />
              <rect x="10" y="4" width="2" height="2" fill="black" />
              
              <g style="animation: frame-toggle-1 0.4s steps(1) infinite;">
                <rect x="0" y="10" width="3" height="1" />
                <rect x="4" y="10" width="6" height="1" />
                <rect x="11" y="10" width="3" height="1" />
                <rect x="0" y="11" width="2" height="1" />
                <rect x="5" y="11" width="4" height="1" />
                <rect x="12" y="11" width="2" height="1" />
                <rect x="0" y="12" width="1" height="1" />
                <rect x="6" y="12" width="2" height="1" />
                <rect x="13" y="12" width="1" height="1" />
              </g>
              <g style="animation: frame-toggle-2 0.4s steps(1) infinite;">
                <rect x="1" y="10" width="12" height="1" />
                <rect x="2" y="11" width="2" height="1" />
                <rect x="5" y="11" width="4" height="1" />
                <rect x="10" y="11" width="2" height="1" />
                <rect x="3" y="12" width="1" height="1" />
                <rect x="6" y="12" width="2" height="1" />
                <rect x="10" y="12" width="1" height="1" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      {/* Content */}
      <div class="relative z-10 mx-auto max-w-3xl">
        {/* Available For Work Badge */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          inView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          class="mb-8 flex justify-center"
        >
          <div class="flex items-center gap-3 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm">
            <div class="h-2 w-2 rounded-full bg-white animate-pulse" />
            <span class="text-xs font-mono font-medium text-white uppercase tracking-widest">Available For Work</span>
          </div>
        </Motion.div>

        {/* Main Heading */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          inView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          class="mb-8 text-center"
        >
          <h2 class="text-4xl md:text-6xl font-bebas tracking-wide text-white mb-4 leading-[0.95] text-balance uppercase">
            If you&apos;ve made it this far, we&apos;re either meant to work
            together, or you&apos;re just really into footers!
          </h2>
          <p class="text-[10px] font-mono text-white/50 mb-6 text-pretty uppercase tracking-widest">
            Let&apos;s create something amazing together.
          </p>
        </Motion.div>

        {/* CTA Buttons */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          inView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          class="mb-12 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="mailto:pranaya878@gmail.com"
            class="group relative inline-flex items-center gap-2 px-8 py-3 border border-white/30 rounded-full text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white/5 hover:border-white/50"
          >
            Book a Free Call
            <span class="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/resume.pdf"
            download
            class="group relative inline-flex items-center gap-2 px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:bg-white/15 hover:border-white/40"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download Resume
          </a>
        </Motion.div>

        {/* Social Links */}
        <Motion.div 
          initial={{ opacity: 0, y: 20 }}
          inView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          class="mb-10 flex items-center justify-center gap-6 flex-wrap"
        >
          <For each={socialLinks}>
            {(link, index) => (
              <>
                <a
                  href={link.href}
                  target={link.id === 'email' ? undefined : '_blank'}
                  rel={link.id === 'email' ? undefined : 'noopener noreferrer'}
                  aria-label={link.label}
                  class="text-neutral-400 transition-colors duration-300 hover:text-white"
                  onMouseEnter={() => setHoveredIcon(link.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  {renderIcon(link.id)}
                </a>
                {index() < socialLinks.length - 1 && (
                  <div class="w-px h-6 bg-white/20" />
                )}
              </>
            )}
          </For>
        </Motion.div>

        {/* Footer Bottom */}
        <div class="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">
          <div class="hidden sm:block">©  2026 All rights reserved.</div>
          <a href="mailto:pranaya878@gmail.com" class="hover:text-white/60 transition-colors">
            pranaya878@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
