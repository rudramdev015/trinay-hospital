import { useState, useMemo, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Search, GraduationCap, Clock, Award,
    Phone, Calendar, ChevronRight, Users, Star, Stethoscope, SlidersHorizontal, X,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { DOCTORS, DEPARTMENTS } from "../data/doctorsData";
import { buildApiUrl } from "../utils/api";

/* ── Intersection-observer lazy loader ────────────────────────────── */
const useInView = (rootMargin = "300px") => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        if (inView) return undefined;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
            { rootMargin, threshold: 0 }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [inView, rootMargin]);
    return [ref, inView];
};

/* ── Doctor card ──────────────────────────────────────────────────── */
const DoctorCard = memo(({ doc, eager }) => {
    const [cardRef, inView] = useInView("400px");
    const shouldLoad = eager || inView;
    const initials = (doc.nameTitled || "")
        .split(" ").filter((w) => /^[A-Za-z]/.test(w))
        .slice(0, 2).map((w) => w[0].toUpperCase()).join("");

    return (
        <motion.article
            ref={cardRef}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="group relative bg-white rounded-3xl border border-slate-100 shadow-md hover:shadow-2xl transition-shadow duration-300 overflow-hidden flex flex-col"
        >
            {/* Photo header — initials always behind, photo on top */}
            <div className={`relative h-52 sm:h-56 lg:h-60 bg-linear-to-br ${doc.gradient} overflow-hidden shrink-0`}>
                {/* Background initials (always visible fallback) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    {initials
                        ? <span className="text-7xl font-black text-white/25 tracking-tight">{initials}</span>
                        : <Stethoscope size={72} className="text-white/20" />
                    }
                </div>

                {/* Doctor photo — overlays initials, hides itself on error */}
                {shouldLoad && doc.avatar && (
                    <img
                        src={doc.avatar}
                        alt={doc.nameTitled}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
                        style={{ objectPosition: "center 15%" }}
                        onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                    />
                )}

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/60 to-transparent" />

                {/* Dept badge */}
                <span className={`absolute top-3 left-3 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full text-white bg-linear-to-r ${doc.gradient} shadow-lg max-w-[80%] truncate backdrop-blur-sm`}>
                    {doc.deptDisplay}
                </span>
            </div>

            {/* Info */}
            <div className="p-4 sm:p-5 flex flex-col flex-1">
                <h3 className="text-sm sm:text-base font-black text-[#003366] leading-snug">{doc.nameTitled}</h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <p className="text-xs font-bold text-blue-500">{doc.designation}</p>
                    {doc.isSenior && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200">
                            Senior
                        </span>
                    )}
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} fill="#FBBF24" className="text-amber-400" />
                    ))}
                    <span className="text-xs text-slate-400 ml-1">4.9</span>
                </div>

                <div className="mt-3 space-y-1.5 pt-3 border-t border-slate-50">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <GraduationCap size={12} className="text-slate-400 shrink-0" />
                        <span className="font-medium truncate">{doc.qualification}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock size={12} className="text-slate-400 shrink-0" />
                        <span className="truncate">{doc.timing}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Users size={12} className="text-slate-400 shrink-0" />
                        <span>{doc.experience}+ yrs experience</span>
                    </div>
                </div>

                {doc.camp && (
                    <div className="mt-3 bg-orange-50 border border-orange-100 rounded-xl px-3 py-2 text-[10px] font-bold text-orange-600 uppercase tracking-wider leading-relaxed">
                        📍 {doc.camp}
                    </div>
                )}

                {/* Action buttons */}
                <div className="mt-auto pt-4 flex gap-2">
                    <Link
                        to={`/doctors/${doc.id}`}
                        className="flex-1 flex items-center justify-center gap-1 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-bold text-xs py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95"
                    >
                        View Profile <ChevronRight size={12} />
                    </Link>
                    <Link
                        to={`/appointment?doctor=${encodeURIComponent(doc.nameTitled)}&dept=${encodeURIComponent(doc.dept)}`}
                        className={`flex-1 flex items-center justify-center gap-1 bg-linear-to-r ${doc.gradient} text-white font-bold text-xs py-2.5 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-md active:scale-95`}
                    >
                        Book <Calendar size={12} />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
});

