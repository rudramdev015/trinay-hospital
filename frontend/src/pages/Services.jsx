import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight, Search, Sparkles, Stethoscope,
    Users, Clock, Activity, PhoneCall, ChevronRight,
    HeartHandshake, CheckCircle2, Microscope,
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

import imgAnaesthesia  from "../assets/images/anesthesiology.png";
import imgCardiology   from "../assets/images/emergency-care.jpg";
import imgSurgery      from "../assets/images/laparoscopic surgery.webp";
import imgNeuro        from "../assets/images/neurosurgery.jpg";
import imgGynae        from "../assets/images/gynaecology.webp";
import imgOrtho        from "../assets/images/orthopedic and joint replacement surgery.png";
import imgPhysio       from "../assets/images/physiotherapy.jpg";
import imgRadiology    from "../assets/images/radiology.jpg";
import imgUrology      from "../assets/images/urology.png";
import imgGenMed       from "../assets/images/general medicin.png";
import imgDietetics    from "../assets/images/diabetics.png";
import imgDentistry    from "../assets/images/treatment-tech.jpg";
import imgOncology     from "../assets/images/icu.png";
import imgEnt          from "../assets/images/ent.jpg";
import imgPlastic      from "../assets/images/Plastic-surgery.jpg";
import imgRespiratory  from "../assets/images/Pulmonology.jpg";
import imgPaediatrics  from "../assets/images/PAEDIATRICS.png";

const SERVICES = [
    { title: "Anaesthesiology",             slug: "anaesthesiology-critical-care", dept: "ANAESTHESIA & CRITICAL CARE", desc: "Safe perioperative anaesthesia, pain management, and 24/7 critical care across all surgical specialties.", img: imgAnaesthesia  },
    { title: "Cardiology",                  slug: "cardiology",                    dept: "CARDIOLOGY",                  desc: "Advanced heart care — angioplasty, stenting, echocardiography, and cardiac rehabilitation.", img: imgCardiology   },
    { title: "General Surgery",             slug: "general-surgery",               dept: "GENERAL SURGERY",             desc: "Laparoscopic and open surgery for hernia, appendix, gallbladder, thyroid, and emergency conditions.", img: imgSurgery      },
    { title: "Neurosurgery",                slug: "neurosurgery",                  dept: "NEUROSURGEON",                desc: "Precision brain and spinal cord surgeries using modern microsurgical and endoscopic techniques.", img: imgNeuro        },
    { title: "Gynaecology & Obstetrics",    slug: "obs-gynae",                    dept: "OBS. & GYNAE.",               desc: "Full-spectrum women's health — maternity, fertility, laparoscopic gynaecology, and high-risk pregnancies.", img: imgGynae        },
    { title: "Orthopaedics",                slug: "orthopaedics",                  dept: "ORTHOPAEDICS",                desc: "Joint replacement, trauma surgery, spine care, and arthroscopy for complete bone and joint health.", img: imgOrtho        },
    { title: "Physiotherapy",               slug: "physiotherapy",                 dept: "PHYSIOTHERAPIST",             desc: "Evidence-based rehabilitation to restore mobility, reduce pain, and recover from surgery or injury.", img: imgPhysio       },
    { title: "Radiology",                   slug: "radiology",                     dept: "RADIOLOGY",                   desc: "Integrated diagnostic imaging — CT, MRI, ultrasound, X-ray, and interventional radiology.", img: imgRadiology    },
    { title: "Urology",                     slug: "urology",                       dept: "UROLOGIST",                   desc: "Expert care for kidney stones, prostate disease, bladder disorders, and urinary tract conditions.", img: imgUrology      },
    { title: "General Medicine",            slug: "general-medicine",              dept: "GENERAL MEDICINE",            desc: "Comprehensive primary care and management of diabetes, hypertension, infections, and chronic diseases.", img: imgGenMed       },
    { title: "Dietetics & Nutrition",       slug: "dietetics",                     dept: "DIETETICS",                   desc: "Personalised clinical nutrition and diet planning for diabetes, cardiac, renal, and weight conditions.", img: imgDietetics    },
    { title: "Dentistry",                   slug: "dentistry",                     dept: "DENTISTRY",                   desc: "Complete dental care — implants, root canals, orthodontics, oral surgery, and cosmetic dentistry.", img: imgDentistry    },
    { title: "Surgical Oncology",           slug: "surgical-oncology",             dept: "SURGICAL ONCOLOGY",           desc: "Cancer surgery using minimally invasive and oncoplastic techniques for breast, GI, thyroid, and soft tissue.", img: imgOncology     },
    { title: "ENT",                         slug: "ent",                           dept: "ENT",                         desc: "Expert treatment for ear, nose, and throat disorders — FESS, micro-ear surgery, and neck mass surgery.", img: imgEnt          },
    { title: "Plastic & Cosmetic Surgery",  slug: "plastic-cosmetic-surgery",      dept: "PLASTIC & COSMETIC SURGERY",  desc: "Reconstructive and aesthetic procedures — cleft repairs, burn reconstruction, and cosmetic surgery.", img: imgPlastic      },
    { title: "Respiratory Medicine",        slug: "respiratory-medicine",          dept: "RESPIRATORY MEDICINE",        desc: "Complete lung care for asthma, COPD, sleep apnoea, interstitial lung disease, and respiratory infections.", img: imgRespiratory  },
    { title: "Paediatrics",                 slug: "paediatrics",                   dept: "PAEDIATRICS",                 desc: "Dedicated child healthcare from neonates to adolescents — vaccinations, growth, and childhood illnesses.", img: imgPaediatrics  },
];

