import {
    BadgeCheck,
    Building2,
    CheckCircle2,
    Clock,
    FileText,
    HeartPulse,
    Mail,
    Phone,
    ShieldCheck,
    Sparkles,
    Zap,
} from "lucide-react";
import { motion } from "framer-motion";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

import hdfc from "../assets/company logos tpa/hdfc ergo.png";
import maxBupa from "../assets/company logos tpa/max bupa health ins.svg";
import reliance from "../assets/company logos tpa/reliance health ins.png";
import religare from "../assets/company logos tpa/relligare_logo.svg";
import safeway from "../assets/company logos tpa/safeway ins.png";
import healthIndia from "../assets/company logos tpa/health india.png";
import paramount from "../assets/company logos tpa/paramount ins.png";
import dhs from "../assets/company logos tpa/DHS tpa.png";
import medicare from "../assets/company logos tpa/medicare-logo-green.svg";
import nvgt from "../assets/company logos tpa/NVGT.png";
import heritage from "../assets/company logos tpa/heritage health ins.png";
import ericson from "../assets/company logos tpa/ericson health isn.jpg";
import liberty from "../assets/company logos tpa/liberty general insurance.avif";
import fhpl from "../assets/company logos tpa/fhpl ins.png";
import adityaBirla from "../assets/company logos tpa/aditya birla ins.webp";
import raksha from "../assets/company logos tpa/raksha health ins.png";
import sbi from "../assets/company logos tpa/sbi general ins.svg";
import acko from "../assets/company logos tpa/acko ins.svg";
import manipal from "../assets/company logos tpa/manipal ins.png";

/* ─── Data ─────────────────────────────────────────────────────────────── */

const STATS = [
    { value: "16+", label: "TPA Partners",          Icon: ShieldCheck,  accent: "text-cyan-400" },
    { value: "21+", label: "Insurance Companies",   Icon: Building2,    accent: "text-emerald-400" },
    { value: "24/7", label: "Help Desk Available",  Icon: Clock,        accent: "text-amber-400" },
    { value: "100%", label: "Cashless Process",     Icon: Zap,          accent: "text-rose-400" },
];

const highlights = [
    {
        title: "16+ TPA Partners",
        description: "Partnerships with all leading Third Party Administrators for smooth, hassle-free claim processing.",
        Icon: ShieldCheck,
        iconBg: "bg-blue-50",
        iconColor: "text-blue-600",
        border: "hover:border-blue-200",
        glow: "group-hover:shadow-blue-100",
    },
    {
        title: "21+ Insurance Companies",
        description: "We accept all major health insurance providers across India so you can focus on recovery, not payments.",
        Icon: Building2,
        iconBg: "bg-violet-50",
        iconColor: "text-violet-600",
        border: "hover:border-violet-200",
        glow: "group-hover:shadow-violet-100",
    },
    {
        title: "Fast Approvals",
        description: "Emergency pre-authorizations processed within 2–6 hours. Planned procedures cleared in 24–48 hours.",
        Icon: Clock,
        iconBg: "bg-emerald-50",
        iconColor: "text-emerald-600",
        border: "hover:border-emerald-200",
        glow: "group-hover:shadow-emerald-100",
    },
];

const processSteps = [
    {
        num: "01",
        title: "Intimation",
        description: "Inform our insurance desk and your TPA about planned hospitalization at least 48 hours in advance. For emergency admissions, intimate within 24 hours of admission.",
        dot: "bg-blue-600",
        shadow: "shadow-blue-300",
    },
    {
        num: "02",
        title: "Pre-Authorization",
        description: "Our insurance team submits a pre-authorization request to your TPA/insurer with complete medical details and estimated treatment costs.",
        dot: "bg-violet-600",
        shadow: "shadow-violet-300",
    },
    {
        num: "03",
        title: "Approval",
        description: "The TPA reviews and grants approval — within 2–6 hours for emergencies and 24–48 hours for planned procedures.",
        dot: "bg-indigo-600",
        shadow: "shadow-indigo-300",
    },
    {
        num: "04",
        title: "Treatment",
        description: "Once approved, your treatment begins. Trinay Hospital directly settles the approved amount with your insurance company — zero upfront cost for you.",
        dot: "bg-blue-700",
        shadow: "shadow-blue-300",
    },
    {
        num: "05",
        title: "Settlement",
        description: "After discharge, you pay only non-covered expenses, co-payments, or amounts exceeding your sum insured. Everything else is settled cashlessly.",
        dot: "bg-teal-600",
        shadow: "shadow-teal-300",
    },
];

