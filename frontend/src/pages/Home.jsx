// test-deploy-check-v1
import { Suspense, lazy } from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

// Lazy loading components for better performance
const About              = lazy(() => import('../components/home/About'));
const Accreditations     = lazy(() => import('../components/home/Accreditations'));
const ServicesPreview    = lazy(() => import('../components/home/ServicesPreview'));
const KeyServices        = lazy(() => import('../components/home/KeyServices'));
const DoctorsPreview     = lazy(() => import('../components/home/DoctorsPreview'));
const Facilities         = lazy(() => import('../components/home/Facilities'));
const MediaHighlights    = lazy(() => import('../components/home/MediaHighlights'));
const HealthPackages     = lazy(() => import('../components/home/HealthPackages'));
const InsurancePartners  = lazy(() => import('../components/home/InsurancePartners'));
const CallToAction       = lazy(() => import('../components/home/CallToAction'));
const Testimonials       = lazy(() => import('../components/home/Testimonials'));

const Skeleton = ({ h = 'min-h-[320px]' }) => (
    <div className={`${h} bg-slate-50 animate-pulse mx-auto w-full`} />
);

const Home = () => {
    return (
        <div className="min-h-screen bg-white selection:bg-blue-100 selection:text-blue-900">
            {/* Header */}
            <Navbar />

            <main>
                {/* 1. Hero Section with Mobile Video Background */}
                <Hero />

                {/* 2. Stats Section (Responsive Overlay) */}
                <Stats />

                {/* 3. About Section */}
                <Suspense fallback={<Skeleton h="min-h-[560px]" />}>
                    <About />
                </Suspense>

                {/* 4. Accreditations & Certifications */}
                <Suspense fallback={<Skeleton h="min-h-[480px]" />}>
                    <Accreditations />
                </Suspense>

                {/* 5. Why Choose Us */}
                <Suspense fallback={<Skeleton h="min-h-[480px]" />}>
                    <ServicesPreview />
                </Suspense>

                {/* 5. Medical Specialties */}
                <Suspense fallback={<Skeleton h="min-h-[560px]" />}>
                    <KeyServices />
                </Suspense>

                {/* 6. Doctors Section */}
                <Suspense fallback={<Skeleton h="min-h-[500px]" />}>
                    <DoctorsPreview />
                </Suspense>

                {/* 7. Facilities & Infrastructure */}
                <Suspense fallback={<Skeleton h="min-h-[480px]" />}>
                    <Facilities />
                </Suspense>

                {/* 8. Photo Gallery Highlights */}
                <Suspense fallback={<Skeleton h="min-h-[400px]" />}>
                    <MediaHighlights />
                </Suspense>

                {/* 9. Health Packages */}
                <Suspense fallback={<Skeleton h="min-h-[480px]" />}>
                    <HealthPackages />
                </Suspense>

                {/* 9. Insurance Partners */}
                <Suspense fallback={<Skeleton h="min-h-[220px]" />}>
                    <InsurancePartners />
                </Suspense>

                {/* 10. Emergency Call to Action */}
                <Suspense fallback={<Skeleton h="min-h-[300px]" />}>
                    <CallToAction />
                </Suspense>

                {/* 11. Testimonials */}
                <Suspense fallback={null}>
                    <Testimonials />
                </Suspense>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;