import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import dhsTpa          from "../../assets/company logos tpa/DHS tpa.png";
import nvgt            from "../../assets/company logos tpa/NVGT.png";
import ackoIns         from "../../assets/company logos tpa/acko ins.svg";
import adityaBirla     from "../../assets/company logos tpa/aditya birla ins.webp";
import ericsonHealth   from "../../assets/company logos tpa/ericson health isn.jpg";
import fhpl            from "../../assets/company logos tpa/fhpl ins.png";
import hdfcErgo        from "../../assets/company logos tpa/hdfc ergo.png";
import healthIndia     from "../../assets/company logos tpa/health india.png";
import heritage        from "../../assets/company logos tpa/heritage health ins.png";
import liberty         from "../../assets/company logos tpa/liberty general insurance.avif";
import manipal         from "../../assets/company logos tpa/manipal ins.png";
import maxBupa         from "../../assets/company logos tpa/max bupa health ins.svg";
import medicare        from "../../assets/company logos tpa/medicare-logo-green.svg";
import paramount       from "../../assets/company logos tpa/paramount ins.png";
import raksha          from "../../assets/company logos tpa/raksha health ins.png";
import reliance        from "../../assets/company logos tpa/reliance health ins.png";
import religare        from "../../assets/company logos tpa/relligare_logo.svg";
import safeway         from "../../assets/company logos tpa/safeway ins.png";
import sbiGeneral      from "../../assets/company logos tpa/sbi general ins.svg";

const LOGOS = [
    { src: dhsTpa,       alt: "DHS TPA" },
    { src: nvgt,         alt: "NVGT" },
    { src: ackoIns,      alt: "Acko Insurance" },
    { src: adityaBirla,  alt: "Aditya Birla Insurance" },
    { src: ericsonHealth,alt: "Ericson Health Insurance" },
    { src: fhpl,         alt: "FHPL" },
    { src: hdfcErgo,     alt: "HDFC Ergo" },
    { src: healthIndia,  alt: "Health India" },
    { src: heritage,     alt: "Heritage Health Insurance" },
    { src: liberty,      alt: "Liberty General Insurance" },
    { src: manipal,      alt: "Manipal Insurance" },
    { src: maxBupa,      alt: "Max Bupa Health Insurance" },
    { src: medicare,     alt: "Medicare" },
    { src: paramount,    alt: "Paramount Insurance" },
    { src: raksha,       alt: "Raksha Health Insurance" },
    { src: reliance,     alt: "Reliance Health Insurance" },
    { src: religare,     alt: "Religare" },
    { src: safeway,      alt: "Safeway Insurance" },
    { src: sbiGeneral,   alt: "SBI General Insurance" },
];

const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const LogoCard = ({ src, alt }) => (
    <div className="flex h-16 w-36 shrink-0 items-center justify-center rounded-xl border border-slate-100 bg-white px-4 shadow-sm grayscale hover:grayscale-0 hover:shadow-md transition-all duration-300">
        <img src={src} alt={alt} className="max-h-10 max-w-[100px] object-contain" loading="lazy" />
    </div>
);

const InsurancePartners = () => (
    <section className="relative overflow-hidden py-20 md:py-24 bg-slate-50">
        <style>{`
            @keyframes marquee-left {
                from { transform: translate3d(0,0,0); }
                to   { transform: translate3d(calc(-50% - 0.5rem),0,0); }
            }
            .marquee-track { animation: marquee-left 38s linear infinite; }
            .marquee-track:hover { animation-play-state: paused; }
        `}</style>

        <motion.div
            className="relative"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto px-6 mb-12">
                <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
                    <ShieldCheck size={14} />
                    Cashless Treatment Available
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003366] leading-tight">
                    19+ Insurance &amp; TPA
                    <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Partners</span>
                </h2>
                <p className="text-slate-500 mt-4 text-lg leading-relaxed">
                    Trinay Hospital is empanelled with all major insurance companies and TPAs for seamless cashless hospitalisation.
                </p>
            </div>

            {/* Infinite marquee — duplicate logos to create seamless loop */}
            <div className="relative overflow-hidden">
                {/* Left fade */}
                <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
                {/* Right fade */}
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

                <div className="marquee-track flex w-max gap-4 py-2 px-2">
                    {/* First copy */}
                    {LOGOS.map((logo) => (
                        <LogoCard key={`a-${logo.alt}`} {...logo} />
                    ))}
                    {/* Second copy for seamless loop */}
                    {LOGOS.map((logo) => (
                        <LogoCard key={`b-${logo.alt}`} {...logo} />
                    ))}
                </div>
            </div>

            <p className="text-center text-sm text-slate-400 font-medium mt-8">
                Don&apos;t see your insurer? <a href="/insurance" className="text-blue-600 font-bold hover:underline">View the full list →</a>
            </p>
        </motion.div>
    </section>
);

export default InsurancePartners;
