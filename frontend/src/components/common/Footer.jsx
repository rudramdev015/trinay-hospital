import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
    Clock, Mail, MapPin, Phone, 
    Facebook, Instagram, Youtube, Twitter, Linkedin, ChevronRight, ArrowUp
} from "lucide-react";

// --- Animation Variants ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1, y: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    }
};

const Footer = () => {
    // Smooth scroll to top function
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative overflow-hidden bg-[#020817] text-slate-300 font-sans border-t border-blue-900/30">
            {/* --- Advanced Background Glow Effects --- */}
            <div className="absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] translate-x-1/2 translate-y-1/3 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"></div>
            
            {/* Subtle grid overlay for texture */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>

            <div className="relative mx-auto max-w-[1600px] px-6 py-20 lg:px-12">
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] xl:gap-16"
                >
                    
                    {/* --- Column 1: Brand & Socials --- */}
                    <motion.div variants={itemVariants} className="flex flex-col">
                        <Link to="/" className="group inline-flex items-center gap-2">
                            <h2 className="text-3xl font-black tracking-tighter text-white transition-transform duration-500 group-hover:scale-[1.02]">
                                TRINAY <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-light">HOSPITAL</span>
                            </h2>
                        </Link>
                        <p className="mt-6 text-[15px] leading-relaxed text-slate-400 max-w-sm">
                            A leading 100-bedded NABH-accredited multi-speciality hospital in Jodhpur. 
                            Delivering world-class healthcare, 24/7 emergency support, and patient-centric 
                            medical excellence with cutting-edge technology.
                        </p>
                        
                        {/* Premium Social Media Icons */}
                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <SocialIcon href="https://www.facebook.com/profile.php?id=61568442437621" icon={<Facebook className="h-5 w-5" />} hoverColor="hover:bg-[#1877F2] hover:shadow-[0_0_20px_rgba(24,119,242,0.5)]" name="Facebook" />
                            <SocialIcon href="https://www.instagram.com/trinayhospital/" icon={<Instagram className="h-5 w-5" />} hoverColor="hover:bg-[#E4405F] hover:shadow-[0_0_20px_rgba(228,64,95,0.5)]" name="Instagram" />
                            <SocialIcon href="https://x.com/trinayhospital" icon={<Twitter className="h-5 w-5" />} hoverColor="hover:bg-[#1DA1F2] hover:shadow-[0_0_20px_rgba(29,161,242,0.5)]" name="Twitter" />
                            <SocialIcon href="https://www.linkedin.com/company/trinayhospital" icon={<Linkedin className="h-5 w-5" />} hoverColor="hover:bg-[#0A66C2] hover:shadow-[0_0_20px_rgba(10,102,194,0.5)]" name="LinkedIn" />
                            {/* Updated YouTube Link */}
                            <SocialIcon href="https://youtu.be/P-AOXKlNIzI?si=PFeUDcaprdAwQr7O" icon={<Youtube className="h-5 w-5" />} hoverColor="hover:bg-[#FF0000] hover:shadow-[0_0_20px_rgba(255,0,0,0.5)]" name="YouTube" />
                        </div>
                    </motion.div>

                    {/* --- Column 2: Quick Links --- */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-3">
                            <span className="h-px w-6 bg-cyan-500 rounded-full"></span>
                            Quick Links
                        </h3>
                        <nav aria-label="Footer Quick Links" className="mt-8">
                            <ul className="space-y-4">
                                <FooterLink to="/">Home</FooterLink>
                                <FooterLink to="/about">About Trinay</FooterLink>
                                <FooterLink to="/services">Medical Departments</FooterLink>
                                <FooterLink to="/doctors">Our Specialists</FooterLink>
                                <FooterLink to="/gallery">Hospital Gallery</FooterLink>
                                <FooterLink to="/appointment" highlight>Book Appointment</FooterLink>
                            </ul>
                        </nav>
                    </motion.div>

                    {/* --- Column 3: Patient Care --- */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-3">
                            <span className="h-px w-6 bg-blue-500 rounded-full"></span>
                            Patient Care
                        </h3>
                        <nav aria-label="Footer Patient Care Links" className="mt-8">
                            <ul className="space-y-4">
                                <FooterLink to="/insurance">Insurance & TPA</FooterLink>
                                <FooterLink to="/insurance">Govt. Schemes (RGHS)</FooterLink>
                                <FooterLink to="/contact">Contact & Feedback</FooterLink>
                                <FooterLink to="/careers">Careers</FooterLink>
                                <FooterLink to="/privacy">Privacy Policy</FooterLink>
                                <FooterLink to="/terms">Terms of Service</FooterLink>
                                <FooterLink to="/faq">FAQs</FooterLink>
                            </ul>
                        </nav>
                    </motion.div>

                    {/* --- Column 4: Contact Glassmorphism Cards --- */}
                    <motion.div variants={itemVariants}>
                        <h3 className="text-lg font-bold text-white tracking-wide flex items-center gap-3 mb-8">
                            <span className="h-px w-6 bg-indigo-500 rounded-full"></span>
                            Contact Us
                        </h3>
                        <address className="space-y-4 not-italic">
                            {/* Location Card */}
                            <div className="group flex items-start gap-4 rounded-2xl bg-white/3 border border-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/6 hover:border-cyan-500/30 hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.2)]">
                                <div className="mt-1 rounded-full bg-blue-500/20 p-2.5 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors duration-300">
                                    <MapPin className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <span className="text-[14px] leading-relaxed text-slate-300 group-hover:text-white transition-colors">
                                    Opposite Chopasni Garden,<br />
                                    PF Office Road, Jodhpur,<br />
                                    Rajasthan 342008
                                </span>
                            </div>

                            {/* Phone Card */}
                            <div className="group flex items-center gap-4 rounded-2xl bg-white/3 border border-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/6 hover:border-blue-500/30 hover:shadow-[0_10px_30px_-15px_rgba(59,130,246,0.2)]">
                                <div className="rounded-full bg-blue-500/20 p-2.5 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
                                    <Phone className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <div className="flex flex-col">
                                    <a href="tel:+919119191622" className="text-[15px] font-semibold text-slate-300 transition-colors hover:text-cyan-400">+91 91191 91622</a>
                                    <span className="text-[12px] text-slate-500 font-medium">24/7 Emergency Help</span>
                                </div>
                            </div>

                            {/* Email Card */}
                            <div className="group flex items-center gap-4 rounded-2xl bg-white/3 border border-white/5 p-4 backdrop-blur-md transition-all duration-300 hover:bg-white/6 hover:border-indigo-500/30 hover:shadow-[0_10px_30px_-15px_rgba(99,102,241,0.2)]">
                                <div className="rounded-full bg-indigo-500/20 p-2.5 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors duration-300">
                                    <Mail className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <a href="mailto:info@trinay.in" className="text-[15px] font-medium text-slate-300 transition-colors hover:text-indigo-400">
                                    info@trinay.in
                                </a>
                            </div>
                        </address>
                    </motion.div>
                </motion.div>

                {/* --- Bottom Copyright Bar --- */}
                <motion.div 
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="relative mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 text-[14px] text-slate-400 md:flex-row"
                >
                    <p className="font-medium text-center md:text-left tracking-wide">
                        © {new Date().getFullYear()} <span className="text-white">Trinay Hospital Pvt. Ltd.</span> All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 font-medium">
                        <Link to="/privacy" className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-cyan-500 after:transition-all after:duration-300 hover:text-white hover:after:w-full">Privacy</Link>
                        <span className="text-white/20">|</span>
                        <Link to="/terms" className="relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:text-white hover:after:w-full">Terms of Service</Link>
                    </div>

                    {/* Animated Scroll to Top Button */}
                    <button 
                        onClick={scrollToTop}
                        aria-label="Scroll to top"
                        className="absolute -top-5 right-0 md:static md:ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-300 hover:-translate-y-2 hover:bg-cyan-500 hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]"
                    >
                        <ArrowUp className="h-5 w-5" />
                    </button>
                </motion.div>
            </div>
        </footer>
    );
};

// --- Reusable Sub-components for cleaner code ---

const SocialIcon = ({ href, icon, hoverColor, name }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        aria-label={`Visit Trinay Hospital ${name}`}
        className={`group relative flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-slate-300 backdrop-blur-md transition-all duration-300 ${hoverColor} hover:text-white hover:-translate-y-1.5`}
    >
        {icon}
    </a>
);

const FooterLink = ({ to, children, highlight }) => (
    <li>
        <Link 
            to={to} 
            className={`group flex items-center text-[15px] font-medium transition-all duration-300 ${highlight ? "text-cyan-400 font-bold" : "text-slate-400"}`}
        >
            <ChevronRight className={`h-4 w-4 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 mr-1 ${highlight ? "text-cyan-400" : "text-blue-400"}`} />
            <span className={`transition-all duration-300 group-hover:translate-x-1 ${highlight ? "group-hover:text-cyan-300" : "group-hover:text-white"}`}>
                {children}
            </span>
        </Link>
    </li>
);

export default Footer;