import React, { useState, useMemo } from "react";
import {
    HeartHandshake, ChevronRight, Activity, Clock,
    PhoneCall, Search, ArrowRight, Sparkles,
    Stethoscope, Microscope, Brain, Users, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const services = [
    { title: "Emergency Care",      description: "24/7 critical emergency services with immediate response team.",          img: "/IMAGES/7.jpeg",                          category: "Critical"    },
    { title: "Neurology",           description: "Advanced neurological diagnostics and surgical interventions.",           img: "/IMAGES/1.jpeg",                          category: "Specialist"  },
    { title: "General Medicine",    description: "Comprehensive primary healthcare and routine checkups.",                  img: "/IMAGES/3.jpeg",                          category: "General"     },
    { title: "Critical Care / ICU", description: "24/7 ICU monitoring with advanced life support systems.",                img: "/IMAGES/8.jpeg",                          category: "Critical"    },
    { title: "Orthopaedic",         description: "Joint replacements, spine surgery, and fracture management.",            img: "/IMAGES/_DSC8250 - Copy2x.jpg.jpeg",      category: "Surgical"    },
    { title: "Gynaecology & Obs.",  description: "Full-spectrum women's health and maternity services.",                   img: "/IMAGES/88.jpeg",                         category: "Specialist"  },
    { title: "Paediatrics",         description: "Specialized pediatric care from neonates to adolescents.",               img: "/IMAGES/6.jpeg",                          category: "Specialist"  },
    { title: "Neurosurgery",        description: "Precision surgeries for brain and spinal cord conditions.",              img: "/IMAGES/81.jpeg",                         category: "Surgical"    },
    { title: "Anaesthesiology",     description: "Safe pain management and surgical anaesthesia care.",                    img: "/IMAGES/4.jpeg",                          category: "Surgical"    },
    { title: "Inpatient Services",  description: "Premium ward facilities with 24/7 personalized nursing.",                img: "/IMAGES/_DSC82422x.jpg.jpeg",             category: "Facility"    },
    { title: "Preventive Health",   description: "Comprehensive body screenings and wellness packages.",                   img: "/IMAGES/5.jpeg",                          category: "Wellness"    },
    { title: "Pathology Lab",       description: "NABL standard diagnostic testing and blood analysis.",                   img: "/IMAGES/2.jpeg",                          category: "Diagnostic"  },
    { title: "Pharmacy",            description: "Full-service in-house pharmacy with 24/7 availability.",                 img: "/IMAGES/_DSC82432x.jpg.jpeg",             category: "Facility"    },
    { title: "ENT Care",            description: "Treatment for ear, nose, and throat disorders.",                         img: "/IMAGES/10.jpeg",                         category: "Specialist"  },
    { title: "Gastroenterology",    description: "Liver, stomach, and digestive system expertise.",                        img: "/IMAGES/12.jpeg",                         category: "Specialist"  },
    { title: "Urology",             description: "Advanced treatment for kidney and urinary tract issues.",                img: "/IMAGES/11.jpeg",                         category: "Specialist"  },
    { title: "Pulmonology",         description: "Comprehensive care for lung and respiratory diseases.",                  img: "/IMAGES/_DSC82612x.jpg.jpeg",             category: "Specialist"  },
    { title: "Psychiatry",          description: "Professional mental health and counseling services.",                    img: "/IMAGES/89.jpeg",                         category: "Wellness"    },
    { title: "Diabetology",         description: "Expert management of blood sugar and diabetes care.",                    img: "/IMAGES/10.jpeg",                         category: "General"     },
    { title: "Physiotherapy",       description: "Recovery and rehabilitation through physical therapy.",                  img: "/IMAGES/86.jpeg",                         category: "Wellness"    },
    { title: "Laparoscopic Surgery",description: "Keyhole surgeries for faster healing and minimal scarring.",             img: "/IMAGES/12.jpeg",                         category: "Surgical"    },
    { title: "Plastic Surgery",     description: "Reconstructive and aesthetic surgical procedures.",                      img: "/IMAGES/11.jpeg",                         category: "Surgical"    },
    { title: "Radiology",           description: "X-ray, Ultrasound, and CT diagnostic imaging.",                         img: "/IMAGES/_DSC82642x.jpg.jpeg",             category: "Diagnostic"  },
    { title: "ICU Care",            description: "Dedicated intensive care units for unstable patients.",                  img: "/IMAGES/8.jpeg",                          category: "Critical"    },
];

const categories = ["All", "Critical", "Surgical", "Specialist", "Diagnostic", "Wellness", "Facility", "General"];

const ServiceCard = ({ service, index }) => (
    <motion.div
        layout
        key={service.title}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.45, delay: index * 0.04 }}
        className="group bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
    >
        <div className="relative h-52 md:h-60 overflow-hidden shrink-0">
            <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-700"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-[#0A1D37]/15 group-hover:bg-transparent transition-colors duration-500" />
            <div className="absolute top-4 left-4">
                <span className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[9px] font-black text-cyan-600 uppercase tracking-[0.18em] shadow-lg">
                    {service.category}
                </span>
            </div>
        </div>

        <div className="p-6 flex flex-col flex-1">
            <h3 className="text-lg font-black text-[#0A1D37] mb-2 group-hover:text-cyan-600 transition-colors leading-snug">
                {service.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
                {service.description}
            </p>
            <Link
                to={`/appointment?dept=${encodeURIComponent(service.title)}`}
                className="inline-flex items-center gap-2 text-cyan-600 font-black text-[11px] uppercase tracking-widest group/btn hover:gap-3 transition-all"
            >
                Book Now <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
        </div>
    </motion.div>
);

