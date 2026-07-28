import React, { useState, useEffect, useRef } from "react";
import { HERO_CONTENT, LINKS } from "../constants";
import { motion, AnimatePresence } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { Link } from "react-scroll";

// 1. Interactive Water Letter Component
const WaterLetter = ({ letter, index, onHover }) => {
    const [hoverFill, setHoverFill] = useState(0);
    const letterRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!letterRef.current) return;
        const rect = letterRef.current.getBoundingClientRect();
        const y = e.clientY - rect.top;
        const percentage = 100 - ((y / rect.height) * 100);
        const fill = Math.max(0, Math.min(100, percentage));
        setHoverFill(fill);
        
        if (fill > 0) {
            onHover(index);
        }
    };

    const handleMouseLeave = () => {
        setHoverFill(0);
        onHover(null);
    };

    return (
        <span 
            ref={letterRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="pointer-events-auto cursor-crosshair transition-opacity duration-200 inline-block relative"
            style={{
                color: "transparent",
                WebkitTextStroke: hoverFill > 0 ? "2px rgba(255, 255, 255, 0.9)" : "2px rgba(255, 255, 255, 0.4)",
                opacity: hoverFill > 0 ? 1 : 0.5,
                backgroundImage: `linear-gradient(to top, #14F1D9 ${hoverFill}%, transparent ${hoverFill}%)`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                filter: hoverFill > 0 ? "drop-shadow(0 0 25px rgba(20,241,217,0.5))" : "drop-shadow(0 0 10px rgba(255,255,255,0.1))",
            }}
        >
            {letter}
        </span>
    );
};

