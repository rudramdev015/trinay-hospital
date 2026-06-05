import { motion } from "framer-motion";
import { Star, ExternalLink } from "lucide-react";

const StarRating = ({ rating, size = 14 }) => (
    <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
            <Star
                key={i}
                size={size}
                className={i < rating ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}
            />
        ))}
    </div>
);

const Avatar = ({ name, color }) => {
    const initials = name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    return (
        <div className={`w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 shadow-sm ${color}`}>
            {initials}
        </div>
    );
};

const REVIEWS = [
    {
        id: 1,
        name: "Priya Sharma",
        rating: 5,
        text: "Excellent treatment and very caring staff. The doctors explained everything clearly and my recovery was faster than expected. Highly recommend Trinay Hospital to everyone.",
        color: "bg-rose-500",
        time: "2 weeks ago",
    },
    {
        id: 2,
        name: "Ramesh Patel",
        rating: 5,
        text: "Best multispeciality hospital in Jodhpur. Clean, modern facilities and the ICU team is exceptional. My father was treated with outstanding care. Very grateful to the entire team.",
        color: "bg-blue-600",
        time: "1 month ago",
    },
    {
        id: 3,
        name: "Sunita Agarwal",
        rating: 4,
        text: "Good hospital with experienced doctors. The OPD service is quick and the staff is polite. Great experience during my knee surgery — professional from start to finish.",
        color: "bg-emerald-500",
        time: "3 weeks ago",
    },
    {
        id: 4,
        name: "Vikram Singh",
        rating: 5,
        text: "Had my laparoscopic surgery here and couldn't be happier. Minimal pain, quick recovery, and the surgical team was incredibly professional. Will always trust Trinay Hospital.",
        color: "bg-violet-500",
        time: "2 months ago",
    },
    {
        id: 5,
        name: "Kavita Joshi",
        rating: 5,
        text: "Trinay Hospital has the best gynaecology department in the city. The doctors are knowledgeable and the nursing staff made me feel safe and comfortable throughout my stay.",
        color: "bg-teal-500",
        time: "1 week ago",
    },
    {
        id: 6,
        name: "Mahesh Rathore",
        rating: 4,
        text: "Well-equipped hospital with modern medical technology. Emergency services are prompt and doctors are available round the clock. A truly reliable hospital for the whole family.",
        color: "bg-orange-500",
        time: "3 months ago",
    },
];

const GOOGLE_REVIEWS_URL =
    "https://www.google.com/maps/search/Trinay+Multispeciality+Hospital+Jodhpur+Rajasthan";

const ReviewCard = ({ review, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5 flex flex-col gap-3 group"
    >
        <StarRating rating={review.rating} />
        <p className="text-slate-600 text-sm leading-relaxed flex-1">{review.text}</p>
        <div className="flex items-center gap-3 pt-3 border-t border-slate-50 mt-auto">
            <Avatar name={review.name} color={review.color} />
            <div>
                <p className="font-bold text-slate-800 text-sm">{review.name}</p>
                <p className="text-slate-400 text-xs mt-0.5">{review.time}</p>
            </div>
        </div>
    </motion.div>
);

const Testimonials = () => {
    return (
        <section className="py-16 md:py-24 bg-[#f0f4ff]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">

                {/* Google Reviews Header Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 sm:p-6 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                >
                    <div className="flex items-center gap-4">
                        {/* Google G icon */}
                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow flex items-center justify-center shrink-0">
                            <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                            </svg>
                        </div>
                        <div>
                            <p className="font-black text-slate-800 text-base tracking-tight">Google Reviews</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-3xl font-black text-slate-900 leading-none">4.2</span>
                                <StarRating rating={5} size={15} />
                                <span className="text-slate-400 text-sm font-medium">Google</span>
                            </div>
                        </div>
                    </div>
                    <a
                        href={GOOGLE_REVIEWS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#003366] hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-blue-200 shrink-0"
                    >
                        <ExternalLink size={14} />
                        Share your feedback
                    </a>
                </motion.div>

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="text-center mb-10"
                >
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-500 mb-3">Patient Stories</p>
                    <h2 className="text-3xl md:text-4xl font-black text-[#003366] leading-tight">
                        Words from Our Patients
                    </h2>
                    <p className="text-slate-500 mt-3 max-w-lg mx-auto text-base leading-relaxed">
                        Real reviews from patients and families who trusted Trinay Hospital for their healthcare needs.
                    </p>
                </motion.div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {REVIEWS.map((review, i) => (
                        <ReviewCard key={review.id} review={review} delay={i * 0.07} />
                    ))}
                </div>

                {/* View all link */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="mt-10 text-center"
                >
                    <a
                        href={GOOGLE_REVIEWS_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#003366] font-bold border border-slate-200 hover:border-blue-200 px-7 py-3 rounded-full text-sm transition-all duration-300 hover:shadow-md shadow-sm"
                    >
                        View all reviews on Google
                        <ExternalLink size={13} />
                    </a>
                </motion.div>

            </div>
        </section>
    );
};

export default Testimonials;
