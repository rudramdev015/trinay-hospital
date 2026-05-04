import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

// ─── CONFIG ───────────────────────────────────────────────
const CONFIG = {
  phone1: "+91 91191 91622",
  phone2: "+91 91191 91722",
  paliPhone: "+91 98290 90061",
  email: "info@trinay.in",
  website: "https://trinay.in",
  whatsapp: "https://api.whatsapp.com/send?phone=919119191722",
  instagram: "https://www.instagram.com/trinayhospital/",
  facebook: "https://www.facebook.com/profile.php?id=61568442437621",
  address: "Opp. Chopasni Garden, PF Office Road, Jodhpur 342008",
  paliAddress: "8-9, Near BSNL Godown, Sojat Road, Pali 306401",
};

// ─── Q&A DATABASE ────────────────────────────────────────
const QA_DB = [
  { k: ["hello","hi","hey","hlo","hii"], type: "text", a: "🙏 Hello! Welcome to Trinay Hospital.\n\nHow can I help you today?" },
  { k: ["good morning","gudmorning","subah"], type: "text", a: "🌅 Good Morning! Hope you are well.\n\nHow can Trinay Hospital assist you today?" },
  { k: ["good night","gd night","goodnight","shubh ratri"], type: "text", a: "🌙 Good Night! Stay healthy.\n\nCall us anytime: " + CONFIG.phone1 },
  { k: ["ram ram","ram ram sa"], type: "text", a: "🙏 Ram Ram Sa! Welcome to Trinay Hospital. Kaise madad kar sakte hain?" },
  { k: ["namaste","namaskar","pranam"], type: "text", a: "🙏 Namaste! Welcome to Trinay Hospital. How may we assist you?" },
  { k: ["jai shri krishna","radhe radhe","jai shri ram"], type: "text", a: "🙏 Jai Shri Krishna! How can Trinay Hospital help you today?" },
  { k: ["how are you","kya haal","kaise ho"], type: "text", a: "I'm great, thank you! 😊\n\nHow can I help YOU? Your health is our priority!" },
  { k: ["bye","goodbye","alvida","tata"], type: "text", a: "👋 Goodbye! Take care of your health.\n\nTrinay Hospital is always here — " + CONFIG.phone1 },
  { k: ["thank you","thanks","shukriya","dhanyawad","thanku","thnx"], type: "text", a: "You're most welcome! 😊 Stay healthy!" },
  { k: ["help","madad","sahayata"], type: "text", a: "I can help you with:\n📅 Appointments\n🚨 Emergency\n🏥 Departments\n📞 Contact\n💳 Insurance\n\nJust type your question!" },
  { k: ["about trinay","trinay kya hai","what is trinay","hospital ke baare"], type: "text", a: "🏥 Trinay Hospital is a leading private 100-bed multispeciality hospital in Jodhpur, Rajasthan with NABH accreditation and 24+ departments." },
  { k: ["best hospital","top hospital jodhpur"], type: "text", a: "✅ Trinay Hospital is one of the BEST multispeciality hospitals in Jodhpur!\n\nNABH Accredited · 100 Beds · 24+ Departments" },
  { k: ["how many beds","kitne beds","bed capacity"], type: "text", a: "Trinay Hospital has 100 beds including ICU, NICU, CCU, and Private rooms." },
  { k: ["nabh","accreditation","certified"], type: "text", a: "✅ Yes! Trinay Hospital is NABH Accredited — guaranteeing top-quality standards of care." },
  { k: ["pali branch","trinay pali","pali hospital"], type: "contact", extra: "pali" },
  { k: ["phone","number","contact","call","helpline","telephone","no."], type: "contact", extra: "all" },
  { k: ["whatsapp","wahtsapp","watsap","whtsap"], type: "text", a: "💬 WhatsApp: " + CONFIG.phone2 + "\nClick → " + CONFIG.whatsapp },
  { k: ["email","mail"], type: "text", a: "📧 Email: " + CONFIG.email + "\n\nWe respond promptly!" },
  { k: ["website","site","web","online"], type: "text", a: "🌐 Website: " + CONFIG.website + "\n\nBook appointments, view doctors & more!" },
  { k: ["address","location","kahan","where","located","jagah"], type: "location" },
  { k: ["timing","time","khula","open hours","kab khulta"], type: "text", a: "🚨 Emergency: 24/7 Open\n\nFor OPD timings call:\n📞 " + CONFIG.phone1 },
  { k: ["emergency","emergancy","emmergency","urgent","jaldi","imarjansi"], type: "emergency" },
  { k: ["heart attack","dil ka dora","cardiac arrest"], type: "emergency" },
  { k: ["stroke","brain attack","paralysis"], type: "emergency" },
  { k: ["accident","hadsa","trauma"], type: "emergency" },
  { k: ["ambulance","ambylance","amblance"], type: "text", a: "🚨 For ambulance, call IMMEDIATELY:\n📞 " + CONFIG.phone1 + "\n\n24/7 Emergency Center — Trinay Hospital" },
  { k: ["24 hour","24 ghante","always open","hamesha"], type: "text", a: "✅ Yes! Trinay Hospital Emergency is open 24 Hours, 7 Days a Week!\n📞 " + CONFIG.phone1 },
  { k: ["chest pain","seene mein dard","seenat dard"], type: "emergency" },
  { k: ["appointment","apointment","apointmnt","appoitment","booking","book","milna"], type: "appointment" },
  { k: ["online appointment","online booking","website se book"], type: "text", a: "🌐 Book Online: " + CONFIG.website + "\n\nClick 'Book an Appointment' and fill your details!" },
  { k: ["cancel appointment","reschedule","postpone"], type: "text", a: "To cancel/reschedule:\n📞 " + CONFIG.phone1 + "\n💬 WhatsApp: " + CONFIG.phone2 },
  { k: ["walk in","bina appointment","without appointment"], type: "text", a: "✅ Walk-in patients welcome at OPD!\n\nBooking in advance reduces waiting. Call: " + CONFIG.phone1 },
  { k: ["appointment fee","charges","kitna paisa","consultation fee"], type: "text", a: "OPD fees vary by doctor/department.\n📞 Call for charges: " + CONFIG.phone1 },
  { k: ["opd","outpatient","bahri mareezan"], type: "text", a: "OPD = Outpatient Department\nFor consultations without admission.\n\n📞 Timings: " + CONFIG.phone1 },
  { k: ["ipd","inpatient","admit","admission","bhrti"], type: "text", a: "IPD = Inpatient Department\nFor admitted patients.\n\n📞 Admission: " + CONFIG.phone1 + " (24/7)" },
  { k: ["discharge","chutti hospital","released"], type: "text", a: "Discharge after doctor approval.\n📞 Queries: " + CONFIG.phone1 },
  { k: ["room","ward","private room","kamra","semi private"], type: "text", a: "Room types at Trinay:\n🛏️ General Ward\n🏠 Semi-Private Room\n⭐ Private Room (AC + TV)\n\n📞 Rates: " + CONFIG.phone1 },
  { k: ["departments","vibhag","all departments","kaunse departments","which departments"], type: "text", a: "🏥 Trinay has 24+ Departments:\n\n❤️ Cardiology\n🧠 Neurology\n🩺 General Medicine\n👶 Paediatrics\n🤰 Gynaecology\n🦴 Orthopaedics\n✂️ Surgery\n🫁 Pulmonology\n👂 ENT\n🦷 Dentistry\n🏃 Physiotherapy\n🎗️ Oncology\n💉 Diabetology\n💧 Urology\n🧘 Psychiatry\n...and more!" },
  { k: ["cardiology","heart","dil","cardiologist","cardiac","heartbeat"], type: "text", a: "❤️ Cardiology Dept\n\nTreats: Heart attacks, blockages, valve disease, arrhythmia, heart failure.\n\nCATH Lab available!\n📞 " + CONFIG.phone1 },
  { k: ["neurology","brain","dimag","neuro","neurologist","nerve"], type: "text", a: "🧠 Neurology Dept\n\nTreats: Stroke, epilepsy, Parkinson's, brain disorders, nerve problems.\n\n📞 " + CONFIG.phone1 },
  { k: ["gynaecology","gynecology","ladies doctor","mahila","delivery","prasav","pregnancy"], type: "text", a: "🤰 Obstetrics & Gynaecology\n\nNormal delivery · C-section · PCOS · Periods · Pregnancy care\n\n24/7 Delivery! 📞 " + CONFIG.phone1 },
  { k: ["paediatrics","children doctor","child specialist","bacche","pediatric","kids doctor"], type: "text", a: "👶 Paediatrics\n\nAll child ailments, vaccinations, growth monitoring, newborn care.\n\n📞 " + CONFIG.phone1 },
  { k: ["orthopaedics","orthopedic","bone","haddi","joint replacement"], type: "text", a: "🦴 Orthopaedics\n\nFractures · Joint pain · Spine issues · Sports injuries · Joint Replacement\n\n📞 " + CONFIG.phone1 },
  { k: ["surgery","surgry","operation","sargery"], type: "text", a: "✂️ Surgery at Trinay:\n\nGeneral · Neuro & Spine · Cardiac (CTVS) · Laparoscopic · Orthopaedic · Cancer Surgery\n\n📞 " + CONFIG.phone1 },
  { k: ["pulmonology","lungs","respiratory","dama","asthma","khansi","saas","breathing"], type: "text", a: "🫁 Pulmonology\n\nAsthma · COPD · TB · Lung infections · Breathing disorders\n\n📞 " + CONFIG.phone1 },
  { k: ["gastrology","gastro","stomach","pet","liver","jigar","digestive","ulcer"], type: "text", a: "🫀 Gastrology\n\nStomach pain · Liver disease · Acid reflux · IBS · Digestive disorders\n\n📞 " + CONFIG.phone1 },
  { k: ["ent","ear nose throat","kaan naak gala","tonsil","sinus","hearing"], type: "text", a: "👂 ENT Department\n\nHearing loss · Sinus · Tonsils · Throat problems · Nasal blockage\n\n📞 " + CONFIG.phone1 },
  { k: ["oncology","cancer","tumor","carcinoma","kark rog"], type: "text", a: "🎗️ Oncology & Onco-Surgery\n\nCancer diagnosis · Chemotherapy support · Cancer surgery\n\n📞 " + CONFIG.phone1 },
  { k: ["urology","kidney","gall stone","pathri","urine problem","prostate"], type: "text", a: "💧 Urology\n\nKidney stones · Urinary issues · Prostate · Kidney disease\n\n📞 " + CONFIG.phone1 },
  { k: ["psychiatry","mental health","depression","anxiety","neend","insomnia","stress","manasik"], type: "text", a: "🧘 Psychiatry\n\nDepression · Anxiety · Insomnia · OCD · Counselling\n\nYou are not alone 💙\n📞 " + CONFIG.phone1 },
  { k: ["physiotherapy","physio","phisio","rehabilitation","rehab"], type: "text", a: "🏃 Physiotherapy\n\nPost-surgery recovery · Back pain · Sports injuries · Stroke rehab\n\n📞 " + CONFIG.phone1 },
  { k: ["dentistry","dental","daant","teeth","dantist"], type: "text", a: "🦷 Dentistry\n\nCheckups · Fillings · Root Canal · Extractions · Dental implants\n\n📞 " + CONFIG.phone1 },
  { k: ["diabetology","diabetes","sugar","madhumeh"], type: "text", a: "💉 Diabetology\n\nDiabetes management · Blood sugar control · Related complications\n\n📞 " + CONFIG.phone1 },
  { k: ["dietetics","nutrition","diet","diet chart","khana"], type: "text", a: "🥗 Dietetics & Nutrition\n\nPersonalized diet plans for diabetes, heart, weight loss, pregnancy & more.\n\n📞 " + CONFIG.phone1 },
  { k: ["cath lab","cathlab","angiography","angioplasty","stent"], type: "text", a: "🫀 CATH Lab\n\nAngiography · Angioplasty · Stent placement\n\nExpert cardiologists available.\n📞 " + CONFIG.phone1 },
  { k: ["ct scan","ctscan","computed tomography"], type: "text", a: "🩻 CT Scan\n\nHigh-resolution scanner for all body parts. Quick results.\n📞 " + CONFIG.phone1 },
  { k: ["mri","magnetic resonance"], type: "text", a: "🧲 MRI\n\nBrain · Spine · Joints · Organs. Non-invasive, no radiation.\n📞 " + CONFIG.phone1 },
  { k: ["xray","x-ray","x ray","xrey"], type: "text", a: "⚡ Digital X-Ray\n\nFast and accurate imaging for bones, chest & more.\n📞 " + CONFIG.phone1 },
  { k: ["blood test","lab test","pathology","sample"], type: "text", a: "🔬 Lab / Pathology\n\nAll blood tests, urine tests & cultures. Results within hours.\n📞 " + CONFIG.phone1 },
  { k: ["ultrasound","sonography","sono"], type: "text", a: "📡 Ultrasound / Sonography\n\nAbdominal · Pregnancy · Organ imaging available.\n📞 " + CONFIG.phone1 },
  { k: ["echo","echocardiography","ecg"], type: "text", a: "❤️ ECG & Echo\n\nECG + Echocardiography at our Cardiology dept.\n📞 " + CONFIG.phone1 },
  { k: ["icu","intensive care"], type: "text", a: "🏥 ICU\n\nFully equipped with ventilators, monitors, 24/7 specialist care.\nAlso: CCU & NICU\n📞 " + CONFIG.phone1 },
  { k: ["nicu","newborn icu","premature baby"], type: "text", a: "👶 NICU\n\nNeonatal ICU for premature & critically ill newborns.\n24/7 neonatologists.\n📞 " + CONFIG.phone1 },
  { k: ["pharmacy","medicine","dawa","dawai","medical shop"], type: "text", a: "💊 Pharmacy\n\nFull-service pharmacy inside Trinay Hospital — all medicines available.\n📞 " + CONFIG.phone1 },
  { k: ["cashless","insurance","bima","tpa","inshurence","insurans"], type: "insurance" },
  { k: ["ayushman","ayusman","ayushman bharat","maay"], type: "text", a: "💳 Mukhyamantri Ayushman Arogya Yojana\n\nTrinay is empanelled! Eligible families get FREE treatment.\n📞 " + CONFIG.phone1 },
  { k: ["rghs","rajasthan government health"], type: "text", a: "💳 RGHS\n\nTrinay is empanelled with RGHS for Rajasthan govt employees.\n📞 " + CONFIG.phone1 },
  { k: ["echs","ex servicemen","army","defence","sainik"], type: "text", a: "💳 ECHS Accepted!\n\nEx-servicemen and families — cashless treatment available.\n📞 " + CONFIG.phone1 },
  { k: ["knee replacement","ghutna","hip replacement"], type: "text", a: "🦵 Knee/Hip Replacement\n\nExpert surgeons · Minimally invasive options\n\n📞 " + CONFIG.phone1 },
  { k: ["back pain","kamar dard","spine"], type: "text", a: "Orthopaedics + Physiotherapy treat back pain effectively.\n📞 " + CONFIG.phone1 },
  { k: ["blood pressure","bp","hypertension"], type: "text", a: "General Medicine & Cardiology manage hypertension.\n📞 " + CONFIG.phone1 },
  { k: ["stone","pathri","kidney stone","gallstone","pittashay"], type: "text", a: "💧 Stone Treatment\n\nKidney: Urology dept · Gallbladder: Surgery dept\nLaser & surgical options.\n📞 " + CONFIG.phone1 },
  { k: ["fever","bukhaar","bukhar"], type: "text", a: "General Medicine treats fever & infections.\n\nWalk in or call: 📞 " + CONFIG.phone1 },
  { k: ["job","career","vacancy","recruitment","naukri","nurse job"], type: "text", a: "💼 Careers at Trinay\n\n🌐 " + CONFIG.website + "/careers\n📧 " + CONFIG.email },
  { k: ["feedback","complaint","review","suggestion"], type: "text", a: "📝 Your feedback matters!\n\n📧 " + CONFIG.email + "\n📞 " + CONFIG.phone1 },
  { k: ["gallery","photos","pictures"], type: "text", a: "📸 Hospital Gallery:\n🌐 " + CONFIG.website + "/gallery" },
  { k: ["health package","checkup package","health checkup"], type: "text", a: "💊 Health Checkup Packages available!\n📞 " + CONFIG.phone1 + "\n🌐 " + CONFIG.website },
];

