import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { buildApiUrl } from "../../utils/api";

const ACCREDITATIONS = [
    { src: "/DOCTOR IAMGES/NABH.png",        alt: "NABH Accredited" },
    { src: "/DOCTOR IAMGES/ESIC.png",         alt: "ESIC Empanelled" },
    { src: "/DOCTOR IAMGES/MAA JOGANA .png",  alt: "Maa Yojana Approved" },
];

const STATS = [
    { value: "30+",  label: "Specialists" },
    { value: "24/7", label: "Emergency" },
    { value: "25K+", label: "Patients" },
    { value: "20+",  label: "Years of Trust" },
];

const LOCAL_DESKTOP = "/trinay%20hospital.mp4";
const LOCAL_MOBILE  = "/hero-mobile.mp4";

const pickMedia = (items, isMobile) =>
    items.find((m) =>
        m.isActive && (m.screenType === "both" || m.screenType === (isMobile ? "mobile" : "desktop"))
    ) || null;

const BackgroundMedia = ({ media, mediaData, isMobile }) => {
    if (!media) {
        return (
            <video
                autoPlay loop muted playsInline preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ willChange: "transform" }}
            >
                <source src={isMobile ? LOCAL_MOBILE : LOCAL_DESKTOP} type="video/mp4" />
            </video>
        );
    }
    if (media.type === "image") {
        const src = mediaData?.data || null;
        if (!src) return null;
        return (
            <img
                src={src}
                alt="Hero background"
                className="absolute inset-0 w-full h-full object-cover"
            />
        );
    }
    // video type — use stored URL
    const videoSrc = media.url || "";
    if (!videoSrc) return null;
    return (
        <video
            autoPlay loop muted playsInline preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
        >
            <source src={videoSrc} type={media.mimeType || "video/mp4"} />
        </video>
    );
};

const Hero = () => {
    const [heroItems, setHeroItems] = useState([]);
    const [desktopData, setDesktopData] = useState(null);
    const [mobileData, setMobileData] = useState(null);

    useEffect(() => {
        let cancelled = false;
        fetch(buildApiUrl("/api/hero-media"))
            .then((r) => r.json())
            .then((d) => {
                if (cancelled) return;
                const items = d.heroMedia || [];
                setHeroItems(items);

                const desktop = pickMedia(items, false);
                const mobile  = pickMedia(items, true);

                if (desktop?.type === "image" && desktop?._id) {
                    fetch(buildApiUrl(`/api/hero-media/${desktop._id}/data`))
                        .then((r) => r.json())
                        .then((d2) => { if (!cancelled) setDesktopData(d2); })
                        .catch(() => {});
                }
                if (mobile && mobile._id !== desktop?._id && mobile.type === "image") {
                    fetch(buildApiUrl(`/api/hero-media/${mobile._id}/data`))
                        .then((r) => r.json())
                        .then((d2) => { if (!cancelled) setMobileData(d2); })
                        .catch(() => {});
                } else if (mobile && mobile._id === desktop?._id) {
                    setMobileData(desktopData);
                }
            })
            .catch(() => {});
        return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const desktopMedia = pickMedia(heroItems, false);
    const mobileMedia  = pickMedia(heroItems, true);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-black select-none">

            {/* MOBILE BACKGROUND */}
            <div className="md:hidden absolute inset-0 w-full h-full">
                <BackgroundMedia
                    media={mobileMedia}
                    mediaData={mobileData || desktopData}
                    isMobile
                />
            </div>

            {/* DESKTOP BACKGROUND */}
            <div className="hidden md:block absolute inset-0 w-full h-full">
                <BackgroundMedia
                    media={desktopMedia}
                    mediaData={desktopData}
                    isMobile={false}
                />
            </div>

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-linear-to-b from-black/65 via-black/25 to-black/80 pointer-events-none" />
            <div className="absolute inset-0 bg-linear-to-r from-black/55 via-transparent to-transparent pointer-events-none" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between px-6 sm:px-10 lg:px-20 pt-28 sm:pt-32 pb-8 sm:pb-10">

                {/* Top badge */}
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.2 }}
                >
                    <div className="inline-flex items-center gap-2 bg-white/10 border border-white/25 backdrop-blur-md rounded-full px-4 py-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                        <span className="text-white/90 text-xs sm:text-sm font-bold uppercase tracking-widest">
                            Jodhpur's Premier Multi-Speciality Hospital
                        </span>
                    </div>
                </motion.div>

                {/* Main text block */}
                <div className="max-w-3xl">
                    <motion.h1
                        initial={{ opacity: 0, y: 32 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.75, delay: 0.35 }}
                        className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1.05] tracking-tight"
                    >
                        Advanced Care.<br />
                        <span className="bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                            Every Life Matters.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="mt-5 text-white/72 text-sm sm:text-base lg:text-lg font-medium leading-relaxed max-w-xl"
                    >
                        30+ Senior Specialists · 24/7 Emergency &amp; ICU · NABH Accredited —
                        delivering world-class healthcare in the heart of Jodhpur since 2005.
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.62 }}
                        className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4"
                    >
                        <Link
                            to="/appointment"
                            className="inline-flex items-center gap-2.5 bg-white text-[#003366] font-black px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base shadow-2xl hover:bg-blue-50 transition-all duration-300 hover:scale-[1.03] active:scale-95"
                        >
                            <CalendarCheck size={18} />
                            Book Appointment
                        </Link>
                        <a
                            href="tel:+919119191622"
                            className="inline-flex items-center gap-2.5 bg-white/12 border border-white/30 backdrop-blur-sm text-white font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-sm sm:text-base hover:bg-white/22 transition-all duration-300"
                        >
                            <Phone size={17} className="text-orange-400" />
                            <span className="hidden xs:inline">Emergency: </span>+91 91191 91622
                        </a>
                    </motion.div>

                    {/* Stats strip */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.78 }}
                        className="mt-8 sm:mt-10 flex flex-wrap gap-6 sm:gap-10"
                    >
                        {STATS.map(({ value, label }) => (
                            <div key={label} className="flex flex-col">
                                <span className="text-2xl sm:text-3xl font-black text-white leading-none">{value}</span>
                                <span className="text-[11px] sm:text-xs text-white/50 font-bold uppercase tracking-wider mt-1">{label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Bottom accreditation logos */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.95 }}
                    className="flex flex-wrap items-center gap-3 sm:gap-4"
                >
                    <span className="hidden sm:block text-white/35 text-[10px] font-black uppercase tracking-[0.2em]">
                        Certified &amp; Empanelled
                    </span>
                    {ACCREDITATIONS.map(({ src, alt }) => (
                        <img
                            key={alt}
                            src={src}
                            alt={alt}
                            title={alt}
                            className="h-10 sm:h-12 w-auto max-w-22.5 object-contain"
                            style={{ filter: "drop-shadow(0 2px 10px rgba(255,255,255,0.55)) brightness(1.05)" }}
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
