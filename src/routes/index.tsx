import Navigation from "../components/Navigation";
import Hero from "../components/Hero";
import Work from "../components/Work";
import Experience from "../components/Experience";
import Process from "../components/Process";
import Education from "../components/Education";
import ThisAndThat from "../components/ThisAndThat";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div class="min-h-screen bg-background text-gray-200 selection:bg-white selection:text-black font-sans">
      <Navigation />
      <main>
        <Hero />
        <Work />
        <Process />
        <Experience />
        <Education />
        <ThisAndThat />
      </main>
      <Footer />
    </div>
  );
}
