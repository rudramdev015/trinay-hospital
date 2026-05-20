import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
    Award, GraduationCap, Building2, HeartPulse, Cpu,
    ChevronDown, ChevronUp, CheckCircle2, Star, Quote,
    Stethoscope, Lightbulb, TrendingUp, ShieldCheck
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

/* ─────────────────────────────────────────────────────────
   ANIMATED COUNTER
───────────────────────────────────────────────────────── */
const Counter = ({ value, suffix = "", duration = 1400 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.6 });
    const [count, setCount] = useState(0);
    const numericVal = parseInt(value, 10);
    const isNumeric = !isNaN(numericVal);

    useEffect(() => {
        if (!isInView || !isNumeric) return;
        let frameId;
        const start = performance.now();
        const run = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.round(eased * numericVal));
            if (p < 1) frameId = requestAnimationFrame(run);
        };
        frameId = requestAnimationFrame(run);
        return () => cancelAnimationFrame(frameId);
    }, [isInView, numericVal, duration, isNumeric]);

    return (
        <span ref={ref} className="tabular-nums">
            {isNumeric ? `${count}${suffix}` : value}
        </span>
    );
};

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const DIRECTORS = [
    {
        id: "navneet",
        name: "Er. Navneet Agarwal",
        shortName: "Er. Navneet Agarwal",
        role: "Founder & Director",
        roleTag: "FOUNDER · DIRECTOR",
        initials: "NA",
        photo: null,
        /* Gold-on-navy palette */
        portraitBg: "linear-gradient(145deg,#0A1628 0%,#0D2251 55%,#0F2D6B 100%)",
        goldAccent: "#E9A500",
        tagBg: "bg-amber-50",
        tagBorder: "border-amber-200",
        tagText: "text-amber-700",
        statColor: "#B45309",
        sectionBg: "#FFFDF7",
        quoteCardBg: "linear-gradient(135deg,#0A1628 0%,#112060 100%)",
        Icon: Cpu,
        tags: ["Edupreneur", "Healthpreneur", "Hospital Management", "Technology & Innovation"],
        degree: "B.E. (Electronics & Communication) · Mumbai University",
        message: "At Trinay Hospital, healthcare is not a business — it is a sacred calling. Every decision, every investment, every specialist we bring on board is guided by a single question: would we trust this for our own family? That unwavering standard is what sets Trinay apart, and what will define us for generations to come.",
        bio: `Er. Navneet Agarwal is a visionary Edupreneur and Healthpreneur with over two decades of expertise in shaping the healthcare landscape. Armed with a degree in Electronics & Communication Engineering from Mumbai University, he seamlessly integrates cutting-edge technology with healthcare innovation.

His exceptional leadership and strategic foresight have been pivotal in revolutionizing hospital management and operations. Known for delivering projects of the highest standard with precision and unwavering commitment, he has set a benchmark in the healthcare sector. His relentless pursuit of excellence continues to elevate industry standards, driving growth and innovation at every step.`,
        highlights: [
            { icon: TrendingUp,   text: "20+ years shaping India's healthcare sector" },
            { icon: Lightbulb,    text: "Pioneer in technology-integrated hospital management" },
            { icon: ShieldCheck,  text: "Led Trinay Hospital to NABH accreditation" },
            { icon: Building2,    text: "Built Jodhpur's most trusted multi-speciality institution" },
        ],
        stats: [
            { value: "20",  suffix: "+", label: "Years of Vision" },
            { value: "22",  suffix: "+", label: "Specialists" },
            { value: "15",  suffix: "+", label: "Departments" },
        ],
        reverse: false,
    },
    {
        id: "dhruva",
        name: "Dr. Dhruva Sharma",
        shortName: "Dr. Dhruva Sharma",
        role: "Director & Interventional Cardiologist",
        roleTag: "DIRECTOR · DM CARDIOLOGY",
        initials: "DS",
        photo: "/DOCTOR IAMGES/Dr. Dhruva Sharma.png",
        /* Cyan-on-dark palette */
        portraitBg: "linear-gradient(145deg,#0A1628 0%,#0C2340 55%,#0E3158 100%)",
        goldAccent: "#06B6D4",
        tagBg: "bg-cyan-50",
        tagBorder: "border-cyan-200",
        tagText: "text-cyan-700",
        statColor: "#0E7490",
        sectionBg: "#F7FBFF",
        quoteCardBg: "linear-gradient(135deg,#0A2342 0%,#0C3060 100%)",
        Icon: HeartPulse,
        tags: ["Interventional Cardiology", "Clinical Excellence", "Patient-Centric Care", "Fortis Trained"],
        degree: "DM Cardiology · Interventional Cardiology Specialist",
        message: "As a cardiologist, I have seen how minutes of expert intervention can be the difference between life and loss. My mission at Trinay Hospital is clear — no family in Jodhpur should travel to Delhi for world-class cardiac care. We bring that expertise here, with compassion at the heart of every decision.",
        bio: `Dr. Dhruva Sharma, a distinguished interventional cardiologist, stands at the helm of Trinay Hospital, Jodhpur, driving its mission to offer advanced healthcare solutions. With a prestigious DM degree in Cardiology and years of invaluable experience at Fortis Escorts, Delhi, Dr. Sharma combines medical excellence with a forward-thinking approach to healthcare.

His unwavering dedication to clinical innovation and patient-centric care has positioned Trinay Hospital as a leader in the region, ensuring that every patient receives world-class treatment with compassion and precision. Under his visionary leadership, the hospital continues to raise the bar in specialized medical services.`,
        highlights: [
            { icon: GraduationCap, text: "DM Cardiology — among Rajasthan's finest" },
            { icon: Stethoscope,   text: "Trained & practiced at Fortis Escorts, New Delhi" },
            { icon: HeartPulse,    text: "Pioneer of interventional cardiology in Jodhpur" },
            { icon: ShieldCheck,   text: "1,000+ successful cardiac interventions" },
        ],
        stats: [
            { value: "DM",     suffix: "", label: "Cardiology" },
            { value: "1000",   suffix: "+", label: "Interventions" },
            { value: "Fortis", suffix: "", label: "Trained At" },
        ],
        reverse: true,
    },
];

