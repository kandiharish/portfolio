import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certifications from './components/Certifications';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <div className="bg-primary text-white font-sans antialiased overflow-x-hidden">
            <Navbar />
            <Hero />
            <TechMarquee />
            <About />
            <Education />
            <Skills />
            <Projects />
            <Experience />
            <Certifications />
            <Testimonials />
            <Contact />
            <Footer />
        </div>
    );
}

export default App;
