import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Leadership from './components/Leadership';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Soft glow that trails the cursor. Motion values (no React re-render per mousemove) and a
// radial gradient instead of a blur filter keep it cheap. Skipped on touch screens.
const CustomCursor = () => {
    const reduce = useReducedMotion();
    const [enabled] = useState(() => window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    const x = useMotionValue(-400);
    const y = useMotionValue(-400);
    const sx = useSpring(x, { stiffness: 140, damping: 22, mass: 0.6 });
    const sy = useSpring(y, { stiffness: 140, damping: 22, mass: 0.6 });

    useEffect(() => {
        if (!enabled || reduce) return;
        const onMove = (e) => {
            x.set(e.clientX - 160);
            y.set(e.clientY - 160);
        };
        window.addEventListener('mousemove', onMove, { passive: true });
        return () => window.removeEventListener('mousemove', onMove);
    }, [enabled, reduce, x, y]);

    if (!enabled || reduce) return null;
    return (
        <motion.div
            className="pointer-events-none fixed left-0 top-0 z-0 h-80 w-80 rounded-full"
            style={{ x: sx, y: sy, background: 'radial-gradient(circle, rgba(20,241,217,0.09) 0%, rgba(20,241,217,0) 70%)' }}
        />
    );
};

function App() {
    return (
        <div className="bg-primary text-white font-sans antialiased overflow-x-clip relative">
            <CustomCursor />
            <div className="relative z-10">
                <Navbar />
                <Hero />
                <TechMarquee />
                <About />
                <Experience />
                <Education />
                <Skills />
                <Projects />
                <Leadership />
                <Certifications />
                <Testimonials />
                <Contact />
                <Footer />
            </div>
        </div>
    );
}

export default App;
