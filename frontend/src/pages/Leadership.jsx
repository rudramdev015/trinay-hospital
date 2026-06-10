import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    Award, GraduationCap, Building2, HeartPulse, Cpu,
    ChevronDown, ChevronUp, Quote, Star,
    Stethoscope, Lightbulb, TrendingUp, ShieldCheck, Heart
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { buildApiUrl } from "../utils/api";

/* ─── ANIMATED COUNTER ─── */
const Counter = ({ value, suffix = "", duration = 1400 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.6 });
    const [count, setCount] = useState(0);
    const num = parseInt(value, 10);
    const isNum = !isNaN(num);

    useEffect(() => {
        if (!isInView || !isNum) return;
        let id;
        const t0 = performance.now();
        const tick = (t) => {
            const p = Math.min((t - t0) / duration, 1);
            setCount(Math.round((1 - Math.pow(1 - p, 3)) * num));
            if (p < 1) id = requestAnimationFrame(tick);
        };
        id = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(id);
    }, [isInView, num, duration, isNum]);

    return (
        <span ref={ref} className="tabular-nums">
            {isNum ? `${count}${suffix}` : value}
        </span>
    );
};

/* ─── DATA ─── */
const DIRECTORS = [
    {
        id: "navneet",
        name: "Er. Navneet Agarwal",
        role: "Founder & Director",
        roleTag: "FOUNDER · DIRECTOR",
        initials: "NA",
        photo: null,
        portraitBg: "linear-gradient(145deg,#0A1628 0%,#0D2251 55%,#0F2D6B 100%)",
        accent: "#E9A500",
        tagCls: "bg-amber-50 border-amber-200 text-amber-700",
        statColor: "#B45309",
        quoteBg: "linear-gradient(135deg,#0A1628 0%,#112060 100%)",
        Icon: Cpu,
        tags: ["Edupreneur", "Healthpreneur", "Hospital Management", "Technology & Innovation"],
        degree: "B.E. (Electronics & Communication) · Mumbai University",
        message: "At Trinay Hospital, healthcare is not a business — it is a sacred calling. Every decision, every investment, every specialist we bring on board is guided by a single question: would we trust this for our own family? That unwavering standard is what sets Trinay apart, and what will define us for generations to come.",
        bio: `Er. Navneet Agarwal is a visionary Edupreneur and Healthpreneur with over two decades of expertise in shaping the healthcare landscape. Armed with a degree in Electronics & Communication Engineering from Mumbai University, he seamlessly integrates cutting-edge technology with healthcare innovation.

His exceptional leadership and strategic foresight have been pivotal in revolutionizing hospital management and operations. Known for delivering projects of the highest standard with precision and unwavering commitment, he has set a benchmark in the healthcare sector. His relentless pursuit of excellence continues to elevate industry standards, driving growth and innovation at every step.`,
        highlights: [
            { icon: TrendingUp,  text: "20+ years shaping India's healthcare sector" },
            { icon: Lightbulb,   text: "Pioneer in technology-integrated hospital management" },
            { icon: ShieldCheck, text: "Led Trinay Hospital to NABH accreditation" },
            { icon: Building2,   text: "Built Jodhpur's most trusted multi-speciality institution" },
        ],
        stats: [
            { value: "20",  suffix: "+", label: "Years of Vision" },
        ],
    },
    {
        id: "dhruva",
        name: "Dr. Dhruva Sharma",
        role: "Founder & Director",
        roleTag: "FOUNDER · DIRECTOR",
        initials: "DS",
        photo: null,
        portraitBg: "linear-gradient(145deg,#0A1628 0%,#0C2340 55%,#0E3158 100%)",
        accent: "#06B6D4",
        tagCls: "bg-cyan-50 border-cyan-200 text-cyan-700",
        statColor: "#0E7490",
        quoteBg: "linear-gradient(135deg,#0A2342 0%,#0C3060 100%)",
        Icon: HeartPulse,
        tags: ["Interventional Cardiology", "Clinical Excellence", "Patient-Centric Care", "DM Cardiology"],
        degree: "DM Cardiology · Interventional Cardiology Specialist",
        message: "As a cardiologist, I have seen how minutes of expert intervention can be the difference between life and loss. My mission at Trinay Hospital is clear — no family in Jodhpur should travel to Delhi for world-class cardiac care. We bring that expertise here, with compassion at the heart of every decision.",
        bio: `Dr. Dhruva Sharma, a distinguished interventional cardiologist, stands at the helm of Trinay Hospital, Jodhpur, driving its mission to offer advanced healthcare solutions. With a prestigious DM degree in Cardiology and years of invaluable experience at Fortis Escorts, Delhi, Dr. Sharma combines medical excellence with a forward-thinking approach to healthcare.

His unwavering dedication to clinical innovation and patient-centric care has positioned Trinay Hospital as a leader in the region, ensuring that every patient receives world-class treatment with compassion and precision. Under his visionary leadership, the hospital continues to raise the bar in specialized medical services.`,
        highlights: [
            { icon: GraduationCap, text: "DM Cardiology — among Rajasthan's finest" },
            { icon: Stethoscope,   text: "Trained & practiced at Fortis Escorts, New Delhi" },
            { icon: HeartPulse,    text: "Pioneer of interventional cardiology in Jodhpur" },
            { icon: ShieldCheck,   text: "Driving cardiac care excellence at Trinay Hospital" },
        ],
        stats: [
            { value: "DM",  suffix: "", label: "Cardiology" },
            { value: "15",  suffix: "+", label: "Yrs Experience" },
        ],
    },
];

