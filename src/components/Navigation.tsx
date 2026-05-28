import type { Component } from 'solid-js';
import { Motion } from 'solid-motionone';

const Navigation: Component = () => {
  return (
    <Motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, easing: "ease-out" }}
      class="fixed top-0 left-0 w-full z-50 flex justify-center px-4 md:px-12 py-4 md:py-6 backdrop-blur-md bg-background/80 border-b border-white/5"
    >
      <div class="w-full max-w-7xl flex items-center justify-between gap-4">
        <div class="text-xl md:text-2xl font-bebas tracking-wider text-white truncate shrink-0">
          PRANAYA PRADHAN.
        </div>
        <div class="hidden md:flex items-center gap-8 text-xs font-mono font-medium text-gray-400 uppercase tracking-widest">
          <a href="#work" class="hover:text-white transition-colors">Work</a>
          <a href="#experience" class="hover:text-white transition-colors">Experience</a>
          <a href="#education" class="hover:text-white transition-colors">Education</a>
        </div>
        <div class="flex items-center gap-3 md:gap-4 text-xs font-mono font-medium text-gray-400 uppercase tracking-widest">
          <a href="mailto:pranaya878@gmail.com" class="hidden sm:block hover:text-white transition-colors">Email</a>
          <a href="https://www.behance.net/botxdemon" target="_blank" class="hidden md:block hover:text-white transition-colors">Behance</a>
          <a href="https://www.linkedin.com/in/pranaya-pradhan-2a029837b/" target="_blank" class="hidden md:block hover:text-white transition-colors">LinkedIn</a>
          <a href="/resume.pdf" download class="hover:text-black transition-colors bg-white text-black px-4 py-2 rounded-full font-bold">Resume</a>
        </div>
      </div>
    </Motion.nav>
  );
};

export default Navigation;
