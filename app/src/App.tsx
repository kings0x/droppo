import Navbar from "./Navbar";
import Hero from "./Hero";
import { AboutSection, PublicSection, TeamSection } from "./Sections";
import Projects from "./Projects";
import FaqCta from "./FaqCta";
import Footer from "./Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-ash-900 font-sans text-paper antialiased">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-ash-900"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <Projects />
        <TeamSection />
        <PublicSection />
        <FaqCta />
      </main>
      <Footer />
    </div>
  );
}
