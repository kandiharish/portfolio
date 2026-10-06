import { FaGithub, FaLinkedin } from "react-icons/fa";

// Email Updates
export const HERO_CONTENT = {
    name: "Harish Kandi",
    tagline: "Building intelligent systems with code and creativity.",
    description: "I am a passionate AI Engineer & Full Stack Developer with expertise in building scalable web applications and intelligent automation systems. Transforming complex data into actionable insights.",
    resumeLink: "/Harish Kandi Resume.pdf",
    contact: {
        email: "kandiharish2005@gmail.com",
        phone: "+91 6303138807",
        location: "Hyderabad, Telangana"
    }
};

export const LINKS = [
    { icon: FaGithub, link: "https://github.com/kandiharish/", name: "GitHub" },
    { icon: FaLinkedin, link: "https://www.linkedin.com/in/harish-kandi", name: "LinkedIn" },
];

// ... (Education, Experience, Project array declaration...)

export const PROJECTS = [
    {
        title: "ReadyForRound",
        description: "A free AI mock-interview platform: talk to an AI interviewer by voice, get an honest feedback report in about a minute, and a study plan built from your gaps. Company-style rounds for 12 companies and 13 roles, with a speaking coach for pace and filler words.",
        technologies: ["React 19", "TypeScript", "Node.js", "Express", "Supabase", "Groq LLM", "Whisper", "Tailwind CSS"],
        link: "https://ready-for-round.vercel.app",
        github: "https://github.com/kandiharish/ReadyForRound",
        demo: "https://ready-for-round.vercel.app",
        image: "/projects/readyforround.jpg"
    },
    {
        title: "RAG Customer Support Assistant",
        description: "Answers support questions from real PDF documents and escalates uncertain ones to a human instead of guessing. Retrieval with ChromaDB, routing with a LangGraph workflow, served over FastAPI.",
        technologies: ["Python", "LangGraph", "ChromaDB", "FastAPI", "xAI Grok", "sentence-transformers"],
        link: "#",
        github: "https://github.com/kandiharish/RAG-Based-Customer-Support-Assistant",
        demo: "#",
        image: null
    },
    {
        title: "MongoTalk",
        description: "Ask a MongoDB database questions in plain English. Gemini translates them into safe, read-only queries, with automatic schema detection and conversation context for follow-ups.",
        technologies: ["React", "Node.js", "Express", "MongoDB", "Gemini 1.5"],
        link: "https://mongo-talk.vercel.app",
        github: "https://github.com/kandiharish/MongoTalk",
        demo: "https://mongo-talk.vercel.app",
        image: "/projects/mongotalk.jpg"
    },
    {
        title: "Falcon",
        description: "Forensic Analysis and Linked Crime Observation Network — an investigation-support platform that turns fragmented evidence into connected, explainable intelligence, with the investigator kept in control.",
        technologies: ["Python", "FastAPI", "PostgreSQL", "PostGIS", "pgvector", "Ollama", "TypeScript", "Docker"],
        link: "#",
        github: "https://github.com/kandiharish/Falcon",
        demo: "#",
        image: null
    },
    {
        title: "GigHub",
        description: "A high-performance freelance marketplace handling real-time transactions. Reduced hiring friction by 40% with instant chat and secure Stripe payments.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Stripe"],
        link: "https://gighub-app.vercel.app",
        github: "https://github.com/kandiharish/gighub-app",
        demo: "https://gighub-app.vercel.app",
        image: "/projects/gighub.jpg"
    },
    {
        title: "TaskNext",
        description: "Streamlined academic project management for 50+ active users. Increased submission on-time rates by 35% through automated Kanban workflows and real-time Firebase syncing.",
        technologies: ["React", "Firebase", "Tailwind CSS", "Kanban"],
        link: "https://task-next-nine.vercel.app",
        github: "https://github.com/kandiharish/TaskNext",
        demo: "https://task-next-nine.vercel.app",
        image: "/projects/tasknext.jpg"
    },
    {
        title: "LoanFlowAI",
        description: "Automated 90% of preliminary loan assessments using a Multi-Agent AI system. Cut manual review time from 20 minutes to 30 seconds per application with cloud-scalable risk analysis.",
        technologies: ["Python", "Machine Learning", "React", "Cloud Functions"],
        link: "https://loan-flow-ai-two.vercel.app",
        github: "https://github.com/kandiharish/LoanFlowAi",
        demo: "https://loan-flow-ai-two.vercel.app",
        image: "/projects/loanflow.jpg"
    },
    {
        title: "Decentralized Land Registry",
        description: "Eliminated property fraud potential by 100% using an immutable Solidity ledger. Reduced verification turnaround from 14 days to instant blockchain validation.",
        technologies: ["React.js", "Solidity", "Ether.js", "Hardhat", "MetaMask"],
        link: "https://y-black-ten.vercel.app",
        github: "https://github.com/kandiharish/HTF25-Team-212",
        demo: "https://y-black-ten.vercel.app",
        image: "/projects/land-registry.jpg"
    },
    {
        title: "Universal Support Chatbot",
        description: "A multilingual AI support chatbot achieving 95% query resolution accuracy. Enables real-time customer assistance across languages, breaking communication barriers at scale.",
        technologies: ["Python", "NLP", "OpenAI API", "React", "WebSocket"],
        link: "#",
        github: "https://github.com/kandiharish/Universal-Language-Support-Chatbot",
        demo: "#",
        image: "/projects/support-chatbot.jpg"
    },
    {
        title: "HandsMen Threads",
        description: "An enterprise-grade Salesforce CRM that boosted sales team efficiency by 25%. Automates inventory, loyalty programs, and marketing campaigns for a premium fashion brand.",
        technologies: ["Salesforce", "Apex", "LWC", "SOQL"],
        link: "#",
        github: "https://github.com/kandiharish/HandsMen-Threads_Mens-Fashion_Project",
        demo: "#",
        image: "/projects/handsmen.jpg"
    },
    {
        title: "Learning Path Generator (MCP)",
        description: "A context-aware AI system that generates personalized learning paths. Orchestrates tools like YouTube and Notion using Model Context Protocol, achieving 92% curriculum relevance for self-paced learners.",
        technologies: ["MCP", "Python", "Gemini 1.5", "LangGraph"],
        link: "#",
        github: "https://github.com/kandiharish/MCP-Learning-Path-Generator",
        demo: "#",
        image: "/projects/mcp.jpg"
    },
    {
        title: "Sahayak - AI Teaching Assistant",
        description: "An intelligent AI teaching assistant reducing educator administrative workload by 70%. Automates lesson planning and assessment generation using Gemini Pro and Vertex AI.",
        technologies: ["Gemini Pro", "Vertex AI", "Firebase", "React", "Tailwind CSS"],
        link: "#",
        github: "https://github.com/kandiharish/EduvVision-AI",
        demo: "#",
        image: "/projects/sahayak.jpg"
    },
    {
        title: "Medical Chatbot (MedBot)",
        description: "An empathetic healthcare assistant capable of preliminary symptom analysis. Features a secure, privacy-focused conversation engine that reduces patient triage wait times by over 50%.",
        technologies: ["Flask", "OpenAI API", "MongoDB", "NLTK", "JavaScript"],
        link: "#",
        github: "https://github.com/kandiharish/Gen-AI",
        demo: "#",
        image: "/projects/medbot.jpg"
    },
];

