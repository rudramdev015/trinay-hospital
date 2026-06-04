import { motion } from "framer-motion";
import {
    Briefcase, MapPin, Clock, Users, Heart, Star,
    ArrowRight, CheckCircle2, GraduationCap,
    Building2, Shield, Zap, TrendingUp, Coffee, Award,
    Phone, Mail, Calendar,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

/* ── Animation ─────────────────────────────────────────────────────────── */
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

/* ── Data ───────────────────────────────────────────────────────────────── */
const JOBS = [
    { id: 1, title: "Senior Resident Doctor", dept: "Emergency Medicine", type: "Full-Time", exp: "3–5 Years", location: "Jodhpur", urgent: true },
    { id: 2, title: "Staff Nurse — ICU / CCU", dept: "Intensive Care Unit", type: "Full-Time", exp: "1–3 Years", location: "Jodhpur", urgent: true },
    { id: 3, title: "Radiologist / Sonologist", dept: "Radiology & Imaging", type: "Full-Time", exp: "5+ Years", location: "Jodhpur", urgent: true },
    { id: 4, title: "X-Ray & CT Technician", dept: "Radiology", type: "Full-Time", exp: "1–3 Years", location: "Both", urgent: false },
    { id: 5, title: "Physiotherapist", dept: "Rehabilitation", type: "Full-Time", exp: "1+ Years", location: "Pali", urgent: false },
    { id: 6, title: "Medical Receptionist", dept: "Administration", type: "Full-Time", exp: "0–2 Years", location: "Jodhpur", urgent: false },
    { id: 7, title: "Pharmacy Executive", dept: "Pharmacy", type: "Full-Time", exp: "1+ Years", location: "Both", urgent: false },
    { id: 8, title: "OT Technician", dept: "Operation Theatre", type: "Full-Time", exp: "2+ Years", location: "Jodhpur", urgent: false },
];

const BENEFITS = [
    { icon: <Heart size={22} />, title: "Health Coverage", desc: "Comprehensive medical and accident insurance for you and your dependants.", bg: "bg-rose-50", ic: "text-rose-500" },
    { icon: <TrendingUp size={22} />, title: "Career Growth", desc: "Structured training, CME programmes, and fast-track promotion paths.", bg: "bg-blue-50", ic: "text-blue-500" },
    { icon: <GraduationCap size={22} />, title: "Learning & Development", desc: "Access to conferences, workshops, and sponsored higher education.", bg: "bg-purple-50", ic: "text-purple-500" },
    { icon: <Coffee size={22} />, title: "Work-Life Balance", desc: "Structured shift schedules, earned leave, and wellness programmes.", bg: "bg-amber-50", ic: "text-amber-500" },
    { icon: <Award size={22} />, title: "Recognition", desc: "Monthly star performer awards, performance bonuses, and anniversary gifts.", bg: "bg-emerald-50", ic: "text-emerald-500" },
    { icon: <Shield size={22} />, title: "Job Security", desc: "Stable employment at a rapidly growing NABH-accredited hospital.", bg: "bg-teal-50", ic: "text-teal-500" },
];

const VALUES = [
    { icon: <Heart size={26} />, title: "Patient First", desc: "Every clinical and administrative decision centres on patient wellbeing.", gradient: "from-rose-500 to-red-500" },
    { icon: <Zap size={26} />, title: "Clinical Excellence", desc: "We invest in the best people, technology, and evidence-based protocols.", gradient: "from-blue-500 to-indigo-600" },
    { icon: <Users size={26} />, title: "Team Spirit", desc: "Mentorship, collaboration, and shared success — we grow together.", gradient: "from-purple-500 to-violet-600" },
    { icon: <Star size={26} />, title: "Integrity", desc: "Transparent, ethical, and accountable in everything we do.", gradient: "from-amber-500 to-orange-500" },
];

const STEPS = [
    { step: "01", title: "Apply Online", desc: "Click Apply on any job card or email your resume to careers@trinay.in with the role in the subject line.", icon: <Mail size={24} /> },
    { step: "02", title: "HR Screening", desc: "Our HR team reviews every application within 48 hours and contacts shortlisted candidates for a telephonic round.", icon: <Phone size={24} /> },
    { step: "03", title: "Interview & Offer", desc: "Shortlisted candidates attend a clinical or technical interview. Offer letters are issued within 3 working days.", icon: <Calendar size={24} /> },
];

/* ── Job Card ───────────────────────────────────────────────────────────── */
const JobCard = ({ job, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.07, duration: 0.5, ease: "easeOut" }}
        whileHover={{ y: -5 }}
        className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col"
    >
        {/* header */}
        <div className="flex items-start justify-between mb-4 gap-3">
            <div className="flex-1 min-w-0">
                {job.urgent && (
                    <span className="inline-block px-2.5 py-0.5 bg-rose-100 text-rose-600 text-[10px] font-black uppercase tracking-widest rounded-full mb-2">
                        Urgent Hiring
                    </span>
                )}
                <h3 className="text-base font-black text-slate-800 group-hover:text-[#003366] transition-colors leading-snug">{job.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5 font-semibold">{job.dept}</p>
            </div>
            <div className="w-10 h-10 bg-[#003366]/5 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#003366] transition-colors duration-300">
                <Briefcase size={16} className="text-[#003366] group-hover:text-white transition-colors" />
            </div>
        </div>

        {/* tags */}
        <div className="flex flex-wrap gap-2 mb-5">
            {[
                { icon: <MapPin size={11} />, label: job.location },
                { icon: <Clock size={11} />, label: job.type },
                { icon: <GraduationCap size={11} />, label: `${job.exp} Exp.` },
            ].map(({ icon, label }) => (
                <span key={label} className="flex items-center gap-1 px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[11px] font-bold text-slate-500">
                    {icon} {label}
                </span>
            ))}
        </div>

        {/* CTA */}
        <a
            href={`mailto:careers@trinay.in?subject=Application: ${job.title}`}
            className="mt-auto flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-bold text-sm transition-all duration-300 group-hover:scale-[1.02]"
        >
            Apply Now <ArrowRight size={14} />
        </a>
    </motion.div>
);

/* ── Page ───────────────────────────────────────────────────────────────── */
const Careers = () => (
    <div className="min-h-screen bg-slate-50 font-sans">
        <Navbar />

        {/* ── HERO ── */}
        <section
            className="relative pt-32 pb-0 md:pt-44 overflow-hidden bg-[#003366]"
        >
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none"
                style={{ background: "rgba(96,165,250,0.18)" }} />
            <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
                style={{ background: "rgba(103,232,249,0.13)" }} />

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                    <Briefcase size={14} /> We're Hiring — Join Our Mission
                </motion.div>

                <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.6 }}
                    className="text-5xl md:text-7xl font-black text-white mb-5 leading-tight tracking-tight">
                    Build a Career{" "}
                    <span style={{
                        background: "linear-gradient(to right,#67e8f9,#93c5fd)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                    }}>
                        That Matters
                    </span>
                </motion.h1>

                <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.6 }}
                    className="text-blue-100/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
                    Join Rajasthan's leading multispeciality hospital. Work alongside top specialists, grow your career,
                    and make a real difference in people's lives every single day.
                </motion.p>

                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.6 }}
                    className="flex flex-wrap justify-center gap-4 mb-16">
                    <a href="#open-positions"
                        className="px-7 py-3.5 bg-white text-[#003366] font-black rounded-full hover:bg-blue-50 transition-all hover:scale-105 shadow-lg text-sm">
                        View Open Positions
                    </a>
                    <a href="mailto:careers@trinay.in"
                        className="px-7 py-3.5 bg-white/10 border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all text-sm">
                        Email Your Resume
                    </a>
                </motion.div>

                {/* Stats strip */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44, duration: 0.6 }}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-0">
                    {[
                        { value: "8+",   label: "Open Positions" },
                        { value: "24+",  label: "Specialists" },
                        { value: "17",   label: "Specialties" },
                        { value: "NABH", label: "Accredited" },
                    ].map(({ value, label }) => (
                        <div key={label} className="bg-white/10 border border-white/20 rounded-t-2xl px-4 py-5 backdrop-blur-sm text-center">
                            <p className="text-2xl md:text-3xl font-black text-cyan-400">{value}</p>
                            <p className="text-white/60 text-xs font-bold uppercase tracking-wider mt-1">{label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>

        {/* ── CULTURE / VALUES ── */}
        <section className="py-20 bg-white">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#003366] text-xs font-black uppercase tracking-widest rounded-full mb-4">
                        Our Culture
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Why You'll Love Working Here</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        Great healthcare starts with a great team culture. Here's what drives us every day.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {VALUES.map(({ icon, title, desc, gradient }, i) => (
                        <motion.div key={title}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -6 }}
                            className="group relative rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className={`h-1.5 w-full bg-linear-to-r ${gradient}`} />
                            <div className="p-6">
                                <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${gradient} flex items-center justify-center text-white mb-5 shadow-md`}>
                                    {icon}
                                </div>
                                <h3 className="font-black text-slate-800 mb-2 group-hover:text-[#003366] transition-colors">{title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── BENEFITS ── */}
        <section className="py-20 bg-slate-50">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#003366] text-xs font-black uppercase tracking-widest rounded-full mb-4">
                        Perks & Benefits
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">What We Offer You</h2>
                    <p className="text-slate-500 max-w-xl mx-auto text-lg">
                        We invest in our people the same way we invest in our patients — completely.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {BENEFITS.map(({ icon, title, desc, bg, ic }, i) => (
                        <motion.div key={title}
                            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                            className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center shrink-0 ${ic}`}>{icon}</div>
                            <div>
                                <h3 className="font-black text-slate-800 mb-1">{title}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── OPEN POSITIONS ── */}
        <section id="open-positions" className="py-20 bg-white scroll-mt-20">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#003366] text-xs font-black uppercase tracking-widest rounded-full mb-4">
                        Open Roles
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Current Openings</h2>
                    <p className="text-slate-500 max-w-xl mx-auto text-lg">
                        Find your perfect role and apply directly — we review every application personally.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {JOBS.map((job, i) => <JobCard key={job.id} job={job} index={i} />)}
                </div>
                <motion.p className="text-center text-slate-400 text-sm mt-10 font-medium"
                    initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    Don't see your role?{" "}
                    <a href="mailto:careers@trinay.in" className="text-[#003366] font-black hover:underline">
                        Send us your resume anyway
                    </a>{" "}
                    — we're always looking for exceptional talent.
                </motion.p>
            </div>
        </section>

        {/* ── APPLICATION PROCESS ── */}
        <section className="py-20 bg-[#003366] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: "rgba(96,165,250,0.15)" }} />
            <div className="max-w-5xl mx-auto px-6 relative z-10">
                <motion.div className="text-center mb-14" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <span className="inline-block px-4 py-1.5 bg-white/10 border border-white/20 text-blue-200 text-xs font-black uppercase tracking-widest rounded-full mb-4">
                        How to Apply
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Simple 3-Step Process</h2>
                    <p className="text-blue-100/80 max-w-xl mx-auto text-lg">
                        From application to offer — fast, transparent, and human.
                    </p>
                </motion.div>

                {/* Steps with connecting line */}
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Connector line (desktop) */}
                    <div className="hidden md:block absolute top-8 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-white/15" />

                    {STEPS.map(({ step, title, desc, icon }, i) => (
                        <motion.div key={step}
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                            className="text-center relative">
                            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center text-cyan-400 mx-auto mb-5 relative z-10">
                                {icon}
                            </div>
                            <span className="text-6xl font-black text-white/[0.07] absolute -top-3 left-1/2 -translate-x-1/2 select-none pointer-events-none leading-none">
                                {step}
                            </span>
                            <h3 className="text-xl font-black text-white mb-2">{title}</h3>
                            <p className="text-blue-100/70 text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── JOIN CTA ── */}
        <section className="py-20 bg-white">
            <div className="max-w-3xl mx-auto px-6 text-center">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#003366] mx-auto mb-6">
                        <Building2 size={28} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Ready to Join Us?</h2>
                    <p className="text-slate-500 mb-8 leading-relaxed max-w-lg mx-auto">
                        Reach out to our HR team. We're friendly, responsive, and genuinely excited to meet dedicated healthcare professionals.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="mailto:careers@trinay.in"
                            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-[#003366] text-white font-black rounded-xl hover:bg-[#002244] transition-all hover:scale-105 shadow-lg">
                            <Mail size={17} /> careers@trinay.in
                        </a>
                        <a href="tel:+919119191622"
                            className="flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-[#003366] text-[#003366] font-black rounded-xl hover:bg-[#003366] hover:text-white transition-all">
                            <Phone size={17} /> +91 91191 91622
                        </a>
                    </div>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        {[
                            <CheckCircle2 key="h" size={14} className="text-emerald-500" />,
                        ]}
                        {[
                            "HR Office Hours: Mon–Sat, 10 AM – 6 PM",
                            "Response within 48 hours guaranteed",
                            "NABH-accredited workplace",
                        ].map(t => (
                            <span key={t} className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold">
                                <CheckCircle2 size={13} className="text-emerald-500" /> {t}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>

        <Footer />
    </div>
);

export default Careers;
