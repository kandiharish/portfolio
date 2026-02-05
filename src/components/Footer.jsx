import React from "react";
import { LINKS, HERO_CONTENT } from "../constants";

const Footer = () => {
    return (
        <footer className="bg-primary text-gray-400 py-10 border-t border-gray-800 text-center">
            <div className="container mx-auto px-6">
                <div className="flex justify-center gap-6 mb-8">
                    {LINKS.map((link, index) => {
                        const Icon = link.icon;
                        return (
                            <a
                                key={index}
                                href={link.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-2xl hover:text-accent transition-transform hover:-translate-y-1"
                            >
                                <Icon />
                            </a>
                        );
                    })}
                </div>

                <p className="text-xs mt-2 text-gray-600">
                    Thank you for visiting my portfolio.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