const insurers = [
    { name: "HDFC Ergo General Insurance",               logo: hdfc },
    { name: "Max Bupa Health Insurance",                 logo: maxBupa },
    { name: "Reliance Health Insurance",                 logo: reliance },
    { name: "Religare Health Insurance",                 logo: religare },
    { name: "Safe Way TPA",                              logo: safeway },
    { name: "Health India Insurance TPA",                logo: healthIndia },
    { name: "Paramount Health Insurance TPA",            logo: paramount },
    { name: "Unique Health Care",                        logo: null },
    { name: "DHS TPA",                                   logo: dhs },
    { name: "Medicare Health Insurance",                 logo: medicare },
    { name: "NVGT",                                      logo: nvgt },
    { name: "Heritage Health Insurance TPA",             logo: heritage },
    { name: "Ericson Health Insurance TPA",              logo: ericson },
    { name: "Liberty General Insurance",                 logo: liberty },
    { name: "Vision E Meditek",                          logo: null },
    { name: "FHPL TPA",                                  logo: fhpl },
    { name: "Aditya Birla Insurance",                    logo: adityaBirla },
    { name: "Raksha TPA (New India Assurance)",          logo: raksha },
    { name: "SBI General Insurance",                     logo: sbi },
    { name: "Acko General Insurance",                    logo: acko },
    { name: "Manipal Cigna Health Insurance",            logo: manipal },
];

const documents = [
    "Valid health insurance policy document",
    "Photo ID proof (Aadhar Card, PAN Card, Driving License, Passport)",
    "Health card / e-health card issued by insurance company / TPA",
    "Previous medical records (if applicable)",
    "Duly filled pre-authorization form",
];

const notes = [
    "Cashless facility is subject to policy terms and TPA approval",
    "Policy must be active and within the coverage period at time of admission",
    "For planned procedures, intimate TPA at least 48 hours in advance",
    "Emergency cases should be intimated within 24 hours of admission",
    "Patient is responsible for co-payment, deductibles, and non-covered items",
    "In case of TPA rejection, patient must arrange payment directly",
];

/* ─── Animation presets ─────────────────────────────────────────────────── */

