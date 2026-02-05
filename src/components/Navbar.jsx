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
        { name: "Experience", to: "experience" },
        { name: "Contact", to: "contact" },
    ];

    return (
        <nav
            className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? "bg-primary/90 backdrop-blur-md shadow-lg py-4" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="hero"
                    smooth={true}
                    duration={500}
                    className="cursor-pointer text-2xl font-bold font-heading flex items-center gap-2 text-white"
                >
                    <FaCode className="text-accent" />
                    <span>Harish<span className="text-accent">.dev</span></span>
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
                            className="cursor-pointer text-gray-300 hover:text-accent font-medium transition-colors relative group"
                        >
                            {link.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    ))}
                    <a
                        href={HERO_CONTENT.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 border border-accent text-accent rounded hover:bg-accent/10 transition-colors duration-300"
                    >
                        Resume
                    </a>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden z-50">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white text-2xl focus:outline-none">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 bg-primary z-40 flex flex-col items-center justify-center md:hidden"
                    >
                        {navLinks.map((link, index) => (
                            <Link
                                key={index}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                onClick={() => setIsOpen(false)}
                                className="text-2xl text-white font-medium my-4 hover:text-accent transition-colors cursor-pointer"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a
                            href={HERO_CONTENT.resumeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 px-8 py-3 border border-accent text-accent rounded-full text-lg hover:bg-accent/10 transition-colors"
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
