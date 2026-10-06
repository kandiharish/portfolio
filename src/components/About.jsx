import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, animate, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { FaArrowUp, FaArrowRight, FaLinkedin, FaEnvelope, FaFileAlt, FaCheck, FaGithub, FaExternalLinkAlt, FaQuoteLeft } from "react-icons/fa";
import { scroller } from "react-scroll";
import {
    CERTIFICATIONS,
    EDUCATION,
    EXPERIENCES,
    CLIENT_PROJECTS,
    HERO_CONTENT,
    LINKS,
    PROJECTS,
    SKILLS,
    TESTIMONIALS,
} from "../constants";
import {
    AI_PROJECTS,
    CGPA,
    CHIP_INTENTS,
    FAVOURITES,
    FULLSTACK_PROJECTS,
    INTENTS,
    LEAD_ROLES,
    LIVE_PROJECTS,
    route,
} from "./about/knowledge";

const EASE = [0.16, 1, 0.3, 1];
const LINKEDIN = LINKS.find((l) => l.name === "LinkedIn")?.link;
const GITHUB = LINKS.find((l) => l.name === "GitHub")?.link;
const LEADERSHIP_QUOTE = TESTIMONIALS.find((t) => /lead/i.test(t.text)) || TESTIMONIALS[0];

const card = "rounded-xl border border-white/10 bg-white/[0.03]";
const domain = (url) => url.replace(/^https?:\/\//, "").replace(/\/$/, "");

/* ---------- Answer blocks ---------- */

const CountUp = ({ value, decimals = 0 }) => {
    const count = useMotionValue(0);
    const shown = useTransform(count, (v) => v.toFixed(decimals));
    useEffect(() => {
        const c = animate(count, value, { duration: 0.9, ease: EASE });
        return () => c.stop();
    }, [count, value]);
    return <motion.span>{shown}</motion.span>;
};

const StatsBlock = () => (
    <div className="grid grid-cols-2 gap-2">
        {[
            { value: CGPA, decimals: 1, label: "CGPA" },
            { value: EXPERIENCES.length, label: "Internships" },
            { value: PROJECTS.length, suffix: "+", label: "Projects" },
            { value: CLIENT_PROJECTS.length, label: "Client sites" },
        ].map((s) => (
            <div key={s.label} className={`${card} px-4 py-3`}>
                <div className="font-heading text-2xl font-bold text-white">
                    <CountUp value={s.value} decimals={s.decimals} />
                    <span className="text-accent">{s.suffix}</span>
                </div>
                <div className="text-[11px] uppercase tracking-widest text-gray-500">{s.label}</div>
            </div>
        ))}
    </div>
);

const ProjectList = ({ projects }) => (
    <div className="grid gap-2">
        {projects.slice(0, 4).map((p) => (
            <button
                key={p.title}
                onClick={() => scroller.scrollTo("projects", { smooth: true, duration: 700, offset: -40 })}
                className={`${card} group flex items-center gap-3 p-2 pr-4 text-left transition-colors hover:border-accent/40 hover:bg-accent/[0.06]`}
            >
                <img src={p.image} alt="" loading="lazy" className="h-12 w-16 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-white">{p.title}</div>
                    <div className="truncate text-xs text-gray-500">{p.technologies.slice(0, 3).join(" · ")}</div>
                </div>
                <FaArrowRight className="text-xs text-gray-600 transition-all group-hover:translate-x-0.5 group-hover:text-accent" />
            </button>
        ))}
    </div>
);

const StackBlock = () => (
    <div className="space-y-3">
        {SKILLS.map((group) => (
            <div key={group.category}>
                <div className="mb-1.5 text-[11px] uppercase tracking-widest text-gray-500">{group.category}</div>
                <div className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                        <span key={item} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-xs text-gray-300">
                            {item}
                        </span>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const Timeline = ({ items }) => (
    <ol className="relative ml-1.5 space-y-3 border-l border-white/10 pl-4">
        {items.map((item) => (
            <li key={item.title + item.sub} className="relative">
                <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-accent shadow-[0_0_8px_rgba(20,241,217,0.6)]" />
                <div className="text-sm font-semibold text-white">{item.title}</div>
                <div className="text-xs text-gray-400">
                    {item.sub} <span className="text-gray-600">· {item.meta}</span>
                </div>
            </li>
        ))}
    </ol>
);

// A list of external links (certificates, client sites, live demos)
const LinkList = ({ items }) => (
    <div className="grid gap-2">
        {items.map((item) => (
            <a
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${card} group flex items-center gap-3 px-3 py-2.5 transition-colors hover:border-accent/40 hover:bg-accent/[0.06]`}
            >
                <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-semibold text-white">{item.title}</div>
                    <div className="truncate text-xs text-gray-500">{item.sub}</div>
                </div>
                <FaExternalLinkAlt className="shrink-0 text-[10px] text-gray-600 transition-colors group-hover:text-accent" />
            </a>
        ))}
    </div>
);

const WhyBlock = () => (
    <ul className="space-y-2">
        {[
            ["Ships end-to-end", `${PROJECTS.length} projects built and ${CLIENT_PROJECTS.length} client websites shipped and live.`],
            ["Both sides of the stack", "Designs the agent and builds the product it lives in."],
            ["Learns fast", `${EXPERIENCES.length} internships alongside a ${CGPA} CGPA.`],
        ].map(([title, body], i) => (
            <li key={title} className={`${card} flex gap-3 p-3`}>
                <span className="font-heading text-sm font-bold text-accent">0{i + 1}</span>
                <span className="text-sm text-gray-300">
                    <span className="font-semibold text-white">{title}.</span> {body}
                </span>
            </li>
        ))}
    </ul>
);

const LeadershipBlock = () => (
    <div className="space-y-2">
        <LinkList items={LEAD_ROLES.map((r) => ({ title: r.title, sub: `${r.role} · ${domain(r.link)}`, href: r.link }))} />
        <figure className={`${card} p-4`}>
            <FaQuoteLeft className="mb-2 text-xs text-accent/60" />
            <blockquote className="text-sm italic leading-relaxed text-gray-300">“{LEADERSHIP_QUOTE.text}”</blockquote>
            <figcaption className="mt-2 text-xs text-gray-500">
                — <span className="text-gray-300">{LEADERSHIP_QUOTE.name}</span>, {LEADERSHIP_QUOTE.role}
            </figcaption>
        </figure>
    </div>
);

const CodeBlock = () => (
    <div className="space-y-2">
        {GITHUB && (
            <a
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-xs font-bold text-[#070b14] transition-opacity hover:opacity-90"
            >
                <FaGithub /> github.com/{domain(GITHUB).split("/")[1]}
            </a>
        )}
        <LinkList items={LIVE_PROJECTS.map((p) => ({ title: p.title, sub: `Live · ${domain(p.demo)}`, href: p.demo }))} />
    </div>
);

const ContactBlock = ({ handoff }) => {
    const [copied, setCopied] = useState(false);
    const copy = () => {
        navigator.clipboard?.writeText(HERO_CONTENT.contact.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
    };
    const btn =
        "inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-semibold text-gray-200 transition-colors hover:border-accent/40 hover:text-white";
    return (
        <div className={handoff ? `${card} border-accent/30 bg-accent/[0.05] p-3` : ""}>
            {handoff && (
                <div className="mb-2.5 flex items-center gap-2 text-xs text-gray-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Harish will answer this one personally
                </div>
            )}
            <div className="flex flex-wrap gap-2">
                <button onClick={copy} className={btn}>
                    {copied ? <FaCheck className="text-accent" /> : <FaEnvelope className="text-accent" />}
                    {copied ? "Copied!" : HERO_CONTENT.contact.email}
                </button>
                {LINKEDIN && (
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={btn}>
                        <FaLinkedin className="text-accent" /> LinkedIn
                    </a>
                )}
                <a href={HERO_CONTENT.resumeLink} target="_blank" rel="noopener noreferrer" className={btn}>
                    <FaFileAlt className="text-accent" /> Résumé
                </a>
            </div>
        </div>
    );
};

const BLOCKS = {
    stats: StatsBlock,
    favourites: () => <ProjectList projects={FAVOURITES} />,
    aiProjects: () => <ProjectList projects={AI_PROJECTS} />,
    fullstackProjects: () => <ProjectList projects={FULLSTACK_PROJECTS} />,
    stack: StackBlock,
    timeline: () => <Timeline items={EXPERIENCES.map((e) => ({ title: e.role, sub: e.company, meta: e.year }))} />,
    education: () => (
        <Timeline items={EDUCATION.map((e) => ({ title: e.degree, sub: e.institution, meta: `${e.score} · ${e.duration}` }))} />
    ),
    certs: () => <LinkList items={CERTIFICATIONS.map((c) => ({ title: c.name, sub: c.issuer, href: c.link }))} />,
    clients: () => (
        <LinkList items={CLIENT_PROJECTS.map((p) => ({ title: p.title, sub: `${p.role} · ${domain(p.link)}`, href: p.link }))} />
    ),
    code: CodeBlock,
    why: WhyBlock,
    leadership: LeadershipBlock,
    contact: ContactBlock,
};

/* ---------- Messages ---------- */

const AgentAvatar = ({ size = "h-8 w-8" }) => (
    <span className={`${size} shrink-0 overflow-hidden rounded-full border border-accent/40 bg-gradient-to-b from-accent/30 to-[#0f1626]`}>
        <img src="/passphoto-removebg-preview.png" alt="" className="h-full w-full object-cover object-top" />
    </span>
);

const ThinkingDots = () => (
    <span className="inline-flex gap-1 py-2">
        {[0, 1, 2].map((i) => (
            <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-accent"
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
        ))}
    </span>
);

const StreamText = ({ text, onDone, instant }) => {
    const count = useMotionValue(instant ? text.length : 0);
    const shown = useTransform(count, (c) => text.slice(0, Math.round(c)));
    useEffect(() => {
        if (instant) {
            onDone();
            return;
        }
        const c = animate(count, text.length, { duration: text.length * 0.012, ease: "linear", onComplete: onDone });
        return () => c.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [text]);
    return <motion.span>{shown}</motion.span>;
};

const AgentMessage = ({ intent, onDone, onAsk, asked, busy }) => {
    const answer = INTENTS[intent];
    const reduce = useReducedMotion();
    const [phase, setPhase] = useState(reduce ? "streaming" : "thinking");
    const Block = answer.block ? BLOCKS[answer.block] : null;
    const followUps = answer.followUps.filter((k) => !asked.includes(k)).slice(0, 3);

    useEffect(() => {
        if (phase !== "thinking") return;
        const t = setTimeout(() => setPhase("streaming"), 450);
        return () => clearTimeout(t);
    }, [phase]);

    return (
        <div className="flex gap-3">
            <AgentAvatar />
            <div className="min-w-0 flex-1">
                <div className={`mb-1.5 font-mono text-[11px] ${answer.handoff ? "text-amber-300/70" : "text-gray-500"}`}>
                    <span className={answer.handoff ? "text-amber-300" : "text-accent/70"}>↳</span> {answer.trace}
                </div>
                {phase === "thinking" ? (
                    <ThinkingDots />
                ) : (
                    <p className="text-[15px] leading-relaxed text-gray-200">
                        <StreamText
                            text={answer.text}
                            instant={reduce}
                            onDone={() => {
                                setPhase("done");
                                onDone();
                            }}
                        />
                    </p>
                )}
                <AnimatePresence>
                    {phase === "done" && (Block || followUps.length > 0) && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                        >
                            {Block && (
                                <div className="mt-3">
                                    <Block handoff={answer.handoff} />
                                </div>
                            )}
                            {followUps.length > 0 && (
                                <div className="mt-3 flex flex-wrap items-center gap-1.5">
                                    <span className="mr-1 text-[11px] uppercase tracking-widest text-gray-600">Related</span>
                                    {followUps.map((key) => (
                                        <button
                                            key={key}
                                            onClick={() => onAsk(key)}
                                            disabled={busy}
                                            className="rounded-full border border-accent/25 px-2.5 py-1 text-[11px] text-accent/90 transition-colors hover:border-accent hover:bg-accent/10 disabled:opacity-40"
                                        >
                                            {INTENTS[key].question}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

/* ---------- Section ---------- */

const About = () => {
    const sectionRef = useRef(null);
    const logRef = useRef(null);
    const contentRef = useRef(null);
    const inView = useInView(sectionRef, { once: true, amount: 0.35 });
    const reduce = useReducedMotion();
    const [messages, setMessages] = useState([]);
    const [busy, setBusy] = useState(false);
    const [asked, setAsked] = useState([]);
    const [input, setInput] = useState("");
    const [queued, setQueued] = useState(null); // intent waiting for the current answer to finish
    const nextId = useRef(0);

    const ask = (intent, typed) => {
        const question = typed || INTENTS[intent].question;
        if (!INTENTS[intent].handoff) setAsked((a) => (a.includes(intent) ? a : [...a, intent]));
        const userMessage = { id: nextId.current++, role: "user", text: question };

        // Mid-answer: show the question now, answer it as soon as the current reply finishes
        if (busy) {
            setMessages((m) => [...m, userMessage]);
            setQueued(intent);
            return;
        }
        setBusy(true);
        setMessages((m) => [...m, userMessage, { id: nextId.current++, role: "agent", intent }]);
    };

    useEffect(() => {
        if (busy || !queued) return;
        setBusy(true);
        setMessages((m) => [...m, { id: nextId.current++, role: "agent", intent: queued }]);
        setQueued(null);
    }, [busy, queued]);

    // Opens the conversation by itself the first time the section is seen
    useEffect(() => {
        if (inView && messages.length === 0) ask("whoami");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    // Keep the newest message in view as answers stream and blocks expand
    useEffect(() => {
        const log = logRef.current;
        const content = contentRef.current;
        if (!log || !content) return;
        const observer = new ResizeObserver(() => log.scrollTo({ top: log.scrollHeight }));
        observer.observe(content);
        return () => observer.disconnect();
    }, []);

    const submit = (e) => {
        e.preventDefault();
        const text = input.trim();
        if (!text || queued) return;
        setInput("");
        ask(route(text), text);
    };

    // Unasked core questions first; asked ones stay available, just quieter
    const chips = [...CHIP_INTENTS.filter((k) => !asked.includes(k)), ...CHIP_INTENTS.filter((k) => asked.includes(k))];

    return (
        <section ref={sectionRef} id="about" className="relative overflow-hidden bg-[#070b14] py-28 text-white md:py-36">
            <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/[0.05] blur-[130px]" />

            <div className="container relative z-10 mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
                {/* Left: framing */}
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex flex-col"
                >
                    <div className="mb-8 flex items-center gap-3">
                        <span className="h-px w-10 bg-accent" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">About me</span>
                    </div>

                    <h2 className="font-heading text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-5xl xl:text-[3.25rem]">
                        Curious about me?
                        <br />
                        <span className="text-accent">Just ask.</span>
                    </h2>

                    <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-400">
                        This little agent knows my projects, stack and experience. It answers from the same data that powers
                        this site — tap a question or type your own.
                    </p>

                    <div className="group mt-10 hidden overflow-hidden rounded-3xl border border-white/10 lg:block">
                        {/* The photo is a 2×2 collage — frame exactly the top row (3:2) so no shot is cut mid-way */}
                        <div className="relative aspect-[3/2]">
                            <img
                                src="/college.jpeg"
                                alt="Harish Kandi presenting at GNIT"
                                loading="lazy"
                                className="h-full w-full object-cover object-top grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.03] group-hover:grayscale-0"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-5 text-xs uppercase tracking-widest text-gray-300">
                                Hyderabad · GNIT ’27
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right: the agent */}
                <motion.div
                    initial={reduce ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                    className="flex h-[600px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0b1220]/80 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-md md:h-[640px]"
                >
                    <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
                        <AgentAvatar size="h-9 w-9" />
                        <div className="flex-1">
                            <div className="text-sm font-semibold">harish.agent</div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> online
                            </div>
                        </div>
                        <span className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-gray-500">
                            scripted · v1
                        </span>
                    </div>

                    <div
                        ref={logRef}
                        className="flex-1 overflow-y-auto px-5 py-6 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-track]:bg-transparent"
                        aria-live="polite"
                    >
                        <div ref={contentRef} className="space-y-6">
                            {messages.map((m) =>
                                m.role === "user" ? (
                                    <motion.div
                                        key={m.id}
                                        className="flex justify-end"
                                        initial={reduce ? false : { opacity: 0, y: 8, scale: 0.97 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{ duration: 0.25, ease: EASE }}
                                    >
                                        <span className="max-w-[80%] rounded-2xl rounded-br-md border border-accent/30 bg-accent/15 px-4 py-2.5 text-sm text-white">
                                            {m.text}
                                        </span>
                                    </motion.div>
                                ) : (
                                    <AgentMessage
                                        key={m.id}
                                        intent={m.intent}
                                        asked={asked}
                                        busy={busy}
                                        onAsk={ask}
                                        onDone={() => setBusy(false)}
                                    />
                                )
                            )}
                        </div>
                    </div>

                    <div className="border-t border-white/10 p-4">
                        <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] md:flex-wrap md:overflow-visible">
                            {chips.map((key) => (
                                <button
                                    key={key}
                                    onClick={() => ask(key)}
                                    disabled={busy}
                                    className={`shrink-0 rounded-full border px-3 py-1.5 text-xs transition-colors hover:border-accent/50 hover:text-white disabled:opacity-40 ${
                                        asked.includes(key)
                                            ? "border-white/5 bg-transparent text-gray-500"
                                            : "border-white/10 bg-white/[0.04] text-gray-300"
                                    }`}
                                >
                                    {INTENTS[key].question}
                                </button>
                            ))}
                        </div>
                        <form
                            onSubmit={submit}
                            className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] py-1.5 pl-4 pr-1.5 focus-within:border-accent/50"
                        >
                            <input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask anything — strengths, AI work, availability…"
                                className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-600"
                                aria-label="Ask a question about Harish"
                            />
                            <button
                                type="submit"
                                disabled={Boolean(queued) || !input.trim()}
                                className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-[#070b14] transition-opacity disabled:opacity-30"
                                aria-label="Send"
                            >
                                <FaArrowUp className="text-sm" />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
