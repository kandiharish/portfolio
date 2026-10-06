import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, animate, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { EDUCATION } from "../constants";

const EASE = [0.16, 1, 0.3, 1];
const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
const SEMESTERS = 8;

// "Aug 2023" → months since year 0
const toMonths = (s) => {
    const [mon, year] = s.trim().split(/\s+/);
    return Number(year) * 12 + MONTHS.indexOf(mon.slice(0, 3).toLowerCase());
};
const parseScore = (score) => {
    const value = parseFloat(score.match(/[\d.]+/)[0]);
    return score.includes("/10") ? { value, max: 10, unit: "CGPA" } : { value, max: 100, unit: "%" };
};

/* ---- The degree, worked out from its dates and today's date ---- */
const [degree, ...earlier] = EDUCATION;
const [degreeStart, degreeEnd] = degree.duration.split("–").map(toMonths);
const now = new Date();
const nowMonths = now.getFullYear() * 12 + now.getMonth();
const totalMonths = degreeEnd - degreeStart;
const elapsed = Math.min(Math.max(nowMonths - degreeStart, 0), totalMonths);
const PROGRESS = Math.round((elapsed / totalMonths) * 100);
const FINISHED = nowMonths >= degreeEnd;
const SEM_LENGTH = totalMonths / SEMESTERS;
const CURRENT_SEM = FINISHED ? SEMESTERS + 1 : Math.min(Math.floor(elapsed / SEM_LENGTH) + 1, SEMESTERS);

const STAGES = Array.from({ length: SEMESTERS }, (_, i) => {
    const n = i + 1;
    return {
        n,
        status: n < CURRENT_SEM ? "passed" : n === CURRENT_SEM ? "running" : "queued",
        range: `Year ${Math.ceil(n / 2)}`,
    };
});

const SCORE = parseScore(degree.score);
const ETA = degree.duration.split("–")[1].trim();

const CountUp = ({ value, decimals = 0, start }) => {
    const reduce = useReducedMotion();
    const count = useMotionValue(reduce ? value : 0);
    const shown = useTransform(count, (v) => v.toFixed(decimals));
    useEffect(() => {
        if (!start || reduce) return;
        const c = animate(count, value, { duration: 1.2, ease: EASE });
        return () => c.stop();
    }, [start, value, count, reduce]);
    return <motion.span>{shown}</motion.span>;
};

const Bar = ({ percent, start, delay = 0, className = "bg-accent" }) => (
    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
            className={`h-full origin-left rounded-full ${className}`}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: start ? percent / 100 : 0 }}
            transition={{ duration: 1.1, ease: EASE, delay }}
        />
    </div>
);

const Stage = ({ stage, start, index, active, onSelect }) => {
    const reduce = useReducedMotion();
    const base = "relative grid h-8 w-8 place-items-center rounded-full border-2 text-[10px] font-bold md:h-10 md:w-10 md:text-xs";
    const look = {
        passed: "border-accent bg-accent text-[#070b14]",
        running: "border-amber-300 bg-[#0b1220] text-amber-300",
        queued: "border-white/15 bg-[#0b1220] text-gray-600",
    }[stage.status];

    return (
        <button
            onClick={() => onSelect(stage.n)}
            onPointerEnter={(e) => e.pointerType === "mouse" && onSelect(stage.n)}
            className="relative flex flex-col items-center gap-2 focus:outline-none"
            aria-label={`Semester ${stage.n}: ${stage.status}, ${stage.range}`}
        >
            <motion.span
                className={`${base} ${look} ${active ? "ring-2 ring-white/30 ring-offset-2 ring-offset-[#0b1220]" : ""}`}
                initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                animate={start ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.35, ease: EASE, delay: 0.15 + index * 0.09 }}
            >
                {stage.status === "passed" ? <FaCheck /> : stage.n}
                {stage.status === "running" && (
                    <span className="absolute -inset-1.5 animate-spin rounded-full border-2 border-dashed border-amber-300/50 [animation-duration:3s] motion-reduce:animate-none" />
                )}
            </motion.span>
            <span className={`font-mono text-[10px] ${stage.status === "queued" ? "text-gray-600" : "text-gray-400"}`}>S{stage.n}</span>
        </button>
    );
};

