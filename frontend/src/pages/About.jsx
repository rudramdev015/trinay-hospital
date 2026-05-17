import {
  Heart,
  Target,
  Eye,
  ShieldCheck,
  Activity,
  Clock,
  ChevronRight,
  CheckCircle2,
  Stethoscope,
  Baby,
  Brain,
  Bone,
  Wind,
  Building2,
  MapPin,
  CreditCard,
  ShieldPlus,
  ArrowRight,
  Zap,
  Award,
  Check,
  Scale,
  Sparkles,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";
import hospitalLogo from "../components/common/trinayhospital_logo.jpg";
import hospitalBg   from "../assets/images/heroImage1.jpg";

// --- TRINAY HOSPITAL DATA (SEO OPTIMIZED) ---
const departments = [
  {
    name: "Cardiology & CTVS",
    desc: "Top cardiologists in Jodhpur offering advanced CATH Lab for angiography and bypass surgeries.",
    icon: Heart,
  },
  {
    name: "Neurology & Spine",
    desc: "Best-in-class neurosurgeons treating brain strokes, epilepsy, and complex spine disorders.",
    icon: Brain,
  },
  {
    name: "Orthopaedics",
    desc: "Expert joint replacement, arthroscopy, and trauma fracture management in Western Rajasthan.",
    icon: Bone,
  },
  {
    name: "Maternity & Gynaecology",
    desc: "24/7 normal delivery, C-section, PCOD, and comprehensive women's healthcare.",
    icon: Baby,
  },
  {
    name: "Paediatrics & NICU",
    desc: "Advanced Level-3 NICU providing critical care for premature babies and child health.",
    icon: ShieldPlus,
  },
  {
    name: "Pulmonology",
    desc: "Specialized respiratory care for asthma, COPD, and severe lung infections.",
    icon: Wind,
  },
  {
    name: "Oncology (Cancer Care)",
    desc: "Comprehensive cancer screening, chemotherapy, and advanced onco-surgery.",
    icon: Activity,
  },
  {
    name: "General Surgery",
    desc: "Minimally invasive laparoscopic, appendix, gallbladder, and hernia operations.",
    icon: Stethoscope,
  },
];

const facilities = [
  "100-Bedded Premium Inpatient Capacity",
  "24/7 Trauma & Emergency Center",
  "State-of-the-Art Cardiac CATH Lab",
  "Modular Zero-Infection Operation Theatres",
  "Level-3 NICU & Intensive CCU/ICU",
  "Advanced MRI & 128-Slice CT Scan",
  "Digital X-Ray & 4D Sonography",
  "Fully Automated 24/7 Pathology Lab",
];

// --- Bulletproof Animation Settings ---
const fadeUpProps = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "100px" },
};

const popProps = {
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: "50px" },
};

