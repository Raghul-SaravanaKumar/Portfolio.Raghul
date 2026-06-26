import { useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NeonSnake from './components/NeonSnake';
import CursorGlow from './components/CursorGlow';
import ParticleField from './components/ParticleField';

export default function App() {
  // Scroll-progress bar
  useEffect(() => {
    const bar = document.getElementById('scroll-progress-bar');
    const onScroll = () => {
      if (!bar) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <div id="scroll-progress-bar" className="scroll-progress" />
      <ParticleField />
      <CursorGlow />
      <NeonSnake />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