const CORRECTIONS = {
  hosiptal:"hospital",hospitl:"hospital",hosptal:"hospital",
  apointment:"appointment",apointmnt:"appointment",appoitmnt:"appointment",
  emergancy:"emergency",emmergency:"emergency",imarjansi:"emergency",
  doctr:"doctor",docter:"doctor",dokter:"doctor",
  surjery:"surgery",surgry:"surgery",sargery:"surgery",
  phisio:"physiotherapy",orthopidic:"orthopaedics",
  ginecologist:"gynaecology",gynecologst:"gynaecology",
  inshurence:"insurance",insurans:"insurance",
  whtsap:"whatsapp",wahtsapp:"whatsapp",watsap:"whatsapp",
};

function fuzzyMatch(input) {
  let q = input.toLowerCase().replace(/[^\w\s]/g," ").replace(/\s+/g," ").trim();
  Object.keys(CORRECTIONS).forEach(k => { q = q.replace(new RegExp(k,"g"), CORRECTIONS[k]); });
  let best = 0, match = null;
  for (const qa of QA_DB) {
    let score = 0;
    for (const kw of qa.k) {
      if (q.includes(kw)) score += kw.length * 2;
      else { for (const w of kw.split(" ")) if (w.length >= 3 && q.includes(w)) score += w.length; }
    }
    if (score > best) { best = score; match = qa; }
  }
  return best >= 3 ? match : null;
}

