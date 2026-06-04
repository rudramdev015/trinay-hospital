import { createElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, LogIn, User, Shield, Stethoscope, Activity } from "lucide-react";
import { buildApiUrl } from "../utils/api";
import hospitalLogo from "../components/common/trinayhospital_logo.jpg";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const response = await fetch(buildApiUrl("/api/admin/login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const rawText = await response.text();
            let data = null;
            if (rawText) { try { data = JSON.parse(rawText); } catch (_) { data = null; } }
            if (!response.ok) throw new Error(data?.message || rawText || "Invalid username or password");
            if (!data?.token) throw new Error("Login failed. No token received.");
            localStorage.setItem("adminToken", data.token);
            navigate("/admin/dashboard");
        } catch (err) {
            const fallback = err?.message === "Failed to fetch"
                ? "Unable to reach server. Check backend URL and CORS."
                : "Login failed";
            setError(err?.message || fallback);
            setTimeout(() => setError(""), 4000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex" style={{ background: "#f0f4ff" }}>

            {/* ── Left branding panel ───────────────────────────────── */}
            <div
                className="hidden lg:flex lg:w-[42%] xl:w-[46%] flex-col relative overflow-hidden"
                style={{ background: "linear-gradient(145deg, #021390 0%, #041AA9 40%, #0B27CE 70%, #1535E8 100%)" }}
            >
                {/* Background decorative blobs */}
                <div className="absolute top-[-80px] left-[-80px] w-80 h-80 rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, #60A5FA, transparent)" }} />
                <div className="absolute bottom-[-60px] right-[-60px] w-96 h-96 rounded-full opacity-10"
                    style={{ background: "radial-gradient(circle, #A78BFA, transparent)" }} />
                <div className="absolute top-1/2 left-1/4 w-56 h-56 rounded-full opacity-5"
                    style={{ background: "radial-gradient(circle, #F9FAFB, transparent)" }} />

                {/* Dot grid pattern */}
                <div className="absolute inset-0 opacity-[0.06]"
                    style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

                <div className="relative z-10 flex flex-col justify-between h-full px-10 py-12">
                    {/* Logo + Name */}
                    <div>
                        <div className="inline-flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-4 py-3 backdrop-blur-sm">
                            <img src={hospitalLogo} alt="Trinay Hospital" className="h-11 w-auto" />
                        </div>
                        <h1 className="mt-8 text-4xl xl:text-5xl font-black text-white leading-tight tracking-tight">
                            Trinay<br />
                            <span style={{ color: "#93C5FD" }}>Hospital</span>
                        </h1>
                        <p className="mt-3 text-blue-200 text-base font-medium leading-relaxed max-w-xs">
                            Jodhpur's Premier NABH-Accredited Multi-speciality Hospital — delivering world-class healthcare.
                        </p>
                    </div>

                    {/* Feature pills */}
                    <div className="space-y-3">
                        {[
                            { icon: Stethoscope, label: "24+ Expert Specialists" },
                            { icon: Activity,    label: "24/7 Emergency & ICU" },
                            { icon: Shield,      label: "Secure Admin Portal" },
                        ].map(({ icon, label }) => (
                            <div key={label} className="flex items-center gap-3 bg-white/8 border border-white/12 rounded-xl px-4 py-3 backdrop-blur-sm">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                                    style={{ background: "rgba(255,255,255,0.12)" }}>
                                    {createElement(icon, { className: "h-4 w-4 text-blue-200" })}
                                </div>
                                <span className="text-white/80 text-sm font-semibold">{label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Footer tag */}
                    <p className="text-blue-400/60 text-xs font-medium">
                        © {new Date().getFullYear()} Trinay Hospital. All rights reserved.
                    </p>
                </div>
            </div>

            {/* ── Right login panel ─────────────────────────────────── */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-md">

                    {/* Mobile-only logo */}
                    <div className="flex justify-center mb-8 lg:hidden">
                        <div className="bg-white rounded-2xl px-5 py-3 shadow-lg border border-blue-100">
                            <img src={hospitalLogo} alt="Trinay Hospital" className="h-12 w-auto" />
                        </div>
                    </div>

                    {/* Card */}
                    <div className="bg-white rounded-3xl shadow-2xl shadow-blue-900/10 border border-blue-100/80 overflow-hidden">

                        {/* Top accent bar */}
                        <div className="h-1.5 w-full" style={{ background: "linear-gradient(to right, #041AA9, #3B82F6, #06B6D4)" }} />

                        <div className="px-8 py-9">
                            {/* Heading */}
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-1">
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                        style={{ background: "linear-gradient(135deg, #041AA9, #3B82F6)" }}>
                                        <Shield className="h-3.5 w-3.5 text-white" />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-widest" style={{ color: "#041AA9" }}>
                                        Admin Portal
                                    </span>
                                </div>
                                <h2 className="text-2xl font-black text-slate-900 mt-3">Welcome Back</h2>
                                <p className="text-slate-500 text-sm mt-1">Sign in to manage Trinay Hospital operations.</p>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="mb-6 flex items-center gap-2.5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    <span className="shrink-0 w-2 h-2 rounded-full bg-red-500" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleLogin} className="space-y-5">
                                {/* Username */}
                                <div>
                                    <label htmlFor="username" className="block text-xs font-bold text-slate-700 mb-2 ml-0.5 uppercase tracking-wider">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <User className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <input
                                            id="username"
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            required
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-800 font-medium placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-100 focus:shadow-md"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block text-xs font-bold text-slate-700 mb-2 ml-0.5 uppercase tracking-wider">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <Lock className="h-4 w-4 text-blue-400" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            required
                                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-12 text-sm text-slate-800 font-medium placeholder:text-slate-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-3 focus:ring-blue-100 focus:shadow-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((p) => !p)}
                                            tabIndex={-1}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                                        >
                                            {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-2xl text-white text-sm font-bold shadow-lg transition-all duration-200 hover:scale-[1.015] hover:shadow-xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
                                    style={{ background: "linear-gradient(135deg, #041AA9 0%, #1535E8 100%)" }}
                                >
                                    {loading ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Signing in…
                                        </>
                                    ) : (
                                        <>
                                            <LogIn className="h-4 w-4" />
                                            Sign In
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Bottom note */}
                    <p className="mt-6 text-center text-xs text-slate-400 font-medium">
                        Authorised personnel only · Trinay Hospital, Jodhpur
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
