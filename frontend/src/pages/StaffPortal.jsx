import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LogIn, LogOut, Clock, CheckCircle2, XCircle,
    User, Calendar, AlertCircle, Loader2,
    Shield, TrendingUp, Activity, Fingerprint,
    Zap, Award, ChevronRight,
} from "lucide-react";
import { buildApiUrl } from "../utils/api";

/* ── Geofencing ──────────────────────────────────────────────────────── */
const HOSPITAL_LAT = 26.2389;
const HOSPITAL_LNG = 73.0243;
const MAX_DISTANCE_M = 1000; // 1 km

const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371000;
    const toRad = x => x * Math.PI / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const getLocationDistance = () =>
    new Promise((resolve, reject) => {
        if (!navigator.geolocation) { reject(new Error("GPS not supported on this device.")); return; }
        navigator.geolocation.getCurrentPosition(
            (pos) => resolve(haversineDistance(pos.coords.latitude, pos.coords.longitude, HOSPITAL_LAT, HOSPITAL_LNG)),
            (err) => {
                if (err.code === 1) reject(new Error("Location access denied. Please allow GPS and try again."));
                else reject(new Error("Unable to get your location. Please try again."));
            },
            { timeout: 10000, maximumAge: 0, enableHighAccuracy: true }
        );
    });

/* ── helpers ─────────────────────────────────────────────────────────── */
const fmtTime = (d) => d ? new Date(d).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true }) : null;
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" }) : "—";
const hoursWorked = (ci, co) => {
    if (!ci || !co) return null;
    return ((new Date(co) - new Date(ci)) / 3_600_000).toFixed(1);
};

const STATUS_MAP = {
    present:    { color: "text-emerald-400", bg: "bg-emerald-500/15 border-emerald-500/30", dot: "bg-emerald-400" },
    late:       { color: "text-amber-400",   bg: "bg-amber-500/15 border-amber-500/30",   dot: "bg-amber-400" },
    "half-day": { color: "text-orange-400",  bg: "bg-orange-500/15 border-orange-500/30", dot: "bg-orange-400" },
    absent:     { color: "text-rose-400",    bg: "bg-rose-500/15 border-rose-500/30",     dot: "bg-rose-400" },
};

/* ── Live clock hook ─────────────────────────────────────────────────── */
const useClock = () => {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    return now;
};

