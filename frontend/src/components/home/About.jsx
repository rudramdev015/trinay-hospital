import { motion } from "framer-motion";
import LoadingLink from "../common/LoadingLink";
import LoadingImage from "../common/LoadingImage";

const ABOUT_IMAGES = [
    { src: "/IMAGES/5.jpeg",                alt: "Expert Medical Team" },
    { src: "/IMAGES/3.jpeg",                alt: "Patient Care Services" },
    { src: "/IMAGES/8.jpeg",                alt: "Advanced ICU" },
    { src: "/IMAGES/10.jpeg",               alt: "Specialist Consultation" },
];
const ABOUT_WIDE = { src: "/IMAGES/_DSC82642x.jpg.jpeg", alt: "Trinay Hospital Facility" };

const gridVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.11 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 28, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const BADGES = [
    { label: "24/7 Emergency Care" },
    { label: "Advanced ICU" },
    { label: "Multispeciality Hospital" },
    { label: "NABH Accredited" },
];

const About = () => (
    <section className="bg-white pt-14 pb-20 md:pt-20 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 items-center">

                {/* LEFT — CONTENT */}
                <div className="text-center lg:text-left">
                    {/* Eyebrow */}
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-500 mb-3">
                        About Trinay Hospital
                    </p>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003366] leading-tight">
                        Jodhpur&apos;s Most Trusted
                        <br />
                        <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            Multi-Specialty Hospital
                        </span>
                    </h2>

                    <p className="text-slate-600 mt-5 leading-relaxed text-justify">
                        Founded in 2024, Trinay Hospital is Jodhpur's premier multispeciality healthcare
                        destination. Built with a vision to provide accessible, affordable, and advanced
                        medical care, we are rapidly growing into one of the most trusted healthcare
                        institutions in Rajasthan.
                    </p>
                    <p className="text-slate-600 mt-4 leading-relaxed text-justify">
                        Our state-of-the-art 100-bedded facility combines modern infrastructure with
                        compassionate care. Led by a team of 50+ specialist doctors, we serve thousands
                        of patients across 15+ medical specialties — from routine checkups to
                        complex surgeries, emergency care to preventive health programs.
                    </p>

                    {/* Feature badges */}
                    <div className="mt-8 flex flex-wrap gap-2.5">
                        {BADGES.map((b) => (
                            <span
                                key={b.label}
                                className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold px-4 py-2 rounded-full"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                                {b.label}
                            </span>
                        ))}
                    </div>

                    <LoadingLink
                        to="/about"
                        className="mt-8 bg-[#003366] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-blue-800 transition-all hover:scale-[1.03] active:scale-95 inline-flex items-center gap-2 shadow-lg shadow-blue-100"
                    >
                        Learn More About Us
                    </LoadingLink>
                </div>

                {/* RIGHT — IMAGE GRID */}
                <motion.div
                    className="grid grid-cols-2 gap-4"
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {ABOUT_IMAGES.map(({ src, alt }) => (
                        <motion.div
                            key={alt}
                            variants={cardVariants}
                            whileHover={{ scale: 1.04, y: -6 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        >
                            <LoadingImage
                                src={src}
                                alt={alt}
                                className="h-28 md:h-32 lg:h-36 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 group overflow-hidden"
                                imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                            />
                        </motion.div>
                    ))}

                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.03, y: -6 }}
                        transition={{ type: "spring", stiffness: 240, damping: 18 }}
                        className="col-span-2"
                    >
                        <LoadingImage
                            src={ABOUT_WIDE.src}
                            alt={ABOUT_WIDE.alt}
                            className="h-40 md:h-48 lg:h-56 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 group overflow-hidden"
                            imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                    </motion.div>
                </motion.div>
            </div>
        </div>
    </section>
);

export default About;
