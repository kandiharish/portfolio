import {
    CERTIFICATIONS,
    EDUCATION,
    EXPERIENCES,
    CLIENT_PROJECTS,
    FREELANCE_PROJECTS,
    PROJECTS,
    SKILLS,
} from "../../constants";

/*
 * The agent's knowledge base. Every answer is prepared here and built from the same
 * constants as the rest of the site, so nothing drifts out of date.
 *
 *   question   label used on chips and when the visitor clicks instead of typing
 *   words      keywords that score 1 each; multi-word entries match as phrases,
 *              4+ letter words also match longer forms ("intern" → "internships")
 *   weak       generic keywords that score 0.5 ("about", "good at")
 *   block      rich card shown under the answer (see BLOCKS in About.jsx)
 *   followUps  related questions offered after the answer
 *   handoff    true for answers that route the visitor to Harish directly
 */

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
const hasTech = (project, keys) =>
    project.technologies.some((t) => keys.some((k) => normalize(t).startsWith(k)));

const AI_KEYS = ["machinelearning", "nlp", "openai", "gemini", "vertexai", "langgraph", "mcp", "pytorch", "nltk", "groq", "whisper", "chromadb", "ollama", "xaigrok"];
const FRONT_KEYS = ["react"];
const BACK_KEYS = ["node", "express", "flask", "firebase", "mongodb", "cloudfunctions", "mysql", "solidity"];

export const CGPA = parseFloat(EDUCATION[0].score.match(/[\d.]+/)[0]);
export const GRADUATION = EDUCATION[0].duration.split("–").pop().trim();
export const AI_PROJECTS = PROJECTS.filter((p) => hasTech(p, AI_KEYS));
export const FULLSTACK_PROJECTS = PROJECTS.filter((p) => hasTech(p, FRONT_KEYS) && hasTech(p, BACK_KEYS));
export const LIVE_PROJECTS = PROJECTS.filter((p) => p.demo && p.demo !== "#");
export const LEAD_ROLES = FREELANCE_PROJECTS.filter((p) => /lead/i.test(p.role));
export const FAVOURITES = ["ReadyForRound", "RAG Customer Support", "LoanFlowAI", "MongoTalk"]
    .map((name) => PROJECTS.find((p) => p.title.includes(name)))
    .filter(Boolean);

const AI_ROLE = EXPERIENCES.find((e) => /ai/i.test(e.role));
const SKILL_COUNT = SKILLS.reduce((n, s) => n + s.items.length, 0);
const list = (items) =>
    items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

