import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { HeartPulse, Users, LayoutGrid, BedDouble } from "lucide-react";

const STATS = [
    { value: 24,  suffix: "/7", label: "Emergency Care",  Icon: HeartPulse, color: "text-rose-500",  bg: "bg-rose-50",  ring: "ring-rose-100"  },
    { value: 24,  suffix: "+",  label: "Expert Doctors",  Icon: Users,      color: "text-blue-600", bg: "bg-blue-50",  ring: "ring-blue-100"  },
    { value: 17,  suffix: "",   label: "Departments",     Icon: LayoutGrid, color: "text-teal-600", bg: "bg-teal-50",  ring: "ring-teal-100"  },
    { value: 100, suffix: "+",  label: "Bed Capacity",    Icon: BedDouble,  color: "text-amber-500",bg: "bg-amber-50", ring: "ring-amber-100" },
];

const StatCard = ({ value, suffix, label, Icon, color, bg, ring, duration = 1300 }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.35 });
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isInView) return;
        let frameId;
        const start = performance.now();
        const animate = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setCount(Math.max(1, Math.round(eased * value)));
            if (p < 1) frameId = requestAnimationFrame(animate);
        };
        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, [isInView, value, duration]);

    return (
        <div ref={ref} className="flex flex-col items-center gap-3 text-center group">
            <div className={`w-14 h-14 rounded-2xl ${bg} ring-2 ${ring} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                <Icon size={26} className={color} />
            </div>
            <div>
                <p className="text-3xl md:text-4xl lg:text-5xl font-black text-[#003366] tracking-tight tabular-nums">
                    {count}{suffix}
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-500">{label}</p>
            </div>
        </div>
    );
};

const Stats = () => (
    <section className="relative z-10 -mt-10 pb-10 sm:-mt-14 md:-mt-20 md:pb-14 lg:-mt-24">
        <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-[26px] border border-white/60 bg-white/90 px-6 py-8 shadow-[0_20px_70px_rgba(4,26,169,0.13)] backdrop-blur-xl sm:px-10 md:px-14 md:py-10">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
                    {STATS.map((s) => (
                        <StatCard key={s.label} {...s} />
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default Stats;
