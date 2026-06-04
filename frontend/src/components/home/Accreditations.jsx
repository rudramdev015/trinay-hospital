import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, BadgeCheck, HeartHandshake, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const SLIDES = [
    {
        src: "/DOCTOR IAMGES/NABH.png",
        Icon: ShieldCheck,
        badge: "National",
        badgeGrad: "linear-gradient(135deg,#0ea5e9,#6366f1)",
        title: "NABH Accredited",
        subtitle: "National Accreditation Board for Hospitals",
        desc: "Certified by the National Accreditation Board for Hospitals & Healthcare Providers — India's gold standard for patient safety and quality care.",
        glow: "#38bdf8",
        orb1: "rgba(56,189,248,0.35)",
        orb2: "rgba(99,102,241,0.25)",
        link: null,
        tag: null,
    },
    {
        src: "/DOCTOR IAMGES/ESIC.png",
        Icon: BadgeCheck,
        badge: "Govt. Empanelled",
        badgeGrad: "linear-gradient(135deg,#10b981,#0d9488)",
        title: "ESIC Empanelled",
        subtitle: "Employees' State Insurance Corporation",
        desc: "Officially empanelled under the Employees' State Insurance Corporation for cashless treatment of insured workers and their dependants.",
        glow: "#34d399",
        orb1: "rgba(52,211,153,0.30)",
        orb2: "rgba(13,148,136,0.22)",
        link: null,
        tag: null,
    },
    {
        src: "/DOCTOR IAMGES/MAA JOGANA .png",
        Icon: HeartHandshake,
        badge: "Rajasthan Govt.",
        badgeGrad: "linear-gradient(135deg,#f97316,#ef4444)",
        title: "Maa Yojana Approved",
        subtitle: "Mukhyamantri Ayushman Arogya Yojana",
        desc: "Fully empanelled for cashless treatment up to ₹5 Lakh/year for BPL families — walk in with your MAA Yojana card for seamless, free healthcare at Trinay Hospital.",
        glow: "#fb923c",
        orb1: "rgba(251,146,60,0.35)",
        orb2: "rgba(239,68,68,0.20)",
        link: "https://health.rajasthan.gov.in",
        tag: "Up to ₹5 Lakh/year",
    },
];

const getStyle = (offset) => {
    if (offset === 0)
        return {
            transform: "perspective(1100px) rotateY(0deg) translateZ(60px) scale(1)",
            opacity: 1, zIndex: 10, filter: "none",
        };
    if (Math.abs(offset) === 1)
        return {
            transform: `perspective(1100px) rotateY(${offset * -38}deg) translateX(${offset * 52}%) translateZ(-60px) scale(0.82)`,
            opacity: 0.6, zIndex: 5, filter: "brightness(0.6) saturate(0.7)",
        };
    return {
        transform: `perspective(1100px) rotateY(${offset * -55}deg) translateX(${offset * 85}%) translateZ(-140px) scale(0.65)`,
        opacity: 0, zIndex: 1, filter: "brightness(0.3)",
        pointerEvents: "none",
    };
};

