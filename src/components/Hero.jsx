import React, { useState, useEffect, useRef, useMemo } from "react";
import { HERO_CONTENT, LINKS } from "../constants";
import {
    motion,
    AnimatePresence,
    animate,
    useMotionValue,
    useMotionTemplate,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { Link } from "react-scroll";

const EASE = [0.16, 1, 0.3, 1];
const ACCENT = "#14F1D9";
const NAME = "HARISH";
const LETTER_HEIGHT = "16vw"; // matches text-[16vw] + leading-none on the name row
const REST_FILL = 0.3;

const ACRONYM = [
    "Human-Centered Innovation",
    "AI-Driven Engineering",
    "Real-World Problem Solving",
    "Intelligent Product Development",
    "Scalable Software Systems",
    "High-Impact Execution",
];

const NAME_ROW = "text-[16vw] font-black tracking-widest leading-none flex justify-center gap-1 md:gap-4";
const NAME_POSITION = "absolute top-32 md:top-40 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none";

// Wave crest tile that rides on top of the liquid fill
const WAVE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='24' viewBox='0 0 120 24'%3E%3Cpath d='M0 16 Q15 8 30 16 T60 16 T90 16 T120 16 V22 H0Z' fill='%2314F1D9'/%3E%3C/svg%3E")`;

// Wave tile rides on top of a solid block; both move with --fill (0–1), the tile drifts with --wave (0–1)
const MASK_IMAGE = `${WAVE}, linear-gradient(#000, #000)`;
const MASK_SIZE = `8vw 1.65vw, 100% calc(${LETTER_HEIGHT} * var(--fill))`;
const MASK_POSITION = `left calc(var(--wave, 0) * 8vw) bottom calc(${LETTER_HEIGHT} * var(--fill) - 0.3vw), left 0 bottom 0`;
const LIQUID_MASK = {
    WebkitMaskImage: MASK_IMAGE,
    maskImage: MASK_IMAGE,
    WebkitMaskRepeat: "repeat-x, no-repeat",
    maskRepeat: "repeat-x, no-repeat",
    WebkitMaskSize: MASK_SIZE,
    maskSize: MASK_SIZE,
    WebkitMaskPosition: MASK_POSITION,
    maskPosition: MASK_POSITION,
};

// 1. Liquid Letter — fills on load in a wave, then follows the cursor height on hover
const LiquidLetter = ({ letter, index, active, touch, reduce, onEnter, onLeave }) => {
    const ref = useRef(null);
    const fill = useMotionValue(reduce ? REST_FILL : 0);

    useEffect(() => {
        ref.current?.style.setProperty("--fill", fill.get());
        return fill.on("change", (v) => ref.current?.style.setProperty("--fill", v));
    }, [fill]);

    // Intro: rise to the brim in sequence, then settle to a resting level
    useEffect(() => {
        if (reduce) return;
        const controls = animate(fill, [0, 1, REST_FILL], {
            duration: 1.1,
            times: [0, 0.45, 1],
            ease: EASE,
            delay: 0.35 + index * 0.08,
        });
        return () => controls.stop();
    }, [fill, index, reduce]);

    // Touch devices have no hover, so the auto-cycle drives the fill instead
    useEffect(() => {
        if (!touch) return;
        const controls = animate(fill, active ? 0.92 : REST_FILL, { duration: 0.6, ease: EASE });
        return () => controls.stop();
    }, [active, touch, fill]);

    // Surface drifts sideways only while the letter is active
    useEffect(() => {
        if (!active || reduce) return;
        const drift = animate(0, 1, {
            duration: 1.4,
            ease: "linear",
            repeat: Infinity,
            onUpdate: (v) => ref.current?.style.setProperty("--wave", v),
        });
        return () => drift.stop();
    }, [active, reduce]);

    const handleMove = (e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const level = Math.min(1, Math.max(0, 1 - (e.clientY - rect.top) / rect.height));
        animate(fill, level, { duration: 0.3, ease: EASE });
    };

    const handleEnter = (e) => {
        if (e.pointerType === "mouse") onEnter(index);
    };

    const handleLeave = (e) => {
        if (e.pointerType !== "mouse") return;
        animate(fill, REST_FILL, { duration: 0.7, ease: EASE });
        onLeave(index);
    };

    return (
        <span
            ref={ref}
            onPointerMove={handleMove}
            onPointerEnter={handleEnter}
            onPointerLeave={handleLeave}
            className="liquid-letter pointer-events-auto cursor-crosshair transition-[opacity,filter] duration-200 inline-block relative"
            style={{
                opacity: active ? 1 : 0.5,
                filter: active ? "drop-shadow(0 0 25px rgba(20,241,217,0.5))" : "none",
            }}
        >
            {/* Liquid: a solid copy of the letter, masked to a wave surface at the fill level */}
            <span aria-hidden className="absolute inset-0" style={{ color: ACCENT, ...LIQUID_MASK }}>
                {letter}
            </span>
            {/* Outline drawn on top */}
            <span
                className="relative"
                style={{
                    color: "transparent",
                    WebkitTextStroke: active ? "2px rgba(255, 255, 255, 0.9)" : "2px rgba(255, 255, 255, 0.4)",
                }}
            >
                {letter}
            </span>
        </span>
    );
};

// Types its text out once; an invisible copy reserves the final width so nothing jumps
const TypeText = ({ text, delay = 0 }) => {
    const count = useMotionValue(0);
    const shown = useTransform(count, (c) => text.slice(0, Math.round(c)));

    useEffect(() => {
        count.set(0);
        const controls = animate(count, text.length, { duration: text.length * 0.02, ease: "linear", delay });
        return () => controls.stop();
    }, [text, delay, count]);

    return (
        <span className="relative">
            <span className="invisible">{text}</span>
            <motion.span className="absolute inset-0">{shown}</motion.span>
        </span>
    );
};

const DefinitionTag = ({ text }) => (
    <div className="bg-[#0f1626]/90 border border-accent/40 backdrop-blur-xl px-5 py-2.5 rounded-xl shadow-[0_10px_30px_rgba(20,241,217,0.3)] whitespace-nowrap">
        <span className="text-gray-200 text-xs sm:text-sm tracking-widest uppercase font-medium">
            <TypeText text={text} delay={0.12} />
        </span>
    </div>
);

// 2. Definition overlay — an invisible copy of the name row that sits above the photo,
// so each definition hangs directly under its letter
const DefinitionLayer = ({ activeIndex }) => (
    <div className={`${NAME_POSITION} z-30`} aria-hidden>
        <div className={`${NAME_ROW} relative`}>
            {NAME.split("").map((letter, index) => {
                const align =
                    index === 0
                        ? "left-1/2 items-start"
                        : index === NAME.length - 1
                        ? "right-1/2 items-end"
                        : "left-1/2 -translate-x-1/2 items-center";
                return (
                    <span key={index} className="relative inline-block">
                        <span className="invisible">{letter}</span>
                        <AnimatePresence>
                            {activeIndex === index && (
                                <motion.div
                                    className={`absolute top-full mt-2 hidden sm:flex flex-col text-left text-sm leading-normal tracking-normal font-normal ${align}`}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0, transition: { duration: 0.15 } }}
                                >
                                    <motion.span
                                        className="w-px h-10 bg-accent/70 origin-top"
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{ duration: 0.25, ease: EASE }}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: -4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.25, ease: EASE, delay: 0.1 }}
                                    >
                                        <DefinitionTag text={ACRONYM[index]} />
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </span>
                );
            })}

            {/* Mobile: one centered tag under the whole name */}
            <div className="sm:hidden absolute top-full left-1/2 -translate-x-1/2 mt-4 text-left text-sm leading-normal tracking-normal font-normal">
                <AnimatePresence mode="wait">
                    {activeIndex !== null && (
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.25, ease: EASE }}
                        >
                            <DefinitionTag text={ACRONYM[activeIndex]} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    </div>
);

