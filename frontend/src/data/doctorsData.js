/* ─────────────────────────────────────────────────────────────────────────────
   TRINAY HOSPITAL — COMPLETE DOCTORS DATA
   Used by: Doctors.jsx, DoctorDetail.jsx, Appointment.jsx
───────────────────────────────────────────────────────────────────────────── */

const FEMALE_NAMES = ["RASHMI", "PRIYANKA", "PUSHPA", "POOJA", "KULDEEP", "JAISHREE", "RITU", "CHITRA", "VIDHI", "METALI"];
const isFemale = (name) => FEMALE_NAMES.some((n) => name.toUpperCase().includes(n));

/* Local avatar fallbacks — offline, no CDN dependency */
import dummyMaleAvatar   from "../assets/images/dummyMaleDoctor.png";
import dummyFemaleAvatar from "../assets/images/dummyFemaleDoctor.png";
const maleAvatar   = dummyMaleAvatar;
const femaleAvatar = dummyFemaleAvatar;

/* Department → accent color mapping */
const DEPT_COLOR = {
    "ANAESTHESIA & CRITICAL CARE":    { color: "indigo",  gradient: "from-indigo-600 to-indigo-800" },
    "CARDIOLOGY":                      { color: "rose",    gradient: "from-rose-600   to-rose-800"   },
    "GENERAL SURGERY":                 { color: "teal",    gradient: "from-teal-600   to-teal-800"   },
    "NEUROSURGEON":                    { color: "violet",  gradient: "from-violet-600 to-violet-800" },
    "OBS. & GYNAE.":                   { color: "pink",    gradient: "from-pink-600   to-pink-800"   },
    "ORTHOPAEDICS":                    { color: "amber",   gradient: "from-amber-600  to-amber-800"  },
    "PHYSIOTHERAPIST":                 { color: "green",   gradient: "from-green-600  to-green-800"  },
    "RADIOLOGY":                       { color: "blue",    gradient: "from-blue-600   to-blue-800"   },
    "UROLOGIST":                       { color: "cyan",    gradient: "from-cyan-600   to-cyan-800"   },
    "GENERAL MEDICINE":                { color: "sky",     gradient: "from-sky-600    to-sky-800"    },
    "DIETETICS":                       { color: "lime",    gradient: "from-lime-600   to-lime-800"   },
    "DENTISTRY":                       { color: "orange",  gradient: "from-orange-600 to-orange-800" },
    "SURGICAL ONCOLOGY":               { color: "red",     gradient: "from-red-600    to-red-800"    },
    "ENT":                             { color: "emerald", gradient: "from-emerald-600 to-emerald-800"},
    "PLASTIC & COSMETIC SURGERY":      { color: "purple",  gradient: "from-purple-600 to-purple-800" },
};

/* ─── DOCTOR PHOTO MAP (public/DOCTOR IAMGES/) ──────────────────────────── */
const PHOTO_MAP = {
    12003: "/DOCTOR IAMGES/dr. priyanka tetarwal.png",   // Dr. Priyanka Tetarwal
    12004: "/DOCTOR IAMGES/Dr. Dhruva Sharma.png",        // Dr. Dhruva Sharma
    12005: "/DOCTOR IAMGES/Dr. Om prakash Suthar.png",    // Dr. Om Prakash Suthar
    12007: "/DOCTOR IAMGES/11 (7).jpg",                   // Dr. Kamlesh Goyal
    12010: "/DOCTOR IAMGES/Dr. Rakesh Choudhary.png",     // Dr. Rakesh Choudhary
    12017: "/DOCTOR IAMGES/dr. tejpal faroda.png",         // Dr. Tejpal Faroda
    12018: "/DOCTOR IAMGES/Dr Pushpa Mathuriya.png",       // Dr. Pushpa Mathuria
    12020: "/DOCTOR IAMGES/dr amit k. sharma.png",         // Dr. Amit Sharma
    12021: "/DOCTOR IAMGES/Dr Pushpa Barath.png",          // Dr. Pushpa Barath
    12022: "/DOCTOR IAMGES/Dr Pooja mehta.png",            // Dr. Pooja Mehta
    12024: "/DOCTOR IAMGES/dr. priyank bhargava.png",      // Dr. Priyank Bhargava
    12027: "/DOCTOR IAMGES/Dr Sumeet godhwani.png",        // Dr. Sumeet Godhwani
    12001: "/DOCTOR IAMGES/Dr kuldeep kaur.png",           // Ms. Kuldeep Kaur
    12033: "/DOCTOR IAMGES/Dr. Jaishree Sharma.png",       // Dr. Jaishree Sharma
    12036: "/DOCTOR IAMGES/Dr. Ritu Choudhary.png",        // Dr. Ritu Choudhary
    12038: "/DOCTOR IAMGES/Dr chitra Agarwal.png",         // Dr. Chitra Agarwal
};

