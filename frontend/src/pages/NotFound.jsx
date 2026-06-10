import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, CalendarCheck, Stethoscope, Phone, ArrowRight, HeartPulse } from "lucide-react";

const NAV_LINKS = [
    { to: "/",            label: "Back to Home",       Icon: Home,          primary: true  },
    { to: "/appointment", label: "Book Appointment",   Icon: CalendarCheck, primary: false },
    { to: "/doctors",     label: "Our Doctors",        Icon: Stethoscope,   primary: false },
    { to: "/services",    label: "All Services",       Icon: ArrowRight,    primary: false },
];

const PULSES = [
    { top: "12%", left: "8%",  size: 56,  delay: 0    },
    { top: "70%", left: "5%",  size: 40,  delay: 0.6  },
    { top: "25%", right: "6%", size: 64,  delay: 0.3  },
    { top: "75%", right: "9%", size: 44,  delay: 0.9  },
    { top: "50%", left: "50%", size: 200, delay: 0.2  },
];

const HeartbeatLine = () => {
    const points =
        "0,50 40,50 55,50 65,10 80,90 95,50 110,50 125,50 140,50 155,20 165,80 175,50 200,50 240,50";
    return (
        <svg viewBox="0 0 240 100" className="w-full h-full" fill="none">
            <motion.polyline
                points={points}
                stroke="url(#hbGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.8 }}
            />
            <defs>
                <linearGradient id="hbGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0" />
                    <stop offset="40%"  stopColor="#22d3ee" />
                    <stop offset="60%"  stopColor="#818cf8" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                </linearGradient>
            </defs>
        </svg>
    );
};

const NotFound = () => {
    useEffect(() => { document.title = "404 — Page Not Found | Trinay Hospital"; }, []);

    return (
        <div className="relative min-h-screen overflow-hidden select-none flex flex-col"
            style={{ background: "linear-gradient(145deg,#020d2e 0%,#041AA9 45%,#060c24 100%)" }}>

            {/* Dot grid */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "30px 30px" }} />

            {/* Floating orbs */}
            {PULSES.map(({ top, left, right, size, delay }) => (
                <motion.div
                    key={`${top}${left ?? right}`}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                        top, left, right,
                        width: size, height: size,
                        background: "radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)",
                    }}
                    animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.9, 0.4] }}
                    transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}

            {/* Top nav bar */}
            <header className="relative z-10 px-6 py-5 flex items-center justify-between max-w-7xl mx-auto w-full">
                <Link to="/" className="flex items-center gap-2.5 group">
                    <div className="w-9 h-9 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center group-hover:bg-white/25 transition-colors">
                        <HeartPulse size={18} className="text-cyan-400" />
                    </div>
                    <span className="text-white font-black text-base tracking-tight hidden sm:block">Trinay Hospital</span>
                </Link>
                <a
                    href="tel:+919119191622"
                    className="flex items-center gap-2 bg-white/10 border border-white/20 text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-white/20 transition-all"
                >
                    <Phone size={14} className="text-cyan-400" />
                    <span className="hidden xs:inline">Emergency: </span>+91 91191 91622
                </a>
            </header>

            {/* Main content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-10 text-center">

                {/* 404 number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="relative mb-2"
                >
                    <span
                        className="text-[clamp(7rem,25vw,14rem)] font-black leading-none tabular-nums"
                        style={{
                            background: "linear-gradient(135deg,#67e8f9 0%,#818cf8 50%,#38bdf8 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            filter: "drop-shadow(0 0 60px rgba(56,189,248,0.35))",
                        }}
                    >
                        404
                    </span>
                    {/* Glow behind number */}
                    <div className="absolute inset-0 -z-10 blur-[80px] opacity-30"
                        style={{ background: "radial-gradient(ellipse,#38bdf8,#818cf8,transparent)" }} />
                </motion.div>

                {/* Heartbeat line */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="w-64 sm:w-80 h-12 mb-8"
                >
                    <HeartbeatLine />
                </motion.div>

                {/* Badge */}
                <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-cyan-300 text-[11px] font-black uppercase tracking-[0.25em] px-5 py-2 rounded-full mb-5"
                >
                    <HeartPulse size={12} /> Page Not Found
                </motion.span>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.5 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-2xl mb-4"
                >
                    Oops! This page seems to have{" "}
                    <span style={{ background: "linear-gradient(90deg,#67e8f9,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                        taken a wrong turn.
                    </span>
                </motion.h1>

                {/* Sub text */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-blue-200/60 text-base sm:text-lg max-w-md mb-10 leading-relaxed"
                >
                    The page you're looking for doesn't exist or may have been moved.
                    Don't worry — our team is available 24/7 for emergencies.
                </motion.p>

                {/* CTA buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.72 }}
                    className="flex flex-wrap items-center justify-center gap-3"
                >
                    {NAV_LINKS.map(({ to, label, Icon, primary }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-black text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg ${
                                primary
                                    ? "bg-white text-[#003366] hover:bg-cyan-100 shadow-white/20"
                                    : "bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                            }`}
                        >
                            <Icon size={16} />
                            {label}
                        </Link>
                    ))}
                </motion.div>

                {/* Quick info strip */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="mt-14 grid grid-cols-3 gap-6 sm:gap-12 text-center"
                >
                    {[
                        { value: "24/7", label: "Emergency" },
                        { value: "24+",  label: "Specialists" },
                        { value: "17",   label: "Departments" },
                    ].map(({ value, label }) => (
                        <div key={label} className="flex flex-col items-center gap-1">
                            <span className="text-2xl sm:text-3xl font-black text-white leading-none">{value}</span>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-white/35">{label}</span>
                        </div>
                    ))}
                </motion.div>
            </main>

            {/* Bottom divider line */}
            <div className="relative z-10 h-px mx-6 mb-6"
                style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)" }} />

            {/* Footer strip */}
            <footer className="relative z-10 text-center pb-8 px-6">
                <p className="text-white/25 text-xs font-semibold">
                    © {new Date().getFullYear()} Trinay Hospital, Jodhpur · Care With Compassion
                </p>
            </footer>
        </div>
    );
};

export default NotFound;
