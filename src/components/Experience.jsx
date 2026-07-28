import React, { useState } from "react";
import { EXPERIENCES } from "../constants";
import { motion } from "framer-motion";

const Experience = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section id="experience" className="py-32 bg-[#070b14] text-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold font-heading text-center mb-20 tracking-wide"
                >
                    Professional <span className="text-accent">Journey</span>
                </motion.h2>

                {/* Vertical Map Container */}
                <div 
                    className="relative max-w-5xl mx-auto mt-48 md:mt-64 mb-48 md:mb-64"
                    style={{ height: `${Math.max(600, (EXPERIENCES.length - 1) * 350)}px` }}
                >
                    
                    {/* Base Track Line */}
                    <div className="absolute left-[30px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[1px] border-l-2 border-dashed border-white/20 z-0"></div>
                    
                    {/* Animated Tracker Line */}
                    <motion.div 
                        className="absolute left-[30px] md:left-1/2 md:-translate-x-1/2 top-0 w-[3px] bg-accent shadow-[0_0_15px_rgba(20,241,217,0.8)] z-0"
                        initial={false}
                        animate={{ height: `${(activeIndex / (EXPERIENCES.length - 1)) * 100}%` }}
                        transition={{ type: "spring", stiffness: 120, damping: 25 }}
                    />

                    {/* Waypoints */}
                    <div className="absolute inset-0 pointer-events-none">
                        {EXPERIENCES.map((exp, index) => {
                            const isActive = index === activeIndex;
                            const isLeft = index % 2 === 0;
                            const topPercent = (index / (EXPERIENCES.length - 1)) * 100;

                            return (
                                <div 
                                    key={index} 
                                    className="absolute w-full flex items-center group cursor-pointer pointer-events-auto"
                                    style={{ top: `${topPercent}%`, transform: 'translateY(-50%)' }}
                                    onMouseEnter={() => setActiveIndex(index)}
                                >
                                    {/* Map Node / Dot */}
                                    <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 flex justify-center items-center w-8 h-8 z-20">
                                        <div className={`w-4 h-4 rounded-full border-[3px] transition-all duration-300 z-20 ${isActive ? 'bg-[#0f1626] border-accent scale-150 shadow-[0_0_15px_rgba(20,241,217,0.6)]' : 'bg-[#070b14] border-white/30 hover:border-white/60'}`}></div>
                                        
                                        {/* Glowing Lock Ring */}
                                        {isActive && (
                                            <motion.div 
                                                layoutId="cursorRingVertical"
                                                className="absolute inset-0 rounded-full border border-accent/60 border-dashed z-10 bg-accent/10"
                                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                            />
                                        )}
                                    </div>

                                    {/* Experience Card */}
                                    <div className={`w-full flex ${isLeft ? 'md:justify-start' : 'md:justify-end'} pl-[70px] md:pl-0`}>
                                        <motion.div
                                            className={`w-full md:w-[45%] p-6 md:p-8 rounded-[2rem] border transition-all duration-500 backdrop-blur-md ${
                                                isActive 
                                                ? 'bg-white/10 border-accent/50 shadow-[0_15px_35px_rgba(20,241,217,0.15)] z-30 opacity-100 scale-100' 
                                                : 'bg-white/[0.02] border-white/10 z-10 opacity-40 scale-[0.98] hover:opacity-70'
                                            }`}
                                        >
                                            <div className="flex flex-col mb-4">
                                                <div className={`inline-block px-3 py-1 text-xs font-semibold rounded-full w-fit mb-3 transition-colors ${isActive ? 'bg-accent/20 text-accent' : 'bg-white/10 text-gray-400'}`}>
                                                    {exp.year}
                                                </div>
                                                <h3 className={`text-xl md:text-2xl font-bold mb-1 transition-colors font-heading ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                                    {exp.role}
                                                </h3>
                                                <h4 className="text-sm text-accent/90 font-medium tracking-wide uppercase">{exp.company}</h4>
                                            </div>

                                            {/* Expandable details when active */}
                                            <div className={`transition-all duration-500 overflow-hidden ${isActive ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                                                <ul className="space-y-3 text-sm text-gray-300 font-sans">
                                                    {exp.description.map((desc, i) => (
                                                        <li key={i} className="flex items-start leading-relaxed">
                                                            <span className="text-accent mr-3 mt-1 text-xs">◆</span>
                                                            <span>{desc}</span>
                                                        </li>
                                                    ))}
                                                </ul>

                                                {exp.certificate && (
                                                    <a
                                                        href={exp.certificate}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-block mt-5 text-xs text-accent hover:text-white transition-colors uppercase tracking-widest font-bold border-b border-accent hover:border-white pb-0.5"
                                                    >
                                                        View Credentials
                                                    </a>
                                                )}

                                                <div className="flex flex-wrap gap-2 mt-5">
                                                    {exp.technologies.map((tech, i) => (
                                                        <span key={i} className="text-[10px] px-2.5 py-1 bg-[#0f1626]/80 text-gray-300 rounded-full border border-white/10 tracking-wider font-medium">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