// 2. Text Rotator Component (Now styled for a floating badge)
const RoleRotator = () => {
    const roles = ["AI Engineering", "Full Stack Dev", "Cloud Architect", "System Design"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-6 md:h-8 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -30, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="text-lg md:text-xl font-bold text-accent tracking-wide whitespace-nowrap"
                >
                    {roles[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// 2. Interactive Spotlight Image Component
const InteractiveImage = () => {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const imgRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!imgRef.current) return;
        const rect = imgRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
    };

    return (
        <div 
            className="relative w-auto h-full flex justify-end cursor-crosshair pr-4 md:pr-0"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
        >
            {/* Grayscale Base Image */}
            <img
                ref={imgRef}
                src="/passphoto-removebg-preview.png"
                alt="Harish Kandi"
                className="w-auto h-full max-h-[70vh] object-contain filter grayscale contrast-[1.1] brightness-[0.95] drop-shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            />
            {/* Colored Reveal Image (Masked) */}
            <motion.div
                animate={{ opacity: isHovering ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 z-10 pointer-events-none flex justify-end pr-4 md:pr-0"
                style={{
                    WebkitMaskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 40%, transparent 100%)`,
                    maskImage: `radial-gradient(circle 120px at ${mousePos.x}px ${mousePos.y}px, black 40%, transparent 100%)`
                }}
            >
                <img
                    src="/passphoto-removebg-preview.png"
                    alt="Harish Kandi Color"
                    className="w-auto h-full max-h-[70vh] object-contain filter contrast-[1.05]"
                />
            </motion.div>
        </div>
    );
};

const Hero = () => {
    const [hoveredLetter, setHoveredLetter] = useState(null);

    const handleLetterHover = (index) => {
        if (hoveredLetter !== index) setHoveredLetter(index);
    };

    const acronymMap = [
        { letter: 'H', text: "Human-Centered Innovation" },
        { letter: 'A', text: "AI-Driven Engineering" },
        { letter: 'R', text: "Real-World Problem Solving" },
        { letter: 'I', text: "Intelligent Product Development" },
        { letter: 'S', text: "Scalable Software Systems" },
        { letter: 'H', text: "High-Impact Execution" }
    ];

    const nameContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            }
        }
    };

    const nameLetterVariants = {
        hidden: { opacity: 0, x: -80, scale: 0.8 },
        visible: { 
            opacity: 1, 
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100
            }
        }
    };

    return (
        <section id="hero" className="min-h-screen relative overflow-hidden bg-[#070b14] pt-24 pb-0 flex flex-col justify-end">
            
            {/* Subtle Film Grain Noise Overlay for Cinematic feel */}
            <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none" 
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Studio Lighting Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]"></div>
            </div>
            
            {/* Live Opportunities Badge (Centered at top above the name) */}
            <div className="absolute top-20 md:top-24 left-1/2 transform -translate-x-1/2 z-30 w-full flex justify-center">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    <LiveStatus />
                </motion.div>
            </div>
            
            {/* Massive Background Text - Anchored to TOP completely separated from foreground text */}
            <div className="absolute top-32 md:top-40 left-1/2 transform -translate-x-1/2 w-full text-center z-10 pointer-events-none select-none">
                <motion.div 
                    variants={nameContainerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-[16vw] font-black tracking-widest leading-none flex justify-center gap-1 md:gap-4"
                >
                    {"HARISH".split("").map((letter, index) => (
                        <motion.span key={index} variants={nameLetterVariants} className="inline-block relative">
                            <WaterLetter letter={letter} index={index} onHover={handleLetterHover} />
                        </motion.span>
                    ))}
                </motion.div>
            </div>
            
            <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-end justify-between h-full relative mt-auto md:pb-12">
                
                {/* Left Column content - Pushed down to avoid overlap */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex-1 text-center md:text-left z-20 md:max-w-xl pb-16 md:pb-0 mb-8"
                >
                    {/* Removed Foreground Name */}

                    {/* Highly attractive highlight block for the mission statement */}
                    <div className="relative pl-6 py-4 mb-10 border-l-2 border-accent/50 bg-gradient-to-r from-white/[0.03] to-transparent rounded-r-2xl mx-auto md:mx-0 max-w-lg text-left">
                        <p className="text-gray-400 text-lg leading-relaxed italic font-light">
                            "Building <span className="text-white font-medium">intelligent applications</span> and <span className="text-white font-medium">scalable software</span> that solve real-world problems."
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start items-center flex-wrap">
                        {/* Custom animations for buttons */}
                        <style>
                            {`
                            @keyframes shine {
                                0% { left: -100%; }
                                20% { left: 200%; }
                                100% { left: 200%; }
                            }
                            .btn-shine {
                                position: relative;
                                overflow: hidden;
                            }
                            .btn-shine::after {
                                content: '';
                                position: absolute;
                                top: 0;
                                left: -100%;
                                width: 50%;
                                height: 100%;
                                background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0) 100%);
                                transform: skewX(-20deg);
                                animation: shine 3s infinite;
                            }
                            @keyframes gradient-border {
                                0% { background-position: 0% 50%; }
                                50% { background-position: 100% 50%; }
                                100% { background-position: 0% 50%; }
                            }
                            .btn-moving-border {
                                background: linear-gradient(90deg, rgba(20,241,217,0.8), rgba(255,255,255,0.1), rgba(20,241,217,0.8));
                                background-size: 200% 200%;
                                animation: gradient-border 3s ease infinite;
                                padding: 2px;
                                border-radius: 0.75rem;
                                display: inline-flex;
                            }
                            `}
                        </style>

                        {/* Moving Border Button */}
                        <div className="btn-moving-border shadow-[0_0_20px_rgba(20,241,217,0.3)]">
                            <a
                                href={HERO_CONTENT.resumeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-[#070b14] text-white font-bold rounded-xl transition-all hover:bg-white/5 flex items-center gap-2 btn-shine"
                            >
                                Download Resume <FaDownload className="text-sm text-accent" />
                            </a>
                        </div>

                        {/* Shining Button */}
                        <Link
                            to="projects"
                            smooth={true}
                            duration={800}
                            className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer flex items-center justify-center btn-shine shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                        >
                            View Projects
                        </Link>

                        {/* Social Links Moved Beside Buttons */}
                        <div className="flex gap-4 ml-0 sm:ml-4">
                            {LINKS.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-accent hover:border-accent/50 hover:bg-accent/10 transition-all duration-300 shadow-sm"
                                    aria-label={social.name}
                                >
                                    <social.icon className="text-xl" />
                                </a>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Right Column profile - Pushed to the right and bottom */}
                <motion.div 
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                    className="flex-1 w-full flex justify-end items-end relative z-10"
                >
                    {/* Floating Capabilities Badge */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="absolute left-0 bottom-1/4 md:left-10 z-30 hidden sm:flex flex-col gap-1 items-start w-56"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></div>
                            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Specialized In</span>
                        </div>
                        <RoleRotator />
                    </motion.div>

                    {/* Single Floating Brain Tag */}
                    <div className="absolute inset-0 pointer-events-none z-40 hidden sm:block">
                        <AnimatePresence>
                            {hoveredLetter !== null && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20, filter: "blur(4px)" }}
                                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                    exit={{ opacity: 0, x: -10, filter: "blur(4px)" }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute right-[60%] md:right-[400px] lg:right-[500px] top-[25%] md:top-[30%] z-40 flex items-start"
                                >
                                    {/* The Tag */}
                                    <div className="bg-[#0f1626]/90 border border-accent/40 backdrop-blur-xl px-5 py-2.5 rounded-xl shadow-[0_10px_30px_rgba(20,241,217,0.3)] relative z-10">
                                        <span className="text-gray-200 text-xs sm:text-sm tracking-widest uppercase font-medium">
                                            {acronymMap[hoveredLetter].text}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <InteractiveImage />
                    {/* Bottom fade gradient so the image blends into the next section smoothly */}
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#070b14] to-transparent z-20 pointer-events-none"></div>
                </motion.div>
            </div>
        </section>
    );
};

// Live Opportunities block with Shining effect
const LiveStatus = () => {
    return (
        <div className="relative inline-flex items-center gap-3 p-2 px-6 rounded-full bg-white/5 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] backdrop-blur-md animate-pulse">
            
            <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            </span>
            <span className="font-medium text-white tracking-wide text-sm">Available for Opportunities</span>
        </div>
    );
};

export default Hero;
