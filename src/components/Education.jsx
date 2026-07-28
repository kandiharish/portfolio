import React, { useState } from "react";
import { EDUCATION } from "../constants";
import { motion } from "framer-motion";

// Custom 3D Tilt Component
const TiltCard = ({ children, className }) => {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotationX = -(y / (rect.height / 2)) * 15;
        const rotationY = (x / (rect.width / 2)) * 15;
        
        setRotateX(rotationX);
        setRotateY(rotationY);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            className={className}
            style={{ perspective: 1000 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                className="w-full h-full relative rounded-[2.5rem] border border-white/10 bg-[#0f1626]/80 backdrop-blur-xl p-8 overflow-hidden group"
                animate={{ rotateX, rotateY }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Dynamic Glare Effect */}
                <div 
                    className="absolute inset-0 z-50 pointer-events-none rounded-[2.5rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        background: `radial-gradient(circle at ${rotateY * 4 + 50}% ${-rotateX * 4 + 50}%, rgba(20,241,217,0.15) 0%, rgba(255,255,255,0) 60%)`
                    }}
                />
                
                <div style={{ transform: "translateZ(40px)" }} className="flex flex-col items-center text-center h-full relative z-10">
                    {children}
                </div>
            </motion.div>
        </motion.div>
    );
};

// Animated SVG Progress Ring
const ProgressRing = ({ radius, stroke, progress, label, subtitle }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative flex items-center justify-center mb-10 mt-4">
            <svg height={radius * 2} width={radius * 2} className="transform -rotate-90">
                <circle
                    stroke="rgba(255,255,255,0.05)"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <motion.circle
                    stroke="#14F1D9" // Accent color
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_15px_rgba(20,241,217,0.4)]"
                />
            </svg>
            <div className="absolute flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white tracking-wider font-heading">{label}</span>
                {subtitle && <span className="text-[10px] text-accent font-bold uppercase tracking-widest mt-1">{subtitle}</span>}
            </div>
        </div>
    );
};

const Education = () => {
    return (
        <section id="education" className="py-24 bg-[#070b14] text-white relative overflow-hidden">
            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-bold font-heading text-center mb-24 tracking-wide"
                >
                    Academic <span className="text-accent">Excellence</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-8">
                    {EDUCATION.map((edu, index) => {
                        // Dynamically determine progress for ring based on CGPA if it exists
                        let progress = 100; // default for completed
                        let ringLabel = "100%";
                        let ringSubtitle = "COMPLETED";

                        if (edu.score && edu.score.includes("CGPA")) {
                            const cgpaMatch = edu.score.match(/([\d.]+)\/10/);
                            if (cgpaMatch) {
                                const cgpa = parseFloat(cgpaMatch[1]);
                                progress = (cgpa / 10) * 100;
                                ringLabel = cgpa.toString();
                                ringSubtitle = "CGPA";
                            }
                        } else if (edu.score && edu.score.includes("%")) {
                            const percentMatch = edu.score.match(/([\d.]+)%/);
                            if (percentMatch) {
                                progress = parseFloat(percentMatch[1]);
                                ringLabel = progress + "%";
                                ringSubtitle = "SCORE";
                            }
                        }

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                viewport={{ once: true }}
                                className="w-full flex justify-center"
                            >
                                <TiltCard className="w-full max-w-md h-[500px] cursor-default">
                                    <ProgressRing 
                                        radius={90} 
                                        stroke={8} 
                                        progress={progress} 
                                        label={ringLabel}
                                        subtitle={ringSubtitle}
                                    />
                                    
                                    <div className="mt-2 flex flex-col items-center justify-between flex-grow w-full">
                                        <div className="inline-block px-5 py-1.5 bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold rounded-full mb-8 tracking-widest uppercase">
                                            {edu.duration}
                                        </div>
                                        
                                        <h3 className="text-2xl font-bold text-white mb-3 font-heading tracking-wide leading-snug">
                                            {edu.institution}
                                        </h3>
                                        
                                        <h4 className="text-sm text-accent/90 font-medium tracking-wide uppercase mb-8">
                                            {edu.degree}
                                        </h4>
                                        
                                        {/* Subtle decorative bottom line */}
                                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-accent/50 to-transparent rounded-full mt-auto mb-2"></div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
            
            {/* Background Ambient Glows */}
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none z-0"></div>
            <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#0f1626] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-0"></div>
        </section>
    );
};

export default Education;