// ─── ICONS ───────────────────────────────────────────────
const IcoChat = () => <svg viewBox="0 0 24 24" style={{width:28,height:28,fill:"white"}}><path d="M12 2C6.48 2 2 6.04 2 11c0 2.7 1.23 5.12 3.18 6.78L4 22l4.54-2.27C9.64 20.24 10.8 20.5 12 20.5c5.52 0 10-4.04 10-9S17.52 2 12 2zm1 12H7v-2h6v2zm2-4H7V8h8v2z"/></svg>;
const IcoClose = () => <svg viewBox="0 0 24 24" style={{width:22,height:22,fill:"white"}}><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>;
const IcoPhone = () => <svg viewBox="0 0 24 24" style={{width:18,height:18,fill:"currentColor"}}><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>;
const IcoWA = () => <svg viewBox="0 0 24 24" style={{width:18,height:18,fill:"currentColor"}}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.12 1.528 5.845L0 24l6.335-1.508A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.9 0-3.68-.508-5.215-1.395l-.374-.223-3.872.921.958-3.771-.244-.388A9.97 9.97 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>;
const IcoSend = () => <svg viewBox="0 0 24 24" style={{width:20,height:20,fill:"white"}}><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>;
const IcoBot = () => <svg viewBox="0 0 24 24" style={{width:16,height:16,fill:"white"}}><path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zm-2 10H6V7h12v12zm-9-6h2v2H9v-2zm0-4h2v2H9V9zm4 4h2v2h-2v-2zm0-4h2v2h-2V9z"/></svg>;
const IcoUser = () => <svg viewBox="0 0 24 24" style={{width:16,height:16,fill:"white"}}><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>;
const IcoLoc = () => <svg viewBox="0 0 24 24" style={{width:14,height:14,fill:"currentColor"}}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;

