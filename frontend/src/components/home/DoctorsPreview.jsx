import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Clock, Star, BadgeCheck, Users, Stethoscope } from "lucide-react";
import LoadingLink from "../common/LoadingLink";

const DOCTORS = [
    {
        name:        "Dr. Dhruva Sharma",
        designation: "Sr. Consultant",
        dept:        "Cardiology",
        qual:        "MBBS, MD, DM",
        timing:      "Mon–Sat  10 AM – 5 PM",
        exp:         "15+",
        patients:    "4,200+",
        img:         "/DOCTOR IAMGES/Dr. Dhruva Sharma.png",
        grad:        "from-rose-500 via-rose-600 to-red-700",
        ctaGrad:     "from-rose-500 to-red-600",
        ringColor:   "ring-rose-400/60",
        accentText:  "text-rose-600",
        accentBg:    "bg-rose-50",
        badgeBg:     "bg-rose-500",
    },
    {
        name:        "Dr. Sumeet Godhwani",
        designation: "Sr. Consultant",
        dept:        "General Medicine",
        qual:        "MBBS, MD",
        timing:      "Mon–Sat  10 AM – 5 PM",
        exp:         "12+",
        patients:    "6,800+",
        img:         "/DOCTOR IAMGES/Dr Sumeet godhwani.png",
        grad:        "from-blue-500 via-blue-600 to-indigo-700",
        ctaGrad:     "from-blue-500 to-indigo-600",
        ringColor:   "ring-blue-400/60",
        accentText:  "text-blue-600",
        accentBg:    "bg-blue-50",
        badgeBg:     "bg-blue-500",
    },
    {
        name:        "Dr. Pushpa Mathuria",
        designation: "Sr. Consultant",
        dept:        "Obs. & Gynaecology",
        qual:        "MBBS, MS",
        timing:      "Mon–Sat  10 AM – 4 PM",
        exp:         "18+",
        patients:    "9,500+",
        img:         "/DOCTOR IAMGES/Dr Pushpa Mathuriya.png",
        grad:        "from-pink-500 via-pink-600 to-rose-700",
        ctaGrad:     "from-pink-500 to-rose-600",
        ringColor:   "ring-pink-400/60",
        accentText:  "text-pink-600",
        accentBg:    "bg-pink-50",
        badgeBg:     "bg-pink-500",
    },
    {
        name:        "Dr. Amit Sharma",
        designation: "Consultant",
        dept:        "Orthopaedics",
        qual:        "MBBS, MS",
        timing:      "Mon–Sat  10 AM – 5 PM",
        exp:         "10+",
        patients:    "3,600+",
        img:         "/DOCTOR IAMGES/dr amit k. sharma.png",
        grad:        "from-teal-500 via-teal-600 to-emerald-700",
        ctaGrad:     "from-teal-500 to-emerald-600",
        ringColor:   "ring-teal-400/60",
        accentText:  "text-teal-600",
        accentBg:    "bg-teal-50",
        badgeBg:     "bg-teal-500",
    },
];

