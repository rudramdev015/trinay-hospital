import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, Film, X, ZoomIn } from "lucide-react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

import ab1  from "../assets/images/Artboard 1.jpg";
import ab2  from "../assets/images/Artboard 2.jpg";
import ab3  from "../assets/images/Artboard 3.jpg";
import ab4  from "../assets/images/Artboard 4.jpg";
import ab5  from "../assets/images/Artboard 5.jpg";
import ab7  from "../assets/images/Artboard 7.jpg";
import ab8  from "../assets/images/Artboard 8.jpg";
import ab9  from "../assets/images/Artboard 9.jpg";
import ab10 from "../assets/images/Artboard 10.jpg";
import ab11 from "../assets/images/Artboard 11.jpg";
import ab12 from "../assets/images/Artboard 12.jpg";
import ab13 from "../assets/images/Artboard 13.jpg";
import ab14 from "../assets/images/Artboard 14.jpg";
import ab15 from "../assets/images/Artboard 15.jpg";
import ab16 from "../assets/images/Artboard 16.jpg";
import ab17 from "../assets/images/Artboard 17.jpg";
import ab18 from "../assets/images/Artboard 18.jpg";
import ab19 from "../assets/images/Artboard 19.jpg";
import ab20 from "../assets/images/Artboard 20.jpg";
import ab21 from "../assets/images/Artboard 21.jpg";
import ab22 from "../assets/images/Artboard 22.jpg";
import imgBed      from "../assets/images/Artboard 18.jpg";
import imgCritical from "../assets/images/critical care.jpg";

/* ── constants ──────────────────────────────────────────────────────────── */
const YT_CHANNEL = "https://www.youtube.com/@TrinayHospitaljdp";
const IG_REELS   = "https://www.instagram.com/trinayhospital/reels/";

const YT_VIDEOS = [
    { id: "WBK-58EcKt8", title: "Inside Jodhpur's Best Multispeciality Hospital | Trinay Hospital Tour" },
    { id: "5P8CkR0mWPE", title: "Inside Jodhpur's Most Advanced Hospital | Trinay Hospital Teaser" },
    { id: "pV5SlJPgKSY", title: "Honest Patient Review of Trinay Hospital" },
    { id: "mbn1vMJGx5Y", title: "Jodhpur's Trusted Hospital — Modern Facilities & Expert Doctors" },
    { id: "3SljWY3-sWA", title: "Neurosurgery: Head Injuries, Paralysis & Spine Health" },
];

