import React from "react";
import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const Projects = () => {
    return (
        <section id="projects" className="py-20 bg-primary text-white">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold font-heading text-center mb-16"
                >
                    Featured <span className="text-accent">Projects</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-10">
                    {PROJECTS.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-secondary rounded-2xl overflow-hidden border border-gray-800 hover:border-accent/40 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full"
                        >
                            {/* Project Image */}
                            <div className="relative w-full h-48 overflow-hidden border-b border-gray-800">
                                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10"></div>
                                <img
                                    src={project.image || "/project1.png"}
                                    alt={project.title}
                                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
                                />
                            </div>

                            {/* Project Content */}
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors leading-tight">
                                        {project.title}
                                    </h3>
                                    <div className="flex gap-4 shrink-0">
                                        {project.github && (
                                            <a
                                                href={project.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-gray-800 rounded-full hover:bg-accent text-white transition-all transform hover:-translate-y-1"
                                                title="View on GitHub"
                                            >
                                                <FaGithub size={20} />
                                            </a>
                                        )}
                                        {project.demo && (
                                            <a
                                                href={project.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 bg-gray-800 rounded-full hover:bg-accent text-white transition-all transform hover:-translate-y-1"
                                                title="Live Demo"
                                            >
                                                <FaExternalLinkAlt size={18} />
                                            </a>
                                        )}
                                    </div>
                                </div>

                                <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-800">
                                    {project.technologies.map((tech, i) => (
                                        <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-primary text-gray-300 border border-gray-700">
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
