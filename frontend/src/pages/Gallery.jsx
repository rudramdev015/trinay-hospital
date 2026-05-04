import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight, Film, X, ZoomIn } from "lucide-react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

import panelOfDoctorsVideo from "../assets/videos/panel of doctors.mp4";

/* ── data ───────────────────────────────────────────────────────────────── */
const PHOTOS = [
    { id: 1,  title: "Trinay Hospital Facilities",          tag: "Facilities",  src: "/IMAGES/1.jpeg" },
    { id: 2,  title: "Advanced Medical Infrastructure",     tag: "Facilities",  src: "/IMAGES/2.jpeg" },
    { id: 3,  title: "Patient Care Services",               tag: "Services",    src: "/IMAGES/3.jpeg" },
    { id: 4,  title: "Diagnostic Centre",                   tag: "Services",    src: "/IMAGES/4.jpeg" },
    { id: 5,  title: "Expert Medical Team",                 tag: "Team",        src: "/IMAGES/5.jpeg" },
    { id: 6,  title: "Hospital Interior",                   tag: "Facilities",  src: "/IMAGES/6.jpeg" },
    { id: 7,  title: "Emergency & Trauma Support",          tag: "Emergency",   src: "/IMAGES/7.jpeg" },
    { id: 8,  title: "ICU & Critical Care Unit",            tag: "Facilities",  src: "/IMAGES/8.jpeg" },
    { id: 9,  title: "Patient Recovery Ward",               tag: "Facilities",  src: "/IMAGES/9.jpeg" },
    { id: 10, title: "Specialist Consultation Room",        tag: "Services",    src: "/IMAGES/10.jpeg" },
    { id: 11, title: "Advanced Healthcare Wing",            tag: "Facilities",  src: "/IMAGES/11.jpeg" },
    { id: 12, title: "Dedicated Care Team",                 tag: "Team",        src: "/IMAGES/12.jpeg" },
    { id: 13, title: "Hospital Campus",                     tag: "Building",    src: "/IMAGES/81.jpeg" },
    { id: 14, title: "World-Class Medical Facilities",      tag: "Facilities",  src: "/IMAGES/86.jpeg" },
    { id: 15, title: "Compassionate Patient Care",          tag: "Services",    src: "/IMAGES/88.jpeg" },
    { id: 16, title: "Modern Treatment Centre",             tag: "Facilities",  src: "/IMAGES/89.jpeg" },
    { id: 17, title: "Trinay Hospital — Campus View",       tag: "Building",    src: "/IMAGES/CCCC2x.jpg.jpeg" },
    { id: 18, title: "State-of-the-Art Medical Campus",     tag: "Building",    src: "/IMAGES/_DSC82422x.jpg.jpeg" },
    { id: 19, title: "Medical Professionals at Work",       tag: "Team",        src: "/IMAGES/_DSC82432x.jpg.jpeg" },
    { id: 20, title: "Trinay Hospital Infrastructure",      tag: "Building",    src: "/IMAGES/_DSC82612x.jpg.jpeg" },
    { id: 21, title: "Healing Environment",                 tag: "Facilities",  src: "/IMAGES/_DSC82642x.jpg.jpeg" },
];

const VIDEOS = [
    { id: "v1", title: "Advanced Healthcare Facilities",   src: panelOfDoctorsVideo },
    { id: "v2", title: "Expert Panel of Doctors",          src: panelOfDoctorsVideo },
    { id: "v3", title: "Emergency & Critical Care",        src: panelOfDoctorsVideo },
    { id: "v4", title: "Patient Care Journey",             src: panelOfDoctorsVideo },
    { id: "v5", title: "Diagnostic Infrastructure",        src: panelOfDoctorsVideo },
    { id: "v6", title: "Community Health Programmes",      src: panelOfDoctorsVideo },
];

const TAGS = ["All", ...Array.from(new Set(PHOTOS.map(p => p.tag)))];

/* ── animation ─────────────────────────────────────────────────────────── */
const cardAnim = {
    hidden:  { opacity: 0, y: 30, scale: 0.96 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    }),
};

