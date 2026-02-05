import React from "react";
import { EDUCATION } from "../constants";
import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

const Education = () => {
    return (
        <section id="education" className="py-20 bg-primary/50 text-white">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold font-heading text-center mb-16"
                >
                    My <span className="text-accent">Education</span>
                </motion.h2>

                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-700 before:to-transparent">
                    {EDUCATION.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
                        >
                            {/* Icon on the Line */}
                            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-700 bg-secondary shadow group-hover:border-accent client-transition shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                <FaGraduationCap className="text-accent" />
                            </div>

                            {/* Card */}
                            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-xl border border-gray-800 bg-secondary hover:border-accent/30 transition-all shadow-lg">
                                <div className="text-accent text-sm font-bold mb-1">{edu.duration}</div>
                                <h3 className="text-xl font-bold text-white mb-1">{edu.institution}</h3>
                                <div className="text-gray-300 font-medium mb-2">{edu.degree}</div>
                                {edu.score && (
                                    <div className="text-sm text-gray-400 bg-primary/50 px-3 py-1 rounded-full w-fit">
                                        {edu.score}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Education;
