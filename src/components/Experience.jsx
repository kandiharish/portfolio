import React, { useEffect, useRef, useState } from "react";
import {
    motion,
    AnimatePresence,
    animate,
    useInView,
    useMotionValue,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { FaChevronDown, FaExternalLinkAlt } from "react-icons/fa";
import { EXPERIENCES } from "../constants";

const EASE = [0.16, 1, 0.3, 1];
const COMMAND = "git log --graph --career";

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// "Sep 2024" → months since year 0
const toMonths = (s) => {
    const [mon, year] = s.trim().split(/\s+/);
    return Number(year) * 12 + MONTHS.indexOf(mon.slice(0, 3).toLowerCase());
};

// Stable 7-char "commit hash" so each role always shows the same id
const shortHash = (s) => {
    let h = 2166136261;
    for (const c of s) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return (h >>> 0).toString(16).padStart(8, "0").slice(0, 7);
};

const COMMITS = EXPERIENCES.map((exp) => {
    const [start, end] = exp.year.split("–");
    const months = toMonths(end) - toMonths(start) + 1;
    const location = exp.company.match(/\(([^)]+)\)/)?.[1];
    return {
        ...exp,
        hash: shortHash(exp.role + exp.company),
        branch: `feat/${exp.role.replace(/intern/i, "").trim().toLowerCase().replace(/\s+/g, "-")}`,
        company: exp.company.replace(/\s*\(.*\)/, ""),
        location,
        months,
        startMonths: toMonths(start),
        endMonths: toMonths(end),
    };
});

// Calendar span, not a sum — some internships overlap
const FIRST = Math.min(...COMMITS.map((c) => c.startMonths));
const SPAN_MONTHS = Math.max(...COMMITS.map((c) => c.endMonths)) - FIRST + 1;
const SINCE = Math.floor(FIRST / 12);

// Types the command once when the terminal scrolls into view
const TypedCommand = ({ start }) => {
    const reduce = useReducedMotion();
    const count = useMotionValue(reduce ? COMMAND.length : 0);
    const shown = useTransform(count, (c) => COMMAND.slice(0, Math.round(c)));
    useEffect(() => {
        if (!start || reduce) return;
        const c = animate(count, COMMAND.length, { duration: 0.7, ease: "linear", delay: 0.2 });
        return () => c.stop();
    }, [start, reduce, count]);
    return <motion.span>{shown}</motion.span>;
};

