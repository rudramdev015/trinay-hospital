import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight, ArrowLeft, CheckCircle2, Users,
    Clock, GraduationCap, Star, BadgeCheck, PhoneCall, Stethoscope,
} from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { DOCTORS } from "../data/doctorsData";

import imgAnaesthesia  from "../assets/images/anesthesiology.png";
import imgCardiology   from "../assets/images/emergency-care.jpg";
import imgSurgery      from "../assets/images/laparoscopic surgery.webp";
import imgNeuro        from "../assets/images/neurosurgery.jpg";
import imgGynae        from "../assets/images/gynaecology.webp";
import imgOrtho        from "../assets/images/orthopedic and joint replacement surgery.png";
import imgPhysio       from "../assets/images/physiotherapy.jpg";
import imgRadiology    from "../assets/images/radiology.jpg";
import imgUrology      from "../assets/images/urology.png";
import imgGenMed       from "../assets/images/general medicin.png";
import imgDietetics    from "../assets/images/diabetics.png";
import imgDentistry    from "../assets/images/treatment-tech.jpg";
import imgOncology     from "../assets/images/critical care.jpg";
import imgEnt          from "../assets/images/ent.jpg";
import imgPlastic      from "../assets/images/Plastic-surgery.jpg";
import imgRespiratory  from "../assets/images/Pulmonology.jpg";
import imgPaediatrics  from "../assets/images/PAEDIATRICS.png";

