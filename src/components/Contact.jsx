import React, { useState } from "react";
import { HERO_CONTENT } from "../constants";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaCheckCircle } from "react-icons/fa";
import emailjs from '@emailjs/browser';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [isSending, setIsSending] = useState(false);
    const [isSent, setIsSent] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSending(true);
        setError(null);

        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

        if (SERVICE_ID === "YOUR_SERVICE_ID" || TEMPLATE_ID === "YOUR_TEMPLATE_ID" || PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
            const errorMsg = "EmailJS Configuration Missing: Please set your Service ID, Template ID, and Public Key.";
            console.error(errorMsg);
            alert(errorMsg);
            setError("Configuration Error.");
            setIsSending(false);
            return;
        }

        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: "Harish Kandi",
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then((response) => {
                setIsSent(true);
                setIsSending(false);
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setIsSent(false), 5000);
            })
            .catch((err) => {
                let errorMessage = `Failed to send message: ${err.text || "Unknown error"}`;
                if (err.message && (err.message.includes("Failed to fetch") || err.message.includes("NetworkError"))) {
                    errorMessage = "Network Error: Unable to connect to EmailJS.";
                }
                setError(errorMessage);
                alert(errorMessage);
                setIsSending(false);
            });
    };

    return (
        <section id="contact" className="py-20 bg-secondary text-white">
            <div className="container mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl font-bold font-heading text-center mb-16"
                >
                    Get in Touch
                </motion.h2>

                <div className="flex flex-col lg:flex-row gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="lg:w-1/2 space-y-8"
                    >
                        <h3 className="text-2xl font-bold text-white">Let's build something impactful.</h3>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Whether you have a question, a project proposal, or just want to connect, feel free to reach out.
                        </p>

                        <div className="space-y-6 pt-4">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <FaEnvelope className="text-accent" />
                                </div>
                                <a href={`mailto:${HERO_CONTENT.contact.email}`} className="hover:text-white transition-colors">
                                    {HERO_CONTENT.contact.email}
                                </a>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <FaPhone className="text-accent" />
                                </div>
                                <span>{HERO_CONTENT.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                    <FaMapMarkerAlt className="text-accent" />
                                </div>
                                <span>{HERO_CONTENT.contact.location}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="lg:w-1/2"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5 bg-primary/50 p-8 rounded-2xl border border-white/10">
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 text-white rounded-lg border border-white/10 focus:border-accent focus:bg-white/10 focus:ring-1 focus:ring-accent outline-none px-4 py-3 transition-all placeholder-gray-600"
                                    placeholder="Jane Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 text-white rounded-lg border border-white/10 focus:border-accent focus:bg-white/10 focus:ring-1 focus:ring-accent outline-none px-4 py-3 transition-all placeholder-gray-600"
                                    placeholder="jane@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Message</label>
                                <textarea
                                    name="message"
                                    rows="4"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-white/5 text-white rounded-lg border border-white/10 focus:border-accent focus:bg-white/10 focus:ring-1 focus:ring-accent outline-none px-4 py-3 transition-all placeholder-gray-600 resize-none"
                                    placeholder="How can we work together?"
                                ></textarea>
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={isSending}
                                className={`w-full font-bold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${isSent
                                    ? "bg-green-600 text-white cursor-default"
                                    : "bg-white/10 hover:bg-white/20 text-white border border-white/10 hover:border-white/30"
                                    }`}
                            >
                                {isSent ? (
                                    <>
                                        <FaCheckCircle /> Sent Successfully
                                    </>
                                ) : isSending ? (
                                    "Sending..."
                                ) : (
                                    "Send Message"
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
