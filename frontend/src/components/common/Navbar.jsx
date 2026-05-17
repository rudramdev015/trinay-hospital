import React, { useState, useEffect } from "react";
import {
    ChevronDown, Home, Stethoscope, UserRound, Shield,
    Phone, Image, Info, CalendarCheck, Facebook,
    Instagram, Menu, X, Search, PhoneCall, MapPin, Clock, Users2
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import hospitalLogo from "./trinayhospital_logo.jpg";

const CERT_LOGOS = [
    { src: "/DOCTOR IAMGES/NABH.png",       alt: "NABH Accredited" },
    { src: "/DOCTOR IAMGES/ESIC.png",        alt: "ESIC Empanelled" },
    { src: "/DOCTOR IAMGES/MAA JOGANA .png", alt: "Maa Yojana Approved" },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const location = useLocation();

    // Handle Scroll for sticky effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close menu on navigation (render-time comparison avoids setState-in-effect)
    const [prevPath, setPrevPath] = useState(location.pathname);
    if (location.pathname !== prevPath) {
        setPrevPath(location.pathname);
        setIsOpen(false);
    }

    const navLinks = [
        { label: "Home", to: "/" },
        { label: "Services", to: "/services" },
        { label: "Doctors", to: "/doctors" },
        { label: "Insurance", to: "/insurance" },
        { label: "Contact", to: "/contact" },
    ];

    const aboutLinks = [
        { label: "About Our Hospital", to: "/about",      icon: Info    },
        { label: "Leadership Team",    to: "/leadership", icon: Users2  },
        { label: "Photo Gallery",      to: "/gallery",    icon: Image   },
        { label: "Our Mission",        to: "/mission",    icon: Shield  },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-[1000] font-sans">
            {/* --- 1. TOP INFO BAR (Hidden on Small Mobile) --- */}
            <div className="hidden sm:block bg-[#003366] text-white py-2 px-6 lg:px-12">
                <div className="max-w-[1600px] mx-auto flex justify-between items-center text-[12px] lg:text-[14px] font-medium">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-orange-400">
                            <PhoneCall size={16} className="animate-bounce" />
                            {/* Updated with Trinay Emergency Number */}
                            <span className="font-bold">24/7 EMERGENCY: +91 91191 91622</span>
                        </div>
                        <div className="hidden lg:flex items-center gap-2 opacity-90">
                            <MapPin size={14} />
                            {/* Updated with Trinay Address */}
                            <span>Opp. Chopasni Garden, PF Office Road, Jodhpur</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden xl:flex items-center gap-2 opacity-90">
                            <Clock size={14} />
                            {/* Updated with Trinay OPD Timings */}
                            <span>OPD: Mon-Sat 9:00 AM - 8:00 PM</span>
                        </div>
                        <div className="flex items-center gap-4 border-l border-white/20 pl-4">
                            {/* Connected Trinay Social Links */}
                            <a href="https://www.facebook.com/profile.php?id=61568442437621" target="_blank" rel="noreferrer" aria-label="Facebook">
                                <Facebook size={16} className="hover:text-blue-400 cursor-pointer transition-all" />
                            </a>
                            <a href="https://www.instagram.com/trinayhospital/" target="_blank" rel="noreferrer" aria-label="Instagram">
                                <Instagram size={16} className="hover:text-pink-400 cursor-pointer transition-all" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- 2. MAIN NAVIGATION --- */}
            <nav className={`w-full transition-all duration-500 border-b ${
                scrolled 
                ? "bg-white/95 backdrop-blur-md py-2 shadow-lg border-slate-100" 
                : "bg-white py-4 border-transparent"
            }`}>
                <div className="max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12">
                    <div className="flex justify-between items-center">
                        
                        {/* Logo + Accreditation badges */}
                        <div className="flex items-center gap-3 shrink-0">
                            <Link to="/" className="group">
                                <img
                                    src={hospitalLogo}
                                    alt="Trinay Hospital"
                                    className={`transition-all duration-500 object-contain ${
                                        scrolled ? "h-16 lg:h-20" : "h-20 lg:h-32"
                                    }`}
                                />
                            </Link>

                            {/* Certification logos — desktop only, no background */}
                            <div className="hidden lg:flex items-center gap-3 pl-4 ml-1 border-l border-slate-200">
                                {CERT_LOGOS.map(({ src, alt }) => (
                                    <img
                                        key={alt}
                                        src={src}
                                        alt={alt}
                                        title={alt}
                                        className={`w-auto object-contain transition-all duration-500 ${
                                            scrolled ? "h-9" : "h-12"
                                        }`}
                                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Desktop Menu (Large screens and 4K) */}
                        <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                            <Link to="/" className="text-[15px] xl:text-[16px] font-bold text-slate-700 hover:text-[#003366] transition-all">HOME</Link>
                            
                            {/* Premium Dropdown */}
                            <div 
                                className="relative py-4 group cursor-pointer"
                                onMouseEnter={() => setActiveDropdown('about')}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <span className="text-[15px] xl:text-[16px] font-bold text-slate-700 group-hover:text-[#003366] flex items-center gap-1 uppercase">
                                    ABOUT <ChevronDown size={16} className={`transition-transform ${activeDropdown === 'about' ? 'rotate-180' : ''}`} />
                                </span>
                                <div className={`absolute top-full left-0 w-64 bg-white shadow-2xl rounded-xl border border-slate-100 p-2 transition-all duration-300 origin-top ${
                                    activeDropdown === 'about' ? 'opacity-100 visible scale-100' : 'opacity-0 invisible scale-95'
                                }`}>
                                    {aboutLinks.map((item) => (
                                        <Link 
                                            key={item.to} 
                                            to={item.to} 
                                            className="flex items-center gap-3 px-4 py-3 text-[14px] text-slate-600 hover:bg-blue-50 hover:text-[#003366] rounded-lg transition-all"
                                        >
                                            <item.icon size={18} />
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {navLinks.slice(1).map((link) => (
                                <Link 
                                    key={link.to} 
                                    to={link.to} 
                                    className="text-[15px] xl:text-[16px] font-bold text-slate-700 hover:text-[#003366] transition-all uppercase"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Search & Appointment Action Buttons */}
                        <div className="hidden lg:flex items-center gap-4">
                            <button className="p-3 text-slate-500 hover:bg-slate-100 rounded-full transition-all">
                                <Search size={20} />
                            </button>
                            <Link 
                                to="/appointment" 
                                className="bg-[#003366] hover:bg-blue-800 text-white px-7 xl:px-10 py-3.5 rounded-full text-[14px] xl:text-[15px] font-black uppercase tracking-widest transition-all shadow-xl hover:shadow-blue-200 active:scale-95"
                            >
                                Book Appointment
                            </Link>
                        </div>

                        {/* Mobile Menu Button (Tablets and Phones) */}
                        <div className="lg:hidden flex items-center gap-4">
                            {/* Updated Mobile Call Button with Trinay Number */}
                            <a href="tel:+919119191622" className="sm:hidden p-2 text-red-600">
                                <PhoneCall size={24} />
                            </a>
                            <button 
                                onClick={() => setIsOpen(!isOpen)}
                                className="p-2 text-[#003366] hover:bg-blue-50 rounded-lg transition-all"
                            >
                                {isOpen ? <X size={32} /> : <Menu size={32} />}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- 3. MOBILE MENU OVERLAY (Full Responsive Sidebar) --- */}
            <div className={`lg:hidden fixed inset-0 z-[2000] transition-all duration-500 ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}>
                {/* Backdrop */}
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                
                {/* Panel */}
                <div className="absolute top-0 right-0 h-full w-[85%] max-w-md bg-white shadow-2xl flex flex-col">
                    <div className="p-6 flex justify-between items-center border-b border-slate-100">
                        <img src={hospitalLogo} alt="Logo" className="h-14" />
                        <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-100 rounded-full">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 p-4 rounded-xl text-lg font-bold transition-all ${
                                    location.pathname === link.to ? "bg-blue-50 text-[#003366]" : "text-slate-700 hover:bg-slate-50"
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        
                        <div className="pt-4 border-t border-slate-100">
                            <p className="px-4 py-2 text-xs font-bold text-slate-400 uppercase tracking-widest">About Trinay Hospital</p>
                            {aboutLinks.map((item) => (
                                <Link 
                                    key={item.to} 
                                    to={item.to} 
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-4 p-4 text-slate-700 font-semibold"
                                >
                                    <item.icon size={20} className="text-[#003366]" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-100 space-y-4">
                        <Link 
                            to="/appointment" 
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-center gap-3 w-full bg-[#003366] text-white py-5 rounded-2xl text-[16px] font-black uppercase shadow-lg shadow-blue-100"
                        >
                            <CalendarCheck size={22} />
                            Book Appointment
                        </Link>
                        <div className="flex justify-center gap-8 py-2">
                            {/* Connected Trinay Mobile Social Links */}
                            <a href="https://www.facebook.com/profile.php?id=61568442437621" target="_blank" rel="noreferrer" aria-label="Facebook">
                                <Facebook className="text-slate-400 hover:text-blue-600 transition-colors" size={24} />
                            </a>
                            <a href="https://www.instagram.com/trinayhospital/" target="_blank" rel="noreferrer" aria-label="Instagram">
                                <Instagram className="text-slate-400 hover:text-pink-600 transition-colors" size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;