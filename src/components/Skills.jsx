import React from "react";
import { SKILLS } from "../constants";
import { motion } from "framer-motion";
import {
    FaPython, FaJava, FaJs, FaDatabase, FaReact, FaNodeJs,
    FaDocker, FaGitAlt, FaAws, FaCode, FaHtml5, FaCss3Alt
} from "react-icons/fa";
import { SiCplusplus, SiNextdotjs, SiFlask, SiPytorch, SiMongodb, SiFirebase, SiPostman, SiN8N, SiTailwindcss, SiMysql, SiExpress } from "react-icons/si";

const getIcon = (name) => {
    switch (name.toLowerCase()) {
        case "python": return <FaPython className="text-yellow-400" />;
        case "c": return <span className="font-bold text-blue-400">C</span>;
        case "c++": return <SiCplusplus className="text-blue-500" />;
        case "html": return <FaHtml5 className="text-orange-500" />;
        case "css": return <FaCss3Alt className="text-blue-400" />;
        case "javascript": return <FaJs className="text-yellow-300" />;
        case "sql": return <FaDatabase className="text-blue-300" />;
        case "react.js": return <FaReact className="text-cyan-400" />;
        case "node.js": return <FaNodeJs className="text-green-500" />;
        case "express.js": return <SiExpress className="text-gray-300" />;
        case "next.js": return <SiNextdotjs className="text-white" />;
        case "flask": return <SiFlask className="text-white" />;
        case "pytorch": return <SiPytorch className="text-orange-500" />;
        case "mongodb": return <SiMongodb className="text-green-500" />;
        case "mysql": return <SiMysql className="text-blue-400" />;
        case "firebase": return <SiFirebase className="text-yellow-500" />;
        case "docker": return <FaDocker className="text-blue-400" />;
        case "git": return <FaGitAlt className="text-orange-600" />;
        case "github": return <FaGitAlt className="text-white" />;
        case "postman": return <SiPostman className="text-orange-500" />;
        case "vs code": return <FaCode className="text-blue-400" />;
        case "n8n": return <SiN8N className="text-red-500" />;
        case "tailwind css": return <SiTailwindcss className="text-cyan-400" />;
        default: return <FaCode className="text-gray-400" />;
    }
};

const Skills = () => {
    return (
        <section id="skills" className="py-20 bg-secondary text-white">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold font-heading text-center mb-16"
                >
                    Technical Skills
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SKILLS.map((skillGroup, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-primary/50 p-6 rounded-2xl border border-white/5"
                        >
                            <h3 className="text-xl font-bold mb-6 text-white border-b border-white/10 pb-2">{skillGroup.category}</h3>
                            <div className="flex flex-wrap gap-3">
                                {skillGroup.items.map((skill, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-default"
                                    >
                                        <span className="text-lg">{getIcon(skill)}</span>
                                        <span className="text-sm text-gray-300 font-medium">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
