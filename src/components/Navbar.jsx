import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes, FaCode } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_CONTENT } from "../constants";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "About", to: "about" },
        { name: "Skills", to: "skills" },
        { name: "Projects", to: "projects" },
        { name: "Leadership", to: "leadership" },
        { name: "Experience", to: "experience" },
        { name: "Contact", to: "contact" },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-primary/90 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="hero"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer text-xl font-bold font-heading flex items-center gap-2 text-white"
                >
                    <FaCode className="text-accent" />
                    <span>HarishKandi</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link, index) => (
                        <Link
                            key={index}
                            to={link.to}
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="cursor-pointer text-gray-400 hover:text-white text-sm font-medium transition-colors relative group"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <a
                        href={HERO_CONTENT.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 border border-white/20 text-white text-sm font-medium rounded-lg hover:bg-white/10 hover:border-white/30 transition-colors duration-300"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden z-50">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white text-xl focus:outline-none">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ type: "tween", duration: 0.2 }}
                        className="absolute top-full left-0 w-full bg-primary/95 backdrop-blur-lg border-b border-white/10 flex flex-col items-center py-8 md:hidden"
                    >
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                offset={-70}
                                onClick={() => setIsOpen(false)}
                                className="text-lg text-gray-300 font-medium py-3 hover:text-white transition-colors cursor-pointer w-full text-center"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href={HERO_CONTENT.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 px-8 py-3 border border-white/20 text-white rounded-lg text-base font-medium hover:bg-white/10 transition-colors"
                        >
                            View Resume
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
