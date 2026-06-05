import { useEffect, useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar, CalendarCheck, Clock, Mail, MessageSquare,
    Phone, User, ChevronRight, CheckCircle2, Search,
    ArrowLeft, Stethoscope, GraduationCap, Star, MapPin,
    Shield, Lock, Heart, Brain, Activity, Microscope,
    Pill, Wind, Baby, Eye, Bone, Smile, Zap, Sparkles,
    PhoneCall,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Toast from "../components/common/Toast";
import { DOCTORS, DEPARTMENTS } from "../data/doctorsData";
import { buildApiUrl } from "../utils/api";

const hospitalImg = "/IMAGES/_DSC82642x.jpg.jpeg";

/* ─── dept alias map — maps URL labels → exact doctorsData dept keys ─── */
const DEPT_ALIASES = {
    "neurology":                   "NEUROSURGEON",
    "neurosurgery":                "NEUROSURGEON",
    "neurosurgeon":                "NEUROSURGEON",
    "gynaecology":                 "OBS. & GYNAE.",
    "gynecology":                  "OBS. & GYNAE.",
    "gynaecology & obs.":          "OBS. & GYNAE.",
    "obs. & gynae.":               "OBS. & GYNAE.",
    "obstetrics":                  "OBS. & GYNAE.",
    "obs & gynae":                 "OBS. & GYNAE.",
    "physiotherapy":               "PHYSIOTHERAPIST",
    "physiotherapist":             "PHYSIOTHERAPIST",
    "anaesthesiology":             "ANAESTHESIA & CRITICAL CARE",
    "anesthesiology":              "ANAESTHESIA & CRITICAL CARE",
    "critical care":               "ANAESTHESIA & CRITICAL CARE",
    "critical care / icu":         "ANAESTHESIA & CRITICAL CARE",
    "icu care":                    "ANAESTHESIA & CRITICAL CARE",
    "icu":                         "ANAESTHESIA & CRITICAL CARE",
    "anaesthesia & critical care": "ANAESTHESIA & CRITICAL CARE",
    "urology":                     "UROLOGIST",
    "urologist":                   "UROLOGIST",
    "plastic surgery":             "PLASTIC & COSMETIC SURGERY",
    "plastic & cosmetic surgery":  "PLASTIC & COSMETIC SURGERY",
    "ent care":                    "ENT",
    "ent":                         "ENT",
    "laparoscopic surgery":        "GENERAL SURGERY",
    "laparoscopic":                "GENERAL SURGERY",
    "general surgery":             "GENERAL SURGERY",
    "orthopaedic":                 "ORTHOPAEDICS",
    "orthopedic":                  "ORTHOPAEDICS",
    "orthopaedics":                "ORTHOPAEDICS",
    "cardiology":                  "CARDIOLOGY",
    "general medicine":            "GENERAL MEDICINE",
    "dietetics":                   "DIETETICS",
    "dentistry":                   "DENTISTRY",
    "dental":                      "DENTISTRY",
    "surgical oncology":           "SURGICAL ONCOLOGY",
    "oncology":                    "SURGICAL ONCOLOGY",
    "radiology":                   "RADIOLOGY",
};

/* Resolve a raw URL dept string → exact DEPARTMENTS key, or "" if no match */
const resolvePreDept = (raw) => {
    if (!raw) return "";
    const lower = raw.toLowerCase().trim();
    /* 1. exact case-insensitive match in DEPARTMENTS */
    const exact = DEPARTMENTS.find((d) => d.toLowerCase() === lower);
    if (exact) return exact;
    /* 2. alias map */
    const aliased = DEPT_ALIASES[lower];
    if (aliased && DEPARTMENTS.includes(aliased)) return aliased;
    /* 3. partial match (dept contains the raw string) */
    const partial = DEPARTMENTS.find((d) => d.toLowerCase().includes(lower) || lower.includes(d.toLowerCase()));
    if (partial) return partial;
    /* 4. no match → return "" so wizard starts at Step 1 */
    return "";
};

/* ─── helpers ─────────────────────────────────────────────────────────── */
const getTodayStr = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};
const normalizePhone = (v) => String(v || "").replace(/[\s-]/g, "").trim();
const isValidPhone   = (v) => /^(?:\+91|0)?[6-9]\d{9}$/.test(v);