const PHOTOS = [
    { id: 1,  title: "Trinay Hospital Facilities",        tag: "Facilities", src: "/IMAGES/1.jpeg" },
    { id: 2,  title: "Advanced Medical Infrastructure",   tag: "Facilities", src: "/IMAGES/2.jpeg" },
    { id: 3,  title: "Patient Care Services",             tag: "Services",   src: "/IMAGES/3.jpeg" },
    { id: 4,  title: "Diagnostic Centre",                 tag: "Services",   src: "/IMAGES/4.jpeg" },
    { id: 5,  title: "Expert Medical Team",               tag: "Team",       src: "/IMAGES/5.jpeg" },
    { id: 6,  title: "Hospital Interior",                 tag: "Facilities", src: "/IMAGES/6.jpeg" },
    { id: 7,  title: "Emergency & Trauma Support",        tag: "Emergency",  src: "/IMAGES/7.jpeg" },
    { id: 8,  title: "ICU & Critical Care Unit",          tag: "Facilities", src: "/IMAGES/8.jpeg" },
    { id: 9,  title: "Patient Recovery Ward",             tag: "Facilities", src: "/IMAGES/9.jpeg" },
    { id: 10, title: "Specialist Consultation Room",      tag: "Services",   src: "/IMAGES/10.jpeg" },
    { id: 11, title: "Advanced Healthcare Wing",          tag: "Facilities", src: "/IMAGES/11.jpeg" },
    { id: 12, title: "Dedicated Care Team",               tag: "Team",       src: "/IMAGES/12.jpeg" },
    { id: 13, title: "Hospital Campus",                   tag: "Building",   src: "/IMAGES/81.jpeg" },
    { id: 14, title: "World-Class Medical Facilities",    tag: "Facilities", src: "/IMAGES/86.jpeg" },
    { id: 15, title: "Compassionate Patient Care",        tag: "Services",   src: "/IMAGES/88.jpeg" },
    { id: 16, title: "Modern Treatment Centre",           tag: "Facilities", src: "/IMAGES/89.jpeg" },
    { id: 17, title: "Trinay Hospital — Campus View",     tag: "Building",   src: "/IMAGES/CCCC2x.jpg.jpeg" },
    { id: 18, title: "State-of-the-Art Medical Campus",   tag: "Building",   src: "/IMAGES/_DSC82422x.jpg.jpeg" },
    { id: 19, title: "Medical Professionals at Work",     tag: "Team",       src: "/IMAGES/_DSC82432x.jpg.jpeg" },
    { id: 20, title: "Trinay Hospital Infrastructure",    tag: "Building",   src: "/IMAGES/_DSC82612x.jpg.jpeg" },
    { id: 21, title: "Healing Environment",               tag: "Facilities", src: "/IMAGES/_DSC82642x.jpg.jpeg" },
    { id: 22, title: "Trinay Hospital Tour",              tag: "Tour",       src: ab1  },
    { id: 23, title: "Hospital Tour",                     tag: "Tour",       src: ab2  },
    { id: 24, title: "Our Facility",                      tag: "Facilities", src: ab3  },
    { id: 25, title: "Medical Services",                  tag: "Services",   src: ab4  },
    { id: 26, title: "Healthcare Excellence",             tag: "Services",   src: ab5  },
    { id: 27, title: "Advanced Care",                     tag: "Tour",       src: ab7  },
    { id: 28, title: "Expert Team",                       tag: "Team",       src: ab8  },
    { id: 29, title: "Patient Care",                      tag: "Services",   src: ab9  },
    { id: 30, title: "Hospital Wing",                     tag: "Facilities", src: ab10 },
    { id: 31, title: "Modern Infrastructure",             tag: "Building",   src: ab11 },
    { id: 32, title: "Specialist Care",                   tag: "Services",   src: ab12 },
    { id: 33, title: "Medical Team",                      tag: "Team",       src: ab13 },
    { id: 34, title: "Treatment Facility",                tag: "Facilities", src: ab14 },
    { id: 35, title: "Diagnostic Services",               tag: "Services",   src: ab15 },
    { id: 36, title: "Recovery Ward",                     tag: "Facilities", src: ab16 },
    { id: 37, title: "Emergency Care Unit",               tag: "Emergency",  src: ab17 },
    { id: 38, title: "Consultation Room",                 tag: "Services",   src: ab18 },
    { id: 39, title: "Hospital Corridor",                 tag: "Building",   src: ab19 },
    { id: 40, title: "Medical Equipment",                 tag: "Facilities", src: ab20 },
    { id: 41, title: "Healthcare Hub",                    tag: "Tour",       src: ab21 },
    { id: 42, title: "Trinay Campus",                     tag: "Building",   src: ab22 },
    { id: 43, title: "Bed & Room Facilities",             tag: "Facilities", src: imgBed      },
    { id: 44, title: "Critical Care ICU",                 tag: "Emergency",  src: imgCritical },
];

const TAGS = ["All", ...Array.from(new Set(PHOTOS.map(p => p.tag))).sort()];

