import { motion } from "framer-motion";
import { Heart, Eye, Target, Shield, Users, Award, Star, CheckCircle } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, delay },
});

const Mission = () => (
    <div className="min-h-screen bg-white font-sans">
        <Navbar />

        {/* ── HERO ── */}
        <section className="pt-36 pb-28 bg-[#003366] relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:28px_28px]" />
            <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-cyan-400/10 blur-[80px]" />
            <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-blue-400/10 blur-[80px]" />

            <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                <motion.div {...fadeUp(0)}
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-cyan-300 font-bold tracking-widest uppercase text-xs px-5 py-2.5 rounded-full mb-8">
                    <Heart size={14} fill="currentColor" /> Our Purpose
                </motion.div>
                <motion.h1 {...fadeUp(0.1)}
                    className="text-5xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
                    Our Mission &{" "}
                    <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        Vision
                    </span>
                </motion.h1>
                <motion.p {...fadeUp(0.2)}
                    className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                    Driven by compassion, guided by excellence — we exist to deliver world-class healthcare
                    to every patient who walks through our doors, regardless of background or circumstance.
                </motion.p>
            </div>
        </section>

        {/* ── MISSION & VISION CARDS ── */}
        <section className="max-w-6xl mx-auto px-6 -mt-14 relative z-20 grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            {[
                {
                    icon: <Target size={28} />,
                    label: "Our Mission",
                    color: "from-[#003366] to-blue-700",
                    text: "To provide compassionate, patient-centred healthcare of the highest quality — combining cutting-edge medical technology with genuine human care. We strive to make every patient feel heard, respected, and healed.",
                },
                {
                    icon: <Eye size={28} />,
                    label: "Our Vision",
                    color: "from-cyan-600 to-teal-700",
                    text: "To be Rajasthan's most trusted multispeciality hospital — a centre of clinical excellence where every specialist, nurse, and staff member is united by one purpose: the complete well-being of our patients and their families.",
                },
            ].map(({ icon, label, color, text }, i) => (
                <motion.div key={label} {...fadeUp(i * 0.15)}
                    className={`bg-linear-to-br ${color} rounded-3xl p-8 text-white shadow-2xl`}>
                    <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-5">
                        {icon}
                    </div>
                    <h2 className="text-2xl font-black mb-4">{label}</h2>
                    <p className="text-white/80 leading-relaxed text-base">{text}</p>
                </motion.div>
            ))}
        </section>

        {/* ── CORE VALUES ── */}
        <section className="bg-slate-50 py-24 px-6">
            <div className="max-w-6xl mx-auto">
                <motion.div {...fadeUp(0)} className="text-center mb-14">
                    <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                        What We Stand For
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#003366] mt-5 mb-4">Our Core Values</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Every decision we make, every treatment we deliver, is guided by these fundamental values.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { icon: <Heart size={24} />, color: "rose", title: "Compassion", desc: "We treat every patient with empathy, dignity, and genuine care — as if they were family." },
                        { icon: <Award size={24} />, color: "blue", title: "Excellence", desc: "We never settle for less than the best in clinical outcomes, service, and patient experience." },
                        { icon: <Shield size={24} />, color: "emerald", title: "Integrity", desc: "Honest communication, ethical practice, and transparent care guide everything we do." },
                        { icon: <Users size={24} />, color: "violet", title: "Teamwork", desc: "Our specialists, nurses, and staff work as one unified team focused on your recovery." },
                        { icon: <Star size={24} />, color: "amber", title: "Innovation", desc: "We continuously adopt the latest medical advances to give you the best possible care." },
                        { icon: <CheckCircle size={24} />, color: "teal", title: "Accountability", desc: "We take responsibility for every outcome and continually improve our standards of care." },
                    ].map(({ icon, color, title, desc }, i) => (
                        <motion.div key={title} {...fadeUp(i * 0.08)}
                            className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                            <div className={`w-12 h-12 bg-${color}-50 rounded-xl flex items-center justify-center text-${color}-600 mb-4`}>
                                {icon}
                            </div>
                            <h3 className="text-lg font-black text-[#003366] mb-2">{title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>

        {/* ── STATS STRIP ── */}
        <section className="bg-[#003366] py-16 px-6">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {[
                    { value: "24+",  label: "Expert Specialists" },
                    { value: "17",   label: "Departments" },
                    { value: "100+", label: "Bed Capacity" },
                    { value: "24/7", label: "Emergency Care" },
                ].map(({ value, label }, i) => (
                    <motion.div key={label} {...fadeUp(i * 0.1)}>
                        <p className="text-3xl md:text-4xl font-black text-cyan-400 mb-1">{value}</p>
                        <p className="text-white/60 text-xs font-bold uppercase tracking-widest">{label}</p>
                    </motion.div>
                ))}
            </div>
        </section>

        {/* ── COMMITMENT SECTION ── */}
        <section className="py-24 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <motion.div {...fadeUp(0)}>
                    <span className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                        Our Commitment
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-[#003366] mt-6 mb-6 leading-tight">
                        A Promise to Every Patient
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed mb-10">
                        At Trinay Hospital, we believe that every person deserves access to exceptional healthcare.
                        We promise to listen before we prescribe, to care before we cure, and to stand by you
                        every step of your healing journey — from diagnosis to full recovery.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                        {[
                            "Personalised care tailored to your unique needs",
                            "Clear, honest communication at every step",
                            "Zero compromise on safety and hygiene standards",
                            "Affordable treatment without cutting corners",
                            "Cutting-edge technology and modern facilities",
                            "A team that treats you like family",
                        ].map((item) => (
                            <div key={item} className="flex items-start gap-3">
                                <CheckCircle size={18} className="text-emerald-500 mt-0.5 shrink-0" />
                                <span className="text-slate-600 text-sm font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>

        <Footer />
    </div>
);

export default Mission;
