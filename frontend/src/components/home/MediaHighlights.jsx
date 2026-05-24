import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Images } from "lucide-react";

import ab1  from "../../assets/images/Artboard 1.jpg";
import ab3  from "../../assets/images/Artboard 3.jpg";
import ab5  from "../../assets/images/Artboard 5.jpg";
import ab8  from "../../assets/images/Artboard 8.jpg";
import ab12 from "../../assets/images/Artboard 12.jpg";
import ab17 from "../../assets/images/Artboard 17.jpg";

const PHOTOS = [
    { src: ab1,  alt: "Trinay Hospital Facility Tour",      span: "col-span-2 row-span-2" },
    { src: ab3,  alt: "Patient Care Services",              span: "" },
    { src: ab5,  alt: "Advanced Medical Team",              span: "" },
    { src: ab8,  alt: "Healthcare Excellence",              span: "" },
    { src: ab12, alt: "Specialist Consultation",            span: "" },
    { src: ab17, alt: "Emergency Care Unit",                span: "" },
];

const MediaHighlights = () => (
    <section className="bg-slate-50 py-14 md:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                    <p className="text-sm font-bold uppercase tracking-[0.22em] text-blue-500 mb-2 flex items-center gap-2">
                        <Images size={14} /> Photo Gallery
                    </p>
                    <h2 className="text-3xl md:text-4xl font-black text-[#003366] leading-tight">
                        Inside Trinay Hospital
                    </h2>
                </div>
                <Link
                    to="/gallery"
                    className="inline-flex items-center gap-2 bg-[#003366] text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-800 transition-all hover:scale-[1.03] active:scale-95 shrink-0"
                >
                    View Full Gallery <ArrowRight size={15} />
                </Link>
            </div>

            {/* Masonry-style grid */}
            <div className="grid grid-cols-3 grid-rows-2 gap-3 md:gap-4 h-[340px] sm:h-[420px] md:h-[520px]">
                {PHOTOS.map(({ src, alt, span }, i) => (
                    <motion.div
                        key={alt}
                        className={`relative overflow-hidden rounded-2xl ${span} cursor-pointer group`}
                        initial={{ opacity: 0, scale: 0.96 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <img
                            src={src}
                            alt={alt}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

export default MediaHighlights;