/* ─────────────────────────────────────────────────────────
   PORTRAIT PANEL
───────────────────────────────────────────────────────── */
const Portrait = ({ d }) => {
    const [failed, setFailed] = useState(false);

    return (
        <div className="relative w-full h-[70vw] min-h-[360px] md:h-full overflow-hidden">
            {d.photo && !failed ? (
                <>
                    <img
                        src={d.photo}
                        alt={d.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: "center 12%" }}
                        onError={() => setFailed(true)}
                    />
                    {/* Rich gradient overlays */}
                    <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top,rgba(6,18,52,0.92) 0%,rgba(6,18,52,0.3) 50%,rgba(6,18,52,0.1) 100%)" }} />
                    <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to right,rgba(6,18,52,0.5) 0%,transparent 70%)" }} />
                </>
            ) : (
                /* Premium initials portrait */
                <div className="absolute inset-0" style={{ background: d.portraitBg }}>
                    {/* Mesh dot grid */}
                    <div className="absolute inset-0 opacity-[0.07]"
                        style={{ backgroundImage: "radial-gradient(white 1.5px,transparent 1.5px)", backgroundSize: "30px 30px" }} />
                    {/* Diagonal lines */}
                    <div className="absolute inset-0 opacity-[0.04]"
                        style={{ backgroundImage: `repeating-linear-gradient(45deg,white 0px,white 1px,transparent 1px,transparent 40px)` }} />
                    {/* Concentric glow rings */}
                    {[160, 240, 320, 400].map((s) => (
                        <div key={s} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8"
                            style={{ width: s, height: s }} />
                    ))}
                    {/* Large background initials */}
                    <p className="absolute inset-0 flex items-center justify-center
                                  text-[28vw] md:text-[14vw] font-black select-none leading-none tracking-tighter"
                        style={{ color: `${d.goldAccent}12` }}>
                        {d.initials}
                    </p>
                    {/* Center circle avatar */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            {/* Outer glow ring */}
                            <div className="absolute -inset-3 rounded-full blur-xl opacity-30"
                                style={{ background: d.goldAccent }} />
                            <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 flex items-center justify-center"
                                style={{ background: `${d.goldAccent}18`, borderColor: `${d.goldAccent}50` }}>
                                <span className="text-5xl sm:text-6xl font-black select-none" style={{ color: d.goldAccent }}>
                                    {d.initials}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Bottom gradient */}
                    <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top,rgba(6,12,40,0.9) 0%,transparent 55%)" }} />
                </div>
            )}

            {/* Bottom overlay — name + role */}
            <div className="absolute bottom-0 inset-x-0 px-6 sm:px-8 pb-7 pt-20"
                style={{ background: "linear-gradient(to top,rgba(6,12,40,0.95) 0%,transparent 100%)" }}>
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-3 border"
                    style={{ background: `${d.goldAccent}20`, borderColor: `${d.goldAccent}40` }}>
                    <d.Icon size={11} style={{ color: d.goldAccent }} />
                    <span className="text-[10px] font-black uppercase tracking-[0.22em]"
                        style={{ color: d.goldAccent }}>{d.roleTag}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">{d.name}</h2>
                <p className="mt-1 text-white/50 text-sm font-medium">{d.role}</p>
            </div>

            {/* Top right number badge */}
            <div className="absolute top-5 right-5 flex items-center gap-1.5 rounded-full px-3 py-1.5 border border-white/15"
                style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)" }}>
                <Star size={10} fill="currentColor" className="text-amber-400" />
                <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">Director</span>
            </div>
        </div>
    );
};

