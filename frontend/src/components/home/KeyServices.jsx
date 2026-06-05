import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, LayoutGrid } from "lucide-react";
import LoadingLink from "../common/LoadingLink";

import imgAnaesthesia   from "../../assets/images/anesthesiology.png";
import imgCardiology    from "../../assets/images/emergency-care.jpg";
import imgSurgery       from "../../assets/images/laparoscopic surgery.webp";
import imgNeuro         from "../../assets/images/neurosurgery.jpg";
import imgGynae         from "../../assets/images/gynaecology.webp";
import imgOrtho         from "../../assets/images/orthopedic and joint replacement surgery.png";
import imgPhysio        from "../../assets/images/physiotherapy.jpg";
import imgRadiology     from "../../assets/images/radiology.jpg";
import imgUrology       from "../../assets/images/urology.png";
import imgGenMed        from "../../assets/images/general medicin.png";
import imgDietetics     from "../../assets/images/diabetics.png";
import imgDentistry     from "../../assets/images/treatment-tech.jpg";
import imgOncology      from "../../assets/images/critical care.jpg";
import imgEnt           from "../../assets/images/ent.jpg";
import imgPlastic       from "../../assets/images/Plastic-surgery.jpg";
import imgRespiratory   from "../../assets/images/Pulmonology.jpg";
import imgPaediatrics   from "../../assets/images/PAEDIATRICS.png";

const SERVICES = [
    { title: "Anaesthesiology",            desc: "Safe perioperative & pain management",              img: imgAnaesthesia, dept: "ANAESTHESIA & CRITICAL CARE", slug: "anaesthesiology-critical-care" },
    { title: "Cardiology",                 desc: "Advanced heart care & interventional procedures",   img: imgCardiology,  dept: "CARDIOLOGY",                  slug: "cardiology"                    },
    { title: "General Surgery",            desc: "Laparoscopic & open surgical expertise",            img: imgSurgery,     dept: "GENERAL SURGERY",             slug: "general-surgery"               },
    { title: "Neurosurgery",               desc: "Precision brain & spinal cord surgeries",           img: imgNeuro,       dept: "NEUROSURGEON",                slug: "neurosurgery"                  },
    { title: "Gynaecology & Obs.",         desc: "Full-spectrum women's health & maternity",          img: imgGynae,       dept: "OBS. & GYNAE.",               slug: "obs-gynae"                     },
    { title: "Orthopaedics",               desc: "Joint replacement, trauma & spine surgery",         img: imgOrtho,       dept: "ORTHOPAEDICS",                slug: "orthopaedics"                  },
    { title: "Physiotherapy",              desc: "Rehabilitation & mobility restoration",             img: imgPhysio,      dept: "PHYSIOTHERAPIST",             slug: "physiotherapy"                 },
    { title: "Radiology",                  desc: "CT, MRI, Ultrasound & X-Ray diagnostics",          img: imgRadiology,   dept: "RADIOLOGY",                   slug: "radiology"                     },
    { title: "Urology",                    desc: "Kidney, bladder & prostate care",                   img: imgUrology,     dept: "UROLOGIST",                   slug: "urology"                       },
    { title: "General Medicine",           desc: "Comprehensive primary & preventive healthcare",     img: imgGenMed,      dept: "GENERAL MEDICINE",            slug: "general-medicine"              },
    { title: "Dietetics & Nutrition",      desc: "Clinical nutrition & personalised diet plans",      img: imgDietetics,   dept: "DIETETICS",                   slug: "dietetics"                     },
    { title: "Dentistry",                  desc: "Dental surgery, implants & cosmetic dentistry",    img: imgDentistry,   dept: "DENTISTRY",                   slug: "dentistry"                     },
    { title: "Surgical Oncology",          desc: "Cancer surgery with minimally invasive techniques", img: imgOncology,   dept: "SURGICAL ONCOLOGY",           slug: "surgical-oncology"             },
    { title: "ENT",                        desc: "Ear, nose & throat disorders & surgery",            img: imgEnt,         dept: "ENT",                         slug: "ent"                           },
    { title: "Plastic & Cosmetic Surgery", desc: "Reconstructive & aesthetic surgical procedures",   img: imgPlastic,     dept: "PLASTIC & COSMETIC SURGERY",  slug: "plastic-cosmetic-surgery"      },
    { title: "Respiratory Medicine",       desc: "Asthma, COPD & lung disease management",           img: imgRespiratory, dept: "RESPIRATORY MEDICINE",        slug: "respiratory-medicine"          },
    { title: "Paediatrics",                desc: "Expert child health from neonates to adolescents",  img: imgPaediatrics, dept: "PAEDIATRICS",                 slug: "paediatrics"                   },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.055 } },
};
const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
};

const KeyServices = () => (
    <section className="relative overflow-hidden py-20 md:py-28 bg-[#003366]">
        {/* Dot-grid texture */}
        <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(white_1px,transparent_1px)] bg-size-[28px_28px]" />
        {/* Glow accents */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-400 mb-3">
                    Medical Departments
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                    17 Specialties.
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
                        className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-cyan-400/30 transition-all duration-300 flex flex-col"
                    >
                        {/* Image */}
                        <LoadingLink to={`/services/${svc.slug}`} className="block">
                            <div className="h-44 overflow-hidden relative">
                                <img
                                    src={svc.img}
                                    alt={svc.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.07]"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-[#003366]/60 to-transparent" />
                            </div>
                        </LoadingLink>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1 gap-3">
                            <div>
                                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                                    {svc.title}
                                </h3>
                                <p className="text-slate-400 text-sm mt-1 leading-snug">{svc.desc}</p>
                            </div>

                            {/* Two buttons */}
                            <div className="flex gap-2 mt-auto pt-1">
                                <LoadingLink
                                    to={`/services/${svc.slug}`}
                                    className="flex-1 text-center text-[11px] font-black uppercase tracking-wider text-cyan-300 border border-cyan-400/30 hover:bg-cyan-400 hover:text-[#003366] py-2 rounded-lg transition-all duration-200"
                                >
                                    Learn More
                                </LoadingLink>
                                <LoadingLink
                                    to={`/appointment?dept=${encodeURIComponent(svc.dept)}`}
                                    className="flex-1 text-center text-[11px] font-black uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-[#003366] py-2 rounded-lg transition-all duration-200 flex items-center justify-center gap-1"
                                >
                                    <CalendarCheck size={12} />
                                    Book
                                </LoadingLink>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
                <LoadingLink
                    to="/appointment"
                    className="inline-flex items-center gap-2.5 bg-white text-[#003366] px-8 py-4 rounded-full font-black text-[15px] hover:bg-cyan-400 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl w-full sm:w-auto justify-center"
                >
                    <CalendarCheck size={18} />
                    Book Appointment
                </LoadingLink>
                <LoadingLink
                    to="/services"
                    className="inline-flex items-center gap-2.5 bg-white/15 border border-white/30 text-white px-8 py-4 rounded-full font-black text-[15px] hover:bg-white hover:text-[#003366] transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm w-full sm:w-auto justify-center"
                >
                    <LayoutGrid size={18} />
                    View All Departments
                    <ArrowRight size={16} />
                </LoadingLink>
            </div>
        </div>
    </section>
);

export default KeyServices;
