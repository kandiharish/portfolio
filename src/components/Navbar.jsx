import React, { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { FaBars, FaTimes, FaCode } from "react-icons/fa";
import { motion } from "framer-motion";
import { HERO_CONTENT } from "../constants";

const EASE = [0.16, 1, 0.3, 1];

// In page order
const NAV_LINKS = [
    { name: "About", to: "about" },
    { name: "Experience", to: "experience" },
    { name: "Skills", to: "skills" },
    { name: "Projects", to: "projects" },
    { name: "Clients", to: "leadership" },
    { name: "Contact", to: "contact" },
];

// The section crossing the middle of the viewport is the active one
const useActiveSection = () => {
    const [active, setActive] = useState(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: "-45% 0px -50% 0px" }
        );
        ["hero", "about", "experience", "education", "skills", "projects", "leadership", "certifications", "testimonials", "contact"].forEach(
            (id) => {
                const el = document.getElementById(id);
                if (el) observer.observe(el);
            }
        );
        return () => observer.disconnect();
    }, []);
    return active;
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const active = useActiveSection();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
        <nav
            className={`fixed z-50 w-full transition-all duration-300 ${
                scrolled || isOpen ? "border-b border-white/5 bg-primary/90 py-4 backdrop-blur-md" : "bg-transparent py-6"
            }`}
        >
            <div className="container mx-auto flex items-center justify-between px-6">
                <Link
                    to="hero"
                    smooth={true}
                    duration={500}
                    onClick={() => setIsOpen(false)}
                    className="flex cursor-pointer items-center gap-2 font-heading text-xl font-bold text-white"
                >
                    <FaCode className="text-accent" />
                    <span>HarishKandi</span>
                </Link>

                {/* Desktop */}
                <div className="hidden items-center gap-1 md:flex">
                    {NAV_LINKS.map((link) => {
                        const isActive = active === link.to;
                        return (
                            <Link
                                key={link.to}
                                to={link.to}
                                smooth={true}
                                duration={500}
                                offset={-70}
                                className={`relative cursor-pointer px-3 py-2 text-sm font-medium transition-colors ${
                                    isActive ? "text-white" : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {link.name}
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active"
                                        className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-accent"
                                        transition={{ duration: 0.35, ease: EASE }}
                                    />
                                )}
                            </Link>
                        );
                    })}
                    <a
                        href={HERO_CONTENT.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-4 rounded-lg border border-white/20 px-5 py-2 text-sm font-medium text-white transition-colors duration-300 hover:border-accent/50 hover:bg-white/10"
                    >
                        Resume
                    </a>
                </div>

                <button
                    onClick={() => setIsOpen((o) => !o)}
                    className="z-50 text-xl text-white focus:outline-none md:hidden"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isOpen}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

        </nav>

        {/* Outside <nav>: its backdrop-blur would otherwise trap this fixed panel inside the bar */}
        {/* Mobile: full-height panel, links rise in one after another */}
        {isOpen && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-x-0 bottom-0 top-[64px] z-40 flex flex-col bg-primary px-6 pb-10 pt-6 md:hidden"
            >
                {NAV_LINKS.map((link, i) => (
                    <div key={link.to} className="overflow-hidden border-b border-white/[0.06]">
                        <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ duration: 0.4, ease: EASE, delay: 0.04 * i }}>
                            <Link
                                to={link.to}
                                smooth={true}
                                duration={500}
                                offset={-70}
                                onClick={() => setIsOpen(false)}
                                className={`flex cursor-pointer items-baseline gap-4 py-4 font-heading text-3xl font-bold ${
                                    active === link.to ? "text-accent" : "text-white"
                                }`}
                            >
                                <span className="font-mono text-xs font-normal text-gray-500">{String(i + 1).padStart(2, "0")}</span>
                                {link.name}
                            </Link>
                        </motion.div>
                    </div>
                ))}
                <a
                    href={HERO_CONTENT.resumeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto rounded-xl border border-white/20 py-3 text-center font-medium text-white"
                >
                    View Resume
                </a>
            </motion.div>
        )}
        </>
    );
};

export default Navbar;
