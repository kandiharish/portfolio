import React from "react";
import { FaArrowUp } from "react-icons/fa";
import { animateScroll } from "react-scroll";
import { LINKS, HERO_CONTENT } from "../constants";

const Footer = () => {
    return (
        <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[#070b14] text-gray-400">
            <div className="container mx-auto px-6 pt-16">
                {/* Signature: outlined name that fills with teal on hover — an echo of the hero */}
                <div
                    className="group select-none text-center font-heading text-[13vw] font-bold leading-[0.85] tracking-tight md:text-[10.5vw]"
                    aria-hidden
                >
                    <span
                        className="inline-block bg-gradient-to-t from-accent to-accent bg-[length:100%_0%] bg-bottom bg-no-repeat bg-clip-text text-transparent transition-[background-size] duration-700 ease-out group-hover:bg-[length:100%_100%]"
                        style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}
                    >
                        {HERO_CONTENT.name.toUpperCase()}
                    </span>
                </div>

                <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/[0.06] py-8 md:flex-row">
                    <p className="text-xs text-gray-500">
                        © {new Date().getFullYear()} {HERO_CONTENT.name}. Designed & built by me.
                    </p>

                    <div className="flex items-center gap-3">
                        {LINKS.map(({ icon: Icon, link, name }) => (
                            <a
                                key={name}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={name}
                                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-gray-400 transition-colors hover:border-accent/50 hover:text-accent"
                            >
                                <Icon />
                            </a>
                        ))}
                        <button
                            onClick={() => animateScroll.scrollToTop({ duration: 700, smooth: "easeInOutQuart" })}
                            className="group ml-2 inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-gray-300 transition-colors hover:border-accent/50 hover:text-white"
                        >
                            Back to top
                            <FaArrowUp className="text-[10px] transition-transform group-hover:-translate-y-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