const Education = () => {
    const reduce = useReducedMotion();
    const cardRef = useRef(null);
    const start = useInView(cardRef, { once: true, amount: 0.3 });
    const [selected, setSelected] = useState(Math.min(CURRENT_SEM, SEMESTERS));
    const selectedStage = STAGES[selected - 1];

    return (
        <section id="education" className="relative overflow-hidden bg-[#070b14] py-28 text-white md:py-36">
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
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Education</span>
                        </div>
                        <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                            Education,
                            <br />
                            <span className="text-accent">{FINISHED ? "build passed." : "still compiling."}</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-gray-400 md:text-right">
                        {FINISHED
                            ? `B.Tech complete with a ${SCORE.value} ${SCORE.unit}.`
                            : `Final stretch of my B.Tech — ${PROGRESS}% through the degree, ${SCORE.value} ${SCORE.unit} so far.`}
                    </p>
                </motion.div>

                {/* Current pipeline: the degree */}
                <motion.div
                    ref={cardRef}
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]"
                >
                    <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3.5 font-mono text-xs">
                        <span className="text-gray-400">
                            pipeline <span className="text-gray-600">/</span> <span className="text-gray-200">b.tech-cse</span>
                        </span>
                        <span
                            className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] ${
                                FINISHED ? "border-accent/40 text-accent" : "border-amber-300/40 text-amber-300"
                            }`}
                        >
                            <span className={`h-1.5 w-1.5 rounded-full ${FINISHED ? "bg-accent" : "bg-amber-300"}`} />
                            {FINISHED ? "passed" : "running"}
                        </span>
                    </div>

                    <div className="grid gap-10 p-6 md:grid-cols-[1fr_auto] md:gap-12 md:p-10">
                        <div>
                            <h3 className="font-heading text-2xl font-bold leading-snug md:text-3xl">{degree.degree}</h3>
                            <p className="mt-2 text-gray-400">
                                {degree.institution} <span className="text-gray-600">· {degree.duration}</span>
                            </p>

                            {/* Semesters as pipeline stages */}
                            <div className="mt-10">
                                <div className="relative flex items-start justify-between">
                                    <div className="absolute left-4 right-4 top-4 h-0.5 bg-white/[0.08] md:left-5 md:right-5 md:top-5">
                                        <motion.div
                                            className="h-full origin-left bg-accent"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: start ? Math.max(CURRENT_SEM - 1, 0) / (SEMESTERS - 1) : 0 }}
                                            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                                        />
                                    </div>
                                    {STAGES.map((stage, i) => (
                                        <Stage
                                            key={stage.n}
                                            stage={stage}
                                            index={i}
                                            start={start}
                                            active={selected === stage.n}
                                            onSelect={setSelected}
                                        />
                                    ))}
                                </div>

                                <div className="mt-5 h-5 font-mono text-xs" aria-live="polite">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={selected}
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            transition={{ duration: 0.18 }}
                                            className="text-gray-400"
                                        >
                                            {selectedStage.range} · <span className="text-gray-200">Semester {selectedStage.n}</span> ·{" "}
                                            <span
                                                className={
                                                    { passed: "text-accent", running: "text-amber-300", queued: "text-gray-500" }[
                                                        selectedStage.status
                                                    ]
                                                }
                                            >
                                                {selectedStage.status === "running" ? "in progress" : selectedStage.status}
                                            </span>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>

                            <div className="mt-8">
                                <div className="mb-2 flex justify-between font-mono text-xs text-gray-500">
                                    <span>
                                        <span className="text-gray-200">
                                            <CountUp value={PROGRESS} start={start} />%
                                        </span>{" "}
                                        complete
                                    </span>
                                    <span>ETA {ETA}</span>
                                </div>
                                <Bar percent={PROGRESS} start={start} delay={0.3} className="bg-gradient-to-r from-accent/60 to-accent" />
                            </div>
                        </div>

                        {/* CGPA */}
                        <div className="flex items-center border-t border-white/10 pt-8 md:w-56 md:justify-center md:border-l md:border-t-0 md:pl-12 md:pt-0">
                            <div>
                                <div className="text-xs font-semibold uppercase tracking-widest text-gray-500">{SCORE.unit}</div>
                                <div className="font-heading text-6xl font-bold tracking-tight md:text-7xl">
                                    <CountUp value={SCORE.value} decimals={1} start={start} />
                                    <span className="text-2xl text-gray-500 md:text-3xl"> / {SCORE.max}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Previous runs: school */}
                <div className="mt-6">
                    <div className="mb-3 px-1 font-mono text-xs text-gray-500">previous runs</div>
                    <div className="grid gap-3 md:grid-cols-2">
                        {earlier.map((edu, i) => {
                            const score = parseScore(edu.score);
                            return (
                                <motion.div
                                    key={edu.institution}
                                    initial={reduce ? false : { opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.08 }}
                                    className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition-colors hover:border-accent/30 hover:bg-white/[0.04]"
                                >
                                    <div className="flex items-start gap-4">
                                        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent/15 text-xs text-accent">
                                            <FaCheck />
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <h3 className="truncate font-semibold text-white">{edu.degree}</h3>
                                            <p className="mt-0.5 truncate text-sm text-gray-400">{edu.institution}</p>
                                            <p className="mt-0.5 text-sm text-gray-600">{edu.duration}</p>
                                        </div>
                                        {/* Score as a plain labelled number — a bar here would read as "85% complete" */}
                                        <div className="shrink-0 text-right">
                                            <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                                                {score.unit === "%" ? "Score" : score.unit}
                                            </div>
                                            <div className="font-heading text-3xl font-bold text-white">
                                                <CountUp value={score.value} start={start} />
                                                <span className="text-lg text-accent">{score.unit === "%" ? "%" : ""}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Education;
