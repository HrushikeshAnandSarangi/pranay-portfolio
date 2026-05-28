import { createSignal, Show, type Component } from 'solid-js';
import { Portal } from 'solid-js/web';
import { Motion } from 'solid-motionone';

export const [activeImage, setActiveImage] = createSignal<string | null>(null);

export const openLightbox = (src: string) => setActiveImage(src);
export const closeLightbox = () => setActiveImage(null);

export const Lightbox: Component = () => {
  return (
    <Show when={activeImage()}>
      <Portal>
        <Motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          class="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
          onClick={closeLightbox}
        >
          <button 
            class="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-gray-300 bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors z-[101]"
            onClick={closeLightbox}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
          
          <Motion.img 
            src={activeImage()!} 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1, easing: "ease-out" }}
            class="max-w-full max-h-full object-contain rounded-lg shadow-2xl cursor-default" 
            onClick={(e: Event) => e.stopPropagation()}
          />
        </Motion.div>
      </Portal>
    </Show>
  );
};
