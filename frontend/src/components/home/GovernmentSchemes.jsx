import { motion } from "framer-motion";
import { BadgeCheck, ExternalLink, ShieldCheck, Banknote, Users } from "lucide-react";

const HIGHLIGHTS = [
    { Icon: Banknote,    text: "Up to ₹5 Lakh cashless coverage per year" },
    { Icon: Users,       text: "BPL families & marginalised sections covered" },
    { Icon: ShieldCheck, text: "Trinay Hospital is fully empanelled & approved" },
];

const GovernmentSchemes = () => (
    <section className="relative py-16 md:py-24 bg-[#F8FAFC] overflow-hidden">
        {/* Soft blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-orange-100/60 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

            {/* Eyebrow */}
            <motion.p
                className="text-center text-sm font-bold uppercase tracking-[0.22em] text-[#003366] mb-3"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }} viewport={{ once: true }}
            >
                Government Empanelled Scheme
            </motion.p>
            <motion.h2
                className="text-center text-3xl sm:text-4xl lg:text-5xl font-black text-[#003366] leading-tight mb-12"
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.08 }} viewport={{ once: true }}
            >
                Cashless Treatment Under{" "}
                <span className="bg-linear-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">
                    Maa Yojana
                </span>
            </motion.h2>

            {/* Card */}
            <motion.div
                className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row"
                initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.12 }} viewport={{ once: true }}
            >
                {/* Logo panel */}
                <div className="md:w-2/5 bg-[#e85d04] flex items-center justify-center p-10 min-h-55 md:min-h-0 relative overflow-hidden shrink-0">
                    <div
                        className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "radial-gradient(white 1.5px,transparent 1.5px)", backgroundSize: "22px 22px" }}
                    />
                    <img
                        src="/DOCTOR IAMGES/MAA JOGANA .png"
                        alt="Mukhyamantri Ayushman Arogya Yojana"
                        className="relative z-10 w-44 sm:w-52 md:w-56 h-auto object-contain drop-shadow-2xl"
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                {/* Content panel */}
                <div className="flex-1 p-7 sm:p-9 md:p-12 flex flex-col justify-center">
                    {/* Status */}
                    <div className="inline-flex items-center gap-2 mb-4 self-start">
                        <BadgeCheck size={15} className="text-emerald-500 shrink-0" />
                        <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full border bg-emerald-50 text-emerald-600 border-emerald-200">
                            Approved & Empanelled
                        </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-[#003366] leading-snug mb-1">
                        Mukhyamantri Ayushman Arogya Yojana
                    </h3>
                    <p className="text-[#006fa3] font-bold text-sm mb-4">Rajasthan State Government Scheme</p>

                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
                        Mukhyamantri Ayushman Arogya Yojana provides free, cashless healthcare to BPL families
                        and marginalised communities. Trinay Hospital is fully empanelled — simply walk in
                        with your MAA Yojana card for seamless, quality treatment.
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-3 mb-7">
                        {HIGHLIGHTS.map(({ Icon, text }) => (
                            <li key={text} className="flex items-start gap-3">
                                <span className="w-8 h-8 rounded-xl bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                                    <Icon size={15} className="text-orange-500" />
                                </span>
                                <span className="text-sm text-slate-600 font-medium leading-snug">{text}</span>
                            </li>
                        ))}
                    </ul>

                    <a
                        href="https://health.rajasthan.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="self-start inline-flex items-center gap-2 bg-[#003366] hover:bg-orange-500 text-white text-sm font-black px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                    >
                        Know More <ExternalLink size={14} />
                    </a>
                </div>
            </motion.div>
        </div>
    </section>
);

export default GovernmentSchemes;
