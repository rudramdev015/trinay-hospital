import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Search, GraduationCap, Clock, Award,
    Phone, Calendar, ChevronRight, Users, Star,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { DOCTORS, DEPARTMENTS } from "../data/doctorsData";

/* ── Doctor card ──────────────────────────────────────────────────────── */
const DoctorCard = ({ doc }) => (
    <motion.article
        layout
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        exit={{ opacity: 0, scale: 0.93 }}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        className="group relative bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
    >
        {/* Full-width photo header */}
        <div className={`relative h-56 bg-linear-to-br ${doc.gradient} overflow-hidden shrink-0`}>
            <img
                src={doc.avatar}
                alt={doc.nameTitled}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.07]"
                loading="lazy"
            />
            {/* Bottom gradient overlay */}
            <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/60 to-transparent" />
            {/* Dept badge only — truncated to prevent overlap */}
            <span className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white bg-linear-to-r ${doc.gradient} shadow-lg max-w-[80%] truncate`}>
                {doc.deptDisplay}
            </span>
        </div>

        {/* Info */}
        <div className="p-5 flex flex-col flex-1">
            <h3 className="text-base font-black text-[#003366] leading-snug">{doc.nameTitled}</h3>
            <div className="flex items-center gap-2 mt-1">
                <p className="text-xs font-bold text-blue-500">{doc.designation}</p>
                {doc.isSenior && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200">
                        Senior
                    </span>
                )}
            </div>

            {/* Ratings */}
            <div className="flex items-center gap-0.5 mt-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} fill="#FBBF24" className="text-amber-400" />
                ))}
                <span className="text-xs text-slate-400 ml-1.5">4.9</span>
            </div>

            <div className="mt-3 space-y-1.5 pt-3 border-t border-slate-50">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <GraduationCap size={13} className="text-slate-400 shrink-0" />
                    <span className="font-medium">{doc.qualification}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock size={13} className="text-slate-400 shrink-0" />
                    <span>{doc.timing}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Users size={13} className="text-slate-400 shrink-0" />
                    <span>{doc.experience}+ yrs experience</span>
                </div>
            </div>

            {doc.camp && (
                <div className="mt-3 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2 text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                    📍 {doc.camp}
                </div>
            )}

            {/* Action buttons */}
            <div className="mt-auto pt-4 flex gap-2">
                <Link
                    to={`/doctors/${doc.id}`}
                    className="flex-1 flex items-center justify-center gap-1 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-bold text-xs py-2.5 rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                    View Profile <ChevronRight size={13} />
                </Link>
                <Link
                    to={`/appointment?doctor=${encodeURIComponent(doc.nameTitled)}&dept=${encodeURIComponent(doc.dept)}`}
                    className={`flex-1 flex items-center justify-center gap-1 bg-linear-to-r ${doc.gradient} text-white font-bold text-xs py-2.5 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-md active:scale-95`}
                >
                    Book <Calendar size={13} />
                </Link>
            </div>
        </div>
    </motion.article>
);

/* ── Doctors Page ─────────────────────────────────────────────────────── */
const DoctorsPage = () => {
    const [search, setSearch] = useState("");
    const [activeDept, setActiveDept] = useState("All Specialties");

    const filtered = useMemo(() =>
        DOCTORS.filter((d) => {
            const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) ||
                                d.deptDisplay.toLowerCase().includes(search.toLowerCase());
            const matchDept   = activeDept === "All Specialties" || d.dept === activeDept;
            return matchSearch && matchDept;
        }),
        [search, activeDept]
    );

    return (
        <div className="min-h-screen bg-[#fdfeff] font-sans">
            <Navbar />

            {/* ── HERO ── */}
            <section className="pt-36 pb-24 bg-[#003366] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:28px_28px]" />
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-400/15 blur-[100px]" />
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-300 font-bold tracking-widest uppercase text-xs px-4 py-2 rounded-full mb-6">
                        <Award size={14} /> Excellence in Healthcare
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-black text-white mb-5 leading-[1.06] tracking-tight">
                        Meet Our{" "}
                        <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Expert Team
                        </span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-slate-300 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
                        {DOCTORS.length} highly-qualified specialists across 15+ departments — dedicated to delivering
                        compassionate, world-class medical care for you and your family.
                    </motion.p>

                    {/* Hero stats */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="mt-10 flex flex-wrap justify-center gap-6">
                        {[
                            { value: `${DOCTORS.length}+`, label: "Specialists" },
                            { value: "15+", label: "Departments" },
                            { value: "50k+", label: "Patients Served" },
                            { value: "24/7", label: "Emergency Care" },
                        ].map(({ value, label }) => (
                            <div key={label} className="text-center bg-white/10 border border-white/20 rounded-2xl px-6 py-4 backdrop-blur-sm">
                                <p className="text-2xl font-black text-cyan-400">{value}</p>
                                <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mt-0.5">{label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── SEARCH & FILTER PANEL ── */}
            <div className="max-w-7xl mx-auto px-6 -mt-14 relative z-20">
                <div className="bg-white/90 backdrop-blur-2xl p-4 md:p-6 rounded-3xl shadow-2xl border border-white flex flex-col gap-4">
                    {/* Search */}
                    <div className="relative group">
                        <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search doctor name or specialty..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-14 pr-5 py-4 bg-slate-50 rounded-2xl text-slate-700 font-semibold placeholder:text-slate-400 outline-none focus:ring-4 focus:ring-blue-100 transition-all"
                        />
                    </div>

                    {/* Dept filter chips */}
                    <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                        {DEPARTMENTS.map((dept) => (
                            <button
                                key={dept}
                                onClick={() => setActiveDept(dept)}
                                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                                    activeDept === dept
                                        ? "bg-[#003366] text-white shadow-lg shadow-blue-200"
                                        : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100"
                                }`}
                            >
                                {dept === "All Specialties" ? dept : dept.charAt(0) + dept.slice(1).toLowerCase()}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── GRID ── */}
            <section className="max-w-7xl mx-auto px-6 py-14">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm font-semibold text-slate-500">
                        Showing <span className="text-[#003366] font-black">{filtered.length}</span> specialists
                    </p>
                    {activeDept !== "All Specialties" && (
                        <button onClick={() => setActiveDept("All Specialties")}
                            className="text-xs font-bold text-blue-600 hover:underline">
                            Clear filter ×
                        </button>
                    )}
                </div>

                {filtered.length > 0 ? (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((doc) => (
                                <DoctorCard key={doc.id} doc={doc} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-32">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-5">
                            <Search size={36} className="text-slate-200" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-700">No Specialists Found</h2>
                        <p className="text-slate-400 mt-2">Try a different name or specialty.</p>
                    </div>
                )}
            </section>

            {/* ── FOOTER STRIP ── */}
            <section className="bg-[#003366] py-12">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-white">
                    {[
                        { icon: <Phone size={22} />,    label: "24/7 Emergency", value: "+91 91191 91622", href: "tel:+919119191622" },
                        { icon: <Calendar size={22} />, label: "OPD Hours",       value: "Mon–Sat: 9AM – 8PM", href: null },
                        { icon: <Clock size={22} />,    label: "Emergency",       value: "Open 24 Hours", href: null },
                    ].map(({ icon, label, value, href }) => (
                        <div key={label} className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                {icon}
                            </div>
                            <div>
                                <p className="text-xs opacity-60 uppercase font-black tracking-widest">{label}</p>
                                {href
                                    ? <a href={href} className="font-bold hover:text-cyan-300 transition-colors">{value}</a>
                                    : <p className="font-bold">{value}</p>
                                }
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DoctorsPage;