/* ─── RAW DOCTOR RECORDS ────────────────────────────────────────────────── */
const RAW = [
    {
        id: 12002,
        name: "DR. RASHMI SHARMA",
        designation: "SR. CONSULTANT",
        dept: "ANAESTHESIA & CRITICAL CARE",
        qualification: "MBBS/MD",
        timing: "10:00 AM – 5:00 PM",
        camp: "",
        experience: 14,
        patients: "10,000+",
        bio: "Dr. Rashmi Sharma is a highly experienced anaesthesiologist specialising in perioperative medicine and critical care. Over her 14-year career she has managed thousands of complex surgical cases, earning a reputation for precision and patient safety. She takes a patient-first approach to pain management and ICU care.",
        expertise: ["General Anaesthesia", "Regional & Spinal Blocks", "Epidural Anaesthesia", "Acute Pain Management", "ICU & Critical Care", "Paediatric Anaesthesia", "Obstetric Anaesthesia"],
        education: [
            { degree: "MBBS", college: "S.M.S. Medical College, Jaipur", year: "2005" },
            { degree: "MD – Anaesthesiology", college: "S.M.S. Medical College, Jaipur", year: "2009" },
        ],
        achievements: ["Fellow, Indian Society of Anaesthesiologists", "State Award – Best Anaesthesiologist 2022"],
    },
    {
        id: 12003,
        name: "DR. PRIYANKA TETARWAL",
        designation: "CONSULTANT",
        dept: "ANAESTHESIA & CRITICAL CARE",
        qualification: "MBBS/DA/DNB",
        timing: "10:00 AM – 5:00 PM",
        camp: "",
        experience: 9,
        patients: "6,000+",
        bio: "Dr. Priyanka Tetarwal is a dedicated consultant anaesthesiologist with specialisation in regional anaesthesia and post-operative pain management. She brings a calm, methodical approach to the operating theatre and is highly regarded by both colleagues and patients for her technical skill.",
        expertise: ["Regional Anaesthesia", "Labour Epidurals", "Post-Op Pain Protocol", "Day-Care Anaesthesia", "Haemodynamic Monitoring"],
        education: [
            { degree: "MBBS", college: "Rajasthan University of Health Sciences, Jaipur", year: "2011" },
            { degree: "DA – Diploma in Anaesthesiology", college: "M.G.M. Medical College, Jaipur", year: "2014" },
            { degree: "DNB – Anaesthesiology", college: "National Board of Examinations", year: "2016" },
        ],
        achievements: ["Member, Indian Medical Association", "Presenter at National Pain Conference 2023"],
    },
    {
        id: 12004,
        name: "DR. DHRUVA SHARMA",
        designation: "SR. CONSULTANT",
        dept: "CARDIOLOGY",
        qualification: "MBBS/MD/DM",
        timing: "10:00 AM – 5:00 PM",
        camp: "",
        experience: 17,
        patients: "18,000+",
        bio: "Dr. Dhruva Sharma is one of Jodhpur's most trusted cardiologists, with 17 years of experience in interventional cardiology. He has performed over 5,000 coronary procedures and pioneered advanced cardiac care programmes at Trinay Hospital. His calm demeanour and deep expertise make him the go-to doctor for complex heart conditions.",
        expertise: ["Coronary Artery Disease", "Angioplasty & Stenting", "Heart Failure Management", "Arrhythmia & ECG", "Hypertension", "Echocardiography (2D Echo)", "Preventive Cardiology"],
        education: [
            { degree: "MBBS", college: "S.M.S. Medical College, Jaipur", year: "2003" },
            { degree: "MD – Medicine", college: "S.M.S. Medical College, Jaipur", year: "2007" },
            { degree: "DM – Cardiology", college: "AIIMS New Delhi", year: "2011" },
        ],
        achievements: ["Fellow, Cardiological Society of India", "Best Interventional Cardiologist – Rajasthan, 2021", "Speaker at AHA Conference 2022"],
    },
    {
        id: 12005,
        name: "DR. OM PRAKASH SUTHAR",
        designation: "CONSULTANT",
        dept: "CARDIOLOGY",
        qualification: "MBBS/MD/DNB",
        timing: "10:00 AM – 5:00 PM",
        camp: "EVERY 4th SUNDAY – POKRAN CAMP",
        experience: 11,
        patients: "9,500+",
        bio: "Dr. Om Prakash Suthar is a dedicated cardiologist with expertise in non-invasive cardiology and heart disease prevention. He runs a monthly camp in Pokran to extend cardiac care to rural populations, demonstrating his commitment to community health beyond hospital walls.",
        expertise: ["Non-Invasive Cardiology", "Stress Testing (TMT)", "Holter Monitoring", "Heart Disease Prevention", "Lipid Management", "Hypertension Protocol"],
        education: [
            { degree: "MBBS", college: "Dr. S.N. Medical College, Jodhpur", year: "2009" },
            { degree: "MD – Medicine", college: "Dr. S.N. Medical College, Jodhpur", year: "2013" },
            { degree: "DNB – Cardiology", college: "National Board of Examinations", year: "2016" },
        ],
        achievements: ["Community Health Initiative Award 2023", "Member, Cardiological Society of India"],
    },
    {
        id: 12007,
        name: "DR. KAMLESH GOYAL",
        designation: "CONSULTANT",
        dept: "CARDIOLOGY",
        qualification: "MBBS/MD/DM",
        timing: "10:00 AM – 5:00 PM",
        camp: "",
        experience: 13,
        patients: "11,000+",
        bio: "Dr. Kamlesh Goyal combines deep academic training with hands-on clinical expertise to deliver evidence-based cardiac care. His focus areas include complex arrhythmia management and cardiac rehabilitation, helping patients regain quality of life after major cardiac events.",
        expertise: ["Cardiac Electrophysiology", "Arrhythmia Management", "Cardiac Rehabilitation", "Heart Valve Disease", "Acute MI Management", "Peripheral Vascular Disease"],
        education: [
            { degree: "MBBS", college: "Sawai Man Singh Medical College, Jaipur", year: "2007" },
            { degree: "MD – Internal Medicine", college: "Sawai Man Singh Medical College, Jaipur", year: "2011" },
            { degree: "DM – Cardiology", college: "PGI Chandigarh", year: "2014" },
        ],
        achievements: ["Fellow, European Society of Cardiology", "Best Research Paper – Indian Heart Rhythm Society 2022"],
    },
    {
        id: 12010,
        name: "DR. RAKESH CHOUDHARY",
        designation: "CONSULTANT",
        dept: "CARDIOLOGY",
        qualification: "MBBS/MD/DM",
        timing: "10:00 AM – 5:00 PM",
        camp: "",
        experience: 12,
        patients: "10,200+",
        bio: "Dr. Rakesh Choudhary is a skilled interventional cardiologist known for swift, accurate diagnosis and successful outcomes in emergency cardiac care. He has special interest in primary angioplasty for heart attacks and has significantly improved door-to-balloon time at Trinay Hospital.",
        expertise: ["Primary Angioplasty", "Acute Coronary Syndrome", "Coronary Angiography", "Structural Heart Disease", "Pericardial Disease", "Cardiac Imaging"],
        education: [
            { degree: "MBBS", college: "Mahatma Gandhi Medical College, Jaipur", year: "2008" },
            { degree: "MD – Medicine", college: "Mahatma Gandhi Medical College, Jaipur", year: "2012" },
            { degree: "DM – Cardiology", college: "G.B. Pant Hospital, New Delhi", year: "2015" },
        ],
        achievements: ["IMA Award for Emergency Cardiac Services 2022", "Cardiological Society of India – Life Member"],
    },
    {
        id: 12012,
        name: "DR. KAMAL KANT",
        designation: "SR. CONSULTANT",
        dept: "GENERAL SURGERY",
        qualification: "MBBS/MS/FACS/FRCS",
        timing: "10:00 AM – 4:00 PM",
        camp: "",
        experience: 22,
        patients: "25,000+",
        bio: "Dr. Kamal Kant is a highly accomplished surgeon with international credentials (FACS, FRCS), bringing over 22 years of operative excellence. He has trained in advanced minimally invasive techniques and has been instrumental in establishing the laparoscopic surgery programme at Trinay Hospital.",
        expertise: ["Laparoscopic Surgery", "Hernia Repair", "Appendix Surgery", "GI Surgery", "Thyroid & Breast Surgery", "Colorectal Surgery", "Emergency Surgery"],
        education: [
            { degree: "MBBS", college: "Jodhpur Medical College", year: "1998" },
            { degree: "MS – General Surgery", college: "S.M.S. Medical College, Jaipur", year: "2003" },
            { degree: "FACS", college: "American College of Surgeons", year: "2010" },
            { degree: "FRCS", college: "Royal College of Surgeons, Edinburgh", year: "2012" },
        ],
        achievements: ["Fellow, American College of Surgeons", "Fellow, Royal College of Surgeons (Edinburgh)", "Rajasthan Surgeon of the Year 2020"],
    },
    {
        id: 12017,
        name: "DR. TEJPAL FARODA",
        designation: "CONSULTANT",
        dept: "NEUROSURGEON",
        qualification: "MBBS/MS/MCH",
        timing: "11:00 AM – 3:00 PM",
        camp: "",
        experience: 10,
        patients: "7,000+",
        bio: "Dr. Tejpal Faroda is a skilled neurosurgeon with expertise in spine surgery and neuro-oncology. He performs complex brain and spinal procedures using modern microsurgical techniques, combining technical precision with compassionate patient care to restore neurological function.",
        expertise: ["Brain Tumour Surgery", "Spine Surgery", "Head Injury Management", "Cerebrovascular Surgery", "Paediatric Neurosurgery", "Peripheral Nerve Surgery"],
        education: [
            { degree: "MBBS", college: "Dr. S.N. Medical College, Jodhpur", year: "2010" },
            { degree: "MS – General Surgery", college: "Dr. S.N. Medical College, Jodhpur", year: "2014" },
            { degree: "MCH – Neurosurgery", college: "NIMHANS, Bengaluru", year: "2017" },
        ],
        achievements: ["Member, Neurological Society of India", "Young Neurosurgeon Award – NSI 2022"],
    },
    {
        id: 12018,
        name: "DR. PUSHPA MATHURIA",
        designation: "SR. CONSULTANT",
        dept: "OBS. & GYNAE.",
        qualification: "MBBS/MS",
        timing: "10:00 AM – 4:00 PM",
        camp: "",
        experience: 18,
        patients: "20,000+",
        bio: "Dr. Pushpa Mathuria is a compassionate and highly experienced gynaecologist and obstetrician who has safely delivered over 12,000 babies in her career. She specialises in high-risk pregnancies, infertility management, and advanced gynaecological surgeries, and is beloved by her patients for her warm, reassuring approach.",
        expertise: ["High-Risk Pregnancy", "Normal & Caesarean Delivery", "Infertility Workup", "PCOD Management", "Laparoscopic Gynaecology", "Hysteroscopy", "Menstrual Disorders"],
        education: [
            { degree: "MBBS", college: "Rajasthan University of Health Sciences", year: "2002" },
            { degree: "MS – Obstetrics & Gynaecology", college: "S.M.S. Medical College, Jaipur", year: "2006" },
        ],
        achievements: ["Fellow, Federation of Obstetric and Gynaecological Societies of India", "Trinay Hospital Best Doctor Award 2021 & 2023"],
    },
    {
        id: 12020,
        name: "DR. AMIT SHARMA",
        designation: "CONSULTANT",
        dept: "ORTHOPAEDICS",
        qualification: "MBBS/MS",
        timing: "10:00 AM – 5:00 PM",
        camp: "",
        experience: 12,
        patients: "13,000+",
        bio: "Dr. Amit Sharma is a skilled orthopaedic surgeon specialising in joint replacement, trauma surgery, and sports injuries. He performs primary and revision knee and hip replacements using computer-assisted techniques, helping patients regain mobility and live pain-free lives.",
        expertise: ["Total Knee Replacement", "Total Hip Replacement", "Fracture Surgery", "Sports Medicine", "Arthroscopy", "Spine Disorders", "Paediatric Orthopaedics"],
        education: [
            { degree: "MBBS", college: "Dr. S.N. Medical College, Jodhpur", year: "2008" },
            { degree: "MS – Orthopaedics", college: "S.M.S. Medical College, Jaipur", year: "2012" },
        ],
        achievements: ["Member, Indian Orthopaedic Association", "Fellowship in Joint Replacement, Manipal Hospital Bengaluru"],
    },
    {
        id: 12021,
        name: "DR. PUSHPA BARATH",
        designation: "CONSULTANT",
        dept: "PHYSIOTHERAPIST",
        qualification: "BPT/MPT",
        timing: "10:00 AM – 5:00 PM",
        camp: "",
        experience: 8,
        patients: "5,500+",
        bio: "Dr. Pushpa Barath is a dedicated physiotherapist with expertise in musculoskeletal rehabilitation and neuro-physiotherapy. She designs personalised rehabilitation programmes to restore function, reduce pain, and prevent re-injury in post-operative and trauma patients.",
        expertise: ["Post-Surgical Rehabilitation", "Neurological Physiotherapy", "Sports Injury Rehab", "Back & Neck Pain", "Chest Physiotherapy", "Paediatric Physiotherapy", "Electrotherapy"],
        education: [
            { degree: "BPT – Bachelor of Physiotherapy", college: "Rajasthan University of Health Sciences", year: "2012" },
            { degree: "MPT – Musculoskeletal Physiotherapy", college: "Manipal University", year: "2014" },
        ],
        achievements: ["Member, Indian Association of Physiotherapists", "Best Physiotherapy Department – Trinay Hospital 2022"],
    },
    {
        id: 12022,
        name: "DR. POOJA MEHTA",
        designation: "CONSULTANT",
        dept: "RADIOLOGY",
        qualification: "MBBS/MD",
        timing: "10:00 AM – 5:00 PM",
        camp: "",
        experience: 9,
        patients: "12,000+ reports",
        bio: "Dr. Pooja Mehta is a highly trained radiologist specialising in cross-sectional imaging and intervention radiology. She provides precise and rapid diagnostic reports that drive clinical decision-making across all departments at Trinay Hospital.",
        expertise: ["CT Scan & MRI Interpretation", "Ultrasound & Doppler", "X-Ray Reporting", "Mammography", "Fluoroscopy", "Image-Guided Biopsy"],
        education: [
            { degree: "MBBS", college: "Sawai Man Singh Medical College, Jaipur", year: "2011" },
            { degree: "MD – Radiology & Imaging", college: "Sawai Man Singh Medical College, Jaipur", year: "2015" },
        ],
        achievements: ["Member, Indian Radiological and Imaging Association", "IRIA Best Paper Award 2023"],
    },
    {
        id: 12024,
        name: "DR. PRIYANK BHARGAVA",
        designation: "CONSULTANT",
        dept: "UROLOGIST",
        qualification: "MBBS/MS/MCH",
        timing: "10:00 AM – 12:00 Noon",
        camp: "",
        experience: 11,
        patients: "8,000+",
        bio: "Dr. Priyank Bhargava is a skilled urologist with comprehensive training in endoscopic, laparoscopic, and robotic urology. He manages a wide spectrum of urological conditions from kidney stones to prostate disease with minimally invasive techniques for faster recovery.",
        expertise: ["Kidney Stone Management (ESWL, PCNL)", "Prostate Disease (BPH & Cancer)", "Bladder Disorders", "Laparoscopic Urology", "Urinary Tract Infections", "Male Reproductive Health"],
        education: [
            { degree: "MBBS", college: "Dr. S.N. Medical College, Jodhpur", year: "2009" },
            { degree: "MS – General Surgery", college: "Dr. S.N. Medical College, Jodhpur", year: "2013" },
            { degree: "MCH – Urology", college: "P.G.I.M.E.R., Chandigarh", year: "2016" },
        ],
        achievements: ["Member, Urological Society of India", "Fellowship in Endourology, Singapore General Hospital"],
    },
    {
        id: 12027,
        name: "DR. SUMEET GODHWANI",
        designation: "SR. CONSULTANT",
        dept: "GENERAL MEDICINE",
        qualification: "MBBS/MD",
        timing: "10:00 AM – 5:00 PM",
        camp: "",
        experience: 15,
        patients: "22,000+",
        bio: "Dr. Sumeet Godhwani is one of Trinay Hospital's most experienced internists, renowned for his thorough clinical assessment and ability to manage complex multi-system diseases. He is the first point of contact for thousands of patients and is celebrated for his accessibility, thoroughness, and empathy.",
        expertise: ["Diabetes Management", "Hypertension & Heart Disease", "Respiratory Infections", "Thyroid Disorders", "Fever Workup", "Infectious Disease", "Preventive Medicine"],
        education: [
            { degree: "MBBS", college: "Dr. S.N. Medical College, Jodhpur", year: "2005" },
            { degree: "MD – General Medicine", college: "S.M.S. Medical College, Jaipur", year: "2009" },
        ],
        achievements: ["IMA Rajasthan Best Physician Award 2021", "Fellow, API (Association of Physicians of India)"],
    },
    {
        id: 12001,
        name: "MS. KULDEEP KAUR",
        designation: "CONSULTANT DIETITIAN",
        dept: "DIETETICS",
        qualification: "MSC",
        timing: "9:00 AM – 4:00 PM",
        camp: "",
        experience: 7,
        patients: "4,500+",
        bio: "Ms. Kuldeep Kaur is a qualified clinical dietitian who creates evidence-based, personalised nutrition plans for patients across all departments including diabetics, cardiac patients, bariatrics, and oncology. She is passionate about food as medicine and works closely with the medical team for integrated care.",
        expertise: ["Diabetes Diet Planning", "Cardiac Nutrition", "Weight Management", "Renal Diet", "Paediatric Nutrition", "Sports Nutrition", "Oncology Diet Support"],
        education: [
            { degree: "BSc – Dietetics & Nutrition", college: "Punjabi University, Patiala", year: "2013" },
            { degree: "MSc – Clinical Nutrition", college: "Punjabi University, Patiala", year: "2015" },
        ],
        achievements: ["Registered Dietitian, Indian Dietetic Association", "Certified Diabetes Educator (CDE)"],
    },
    {
        id: 12033,
        name: "DR. JAISHREE SHARMA",
        designation: "SR. CONSULTANT",
        dept: "OBS. & GYNAE.",
        qualification: "MBBS/MS",
        timing: "10:00 AM – 4:00 PM",
        camp: "",
        experience: 16,
        patients: "17,000+",
        bio: "Dr. Jaishree Sharma is a senior gynaecologist with vast experience in obstetrics and minimally invasive gynaecological procedures. She is known for her warm bedside manner and has delivered thousands of babies including high-risk and complicated pregnancies, earning the trust of families across Jodhpur.",
        expertise: ["High-Risk Obstetrics", "Normal Delivery", "Caesarean Section", "Endometriosis", "Fibroid Management", "Menopause Care", "Gynaecological Oncology Screening"],
        education: [
            { degree: "MBBS", college: "Rajasthan University of Health Sciences", year: "2004" },
            { degree: "MS – Obstetrics & Gynaecology", college: "Dr. S.N. Medical College, Jodhpur", year: "2008" },
        ],
        achievements: ["Fellow, Royal College of Obstetricians and Gynaecologists (FRCOG)", "FOGSI Life Member"],
    },
    {
        id: 12036,
        name: "DR. RITU CHOUDHARY",
        designation: "CONSULTANT",
        dept: "OBS. & GYNAE.",
        qualification: "MBBS/MS",
        timing: "10:00 AM – 2:00 PM",
        camp: "",
        experience: 8,
        patients: "6,000+",
        bio: "Dr. Ritu Choudhary is a compassionate gynaecologist with a special interest in adolescent health, infertility, and laparoscopic gynaecological surgery. She creates a supportive, non-judgemental environment for her patients and is particularly skilled in managing complex menstrual disorders.",
        expertise: ["Adolescent Gynaecology", "Infertility & IVF Workup", "Laparoscopic Gynaecology", "PCOD & Hormonal Disorders", "Menstrual Problems", "Cervical Cancer Screening"],
        education: [
            { degree: "MBBS", college: "Mahatma Gandhi Medical College, Jaipur", year: "2012" },
            { degree: "MS – Obstetrics & Gynaecology", college: "Mahatma Gandhi Medical College, Jaipur", year: "2016" },
        ],
        achievements: ["FOGSI Member", "Trained in Laparoscopic Gynaecology – AIIMS Delhi"],
    },
    {
        id: 12038,
        name: "DR. CHITRA AGARWAL",
        designation: "CONSULTANT",
        dept: "DENTISTRY",
        qualification: "BDS/MDS",
        timing: "10:00 AM – 4:00 PM",
        camp: "",
        experience: 10,
        patients: "8,500+",
        bio: "Dr. Chitra Agarwal is an accomplished dental surgeon and specialist in oral and maxillofacial surgery. She combines artistry with clinical expertise to deliver smile-transforming and pain-relieving dental treatments, from routine procedures to complex oral surgeries.",
        expertise: ["Dental Implants", "Root Canal Treatment", "Cosmetic Dentistry", "Oral Surgery", "Orthodontics", "Periodontics", "Paediatric Dentistry"],
        education: [
            { degree: "BDS – Bachelor of Dental Surgery", college: "Darshan Dental College, Jodhpur", year: "2010" },
            { degree: "MDS – Oral & Maxillofacial Surgery", college: "Rajasthan Dental College, Jaipur", year: "2014" },
        ],
        achievements: ["IDA Life Member", "Best Dentist – Jodhpur Dental Association 2022"],
    },
    {
        id: 12052,
        name: "DR. VIDHI AGARWAL",
        designation: "CONSULTANT",
        dept: "RADIOLOGY",
        qualification: "MBBS/DNB",
        timing: "10:00 AM – 5:00 PM",
        camp: "",
        experience: 7,
        patients: "9,000+ reports",
        bio: "Dr. Vidhi Agarwal is a dedicated radiologist with expertise in interventional radiology and women's imaging. She is skilled in providing real-time guidance for image-guided procedures and has a keen eye for subtle findings on CT, MRI, and ultrasound that help clinicians arrive at the right diagnosis faster.",
        expertise: ["MRI Reporting", "CT Scan Analysis", "Ultrasound & Colour Doppler", "Mammography", "Interventional Radiology", "Women's Imaging"],
        education: [
            { degree: "MBBS", college: "Sardar Patel Medical College, Bikaner", year: "2013" },
            { degree: "DNB – Radiodiagnosis", college: "National Board of Examinations", year: "2018" },
        ],
        achievements: ["Member, Indian Radiological and Imaging Association", "Presented research at IRIA Annual Conference 2023"],
    },
    {
        id: 12055,
        name: "DR. RAKESH RATHORE",
        designation: "CONSULTANT",
        dept: "SURGICAL ONCOLOGY",
        qualification: "MBBS/MS/MCH",
        timing: "ON CALL",
        camp: "",
        experience: 13,
        patients: "5,000+",
        bio: "Dr. Rakesh Rathore is a dedicated surgical oncologist with expertise in cancer surgery across multiple anatomical sites. He employs oncoplastic and minimally invasive techniques to ensure tumour-free margins while preserving organ function, offering Jodhpur patients advanced cancer care close to home.",
        expertise: ["Breast Cancer Surgery", "GI Cancer Surgery", "Thyroid & Parathyroid Cancer", "Soft Tissue Sarcoma", "Laparoscopic Oncosurgery", "Sentinel Node Biopsy", "Palliative Surgery"],
        education: [
            { degree: "MBBS", college: "Dr. S.N. Medical College, Jodhpur", year: "2007" },
            { degree: "MS – General Surgery", college: "Dr. S.N. Medical College, Jodhpur", year: "2011" },
            { degree: "MCH – Surgical Oncology", college: "Tata Memorial Hospital, Mumbai", year: "2015" },
        ],
        achievements: ["Fellow, Association of Surgeons of India", "Tata Memorial Hospital – Oncosurgery Training Diploma"],
    },
    {
        id: 12056,
        name: "DR. METALI RAI",
        designation: "CONSULTANT",
        dept: "ENT",
        qualification: "MBBS/MS",
        timing: "11:00 AM – 3:00 PM",
        camp: "",
        experience: 9,
        patients: "11,000+",
        bio: "Dr. Metali Rai is an experienced ENT surgeon with skill in both paediatric and adult ear, nose, and throat conditions. She performs functional endoscopic sinus surgery (FESS), cochlear implant workups, and micro-ear surgery, helping patients breathe, hear, and speak better.",
        expertise: ["FESS – Sinus Surgery", "Tonsillectomy & Adenoidectomy", "Ear Drum Repair", "Neck Mass Surgery", "Nasal Polyps", "Hearing Loss Workup", "Voice & Swallowing Disorders"],
        education: [
            { degree: "MBBS", college: "Mahatma Gandhi Medical College, Jaipur", year: "2011" },
            { degree: "MS – ENT", college: "S.M.S. Medical College, Jaipur", year: "2015" },
        ],
        achievements: ["Life Member, Association of Otolaryngologists of India", "Fellowship in Rhinology, Medanta The Medicity"],
    },
    {
        id: 12057,
        name: "DR. SUSHIL NAHAR",
        designation: "CONSULTANT",
        dept: "PLASTIC & COSMETIC SURGERY",
        qualification: "MBBS/MS/MCH",
        timing: "11:00 AM – 2:00 PM",
        camp: "",
        experience: 11,
        patients: "6,500+",
        bio: "Dr. Sushil Nahar is a talented plastic and cosmetic surgeon who combines surgical precision with an artistic eye to deliver natural, life-enhancing results. He specialises in reconstructive surgery after trauma or cancer, as well as cosmetic procedures that restore confidence and quality of life.",
        expertise: ["Reconstructive Surgery", "Cleft Lip & Palate", "Burn Reconstruction", "Face Lift & Rhinoplasty", "Liposuction & Body Contouring", "Skin Grafting", "Hand Surgery"],
        education: [
            { degree: "MBBS", college: "Dr. S.N. Medical College, Jodhpur", year: "2009" },
            { degree: "MS – General Surgery", college: "Dr. S.N. Medical College, Jodhpur", year: "2013" },
            { degree: "MCH – Plastic Surgery", college: "AIIMS New Delhi", year: "2016" },
        ],
        achievements: ["Fellow, Association of Plastic Surgeons of India", "Best Research Paper – APSI National Conference 2021"],
    },
];

