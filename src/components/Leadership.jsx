import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaCrown, FaGithub } from "react-icons/fa";
import { FREELANCE_PROJECTS } from "../constants";

const EASE = [0.16, 1, 0.3, 1];
const CLIENTS = FREELANCE_PROJECTS.filter((p) => p.kind === "client");
const LEADS = FREELANCE_PROJECTS.filter((p) => p.kind === "lead");
const domain = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/*
 * Live reachability check from the visitor's browser. A no-cors request resolves for any
 * response (even opaque) and rejects only when the site can't be reached at all.
 */
const checkSite = (url) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 8000);
    return fetch(url, { mode: "no-cors", cache: "no-store", signal: controller.signal })
        .then(() => "online")
        .catch(() => "offline")
        .finally(() => clearTimeout(timer));
};

const useSiteStatus = (start) => {
    const [status, setStatus] = useState({}); // url → "online" | "offline"
    const [checkedAt, setCheckedAt] = useState(null);
    useEffect(() => {
        if (!start) return;
        let cancelled = false;
        Promise.all(
            CLIENTS.map((c) =>
                checkSite(c.link).then((s) => {
                    if (!cancelled) setStatus((prev) => ({ ...prev, [c.link]: s }));
                })
            )
        ).then(() => !cancelled && setCheckedAt(new Date()));
        return () => {
            cancelled = true;
        };
    }, [start]);
    return { status, checkedAt };
};

const StatusDot = ({ state }) => {
    const color = state === "online" ? "bg-green-400" : state === "offline" ? "bg-red-400" : "bg-gray-500";
    return (
        <span className="relative flex h-2 w-2">
            {state === "online" && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60 motion-reduce:hidden" />}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
        </span>
    );
};

const isTouch = () => typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

const ClientCard = ({ client, index, state }) => {
    const reduce = useReducedMotion();
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    // Touch screens can't hover — pan the preview once when the card is well in view
    const autoPan = useMemo(() => isTouch(), []) && inView && !reduce;

    return (
        <motion.article
            ref={ref}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE, delay: (index % 3) * 0.08 }}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0b1220] transition-colors duration-300 hover:border-accent/40"
        >
            {/* Mini browser with a scroll-through preview of the live site */}
            <a href={client.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${client.title}`}>
                <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2.5">
                    <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                        <span className="h-2 w-2 rounded-full bg-white/15" />
                    </div>
                    <span className="min-w-0 flex-1 truncate rounded bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-gray-400">
                        {domain(client.link)}
                    </span>
                    <StatusDot state={state} />
                </div>
                <div className="relative aspect-[16/10] overflow-hidden bg-[#060a12]">
                    <img
                        src={client.image}
                        alt={`${client.title} website`}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full object-cover transition-[object-position] ease-in-out [transition-duration:5s] group-hover:object-bottom ${
                            autoPan ? "object-bottom" : "object-top"
                        }`}
                    />
                    <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-[#070b14]/80 px-2.5 py-1 font-mono text-[10px] text-gray-300 opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
                        scrolling preview
                    </span>
                </div>
            </a>

            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-heading text-xl font-bold text-white">{client.title}</h3>
                    <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-gray-500">{client.role}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{client.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                    {client.technologies.map((t) => (
                        <span key={t} className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-gray-300">
                            {t}
                        </span>
                    ))}
                </div>
                <a
                    href={client.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-semibold text-gray-300 transition-colors hover:text-accent"
                >
                    Visit {domain(client.link)}
                    <FaArrowRight className="text-[10px] transition-transform group-hover:translate-x-0.5" />
                </a>
            </div>
        </motion.article>
    );
};

const Leadership = () => {
    const reduce = useReducedMotion();
    const sectionRef = useRef(null);
    const seen = useInView(sectionRef, { once: true, amount: 0.15 });
    const { status, checkedAt } = useSiteStatus(seen);
    const online = CLIENTS.filter((c) => status[c.link] === "online").length;
    const checked = Object.keys(status).length;

    return (
        <section ref={sectionRef} id="leadership" className="relative overflow-hidden bg-[#070b14] py-28 text-white md:py-36">
            <div className="container mx-auto max-w-6xl px-6">
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between"
                >
                    <div>
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-accent" />
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Client work</span>
                        </div>
                        <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
                            Shipped for
                            <br />
                            <span className="text-accent">real clients.</span>
                        </h2>
                    </div>
                    <div className="max-w-sm md:text-right">
                        <p className="text-gray-400">
                            {CLIENTS.length} websites built for businesses and non-profits — and still running. Hover a site to scroll
                            through it.
                        </p>
                        {/* Live status, checked from your browser right now */}
                        <div className="mt-4 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 font-mono text-xs text-gray-400">
                            <StatusDot state={checkedAt ? (online === CLIENTS.length ? "online" : "offline") : undefined} />
                            {checkedAt ? (
                                <span>
                                    <span className="text-white">
                                        {online} / {CLIENTS.length}
                                    </span>{" "}
                                    sites online · checked just now
                                </span>
                            ) : (
                                <span>
                                    checking live sites… {checked > 0 && `${checked}/${CLIENTS.length}`}
                                </span>
                            )}
                        </div>
                    </div>
                </motion.div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {CLIENTS.map((client, i) => (
                        <ClientCard key={client.title} client={client} index={i} state={status[client.link]} />
                    ))}
                </div>

                {LEADS.length > 0 && (
                    <div className="mt-16">
                        <div className="mb-4 flex items-center gap-3">
                            <FaCrown className="text-sm text-accent" />
                            <span className="font-mono text-xs uppercase tracking-widest text-gray-500">Leadership</span>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2">
                            {LEADS.map((lead, i) => {
                                const isRepo = lead.link.includes("github.com");
                                return (
                                    <motion.a
                                        key={lead.title}
                                        href={lead.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={reduce ? false : { opacity: 0, y: 16 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.45, ease: EASE, delay: i * 0.08 }}
                                        className="group flex items-start gap-5 rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-accent/40 hover:bg-white/[0.04]"
                                    >
                                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-accent/30 bg-accent/10 font-heading text-lg font-bold text-accent">
                                            {lead.title.charAt(0)}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                <h3 className="font-heading text-xl font-bold text-white">{lead.title}</h3>
                                                <span className="font-mono text-[10px] uppercase tracking-wider text-accent/80">{lead.role}</span>
                                            </div>
                                            <p className="mt-1.5 text-sm leading-relaxed text-gray-400">{lead.summary}</p>
                                            <span className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-gray-400 transition-colors group-hover:text-accent">
                                                {isRepo && <FaGithub />}
                                                {isRepo ? "View source" : domain(lead.link)} ↗
                                            </span>
                                        </div>
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Leadership;
