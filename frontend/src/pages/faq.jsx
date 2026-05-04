import { useState, useRef, useEffect, useCallback } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

/* ═══════════════════════════════════════════════════════════════════
   TRINAY HOSPITAL  ·  PREMIUM FAQ PAGE  v3.0
   Brand: Teal #2BBFBF  ·  Navy #1E2D54  ·  Lora serif + Nunito sans
   Matches: Privacy page hero, existing Navbar & Footer style
═══════════════════════════════════════════════════════════════════ */

const FAQ_DATA = [
  {
    category: "Appointments",
    emoji: "📅",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 20, height: 20 }}
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    questions: [
      {
        q: "How do I book an appointment at Trinay Hospital?",
        a: "You can book online at trinay.in (click 'Book an Appointment'), call us at +91 91191 91622, or WhatsApp +91 91191 91722. Same-day slots are often available — just reach out!",
      },
      {
        q: "What are the OPD timings?",
        a: "Our OPD runs daily for outpatient consultations. For specific doctor or department timings, please call +91 91191 91622 or visit trinay.in for the latest schedule.",
      },
      {
        q: "Can I get a same-day appointment?",
        a: "Yes! Same-day appointments are usually available depending on doctor availability. Call +91 91191 91622 or WhatsApp +91 91191 91722 for the earliest available slot.",
      },
      {
        q: "Which departments can I book appointments for?",
        a: "Appointments are available across: Internal Medicine, Neurology, Cardiology, Obs & Gynaecology, Pathology, Anesthesia, Joint Replacement, Surgery, Gastrology, Pulmonology, Dentistry, Psychiatry, ENT, Arthroscopy, Urology, Physiotherapy, Paediatrics, and Oncology.",
      },
      {
        q: "What documents should I bring for my appointment?",
        a: "Please carry a valid photo ID, all previous medical records and prescriptions, and your government health scheme card (Ayushman, RGHS, ECHS, etc.) if applicable.",
      },
    ],
  },
  {
    category: "Emergency",
    emoji: "🚨",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 20, height: 20 }}
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    questions: [
      {
        q: "Is emergency care available 24/7?",
        a: "Absolutely. Trinay Hospital's Emergency Centre operates 24 hours a day, 7 days a week, 365 days a year. For any emergency, call +91 91191 91622 immediately.",
      },
      {
        q: "What should I do during a medical emergency?",
        a: "Call +91 91191 91622 without delay. Our emergency team is on standby around the clock. Head directly to the hospital or call for immediate guidance — every second matters.",
      },
      {
        q: "Does Trinay Hospital have an ICU, CCU, and NICU?",
        a: "Yes. We maintain a fully equipped ICU (Intensive Care Unit), CCU (Cardiac Care Unit), and NICU (Newborn Intensive Care Unit) managed by experienced critical care specialists.",
      },
    ],
  },
  {
    category: "Departments",
    emoji: "🏥",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 20, height: 20 }}
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    questions: [
      {
        q: "How many speciality departments does Trinay Hospital have?",
        a: "We have 24 speciality departments including Cardiology, Neurology, Orthopaedics, Gynaecology, Oncology, Urology, Paediatrics, Psychiatry, Dentistry, Neuro & Spine Surgery, Diabetology, CTVS, and more.",
      },
      {
        q: "Is heart surgery available at Trinay Hospital?",
        a: "Yes. Our Cardiology and CTVS (Cardio-Thoracic & Vascular Surgery) departments are equipped with a state-of-the-art CATH Lab for advanced cardiac procedures and interventions.",
      },
      {
        q: "Do you have a children's health department?",
        a: "Absolutely. Our Paediatrics department handles all aspects of children's health, and our NICU provides critical care for newborns and premature babies round the clock.",
      },
      {
        q: "Is cancer treatment available?",
        a: "Yes. Trinay Hospital has dedicated Oncology and Onco-Surgery departments delivering comprehensive cancer diagnosis, medical treatment, and surgical care under one roof.",
      },
      {
        q: "Is physiotherapy and rehabilitation available?",
        a: "Yes! Our Physiotherapy department offers post-surgery rehab, sports injury recovery, neurological rehabilitation, and general physiotherapy sessions with trained specialists.",
      },
      {
        q: "Do you have a diabetes / sugar disease department?",
        a: "Yes — our Diabetology department specialises in managing Type 1, Type 2, and gestational diabetes with personalised, comprehensive care plans.",
      },
    ],
  },
  {
    category: "Diagnostics",
    emoji: "🧪",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 20, height: 20 }}
      >
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="15" x2="15" y2="15" />
      </svg>
    ),
    questions: [
      {
        q: "What diagnostic tests are available in-house?",
        a: "We offer CT Scan, MRI, X-Ray, Ultrasound/Sonography, Echocardiography (Heart Echo), and a full suite of blood and lab tests through our on-site Radiology and Pathology departments.",
      },
      {
        q: "Is there a pharmacy inside the hospital?",
        a: "Yes. Trinay Hospital has a 24/7 in-house pharmacy fully stocked with all medicines required for both inpatient and outpatient care.",
      },
    ],
  },
  {
    category: "Govt. Schemes",
    emoji: "💳",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 20, height: 20 }}
      >
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
        <line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    questions: [
      {
        q: "Which government health schemes are accepted?",
        a: "Trinay Hospital accepts: Mukhyamantri Ayushman Arogya Yojana, RGHS (Rajasthan Government Health Scheme), ECHS (Ex-Servicemen Contributory Health Scheme), Rashtriya Bal Swasthya Karyakram (RBSK), and Ayushman CAPF.",
      },
      {
        q: "How do I avail cashless treatment under Ayushman Bharat?",
        a: "Simply bring your Ayushman card or relevant scheme card when you visit. Our front desk team will verify your eligibility and smoothly guide you through the cashless process.",
      },
      {
        q: "Is RGHS cashless treatment available for Rajasthan government employees?",
        a: "Yes! RGHS is fully accepted at Trinay Hospital. Present your RGHS card at the billing counter for a seamless, cashless experience.",
      },
    ],
  },
  {
    category: "Admission",
    emoji: "🛏️",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 20, height: 20 }}
      >
        <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" />
        <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    questions: [
      {
        q: "What is the bed capacity of Trinay Hospital?",
        a: "Trinay Hospital is a 100-bed private multispeciality hospital offering private rooms, semi-private rooms, general wards, ICU, CCU, NICU, and fully equipped operation theatres.",
      },
      {
        q: "Where is Trinay Hospital located?",
        a: "We have two branches — Jodhpur: Opposite Chopasni Garden, PF Office Road, Jodhpur 342008 | Pali: 8-9, Near BSNL Godown, Main Sojat Road, Naya Gaon, Pali Marwar, Rajasthan 306401.",
      },
      {
        q: "Does Trinay Hospital treat international patients?",
        a: "Yes! We have a dedicated International Patients support desk. Visit trinay.in/international-patients/ for complete details on our international patient services.",
      },
      {
        q: "Are career and job opportunities available at Trinay Hospital?",
        a: "Yes! We're always looking for passionate healthcare professionals. Visit trinay.in/careers/ to browse current openings and apply.",
      },
    ],
  },
  {
    category: "Contact",
    emoji: "📞",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 20, height: 20 }}
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 6 6l.46-.45a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
      </svg>
    ),
    questions: [
      {
        q: "How can I contact Trinay Hospital?",
        a: "Jodhpur: +91 91191 91622 / +91 91191 91722 | Pali: +91 98290 90061 | Email: info@trinay.in | WhatsApp: +91 91191 91722 | Website: trinay.in",
      },
      {
        q: "What is the WhatsApp number for Trinay Hospital?",
        a: "WhatsApp us at +91 91191 91722 for appointment booking, general queries, or any other support. We respond quickly.",
      },
    ],
  },
];