const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
    hidden:  { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const DoctorCard = ({ doc }) => (
    <motion.div
        variants={cardVariants}
        whileHover={{ y: -12, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="group relative flex flex-col rounded-[28px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.07)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-400 border border-slate-100/80"
    >
        {/* ── Gradient Header ── */}
        <div className={`relative h-40 bg-linear-to-br ${doc.grad} flex-shrink-0 overflow-hidden`}>

            {/* Dot texture */}
            <div className="absolute inset-0 opacity-[0.12]"
                style={{ backgroundImage: "radial-gradient(white 1.2px,transparent 1.2px)", backgroundSize: "18px 18px" }} />

            {/* Large faded icon in background */}
            <Stethoscope
                size={110}
                className="absolute -right-4 -bottom-4 text-white/10 rotate-[-20deg]"
                strokeWidth={1}
            />

            {/* Dept badge top-left */}
            <span className="absolute top-4 left-4 text-[9px] font-black uppercase tracking-[0.18em]
                             bg-white/20 backdrop-blur-md text-white border border-white/30
                             px-3 py-1.5 rounded-full shadow-sm">
                {doc.dept}
            </span>

            {/* Experience badge top-right */}
            <div className="absolute top-4 right-4 flex flex-col items-center bg-white/15 backdrop-blur-md
                            border border-white/30 rounded-2xl px-3 py-1.5 shadow-sm">
                <span className="text-white font-black text-sm leading-none">{doc.exp}</span>
                <span className="text-white/75 text-[9px] font-semibold">yrs exp</span>
            </div>

            {/* Bottom fade to merge with photo */}
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-white/20 to-transparent" />
        </div>

        {/* ── Circular Photo — overlaps header ── */}
        <div className="flex justify-center -mt-[52px] relative z-10 px-6">
            <div className={`relative w-[104px] h-[104px] rounded-full ring-4 ring-white ring-offset-0
                            shadow-[0_8px_32px_rgba(0,0,0,0.18)] overflow-hidden
                            bg-linear-to-br ${doc.grad} flex-shrink-0`}>
                <img
                    src={doc.img}
                    alt={doc.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.06]"
                    loading="lazy"
                />
                {/* Verified badge on photo */}
                <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-md">
                    <BadgeCheck size={14} className={doc.accentText} fill="currentColor" />
                </div>
            </div>
        </div>

        {/* ── Card Body ── */}
        <div className="px-5 pt-3 pb-5 flex flex-col flex-1 text-center">

            {/* Name + designation */}
            <h3 className="text-[17px] font-black text-[#003366] leading-snug tracking-tight">
                {doc.name}
            </h3>
            <p className={`text-xs font-bold mt-1 ${doc.accentText}`}>{doc.designation}</p>

            {/* Star rating */}
            <div className="flex items-center justify-center gap-0.5 mt-2.5">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={12} fill="#FBBF24" className="text-amber-400" />
                ))}
                <span className="text-[11px] text-slate-400 ml-1.5 font-bold">4.9</span>
            </div>

            {/* Divider */}
            <div className="mt-4 border-t border-dashed border-slate-100" />

            {/* Info rows */}
            <div className="mt-3.5 space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                    <GraduationCap size={13} className="text-slate-400 shrink-0" />
                    <span className="font-semibold">{doc.qual}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                    <Clock size={13} className="shrink-0" />
                    <span>{doc.timing}</span>
                </div>
            </div>

            {/* Patients served badge */}
            <div className={`mt-4 flex items-center justify-center gap-1.5 ${doc.accentBg} ${doc.accentText}
                             rounded-full px-3 py-1.5 text-[11px] font-black self-center`}>
                <Users size={11} />
                {doc.patients} patients treated
            </div>

            {/* CTA */}
            <LoadingLink
                to={`/appointment?dept=${encodeURIComponent(doc.dept)}`}
                className={`mt-4 w-full flex items-center justify-center gap-2
                            bg-linear-to-r ${doc.ctaGrad} text-white text-sm font-black
                            py-3.5 rounded-2xl transition-all duration-300
                            hover:scale-[1.03] hover:shadow-xl active:scale-95
                            shadow-md tracking-wide`}
            >
                Book Appointment <ArrowRight size={14} />
            </LoadingLink>
        </div>
    </motion.div>
);

const DoctorsPreview = () => (
    <section className="relative py-20 md:py-28 overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-b from-[#eef4ff] via-white to-white" />

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle,#6366f1 0%,transparent 70%)" }} />
        <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full blur-[110px] opacity-15 pointer-events-none"
            style={{ background: "radial-gradient(circle,#0ea5e9 0%,transparent 70%)" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full blur-[100px] opacity-[0.07] pointer-events-none bg-blue-400" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

            {/* Heading */}
            <motion.div
                className="text-center max-w-3xl mx-auto mb-14"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
            >
                <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.22em] text-blue-500 mb-4
                                 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full">
                    <BadgeCheck size={13} />
                    Meet Our Specialists
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003366] leading-tight mt-2">
                    Doctors You Can{" "}
                    <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Trust With Your Life
                    </span>
                </h2>
                <p className="text-slate-500 mt-4 text-base sm:text-lg leading-relaxed">
                    50+ specialists across every major discipline — dedicated to your best possible health outcome.
                </p>
            </motion.div>

            {/* Doctor cards */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.08 }}
            >
                {DOCTORS.map((doc) => (
                    <DoctorCard key={doc.name} doc={doc} />
                ))}
            </motion.div>

            {/* CTA */}
            <motion.div
                className="flex justify-center mt-12"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
            >
                <LoadingLink
                    to="/doctors"
                    className="inline-flex items-center gap-2.5 border-2 border-[#003366] text-[#003366]
                               hover:bg-[#003366] hover:text-white px-8 py-4 rounded-full font-black
                               text-base transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm
                               hover:shadow-xl hover:shadow-blue-200/50"
                >
                    View All Doctors <ArrowRight size={18} />
                </LoadingLink>
            </motion.div>
        </div>
    </section>
);

export default DoctorsPreview;