// ─── QUICK REPLIES ────────────────────────────────────────
const QUICK_REPLIES = [
  { label: "📅 Appointment", q: "Book Appointment" },
  { label: "🚨 Emergency",   q: "Emergency" },
  { label: "🏥 Departments", q: "All Departments" },
  { label: "📞 Contact",     q: "Phone number" },
  { label: "💳 Insurance",   q: "Cashless insurance" },
  { label: "⏰ OPD Timing",  q: "OPD timing" },
];

// ─── MESSAGE CARDS ────────────────────────────────────────
function EmergencyCard() {
  return (
    <div style={{background:"#fff1f2",border:"2px solid #fecaca",borderRadius:16,padding:"14px 16px",marginTop:4}}>
      <div style={{color:"#dc2626",fontWeight:700,fontSize:13,marginBottom:6}}>🚨 EMERGENCY — Call NOW!</div>
      <a href="tel:+919119191622" style={{display:"block",color:"#dc2626",fontWeight:900,fontSize:18,marginBottom:4,textDecoration:"none"}}>📞 {CONFIG.phone1}</a>
      <p style={{color:"#ef4444",fontSize:11,marginBottom:10}}>Available 24 Hours · 7 Days a Week</p>
      <a href="tel:+919119191622" style={{display:"inline-block",background:"#dc2626",color:"white",fontSize:11,fontWeight:700,padding:"8px 16px",borderRadius:20,textDecoration:"none"}}>📞 TAP TO CALL NOW</a>
    </div>
  );
}

