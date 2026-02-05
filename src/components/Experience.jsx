import React from "react";
import { EXPERIENCES } from "../constants";
import { motion } from "framer-motion";

const Experience = () => {
    return (
        <section id="experience" className="py-20 bg-secondary text-white">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold font-heading text-center mb-16"
                >
                    Professional <span className="text-accent">Experience</span>
                </motion.h2>

                <div className="space-y-12 relative border-l-2 border-gray-700 ml-4 md:ml-10 pl-8 md:pl-12">
                    {EXPERIENCES.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute top-1 -left-[42px] md:-left-[58px] w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                                <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                                <div className="text-accent font-medium text-sm sm:text-base bg-accent/10 px-3 py-1 rounded-full w-fit mt-1 sm:mt-0">
                                    {exp.year}
                                </div>
                            </div>

                            <h4 className="text-xl text-gray-300 font-medium mb-4">{exp.company}</h4>

                            <ul className="list-disc list-inside space-y-2 text-gray-400 mb-4 marker:text-accent">
                                {exp.description.map((desc, i) => (
                                    <li key={i}>{desc}</li>
                                ))}
                            </ul>

                            {exp.certificate && (
                                <a
                                    href={exp.certificate}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mb-4 text-sm text-accent hover:underline font-medium hover:text-blue-400 transition-colors"
                                >
                                    View Internship Certificate
                                </a>
                            )}

                            <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech, i) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded border border-gray-700">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
