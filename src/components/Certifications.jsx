import React from "react";
import { CERTIFICATIONS } from "../constants";
import { motion } from "framer-motion";
import { FaCertificate } from "react-icons/fa";

const Certifications = () => {
    return (
        <section id="certifications" className="py-20 bg-primary text-white">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold font-heading text-center mb-16"
                >
                    Certifications & <span className="text-accent">Achievements</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {CERTIFICATIONS.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="flex items-start gap-4 p-6 bg-secondary border border-gray-800 rounded-xl hover:border-accent transition-colors group"
                        >
                            <div className="mt-1 text-accent group-hover:text-white transition-colors">
                                <FaCertificate size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-200 mb-1 leading-snug">{cert.name}</h3>
                                <p className="text-sm text-gray-400 mb-3">{cert.issuer}</p>
                                {cert.link && (
                                    <a
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm text-accent font-medium hover:underline flex items-center gap-1"
                                    >
                                        View Certificate <span className="text-xs">↗</span>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certifications;