/* ─── Chevron ──────────────────────────────────────────────────── */
const Chevron = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      width: 13,
      height: 13,
      transform: open ? "rotate(180deg)" : "rotate(0deg)",
      transition: "transform 0.38s cubic-bezier(0.4,0,0.2,1)",
    }}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

/* ─── Single Accordion Row ─────────────────────────────────────── */
function AccordionItem({ question, answer, isOpen, onClick, index }) {
  const bodyRef = useRef(null);
  const [h, setH] = useState(0);
  useEffect(() => {
    setH(isOpen ? (bodyRef.current?.scrollHeight ?? 0) : 0);
  }, [isOpen]);

  return (
    <div
      className={`faq-item${isOpen ? " faq-item--open" : ""}`}
      style={{ animationDelay: `${index * 0.055}s` }}
    >
      <button
        className="faq-item__btn"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="faq-item__dot" />
        <span className="faq-item__q">{question}</span>
        <span className="faq-item__toggle">
          <Chevron open={isOpen} />
        </span>
      </button>
      <div className="faq-item__body-wrap" style={{ height: h }}>
        <div className="faq-item__body" ref={bodyRef}>
          <p className="faq-item__answer">{answer}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Stats ─────────────────────────────────────────────────────── */
const STATS = [
  { v: "24", l: "Specialities" },
  { v: "100", l: "Beds" },
  { v: "24/7", l: "Emergency" },
  { v: "5", l: "Govt. Schemes" },
  { v: "2", l: "Locations" },
];

/* ═══════════════════════════════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function Faq() {
  const [openKey, setOpenKey] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");
  const [stuck, setStuck] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const fn = () => setStuck(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const allCats = ["All", ...FAQ_DATA.map((f) => f.category)];

  const filtered = FAQ_DATA.map((s) => ({
    ...s,
    questions: s.questions.filter(
      ({ q, a }) =>
        q.toLowerCase().includes(search.toLowerCase()) ||
        a.toLowerCase().includes(search.toLowerCase()),
    ),
  })).filter(
    (s) =>
      (activeCat === "All" || s.category === activeCat) &&
      s.questions.length > 0,
  );

  const totalQ = filtered.reduce((n, s) => n + s.questions.length, 0);
  const toggle = useCallback(
    (k) => setOpenKey((p) => (p === k ? null : k)),
    [],
  );
  const pickCat = (c) => {
    setActiveCat(c);
    setOpenKey(null);
    setSearch("");
  };

  return (
    <>
      {/* ── All styles scoped with .faq- prefix ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;0,700;1,600;1,700&family=Nunito:wght@400;500;600;700;800;900&display=swap');
 
        /* ── Keyframes ────────────────────────────────────── */
        @keyframes faq-up   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
        @keyframes faq-in   { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        @keyframes faq-orb  { 0%,100%{transform:scale(1);opacity:.35} 50%{transform:scale(1.1);opacity:.55} }
        @keyframes faq-dot  { 0%,100%{box-shadow:0 0 0 0 rgba(43,191,191,.55)} 60%{box-shadow:0 0 0 9px rgba(43,191,191,0)} }
        @keyframes faq-fab  { from{opacity:0;transform:translateY(18px) scale(.9)} to{opacity:1;transform:none} }
        @keyframes faq-shimmer {
          0%{background-position:-200% center} 100%{background-position:200% center}
        }
 
        /* ── Page Shell ───────────────────────────────────── */
        .faq-page { font-family:'Nunito',sans-serif; color:#1E2D54; background:#F4FCFC; overflow-x:hidden; }
 
        /* ── HERO ─────────────────────────────────────────── */
        .faq-hero {
          position:relative;
          background:linear-gradient(148deg,#0D1B38 0%,#1E2D54 38%,#136060 72%,#0A3C3C 100%);
          padding:clamp(72px,10vw,116px) clamp(20px,5vw,64px) clamp(80px,11vw,128px);
          text-align:center; overflow:hidden;
        }
        /* subtle dot-grid */
        .faq-hero::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image:
            radial-gradient(circle,rgba(43,191,191,.18) 1px,transparent 1px);
          background-size:38px 38px;
          mask-image:radial-gradient(ellipse 90% 90% at 50% 50%,#000 30%,transparent 100%);
        }
        .faq-hero__orb {
          position:absolute; border-radius:50%; pointer-events:none;
        }
        .faq-hero__orb--a {
          width:clamp(320px,44vw,640px); height:clamp(320px,44vw,640px);
          background:radial-gradient(circle,rgba(43,191,191,.20) 0%,transparent 68%);
          top:-120px; right:-100px;
          animation:faq-orb 6.5s ease-in-out infinite;
        }
        .faq-hero__orb--b {
          width:clamp(200px,28vw,400px); height:clamp(200px,28vw,400px);
          background:radial-gradient(circle,rgba(43,191,191,.12) 0%,transparent 68%);
          bottom:-80px; left:-80px;
          animation:faq-orb 9s ease-in-out infinite 2.5s;
        }
        .faq-hero__orb--c {
          width:180px; height:180px;
          background:radial-gradient(circle,rgba(255,255,255,.04) 0%,transparent 70%);
          top:35%; left:6%;
          animation:faq-orb 8s ease-in-out infinite 1.2s;
        }
        .faq-hero__inner { position:relative; z-index:2; max-width:700px; margin:0 auto; }
 
        /* Badge */
        .faq-hero__badge {
          display:inline-flex; align-items:center; gap:8px;
          background:rgba(43,191,191,.11);
          border:1px solid rgba(43,191,191,.3);
          color:#8FEAEA; font-size:10px; font-weight:800;
          letter-spacing:2.5px; text-transform:uppercase;
          padding:7px 20px; border-radius:100px; margin-bottom:28px;
          animation:faq-in 0.6s .1s ease both;
        }
        .faq-hero__badge-dot {
          width:6px; height:6px; border-radius:50%; background:#2BBFBF;
          flex-shrink:0; animation:faq-dot 2.2s ease-in-out infinite;
        }
 
        /* Headline */
        .faq-hero__h1 {
          font-family:'Lora',serif;
          font-size:clamp(36px,6.5vw,72px);
          font-weight:700; color:#fff; line-height:1.07;
          letter-spacing:-0.5px; margin-bottom:18px;
          animation:faq-in .75s .2s ease both;
        }
        .faq-hero__h1 em {
          font-style:italic;
          background:linear-gradient(120deg,#2BBFBF 0%,#6DE8E8 48%,#2BBFBF 100%);
          background-size:200% auto;
          -webkit-background-clip:text; -webkit-text-fill-color:transparent;
          background-clip:text;
          animation:faq-shimmer 3.5s linear infinite;
        }
 
        /* Sub */
        .faq-hero__sub {
          font-size:clamp(14px,2vw,16.5px); color:rgba(255,255,255,.54);
          max-width:480px; margin:0 auto 42px;
          line-height:1.75; font-weight:400;
          animation:faq-in .75s .34s ease both;
        }
 
        /* Search */
        .faq-search {
          position:relative; max-width:560px; margin:0 auto;
          animation:faq-in .75s .46s ease both;
        }
        .faq-search__ico {
          position:absolute; left:20px; top:50%; transform:translateY(-50%);
          color:rgba(255,255,255,.32); pointer-events:none; display:flex;
        }
        .faq-search__inp {
          width:100%;
          padding:18px 52px 18px 54px;
          border-radius:60px;
          border:1.5px solid rgba(43,191,191,.22);
          background:rgba(255,255,255,.07);
          backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
          color:#fff; font-size:14.5px;
          font-family:'Nunito',sans-serif; font-weight:600;
          outline:none; caret-color:#2BBFBF;
          transition:border-color .28s, background .28s, box-shadow .28s;
        }
        .faq-search__inp::placeholder { color:rgba(255,255,255,.27); font-weight:400; }
        .faq-search__inp:focus {
          border-color:rgba(43,191,191,.55);
          background:rgba(255,255,255,.11);
          box-shadow:0 0 0 4px rgba(43,191,191,.10), 0 10px 36px rgba(0,0,0,.22);
        }
        .faq-search__clear {
          position:absolute; right:18px; top:50%; transform:translateY(-50%);
          background:rgba(43,191,191,.22); border:none; color:#fff;
          width:28px; height:28px; border-radius:50%; cursor:pointer;
          font-size:18px; display:flex; align-items:center; justify-content:center;
          transition:background .2s, transform .18s; line-height:1;
        }
        .faq-search__clear:hover {
          background:rgba(43,191,191,.48); transform:translateY(-50%) scale(1.1);
        }
 
        /* ── STATS BAR ────────────────────────────────────── */
        .faq-stats {
          background:linear-gradient(90deg,#12203D 0%,#192C54 50%,#145555 100%);
          border-top:1px solid rgba(43,191,191,.13);
          padding:clamp(16px,3vw,24px) clamp(16px,4vw,48px);
        }
        .faq-stats__grid {
          max-width:900px; margin:0 auto;
          display:flex; gap:10px; flex-wrap:wrap; justify-content:center;
        }
        .faq-stat {
          flex:1 1 90px; min-width:80px;
          display:flex; flex-direction:column; align-items:center; gap:4px;
          padding:16px 18px;
          background:rgba(255,255,255,.055);
          border:1px solid rgba(43,191,191,.18);
          border-radius:16px;
          backdrop-filter:blur(10px);
          animation:faq-up .6s ease both;
        }
        .faq-stat__val {
          font-size:clamp(20px,3.5vw,28px); font-weight:900;
          color:#2BBFBF; line-height:1;
          font-family:'Nunito',sans-serif;
        }
        .faq-stat__lbl {
          font-size:10px; font-weight:700; letter-spacing:.8px;
          text-transform:uppercase; color:rgba(255,255,255,.44);
          font-family:'Nunito',sans-serif; text-align:center;
        }
 
        /* ── CATEGORY NAV ─────────────────────────────────── */
        .faq-cats {
          background:#fff;
          border-bottom:1px solid #E8F5F5;
          position:sticky; top:0; z-index:40;
          transition:box-shadow .3s;
        }
        .faq-cats--stuck { box-shadow:0 4px 20px rgba(30,45,84,.08); }
        .faq-cats__scroll {
          max-width:980px; margin:0 auto;
          padding:0 clamp(12px,3vw,28px);
          display:flex; gap:0; overflow-x:auto;
          scrollbar-width:none; -ms-overflow-style:none;
        }
        .faq-cats__scroll::-webkit-scrollbar { display:none; }
        .faq-cat-btn {
          flex-shrink:0; display:flex; align-items:center; gap:6px;
          padding:16px 16px; border:none; background:none;
          color:#718096; font-size:12.5px; font-weight:700;
          font-family:'Nunito',sans-serif; cursor:pointer;
          white-space:nowrap; outline:none;
          border-bottom:2.5px solid transparent;
          transition:color .22s, border-color .22s;
          position:relative;
        }
        .faq-cat-btn:hover { color:#1A9898; }
        .faq-cat-btn.on  { color:#1A9898; border-bottom-color:#2BBFBF; }
        .faq-cat-btn__ico {
          width:15px; height:15px;
          display:flex; align-items:center; color:inherit;
        }
 
        /* ── RESULT BAR ───────────────────────────────────── */
        .faq-resultbar {
          max-width:920px; margin:0 auto;
          padding:clamp(14px,3vw,24px) clamp(16px,3vw,28px) 8px;
          display:flex; align-items:center; justify-content:space-between; gap:12px;
          flex-wrap:wrap;
        }
        .faq-resultbar__left { display:flex; align-items:center; gap:10px; }
        .faq-resultbar__pill {
          display:inline-flex; align-items:center; gap:5px;
          background:linear-gradient(135deg,#E2F8F8,#C8EEEE);
          border:1px solid #A8E2E2; color:#157878;
          font-size:11.5px; font-weight:800;
          padding:5px 13px; border-radius:100px;
        }
        .faq-resultbar__txt { font-size:13px; color:#718096; font-weight:600; }
        .faq-resultbar__txt strong { color:#1A9898; }
        .faq-collapse {
          background:none; border:1.5px solid rgba(43,191,191,.3);
          color:#2BBFBF; font-size:12.5px; font-weight:700;
          font-family:'Nunito',sans-serif; cursor:pointer;
          padding:6px 16px; border-radius:100px; outline:none;
          transition:all .2s;
        }
        .faq-collapse:hover { background:rgba(43,191,191,.08); border-color:#2BBFBF; }
 
        /* ── FAQ CONTENT ──────────────────────────────────── */
        .faq-content {
          max-width:920px; margin:0 auto;
          padding:10px clamp(16px,3vw,28px) 100px;
        }
 
        /* ── SECTION ──────────────────────────────────────── */
        .faq-section { margin-bottom:50px; animation:faq-up .5s ease both; }
        .faq-section__hdr {
          display:flex; align-items:center; gap:14px; margin-bottom:20px;
        }
        .faq-section__ico {
          width:48px; height:48px; border-radius:14px; flex-shrink:0;
          background:linear-gradient(135deg,#E2F8F8,#C2EBEB);
          border:1.5px solid #A8E2E2;
          display:flex; align-items:center; justify-content:center;
          color:#157878;
          box-shadow:0 2px 10px rgba(43,191,191,.12);
        }
        .faq-section__title {
          font-family:'Lora',serif;
          font-size:clamp(18px,2.8vw,22px);
          font-weight:700; color:#1E2D54; letter-spacing:-.3px;
        }
        .faq-section__line {
          flex:1; height:1px;
          background:linear-gradient(90deg,#C2EBEB 0%,transparent 100%);
        }
        .faq-section__count {
          font-size:11px; font-weight:800; letter-spacing:.4px;
          background:linear-gradient(135deg,#E2F8F8,#C2EBEB);
          border:1px solid #A8E2E2; color:#157878;
          padding:4px 13px; border-radius:100px; flex-shrink:0;
        }
 
        /* ── ACCORDION ITEM ───────────────────────────────── */
        .faq-item {
          background:#fff;
          border:1.5px solid #E8F5F5;
          border-radius:16px; margin-bottom:10px; overflow:hidden;
          box-shadow:0 2px 12px rgba(30,45,84,.04);
          transition:border-color .25s, box-shadow .28s;
          animation:faq-up .5s ease both;
        }
        .faq-item:hover {
          border-color:rgba(43,191,191,.38);
          box-shadow:0 4px 18px rgba(43,191,191,.09);
        }
        .faq-item--open {
          border-color:#2BBFBF;
          box-shadow:0 10px 36px rgba(43,191,191,.13), 0 2px 8px rgba(43,191,191,.07);
        }
        .faq-item__btn {
          width:100%; background:none; border:none;
          padding:20px 22px; display:flex; align-items:center;
          gap:13px; cursor:pointer; text-align:left;
          font-family:'Nunito',sans-serif; outline:none;
        }
        .faq-item__dot {
          width:7px; height:7px; border-radius:50%; flex-shrink:0; margin-top:2px;
          background:#C8E8E8;
          transition:background .25s, transform .25s;
        }
        .faq-item--open .faq-item__dot {
          background:#2BBFBF; transform:scale(1.3);
        }
        .faq-item__q {
          flex:1; font-size:15px; font-weight:700; line-height:1.5;
          color:#1E2D54; transition:color .25s;
        }
        .faq-item--open .faq-item__q { color:#157878; }
        .faq-item__toggle {
          width:34px; height:34px; border-radius:10px; flex-shrink:0;
          display:flex; align-items:center; justify-content:center;
          background:#F0FAFA; color:#2BBFBF;
          transition:background .28s, color .28s, box-shadow .28s;
        }
        .faq-item--open .faq-item__toggle {
          background:linear-gradient(135deg,#2BBFBF,#1A8888);
          color:#fff;
          box-shadow:0 4px 14px rgba(43,191,191,.35);
        }
        .faq-item__body-wrap {
          overflow:hidden;
          transition:height .38s cubic-bezier(0.4,0,0.2,1);
        }
        .faq-item__body {
          padding:0 22px 22px 42px;
          border-top:1px solid #F0F8F8;
        }
        .faq-item__answer {
          margin:0; padding-top:14px;
          font-size:14.5px; color:#4A6472; line-height:1.88;
          font-weight:400;
        }
 
        /* ── EMPTY STATE ──────────────────────────────────── */
        .faq-empty {
          text-align:center;
          padding:clamp(60px,10vw,96px) 20px;
          animation:faq-up .5s ease both;
        }
        .faq-empty__ico {
          width:84px; height:84px; border-radius:50%; margin:0 auto 20px;
          background:linear-gradient(135deg,#E2F8F8,#C2EBEB);
          border:2px solid #A8E2E2;
          display:flex; align-items:center; justify-content:center;
          color:#2BBFBF;
        }
        .faq-empty h3 {
          font-family:'Lora',serif;
          font-size:clamp(20px,3.2vw,27px); color:#1E2D54; margin-bottom:10px;
        }
        .faq-empty p { font-size:14.5px; color:#718096; font-weight:500; line-height:1.65; }
 
        /* ── CTA SECTION ──────────────────────────────────── */
        .faq-cta {
          position:relative; overflow:hidden; text-align:center;
          background:linear-gradient(148deg,#0D1B38 0%,#1E2D54 42%,#145858 78%,#0A3C3C 100%);
          padding:clamp(64px,10vw,100px) clamp(20px,5vw,64px);
        }
        .faq-cta::before {
          content:''; position:absolute; inset:0; pointer-events:none;
          background-image:radial-gradient(circle,rgba(43,191,191,.12) 1px,transparent 1px);
          background-size:40px 40px;
          mask-image:radial-gradient(ellipse 80% 80% at 50% 50%,#000 20%,transparent 100%);
        }
        .faq-cta__orb {
          position:absolute; border-radius:50%; pointer-events:none;
        }
        .faq-cta__orb--a {
          width:clamp(280px,36vw,520px); height:clamp(280px,36vw,520px);
          background:radial-gradient(circle,rgba(43,191,191,.17) 0%,transparent 68%);
          top:-100px; right:-100px;
          animation:faq-orb 7s ease-in-out infinite;
        }
        .faq-cta__orb--b {
          width:clamp(200px,28vw,380px); height:clamp(200px,28vw,380px);
          background:radial-gradient(circle,rgba(43,191,191,.11) 0%,transparent 68%);
          bottom:-80px; left:-80px;
          animation:faq-orb 9s ease-in-out infinite 3s;
        }
        .faq-cta__inner { position:relative; z-index:2; max-width:600px; margin:0 auto; }
        .faq-cta__tag {
          display:inline-block;
          background:rgba(43,191,191,.13); border:1px solid rgba(43,191,191,.28);
          color:#8FEAEA; font-size:10px; font-weight:800;
          letter-spacing:2.5px; text-transform:uppercase;
          padding:7px 20px; border-radius:100px; margin-bottom:22px;
        }
        .faq-cta h2 {
          font-family:'Lora',serif;
          font-size:clamp(28px,5vw,52px);
          font-weight:700; color:#fff;
          line-height:1.1; letter-spacing:-.5px; margin-bottom:16px;
        }
        .faq-cta h2 em { font-style:italic; color:#2BBFBF; }
        .faq-cta__sub {
          color:rgba(255,255,255,.52); font-size:clamp(14px,2vw,15.5px);
          line-height:1.75; margin-bottom:38px; font-weight:400;
        }
        .faq-cta__btns {
          display:flex; flex-wrap:wrap; gap:12px; justify-content:center;
        }
        .faq-btn {
          display:inline-flex; align-items:center; justify-content:center;
          gap:8px; padding:14px 28px; border-radius:60px;
          font-size:14px; font-weight:800;
          font-family:'Nunito',sans-serif; text-decoration:none;
          border:none; cursor:pointer; letter-spacing:.2px;
          transition:transform .22s cubic-bezier(.34,1.56,.64,1), box-shadow .22s;
        }
        .faq-btn:hover { transform:translateY(-3px); }
        .faq-btn--primary {
          background:linear-gradient(135deg,#2BBFBF,#178888);
          color:#fff; box-shadow:0 6px 22px rgba(43,191,191,.42);
        }
        .faq-btn--primary:hover { box-shadow:0 12px 34px rgba(43,191,191,.54); }
        .faq-btn--ghost {
          background:rgba(255,255,255,.07); color:rgba(255,255,255,.88);
          border:1.5px solid rgba(255,255,255,.18);
          backdrop-filter:blur(8px);
        }
        .faq-btn--ghost:hover { background:rgba(255,255,255,.13); border-color:rgba(255,255,255,.3); }
 
        /* ── FLOATING CALL FAB ────────────────────────────── */
        .faq-fab {
          position:fixed;
          bottom:clamp(22px,4vw,32px);
          right:clamp(16px,4vw,28px);
          z-index:200;
          display:flex; align-items:center; gap:10px;
          background:linear-gradient(135deg,#2BBFBF,#178888);
          color:#fff; font-family:'Nunito',sans-serif;
          font-weight:800; font-size:13.5px;
          padding:13px 22px 13px 16px;
          border-radius:60px; text-decoration:none;
          box-shadow:0 8px 28px rgba(43,191,191,.48), 0 2px 8px rgba(0,0,0,.14);
          transition:transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s;
          animation:faq-fab .55s .9s ease both;
        }
        .faq-fab:hover {
          transform:translateY(-4px) scale(1.04);
          box-shadow:0 16px 44px rgba(43,191,191,.6), 0 4px 12px rgba(0,0,0,.16);
        }
        .faq-fab__ring {
          width:28px; height:28px; border-radius:50%;
          background:rgba(255,255,255,.18);
          display:flex; align-items:center; justify-content:center;
        }
 
        /* ── RESPONSIVE ───────────────────────────────────── */
        @media (max-width:768px) {
          .faq-section__line { display:none; }
          .faq-cta__btns { gap:10px; }
          .faq-btn { padding:13px 22px; font-size:13px; }
          .faq-item__body { padding-left:26px; }
        }
        @media (max-width:480px) {
          .faq-fab { font-size:0; padding:16px; border-radius:50%; }
          .faq-resultbar { flex-direction:column; align-items:flex-start; }
        }
      `}</style>

      <Navbar />

      <div className="faq-page">
        {/* ══════════ HERO ══════════ */}
        <section className="faq-hero">
          <div className="faq-hero__orb faq-hero__orb--a" />
          <div className="faq-hero__orb faq-hero__orb--b" />
          <div className="faq-hero__orb faq-hero__orb--c" />

          <div className="faq-hero__inner">
            <div className="faq-hero__badge">
              <span className="faq-hero__badge-dot" />
              Trinay Hospital · Help Centre
            </div>

            <h1 className="faq-hero__h1">
              Frequently
              <br />
              <em>Asked Questions</em>
            </h1>

            <p className="faq-hero__sub">
              Everything you need to know about appointments, emergency care,
              departments, government schemes, and more — answered clearly.
            </p>

            <div className="faq-search">
              <span className="faq-search__ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 18, height: 18 }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                ref={searchRef}
                className="faq-search__inp"
                type="text"
                placeholder="Search — 'ICU', 'Ayushman', 'heart surgery', 'appointment'…"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setActiveCat("All");
                }}
                aria-label="Search FAQs"
              />
              {search && (
                <button
                  className="faq-search__clear"
                  aria-label="Clear"
                  onClick={() => {
                    setSearch("");
                    searchRef.current?.focus();
                  }}
                >
                  ×
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ══════════ STATS ══════════ */}
        <div className="faq-stats">
          <div className="faq-stats__grid">
            {STATS.map((s, i) => (
              <div
                className="faq-stat"
                key={s.l}
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                <span className="faq-stat__val">{s.v}</span>
                <span className="faq-stat__lbl">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ══════════ CATEGORY TABS ══════════ */}
        {!search && (
          <nav
            className={`faq-cats${stuck ? " faq-cats--stuck" : ""}`}
            aria-label="FAQ Categories"
          >
            <div className="faq-cats__scroll">
              {allCats.map((cat) => {
                const sec = FAQ_DATA.find((f) => f.category === cat);
                return (
                  <button
                    key={cat}
                    className={`faq-cat-btn${activeCat === cat ? " on" : ""}`}
                    onClick={() => pickCat(cat)}
                    aria-pressed={activeCat === cat}
                  >
                    {sec && (
                      <span className="faq-cat-btn__ico">{sec.icon}</span>
                    )}
                    {cat}
                  </button>
                );
              })}
            </div>
          </nav>
        )}

        {/* ══════════ RESULT BAR ══════════ */}
        <div className="faq-resultbar">
          <div className="faq-resultbar__left">
            <span className="faq-resultbar__pill">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ width: 11, height: 11 }}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4l2 2" />
              </svg>
              {totalQ} Q&amp;A
            </span>
            {search && (
              <span className="faq-resultbar__txt">
                for "<strong>{search}</strong>"
              </span>
            )}
          </div>
          {openKey && (
            <button className="faq-collapse" onClick={() => setOpenKey(null)}>
              Collapse all
            </button>
          )}
        </div>

        {/* ══════════ ACCORDION ══════════ */}
        <main className="faq-content">
          {filtered.length === 0 ? (
            <div className="faq-empty">
              <div className="faq-empty__ico">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 38, height: 38 }}
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  <line x1="8" y1="11" x2="14" y2="11" />
                </svg>
              </div>
              <h3>No results found</h3>
              <p>
                Try different keywords, or call us at{" "}
                <a
                  href="tel:+919119191622"
                  style={{
                    color: "#1A9898",
                    fontWeight: 800,
                    textDecoration: "none",
                  }}
                >
                  +91 91191 91622
                </a>{" "}
                — we're happy to help!
              </p>
            </div>
          ) : (
            filtered.map((section, si) => (
              <section
                className="faq-section"
                key={section.category}
                style={{ animationDelay: `${si * 0.07}s` }}
              >
                <div className="faq-section__hdr">
                  <div className="faq-section__ico">{section.icon}</div>
                  <h2 className="faq-section__title">{section.category}</h2>
                  <div className="faq-section__line" />
                  <span className="faq-section__count">
                    {section.questions.length} Questions
                  </span>
                </div>
                {section.questions.map(({ q, a }, qi) => {
                  const key = `${section.category}__${qi}`;
                  return (
                    <AccordionItem
                      key={key}
                      question={q}
                      answer={a}
                      isOpen={openKey === key}
                      onClick={() => toggle(key)}
                      index={qi}
                    />
                  );
                })}
              </section>
            ))
          )}
        </main>

        {/* ══════════ CTA ══════════ */}
        <section className="faq-cta">
          <div className="faq-cta__orb faq-cta__orb--a" />
          <div className="faq-cta__orb faq-cta__orb--b" />
          <div className="faq-cta__inner">
            <div className="faq-cta__tag">Still have questions?</div>
            <h2>
              We're here for you,
              <br />
              <em>always.</em>
            </h2>
            <p className="faq-cta__sub">
              Our care team is available 24 hours a day, 7 days a week. Reach us
              via call, WhatsApp, email, or visit our website.
            </p>
            <div className="faq-cta__btns">
              <a className="faq-btn faq-btn--primary" href="tel:+919119191622">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 16, height: 16 }}
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 6 6l.46-.45a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
                </svg>
                Call Now
              </a>
              <a
                className="faq-btn faq-btn--ghost"
                href="https://wa.me/919119191722"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ width: 16, height: 16 }}
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                WhatsApp
              </a>
              <a
                className="faq-btn faq-btn--ghost"
                href="mailto:info@trinay.in"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 16, height: 16 }}
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Email Us
              </a>
              <a
                className="faq-btn faq-btn--ghost"
                href="https://trinay.in"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ width: 16, height: 16 }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Website
              </a>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* Floating Call Button */}
      <a
        className="faq-fab"
        href="tel:+919119191622"
        aria-label="Call Trinay Hospital"
      >
        <span className="faq-fab__ring">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: 15, height: 15 }}
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.63a16 16 0 0 0 6 6l.46-.45a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16.92z" />
          </svg>
        </span>
        <span>Call Now</span>
      </a>
    </>
  );
}
