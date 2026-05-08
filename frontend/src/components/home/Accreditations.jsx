import { motion } from "framer-motion";
import { BadgeCheck, ShieldCheck, HeartHandshake } from "lucide-react";

const CERTS = [
    {
        src: "/DOCTOR IAMGES/NABH.png",
        alt: "NABH",
        Icon: ShieldCheck,
        title: "NABH Accredited",
        desc: "Certified by the National Accreditation Board for Hospitals & Healthcare Providers — India's gold standard for patient safety and quality care.",
        glow: "rgba(56,189,248,0.25)",
        badge: "National",
    },
    {
        src: "/DOCTOR IAMGES/ESIC.png",
        alt: "ESIC",
        Icon: BadgeCheck,
        title: "ESIC Empanelled",
        desc: "Officially empanelled under the Employees' State Insurance Corporation for cashless treatment of insured workers and their dependants.",
        glow: "rgba(167,243,208,0.22)",
        badge: "Govt. Empanelled",
    },
    {
        src: "/DOCTOR IAMGES/MAA JOGANA .png",
        alt: "Maa Yojana",
        Icon: HeartHandshake,
        title: "Maa Yojana Approved",
        desc: "Approved under the Rajasthan Maa scheme — providing free maternal and child healthcare services to families across Jodhpur.",
        glow: "rgba(251,191,36,0.22)",
        badge: "Rajasthan Govt.",
    },
];

const containerV = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.18 } },
};

const itemV = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const Accreditations = () => (
    <section className="relative py-24 md:py-32 overflow-hidden"
        style={{ background: "linear-gradient(135deg,#021390 0%,#041AA9 45%,#0a2a80 100%)" }}>

        {/* ── Decorative mesh / grid ─────────────────────── */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "30px 30px" }} />

        {/* Glowing orbs */}
        <div className="absolute -top-32 -left-32 w-125 h-125 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(99,102,241,0.25) 0%,transparent 70%)" }} />
        <div className="absolute -bottom-24 -right-24 w-105 h-105 rounded-full pointer-events-none"
            style={{ background: "radial-gradient(circle,rgba(14,165,233,0.2) 0%,transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

            {/* ── Heading ─────────────────────────────────── */}
            <motion.div
                className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
            >
                <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm
                                 text-cyan-300 text-[11px] font-black uppercase tracking-[0.25em]
                                 px-5 py-2 rounded-full mb-5">
                    <ShieldCheck size={13} />
                    Certified · Accredited · Trusted
                </span>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mt-2">
                    Recognised by{" "}
                    <span style={{ background: "linear-gradient(90deg,#67e8f9,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        India's Highest Authorities
                    </span>
                </h2>

                <p className="mt-5 text-blue-200/75 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
                    Trinay Hospital is proudly accredited and empanelled by national and state bodies —
                    a commitment to the{" "}
                    <span className="text-white font-semibold">highest standards of patient safety and care.</span>
                </p>
            </motion.div>

            {/* ── Cards ───────────────────────────────────── */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8"
                variants={containerV}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.15 }}
            >
                {CERTS.map(({ src, alt, Icon, title, desc, glow, badge }) => (
                    <motion.div
                        key={alt}
                        variants={itemV}
                        whileHover={{ y: -8, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 240, damping: 18 }}
                        className="relative flex flex-col items-center text-center rounded-3xl border border-white/12 backdrop-blur-sm overflow-hidden group"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                        {/* Card inner glow on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                            style={{ background: `radial-gradient(circle at 50% 30%,${glow},transparent 70%)` }} />

                        {/* Badge pill */}
                        <div className="absolute top-5 right-5">
                            <span className="inline-flex items-center gap-1 bg-white/12 border border-white/20 text-white/70
                                             text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                                <Icon size={9} />
                                {badge}
                            </span>
                        </div>

                        <div className="relative px-8 pt-12 pb-10 flex flex-col items-center gap-6">
                            {/* Logo — NO background, direct image */}
                            <div className="relative flex items-center justify-center">
                                {/* Glow ring behind logo */}
                                <div className="absolute w-28 h-28 rounded-full blur-2xl opacity-40 pointer-events-none"
                                    style={{ background: glow }} />
                                <motion.img
                                    src={src}
                                    alt={alt}
                                    className="relative h-20 sm:h-24 w-auto max-w-37.5 object-contain select-none"
                                    style={{ filter: "drop-shadow(0 0 16px rgba(255,255,255,0.25))" }}
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                        e.currentTarget.previousSibling.style.display = "flex";
                                    }}
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                />
                            </div>

                            {/* Divider line */}
                            <div className="w-12 h-px bg-white/20" />

                            {/* Text */}
                            <div>
                                <h3 className="text-lg sm:text-xl font-black text-white mb-3">{title}</h3>
                                <p className="text-blue-200/70 text-sm leading-relaxed">{desc}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

        </div>
    </section>
);

export default Accreditations;