/* ── Initials avatar ─────────────────────────────────────────────────── */
const Avatar = ({ name, size = "lg" }) => {
    const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";
    const sz = size === "lg" ? "w-16 h-16 text-xl" : "w-10 h-10 text-sm";
    return (
        <div className={`${sz} rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-black text-white shadow-lg shadow-cyan-500/30 shrink-0`}>
            {initials}
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════════
   LOGIN SCREEN
═══════════════════════════════════════════════════════════════════════ */
const LoginScreen = ({ onLogin }) => {
    const [empId, setEmpId] = useState("");
    const [pin, setPin]     = useState("");
    const [err, setErr]     = useState("");
    const [loading, setLoading] = useState(false);
    const now = useClock();

    const submit = async (e) => {
        e.preventDefault();
        setErr(""); setLoading(true);
        try {
            const res = await fetch(buildApiUrl("/api/staff/login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ employeeId: empId.trim().toUpperCase(), pin }),
            });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message || "Login failed");
            localStorage.setItem("staffToken", data.token);
            localStorage.setItem("staffInfo", JSON.stringify(data.staff));
            onLogin(data.staff);
        } catch (e) {
            setErr(e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg,#020b18 0%,#021730 50%,#011020 100%)" }}>

            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-30"
                style={{ background: "radial-gradient(circle,#0ea5e9 0%,transparent 70%)" }} />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none opacity-20"
                style={{ background: "radial-gradient(circle,#6366f1 0%,transparent 70%)" }} />
            {/* Dot grid */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

            {/* Live time display */}
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="mb-8 text-center">
                <p className="text-5xl font-black text-white tracking-tight tabular-nums">
                    {now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })}
                </p>
                <p className="text-white/40 text-sm font-semibold mt-1">
                    {now.toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-sm relative z-10"
            >
                {/* Glass card */}
                <div className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
                    style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(24px)" }}>

                    {/* Top strip */}
                    <div className="px-8 pt-8 pb-6 text-center border-b border-white/5">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", boxShadow: "0 8px 32px rgba(14,165,233,0.4)" }}>
                            <Fingerprint size={30} className="text-white" />
                        </div>
                        <h1 className="text-2xl font-black text-white tracking-tight">Staff Login</h1>
                        <p className="text-white/40 text-xs mt-1 font-semibold uppercase tracking-widest">Trinay Hospital · Attendance</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={submit} className="p-8 space-y-5">
                        <div>
                            <label className="text-[11px] font-black text-white/40 uppercase tracking-widest mb-2 block">Employee ID</label>
                            <input
                                value={empId}
                                onChange={e => setEmpId(e.target.value.toUpperCase())}
                                placeholder="e.g. TRN-001"
                                required
                                className="w-full rounded-xl px-4 py-3 text-white font-bold text-sm outline-none transition-all placeholder:text-white/20"
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                                onFocus={e => e.target.style.borderColor = "rgba(14,165,233,0.6)"}
                                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-black text-white/40 uppercase tracking-widest mb-2 block">PIN</label>
                            <input
                                type="password"
                                value={pin}
                                onChange={e => setPin(e.target.value)}
                                placeholder="••••••"
                                maxLength={6}
                                required
                                className="w-full rounded-xl px-4 py-3 text-white font-bold text-sm outline-none transition-all placeholder:text-white/20"
                                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
                                onFocus={e => e.target.style.borderColor = "rgba(14,165,233,0.6)"}
                                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.12)"}
                            />
                        </div>

                        <AnimatePresence>
                            {err && (
                                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                    className="flex items-center gap-2 rounded-xl px-4 py-3 text-rose-300 text-sm font-semibold"
                                    style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)" }}>
                                    <AlertCircle size={16} className="shrink-0" /> {err}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-4 font-black rounded-xl flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:scale-100 text-white text-sm"
                            style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)", boxShadow: "0 8px 24px rgba(14,165,233,0.35)" }}
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
                            {loading ? "Signing In…" : "Sign In to Portal"}
                        </button>
                    </form>
                </div>

                <div className="mt-5 flex items-center justify-center gap-2 text-white/20 text-xs">
                    <Shield size={12} /> Secured · Trinay Hospital Internal System
                </div>
            </motion.div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════════
   DASHBOARD
═══════════════════════════════════════════════════════════════════════ */
const Dashboard = ({ staff, onLogout }) => {
    const [todayRecord, setTodayRecord] = useState(null);
    const [history, setHistory]         = useState([]);
    const [loading, setLoading]         = useState(false);
    const [msg, setMsg]                 = useState(null);
    /* Explicit booleans — not derived from todayRecord, so buttons work even if API shape varies */
    const [checkedIn,  setCheckedIn]    = useState(false);
    const [checkedOut, setCheckedOut]   = useState(false);
    const now = useClock();
    const token = localStorage.getItem("staffToken");
    const headers = { "Content-Type": "application/json", Authorization: `Bearer ${token}` };

    const isAuthError = (status, msg) =>
        status === 401 || (typeof msg === "string" && /invalid token|unauthorized|session expired|jwt expired/i.test(msg));

    const sessionExpired = () => {
        setMsg({ type: "error", text: "Session expired — redirecting to login…" });
        setTimeout(() => {
            localStorage.removeItem("staffToken");
            localStorage.removeItem("staffInfo");
            onLogout();
        }, 1800);
    };

    const fetchData = async () => {
        try {
            const [todayRes, historyRes] = await Promise.all([
                fetch(buildApiUrl("/api/staff/today"), { headers }),
                fetch(buildApiUrl("/api/staff/attendance"), { headers }),
            ]);
            if (todayRes.status === 401 || historyRes.status === 401) { sessionExpired(); return; }
            const [td, hs] = await Promise.all([todayRes.json(), historyRes.json()]);
            if (isAuthError(0, td.message)) { sessionExpired(); return; }
            if (td.success && td.attendance) {
                setTodayRecord(td.attendance);
                /* Sync explicit state from server record */
                if (td.attendance.checkIn)  setCheckedIn(true);
                if (td.attendance.checkOut) setCheckedOut(true);
            }
            if (hs.success) setHistory(hs.attendance.slice(0, 30));
        } catch { /* silent network error */ }
    };

    useEffect(() => { fetchData(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const checkin = async () => {
        setLoading(true); setMsg(null);
        try {
            setMsg({ type: "info", text: "Verifying your location…" });
            const distanceM = await getLocationDistance();
            if (distanceM > MAX_DISTANCE_M) {
                const km = (distanceM / 1000).toFixed(1);
                setMsg({ type: "error", text: `You are ${km} km from the hospital. Check-in is only allowed within 1 km of Trinay Hospital.` });
                setLoading(false);
                return;
            }
            setMsg(null);
            const res = await fetch(buildApiUrl("/api/staff/checkin"), { method: "POST", headers });
            const data = await res.json();
            if (res.status === 401 || isAuthError(0, data.message)) { sessionExpired(); return; }
            if (res.ok && data.success) {
                /* Fresh check-in succeeded */
                setCheckedIn(true);
                setMsg({ type: "success", text: data.message });
                fetchData(); /* refresh record in background */
            } else if (res.status === 409) {
                /* Already checked in — enable Check Out immediately */
                setCheckedIn(true);
                setMsg({ type: "error", text: "Already checked in today. You can now check out." });
                fetchData();
            } else {
                setMsg({ type: "error", text: data.message || "Check-in failed." });
            }
        } catch (e) {
            setMsg({ type: "error", text: e.message });
        } finally { setLoading(false); }
    };

    const checkout = async () => {
        setLoading(true); setMsg(null);
        try {
            const res = await fetch(buildApiUrl("/api/staff/checkout"), { method: "POST", headers });
            const data = await res.json();
            if (res.status === 401 || isAuthError(0, data.message)) { sessionExpired(); return; }
            if (data.success) {
                setCheckedOut(true);
                setMsg({ type: "success", text: data.message });
                fetchData();
            } else {
                setMsg({ type: "error", text: data.message || "Check-out failed." });
            }
        } catch (e) {
            setMsg({ type: "error", text: e.message });
        } finally { setLoading(false); }
    };
    const hw = hoursWorked(todayRecord?.checkIn, todayRecord?.checkOut);

    const monthPresent  = history.filter(r => r.status === "present").length;
    const monthLate     = history.filter(r => r.status === "late").length;
    const monthHalfDay  = history.filter(r => r.status === "half-day").length;
    const monthAbsent   = history.filter(r => r.status === "absent").length;

    return (
        <div className="min-h-screen font-sans relative overflow-x-hidden"
            style={{ background: "linear-gradient(160deg,#020b18 0%,#021730 60%,#011020 100%)" }}>

            {/* Ambient glows */}
            <div className="fixed top-0 right-0 w-[700px] h-[700px] rounded-full blur-[200px] pointer-events-none opacity-20"
                style={{ background: "radial-gradient(circle,#0ea5e9 0%,transparent 70%)" }} />
            <div className="fixed bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[180px] pointer-events-none opacity-15"
                style={{ background: "radial-gradient(circle,#6366f1 0%,transparent 70%)" }} />
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: "radial-gradient(white 1px,transparent 1px)", backgroundSize: "32px 32px" }} />

            {/* ── HEADER ── */}
            <div className="relative z-20 border-b border-white/5"
                style={{ background: "rgba(2,11,24,0.85)", backdropFilter: "blur(20px)" }}>
                <div className="max-w-lg mx-auto px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg,#0ea5e9,#6366f1)" }}>
                            <Activity size={18} className="text-white" />
                        </div>
                        <div>
                            <p className="text-white font-black text-sm leading-tight">Trinay Hospital</p>
                            <p className="text-white/30 text-[10px] font-semibold uppercase tracking-wider">Staff Portal</p>
                        </div>
                    </div>
                    <button onClick={onLogout}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white/60 text-xs font-bold hover:text-rose-400 transition-colors"
                        style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                        <LogOut size={13} /> Logout
                    </button>
                </div>
            </div>

            <div className="relative z-10 max-w-lg mx-auto px-4 py-6 space-y-4 pb-10">

                {/* ── PROFILE CARD ── */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="rounded-3xl p-5 border border-white/8"
                    style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)" }}>
                    <div className="flex items-center gap-4">
                        <Avatar name={staff.name} size="lg" />
                        <div className="flex-1 min-w-0">
                            <p className="font-black text-white text-lg leading-tight truncate">{staff.name}</p>
                            <p className="text-white/50 text-xs font-semibold mt-0.5 capitalize">{staff.role} · {staff.department}</p>
                            <p className="text-white/25 text-[11px] font-mono mt-1">{staff.employeeId}</p>
                        </div>
                        <div className="text-right shrink-0">
                            <p className="text-white font-black text-xl tabular-nums leading-tight">
                                {now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
                            </p>
                            <p className="text-white/30 text-[11px] mt-1">
                                {now.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short" })}
                            </p>
                        </div>
                    </div>
                </motion.div>

                {/* ── TODAY'S STATUS CARD ── */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.06 }}
                    className="rounded-3xl border border-white/8 overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)" }}>

                    {/* Card heading */}
                    <div className="px-6 pt-5 pb-4 border-b border-white/5 flex items-center justify-between">
                        <h2 className="text-[11px] font-black text-white/30 uppercase tracking-widest flex items-center gap-2">
                            <Zap size={12} className="text-cyan-400" /> Today&apos;s Status
                        </h2>
                        {todayRecord?.status && (() => {
                            const s = STATUS_MAP[todayRecord.status] ?? STATUS_MAP.present;
                            return (
                                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${s.bg} ${s.color}`}>
                                    {todayRecord.status.replace("-", " ")}
                                </span>
                            );
                        })()}
                    </div>

                    {/* Stat trio */}
                    <div className="grid grid-cols-3 gap-px p-5" style={{ gap: "12px" }}>
                        {[
                            { label: "Check In",  value: fmtTime(todayRecord?.checkIn)  ?? "—", icon: LogIn,  color: "text-cyan-400",    active: checkedIn },
                            { label: "Check Out", value: fmtTime(todayRecord?.checkOut) ?? "—", icon: LogOut, color: "text-rose-400",     active: checkedOut },
                            { label: "Hours",     value: hw ? `${hw}h` : "—",                   icon: Clock,  color: "text-amber-400",   active: Boolean(hw) },
                        ].map(({ label, value, icon: Icon, color, active }) => (
                            <div key={label} className="text-center rounded-2xl py-4 px-2 border border-white/5"
                                style={{ background: active ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.02)" }}>
                                <Icon size={16} className={`mx-auto mb-2 ${active ? color : "text-white/20"}`} />
                                <p className={`text-base font-black leading-tight ${active ? "text-white" : "text-white/20"}`}>{value}</p>
                                <p className="text-[9px] text-white/25 font-bold uppercase tracking-widest mt-1">{label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Feedback message */}
                    <AnimatePresence>
                        {msg && (
                            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                                className="mx-5 mb-4 flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-semibold border"
                                style={msg.type === "success"
                                    ? { background: "rgba(16,185,129,0.1)", borderColor: "rgba(16,185,129,0.3)", color: "#6ee7b7" }
                                    : msg.type === "info"
                                        ? { background: "rgba(14,165,233,0.1)", borderColor: "rgba(14,165,233,0.3)", color: "#7dd3fc" }
                                        : { background: "rgba(244,63,94,0.1)", borderColor: "rgba(244,63,94,0.3)", color: "#fda4af" }}>
                                {msg.type === "success" ? <CheckCircle2 size={15} /> : msg.type === "info" ? <Loader2 size={15} className="animate-spin" /> : <XCircle size={15} />}
                                {msg.text}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* ACTION BUTTONS */}
                    <div className="px-5 pb-5 grid grid-cols-2 gap-3">
                        {/* CHECK IN */}
                        <motion.button
                            onClick={checkin}
                            disabled={loading || checkedIn}
                            whileHover={!checkedIn && !loading ? { scale: 1.03, y: -2 } : {}}
                            whileTap={!checkedIn && !loading ? { scale: 0.97 } : {}}
                            className="relative flex items-center justify-center gap-2.5 py-4 font-black rounded-2xl text-sm overflow-hidden transition-all disabled:cursor-not-allowed"
                            style={checkedIn
                                ? { background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", color: "#6ee7b7" }
                                : { background: "linear-gradient(135deg,#059669,#10b981)", boxShadow: "0 8px 24px rgba(16,185,129,0.35)", color: "white" }}>
                            {checkedIn ? <CheckCircle2 size={18} /> : loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
                            {checkedIn ? "Checked In" : "Check In"}
                            {!checkedIn && !loading && (
                                <div className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
                            )}
                        </motion.button>

                        {/* CHECK OUT */}
                        <motion.button
                            onClick={checkout}
                            disabled={loading || !checkedIn || checkedOut}
                            whileHover={checkedIn && !checkedOut && !loading ? { scale: 1.03, y: -2 } : {}}
                            whileTap={checkedIn && !checkedOut && !loading ? { scale: 0.97 } : {}}
                            className="relative flex items-center justify-center gap-2.5 py-4 font-black rounded-2xl text-sm overflow-hidden transition-all disabled:cursor-not-allowed"
                            style={checkedOut
                                ? { background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)", color: "#fda4af" }
                                : !checkedIn
                                    ? { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.2)" }
                                    : { background: "linear-gradient(135deg,#be123c,#f43f5e)", boxShadow: "0 8px 24px rgba(244,63,94,0.35)", color: "white" }}>
                            {checkedOut ? <CheckCircle2 size={18} /> : loading ? <Loader2 size={18} className="animate-spin" /> : <LogOut size={18} />}
                            {checkedOut ? "Checked Out" : "Check Out"}
                        </motion.button>
                    </div>
                </motion.div>

                {/* ── MONTHLY SUMMARY ── */}
                {history.length > 0 && (
                    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.12 }}
                        className="rounded-3xl border border-white/8 p-5"
                        style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)" }}>
                        <h2 className="text-[11px] font-black text-white/30 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <TrendingUp size={12} className="text-cyan-400" /> This Month
                        </h2>
                        <div className="grid grid-cols-4 gap-3">
                            {[
                                { label: "Present",  value: monthPresent,  color: "text-emerald-400", bg: "rgba(16,185,129,0.08)",  border: "rgba(16,185,129,0.2)" },
                                { label: "Late",     value: monthLate,     color: "text-amber-400",   bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)" },
                                { label: "Half Day", value: monthHalfDay,  color: "text-orange-400",  bg: "rgba(249,115,22,0.08)",  border: "rgba(249,115,22,0.2)" },
                                { label: "Absent",   value: monthAbsent,   color: "text-rose-400",    bg: "rgba(244,63,94,0.08)",   border: "rgba(244,63,94,0.2)" },
                            ].map(({ label, value, color, bg, border }) => (
                                <div key={label} className="text-center rounded-2xl py-3 border"
                                    style={{ background: bg, borderColor: border }}>
                                    <p className={`text-2xl font-black leading-tight ${color}`}>{value}</p>
                                    <p className="text-[9px] text-white/30 font-bold uppercase tracking-wider mt-1">{label}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ── ATTENDANCE HISTORY ── */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.18 }}
                    className="rounded-3xl border border-white/8 overflow-hidden"
                    style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(16px)" }}>

                    <div className="px-5 pt-5 pb-4 border-b border-white/5 flex items-center gap-2">
                        <Calendar size={12} className="text-cyan-400" />
                        <h2 className="text-[11px] font-black text-white/30 uppercase tracking-widest">Recent Attendance</h2>
                    </div>

                    {history.length === 0 ? (
                        <div className="text-center py-10">
                            <div className="w-12 h-12 rounded-2xl mx-auto mb-3 flex items-center justify-center"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                <Calendar size={20} className="text-white/15" />
                            </div>
                            <p className="text-white/20 text-sm font-semibold">No attendance records yet</p>
                        </div>
                    ) : (
                        <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.04)" }}>
                            {history.map((r, i) => {
                                const s = STATUS_MAP[r.status] ?? { color: "text-white/40", bg: "bg-white/5 border-white/10", dot: "bg-white/30" };
                                return (
                                    <motion.div key={r._id}
                                        initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 + i * 0.03 }}
                                        className="flex items-center gap-4 px-5 py-3.5 hover:bg-white/[0.03] transition-colors">
                                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${s.dot}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-white/80">{fmtDate(r.date + "T00:00:00")}</p>
                                            <p className="text-xs text-white/30 font-mono mt-0.5">
                                                {fmtTime(r.checkIn) ?? "—"} → {fmtTime(r.checkOut) ?? "—"}
                                            </p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${s.bg} ${s.color}`}>
                                                {r.status?.replace("-", " ")}
                                            </span>
                                            {r.hoursWorked > 0 && (
                                                <p className="text-[10px] text-white/20 mt-1 font-mono">{r.hoursWorked}h</p>
                                            )}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    )}
                </motion.div>

                {/* Footer */}
                <div className="flex items-center justify-center gap-2 text-white/15 text-xs pt-2">
                    <Shield size={11} /> Secured · Trinay Hospital Internal System
                </div>
            </div>
        </div>
    );
};

/* ═══════════════════════════════════════════════════════════════════════
   PAGE ENTRY
═══════════════════════════════════════════════════════════════════════ */
const StaffPortal = () => {
    const [staff, setStaff] = useState(() => {
        try { return JSON.parse(localStorage.getItem("staffInfo")); } catch { return null; }
    });
    const handleLogin  = (s) => setStaff(s);
    const handleLogout = () => {
        localStorage.removeItem("staffToken");
        localStorage.removeItem("staffInfo");
        setStaff(null);
    };
    if (!staff) return <LoginScreen onLogin={handleLogin} />;
    return <Dashboard staff={staff} onLogout={handleLogout} />;
};

export default StaffPortal;
