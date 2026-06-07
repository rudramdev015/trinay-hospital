import { useState, useMemo, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    Search, GraduationCap, Clock, Award,
    Phone, Calendar, ChevronRight, Users, Star,
    Stethoscope, SlidersHorizontal, X, MapPin,
    Activity, BadgeCheck, Heart,
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

const TRINAY_G = "from-[#003366] via-[#004d80] to-[#006fa3]";

/* ── Use debounce ─────────────────────────────────────────────────── */
const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
};

/* ── Normalise dynamic DB doctor ──────────────────────────────────── */
const FEMALE_NAMES_SET = ["RASHMI","PRIYANKA","PUSHPA","POOJA","KULDEEP","JAISHREE","RITU","CHITRA","VIDHI","METALI","SHALINI"];
const isFemaleDoc = (name) => FEMALE_NAMES_SET.some((n) => name.toUpperCase().includes(n));

const normalizeDynamic = (d) => {
    const nameTitled = d.name.split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");
    const slug = nameTitled.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    return {
    ...d,
    id: d._id,
    nameTitled,
    slug,
    isFemale: isFemaleDoc(d.name),
    isSenior: (d.designation || "").includes("SR."),
    avatar: d.photo ? (d.photo.startsWith("data:") || d.photo.startsWith("http") ? d.photo : buildApiUrl(d.photo)) : null,
    days: "Mon – Sat",
    languages: ["Hindi", "English", "Rajasthani"],
    color: "blue",
    gradient: "from-blue-600 to-blue-800",
    deptDisplay: d.dept ? d.dept.charAt(0) + d.dept.slice(1).toLowerCase() : "General",
    patients: `${(d.experience || 0) * 500}+`,
    };
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
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="group relative bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
        >
            {/* Dept accent line at very top */}
            <div className={`h-[3px] w-full bg-linear-to-r ${TRINAY_G} shrink-0`} />

            {/* Photo area */}
            <div className={`relative h-44 sm:h-48 md:h-52 bg-linear-to-br ${TRINAY_G} overflow-hidden shrink-0`}>
                {/* Background initials — always visible as fallback */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                    {initials
                        ? <span className="text-7xl sm:text-8xl font-black text-white/20 tracking-tight">{initials}</span>
                        : <Stethoscope size={64} className="text-white/15" />
                    }
                </div>

                {/* Real photo */}
                {shouldLoad && doc.avatar && (
                    <img
                        src={doc.avatar}
                        alt={doc.nameTitled}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        style={{ objectPosition: "center 10%" }}
                        onError={(e) => { e.currentTarget.style.opacity = "0"; }}
                    />
                )}

                {/* Bottom gradient overlay */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-black/65 to-transparent" />

                {/* Dept badge — BOTTOM LEFT (never covers the face) */}
                <div className="absolute bottom-2.5 left-2.5">
                    <span className="text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-full text-white bg-white/15 backdrop-blur-md border border-white/25 shadow-sm max-w-[120px] sm:max-w-[140px] truncate block">
                        {doc.deptDisplay}
                    </span>
                </div>

                {/* Experience badge — BOTTOM RIGHT */}
                <div className="absolute bottom-2.5 right-2.5">
                    <span className="text-[9px] font-black text-white bg-black/30 backdrop-blur-md border border-white/20 rounded-full px-2 py-1 whitespace-nowrap">
                        {doc.experience}+ yr
                    </span>
                </div>
            </div>

            {/* Info body */}
            <div className="p-3 sm:p-4 flex flex-col flex-1">
                {/* Name */}
                <h3 className="text-[13px] sm:text-sm font-black text-[#003366] leading-snug line-clamp-2">
                    {doc.nameTitled}
                </h3>

                {/* Designation + senior */}
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                    <p className="text-[11px] font-bold text-blue-500 truncate">{doc.designation}</p>
                    {doc.isSenior && (
                        <span className="px-1.5 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200 shrink-0">
                            Senior
                        </span>
                    )}
                </div>

                {/* Key info */}
                <div className="mt-2.5 pt-2.5 border-t border-slate-50 space-y-1.5">
                    <div className="flex items-start gap-1.5 text-[11px] text-slate-500">
                        <GraduationCap size={11} className="text-slate-400 shrink-0 mt-0.5" />
                        <span className="font-medium line-clamp-1">{doc.qualification}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Clock size={11} className="text-slate-400 shrink-0" />
                        <span className="line-clamp-1">{doc.timing}</span>
                    </div>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-0.5 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={10} fill="#FBBF24" className="text-amber-400" />
                    ))}
                    <span className="text-[10px] text-slate-400 ml-1 font-semibold">4.9</span>
                </div>

                {doc.camp && (
                    <div className="mt-2 bg-orange-50 border border-orange-100 rounded-xl px-2.5 py-1.5 text-[9px] font-bold text-orange-600 uppercase tracking-wider leading-relaxed">
                        📍 {doc.camp}
                    </div>
                )}

                {/* Action buttons */}
                <div className="mt-auto pt-3 grid grid-cols-2 gap-1.5 sm:gap-2">
                    <Link
                        to={`/doctors/${doc.slug}`}
                        className="flex items-center justify-center gap-1 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-bold text-[10px] sm:text-[11px] py-2 sm:py-2.5 rounded-xl transition-all duration-200 active:scale-95 whitespace-nowrap"
                    >
                        Profile <ChevronRight size={10} />
                    </Link>
                    <Link
                        to={`/appointment?doctor=${encodeURIComponent(doc.nameTitled)}&dept=${encodeURIComponent(doc.dept)}`}
                        className={`flex items-center justify-center gap-1 bg-linear-to-r ${TRINAY_G} text-white font-bold text-[10px] sm:text-[11px] py-2 sm:py-2.5 rounded-xl transition-all duration-200 hover:shadow-md active:scale-95 whitespace-nowrap`}
                    >
                        Book <Calendar size={10} />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
});

