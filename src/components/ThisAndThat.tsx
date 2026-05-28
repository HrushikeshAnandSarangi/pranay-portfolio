import { For, type Component } from 'solid-js';
import { Motion } from 'solid-motionone';

const items = [
  { title: 'Photography', description: 'Capturing moments through a monochromatic lens.' },
  { title: 'Typography', description: 'Experimenting with structural layouts and brutalist forms.' },
  { title: 'Cinematography', description: 'Studying motion, light, and composition in classic films.' },
  { title: 'Music', description: 'Finding rhythm and pacing for visual sequences.' }
];

const ThisAndThat: Component = () => {
  return (
    <section id="this-and-that" class="relative py-32 px-6 md:px-12 bg-black overflow-hidden border-t border-white/5">
      <div class="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        <Motion.div 
          initial={{ opacity: 0, x: -30 }}
          inView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          class="md:w-1/3"
        >
          <p class="font-mono text-[10px] text-white/30 uppercase tracking-[0.35em] mb-3">— Extras</p>
          <h2 class="text-5xl md:text-7xl font-bebas tracking-wide text-white uppercase leading-[0.92]">THIS & THAT</h2>
          <p class="font-mono text-xs text-white/40 mt-6 leading-relaxed italic">Beyond the pixels, these are the disciplines that inform my creative direction and everyday inspiration.</p>
        </Motion.div>

        <div class="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
          <For each={items}>
            {(item, i) => (
              <Motion.div 
                initial={{ opacity: 0, y: 20 }}
                inView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i() * 0.1 }}
                viewport={{ once: true }}
                class="border-l-2 border-white/10 pl-6 hover:border-white/40 transition-colors"
              >
                <h3 class="text-xl font-bebas text-white uppercase tracking-widest mb-2">{item.title}</h3>
                <p class="font-mono text-xs text-white/40 leading-relaxed">{item.description}</p>
              </Motion.div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
};

export default ThisAndThat;