/* ── animations ─────────────────────────────────────────────────────────── */
const cardAnim = {
    hidden:  { opacity: 0, y: 24, scale: 0.97 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { delay: i * 0.04, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* ── PhotoCard ───────────────────────────────────────────────────────────── */
const PhotoCard = ({ photo, index, onClick }) => (
    <motion.button
        type="button"
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={cardAnim}
        onClick={onClick}
        className="group relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
    >
        <img
            src={photo.src}
            alt={photo.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-[1.07] transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
            <span className="inline-flex items-center gap-1 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest mb-1">
                <ZoomIn size={11} /> View
            </span>
            <p className="text-white font-semibold text-xs sm:text-sm leading-snug line-clamp-1">{photo.title}</p>
        </div>
        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest bg-black/30 backdrop-blur-md text-white rounded-full border border-white/15">
            {photo.tag}
        </span>
    </motion.button>
);

/* ── YtCard ──────────────────────────────────────────────────────────────── */
const YtCard = ({ video, index }) => {
    const [playing, setPlaying] = useState(false);
    return (
        <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={cardAnim}
            className="rounded-xl sm:rounded-2xl overflow-hidden bg-slate-800/80 border border-white/8 group"
        >
            <div className="aspect-video relative bg-slate-900">
                {playing ? (
                    <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    />
                ) : (
                    <button
                        onClick={() => setPlaying(true)}
                        className="w-full h-full flex items-center justify-center relative overflow-hidden"
                        aria-label={`Play ${video.title}`}
                    >
                        <img
                            src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                            alt={video.title}
                            loading="lazy"
                            decoding="async"
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-300" />
                        <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 group-hover:bg-red-500 flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110">
                            <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6 sm:w-7 sm:h-7 ml-1"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                    </button>
                )}
            </div>
            <div className="p-3 sm:p-4 flex items-start justify-between gap-2">
                <div className="min-w-0">
                    <p className="text-white font-bold text-xs sm:text-sm leading-snug line-clamp-2">{video.title}</p>
                    <p className="text-slate-400 text-[11px] sm:text-xs mt-1">Trinay Hospital · Jodhpur</p>
                </div>
                <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 mt-0.5 text-red-500 hover:text-red-400 transition-colors"
                    aria-label="Open on YouTube"
                    onClick={e => e.stopPropagation()}
                >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                </a>
            </div>
        </motion.div>
    );
};

/* ── Lightbox ────────────────────────────────────────────────────────────── */
const Lightbox = ({ photos, index, onClose, direction, setIndex, setDirection }) => {
    const photo = photos[index];
    const thumbsRef = useRef(null);

    const prev = useCallback(() => {
        setDirection(-1);
        setIndex((i) => (i - 1 + photos.length) % photos.length);
    }, [photos.length, setIndex, setDirection]);

    const next = useCallback(() => {
        setDirection(1);
        setIndex((i) => (i + 1) % photos.length);
    }, [photos.length, setIndex, setDirection]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [onClose, prev, next]);

    useEffect(() => {
        thumbsRef.current?.children[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }, [index]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-black/97 backdrop-blur-sm flex flex-col"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
        >
            {/* Top bar */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 shrink-0" onClick={e => e.stopPropagation()}>
                <span className="text-white/50 text-xs sm:text-sm font-mono">{index + 1} / {photos.length}</span>
                <span className="text-white font-bold text-xs sm:text-sm truncate max-w-[55vw] text-center">{photo.title}</span>
                <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors shrink-0">
                    <X size={18} />
                </button>
            </div>

            {/* Image */}
            <div className="flex-1 flex items-center justify-center relative px-12 sm:px-16 min-h-0" onClick={e => e.stopPropagation()}>
                <button onClick={prev} className="absolute left-2 sm:left-4 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110">
                    <ChevronLeft size={20} />
                </button>

                <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.img
                        key={photo.id}
                        src={photo.src}
                        alt={photo.title}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -direction * 60 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="max-h-[calc(100vh-190px)] max-w-full object-contain rounded-xl shadow-2xl"
                    />
                </AnimatePresence>

                <button onClick={next} className="absolute right-2 sm:right-4 z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110">
                    <ChevronRight size={20} />
                </button>
            </div>

            {/* Thumbnails */}
            <div className="shrink-0 pb-4 pt-3 px-4" onClick={e => e.stopPropagation()}>
                <div ref={thumbsRef} className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                    {photos.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                            className={`shrink-0 w-12 h-9 sm:w-14 sm:h-10 rounded-lg overflow-hidden border-2 transition-all ${i === index ? "border-cyan-400 scale-110" : "border-transparent opacity-40 hover:opacity-75"}`}
                        >
                            <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

/* ── Page ────────────────────────────────────────────────────────────────── */
const Gallery = () => {
    const [tab, setTab]               = useState("photos");
    const [activeTag, setActiveTag]   = useState("All");
    const [lightboxIdx, setLightboxIdx] = useState(null);
    const [direction, setDirection]   = useState(1);

    const filtered = activeTag === "All" ? PHOTOS : PHOTOS.filter(p => p.tag === activeTag);

    const openPhoto = useCallback((idx) => {
        setDirection(1);
        setLightboxIdx(idx);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 font-sans">
            <Navbar />

            {/* ── HERO ── */}
            <section className="relative pt-32 sm:pt-36 md:pt-44 pb-14 md:pb-24 overflow-hidden"
                style={{ background: "linear-gradient(135deg,#001f4d 0%,#003366 55%,#1e40af 100%)" }}>
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[130px] pointer-events-none"
                    style={{ background: "rgba(96,165,250,0.18)" }} />

                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5">
                        <Camera size={13} /> Trinay Hospital — Visual Tour
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.55 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-4 leading-tight tracking-tight">
                        Our{" "}
                        <span style={{ background: "linear-gradient(to right,#67e8f9,#93c5fd)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                            Gallery
                        </span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.55 }}
                        className="text-blue-100/85 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-7">
                        Explore our world-class facilities, expert medical team, and the healing environment of Trinay Hospital.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28, duration: 0.5 }}
                        className="flex flex-wrap justify-center gap-3">
                        {[
                            { icon: <Camera size={15} />, label: `${PHOTOS.length} Photos` },
                            { icon: <Film size={15} />,   label: `${YT_VIDEOS.length} YouTube Videos` },
                        ].map(({ icon, label }) => (
                            <div key={label} className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full text-white text-sm font-bold">
                                {icon} {label}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── TABS ── */}
            <div className="bg-slate-900 border-b border-white/5 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-2 py-2.5">
                    {[
                        { id: "photos", label: "Photos",    icon: <Camera size={14} /> },
                        { id: "videos", label: "Videos",    icon: <Film size={14} /> },
                    ].map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)}
                            className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                                tab === t.id ? "bg-[#003366] text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}>
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── PHOTOS TAB ── */}
            {tab === "photos" && (
                <section className="py-10 sm:py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6">
                        {/* Tag filters — scrollable on mobile */}
                        <div className="flex gap-2 mb-7 overflow-x-auto pb-1" style={{ scrollbarWidth: "none" }}>
                            {TAGS.map(tag => (
                                <button key={tag} onClick={() => setActiveTag(tag)}
                                    className={`shrink-0 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-xs font-bold transition-all ${
                                        activeTag === tag ? "bg-[#003366] text-white shadow-md" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    }`}>
                                    {tag}
                                </button>
                            ))}
                            <span className="ml-auto shrink-0 text-slate-500 text-xs font-semibold self-center whitespace-nowrap">
                                {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        {/* Grid — 2 cols mobile, 3 sm, 4 lg */}
                        <motion.div
                            key={activeTag}
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}
                        >
                            <AnimatePresence>
                                {filtered.map((photo, i) => (
                                    <PhotoCard
                                        key={photo.id}
                                        photo={photo}
                                        index={i}
                                        onClick={() => openPhoto(PHOTOS.findIndex(p => p.id === photo.id))}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* ── VIDEOS TAB ── */}
            {tab === "videos" && (
                <section className="py-10 sm:py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12 sm:space-y-16">

                        {/* YouTube Videos */}
                        <div>
                            <div className="flex items-center justify-between mb-5 sm:mb-6">
                                <h3 className="text-white font-black text-base sm:text-lg flex items-center gap-2.5">
                                    <svg viewBox="0 0 24 24" fill="#ef4444" className="w-5 h-5 shrink-0">
                                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                    </svg>
                                    YouTube Videos
                                </h3>
                                <a href={YT_CHANNEL} target="_blank" rel="noreferrer"
                                    className="text-xs font-bold text-red-400 hover:text-red-300 border border-red-500/30 hover:border-red-400/50 px-3 py-1.5 rounded-full transition-all shrink-0">
                                    Subscribe →
                                </a>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                                {YT_VIDEOS.map((v, i) => <YtCard key={v.id} video={v} index={i} />)}
                            </div>
                        </div>

                        {/* Instagram Reels */}
                        <div>
                            <h3 className="text-white font-black text-base sm:text-lg mb-5 flex items-center gap-2.5">
                                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="url(#ig-g)">
                                    <defs>
                                        <linearGradient id="ig-g" x1="0%" y1="100%" x2="100%" y2="0%">
                                            <stop offset="0%"   stopColor="#f09433"/>
                                            <stop offset="50%"  stopColor="#dc2743"/>
                                            <stop offset="100%" stopColor="#bc1888"/>
                                        </linearGradient>
                                    </defs>
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                                Instagram Reels
                            </h3>
                            <div className="rounded-2xl border border-white/10 overflow-hidden"
                                style={{ background: "linear-gradient(135deg,rgba(131,58,180,0.18) 0%,rgba(253,29,29,0.13) 50%,rgba(252,176,69,0.13) 100%)" }}>
                                <div className="p-6 sm:p-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
                                    <div className="flex-1 text-center sm:text-left">
                                        <p className="text-white font-black text-xl sm:text-2xl mb-2">@trinayhospital</p>
                                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                                            Watch health tips, doctor introductions, patient success stories, and hospital updates on our Instagram Reels.
                                        </p>
                                    </div>
                                    <a href={IG_REELS} target="_blank" rel="noreferrer"
                                        className="shrink-0 inline-flex items-center gap-2.5 text-white font-black px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-sm hover:opacity-90 active:scale-95 transition-all shadow-xl"
                                        style={{ background: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)" }}>
                                        Watch Reels
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
            )}

            {/* ── LIGHTBOX ── */}
            <AnimatePresence>
                {lightboxIdx !== null && (
                    <Lightbox
                        photos={PHOTOS}
                        index={lightboxIdx}
                        onClose={() => setLightboxIdx(null)}
                        direction={direction}
                        setIndex={setLightboxIdx}
                        setDirection={setDirection}
                    />
                )}
            </AnimatePresence>

            <Footer />
        </div>
    );
};

export default Gallery;
