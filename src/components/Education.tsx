import { For, type Component } from 'solid-js';
import { Motion } from 'solid-motionone';

const education = [
  { institution: 'Hirakud Degree College, Sambalpur', degree: 'Bachelor of Commerce' },
  { institution: 'Gangadhar Meher University, Sambalpur', degree: 'CHSE' },
  { institution: 'Guru Nanak Public School, Sambalpur', degree: 'CBSE' },
];

const skills = ['Photoshop', 'Illustrator', 'Canva', 'Art Direction', 'Visual Storytelling', 'Brand Aesthetics'];

const Education: Component = () => {
  return (
    <section id="education" class="py-32 px-6 md:px-12">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-7xl mx-auto">
        
        {/* Education Column */}
        <Motion.div 
          initial={{ opacity: 0, x: -30 }}
          inView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 class="text-4xl font-bebas tracking-wide text-white mb-8 uppercase">Education</h2>
          <div class="space-y-8 border-l border-white/10 pl-6 ml-2">
            <For each={education}>
              {(item) => (
                <div class="relative">
                  <div class="absolute -left-[33px] top-2 w-4 h-4 rounded-full bg-white border-4 border-[#111]"></div>
                  <h3 class="text-2xl font-bebas tracking-wide text-white mb-1 uppercase">{item.degree}</h3>
                  <p class="text-white/40 font-mono text-xs uppercase tracking-widest">{item.institution}</p>
                </div>
              )}
            </For>
          </div>
        </Motion.div>

        {/* Skills Column */}
        <Motion.div 
          initial={{ opacity: 0, x: 30 }}
          inView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 class="text-4xl font-bebas tracking-wide text-white mb-8 uppercase">Skills & Toolkit</h2>
          <div class="flex flex-wrap gap-4">
            <For each={skills}>
              {(skill) => (
                <div class="px-6 py-3 rounded-full bg-surface border border-white/10 text-white font-mono text-xs uppercase tracking-widest hover:border-white/30 transition-colors hover:bg-white/5">
                  {skill}
                </div>
              )}
            </For>
          </div>
        </Motion.div>

      </div>
    </section>
  );
};

export default Education;
