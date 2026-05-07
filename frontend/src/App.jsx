import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import SimplePage from "./components/common/SimplePage";
import ScrollToTop from "./components/common/ScrollToTop";
import TrinayChatbot from "./components/common/TrinayChatbot"; 

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Appointment = lazy(() => import("./pages/Appointment"));
const Contact = lazy(() => import("./pages/Contact"));
const Doctors = lazy(() => import("./pages/Doctors"));
const Insurance = lazy(() => import("./pages/Insurance"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Services = lazy(() => import("./pages/Services"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
// This is the new line to import your FAQ page
const Faq = lazy(() => import("./pages/faq"));
const DoctorDetail = lazy(() => import("./pages/DoctorDetail"));
const Terms = lazy(() => import("./pages/Terms"));
const Careers = lazy(() => import("./pages/Careers"));
const StaffPortal = lazy(() => import("./pages/StaffPortal"));
const Mission = lazy(() => import("./pages/Mission"));

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <TrinayChatbot />
      <Suspense fallback={<SimplePage />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/services" element={<Services />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/insurance" element={<Insurance />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          {/* This is the new line to create the /faq web address */}
          <Route path="/faq" element={<Faq />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/staff" element={<StaffPortal />} />
          <Route path="/mission" element={<Mission />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;