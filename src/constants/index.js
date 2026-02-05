import {
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaEnvelope,
} from "react-icons/fa";

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

// Project Updates for specific items:
// This replacement is tricky for a single block. I'll split into multiple replacements for safety.
// I will target the PROJECTS array completely to be sure.

export const PROJECTS = [
    {
        title: "GigHub",
        description: "A high-performance freelance marketplace handling real-time transactions. Reduced hiring friction by 40% with instant chat and secure Stripe payments.",
        technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Stripe"],
        link: "https://gighub-app.vercel.app",
        github: "https://github.com/kandiharish/gighub-app",
        demo: "https://gighub-app.vercel.app",
        image: "/gighub.png"
    },
    {
        title: "TaskNext",
        description: "Streamlined academic project management for 50+ active users. Increased submission on-time rates by 35% through automated Kanban workflows and real-time Firebase syncing.",
        technologies: ["React", "Firebase", "Tailwind CSS", "Kanban"],
        link: "https://task-next-nine.vercel.app",
        github: "https://github.com/kandiharish/TaskNext",
        demo: "https://task-next-nine.vercel.app",
        image: "/tasknext.png"
    },
    {
        title: "LoanFlowAI",
        description: "Automated 90% of preliminary loan assessments using a Multi-Agent AI system. Cut manual review time from 20 minutes to 30 seconds per application with cloud-scalable risk analysis.",
        technologies: ["Python", "Machine Learning", "React", "Cloud Functions"],
        link: "https://loan-flow-ai-two.vercel.app",
        github: "https://github.com/kandiharish/LoanFlowAi",
        demo: "https://loan-flow-ai-two.vercel.app",
        image: "/loanflow.png"
    },
    {
        title: "Decentralized Land Registry",
        description: "Eliminated property fraud potential by 100% using an immutable Solidity ledger. Reduced verification turnaround from 14 days to instant blockchain validation.",
        technologies: ["React.js", "Solidity", "Ether.js", "Hardhat", "MetaMask"],
        link: "https://y-black-ten.vercel.app",
        github: "https://github.com/kandiharish/HTF25-Team-212",
        demo: "https://y-black-ten.vercel.app",
        image: "/decentralised.png"
    },
    {
        title: "Universal Support Chatbot",
        description: "A multilingual AI support chatbot achieving 95% query resolution accuracy. Enables real-time customer assistance across languages, breaking communication barriers at scale.",
        technologies: ["Python", "NLP", "OpenAI API", "React", "WebSocket"],
        link: "#",
        github: "https://github.com/kandiharish/Universal-Language-Support-Chatbot",
        demo: "#",
        image: "/usl chatbot.png"
    },
    {
        title: "HandsMen Threads",
        description: "An enterprise-grade Salesforce CRM that boosted sales team efficiency by 25%. Automates inventory, loyalty programs, and marketing campaigns for a premium fashion brand.",
        technologies: ["Salesforce", "Apex", "LWC", "SOQL"],
        link: "#",
        github: "https://github.com/kandiharish/HandsMen-Threads_Mens-Fashion_Project",
        demo: "#",
        image: "/handsmen.png"
    },
    {
        title: "Learning Path Generator (MCP)",
        description: "A context-aware AI system that generates personalized learning paths. Orchestrates tools like YouTube and Notion using Model Context Protocol, achieving 92% curriculum relevance for self-paced learners.",
        technologies: ["MCP", "Python", "Gemini 1.5", "LangGraph"],
        link: "#",
        github: "https://github.com/kandiharish/MCP-Learning-Path-Generator",
        demo: "#",
        image: "/mcp.png"
    },
    {
        title: "Sahayak - AI Teaching Assistant",
        description: "An intelligent AI teaching assistant reducing educator administrative workload by 70%. Automates lesson planning and assessment generation using Gemini Pro and Vertex AI.",
        technologies: ["Gemini Pro", "Vertex AI", "Firebase", "React", "Tailwind CSS"],
        link: "#",
        github: "https://github.com/kandiharish/EduvVision-AI",
        demo: "#",
        image: "/sahayak.png"
    },
    {
        title: "Medical Chatbot (MedBot)",
        description: "An empathetic healthcare assistant capable of preliminary symptom analysis. Features a secure, privacy-focused conversation engine that reduces patient triage wait times by over 50%.",
        technologies: ["Flask", "OpenAI API", "MongoDB", "NLTK", "JavaScript"],
        link: "#",
        github: "https://github.com/kandiharish/Gen-AI",
        demo: "#",
        image: "/medbot.png"
    },
];

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
        score: "",
    },
];

export const EXPERIENCES = [
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
        link: "/Harish Kandi Oracle Certificate.pdf"
    },
    {
        name: "Gen AI Exchange Hackathon 2025",
        issuer: "Hack2skill & Google Cloud",
        link: "/Hack2skill-Certificate.png"
    },
    {
        name: "Quantum Computing Program",
        issuer: "IIT Roorkee & CDAC Hyderabad",
        link: "/cdacqbit.jpg"
    },
    {
        name: "CodeClash Competition",
        issuer: "CodeClash",
        link: "/codeclash cert.pdf"
    },
    {
        name: "Kaggle Python Coder",
        issuer: "Kaggle",
        link: "/kaggle python coder.jpg"
    },
    {
        name: "Nation Building Participation",
        issuer: "Government of India",
        link: "/nationbuilding.pdf"
    },
];


