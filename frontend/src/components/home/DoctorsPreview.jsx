import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
    ArrowRight, ChevronLeft, ChevronRight,
    GraduationCap, Clock, Star, BadgeCheck,
    Users, Stethoscope,
} from "lucide-react";
import LoadingLink from "../common/LoadingLink";
import { DOCTORS } from "../../data/doctorsData";

/* ── Doctor card — all Trinay brand colours ── */
const TRINAY_GRADIENT = "from-[#003366] via-[#004d80] to-[#006fa3]";

const DoctorCard = ({ doc }) => (
    <div className="group relative flex flex-col rounded-[26px] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.07)] hover:shadow-[0_18px_50px_rgba(0,0,0,0.14)] overflow-hidden transition-all duration-400 border border-slate-100/80 h-full">

        {/* Gradient header */}
        <div className={`relative h-36 bg-linear-to-br ${TRINAY_GRADIENT} flex-shrink-0 overflow-hidden`}>
            <div className="absolute inset-0 opacity-[0.12]"
                style={{ backgroundImage: "radial-gradient(white 1.2px,transparent 1.2px)", backgroundSize: "18px 18px" }} />
            <Stethoscope size={90} className="absolute -right-3 -bottom-3 text-white/10 rotate-[-20deg]" strokeWidth={1} />
            <span className="absolute top-3 left-3 text-[9px] font-black uppercase tracking-[0.16em] bg-white/20 backdrop-blur-md text-white border border-white/30 px-2.5 py-1 rounded-full">
                {doc.deptDisplay}
            </span>
            <div className="absolute top-3 right-3 flex flex-col items-center bg-white/15 backdrop-blur-md border border-white/30 rounded-xl px-2.5 py-1">
                <span className="text-white font-black text-sm leading-none">{doc.experience}+</span>
                <span className="text-white/75 text-[9px] font-semibold">yrs</span>
            </div>
        </div>

        {/* Circular photo */}
        <div className="flex justify-center -mt-11 relative z-10 px-4">
            <div className={`relative w-[88px] h-[88px] rounded-full ring-4 ring-white shadow-[0_6px_28px_rgba(0,0,0,0.18)] overflow-hidden bg-linear-to-br ${TRINAY_GRADIENT} flex-shrink-0`}>
                <img
                    src={doc.avatar}
                    alt={doc.nameTitled}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.06]"
                />
                <div className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center shadow">
                    <BadgeCheck size={12} className="text-[#006fa3]" fill="currentColor" />
                </div>
            </div>
        </div>

        {/* Body */}
        <div className="px-4 pt-2.5 pb-5 flex flex-col flex-1 text-center">
            <h3 className="text-[15px] font-black text-[#003366] leading-snug tracking-tight">{doc.nameTitled}</h3>
            <p className="text-[11px] font-bold mt-0.5 text-[#006fa3]">{doc.designation}</p>

            <div className="flex items-center justify-center gap-0.5 mt-2">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} fill="#FBBF24" className="text-amber-400" />)}
                <span className="text-[10px] text-slate-400 ml-1 font-bold">4.9</span>
            </div>

            <div className="mt-3 border-t border-dashed border-slate-100" />

            <div className="mt-2.5 space-y-1.5">
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                    <GraduationCap size={11} className="text-slate-400 shrink-0" />
                    <span className="font-semibold truncate">{doc.qualification}</span>
                </div>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                    <Clock size={11} className="shrink-0" />
                    <span>{doc.timing}</span>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-center gap-1.5 bg-blue-50 text-[#003366] rounded-full px-3 py-1 text-[10px] font-black self-center">
                <Users size={10} /> {doc.patients} patients
            </div>

            <LoadingLink
                to={`/appointment?doctor=${encodeURIComponent(doc.nameTitled)}&dept=${encodeURIComponent(doc.dept)}`}
                className={`mt-3 w-full flex items-center justify-center gap-1.5 bg-linear-to-r ${TRINAY_GRADIENT} text-white text-[11px] font-black py-3 rounded-xl transition-all duration-300 hover:scale-[1.03] hover:shadow-lg active:scale-95 shadow-sm tracking-wide`}
            >
                Book Appointment <ArrowRight size={12} />
            </LoadingLink>
        </div>
    </div>
);

/* ── Responsive perView helper ── */
const getPerView = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth >= 1280) return 4;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640)  return 2;
    return 1;
};

