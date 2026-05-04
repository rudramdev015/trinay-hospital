import { motion } from "framer-motion";
import { Phone, CalendarCheck, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const INFO_CARDS = [
    {
        Icon: Phone,
        label: "24/7 Emergency",
        value: "+91 91191 91622",
        href: "tel:+919119191622",
        bg: "bg-rose-500/15 border-rose-400/30",
        color: "text-rose-300",
    },
    {
        Icon: MapPin,
        label: "Our Location",
        value: "Opp. Chopasni Garden, PF Office Road, Jodhpur",
        href: "https://maps.google.com",
        bg: "bg-cyan-500/15 border-cyan-400/30",
        color: "text-cyan-300",
    },
    {
        Icon: Clock,
        label: "OPD Hours",
        value: "Mon – Sat: 9:00 AM – 8:00 PM",
        href: null,
        bg: "bg-amber-500/15 border-amber-400/30",
        color: "text-amber-300",
    },
];

const CallToAction = () => (
    <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background */}
        <div className="absolute inset-0 bg-[#003366]" />
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:30px_30px]" />
        {/* Glow blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-blue-400/20 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-cyan-400/20 blur-[100px] pointer-events-none" />

        <motion.div
            className="relative max-w-7xl mx-auto px-6 lg:px-10"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Top copy */}
            <div className="text-center max-w-3xl mx-auto mb-14">
                <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-400 mb-3">
                    We Are Here For You
                </p>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                    Need Medical Help?
                    <span className="block text-cyan-400">We&apos;re Available 24/7.</span>
                </h2>
                <p className="text-slate-300 mt-5 text-lg leading-relaxed">
                    Book an appointment with our specialist doctors or call our emergency helpline for
                    immediate assistance — day or night.
                </p>

                {/* Primary action buttons */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                    <Link
                        to="/appointment"
                        className="inline-flex items-center gap-2.5 bg-white text-[#003366] hover:bg-cyan-400 hover:text-white font-black px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] active:scale-95"
                    >
                        <CalendarCheck size={20} />
                        Book Appointment
                    </Link>
                    <a
                        href="tel:+919119191622"
                        className="inline-flex items-center gap-2.5 bg-rose-500 hover:bg-rose-400 text-white font-black px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.5)] active:scale-95"
                    >
                        <Phone size={20} />
                        Call Emergency Now
                    </a>
                    <a
                        href="https://wa.me/919665151747"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white font-black px-8 py-4 rounded-full text-base transition-all duration-300 hover:scale-105 active:scale-95"
                    >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                            <path d="M20.52 3.48A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L0 24l6.31-1.65a11.87 11.87 0 0 0 5.73 1.46h.01c6.55 0 11.89-5.34 11.89-11.89a11.82 11.82 0 0 0-3.41-8.44Zm-8.48 18.33h-.01c-1.62 0-3.2-.43-4.57-1.25l-.33-.2-3.75.99 1-3.65-.22-.35a9.9 9.9 0 0 1-1.5-5.26c0-5.45 4.44-9.89 9.9-9.89a9.82 9.82 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.9 7c0 5.45-4.44 9.89-9.9 9.89Z" />
                        </svg>
                        WhatsApp Us
                    </a>
                </div>
            </div>

            {/* Info cards row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
                {INFO_CARDS.map(({ Icon, label, value, href, bg, color }) => {
                    const content = (
                        <div className={`flex items-start gap-4 rounded-2xl border ${bg} backdrop-blur-md p-5 transition-all duration-300 hover:scale-[1.02] ${href ? "cursor-pointer" : ""}`}>
                            <div className={`rounded-xl bg-white/10 p-3 ${color}`}>
                                <Icon size={22} />
                            </div>
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">{label}</p>
                                <p className={`font-bold ${color} leading-snug`}>{value}</p>
                            </div>
                        </div>
                    );
                    return href
                        ? <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{content}</a>
                        : <div key={label}>{content}</div>;
                })}
            </div>
        </motion.div>
    </section>
);

export default CallToAction;