/* Parse "10:00 AM – 5:00 PM" (and "12:00 Noon") → 30-min slot objects within that window */
const parseTimingSlots = (timing) => {
    if (!timing || timing.trim().toUpperCase() === "ON CALL") return [];
    const normalised = timing.replace(/noon/i, "PM");
    const m = normalised.match(/(\d+):(\d+)\s*(AM|PM)\s*[–—-]+\s*(\d+):(\d+)\s*(AM|PM)/i);
    if (!m) return [];
    const to24 = (h, min, p) => {
        let hr = parseInt(h, 10);
        const mn = parseInt(min, 10);
        if (p.toUpperCase() === "PM" && hr !== 12) hr += 12;
        if (p.toUpperCase() === "AM" && hr === 12) hr = 0;
        return hr * 60 + mn;
    };
    const start = to24(m[1], m[2], m[3]);
    const end   = to24(m[4], m[5], m[6]);
    const slots = [];
    for (let t = start; t < end; t += 30) {
        const h    = Math.floor(t / 60);
        const min  = t % 60;
        const ampm = h < 12 ? "AM" : "PM";
        const h12  = h === 0 ? 12 : h > 12 ? h - 12 : h;
        slots.push({
            value: `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`,
            label: `${h12}:${String(min).padStart(2, "0")} ${ampm}`,
        });
    }
    return slots;
};

/* ─── dept palette (cycles by index) ─────────────────────────────────── */
const PALETTES = [
    { grad: "from-sky-500 to-blue-600",       icon: Stethoscope, ring: "ring-sky-200"    },
    { grad: "from-rose-500 to-pink-600",       icon: Heart,       ring: "ring-rose-200"   },
    { grad: "from-violet-500 to-indigo-600",   icon: Brain,       ring: "ring-violet-200" },
    { grad: "from-amber-500 to-orange-500",    icon: Activity,    ring: "ring-amber-200"  },
    { grad: "from-pink-500 to-rose-500",       icon: Baby,        ring: "ring-pink-200"   },
    { grad: "from-cyan-500 to-sky-600",        icon: Microscope,  ring: "ring-cyan-200"   },
    { grad: "from-lime-500 to-green-600",      icon: Wind,        ring: "ring-lime-200"   },
    { grad: "from-fuchsia-500 to-purple-600",  icon: Pill,        ring: "ring-fuchsia-200"},
    { grad: "from-red-500 to-rose-600",        icon: Bone,        ring: "ring-red-200"    },
    { grad: "from-teal-500 to-emerald-600",    icon: Eye,         ring: "ring-teal-200"   },
    { grad: "from-orange-500 to-red-500",      icon: Smile,       ring: "ring-orange-200" },
    { grad: "from-indigo-500 to-violet-600",   icon: Zap,         ring: "ring-indigo-200" },
];

const DEPT_LIST = DEPARTMENTS.filter((d) => d !== "All Specialties");
const getPal    = (i) => PALETTES[i % PALETTES.length];

/* ─── animation presets ──────────────────────────────────────────────── */
const fadeUp = {
    hidden:  { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0,  transition: { duration: 0.48, ease: [0.22, 1, 0.36, 1] } },
    exit:    { opacity: 0, y: -16, transition: { duration: 0.26 } },
};
const stagger   = { visible: { transition: { staggerChildren: 0.065 } } };
const fieldAnim = {
    hidden:  { opacity: 0, y: 8 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.36, ease: [0.22, 1, 0.36, 1] } },
};

