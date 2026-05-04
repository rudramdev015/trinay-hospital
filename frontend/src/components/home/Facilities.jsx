import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import LoadingImage from "../common/LoadingImage";
import icuImg          from "../../assets/images/icu.png";
import roomImg         from "../../assets/images/Room facilities.jpeg";
import bedImg          from "../../assets/images/Bed Facilities.jpeg";
import radiologyImg    from "../../assets/images/radiology.jpg";
import pathologyImg    from "../../assets/images/pathology labs.png";
import pharmacyImg     from "../../assets/images/pharmacy.png";

const FACILITIES = [
    {
        title: "Advanced ICU",
        desc: "State-of-the-art Intensive Care Unit with 24/7 specialist monitoring and life-support systems for critical patients.",
        img: icuImg,
        points: ["Ventilators & Monitors", "24/7 Specialist Cover", "Isolation Bays"],
        accent: "from-rose-600 to-rose-800",
    },
    {
        title: "Private & Semi-Private Rooms",
        desc: "Comfortable, air-conditioned rooms with modern amenities for a dignified and restful recovery experience.",
        img: roomImg,
        points: ["AC & TV In-Room", "Attendant Couch", "Nursing Call System"],
        accent: "from-blue-600 to-blue-800",
    },
    {
        title: "General Wards",
        desc: "Well-maintained, hygienic general wards staffed round the clock for quality inpatient care at every budget.",
        img: bedImg,
        points: ["100+ Beds", "24/7 Nursing", "Dietary Services"],
        accent: "from-teal-600 to-teal-800",
    },
    {
        title: "Radiology & Imaging",
        desc: "Comprehensive imaging suite with digital X-ray, CT scan, MRI, and ultrasound for precise diagnostics.",
        img: radiologyImg,
        points: ["CT Scan & MRI", "Digital X-Ray", "2D Echo & USG"],
        accent: "from-purple-600 to-purple-800",
    },
    {
        title: "Pathology Lab",
        desc: "NABL-standard in-house pathology laboratory providing rapid, accurate test results around the clock.",
        img: pathologyImg,
        points: ["Same-Day Reports", "Blood & Urine Tests", "Histopathology"],
        accent: "from-amber-600 to-orange-700",
    },
    {
        title: "In-House Pharmacy",
        desc: "Fully stocked pharmacy on premises providing all prescribed medications and health supplements instantly.",
        img: pharmacyImg,
        points: ["All Medicines Available", "Open 24/7", "Trained Pharmacists"],
        accent: "from-green-600 to-emerald-700",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const Facilities = () => (
    <section className="relative py-20 md:py-28 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-500 mb-3">
                    World-Class Infrastructure
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003366] leading-tight">
                    Facilities Built for
                    <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Your Recovery</span>
                </h2>
                <p className="text-slate-500 mt-4 text-lg leading-relaxed">
                    Every corner of Trinay Hospital is designed to support healing, comfort, and clinical excellence.
                </p>
            </div>

            {/* Grid */}
            <motion.div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {FACILITIES.map((fac) => (
                    <motion.div
                        key={fac.title}
                        variants={cardVariants}
                        whileHover={{ y: -6 }}
                        transition={{ type: "spring", stiffness: 280, damping: 20 }}
                        className="group rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-md hover:shadow-2xl transition-shadow duration-300"
                    >
                        {/* Image */}
                        <div className="relative h-52 overflow-hidden">
                            <LoadingImage
                                src={fac.img}
                                alt={fac.title}
                                className="h-full w-full"
                                imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
                            <h3 className="absolute bottom-4 left-4 text-lg font-black text-white leading-tight">
                                {fac.title}
                            </h3>
                        </div>

                        {/* Content */}
                        <div className="p-5">
                            <p className="text-slate-500 text-sm leading-relaxed">{fac.desc}</p>
                            <ul className="mt-4 space-y-2">
                                {fac.points.map((pt) => (
                                    <li key={pt} className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                        <CheckCircle2 size={15} className="text-blue-500 shrink-0" />
                                        {pt}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

export default Facilities;
