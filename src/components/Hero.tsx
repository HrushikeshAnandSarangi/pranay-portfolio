import { createSignal, onMount, type Component, Show } from 'solid-js';
import { Motion } from 'solid-motionone';

const Hero: Component = () => {
  const [mousePos, setMousePos] = createSignal({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = createSignal(false);
  const [isDealt, setIsDealt] = createSignal(false);
  const [loaderDone, setLoaderDone] = createSignal(false);
  
  onMount(() => {
    setTimeout(() => setLoaderDone(true), 2400); // Matches loader duration
    setTimeout(() => setIsDealt(true), 3800); // 1.4s after cards appear
  });
  
  let containerRef: HTMLDivElement | undefined;

  let mouseReq: number;
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef) return;
    if (mouseReq) cancelAnimationFrame(mouseReq);
    mouseReq = requestAnimationFrame(() => {
      const rect = containerRef!.getBoundingClientRect();
      // Calculate relative mouse position (-1 to 1)
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMousePos({ x, y });
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section class="min-h-screen flex justify-center px-6 md:px-12 pt-20">
      <Show when={loaderDone()}>
        <div class="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12">
        <div class="flex-1 flex flex-col justify-center">
          <Motion.div 
            initial={{ opacity: 0, y: 30 }}
            inView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            class="max-w-3xl"
          >
            <h1 class="text-5xl md:text-[6rem] xl:text-[7rem] font-bebas tracking-wide leading-[0.95] mb-8 text-white uppercase">
              Visual Storyteller <br/>
              <span class="text-white/40">& Creative Designer.</span>
            </h1>
          </Motion.div>
          
          <Motion.div 
            initial={{ opacity: 0, y: 30 }}
            inView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            class="max-w-xl text-sm md:text-sm text-white/60 leading-[1.7] font-mono font-light"
          >
            <p>
              B.Com student with a strong passion for creative designing and visual storytelling. 
              Freelance graphic designer driven by art direction, brand aesthetics, and concept development. 
            </p>
          </Motion.div>
        </div>

        {/* Interactive 3D Card Deck */}
        <div class="flex-1 flex justify-center md:justify-end w-full lg:pr-12">
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            class="relative w-full max-w-sm aspect-[3/4] mt-16 md:mt-0 group cursor-pointer"
            style={{ perspective: '1200px' }}
          >
            <div
              class="relative w-full h-full transition-transform duration-300 ease-out"
              style={{ 
                'transform-style': 'preserve-3d',
                transform: isHovered() 
                  ? `rotateX(${mousePos().y * -15}deg) rotateY(${mousePos().x * 15}deg)` 
                  : 'rotateX(0deg) rotateY(0deg)'
              }}
            >
              {/* Ace of Clubs (Bottom Card) */}
              <Motion.div 
                initial={{ opacity: 0, x: 200, y: 150, rotate: 45 }}
                inView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.2, easing: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true, margin: "50px" }}
                class="absolute inset-0"
              >
                <div 
                  class="absolute inset-0 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl flex flex-col p-4 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-left"
                  style={{
                    transform: isHovered() ? 'rotate(25deg) translateX(40px) translateY(-10px)' : 'rotate(10deg) translateX(10px)'
                  }}
                >
                <div class="flex flex-col items-center self-start text-white/20">
                  <span class="font-bebas text-2xl leading-none">A</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="mt-1"><path d="M12 2c1.1 0 2 .9 2 2 0 1-.7 1.8-1.6 1.9C14.7 6.4 16 8.5 16 11c0 2.2-1.8 4-4 4v7h-4v-7c-2.2 0-4-1.8-4-4 0-2.5 1.3-4.6 3.6-5.1C6.7 5.8 6 5 6 4c0-1.1.9-2 2-2 1.1 0 2 .9 2 2 0 .5-.2 1-.5 1.4.3.4.8.6 1.5.6s1.2-.2 1.5-.6C12.2 5 12 4.5 12 4c0-1.1.9-2 2-2z"/></svg>
                </div>
                <div class="absolute inset-0 flex items-center justify-center text-white/10 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2c1.1 0 2 .9 2 2 0 1-.7 1.8-1.6 1.9C14.7 6.4 16 8.5 16 11c0 2.2-1.8 4-4 4v7h-4v-7c-2.2 0-4-1.8-4-4 0-2.5 1.3-4.6 3.6-5.1C6.7 5.8 6 5 6 4c0-1.1.9-2 2-2 1.1 0 2 .9 2 2 0 .5-.2 1-.5 1.4.3.4.8.6 1.5.6s1.2-.2 1.5-.6C12.2 5 12 4.5 12 4c0-1.1.9-2 2-2z"/></svg>
                </div>
                </div>
              </Motion.div>
              
              {/* Ace of Spades (Middle Card) */}
              <Motion.div 
                initial={{ opacity: 0, x: -200, y: 150, rotate: -45 }}
                inView={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
                transition={{ duration: 1, delay: 0.35, easing: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true, margin: "50px" }}
                class="absolute inset-0"
              >
                <div 
                  class="absolute inset-0 bg-[#111] border border-white/10 rounded-2xl shadow-2xl flex flex-col p-4 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right"
                  style={{
                    transform: isHovered() ? 'rotate(-18deg) translateX(-35px) translateY(-5px)' : 'rotate(-5deg) translateX(-5px)'
                  }}
                >
                <div class="flex flex-col items-center self-start text-white/15">
                  <span class="font-bebas text-2xl leading-none">A</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" class="mt-1"><path d="M12 2C8 6 4 11 4 15c0 3 2 5 4 5 1.5 0 2.5-1 4-2 1.5 1 2.5 2 4 2 2 0 4-2 4-5 0-4-4-9-8-13z"/></svg>
                </div>
                <div class="absolute inset-0 flex items-center justify-center text-white/5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8 6 4 11 4 15c0 3 2 5 4 5 1.5 0 2.5-1 4-2 1.5 1 2.5 2 4 2 2 0 4-2 4-5 0-4-4-9-8-13z"/></svg>
                </div>
                </div>
              </Motion.div>

              {/* Ace of Diamonds (Top Main Card) */}
              <Motion.div 
                initial={{ opacity: 0, y: -200, rotate: 30, scale: 1.2 }}
                inView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.5, easing: [0.23, 1, 0.32, 1] }}
                viewport={{ once: true, margin: "50px" }}
                class="absolute inset-0"
                style={{ 'perspective': '1000px' }}
              >
                <div 
                  class="absolute inset-0 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-10 transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    'transform-style': 'preserve-3d',
                    transform: `${!isDealt() ? 'rotateY(180deg)' : 'rotateY(0deg)'} ${isHovered() ? 'translateZ(40px) translateY(-10px)' : 'translateZ(0px)'}`
                  }}
                >
                  {/* FRONT FACE (Profile Image) */}
                  <div class="absolute inset-0 bg-[#000] rounded-2xl overflow-hidden border border-white/5" style={{ 'backface-visibility': 'hidden' }}>
                    <img 
                      src="/profile.jpeg" 
                      alt="Pranaya Pradhan" 
                      class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] scale-105"
                      style={{
                        transform: isHovered() ? 'scale(1.1)' : 'scale(1.05)'
                      }}
                    />
                    {/* Permanent cinematic overlay (vignette) - removed heavy SVG grain for performance */}
                    <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 pointer-events-none" />
                    
                    {/* 3D Glare effect on hover */}
                    <div 
                      class="absolute inset-0 pointer-events-none transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at ${mousePos().x * 50 + 50}% ${mousePos().y * 50 + 50}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
                        opacity: isHovered() ? 1 : 0
                      }}
                    />
                    
                    {/* Corner Diamond Motif */}
                    <div class="absolute top-4 left-4 flex flex-col items-center text-white/70 transition-all duration-700"
                         style={{ opacity: isHovered() ? 1 : 0, transform: isHovered() ? 'translateY(0)' : 'translateY(-10px)' }}>
                      <span class="font-bebas text-xl leading-none drop-shadow-md">A</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor" class="mt-1 drop-shadow-md"><path d="M12 2L2 12l10 10 10-10L12 2z"/></svg>
                    </div>
                  </div>

                  {/* BACK FACE (Card Back Design) */}
                  <div class="absolute inset-0 bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 flex flex-col items-center justify-center" style={{ 'backface-visibility': 'hidden', transform: 'rotateY(180deg)' }}>
                    <div class="absolute inset-2 border border-white/5 rounded-xl pointer-events-none" />
                    <div class="absolute inset-4 border border-white/5 rounded-lg pointer-events-none" />
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" class="text-white/10"><path d="M12 2L2 12l10 10 10-10L12 2z"/></svg>
                  </div>
                </div>
              </Motion.div>
            </div>
          </div>
          </div>
        </div>
      </Show>
    </section>
  );
};

export default Hero;