/* ═══════════════════════════════════════════════════════════════════════
   STEP BAR
═══════════════════════════════════════════════════════════════════════ */
const StepBar = ({ step }) => {
    const steps = ["Choose Specialty", "Select Doctor", "Your Details"];
    return (
        <div className="flex items-start mb-8 md:mb-10">
            {steps.map((label, i) => {
                const num    = i + 1;
                const done   = step > num;
                const active = step === num;
                return (
                    <div key={label} className="flex items-center flex-1">
                        <div className="flex flex-col items-center gap-1.5 shrink-0">
                            <div className={`relative w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-sm font-black transition-all duration-500 ${
                                done   ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200"
                                : active ? "bg-[#003366] text-white shadow-xl shadow-blue-200"
                                         : "bg-slate-100 text-slate-400"
                            }`}>
                                {done ? <CheckCircle2 size={18} /> : num}
                                {active && <span className="absolute inset-0 rounded-full bg-[#003366] animate-ping opacity-20" />}
                            </div>
                            <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-wider text-center leading-tight w-16 md:w-20 ${
                                active ? "text-[#003366]" : done ? "text-emerald-500" : "text-slate-400"
                            }`}>{label}</p>
                        </div>
                        {i < steps.length - 1 && (
                            <div className={`flex-1 h-[3px] mx-1.5 md:mx-2 mb-6 rounded-full transition-all duration-700 ${
                                done ? "bg-emerald-400" : "bg-slate-100"
                            }`} />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════════
   STEP 1 — Choose Specialty
═══════════════════════════════════════════════════════════════════════ */
const Step1 = ({ onSelect, selected }) => (
    <motion.div key="step1" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
        <h2 className="text-2xl md:text-3xl font-black text-[#003366] mb-1">Choose a Specialty</h2>
        <p className="text-slate-400 text-sm mb-7">Select the medical department you need a consultation for.</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DEPT_LIST.map((dept, idx) => {
                const pal   = getPal(idx);
                const count = DOCTORS.filter((d) => d.dept === dept).length;
                const active = selected === dept;
                const DeptIcon = pal.icon;
                return (
                    <motion.button
                        key={dept}
                        onClick={() => onSelect(dept)}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.97 }}
                        className={`relative flex items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left transition-all duration-300 group overflow-hidden ${
                            active
                                ? `bg-gradient-to-r ${pal.grad} border-transparent shadow-xl text-white`
                                : "border-slate-100 bg-white hover:border-transparent hover:shadow-xl"
                        }`}
                    >
                        {!active && (
                            <div className={`absolute inset-0 bg-gradient-to-r ${pal.grad} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                        )}
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${pal.grad} ${active ? "bg-white/20" : ""} shadow-md`}>
                            <DeptIcon size={20} className="text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className={`text-sm font-black leading-snug ${active ? "text-white" : "text-slate-800"}`}>
                                {dept.charAt(0) + dept.slice(1).toLowerCase()}
                            </p>
                            <p className={`text-[11px] mt-0.5 font-semibold ${active ? "text-white/70" : "text-slate-400"}`}>
                                {count > 0 ? `${count} specialist${count > 1 ? "s" : ""}` : "Call to book"}
                            </p>
                        </div>
                        {active
                            ? <CheckCircle2 size={18} className="text-white shrink-0" />
                            : <ChevronRight size={16} className="text-slate-300 shrink-0 group-hover:text-slate-500 transition-colors" />
                        }
                    </motion.button>
                );
            })}
        </div>
    </motion.div>
);

/* ═══════════════════════════════════════════════════════════════════════
   STEP 2 — Choose Doctor
═══════════════════════════════════════════════════════════════════════ */
const Step2 = ({ dept, onSelect, selected, onBack }) => {
    const [search, setSearch] = useState("");
    const deptIdx = DEPT_LIST.indexOf(dept);
    const pal = getPal(deptIdx >= 0 ? deptIdx : 0);
    const DeptIcon = pal.icon;

    const docs = DOCTORS.filter((d) =>
        d.dept === dept && d.nameTitled.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <motion.div key="step2" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
            <button onClick={onBack}
                className="inline-flex items-center gap-1.5 text-[#003366] text-sm font-bold mb-5 hover:text-blue-700 transition-colors group">
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                Back to Specialties
            </button>

            {/* Dept header */}
            <div className={`flex items-center gap-4 rounded-2xl bg-gradient-to-r ${pal.grad} p-4 mb-6 shadow-lg`}>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                    <DeptIcon size={22} className="text-white" />
                </div>
                <div>
                    <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Showing specialists in</p>
                    <h2 className="text-xl md:text-2xl font-black text-white leading-tight">
                        {dept.charAt(0) + dept.slice(1).toLowerCase()}
                    </h2>
                </div>
                <div className="ml-auto bg-white/20 text-white text-xs font-black px-3 py-1.5 rounded-full shrink-0">
                    {docs.length} found
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-5">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by doctor name…"
                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50 border-2 border-slate-100 text-sm font-semibold text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#003366]/30 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all"
                />
            </div>

            {/* Doctors */}
            {docs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {docs.map((doc) => {
                        const active = selected?.id === doc.id;
                        return (
                            <motion.button
                                key={doc.id}
                                onClick={() => onSelect(doc)}
                                whileHover={{ scale: 1.01, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                                className={`relative flex items-start gap-4 rounded-2xl border-2 p-4 text-left transition-all duration-300 ${
                                    active
                                        ? "border-[#003366] bg-blue-50/80 shadow-xl shadow-blue-100"
                                        : "border-slate-100 bg-white hover:border-blue-200 hover:shadow-lg"
                                }`}
                            >
                                {active && (
                                    <div className="absolute top-3 right-3 w-6 h-6 bg-[#003366] rounded-full flex items-center justify-center">
                                        <CheckCircle2 size={14} className="text-white" />
                                    </div>
                                )}
                                <div className="relative shrink-0">
                                    <img src={doc.avatar} alt={doc.nameTitled}
                                        className={`w-20 h-20 rounded-2xl object-cover object-top border-2 transition-all ${
                                            active ? "border-[#003366]" : "border-slate-100"
                                        }`} />
                                    {doc.isSenior && (
                                        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap bg-amber-400 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full">
                                            SENIOR
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 pt-0.5">
                                    <p className={`text-sm font-black leading-snug pr-6 ${active ? "text-[#003366]" : "text-slate-800"}`}>
                                        {doc.nameTitled}
                                    </p>
                                    <p className="text-xs text-blue-500 font-bold mt-0.5 truncate">{doc.designation}</p>
                                    <div className="flex items-center gap-0.5 mt-1.5">
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <Star key={i} size={10} fill="#FBBF24" className="text-amber-400" />
                                        ))}
                                        <span className="text-[10px] text-slate-400 ml-1 font-semibold">4.9</span>
                                    </div>
                                    <div className="mt-2 space-y-1">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                            <GraduationCap size={11} className="text-slate-400 shrink-0" />
                                            <span className="truncate">{doc.qualification}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                            <Clock size={11} className="shrink-0" />
                                            <span>{doc.timing}</span>
                                        </div>
                                        {doc.experience && (
                                            <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-emerald-100">
                                                {doc.experience}+ yrs exp
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            ) : (
                /* Empty state */
                <div className="text-center py-12 px-6 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${pal.grad} flex items-center justify-center opacity-25`}>
                        <Stethoscope size={28} className="text-white" />
                    </div>
                    <p className="text-slate-700 font-black text-lg mb-1">No Doctors Listed Yet</p>
                    <p className="text-slate-400 text-sm mb-5 max-w-xs mx-auto">
                        Our {dept.charAt(0) + dept.slice(1).toLowerCase()} specialists are available by appointment — call us to book directly.
                    </p>
                    <a href="tel:+919119191622"
                        className="inline-flex items-center gap-2 bg-[#003366] text-white font-black text-sm px-6 py-3 rounded-2xl hover:bg-blue-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-200">
                        <Phone size={15} /> Call: +91 91191 91622
                    </a>
                </div>
            )}
        </motion.div>
    );
};

