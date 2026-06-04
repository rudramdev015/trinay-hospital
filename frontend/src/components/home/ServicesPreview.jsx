import { motion } from "framer-motion";
import {
    BadgeCheck, Cpu, HeartHandshake,
    ShieldPlus, Ambulance,
    FlaskConical, Microscope, Baby,
} from "lucide-react";

const FEATURES = [
    {
        Icon: Cpu,
        title: "Advanced Technology",
        desc: "State-of-the-art medical equipment and the latest treatment methodologies for precise diagnosis and effective care.",
        gradient: "from-blue-500 to-blue-700",
        bg: "bg-blue-50",
        ring: "ring-blue-200",
    },
    {
        Icon: HeartHandshake,
        title: "Compassionate Care",
        desc: "Patient-first approach with personalised treatment plans, empathy, and unwavering support throughout recovery.",
        gradient: "from-purple-500 to-purple-700",
        bg: "bg-purple-50",
        ring: "ring-purple-200",
    },
    {
        Icon: BadgeCheck,
        title: "NABH Accredited",
        desc: "Certified and recognised healthcare facility meeting national and international standards of medical excellence.",
        gradient: "from-amber-500 to-orange-600",
        bg: "bg-amber-50",
        ring: "ring-amber-200",
    },
    {
        Icon: ShieldPlus,
        title: "Preventive Healthcare",
        desc: "Annual health checkup packages and wellness programs designed to detect risk factors early and keep you healthy.",
        gradient: "from-green-500 to-emerald-700",
        bg: "bg-green-50",
        ring: "ring-green-200",
    },
    {
        Icon: Ambulance,
        title: "Emergency Ambulance",
        desc: "Equipped ambulances with paramedic support available round the clock for swift patient transport.",
        gradient: "from-red-500 to-red-700",
        bg: "bg-red-50",
        ring: "ring-red-200",
    },
    {
        Icon: FlaskConical,
        title: "In-House Pharmacy",
        desc: "A fully stocked pharmacy on-site ensuring immediate access to prescribed medications and health products.",
        gradient: "from-indigo-500 to-indigo-700",
        bg: "bg-indigo-50",
        ring: "ring-indigo-200",
    },
    {
        Icon: Microscope,
        title: "Pathology & Radiology",
        desc: "Integrated diagnostic lab and imaging centre with rapid turnaround for accurate test results.",
        gradient: "from-violet-500 to-violet-700",
        bg: "bg-violet-50",
        ring: "ring-violet-200",
    },
    {
        Icon: Baby,
        title: "Neonatal & Paediatric ICU",
        desc: "Dedicated NICU and PICU units with 24/7 paediatric specialists for your youngest, most vulnerable patients.",
        gradient: "from-pink-500 to-pink-700",
        bg: "bg-pink-50",
        ring: "ring-pink-200",
    },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const ServicesPreview = () => (
    <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#ffffff_0%,#eef4ff_100%)]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-500 mb-3">
                    Why Choose Trinay
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003366] leading-tight">
                    Healthcare That Goes
                    <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Beyond Expectations</span>
                </h2>
                <p className="text-slate-500 mt-4 text-lg leading-relaxed">
                    Everything you need for complete care — under one world-class roof.
                </p>
            </div>

            {/* Card grid */}
            <motion.div
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {FEATURES.map((f) => (
                    <motion.div
                        key={f.title}
                        variants={cardVariants}
                        whileHover={{ y: -6, scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="group rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className={`w-12 h-12 rounded-2xl bg-linear-to-br ${f.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                            <f.Icon size={22} className="text-white" />
                        </div>
                        <h3 className="text-base font-bold text-[#003366] mb-2">{f.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

export default ServicesPreview;
