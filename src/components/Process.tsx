import { For, type Component } from 'solid-js';
import { Motion } from 'solid-motionone';

const steps = [
  { id: '01', title: 'Concept', description: 'Understanding the core message and visual identity to establish a strong foundational aesthetic.' },
  { id: '02', title: 'Design', description: 'Translating concepts into high-impact visuals with a focus on typography, color theory, and composition.' },
  { id: '03', title: 'Direction', description: 'Guiding the overarching artistic vision to ensure consistency across all brand touchpoints.' },
  { id: '04', title: 'Execution', description: 'Delivering the final polished product, fine-tuned for performance and aesthetic perfection.' }
];

const Process: Component = () => {
  return (
    <section id="process" class="relative py-32 px-6 md:px-12 bg-black overflow-hidden border-t border-white/5">
      {/* Subtle blueprint grid */}
      <div class="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        {Array.from({ length: 4 }).map((_, i) => (
          <div class="absolute w-full h-[1px] bg-white/10" style={{ top: `${(i + 1) * 20}%` }} />
        ))}
        {Array.from({ length: 3 }).map((_, i) => (
          <div class="absolute h-full w-[1px] bg-white/10" style={{ left: `${(i + 1) * 25}%` }} />
        ))}
      </div>

      <div class="relative z-10 w-full max-w-7xl mx-auto">
        <Motion.div 
          initial={{ opacity: 0, y: 30 }}
          inView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          class="mb-20"
        >
          <p class="font-mono text-[10px] text-white/30 uppercase tracking-[0.35em] mb-3">— How it works</p>
          <h2 class="text-5xl md:text-7xl font-bebas tracking-wide text-white uppercase leading-[0.92]">THE PROCESS</h2>
        </Motion.div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <For each={steps}>
            {(step, i) => (
              <Motion.div 
                initial={{ opacity: 0, y: 30 }}
                inView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i() * 0.15 }}
                viewport={{ once: true }}
                class="group relative border border-white/10 bg-white/5 p-8 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div class="text-4xl font-bebas text-white/20 mb-6 transition-colors group-hover:text-white/60">{step.id}</div>
                <h3 class="text-2xl font-bebas text-white uppercase tracking-wide mb-3">{step.title}</h3>
                <p class="font-mono text-xs text-white/50 leading-relaxed">{step.description}</p>
              </Motion.div>
            )}
          </For>
        </div>
      </div>
    </section>
  );
};

export default Process;