/* ═══════════════════════════════════════════════════════════════════════
   STEP 3 — Your Details
═══════════════════════════════════════════════════════════════════════ */
const Step3 = ({ doctor, dept, onBack, onSubmit, loading }) => {
    const isOnCall  = !doctor?.timing || doctor.timing.trim().toUpperCase() === "ON CALL";
    const timeSlots = isOnCall ? [] : parseTimingSlots(doctor.timing);

    const [form, setForm] = useState({
        name: "", phone: "", email: "", date: "", time: "", message: "",
        doctor: doctor?.nameTitled ?? "",
        department: dept ?? "",
    });
    const handle = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

    const inp = "w-full rounded-xl border-2 border-slate-100 bg-slate-50 px-4 py-3 pl-11 text-sm text-slate-700 placeholder:text-slate-400 outline-none focus:border-[#003366]/40 focus:bg-white focus:ring-4 focus:ring-blue-50 transition-all font-medium";

    return (
        <motion.div key="step3" variants={fadeUp} initial="hidden" animate="visible" exit="exit">
            <button onClick={onBack}
                className="inline-flex items-center gap-1.5 text-[#003366] text-sm font-bold mb-5 hover:text-blue-700 transition-colors group">
                <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
                Back to Doctor Selection
            </button>

            {/* Selected doctor banner */}
            {doctor && (
                <div className={`flex items-center gap-4 rounded-2xl bg-gradient-to-r ${doctor.gradient} p-4 mb-6 shadow-lg`}>
                    <img src={doctor.avatar} alt={doctor.nameTitled}
                        className="w-14 h-14 rounded-xl object-cover object-top border-2 border-white/30 shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="font-black text-white text-base leading-snug">{doctor.nameTitled}</p>
                        <p className="text-white/70 text-xs mt-0.5">{doctor.deptDisplay} · {doctor.timing}</p>
                    </div>
                    <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
                        <CheckCircle2 size={20} className="text-white" />
                    </div>
                </div>
            )}

            <h2 className="text-2xl font-black text-[#003366] mb-1">Your Details</h2>
            <p className="text-slate-400 text-sm mb-6">Fill in your information to confirm the appointment.</p>

            <motion.form variants={stagger} initial="hidden" animate="visible" className="space-y-4"
                onSubmit={(e) => { e.preventDefault(); onSubmit(form); }}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <motion.div variants={fieldAnim}>
                        <label className="block text-xs font-black text-slate-600 mb-1.5 ml-1">Full Name *</label>
                        <div className="relative">
                            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#003366]/40 pointer-events-none" />
                            <input name="name" value={form.name} onChange={handle} required placeholder="Your full name" className={inp} />
                        </div>
                    </motion.div>
                    <motion.div variants={fieldAnim}>
                        <label className="block text-xs font-black text-slate-600 mb-1.5 ml-1">Phone Number *</label>
                        <div className="relative">
                            <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#003366]/40 pointer-events-none" />
                            <input name="phone" value={form.phone} onChange={e => { const v = e.target.value.replace(/\D/g, ''); if (v.length <= 10) handle({ target: { name: 'phone', value: v } }); }} required placeholder="10-digit mobile number" type="tel" inputMode="numeric" maxLength={10} pattern="[0-9]{10}" className={inp} />
                        </div>
                    </motion.div>
                    <motion.div variants={fieldAnim} className="md:col-span-2">
                        <label className="block text-xs font-black text-slate-600 mb-1.5 ml-1">Email Address *</label>
                        <div className="relative">
                            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#003366]/40 pointer-events-none" />
                            <input name="email" value={form.email} onChange={handle} required type="email" placeholder="you@example.com" className={inp} />
                        </div>
                    </motion.div>
                    <motion.div variants={fieldAnim}>
                        <label className="block text-xs font-black text-slate-600 mb-1.5 ml-1">Preferred Date *</label>
                        <div className="relative">
                            <Calendar size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#003366]/40 pointer-events-none" />
                            <input name="date" value={form.date} onChange={handle} required type="date" min={getTodayStr()} className={inp} />
                        </div>
                    </motion.div>
                    <motion.div variants={fieldAnim}>
                        <label className="block text-xs font-black text-slate-600 mb-1.5 ml-1">Preferred Time *</label>
                        {isOnCall ? (
                            <div className="w-full rounded-xl border-2 border-amber-200 bg-amber-50 px-4 py-3.5 text-sm text-amber-700 font-semibold flex items-center gap-2">
                                <Phone size={14} className="text-amber-500 shrink-0" />
                                Available on-call — contact us to schedule a time.
                            </div>
                        ) : (
                            <div className="relative">
                                <Clock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#003366]/40 pointer-events-none z-10" />
                                <select
                                    name="time"
                                    value={form.time}
                                    onChange={handle}
                                    required
                                    className={`${inp} appearance-none cursor-pointer pr-10`}
                                >
                                    <option value="" disabled>
                                        Select slot — {doctor?.timing}
                                    </option>
                                    {timeSlots.map((slot) => (
                                        <option key={slot.value} value={slot.value}>
                                            {slot.label}
                                        </option>
                                    ))}
                                </select>
                                <ChevronRight size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-slate-400 pointer-events-none" />
                            </div>
                        )}
                    </motion.div>
                </div>

                <motion.div variants={fieldAnim}>
                    <label className="block text-xs font-black text-slate-600 mb-1.5 ml-1">
                        Message <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <div className="relative">
                        <MessageSquare size={15} className="absolute left-3.5 top-3.5 text-[#003366]/40 pointer-events-none" />
                        <textarea name="message" value={form.message} onChange={handle} rows={3}
                            placeholder="Symptoms, reason for visit, or any notes…"
                            className={`${inp} resize-none`} />
                    </div>
                </motion.div>

                <motion.div variants={fieldAnim} className="pt-1">
                    <button type="submit" disabled={loading}
                        className="w-full flex items-center justify-center gap-2.5 bg-[#003366] hover:bg-blue-700 disabled:opacity-60 text-white py-4 rounded-2xl text-base font-black shadow-xl shadow-blue-200 hover:shadow-blue-300 hover:scale-[1.02] active:scale-95 transition-all duration-300">
                        {loading
                            ? <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Confirming…</>
                            : <><CalendarCheck size={20} /> Confirm Appointment</>
                        }
                    </button>
                </motion.div>
            </motion.form>
        </motion.div>
    );
};