/* ─── PORTRAIT ─── */
const Portrait = ({ d }) => {
    const [failed, setFailed] = useState(false);

    return (
        <div className="absolute inset-0" style={{ background: d.portraitBg }}>
            {d.photo && !failed ? (
                <>
                    <img
                        src={d.photo}
                        alt={d.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: "center 10%" }}
                        onError={() => setFailed(true)}
                    />
                    <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top,rgba(4,10,32,0.92) 0%,rgba(4,10,32,0.12) 55%,transparent 100%)" }} />
                    <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to right,rgba(4,10,32,0.3) 0%,transparent 60%)" }} />
                </>
            ) : (
                <>
                    <div className="absolute inset-0 opacity-[0.07]"
                        style={{ backgroundImage: "radial-gradient(white 1.5px,transparent 1.5px)", backgroundSize: "26px 26px" }} />
                    <div className="absolute inset-0 opacity-[0.03]"
                        style={{ backgroundImage: "repeating-linear-gradient(45deg,white,white 1px,transparent 1px,transparent 36px)" }} />
                    {[90, 160, 230, 300].map(s => (
                        <div key={s}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
                            style={{ width: s, height: s }} />
                    ))}
                    <p className="absolute inset-0 flex items-center justify-center font-black select-none leading-none tracking-tighter"
                        style={{ fontSize: "clamp(6rem,18vw,10rem)", color: `${d.accent}09` }}>
                        {d.initials}
                    </p>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <div className="absolute -inset-5 rounded-full blur-2xl opacity-20" style={{ background: d.accent }} />
                            <div className="relative w-32 h-32 rounded-full border-2 flex items-center justify-center"
                                style={{ background: `${d.accent}18`, borderColor: `${d.accent}50` }}>
                                <span className="text-4xl font-black" style={{ color: d.accent }}>{d.initials}</span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top,rgba(4,10,32,0.92) 0%,transparent 55%)" }} />
                </>
            )}

            {/* Name overlay */}
            <div className="absolute bottom-0 inset-x-0 px-5 pb-5 pt-14"
                style={{ background: "linear-gradient(to top,rgba(4,8,26,0.97) 0%,transparent 100%)" }}>
                <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 mb-2 border"
                    style={{ background: `${d.accent}20`, borderColor: `${d.accent}40` }}>
                    <d.Icon size={10} style={{ color: d.accent }} />
                    <span className="text-[9px] font-black uppercase tracking-[0.22em]" style={{ color: d.accent }}>{d.roleTag}</span>
                </div>
                <p className="text-xl font-black text-white leading-tight">{d.name}</p>
                <p className="mt-0.5 text-white/45 text-xs font-semibold">{d.role}</p>
            </div>

            {/* Top-right chip */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 border border-white/15"
                style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(8px)" }}>
                <Star size={9} fill="currentColor" className="text-amber-400" />
                <span className="text-[9px] font-black text-white/65 uppercase tracking-widest">Director</span>
            </div>
        </div>
    );
};

