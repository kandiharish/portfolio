import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaLock } from "react-icons/fa";
import { PROJECTS, LINKS } from "../constants";
import { AI_PROJECTS } from "./about/knowledge";

const EASE = [0.16, 1, 0.3, 1];
const GITHUB = LINKS.find((l) => l.name === "GitHub")?.link;

const hasTech = (p, re) => p.technologies.some((t) => re.test(t));
const categoryOf = (p) =>
    AI_PROJECTS.includes(p) ? "AI" : hasTech(p, /solidity|web3/i) ? "Web3" : hasTech(p, /salesforce|apex/i) ? "CRM" : "Full-Stack";

const ITEMS = PROJECTS.map((p, i) => {
    const live = p.demo && p.demo !== "#";
    return {
        ...p,
        n: String(i + 1).padStart(2, "0"),
        category: categoryOf(p),
        live,
        // What the browser's address bar shows: the live domain, or the repo
        url: live ? new URL(p.demo).host : p.github.replace(/^https?:\/\//, ""),
        href: live ? p.demo : p.github,
    };
});

const FILTERS = ["All", ...["AI", "Full-Stack", "Web3", "CRM"].filter((c) => ITEMS.some((p) => p.category === c))];

const CATEGORY_STYLE = {
    AI: "border-accent/40 bg-accent/10 text-accent",
    "Full-Stack": "border-sky-400/30 bg-sky-400/10 text-sky-300",
    Web3: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    CRM: "border-amber-300/30 bg-amber-300/10 text-amber-200",
};

/* ---------- Browser window ---------- */

// For projects without a live UI to screenshot: a designed "repository" view instead of a blank frame
const RepoCard = ({ project }) => (
    <motion.div
        key={project.title}
        className="absolute inset-0 flex flex-col justify-between overflow-hidden p-6 text-left md:p-8"
        style={{
            backgroundImage:
                "radial-gradient(circle at 85% 15%, rgba(20,241,217,0.16), transparent 45%), linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "auto, 28px 28px, 28px 28px",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
    >
        <div className="flex items-center gap-2 font-mono text-xs text-gray-500">
            <FaGithub className="text-sm text-gray-400" />
            {project.github.replace(/^https?:\/\/github\.com\//, "")}
        </div>
        <div>
            <div className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">{project.title}</div>
            <div className="mt-4 flex flex-wrap gap-1.5">
                {project.technologies.slice(0, 6).map((t) => (
                    <span key={t} className="rounded-md border border-accent/25 bg-accent/[0.07] px-2 py-0.5 font-mono text-[11px] text-accent/90">
                        {t}
                    </span>
                ))}
            </div>
        </div>
        <div className="font-mono text-[11px] text-gray-600">$ git clone {project.github.replace(/^https?:\/\//, "")}</div>
    </motion.div>
);

const BrowserFrame = ({ project, className = "", onClick }) => (
    <div className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] ${className}`}>
        <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
            </div>
            <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[11px] text-gray-400">
                <FaLock className="shrink-0 text-[9px] text-gray-500" />
                {/* Re-keyed per project: fades in fresh, no exit animation to stall */}
                <motion.span
                    key={project.url}
                    className="truncate"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {project.url}
                </motion.span>
            </div>
            {project.live ? (
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-green-500/40 px-2 py-0.5 font-mono text-[10px] text-green-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" /> LIVE
                </span>
            ) : (
                <span className="shrink-0 rounded-full border border-white/10 px-2 py-0.5 font-mono text-[10px] text-gray-500">CODE</span>
            )}
        </div>
        <button
            onClick={onClick}
            className="group relative block aspect-[16/10] w-full overflow-hidden bg-[#060a12]"
            aria-label={`Open ${project.title}`}
        >
            {project.image ? (
                <motion.img
                    key={project.image}
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: EASE }}
                />
            ) : (
                <RepoCard project={project} />
            )}
            <span className="absolute inset-0 grid place-items-center bg-[#070b14]/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-[#070b14]">
                    {project.live ? "Open live demo" : "View the code"} <FaExternalLinkAlt className="text-xs" />
                </span>
            </span>
        </button>
    </div>
);

/* ---------- Section ---------- */

const Projects = () => {
    const reduce = useReducedMotion();
    const [filter, setFilter] = useState("All");
    const items = useMemo(() => (filter === "All" ? ITEMS : ITEMS.filter((p) => p.category === filter)), [filter]);
    const [activeTitle, setActiveTitle] = useState(ITEMS[0].title);
    const entryRefs = useRef({});

    const active = items.find((p) => p.title === activeTitle) || items[0];
    const activeIndex = items.indexOf(active);

    // Whichever entry crosses the middle of the screen drives the pinned browser
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && setActiveTitle(e.target.dataset.title)),
            { rootMargin: "-45% 0px -45% 0px" }
        );
        items.forEach((p) => entryRefs.current[p.title] && observer.observe(entryRefs.current[p.title]));
        return () => observer.disconnect();
    }, [items]);

    // Warm the cache for the next screenshot so the swap is instant
    useEffect(() => {
        const next = items[activeIndex + 1];
        if (next) new Image().src = next.image;
    }, [items, activeIndex]);

    const changeFilter = (f) => {
        setFilter(f);
        const first = f === "All" ? ITEMS[0] : ITEMS.find((p) => p.category === f);
        setActiveTitle(first.title);
    };

    return (
        <section id="projects" className="relative bg-[#070b14] py-28 text-white md:py-36">
            <div className="container mx-auto max-w-6xl px-6">
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-accent" />
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Selected work</span>
                        </div>
                        <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                            Things I've built,
                            <br />
                            <span className="text-accent">and shipped.</span>
                        </h2>
                    </div>
                    <p className="max-w-xs text-gray-400 md:text-right">
                        {ITEMS.length} projects, {ITEMS.filter((p) => p.live).length} of them live. Scroll through — or filter by what
                        you're hiring for.
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="sticky top-16 z-20 -mx-6 mb-6 flex gap-2 overflow-x-auto bg-[#070b14]/85 px-6 py-3 backdrop-blur-md [scrollbar-width:none] lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:backdrop-blur-none">
                    {FILTERS.map((f) => {
                        const count = f === "All" ? ITEMS.length : ITEMS.filter((p) => p.category === f).length;
                        return (
                            <button
                                key={f}
                                onClick={() => changeFilter(f)}
                                className={`relative shrink-0 rounded-full px-4 py-2 text-sm transition-colors ${
                                    filter === f ? "text-[#070b14]" : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {filter === f && (
                                    <motion.span
                                        layoutId="project-filter"
                                        className="absolute inset-0 rounded-full bg-accent"
                                        transition={{ duration: 0.35, ease: EASE }}
                                    />
                                )}
                                <span className="relative font-semibold">
                                    {f} <span className="font-mono text-xs opacity-60">{count}</span>
                                </span>
                            </button>
                        );
                    })}
                </div>

                <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
                    {/* Entries — min-w-0 so long URLs truncate instead of widening the page */}
                    <div className="min-w-0">
                        {items.map((p) => {
                            const isActive = p === active;
                            return (
                                <article
                                    key={p.title}
                                    ref={(el) => (entryRefs.current[p.title] = el)}
                                    data-title={p.title}
                                    className="border-b border-white/[0.06] py-10 last:border-b-0 lg:flex lg:min-h-[52vh] lg:flex-col lg:justify-center lg:py-12"
                                >
                                    {/* Phones: the screenshot sits inline */}
                                    <BrowserFrame project={p} className="mb-6 lg:hidden" onClick={() => window.open(p.href, "_blank", "noopener")} />

                                    <div
                                        className={`transition-opacity duration-500 ${
                                            isActive ? "lg:opacity-100" : "lg:opacity-35"
                                        }`}
                                    >
                                        <div className="mb-4 flex items-center gap-3">
                                            <span className="font-mono text-sm text-gray-500">{p.n}</span>
                                            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${CATEGORY_STYLE[p.category]}`}>
                                                {p.category}
                                            </span>
                                        </div>
                                        <h3 className="font-heading text-3xl font-bold tracking-tight md:text-4xl">{p.title}</h3>
                                        <p className="mt-4 max-w-md leading-relaxed text-gray-400">{p.description}</p>
                                        <div className="mt-5 flex flex-wrap gap-1.5">
                                            {p.technologies.map((t) => (
                                                <span key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[11px] text-gray-300">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="mt-6 flex flex-wrap gap-3">
                                            {p.live && (
                                                <a
                                                    href={p.demo}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-sm font-bold text-[#070b14] transition-opacity hover:opacity-90"
                                                >
                                                    Live demo <FaExternalLinkAlt className="text-[10px]" />
                                                </a>
                                            )}
                                            {p.github && p.github !== "#" && (
                                                <a
                                                    href={p.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-gray-200 transition-colors hover:border-white/40 hover:text-white"
                                                >
                                                    <FaGithub /> Code
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>

                    {/* Desktop: pinned browser that follows the scroll */}
                    <div className="hidden lg:block">
                        <div className="sticky top-28">
                            <BrowserFrame project={active} onClick={() => window.open(active.href, "_blank", "noopener")} />
                            <div className="mt-5 flex items-center justify-between">
                                <div className="flex gap-1.5">
                                    {items.map((p) => (
                                        <button
                                            key={p.title}
                                            onClick={() =>
                                                entryRefs.current[p.title]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" })
                                            }
                                            className={`h-1.5 rounded-full transition-all duration-300 ${
                                                p === active ? "w-8 bg-accent" : "w-1.5 bg-white/20 hover:bg-white/40"
                                            }`}
                                            aria-label={`Show ${p.title}`}
                                        />
                                    ))}
                                </div>
                                <span className="font-mono text-xs text-gray-500">
                                    <span className="text-white">{String(activeIndex + 1).padStart(2, "0")}</span> /{" "}
                                    {String(items.length).padStart(2, "0")}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {GITHUB && (
                    <div className="mt-16 text-center">
                        <a
                            href={GITHUB}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                        >
                            <FaGithub /> More on GitHub <span className="text-accent">↗</span>
                        </a>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Projects;
