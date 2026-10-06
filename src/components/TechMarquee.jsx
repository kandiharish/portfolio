import React, { useEffect, useRef, useState } from 'react';
import {
    motion,
    AnimatePresence,
    useAnimationFrame,
    useInView,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
    useVelocity,
} from 'framer-motion';
import {
    FaPython, FaReact, FaNodeJs, FaDocker, FaAws, FaGithub
} from 'react-icons/fa';
import {
    SiNextdotjs, SiMongodb, SiFastapi, SiFirebase, SiPostgresql, SiTailwindcss, SiTypescript, SiOpenai
} from 'react-icons/si';
import { PROJECTS, FREELANCE_PROJECTS } from '../constants';

const EASE = [0.16, 1, 0.3, 1];
const BASE_SPEED = 45; // px per second

const GeminiIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 2c0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10-0 5.523-4.477-10-10-10 5.523 0 10-4.477 10-10zM17 6c0 2.761 2.239 5 5 5-2.761 0-5 2.239-5 5 0-2.761-2.239-5-5-5 2.761 0 5-2.239 5-5z" />
    </svg>
);

const LangGraphIcon = (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="5" r="2.5" fill="currentColor" />
        <circle cx="5" cy="12" r="2.5" />
        <circle cx="19" cy="12" r="2.5" />
        <circle cx="12" cy="19" r="2.5" fill="currentColor" />
        <line x1="12" y1="7.5" x2="12" y2="16.5" />
        <line x1="6.8" y1="13.2" x2="10.2" y2="17.8" />
        <line x1="17.2" y1="13.2" x2="13.8" y2="17.8" />
        <line x1="6.8" y1="10.8" x2="10.2" y2="6.2" />
        <line x1="17.2" y1="10.8" x2="13.8" y2="6.2" />
    </svg>
);

const TECH_ICONS = [
    { icon: FaPython, name: "Python", color: "text-yellow-400" },
    { icon: FaReact, name: "React", color: "text-cyan-400" },
    { icon: SiNextdotjs, name: "Next.js", color: "text-white" },
    { icon: FaNodeJs, name: "Node.js", color: "text-green-500" },
    { icon: FaDocker, name: "Docker", color: "text-blue-400" },
    { icon: SiMongodb, name: "MongoDB", color: "text-green-600" },
    { icon: SiFastapi, name: "FastAPI", color: "text-emerald-400" },
    { icon: SiFirebase, name: "Firebase", color: "text-yellow-500" },
    { icon: LangGraphIcon, name: "LangGraph", color: "text-orange-400" },
    { icon: GeminiIcon, name: "Gemini", color: "text-purple-400" },
    { icon: SiPostgresql, name: "PostgreSQL", color: "text-blue-300" },
    { icon: SiTailwindcss, name: "Tailwind", color: "text-cyan-300" },
    { icon: SiTypescript, name: "TypeScript", color: "text-blue-500" },
    { icon: FaGithub, name: "GitHub", color: "text-gray-300" },
    { icon: SiOpenai, name: "OpenAI", color: "text-emerald-500" },
    { icon: FaAws, name: "AWS", color: "text-orange-500" },
];

// "React.js" / "Tailwind CSS" / "Gemini 1.5" all reduce to a comparable key
const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// Which projects use each tool — derived from the project data, so it stays in sync
const USED_IN = Object.fromEntries(
    TECH_ICONS.map(({ name }) => {
        const key = normalize(name);
        const titles = [...PROJECTS, ...FREELANCE_PROJECTS]
            .filter((p) => p.technologies.some((t) => normalize(t).startsWith(key)))
            .map((p) => p.title);
        return [name, titles];
    })
);

const Readout = ({ name }) => {
    const titles = USED_IN[name] || [];
    const shown = titles.slice(0, 3).join(" · ");
    const extra = titles.length > 3 ? ` +${titles.length - 3}` : "";

    return (
        <motion.div
            key={name}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="text-xs tracking-wide text-gray-400 whitespace-nowrap"
        >
            <span className="text-accent font-semibold">{name}</span>
            <span className="mx-2 text-gray-600">→</span>
            {titles.length ? (
                <>
                    {shown}
                    <span className="text-gray-500">{extra}</span>
                </>
            ) : (
                <span className="text-gray-500">Part of my everyday toolkit</span>
            )}
        </motion.div>
    );
};

