import React from "react";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaFolder } from "react-icons/fa";

const Projects = () => {
    return (
        <section id="projects" className="py-24 bg-primary text-white relative z-10">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold font-heading mb-16"
                >
                    Featured Projects
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative flex flex-col h-full rounded-2xl overflow-hidden bg-secondary border border-white/10 hover:border-white/20 transition-all duration-300"
                        >
                            {/* Image Section - Cleaner, less heavily filtered */}
                            <div className="h-48 relative overflow-hidden bg-[#0a0f1a] border-b border-white/5">
                                <div className="absolute inset-0 bg-primary/20 z-10 transition-opacity duration-300 group-hover:opacity-0"></div>
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-xl font-bold text-white mb-2">
                                            {project.title}
                                        </h3>
                                        <div className="flex gap-3 text-gray-400">
                                            {project.github && project.github !== "#" && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                                    <FaGithub size={20} />
                                                </a>
                                            )}
                                            {project.demo && project.demo !== "#" && (
                                                <a href={project.demo} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                                                    <FaExternalLinkAlt size={18} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                        {project.description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="text-xs font-mono px-2 py-1 bg-white/5 rounded text-gray-300 border border-white/10">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