const DEPT_DATA = {
    "anaesthesiology-critical-care": {
        name: "Anaesthesiology & Critical Care",
        dept: "ANAESTHESIA & CRITICAL CARE",
        tagline: "Safe, Precise, Compassionate Perioperative Care",
        description: "The Department of Anaesthesiology and Critical Care at Trinay Hospital provides comprehensive anaesthetic services across all surgical specialties. Our expert team ensures the highest standards of patient safety from pre-operative assessment through post-operative recovery. The Critical Care Unit delivers advanced life support and round-the-clock monitoring for seriously ill patients, combining clinical expertise with compassionate care.",
        image: imgAnaesthesia,
        conditions: ["General Anaesthesia", "Regional & Spinal Anaesthesia", "Epidural Anaesthesia", "Acute Pain Management", "ICU & Critical Care", "Paediatric Anaesthesia", "Obstetric Anaesthesia", "Post-Operative Pain"],
        procedures: ["General Anaesthesia", "Spinal Block", "Epidural Analgesia", "Nerve Blocks", "IV Sedation", "Airway Management", "Mechanical Ventilation", "Haemodynamic Monitoring"],
        highlights: ["24/7 ICU Monitoring", "Dedicated Critical Care Specialists", "Paediatric-Safe Protocols", "Post-Op Pain Management Unit"],
    },
    "cardiology": {
        name: "Cardiology",
        dept: "CARDIOLOGY",
        tagline: "Advanced Heart Care for Every Beat",
        description: "Trinay Hospital's Cardiology Department is led by a team of experienced interventional cardiologists who provide comprehensive cardiac care — from prevention and early diagnosis to complex interventional procedures. We combine state-of-the-art technology with a patient-centred approach to treat the full spectrum of heart conditions, ensuring the best possible outcomes for our patients.",
        image: imgCardiology,
        conditions: ["Coronary Artery Disease", "Heart Failure", "Arrhythmia & Palpitations", "Hypertension", "Valvular Heart Disease", "Cardiomyopathy", "Peripheral Vascular Disease", "Angina"],
        procedures: ["Coronary Angiography", "Angioplasty & Stenting", "2D Echocardiography", "ECG & Holter Monitoring", "Stress Test (TMT)", "Pacemaker Implant", "Cardiac Rehabilitation", "Lipid Management"],
        highlights: ["Cath Lab with Latest Technology", "Primary Angioplasty 24/7", "Preventive Cardiology Clinics", "Cardiac Rehabilitation Programme"],
    },
    "general-surgery": {
        name: "General Surgery",
        dept: "GENERAL SURGERY",
        tagline: "Surgical Excellence — Minimally Invasive, Maximum Recovery",
        description: "The General Surgery department at Trinay Hospital is home to one of the most experienced surgical teams in Rajasthan. Led by a surgeon with over 46 years of operative experience and international credentials (FACS, FRCS), our team specialises in laparoscopic and open surgical procedures for abdominal, thyroid, hernia, and emergency conditions — delivering superior outcomes with minimal recovery time.",
        image: imgSurgery,
        conditions: ["Hernia", "Appendicitis", "Gallbladder Disease", "Thyroid Disease", "Breast Disease", "Colorectal Conditions", "Acute Abdomen", "Liver & Pancreatic Disease"],
        procedures: ["Laparoscopic Cholecystectomy", "Appendectomy", "Hernia Repair", "Thyroidectomy", "Mastectomy", "Colectomy", "Emergency Laparotomy", "Laparoscopic Surgery"],
        highlights: ["46-Year Surgical Expertise", "FACS & FRCS Certified Surgeon", "Laparoscopic & Open Surgery", "Emergency Surgery 24/7"],
    },
    "neurosurgery": {
        name: "Neurosurgery",
        dept: "NEUROSURGEON",
        tagline: "Precision Surgery for Brain & Spine",
        description: "The Neurosurgery Department at Trinay Hospital offers highly specialised surgical care for conditions affecting the brain, spinal cord, and peripheral nervous system. Our neurosurgeon brings 20 years of expertise in microsurgical and endoscopic techniques, treating complex brain tumours, spinal disorders, head injuries, and cerebrovascular disease with precision and compassion.",
        image: imgNeuro,
        conditions: ["Brain Tumours", "Spinal Disc Prolapse", "Head Injuries", "Hydrocephalus", "Cerebrovascular Disease", "Spinal Fractures", "Peripheral Nerve Injury", "Spinal Cord Injury"],
        procedures: ["Craniotomy", "Microdiscectomy", "Laminectomy", "Spine Fusion", "Shunt Surgery", "Peripheral Nerve Surgery", "Stereotactic Procedures", "Endoscopic Neurosurgery"],
        highlights: ["MCh Neurosurgery (NIMHANS)", "Microsurgical Techniques", "Spine Surgery Excellence", "Neuro-Oncology Care"],
    },
    "obs-gynae": {
        name: "Gynaecology & Obstetrics",
        dept: "OBS. & GYNAE.",
        tagline: "Comprehensive Women's Health Across Every Stage",
        description: "Trinay Hospital's Obstetrics and Gynaecology department is helmed by two of Jodhpur's most trusted senior gynaecologists with a combined experience of over 83 years. Our team provides the full spectrum of women's healthcare — from normal delivery and high-risk pregnancies to laparoscopic gynaecological surgeries, infertility workup, and adolescent health — in a supportive and compassionate environment.",
        image: imgGynae,
        conditions: ["High-Risk Pregnancy", "PCOS / PCOD", "Endometriosis", "Uterine Fibroids", "Infertility", "Menstrual Disorders", "Menopause", "Cervical Cancer Screening"],
        procedures: ["Normal Delivery", "Caesarean Section", "Laparoscopic Hysterectomy", "Hysteroscopy", "IVF Workup", "Colposcopy", "Tubal Ligation", "Ovarian Cyst Surgery"],
        highlights: ["80+ Years Combined Experience", "High-Risk Pregnancy Unit", "Laparoscopic Gynaecology", "Adolescent & Menopause Clinics"],
    },
    "orthopaedics": {
        name: "Orthopaedics",
        dept: "ORTHOPAEDICS",
        tagline: "Restoring Mobility, Eliminating Pain",
        description: "The Orthopaedics department at Trinay Hospital provides comprehensive bone, joint, and musculoskeletal care. Our specialist brings 17 years of expertise in joint replacement, trauma surgery, and sports medicine. Using computer-assisted techniques and minimally invasive approaches, we help patients regain mobility and live pain-free lives — from fracture management to total knee and hip replacements.",
        image: imgOrtho,
        conditions: ["Osteoarthritis", "Rheumatoid Arthritis", "Fractures & Trauma", "Sports Injuries", "Back & Neck Pain", "Scoliosis", "Bone Tumours", "Paediatric Orthopaedics"],
        procedures: ["Total Knee Replacement", "Total Hip Replacement", "Fracture Fixation", "Arthroscopy", "ACL Reconstruction", "Spine Surgery", "Meniscus Repair", "Shoulder Surgery"],
        highlights: ["Computer-Assisted Replacement", "Fellowship in Joint Replacement", "Sports Injury Clinic", "Paediatric Orthopaedics"],
    },
    "physiotherapy": {
        name: "Physiotherapy",
        dept: "PHYSIOTHERAPIST",
        tagline: "Restoring Function Through Evidence-Based Rehabilitation",
        description: "The Physiotherapy Department at Trinay Hospital provides personalised, evidence-based rehabilitation programmes to restore mobility, reduce pain, and improve quality of life. Our experienced physiotherapist with 15 years of expertise designs customised treatment plans for post-surgical recovery, neurological conditions, sports injuries, and chronic pain — helping patients return to their daily activities safely and effectively.",
        image: imgPhysio,
        conditions: ["Post-Surgical Rehabilitation", "Back & Neck Pain", "Sports Injuries", "Neurological Conditions", "Stroke Recovery", "Respiratory Conditions", "Paediatric Physiotherapy", "Elderly Rehabilitation"],
        procedures: ["Manual Therapy", "Electrotherapy", "Exercise Therapy", "Chest Physiotherapy", "Neuro-Rehabilitation", "Sports Rehab", "Postural Correction", "Hydrotherapy"],
        highlights: ["MPT Certified Physiotherapist", "Post-Surgical Recovery Protocols", "Neurological Rehabilitation", "Paediatric Physiotherapy"],
    },
    "radiology": {
        name: "Radiology & Imaging",
        dept: "RADIOLOGY",
        tagline: "Accurate Diagnosis Through Advanced Imaging",
        description: "The Radiology and Imaging Department at Trinay Hospital provides comprehensive diagnostic imaging services with rapid turnaround. Our team of experienced radiologists brings expertise in cross-sectional imaging, women's imaging, and interventional radiology. From routine X-rays to complex CT and MRI studies, we provide precise reports that drive accurate clinical decision-making across all departments.",
        image: imgRadiology,
        conditions: ["Oncology Imaging", "Neurological Imaging", "Cardiac Imaging", "Musculoskeletal Imaging", "Women's Imaging", "Vascular Studies", "Abdominal Imaging", "Paediatric Imaging"],
        procedures: ["CT Scan", "MRI", "Ultrasound & Doppler", "X-Ray", "Mammography", "Fluoroscopy", "Image-Guided Biopsy", "Interventional Radiology"],
        highlights: ["High-Res CT & MRI Equipment", "Same-Day Reports", "Interventional Radiology", "Women's Imaging Expertise"],
    },
    "urology": {
        name: "Urology",
        dept: "UROLOGIST",
        tagline: "Expert Urological Care — Minimally Invasive, Maximum Precision",
        description: "The Urology department at Trinay Hospital provides state-of-the-art care for the full spectrum of urological conditions. Our MCh-trained urologist brings expertise in endoscopic, laparoscopic, and robotic urology, treating kidney stones, prostate disease, bladder disorders, and male reproductive health with minimally invasive techniques for faster recovery and better outcomes.",
        image: imgUrology,
        conditions: ["Kidney Stones", "Benign Prostatic Hyperplasia (BPH)", "Prostate Cancer", "Bladder Cancer", "Urinary Tract Infections", "Urinary Incontinence", "Male Infertility", "Stricture Urethra"],
        procedures: ["PCNL (Kidney Stone Surgery)", "ESWL (Lithotripsy)", "TURP", "Laser Prostatectomy", "Cystoscopy", "Laparoscopic Urology", "URS (Ureteroscopy)", "Male Reproductive Surgery"],
        highlights: ["MCh Urology (PGI Chandigarh)", "PCNL & Laser Stone Surgery", "Laparoscopic Urology", "Male Health Clinic"],
    },
    "general-medicine": {
        name: "General Medicine",
        dept: "GENERAL MEDICINE",
        tagline: "Comprehensive Primary & Internal Medicine Care",
        description: "The General Medicine department at Trinay Hospital is led by one of Jodhpur's most experienced internists with 26 years of practice. Our team provides thorough clinical assessment and evidence-based management of a wide range of medical conditions — from diabetes and hypertension to complex multi-system diseases. We are committed to preventive care, early diagnosis, and personalised treatment for every patient.",
        image: imgGenMed,
        conditions: ["Diabetes Mellitus", "Hypertension", "Thyroid Disorders", "Respiratory Infections", "Fever Workup", "Anaemia", "Infectious Diseases", "Chronic Disease Management"],
        procedures: ["Comprehensive Health Assessment", "Diabetic Management Protocol", "Hypertension Management", "Infectious Disease Workup", "ECG & Basic Investigations", "Preventive Health Screening", "IV Infusion Therapy", "Health Packages"],
        highlights: ["26 Years Clinical Experience", "API Fellow Physician", "Diabetic & Hypertension Clinics", "Multi-System Disease Management"],
    },
    "dietetics": {
        name: "Dietetics & Nutrition",
        dept: "DIETETICS",
        tagline: "Food as Medicine — Personalised Nutrition for Every Condition",
        description: "The Dietetics and Clinical Nutrition department at Trinay Hospital is led by Ms. Kuldeep Kaur, a qualified clinical dietitian with 12 years of experience. She creates evidence-based, personalised nutrition plans for patients across all departments — from diabetics and cardiac patients to post-surgical recovery and oncology. Ms. Kaur believes in the transformative power of nutrition in the healing process.",
        image: imgDietetics,
        conditions: ["Diabetes & Prediabetes", "Obesity & Weight Management", "Cardiac Conditions", "Renal Disease", "Oncology Diet Support", "Post-Surgery Nutrition", "Paediatric Nutrition", "Eating Disorders"],
        procedures: ["Nutritional Assessment", "Personalised Diet Planning", "Medical Nutrition Therapy", "Weight Management Programme", "Diabetes Meal Planning", "Renal Diet Counselling", "Pre & Post-Op Nutrition", "Sports Nutrition Advice"],
        highlights: ["Registered Dietitian (IDA)", "Certified Diabetes Educator", "Cross-Departmental Nutrition Support", "Personalised Diet Plans"],
    },
    "dentistry": {
        name: "Dentistry",
        dept: "DENTISTRY",
        tagline: "Complete Dental Care — Restore Your Smile, Restore Your Confidence",
        description: "Trinay Hospital's Dentistry department provides comprehensive dental and oral surgical services led by an experienced MDS specialist in oral and maxillofacial surgery. From routine cleanings and fillings to complex dental implants and cosmetic procedures, our team delivers exceptional dental care combining clinical excellence with a gentle, patient-friendly approach.",
        image: imgDentistry,
        conditions: ["Tooth Decay & Cavities", "Gum Disease (Periodontitis)", "Missing Teeth", "Malocclusion", "Oral Cancer Screening", "TMJ Disorders", "Impacted Wisdom Teeth", "Dental Pain"],
        procedures: ["Dental Implants", "Root Canal Treatment", "Dental Crowns & Bridges", "Orthodontics & Braces", "Tooth Extraction", "Periodontal Treatment", "Teeth Whitening", "Oral Surgery"],
        highlights: ["MDS Oral & Maxillofacial Surgery", "Dental Implant Specialist", "Cosmetic Dentistry", "Paediatric Dentistry"],
    },
    "surgical-oncology": {
        name: "Surgical Oncology",
        dept: "SURGICAL ONCOLOGY",
        tagline: "Advanced Cancer Surgery — Closer to Home",
        description: "The Surgical Oncology department at Trinay Hospital brings high-quality cancer surgery to Jodhpur, eliminating the need to travel to larger cities. Led by an MCh-trained oncosurgeon from Tata Memorial Hospital Mumbai, our department employs oncoplastic and minimally invasive techniques to ensure complete tumour removal while preserving organ function and quality of life.",
        image: imgOncology,
        conditions: ["Breast Cancer", "Colon & Rectal Cancer", "Stomach Cancer", "Thyroid Cancer", "Soft Tissue Sarcoma", "Skin Cancer", "Lymphoma", "Head & Neck Cancers"],
        procedures: ["Mastectomy & Lumpectomy", "GI Cancer Surgery", "Thyroid Cancer Surgery", "Laparoscopic Oncosurgery", "Sentinel Node Biopsy", "Neck Dissection", "Soft Tissue Sarcoma Resection", "Palliative Surgery"],
        highlights: ["Tata Memorial Hospital Training", "MCh Surgical Oncology", "Minimally Invasive Cancer Surgery", "Multidisciplinary Tumour Board"],
    },
    "ent": {
        name: "ENT — Ear, Nose & Throat",
        dept: "ENT",
        tagline: "Hear Better, Breathe Better, Feel Better",
        description: "The ENT Department at Trinay Hospital provides expert surgical and medical management of ear, nose, and throat conditions for patients of all ages. Our experienced ENT surgeon trained at Medanta The Medicity specialises in functional endoscopic sinus surgery (FESS), micro-ear surgery, and neck surgery — helping patients breathe, hear, and speak better with minimally invasive approaches.",
        image: imgEnt,
        conditions: ["Sinusitis & Nasal Polyps", "Tonsillitis", "Hearing Loss", "Vertigo & Dizziness", "Snoring & Sleep Apnoea", "Laryngitis & Voice Problems", "Neck Masses", "Ear Infections"],
        procedures: ["FESS (Sinus Surgery)", "Tonsillectomy & Adenoidectomy", "Septoplasty", "Myringoplasty (Ear Drum Repair)", "Micro-Ear Surgery", "Cochlear Implant Workup", "Neck Dissection", "Voice Surgery"],
        highlights: ["Fellowship in Rhinology (Medanta)", "FESS Specialist", "Micro-Ear Surgery", "Paediatric ENT Care"],
    },
    "plastic-cosmetic-surgery": {
        name: "Plastic & Cosmetic Surgery",
        dept: "PLASTIC & COSMETIC SURGERY",
        tagline: "Restoring Form, Renewing Confidence",
        description: "The Plastic and Cosmetic Surgery department at Trinay Hospital combines surgical precision with an artistic eye to deliver natural, life-enhancing results. Our MCh-trained plastic surgeon with 21 years of experience and training from AIIMS New Delhi specialises in reconstructive surgery after trauma or cancer, as well as cosmetic procedures that restore confidence and improve quality of life.",
        image: imgPlastic,
        conditions: ["Burns & Burn Reconstruction", "Cleft Lip & Palate", "Post-Cancer Reconstruction", "Skin Conditions & Scars", "Hand Injuries", "Cosmetic Concerns", "Congenital Anomalies", "Trauma Reconstruction"],
        procedures: ["Rhinoplasty (Nose Surgery)", "Face Lift & Blepharoplasty", "Liposuction & Body Contouring", "Breast Augmentation", "Burn Reconstruction & Skin Grafting", "Cleft Lip & Palate Repair", "Scar Revision", "Hand Surgery"],
        highlights: ["MCh Plastic Surgery (AIIMS Delhi)", "21 Years Experience", "Burn Reconstruction Excellence", "Cleft Lip & Palate Programme"],
    },
    "respiratory-medicine": {
        name: "Respiratory Medicine",
        dept: "RESPIRATORY MEDICINE",
        tagline: "Breathe Easier With Expert Lung Care",
        description: "The Respiratory Medicine department at Trinay Hospital provides comprehensive diagnosis and management of all lung and respiratory conditions. Our pulmonologist specialises in asthma, COPD, sleep-related breathing disorders, and interstitial lung disease using modern diagnostic tools and evidence-based treatment protocols — helping patients of all age groups breathe better and live healthier lives.",
        image: imgRespiratory,
        conditions: ["Asthma", "COPD", "Pneumonia & Lung Infections", "Tuberculosis", "Sleep Apnoea", "Interstitial Lung Disease", "Pulmonary Hypertension", "Pleural Disease"],
        procedures: ["Spirometry / Pulmonary Function Tests (PFT)", "Bronchoscopy", "CPAP / BiPAP Therapy", "Nebulisation Therapy", "High-Flow Oxygen Therapy", "Pleural Tap", "Induced Sputum", "Chest Physiotherapy"],
        highlights: ["Pulmonology & Sleep Apnoea Clinic", "Bronchoscopy Suite", "CPAP/BiPAP Therapy", "Asthma & COPD Management"],
    },
    "paediatrics": {
        name: "Paediatrics",
        dept: "PAEDIATRICS",
        tagline: "Dedicated Child Healthcare — From Newborn to Adolescent",
        description: "The Paediatrics department at Trinay Hospital is led by a legendary paediatrician with 42 years of dedicated service to children's health in Jodhpur. Generations of families have trusted our team for newborn care, childhood illnesses, growth and developmental assessments, and adolescent health. Our gentle, child-friendly environment ensures that every young patient receives the best possible care with warmth and compassion.",
        image: imgPaediatrics,
        conditions: ["Newborn & Neonatal Care", "Childhood Infections & Fever", "Growth & Developmental Delays", "Childhood Asthma", "Malnutrition", "Childhood Diabetes", "Adolescent Health", "Paediatric Emergencies"],
        procedures: ["Newborn Screening", "Vaccination Programme", "Growth & Developmental Assessment", "Paediatric Emergency Care", "Nutritional Assessment", "Childhood Asthma Management", "Blood Tests & Investigations", "IV Fluid Therapy"],
        highlights: ["42 Years Paediatric Experience", "IAP Fellow Paediatrician", "Newborn & NICU Care", "Childhood Vaccination Programme"],
    },
};