const TechMarquee = () => {
    const reduce = useReducedMotion();
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const halfWidth = useRef(0);
    const inView = useInView(containerRef, { margin: "100px 0px" });
    const [hovered, setHovered] = useState(null);

    // Scroll speed feeds the strip: faster while scrolling, reversed when scrolling up
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
    const velocityFactor = useTransform(smoothVelocity, [-1500, 0, 1500], [-4, 0, 4], { clamp: true });
    const skewX = useTransform(smoothVelocity, [-2000, 0, 2000], [4, 0, -4], { clamp: true });

    // Eases toward a crawl while a logo is hovered
    const hoverFactor = useSpring(1, { stiffness: 120, damping: 20 });
    useEffect(() => {
        hoverFactor.set(hovered ? 0.08 : 1);
    }, [hovered, hoverFactor]);

    const x = useMotionValue(0);
    const direction = useRef(1);

    useEffect(() => {
        const measure = () => {
            if (trackRef.current) halfWidth.current = trackRef.current.scrollWidth / 2;
        };
        measure();
        const observer = new ResizeObserver(measure);
        if (trackRef.current) observer.observe(trackRef.current);
        return () => observer.disconnect();
    }, []);

    useAnimationFrame((_, delta) => {
        if (!inView || !halfWidth.current) return;
        const boost = reduce ? 0 : velocityFactor.get();
        if (boost < 0) direction.current = -1;
        else if (boost > 0) direction.current = 1;

        const speed = BASE_SPEED * (1 + Math.abs(boost)) * hoverFactor.get() * (reduce ? 0.5 : 1);
        let next = x.get() - direction.current * speed * (delta / 1000);

        // Two identical halves: wrap seamlessly
        if (next <= -halfWidth.current) next += halfWidth.current;
        if (next > 0) next -= halfWidth.current;
        x.set(next);
    });

    return (
        <motion.div
            ref={containerRef}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="py-10 bg-primary/80 backdrop-blur-md overflow-hidden relative border-y border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_30px_rgba(0,0,0,0.4)]"
        >
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-primary via-transparent to-primary"></div>

            <motion.div
                ref={trackRef}
                className="flex min-w-max will-change-transform"
                style={{ x, skewX: reduce ? 0 : skewX }}
                onPointerLeave={() => setHovered(null)}
            >
                {[...TECH_ICONS, ...TECH_ICONS].map((tech, index) => {
                    const IconComponent = tech.icon;
                    const isActive = hovered === tech.name;
                    const isDimmed = hovered && !isActive;
                    return (
                        <div
                            key={index}
                            onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(tech.name)}
                            onClick={() => setHovered((h) => (h === tech.name ? null : tech.name))}
                            className="flex items-center gap-3 cursor-default px-10"
                            aria-hidden={index >= TECH_ICONS.length}
                        >
                            <IconComponent
                                className={`text-4xl ${tech.color} transition-[opacity,transform] duration-200 ${
                                    isActive ? "opacity-100 scale-110" : isDimmed ? "opacity-20" : "opacity-50"
                                }`}
                            />
                            <span
                                className={`text-base font-semibold tracking-wide transition-colors duration-200 ${
                                    isActive ? "text-accent" : isDimmed ? "text-gray-600" : "text-gray-400"
                                }`}
                            >
                                {tech.name}
                            </span>
                        </div>
                    );
                })}
            </motion.div>

            {/* Readout — where the hovered tool shows up in my work */}
            <div className="absolute inset-x-0 bottom-2.5 z-20 flex justify-center pointer-events-none" aria-live="polite">
                <AnimatePresence mode="wait">
                    {hovered && <Readout name={hovered} />}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default TechMarquee;
