import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft, Calendar, Clock, Award, GraduationCap,
    Star, Phone, CheckCircle2, ChevronRight,
    MapPin, Languages, Users, Stethoscope, BadgeCheck, Loader2,
} from "lucide-react";
import { findDoctor, DOCTORS } from "../data/doctorsData";
import { buildApiUrl } from "../utils/api";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

/* ── animation presets ── */
const fadeUp   = (delay = 0) => ({ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] } } });
const fadeIn   = (delay = 0) => ({ hidden: { opacity: 0 },        visible: { opacity: 1,      transition: { duration: 0.45, delay } } });
const slideLeft= (delay = 0) => ({ hidden: { opacity: 0, x: -20 },visible: { opacity: 1, x: 0,transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } } });

const TRINAY_G = "from-[#003366] via-[#004d80] to-[#006fa3]";

/* ── tiny star row ── */
const Stars = ({ n = 5 }) => (
    <div className="flex gap-0.5">
        {Array.from({ length: n }).map((_, i) => (
            <Star key={i} size={13} fill="#FBBF24" className="text-amber-400" />
        ))}
    </div>
);

/* ── section card ── */
const Section = ({ title, children, delay = 0 }) => (
    <motion.div
        variants={fadeUp(delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-7"
    >
        <h3 className="text-lg sm:text-xl font-black text-[#003366] mb-5 flex items-center gap-2.5">
            <span className="w-1 h-6 rounded-full bg-linear-to-b from-[#003366] to-[#006fa3] shrink-0" />
            {title}
        </h3>
        {children}
    </motion.div>
);

/* ── normalize dynamic doctor from API to static shape ── */
const FEMALE_SET = ["RASHMI","PRIYANKA","PUSHPA","POOJA","KULDEEP","JAISHREE","RITU","CHITRA","VIDHI","METALI","SHALINI"];

const normalizeDynamic = (d) => {
    const isFemale = FEMALE_SET.some((n) => d.name.toUpperCase().includes(n));
    const nameTitled = d.name.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    const slug = nameTitled.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return {
        ...d,
        id: d._id,
        nameTitled,
        slug,
        isFemale,
        isSenior: (d.designation || "").includes("SR."),
        avatar: d.photo ? (d.photo.startsWith("data:") || d.photo.startsWith("http") ? d.photo : buildApiUrl(d.photo)) : null,
        days: "Mon – Sat",
        languages: ["Hindi", "English", "Rajasthani"],
        color: "blue",
        gradient: "from-blue-600 to-blue-800",
        deptDisplay: d.dept.charAt(0).toUpperCase() + d.dept.slice(1).toLowerCase(),
        patients: `${(d.experience || 1) * 500}+`,
        education: [],
        achievements: Array.isArray(d.achievements) ? d.achievements : [],
        expertise: Array.isArray(d.expertise) ? d.expertise : [],
        bio: d.bio || `${nameTitled} is a specialist in ${d.dept.charAt(0).toUpperCase() + d.dept.slice(1).toLowerCase()} with ${d.experience}+ years of experience at Trinay Hospital, Jodhpur.`,
        camp: d.camp || null,
    };
};

/* ─────────────────────────────────────────────────────────────────────────── */
const DoctorDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [doc, setDoc]         = useState(() => findDoctor(id) || null);
    const [loading, setLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        if (doc) return;
        setLoading(true);
        const isMongoId = /^[0-9a-f]{24}$/i.test(id);
        const url = isMongoId
            ? buildApiUrl(`/api/doctors/dynamic/${id}`)
            : buildApiUrl(`/api/doctors/dynamic/by-slug/${id}`);
        fetch(url)
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                if (data?.success && data.doctor) setDoc(normalizeDynamic(data.doctor));
                else setNotFound(true);
            })
            .catch(() => setNotFound(true))
            .finally(() => setLoading(false));
    }, [id]);

    /* loading */
    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
            <Loader2 size={48} className="text-blue-500 animate-spin" />
            <p className="text-slate-500 font-semibold">Loading doctor profile…</p>
        </div>
    );

    /* not found */
    if (notFound || !doc) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-6 px-4">
            <Stethoscope size={64} className="text-slate-200" />
            <h1 className="text-3xl font-black text-slate-700">Doctor not found</h1>
            <Link to="/doctors" className="bg-[#003366] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all">
                ← Back to Doctors
            </Link>
        </div>
    );

    const related = DOCTORS.filter((d) => d.dept === doc.dept && d.id !== doc.id).slice(0, 3);
    const initials = (doc.nameTitled || "").split(" ").filter((w) => /^[A-Za-z]/.test(w)).slice(0, 2).map((w) => w[0]).join("");

    return (
        <div className="min-h-screen bg-[#f5f9ff] font-sans">
            <Navbar />

            {/* ═══ HERO ══════════════════════════════════════════════ */}
            {/*
                pt-32 sm:pt-36 clears the top-bar (~36px) + main navbar (~72px)
                so no content ever hides behind the navbar on any screen size.
            */}
            <section className="relative pt-36 sm:pt-40 md:pt-44 lg:pt-48 pb-16 sm:pb-20 overflow-hidden bg-linear-to-br from-[#003366] via-[#004d80] to-[#005f8e]">
                {/* Texture */}
                <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:24px_24px]" />
                {/* Glow blobs */}
                <div className="absolute top-8 right-0 w-80 h-80 rounded-full bg-white/8 blur-[90px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-96 h-64 rounded-full bg-black/15 blur-[80px] pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                    {/* Back button — inline in document flow, not absolute */}
                    <motion.button
                        onClick={() => navigate(-1)}
                        variants={fadeIn(0)}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-semibold transition-colors mb-8"
                    >
                        <ArrowLeft size={16} /> Back to Doctors
                    </motion.button>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] xl:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-end">
                        {/* LEFT — text */}
                        <div>
                            {/* Mobile: tiny avatar + dept badge row */}
                            <motion.div variants={slideLeft(0.1)} initial="hidden" animate="visible"
                                className="flex items-center gap-3 mb-5 flex-wrap">
                                {/* Mobile avatar circle */}
                                <div className="lg:hidden w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-white/30 bg-white/10 shrink-0 flex items-center justify-center">
                                    {doc.avatar
                                        ? <img src={doc.avatar} alt={doc.nameTitled} className="w-full h-full object-cover" style={{ objectPosition: "center 10%" }} />
                                        : <span className="text-xl font-black text-white/70">{initials}</span>
                                    }
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm">
                                        <Stethoscope size={11} /> {doc.deptDisplay}
                                    </span>
                                    {doc.isSenior && (
                                        <span className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                                            <Award size={11} /> Senior
                                        </span>
                                    )}
                                </div>
                            </motion.div>

                            {/* Name */}
                            <motion.h1 variants={fadeUp(0.15)} initial="hidden" animate="visible"
                                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-white leading-[1.1] tracking-tight">
                                {doc.nameTitled}
                            </motion.h1>

                            {/* Qualification */}
                            <motion.p variants={fadeUp(0.22)} initial="hidden" animate="visible"
                                className="mt-3 text-base sm:text-lg text-white/70 font-medium">
                                {doc.qualification}
                            </motion.p>

                            {/* Stats row */}
                            <motion.div variants={fadeUp(0.3)} initial="hidden" animate="visible"
                                className="mt-7 flex flex-wrap gap-3 sm:gap-4">
                                {[
                                    { label: "Experience", value: `${doc.experience}+ Years` },
                                    { label: "OPD Days",   value: doc.days },
                                ].filter(({ value }) => value).map(({ label, value }) => (
                                    <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 sm:px-5 py-3.5">
                                        <p className="text-white/55 text-[10px] font-semibold uppercase tracking-wider">{label}</p>
                                        <p className="text-white text-base sm:text-lg font-black mt-0.5">{value}</p>
                                    </div>
                                ))}
                            </motion.div>

                            {/* CTA buttons */}
                            <motion.div variants={fadeUp(0.38)} initial="hidden" animate="visible"
                                className="mt-7 flex flex-wrap gap-3">
                                <Link
                                    to={`/appointment?doctor=${encodeURIComponent(doc.nameTitled)}&dept=${encodeURIComponent(doc.dept)}`}
                                    className="inline-flex items-center gap-2 bg-white text-[#003366] font-black px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                                >
                                    <Calendar size={16} /> Book Appointment
                                </Link>
                                <a
                                    href="tel:+919119191622"
                                    className="inline-flex items-center gap-2 bg-white/12 border border-white/30 text-white font-bold px-6 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
                                >
                                    <Phone size={16} /> Call Now
                                </a>
                            </motion.div>
                        </div>

                        {/* RIGHT — photo */}
                        <motion.div
                            variants={fadeIn(0.3)}
                            initial="hidden"
                            animate="visible"
                            className="hidden lg:flex items-end justify-center"
                        >
                            <div className="relative w-72 xl:w-80">
                                {/* Glow behind photo */}
                                <div className="absolute inset-x-4 bottom-0 h-3/4 rounded-t-[2.5rem] bg-white/15 backdrop-blur-md border border-white/20 shadow-2xl" />
                                {/* Decorative ring */}
                                <div className="absolute -inset-3 rounded-t-[3rem] bg-linear-to-t from-white/5 to-transparent pointer-events-none" />
                                {doc.avatar ? (
                                    <img
                                        src={doc.avatar}
                                        alt={doc.nameTitled}
                                        className="relative w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.4)] max-h-96 xl:max-h-105"
                                        style={{ objectPosition: "center top" }}
                                    />
                                ) : (
                                    <div className="relative w-full h-80 xl:h-96 flex items-center justify-center">
                                        <span className="text-[8rem] font-black text-white/20 select-none">{initials}</span>
                                    </div>
                                )}
                                {/* Rating badge */}
                                <div className="absolute top-4 -left-4 bg-white rounded-2xl shadow-xl px-3 py-2 flex items-center gap-2">
                                    <Star size={14} fill="#FBBF24" className="text-amber-400" />
                                    <span className="text-[#003366] font-black text-sm">Top Rated</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* White curve cut at bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-16 bg-[#f5f9ff] rounded-t-[2rem] sm:rounded-t-[2.5rem]" />
            </section>

            {/* ═══ BODY ══════════════════════════════════════════════ */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-6 sm:pt-8 pb-32 lg:pb-20 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 lg:gap-8">

                {/* LEFT COLUMN */}
                <div className="space-y-5 sm:space-y-6">

                    {/* Quick info pills */}
                    <motion.div variants={fadeUp(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="flex flex-wrap gap-2 sm:gap-3">
                        {[
                            { Icon: Clock,     text: `OPD: ${doc.timing}` },
                            { Icon: MapPin,    text: "Trinay Hospital, Jodhpur" },
                            { Icon: Languages, text: (doc.languages || []).join(", ") },
                            { Icon: BadgeCheck,text: "NABH Accredited" },
                        ].map(({ Icon, text }) => (
                            <span key={text} className="flex items-center gap-1.5 sm:gap-2 bg-white border border-slate-100 shadow-sm text-slate-600 text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 sm:py-2.5 rounded-full">
                                <Icon size={13} className="text-blue-500 shrink-0" /> {text}
                            </span>
                        ))}
                    </motion.div>

                    {/* About */}
                    <Section title="About the Doctor" delay={0.05}>
                        <p className="text-slate-600 leading-relaxed text-sm sm:text-[15px]">{doc.bio}</p>
                        <div className="mt-5 grid grid-cols-3 gap-3 sm:gap-4">
                            {[
                                { Icon: Users, label: "Patients",   value: doc.patients },
                                { Icon: Award, label: "Experience", value: `${doc.experience}+ Yrs` },
                                { Icon: Star,  label: "Rating",     value: "4.9 / 5.0" },
                            ].map(({ Icon, label, value }) => (
                                <div key={label} className="rounded-2xl bg-blue-50 border border-blue-100 p-3 sm:p-4 text-center">
                                    <Icon size={20} className="text-blue-500 mx-auto mb-1.5 sm:mb-2" />
                                    <p className="text-lg sm:text-xl font-black text-[#003366]">{value}</p>
                                    <p className="text-[10px] sm:text-xs text-slate-400 font-semibold mt-0.5">{label}</p>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Expertise */}
                    {doc.expertise?.length > 0 && (
                        <Section title="Areas of Expertise" delay={0.1}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                                {doc.expertise.map((exp) => (
                                    <div key={exp} className="flex items-center gap-3 bg-slate-50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3">
                                        <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                                        <span className="text-sm text-slate-700 font-medium">{exp}</span>
                                    </div>
                                ))}
                            </div>
                        </Section>
                    )}

                    {/* Education */}
                    {doc.education?.length > 0 && (
                        <Section title="Education & Qualifications" delay={0.15}>
                            <ol className="relative border-l-2 border-blue-100 space-y-5 sm:space-y-6 ml-2">
                                {doc.education.map((edu, i) => (
                                    <motion.li key={i} variants={slideLeft(i * 0.07)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                                        className="pl-5 sm:pl-6 relative">
                                        <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-linear-to-br ${TRINAY_G} ring-2 ring-white shadow`} />
                                        <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">{edu.year}</p>
                                        <p className="text-sm sm:text-base font-black text-[#003366] mt-0.5">{edu.degree}</p>
                                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{edu.college}</p>
                                    </motion.li>
                                ))}
                            </ol>
                        </Section>
                    )}

                    {/* Achievements */}
                    {doc.achievements?.length > 0 && (
                        <Section title="Awards & Recognition" delay={0.2}>
                            <ul className="space-y-3">
                                {doc.achievements.map((ach) => (
                                    <li key={ach} className="flex items-start gap-3 text-sm text-slate-600">
                                        <Award size={15} className="text-amber-400 shrink-0 mt-0.5" />
                                        {ach}
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    {/* OPD Schedule */}
                    <Section title="OPD Schedule" delay={0.25}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                            {[
                                { label: "Days",    value: doc.days },
                                { label: "Timings", value: doc.timing },
                            ].map(({ label, value }) => (
                                <div key={label} className="rounded-2xl bg-blue-50 border border-blue-100 p-4 sm:p-5">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                                    <p className="text-base sm:text-lg font-black text-[#003366]">{value}</p>
                                </div>
                            ))}
                        </div>
                        {doc.camp && (
                            <div className="mt-3 flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-2xl p-4">
                                <MapPin size={15} className="text-orange-500 shrink-0 mt-0.5" />
                                <p className="text-sm font-bold text-orange-700">{doc.camp}</p>
                            </div>
                        )}
                    </Section>

                </div>

                {/* RIGHT COLUMN — sticky booking */}
                <div className="space-y-5 sm:space-y-6">
                    <div className="sticky top-32 space-y-5 sm:space-y-6">

                        {/* Booking card */}
                        <motion.div
                            variants={fadeUp(0.2)}
                            initial="hidden"
                            animate="visible"
                            className={`rounded-3xl bg-linear-to-br ${TRINAY_G} p-5 sm:p-6 shadow-2xl text-white overflow-hidden relative`}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-3xl pointer-events-none" />
                            <div className="relative">
                                {/* Mini doctor header in booking card */}
                                <div className="flex items-center gap-3 mb-4">
                                    {doc.avatar ? (
                                        <img src={doc.avatar} alt="" className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 border-white/30 object-cover"
                                            style={{ objectPosition: "center 10%" }} />
                                    ) : (
                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 border-white/30 bg-white/10 flex items-center justify-center">
                                            <Stethoscope size={22} className="text-white/60" />
                                        </div>
                                    )}
                                    <div>
                                        <p className="font-black text-sm leading-tight">{doc.nameTitled}</p>
                                        <p className="text-white/65 text-xs">{doc.deptDisplay}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-5 text-sm">
                                    {[
                                        { label: "Next Available",    value: "Tomorrow" },
                                        { label: "Consultation Fee",  value: "₹500 – ₹800" },
                                        { label: "Mode",              value: "In-Person" },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="flex justify-between">
                                            <span className="text-white/60">{label}</span>
                                            <span className="font-bold">{value}</span>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to={`/appointment?doctor=${encodeURIComponent(doc.nameTitled)}&dept=${encodeURIComponent(doc.dept)}`}
                                    className="block w-full text-center bg-white text-[#003366] font-black py-3.5 rounded-2xl text-sm transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
                                >
                                    Book Appointment Now
                                </Link>
                                <a
                                    href="tel:+919119191622"
                                    className="mt-3 flex items-center justify-center gap-2 w-full bg-white/12 border border-white/30 text-white font-bold py-3 rounded-2xl text-sm transition-all hover:bg-white/20"
                                >
                                    <Phone size={14} /> Call for Appointment
                                </a>
                            </div>
                        </motion.div>

                        {/* Hospital info card */}
                        <motion.div
                            variants={fadeUp(0.3)}
                            initial="hidden"
                            animate="visible"
                            className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6"
                        >
                            <h4 className="font-black text-[#003366] mb-4 text-sm sm:text-base">Hospital Details</h4>
                            <ul className="space-y-3 text-sm text-slate-600">
                                {[
                                    { Icon: MapPin, text: "Opp. Chopasni Garden, PF Office Road, Jodhpur 342008" },
                                    { Icon: Phone,  text: "+91 91191 91622", href: "tel:+919119191622" },
                                    { Icon: Clock,  text: "Emergency: Open 24/7" },
                                ].map(({ Icon, text, href }) => (
                                    <li key={text} className="flex items-start gap-3">
                                        <Icon size={15} className="text-blue-500 shrink-0 mt-0.5" />
                                        {href ? <a href={href} className="hover:text-blue-600 transition-colors">{text}</a> : <span>{text}</span>}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Related specialists */}
                        {related.length > 0 && (
                            <motion.div
                                variants={fadeUp(0.4)}
                                initial="hidden"
                                animate="visible"
                                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6"
                            >
                                <h4 className="font-black text-[#003366] mb-4 text-sm sm:text-base">Related Specialists</h4>
                                <div className="space-y-2.5">
                                    {related.map((rd) => (
                                        <Link key={rd.id} to={`/doctors/${rd.slug}`}
                                            className="flex items-center gap-3 p-2.5 sm:p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                                            <img
                                                src={rd.avatar}
                                                alt=""
                                                loading="lazy"
                                                className="w-10 h-10 rounded-xl object-cover border border-slate-100 shrink-0"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{rd.nameTitled}</p>
                                                <p className="text-xs text-slate-400 truncate">{rd.deptDisplay}</p>
                                            </div>
                                            <ChevronRight size={15} className="text-slate-300 group-hover:text-blue-500 shrink-0 transition-colors" />
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══ MOBILE STICKY BOTTOM BAR ══════════════════════════ */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-2xl px-4 py-3 flex gap-3">
                <a
                    href="tel:+919119191622"
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold py-3 rounded-2xl text-sm"
                >
                    <Phone size={15} /> Call
                </a>
                <Link
                    to={`/appointment?doctor=${encodeURIComponent(doc.nameTitled)}&dept=${encodeURIComponent(doc.dept)}`}
                    className={`flex-[2] flex items-center justify-center gap-2 bg-linear-to-r ${TRINAY_G} text-white font-black py-3 rounded-2xl text-sm`}
                >
                    <Calendar size={15} /> Book Appointment
                </Link>
            </div>

            <Footer />
        </div>
    );
};

export default DoctorDetail;
