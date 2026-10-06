import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaArrowRight, FaCheck, FaCopy, FaFileAlt, FaGithub, FaLinkedin, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { HERO_CONTENT, LINKS } from "../constants";

const EASE = [0.16, 1, 0.3, 1];
const { email, phone, location } = HERO_CONTENT.contact;
const LINKEDIN = LINKS.find((l) => l.name === "LinkedIn")?.link;
const GITHUB = LINKS.find((l) => l.name === "GitHub")?.link;

const timeFormat = new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "numeric", minute: "2-digit" });

const useLocalTime = () => {
    const [time, setTime] = useState(() => timeFormat.format(new Date()));
    useEffect(() => {
        const id = setInterval(() => setTime(timeFormat.format(new Date())), 20000);
        return () => clearInterval(id);
    }, []);
    return time;
};

const Field = ({ label, as = "input", ...props }) => {
    const Tag = as;
    return (
        <label className="block">
            <span className="mb-2 block font-mono text-[11px] uppercase tracking-widest text-gray-500">{label}</span>
            <Tag
                {...props}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition-colors placeholder:text-gray-600 focus:border-accent/60 focus:bg-white/[0.05]"
            />
        </label>
    );
};

const Contact = () => {
    const reduce = useReducedMotion();
    const time = useLocalTime();
    const [copied, setCopied] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [state, setState] = useState("idle"); // idle | sending | sent | error
    const [error, setError] = useState("");

    const copyEmail = () => {
        navigator.clipboard?.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        if (!serviceId || !templateId || !publicKey) {
            setState("error");
            setError(`The form isn't connected right now — please email ${email} directly.`);
            return;
        }

        setState("sending");
        setError("");
        try {
            await emailjs.send(
                serviceId,
                templateId,
                { from_name: form.name, from_email: form.email, message: form.message, to_name: HERO_CONTENT.name },
                publicKey
            );
            setState("sent");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            setState("error");
            const network = err?.message && /fetch|network/i.test(err.message);
            setError(
                network
                    ? "Couldn't reach the mail service — check your connection, or email me directly."
                    : `Something went wrong sending that${err?.text ? ` (${err.text})` : ""}. Please email me directly.`
            );
        }
    };

    return (
        <section id="contact" className="relative overflow-hidden bg-[#070b14] py-28 text-white md:py-36">
            <div className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-accent/[0.06] blur-[140px]" />

            <div className="container relative mx-auto max-w-6xl px-6">
                <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
                    {/* Left: the pitch */}
                    <motion.div
                        initial={reduce ? false : { opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE }}
                    >
                        <div className="mb-6 flex items-center gap-3">
                            <span className="h-px w-10 bg-accent" />
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">Contact</span>
                        </div>
                        <h2 className="font-heading text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
                            Let's build
                            <br />
                            <span className="text-accent">something real.</span>
                        </h2>
                        <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-400">
                            Open to internships and full-time roles in AI and full-stack engineering — and to interesting freelance work.
                        </p>

                        {/* Primary action: copy the email */}
                        <button
                            onClick={copyEmail}
                            className="group mt-10 flex w-full max-w-md items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-left transition-colors hover:border-accent/50"
                        >
                            <span className="min-w-0">
                                <span className="block font-mono text-[11px] uppercase tracking-widest text-gray-500">
                                    {copied ? "Copied to clipboard" : "Email — click to copy"}
                                </span>
                                <span className="mt-1 block truncate text-lg font-semibold text-white">{email}</span>
                            </span>
                            <span
                                className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors ${
                                    copied ? "bg-accent text-[#070b14]" : "bg-white/[0.06] text-gray-300 group-hover:text-accent"
                                }`}
                            >
                                {copied ? <FaCheck /> : <FaCopy className="text-sm" />}
                            </span>
                        </button>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {[
                                LINKEDIN && { href: LINKEDIN, icon: FaLinkedin, label: "LinkedIn" },
                                GITHUB && { href: GITHUB, icon: FaGithub, label: "GitHub" },
                                { href: HERO_CONTENT.resumeLink, icon: FaFileAlt, label: "Résumé" },
                            ]
                                .filter(Boolean)
                                .map(({ href, icon: Icon, label }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-gray-300 transition-colors hover:border-accent/50 hover:text-white"
                                    >
                                        <Icon className="text-accent" /> {label}
                                    </a>
                                ))}
                        </div>

                        <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-400">
                            <span className="inline-flex items-center gap-2">
                                <FaMapMarkerAlt className="text-accent/80" /> {location} · <span className="text-gray-200">{time}</span> IST
                            </span>
                            <a href={`tel:${phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                                <FaPhone className="text-accent/80" /> {phone}
                            </a>
                            <span className="inline-flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-green-400" /> Available for opportunities
                            </span>
                        </div>
                    </motion.div>

                    {/* Right: the form */}
                    <motion.div
                        initial={reduce ? false : { opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
                        className="rounded-3xl border border-white/10 bg-[#0b1220] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] md:p-8"
                    >
                        {state === "sent" ? (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex min-h-[380px] flex-col items-center justify-center text-center"
                            >
                                <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-xl text-[#070b14]">
                                    <FaCheck />
                                </span>
                                <h3 className="mt-5 font-heading text-2xl font-bold">Message sent</h3>
                                <p className="mt-2 max-w-xs text-gray-400">Thanks for reaching out — I'll get back to you soon.</p>
                                <button onClick={() => setState("idle")} className="mt-6 text-sm text-gray-400 transition-colors hover:text-accent">
                                    Send another message
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={onSubmit} className="space-y-5">
                                <div>
                                    <h3 className="font-heading text-xl font-bold">Send a message</h3>
                                    <p className="mt-1 text-sm text-gray-500">Goes straight to my inbox.</p>
                                </div>
                                <Field label="Name" name="name" value={form.name} onChange={onChange} required placeholder="Your name" autoComplete="name" />
                                <Field
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={onChange}
                                    required
                                    placeholder="you@company.com"
                                    autoComplete="email"
                                />
                                <Field
                                    label="Message"
                                    as="textarea"
                                    name="message"
                                    rows={4}
                                    value={form.message}
                                    onChange={onChange}
                                    required
                                    placeholder="A role, a project, or just hello…"
                                    style={{ resize: "none" }}
                                />

                                {state === "error" && (
                                    <p role="alert" className="rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                                        {error}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={state === "sending"}
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 font-bold text-[#070b14] transition-opacity hover:opacity-90 disabled:opacity-60"
                                >
                                    {state === "sending" ? "Sending…" : "Send message"}
                                    {state !== "sending" && <FaArrowRight className="text-sm transition-transform group-hover:translate-x-0.5" />}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