function ContactCard({ extra }) {
  if (extra === "pali") return (
    <div style={{background:"white",border:"1px solid #e2e8f0",borderRadius:16,padding:"14px 16px",marginTop:4}}>
      <p style={{fontWeight:700,color:"#1e3a8a",fontSize:13,marginBottom:6}}>🏥 Trinay — Pali Branch</p>
      <p style={{color:"#64748b",fontSize:11,marginBottom:6}}>{CONFIG.paliAddress}</p>
      <a href={`tel:${CONFIG.paliPhone.replace(/\s/g,"")}`} style={{color:"#1d4ed8",fontWeight:600,fontSize:13,textDecoration:"none"}}>📞 {CONFIG.paliPhone}</a>
    </div>
  );
  return (
    <div style={{background:"white",border:"1px solid #e2e8f0",borderRadius:16,padding:"14px 16px",marginTop:4}}>
      <p style={{fontWeight:700,color:"#1e3a8a",fontSize:13,marginBottom:8}}>📞 Trinay Hospital Contacts</p>
      {[
        {icon:"📞",label:CONFIG.phone1,href:"tel:+919119191622"},
        {icon:"📞",label:CONFIG.phone2,href:"tel:+919119191722"},
        {icon:"💬",label:"WhatsApp Us",href:CONFIG.whatsapp},
        {icon:"📧",label:CONFIG.email,href:`mailto:${CONFIG.email}`},
        {icon:"🌐",label:"trinay.in",href:CONFIG.website},
      ].map((r,i)=>(
        <a key={i} href={r.href} target={r.href.startsWith("http")?"_blank":undefined}
          style={{display:"flex",alignItems:"center",gap:8,color:"#1d4ed8",fontSize:12,fontWeight:600,marginBottom:5,textDecoration:"none"}}>
          <span>{r.icon}</span><span>{r.label}</span>
        </a>
      ))}
    </div>
  );
}

function LocationCard() {
  return (
    <div style={{background:"white",border:"1px solid #e2e8f0",borderRadius:16,padding:"14px 16px",marginTop:4}}>
      <p style={{fontWeight:700,color:"#1e3a8a",fontSize:13,marginBottom:10}}>📍 Trinay Hospital Locations</p>
      <div style={{marginBottom:10}}>
        <p style={{color:"#1d4ed8",fontWeight:600,fontSize:11,marginBottom:4}}>🏥 Jodhpur (Main)</p>
        <p style={{color:"#64748b",fontSize:11,marginBottom:6}}>{CONFIG.address}</p>
        <a href="https://www.google.com/maps/search/Trinay+Hospital+Jodhpur" target="_blank" rel="noreferrer"
          style={{display:"inline-block",background:"#1d4ed8",color:"white",fontSize:11,fontWeight:600,padding:"6px 12px",borderRadius:20,textDecoration:"none"}}>
          📍 Open in Maps
        </a>
      </div>
      <div>
        <p style={{color:"#1d4ed8",fontWeight:600,fontSize:11,marginBottom:4}}>🏥 Pali Branch</p>
        <p style={{color:"#64748b",fontSize:11,marginBottom:4}}>{CONFIG.paliAddress}</p>
        <a href={`tel:${CONFIG.paliPhone.replace(/\s/g,"")}`} style={{color:"#1d4ed8",fontWeight:600,fontSize:11,textDecoration:"none"}}>📞 {CONFIG.paliPhone}</a>
      </div>
    </div>
  );
}

function AppointmentCard() {
  return (
    <div style={{background:"white",border:"1px solid #e2e8f0",borderRadius:16,padding:"14px 16px",marginTop:4}}>
      <p style={{fontWeight:700,color:"#1e3a8a",fontSize:13,marginBottom:10}}>📅 Book an Appointment</p>
      {[
        {icon:"📞",label:CONFIG.phone1,href:"tel:+919119191622",bg:"#eff6ff"},
        {icon:"💬",label:"WhatsApp",href:CONFIG.whatsapp,bg:"#f0fdf4"},
        {icon:"🌐",label:"Book Online at trinay.in",href:CONFIG.website,bg:"#eff6ff"},
      ].map((b,i)=>(
        <a key={i} href={b.href} target={b.href.startsWith("http")?"_blank":undefined}
          style={{display:"flex",alignItems:"center",gap:12,background:b.bg,borderRadius:12,padding:"10px 12px",marginBottom:8,textDecoration:"none"}}>
          <span style={{fontSize:18}}>{b.icon}</span>
          <span style={{color:"#1e3a8a",fontWeight:600,fontSize:12}}>{b.label}</span>
        </a>
      ))}
    </div>
  );
}

