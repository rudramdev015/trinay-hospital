import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowLeft, Calendar, Clock, Award, GraduationCap,
    Star, Phone, CheckCircle2, ChevronRight,
    MapPin, Languages, Users, Stethoscope, BadgeCheck,
} from "lucide-react";
import { findDoctor, DOCTORS } from "../data/doctorsData";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

/* ── animation presets ── */
const fadeUp   = (delay = 0) => ({ hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } } });
const fadeIn   = (delay = 0) => ({ hidden: { opacity: 0 },        visible: { opacity: 1,      transition: { duration: 0.5,  delay } } });
const slideLeft= (delay = 0) => ({ hidden: { opacity: 0, x: -24 },visible: { opacity: 1, x: 0,transition: { duration: 0.6,  delay, ease: [0.22, 1, 0.36, 1] } } });

/* ── tiny star row ── */
const Stars = ({ n = 5 }) => (
    <div className="flex gap-0.5">
        {Array.from({ length: n }).map((_, i) => (
            <Star key={i} size={14} fill="#FBBF24" className="text-amber-400" />
        ))}
    </div>
);

/* ── section wrapper ── */
const Section = ({ title, children, delay = 0 }) => (
    <motion.div
        variants={fadeUp(delay)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 md:p-8"
    >
        <h3 className="text-xl font-black text-[#003366] mb-5 flex items-center gap-2">
            <span className="w-1 h-6 rounded-full bg-linear-to-b from-blue-500 to-cyan-400 inline-block" />
            {title}
        </h3>
        {children}
    </motion.div>
);

/* ─────────────────────────────────────────────────────────────────────────── */
const DoctorDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const doc = findDoctor(id);

    if (!doc) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-6 px-4">
                <Stethoscope size={64} className="text-slate-200" />
                <h1 className="text-3xl font-black text-slate-700">Doctor not found</h1>
                <Link to="/doctors" className="bg-[#003366] text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all">
                    ← Back to Doctors
                </Link>
            </div>
        );
    }

    /* Related doctors — same dept, different id, max 3 */
    const related = DOCTORS.filter((d) => d.dept === doc.dept && d.id !== doc.id).slice(0, 3);

    return (
        <div className="min-h-screen bg-[#f5f9ff] font-sans">
            <Navbar />

            {/* ── HERO ──────────────────────────────────────────────── */}
            <section className={`relative pt-24 pb-0 overflow-hidden bg-linear-to-br ${doc.gradient} min-h-[60vh] flex items-end`}>
                {/* Dot-grid texture */}
                <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:26px_26px]" />
                {/* Glow blobs */}
                <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/10 blur-[80px]" />
                <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-black/20 blur-[100px]" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full">
                    {/* Back button */}
                    <motion.button
                        onClick={() => navigate(-1)}
                        variants={fadeIn(0)}
                        initial="hidden"
                        animate="visible"
                        className="absolute top-6 left-6 lg:left-10 flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold transition-colors"
                    >
                        <ArrowLeft size={18} /> Back
                    </motion.button>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end pb-0">
                        {/* Left — text */}
                        <div className="pb-10 lg:pb-14">
                            {/* Dept badge */}
                            <motion.div variants={slideLeft(0.1)} initial="hidden" animate="visible" className="flex flex-wrap gap-2 mb-5">
                                <span className="inline-flex items-center gap-1.5 bg-white/15 border border-white/25 text-white text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full backdrop-blur-sm">
                                    <Stethoscope size={12} /> {doc.deptDisplay}
                                </span>
                                {doc.isSenior && (
                                    <span className="inline-flex items-center gap-1.5 bg-amber-400/20 border border-amber-300/30 text-amber-200 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full">
                                        <Award size={12} /> Senior Consultant
                                    </span>
                                )}
                            </motion.div>

                            <motion.h1 variants={fadeUp(0.2)} initial="hidden" animate="visible"
                                className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight">
                                {doc.nameTitled}
                            </motion.h1>
                            <motion.p variants={fadeUp(0.3)} initial="hidden" animate="visible"
                                className="mt-3 text-lg text-white/75 font-medium">{doc.qualification}</motion.p>

                            {/* Key stats row */}
                            <motion.div variants={fadeUp(0.4)} initial="hidden" animate="visible"
                                className="mt-8 flex flex-wrap gap-6">
                                {[
                                    { label: "Experience", value: `${doc.experience}+ Years` },
                                    { label: "Patients Served", value: doc.patients },
                                    { label: "OPD Days", value: doc.days },
                                ].map(({ label, value }) => (
                                    <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-5 py-4 min-w-[120px]">
                                        <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">{label}</p>
                                        <p className="text-white text-lg font-black mt-0.5">{value}</p>
                                    </div>
                                ))}
                            </motion.div>

                            {/* CTA row */}
                            <motion.div variants={fadeUp(0.5)} initial="hidden" animate="visible"
                                className="mt-8 flex flex-wrap gap-3">
                                <Link
                                    to={`/appointment?doctor=${encodeURIComponent(doc.nameTitled)}&dept=${encodeURIComponent(doc.dept)}`}
                                    className="inline-flex items-center gap-2 bg-white text-[#003366] font-black px-7 py-3.5 rounded-full text-sm transition-all hover:scale-105 hover:shadow-xl active:scale-95"
                                >
                                    <Calendar size={17} /> Book Appointment
                                </Link>
                                <a
                                    href="tel:+919119191622"
                                    className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-bold px-7 py-3.5 rounded-full text-sm transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
                                >
                                    <Phone size={17} /> Call Now
                                </a>
                            </motion.div>
                        </div>

                        {/* Right — photo */}
                        <motion.div
                            variants={fadeIn(0.3)}
                            initial="hidden"
                            animate="visible"
                            className="hidden lg:flex items-end justify-center"
                        >
                            <div className="relative w-64 xl:w-72">
                                <div className="absolute inset-x-0 bottom-0 h-3/4 rounded-t-[2rem] bg-white/10 backdrop-blur-sm" />
                                <img
                                    src={doc.avatar}
                                    alt={doc.nameTitled}
                                    className="relative w-full object-contain drop-shadow-2xl"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* White wave cut */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-[#f5f9ff] rounded-t-[2.5rem]" />
            </section>

            {/* ── BODY ───────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-8 pb-20 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

                {/* LEFT COLUMN */}
                <div className="space-y-6">

                    {/* Quick info pills */}
                    <motion.div variants={fadeUp(0)} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        className="flex flex-wrap gap-3">
                        {[
                            { Icon: Clock,     text: `OPD: ${doc.timing}` },
                            { Icon: MapPin,    text: "Trinay Hospital, Jodhpur" },
                            { Icon: Languages, text: doc.languages.join(", ") },
                            { Icon: BadgeCheck,text: "NABH Accredited Hospital" },
                        ].map(({ Icon, text }) => (
                            <span key={text} className="flex items-center gap-2 bg-white border border-slate-100 shadow-sm text-slate-600 text-sm font-medium px-4 py-2.5 rounded-full">
                                <Icon size={14} className="text-blue-500 shrink-0" /> {text}
                            </span>
                        ))}
                    </motion.div>

                    {/* About */}
                    <Section title="About the Doctor" delay={0.05}>
                        <p className="text-slate-600 leading-relaxed text-[15px]">{doc.bio}</p>
                        <div className="mt-5 grid grid-cols-3 gap-4">
                            {[
                                { Icon: Users, label: "Patients",    value: doc.patients },
                                { Icon: Award, label: "Experience",  value: `${doc.experience}+ Yrs` },
                                { Icon: Star,  label: "Rating",      value: "4.9 / 5.0" },
                            ].map(({ Icon, label, value }) => (
                                <div key={label} className={`rounded-2xl bg-${doc.color}-50 border border-${doc.color}-100 p-4 text-center`}>
                                    <Icon size={22} className={`text-${doc.color}-500 mx-auto mb-2`} />
                                    <p className="text-xl font-black text-[#003366]">{value}</p>
                                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{label}</p>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Expertise */}
                    <Section title="Areas of Expertise" delay={0.1}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {doc.expertise.map((exp) => (
                                <div key={exp} className="flex items-center gap-3 bg-slate-50 rounded-xl px-4 py-3">
                                    <CheckCircle2 size={16} className="text-blue-500 shrink-0" />
                                    <span className="text-sm text-slate-700 font-medium">{exp}</span>
                                </div>
                            ))}
                        </div>
                    </Section>

                    {/* Education */}
                    <Section title="Education & Qualifications" delay={0.15}>
                        <ol className="relative border-l-2 border-blue-100 space-y-6 ml-2">
                            {doc.education.map((edu, i) => (
                                <motion.li
                                    key={i}
                                    variants={slideLeft(i * 0.08)}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="pl-6 relative"
                                >
                                    <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-linear-to-br ${doc.gradient} ring-2 ring-white shadow`} />
                                    <p className="text-xs font-bold text-blue-500 uppercase tracking-widest">{edu.year}</p>
                                    <p className="text-base font-black text-[#003366] mt-0.5">{edu.degree}</p>
                                    <p className="text-sm text-slate-500 mt-0.5">{edu.college}</p>
                                </motion.li>
                            ))}
                        </ol>
                    </Section>

                    {/* Achievements */}
                    {doc.achievements?.length > 0 && (
                        <Section title="Awards & Recognition" delay={0.2}>
                            <ul className="space-y-3">
                                {doc.achievements.map((ach) => (
                                    <li key={ach} className="flex items-start gap-3 text-sm text-slate-600">
                                        <Award size={16} className="text-amber-400 shrink-0 mt-0.5" />
                                        {ach}
                                    </li>
                                ))}
                            </ul>
                        </Section>
                    )}

                    {/* OPD Schedule */}
                    <Section title="OPD Schedule" delay={0.25}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className={`rounded-2xl bg-${doc.color}-50 border border-${doc.color}-100 p-5`}>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Days</p>
                                <p className="text-lg font-black text-[#003366]">{doc.days}</p>
                            </div>
                            <div className={`rounded-2xl bg-${doc.color}-50 border border-${doc.color}-100 p-5`}>
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Timings</p>
                                <p className="text-lg font-black text-[#003366]">{doc.timing}</p>
                            </div>
                        </div>
                        {doc.camp && (
                            <div className="mt-4 flex items-start gap-3 bg-orange-50 border border-orange-100 rounded-2xl p-4">
                                <MapPin size={16} className="text-orange-500 shrink-0 mt-0.5" />
                                <p className="text-sm font-bold text-orange-700">{doc.camp}</p>
                            </div>
                        )}
                    </Section>

                    {/* Patient Reviews — static sample */}
                    <Section title="Patient Reviews" delay={0.3}>
                        <div className="space-y-4">
                            {[
                                { name: "Priya K.", text: `${doc.nameTitled} is an exceptional doctor. Thorough, empathetic, and highly professional. Highly recommended.`, rating: 5 },
                                { name: "Rohit M.", text: `Best experience I've had. Clear explanations, excellent care. The whole team at Trinay is outstanding.`, rating: 5 },
                                { name: "Sunita D.", text: `Very knowledgeable and patient. Took time to listen and explain every aspect of my condition. 5 stars!`, rating: 5 },
                            ].map(({ name, text, rating }) => (
                                <div key={name} className="bg-slate-50 rounded-2xl p-5">
                                    <div className="flex items-center justify-between mb-2">
                                        <p className="text-sm font-bold text-[#003366]">{name}</p>
                                        <Stars n={rating} />
                                    </div>
                                    <p className="text-sm text-slate-600 italic leading-relaxed">&ldquo;{text}&rdquo;</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                </div>

                {/* RIGHT COLUMN — sticky booking card */}
                <div className="space-y-6">
                    <div className="sticky top-28 space-y-6">
                        {/* Booking card */}
                        <motion.div
                            variants={fadeUp(0.2)}
                            initial="hidden"
                            animate="visible"
                            className={`rounded-3xl bg-linear-to-br ${doc.gradient} p-6 shadow-2xl text-white overflow-hidden relative`}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 blur-3xl" />
                            <div className="relative">
                                <div className="flex items-center gap-3 mb-4">
                                    <img src={doc.avatar} alt="" className="w-14 h-14 rounded-2xl border-2 border-white/30 object-cover bg-white/10 p-1" />
                                    <div>
                                        <p className="font-black text-base leading-tight">{doc.nameTitled}</p>
                                        <p className="text-white/70 text-xs">{doc.deptDisplay}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 mb-5">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">Next Available</span>
                                        <span className="font-bold">Tomorrow</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">Consultation Fee</span>
                                        <span className="font-bold">₹500 – ₹800</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-white/60">Mode</span>
                                        <span className="font-bold">In-Person</span>
                                    </div>
                                </div>

                                <Link
                                    to={`/appointment?doctor=${encodeURIComponent(doc.nameTitled)}&dept=${encodeURIComponent(doc.dept)}`}
                                    className="block w-full text-center bg-white text-[#003366] font-black py-3.5 rounded-2xl text-sm transition-all hover:scale-[1.02] hover:shadow-xl active:scale-95"
                                >
                                    Book Appointment Now
                                </Link>
                                <a
                                    href="tel:+919119191622"
                                    className="mt-3 flex items-center justify-center gap-2 w-full text-center bg-white/10 border border-white/30 text-white font-bold py-3 rounded-2xl text-sm transition-all hover:bg-white/20"
                                >
                                    <Phone size={15} /> Call for Appointment
                                </a>
                            </div>
                        </motion.div>

                        {/* Hospital info card */}
                        <motion.div
                            variants={fadeUp(0.35)}
                            initial="hidden"
                            animate="visible"
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6"
                        >
                            <h4 className="font-black text-[#003366] mb-4">Hospital Details</h4>
                            <ul className="space-y-3 text-sm text-slate-600">
                                <li className="flex items-start gap-3">
                                    <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                    Opposite Chopasni Garden, PF Office Road, Jodhpur, Rajasthan 342008
                                </li>
                                <li className="flex items-center gap-3">
                                    <Phone size={16} className="text-blue-500 shrink-0" />
                                    +91 91191 91622
                                </li>
                                <li className="flex items-center gap-3">
                                    <Clock size={16} className="text-blue-500 shrink-0" />
                                    Emergency: Open 24/7
                                </li>
                            </ul>
                        </motion.div>

                        {/* Related doctors */}
                        {related.length > 0 && (
                            <motion.div
                                variants={fadeUp(0.45)}
                                initial="hidden"
                                animate="visible"
                                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6"
                            >
                                <h4 className="font-black text-[#003366] mb-4">Related Specialists</h4>
                                <div className="space-y-3">
                                    {related.map((rd) => (
                                        <Link key={rd.id} to={`/doctors/${rd.id}`}
                                            className="flex items-center gap-3 p-3 rounded-2xl hover:bg-slate-50 transition-colors group">
                                            <img src={rd.avatar} alt="" className="w-10 h-10 rounded-xl object-cover border border-slate-100" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{rd.nameTitled}</p>
                                                <p className="text-xs text-slate-400 truncate">{rd.deptDisplay}</p>
                                            </div>
                                            <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors shrink-0" />
                                        </Link>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── MOBILE STICKY BAR ─────────────────────────────────── */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 shadow-2xl px-4 py-3 flex gap-3">
                <a
                    href="tel:+919119191622"
                    className="flex-1 flex items-center justify-center gap-2 bg-slate-100 text-slate-700 font-bold py-3.5 rounded-2xl text-sm"
                >
                    <Phone size={16} /> Call
                </a>
                <Link
                    to={`/appointment?doctor=${encodeURIComponent(doc.nameTitled)}&dept=${encodeURIComponent(doc.dept)}`}
                    className={`flex-[2] flex items-center justify-center gap-2 bg-linear-to-r ${doc.gradient} text-white font-black py-3.5 rounded-2xl text-sm`}
                >
                    <Calendar size={16} /> Book Appointment
                </Link>
            </div>
            <div className="lg:hidden h-20" /> {/* spacer for sticky bar */}

            <Footer />
        </div>
    );
};

export default DoctorDetail;
