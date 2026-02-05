import React from 'react';
import { motion } from 'framer-motion';
import {
    FaPython, FaJava, FaJs, FaReact, FaNodeJs, FaDocker, FaHtml5, FaCss3Alt, FaAws, FaGitAlt
} from 'react-icons/fa';
import {
    SiCplusplus, SiNextdotjs, SiFlask, SiPytorch, SiMongodb, SiFirebase, SiPostman, SiTailwindcss, SiMysql, SiExpress
} from 'react-icons/si';

const TECH_ICONS = [
    { icon: FaPython, name: "Python", color: "text-yellow-400" },
    { icon: FaReact, name: "React", color: "text-cyan-400" },
    { icon: FaNodeJs, name: "Node.js", color: "text-green-500" },
    { icon: SiPytorch, name: "PyTorch", color: "text-orange-500" },
    { icon: FaDocker, name: "Docker", color: "text-blue-400" },
    { icon: SiNextdotjs, name: "Next.js", color: "text-white" },
    { icon: SiMongodb, name: "MongoDB", color: "text-green-500" },
    { icon: SiTailwindcss, name: "Tailwind", color: "text-cyan-300" },
    { icon: FaAws, name: "AWS", color: "text-orange-400" },
    { icon: SiFirebase, name: "Firebase", color: "text-yellow-500" },
    { icon: FaJs, name: "JavaScript", color: "text-yellow-300" },
    { icon: SiFlask, name: "Flask", color: "text-white" }
];

const TechMarquee = () => {
    return (
        <div className="py-10 bg-primary overflow-hidden relative border-y border-gray-800/50">
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-primary via-transparent to-primary"></div>

            <motion.div
                className="flex gap-16 min-w-max"
                animate={{ x: ["0%", "-50%"] }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: 30
                }}
            >
                {[...TECH_ICONS, ...TECH_ICONS].map((tech, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 group cursor-default">
                        <tech.icon className={`text-5xl ${tech.color} opacity-70 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110`} />
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">{tech.name}</span>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default TechMarquee;