const Commit = ({ commit, index, isHead, open, onToggle }) => {
    const reduce = useReducedMotion();
    const panelId = `commit-${commit.hash}`;

    return (
        <motion.li
            className="relative grid grid-cols-[2.25rem_1fr] md:grid-cols-[3rem_1fr]"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: index * 0.06 }}
        >
            {/* Graph node */}
            <div className="relative flex justify-center pt-6">
                <motion.span
                    className={`relative z-10 block h-3.5 w-3.5 rounded-full border-2 ${
                        isHead ? "border-accent bg-accent shadow-[0_0_14px_rgba(20,241,217,0.7)]" : "border-accent bg-[#0b1220]"
                    }`}
                    initial={reduce ? false : { scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "0px 0px -35% 0px" }}
                    transition={{ duration: 0.35, ease: EASE }}
                />
            </div>

            <div className="border-b border-white/[0.06] pb-2 last:border-b-0">
                <button
                    onClick={onToggle}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="group w-full rounded-xl px-3 py-4 text-left transition-colors hover:bg-white/[0.03] md:px-4"
                >
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-mono text-xs">
                        <span className="text-amber-300/90">{commit.hash}</span>
                        {isHead && (
                            <span className="rounded border border-accent/40 bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold text-accent">
                                HEAD → main
                            </span>
                        )}
                        <span className="rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-gray-400">{commit.branch}</span>
                        <span className="text-gray-500">{commit.year}</span>
                    </div>

                    <div className="mt-2 flex items-start justify-between gap-4">
                        <div>
                            <h3 className="font-heading text-xl font-bold text-white transition-colors group-hover:text-accent md:text-2xl">
                                {commit.role}
                            </h3>
                            <p className="mt-1 text-sm text-gray-400">
                                <span className="text-gray-200">{commit.company}</span>
                                {commit.location && <> · {commit.location}</>}
                                <span className="text-gray-600"> · {commit.months} mos</span>
                            </p>
                        </div>
                        <span
                            className={`mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                                open ? "rotate-180 border-accent/50 text-accent" : "border-white/10 text-gray-500 group-hover:border-white/30"
                            }`}
                        >
                            <FaChevronDown className="text-xs" />
                        </span>
                    </div>
                </button>

                <AnimatePresence initial={false}>
                    {open && (
                        <motion.div
                            id={panelId}
                            key="diff"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden"
                        >
                            <div className="mx-3 mb-4 overflow-hidden rounded-xl border border-white/10 bg-[#060a12] md:mx-4">
                                <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 font-mono text-[11px] text-gray-500">
                                    <span>impact.md</span>
                                    <span>
                                        <span className="text-green-400">+{commit.description.length}</span> highlights ·{" "}
                                        {commit.technologies.length} tools
                                    </span>
                                </div>
                                <ul className="py-2 font-mono text-[13px] leading-relaxed">
                                    {commit.description.map((line, i) => (
                                        <motion.li
                                            key={i}
                                            className="grid grid-cols-[2rem_1rem_1fr] bg-green-500/[0.04] pr-4 md:grid-cols-[2.5rem_1rem_1fr]"
                                            initial={reduce ? false : { opacity: 0, x: -6 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.25, ease: EASE, delay: 0.08 + i * 0.05 }}
                                        >
                                            <span className="select-none text-right text-gray-600">{i + 1}</span>
                                            <span className="select-none text-center text-green-400">+</span>
                                            <span className="font-sans text-sm text-gray-200">{line}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap items-center gap-2 border-t border-white/10 px-4 py-3">
                                    <span className="font-mono text-[11px] text-gray-500">tags:</span>
                                    {commit.technologies.map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-md border border-accent/20 bg-accent/[0.06] px-2 py-0.5 font-mono text-[11px] text-accent/90"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                    {commit.certificate && (
                                        <a
                                            href={commit.certificate}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="ml-auto inline-flex items-center gap-1.5 text-xs font-semibold text-gray-300 transition-colors hover:text-accent"
                                        >
                                            View credential <FaExternalLinkAlt className="text-[9px]" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.li>
    );
};

const Experience = () => {
    const reduce = useReducedMotion();
    const terminalRef = useRef(null);
    const listRef = useRef(null);
    const inView = useInView(terminalRef, { once: true, amount: 0.25 });
    const [openHash, setOpenHash] = useState(COMMITS[0]?.hash);

    // The graph line draws itself as the log scrolls through the viewport
    const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.75", "end 0.6"] });
    const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

    return (
        <section id="experience" className="relative overflow-hidden bg-[#070b14] py-28 text-white md:py-36">
            <div className="container mx-auto max-w-5xl px-6">
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
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Experience</span>
                        </div>
                        <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                            My career,
                            <br />
                            <span className="text-accent">as a commit log.</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-gray-400 md:text-right">
                        {COMMITS.length} internships across {SPAN_MONTHS} months since {SINCE}. Open a commit to see the diff.
                    </p>
                </motion.div>

                {/* Terminal */}
                <motion.div
                    ref={terminalRef}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
                >
                    <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3.5">
                        <div className="flex gap-1.5">
                            <span className="h-3 w-3 rounded-full bg-[#ff5f57]/80" />
                            <span className="h-3 w-3 rounded-full bg-[#febc2e]/80" />
                            <span className="h-3 w-3 rounded-full bg-[#28c840]/80" />
                        </div>
                        <div className="min-w-0 flex-1 truncate font-mono text-xs text-gray-400 md:text-sm">
                            <span className="text-accent">~/harish</span> <span className="text-gray-600">$</span>{" "}
                            <span className="text-gray-200">
                                <TypedCommand start={inView} />
                            </span>
                            <motion.span
                                className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent/80"
                                animate={reduce ? {} : { opacity: [1, 0, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        </div>
                        <span className="hidden font-mono text-[11px] text-gray-600 sm:block">{COMMITS.length} commits</span>
                    </div>

                    <div className="relative px-2 py-4 md:px-4 md:py-6">
                        {/* Graph rail: faint track + line that fills with scroll */}
                        <div className="pointer-events-none absolute bottom-[calc(1rem+0.5rem)] left-[calc(0.5rem+1.125rem)] top-[calc(1rem+1.9rem)] w-0.5 -translate-x-1/2 bg-white/[0.06] md:bottom-[calc(1.5rem+0.5rem)] md:left-[calc(1rem+1.5rem)] md:top-[calc(1.5rem+1.9rem)]">
                            <motion.div
                                className="h-full w-full origin-top bg-gradient-to-b from-accent to-accent/40"
                                style={{ scaleY: reduce ? 1 : lineScale }}
                            />
                        </div>

                        <ol ref={listRef} className="relative">
                            {COMMITS.map((commit, i) => (
                                <Commit
                                    key={commit.hash}
                                    commit={commit}
                                    index={i}
                                    isHead={i === 0}
                                    open={openHash === commit.hash}
                                    onToggle={() => setOpenHash((h) => (h === commit.hash ? null : commit.hash))}
                                />
                            ))}
                        </ol>

                        {/* Root of the graph — where the line ends */}
                        <div className="relative grid grid-cols-[2.25rem_1fr] items-center md:grid-cols-[3rem_1fr]">
                            <span className="relative z-10 mx-auto block h-2.5 w-2.5 rounded-full border-2 border-gray-600 bg-[#0b1220]" />
                            <span className="px-3 font-mono text-[11px] text-gray-600 md:px-4">(root) — first commit · {SINCE}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;
