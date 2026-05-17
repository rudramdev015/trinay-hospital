import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, BadgeCheck, Clock } from "lucide-react";

const SCHEMES = [
    {
        id: 1,
        name: "Mukhyamantri Ayushman Arogya Yojana",
        shortName: "MAA Yojana",
        logo: "/DOCTOR IAMGES/MAA JOGANA .png",
        logoBg: "#e85d04",
        status: "Approved",
        statusColor: "text-emerald-600 bg-emerald-50 border-emerald-200",
        description: "Mukhyamantri Ayushman Arogya Yojana aims to provide financial assistance to people living below the poverty line (BPL) and marginalised sections of society to access quality healthcare services at Trinay Hospital.",
        link: "https://health.rajasthan.gov.in",
        coverage: "Up to ₹5 Lakh/year",
    },
    {
        id: 2,
        name: "Rashtriya Bal Swasthya Karyakram",
        shortName: "RBSK",
        logo: null,
        logoBg: "#d4a017",
        logoText: "NHM",
        logoSubText: "RBSK",
        status: "Waiting for Approval",
        statusColor: "text-amber-600 bg-amber-50 border-amber-200",
        description: "RBSK is one of its kind program to improve the overall quality of life of children enabling all children to achieve their full potential, and also provide comprehensive care to all the children in the community.",
        link: "https://rbsk.gov.in",
        coverage: "Children 0–18 years",
    },
    {
        id: 3,
        name: "Ayushman CAPF",
        shortName: "Central Armed Police Force",
        logo: null,
        logoBg: "#4a5e3a",
        logoText: "CAPF",
        logoSubText: "Ayushman",
        status: "Waiting for Approval",
        statusColor: "text-amber-600 bg-amber-50 border-amber-200",
        description: "The Ministry of Home Affairs and the National Health Authority jointly provide cashless healthcare services to the serving CAPF personnel and their dependents through the Ayushman CAPF scheme.",
        link: "https://pmjay.gov.in",
        coverage: "CAPF personnel & dependents",
    },
    {
        id: 4,
        name: "Rajasthan Government Health Scheme",
        shortName: "RGHS",
        logo: null,
        logoBg: "#2d9b8a",
        logoText: "R",
        logoSubText: "RGHS",
        status: "Waiting for Approval",
        statusColor: "text-amber-600 bg-amber-50 border-amber-200",
        description: "Trinay, a leading multispeciality hospital in Jodhpur, is empanelled with RGHS to offer cutting-edge diagnostics, treatment, and healthcare under the state scheme for Rajasthan government employees.",
        link: "https://rghs.rajasthan.gov.in",
        coverage: "State government employees",
    },
    {
        id: 5,
        name: "Ex-Servicemen Contributory Health Scheme",
        shortName: "ECHS",
        logo: null,
        logoBg: "#1a2c5b",
        logoText: "ECHS",
        logoSubText: "Ex-Servicemen",
        status: "Waiting for Approval",
        statusColor: "text-amber-600 bg-amber-50 border-amber-200",
        description: "The Ex-Servicemen Contributory Health Scheme (ECHS) is a government-funded healthcare plan for ex-servicemen, their dependents, and the next of kin of deceased pensioners.",
        link: "#",
        coverage: "Ex-servicemen & dependents",
    },
];

