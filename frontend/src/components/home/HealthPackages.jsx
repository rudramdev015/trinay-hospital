import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight, Star, Activity, Heart, Users } from "lucide-react";
import LoadingLink from "../common/LoadingLink";

const PACKAGES = [
    {
        id: "screening",
        name: "Trinay Suraksha Screening",
        tag: "ENTRY",
        price: "₹999",
        originalPrice: "₹2,300",
        tagline: "Essential annual health baseline",
        popular: false,
        Icon: Activity,
        grad: "from-teal-600 to-emerald-500",
        ring: "ring-teal-200",
        border: "border-teal-100",
        checkColor: "text-teal-500",
        ctaClass: "bg-linear-to-r from-teal-600 to-emerald-500 hover:from-teal-500 hover:to-emerald-400 shadow-teal-200",
        tagClass: "bg-teal-100 text-teal-700",
        tests: [
            "CBC-ESR (Complete Blood Count)",
            "Cholesterol & Triglycerides",
            "SGOT, SGPT (Liver Enzymes)",
            "Urea & Creatinine",
            "Uric Acid & Calcium",
            "TSH (Thyroid Screening)",
            "ECG (Heart Trace)",
            "Urine Complete Examination",
            "Physician Consultation",
        ],
    },
    {
        id: "basic",
        name: "Trinay Suraksha Basic",
        tag: "MOST POPULAR",
        price: "₹1,599",
        originalPrice: "₹4,050",
        tagline: "Comprehensive full-body screening",
        popular: true,
        Icon: Heart,
        grad: "from-blue-600 to-cyan-500",
        ring: "ring-blue-300",
        border: "border-blue-300",
        checkColor: "text-blue-500",
        ctaClass: "bg-linear-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-blue-200",
        tagClass: "bg-blue-600 text-white",
        tests: [
            "CBC-ESR (Complete Blood Count)",
            "HbA1C (Diabetes Screen)",
            "Lipid Profile — Full Panel",
            "RFT — Urea, Creatinine & Electrolytes",
            "LFT — SGOT, SGPT, GGT, ALP, Bilirubin, Protein, Albumin",
            "Calcium, Phosphorus, Uric Acid",
            "TSH (Thyroid)",
            "ECG",
            "Urine Complete Examination",
            "Physician Consultation",
        ],
    },
    {
        id: "couple",
        name: "Trinay Suraksha Couple",
        tag: "PREMIUM",
        price: "₹5,599",
        priceLabel: "/ couple",
        originalPrice: "₹12,999",
        malePricing: { price: "₹2,799", original: "₹5,599", label: "Male" },
        femalePricing: { price: "₹3,399", original: "₹7,400", label: "Female" },
        tagline: "Complete wellness for both partners",
        popular: false,
        Icon: Users,
        grad: "from-rose-600 to-pink-500",
        ring: "ring-rose-200",
        border: "border-rose-100",
        checkColor: "text-rose-500",
        ctaClass: "bg-linear-to-r from-rose-600 to-pink-500 hover:from-rose-500 hover:to-pink-400 shadow-rose-200",
        tagClass: "bg-rose-100 text-rose-700",
        tests: [
            "CBC-ESR, Blood Sugar, HbA1C",
            "Lipid Profile — Full Panel",
            "RFT — Urea, Creatinine & Electrolytes",
            "LFT — Complete Liver Panel",
            "T3, T4, TSH (Thyroid)",
            "Vitamin D3 & B12",
            "Chest X-Ray & ECG",
            "ECHO & TMT (Stress Test)",
            "Sonography (female only)",
            "Gynae Consultation (female only)",
            "Physiotherapy Consultation",
            "Physician Consultation",
        ],
    },
];

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.13 } } };
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
            border-2 ring-2 ${pkg.ring} ${pkg.border}
            ${pkg.popular
                ? "border-blue-400 shadow-2xl shadow-blue-100 scale-[1.02] lg:scale-[1.04] z-10"
                : "shadow-lg hover:shadow-xl"
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

            {/* Tag */}
            <span className={`inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest
                             px-3 py-1 rounded-full ${pkg.tagClass}`}>
                <pkg.Icon size={11} />
                {pkg.tag}
            </span>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-2 flex-wrap">
                <p className="text-4xl font-black text-white tracking-tight leading-none">{pkg.price}</p>
                {pkg.priceLabel && (
                    <span className="text-base font-semibold text-white/70">{pkg.priceLabel}</span>
                )}
                <span className="text-sm text-white/50 line-through font-medium">{pkg.originalPrice}</span>
            </div>
            <p className="mt-1.5 text-sm text-white/75 font-medium">{pkg.tagline}</p>

            {/* Couple sub-pricing grid */}
            {pkg.malePricing && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                    {[pkg.malePricing, pkg.femalePricing].map((p) => (
                        <div key={p.label} className="bg-white/15 border border-white/20 backdrop-blur-sm rounded-2xl px-3 py-2.5 text-center">
                            <p className="text-[10px] font-black text-white/60 uppercase tracking-wider">{p.label} only</p>
                            <p className="text-xl font-black text-white leading-none mt-1">{p.price}</p>
                            <p className="text-[10px] text-white/45 line-through mt-0.5">{p.original}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* White body — curved overlap */}
        <div className="-mt-5 rounded-t-[28px] bg-white flex-1 flex flex-col">
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
                    Trinay Suraksha Health Plans
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003366] leading-tight mt-3">
                    Preventive Care.{" "}
                    <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        Real Prices.
                    </span>
                </h2>
                <p className="text-slate-500 mt-4 text-base sm:text-lg leading-relaxed">
                    Clinically designed health checkup packages —{" "}
                    <span className="font-semibold text-slate-600">no hidden charges, no surprises.</span>
                </p>

                {/* Trust strip */}
                <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-500">
                    {["NABL Accredited Labs", "Same-Day Reports", "Expert Physician Consultation", "Jodhpur's Lowest Prices"].map((t) => (
                        <span key={t} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                            {t}
                        </span>
                    ))}
                </div>
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
                    <PackageCard key={pkg.id} pkg={pkg} />
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
