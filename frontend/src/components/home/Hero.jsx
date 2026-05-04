const Hero = () => (
    <section className="relative h-screen w-full overflow-hidden bg-black select-none">

        {/* MOBILE VIDEO — shown on screens < 768px */}
        <div className="md:hidden absolute inset-0 w-full h-full">
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/hero-mobile.mp4" type="video/mp4" />
            </video>
        </div>

        {/* DESKTOP VIDEO — shown on screens >= 768px */}
        <div className="hidden md:block absolute inset-0 w-full h-full">
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src="/trinay%20hospital.mp4" type="video/mp4" />
            </video>
        </div>

    </section>
);

export default Hero;