/* ═══════════════════════════════════════════════════════════════════════
   RIGHT SIDEBAR — Info Panel
═══════════════════════════════════════════════════════════════════════ */
const InfoPanel = () => (
    <div className="space-y-5">

        {/* Hospital card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img src={hospitalImg} alt="Trinay Hospital" className="w-full h-48 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001f4d]/95 via-[#003366]/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white font-black text-lg leading-tight">Trinay Hospital</p>
                <div className="flex items-center gap-1.5 mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} fill="#FBBF24" className="text-amber-400" />
                    ))}
                    <span className="text-white/70 text-xs ml-1 font-semibold">4.9 · Google Reviews</span>
                </div>
                <p className="text-white/60 text-xs mt-1.5 flex items-center gap-1">
                    <MapPin size={11} /> Opp. Chopasni Garden, PF Office Road, Jodhpur
                </p>
            </div>
        </div>

        {/* Quick stats */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5">
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Why Trinay Hospital</p>
            <div className="grid grid-cols-2 gap-3">
                {[
                    { v: "24+",  l: "Specialists",   color: "text-blue-600",   bg: "bg-blue-50"   },
                    { v: "17",   l: "Departments",   color: "text-violet-600", bg: "bg-violet-50" },
                    { v: "24/7", l: "Emergency",     color: "text-rose-500",   bg: "bg-rose-50"   },
                    { v: "15yr", l: "Experience",    color: "text-emerald-600",bg: "bg-emerald-50" },
                ].map(({ v, l, color, bg }) => (
                    <div key={l} className={`${bg} rounded-2xl p-3.5 text-center`}>
                        <p className={`text-xl font-black ${color}`}>{v}</p>
                        <p className="text-xs text-slate-500 font-semibold mt-0.5">{l}</p>
                    </div>
                ))}
            </div>
        </div>

        {/* Contact block */}
        <div className="bg-[#003366] rounded-3xl p-5 shadow-xl shadow-blue-200">
            <p className="text-xs font-black text-white/40 uppercase tracking-widest mb-4">Contact Us</p>
            <div className="space-y-3">
                <a href="tel:+919119191622"
                    className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-cyan-500/30 transition-colors">
                        <PhoneCall size={16} className="text-cyan-400" />
                    </div>
                    <div>
                        <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Emergency / OPD</p>
                        <p className="text-white font-black text-sm">+91 91191 91622</p>
                    </div>
                </a>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <Clock size={16} className="text-cyan-400" />
                    </div>
                    <div>
                        <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">OPD Hours</p>
                        <p className="text-white font-black text-sm">Mon–Sat: 9AM – 8PM</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                        <Sparkles size={16} className="text-cyan-400" />
                    </div>
                    <div>
                        <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Emergency Care</p>
                        <p className="text-white font-black text-sm">Open 24 Hours</p>
                    </div>
                </div>
            </div>
        </div>

{/* Trust signals */}
        <div className="grid grid-cols-2 gap-3">
            {[
                { icon: <Lock size={16} className="text-indigo-500" />, title: "Data Private", bg: "bg-indigo-50", border: "border-indigo-100" },
                { icon: <Shield size={16} className="text-emerald-500" />, title: "NABH Certified", bg: "bg-emerald-50", border: "border-emerald-100" },
            ].map(({ icon, title, bg, border }) => (
                <div key={title} className={`${bg} border ${border} rounded-2xl p-3 flex items-center gap-2`}>
                    {icon}
                    <p className="text-xs font-black text-slate-700">{title}</p>
                </div>
            ))}
        </div>
    </div>
);

/* ═══════════════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════════════ */
const Appointment = () => {
    const [searchParams] = useSearchParams();
    const preDoctor  = searchParams.get("doctor") ?? "";
    const preDeptRaw = searchParams.get("dept")   ?? "";

    /* Resolve URL dept → exact DEPARTMENTS key via alias map + partial match */
    const preDept = resolvePreDept(preDeptRaw);

    const preFilledDoc  = preDoctor ? DOCTORS.find((d) => d.nameTitled === preDoctor) ?? null : null;
    const preFilledDept = preDept || (preFilledDoc?.dept ?? "");

    const [step,      setStep]      = useState(preFilledDoc ? 3 : preFilledDept ? 2 : 1);
    const [selDept,   setSelDept]   = useState(preFilledDept);
    const [selDoctor, setSelDoctor] = useState(preFilledDoc);
    const [loading,   setLoading]   = useState(false);
    const [toast,     setToast]     = useState(null);
    const toastTimer = useRef(null);

    useEffect(() => {
        if (!toast) return undefined;
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 3500);
        return () => clearTimeout(toastTimer.current);
    }, [toast]);

    const handleDeptSelect   = (dept) => { setSelDept(dept);   setStep(2); };
    const handleDoctorSelect = (doc)  => { setSelDoctor(doc);  setStep(3); };

    const handleSubmit = async (form) => {
        if (!isValidPhone(normalizePhone(form.phone))) {
            setToast({ variant: "error", title: "Invalid number", message: "Enter a valid 10-digit Indian mobile number." });
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(buildApiUrl("/api/appointments"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...form, phone: normalizePhone(form.phone) }),
            });
            if (!res.ok) throw new Error("Server error");
            setToast({ variant: "success", title: "Appointment Booked!", message: "Our team will contact you shortly to confirm." });
            setStep(1); setSelDept(""); setSelDoctor(null);
        } catch {
            setToast({ variant: "error", title: "Booking failed", message: "Unable to reach server. Please call us or try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen font-sans" style={{ background: "linear-gradient(160deg,#f0f4ff 0%,#e8efff 50%,#f5f8ff 100%)" }}>
            {toast && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/25 backdrop-blur-sm px-4">
                    <Toast variant={toast.variant} title={toast.title} message={toast.message} onClose={() => setToast(null)} />
                </div>
            )}

            <Navbar />

            {/* ── Hero ── */}
            <section className="relative overflow-hidden" style={{ minHeight: "280px" }}>
                <img src={hospitalImg} alt="Trinay Hospital"
                    className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#001234]/90 via-[#003366]/85 to-[#001234]/98" />
                <div className="absolute inset-0 opacity-[0.035]"
                    style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "22px 22px" }} />
                <div className="absolute bottom-0 left-0 right-0 h-16 rounded-t-[2.5rem]"
                    style={{ background: "linear-gradient(160deg,#f0f4ff 0%,#e8efff 50%,#f5f8ff 100%)" }} />

                <div className="relative pt-36 pb-20 md:pt-48 md:pb-28 max-w-7xl mx-auto px-5 md:px-10 text-center">
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-cyan-300 text-[11px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-full mb-5 backdrop-blur-sm">
                        <MapPin size={12} /> Trinay Hospital · Jodhpur, Rajasthan
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                        Book Your{" "}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Appointment
                        </span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="text-slate-300 mt-3 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                        Choose your specialty and specialist — confirmed within minutes.
                    </motion.p>
                </div>
            </section>

            {/* ── Split Layout ── */}
            <section className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 pb-20 -mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-6 lg:gap-8 items-start">

                    {/* LEFT — Wizard Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                        className="bg-white rounded-3xl shadow-2xl shadow-blue-100/60 border border-white p-6 md:p-8 lg:p-10"
                    >
                        <StepBar step={step} />

                        <AnimatePresence mode="wait">
                            {step === 1 && <Step1 key="s1" onSelect={handleDeptSelect} selected={selDept} />}
                            {step === 2 && <Step2 key="s2" dept={selDept} onSelect={handleDoctorSelect} selected={selDoctor} onBack={() => setStep(1)} />}
                            {step === 3 && <Step3 key="s3" doctor={selDoctor} dept={selDept} onBack={() => setStep(selDoctor ? 2 : 1)} onSubmit={handleSubmit} loading={loading} />}
                        </AnimatePresence>
                    </motion.div>

                    {/* RIGHT — Info Panel (sticky on desktop) */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.25 }}
                        className="lg:sticky lg:top-24"
                    >
                        <InfoPanel />

                        {/* Emergency CTA */}
                        <div className="mt-5 flex items-center justify-center gap-2.5 text-sm text-slate-500 flex-wrap">
                            <span>Need urgent help?</span>
                            <a href="tel:+919119191622"
                                className="inline-flex items-center gap-1.5 bg-rose-500 hover:bg-rose-600 text-white font-black px-5 py-2.5 rounded-full text-xs transition-all hover:scale-105 active:scale-95 shadow-md shadow-rose-200">
                                <Phone size={13} /> +91 91191 91622
                            </a>
                        </div>
                        <p className="text-center mt-4 text-xs text-slate-400">
                            Browse all specialists?{" "}
                            <Link to="/doctors" className="text-[#003366] font-black hover:underline inline-flex items-center gap-0.5">
                                View Doctors <ChevronRight size={13} />
                            </Link>
                        </p>
                    </motion.div>

                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Appointment;