/* ── Main slider ── */
const DoctorsPreview = () => {
    const [cur,     setCur]     = useState(0);
    const [perView, setPerView] = useState(getPerView);
    const timer   = useRef(null);
    const touchX  = useRef(null);
    const total   = DOCTORS.length;
    const maxIdx  = Math.max(0, total - perView);

    /* auto-advance */
    const startTimer = useCallback(() => {
        clearInterval(timer.current);
        timer.current = setInterval(() =>
            setCur((p) => (p >= maxIdx ? 0 : p + 1)), 4500);
    }, [maxIdx]);

    useEffect(() => { startTimer(); return () => clearInterval(timer.current); }, [startTimer]);

    /* responsive */
    useEffect(() => {
        const onResize = () => setPerView(getPerView());
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    /* clamp cur when perView changes */
    useEffect(() => { setCur((p) => Math.min(p, Math.max(0, total - perView))); }, [perView, total]);

    const go = (i) => { setCur(Math.max(0, Math.min(i, maxIdx))); startTimer(); };

    /* touch swipe */
    const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
    const onTouchEnd   = (e) => {
        if (touchX.current === null) return;
        const diff = touchX.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 48) go(diff > 0 ? cur + 1 : cur - 1);
        touchX.current = null;
    };

    /* dot groups for small screens (1 dot per card), larger screens (1 per page) */
    const dots = Array.from({ length: maxIdx + 1 });

    return (
        <section className="relative py-20 md:py-28 overflow-hidden">

            {/* Backgrounds */}
            <div className="absolute inset-0 bg-linear-to-b from-[#eef4ff] via-white to-white" />
            <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full blur-[140px] opacity-20 pointer-events-none"
                style={{ background: "radial-gradient(circle,#6366f1 0%,transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full blur-[110px] opacity-15 pointer-events-none"
                style={{ background: "radial-gradient(circle,#0ea5e9 0%,transparent 70%)" }} />

            <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">

                {/* Heading + nav row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">
                    <motion.div
                        className="text-center sm:text-left max-w-2xl"
                        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }} viewport={{ once: true }}
                    >
                        <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-blue-500 mb-3 bg-blue-50 border border-blue-100 px-4 py-1.5 rounded-full">
                            <BadgeCheck size={12} /> Meet Our Specialists
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003366] leading-tight mt-1">
                            Doctors You Can{" "}
                            <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                                Trust With Your Life
                            </span>
                        </h2>
                        <p className="text-slate-500 mt-3 text-base sm:text-lg leading-relaxed">
                            30+ specialists across 17 departments — dedicated to your best health outcome.
                        </p>
                    </motion.div>

                    {/* Arrow controls — visible on sm+ */}
                    <div className="hidden sm:flex items-center gap-3 shrink-0">
                        <button
                            onClick={() => go(cur - 1)}
                            disabled={cur === 0}
                            aria-label="Previous"
                            className="w-12 h-12 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-[#003366] hover:text-[#003366] hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={() => go(cur + 1)}
                            disabled={cur === maxIdx}
                            aria-label="Next"
                            className="w-12 h-12 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:border-[#003366] hover:text-[#003366] hover:shadow-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Slider track */}
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
                        {DOCTORS.map((doc) => (
                            <div
                                key={doc.id}
                                style={{ width: `${100 / perView}%`, minWidth: `${100 / perView}%` }}
                                className="px-2 md:px-3 flex-shrink-0"
                            >
                                <DoctorCard doc={doc} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Dots + mobile arrows */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    {/* Mobile prev */}
                    <button
                        onClick={() => go(cur - 1)}
                        disabled={cur === 0}
                        aria-label="Previous"
                        className="sm:hidden w-9 h-9 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-500 disabled:opacity-30 transition-all"
                    >
                        <ChevronLeft size={16} />
                    </button>

                    {/* Dots */}
                    <div className="flex items-center gap-2">
                        {dots.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => go(i)}
                                aria-label={`Go to slide ${i + 1}`}
                                className={`rounded-full transition-all duration-300 ${
                                    i === cur
                                        ? "bg-[#003366] w-6 h-2.5"
                                        : "bg-slate-300 hover:bg-slate-400 w-2.5 h-2.5"
                                }`}
                            />
                        ))}
                    </div>

                    {/* Mobile next */}
                    <button
                        onClick={() => go(cur + 1)}
                        disabled={cur === maxIdx}
                        aria-label="Next"
                        className="sm:hidden w-9 h-9 rounded-full border-2 border-slate-200 bg-white flex items-center justify-center text-slate-500 disabled:opacity-30 transition-all"
                    >
                        <ChevronRight size={16} />
                    </button>
                </div>

                {/* View all CTA */}
                <motion.div
                    className="flex justify-center mt-10"
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }} viewport={{ once: true }}
                >
                    <LoadingLink
                        to="/doctors"
                        className="inline-flex items-center gap-2.5 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-8 py-4 rounded-full font-black text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm hover:shadow-xl hover:shadow-blue-200/50"
                    >
                        View All {total} Doctors <ArrowRight size={18} />
                    </LoadingLink>
                </motion.div>
            </div>
        </section>
    );
};

export default DoctorsPreview;