/* ─── ENRICHED EXPORT ───────────────────────────────────────────────────── */
export const DOCTORS = RAW.map((doc) => {
    const female = isFemale(doc.name);
    const deptStyle = DEPT_COLOR[doc.dept] ?? { color: "blue", gradient: "from-blue-600 to-blue-800" };
    const isSenior  = doc.designation.includes("SR.");
    const nameTitled = doc.name
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
    const slug = nameTitled.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    return {
        ...doc,
        nameTitled,
        slug,
        isFemale: female,
        isSenior,
        avatar: PHOTO_MAP[doc.id] ?? (female ? femaleAvatar : maleAvatar),
        days: doc.days ?? "Mon – Sat",
        languages: doc.languages ?? ["Hindi", "English", "Rajasthani"],
        color: deptStyle.color,
        gradient: deptStyle.gradient,
        deptDisplay: doc.dept
            .split(" ")
            .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
            .join(" ")
            .replace(/Obs\. & Gynae\./i, "Obs. & Gynaecology")
            .replace(/Physiotherapist/i, "Physiotherapy")
            .replace(/Neurosurgeon/i, "Neurosurgery"),
    };
});

/* Helper — find by id or slug */
export const findDoctor = (idOrSlug) => {
    const asNum = Number(idOrSlug);
    return DOCTORS.find((d) => d.id === asNum || d.slug === idOrSlug) ?? null;
};

/* All unique departments for filter */
export const DEPARTMENTS = ["All Specialties", ...new Set(DOCTORS.map((d) => d.dept))];