const DoctorMiniCard = ({ doc }) => (
    <Link
        to={`/doctors/${doc.slug}`}
        className="group flex items-center gap-3 bg-white rounded-2xl p-3.5 border border-slate-100 shadow-sm hover:shadow-lg hover:border-[#003366]/20 transition-all duration-300"
    >
        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-linear-to-br from-[#003366] to-[#006fa3]">
            <img
                src={doc.avatar}
                alt={doc.nameTitled}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
            />
        </div>
        <div className="flex-1 min-w-0">
            <p className="font-black text-[#003366] text-sm leading-tight truncate">{doc.nameTitled}</p>
            <p className="text-[11px] text-[#006fa3] font-semibold mt-0.5 truncate">{doc.designation}</p>
            <p className="text-[11px] text-slate-400 mt-0.5 flex items-center gap-1 truncate">
                <Clock size={9} className="shrink-0" /> {doc.timing}
            </p>
        </div>
        <ArrowRight size={13} className="text-slate-300 group-hover:text-[#003366] transition-colors shrink-0" />
    </Link>
);

const DepartmentDetail = () => {
    const { slug } = useParams();
    const data = DEPT_DATA[slug];
    const deptDoctors = DOCTORS.filter(d => data && d.dept === data.dept);

    if (!data) {
        return (
            <div className="min-h-screen flex flex-col bg-white">
                <Navbar />
                <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-24">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Stethoscope size={32} className="text-[#003366]" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-[#003366] mb-3">Department Not Found</h1>
                    <p className="text-slate-500 mb-8 max-w-sm">This department page doesn't exist yet. Browse all our specialties below.</p>
                    <Link to="/services" className="inline-flex items-center gap-2 bg-[#003366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#006fa3] transition-colors">
                        <ArrowLeft size={16} /> Browse All Departments
                    </Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            <Navbar />

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section className="relative h-[55vh] min-h-[360px] max-h-[580px] overflow-hidden">
                <img
                    src={data.image}
                    alt={data.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="eager"
                />
                <div className="absolute inset-0 bg-linear-to-r from-[#001d3d]/92 via-[#003366]/75 to-[#003366]/30" />
                <div className="absolute inset-0 bg-linear-to-t from-[#001d3d]/70 via-transparent to-transparent" />

                <div className="relative h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-end pb-10 sm:pb-14">
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Link
                            to="/services"
                            className="inline-flex items-center gap-1.5 text-white/55 hover:text-white text-[11px] font-bold uppercase tracking-widest mb-4 transition-colors"
                        >
                            <ArrowLeft size={13} /> All Departments
                        </Link>
                        <p className="text-cyan-400 text-xs sm:text-sm font-bold uppercase tracking-[0.22em] mb-2">Trinay Hospital · Jodhpur</p>
                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-2">{data.name}</h1>
                        <p className="text-white/65 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed">{data.tagline}</p>
                    </motion.div>
                </div>
            </section>

            {/* ── HIGHLIGHTS STRIP (department-specific, not generic counts) ── */}
            <div className="bg-[#003366]">
                <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-4 sm:py-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                        {data.highlights.map((h) => (
                            <div
                                key={h}
                                className="flex items-center gap-2.5 bg-white/8 hover:bg-white/12 border border-white/10 rounded-xl px-3.5 py-3 transition-colors"
                            >
                                <BadgeCheck size={15} className="text-cyan-400 shrink-0" />
                                <span className="text-[13px] font-semibold text-white/90 leading-snug">{h}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── MAIN CONTENT ─────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20">
                <div className="grid lg:grid-cols-3 gap-10 lg:gap-14 xl:gap-20">

                    {/* ── LEFT COLUMN ──────────────────────────────────────── */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* About */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
                            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#006fa3]">About</span>
                            <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-[#003366] mt-1.5 mb-4">About the Department</h2>
                            <div className="w-10 h-1 bg-[#006fa3] rounded-full mb-5" />
                            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">{data.description}</p>
                        </motion.div>

                        {/* Conditions Treated */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}>
                            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#006fa3]">We Treat</span>
                            <h2 className="text-xl sm:text-2xl font-black text-[#003366] mt-1.5 mb-5">Conditions Treated</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                                {data.conditions.map((c) => (
                                    <div key={c} className="flex items-start gap-3 bg-blue-50/60 rounded-xl px-3.5 py-3 border border-blue-100/60">
                                        <CheckCircle2 size={15} className="text-[#006fa3] shrink-0 mt-0.5" />
                                        <span className="text-sm font-medium text-slate-700">{c}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Procedures & Services */}
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.15 }}>
                            <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#006fa3]">Services</span>
                            <h2 className="text-xl sm:text-2xl font-black text-[#003366] mt-1.5 mb-5">Procedures & Services</h2>
                            <div className="flex flex-wrap gap-2">
                                {data.procedures.map((p) => (
                                    <span
                                        key={p}
                                        className="px-3.5 py-2 bg-white border-2 border-[#003366]/12 text-[#003366] text-xs font-bold rounded-xl shadow-sm hover:border-[#003366]/40 hover:bg-blue-50 transition-all"
                                    >
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Doctors — visible on mobile/tablet, hidden on desktop (shown in sidebar) */}
                        {deptDoctors.length > 0 && (
                            <motion.div
                                className="lg:hidden"
                                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                            >
                                <span className="text-[11px] font-black uppercase tracking-[0.22em] text-[#006fa3]">Team</span>
                                <h2 className="text-xl sm:text-2xl font-black text-[#003366] mt-1.5 mb-5 flex items-center gap-2">
                                    <Users size={20} /> Our Specialists
                                </h2>
                                <div className="grid sm:grid-cols-2 gap-3">
                                    {deptDoctors.map(doc => (
                                        <DoctorMiniCard key={doc.id} doc={doc} />
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* ── RIGHT SIDEBAR ─────────────────────────────────────── */}
                    <div className="space-y-6">

                        {/* Our Specialists — desktop only (mobile shown above) */}
                        {deptDoctors.length > 0 && (
                            <motion.div
                                className="hidden lg:block"
                                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-lg font-black text-[#003366] mb-4 flex items-center gap-2">
                                    <Users size={17} /> Our Specialists
                                </h2>
                                <div className="space-y-2.5">
                                    {deptDoctors.map(doc => (
                                        <DoctorMiniCard key={doc.id} doc={doc} />
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Book Appointment Card */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-linear-to-br from-[#003366] to-[#005080] rounded-3xl p-6 sm:p-8 text-white"
                        >
                            <div className="w-12 h-12 bg-white/12 rounded-2xl flex items-center justify-center mb-5">
                                <GraduationCap size={22} className="text-cyan-400" />
                            </div>
                            <h3 className="text-lg font-black mb-1.5">Book an Appointment</h3>
                            <p className="text-white/60 text-sm mb-5 leading-relaxed">Consult our specialists today. Expert care with compassion — for every patient.</p>
                            <Link
                                to={`/appointment?dept=${encodeURIComponent(data.dept)}`}
                                className="w-full flex items-center justify-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-white font-black py-3.5 rounded-xl transition-all text-sm shadow-lg hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-95"
                            >
                                Book Now <ArrowRight size={15} />
                            </Link>
                            <a
                                href="tel:+919119191622"
                                className="mt-2.5 w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/18 border border-white/15 text-white font-semibold py-3 rounded-xl transition-all text-sm"
                            >
                                <PhoneCall size={14} /> +91 91191 91622
                            </a>
                        </motion.div>

                        {/* Rating widget */}
                        {deptDoctors.length > 0 && (
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
                                <div className="flex items-center gap-1 mb-1.5">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} size={15} fill="#FBBF24" className="text-amber-400" />
                                    ))}
                                    <span className="text-base font-black text-[#003366] ml-2">4.9 / 5</span>
                                </div>
                                <p className="text-xs text-slate-500 leading-relaxed">Based on 1,000+ verified patient reviews for this department.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── CTA BANNER ───────────────────────────────────────────────── */}
            <section className="relative overflow-hidden bg-[#F0F6FF] py-14 sm:py-20 px-5">
                <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200/40 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-56 h-56 bg-cyan-200/30 rounded-full blur-[80px] pointer-events-none" />
                <div className="relative max-w-3xl mx-auto text-center">
                    <p className="text-[11px] font-black uppercase tracking-[0.22em] text-[#006fa3] mb-3">Get Expert Care Today</p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#003366] mb-4 leading-tight">
                        Need Care in<br className="sm:hidden" /> {data.name.split("&")[0].trim()}?
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
                        Our experienced specialists are ready to help. Book your appointment online or call our helpline for immediate assistance.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                        <Link
                            to={`/appointment?dept=${encodeURIComponent(data.dept)}`}
                            className="inline-flex items-center justify-center gap-2 bg-[#003366] hover:bg-[#006fa3] text-white font-black px-7 py-4 rounded-2xl transition-all shadow-lg hover:shadow-blue-200/60 hover:scale-[1.03] active:scale-95 text-sm sm:text-base"
                        >
                            Book Appointment <ArrowRight size={17} />
                        </Link>
                        <Link
                            to="/services"
                            className="inline-flex items-center justify-center gap-2 border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white font-black px-7 py-4 rounded-2xl transition-all text-sm sm:text-base"
                        >
                            <ArrowLeft size={17} /> All Departments
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default DepartmentDetail;
