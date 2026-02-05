import React from "react";
import { TESTIMONIALS } from "../constants";
import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
    return (
        <section id="testimonials" className="py-20 bg-primary text-white">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold font-heading text-center mb-16"
                >
                    What Others <span className="text-accent">Say</span>
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {TESTIMONIALS.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="bg-secondary p-8 rounded-2xl border border-gray-800 relative shadow-lg hover:shadow-accent/10 transition-shadow duration-300"
                        >
                            <FaQuoteLeft className="text-3xl text-accent/30 mb-6" />

                            <p className="text-gray-300 mb-6 italic leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            <div className="flex items-center gap-4 border-t border-gray-800 pt-6">
                                <div>
                                    <h4 className="font-bold text-white text-lg">{testimonial.name}</h4>
                                    <p className="text-accent text-xs font-medium uppercase tracking-wider">{testimonial.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
