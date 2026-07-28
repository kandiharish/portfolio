import React from "react";
import { FREELANCE_PROJECTS } from "../constants";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaCrown, FaCode } from "react-icons/fa";

const Leadership = () => {
    return (
        <section id="leadership" className="py-24 bg-[#070b14] text-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-6xl relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold font-heading text-center mb-20 tracking-wide"
                >
                    Leadership & <span className="text-accent">Freelance</span>
                </motion.h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {FREELANCE_PROJECTS.map((project, index) => {
                        const isLead = project.role.includes("Lead");
                        const domain = project.link.replace("https://", "").replace("http://", "");
                        
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ type: "spring", stiffness: 100, damping: 12, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                className="relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-6 md:p-8 flex flex-col group overflow-hidden shadow-lg hover:shadow-[0_10px_30px_rgba(20,241,217,0.15)] hover:border-accent/40 transition-all duration-300"
                            >
                                {/* Background subtle glow on hover */}
                                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />
                                
                                {/* Top Header: Icon & Role */}
                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl font-bold text-accent group-hover:bg-accent/10 group-hover:border-accent/30 transition-colors shadow-inner">
                                        {project.title.charAt(0)}
                                    </div>
                                    <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full flex items-center gap-2 text-[10px] font-bold text-gray-400 group-hover:text-gray-200 uppercase tracking-widest transition-colors shadow-sm">
                                        {isLead ? <FaCrown className="text-accent" /> : <FaCode className="text-accent" />}
                                        {project.role}
                                    </div>
                                </div>

                                {/* Title & Tech */}
                                <div className="flex-grow relative z-10">
                                    <h3 className="text-2xl font-bold mb-5 text-white font-heading group-hover:text-accent transition-colors">
                                        {project.title}
                                    </h3>
                                    
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="text-[10px] px-2.5 py-1 bg-[#0f1626]/80 text-gray-300 rounded-lg border border-white/5 tracking-wider font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Glowing Domain Link */}
                                <div className="mt-auto pt-5 border-t border-white/10 relative z-10">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between w-full p-3 rounded-xl bg-white/5 border border-white/10 group-hover:bg-accent/10 group-hover:border-accent/40 transition-all duration-300 shadow-sm"
                                    >
                                        <span className="text-sm font-semibold text-gray-300 group-hover:text-accent tracking-wide truncate pr-4">
                                            {domain}
                                        </span>
                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-colors shrink-0 shadow-sm">
                                            <FaExternalLinkAlt className="text-xs" />
                                        </div>
                                    </a>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            
            {/* Background Glows */}
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        </section>
    );
};

export default Leadership;