const fadeUp = {
    hidden:  { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
};

const cardItem = {
    hidden:  { opacity: 0, y: 22, scale: 0.97 },
    visible: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─── Small helpers ─────────────────────────────────────────────────────── */

const SectionBadge = ({ children }) => (
    <p className="inline-block text-[11px] font-black uppercase tracking-[0.35em] text-blue-500 mb-4 bg-blue-50 px-3.5 py-1.5 rounded-full">
        {children}
    </p>
);

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════ */

const Insurance = () => {
    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            <Navbar />

            {/* ══ HERO ══════════════════════════════════════════════════════ */}
            <section className="relative min-h-[600px] md:min-h-[680px] pt-16 flex flex-col justify-end overflow-hidden bg-[#010e24]">

                {/* Ambient glow orbs */}
                <div className="absolute -top-20 left-1/3 w-[500px] h-[500px] bg-blue-700/25 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-40 left-10 w-64 h-64 bg-violet-600/10 rounded-full blur-[80px] pointer-events-none" />

                {/* Grid texture */}
                <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:40px_40px]" />

                {/* Decorative floating shields */}
                <div className="absolute top-28 right-8 md:right-20 opacity-[0.07]">
                    <ShieldCheck size={160} className="text-cyan-300" strokeWidth={0.4} />
                </div>
                <div className="absolute top-48 right-40 md:right-64 opacity-[0.04]">
                    <ShieldCheck size={80} className="text-blue-300" strokeWidth={0.5} />
                </div>

                {/* Wave transition */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20 fill-white">
                        <path d="M0,80 C360,0 1080,80 1440,20 L1440,80 Z" />
                    </svg>
                </div>

                {/* Hero content */}
                <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pb-28 pt-20 md:pt-28">
                    <motion.div
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex items-center gap-2 bg-white/10 border border-white/15 text-cyan-300 text-[11px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full mb-7 backdrop-blur-sm"
                    >
                        <Sparkles size={11} />
                        Trinay Hospital · Jodhpur
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight max-w-3xl"
                    >
                        Insurance &amp;
                        <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-blue-300 to-blue-400 bg-clip-text text-transparent">
                            Cashless TPA
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="mt-6 text-slate-300 text-base md:text-lg leading-relaxed max-w-xl"
                    >
                        We partner with 21+ insurance companies and 16+ TPAs so you can focus entirely on recovery — not the paperwork.
                    </motion.p>

                    {/* Stat pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.32, duration: 0.6 }}
                        className="flex flex-wrap gap-3 mt-9"
                    >
                        {STATS.map((s) => (
                            <div
                                key={s.label}
                                className="flex items-center gap-2.5 bg-white/8 border border-white/12 backdrop-blur-sm rounded-full px-5 py-2.5 hover:bg-white/15 transition-colors"
                            >
                                <s.Icon size={14} className={s.accent} />
                                <span className="text-white font-black text-sm">{s.value}</span>
                                <span className="text-slate-400 text-xs hidden sm:inline">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══ INTRO + HIGHLIGHTS ════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <motion.div
                        className="text-center max-w-2xl mx-auto mb-16"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <SectionBadge>Cashless Hospitalization</SectionBadge>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003366] leading-tight">
                            Quality Care Without Financial Worry
                        </h2>
                        <p className="text-slate-500 mt-5 text-base leading-relaxed">
                            At Trinay Hospital, we understand that medical expenses can be a concern. That's why we've partnered with all major insurance companies and TPAs to provide seamless cashless hospitalization — making world-class healthcare accessible and stress-free.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {highlights.map((h) => (
                            <motion.div
                                key={h.title}
                                variants={cardItem}
                                whileHover={{ y: -10, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                className={`group relative rounded-3xl border border-slate-100 ${h.border} bg-white shadow-sm hover:shadow-2xl ${h.glow} transition-all duration-500 p-8 overflow-hidden`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className={`relative w-14 h-14 rounded-2xl ${h.iconBg} flex items-center justify-center mb-6`}>
                                    <h.Icon size={26} className={h.iconColor} />
                                </div>
                                <h3 className="relative text-lg font-black text-[#003366] mb-3">{h.title}</h3>
                                <p className="relative text-slate-500 text-sm leading-relaxed">{h.description}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══ PROCESS TIMELINE ══════════════════════════════════════════ */}
            <section className="py-24 bg-[#f0f4ff]">
                <div className="max-w-3xl mx-auto px-6 lg:px-10">
                    <motion.div
                        className="text-center mb-16"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <SectionBadge>Step by Step</SectionBadge>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003366] leading-tight">
                            How Cashless Works
                        </h2>
                        <p className="text-slate-500 mt-4 text-base">
                            A simple 5-step process from intimation to final settlement.
                        </p>
                    </motion.div>

                    <motion.div
                        className="relative"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        {/* Gradient vertical timeline line */}
                        <div className="absolute left-[22px] top-6 bottom-6 w-[2px] bg-gradient-to-b from-blue-500 via-violet-400 via-indigo-500 via-blue-700 to-teal-500 rounded-full opacity-30" />

                        <div className="space-y-5">
                            {processSteps.map((step, i) => (
                                <motion.div
                                    key={step.title}
                                    variants={cardItem}
                                    className="relative flex items-start gap-6"
                                >
                                    {/* Step dot */}
                                    <div className={`relative z-10 w-[46px] h-[46px] rounded-full ${step.dot} text-white font-black text-xs flex items-center justify-center flex-shrink-0 shadow-lg ${step.shadow} ring-4 ring-white`}>
                                        {step.num}
                                    </div>

                                    {/* Card */}
                                    <motion.div
                                        whileHover={{ x: 6 }}
                                        transition={{ type: "spring", stiffness: 320, damping: 22 }}
                                        className="flex-1 bg-white rounded-2xl border border-slate-100 hover:border-blue-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5 mb-1"
                                    >
                                        <div className="flex items-center gap-2 mb-2">
                                            <BadgeCheck size={15} className="text-blue-500 shrink-0" />
                                            <h3 className="font-black text-[#003366] text-base">{step.title}</h3>
                                        </div>
                                        <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ══ INSURANCE COMPANIES ═══════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-10">
                    <motion.div
                        className="text-center mb-14"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <SectionBadge>Our Network</SectionBadge>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003366] leading-tight">
                            Accepted Insurance Companies
                        </h2>
                        <p className="text-slate-500 mt-4 text-base max-w-lg mx-auto">
                            Partnered with 21+ leading health insurance providers across India for seamless cashless admissions.
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-5"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.05 }}
                    >
                        {insurers.map((ins) => (
                            <motion.div
                                key={ins.name}
                                variants={cardItem}
                                whileHover={{ y: -8, scale: 1.04 }}
                                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                                className="group bg-white border border-slate-100 hover:border-blue-300 rounded-3xl shadow-sm hover:shadow-2xl hover:shadow-blue-100 transition-all duration-300 p-5 md:p-6 flex flex-col items-center gap-4 text-center cursor-default"
                            >
                                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-slate-100 bg-slate-50 group-hover:bg-blue-50 flex items-center justify-center overflow-hidden p-3 transition-all duration-300 shadow-sm group-hover:shadow-md">
                                    {ins.logo ? (
                                        <img
                                            src={ins.logo}
                                            alt={ins.name}
                                            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                                            loading="lazy"
                                        />
                                    ) : (
                                        <ShieldCheck size={36} className="text-blue-400" />
                                    )}
                                </div>
                                <p className="text-xs sm:text-sm font-bold text-slate-600 leading-snug group-hover:text-[#003366] transition-colors line-clamp-2">
                                    {ins.name}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ══ DOCUMENTS + NOTES ════════════════════════════════════════ */}
            <section className="py-24 bg-[#f0f4ff]">
                <div className="max-w-6xl mx-auto px-6 lg:px-10">
                    <motion.div
                        className="text-center mb-14"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <SectionBadge>Be Prepared</SectionBadge>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003366] leading-tight">
                            Documents &amp; Important Notes
                        </h2>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                        variants={stagger}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Documents card */}
                        <motion.div
                            variants={cardItem}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                            className="bg-white rounded-3xl border border-slate-100 hover:border-blue-200 shadow-sm hover:shadow-2xl hover:shadow-blue-50 transition-all duration-500 p-8"
                        >
                            <div className="flex items-center gap-4 mb-7">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                                    <FileText size={26} className="text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-[#003366]">Documents Required</h3>
                                    <p className="text-slate-400 text-xs mt-0.5">Carry these at the time of admission</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                {documents.map((doc, i) => (
                                    <motion.li
                                        key={doc}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.07 }}
                                        className="flex items-start gap-3"
                                    >
                                        <CheckCircle2 size={17} className="text-emerald-500 mt-0.5 shrink-0" />
                                        <span className="text-slate-600 text-sm leading-relaxed">{doc}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>

                        {/* Notes card */}
                        <motion.div
                            variants={cardItem}
                            whileHover={{ y: -8 }}
                            transition={{ type: "spring", stiffness: 240, damping: 18 }}
                            className="bg-white rounded-3xl border border-slate-100 hover:border-amber-200 shadow-sm hover:shadow-2xl hover:shadow-amber-50 transition-all duration-500 p-8"
                        >
                            <div className="flex items-center gap-4 mb-7">
                                <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center shrink-0">
                                    <ShieldCheck size={26} className="text-amber-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black text-[#003366]">Important Notes</h3>
                                    <p className="text-slate-400 text-xs mt-0.5">Please read before your admission</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                {notes.map((note, i) => (
                                    <motion.li
                                        key={note}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.07 }}
                                        className="flex items-start gap-3"
                                    >
                                        <BadgeCheck size={17} className="text-blue-500 mt-0.5 shrink-0" />
                                        <span className="text-slate-600 text-sm leading-relaxed">{note}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ══ HELP DESK CTA ════════════════════════════════════════════ */}
            <section className="py-24 bg-white">
                <div className="max-w-5xl mx-auto px-6 lg:px-10">
                    <motion.div
                        className="relative overflow-hidden rounded-[2rem] bg-[#003366] p-10 md:p-16 text-center"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        {/* Top shimmer line */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

                        {/* Glow blobs */}
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(56,189,248,0.18),transparent)]" />
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute -top-10 -left-10 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

                        {/* Dot grid */}
                        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px]" />

                        {/* Content */}
                        <div className="relative">
                            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-cyan-300 text-[11px] font-black uppercase tracking-[0.3em] px-5 py-2.5 rounded-full mb-7 backdrop-blur-sm">
                                <HeartPulse size={12} />
                                24/7 Insurance Help Desk
                            </div>

                            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                                Need Help with{" "}
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent">
                                    Insurance?
                                </span>
                            </h2>

                            <p className="text-slate-300 mt-5 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
                                Our dedicated insurance help desk at Trinay Hospital is available round the clock for pre-authorization, claim processing, and all insurance-related queries.
                            </p>

                            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                                <motion.a
                                    href="tel:+919119191622"
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="inline-flex items-center gap-2.5 bg-white text-[#003366] font-black px-8 py-4 rounded-2xl text-sm shadow-2xl shadow-black/30 hover:shadow-cyan-500/20"
                                >
                                    <Phone size={16} />
                                    +91 91191 91622
                                </motion.a>
                                <motion.a
                                    href="mailto:insurance@trinayhospital.com"
                                    whileHover={{ scale: 1.05, y: -3 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="inline-flex items-center gap-2.5 bg-white/10 border border-white/20 text-white font-bold px-8 py-4 rounded-2xl text-sm hover:bg-white/20 backdrop-blur-sm transition-colors"
                                >
                                    <Mail size={16} />
                                    insurance@trinayhospital.com
                                </motion.a>
                            </div>

                            <p className="text-slate-400 text-xs mt-8">
                                Insurance desk · Ground floor, near main reception · Opp. Chopasni Garden, PF Office Road, Jodhpur
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Insurance;
