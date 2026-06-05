import { useState } from "react";
import { buildApiUrl } from "../utils/api";
import { motion } from "framer-motion";
import { 
    Clock, FileText, Mail, MapPin, MessageSquare, 
    Phone, Send, User, ShieldAlert, PlayCircle 
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

// --- Advanced Framer Motion Variants ---
const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
};

const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, y: 0, 
        transition: { type: "spring", stiffness: 80, damping: 15 } 
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
        opacity: 1, scale: 1, 
        transition: { type: "spring", stiffness: 100, damping: 20 } 
    }
};

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "", email: "", phone: "", subject: "", message: "",
    });
    const [feedbackStatus, setFeedbackStatus] = useState({ type: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Ultra-premium input styling
    const inputClasses = "w-full rounded-2xl border border-slate-200/60 bg-white/60 px-5 py-4 pl-12 text-[15px] text-slate-800 placeholder:text-slate-400 outline-none backdrop-blur-md transition-all duration-300 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10 hover:border-blue-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]";
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setFeedbackStatus({ type: "", message: "" });

        try {
            const response = await fetch(buildApiUrl("/api/feedback"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            let data = {};
            try { data = await response.json(); } catch { data = {}; }

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Unable to submit feedback");
            }

            setFeedbackStatus({
                type: "success",
                message: "Thank you! Your message has been sent successfully to the Trinay team.",
            });
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        } catch (error) {
            setFeedbackStatus({
                type: "error",
                message: error.message || "Unable to submit right now. Please call us directly.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F1F5F9] font-sans selection:bg-cyan-500 selection:text-white relative overflow-hidden">
            
            {/* Ambient Background Mesh Gradients */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-400/10 blur-[120px]"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-cyan-400/10 blur-[100px]"></div>
            </div>

            <Navbar />

            {/* --- HERO SECTION --- */}
            <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#001a33] to-[#003366] z-10 rounded-b-[40px] lg:rounded-b-[80px] shadow-2xl shadow-blue-900/20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>
                
                <div className="relative max-w-[1600px] mx-auto px-6 lg:px-12 text-center">
                    <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
                        <motion.span variants={fadeUp} className="inline-block py-1.5 px-4 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300 text-xs md:text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
                            Always At Your Service
                        </motion.span>
                        <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                            Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Trinay</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="mt-6 max-w-2xl mx-auto text-base md:text-lg text-blue-100/80 leading-relaxed font-medium">
                            Whether you need an appointment, have a query, or require critical emergency assistance, our expert medical team is on standby 24/7.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* --- MAIN CONTACT GRID --- */}
            <section className="py-12 lg:py-20 relative z-20 -mt-12 lg:-mt-20">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.3fr] gap-8 lg:gap-12">
                        
                        {/* LEFT COLUMN: Contact Cards */}
                        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} className="flex flex-col gap-6">
                            
                            {/* Emergency Card (Pulsing Red) */}
                            <motion.div variants={scaleIn} className="group relative overflow-hidden bg-gradient-to-br from-red-600 to-[#990000] rounded-[32px] p-8 shadow-2xl shadow-red-600/30 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-red-600/40 border border-red-500/50">
                                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                                            <ShieldAlert className="w-8 h-8 text-white animate-pulse" />
                                        </div>
                                        <h3 className="text-2xl font-black tracking-wide">Emergency</h3>
                                    </div>
                                    <p className="text-red-100 mb-8 text-[15px] leading-relaxed font-medium">
                                        Our trauma and emergency center is fully equipped and open 24 hours a day, 7 days a week for immediate medical intervention.
                                    </p>
                                    <a href="tel:+919119191622" className="inline-flex items-center justify-center gap-3 w-full bg-white text-red-700 font-black tracking-wide py-4 rounded-xl hover:bg-red-50 transition-all duration-300 shadow-xl active:scale-95 group-hover:shadow-white/20 text-lg">
                                        <Phone className="w-6 h-6 fill-red-700" /> +91 91191 91622
                                    </a>
                                </div>
                            </motion.div>

                            {/* Location Card */}
                            <motion.div variants={fadeUp} className="group bg-white/80 backdrop-blur-xl rounded-[32px] p-8 border border-white shadow-xl shadow-slate-200/50 hover:border-cyan-300 hover:bg-white transition-all duration-500">
                                <div className="flex items-start gap-5">
                                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-600 p-4 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shadow-inner">
                                        <MapPin className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-slate-800 mb-3">Hospital Location</h4>
                                        <p className="text-slate-600 leading-relaxed text-[16px] font-medium">
                                            Opposite Chopasni Garden,<br/>
                                            PF Office Road, Jodhpur,<br/>
                                            Rajasthan 342008
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Timings & Email Grid */}
                            <div className="grid sm:grid-cols-2 gap-6">
                                <motion.div variants={fadeUp} className="group bg-white/80 backdrop-blur-xl rounded-[32px] p-7 border border-white shadow-xl shadow-slate-200/50 hover:border-blue-300 hover:bg-white transition-all duration-500">
                                    <div className="bg-cyan-50 text-cyan-600 p-3.5 rounded-2xl w-fit mb-5 group-hover:bg-cyan-500 group-hover:text-white transition-colors shadow-inner">
                                        <Clock className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-lg mb-2">OPD Timings</h4>
                                    <p className="text-slate-600 text-[15px] font-medium">Mon-Sat: 9:00 AM – 5:00 PM</p>
                                    <p className="text-slate-600 text-[15px] font-medium mt-1">Sunday: 9:00 AM – 2:00 PM</p>
                                    <p className="text-cyan-600 text-[14px] font-bold mt-2">📞 On Call OPD: Available 24/7</p>
                                </motion.div>

                                <motion.div variants={fadeUp} className="group bg-white/80 backdrop-blur-xl rounded-[32px] p-7 border border-white shadow-xl shadow-slate-200/50 hover:border-indigo-300 hover:bg-white transition-all duration-500">
                                    <div className="bg-indigo-50 text-indigo-600 p-3.5 rounded-2xl w-fit mb-5 group-hover:bg-indigo-500 group-hover:text-white transition-colors shadow-inner">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-lg mb-2">Email Us</h4>
                                    <a href="mailto:info@trinay.in" className="text-slate-600 text-[15px] font-medium hover:text-indigo-600 transition-colors break-all inline-block mt-1">info@trinay.in</a>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* RIGHT COLUMN: Glassmorphism Feedback Form */}
                        <motion.div 
                            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}
                            className="bg-white/80 backdrop-blur-2xl rounded-[40px] p-8 lg:p-12 border-2 border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden"
                        >
                            {/* Decorative Form Backgrounds */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-cyan-100/50 to-transparent rounded-bl-full pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-tr-full pointer-events-none"></div>
                            
                            <div className="relative z-10 h-full flex flex-col justify-center">
                                <h3 className="text-3xl lg:text-4xl font-black text-[#003366] mb-3 tracking-tight">Send a Message</h3>
                                <p className="text-slate-500 text-[16px] mb-10 font-medium">Fill out the form below and our administrative team will respond to your query promptly.</p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors duration-300" />
                                            <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Full Name" className={inputClasses} />
                                        </div>
                                        <div className="relative group">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors duration-300" />
                                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="Phone Number" className={inputClasses} />
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="relative group">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors duration-300" />
                                            <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email Address" className={inputClasses} />
                                        </div>
                                        <div className="relative group">
                                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors duration-300" />
                                            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required placeholder="Subject / Reason" className={inputClasses} />
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <MessageSquare className="absolute left-4 top-5 w-5 h-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors duration-300" />
                                        <textarea rows="5" name="message" value={formData.message} onChange={handleChange} required placeholder="How can we help you today?" className={`${inputClasses} resize-none pt-4`} />
                                    </div>

                                    {feedbackStatus.message && (
                                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className={`p-4 rounded-2xl text-[15px] font-bold ${feedbackStatus.type === "success" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"}`}>
                                            {feedbackStatus.message}
                                        </motion.div>
                                    )}

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#003366] to-[#004c99] hover:from-[#002244] hover:to-[#003366] text-white px-10 py-5 rounded-2xl text-[16px] font-black uppercase tracking-widest transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(0,51,102,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(0,51,102,0.7)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed group"
                                    >
                                        {isSubmitting ? (
                                            <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                                                Send Secure Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* --- MEDIA SECTION: Video & Maps --- */}
            <section className="py-16 lg:py-24 bg-white relative z-10 border-t border-slate-100">
                <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
                    
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tight mb-4">Discover <span className="text-cyan-600">Trinay Hospital</span></h2>
                        <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">Take a virtual tour of our state-of-the-art facilities or find your way to our campus using the interactive map below.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        
                        {/* 1. YouTube Video Embed */}
                        <motion.div 
                            initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                            className="flex flex-col h-full"
                        >
                            <div className="flex items-center gap-3 mb-6 px-2">
                                <PlayCircle className="w-8 h-8 text-red-600" />
                                <h3 className="text-2xl font-bold text-slate-800">Hospital Tour</h3>
                            </div>
                            <div className="relative w-full rounded-[32px] overflow-hidden shadow-2xl shadow-slate-300/50 border-[6px] border-white group flex-1 min-h-[350px] md:min-h-[450px]">
                                {/* Pre-load skeleton */}
                                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center -z-10">
                                    <span className="w-10 h-10 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin"></span>
                                </div>
                                <iframe 
                                    className="w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-[1.02]"
                                    src="https://www.youtube.com/embed/P-AOXKlNIzI?si=PFeUDcaprdAwQr7O" 
                                    title="Trinay Hospital Tour" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    referrerPolicy="strict-origin-when-cross-origin" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </motion.div>

                        {/* 2. Google Maps Integration */}
                        <motion.div 
                            initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
                            className="flex flex-col h-full mt-10 lg:mt-0"
                        >
                            <div className="flex items-center gap-3 mb-6 px-2">
                                <MapPin className="w-8 h-8 text-blue-600" />
                                <h3 className="text-2xl font-bold text-slate-800">Interactive Map</h3>
                            </div>
                            <div className="relative w-full rounded-[32px] overflow-hidden shadow-2xl shadow-blue-900/10 border-[6px] border-white group flex-1 min-h-[350px] md:min-h-[450px]">
                                {/* Glow Effect on Hover */}
                                <div className="absolute inset-0 border-4 border-transparent group-hover:border-cyan-400/50 rounded-[26px] pointer-events-none transition-colors duration-500 z-10"></div>
                                
                                {/* Loading State underlying the map */}
                                <div className="absolute inset-0 bg-slate-50 flex items-center justify-center -z-10 text-slate-400">
                                    <span className="animate-pulse font-medium flex items-center gap-2">
                                        <MapPin className="w-5 h-5 animate-bounce" /> Loading Coordinates...
                                    </span>
                                </div>
                                
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14313.149235882673!2d72.9818817!3d26.252327!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418f4bbfae85e5%3A0xe510f8a96c3d4a65!2sTrinay%20Hospital!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                                    className="w-full h-full absolute inset-0 filter group-hover:contrast-105 transition-all duration-700"
                                    allowFullScreen="" 
                                    loading="lazy" 
                                    title="Trinay Hospital Location"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Contact;