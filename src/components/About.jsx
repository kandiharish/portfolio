import React from "react";
import { HERO_CONTENT } from "../constants";
import { motion } from "framer-motion";

const About = () => {
    return (
        <section id="about" className="py-20 bg-primary text-white">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold font-heading text-center mb-16"
                >
                    About <span className="text-accent">Me</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Image/Graphic */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative group mr-4"
                    >
                        {/* Image Container with Glow */}
                        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-gray-700 group-hover:border-accent transition-all duration-300 transform group-hover:-translate-y-2">
                            <div className="absolute inset-0 bg-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                            <img
                                src="/college.jpeg"
                                alt="College Life & Teaching"
                                className="w-full h-auto object-cover md:h-[500px] hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Decorative Offset Border */}
                        <div className="absolute top-4 left-4 w-full h-full border-2 border-accent/30 rounded-2xl z-[-1] transform translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-300"></div>
                    </motion.div>

                    {/* Right Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-2xl font-semibold mb-4 text-gray-200">
                            Passionate about <span className="text-accent">Artificial Intelligence</span> & Software Engineering
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                            {HERO_CONTENT.description} I am currently pursuing my B.Tech in Computer Science at GNIT, where I maintain a strong academic record (CGPA 9.5). My journey involves building intelligent systems, from AI teaching assistants to blockchain-based verification tools.
                        </p>


                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
