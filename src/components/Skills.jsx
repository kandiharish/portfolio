import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup, useInView, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaBriefcase, FaDatabase } from "react-icons/fa";
import {
    SiCss3, SiDocker, SiExpress, SiFirebase, SiFlask, SiGit, SiGithub, SiGooglecloud, SiGooglegemini, SiHtml5,
    SiJavascript, SiLangchain, SiMongodb, SiMysql, SiN8N, SiNextdotjs, SiNodedotjs, SiNumpy, SiOpenai, SiPandas,
    SiPostman, SiPython, SiPytorch, SiReact, SiSalesforce, SiScikitlearn, SiSocketdotio, SiSolidity, SiStripe,
    SiTailwindcss, SiTypescript, SiPostgresql, SiFastapi, SiSupabase,
} from "react-icons/si";
import { scroller } from "react-scroll";
import { EXPERIENCES, FREELANCE_PROJECTS, PROJECTS } from "../constants";

const EASE = [0.16, 1, 0.3, 1];
const CYCLE_MS = 5000;

// MCP has no brand mark — a small plug-style glyph
const McpIcon = (props) => (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
        <path d="M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8zM12 17v4" />
    </svg>
);

// Every tool in the toolkit, with its brand colour
const TILES = {
    Python: { icon: SiPython, color: "#FFD43B" },
    JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
    TypeScript: { icon: SiTypescript, color: "#3178C6" },
    SQL: { icon: FaDatabase, color: "#8FB7D9" },
    HTML: { icon: SiHtml5, color: "#E34F26" },
    CSS: { icon: SiCss3, color: "#2D9CDB" },
    React: { icon: SiReact, color: "#61DAFB" },
    "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
    "Node.js": { icon: SiNodedotjs, color: "#6CC24A" },
    Express: { icon: SiExpress, color: "#FFFFFF" },
    Flask: { icon: SiFlask, color: "#FFFFFF" },
    FastAPI: { icon: SiFastapi, color: "#05998B" },
    "Tailwind CSS": { icon: SiTailwindcss, color: "#38BDF8" },
    MongoDB: { icon: SiMongodb, color: "#47A248" },
    MySQL: { icon: SiMysql, color: "#5D9FD3" },
    PostgreSQL: { icon: SiPostgresql, color: "#699ECA" },
    Supabase: { icon: SiSupabase, color: "#3FCF8E" },
    Firebase: { icon: SiFirebase, color: "#FFCA28" },
    LangGraph: { icon: SiLangchain, color: "#14F1D9" },
    MCP: { icon: McpIcon, color: "#E8C9A0" },
    OpenAI: { icon: SiOpenai, color: "#FFFFFF" },
    Gemini: { icon: SiGooglegemini, color: "#8E9BFF" },
    "Vertex AI": { icon: SiGooglecloud, color: "#4285F4" },
    PyTorch: { icon: SiPytorch, color: "#EE4C2C" },
    "scikit-learn": { icon: SiScikitlearn, color: "#F7931E" },
    Pandas: { icon: SiPandas, color: "#B39DFF" },
    NumPy: { icon: SiNumpy, color: "#4DABCF" },
    Docker: { icon: SiDocker, color: "#2496ED" },
    Git: { icon: SiGit, color: "#F05032" },
    GitHub: { icon: SiGithub, color: "#FFFFFF" },
    Postman: { icon: SiPostman, color: "#FF6C37" },
    n8n: { icon: SiN8N, color: "#EA4B71" },
    Salesforce: { icon: SiSalesforce, color: "#00A1E0" },
    Stripe: { icon: SiStripe, color: "#8C85FF" },
    "Socket.io": { icon: SiSocketdotio, color: "#FFFFFF" },
    Solidity: { icon: SiSolidity, color: "#B0B0B0" },
};
const TILE_NAMES = Object.keys(TILES);

