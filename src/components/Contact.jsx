import React, { useState } from "react";
import { HERO_CONTENT } from "../constants";
import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
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

        // Credentials: Try Environment Variables first, then fallback to placeholders
        const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
        const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
        const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

        // Validation Check
        if (SERVICE_ID === "YOUR_SERVICE_ID" || TEMPLATE_ID === "YOUR_TEMPLATE_ID" || PUBLIC_KEY === "YOUR_PUBLIC_KEY") {
            const errorMsg = "EmailJS Configuration Missing: Please set your Service ID, Template ID, and Public Key in Contact.jsx or .env file.";
            console.error(errorMsg);
            alert(errorMsg); // Immediate feedback to user
            setError("Configuration Error: Check console for details.");
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
                console.log('SUCCESS!', response.status, response.text);
                setIsSent(true);
                setIsSending(false);
                setFormData({ name: "", email: "", message: "" });
                // Reset success message after 5 seconds
                setTimeout(() => setIsSent(false), 5000);
            })
            .catch((err) => {
                console.log('FAILED...', err);
                let errorMessage = `Failed to send message: ${err.text || "Unknown error"}`;

                // Check for network/adblock errors
                if (err.message && (err.message.includes("Failed to fetch") || err.message.includes("NetworkError"))) {
                    errorMessage = "Network Error: Unable to connect to EmailJS. Please disable AdBlockers or check your internet connection.";
                }

                setError(errorMessage);
                alert(errorMessage); // Pop up for visibility
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
                    Get in <span className="text-accent">Touch</span>
                </motion.h2>

                <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2 space-y-8"
                    >
                        <h3 className="text-2xl font-bold text-gray-200">Let's build something impactful.</h3>
                        <p className="text-gray-400 text-lg">
                            Whether you have a question, a project proposal, or just want to connect, feel free to reach out. I'm currently open to new opportunities.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-300">
                                <FaEnvelope className="text-accent text-xl" />
                                <a href={`mailto:${HERO_CONTENT.contact.email}`} className="hover:text-white transition-colors">
                                    {HERO_CONTENT.contact.email}
                                </a>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <FaPhone className="text-accent text-xl" />
                                <span>{HERO_CONTENT.contact.phone}</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-300">
                                <FaMapMarkerAlt className="text-accent text-xl" />
                                <span>{HERO_CONTENT.contact.location}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2 bg-primary p-8 rounded-2xl border border-gray-800 shadow-xl"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-2">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full bg-secondary text-white rounded-lg border border-gray-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none px-4 py-3 transition-colors"
                                    placeholder="Your Name"
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
                                    className="w-full bg-secondary text-white rounded-lg border border-gray-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none px-4 py-3 transition-colors"
                                    placeholder="your.email@example.com"
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
                                    className="w-full bg-secondary text-white rounded-lg border border-gray-700 focus:border-accent focus:ring-1 focus:ring-accent outline-none px-4 py-3 transition-colors"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={isSending}
                                className={`w-full font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 ${isSent
                                    ? "bg-green-600 text-white cursor-default"
                                    : "bg-accent hover:bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                    }`}
                            >
                                {isSent ? (
                                    <>
                                        <FaCheckCircle /> Message Sent!
                                    </>
                                ) : isSending ? (
                                    "Sending..."
                                ) : (
                                    <>
                                        Send Message <FaPaperPlane className="text-sm" />
                                    </>
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