// Client work and leadership roles. `kind` splits them on the page; `image` is a tall capture of the live site.
export const FREELANCE_PROJECTS = [
    {
        title: "LK Events",
        kind: "client",
        role: "Freelance Developer",
        summary: "Website for an event-production company — décor, lighting, sound, DJ and LED-screen setups for weddings, corporate events and celebrations.",
        technologies: ["Next.js", "React", "Tailwind CSS"],
        link: "https://lk-events.vercel.app",
        image: "/clients/lk-events.jpg",
    },
    {
        title: "Plunto",
        kind: "client",
        role: "Freelance Developer",
        summary: "Online store for a wholesale grocery business — categories, daily deals and cart for spices, rice, oils and fresh produce.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"],
        link: "https://plunto.in",
        image: "/clients/plunto.jpg",
    },
    {
        title: "DontWasteFood",
        kind: "client",
        role: "Freelance Developer",
        summary: "Website for a Hyderabad food-rescue movement — its work on the ground, media coverage and donations.",
        technologies: ["React", "MongoDB", "Express", "Google Maps"],
        link: "https://dontwastefood.in",
        image: "/clients/dontwastefood.jpg",
    },
    {
        title: "ImpactCred",
        kind: "client",
        role: "Freelance Developer",
        summary: "Certification and trust-verification platform for NGOs, CSR teams and social enterprises.",
        technologies: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB"],
        link: "https://impact-cred.vercel.app",
        image: "/clients/impactcred.jpg",
    },
    {
        title: "ImpactLedger",
        kind: "client",
        role: "Freelance Developer",
        summary: "A digital editorial publication documenting and amplifying stories of social impact.",
        technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
        link: "https://impact-ledger-inky.vercel.app",
        image: "/clients/impactledger.jpg",
    },
    {
        title: "ClassPulse",
        kind: "client",
        role: "Freelance Developer",
        summary: "Smart attendance for a college class — mark attendance, track permissions and history, and share the day's report instantly.",
        technologies: ["JavaScript", "HTML", "CSS"],
        link: "https://classpulse-gilt.vercel.app",
        image: "/clients/classpulse.jpg",
    },
    {
        title: "GNIMUN",
        kind: "lead",
        role: "Web Developer Lead",
        summary: "Official website for Guru Nanak Institutions' Model United Nations conference.",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "https://github.com/kandiharish/GNIMUN-2025",
        image: null,
    },
    {
        title: "TEDxGNI",
        kind: "lead",
        role: "Web Developer Lead",
        summary: "Event website for TEDxGNI 2026 — \"Redefining Success\".",
        technologies: ["React", "Tailwind CSS"],
        link: "https://tedxgni.vercel.app",
        image: null,
    },
];