// Roles I can step into: the tools each one uses, and the work that backs it up
const ROLE_DATA = [
    {
        title: "AI / LLM Engineer",
        pitch: "Agents that plan, call tools and reason over real data — wrapped in a product people can use.",
        skills: ["Python", "LangGraph", "MCP", "OpenAI", "Gemini", "Vertex AI", "FastAPI", "Flask", "n8n"],
        proof: ["ReadyForRound", "RAG Customer Support", "MongoTalk", "Learning Path Generator", "LoanFlowAI"],
        experience: /agentic ai/i,
    },
    {
        title: "Full-Stack Developer",
        pitch: "From the database schema to the last pixel of the interface, shipped end to end.",
        skills: ["React", "TypeScript", "Node.js", "Express", "Next.js", "MongoDB", "Supabase", "Firebase", "Tailwind CSS", "JavaScript", "Stripe", "Socket.io", "Git", "GitHub"],
        proof: ["ReadyForRound", "GigHub", "TaskNext", "Plunto", "LK Events"],
        experience: /full stack/i,
    },
    {
        title: "Backend Engineer",
        pitch: "REST APIs, authentication and data flows that stay correct and reliable.",
        skills: ["Python", "FastAPI", "Node.js", "Express", "Flask", "PostgreSQL", "MongoDB", "Supabase", "MySQL", "SQL", "Postman", "Docker", "Git"],
        proof: ["Falcon", "RAG Customer Support", "ReadyForRound", "ImpactCred", "GigHub"],
        experience: /agentic ai/i,
    },
    {
        title: "Frontend Developer",
        pitch: "Interfaces that feel fast, obvious and polished on every screen size.",
        skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS", "GitHub"],
        proof: ["LK Events", "ImpactLedger", "DontWasteFood", "TEDxGNI", "ClassPulse"],
        experience: /full stack/i,
    },
    {
        title: "Machine Learning Engineer",
        pitch: "From EDA and feature engineering to tuned, evaluated models.",
        skills: ["Python", "scikit-learn", "Pandas", "NumPy", "PyTorch", "SQL"],
        proof: ["LoanFlowAI"],
        experience: /machine learning/i,
    },
    {
        title: "Salesforce Developer",
        pitch: "CRM automation with Apex, Lightning Web Components and Flow Builder.",
        skills: ["Salesforce", "JavaScript", "SQL"],
        proof: ["HandsMen Threads"],
        experience: /salesforce/i,
    },
    {
        title: "Web3 Developer",
        pitch: "Smart contracts and the dApps around them, for records nobody can tamper with.",
        skills: ["Solidity", "React", "JavaScript", "Node.js"],
        proof: ["Decentralized Land Registry"],
        experience: null,
    },
];

