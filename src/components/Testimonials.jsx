import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { TESTIMONIALS } from "../constants";

const EASE = [0.16, 1, 0.3, 1];
const ROTATE_MS = 8000;

// Phrases worth drawing the eye to; anything not listed renders plainly
const HIGHLIGHTS = ["goes beyond the curriculum", "leadership in the GDSC", "technical prowess in AI", "algorithmic efficiency", "strong management skills"];

const highlight = (text) => {
    const pattern = new RegExp(`(${HIGHLIGHTS.map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
    return text.split(pattern).map((part, i) =>
        HIGHLIGHTS.some((h) => h.toLowerCase() === part.toLowerCase()) ? (
            <span key={i} className="text-white">
                {part}
            </span>
        ) : (
            part
        )
    );
};

// "Prof. Dr. B. Santhosh Kumar" → "BK": first and last initials, titles dropped
const initials = (name) => {
    const words = name.split(/\s+/).filter((w) => !/^(prof|dr)\.?$/i.test(w));
    return `${words[0]?.[0] ?? ""}${words.length > 1 ? words[words.length - 1][0] : ""}`.toUpperCase();
};

const Testimonials = () => {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const inView = useInView(ref, { amount: 0.4 });
    const [index, setIndex] = useState(0);
    const [auto, setAuto] = useState(true);
    const t = TESTIMONIALS[index];
    const cycling = auto && inView && !reduce && TESTIMONIALS.length > 1;

    useEffect(() => {
        if (!cycling) return;
        const id = setTimeout(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), ROTATE_MS);
        return () => clearTimeout(id);
    }, [cycling, index]);

    return (
        <section ref={ref} id="testimonials" className="relative overflow-hidden bg-[#070b14] py-28 text-white md:py-36">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.04] blur-[120px]" />

            <div className="container relative mx-auto max-w-5xl px-6">
                <div className="mb-12 flex items-center gap-3">
                    <span className="h-px w-10 bg-accent" />
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">In their words</span>
                </div>

                <div className="grid gap-12 md:grid-cols-[1fr_auto] md:gap-16">
                    <figure className="relative">
                        <span aria-hidden className="absolute -left-2 -top-10 select-none font-heading text-[9rem] leading-none text-accent/15 md:-left-6 md:-top-14 md:text-[12rem]">
                            “
                        </span>
                        {/* Re-keyed per quote: fades in fresh each time */}
                        <motion.blockquote
                            key={index}
                            initial={reduce ? false : { opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: EASE }}
                            className="relative font-heading text-2xl font-medium leading-snug text-gray-400 md:text-[2.1rem] md:leading-[1.3]"
                        >
                            {highlight(t.text)}
                        </motion.blockquote>
                        <motion.figcaption
                            key={`cap-${index}`}
                            initial={reduce ? false : { opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="mt-8 flex items-center gap-3"
                        >
                            <span className="h-px w-8 bg-accent" />
                            <span className="text-white">{t.name}</span>
                            <span className="text-sm text-gray-500">· {t.role}</span>
                        </motion.figcaption>
                    </figure>

                    {/* Speaker switcher with a progress ring while auto-rotating */}
                    <div className="flex gap-3 md:flex-col">
                        {TESTIMONIALS.map((p, i) => (
                            <button
                                key={p.name}
                                onClick={() => {
                                    setAuto(false);
                                    setIndex(i);
                                }}
                                aria-label={`Show quote from ${p.name}`}
                                aria-pressed={i === index}
                                className={`relative grid h-14 w-14 place-items-center rounded-full border font-heading text-sm font-bold transition-colors duration-300 ${
                                    i === index ? "border-accent/60 bg-accent/10 text-accent" : "border-white/10 text-gray-500 hover:text-gray-300"
                                }`}
                            >
                                {initials(p.name)}
                                {i === index && cycling && (
                                    <svg className="absolute inset-0 -rotate-90" viewBox="0 0 56 56" aria-hidden>
                                        <motion.circle
                                            key={index}
                                            cx="28"
                                            cy="28"
                                            r="27"
                                            fill="none"
                                            stroke="#14F1D9"
                                            strokeWidth="1.5"
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: ROTATE_MS / 1000, ease: "linear" }}
                                        />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
