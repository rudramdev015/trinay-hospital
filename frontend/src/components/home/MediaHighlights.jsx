import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Camera } from "lucide-react";

import ab1  from "../../assets/images/Artboard 1.jpg";
import ab3  from "../../assets/images/Artboard 3.jpg";
import ab5  from "../../assets/images/Artboard 5.jpg";
import ab8  from "../../assets/images/Artboard 8.jpg";
import ab12 from "../../assets/images/Artboard 12.jpg";
import ab17 from "../../assets/images/Artboard 17.jpg";

const PHOTOS = [
    { src: ab1,  alt: "Trinay Hospital Facility Tour"  },
    { src: ab3,  alt: "Patient Care Services"          },
    { src: ab5,  alt: "Advanced Medical Excellence"    },
    { src: ab8,  alt: "Healthcare Team"                },
    { src: ab12, alt: "Specialist Consultation"        },
    { src: ab17, alt: "Emergency Care Unit"            },
];

const MediaHighlights = () => (
    <section className="bg-white py-16 md:py-24 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
                <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-blue-500 mb-2 flex items-center gap-2">
                        <Camera size={13} /> Photo Gallery
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-black text-[#003366] leading-tight">
                        Inside Trinay Hospital
                    </h2>
                    <p className="text-slate-500 text-sm mt-2 max-w-md">
                        A glimpse into our world-class facilities and expert care environment.
                    </p>
                </div>
                <Link
                    to="/gallery"
                    className="shrink-0 inline-flex items-center gap-2 bg-[#003366] text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-blue-800 transition-all hover:scale-[1.03] active:scale-95 shadow-lg shadow-blue-100"
                >
                    View All Photos <ArrowRight size={15} />
                </Link>
            </div>

            {/* Responsive equal grid — 2 cols on mobile, 3 cols on md+ */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                {PHOTOS.map(({ src, alt }, i) => (
                    <motion.div
                        key={alt}
                        className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/3] group cursor-pointer"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <img
                            src={src}
                            alt={alt}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover group-hover:scale-[1.08] transition-transform duration-500 ease-out"
                        />
                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-linear-to-t from-[#003366]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                            <span className="text-white text-xs font-bold leading-tight">{alt}</span>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8 text-center sm:hidden">
                <Link to="/gallery" className="inline-flex items-center gap-2 text-[#003366] font-bold text-sm">
                    See Full Gallery <ArrowRight size={15} />
                </Link>
            </div>
        </div>
    </section>
);

export default MediaHighlights;