/* ── Photo card ─────────────────────────────────────────────────────────── */
const PhotoCard = ({ photo, index, onClick }) => (
    <motion.button
        type="button"
        custom={index}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={cardAnim}
        whileHover="hover"
        onClick={onClick}
        className="group relative rounded-2xl overflow-hidden aspect-[4/3] w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
    >
        <motion.img
            src={photo.src}
            alt={photo.title}
            loading="lazy"
            className="w-full h-full object-cover"
            variants={{ hover: { scale: 1.08 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        />
        {/* overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
            <span className="inline-flex items-center gap-1.5 text-white text-xs font-black uppercase tracking-widest mb-1.5">
                <ZoomIn size={13} /> View Full Screen
            </span>
            <p className="text-white font-bold text-sm leading-snug">{photo.title}</p>
        </div>
        {/* tag pill */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md text-white rounded-full border border-white/20">
            {photo.tag}
        </span>
    </motion.button>
);

/* ── Video card ─────────────────────────────────────────────────────────── */
const VideoCard = ({ video, index }) => {
    const ref = useRef(null);
    return (
        <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardAnim}
            className="group rounded-2xl overflow-hidden bg-slate-900 border border-white/5"
            onMouseEnter={() => ref.current?.play()}
            onMouseLeave={() => { if (ref.current) { ref.current.pause(); ref.current.currentTime = 0; } }}
        >
            <div className="aspect-video relative">
                <video
                    ref={ref}
                    src={video.src}
                    muted
                    loop
                    preload="metadata"
                    controls
                    className="w-full h-full object-cover"
                />
            </div>
            <div className="p-4">
                <p className="text-white font-bold text-sm leading-snug">{video.title}</p>
                <p className="text-slate-400 text-xs mt-1 font-medium">Trinay Hospital — Jodhpur</p>
            </div>
        </motion.div>
    );
};

/* ── Lightbox ───────────────────────────────────────────────────────────── */
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
        const el = thumbsRef.current?.children[index];
        el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }, [index]);

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-black/97 backdrop-blur-sm flex flex-col"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
        >
            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3 shrink-0" onClick={e => e.stopPropagation()}>
                <span className="text-white/60 text-sm font-mono">{index + 1} / {photos.length}</span>
                <span className="text-white font-bold text-sm truncate max-w-[60vw] text-center">{photo.title}</span>
                <button
                    onClick={onClose}
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Main image area */}
            <div className="flex-1 flex items-center justify-center relative px-4 min-h-0" onClick={e => e.stopPropagation()}>
                {/* Prev */}
                <button
                    onClick={prev}
                    className="absolute left-3 md:left-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110"
                >
                    <ChevronLeft size={22} />
                </button>

                {/* Image */}
                <AnimatePresence mode="wait" initial={false} custom={direction}>
                    <motion.img
                        key={photo.id}
                        src={photo.src}
                        alt={photo.title}
                        custom={direction}
                        initial={{ opacity: 0, x: direction * 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -direction * 80 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="max-h-[calc(100vh-200px)] max-w-full object-contain rounded-xl shadow-2xl"
                    />
                </AnimatePresence>

                {/* Next */}
                <button
                    onClick={next}
                    className="absolute right-3 md:right-6 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/10 flex items-center justify-center text-white transition-all hover:scale-110"
                >
                    <ChevronRight size={22} />
                </button>
            </div>

            {/* Thumbnail strip */}
            <div className="shrink-0 pb-4 pt-3 px-4" onClick={e => e.stopPropagation()}>
                <div ref={thumbsRef} className="flex gap-2 overflow-x-auto pb-1 justify-start md:justify-center" style={{ scrollbarWidth: "none" }}>
                    {photos.map((p, i) => (
                        <button
                            key={p.id}
                            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                            className={`shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all ${i === index ? "border-cyan-400 scale-110" : "border-transparent opacity-50 hover:opacity-80"}`}
                        >
                            <img src={p.src} alt={p.title} className="w-full h-full object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

/* ── Page ───────────────────────────────────────────────────────────────── */
const Gallery = () => {
    const [tab, setTab] = useState("photos");
    const [activeTag, setActiveTag] = useState("All");
    const [lightboxIdx, setLightboxIdx] = useState(null);
    const [direction, setDirection] = useState(1);

    const filtered = activeTag === "All" ? PHOTOS : PHOTOS.filter(p => p.tag === activeTag);

    const openPhoto = useCallback((idx) => {
        setDirection(1);
        setLightboxIdx(idx);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 font-sans">
            <Navbar />

            {/* ── HERO ── */}
            <section
                className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden"
                style={{ background: "linear-gradient(135deg,#001f4d 0%,#003366 55%,#1e40af 100%)" }}
            >
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                    style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "28px 28px" }} />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none"
                    style={{ background: "rgba(96,165,250,0.17)" }} />

                <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-200 text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
                        <Camera size={14} /> Trinay Hospital — Visual Tour
                    </motion.div>

                    <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12, duration: 0.6 }}
                        className="text-5xl md:text-7xl font-black text-white mb-5 leading-tight tracking-tight">
                        Our{" "}
                        <span style={{
                            background: "linear-gradient(to right,#67e8f9,#93c5fd)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>
                            Gallery
                        </span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.6 }}
                        className="text-blue-100/90 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
                        Explore our world-class facilities, expert medical team, and the healing environment of Trinay Hospital.
                    </motion.p>

                    {/* Stats */}
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-4">
                        {[
                            { icon: <Camera size={16} />, label: `${PHOTOS.length} Photos` },
                            { icon: <Film size={16} />,   label: `${VIDEOS.length} Videos` },
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
                <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 py-3">
                    {[
                        { id: "photos", label: "Photos", icon: <Camera size={15} /> },
                        { id: "videos", label: "Videos", icon: <Film size={15} /> },
                    ].map(t => (
                        <button key={t.id} onClick={() => setTab(t.id)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                                tab === t.id
                                    ? "bg-[#003366] text-white shadow-lg"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}>
                            {t.icon} {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── PHOTOS ── */}
            {tab === "photos" && (
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        {/* Tag filters */}
                        <div className="flex flex-wrap gap-2 mb-8">
                            {TAGS.map(tag => (
                                <button key={tag} onClick={() => setActiveTag(tag)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                        activeTag === tag
                                            ? "bg-[#003366] text-white shadow-md"
                                            : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                                    }`}>
                                    {tag}
                                </button>
                            ))}
                            <span className="ml-auto text-slate-500 text-xs font-semibold self-center">
                                {filtered.length} photo{filtered.length !== 1 ? "s" : ""}
                            </span>
                        </div>

                        {/* Grid */}
                        <motion.div
                            key={activeTag}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
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

            {/* ── VIDEOS ── */}
            {tab === "videos" && (
                <section className="py-12">
                    <div className="max-w-7xl mx-auto px-6">
                        <p className="text-slate-400 text-sm font-semibold mb-6">{VIDEOS.length} videos</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                            {VIDEOS.map((video, i) => (
                                <VideoCard key={video.id} video={video} index={i} />
                            ))}
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
