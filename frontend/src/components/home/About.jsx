import { motion } from "framer-motion";
import LoadingLink from "../common/LoadingLink";

import ab7  from "../../assets/images/Artboard 7.jpg";
import ab8  from "../../assets/images/Artboard 8.jpg";
import ab10 from "../../assets/images/Artboard 10.jpg";
import ab11 from "../../assets/images/Artboard 11.jpg";
import ab17 from "../../assets/images/Artboard 17.jpg";

const ABOUT_IMAGES = [
    { src: ab7,  alt: "Trinay Hospital Facility",  label: "Modern Facility"   },
    { src: ab8,  alt: "Trinay Hospital OT",        label: "Operation Theatre" },
    { src: ab10, alt: "Trinay Hospital ICU",        label: "Advanced ICU"      },
    { src: ab11, alt: "Trinay Hospital Care",       label: "Expert Care"       },
];
const ABOUT_WIDE = { src: ab17, alt: "Trinay Hospital", label: "Trinay Hospital — Care With Compassion" };

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
                        compassionate care. Led by a team of 24+ specialist doctors across 17 medical
                        specialties — from routine checkups to complex surgeries, emergency care
                        to preventive health programs.
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
                    className="grid grid-cols-2 gap-3 lg:gap-4"
                    variants={gridVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {ABOUT_IMAGES.map(({ src, alt, label }) => (
                        <motion.div
                            key={alt}
                            variants={cardVariants}
                            whileHover={{ scale: 1.04, y: -5 }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                            className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-36 md:h-40 lg:h-44"
                        >
                            <img
                                src={src}
                                alt={alt}
                                loading="lazy"
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                            />
                            {/* Dark gradient overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-[#003366]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            {/* Label on hover */}
                            <span className="absolute bottom-3 left-3 text-white text-[11px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                {label}
                            </span>
                        </motion.div>
                    ))}

                    {/* Wide bottom image */}
                    <motion.div
                        variants={cardVariants}
                        whileHover={{ scale: 1.02, y: -4 }}
                        transition={{ type: "spring", stiffness: 240, damping: 18 }}
                        className="col-span-2 relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 h-48 md:h-56 lg:h-60"
                    >
                        <img
                            src={ABOUT_WIDE.src}
                            alt={ABOUT_WIDE.alt}
                            loading="lazy"
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-[#003366]/65 via-transparent to-transparent" />
                        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                            <span className="text-white font-black text-sm md:text-base drop-shadow-md">
                                {ABOUT_WIDE.label}
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                                Trinay Hospital
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    </section>
);

export default About;