const About = () => {
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-[#2CB1BC] selection:text-white overflow-hidden">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-32 lg:pt-48 lg:pb-48 bg-gradient-to-b from-[#1a293b] to-[#2E4660] z-10 border-b border-[#2CB1BC]/20 overflow-hidden shadow-2xl">
        {/* Brand Color Ambient Glows */}
        <motion.div
          style={{ y: yBg }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <div className="absolute top-[-20%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-[#2CB1BC]/15 blur-[150px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#2CB1BC]/10 blur-[120px]"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wMikvPjwvc3ZnPg==')]"></div>
        </motion.div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-8"
          >
            <span className="inline-flex items-center gap-2 py-2 px-6 rounded-full bg-[#2CB1BC]/10 border border-[#2CB1BC]/40 text-[#2CB1BC] text-xs md:text-sm font-black tracking-[0.2em] uppercase shadow-[0_0_30px_rgba(44,177,188,0.2)]">
              <Award className="w-4 h-4" /> Best Multispeciality Hospital in
              Jodhpur
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white tracking-tighter leading-[1.1]"
          >
            Advanced Healthcare in <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2CB1BC] to-[#80d8e0]">
              Western Rajasthan
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed font-medium"
          >
            Trinay Hospital is a NABH-accredited 100-bedded medical institution.
            We blend cutting-edge medical technology with profound human empathy
            to deliver world-class clinical outcomes.
          </motion.p>
        </div>
      </section>

      {/* --- FLOATING STATS STRIP --- */}
      <section className="relative z-20 -mt-20 lg:-mt-28 px-4 sm:px-6 lg:px-12 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            type: "spring",
            stiffness: 50,
          }}
          className="bg-white/95 backdrop-blur-3xl border border-white p-6 md:p-10 rounded-[32px] shadow-[0_30px_60px_-15px_rgba(46,70,96,0.15)] relative overflow-hidden"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 divide-x divide-slate-100 relative z-10">
            <div className="text-center px-2 md:px-4 group">
              <h4 className="text-4xl md:text-6xl font-black text-[#2E4660] group-hover:text-[#2CB1BC] transition-colors duration-500">
                100<span className="text-[#2CB1BC]">+</span>
              </h4>
              <p className="text-slate-500 font-bold mt-2 text-xs md:text-sm uppercase tracking-widest">
                Hospital Beds
              </p>
            </div>
            <div className="text-center px-2 md:px-4 group">
              <h4 className="text-4xl md:text-6xl font-black text-[#2E4660] group-hover:text-[#2CB1BC] transition-colors duration-500">
                24<span className="text-[#2CB1BC]">+</span>
              </h4>
              <p className="text-slate-500 font-bold mt-2 text-xs md:text-sm uppercase tracking-widest">
                Specialities
              </p>
            </div>
            <div className="text-center px-2 md:px-4 group">
              <h4 className="text-4xl md:text-6xl font-black text-[#2E4660] group-hover:text-[#2CB1BC] transition-colors duration-500">
                24<span className="text-[#2CB1BC]">/</span>7
              </h4>
              <p className="text-slate-500 font-bold mt-2 text-xs md:text-sm uppercase tracking-widest">
                Emergency Care
              </p>
            </div>
            <div className="text-center px-2 md:px-4 group">
              <h4 className="text-4xl md:text-6xl font-black text-[#2E4660] group-hover:text-[#2CB1BC] transition-colors duration-500">
                NABH
              </h4>
              <p className="text-slate-500 font-bold mt-2 text-xs md:text-sm uppercase tracking-widest">
                Accreditation
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- OUR MISSION & VISION (NEW DIAGONAL SPLIT DESIGN) --- */}
      <section className="py-24 lg:py-40 relative overflow-hidden bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* --- DESKTOP VIEW (DIAGONAL SPLIT) --- */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "100px" }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block relative w-full h-[600px] rounded-[48px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] bg-gradient-to-br from-slate-50 to-[#e0f2fe] border border-blue-100 overflow-hidden"
          >
            {/* RIGHT SIDE (WHITE/BLUE) - OUR MISSION */}
            <div className="absolute inset-0 w-full h-full p-16 flex flex-col justify-between items-end">
              <Target className="w-24 h-24 text-[#2E4660] drop-shadow-sm opacity-90" />
              <div className="w-[42%] text-left absolute bottom-16 right-16">
                <h2 className="text-[3.5rem] font-black text-[#2E4660] leading-none mb-6 tracking-tighter">
                  OUR
                  <br />
                  MISSION
                </h2>
                <p className="text-[#2E4660]/80 text-xl font-medium leading-relaxed">
                  To provide world-class, affordable, and evidence-based
                  healthcare. We strive to be the top medical center in Jodhpur
                  by placing patient safety, ethical practices, and rapid
                  recovery at the absolute core of our operations.
                </p>
              </div>
            </div>

            {/* LEFT SIDE (ORANGE DIAGONAL) - OUR VISION */}
            <motion.div
              initial={{ x: "-15%" }}
              whileInView={{ x: "0%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#ea580c] via-[#f97316] to-[#eab308] [clip-path:polygon(0_0,75%_0,30%_100%,0_100%)] drop-shadow-[20px_0_30px_rgba(0,0,0,0.3)]"
            >
              <div className="w-[45%] h-full p-16 flex flex-col justify-between relative z-10">
                <div>
                  <h2 className="text-[3.5rem] font-black text-white leading-none mb-6 tracking-tighter drop-shadow-md">
                    OUR
                    <br />
                    VISION
                  </h2>
                  <p className="text-white/95 text-xl font-medium leading-relaxed drop-shadow-sm">
                    To be the most trusted and leading multispeciality
                    healthcare institution in Western Rajasthan. We envision
                    setting the highest global benchmarks in medical innovation,
                    advanced surgeries, and holistic patient care.
                  </p>
                </div>
                <Eye className="w-24 h-24 text-white drop-shadow-md opacity-90" />
              </div>
            </motion.div>
          </motion.div>

          {/* --- MOBILE/TABLET VIEW (STACKED CARDS) --- */}
          <div className="lg:hidden flex flex-col gap-8">
            <motion.div
              {...fadeUpProps}
              className="bg-gradient-to-br from-[#ea580c] via-[#f97316] to-[#eab308] rounded-[40px] p-10 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-[-20%] right-[-10%] w-[200px] h-[200px] bg-white/10 rounded-full blur-[40px] pointer-events-none"></div>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tight leading-none">
                OUR
                <br />
                VISION
              </h2>
              <p className="text-white/90 text-lg mb-8 font-medium leading-relaxed">
                To be the most trusted and leading multispeciality healthcare
                institution in Western Rajasthan. We envision setting the
                highest global benchmarks in medical innovation, advanced
                surgeries, and holistic patient care.
              </p>
              <Eye className="w-16 h-16 text-white opacity-90" />
            </motion.div>

            <motion.div
              {...fadeUpProps}
              className="bg-gradient-to-br from-slate-50 to-[#e0f2fe] rounded-[40px] p-10 shadow-2xl border border-blue-100 relative overflow-hidden"
            >
              <div className="flex justify-end mb-8">
                <Target className="w-16 h-16 text-[#2E4660] opacity-90" />
              </div>
              <h2 className="text-4xl font-black text-[#2E4660] mb-4 tracking-tight leading-none text-right">
                OUR
                <br />
                MISSION
              </h2>
              <p className="text-[#2E4660]/80 text-lg text-right font-medium leading-relaxed">
                To provide world-class, affordable, and evidence-based
                healthcare. We strive to be the top medical center in Jodhpur by
                placing patient safety, ethical practices, and rapid recovery at
                the absolute core of our operations.
              </p>
            </motion.div>
          </div>

          {/* --- OUR CORE VALUES (UNDERNEATH) --- */}
          <div className="mt-16 lg:mt-24">
            <div className="text-center mb-12">
              <motion.h3
                {...fadeUpProps}
                className="text-3xl md:text-4xl font-black text-[#2E4660] tracking-tight"
              >
                Our Core Values
              </motion.h3>
              <motion.div
                {...fadeUpProps}
                className="w-20 h-1.5 bg-[#2CB1BC] mx-auto mt-4 rounded-full"
              ></motion.div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  title: "Uncompromising Integrity",
                  icon: Scale,
                  desc: "Doing what is right, transparently and honestly, every single time for every patient.",
                },
                {
                  title: "Profound Compassion",
                  icon: Heart,
                  desc: "Treating every individual like family, providing empathy that heals both mind and body.",
                },
                {
                  title: "Absolute Transparency",
                  icon: ShieldCheck,
                  desc: "Maintaining clear, honest communication regarding care, processes, and treatment costs.",
                },
                {
                  title: "Clinical Excellence",
                  icon: Sparkles,
                  desc: "Relentlessly pursuing perfection in every procedure, diagnosis, and medical intervention.",
                },
              ].map((val, idx) => (
                <motion.div
                  key={idx}
                  {...fadeUpProps}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-slate-50 border border-slate-100 rounded-[32px] p-8 hover:border-[#2CB1BC]/50 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-[#2E4660]/5 text-[#2E4660] group-hover:bg-[#2CB1BC]/10 group-hover:text-[#2CB1BC] flex items-center justify-center mb-6 transition-colors duration-300">
                    <val.icon className="w-7 h-7" />
                  </div>
                  <h4 className="text-xl font-black text-[#2E4660] mb-3 leading-tight">
                    {val.title}
                  </h4>
                  <p className="text-slate-600 text-[15px] font-medium leading-relaxed">
                    {val.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- OUR STORY & LOCATIONS --- */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="bg-white rounded-[40px] p-8 md:p-12 lg:p-16 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2">
              <motion.div {...fadeUpProps} transition={{ duration: 0.6 }}>
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="w-6 h-6 text-[#2CB1BC]" />
                  <span className="text-[#2CB1BC] font-black tracking-widest uppercase text-sm">
                    The Trinay Legacy
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-[#2E4660] leading-tight mb-6">
                  World-Class Care, <br /> Close to Home.
                </h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-10 font-medium">
                  Founded with the mission to eradicate the need for patients to
                  travel to metro cities for critical care, Trinay Hospital has
                  established itself as the beating heart of healthcare in
                  Western Rajasthan.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4 items-start bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-[#2CB1BC]/30 transition-colors">
                    <div className="bg-[#2CB1BC]/10 p-3 rounded-xl shrink-0">
                      <MapPin className="w-6 h-6 text-[#2CB1BC]" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-[#2E4660]">
                        Jodhpur Headquarters
                      </h4>
                      <p className="text-slate-600 text-sm md:text-base mt-1 font-medium">
                        Opposite Chopasni Garden, PF Office Road, Jodhpur
                        342008.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4 items-start bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-[#2CB1BC]/30 transition-colors">
                    <div className="bg-[#2E4660]/10 p-3 rounded-xl shrink-0">
                      <MapPin className="w-6 h-6 text-[#2E4660]" />
                    </div>
                    <div>
                      <h4 className="font-black text-lg text-[#2E4660]">
                        Pali Extension Clinic
                      </h4>
                      <p className="text-slate-600 text-sm md:text-base mt-1 font-medium">
                        8-9, Near BSNL Godown, Main Sojat Road, Naya Gaon, Pali
                        306401.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="lg:w-1/2 flex justify-center w-full">
              <motion.div
                {...popProps}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative w-full max-w-[500px]"
              >
                <div className="absolute inset-0 bg-[#2CB1BC]/10 rounded-full blur-[80px]"></div>
                <img
                  src={hospitalLogo}
                  alt="Trinay Hospital Jodhpur"
                  className="relative z-10 w-full object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- DEPARTMENTS & SPECIALITIES GRID --- */}
      <section className="py-24 lg:py-32 bg-[#1e2f42] relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-5 mix-blend-screen pointer-events-none" style={{ backgroundImage: `url(${hospitalBg})` }}></div>

        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16 lg:mb-24">
            <motion.h2
              {...fadeUpProps}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight"
            >
              Centers of Excellence
            </motion.h2>
            <motion.p
              {...fadeUpProps}
              transition={{ delay: 0.1 }}
              className="mt-6 md:mt-8 text-slate-300 text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed"
            >
              Housing 24+ medical departments, Trinay Hospital is equipped by
              top doctors to handle everything from routine checkups to the most
              complex surgical interventions.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
            {departments.map((dept, idx) => (
              <motion.div
                key={idx}
                {...fadeUpProps}
                transition={{ duration: 0.5, delay: (idx % 4) * 0.1 }}
                className="group bg-[#2E4660]/50 backdrop-blur-md border border-white/5 p-8 md:p-10 rounded-[40px] transition-all duration-500 hover:-translate-y-2 hover:bg-[#2CB1BC]/10 hover:border-[#2CB1BC]/40 hover:shadow-2xl hover:shadow-[#2CB1BC]/20 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full -z-10 group-hover:scale-[2] transition-transform duration-700"></div>
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-[24px] bg-[#2CB1BC]/20 text-[#2CB1BC] flex items-center justify-center mb-8 group-hover:bg-[#2CB1BC] group-hover:text-white transition-all duration-500 shadow-lg">
                  <dept.icon className="w-8 h-8 md:w-10 md:h-10" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-4">
                  {dept.name}
                </h3>
                <p className="text-slate-300 text-base leading-relaxed group-hover:text-white transition-colors font-medium">
                  {dept.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 md:mt-24 text-center">
            <Link
              to="/doctors"
              className="inline-flex items-center justify-center gap-3 bg-[#2CB1BC] hover:bg-[#249fa8] text-white px-8 py-5 md:px-12 md:py-6 rounded-full text-base md:text-lg font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_40px_rgba(44,177,188,0.4)] hover:shadow-[0_0_50px_rgba(44,177,188,0.6)] hover:scale-105 group"
            >
              Meet All Specialists{" "}
              <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* --- FACILITIES & GOVT SCHEMES (GUARANTEED VISIBLE TEXT) --- */}
      <section className="py-24 lg:py-40 bg-white relative border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            {/* FACILITIES LIST (Bulletproof Render) */}
            <div className="w-full">
              <motion.h2
                {...fadeUpProps}
                className="text-4xl md:text-5xl lg:text-6xl font-black text-[#2E4660] mb-10 tracking-tight"
              >
                Advanced <br />
                <span className="text-[#2CB1BC]">Infrastructure</span>
              </motion.h2>

              <div className="space-y-4 md:space-y-5">
                {facilities.map((fac, idx) => (
                  <motion.div
                    key={idx}
                    {...fadeUpProps}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex items-center gap-5 md:gap-6 bg-slate-50 border border-slate-100 p-5 md:p-6 rounded-[24px] hover:border-[#2CB1BC]/50 hover:shadow-[0_10px_30px_rgba(44,177,188,0.1)] transition-all group"
                  >
                    <div className="bg-[#2CB1BC]/10 p-3 rounded-[16px] group-hover:bg-[#2CB1BC] transition-colors shrink-0 border border-[#2CB1BC]/20">
                      <CheckCircle2 className="w-6 h-6 md:w-7 md:h-7 text-[#2CB1BC] group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-lg md:text-xl font-bold text-[#2E4660] group-hover:text-[#1e2f42] transition-colors">
                      {fac}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* GOVERNMENT SCHEMES & INSURANCE */}
            <motion.div
              {...fadeUpProps}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#2E4660] rounded-[48px] p-8 md:p-16 text-white shadow-2xl shadow-[#2E4660]/40 relative overflow-hidden mt-8 lg:mt-0"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-[#2CB1BC]/20 blur-[100px] rounded-full pointer-events-none"></div>

              <CreditCard className="w-16 h-16 md:w-20 md:h-20 text-[#2CB1BC] mb-8 md:mb-10 relative z-10" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 tracking-tight relative z-10">
                Cashless & Free Treatment
              </h2>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-12 font-medium relative z-10">
                We believe finances should never be a barrier to saving a life.
                Trinay Hospital is proudly empanelled with major government
                health schemes and private TPAs in Rajasthan.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 relative z-10">
                {[
                  "Mukhyamantri Ayushman Arogya Yojana",
                  "RGHS (Rajasthan Govt Health Scheme)",
                  "ECHS (Ex-Servicemen Contributory)",
                  "Ayushman CAPF",
                  "CGHS Facilities",
                  "All Major Private TPA Insurances",
                ].map((scheme, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 md:p-5 rounded-2xl border border-white/10 hover:bg-[#2CB1BC]/20 hover:border-[#2CB1BC]/50 transition-colors"
                  >
                    <ShieldCheck className="w-6 h-6 text-[#2CB1BC] shrink-0" />
                    <span className="font-bold text-sm md:text-base text-white">
                      {scheme}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-12 md:mt-16 pt-8 md:pt-10 border-t border-white/10 relative z-10">
                <p className="text-slate-300 text-base md:text-lg font-bold uppercase tracking-widest">
                  Insurance Query? Call our desk:
                </p>
                <a
                  href="tel:+919119191622"
                  className="text-3xl md:text-4xl lg:text-5xl font-black mt-4 inline-block hover:text-[#2CB1BC] transition-colors"
                >
                  +91 91191 91622
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      

      {/* --- CALL TO ACTION --- */}
      <section className="py-24 md:py-32 bg-[#2CB1BC] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-white/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSJvPjwvc3ZnPg==')] mix-blend-overlay opacity-30 pointer-events-none"></div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.h2
            {...fadeUpProps}
            className="text-4xl md:text-6xl lg:text-7xl font-black text-[#2E4660] mb-8 tracking-tighter"
          >
            Ready to prioritize your health?
          </motion.h2>
          <motion.p
            {...fadeUpProps}
            transition={{ delay: 0.1 }}
            className="text-white text-lg md:text-2xl font-bold mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Don't wait when it comes to your well-being. Schedule a consultation
            with Jodhpur's top specialists today and experience healthcare that
            truly cares.
          </motion.p>
          <motion.div
            {...fadeUpProps}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center gap-6"
          >
            <Link
              to="/appointment"
              className="bg-[#2E4660] text-white px-8 py-5 md:px-12 md:py-6 rounded-[24px] font-black tracking-[0.2em] uppercase hover:scale-105 transition-transform shadow-[0_20px_40px_rgba(46,70,96,0.4)] flex items-center justify-center gap-3 text-base md:text-lg group"
            >
              Book Appointment{" "}
              <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </Link>
            <a
              href="tel:+919119191622"
              className="bg-white text-[#2E4660] px-8 py-5 md:px-12 md:py-6 rounded-[24px] font-black tracking-[0.2em] uppercase hover:scale-105 transition-transform shadow-2xl flex items-center justify-center gap-3 text-base md:text-lg group"
            >
              Call +91 91191 91622
            </a>
          </motion.div>
        </div>
      </section>
      

      <Footer />
    </div>
  );
};

export default About;