const ALL_WORK = [...PROJECTS, ...FREELANCE_PROJECTS];
const ROLES = ROLE_DATA.map((r) => ({
    ...r,
    proof: r.proof
        .map((name) => ALL_WORK.find((w) => w.title.includes(name)))
        .filter(Boolean)
        .map((w) => ({ title: w.title.replace(/\s*[-(].*$/, ""), isProject: PROJECTS.includes(w), link: w.link })),
    experience: r.experience ? EXPERIENCES.find((e) => r.experience.test(e.role)) : null,
}));

const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

/* ---------- Pieces ---------- */

const Tile = ({ name, active, reduce, hideOnMobile }) => {
    const { icon: Icon, color } = TILES[name];
    return (
        <motion.div
            layout={!reduce}
            transition={{ layout: { duration: 0.55, ease: EASE } }}
            className={`aspect-square flex-col items-center justify-center gap-2 rounded-2xl border transition-[background-color,border-color,opacity] duration-300 ${
                hideOnMobile ? "hidden sm:flex" : "flex"
            } ${
                active ? "border-white/15 bg-white/[0.06]" : "border-white/[0.04] bg-transparent opacity-40"
            }`}
            style={{ boxShadow: active ? `0 10px 30px -14px ${color}` : "none" }}
            title={name}
        >
            <Icon
                className="text-2xl transition-colors duration-300 md:text-[1.7rem]"
                style={{ color: active ? color : "#6b7280" }}
            />
            <span className={`px-1 text-center text-[10px] leading-tight md:text-[11px] ${active ? "text-gray-200" : "text-gray-500"}`}>
                {name}
            </span>
        </motion.div>
    );
};

const Skills = () => {
    const reduce = useReducedMotion();
    const sectionRef = useRef(null);
    const inView = useInView(sectionRef, { amount: 0.3 });
    const [index, setIndex] = useState(0);
    const [auto, setAuto] = useState(true);
    const [paused, setPaused] = useState(false);
    const [showAll, setShowAll] = useState(false); // phones show only the role's tools unless expanded
    const role = ROLES[index];
    const cycling = auto && inView && !paused && !reduce;

    // Walk through the roles until the visitor picks one
    useEffect(() => {
        if (!cycling) return;
        const t = setTimeout(() => setIndex((i) => (i + 1) % ROLES.length), CYCLE_MS);
        return () => clearTimeout(t);
    }, [cycling, index]);

    const choose = (i) => {
        setAuto(false);
        setIndex(i);
    };

    // The role's tools move to the front; everything else follows, dimmed
    const ordered = useMemo(
        () => [...role.skills, ...TILE_NAMES.filter((n) => !role.skills.includes(n))],
        [role]
    );

    return (
        <section
            ref={sectionRef}
            id="skills"
            className="relative overflow-hidden bg-[#070b14] py-28 text-white md:py-36"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="pointer-events-none absolute -left-40 top-1/3 h-[480px] w-[480px] rounded-full bg-accent/[0.05] blur-[130px]" />

            <div className="container relative mx-auto max-w-6xl px-6">
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
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Skills & roles</span>
                        </div>
                        <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                            One stack.
                            <br />
                            <span className="text-accent">{NUMBER_WORDS[ROLES.length] ?? ROLES.length} roles.</span>
                        </h2>
                    </div>
                    <p className="max-w-sm text-gray-400 md:text-right">
                        Pick a role to see the toolkit I'd bring to it — and the work that proves it.
                    </p>
                </motion.div>

                {/* Mobile: roles as a swipeable row */}
                <div className="-mx-6 mb-6 flex gap-2 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:hidden">
                    {ROLES.map((r, i) => (
                        <button
                            key={r.title}
                            onClick={() => choose(i)}
                            className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                                i === index ? "border-accent bg-accent/15 text-white" : "border-white/10 text-gray-400"
                            }`}
                        >
                            {r.title}
                        </button>
                    ))}
                </div>

                <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                    {/* Desktop: role list */}
                    <LayoutGroup id="roles">
                        <ol className="hidden lg:block">
                            {ROLES.map((r, i) => {
                                const active = i === index;
                                return (
                                    <li key={r.title} className="relative border-b border-white/[0.06]">
                                        {active && (
                                            <motion.span
                                                layoutId="role-indicator"
                                                className="absolute -left-4 bottom-3 top-3 w-0.5 rounded-full bg-accent"
                                                transition={{ duration: 0.4, ease: EASE }}
                                            />
                                        )}
                                        <button onClick={() => choose(i)} className="group w-full py-4 text-left" aria-pressed={active}>
                                            <div className="flex items-baseline gap-4">
                                                <span className={`font-mono text-xs ${active ? "text-accent" : "text-gray-600"}`}>
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span
                                                    className={`font-heading text-2xl font-bold tracking-tight transition-colors duration-300 xl:text-[1.7rem] ${
                                                        active ? "text-white" : "text-gray-600 group-hover:text-gray-300"
                                                    }`}
                                                >
                                                    {r.title}
                                                </span>
                                            </div>
                                            <AnimatePresence initial={false}>
                                                {active && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.35, ease: EASE }}
                                                        className="overflow-hidden pl-9"
                                                    >
                                                        <p className="pt-2 text-sm leading-relaxed text-gray-400">{r.pitch}</p>
                                                        {/* Auto-cycle progress */}
                                                        <div className="mt-3 h-px bg-white/[0.06]">
                                                            {cycling && (
                                                                <motion.div
                                                                    key={`${index}-${paused}`}
                                                                    className="h-full origin-left bg-accent/70"
                                                                    initial={{ scaleX: 0 }}
                                                                    animate={{ scaleX: 1 }}
                                                                    transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                                                                />
                                                            )}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                    </li>
                                );
                            })}
                        </ol>
                    </LayoutGroup>

                    {/* Toolkit panel */}
                    <motion.div
                        initial={reduce ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                        className="rounded-3xl border border-white/10 bg-[#0b1220] p-5 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] md:p-7"
                    >
                        <div className="mb-5 flex items-end justify-between gap-4">
                            <div>
                                <div className="font-mono text-[11px] uppercase tracking-widest text-gray-500">Toolkit for</div>
                                <AnimatePresence mode="popLayout" initial={false}>
                                    <motion.h3
                                        key={role.title}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -8 }}
                                        transition={{ duration: 0.25, ease: EASE }}
                                        className="font-heading text-xl font-bold text-white md:text-2xl"
                                    >
                                        {role.title}
                                    </motion.h3>
                                </AnimatePresence>
                            </div>
                            <div className="text-right font-mono text-xs text-gray-500">
                                <span className="text-accent">{role.skills.length}</span> / {TILE_NAMES.length} tools
                            </div>
                        </div>

                        <p className="mb-5 text-sm leading-relaxed text-gray-400 lg:hidden">{role.pitch}</p>

                        <LayoutGroup id="tiles">
                            <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 xl:grid-cols-8 md:gap-2.5">
                                {ordered.map((name) => (
                                    <Tile
                                        key={name}
                                        name={name}
                                        active={role.skills.includes(name)}
                                        hideOnMobile={!showAll && !role.skills.includes(name)}
                                        reduce={reduce}
                                    />
                                ))}
                            </div>
                        </LayoutGroup>
                        <button
                            onClick={() => setShowAll((v) => !v)}
                            className="mt-3 w-full rounded-xl border border-white/10 py-2 text-xs text-gray-400 transition-colors hover:text-white sm:hidden"
                        >
                            {showAll ? "Show only this role's tools" : `Show all ${TILE_NAMES.length} tools`}
                        </button>

                        {/* Proof of work */}
                        <div className="mt-6 border-t border-white/10 pt-5">
                            <div className="mb-3 font-mono text-[11px] uppercase tracking-widest text-gray-500">Proof of work</div>
                            <div className="flex flex-wrap gap-2">
                                {role.experience && (
                                    <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs text-white">
                                        <FaBriefcase className="text-[10px] text-accent" />
                                        {role.experience.role} · {role.experience.company.replace(/\s*\(.*\)/, "")}
                                    </span>
                                )}
                                {role.proof.map((p) =>
                                    p.isProject ? (
                                        <button
                                            key={p.title}
                                            onClick={() => scroller.scrollTo("projects", { smooth: true, duration: 700, offset: -40 })}
                                            className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-200 transition-colors hover:border-accent/50 hover:text-white"
                                        >
                                            {p.title}
                                            <FaArrowRight className="text-[9px] text-gray-500 transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
                                        </button>
                                    ) : (
                                        <a
                                            key={p.title}
                                            href={p.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-200 transition-colors hover:border-accent/50 hover:text-white"
                                        >
                                            {p.title}
                                            <span className="text-gray-500 group-hover:text-accent">↗</span>
                                        </a>
                                    )
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