function InsuranceCard() {
  return (
    <div style={{background:"white",border:"1px solid #e2e8f0",borderRadius:16,padding:"14px 16px",marginTop:4}}>
      <p style={{fontWeight:700,color:"#1e3a8a",fontSize:13,marginBottom:10}}>💳 Cashless & Insurance</p>
      <div style={{marginBottom:10}}>
        {["✅ Mukhyamantri Ayushman Arogya Yojana","✅ RGHS (Rajasthan Govt Health Scheme)","✅ ECHS (Ex-Servicemen)","✅ Ayushman CAPF","✅ RBSK","✅ Multiple TPA & Private Insurance"].map((s,i)=>(
          <p key={i} style={{color:"#334155",fontSize:11,marginBottom:3}}>{s}</p>
        ))}
      </div>
      <a href="tel:+919119191622" style={{display:"inline-block",background:"#1d4ed8",color:"white",fontSize:11,fontWeight:700,padding:"8px 16px",borderRadius:20,textDecoration:"none"}}>
        📞 {CONFIG.phone1}
      </a>
    </div>
  );
}

// ─── SINGLE MESSAGE ───────────────────────────────────────
function Message({ msg }) {
  const isBot = msg.role === "bot";
  return (
    <div style={{display:"flex",gap:8,flexDirection:isBot?"row":"row-reverse",marginBottom:2}}>
      <div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,alignSelf:"flex-end",marginBottom:18,background:isBot?"linear-gradient(135deg,#3b82f6,#1e3a8a)":"linear-gradient(135deg,#64748b,#334155)"}}>
        {isBot ? <IcoBot /> : <IcoUser />}
      </div>
      <div style={{maxWidth:"82%",display:"flex",flexDirection:"column",alignItems:isBot?"flex-start":"flex-end"}}>
        {msg.type === "text" && (
          <div style={{padding:"10px 14px",borderRadius:18,fontSize:13,lineHeight:1.6,border:"1px solid",
            borderColor:isBot?"#e2e8f0":"#3b82f6",
            background:isBot?"white":"linear-gradient(135deg,#2563eb,#1e3a8a)",
            color:isBot?"#1e293b":"white",
            borderBottomLeftRadius:isBot?4:18,
            borderBottomRightRadius:isBot?18:4,
          }}>
            <span style={{whiteSpace:"pre-line"}}>{msg.content}</span>
          </div>
        )}
        {msg.type === "emergency" && <EmergencyCard />}
        {msg.type === "contact" && <ContactCard extra={msg.extra} />}
        {msg.type === "location" && <LocationCard />}
        {msg.type === "appointment" && <AppointmentCard />}
        {msg.type === "insurance" && <InsuranceCard />}
        <p style={{fontSize:10,color:"#94a3b8",marginTop:3,paddingInline:4}}>{msg.time}</p>
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{display:"flex",gap:8,alignItems:"flex-end"}}>
      <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#3b82f6,#1e3a8a)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
        <IcoBot />
      </div>
      <div style={{background:"white",border:"1px solid #e2e8f0",borderRadius:"18px 18px 18px 4px",padding:"10px 14px",display:"flex",gap:5,alignItems:"center"}}>
        {[0,1,2].map(i=>(
          <span key={i} style={{width:8,height:8,borderRadius:"50%",background:"#93c5fd",display:"inline-block",
            animation:`tcBounce 1.2s ${i*0.2}s ease-in-out infinite`}} />
        ))}
      </div>
    </div>
  );
}

