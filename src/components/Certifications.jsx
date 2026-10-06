import React, { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaShieldAlt, FaTimes } from "react-icons/fa";
import { CERTIFICATIONS } from "../constants";

const EASE = [0.16, 1, 0.3, 1];

// Opens over the page; no exit animation so closing is always instant and reliable
const Viewer = ({ index, onClose, onStep }) => {
    const cert = CERTIFICATIONS[index];
    const isPdf = cert.link.toLowerCase().endsWith(".pdf");

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight") onStep(1);
            if (e.key === "ArrowLeft") onStep(-1);
        };
        window.addEventListener("keydown", onKey);
        const overflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = overflow;
        };
    }, [onClose, onStep]);

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={cert.name}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-[#04070d]/90 p-4 backdrop-blur-sm md:p-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
        >
            <motion.div
                key={index}
                className="relative w-full max-w-4xl"
                initial={{ opacity: 0, y: 16, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                        <div className="font-mono text-xs text-gray-500">
                            {String(index + 1).padStart(2, "0")} / {String(CERTIFICATIONS.length).padStart(2, "0")} · {cert.issuer}
                        </div>
                        <h3 className="mt-1 font-heading text-xl font-bold text-white md:text-2xl">{cert.name}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-white/40 hover:text-white"
                        aria-label="Close"
                    >
                        <FaTimes />
                    </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]">
                    <img src={cert.preview} alt={cert.name} className="max-h-[68vh] w-full object-contain" />
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="flex gap-2">
                        <button
                            onClick={() => onStep(-1)}
                            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-accent hover:text-accent"
                            aria-label="Previous certificate"
                        >
                            <FaChevronLeft className="text-xs" />
                        </button>
                        <button
                            onClick={() => onStep(1)}
                            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-gray-300 transition-colors hover:border-accent hover:text-accent"
                            aria-label="Next certificate"
                        >
                            <FaChevronRight className="text-xs" />
                        </button>
                    </div>
                    <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-[#070b14] transition-opacity hover:opacity-90"
                    >
                        Open original {isPdf ? "PDF" : "image"} <FaExternalLinkAlt className="text-[10px]" />
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Certifications = () => {
    const reduce = useReducedMotion();
    const [open, setOpen] = useState(null);
    const step = useCallback(
        (d) => setOpen((i) => (i === null ? i : (i + d + CERTIFICATIONS.length) % CERTIFICATIONS.length)),
        []
    );
    const close = useCallback(() => setOpen(null), []);

    return (
        <section id="certifications" className="relative bg-[#070b14] py-28 text-white md:py-36">
            <div className="container mx-auto max-w-6xl px-6">
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-accent" />
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Certifications</span>
                        </div>
                        <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                            Credentials,
                            <br />
                            <span className="text-accent">on the record.</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-gray-400 md:text-right">
                        {CERTIFICATIONS.length} certifications and achievements. Open any one to see the actual document.
                    </p>
                </motion.div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {CERTIFICATIONS.map((cert, i) => (
                        <motion.button
                            key={cert.name}
                            onClick={() => setOpen(i)}
                            initial={reduce ? false : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.5, ease: EASE, delay: (i % 3) * 0.07 }}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] text-left transition-colors duration-300 hover:border-accent/40"
                        >
                            {/* The document itself, framed like paper on a desk */}
                            <div className="relative overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(20,241,217,0.10),transparent_60%)] px-8 pb-0 pt-8">
                                <div className="origin-bottom overflow-hidden rounded-t-md bg-white shadow-[0_20px_40px_-12px_rgba(0,0,0,0.7)] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 group-hover:rotate-[-1deg]">
                                    <img
                                        src={cert.preview}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                        className="aspect-[4/3] w-full object-cover object-top"
                                    />
                                </div>
                                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-[#070b14]/80 px-2.5 py-1 text-[10px] font-semibold text-accent backdrop-blur">
                                    <FaShieldAlt className="text-[9px]" /> Document
                                </span>
                            </div>
                            <div className="flex flex-1 flex-col border-t border-white/10 p-5">
                                <div className="font-mono text-[11px] uppercase tracking-wider text-gray-500">{cert.issuer}</div>
                                <h3 className="mt-1.5 font-semibold leading-snug text-white">{cert.name}</h3>
                                <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-xs font-semibold text-gray-400 transition-colors group-hover:text-accent">
                                    View certificate <FaChevronRight className="text-[9px] transition-transform group-hover:translate-x-0.5" />
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {open !== null && <Viewer index={open} onClose={close} onStep={step} />}
        </section>
    );
};

export default Certifications;