// Text Rotator Component (styled for a floating badge)
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
                    transition={{ duration: 0.4, ease: EASE }}
                    className="text-lg md:text-xl font-bold text-accent tracking-wide whitespace-nowrap"
                >
                    {roles[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

// 3. Photo — colour follows the cursor with a soft lag, and sweeps in when a letter is active
const InteractiveImage = ({ sweepIndex }) => {
    const spring = { stiffness: 260, damping: 28, mass: 0.6 };
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sx = useSpring(mx, spring);
    const sy = useSpring(my, spring);
    const radiusSpring = useSpring(0, { stiffness: 220, damping: 26 });
    const radius = useTransform(radiusSpring, (r) => Math.max(0.1, r));
    const sweep = useSpring(0, { stiffness: 120, damping: 22 });

    useEffect(() => {
        // First letter already reaches the face (~45%); the last one colours the whole photo
        sweep.set(sweepIndex === null ? 0 : 45 + (sweepIndex / (NAME.length - 1)) * 80);
    }, [sweepIndex, sweep]);

    const mask = useMotionTemplate`radial-gradient(circle ${radius}px at ${sx}px ${sy}px, black 40%, transparent 100%), linear-gradient(to right, black calc(${sweep}% - 25%), transparent ${sweep}%)`;

    const position = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    return (
        <div
            className="relative w-auto h-full flex justify-end cursor-crosshair pr-4 md:pr-0"
            onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                const { x, y } = position(e);
                mx.set(x);
                my.set(y);
                sx.jump(x);
                sy.jump(y);
                radiusSpring.set(120);
            }}
            onPointerMove={(e) => {
                if (e.pointerType !== "mouse") return;
                const { x, y } = position(e);
                mx.set(x);
                my.set(y);
            }}
            onPointerLeave={() => radiusSpring.set(0)}
        >
            {/* Grayscale Base Image */}
            <img
                src="/passphoto-removebg-preview.png"
                alt="Harish Kandi"
                fetchpriority="high"
                className="w-auto h-full max-h-[70vh] object-contain filter grayscale contrast-[1.1] brightness-[0.95] drop-shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"
            />
            {/* Colored Reveal Image (Masked) */}
            <motion.div
                className="absolute inset-0 z-10 pointer-events-none flex justify-end pr-4 md:pr-0"
                style={{ WebkitMaskImage: mask, maskImage: mask }}
            >
                <img
                    src="/passphoto-removebg-preview.png"
                    alt=""
                    className="w-auto h-full max-h-[70vh] object-contain filter contrast-[1.05]"
                />
            </motion.div>
        </div>
    );
};

