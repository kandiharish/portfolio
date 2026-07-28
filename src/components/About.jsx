import React from "react";
import { HERO_CONTENT } from "../constants";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaPython, FaAws, FaGitAlt, FaFigma } from "react-icons/fa";
import { SiMongodb, SiTailwindcss, SiNextdotjs, SiTypescript, SiPostgresql, SiDocker, SiFirebase, SiGraphql, SiRedux, SiExpress } from "react-icons/si";

const InteractiveKeyword = ({ text, title, description, icon }) => {
    return (
        <span className="relative inline-block group cursor-pointer text-accent/90 hover:text-accent font-semibold transition-colors duration-300">
            {text}
            {/* The Popup */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 md:w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none z-50 translate-y-2 group-hover:translate-y-0">
                <div className="bg-[#0f1626]/95 border border-accent/40 rounded-xl p-4 shadow-[0_10px_30px_rgba(20,241,217,0.25)] backdrop-blur-xl flex flex-col gap-2 relative">
                    <div className="flex items-center gap-3">
                        <span className="text-xl md:text-2xl">{icon}</span>
                        <span className="text-white font-bold text-xs md:text-sm tracking-wider uppercase">{title}</span>
                    </div>
                    <p className="text-gray-400 text-[11px] md:text-xs leading-relaxed font-sans">{description}</p>
                    
                    {/* Arrow pointing down */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#0f1626]/95 drop-shadow-md"></div>
                </div>
            </div>
            {/* Dashed underline */}
            <span className="absolute left-0 bottom-0 w-full h-[1px] border-b border-dashed border-accent/50 group-hover:border-accent transition-colors duration-300"></span>
        </span>
    );
};

const About = () => {
    return (
        <section id="about" className="py-24 bg-[#070b14] text-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold font-heading text-center mb-16 tracking-wide"
                >
                    About <span className="text-accent">Me</span>
                </motion.h2>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
                    
                    {/* Tile 1: Photo (Spans 2 rows) */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="md:col-span-1 md:row-span-2 relative rounded-[2rem] overflow-hidden border border-white/10 group min-h-[350px] md:min-h-full shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-[#070b14]/20 to-transparent z-10 pointer-events-none"></div>
                        <img
                            src="/college.jpeg"
                            alt="Harish Kandi"
                            className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        {/* Overlay text */}
                        <div className="absolute bottom-8 left-8 z-20">
                            <h3 className="text-2xl font-bold font-heading text-white mb-1">Harish Kandi</h3>
                            <p className="text-accent text-xs font-medium tracking-widest uppercase">Full Stack Developer</p>
                        </div>
                    </motion.div>

                    {/* Tile 2: Editorial Bio */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="md:col-span-2 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 p-8 md:p-10 rounded-[2rem] transition-colors duration-500"
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white font-heading leading-tight">
                            Building intelligent, <br className="hidden sm:block" /> scalable software systems.
                        </h3>
                        <p className="text-gray-300 leading-relaxed text-base md:text-lg font-sans">
                            I am a passionate developer focused on transforming complex problems into elegant software solutions. I build everything from{" "}
                            <InteractiveKeyword 
                                text="AI teaching assistants" 
                                title="Artificial Intelligence"
                                description="Leveraging LLMs and machine learning to build smart, context-aware tools."
                                icon="🧠"
                            />
                            {" "}to{" "}
                            <InteractiveKeyword 
                                text="blockchain verification" 
                                title="Web3 & Blockchain"
                                description="Developing decentralized, immutable systems for secure data handling."
                                icon="⛓️"
                            />
                            {" "}platforms. My approach integrates clean architecture with high-impact user experiences, ensuring every product is both robust and beautifully intuitive.
                        </p>
                    </motion.div>

                    {/* Tile 3: Academics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="md:col-span-1 bg-gradient-to-br from-accent/10 to-transparent border border-accent/20 p-8 rounded-[2rem] flex flex-col justify-center items-center text-center group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 blur-[50px] rounded-full group-hover:bg-accent/30 transition-colors duration-500"></div>
                        <h4 className="text-5xl font-black text-white mb-2 font-heading tracking-tight">9.5</h4>
                        <p className="text-accent font-bold tracking-widest uppercase text-xs mb-4">CGPA</p>
                        <div className="w-12 h-[1px] bg-white/20 mb-4"></div>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            B.Tech in Computer Science<br />
                            <strong className="text-white mt-1 block tracking-wide">GNIT</strong>
                        </p>
                    </motion.div>

                    {/* Tile 4: Tech Arsenal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="md:col-span-1 bg-white/[0.02] hover:bg-white/[0.04] border border-white/10 p-8 rounded-[2rem] flex flex-col justify-between transition-colors duration-500"
                    >
                        <div>
                            <p className="text-gray-400 text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                Core Arsenal
                            </p>
                            <div className="flex flex-wrap gap-5 items-center justify-start">
                                {[
                                    { icon: FaReact, name: "React", color: "text-[#61DAFB]" },
                                    { icon: SiNextdotjs, name: "Next.js", color: "text-white" },
                                    { icon: SiTypescript, name: "TypeScript", color: "text-[#3178C6]" },
                                    { icon: FaNodeJs, name: "Node.js", color: "text-[#339933]" },
                                    { icon: SiExpress, name: "Express", color: "text-gray-300" },
                                    { icon: FaPython, name: "Python", color: "text-[#3776AB]" },
                                    { icon: SiPostgresql, name: "PostgreSQL", color: "text-[#4169E1]" },
                                    { icon: SiMongodb, name: "MongoDB", color: "text-[#47A248]" },
                                    { icon: SiGraphql, name: "GraphQL", color: "text-[#E10098]" },
                                    { icon: SiRedux, name: "Redux", color: "text-[#764ABC]" },
                                    { icon: SiTailwindcss, name: "Tailwind", color: "text-[#06B6D4]" },
                                    { icon: SiFirebase, name: "Firebase", color: "text-[#FFCA28]" },
                                    { icon: SiDocker, name: "Docker", color: "text-[#2496ED]" },
                                    { icon: FaAws, name: "AWS", color: "text-[#FF9900]" },
                                    { icon: FaGitAlt, name: "Git", color: "text-[#F05032]" },
                                    { icon: FaFigma, name: "Figma", color: "text-[#F24E1E]" }
                                ].map((Skill, idx) => (
                                    <div key={idx} className="group relative">
                                        <Skill.icon className={`text-2xl md:text-3xl ${Skill.color} transition-transform duration-300 group-hover:scale-110 cursor-pointer drop-shadow-sm opacity-90 group-hover:opacity-100`} />
                                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0f1626] text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 z-10">{Skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default About;