const SchemeCard = ({ scheme }) => (
    <div className="group bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-400 overflow-hidden h-full flex flex-col">
        {/* Logo area */}
        <div
            className="h-44 flex items-center justify-center relative overflow-hidden shrink-0"
            style={{ backgroundColor: scheme.logoBg }}
        >
            <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "20px 20px" }} />
            {scheme.logo ? (
                <img
                    src={scheme.logo}
                    alt={scheme.name}
                    loading="lazy"
                    decoding="async"
                    className="h-28 w-auto object-contain drop-shadow-lg relative z-10"
                />
            ) : (
                <div className="relative z-10 text-center">
                    <div className="text-4xl font-black text-white leading-none drop-shadow-md">{scheme.logoText}</div>
                    <div className="text-white/70 text-xs font-bold uppercase tracking-widest mt-1">{scheme.logoSubText}</div>
                </div>
            )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
            {/* Status badge */}
            <div className="flex items-center gap-2 mb-3">
                {scheme.status === "Approved" ? (
                    <BadgeCheck size={14} className="text-emerald-500 shrink-0" />
                ) : (
                    <Clock size={14} className="text-amber-500 shrink-0" />
                )}
                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${scheme.statusColor}`}>
                    {scheme.status}
                </span>
            </div>

            <h3 className="text-base font-black text-[#003366] leading-snug mb-1">{scheme.name}</h3>
            <p className="text-[11px] font-bold text-[#006fa3] mb-3">{scheme.coverage}</p>
            <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{scheme.description}</p>

            <a
                href={scheme.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#003366] font-black text-[11px] uppercase tracking-widest hover:gap-2.5 transition-all group/link"
            >
                Know More <ExternalLink size={12} className="group-hover/link:translate-x-0.5 transition-transform" />
            </a>
        </div>
    </div>
);

const GovernmentSchemes = () => {
    const [cur, setCur] = useState(0);
    const [perView, setPerView] = useState(3);
    const timer  = useRef(null);
    const touchX = useRef(null);
    const total  = SCHEMES.length;
    const maxIdx = Math.max(0, total - perView);

    const getPerView = () => {
        if (typeof window === "undefined") return 3;
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 640)  return 2;
        return 1;
    };

    const startTimer = useCallback(() => {
        clearInterval(timer.current);
        timer.current = setInterval(() =>
            setCur((p) => (p >= maxIdx ? 0 : p + 1)), 4000);
    }, [maxIdx]);

    useEffect(() => { startTimer(); return () => clearInterval(timer.current); }, [startTimer]);

    useEffect(() => {
        const onResize = () => setPerView(getPerView());
        setPerView(getPerView());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => { setCur((p) => Math.min(p, Math.max(0, total - perView))); }, [perView, total]);

    const go = (i) => { setCur(Math.max(0, Math.min(i, maxIdx))); startTimer(); };

    const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
    const onTouchEnd   = (e) => {
        if (touchX.current === null) return;
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 48) go(diff > 0 ? cur + 1 : cur - 1);
        touchX.current = null;
    };

    const dots = Array.from({ length: maxIdx + 1 });

    return (
        <section className="relative py-20 md:py-28 bg-[#F8FAFC] overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100/50 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-100/40 rounded-full blur-[100px] pointer-events-none" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                {/* Heading */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
                    <motion.div
                        className="text-center sm:text-left"
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }} viewport={{ once: true }}
                    >
                        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#003366] mb-2">
                            Empanelled Health Schemes
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003366] leading-tight">
                            Government{" "}
                            <span className="bg-linear-to-r from-[#003366] to-[#006fa3] bg-clip-text text-transparent">
                                Health Schemes
                            </span>
                        </h2>
                        <p className="text-slate-500 mt-3 text-base sm:text-lg leading-relaxed max-w-xl">
                            Trinay Hospital accepts leading government health schemes for cashless and subsidised treatment.
                        </p>
                    </motion.div>

                    {/* Arrow controls */}
                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                        <button
                            onClick={() => go(cur - 1)}
                            disabled={cur === 0}
                            aria-label="Previous"
                            className="w-11 h-11 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-[#003366] hover:text-[#003366] hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => go(cur + 1)}
                            disabled={cur === maxIdx}
                            aria-label="Next"
                            className="w-11 h-11 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-[#003366] hover:text-[#003366] hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>

                {/* Slider */}
                <div
                    className="overflow-hidden select-none"
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                >
                    <div
                        className="flex transition-transform duration-500"
                        style={{
                            transform: `translateX(-${cur * (100 / perView)}%)`,
                            transitionTimingFunction: "cubic-bezier(0.25,1,0.5,1)",
                        }}
                    >
                        {SCHEMES.map((scheme) => (
                            <div
                                key={scheme.id}
                                style={{ width: `${100 / perView}%`, minWidth: `${100 / perView}%` }}
                                className="px-2.5 shrink-0"
                            >
                                <SchemeCard scheme={scheme} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots + mobile arrows */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <button
                        onClick={() => go(cur - 1)}
                        disabled={cur === 0}
                        aria-label="Previous"
                        className="sm:hidden w-9 h-9 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-500 disabled:opacity-30 transition-all"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    <div className="flex items-center gap-2">
                        {dots.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => go(i)}
                                aria-label={`Go to scheme ${i + 1}`}
                                className={`rounded-full transition-all duration-300 ${
                                    i === cur
                                        ? "bg-[#003366] w-6 h-2.5"
                                        : "bg-slate-300 hover:bg-slate-400 w-2.5 h-2.5"
                                }`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => go(cur + 1)}
                        disabled={cur === maxIdx}
                        aria-label="Next"
                        className="sm:hidden w-9 h-9 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-500 disabled:opacity-30 transition-all"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-xs text-slate-400 mt-6 font-medium">
                    * Schemes marked "Waiting for Approval" are under empanelment process. Contact us for latest status.
                </p>
            </div>
        </section>
    );
};

export default GovernmentSchemes;
