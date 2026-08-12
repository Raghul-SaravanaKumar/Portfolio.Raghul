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
  return (
    <>
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
