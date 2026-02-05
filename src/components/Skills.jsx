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
        case "c": return <span className="font-bold text-blue-500">C</span>;
        case "c++": return <SiCplusplus className="text-blue-600" />;
        case "html": return <FaHtml5 className="text-orange-500" />;
        case "css": return <FaCss3Alt className="text-blue-500" />;
        case "javascript": return <FaJs className="text-yellow-300" />;
        case "sql": return <FaDatabase className="text-gray-400" />;
        case "react.js": return <FaReact className="text-cyan-400" />;
        case "node.js": return <FaNodeJs className="text-green-500" />;
        case "express.js": return <SiExpress className="text-white" />;
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

const getSkillStyle = (name) => {
    switch (name.toLowerCase()) {
        case "python": return "border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-500";
        case "c": return "border-blue-500/30 text-blue-500 hover:bg-blue-500/10 hover:border-blue-500";
        case "c++": return "border-blue-600/30 text-blue-600 hover:bg-blue-600/10 hover:border-blue-600";
        case "html": return "border-orange-500/30 text-orange-500 hover:bg-orange-500/10 hover:border-orange-500";
        case "css": return "border-blue-500/30 text-blue-500 hover:bg-blue-500/10 hover:border-blue-500";
        case "javascript": return "border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400";
        case "sql": return "border-gray-400/30 text-gray-300 hover:bg-gray-400/10 hover:border-gray-400";
        case "react.js": return "border-cyan-400/30 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400";
        case "node.js": return "border-green-500/30 text-green-500 hover:bg-green-500/10 hover:border-green-500";
        case "express.js": return "border-gray-500/30 text-gray-300 hover:bg-gray-500/10 hover:border-gray-500";
        case "next.js": return "border-white/30 text-white hover:bg-white/10 hover:border-white";
        case "flask": return "border-white/30 text-white hover:bg-white/10 hover:border-white";
        case "pytorch": return "border-orange-500/30 text-orange-500 hover:bg-orange-500/10 hover:border-orange-500";
        case "mongodb": return "border-green-600/30 text-green-500 hover:bg-green-600/10 hover:border-green-500";
        case "mysql": return "border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400";
        case "firebase": return "border-yellow-600/30 text-yellow-500 hover:bg-yellow-600/10 hover:border-yellow-500";
        case "docker": return "border-blue-400/30 text-blue-400 hover:bg-blue-400/10 hover:border-blue-400";
        case "git": return "border-orange-600/30 text-orange-600 hover:bg-orange-600/10 hover:border-orange-600";
        case "github": return "border-gray-400/30 text-gray-300 hover:bg-gray-400/10 hover:border-gray-400";
        case "postman": return "border-orange-500/30 text-orange-500 hover:bg-orange-500/10 hover:border-orange-500";
        case "vs code": return "border-blue-500/30 text-blue-500 hover:bg-blue-500/10 hover:border-blue-500";
        case "n8n": return "border-red-500/30 text-red-500 hover:bg-red-500/10 hover:border-red-500";
        case "tailwind css": return "border-cyan-400/30 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400";
        default: return "border-gray-700 text-gray-400 hover:border-accent hover:bg-accent/10 hover:text-white";
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
                    Technical <span className="text-accent">Skills</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SKILLS.map((skillGroup, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-primary p-6 rounded-xl border border-gray-800 hover:border-accent/50 transition-all duration-300 shadow-lg hover:shadow-accent/10"
                        >
                            <h3 className="text-xl font-bold mb-6 text-accent border-b border-gray-800 pb-2">{skillGroup.category}</h3>
                            <div className="flex flex-wrap gap-3">
                                {skillGroup.items.map((skill, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border bg-primary/40 transition-all duration-300 cursor-default shadow-md hover:shadow-lg hover:-translate-y-1 ${getSkillStyle(skill)}`}
                                    >
                                        <span className="text-xl">{getIcon(skill)}</span>
                                        <span className="text-sm font-semibold tracking-wide">{skill}</span>
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
