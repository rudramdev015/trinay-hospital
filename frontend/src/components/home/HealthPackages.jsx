import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Star, Shield, Zap, Crown } from "lucide-react";
import LoadingLink from "../common/LoadingLink";

const PACKAGES = [
    {
        name: "Essential Health",
        tag: "STARTER",
        price: "₹999",
        tagline: "Perfect yearly baseline screening",
        popular: false,
        Icon: Shield,
        grad: "from-slate-700 to-slate-900",
        gradLight: "from-slate-50 to-slate-100",
        ring: "ring-slate-200",
        checkColor: "text-slate-500",
        ctaClass: "bg-slate-800 hover:bg-slate-700 shadow-slate-200",
        tagClass: "bg-slate-100 text-slate-700",
        tests: [
            "Complete Blood Count (CBC)",
            "Blood Sugar (Fasting & PP)",
            "Lipid Profile",
            "Kidney Function Test",
            "Urine Routine & Microscopy",
            "Chest X-Ray",
            "BMI & Vitals Assessment",
        ],
    },
    {
        name: "Comprehensive Care",
        tag: "MOST POPULAR",
        price: "₹2,499",
        tagline: "Our all-in-one health package",
        popular: true,
        Icon: Zap,
        grad: "from-blue-600 to-cyan-500",
        gradLight: "from-blue-50 to-cyan-50",
        ring: "ring-blue-300",
        checkColor: "text-blue-500",
        ctaClass: "bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-blue-200",
        tagClass: "bg-blue-600 text-white",
        tests: [
            "Everything in Essential",
            "Thyroid Profile (T3, T4, TSH)",
            "Liver Function Test",
            "ECG & 2D Echo",
            "HbA1c (Diabetes Screen)",
            "Vitamin B12 & D3",
            "Abdominal Ultrasound",
            "Pulmonary Function Test",
            "Specialist Consultation",
        ],
    },
    {
        name: "Executive Premium",
        tag: "ELITE",
        price: "₹4,999",
        tagline: "Complete assurance for professionals",
        popular: false,
        Icon: Crown,
        grad: "from-purple-700 to-violet-900",
        gradLight: "from-purple-50 to-violet-50",
        ring: "ring-purple-200",
        checkColor: "text-purple-500",
        ctaClass: "bg-purple-700 hover:bg-purple-600 shadow-purple-200",
        tagClass: "bg-purple-100 text-purple-700",
        tests: [
            "Everything in Comprehensive",
            "CT Scan (Chest/Abdomen)",
            "Tumour Markers (PSA / CA-125)",
            "Bone Density (DEXA Scan)",
            "Eye & Vision Screening",
            "Dental Check-Up",
            "Stress Test (TMT)",
            "Nutritionist Consultation",
            "Detailed Health Report",
            "Follow-Up Visit Included",
        ],
    },
];

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
const cardV = {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const PackageCard = ({ pkg }) => (
    <motion.div
        variants={cardV}
        whileHover={{ y: pkg.popular ? -12 : -8 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`relative flex flex-col rounded-3xl bg-white overflow-hidden
            border-2 ring-2 ${pkg.ring}
            ${pkg.popular
                ? "border-blue-400 shadow-2xl shadow-blue-100 scale-[1.02] lg:scale-[1.04] z-10"
                : "border-slate-100 shadow-lg hover:shadow-xl"
            } transition-shadow duration-300`}
    >
        {/* Gradient header */}
        <div className={`relative bg-linear-to-br ${pkg.grad} px-6 pt-7 pb-10`}>
            {/* Dot pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "16px 16px" }} />

            {/* Popular ribbon */}
            {pkg.popular && (
                <div className="absolute -top-px right-6 bg-amber-400 text-amber-900 text-[10px] font-black uppercase tracking-widest
                                px-3 py-1.5 rounded-b-xl flex items-center gap-1 shadow-lg">
                    <Star size={10} fill="currentColor" /> Best Value
                </div>
            )}

            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest
                             px-3 py-1 rounded-full ${pkg.tagClass}`}>
                <pkg.Icon size={11} />
                {pkg.tag}
            </span>

            <p className="mt-4 text-4xl font-black text-white tracking-tight">{pkg.price}</p>
            <p className="mt-1 text-sm text-white/75 font-medium">{pkg.tagline}</p>
        </div>

        {/* Curved divider — negative margin overlap */}
        <div className={`-mt-5 rounded-t-[28px] bg-white flex-1 flex flex-col`}>
            {/* Tests list */}
            <ul className="flex-1 px-6 pt-5 pb-4 space-y-2.5">
                {pkg.tests.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm text-slate-600 leading-snug">
                        <CheckCircle2 size={15} className={`${pkg.checkColor} shrink-0 mt-0.5`} />
                        {t}
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <div className="px-6 pb-6 pt-3">
                <LoadingLink
                    to="/appointment"
                    className={`w-full flex items-center justify-center gap-2 ${pkg.ctaClass} text-white
                               font-black py-3.5 rounded-2xl transition-all duration-300
                               hover:scale-[1.03] active:scale-95 text-sm shadow-lg`}
                >
                    Book This Package <ArrowRight size={15} />
                </LoadingLink>
            </div>
        </div>
    </motion.div>
);

const HealthPackages = () => (
    <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-linear-to-b from-[#eef4ff] via-[#f5f9ff] to-white" />

        {/* Decorative blobs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full blur-[120px] opacity-20 pointer-events-none"
            style={{ background: "radial-gradient(circle,#6366f1 0%,transparent 70%)" }} />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-15 pointer-events-none"
            style={{ background: "radial-gradient(circle,#0ea5e9 0%,transparent 70%)" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

            {/* Heading */}
            <motion.div
                className="text-center max-w-3xl mx-auto mb-14"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
            >
                <span className="inline-block text-xs font-black uppercase tracking-[0.22em] text-blue-500 mb-3
                                 bg-blue-50 px-4 py-1.5 rounded-full">
                    Preventive Health Checkups
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003366] leading-tight mt-3">
                    Invest in Your Health.{" "}
                    <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Choose a Package.
                    </span>
                </h2>
                <p className="text-slate-500 mt-4 text-base sm:text-lg leading-relaxed">
                    Comprehensive health screening at transparent, affordable prices —{" "}
                    <span className="font-semibold text-slate-600">no hidden charges.</span>
                </p>
            </motion.div>

            {/* Cards grid */}
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start"
                variants={containerV}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {PACKAGES.map((pkg) => (
                    <PackageCard key={pkg.name} pkg={pkg} />
                ))}
            </motion.div>

            {/* Bottom note */}
            <motion.p
                className="text-center text-sm text-slate-400 font-medium mt-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                viewport={{ once: true }}
            >
                Need a custom package?{" "}
                <a href="/contact" className="text-blue-600 font-bold hover:underline underline-offset-2">
                    Talk to our health advisor →
                </a>
            </motion.p>
        </div>
    </section>
);

export default HealthPackages;
