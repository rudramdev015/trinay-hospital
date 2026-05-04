import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ShieldCheck, Lock, Eye, FileText, PhoneCall, MapPin,
    CheckCircle2, AlertCircle,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.09 } },
};

const TOC = [
    "Introduction",
    "Information We Collect",
    "Medical Records",
    "Government Schemes",
    "Security",
    "Your Rights",
];

const Privacy = () => {
    const lastUpdated = "February 15, 2024";

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
            <Navbar />

            {/* ── HERO ── */}
            <section
                className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden"
                style={{ background: "linear-gradient(135deg,#001f4d 0%,#003366 55%,#1e40af 100%)" }}
            >
                {/* dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "28px 28px" }}
                />
                {/* glows */}
                <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full blur-[130px] pointer-events-none"
                    style={{ background: "rgba(96,165,250,0.18)" }} />
                <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
                    style={{ background: "rgba(103,232,249,0.13)" }} />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6"
                    >
                        <ShieldCheck size={14} /> Trusted Patient Data Protection
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13, duration: 0.6 }}
                        className="text-5xl md:text-7xl font-black text-white mb-5 leading-tight tracking-tight"
                    >
                        Privacy{" "}
                        <span style={{
                            background: "linear-gradient(to right,#67e8f9,#93c5fd)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>
                            Policy
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.6 }}
                        className="text-blue-100/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        At Trinay Hospital, your health information is treated with the same care as your medical treatment.
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38, duration: 0.6 }}
                        className="mt-6 text-blue-300 text-sm font-mono tracking-widest uppercase"
                    >
                        Effective Date: {lastUpdated}
                    </motion.p>
                </div>
            </section>

            {/* ── CONTENT ── */}
            <section className="py-16 md:py-24">
                <div className="max-w-6xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Sidebar TOC */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-28">
                                <p className="text-[10px] font-black text-[#003366] uppercase tracking-widest mb-5">On This Page</p>
                                <nav className="space-y-0.5">
                                    {TOC.map(item => (
                                        <a
                                            key={item}
                                            href={`#${item.replace(/\s+/g, "-").toLowerCase()}`}
                                            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#003366] border-l-2 border-slate-200 hover:border-[#003366] pl-4 py-2 transition-all duration-200"
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </nav>
                                <div className="mt-10 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                                    <p className="text-xs font-black text-[#003366] uppercase tracking-widest mb-2">Need Help?</p>
                                    <a href="mailto:info@trinay.in" className="text-sm text-blue-600 font-bold hover:underline">info@trinay.in</a>
                                </div>
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="lg:col-span-9 space-y-14">

                            {/* Introduction */}
                            <motion.div id="introduction" className="scroll-mt-28"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2 className="text-3xl font-black text-slate-900 mb-5 flex items-center gap-3">
                                    <span className="w-8 h-1.5 bg-[#003366] rounded-full shrink-0" /> Introduction
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    Trinay Hospital Private Limited ("Trinay Hospital," "we," "us," or "our") is a premier 100-bed multispeciality
                                    healthcare provider. We understand that your medical information is deeply personal. This policy outlines our
                                    rigorous standards for maintaining the confidentiality of patients at our <strong>Jodhpur</strong> and{" "}
                                    <strong>Pali</strong> facilities. This policy is compliant with the <strong>Digital Personal Data Protection Act (DPDP) 2023</strong> and the Indian Medical Council guidelines.
                                </p>
                            </motion.div>

                            {/* Data Collection */}
                            <motion.div id="information-we-collect" className="scroll-mt-28 bg-white rounded-3xl border border-slate-100 shadow-sm p-8 md:p-10"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h3 className="text-2xl font-black text-slate-900 mb-7">Information We Collect</h3>
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-[#003366]">
                                            <FileText size={22} />
                                        </div>
                                        <h4 className="font-black text-slate-800">Administrative Data</h4>
                                        <ul className="space-y-2.5">
                                            {["Full Name & ID (Aadhar/PAN)", "Contact Details & Emergency Contacts", "Insurance & Policy Information", "Digital identifiers (IP/Cookies)"].map(item => (
                                                <li key={item} className="flex items-center gap-2 text-slate-600 text-sm">
                                                    <CheckCircle2 size={14} className="text-[#003366] shrink-0" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                                            <Lock size={22} />
                                        </div>
                                        <h4 className="font-black text-slate-800">Clinical Data</h4>
                                        <ul className="space-y-2.5">
                                            {["Medical History & Vital Signs", "Lab Reports & Radiology Images", "Prescriptions & Surgical Notes", "Genetic & Family History Data"].map(item => (
                                                <li key={item} className="flex items-center gap-2 text-slate-600 text-sm">
                                                    <CheckCircle2 size={14} className="text-emerald-600 shrink-0" /> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Medical Records */}
                            <motion.div id="medical-records" className="scroll-mt-28"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                    <Eye className="text-[#003366] shrink-0" size={22} /> Medical Records Access
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    Access to medical records is strictly controlled and limited to treating physicians, nursing staff on duty, and
                                    administrative personnel with a defined need-to-know. Medical records are retained for a minimum of 7 years as
                                    mandated by the Clinical Establishments Act. Patients may request copies of their records in writing and will
                                    receive them within 72 working hours.
                                </p>
                            </motion.div>

                            {/* Government Schemes */}
                            <motion.div id="government-schemes" className="scroll-mt-28 rounded-3xl p-8 md:p-10 text-white shadow-2xl relative overflow-hidden"
                                style={{ background: "linear-gradient(135deg,#003366 0%,#1e40af 100%)" }}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(255,255,255,0.06)" }} />
                                <h3 className="text-2xl font-black mb-3 relative z-10">Government Health Schemes</h3>
                                <p className="text-blue-100 mb-6 text-sm leading-relaxed relative z-10">
                                    As a registered provider under major government health schemes, we process and share patient data in strict compliance with Rajasthan Government regulations:
                                </p>
                                <motion.div className="flex flex-wrap gap-3 relative z-10" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                    {["Mukhyamantri Ayushman Arogya", "RGHS", "ECHS", "RBSK", "Ayushman CAPF"].map(s => (
                                        <motion.span key={s} variants={fadeUp}
                                            className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-bold backdrop-blur-sm">
                                            {s}
                                        </motion.span>
                                    ))}
                                </motion.div>
                                <p className="mt-6 text-xs text-blue-200 italic flex items-center gap-2 relative z-10">
                                    <AlertCircle size={13} className="shrink-0" />
                                    Data sharing for these schemes is mandatory under applicable Rajasthan Government regulations.
                                </p>
                            </motion.div>

                            {/* Security */}
                            <motion.div id="security" className="scroll-mt-28"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <ShieldCheck className="text-[#003366] shrink-0" size={22} /> Security Standards
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {[
                                        { title: "AES-256 Encryption", desc: "All EMR data encrypted at rest and in transit — same grade as banking systems.", bg: "bg-blue-50", ic: "text-[#003366]", icon: <Lock size={20} /> },
                                        { title: "Strict Access Control", desc: "Need-to-know access policy enforced for all medical and admin staff.", bg: "bg-emerald-50", ic: "text-emerald-600", icon: <Eye size={20} /> },
                                        { title: "Physical Security", desc: "24/7 CCTV surveillance and biometric access to all record-storage areas.", bg: "bg-purple-50", ic: "text-purple-600", icon: <ShieldCheck size={20} /> },
                                    ].map(({ title, desc, bg, ic, icon }) => (
                                        <div key={title} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                                            <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center ${ic} mb-4`}>{icon}</div>
                                            <h4 className="font-black text-slate-800 mb-2">{title}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Your Rights */}
                            <motion.div id="your-rights" className="scroll-mt-28 bg-white border border-slate-100 rounded-3xl shadow-sm p-8"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h3 className="text-2xl font-black text-slate-900 mb-2">Your Privacy Rights</h3>
                                <p className="text-slate-400 text-sm mb-6">Under the DPDP Act 2023 and our hospital policy, you are entitled to:</p>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {[
                                        "Request copies of your medical records",
                                        "Correct inaccurate personal data",
                                        "Withdraw consent for marketing communications",
                                        "Request data portability in a structured format",
                                        "Lodge a complaint with the Data Protection Board",
                                        "Know exactly how your data is collected and used",
                                    ].map(r => (
                                        <div key={r} className="flex items-center gap-3 p-3.5 bg-blue-50/70 rounded-xl border border-blue-100">
                                            <div className="w-2 h-2 bg-[#003366] rounded-full shrink-0" />
                                            <span className="text-sm font-semibold text-slate-700">{r}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Cross-link to Terms */}
                            <motion.div className="flex items-center gap-4 bg-slate-100 rounded-2xl p-5"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <FileText size={20} className="text-[#003366] shrink-0" />
                                <p className="text-sm text-slate-600">
                                    This Privacy Policy is to be read alongside our{" "}
                                    <Link to="/terms" className="text-[#003366] font-black hover:underline">Terms of Service</Link>.
                                    Together they govern your use of Trinay Hospital services.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CONTACT CARD ── */}
            <section className="pb-24">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        className="rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl"
                        style={{ background: "linear-gradient(135deg,#003366 0%,#1e40af 100%)" }}
                        initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                    >
                        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: "rgba(255,255,255,0.05)" }} />
                        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
                            <div>
                                <h3 className="text-3xl font-black mb-4">Grievance & Privacy Queries</h3>
                                <p className="text-blue-100 mb-8 leading-relaxed">
                                    For data concerns or to exercise your privacy rights, contact our Data Protection Officer directly.
                                </p>
                                <div className="space-y-4">
                                    <a href="mailto:info@trinay.in" className="flex items-center gap-4 group">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white group-hover:text-[#003366] transition-all duration-300">
                                            <PhoneCall size={17} />
                                        </div>
                                        <span className="font-semibold group-hover:text-cyan-300 transition-colors">info@trinay.in</span>
                                    </a>
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                                            <MapPin size={17} />
                                        </div>
                                        <div className="text-sm">
                                            <p className="font-black">Trinay Hospital — Head Office</p>
                                            <p className="text-blue-200">Opp. Chopasni Garden, PF Office Rd, Jodhpur, RJ 342008</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl">
                                <h4 className="text-lg font-black mb-5 text-blue-200">Helpline Numbers</h4>
                                <div className="grid gap-4">
                                    <div className="bg-white/10 p-4 rounded-xl">
                                        <p className="text-xs uppercase tracking-widest text-blue-300 font-bold mb-1">Jodhpur</p>
                                        <p className="text-xl font-mono font-bold">+91 91191 91622</p>
                                    </div>
                                    <div className="bg-white/10 p-4 rounded-xl">
                                        <p className="text-xs uppercase tracking-widest text-blue-300 font-bold mb-1">Pali</p>
                                        <p className="text-xl font-mono font-bold">+91 98290 90061</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Privacy;