// Buttons drift slightly toward the cursor
const Magnetic = ({ children, strength = 0.25 }) => {
    const spring = { stiffness: 300, damping: 20, mass: 0.5 };
    const x = useSpring(0, spring);
    const y = useSpring(0, spring);

    return (
        <motion.div
            className="inline-flex"
            style={{ x, y }}
            onPointerMove={(e) => {
                if (e.pointerType !== "mouse") return;
                const rect = e.currentTarget.getBoundingClientRect();
                x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
                y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
            }}
            onPointerLeave={() => {
                x.set(0);
                y.set(0);
            }}
        >
            {children}
        </motion.div>
    );
};

// Key phrase lights up once, with an underline drawing in
const Highlight = ({ children, delay }) => (
    <span className="relative inline-block font-medium">
        <motion.span
            initial={{ color: "#9ca3af" }}
            animate={{ color: "#ffffff" }}
            transition={{ duration: 0.4, delay }}
        >
            {children}
        </motion.span>
        <motion.span
            className="absolute left-0 -bottom-0.5 h-px w-full bg-accent/60 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: EASE, delay }}
        />
    </span>
);

const Hero = () => {
    const reduce = useReducedMotion();
    const touch = useMemo(() => window.matchMedia("(hover: none)").matches, []);
    const [hoveredLetter, setHoveredLetter] = useState(null);
    const [autoLetter, setAutoLetter] = useState(null);

    // No hover on touch screens — cycle through the letters instead
    useEffect(() => {
        if (!touch || reduce) return;
        let i = -1;
        let interval;
        const start = setTimeout(() => {
            const step = () => {
                i = (i + 1) % NAME.length;
                setAutoLetter(i);
            };
            step();
            interval = setInterval(step, 2200);
        }, 2000);
        return () => {
            clearTimeout(start);
            clearInterval(interval);
        };
    }, [touch, reduce]);

    const activeLetter = touch ? autoLetter : hoveredLetter;

    return (
        <section id="hero" className="min-h-screen relative overflow-hidden bg-[#070b14] pt-[calc(8rem+16vw+4.5rem)] md:pt-24 pb-0 flex flex-col justify-end">

            {/* Subtle Film Grain Noise Overlay for Cinematic feel */}
            <div className="absolute inset-0 z-0 opacity-20 mix-blend-overlay pointer-events-none"
                 style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
            </div>

            {/* Studio Lighting Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px]"></div>
            </div>

            <style>
                {`
                @keyframes hero-shine {
                    from { left: -100%; }
                    to { left: 200%; }
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
                }
                .btn-shine:hover::after {
                    animation: hero-shine 0.7s ease-out;
                }
                .btn-moving-border {
                    background: linear-gradient(90deg, rgba(20,241,217,0.8), rgba(255,255,255,0.1), rgba(20,241,217,0.8));
                    background-size: 200% 200%;
                    background-position: 0% 50%;
                    transition: background-position 0.6s ease;
                    padding: 2px;
                    border-radius: 0.75rem;
                    display: inline-flex;
                }
                .btn-moving-border:hover {
                    background-position: 100% 50%;
                }
                `}
            </style>

            {/* Live Opportunities Badge (Centered at top above the name) */}
            <div className="absolute top-20 md:top-24 left-1/2 transform -translate-x-1/2 z-30 w-full flex justify-center">
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
                >
                    <LiveStatus />
                </motion.div>
            </div>

            {/* Massive Background Text - Anchored to TOP completely separated from foreground text */}
            <div className={`${NAME_POSITION} z-10`}>
                <div className={NAME_ROW}>
                    {NAME.split("").map((letter, index) => (
                        <span key={index} className="relative inline-block">
                            {/* Mask: padding gives the hover glow room, negative margin keeps spacing identical */}
                            <span className="block overflow-hidden p-[max(0.15em,2rem)] -m-[max(0.15em,2rem)]">
                                <motion.span
                                    className="block"
                                    initial={reduce ? false : { y: "170%" }}
                                    animate={{ y: 0 }}
                                    transition={{ duration: 0.7, ease: EASE, delay: 0.1 + index * 0.06 }}
                                >
                                    <LiquidLetter
                                        letter={letter}
                                        index={index}
                                        active={activeLetter === index}
                                        touch={touch}
                                        reduce={reduce}
                                        onEnter={setHoveredLetter}
                                        onLeave={(i) => setHoveredLetter((h) => (h === i ? null : h))}
                                    />
                                </motion.span>
                            </span>
                        </span>
                    ))}
                </div>
            </div>

            <DefinitionLayer activeIndex={activeLetter} />

            <div className="container mx-auto px-6 z-10 flex flex-col md:flex-row items-end justify-between h-full relative mt-auto md:pb-12">

                {/* Left Column content - Pushed down to avoid overlap */}
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.35 }}
                    className="flex-1 text-center md:text-left z-20 md:max-w-xl pb-16 md:pb-0 mb-8"
                >
                    {/* Highly attractive highlight block for the mission statement */}
                    <div className="relative pl-6 py-4 mb-10 border-l-2 border-accent/50 bg-gradient-to-r from-white/[0.03] to-transparent rounded-r-2xl mx-auto md:mx-0 max-w-lg text-left">
                        <p className="text-gray-400 text-lg leading-relaxed italic font-light">
                            "Building <Highlight delay={0.9}>intelligent applications</Highlight> and <Highlight delay={1.15}>scalable software</Highlight> that solve real-world problems."
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start items-center flex-wrap">
                        {/* Moving Border Button */}
                        <Magnetic>
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
                        </Magnetic>

                        {/* Shining Button */}
                        <Magnetic>
                            <Link
                                to="projects"
                                smooth={true}
                                duration={800}
                                className="px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-xl hover:bg-white/10 hover:border-white/40 transition-all cursor-pointer flex items-center justify-center btn-shine shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                            >
                                View Projects
                            </Link>
                        </Magnetic>

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
                    initial={reduce ? false : { opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.2 }}
                    className="flex-1 w-full flex justify-end items-end relative z-10"
                >
                    {/* Floating Capabilities Badge */}
                    <motion.div
                        initial={reduce ? false : { opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.6 }}
                        className="absolute left-0 bottom-1/4 md:left-10 z-30 hidden sm:flex flex-col gap-1 items-start w-56"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                            <span className="text-xs text-gray-400 uppercase tracking-widest font-bold">Specialized In</span>
                        </div>
                        <RoleRotator />
                    </motion.div>

                    <InteractiveImage sweepIndex={activeLetter} />
                    {/* Bottom fade gradient so the image blends into the next section smoothly */}
                    <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#070b14] to-transparent z-20 pointer-events-none"></div>
                </motion.div>
            </div>
        </section>
    );
};

// Live Opportunities block — only the dot pulses
const LiveStatus = () => {
    return (
        <div className="relative inline-flex items-center gap-3 p-2 px-6 rounded-full bg-white/5 border border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] backdrop-blur-md">
            <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
            </span>
            <span className="font-medium text-white tracking-wide text-sm">
                Available for Opportunities
                <span className="text-gray-400 font-normal"> · Hyderabad</span>
            </span>
        </div>
    );
};

export default Hero;
