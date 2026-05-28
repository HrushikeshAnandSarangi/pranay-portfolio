import { createSignal, For, type Component, Show } from 'solid-js';
import { Motion } from 'solid-motionone';
import { A } from '@solidjs/router';
import { openLightbox } from './Lightbox';

const projects = [
  { id: 1, title: 'The Weeknd - Trilogy', category: 'Poster Design', height: 'h-[400px]', image: '/works/trilogy-Recovered.jpg.jpeg', spotifyUrl: 'https://open.spotify.com/embed/track/5fohLPNqO6TqwrZ7BoUWUT?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen=' },
  { id: 2, title: 'The Weeknd 12', category: 'Poster Design', height: 'h-[300px]', image: '/works/weekend%2012.jpg.jpeg' },
  { id: 3, title: 'Hawaa', category: 'Creative Artwork', height: 'h-[500px]', image: '/works/Hawaa%20by%20Humlog.jpg.jpeg' },
  { id: 4, title: 'Keychain Laalu', category: 'Product Mockup', height: 'h-[350px]', image: '/works/Keychain%20Laalu%20011.jpg.jpeg',spotifyUrl: 'https://open.spotify.com/embed/track/1jwSHprYPkvenDY0CZNUEI?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen=' },
];

const Work: Component = () => {
  const [activeTrack, setActiveTrack] = createSignal<string | null>(null);

  const getTrackId = (url: string) => {
    try {
      return new URL(url).pathname.split('/').pop();
    } catch {
      return url; // fallback if already an ID
    }
  };

  return (
    <section id="work" class="py-32 px-6 md:px-12 flex justify-center">
      <div class="w-full max-w-7xl">
        <div class="mb-16">
        <h2 class="text-5xl md:text-7xl font-bebas tracking-wide text-white mb-4 uppercase">THE WORK</h2>
        <p class="text-white/40 font-mono text-xs max-w-xl italic">A collection of my recent graphic design and visual storytelling projects.</p>
      </div>

      <div class="columns-1 md:columns-2 gap-6 space-y-6">
        <For each={projects}>
          {(project, i) => (
            <Motion.div
              initial={{ opacity: 0, y: 50 }}
              inView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i() * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              class={`relative group overflow-hidden rounded-xl bg-surface break-inside-avoid ${!project.spotifyUrl ? 'cursor-zoom-in' : ''} ${project.height}`}
              onClick={(e) => {
                if (!project.spotifyUrl && project.image) {
                  openLightbox(project.image);
                }
              }}
            >
              <div class="absolute inset-0 bg-gradient-to-br from-black to-neutral-900 -z-20"></div>
              
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.title} 
                  class="absolute inset-0 w-full h-full object-cover -z-10 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110" 
                  loading="lazy"
                />
              )}
              
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 pointer-events-none">
                <div class="absolute top-8 right-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 flex items-center gap-2">
                  
                  {/* Spotify Play Button */}
                  {project.spotifyUrl && (
                    <button 
                      class="bg-[#1DB954] hover:bg-[#1ed760] p-3 rounded-full text-black pointer-events-auto transition-transform hover:scale-110 shadow-[0_0_20px_rgba(29,185,84,0.4)]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTrack(project.spotifyUrl!);
                      }}
                      title="Play Song"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                    </button>
                  )}

                  {/* Lightbox Zoom Button */}
                  <button 
                    class="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full text-white pointer-events-auto transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (project.image) openLightbox(project.image);
                    }}
                    title="View Image"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
                  </button>
                </div>
                <h3 class="text-3xl font-bebas tracking-wider text-white mb-1 uppercase">{project.title}</h3>
                <p class="text-white/50 font-mono text-xs tracking-widest uppercase">{project.category}</p>
              </div>
            </Motion.div>
          )}
        </For>
      </div>
      
      <div class="mt-20 flex flex-col sm:flex-row justify-center items-center gap-4">
        <a 
          href="https://www.behance.net/botxdemon" 
          target="_blank"
          class="inline-flex items-center justify-center gap-2 text-white border border-white/20 hover:border-white/50 px-8 py-4 rounded-full transition-all hover:bg-white/5 w-full sm:w-auto font-mono text-xs uppercase tracking-widest"
        >
          View Full Portfolio on Behance
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
        <A 
          href="/works" 
          class="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors w-full sm:w-auto font-mono text-xs uppercase tracking-widest"
        >
          Explore More Work
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 8 4 4-4 4"/><path d="M8 12h8"/></svg>
        </A>
        </div>
      </div>

      {/* Global Spotify Mini Player */}
      <Show when={activeTrack()}>
        <div class="fixed bottom-6 right-6 z-[100] bg-black/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-8">
          <div class="flex justify-between items-center mb-3 px-1">
            <div class="flex items-center gap-2">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1DB954] opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-[#1DB954]"></span>
              </span>
              <span class="text-[10px] font-mono text-white/60 uppercase tracking-widest">Now Playing</span>
            </div>
            <button 
              onClick={() => setActiveTrack(null)}
              class="text-white/40 hover:text-white transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          <iframe 
            style="border-radius:12px; border: 1px solid rgba(255,255,255,0.1);" 
            src={`https://open.spotify.com/embed/track/${getTrackId(activeTrack()!)}?utm_source=generator&theme=0`} 
            width="320" 
            height="80" 
            frameBorder="0" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        </div>
      </Show>
    </section>
  );
};

export default Work;
