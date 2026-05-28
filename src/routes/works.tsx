import type { Component } from 'solid-js';
import { For } from 'solid-js';
import { Motion } from 'solid-motionone';
import { A } from '@solidjs/router';
import { openLightbox } from '../components/Lightbox';

const worksImages = [
  '/works/Ariana%20wallpaper.png',
  '/works/Hawaa%20by%20Humlog.jpg.jpeg',
  '/works/Keychain%20Laalu%20011.jpg.jpeg',
  '/works/trilogy-Recovered.jpg.jpeg',
  '/works/weekend%2012.jpg.jpeg'
];

const Works: Component = () => {
  return (
    <div class="min-h-screen bg-background text-gray-200 selection:bg-white selection:text-black font-sans px-6 md:px-12 py-12">
      <div class="max-w-7xl mx-auto">
        {/* Header & Back Button */}
        <div class="flex items-center justify-between mb-16">
          <A 
            href="/" 
            class="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors border border-white/10 hover:border-white/30 rounded-full px-6 py-3 bg-surface"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            Back to Home
          </A>
        </div>

        {/* Gallery Grid */}
        <div class="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          <For each={worksImages}>
            {(src, i) => (
              <Motion.div
                initial={{ opacity: 0, y: 30 }}
                inView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i() * 0.1 }}
                viewport={{ once: true }}
                class="break-inside-avoid relative group rounded-xl overflow-hidden bg-surface cursor-zoom-in"
                onClick={() => openLightbox(src)}
              >
                <img 
                  src={src} 
                  alt={`Artwork ${i() + 1}`} 
                  class="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                  <div class="bg-white/20 backdrop-blur-sm p-4 rounded-full text-white transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><line x1="11" x2="11" y1="8" y2="14"/><line x1="8" x2="14" y1="11" y2="11"/></svg>
                  </div>
                </div>
              </Motion.div>
            )}
          </For>
        </div>
      </div>
    </div>
  );
};

export default Works;