export const INTENTS = {
    /* ---- Core questions (shown as chips) ---- */
    whoami: {
        question: "Who is Harish?",
        chip: true,
        words: ["who", "yourself", "himself", "harish", "intro", "introduce", "background", "name", "summary", "overview"],
        weak: ["about", "tell me", "hi", "hello", "hey"],
        trace: `read profile · education · ${EXPERIENCES.length} internships`,
        text: "I'm Harish Kandi — a final-year Computer Science student at GNIT in Hyderabad. I build AI agents and the full-stack products around them, and I like shipping things people actually use.",
        block: "stats",
        followUps: ["build", "ai", "why"],
    },
    build: {
        question: "What does he build?",
        chip: true,
        words: ["build", "built", "project", "made", "make", "create", "portfolio", "app", "does", "do", "doing", "work on", "working on", "product"],
        trace: `looked up ${PROJECTS.length} projects · ${CLIENT_PROJECTS.length} client sites`,
        text: "Mostly AI systems with a real product wrapped around them — multi-agent pipelines, LLM assistants, and the web apps that make them usable. A few favourites:",
        block: "favourites",
        followUps: ["ai", "code", "fullstack"],
    },
    stack: {
        question: "What's his stack?",
        chip: true,
        words: ["stack", "tech", "skill", "language", "tool", "framework", "know", "use", "python", "javascript", "c++", "sql", "docker", "git"],
        trace: `grouped ${SKILL_COUNT} skills into ${SKILLS.length} areas`,
        text: "Python and JavaScript on most days. Here's the toolkit, grouped the way I use it:",
        block: "stack",
        followUps: ["fullstack", "certs"],
    },
    experience: {
        question: "Where has he worked?",
        chip: true,
        words: ["intern", "experience", "job", "company", "companies", "career", "worked", "work experience", "employ", "industry"],
        trace: `read ${EXPERIENCES.length} roles`,
        text: `${EXPERIENCES.length} internships so far — across agentic AI, full-stack, Salesforce and machine learning:`,
        block: "timeline",
        followUps: ["leadership", "ai"],
    },
    why: {
        question: "Why should we hire him?",
        chip: true,
        words: ["hire", "hiring", "why", "choose", "recruit", "stand out", "special", "different", "value", "bring", "fit", "good fit", "right fit", "convince", "worth", "unique", "better than", "should we", "candidate"],
        trace: "summarised projects · experience · academics",
        text: "Three honest reasons:",
        block: "why",
        followUps: ["strengths", "weakness", "availability"],
    },
    contact: {
        question: "How do I reach him?",
        chip: true,
        words: ["contact", "email", "reach", "mail", "linkedin", "resume", "cv", "phone", "connect", "talk to", "call", "message", "get in touch", "schedule", "interview"],
        trace: "fetched contact details",
        text: "Email works best — or find me on LinkedIn. My résumé is one click away too.",
        block: "contact",
        followUps: [],
    },

    /* ---- Prepared answers reachable by typing or follow-ups ---- */
    strengths: {
        question: "What are his strengths?",
        words: ["strength", "strong", "best at", "excel", "superpower"],
        weak: ["good at", "great at"],
        trace: "summarised projects · internships",
        text: "Taking an idea all the way to a working product. He's comfortable designing the AI part — agents, prompts, tool use — and then building the API and interface around it, so nothing gets stuck between handoffs. He also picks up new tools quickly: four internships in four different areas in two years.",
        followUps: ["weakness", "why"],
    },
    weakness: {
        question: "What's his biggest weakness?",
        words: ["weakness", "weak", "improve", "improvement", "lacking", "lack", "gap", "struggle", "worst", "challenge"],
        trace: "reflected honestly",
        text: "Honest answer: he's early in his career, so he hasn't yet run software at large production scale. He's closing that gap fast through internships and real client work, and he's looking for a team where he can learn it from experienced engineers.",
        followUps: ["strengths", "experience"],
    },
    ai: {
        question: "What AI work has he done?",
        words: ["ai", "llm", "llms", "agent", "agents", "agentic", "genai", "gen ai", "generative", "machine learning", "ml", "langgraph", "mcp", "gemini", "openai", "gpt", "chatbot", "nlp", "rag", "model"],
        trace: `filtered ${PROJECTS.length} projects → ${AI_PROJECTS.length} AI-first`,
        text: `${AI_PROJECTS.length} of his projects are AI-first — multi-agent systems, MCP tool orchestration and LLM assistants${
            AI_ROLE ? ` — plus his ${AI_ROLE.role} role at ${AI_ROLE.company.replace(/\s*\(.*\)/, "")}` : ""
        }:`,
        block: "aiProjects",
        followUps: ["code", "experience"],
    },
    fullstack: {
        question: "Can he handle frontend and backend?",
        words: ["backend", "back end", "back-end", "frontend", "front end", "front-end", "full stack", "fullstack", "full-stack", "api", "apis", "database", "server", "react", "node", "web"],
        trace: `found ${FULLSTACK_PROJECTS.length} projects shipping both sides`,
        text: "Yes — most of his projects ship both sides: React on the front; Node, Flask or Firebase behind it; MongoDB or SQL for data. For example:",
        block: "fullstackProjects",
        followUps: ["build", "code"],
    },
    leadership: {
        question: "Has he led a team?",
        words: ["lead", "leader", "leadership", "led", "team", "teamwork", "manage", "mentor", "collaborate", "collaboration", "gdsc", "community"],
        trace: `found ${LEAD_ROLES.length} lead roles · faculty feedback`,
        text: `Yes — he led web development for ${list(LEAD_ROLES.map((r) => r.title))} — and his faculty point to his leadership in the college developer community (GDSC):`,
        block: "leadership",
        followUps: ["clients", "experience"],
    },
    education: {
        question: "What's his education?",
        words: ["education", "degree", "college", "university", "cgpa", "gpa", "grade", "grades", "marks", "study", "studying", "student", "graduate", "graduation", "btech", "b.tech", "academic", "school"],
        trace: `read ${EDUCATION.length} education records`,
        text: `B.Tech in Computer Science at GNIT with a ${CGPA} CGPA, graduating in ${GRADUATION}:`,
        block: "education",
        followUps: ["certs", "experience"],
    },
    certs: {
        question: "Does he have certifications?",
        words: ["certif", "certified", "course", "courses", "credential", "oracle", "kaggle", "hackathon", "award", "achievement", "achievements"],
        trace: `read ${CERTIFICATIONS.length} certifications`,
        text: `${CERTIFICATIONS.length} certifications and achievements — tap any to open it:`,
        block: "certs",
        followUps: ["education", "stack"],
    },
    code: {
        question: "Can I see his code?",
        words: ["github", "code", "repo", "repos", "repository", "source", "open source", "demo", "demos", "live", "deployed", "link", "links", "sample"],
        trace: `found ${LIVE_PROJECTS.length} live demos`,
        text: "Everything's on GitHub. These ones are deployed, so you can try them live:",
        block: "code",
        followUps: ["build", "contact"],
    },
    clients: {
        question: "Has he done client work?",
        words: ["freelance", "freelancing", "client", "clients", "paid", "real users", "production", "customer", "customers", "business"],
        trace: `read ${CLIENT_PROJECTS.length} client projects`,
        text: `Yes — ${CLIENT_PROJECTS.length} websites built for real organisations and businesses:`,
        block: "clients",
        followUps: ["leadership", "code"],
    },
    availability: {
        question: "When can he start?",
        words: ["available", "availability", "start", "join", "joining", "when", "graduat", "full-time", "full time", "fulltime", "internship opening", "open to", "looking for"],
        trace: "checked graduation date · status",
        text: `He's open to opportunities now — internships, and full-time roles once he graduates in ${GRADUATION}. For exact dates, reach out directly:`,
        block: "contact",
        followUps: ["why"],
    },

    /* ---- Handoffs: things a scripted agent shouldn't answer ---- */
    hr: {
        question: "Compensation and logistics",
        handoff: true,
        words: ["salary", "ctc", "compensation", "pay", "stipend", "notice", "relocat", "remote", "onsite", "on-site", "hybrid", "visa", "sponsorship", "offer", "negotiat", "package", "lpa", "expectation", "expectations", "bond"],
        trace: "personal detail · handing off to Harish",
        text: "Compensation, location and notice-period questions are best discussed with Harish directly — here's the quickest way to reach him:",
        block: "contact",
        followUps: [],
    },
    deep: {
        question: "A deeper question",
        handoff: true,
        words: ["how would", "how do you", "how does he", "how did he", "design a", "system design", "architecture", "explain", "trade-off", "tradeoff", "trade off", "walk me through", "compare", "difference between", "what if", "scale", "scaling", "approach", "opinion", "think about"],
        trace: "deep-dive question · handing off to Harish",
        text: "That's a great deep-dive question — too nuanced for a scripted agent to do justice. Harish would enjoy walking you through it himself:",
        block: "contact",
        followUps: [],
    },
    unknown: {
        question: "Something else",
        handoff: true,
        words: [],
        trace: "no prepared answer · handing off to Harish",
        text: "I don't have a prepared answer for that one, and I'd rather not guess. Ask Harish directly — here's how:",
        block: "contact",
        followUps: [],
    },
};

export const CHIP_INTENTS = Object.keys(INTENTS).filter((k) => INTENTS[k].chip);

// Tie-break order: more specific intents first
const ORDER = [
    "hr", "deep", "availability", "weakness", "strengths", "code", "certs", "education", "leadership",
    "clients", "fullstack", "ai", "contact", "why", "experience", "stack", "build", "whoami",
];

// Long questions that only loosely match anything are treated as "complex" and handed off
const LONG_QUESTION_WORDS = 14;

export const route = (input) => {
    const q = input.toLowerCase();
    const tokens = q.match(/[a-z0-9+#.-]+/g) || [];
    const hit = (w) =>
        w.includes(" ") ? q.includes(w) : tokens.some((t) => t === w || (w.length >= 4 && t.startsWith(w)));

    let best = null;
    let bestScore = 0;
    ORDER.forEach((key) => {
        const { words = [], weak = [] } = INTENTS[key];
        const score = words.filter(hit).length + 0.5 * weak.filter(hit).length;
        if (score > bestScore) {
            best = key;
            bestScore = score;
        }
    });

    if (!best) return "unknown";
    if (tokens.length >= LONG_QUESTION_WORDS && bestScore < 2 && !INTENTS[best].handoff) return "deep";
    return best;
};