DoctorCard.displayName = "DoctorCard";

/* ── Normalise dynamic DB doctor ──────────────────────────────────── */
const FEMALE_NAMES_SET = ["RASHMI","PRIYANKA","PUSHPA","POOJA","KULDEEP","JAISHREE","RITU","CHITRA","VIDHI","METALI","SHALINI"];
const isFemaleDoc = (name) => FEMALE_NAMES_SET.some((n) => name.toUpperCase().includes(n));

const normalizeDynamic = (d) => ({
    ...d,
    id: d._id,
    nameTitled: d.name.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" "),
    slug: d._id,
    isFemale: isFemaleDoc(d.name),
    isSenior: (d.designation || "").includes("SR."),
    avatar: d.photo || null,
    days: "Mon – Sat",
    languages: ["Hindi", "English", "Rajasthani"],
    color: "blue",
    gradient: "from-blue-600 to-blue-800",
    deptDisplay: d.dept ? d.dept.charAt(0) + d.dept.slice(1).toLowerCase() : "General",
    patients: `${(d.experience || 0) * 500}+`,
});

/* ── Use debounce ─────────────────────────────────────────────────── */
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

/* ── Doctors Page ─────────────────────────────────────────────────── */
const DoctorsPage = () => {
    const [search, setSearch] = useState("");
    const [activeDept, setActiveDept] = useState("All Specialties");
    const [dynamicDoctors, setDynamicDoctors] = useState([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const debouncedSearch = useDebounce(search, 220);

    useEffect(() => {
        fetch(buildApiUrl("/api/doctors/dynamic"))
            .then((r) => r.ok ? r.json() : null)
            .then((data) => { if (data?.success) setDynamicDoctors(data.doctors.map(normalizeDynamic)); })
            .catch(() => {});
    }, []);

    const allDoctors = useMemo(() => [
        ...(Array.isArray(DOCTORS) ? DOCTORS : []),
        ...dynamicDoctors,
    ], [dynamicDoctors]);

    const filtered = useMemo(() =>
        allDoctors.filter((d) => {
            const matchSearch = !debouncedSearch ||
                (d.name || "").toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                (d.deptDisplay || "").toLowerCase().includes(debouncedSearch.toLowerCase());
            const matchDept = activeDept === "All Specialties" || d.dept === activeDept;
            return matchSearch && matchDept;
        }),
        [debouncedSearch, activeDept, allDoctors]
    );

    const clearFilters = useCallback(() => {
        setSearch("");
        setActiveDept("All Specialties");
        setShowMobileFilters(false);
    }, []);

    return (
        <div className="min-h-screen bg-[#fdfeff] font-sans">
            <Navbar />

            {/* ── HERO ── */}
            <section className="pt-32 pb-20 bg-[#003366] relative overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(white_1px,transparent_1px)] bg-size-[28px_28px]" />
                <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-400/15 blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-cyan-400/10 blur-[80px]" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-300 font-bold tracking-widest uppercase text-xs px-4 py-2 rounded-full mb-5"
                    >
                        <Award size={13} /> Excellence in Healthcare
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-[1.08] tracking-tight"
                    >
                        Meet Our{" "}
                        <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Expert Team
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-4"
                    >
                        {Array.isArray(DOCTORS) ? DOCTORS.length : 0}+ highly-qualified specialists across 15+ departments — dedicated to delivering compassionate, world-class care.
                    </motion.p>

                    {/* Hero stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-5"
                    >
                        {[
                            { value: `${Array.isArray(DOCTORS) ? DOCTORS.length : 0}+`, label: "Specialists" },
                            { value: "15+", label: "Departments" },
                            { value: "50k+", label: "Patients Served" },
                            { value: "24/7", label: "Emergency Care" },
                        ].map(({ value, label }) => (
                            <div key={label} className="text-center bg-white/10 border border-white/20 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-sm">
                                <p className="text-xl sm:text-2xl font-black text-cyan-400">{value}</p>
                                <p className="text-white/60 text-[11px] font-semibold uppercase tracking-wider mt-0.5">{label}</p>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── SEARCH & FILTER PANEL ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-12 relative z-20">
                <div className="bg-white/95 backdrop-blur-2xl p-4 sm:p-6 rounded-3xl shadow-2xl border border-white">
                    {/* Search row */}
                    <div className="flex gap-3">
                        <div className="relative flex-1 group">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search doctor name or specialty…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 rounded-2xl text-slate-700 font-semibold placeholder:text-slate-400 outline-none focus:ring-3 focus:ring-blue-100 focus:bg-white transition-all text-sm"
                            />
                            {search && (
                                <button
                                    onClick={() => setSearch("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                        {/* Mobile filter toggle */}
                        <button
                            onClick={() => setShowMobileFilters((p) => !p)}
                            className={`sm:hidden flex items-center gap-2 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${showMobileFilters ? "bg-[#003366] text-white" : "bg-slate-50 text-slate-600 border border-slate-200"}`}
                        >
                            <SlidersHorizontal size={16} />
                        </button>
                    </div>

                    {/* Dept filter chips — always visible on sm+, toggleable on mobile */}
                    <div className={`mt-3 flex gap-2 overflow-x-auto pb-1 no-scrollbar ${showMobileFilters ? "flex" : "hidden sm:flex"}`}>
                        {DEPARTMENTS.map((dept) => (
                            <button
                                key={dept}
                                onClick={() => { setActiveDept(dept); setShowMobileFilters(false); }}
                                className={`whitespace-nowrap px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                                    activeDept === dept
                                        ? "bg-[#003366] text-white shadow-md shadow-blue-200"
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
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
                <div className="flex items-center justify-between mb-5">
                    <p className="text-sm font-semibold text-slate-500">
                        Showing{" "}
                        <span className="text-[#003366] font-black">{filtered.length}</span>
                        {" "}specialist{filtered.length !== 1 ? "s" : ""}
                    </p>
                    {(activeDept !== "All Specialties" || search) && (
                        <button
                            onClick={clearFilters}
                            className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                        >
                            <X size={12} /> Clear filters
                        </button>
                    )}
                </div>

                {filtered.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                    >
                        <AnimatePresence mode="popLayout">
                            {filtered.map((doc, index) => (
                                <DoctorCard
                                    key={doc.id}
                                    doc={doc}
                                    eager={index < 8}
                                />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                ) : (
                    <div className="text-center py-24 sm:py-32">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search size={32} className="text-slate-200" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-700">No Specialists Found</h2>
                        <p className="text-slate-400 mt-2 text-sm">Try a different name or specialty.</p>
                        <button
                            onClick={clearFilters}
                            className="mt-5 px-5 py-2.5 rounded-2xl bg-[#003366] text-white text-sm font-bold hover:bg-[#002244] transition-colors"
                        >
                            Show all doctors
                        </button>
                    </div>
                )}
            </section>

            {/* ── FOOTER STRIP ── */}
            <section className="bg-[#003366] py-10 sm:py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 text-white">
                    {[
                        { icon: <Phone size={20} />,    label: "24/7 Emergency", value: "+91 91191 91622", href: "tel:+919119191622" },
                        { icon: <Calendar size={20} />, label: "OPD Hours",       value: "Mon–Sat: 9AM – 8PM",  href: null },
                        { icon: <Clock size={20} />,    label: "Emergency",       value: "Open 24 Hours",        href: null },
                    ].map(({ icon, label, value, href }) => (
                        <div key={label} className="flex items-center gap-4">
                            <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                                {icon}
                            </div>
                            <div>
                                <p className="text-[11px] opacity-60 uppercase font-black tracking-widest">{label}</p>
                                {href
                                    ? <a href={href} className="font-bold hover:text-cyan-300 transition-colors text-sm">{value}</a>
                                    : <p className="font-bold text-sm">{value}</p>
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
