import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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

const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    return (
        <motion.div
            className="fixed top-0 left-0 w-80 h-80 bg-accent/10 rounded-full blur-[80px] pointer-events-none z-0"
            animate={{
                x: mousePosition.x - 160,
                y: mousePosition.y - 160,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
        />
    );
};

function App() {
    return (
        <div className="bg-primary text-white font-sans antialiased overflow-x-hidden relative">
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