const ServiceCard = ({ svc, index }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.45, delay: index * 0.04 }}
        className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
    >
        <div className="relative h-44 sm:h-48 md:h-52 overflow-hidden shrink-0">
            <img
                src={svc.img}
                alt={svc.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-[#003366]/20 group-hover:bg-transparent transition-colors duration-500" />
        </div>

        <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg font-black text-[#003366] mb-2 group-hover:text-[#006fa3] transition-colors leading-snug">
                {svc.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
                {svc.desc}
            </p>
            <Link
                to={`/services/${svc.slug}`}
                className="inline-flex items-center gap-2 text-[#003366] font-black text-[11px] uppercase tracking-widest group/btn hover:gap-3 transition-all"
            >
                Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
        </div>
    </motion.div>
);

const Services = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredServices = useMemo(() =>
        SERVICES.filter(s =>
            s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.desc.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [searchQuery]
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans overflow-x-hidden">
            <Navbar />

            {/* HERO */}
            <section className="relative pt-28 pb-24 md:pt-44 md:pb-36 bg-[#003366] overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

                <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                        className="text-center">
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-7">
                            <Sparkles className="w-3.5 h-3.5" /> Trinay Centre of Excellence
                        </span>
                        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter leading-none">
                            17 Specialties.{" "}
                            <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 via-teal-200 to-cyan-500">
                                One Roof.
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-xl font-light mb-10">
                            World-class medical expertise across every major discipline — delivered with compassion in Jodhpur.
                        </p>

                        {/* Search */}
                        <div className="max-w-3xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-linear-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-700" />
                            <div className="relative flex items-center bg-[#002244] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                                <div className="pl-5 md:pl-6">
                                    <Search className="h-5 w-5 md:h-6 md:w-6 text-cyan-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search department or specialty…"
                                    className="w-full pl-3 md:pl-4 pr-5 py-4 md:py-6 bg-transparent text-white placeholder-slate-500 focus:outline-none text-base md:text-lg"
                                    value={searchQuery}
                                    onChange={e => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* STATS STRIP */}
            <section className="relative -mt-10 md:-mt-12 z-20 px-4 md:px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden divide-x divide-y md:divide-y-0 divide-slate-100">
                    {[
                        { l: "Patients Served",    v: "25k+", i: Activity    },
                        { l: "Expert Doctors",     v: "30+",  i: Stethoscope },
                        { l: "Specialties",        v: "17",   i: Microscope  },
                        { l: "Emergency Response", v: "24/7", i: Clock       },
                    ].map(({ l, v, i }, idx) => {
                        const S = i;
                        return (
                            <div key={idx} className="p-5 sm:p-7 md:p-10 text-center hover:bg-slate-50 transition-colors">
                                <S className="w-5 h-5 text-[#003366] mx-auto mb-2.5" />
                                <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#003366] mb-1">{v}</div>
                                <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{l}</div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* SERVICES GRID */}
            <section className="py-20 md:py-32 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 md:mb-20 gap-4">
                        <div className="max-w-xl">
                            <h2 className="text-3xl md:text-5xl font-black text-[#003366] mb-3">Clinical Specialties</h2>
                            <div className="w-14 h-1.5 bg-[#003366] rounded-full mb-4" />
                            <p className="text-slate-500 text-base md:text-lg">
                                Every department staffed by experienced consultants with state-of-the-art technology.
                            </p>
                        </div>
                        <div className="text-[#003366] font-black text-xs uppercase bg-blue-50 px-5 py-2.5 rounded-full shrink-0">
                            {filteredServices.length} Specialties
                        </div>
                    </div>

                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
                        <AnimatePresence mode="popLayout">
                            {filteredServices.map((svc, i) => (
                                <ServiceCard key={svc.slug} svc={svc} index={i} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredServices.length === 0 && (
                        <div className="text-center py-24">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={28} className="text-slate-300" />
                            </div>
                            <p className="text-xl font-black text-slate-600">No departments found</p>
                            <p className="text-slate-400 mt-1">Try a different keyword.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* WHY TRINAY */}
            <section className="py-20 md:py-28 bg-[#F1F5F9]">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#003366] mb-3">Why Trinay Hospital</p>
                            <h2 className="text-3xl md:text-5xl font-black text-[#003366] mb-8 leading-tight">
                                A Patient-First<br />
                                <span className="text-[#006fa3]">Healing Journey.</span>
                            </h2>
                            <div className="space-y-6 md:space-y-8">
                                {[
                                    { t: "Expert Consultation",    d: "Meet top-tier consultants specialised in your specific health needs across 17 departments.",    i: Users        },
                                    { t: "Precision Diagnostics",  d: "Advanced imaging and NABL-standard lab for accurate diagnosis with rapid turnaround.",           i: Microscope   },
                                    { t: "Personalised Treatment", d: "Customised care plans designed around your unique physiology, lifestyle, and recovery goals.",   i: CheckCircle2 },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-5 items-start">
                                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-md flex items-center justify-center shrink-0 text-[#003366]">
                                            <item.i className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-base md:text-lg font-bold text-[#003366] mb-1">{item.t}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 translate-y-6">
                                <div className="h-48 md:h-64 bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col justify-end">
                                    <Stethoscope className="w-8 h-8 md:w-10 md:h-10 text-[#003366] mb-3" />
                                    <div className="font-bold text-[#003366] text-sm md:text-base">30+ Specialists</div>
                                    <div className="text-xs text-slate-400">Expert Medical Team</div>
                                </div>
                                <div className="h-60 md:h-80 bg-[#003366] rounded-3xl shadow-2xl p-6 md:p-8 text-white flex flex-col justify-end">
                                    <div className="text-3xl md:text-4xl font-black mb-2">NABH</div>
                                    <div className="text-xs md:text-sm font-medium text-white/70">Accredited & Certified Hospital of Excellence.</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-60 md:h-80 bg-[#006fa3] rounded-3xl shadow-xl p-6 md:p-8 text-white flex flex-col justify-center text-center">
                                    <HeartHandshake className="w-10 h-10 md:w-12 md:h-12 text-white/80 mx-auto mb-5" />
                                    <div className="font-black text-lg md:text-xl mb-1">Trinay Signature</div>
                                    <div className="text-[9px] md:text-[10px] text-white/60 uppercase tracking-widest">Compassion Guaranteed</div>
                                </div>
                                <div className="h-48 md:h-64 bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col justify-end">
                                    <div className="font-bold text-[#003366] text-sm md:text-base">Emergency</div>
                                    <div className="text-xs text-slate-400">Response in &lt;10 Mins</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 md:py-32 px-4 md:px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="relative rounded-3xl md:rounded-[4rem] bg-[#003366] p-8 sm:p-12 lg:p-20 xl:p-24 overflow-hidden text-center md:text-left shadow-2xl">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/10 skew-x-12 blur-[100px] pointer-events-none" />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                            <div className="max-w-xl">
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                                    Ready for World-Class<br />
                                    <span className="text-cyan-400">Healthcare?</span>
                                </h2>
                                <p className="text-slate-400 text-base md:text-lg mb-8 font-light">
                                    Book your consultation today. Our specialist team is ready to provide you with the best care possible.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link to="/appointment"
                                        className="px-8 py-4 md:py-5 bg-cyan-500 hover:bg-cyan-400 text-white font-black rounded-2xl transition-all shadow-2xl shadow-cyan-500/40 flex items-center justify-center gap-2 text-sm md:text-base">
                                        Book Appointment <ChevronRight className="w-5 h-5" />
                                    </Link>
                                    <a href="tel:+919119191622"
                                        className="px-8 py-4 md:py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-2 backdrop-blur-lg text-sm md:text-base hover:bg-white/10 transition-all">
                                        <PhoneCall className="w-5 h-5 text-cyan-400" /> Emergency Helpline
                                    </a>
                                </div>
                            </div>
                            <div className="hidden lg:flex w-80 h-80 bg-linear-to-br from-cyan-500/20 to-transparent rounded-[4rem] border border-white/5 items-center justify-center p-10">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl rotate-12 border border-white/20">
                                        <HeartHandshake className="w-10 h-10 text-white" />
                                    </div>
                                    <div className="text-white text-2xl font-black tracking-tight mb-1">Trinay Hospital</div>
                                    <div className="text-cyan-400/60 font-bold text-xs uppercase tracking-widest">Care With Compassion</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Services;
