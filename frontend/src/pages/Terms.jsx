import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    FileText, Calendar, CreditCard, Shield, Scale,
    AlertTriangle, Phone, MapPin, ChevronRight, CheckCircle2,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const TOC = [
    "Acceptance of Terms",
    "Medical Services",
    "Appointment Policy",
    "Payment & Billing",
    "Intellectual Property",
    "Privacy",
    "Limitation of Liability",
    "Governing Law",
    "Amendments",
    "Contact Us",
];

const Terms = () => {
    const lastUpdated = "March 1, 2024";

    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900">
            <Navbar />

            {/* ── HERO ── */}
            <section
                className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden"
                style={{ background: "linear-gradient(135deg,#001f4d 0%,#003366 55%,#1e40af 100%)" }}
            >
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="absolute top-0 right-0 w-[480px] h-[480px] rounded-full blur-[130px] pointer-events-none"
                    style={{ background: "rgba(96,165,250,0.18)" }} />
                <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
                    style={{ background: "rgba(103,232,249,0.13)" }} />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                        <FileText size={14} /> Legal Agreement
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.13, duration: 0.6 }}
                        className="text-5xl md:text-7xl font-black text-white mb-5 leading-tight tracking-tight">
                        Terms of{" "}
                        <span style={{
                            background: "linear-gradient(to right,#67e8f9,#93c5fd)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>
                            Service
                        </span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24, duration: 0.6 }}
                        className="text-blue-100/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        By using Trinay Hospital's services, you agree to these terms. Please read them carefully before booking an appointment or accessing our facilities.
                    </motion.p>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38, duration: 0.6 }}
                        className="mt-6 text-blue-300 text-sm font-mono tracking-widest uppercase">
                        Last Updated: {lastUpdated}
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
                                        <a key={item} href={`#${item.replace(/\s+/g, "-").toLowerCase()}`}
                                            className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#003366] border-l-2 border-slate-200 hover:border-[#003366] pl-4 py-2 transition-all duration-200">
                                            {item}
                                        </a>
                                    ))}
                                </nav>
                                <div className="mt-10 p-5 bg-blue-50 rounded-2xl border border-blue-100">
                                    <p className="text-xs font-black text-[#003366] uppercase tracking-widest mb-2">Questions?</p>
                                    <a href="mailto:info@trinay.in" className="text-sm text-blue-600 font-bold hover:underline">info@trinay.in</a>
                                </div>
                            </div>
                        </aside>

                        {/* Content */}
                        <div className="lg:col-span-9 space-y-14">

                            {/* Emergency Notice */}
                            <motion.div className="flex items-start gap-4 bg-amber-50 border border-amber-200 rounded-2xl p-5"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
                                <p className="text-sm text-amber-800 leading-relaxed">
                                    <strong>Medical Emergency?</strong> Call <strong>112</strong> immediately or go directly to our 24/7 Emergency Department. Do not rely on this website for emergency guidance.
                                </p>
                            </motion.div>

                            {/* Acceptance */}
                            <motion.div id="acceptance-of-terms" className="scroll-mt-28"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2 className="text-3xl font-black text-slate-900 mb-5 flex items-center gap-3">
                                    <span className="w-8 h-1.5 bg-[#003366] rounded-full shrink-0" /> Acceptance of Terms
                                </h2>
                                <p className="text-slate-600 text-lg leading-relaxed">
                                    By accessing or using any services provided by <strong>Trinay Hospital Private Limited</strong> ("Trinay Hospital") — including our website, mobile platform, appointment booking system, or physical facilities in <strong>Jodhpur</strong> and <strong>Pali</strong> — you confirm that you have read, understood, and agree to be bound by these Terms of Service and our{" "}
                                    <Link to="/privacy" className="text-[#003366] font-bold hover:underline">Privacy Policy</Link>.
                                    If you do not agree, you must not use our services.
                                </p>
                            </motion.div>

                            {/* Medical Services */}
                            <motion.div id="medical-services" className="scroll-mt-28 bg-white rounded-3xl border border-slate-100 shadow-sm p-8"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center text-[#003366] shrink-0">
                                        <Shield size={18} />
                                    </div>
                                    Medical Services
                                </h3>
                                <p className="text-slate-600 mb-5 leading-relaxed">
                                    Trinay Hospital offers inpatient, outpatient, emergency, surgical, and diagnostic services across 15+ specialties. All clinical decisions are made solely by licensed medical professionals registered with the Medical Council of India. By using our services, you acknowledge:
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Medical information on this website is for general guidance only and does not constitute a doctor-patient relationship.",
                                        "Treatment outcomes cannot be guaranteed and depend on individual patient circumstances.",
                                        "Second opinions are the right of every patient and are actively encouraged by our team.",
                                        "All procedures carry inherent risks that are communicated through formal informed-consent documentation.",
                                        "Specialist availability is subject to OPD schedules; emergency care is available 24/7.",
                                    ].map(item => (
                                        <li key={item} className="flex items-start gap-3 text-slate-600 text-sm">
                                            <CheckCircle2 size={15} className="text-[#003366] shrink-0 mt-0.5" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Appointment Policy */}
                            <motion.div id="appointment-policy" className="scroll-mt-28"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                    <Calendar className="text-[#003366] shrink-0" size={22} /> Appointment Policy
                                </h3>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    {[
                                        { title: "Booking", desc: "Appointments may be booked online, by phone (+91 91191 91622), or in person. A confirmation SMS/email will be sent on successful booking." },
                                        { title: "Cancellation", desc: "Cancellations made at least 24 hours in advance incur no fee. Same-day cancellations may forfeit any advance booking deposit." },
                                        { title: "Rescheduling", desc: "Patients may reschedule appointments up to 12 hours before the scheduled time, subject to doctor availability." },
                                        { title: "No-Show Policy", desc: "Repeated no-shows (3+) may restrict online booking access. Please inform us promptly if you cannot attend." },
                                    ].map(({ title, desc }) => (
                                        <div key={title} className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                                            <h4 className="font-black text-[#003366] mb-2">{title}</h4>
                                            <p className="text-sm text-slate-600 leading-relaxed">{desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Payment */}
                            <motion.div id="payment-&-billing" className="scroll-mt-28 bg-white rounded-3xl border border-slate-100 shadow-sm p-8"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 shrink-0">
                                        <CreditCard size={18} />
                                    </div>
                                    Payment & Billing
                                </h3>
                                <p className="text-slate-600 mb-5 leading-relaxed">
                                    All charges are transparently communicated before treatment begins. We accept cash, UPI, debit/credit cards, and process claims under all empanelled insurance and TPA schemes. Key billing terms:
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        "Advance deposits may be required for elective and planned surgical procedures.",
                                        "Final bills are generated at discharge; itemised bills are available on request at any time.",
                                        "Insurance claims are processed within timelines set by the respective TPA or insurer.",
                                        "Any balance not covered by insurance is payable by the patient before discharge.",
                                        "Disputed bills must be raised in writing within 7 days of receipt with supporting documents.",
                                    ].map(item => (
                                        <li key={item} className="flex items-start gap-3 text-slate-600 text-sm">
                                            <CheckCircle2 size={15} className="text-emerald-600 shrink-0 mt-0.5" /> {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {/* Intellectual Property */}
                            <motion.div id="intellectual-property" className="scroll-mt-28"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h2 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-1.5 bg-[#003366] rounded-full shrink-0" /> Intellectual Property
                                </h2>
                                <p className="text-slate-600 leading-relaxed">
                                    All content on the Trinay Hospital website and patient portal — including logos, branding, text, images, videos, infographics, and digital graphics — is the exclusive property of <strong>Trinay Hospital Private Limited</strong> and is protected by Indian copyright law (Copyright Act, 1957). Reproduction, distribution, or commercial use without explicit written permission is strictly prohibited. Unauthorised use may result in legal action.
                                </p>
                            </motion.div>

                            {/* Privacy */}
                            <motion.div id="privacy" className="scroll-mt-28 rounded-3xl p-8 text-white relative overflow-hidden"
                                style={{ background: "linear-gradient(135deg,#003366 0%,#1e40af 100%)" }}
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <div className="absolute top-0 right-0 w-56 h-56 rounded-full blur-[80px] pointer-events-none" style={{ background: "rgba(255,255,255,0.06)" }} />
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black mb-3 flex items-center gap-3">
                                        <Shield size={22} /> Privacy & Confidentiality
                                    </h3>
                                    <p className="text-blue-100 mb-5 leading-relaxed">
                                        Your personal and medical data is protected under our dedicated Privacy Policy, which forms an integral part of these Terms. We are fully committed to data security, DPDP Act 2023 compliance, and complete transparency in how your data is used and shared.
                                    </p>
                                    <Link to="/privacy"
                                        className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 border border-white/30 px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105">
                                        Read Full Privacy Policy <ChevronRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Limitation of Liability */}
                            <motion.div id="limitation-of-liability" className="scroll-mt-28 bg-white border border-slate-100 rounded-3xl shadow-sm p-8"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">Limitation of Liability</h3>
                                <p className="text-slate-600 leading-relaxed">
                                    To the maximum extent permitted by applicable Indian law, Trinay Hospital's liability for any claim arising from these Terms shall be limited to the fees paid for the specific service giving rise to the claim. We are not liable for indirect, incidental, or consequential damages. This does not restrict liability arising from medical negligence, which is separately governed by the Consumer Protection Act 2019 and the Indian Medical Council Code of Ethics.
                                </p>
                            </motion.div>

                            {/* Governing Law */}
                            <motion.div id="governing-law" className="scroll-mt-28"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                    <Scale className="text-[#003366] shrink-0" size={22} /> Governing Law
                                </h3>
                                <p className="text-slate-600 leading-relaxed">
                                    These Terms of Service are governed exclusively by the laws of the <strong>Republic of India</strong>. Any disputes arising from the use of our services shall be subject to the exclusive jurisdiction of the courts in <strong>Jodhpur, Rajasthan</strong>. Patient complaints related to consumer rights fall under the Consumer Protection Act, 2019 and the District Consumer Disputes Redressal Forum, Jodhpur.
                                </p>
                            </motion.div>

                            {/* Amendments */}
                            <motion.div id="amendments" className="scroll-mt-28 bg-amber-50 border border-amber-100 rounded-2xl p-6"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h3 className="text-xl font-black text-slate-900 mb-3 flex items-center gap-2">
                                    <AlertTriangle size={18} className="text-amber-600" /> Amendments
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">
                                    Trinay Hospital reserves the right to modify these Terms at any time. Updated Terms will be published on this page with a revised "Last Updated" date. Continued use of our services after changes are posted constitutes your acceptance of the revised Terms.
                                </p>
                            </motion.div>

                            {/* Contact */}
                            <motion.div id="contact-us" className="scroll-mt-28"
                                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-1.5 bg-[#003366] rounded-full shrink-0" /> Contact Us
                                </h3>
                                <p className="text-slate-600 mb-6 leading-relaxed">
                                    For questions about these Terms or any legal queries, please contact our administrative and legal team:
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href="mailto:info@trinay.in"
                                        className="flex items-center gap-3 px-5 py-3.5 bg-[#003366] text-white rounded-xl font-bold text-sm hover:bg-[#002244] transition-all hover:scale-105 shadow-md">
                                        <Phone size={15} /> info@trinay.in
                                    </a>
                                    <div className="flex items-center gap-3 px-5 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-semibold text-sm">
                                        <MapPin size={15} className="text-[#003366] shrink-0" />
                                        Opp. Chopasni Garden, Jodhpur, RJ 342008
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Terms;