DoctorCard.displayName = "DoctorCard";

/* ── Doctors Page ─────────────────────────────────────────────────── */
const DoctorsPage = () => {
    const [search, setSearch] = useState("");
    const [activeDept, setActiveDept] = useState("All Specialties");
    const [dynamicDoctors, setDynamicDoctors] = useState([]);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const filterBarRef = useRef(null);
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
                (d.deptDisplay || "").toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                (d.qualification || "").toLowerCase().includes(debouncedSearch.toLowerCase());
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

    const totalCount = Array.isArray(DOCTORS) ? DOCTORS.length : 0;

    return (
        <div className="min-h-screen bg-[#f7f9fc] font-sans">
            <Navbar />

            {/* ═══ HERO ══════════════════════════════════════════════ */}
            <section className="pt-36 sm:pt-40 md:pt-44 pb-20 sm:pb-24 bg-[#003366] relative overflow-hidden">
                {/* Decorative dots grid */}
                <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(white_1px,transparent_1px)] bg-size-[26px_26px]" />
                {/* Glow blobs */}
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-400/10 blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-cyan-400/10 blur-[90px] pointer-events-none" />

                <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-center mb-5"
                    >
                        <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-300 font-bold tracking-widest uppercase text-[11px] px-4 py-2 rounded-full">
                            <Award size={12} /> Expert Medical Team
                        </span>
                    </motion.div>

                    {/* Heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="text-center text-4xl sm:text-5xl md:text-6xl font-black text-white leading-[1.1] tracking-tight"
                    >
                        Meet Our{" "}
                        <span className="bg-linear-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                            Specialists
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.14 }}
                        className="text-center text-slate-300 text-sm sm:text-base max-w-xl mx-auto mt-4 leading-relaxed"
                    >
                        {totalCount}+ highly-qualified specialists across 17 departments — compassionate, world-class care.
                    </motion.p>

                    {/* Search bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 max-w-2xl mx-auto"
                    >
                        <div className="relative group">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search by doctor name or specialty…"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-12 pr-12 py-4 bg-white rounded-2xl text-slate-700 font-semibold placeholder:text-slate-400 outline-none focus:ring-3 focus:ring-blue-200 shadow-lg text-sm transition-all"
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
                    </motion.div>

                    {/* Quick stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.26 }}
                        className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4"
                    >
                        {[
                            { icon: <Users size={15} />,      value: `${totalCount}+`, label: "Specialists"  },
                            { icon: <Activity size={15} />,   value: "17",             label: "Departments"  },
                            { icon: <BadgeCheck size={15} />, value: "100+",           label: "Bed Capacity" },
                            { icon: <Heart size={15} />,      value: "24/7",           label: "Emergency"    },
                        ].map(({ icon, value, label }) => (
                            <div key={label} className="flex items-center gap-2.5 bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl px-4 py-2.5">
                                <span className="text-cyan-400">{icon}</span>
                                <div>
                                    <p className="text-lg font-black text-white leading-none">{value}</p>
                                    <p className="text-[10px] text-white/55 font-semibold uppercase tracking-wider">{label}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══ FILTER BAR ════════════════════════════════════════ */}
            <div ref={filterBarRef} className="sticky top-0 z-30 bg-white border-b border-slate-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center gap-2 py-3">
                        {/* Mobile filter toggle */}
                        <button
                            onClick={() => setShowMobileFilters((p) => !p)}
                            className={`sm:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-xs transition-all shrink-0 ${showMobileFilters ? "bg-[#003366] text-white" : "bg-slate-100 text-slate-600"}`}
                        >
                            <SlidersHorizontal size={13} />
                            Filter
                        </button>

                        {/* Dept chips — horizontal scroll */}
                        <div className={`flex gap-1.5 overflow-x-auto no-scrollbar pb-0.5 flex-1 ${showMobileFilters ? "flex" : "hidden sm:flex"}`}>
                            {DEPARTMENTS.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => { setActiveDept(dept); setShowMobileFilters(false); }}
                                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                                        activeDept === dept
                                            ? "bg-[#003366] text-white shadow-sm"
                                            : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100"
                                    }`}
                                >
                                    {dept === "All Specialties" ? dept : dept.charAt(0) + dept.slice(1).toLowerCase()}
                                </button>
                            ))}
                        </div>

                        {/* Result count */}
                        <div className="shrink-0 hidden sm:flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-slate-400 whitespace-nowrap">
                                <span className="text-[#003366] font-black">{filtered.length}</span> result{filtered.length !== 1 ? "s" : ""}
                            </span>
                            {(activeDept !== "All Specialties" || search) && (
                                <button onClick={clearFilters} className="text-[11px] font-bold text-rose-500 hover:text-rose-700 flex items-center gap-0.5 transition-colors">
                                    <X size={11} /> Clear
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile filter chips (dropdown) */}
                    {showMobileFilters && (
                        <div className="sm:hidden flex gap-1.5 overflow-x-auto no-scrollbar pb-2 pt-0">
                            {DEPARTMENTS.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => { setActiveDept(dept); setShowMobileFilters(false); }}
                                    className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all shrink-0 ${
                                        activeDept === dept
                                            ? "bg-[#003366] text-white"
                                            : "bg-slate-50 text-slate-500 border border-slate-100"
                                    }`}
                                >
                                    {dept === "All Specialties" ? dept : dept.charAt(0) + dept.slice(1).toLowerCase()}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ═══ DOCTOR GRID ═══════════════════════════════════════ */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {/* Mobile count + clear */}
                <div className="flex items-center justify-between mb-4 sm:hidden">
                    <p className="text-xs font-semibold text-slate-500">
                        <span className="text-[#003366] font-black">{filtered.length}</span> specialist{filtered.length !== 1 ? "s" : ""}
                    </p>
                    {(activeDept !== "All Specialties" || search) && (
                        <button onClick={clearFilters} className="text-xs font-bold text-rose-500 flex items-center gap-1">
                            <X size={11} /> Clear filters
                        </button>
                    )}
                </div>

                {filtered.length > 0 ? (
                    <motion.div
                        layout
                        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
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
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
                            <Search size={32} className="text-slate-300" />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-black text-slate-700">No Specialists Found</h2>
                        <p className="text-slate-400 mt-2 text-sm">Try a different name or specialty.</p>
                        <button
                            onClick={clearFilters}
                            className="mt-6 px-6 py-3 rounded-2xl bg-[#003366] text-white text-sm font-bold hover:bg-[#002244] transition-colors shadow-lg shadow-blue-200"
                        >
                            Show all doctors
                        </button>
                    </div>
                )}
            </section>

            {/* ═══ CONTACT STRIP ═════════════════════════════════════ */}
            <section className="bg-[#003366]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-8">
                        {[
                            { icon: <Phone size={20} />,    label: "24/7 Emergency",   value: "+91 91191 91622",  href: "tel:+919119191622" },
                            { icon: <Calendar size={20} />, label: "OPD Hours",         value: "Mon–Sat: 9AM – 8PM", href: null },
                            { icon: <MapPin size={20} />,   label: "Location",           value: "Chopasni Garden, Jodhpur", href: null },
                        ].map(({ icon, label, value, href }) => (
                            <div key={label} className="flex items-center gap-4">
                                <div className="w-11 h-11 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 text-white">
                                    {icon}
                                </div>
                                <div>
                                    <p className="text-[10px] text-white/50 uppercase font-black tracking-widest">{label}</p>
                                    {href
                                        ? <a href={href} className="font-bold hover:text-cyan-300 transition-colors text-sm text-white">{value}</a>
                                        : <p className="font-bold text-sm text-white">{value}</p>
                                    }
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DoctorsPage;