const Services = () => {
    const [searchQuery, setSearchQuery]     = useState("");
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredServices = useMemo(() =>
        services.filter(s => {
            const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchCat   = activeCategory === "All" || s.category === activeCategory;
            return matchSearch && matchCat;
        }),
        [searchQuery, activeCategory]
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans overflow-x-hidden">
            <Navbar />

            {/* HERO */}
            <section className="relative pt-28 pb-24 md:pt-44 md:pb-36 bg-[#0A1D37] overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute top-1/2 -right-20 w-80 h-80 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

                <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
                        className="text-center">
                        <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[11px] font-bold uppercase tracking-[0.2em] mb-7">
                            <Sparkles className="w-3.5 h-3.5" /> Trinay Center of Excellence
                        </span>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tighter leading-none">
                            Premium{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-200 to-cyan-500">
                                Healthcare
                            </span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-slate-400 text-base md:text-xl font-light mb-10">
                            World-class medical expertise with deep commitment to your healing journey —
                            advanced care delivered with compassion.
                        </p>

                        {/* Search */}
                        <div className="max-w-3xl mx-auto relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur opacity-20 group-focus-within:opacity-40 transition duration-700" />
                            <div className="relative flex items-center bg-[#0d2342] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
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

                    {/* Category chips */}
                    <div className="mt-12 flex overflow-x-auto pb-2 gap-2.5 no-scrollbar md:justify-center"
                        style={{ scrollbarWidth: "none" }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`whitespace-nowrap px-5 md:px-8 py-2.5 md:py-3 rounded-2xl text-[11px] font-bold transition-all border ${
                                    activeCategory === cat
                                        ? "bg-cyan-500 border-cyan-500 text-white shadow-xl shadow-cyan-500/30"
                                        : "bg-white/5 border-white/10 text-slate-400 hover:text-white"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS STRIP */}
            <section className="relative -mt-10 md:-mt-12 z-20 px-4 md:px-6">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 bg-white rounded-3xl md:rounded-[2.5rem] shadow-2xl border border-slate-50 overflow-hidden divide-x divide-slate-50">
                    {[
                        { l: "Successful Cases",   v: "45K+", i: Activity    },
                        { l: "Specialist Doctors", v: "60+",  i: Stethoscope },
                        { l: "Diagnostic Labs",    v: "12+",  i: Microscope  },
                        { l: "Emergency Response", v: "24/7", i: Clock       },
                    ].map(({ l, v, i }, idx) => {
                        const S = i;
                        return (
                            <div key={idx} className="p-6 md:p-10 text-center hover:bg-slate-50 transition-colors">
                                <S className="w-5 h-5 md:w-6 md:h-6 text-cyan-500 mx-auto mb-3" />
                                <div className="text-2xl md:text-3xl font-black text-[#0A1D37] mb-1">{v}</div>
                                <div className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">{l}</div>
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
                            <h2 className="text-3xl md:text-5xl font-black text-[#0A1D37] mb-3">Clinical Specialties</h2>
                            <div className="w-14 h-1.5 bg-cyan-500 rounded-full mb-4" />
                            <p className="text-slate-500 text-base md:text-lg">
                                Every department staffed by experienced consultants with state-of-the-art technology.
                            </p>
                        </div>
                        <div className="text-[#0A1D37] font-black text-xs uppercase bg-slate-100 px-5 py-2.5 rounded-full shrink-0">
                            {filteredServices.length} Departments
                        </div>
                    </div>

                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7">
                        <AnimatePresence mode="popLayout">
                            {filteredServices.map((svc, i) => (
                                <ServiceCard key={svc.title} service={svc} index={i} />
                            ))}
                        </AnimatePresence>
                    </motion.div>

                    {filteredServices.length === 0 && (
                        <div className="text-center py-24">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={28} className="text-slate-300" />
                            </div>
                            <p className="text-xl font-black text-slate-600">No departments found</p>
                            <p className="text-slate-400 mt-1">Try a different keyword or category.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* WHY TRINAY */}
            <section className="py-20 md:py-28 bg-[#F1F5F9]">
                <div className="max-w-7xl mx-auto px-4 md:px-6">
                    <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-[#0A1D37] mb-8 leading-tight">
                                A Patient-First<br />
                                <span className="text-cyan-500">Healing Journey.</span>
                            </h2>
                            <div className="space-y-6 md:space-y-8">
                                {[
                                    { t: "Expert Consultation",    d: "Meet top-tier consultants specialized in your specific health needs.",                    i: Users       },
                                    { t: "Precision Diagnostics",  d: "NABL-accredited labs and advanced imaging for accurate diagnosis every time.",           i: Microscope  },
                                    { t: "Personalised Treatment", d: "Customized care plans designed for your unique physiology and recovery speed.",           i: CheckCircle2 },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-5 items-start">
                                        <div className="w-12 h-12 md:w-14 md:h-14 bg-white rounded-2xl shadow-md flex items-center justify-center shrink-0 text-cyan-500">
                                            <item.i className="w-5 h-5 md:w-6 md:h-6" />
                                        </div>
                                        <div>
                                            <h4 className="text-base md:text-lg font-bold text-[#0A1D37] mb-1">{item.t}</h4>
                                            <p className="text-sm text-slate-500 leading-relaxed">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-4 translate-y-6">
                                <div className="h-48 md:h-64 bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col justify-end">
                                    <Brain className="w-8 h-8 md:w-10 md:h-10 text-cyan-500 mb-3" />
                                    <div className="font-bold text-[#0A1D37] text-sm md:text-base">Neuro-care</div>
                                    <div className="text-xs text-slate-400">Expert Team</div>
                                </div>
                                <div className="h-60 md:h-80 bg-cyan-500 rounded-3xl shadow-2xl p-6 md:p-8 text-white flex flex-col justify-end">
                                    <div className="text-3xl md:text-4xl font-black mb-2">99%</div>
                                    <div className="text-xs md:text-sm font-medium text-white/70">Success rate in surgical interventions.</div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="h-60 md:h-80 bg-[#0A1D37] rounded-3xl shadow-xl p-6 md:p-8 text-white flex flex-col justify-center text-center">
                                    <HeartHandshake className="w-10 h-10 md:w-12 md:h-12 text-cyan-400 mx-auto mb-5" />
                                    <div className="font-black text-lg md:text-xl mb-1">Trinay Signature</div>
                                    <div className="text-[9px] md:text-[10px] text-slate-400 uppercase tracking-widest">Compassion Guaranteed</div>
                                </div>
                                <div className="h-48 md:h-64 bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col justify-end">
                                    <div className="font-bold text-[#0A1D37] text-sm md:text-base">Emergency</div>
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
                    <div className="relative rounded-3xl md:rounded-[4rem] bg-[#0A1D37] p-8 md:p-24 overflow-hidden text-center md:text-left shadow-2xl">
                        <div className="absolute top-0 right-0 w-1/2 h-full bg-cyan-500/10 skew-x-12 blur-[100px] pointer-events-none" />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
                            <div className="max-w-xl">
                                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                                    Ready to experience<br />
                                    <span className="text-cyan-400">Next-Gen Care?</span>
                                </h2>
                                <p className="text-slate-400 text-base md:text-lg mb-8 font-light">
                                    Book your consultation or physical visit today.
                                    Our concierge team is ready to assist you.
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
                            <div className="hidden lg:flex w-80 h-80 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-[4rem] border border-white/5 items-center justify-center p-10">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-cyan-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl rotate-12">
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