const Accreditations = () => {
    const [cur, setCur] = useState(0);
    const timer = useRef(null);
    const total = SLIDES.length;

    const start = useCallback(() => {
        clearInterval(timer.current);
        timer.current = setInterval(() => setCur(p => (p + 1) % total), 4000);
    }, [total]);

    useEffect(() => { start(); return () => clearInterval(timer.current); }, [start]);

    const go = (i) => { setCur((i + total) % total); start(); };

    const active = SLIDES[cur];

    return (
        <section
            className="relative py-20 md:py-32 overflow-hidden select-none"
            style={{ background: "linear-gradient(135deg,#020d2e 0%,#041AA9 50%,#060c24 100%)" }}
        >
            {/* Background mesh */}
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "28px 28px" }} />

            {/* Dynamic glow blobs — change with active slide */}
            <motion.div
                key={`orb1-${cur}`}
                className="absolute -top-40 -left-40 w-125 h-125 rounded-full pointer-events-none blur-[130px]"
                style={{ background: active.orb1 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            />
            <motion.div
                key={`orb2-${cur}`}
                className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full pointer-events-none blur-[110px]"
                style={{ background: active.orb2 }}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

                {/* Heading */}
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-14 md:mb-20"
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }} viewport={{ once: true }}
                >
                    <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm text-cyan-300 text-[11px] font-black uppercase tracking-[0.25em] px-5 py-2 rounded-full mb-5">
                        <ShieldCheck size={12} /> Certified · Accredited · Trusted
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
                        Recognised by{" "}
                        <span style={{ background: "linear-gradient(90deg,#67e8f9,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            India's Highest Authorities
                        </span>
                    </h2>
                </motion.div>

                {/* 3-D Coverflow */}
                <div className="relative flex items-center justify-center h-105 sm:h-110 md:h-115">
                    {SLIDES.map((slide, i) => {
                        const offset = i - cur;
                        const style = getStyle(offset);
                        return (
                            <div
                                key={i}
                                onClick={() => go(i)}
                                className="absolute w-[88%] sm:w-[68%] md:w-[52%] lg:w-[42%] cursor-pointer"
                                style={{ transition: "all 0.65s cubic-bezier(0.25,1,0.5,1)", ...style }}
                            >
                                <div
                                    className="relative rounded-3xl overflow-hidden border border-white/10 backdrop-blur-md"
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        boxShadow: offset === 0
                                            ? `0 0 0 1px rgba(255,255,255,0.12), 0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${slide.glow}44`
                                            : "0 8px 32px rgba(0,0,0,0.4)",
                                    }}
                                >
                                    {/* Active glow ring */}
                                    {offset === 0 && (
                                        <div
                                            className="absolute inset-0 pointer-events-none rounded-3xl"
                                            style={{ background: `radial-gradient(circle at 50% 20%,${slide.glow}22,transparent 65%)` }}
                                        />
                                    )}

                                    <div className="relative px-8 pt-10 pb-9 flex flex-col items-center gap-5 text-center">
                                        {/* Badge */}
                                        <span
                                            className="absolute top-5 right-5 text-[9px] font-black uppercase tracking-widest text-white px-3 py-1 rounded-full"
                                            style={{ background: slide.badgeGrad }}
                                        >
                                            {slide.badge}
                                        </span>

                                        {/* Logo with glow ring */}
                                        <div className="relative flex items-center justify-center">
                                            <div
                                                className="absolute w-28 h-28 rounded-full blur-2xl opacity-50 pointer-events-none"
                                                style={{ background: slide.glow }}
                                            />
                                            <motion.img
                                                src={slide.src}
                                                alt={slide.title}
                                                loading="lazy"
                                                className="relative h-20 sm:h-24 w-auto object-contain"
                                                style={{ filter: `drop-shadow(0 0 18px ${slide.glow}88)` }}
                                                animate={offset === 0 ? { y: [0, -6, 0] } : { y: 0 }}
                                                transition={offset === 0 ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
                                            />
                                        </div>

                                        {/* Divider */}
                                        <div className="w-10 h-px" style={{ background: `linear-gradient(90deg,transparent,${slide.glow},transparent)` }} />

                                        {/* Text */}
                                        <div>
                                            <h3 className="text-xl sm:text-2xl font-black text-white mb-1">{slide.title}</h3>
                                            <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: slide.glow }}>{slide.subtitle}</p>
                                            <p className="text-blue-200/70 text-sm leading-relaxed">{slide.desc}</p>
                                        </div>

                                        {/* Optional tag + link */}
                                        {slide.tag && (
                                            <span className="inline-block bg-white/10 border border-white/20 text-white text-[11px] font-black px-3 py-1 rounded-full">
                                                {slide.tag}
                                            </span>
                                        )}
                                        {slide.link && offset === 0 && (
                                            <a
                                                href={slide.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={e => e.stopPropagation()}
                                                className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                                            >
                                                Know More <ExternalLink size={11} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-6 mt-10">
                    <button
                        onClick={() => go(cur - 1)}
                        className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                    >
                        <ChevronLeft size={18} />
                    </button>

                    <div className="flex items-center gap-2.5">
                        {SLIDES.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => go(i)}
                                className="rounded-full transition-all duration-400"
                                style={{
                                    width: i === cur ? 28 : 10,
                                    height: 10,
                                    background: i === cur ? active.glow : "rgba(255,255,255,0.25)",
                                    boxShadow: i === cur ? `0 0 12px ${active.glow}` : "none",
                                }}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => go(cur + 1)}
                        className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:scale-110 active:scale-95"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Slide counter */}
                <p className="text-center text-xs text-white/25 font-bold tracking-widest mt-5 uppercase">
                    {cur + 1} / {total}
                </p>
            </div>
        </section>
    );
};

export default Accreditations;
