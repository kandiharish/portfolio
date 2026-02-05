import React, { useState, useEffect } from "react";
import { HERO_CONTENT, LINKS } from "../constants";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";
import { Link } from "react-scroll";

const BubbleBackground = () => {
    // Generate random bubbles
    const bubbles = Array.from({ length: 20 }).map((_, i) => ({
        size: Math.random() * 80 + 20, // 20px to 100px
        left: Math.random() * 100, // 0% to 100%
        duration: Math.random() * 10 + 10, // 10s to 20s
        delay: Math.random() * 5,
        opacity: Math.random() * 0.3 + 0.1,
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {bubbles.map((bubble, i) => (
                <motion.div
                    key={i}
                    className="absolute bottom-[-100px] rounded-full bg-accent/20 border border-accent/20 backdrop-blur-sm"
                    initial={{ y: 0, opacity: 0 }}
                    animate={{
                        y: -1000,
                        opacity: [0, bubble.opacity, 0],
                        x: [0, Math.random() * 50 - 25, 0], // Slight horizontal wobble
                    }}
                    transition={{
                        duration: bubble.duration,
                        repeat: Infinity,
                        delay: bubble.delay,
                        ease: "linear",
                    }}
                    style={{
                        width: bubble.size,
                        height: bubble.size,
                        left: `${bubble.left}%`,
                    }}
                />
            ))}
        </div>
    );
};

const TypewriterName = ({ name }) => {
    const letters = name.split("");

    return (
        <motion.span
            initial="hidden"
            animate="visible"
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.15, // Approx 2s total for ~12 chars
                    },
                },
            }}
        >
            {letters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: { opacity: 1, x: 0 },
                    }}
                    style={{ display: "inline-block" }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
};

const Hero = () => {
    return (
        <section
            id="hero"
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-primary"
        >
            {/* New Bubble Background */}
            <BubbleBackground />

            {/* Gradient Overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary pointer-events-none"></div>

            <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="text-center md:text-left order-2 md:order-1">


                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 leading-tight min-h-[80px]"
                    >
                        <TypewriterName name={HERO_CONTENT.name} />
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-2xl md:text-4xl text-gray-400 font-light mb-8"
                    >
                        {HERO_CONTENT.tagline}
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-gray-400 text-lg mb-10 leading-relaxed max-w-lg mx-auto md:mx-0"
                    >
                        {HERO_CONTENT.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="flex flex-col md:flex-row gap-4 justify-center md:justify-start items-center"
                    >
                        <div className="flex gap-4">
                            <a
                                href={HERO_CONTENT.resumeLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-3 bg-accent text-white font-medium rounded hover:bg-blue-600 transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)] transform hover:-translate-y-1 relative z-20"
                            >
                                View Resume
                            </a>
                            <Link
                                to="projects"
                                smooth={true}
                                duration={500}
                                className="px-8 py-3 border border-gray-500 text-gray-300 font-medium rounded hover:border-accent hover:text-accent transition-all cursor-pointer relative z-20 flex items-center gap-2"
                            >
                                View Projects
                            </Link>
                        </div>

                        {/* Social Links Row */}
                        <div className="flex gap-4 mt-4 md:mt-0 md:ml-6 relative z-20">
                            {LINKS.filter(link => link.name !== "Email").map((social, index) => (
                                <a
                                    key={index}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-white hover:scale-110 transition-all text-2xl"
                                    aria-label={social.name}
                                >
                                    <social.icon />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Profile Image - Right Side */}
                <div className="order-1 md:order-2 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }} // Slow motion opening
                        className="relative w-64 h-64 md:w-96 md:h-96"
                    >
                        {/* Glowing ring effect */}
                        <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute inset-2 rounded-full border border-accent/50 animate-[spin_15s_linear_infinite_reverse]"></div>

                        <img
                            src="/picture.png"
                            alt="Harish Kandi"
                            className="w-full h-full object-cover rounded-full border-4 border-primary shadow-[0_0_30px_rgba(59,130,246,0.3)] relative z-10"
                        />
                    </motion.div>
                </div>
            </div>


        </section>
    );
};

export default Hero;
