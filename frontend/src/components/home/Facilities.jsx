import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/* ── All images are real Trinay Hospital photos from the /IMAGES/ gallery ── */
const FACILITIES = [
    {
        id: "01",
        title: "Advanced ICU",
        short: "Critical Care Excellence",
        desc: "State-of-the-art Intensive Care Unit with round-the-clock specialist monitoring and life-support systems.",
        img: "/IMAGES/1.jpeg",
        points: ["Ventilators & Vital Monitors", "24/7 Specialist Cover", "Isolation Bays"],
        color: "from-rose-500 to-rose-700",
        featured: true,
    },
    {
        id: "02",
        title: "Private & Semi-Private Rooms",
        short: "Dignified Recovery",
        desc: "Air-conditioned rooms with modern amenities for a comfortable and restful inpatient stay.",
        img: "/IMAGES/2.jpeg",
        points: ["AC & TV In-Room", "Attendant Couch", "Nursing Call System"],
        color: "from-blue-500 to-blue-700",
        featured: false,
    },
    {
        id: "03",
        title: "General Wards",
        short: "Quality Inpatient Care",
        desc: "Hygienic, well-staffed general wards ensuring quality care at every budget level.",
        img: "/IMAGES/3.jpeg",
        points: ["100+ Beds Capacity", "24/7 Nursing Staff", "Dietary Services"],
        color: "from-teal-500 to-teal-700",
        featured: false,
    },
    {
        id: "04",
        title: "Radiology & Imaging",
        short: "Precision Diagnostics",
        desc: "Comprehensive imaging suite with digital X-ray, CT scan, MRI and ultrasound for accurate diagnostics.",
        img: "/IMAGES/4.jpeg",
        points: ["CT Scan & MRI", "Digital X-Ray", "2D Echo & USG"],
        color: "from-violet-500 to-violet-700",
        featured: true,
    },
    {
        id: "05",
        title: "Pathology Lab",
        short: "Rapid Accurate Results",
        desc: "NABL-standard in-house laboratory delivering fast, reliable reports around the clock.",
        img: "/IMAGES/5.jpeg",
        points: ["Same-Day Reports", "Blood & Urine Tests", "Histopathology"],
        color: "from-amber-500 to-orange-600",
        featured: false,
    },
    {
        id: "06",
        title: "In-House Pharmacy",
        short: "Medications On-Premises",
        desc: "Fully stocked pharmacy with all prescribed medications and health supplements, open 24/7.",
        img: "/IMAGES/6.jpeg",
        points: ["All Medicines Available", "Open 24/7", "Expert Pharmacists"],
        color: "from-emerald-500 to-green-700",
        featured: false,
    },
];

const FacilityCard = ({ fac, index, isFeatured }) => {
    const [hovered, setHovered] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 36 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={`relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-default group ${
                isFeatured
                    ? "lg:col-span-2 h-72 sm:h-80 lg:h-96"
                    : "h-64 sm:h-72 lg:h-80"
            }`}
            style={{ willChange: "transform" }}
        >
            {/* Real hospital image */}
            <img
                src={fac.img}
                alt={fac.title}
                loading={index < 3 ? "eager" : "lazy"}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
                style={{ transform: hovered ? "scale(1.07)" : "scale(1)" }}
                onError={(e) => {
                    /* Fallback gradient if image fails to load */
                    e.currentTarget.style.display = "none";
                }}
            />

            {/* Always-on dark gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />

            {/* Hover: colored glow overlay */}
            <div
                className={`absolute inset-0 bg-linear-to-br ${fac.color} transition-opacity duration-500`}
                style={{ opacity: hovered ? 0.35 : 0 }}
            />

            {/* Number badge — top right */}
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                <span className={`inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-xs sm:text-sm`}>
                    {fac.id}
                </span>
            </div>

            {/* Content — bottom */}
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 lg:p-6">
                {/* Short tag */}
                <motion.p
                    animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
                    transition={{ duration: 0.25 }}
                    className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-white/70 mb-1.5"
                >
                    {fac.short}
                </motion.p>

                {/* Title */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-white leading-tight mb-2">
                    {fac.title}
                </h3>

                {/* Bullet points — always visible */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {fac.points.map((pt) => (
                        <span key={pt}
                            className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-white/80 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-2 sm:px-2.5 py-1">
                            <CheckCircle2 size={10} className="text-white/60 shrink-0" /> {pt}
                        </span>
                    ))}
                </div>

                {/* Description (hover reveal) */}
                <motion.p
                    animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2.5 text-xs sm:text-sm text-white/75 leading-relaxed overflow-hidden"
                >
                    {fac.desc}
                </motion.p>
            </div>
        </motion.div>
    );
};

const Facilities = () => {
    const headRef = useRef(null);
    const headInView = useInView(headRef, { once: true, margin: "-60px" });

    return (
        <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden bg-[#f7f9fc]">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(#003366_1px,transparent_1px)] bg-size-[32px_32px]" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

                {/* Section header */}
                <motion.div
                    ref={headRef}
                    initial={{ opacity: 0, y: 24 }}
                    animate={headInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
                >
                    <span className="inline-block text-xs font-black uppercase tracking-[0.22em] text-blue-600 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full mb-4">
                        World-Class Infrastructure
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#003366] leading-tight">
                        Facilities Built for{" "}
                        <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Your Recovery
                        </span>
                    </h2>
                    <p className="text-slate-500 mt-4 text-sm sm:text-base leading-relaxed">
                        Every corner of Trinay Hospital is designed to support healing, comfort, and clinical excellence.
                    </p>
                </motion.div>

                {/* Bento-style photo grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                    {FACILITIES.map((fac, i) => (
                        <FacilityCard
                            key={fac.id}
                            fac={fac}
                            index={i}
                            isFeatured={fac.featured}
                        />
                    ))}
                </div>

                {/* Bottom CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, delay: 0.3 }}
                    className="mt-10 sm:mt-14 text-center"
                >
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2.5 bg-[#003366] hover:bg-[#002244] text-white font-bold px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-sm sm:text-base transition-all duration-200 hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-200 active:scale-95"
                    >
                        Explore All Services <ArrowRight size={17} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Facilities;
