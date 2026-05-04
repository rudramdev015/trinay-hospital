import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import LoadingImage from "../common/LoadingImage";
import LoadingLink from "../common/LoadingLink";

const SERVICES = [
    { title: "Emergency Care",          desc: "24/7 rapid-response emergency unit",               img: "/IMAGES/7.jpeg",                    tag: "24/7" },
    { title: "Neurology",               desc: "Comprehensive brain & nerve care",                  img: "/IMAGES/1.jpeg" },
    { title: "General Medicine",        desc: "Primary and preventive healthcare",                  img: "/IMAGES/3.jpeg" },
    { title: "Diabetology",             desc: "Personalised insulin & lifestyle therapy",           img: "/IMAGES/10.jpeg" },
    { title: "Critical Care / ICU",     desc: "Intensive monitoring for critical patients",         img: "/IMAGES/8.jpeg",                    tag: "24/7" },
    { title: "Anaesthesiology",         desc: "Safe perioperative & pain management",               img: "/IMAGES/4.jpeg" },
    { title: "Gastroenterology",        desc: "GI tract diagnosis & treatment",                     img: "/IMAGES/2.jpeg" },
    { title: "Paediatrics",             desc: "Expert child health & NICU care",                    img: "/IMAGES/6.jpeg" },
    { title: "Plastic Surgery",         desc: "Reconstructive & cosmetic procedures",               img: "/IMAGES/11.jpeg" },
    { title: "Pulmonology",             desc: "Lung & respiratory disease management",              img: "/IMAGES/5.jpeg" },
    { title: "Gynaecology & Obs.",      desc: "Women's health, maternity & beyond",                 img: "/IMAGES/88.jpeg" },
    { title: "Laparoscopic Surgery",    desc: "Minimally invasive surgical expertise",              img: "/IMAGES/12.jpeg" },
    { title: "Neurosurgery",            desc: "Advanced brain & spinal surgeries",                  img: "/IMAGES/81.jpeg" },
    { title: "Orthopaedics",            desc: "Bone, joint & replacement surgery",                  img: "/IMAGES/_DSC8250 - Copy2x.jpg.jpeg" },
    { title: "Physiotherapy",           desc: "Rehabilitation & mobility restoration",              img: "/IMAGES/86.jpeg" },
    { title: "Psychiatry",              desc: "Mental health & behavioural medicine",               img: "/IMAGES/89.jpeg" },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const KeyServices = () => (
    <section className="relative overflow-hidden py-20 md:py-28 bg-[#003366]">
        {/* Subtle dot-grid texture */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:28px_28px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-400 mb-3">
                    Medical Departments
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                    16 Specialties.
                    <span className="text-cyan-400"> One Hospital.</span>
                </h2>
                <p className="text-slate-300 mt-4 text-lg leading-relaxed">
                    World-class specialists across every major discipline — all under one roof in Jodhpur.
                </p>
            </div>

            {/* Grid */}
            <motion.div
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
            >
                {SERVICES.map((svc) => (
                    <motion.div
                        key={svc.title}
                        variants={cardVariants}
                        whileHover={{ y: -6 }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    >
                        <LoadingLink
                            to="/services"
                            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 block h-full"
                        >
                            {/* Image */}
                            <div className="h-44 overflow-hidden">
                                <LoadingImage
                                    src={svc.img}
                                    alt={svc.title}
                                    className="h-full w-full"
                                    imgClassName="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                                />
                            </div>

                            {/* Badge */}
                            {svc.tag && (
                                <span className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full">
                                    {svc.tag}
                                </span>
                            )}

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                                    {svc.title}
                                </h3>
                                <p className="text-slate-400 text-sm mt-1 leading-snug">{svc.desc}</p>
                                <div className="mt-3 flex items-center gap-1.5 text-cyan-400 text-sm font-semibold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                    Learn more <ArrowRight size={14} />
                                </div>
                            </div>
                        </LoadingLink>
                    </motion.div>
                ))}
            </motion.div>

            <div className="flex justify-center mt-12">
                <LoadingLink
                    to="/services"
                    className="inline-flex items-center gap-2 bg-white text-[#003366] px-8 py-4 rounded-full font-black text-base hover:bg-cyan-400 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
                >
                    View All Services <ArrowRight size={18} />
                </LoadingLink>
            </div>
        </div>
    </section>
);

export default KeyServices;