/* ─────────────────────────────────────────────────────────
   DIRECTOR SECTION
───────────────────────────────────────────────────────── */
const DirectorSection = ({ d, idx }) => {
    const [expanded, setExpanded] = useState(false);
    const paras = d.bio.trim().split("\n\n");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.08 });

    return (
        <section
            ref={sectionRef}
            id={d.id}
            className="relative grid grid-cols-1 md:grid-cols-2 overflow-hidden"
            style={{ background: d.sectionBg }}
        >
            {/* Giant watermark number */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
                <span className="text-[35vw] font-black leading-none"
                    style={{ color: `${d.goldAccent}06` }}>
                    {String(idx + 1).padStart(2, "0")}
                </span>
            </div>

            {/* Portrait column */}
            <motion.div
                className={`relative md:min-h-[780px] ${d.reverse ? "md:order-last" : ""}`}
                initial={{ opacity: 0, x: d.reverse ? 60 : -60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
                <Portrait d={d} />
            </motion.div>

            {/* Content column */}
            <motion.div
                className={`relative z-10 flex flex-col justify-center px-6 py-14 sm:px-10 sm:py-18 lg:px-14 lg:py-20 ${d.reverse ? "md:order-first" : ""}`}
                initial={{ opacity: 0, x: d.reverse ? -60 : 60 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            >
                {/* Role badge */}
                <div className={`inline-flex items-center gap-2 ${d.tagBg} ${d.tagBorder} border
                                 ${d.tagText} text-[10px] font-black uppercase tracking-[0.2em]
                                 px-4 py-2 rounded-full w-fit mb-6`}>
                    <d.Icon size={11} />
                    {d.roleTag}
                </div>

                {/* Name */}
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-[1.05] mb-3">
                    {d.name}
                </h2>

                {/* Degree */}
                <p className="text-xs sm:text-sm font-semibold text-slate-400 mb-7 flex items-center gap-2">
                    <GraduationCap size={14} style={{ color: d.goldAccent }} />
                    {d.degree}
                </p>

                {/* ── Stats ── */}
                <div className="flex flex-wrap gap-8 mb-10">
                    {d.stats.map(({ value, suffix, label }) => (
                        <div key={label}>
                            <p className="text-3xl sm:text-4xl font-black leading-none"
                                style={{ color: d.statColor }}>
                                <Counter value={value} suffix={suffix} />
                            </p>
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">{label}</p>
                        </div>
                    ))}
                </div>

                {/* Accent bar */}
                <div className="h-1 w-16 rounded-full mb-8" style={{ background: `linear-gradient(to right,${d.goldAccent},${d.goldAccent}55)` }} />

                {/* ── Director's Message card ── */}
                <div className="relative rounded-3xl overflow-hidden mb-8 shadow-xl">
                    <div className="absolute inset-0" style={{ background: d.quoteCardBg }} />
                    {/* Dot texture */}
                    <div className="absolute inset-0 opacity-[0.06]"
                        style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "18px 18px" }} />
                    {/* Gold corner glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl"
                        style={{ background: `${d.goldAccent}30` }} />
                    <div className="relative p-6 sm:p-8">
                        <Quote size={28} className="mb-4" style={{ color: d.goldAccent, opacity: 0.6 }} />
                        <p className="text-white/90 text-base sm:text-lg leading-relaxed font-semibold italic">
                            "{d.message}"
                        </p>
                        <div className="mt-5 flex items-center gap-3">
                            <div className="h-px flex-1" style={{ background: `${d.goldAccent}40` }} />
                            <p className="text-xs font-black uppercase tracking-widest" style={{ color: d.goldAccent }}>
                                {d.shortName}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── Bio ── */}
                <div className="mb-7">
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{paras[0]}</p>
                    <AnimatePresence initial={false}>
                        {expanded && (
                            <motion.div
                                key="rest"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                            >
                                {paras.slice(1).map((p, i) => (
                                    <p key={i} className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">{p}</p>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    {paras.length > 1 && (
                        <button
                            onClick={() => setExpanded(s => !s)}
                            className="mt-3 inline-flex items-center gap-1.5 text-xs font-black hover:opacity-70 transition-opacity"
                            style={{ color: d.goldAccent }}
                        >
                            {expanded ? <><ChevronUp size={13} /> Show Less</> : <><ChevronDown size={13} /> Read Full Bio</>}
                        </button>
                    )}
                </div>

                {/* ── Highlights ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {d.highlights.map(({ icon: HIcon, text }) => (
                        <div key={text}
                            className="flex items-start gap-3 bg-white rounded-2xl border border-slate-100 px-4 py-3 shadow-sm">
                            <div className="w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                                style={{ background: `${d.goldAccent}15` }}>
                                <HIcon size={14} style={{ color: d.goldAccent }} />
                            </div>
                            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-snug">{text}</p>
                        </div>
                    ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {d.tags.map((t) => (
                        <span key={t} className={`text-[11px] font-bold ${d.tagBg} ${d.tagBorder} ${d.tagText} border rounded-full px-3 py-1`}>{t}</span>
                    ))}
                </div>

                {/* Footer bar */}
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0"
                        style={{ background: `${d.goldAccent}15` }}>
                        <Building2 size={17} style={{ color: d.goldAccent }} />
                    </div>
                    <div>
                        <p className="text-sm font-black text-slate-800">Trinay Hospital Pvt. Ltd., Jodhpur</p>
                        <p className="text-xs text-slate-400 font-medium">Opp. Chopasni Garden · PF Office Road · 342008</p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

/* ─────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────── */
const Leadership = () => (
    <div className="min-h-screen bg-white">
        <Navbar />

        <main>

            {/* ── HERO ──────────────────────────────────── */}
            <section className="relative overflow-hidden pt-32 pb-28 sm:pt-40 sm:pb-36"
                style={{ background: "linear-gradient(145deg,#060C28 0%,#0A1640 50%,#0D2060 100%)" }}>

                {/* Animated mesh background */}
                <div className="absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="absolute inset-0 opacity-[0.04]"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg,white,white 1px,transparent 1px,transparent 50px)" }} />

                {/* Glow spheres */}
                <div className="absolute -top-48 -left-48 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
                    style={{ background: "radial-gradient(circle,#E9A50040,transparent 70%)" }} />
                <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15 pointer-events-none"
                    style={{ background: "radial-gradient(circle,#06B6D440,transparent 70%)" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 pointer-events-none"
                    style={{ background: "radial-gradient(circle,#818CF8,transparent 70%)" }} />

                {/* "LEADERS" giant watermark */}
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
                        {/* Eyebrow */}
                        <div className="inline-flex items-center gap-2.5 bg-white/8 border border-white/15 backdrop-blur-md
                                        text-amber-400 text-[10px] font-black uppercase tracking-[0.3em]
                                        px-5 py-2.5 rounded-full mb-8">
                            <Award size={11} />
                            Trinay Hospital · Visionary Leadership
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[0.95] tracking-tight">
                            Meet the{" "}
                            <br />
                            <span style={{
                                background: "linear-gradient(90deg,#E9A500 0%,#FCD34D 40%,#06B6D4 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent"
                            }}>
                                Visionaries
                            </span>
                        </h1>

                        <p className="mt-7 text-white/55 text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto">
                            The minds and hearts behind Jodhpur's most trusted multi-speciality hospital —
                            uniting engineering precision, medical excellence, and an unshakeable commitment to care.
                        </p>

                        {/* Director anchor cards */}
                        <div className="mt-12 flex flex-wrap justify-center gap-4">
                            {DIRECTORS.map((d) => (
                                <a key={d.id} href={`#${d.id}`}
                                    className="group flex items-center gap-4 rounded-2xl border px-5 py-3.5 hover:scale-[1.03] transition-all duration-300"
                                    style={{
                                        background: "rgba(255,255,255,0.06)",
                                        borderColor: `${d.goldAccent}35`,
                                        backdropFilter: "blur(10px)"
                                    }}>
                                    {/* Avatar */}
                                    <div className="w-11 h-11 rounded-full border-2 flex items-center justify-center text-base font-black shrink-0"
                                        style={{ borderColor: `${d.goldAccent}60`, color: d.goldAccent, background: `${d.goldAccent}15` }}>
                                        {d.initials}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-white text-sm font-black leading-none">{d.name}</p>
                                        <p className="text-white/40 text-[11px] font-semibold mt-1">{d.role}</p>
                                    </div>
                                    <div className="w-5 h-5 rounded-full flex items-center justify-center ml-2 shrink-0"
                                        style={{ background: `${d.goldAccent}20` }}>
                                        <ChevronDown size={11} style={{ color: d.goldAccent }} />
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Scroll hint */}
                        <motion.div
                            className="mt-12 flex flex-col items-center gap-2 opacity-40"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                        >
                            <div className="w-px h-10 bg-linear-to-b from-transparent via-white to-transparent" />
                            <ChevronDown size={16} className="text-white" />
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ── DIRECTORS ─────────────────────────────── */}
            {DIRECTORS.map((d, i) => (
                <DirectorSection key={d.id} d={d} idx={i} />
            ))}

            {/* ── SHARED VISION QUOTE ───────────────────── */}
            <section className="relative py-20 sm:py-28 overflow-hidden"
                style={{ background: "linear-gradient(145deg,#060C28 0%,#0A1640 60%,#0D2060 100%)" }}>

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
                    transition={{ duration: 0.75 }}
                    viewport={{ once: true }}
                >
                    {/* Two avatars */}
                    <div className="flex justify-center gap-3 mb-10">
                        {DIRECTORS.map((d) => (
                            <div key={d.id} className="w-14 h-14 rounded-full border-2 flex items-center justify-center text-lg font-black"
                                style={{ borderColor: `${d.goldAccent}60`, color: d.goldAccent, background: `${d.goldAccent}15` }}>
                                {d.initials}
                            </div>
                        ))}
                    </div>

                    {/* Gold-to-cyan gradient line */}
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

export default Leadership;