// ─── MAIN CHATBOT ─────────────────────────────────────────
export default function TrinayChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [badge, setBadge] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const now = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) {
      setBadge(false);
      document.body.style.overflow = window.innerWidth < 640 ? "hidden" : "";
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setMessages([{
        id: Date.now(), role: "bot", type: "text", time: now(),
        content: "🙏 Namaste! Welcome to Trinay Hospital — Jodhpur's leading multispeciality hospital!\n\nI can help you with:\n📅 Appointments\n🚨 Emergency Info\n🏥 Departments\n📞 Contact Details\n💳 Insurance & Cashless\n\nType your question in English या Hindi! 😊",
      }]);
    }, 1500);
    return () => clearTimeout(t);
  }, []);

  const addBotMessage = useCallback((qa) => {
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now(), role: "bot",
        type: qa ? qa.type : "text",
        extra: qa?.extra,
        time: now(),
        content: qa ? qa.a : `I'm not sure about that. Please contact us:\n📞 ${CONFIG.phone1}\n💬 WhatsApp: ${CONFIG.phone2}\n📧 ${CONFIG.email}`,
      }]);
    }, 800 + Math.random() * 500);
    return () => clearTimeout(t);
  }, []);

  const send = useCallback(() => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages(prev => [...prev, { id: Date.now(), role: "user", type: "text", time: now(), content: text }]);
    addBotMessage(fuzzyMatch(text));
  }, [input, addBotMessage]);

  const quickReply = useCallback((q) => {
    setMessages(prev => [...prev, { id: Date.now(), role: "user", type: "text", time: now(), content: q }]);
    addBotMessage(fuzzyMatch(q));
  }, [addBotMessage]);

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  const closeChat = useCallback(() => {
    setOpen(false);
  }, []);

  const toggleChat = useCallback(() => {
    setOpen(v => !v);
  }, []);

  return createPortal(
    <>
      {/* ── Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
        #tc-root { font-family: 'DM Sans', -apple-system, sans-serif; }
        #tc-root * { box-sizing: border-box; }
        @keyframes tcBounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes tcSlideUp { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes tcSheetUp { from{opacity:0;transform:translateY(100%)} to{opacity:1;transform:translateY(0)} }
        @keyframes tcPulse { 0%{transform:scale(1);opacity:.35} 70%,100%{transform:scale(1.65);opacity:0} }
        @keyframes tcFadeUp { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .tc-msg-enter { animation: tcFadeUp .3s ease forwards; }
        .tc-btn-pulse::before {
          content:''; position:absolute; inset:-6px; border-radius:50%;
          background:linear-gradient(135deg,#60a5fa,#1e40af);
          opacity:.35; animation:tcPulse 2.5s ease-out infinite; z-index:-1;
        }
        /* scrollbar hide */
        #tc-msgs::-webkit-scrollbar { width: 4px; }
        #tc-msgs::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 2px; }
        #tc-chips::-webkit-scrollbar { display: none; }
      `}</style>

      <div id="tc-root">
        {/* ── Backdrop on mobile when open ── */}
        {open && (
          <div
            onClick={closeChat}
            style={{
              position:"fixed", inset:0, background:"rgba(0,0,0,0.45)",
              zIndex:99990,
              display:"block",
            }}
            className="sm:hidden"
          />
        )}

        {/* ── Chat Window ── */}
        {open && (
          <div
            style={{
              position: "fixed",
              zIndex: 99995,
              background: "white",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              fontFamily: "'DM Sans', -apple-system, sans-serif",
              /* Mobile: full-width bottom sheet */
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: "24px 24px 0 0",
              maxHeight: "88vh",
              boxShadow: "0 -4px 40px rgba(0,0,0,0.18)",
              animation: "tcSheetUp .35s cubic-bezier(.34,1.1,.64,1) forwards",
            }}
            className="sm:!bottom-[90px] sm:!left-auto sm:!right-6 sm:!max-h-[600px] sm:!w-[390px] sm:!rounded-3xl sm:!shadow-2xl sm:!border sm:!border-slate-200"
            style2={{ animation: "tcSlideUp .35s cubic-bezier(.34,1.1,.64,1) forwards" }}
          >
            {/* HEADER */}
            <div style={{background:"linear-gradient(135deg,#1e40af,#1e3a8a)",padding:"14px 16px",display:"flex",alignItems:"center",gap:12,flexShrink:0,position:"relative",overflow:"hidden"}}>
              <div style={{position:"absolute",right:-20,top:-20,width:100,height:100,borderRadius:"50%",background:"rgba(255,255,255,0.05)",pointerEvents:"none"}} />
              {/* Avatar */}
              <div style={{width:44,height:44,borderRadius:"50%",background:"rgba(255,255,255,0.18)",border:"2px solid rgba(255,255,255,0.3)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,position:"relative"}}>
                <svg viewBox="0 0 24 24" style={{width:24,height:24,fill:"white"}}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z"/></svg>
                <span style={{position:"absolute",bottom:1,right:1,width:11,height:11,background:"#4ade80",borderRadius:"50%",border:"2px solid #1e3a8a"}} />
              </div>
              {/* Title */}
              <div style={{flex:1,minWidth:0}}>
                <p style={{color:"white",fontWeight:800,fontSize:15,margin:0,lineHeight:1.2}}>🏥 Trinay Hospital</p>
                <p style={{color:"rgba(191,219,254,0.9)",fontSize:11,margin:"3px 0 0",display:"flex",alignItems:"center",gap:5}}>
                  <span style={{width:7,height:7,background:"#4ade80",borderRadius:"50%",display:"inline-block"}} />
                  Online · Jodhpur, Rajasthan
                </p>
              </div>
              {/* Action buttons */}
              <div style={{display:"flex",gap:6,alignItems:"center",position:"relative",zIndex:10}}>
                <a href="tel:+919119191622"
                  style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",textDecoration:"none",border:"1px solid rgba(255,255,255,0.2)",flexShrink:0}}
                  title="Call">
                  <IcoPhone />
                </a>
                <a href={CONFIG.whatsapp} target="_blank" rel="noreferrer"
                  style={{width:36,height:36,borderRadius:"50%",background:"rgba(255,255,255,0.15)",display:"flex",alignItems:"center",justifyContent:"center",color:"white",textDecoration:"none",border:"1px solid rgba(255,255,255,0.2)",flexShrink:0}}
                  title="WhatsApp">
                  <IcoWA />
                </a>
                {/* CLOSE BUTTON — large, clear, guaranteed working */}
                <button
                  type="button"
                  onClick={closeChat}
                  title="Close chat"
                  style={{
                    width:36, height:36, borderRadius:"50%",
                    background:"rgba(239,68,68,0.85)",
                    border:"1px solid rgba(255,255,255,0.3)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    cursor:"pointer", flexShrink:0,
                    transition:"background .2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background="rgba(220,38,38,1)"}
                  onMouseLeave={e => e.currentTarget.style.background="rgba(239,68,68,0.85)"}
                >
                  <IcoClose />
                </button>
              </div>
            </div>

            {/* INFO BAR */}
            <div id="tc-chips" style={{display:"flex",gap:14,padding:"8px 14px",background:"#eff6ff",borderBottom:"1px solid #bfdbfe",overflowX:"auto",flexShrink:0,scrollbarWidth:"none"}}>
              <a href="tel:+919119191622" style={{display:"flex",alignItems:"center",gap:5,color:"#1d4ed8",fontSize:11,fontWeight:600,textDecoration:"none",whiteSpace:"nowrap"}}>
                <IcoPhone /> 91191 91622
              </a>
              <a href={CONFIG.website} target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:5,color:"#1d4ed8",fontSize:11,fontWeight:600,textDecoration:"none",whiteSpace:"nowrap"}}>
                🌐 trinay.in
              </a>
              <a href="https://maps.google.com?q=Trinay+Hospital+Jodhpur" target="_blank" rel="noreferrer" style={{display:"flex",alignItems:"center",gap:5,color:"#1d4ed8",fontSize:11,fontWeight:600,textDecoration:"none",whiteSpace:"nowrap"}}>
                <IcoLoc /> Jodhpur
              </a>
              <button onClick={() => quickReply("Emergency")} style={{display:"flex",alignItems:"center",gap:5,color:"#dc2626",fontSize:11,fontWeight:700,background:"none",border:"none",cursor:"pointer",whiteSpace:"nowrap",marginLeft:"auto",padding:0}}>
                🚨 Emergency
              </button>
            </div>

            {/* MESSAGES */}
            <div id="tc-msgs" style={{flex:1,overflowY:"auto",padding:"14px 14px",display:"flex",flexDirection:"column",gap:6,background:"#f8fafc",minHeight:0}}>
              {messages.map(msg => <Message key={msg.id} msg={msg} />)}
              {typing && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* QUICK REPLIES */}
            <div style={{display:"flex",gap:8,padding:"8px 12px",background:"#f8fafc",borderTop:"1px solid #f1f5f9",overflowX:"auto",scrollbarWidth:"none",flexShrink:0}}>
              {QUICK_REPLIES.map((qr,i) => (
                <button key={i} onClick={() => quickReply(qr.q)}
                  style={{flexShrink:0,padding:"6px 12px",borderRadius:20,border:"2px solid #2563eb",color:"#1d4ed8",fontSize:11,fontWeight:700,background:"white",cursor:"pointer",whiteSpace:"nowrap",transition:"all .15s"}}>
                  {qr.label}
                </button>
              ))}
            </div>

            {/* INPUT */}
            <div style={{padding:"10px 12px",background:"white",borderTop:"1px solid #e2e8f0",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
              <a href="tel:+919119191622"
                style={{width:40,height:40,borderRadius:"50%",background:"linear-gradient(135deg,#22c55e,#16a34a)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,color:"white",textDecoration:"none",boxShadow:"0 2px 8px rgba(34,197,94,0.4)"}}>
                <IcoPhone />
              </a>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Type in English or Hindi..."
                maxLength={300}
                style={{flex:1,background:"#f1f5f9",borderRadius:20,padding:"10px 16px",fontSize:13,color:"#1e293b",border:"2px solid transparent",outline:"none",transition:"border .2s"}}
                onFocus={e => e.target.style.borderColor="#3b82f6"}
                onBlur={e => e.target.style.borderColor="transparent"}
              />
              <button onClick={send} disabled={!input.trim()}
                style={{width:40,height:40,borderRadius:"50%",background:input.trim()?"linear-gradient(135deg,#3b82f6,#1e3a8a)":"#e2e8f0",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,border:"none",cursor:input.trim()?"pointer":"default",boxShadow:input.trim()?"0 2px 8px rgba(59,130,246,0.4)":"none",transition:"all .2s"}}>
                <IcoSend />
              </button>
            </div>

            {/* FOOTER */}
            <div style={{background:"white",padding:"8px 16px 10px",textAlign:"center",borderTop:"1px solid #f1f5f9",flexShrink:0}}>
              <p style={{fontSize:10,color:"#94a3b8",margin:0}}>
                Powered by{" "}
                <a href={CONFIG.website} target="_blank" rel="noreferrer" style={{color:"#2563eb",fontWeight:600,textDecoration:"none"}}>Trinay Hospital</a>
                {" · "}
                <a href="tel:+919119191622" style={{color:"#2563eb",fontWeight:600,textDecoration:"none"}}>{CONFIG.phone1}</a>
              </p>
            </div>
          </div>
        )}

        {/* ── Floating Trigger Button — always bottom-right ── */}
        <button
          type="button"
          onClick={toggleChat}
          aria-label={open ? "Close chat" : "Open Trinay Hospital Chat"}
          style={{
            position: "fixed",
            bottom: 24,
            right: 24,
            zIndex: 99999,
            width: 60,
            height: 60,
            borderRadius: "50%",
            background: open
              ? "linear-gradient(135deg,#ef4444,#dc2626)"
              : "linear-gradient(135deg,#3b82f6,#1e3a8a)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(59,130,246,0.45), 0 0 0 0 rgba(59,130,246,0.4)",
            transition: "all .3s cubic-bezier(.34,1.2,.64,1)",
          }}
          className="tc-btn-pulse"
        >
          {/* Badge */}
          {badge && !open && (
            <span style={{
              position:"absolute", top:-4, right:-4,
              width:20, height:20, background:"#ef4444", borderRadius:"50%",
              border:"2px solid white", display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:10, fontWeight:700, color:"white",
            }}>1</span>
          )}
          {open ? <IcoClose /> : <IcoChat />}
        </button>
      </div>
    </>,
    document.body
  );
}