// Paid client work only (excludes leadership roles) — used for counts like "6 client sites"
export const CLIENT_PROJECTS = FREELANCE_PROJECTS.filter((p) => p.kind === "client");

// Testimonials Update
export const TESTIMONIALS = [
    {
        name: "Prof. Dr. B. Santhosh Kumar",
        role: "HOD Computer Science @ GNIT",
        text: "Harish is a brilliant student who consistently goes beyond the curriculum. His leadership in the GDSC and technical prowess in AI are truly inspiring to his peers."
    },
    {
        name: "Dr. B. Ranjitha",
        role: "Associate Professor @ GNIT",
        text: "An exceptional student with strong management skills. Harish's understanding of algorithmic efficiency significantly improved our project outcomes. His dedication to Machine Learning is commendable."
    },
];

export const EDUCATION = [
    {
        institution: "Guru Nanak Institute of Technology (GNIT)",
        degree: "B.Tech in Computer Science and Engineering",
        duration: "Aug 2023 – May 2027",
        score: "CGPA: 9.5/10",
    },
    {
        institution: "TSWR Sainik School",
        degree: "Intermediate (MPC)",
        duration: "2021 – 2023",
        score: "85%",
    },
    {
        institution: "ZPHS Upparapalli",
        degree: "SSC (10th Grade)",
        duration: "Graduated 2021",
        score: "100%",
    },
];

