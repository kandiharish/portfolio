import React from 'react';
import { motion } from 'framer-motion';
import {
    FaPython, FaReact, FaNodeJs, FaDocker, FaAws, FaGithub
} from 'react-icons/fa';
import {
    SiNextdotjs, SiMongodb, SiFastapi, SiFirebase, SiPostgresql, SiTailwindcss, SiTypescript, SiOpenai
} from 'react-icons/si';

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

const TechMarquee = () => {
    return (
        <div className="py-10 bg-primary/80 backdrop-blur-md overflow-hidden relative border-y border-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_4px_30px_rgba(0,0,0,0.4)]">
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-primary via-transparent to-primary"></div>

            <motion.div
                className="flex gap-20 min-w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 35
                }}
            >
                {[...TECH_ICONS, ...TECH_ICONS].map((tech, index) => {
                    const IconComponent = tech.icon;
                    return (
                        <div key={index} className="flex items-center gap-3 group cursor-default">
                            <IconComponent className={`text-4xl ${tech.color} opacity-50 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110`} />
                            <span className="text-base font-semibold tracking-wide text-gray-400 group-hover:text-accent transition-colors duration-300">{tech.name}</span>
                        </div>
                    );
                })}
            </motion.div>
        </div>
    );
};

export default TechMarquee;