/* ─── DIRECTOR CARD ─── */
const DirectorCard = ({ d }) => {
    const [expanded, setExpanded] = useState(false);
    const paras = d.bio.trim().split("\n\n");
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.05 });

    return (
        <motion.article
            ref={ref}
            id={d.id}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-3xl overflow-hidden bg-white shadow-xl shadow-slate-200/50 border border-slate-100"
            style={{ borderTop: `3px solid ${d.accent}` }}
        >
            {/* Portrait — fixed height keeps both cards visually level */}
            <div className="relative shrink-0 h-[22rem] overflow-hidden">
                <Portrait d={d} />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col px-7 pt-7 pb-8 sm:px-9 sm:pt-8 sm:pb-9">

                {/* Stats */}
                <div className="flex flex-wrap gap-8 mb-7">
                    {d.stats.map(({ value, suffix, label }) => (
                        <div key={label}>
                            <p className="text-2xl sm:text-3xl font-black leading-none" style={{ color: d.statColor }}>
                                <Counter value={value} suffix={suffix} />
                            </p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Accent rule */}
                <div className="h-[3px] w-12 rounded-full mb-6"
                    style={{ background: `linear-gradient(90deg,${d.accent},${d.accent}40)` }} />

                {/* Degree */}
                <p className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-6">
                    <GraduationCap size={13} style={{ color: d.accent }} />
                    {d.degree}
                </p>

                {/* Quote card */}
                <div className="relative rounded-2xl overflow-hidden mb-6 shadow-md">
                    <div className="absolute inset-0" style={{ background: d.quoteBg }} />
                    <div className="absolute inset-0 opacity-[0.05]"
                        style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "15px 15px" }} />
                    <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-20"
                        style={{ background: d.accent }} />
                    <div className="relative p-5 sm:p-6">
                        <Quote size={20} className="mb-3" style={{ color: d.accent, opacity: 0.5 }} />
                        <p className="text-white/88 text-sm sm:text-[15px] leading-relaxed font-semibold italic">
                            "{d.message}"
                        </p>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="h-px flex-1" style={{ background: `${d.accent}35` }} />
                            <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: d.accent }}>
                                {d.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bio */}
                <div className="mb-6">
                    <p className="text-slate-600 text-sm leading-relaxed">{paras[0]}</p>
                    <AnimatePresence initial={false}>
                        {expanded && (
                            <motion.div
                                key="rest"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.38 }}
                                className="overflow-hidden"
                            >
                                {paras.slice(1).map((p, i) => (
                                    <p key={i} className="mt-3 text-slate-600 text-sm leading-relaxed">{p}</p>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {paras.length > 1 && (
                        <button
                            onClick={() => setExpanded(s => !s)}
                            className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-black hover:opacity-70 transition-opacity"
                            style={{ color: d.accent }}
                        >
                            {expanded
                                ? <><ChevronUp size={11} /> Show Less</>
                                : <><ChevronDown size={11} /> Read Full Bio</>}
                        </button>
                    )}
                </div>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                    {d.highlights.map(({ icon: HIcon, text }) => (
                        <div key={text}
                            className="flex items-start gap-2.5 bg-slate-50 rounded-xl border border-slate-100 px-3.5 py-2.5">
                            <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                                style={{ background: `${d.accent}18` }}>
                                <HIcon size={12} style={{ color: d.accent }} />
                            </div>
                            <p className="text-xs text-slate-600 font-medium leading-snug">{text}</p>
                        </div>
                    ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-7">
                    {d.tags.map(t => (
                        <span key={t} className={`text-[11px] font-bold border rounded-full px-3 py-1 ${d.tagCls}`}>{t}</span>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-auto flex items-center gap-3 pt-5 border-t border-slate-100">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${d.accent}12` }}>
                        <Building2 size={15} style={{ color: d.accent }} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-800">Trinay Hospital Pvt. Ltd., Jodhpur</p>
                        <p className="text-[11px] text-slate-400 font-medium">Opp. Chopasni Garden · PF Office Road · 342008</p>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

/* ─── PAGE ─── */
const Leadership = () => {
    const [directors, setDirectors] = useState(DIRECTORS);

    useEffect(() => {
        fetch(buildApiUrl("/api/leadership-photos"))
            .then(r => r.json())
            .then(({ success, photos }) => {
                if (!success || !photos?.length) return;
                const byId = {};
                photos.forEach(p => { byId[p.directorId] = p.data; });
                setDirectors(DIRECTORS.map(d => byId[d.id] ? { ...d, photo: byId[d.id] } : d));
            })
            .catch(() => {});
    }, []);

    const [d0, d1] = directors;

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>

                {/* ── HERO ── */}
                <section
                    className="relative overflow-hidden pt-32 pb-24 sm:pt-40 sm:pb-32"
                    style={{ background: "linear-gradient(145deg,#060C28 0%,#0A1640 50%,#0D2060 100%)" }}
                >
                    <div className="absolute inset-0 opacity-[0.07]"
                        style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: "repeating-linear-gradient(45deg,white,white 1px,transparent 1px,transparent 50px)" }} />
                    <div className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
                        style={{ background: "radial-gradient(circle,#E9A50040,transparent 70%)" }} />
                    <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15 pointer-events-none"
                        style={{ background: "radial-gradient(circle,#06B6D440,transparent 70%)" }} />
                    <p className="absolute inset-0 flex items-center justify-center text-[18vw] font-black select-none pointer-events-none leading-none tracking-tighter"
                        style={{ color: "rgba(255,255,255,0.02)" }}>
                        LEADERS
                    </p>

                    <div className="relative max-w-5xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="inline-flex items-center gap-2.5 bg-white/8 border border-white/15 backdrop-blur-md text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full mb-8">
                                <Award size={11} />
                                Trinay Hospital · Visionary Leadership
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.95] tracking-tight">
                                Meet the<br />
                                <span style={{
                                    background: "linear-gradient(90deg,#E9A500 0%,#FCD34D 40%,#06B6D4 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}>
                                    Visionaries
                                </span>
                            </h1>

                            <p className="mt-7 text-white/55 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                                The minds and hearts behind Jodhpur's most trusted multi-speciality hospital —
                                uniting engineering precision, medical excellence, and an unshakeable commitment to care.
                            </p>

                            {/* Founder chips */}
                            <div className="mt-10 flex flex-wrap justify-center gap-4">
                                {directors.map((d) => (
                                    <a key={d.id} href={`#${d.id}`}
                                        className="group flex items-center gap-3.5 rounded-2xl border px-5 py-3 hover:scale-[1.03] transition-all duration-300"
                                        style={{ background: "rgba(255,255,255,0.06)", borderColor: `${d.accent}35`, backdropFilter: "blur(10px)" }}>
                                        <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center font-black shrink-0 text-sm"
                                            style={{ borderColor: `${d.accent}60`, color: d.accent, background: `${d.accent}15` }}>
                                            {d.initials}
                                        </div>
                                        <div className="text-left">
                                            <p className="text-white text-sm font-black leading-none">{d.name}</p>
                                            <p className="text-white/40 text-[11px] font-semibold mt-0.5">{d.role}</p>
                                        </div>
                                        <ChevronDown size={11} style={{ color: d.accent }} className="ml-1 shrink-0" />
                                    </a>
                                ))}
                            </div>

                            <motion.div
                                className="mt-10 flex flex-col items-center gap-2 opacity-35"
                                animate={{ y: [0, 8, 0] }}
                                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                            >
                                <div className="w-px h-10 bg-linear-to-b from-transparent via-white to-transparent" />
                                <ChevronDown size={15} className="text-white" />
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {/* ── DIRECTORS SIDE-BY-SIDE GRID ── */}
                <section className="py-16 sm:py-24 bg-slate-50/70">
                    <div className="max-w-7xl mx-auto px-6 lg:px-10">
                        <div className="text-center mb-12">
                            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-blue-500 mb-3">
                                The Founders
                            </p>
                            <h2 className="text-3xl sm:text-4xl font-black text-[#003366] leading-tight">
                                Equal Vision.{" "}
                                <span style={{
                                    background: "linear-gradient(90deg,#2563EB,#06B6D4)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}>
                                    Shared Purpose.
                                </span>
                            </h2>
                            <p className="mt-3 text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
                                Two founders. Two disciplines. One unwavering mission — to bring world-class healthcare to every family in Jodhpur.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10">
                            {directors.map((d) => (
                                <DirectorCard key={d.id} d={d} />
                            ))}
                        </div>
                    </div>
                </section>

                {/* ── VISION SECTION ── */}
                <section className="py-20 sm:py-28 bg-white">
                    <div className="max-w-4xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.75 }}
                        >
                            <p className="text-[11px] font-black uppercase tracking-[0.28em] text-blue-500 mb-4">
                                Our Vision
                            </p>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003366] leading-tight mb-4">
                                We envision a Jodhpur where exceptional healthcare
                                {" "}is not a privilege,{" "}
                                <span style={{
                                    background: "linear-gradient(90deg,#2563EB,#06B6D4)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                }}>
                                    but a promise
                                </span>
                            </h2>
                            <p className="text-slate-500 text-base sm:text-lg mb-12">
                                Accessible to every family and delivered with
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {[
                                    {
                                        word: "Excellence",
                                        Icon: Star,
                                        color: "#D97706",
                                        bgCard: "#FFFBEB",
                                        border: "#FDE68A",
                                        desc: "Highest standards in medical care, technology, and outcomes — never settling for anything less than the best.",
                                    },
                                    {
                                        word: "Empathy",
                                        Icon: Heart,
                                        color: "#E11D48",
                                        bgCard: "#FFF1F2",
                                        border: "#FECDD3",
                                        desc: "Listening, understanding, and treating every patient as we would our own family — with warmth and dignity.",
                                    },
                                    {
                                        word: "Integrity",
                                        Icon: ShieldCheck,
                                        color: "#0891B2",
                                        bgCard: "#ECFEFF",
                                        border: "#A5F3FC",
                                        desc: "Transparent, honest, and ethical at every step — from diagnosis to discharge, every promise kept.",
                                    },
                                ].map(({ word, Icon, color, bgCard, border, desc }, i) => (
                                    <motion.div
                                        key={word}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: i * 0.12 }}
                                        className="rounded-3xl p-7 sm:p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border"
                                        style={{ background: bgCard, borderColor: border }}
                                    >
                                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-sm"
                                            style={{ background: `${color}18` }}>
                                            <Icon size={26} style={{ color }} />
                                        </div>
                                        <h3 className="text-2xl sm:text-3xl font-black mb-3" style={{ color }}>{word}</h3>
                                        <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── SHARED VISION QUOTE ── */}
                <section
                    className="relative py-20 sm:py-28 overflow-hidden"
                    style={{ background: "linear-gradient(145deg,#060C28 0%,#0A1640 60%,#0D2060 100%)" }}
                >
                    <div className="absolute inset-0 opacity-[0.06]"
                        style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "22px 22px" }} />
                    <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
                        style={{ background: "#E9A500" }} />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
                        style={{ background: "#06B6D4" }} />

                    <motion.div
                        className="relative max-w-3xl mx-auto px-6 text-center"
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75 }}
                    >
                        {/* Two founder avatars with connector */}
                        <div className="flex justify-center items-center gap-4 mb-10">
                            <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-lg font-black"
                                style={{ borderColor: `${d0.accent}60`, color: d0.accent, background: `${d0.accent}15` }}>
                                {d0.initials}
                            </div>
                            <div className="h-[2px] w-8 rounded-full"
                                style={{ background: "linear-gradient(to right,#E9A500,#06B6D4)" }} />
                            <div className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-lg font-black"
                                style={{ borderColor: `${d1.accent}60`, color: d1.accent, background: `${d1.accent}15` }}>
                                {d1.initials}
                            </div>
                        </div>

                        <div className="h-1 w-20 rounded-full mx-auto mb-10"
                            style={{ background: "linear-gradient(to right,#E9A500,#06B6D4)" }} />

                        <p className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-snug">
                            "Our shared vision is a Jodhpur where every family has access to healthcare
                            that rivals the best in India — delivered with warmth, precision, and dignity."
                        </p>

                        <p className="mt-8 text-white/40 text-xs font-bold uppercase tracking-[0.25em]">
                            Er. Navneet Agarwal &amp; Dr. Dhruva Sharma · Trinay Hospital
                        </p>

                        <div className="h-1 w-20 rounded-full mx-auto mt-10"
                            style={{ background: "linear-gradient(to right,#06B6D4,#E9A500)" }} />
                    </motion.div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default Leadership;