export const EXPERIENCES = [
    {
        year: "Jan 2026 – June 2026",
        role: "Agentic AI Intern",
        company: "Innomatics Research Labs (Hyderabad)",
        description: [
            "Developed and tested backend services using Python and REST APIs to support real-time application workflows.",
            "Performed debugging and validation of data flows, ensuring accuracy and reliability of system outputs.",
            "Identified and resolved issues in API responses and backend logic, improving overall system performance.",
            "Collaborated with developers to analyze requirements and enhance system testability and stability.",
        ],
        technologies: ["Python", "REST APIs", "Data Flow", "System Testing"],
    },
    {
        year: "June 2025 – Jan 2026",
        role: "Full Stack Intern",
        company: "CourseVita (Remote)",
        description: [
            "Designed and tested REST APIs for authentication, data handling, and application workflows.",
            "Validated application functionality through systematic testing and debugging of backend services.",
            "Identified bugs and optimized database queries, improving performance and reliability.",
            "Worked closely with the development team to ensure high-quality feature delivery and system stability.",
        ],
        technologies: ["REST APIs", "Authentication", "Database Optimization", "Testing"],
    },
    {
        year: "May 2025 – Sep 2025",
        role: "Salesforce Developer Intern",
        company: "SmartBridge",
        description: [
            "Automated workflows using Lightning Web Components (LWC), Apex Triggers, and Flow Builder.",
            "Developed custom Salesforce apps, optimized validation rules, and built secure data models for business automation.",
            "Earned 11 Trailhead Superbadges and 65,000+ points.",
        ],
        technologies: ["Salesforce", "LWC", "Apex", "Flow Builder"],
        certificate: "/salesforce internship cert.png",
    },
    {
        year: "Sep 2024 – Nov 2024",
        role: "Machine Learning Intern",
        company: "YHills",
        description: [
            "Completed the 'Machine Learning with Python' program, mastering Data Manipulation (NumPy, Pandas) and Visualization (Seaborn, Matplotlib).",
            "Built and optimized Regression, Classification, and Clustering models using Scikit-Learn with Hyperparameter Tuning.",
            "Executed hands-on projects including Exploratory Data Analysis (EDA), predictive analysis on real-world datasets, and advanced feature engineering.",
        ],
        technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Seaborn"],
        certificate: "/yhills internship cert.jpg",
    },
];





export const SKILLS = [
    { category: "Languages", items: ["Python", "C", "C++", "JavaScript", "SQL", "HTML", "CSS"] },
    { category: "Frameworks/Libs", items: ["React.js", "Node.js", "Express.js", "Next.js", "Flask", "PyTorch", "Tailwind CSS"] },
    { category: "Databases", items: ["MySQL", "MongoDB", "Firebase"] },
    { category: "Tools", items: ["Git", "GitHub", "Docker", "Postman", "VS Code", "n8n"] },
    { category: "Concepts", items: ["Machine Learning", "Backend Development", "Frontend Development", "Cloud Integration"] },
];

export const CERTIFICATIONS = [
    {
        name: "Oracle Cloud Infrastructure 2025 – AI Foundations Associate",
        issuer: "Oracle",
        link: "/Harish Kandi Oracle Certificate.pdf",
        preview: "/certs/oracle.jpg"
    },
    {
        name: "Gen AI Exchange Hackathon 2025",
        issuer: "Hack2skill & Google Cloud",
        link: "/Hack2skill-Certificate.png",
        preview: "/certs/hack2skill.jpg"
    },
    {
        name: "Quantum Computing Program",
        issuer: "IIT Roorkee & CDAC Hyderabad",
        link: "/cdacqbit.jpg",
        preview: "/certs/cdac-quantum.jpg"
    },
    {
        name: "CodeClash Competition",
        issuer: "CodeClash",
        link: "/codeclash cert.pdf",
        preview: "/certs/codeclash.jpg"
    },
    {
        name: "Kaggle Python Coder",
        issuer: "Kaggle",
        link: "/kaggle python coder.jpg",
        preview: "/certs/kaggle.jpg"
    },
    {
        name: "Nation Building Participation",
        issuer: "Government of India",
        link: "/nationbuilding.pdf",
        preview: "/certs/nation-building.jpg"
    },
];


