import { createElement, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    ClipboardList, MessageSquareQuote, Users, UserPlus,
    Search, Trash2, Eye, EyeOff, X, CalendarDays, Stethoscope, ImagePlus, Plus,
    Pencil, ExternalLink, Star, Clock, GraduationCap, Filter,
} from "lucide-react";
import hospitalLogo from "../components/common/trinayhospital_logo.jpg";
import Toast from "../components/common/Toast";
import { buildApiUrl } from "../utils/api";
import { DOCTORS } from "../data/doctorsData";

const statusOptions = ["pending", "confirmed", "completed", "cancelled"];

const SHIFT_LABELS = { morning: "Morning", evening: "Evening", night: "Night" };

const emptyAppointmentFilters = { search: "", status: "all", from: "", to: "", view: "all" };
const emptyFeedbackFilters = { search: "", from: "", to: "", sort: "newest" };
const emptyAddStaffForm = {
    employeeId: "", name: "", pin: "", role: "", department: "", shift: "morning", phone: "",
};

const emptyDoctorForm = {
    name: "", designation: "CONSULTANT", dept: "", qualification: "",
    timing: "", experience: "", camp: "", bio: "", expertise: "", photo: "",
};

const compressImage = (file) => new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
        const MAX = 480;
        const ratio = Math.min(MAX / img.width, MAX / img.height, 1);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * ratio);
        canvas.height = Math.round(img.height * ratio);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        URL.revokeObjectURL(url);
        resolve(canvas.toDataURL("image/jpeg", 0.78));
    };
    img.src = url;
});

const parseDate = (value) => {
    if (!value) return null;
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
};

const normalizeText = (value) => String(value || "").trim().toLowerCase();

const formatDate = (dateString) => {
    const date = parseDate(dateString);
    if (!date) return "N/A";
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    const normalized = String(timeString).trim();
    if (!normalized) return "N/A";
    if (/am|pm/i.test(normalized)) {
        return normalized.replace(/\s*(am|pm)\s*/i, (_, p) => ` ${p.toUpperCase()}`);
    }
    const [hoursStr, minutesStr] = normalized.split(":");
    const hours = Number.parseInt(hoursStr, 10);
    if (!Number.isFinite(hours) || minutesStr === undefined) return normalized;
    const minutes = String(minutesStr).padStart(2, "0").slice(0, 2);
    const isPm = hours >= 12;
    return `${hours % 12 || 12}:${minutes} ${isPm ? "PM" : "AM"}`;
};

const formatDateTime = (dateString) => {
    const date = parseDate(dateString);
    if (!date) return "N/A";
    return date.toLocaleString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "numeric", minute: "2-digit", hour12: true,
    });
};

const fmtISOTime = (iso) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
};

const getStatusClasses = (status) => {
    switch (status) {
        case "confirmed":  return "bg-cyan-100 text-cyan-800";
        case "completed":  return "bg-emerald-100 text-emerald-800";
        case "cancelled":  return "bg-red-100 text-red-700";
        default:           return "bg-amber-100 text-amber-800";
    }
};

const getAttendanceClasses = (status) => {
    switch (status) {
        case "present":   return "bg-emerald-100 text-emerald-700";
        case "late":      return "bg-amber-100 text-amber-700";
        case "half-day":  return "bg-orange-100 text-orange-700";
        default:          return "bg-rose-100 text-rose-700";
    }
};

const SectionTab = ({ active, onClick, label, count, icon: Icon }) => (
    <button
        type="button"
        onClick={onClick}
        className={`relative flex flex-1 items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm font-bold transition-all duration-200 ${
            active
                ? "border-blue-600 bg-blue-700 text-white shadow-lg shadow-blue-700/30 scale-[1.02]"
                : "border-blue-100 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-900 hover:shadow-md"
        }`}
    >
        <span className="flex items-center gap-2">
            {createElement(Icon, { className: "h-4 w-4", "aria-hidden": "true" })}
            {label}
        </span>
        <span className={`rounded-full px-2.5 py-1 text-xs font-black tabular-nums ${
            active ? "bg-white/20 text-white" : "bg-blue-50 text-blue-700 border border-blue-200"
        }`}>
            {count}
        </span>
    </button>
);

const AdminDashboard = () => {
    const navigate = useNavigate();

    // ── appointments & feedback state ──
    const [appointments, setAppointments] = useState([]);
    const [feedbackList, setFeedbackList] = useState([]);
    const [activeSection, setActiveSection] = useState("appointments");
    const [appointmentFilters, setAppointmentFilters] = useState(emptyAppointmentFilters);
    const [feedbackFilters, setFeedbackFilters] = useState(emptyFeedbackFilters);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [toast, setToast] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);
    const toastTimer = useRef(null);

    // ── doctors state ──
    const [doctorList, setDoctorList] = useState([]);
    const [isDoctorsLoading, setIsDoctorsLoading] = useState(false);
    const [showAddDoctor, setShowAddDoctor] = useState(false);
    const [doctorForm, setDoctorForm] = useState(emptyDoctorForm);
    const [doctorFormError, setDoctorFormError] = useState("");
    const [isSavingDoctor, setIsSavingDoctor] = useState(false);
    const [editingDoctor, setEditingDoctor] = useState(null);
    const [pendingDeleteDoctor, setPendingDeleteDoctor] = useState(null);
    const [doctorSearch, setDoctorSearch] = useState("");
    const [doctorFilter, setDoctorFilter] = useState("all"); // "all" | "static" | "custom"

    // ── staff state ──
    const [staffList, setStaffList] = useState([]);
    const [isStaffLoading, setIsStaffLoading] = useState(false);
    const [staffError, setStaffError] = useState("");
    const [staffView, setStaffView] = useState("members"); // "members" | "attendance"
    const [showAddStaff, setShowAddStaff] = useState(false);
    const [addStaffForm, setAddStaffForm] = useState(emptyAddStaffForm);
    const [addStaffError, setAddStaffError] = useState("");
    const [isAddingStaff, setIsAddingStaff] = useState(false);
    const [showPin, setShowPin] = useState(false);
    const [pendingDeleteStaff, setPendingDeleteStaff] = useState(null);
    const [attendanceDate, setAttendanceDate] = useState(() => new Date().toISOString().slice(0, 10));
    const [attendanceRecords, setAttendanceRecords] = useState([]);
    const [isAttendanceLoading, setIsAttendanceLoading] = useState(false);

    const getToken = useCallback(() => localStorage.getItem("adminToken"), []);

    const handleUnauthorized = useCallback(() => {
        localStorage.removeItem("adminToken");
        navigate("/admin");
    }, [navigate]);

    const showToast = useCallback((variant, title, message) => {
        setToast({ variant, title, message });
    }, []);

    useEffect(() => {
        if (!toast) return undefined;
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 3200);
        return () => clearTimeout(toastTimer.current);
    }, [toast]);

    // ── fetch appointments + feedback ──
    useEffect(() => {
        const token = getToken();
        if (!token) { navigate("/admin"); return undefined; }

        let ignore = false;
        const controller = new AbortController();

        const fetchDashboardData = async () => {
            setIsLoading(true);
            setLoadError("");
            try {
                const [apptResult, fbResult] = await Promise.allSettled([
                    fetch(buildApiUrl("/api/appointments"), {
                        headers: { Authorization: `Bearer ${token}` },
                        signal: controller.signal,
                    }),
                    fetch(buildApiUrl("/api/feedback"), {
                        headers: { Authorization: `Bearer ${token}` },
                        signal: controller.signal,
                    }),
                ]);

                if (ignore) return;

                let unauthorized = false;
                let nextAppts = [];
                let nextFeedback = [];
                let nextError = "";

                if (apptResult.status === "fulfilled") {
                    if (apptResult.value.status === 401) { unauthorized = true; }
                    else if (apptResult.value.ok) {
                        const d = await apptResult.value.json();
                        nextAppts = d.appointments || [];
                    } else { nextError = "Appointments could not be loaded."; }
                } else if (apptResult.reason?.name !== "AbortError") {
                    nextError = "Appointments could not be loaded.";
                }

                if (fbResult.status === "fulfilled") {
                    if (fbResult.value.status === 401) { unauthorized = true; }
                    else if (fbResult.value.ok) {
                        const d = await fbResult.value.json();
                        nextFeedback = d.feedback || [];
                    } else { nextError = nextError || "Feedback could not be loaded."; }
                } else if (fbResult.reason?.name !== "AbortError") {
                    nextError = nextError || "Feedback could not be loaded.";
                }

                if (unauthorized) { handleUnauthorized(); return; }
                setAppointments(nextAppts);
                setFeedbackList(nextFeedback);
                setLoadError(nextError);
            } catch (error) {
                if (error.name === "AbortError") return;
                if (!ignore) setLoadError("Dashboard data could not be loaded. Please refresh.");
            } finally {
                if (!ignore) setIsLoading(false);
            }
        };

        fetchDashboardData();
        return () => { ignore = true; controller.abort(); };
    }, [getToken, handleUnauthorized, navigate]);

    // ── fetch staff list ──
    const fetchStaff = useCallback(async () => {
        const token = getToken();
        if (!token) return;
        setIsStaffLoading(true);
        setStaffError("");
        try {
            const res = await fetch(buildApiUrl("/api/admin/staff"), {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) { handleUnauthorized(); return; }
            if (!res.ok) throw new Error("Failed to load staff");
            const data = await res.json();
            setStaffList(data.staff || []);
        } catch {
            setStaffError("Staff list could not be loaded.");
        } finally {
            setIsStaffLoading(false);
        }
    }, [getToken, handleUnauthorized]);

    // ── fetch attendance for a given date ──
    const fetchAttendance = useCallback(async (date) => {
        const token = getToken();
        if (!token) return;
        setIsAttendanceLoading(true);
        try {
            const res = await fetch(buildApiUrl(`/api/admin/attendance?date=${date}`), {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) { handleUnauthorized(); return; }
            if (!res.ok) throw new Error("Failed");
            const data = await res.json();
            setAttendanceRecords(data.attendance || []);
        } catch {
            setAttendanceRecords([]);
        } finally {
            setIsAttendanceLoading(false);
        }
    }, [getToken, handleUnauthorized]);

    useEffect(() => {
        if (activeSection === "staff") {
            fetchStaff();
            fetchAttendance(attendanceDate);
        }
    }, [activeSection, fetchStaff, fetchAttendance, attendanceDate]);

    // ── add staff ──
    const handleAddStaff = async (e) => {
        e.preventDefault();
        setAddStaffError("");
        setIsAddingStaff(true);
        const token = getToken();
        try {
            const res = await fetch(buildApiUrl("/api/admin/staff"), {
                method: "POST",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(addStaffForm),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed to add staff");
            setStaffList((prev) => [...prev, data.staff].sort((a, b) => a.name.localeCompare(b.name)));
            setShowAddStaff(false);
            setAddStaffForm(emptyAddStaffForm);
            showToast("success", "Staff added", `${data.staff.name} has been added successfully.`);
        } catch (err) {
            setAddStaffError(err.message);
        } finally {
            setIsAddingStaff(false);
        }
    };

    // ── delete staff ──
    const handleDeleteStaff = async () => {
        if (!pendingDeleteStaff) return;
        const token = getToken();
        try {
            const res = await fetch(buildApiUrl(`/api/admin/staff/${pendingDeleteStaff._id}`), {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Delete failed");
            setStaffList((prev) => prev.filter((s) => s._id !== pendingDeleteStaff._id));
            showToast("delete", "Staff removed", `${pendingDeleteStaff.name} was removed.`);
        } catch {
            showToast("error", "Delete failed", "Staff member could not be removed.");
        } finally {
            setPendingDeleteStaff(null);
        }
    };

    // ── toggle staff active ──
    const toggleStaffActive = async (staff) => {
        const token = getToken();
        try {
            const res = await fetch(buildApiUrl(`/api/admin/staff/${staff._id}`), {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ isActive: !staff.isActive }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error("Failed");
            setStaffList((prev) => prev.map((s) => s._id === staff._id ? data.staff : s));
            showToast("success", staff.isActive ? "Staff deactivated" : "Staff activated",
                `${staff.name} is now ${staff.isActive ? "inactive" : "active"}.`);
        } catch {
            showToast("error", "Update failed", "Staff status could not be changed.");
        }
    };

    // ── fetch doctors ──
    const fetchDoctors = useCallback(async () => {
        const token = getToken();
        if (!token) return;
        setIsDoctorsLoading(true);
        try {
            const res = await fetch(buildApiUrl("/api/admin/doctors"), { headers: { Authorization: `Bearer ${token}` } });
            if (res.status === 401) { handleUnauthorized(); return; }
            const data = await res.json();
            const list = data.doctors || [];
            setDoctorList(list);
        } catch { /* silent */ }
        finally { setIsDoctorsLoading(false); }
    }, [getToken, handleUnauthorized]);

    useEffect(() => { if (activeSection === "doctors") fetchDoctors(); }, [activeSection, fetchDoctors]);

    // ── save doctor (add, edit dynamic, or override static) ──
    const handleSaveDoctor = async (e) => {
        e.preventDefault();
        setDoctorFormError("");
        setIsSavingDoctor(true);
        const token = getToken();
        const payload = {
            ...doctorForm,
            experience: Number(doctorForm.experience),
            expertise: doctorForm.expertise.split(",").map((s) => s.trim()).filter(Boolean),
            ...(editingDoctor?.staticId != null && { staticId: editingDoctor.staticId }),
        };
        try {
            const isDynamic = editingDoctor && editingDoctor._id && !editingDoctor._isStaticDraft;
            const url = isDynamic
                ? buildApiUrl(`/api/admin/doctors/${editingDoctor._id}`)
                : buildApiUrl("/api/admin/doctors");
            const res = await fetch(url, {
                method: isDynamic ? "PATCH" : "POST",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Failed");
            if (isDynamic) {
                setDoctorList((prev) => prev.map((d) => d._id === editingDoctor._id ? data.doctor : d));
                showToast("success", "Doctor updated", `${data.doctor.name} was updated.`);
            } else {
                setDoctorList((prev) => [...prev, data.doctor]);
                showToast("success", "Doctor saved", `${data.doctor.name} profile saved successfully.`);
            }
            setShowAddDoctor(false);
            setEditingDoctor(null);
            setDoctorForm(emptyDoctorForm);
        } catch (err) {
            setDoctorFormError(err.message);
        } finally {
            setIsSavingDoctor(false);
        }
    };

    // ── delete doctor ──
    const handleDeleteDoctor = async () => {
        if (!pendingDeleteDoctor) return;
        const token = getToken();
        try {
            const res = await fetch(buildApiUrl(`/api/admin/doctors/${pendingDeleteDoctor._id}`), {
                method: "DELETE", headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Delete failed");
            setDoctorList((prev) => prev.filter((d) => d._id !== pendingDeleteDoctor._id));
            showToast("delete", "Doctor removed", `${pendingDeleteDoctor.name} was removed.`);
        } catch {
            showToast("error", "Delete failed", "Doctor could not be removed.");
        } finally {
            setPendingDeleteDoctor(null);
        }
    };

    const openEditDoctor = (doc) => {
        setEditingDoctor(doc);
        setDoctorForm({
            name: doc.name, designation: doc.designation, dept: doc.dept,
            qualification: doc.qualification, timing: doc.timing,
            experience: String(doc.experience), camp: doc.camp || "",
            bio: doc.bio || "", expertise: (doc.expertise || []).join(", "), photo: doc.photo || "",
        });
        setDoctorFormError("");
        setShowAddDoctor(true);
    };

    const openEditStaticDoctor = (staticDoc) => {
        setEditingDoctor({ _isStaticDraft: true, staticId: staticDoc.id });
        setDoctorForm({
            name: staticDoc.name,
            designation: staticDoc.designation,
            dept: staticDoc.dept,
            qualification: staticDoc.qualification,
            timing: staticDoc.timing,
            experience: String(staticDoc.experience),
            camp: staticDoc.camp || "",
            bio: staticDoc.bio || "",
            expertise: (staticDoc.expertise || []).join(", "),
            photo: staticDoc.avatar || "",
        });
        setDoctorFormError("");
        setShowAddDoctor(true);
    };

    // ── appointment/feedback actions ──
    const updateAppointmentFilter = (key, value) => setAppointmentFilters((p) => ({ ...p, [key]: value }));
    const updateFeedbackFilter = (key, value) => setFeedbackFilters((p) => ({ ...p, [key]: value }));

    const toggleTestimonial = async (feedback) => {
        const token = getToken();
        if (!token) { navigate("/admin"); return; }
        try {
            const res = await fetch(buildApiUrl(`/api/feedback/${feedback._id}/testimonial`), {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ showOnTestimonials: !feedback.showOnTestimonials }),
            });
            if (res.status === 401) { handleUnauthorized(); return; }
            if (!res.ok) throw new Error("Failed");
            const data = await res.json();
            setFeedbackList((prev) => prev.map((item) => item._id === feedback._id ? data.feedback : item));
            showToast("success",
                data.feedback.showOnTestimonials ? "Sent to testimonials" : "Removed from testimonials",
                `${feedback.name || "Feedback"} was updated successfully.`);
        } catch {
            showToast("error", "Update failed", "Testimonial state could not be updated.");
        }
    };

    const updateStatus = async (id, nextStatus) => {
        const token = getToken();
        if (!token) { navigate("/admin"); return; }
        try {
            const res = await fetch(buildApiUrl(`/api/appointments/${id}`), {
                method: "PATCH",
                headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
                body: JSON.stringify({ status: nextStatus }),
            });
            if (res.status === 401) { handleUnauthorized(); return; }
            if (!res.ok) throw new Error("Failed");
            const data = await res.json();
            setAppointments((prev) => prev.map((item) => item._id === id ? data.appointment : item));
            showToast("success", "Status updated", `Appointment marked as ${nextStatus}.`);
        } catch {
            showToast("error", "Update failed", "Appointment status could not be updated.");
        }
    };

    const confirmDelete = (item) => setPendingDelete(item);

    const handleDelete = async () => {
        if (!pendingDelete) return;
        const token = getToken();
        if (!token) { navigate("/admin"); return; }
        const { id, type, name } = pendingDelete;
        const endpoint = type === "feedback" ? `/api/feedback/${id}` : `/api/appointments/${id}`;
        try {
            const res = await fetch(buildApiUrl(endpoint), {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.status === 401) { handleUnauthorized(); return; }
            if (!res.ok) throw new Error("Delete failed");
            if (type === "feedback") {
                setFeedbackList((prev) => prev.filter((item) => item._id !== id));
            } else {
                setAppointments((prev) => prev.filter((item) => item._id !== id));
            }
            showToast("delete",
                `${type === "feedback" ? "Feedback" : "Appointment"} deleted`,
                `${name || "Record"} was removed successfully.`);
        } catch {
            showToast("error", "Delete failed", `Unable to delete this ${type === "feedback" ? "feedback" : "appointment"}.`);
        } finally {
            setPendingDelete(null);
        }
    };

    // ── filtered lists ──
    const filteredAppointments = appointments
        .filter((appt) => {
            const apptDate = parseDate(appt.date);
            const today = new Date(); today.setHours(0, 0, 0, 0);
            const query = normalizeText(appointmentFilters.search);

            if (appointmentFilters.view === "past") {
                if (!apptDate) return false;
                const d = new Date(apptDate); d.setHours(0, 0, 0, 0);
                if (d >= today) return false;
            }
            if (appointmentFilters.view === "today") {
                if (!apptDate) return false;
                const d = new Date(apptDate); d.setHours(0, 0, 0, 0);
                if (d.getTime() !== today.getTime()) return false;
            }
            if (appointmentFilters.status !== "all" && appt.status !== appointmentFilters.status) return false;
            if (appointmentFilters.from) {
                const from = new Date(appointmentFilters.from); from.setHours(0, 0, 0, 0);
                if (!apptDate || apptDate < from) return false;
            }
            if (appointmentFilters.to) {
                const to = new Date(appointmentFilters.to); to.setHours(23, 59, 59, 999);
                if (!apptDate || apptDate > to) return false;
            }
            if (query) {
                const vals = [appt.name, appt.email, appt.phone, appt.department, appt.doctor].map(normalizeText);
                if (!vals.some((v) => v.includes(query))) return false;
            }
            return true;
        })
        .sort((a, b) => (parseDate(b.date)?.getTime() || 0) - (parseDate(a.date)?.getTime() || 0));

    const filteredFeedback = feedbackList
        .filter((fb) => {
            const createdAt = parseDate(fb.createdAt);
            const query = normalizeText(feedbackFilters.search);
            if (feedbackFilters.from) {
                const from = new Date(feedbackFilters.from); from.setHours(0, 0, 0, 0);
                if (!createdAt || createdAt < from) return false;
            }
            if (feedbackFilters.to) {
                const to = new Date(feedbackFilters.to); to.setHours(23, 59, 59, 999);
                if (!createdAt || createdAt > to) return false;
            }
            if (query) {
                const vals = [fb.name, fb.email, fb.phone, fb.subject, fb.message].map(normalizeText);
                if (!vals.some((v) => v.includes(query))) return false;
            }
            return true;
        })
        .sort((a, b) => {
            const ta = parseDate(a.createdAt)?.getTime() || 0;
            const tb = parseDate(b.createdAt)?.getTime() || 0;
            return feedbackFilters.sort === "oldest" ? ta - tb : tb - ta;
        });

    // ── render ────────────────────────────────────────────────────────────────
    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#041AA9_0%,#0A2FC6_30%,#1E3FAE_60%,#0D2B9A_100%)] px-4 py-6">
            {toast && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 backdrop-blur-sm">
                    <Toast variant={toast.variant} title={toast.title} message={toast.message} onClose={() => setToast(null)} />
                </div>
            )}

            <div className="mx-auto max-w-7xl space-y-6">
                {/* Header */}
                <section className="rounded-[28px] border border-white/15 bg-white/10 shadow-[0_30px_80px_-35px_rgba(2,12,74,0.75)] backdrop-blur-sm overflow-hidden">
                    {/* Top accent bar */}
                    <div className="h-1 w-full" style={{ background: "linear-gradient(to right, #60A5FA, #818CF8, #06B6D4)" }} />

                    <div className="grid gap-6 px-5 py-6 sm:px-7 lg:grid-cols-[auto_1fr_auto] lg:items-center">
                        <div className="flex items-center justify-center lg:justify-start">
                            <div className="rounded-2xl bg-white/95 px-4 py-3 shadow-lg shadow-blue-950/10">
                                <img src={hospitalLogo} alt="Trinay Hospital" className="h-12 w-auto" loading="eager" />
                            </div>
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-black uppercase tracking-widest text-blue-300/80 mb-1">Trinay Hospital</p>
                            <h1 className="text-3xl font-black text-white sm:text-4xl tracking-tight">Admin Dashboard</h1>
                            <p className="mt-1.5 text-sm text-blue-100/70">
                                {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                            </p>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <button
                                onClick={() => { localStorage.removeItem("adminToken"); navigate("/admin"); }}
                                className="rounded-2xl border border-red-400/40 bg-red-600/90 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-600 hover:border-red-400/60 shadow-lg shadow-red-900/20"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Quick stats strip */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10 border-t border-white/10">
                        {[
                            { label: "Total Appointments", value: appointments.length, color: "text-cyan-300" },
                            { label: "Pending", value: appointments.filter((a) => a.status === "pending").length, color: "text-amber-300" },
                            { label: "Feedback", value: feedbackList.length, color: "text-purple-300" },
                            { label: "Doctors", value: DOCTORS.length + doctorList.filter((d) => !d.staticId).length, color: "text-emerald-300" },
                        ].map(({ label, value, color }) => (
                            <div key={label} className="flex flex-col items-center justify-center py-4 px-3 bg-white/5 hover:bg-white/8 transition-colors">
                                <span className={`text-2xl font-black tabular-nums ${color}`}>{value}</span>
                                <span className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mt-0.5">{label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {loadError && (
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 shadow-sm">
                        {loadError}
                    </div>
                )}

                {/* Tab Bar */}
                <section className="rounded-[28px] border border-white/20 bg-white/95 backdrop-blur-sm p-3 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.5)]">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                        <SectionTab
                            active={activeSection === "appointments"}
                            onClick={() => setActiveSection("appointments")}
                            icon={ClipboardList}
                            label="Appointments"
                            count={appointments.length}
                        />
                        <SectionTab
                            active={activeSection === "feedback"}
                            onClick={() => setActiveSection("feedback")}
                            icon={MessageSquareQuote}
                            label="Feedback"
                            count={feedbackList.length}
                        />
                        <SectionTab
                            active={activeSection === "staff"}
                            onClick={() => setActiveSection("staff")}
                            icon={Users}
                            label="Staff"
                            count={staffList.length}
                        />
                        <SectionTab
                            active={activeSection === "doctors"}
                            onClick={() => setActiveSection("doctors")}
                            icon={Stethoscope}
                            label="Doctors"
                            count={DOCTORS.length + doctorList.filter((d) => !d.staticId).length}
                        />
                    </div>
                </section>

                {/* ── Appointments ─────────────────────────────────────────── */}
                {activeSection === "appointments" && (
                    <section className="rounded-[28px] border border-blue-100 bg-white p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] sm:p-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Appointments</p>
                            <h2 className="mt-1 text-2xl font-bold text-slate-900">Patient Appointments</h2>
                        </div>

                        <div className="mt-6 grid gap-3 rounded-[24px] border border-blue-100 bg-[linear-gradient(135deg,#EFF6FF_0%,#F8FBFF_100%)] p-4 md:grid-cols-2 xl:grid-cols-6">
                            <label className="flex flex-col gap-2 text-sm text-slate-700 xl:col-span-2">
                                <span className="font-semibold text-slate-900">Search</span>
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />
                                    <input
                                        type="text"
                                        value={appointmentFilters.search}
                                        onChange={(e) => updateAppointmentFilter("search", e.target.value)}
                                        placeholder="Name, phone, email, department"
                                        className="w-full rounded-2xl border border-blue-200 bg-white py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                    />
                                </div>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">Status</span>
                                <select value={appointmentFilters.status} onChange={(e) => updateAppointmentFilter("status", e.target.value)} className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500">
                                    <option value="all">All</option>
                                    {statusOptions.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">View</span>
                                <select value={appointmentFilters.view} onChange={(e) => updateAppointmentFilter("view", e.target.value)} className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500">
                                    <option value="all">All</option>
                                    <option value="today">Today</option>
                                    <option value="past">Past</option>
                                </select>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">From</span>
                                <input type="date" value={appointmentFilters.from} onChange={(e) => updateAppointmentFilter("from", e.target.value)} className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500" />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">To</span>
                                <input type="date" value={appointmentFilters.to} onChange={(e) => updateAppointmentFilter("to", e.target.value)} className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500" />
                            </label>
                            <div className="flex flex-col gap-2 text-sm xl:justify-end">
                                <span className="font-semibold text-slate-900">Reset</span>
                                <button type="button" onClick={() => setAppointmentFilters(emptyAppointmentFilters)} className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 font-semibold text-blue-900 transition hover:bg-blue-100">Clear filters</button>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="mt-6 rounded-3xl border border-blue-100 bg-slate-50 p-10 text-center text-slate-500">Loading appointments…</div>
                        ) : filteredAppointments.length === 0 ? (
                            <div className="mt-6 rounded-3xl border border-dashed border-blue-200 bg-slate-50 p-10 text-center">
                                <p className="text-lg font-semibold text-slate-700">No appointments found</p>
                                <p className="mt-2 text-sm text-slate-500">Try clearing filters or changing the date range.</p>
                            </div>
                        ) : (
                            <div className="mt-6 overflow-hidden rounded-[24px] border border-blue-100">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[1120px] divide-y divide-blue-100 text-sm">
                                        <thead className="bg-blue-50 text-left text-slate-700">
                                            <tr>
                                                <th className="px-4 py-3 font-semibold">Patient</th>
                                                <th className="px-4 py-3 font-semibold">Contact</th>
                                                <th className="px-4 py-3 font-semibold">Date</th>
                                                <th className="px-4 py-3 font-semibold">Time</th>
                                                <th className="px-4 py-3 font-semibold">Department</th>
                                                <th className="px-4 py-3 font-semibold">Doctor</th>
                                                <th className="px-4 py-3 font-semibold">Status</th>
                                                <th className="px-4 py-3 font-semibold">Created</th>
                                                <th className="px-4 py-3 text-center font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-blue-50 bg-white">
                                            {filteredAppointments.map((appt) => (
                                                <tr key={appt._id} className="align-top">
                                                    <td className="px-4 py-4"><p className="font-semibold text-slate-900">{appt.name || "N/A"}</p></td>
                                                    <td className="px-4 py-4 text-slate-700">
                                                        <p>{appt.phone || "N/A"}</p>
                                                        <p className="mt-1 break-all text-slate-500">{appt.email || "N/A"}</p>
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-700">{formatDate(appt.date)}</td>
                                                    <td className="px-4 py-4 text-slate-700">{formatTime(appt.time)}</td>
                                                    <td className="px-4 py-4 text-slate-700">{appt.department || "N/A"}</td>
                                                    <td className="px-4 py-4 text-slate-700">{appt.doctor || "N/A"}</td>
                                                    <td className="px-4 py-4">
                                                        <div className="flex flex-col gap-2">
                                                            <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusClasses(appt.status)}`}>
                                                                {appt.status || "pending"}
                                                            </span>
                                                            <select
                                                                value={appt.status || "pending"}
                                                                onChange={(e) => updateStatus(appt._id, e.target.value)}
                                                                className="rounded-xl border border-slate-300 bg-white px-3 py-2 font-semibold text-slate-700 outline-none transition focus:border-blue-500"
                                                            >
                                                                {statusOptions.map((s) => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                                                            </select>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-700">{formatDateTime(appt.createdAt)}</td>
                                                    <td className="px-4 py-4 text-center">
                                                        <button type="button" onClick={() => confirmDelete({ id: appt._id, type: "appointment", name: appt.name })} className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100">
                                                            <Trash2 className="h-4 w-4" /> Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* ── Feedback ─────────────────────────────────────────────── */}
                {activeSection === "feedback" && (
                    <section className="rounded-[28px] border border-blue-100 bg-white p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] sm:p-6">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Feedback</p>
                            <h2 className="mt-1 text-2xl font-bold text-slate-900">Patient Feedback</h2>
                        </div>

                        <div className="mt-6 grid gap-3 rounded-[24px] border border-blue-100 bg-[linear-gradient(135deg,#EFF6FF_0%,#F8FBFF_100%)] p-4 md:grid-cols-2 xl:grid-cols-5">
                            <label className="flex flex-col gap-2 text-sm text-slate-700 xl:col-span-2">
                                <span className="font-semibold text-slate-900">Search</span>
                                <div className="relative">
                                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-500" />
                                    <input type="text" value={feedbackFilters.search} onChange={(e) => updateFeedbackFilter("search", e.target.value)} placeholder="Name, phone, email, subject, message" className="w-full rounded-2xl border border-blue-200 bg-white py-2.5 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200" />
                                </div>
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">From</span>
                                <input type="date" value={feedbackFilters.from} onChange={(e) => updateFeedbackFilter("from", e.target.value)} className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500" />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">To</span>
                                <input type="date" value={feedbackFilters.to} onChange={(e) => updateFeedbackFilter("to", e.target.value)} className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500" />
                            </label>
                            <label className="flex flex-col gap-2 text-sm text-slate-700">
                                <span className="font-semibold text-slate-900">Sort</span>
                                <select value={feedbackFilters.sort} onChange={(e) => updateFeedbackFilter("sort", e.target.value)} className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500">
                                    <option value="newest">Newest first</option>
                                    <option value="oldest">Oldest first</option>
                                </select>
                            </label>
                            <div className="flex flex-col gap-2 text-sm xl:justify-end">
                                <span className="font-semibold text-slate-900">Reset</span>
                                <button type="button" onClick={() => setFeedbackFilters(emptyFeedbackFilters)} className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 font-semibold text-blue-900 transition hover:bg-blue-100">Clear filters</button>
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="mt-6 rounded-3xl border border-blue-100 bg-slate-50 p-10 text-center text-slate-500">Loading feedback…</div>
                        ) : filteredFeedback.length === 0 ? (
                            <div className="mt-6 rounded-3xl border border-dashed border-blue-200 bg-slate-50 p-10 text-center">
                                <p className="text-lg font-semibold text-slate-700">No feedback found</p>
                                <p className="mt-2 text-sm text-slate-500">Try clearing filters or changing the date range.</p>
                            </div>
                        ) : (
                            <div className="mt-6 overflow-hidden rounded-[24px] border border-blue-100">
                                <div className="overflow-x-auto">
                                    <table className="w-full min-w-[1180px] divide-y divide-blue-100 text-sm">
                                        <thead className="bg-blue-50 text-left text-slate-700">
                                            <tr>
                                                <th className="px-4 py-3 font-semibold">Patient</th>
                                                <th className="px-4 py-3 font-semibold">Contact</th>
                                                <th className="px-4 py-3 font-semibold">Subject</th>
                                                <th className="px-4 py-3 font-semibold">Message</th>
                                                <th className="px-4 py-3 font-semibold">Submitted</th>
                                                <th className="px-4 py-3 text-center font-semibold">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-blue-50 bg-white">
                                            {filteredFeedback.map((fb) => (
                                                <tr key={fb._id} className="align-top">
                                                    <td className="px-4 py-4"><p className="font-semibold text-slate-900">{fb.name || "N/A"}</p></td>
                                                    <td className="px-4 py-4 text-slate-700">
                                                        <p>{fb.phone || "N/A"}</p>
                                                        <p className="mt-1 break-all text-slate-500">{fb.email || "N/A"}</p>
                                                    </td>
                                                    <td className="px-4 py-4 text-slate-700">{fb.subject || "No subject"}</td>
                                                    <td className="px-4 py-4 text-slate-700"><div className="max-w-xl whitespace-pre-wrap leading-6">{fb.message || "N/A"}</div></td>
                                                    <td className="px-4 py-4 text-slate-700">{formatDateTime(fb.createdAt)}</td>
                                                    <td className="px-4 py-4 text-center">
                                                        <div className="flex min-w-[170px] flex-col items-center gap-2">
                                                            <button type="button" onClick={() => toggleTestimonial(fb)} className={`inline-flex w-full items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold transition ${fb.showOnTestimonials ? "border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "border border-red-200 bg-red-50 text-red-700 hover:bg-red-100"}`}>
                                                                {fb.showOnTestimonials ? "In Testimonials" : "Send to Testimonials"}
                                                            </button>
                                                            <button type="button" onClick={() => confirmDelete({ id: fb._id, type: "feedback", name: fb.name })} className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-100">
                                                                <Trash2 className="h-4 w-4" /> Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </section>
                )}

                {/* ── Staff Management ─────────────────────────────────────── */}
                {activeSection === "staff" && (
                    <section className="rounded-[28px] border border-blue-100 bg-white p-4 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)] sm:p-6">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Staff</p>
                                <h2 className="mt-1 text-2xl font-bold text-slate-900">Staff Management</h2>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setStaffView("members")}
                                    className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${staffView === "members" ? "bg-blue-700 text-white" : "border border-blue-200 bg-white text-blue-900 hover:bg-blue-50"}`}
                                >
                                    <Users className="h-4 w-4" /> Members
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setStaffView("attendance")}
                                    className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${staffView === "attendance" ? "bg-blue-700 text-white" : "border border-blue-200 bg-white text-blue-900 hover:bg-blue-50"}`}
                                >
                                    <CalendarDays className="h-4 w-4" /> Attendance
                                </button>
                                {staffView === "members" && (
                                    <button
                                        type="button"
                                        onClick={() => { setShowAddStaff(true); setAddStaffError(""); setAddStaffForm(emptyAddStaffForm); }}
                                        className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                    >
                                        <UserPlus className="h-4 w-4" /> Add Staff
                                    </button>
                                )}
                            </div>
                        </div>

                        {staffError && (
                            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">{staffError}</div>
                        )}

                        {/* Staff Members Table */}
                        {staffView === "members" && (
                            isStaffLoading ? (
                                <div className="mt-6 rounded-3xl border border-blue-100 bg-slate-50 p-10 text-center text-slate-500">Loading staff…</div>
                            ) : staffList.length === 0 ? (
                                <div className="mt-6 rounded-3xl border border-dashed border-blue-200 bg-slate-50 p-10 text-center">
                                    <p className="text-lg font-semibold text-slate-700">No staff members yet</p>
                                    <p className="mt-2 text-sm text-slate-500">Click "Add Staff" to add your first team member.</p>
                                </div>
                            ) : (
                                <div className="mt-6 overflow-hidden rounded-[24px] border border-blue-100">
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[800px] divide-y divide-blue-100 text-sm">
                                            <thead className="bg-blue-50 text-left text-slate-700">
                                                <tr>
                                                    <th className="px-4 py-3 font-semibold">Name</th>
                                                    <th className="px-4 py-3 font-semibold">Employee ID</th>
                                                    <th className="px-4 py-3 font-semibold">Role</th>
                                                    <th className="px-4 py-3 font-semibold">Department</th>
                                                    <th className="px-4 py-3 font-semibold">Shift</th>
                                                    <th className="px-4 py-3 font-semibold">Phone</th>
                                                    <th className="px-4 py-3 font-semibold">Status</th>
                                                    <th className="px-4 py-3 text-center font-semibold">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-blue-50 bg-white">
                                                {staffList.map((s) => (
                                                    <tr key={s._id} className="align-middle">
                                                        <td className="px-4 py-3 font-semibold text-slate-900">{s.name}</td>
                                                        <td className="px-4 py-3 font-mono text-slate-700">{s.employeeId}</td>
                                                        <td className="px-4 py-3 text-slate-700">{s.role}</td>
                                                        <td className="px-4 py-3 text-slate-700">{s.department || "—"}</td>
                                                        <td className="px-4 py-3 text-slate-700">{SHIFT_LABELS[s.shift] || s.shift}</td>
                                                        <td className="px-4 py-3 text-slate-700">{s.phone || "—"}</td>
                                                        <td className="px-4 py-3">
                                                            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${s.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                                                                {s.isActive ? "Active" : "Inactive"}
                                                            </span>
                                                        </td>
                                                        <td className="px-4 py-3 text-center">
                                                            <div className="flex justify-center gap-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => toggleStaffActive(s)}
                                                                    className={`rounded-xl border px-3 py-1.5 text-xs font-semibold transition ${s.isActive ? "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100" : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"}`}
                                                                >
                                                                    {s.isActive ? "Deactivate" : "Activate"}
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setPendingDeleteStaff(s)}
                                                                    className="inline-flex items-center gap-1 rounded-xl border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100"
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5" /> Delete
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        )}

                        {/* Attendance View */}
                        {staffView === "attendance" && (
                            <div className="mt-6">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                                    <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                                        Select Date
                                        <input
                                            type="date"
                                            value={attendanceDate}
                                            onChange={(e) => {
                                                setAttendanceDate(e.target.value);
                                                fetchAttendance(e.target.value);
                                            }}
                                            className="rounded-2xl border border-blue-200 bg-white px-4 py-2.5 outline-none transition focus:border-blue-500"
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => fetchAttendance(attendanceDate)}
                                        className="rounded-2xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800"
                                    >
                                        Refresh
                                    </button>
                                </div>

                                {isAttendanceLoading ? (
                                    <div className="mt-6 rounded-3xl border border-blue-100 bg-slate-50 p-10 text-center text-slate-500">Loading attendance…</div>
                                ) : attendanceRecords.length === 0 ? (
                                    <div className="mt-6 rounded-3xl border border-dashed border-blue-200 bg-slate-50 p-10 text-center">
                                        <p className="text-lg font-semibold text-slate-700">No attendance records</p>
                                        <p className="mt-2 text-sm text-slate-500">No staff checked in on {attendanceDate}.</p>
                                    </div>
                                ) : (
                                    <div className="mt-6 overflow-hidden rounded-[24px] border border-blue-100">
                                        <div className="flex items-center justify-between bg-blue-50 px-5 py-3">
                                            <span className="text-sm font-semibold text-slate-700">
                                                {attendanceDate} — {attendanceRecords.length} record{attendanceRecords.length !== 1 ? "s" : ""}
                                            </span>
                                            <div className="flex gap-3 text-xs font-semibold">
                                                <span className="text-emerald-700">{attendanceRecords.filter(r => r.status === "present").length} Present</span>
                                                <span className="text-amber-700">{attendanceRecords.filter(r => r.status === "late").length} Late</span>
                                                <span className="text-orange-700">{attendanceRecords.filter(r => r.status === "half-day").length} Half-day</span>
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto">
                                            <table className="w-full min-w-[700px] divide-y divide-blue-100 text-sm">
                                                <thead className="bg-blue-50 text-left text-slate-700">
                                                    <tr>
                                                        <th className="px-4 py-3 font-semibold">Name</th>
                                                        <th className="px-4 py-3 font-semibold">Employee ID</th>
                                                        <th className="px-4 py-3 font-semibold">Check In</th>
                                                        <th className="px-4 py-3 font-semibold">Check Out</th>
                                                        <th className="px-4 py-3 font-semibold">Hours</th>
                                                        <th className="px-4 py-3 font-semibold">Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-blue-50 bg-white">
                                                    {attendanceRecords.map((r) => (
                                                        <tr key={r._id} className="align-middle">
                                                            <td className="px-4 py-3 font-semibold text-slate-900">{r.name}</td>
                                                            <td className="px-4 py-3 font-mono text-slate-700">{r.employeeId}</td>
                                                            <td className="px-4 py-3 text-slate-700">{fmtISOTime(r.checkIn)}</td>
                                                            <td className="px-4 py-3 text-slate-700">{fmtISOTime(r.checkOut)}</td>
                                                            <td className="px-4 py-3 text-slate-700">{r.hoursWorked ? `${r.hoursWorked}h` : "—"}</td>
                                                            <td className="px-4 py-3">
                                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${getAttendanceClasses(r.status)}`}>
                                                                    {r.status}
                                                                </span>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                )}
                {/* ── Doctors Management ───────────────────────────────── */}
                {activeSection === "doctors" && (() => {
                    const overrideMap = new Map(doctorList.filter((d) => d.staticId).map((d) => [d.staticId, d]));
                    const pureCustom = doctorList.filter((d) => !d.staticId);
                    const combinedRows = [
                        ...DOCTORS.map((s) => overrideMap.has(s.id)
                            ? { ...overrideMap.get(s.id), _kind: "override", _staticAvatar: s.avatar }
                            : { ...s, _kind: "static", _id: null }),
                        ...pureCustom.map((d) => ({ ...d, _kind: "custom" })),
                    ];
                    const q = doctorSearch.toLowerCase();
                    const filtered = combinedRows.filter((d) => {
                        const name = (d.name || "").toLowerCase();
                        const dept = (d.dept || "").toLowerCase();
                        if (q && !name.includes(q) && !dept.includes(q)) return false;
                        if (doctorFilter === "static") return d._kind === "static" || d._kind === "override";
                        if (doctorFilter === "custom") return d._kind === "custom";
                        return true;
                    });

                    const DeptBadgeColor = (dept = "") => {
                        const d = dept.toUpperCase();
                        if (d.includes("CARDIO")) return "bg-red-100 text-red-700";
                        if (d.includes("NEURO")) return "bg-purple-100 text-purple-700";
                        if (d.includes("ORTHO")) return "bg-orange-100 text-orange-700";
                        if (d.includes("PAEDIA") || d.includes("PEDIA")) return "bg-pink-100 text-pink-700";
                        if (d.includes("GYNAE") || d.includes("GYNE") || d.includes("OBSTET")) return "bg-rose-100 text-rose-700";
                        if (d.includes("GENERAL")) return "bg-blue-100 text-blue-700";
                        if (d.includes("PULMO") || d.includes("RESPIR")) return "bg-cyan-100 text-cyan-700";
                        if (d.includes("GASTRO")) return "bg-lime-100 text-lime-700";
                        if (d.includes("UROLOGY")) return "bg-indigo-100 text-indigo-700";
                        if (d.includes("ENT")) return "bg-teal-100 text-teal-700";
                        if (d.includes("OPHTHAL")) return "bg-sky-100 text-sky-700";
                        if (d.includes("DERMA")) return "bg-fuchsia-100 text-fuchsia-700";
                        return "bg-slate-100 text-slate-600";
                    };

                    const getAvatar = (d) => d.photo || d.avatar || d._staticAvatar || null;

                    const getInitials = (name = "") => name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

                    return (
                        <section className="rounded-[28px] border border-blue-100 bg-white shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)]">
                            {/* Header */}
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-blue-50 px-5 py-5 sm:px-7">
                                <div>
                                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">Doctors</p>
                                    <h2 className="mt-0.5 text-2xl font-bold text-slate-900">All Doctor Profiles</h2>
                                    <p className="mt-1 text-sm text-slate-500">{filtered.length} of {combinedRows.length} doctors shown</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => { setEditingDoctor(null); setDoctorForm(emptyDoctorForm); setDoctorFormError(""); setShowAddDoctor(true); }}
                                    className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                                >
                                    <Plus className="h-4 w-4" /> Add New Doctor
                                </button>
                            </div>

                            {/* Search + Filter */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center px-5 py-4 sm:px-7 border-b border-blue-50 bg-slate-50/50">
                                <div className="relative flex-1">
                                    <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name or department…"
                                        value={doctorSearch}
                                        onChange={(e) => setDoctorSearch(e.target.value)}
                                        className="w-full rounded-2xl border border-blue-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    {[["all", "All"], ["static", "Built-in"], ["custom", "Custom"]].map(([val, label]) => (
                                        <button
                                            key={val}
                                            type="button"
                                            onClick={() => setDoctorFilter(val)}
                                            className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${doctorFilter === val ? "bg-blue-700 text-white" : "border border-blue-200 bg-white text-slate-600 hover:bg-blue-50"}`}
                                        >
                                            <Filter className="h-3 w-3" /> {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Grid */}
                            <div className="p-5 sm:p-7">
                                {isDoctorsLoading ? (
                                    <div className="rounded-3xl border border-blue-100 bg-slate-50 p-16 text-center text-slate-500">
                                        <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
                                        Loading doctors…
                                    </div>
                                ) : filtered.length === 0 ? (
                                    <div className="rounded-3xl border border-dashed border-blue-200 bg-slate-50 p-14 text-center">
                                        <Stethoscope className="mx-auto mb-3 h-10 w-10 text-slate-300" />
                                        <p className="text-lg font-semibold text-slate-700">No doctors found</p>
                                        <p className="mt-1 text-sm text-slate-400">Try changing your search or filter.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                        {filtered.map((doc, i) => {
                                            const avatar = getAvatar(doc);
                                            const initials = getInitials(doc.name);
                                            const badgeColor = DeptBadgeColor(doc.dept);
                                            const deptLabel = doc.dept ? doc.dept.charAt(0).toUpperCase() + doc.dept.slice(1).toLowerCase() : "—";
                                            const isStatic = doc._kind === "static";
                                            const isOverride = doc._kind === "override";
                                            const nameTitled = (doc.name || "").split(" ").map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(" ");

                                            return (
                                                <div key={doc._id || `static-${i}`} className="group relative rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
                                                    {/* Photo header */}
                                                    <div className="relative h-36 bg-linear-to-br from-blue-600 to-blue-800 overflow-hidden">
                                                        {avatar ? (
                                                            <img src={avatar} alt={nameTitled} className="w-full h-full object-cover object-top group-hover:scale-[1.06] transition-transform duration-500" />
                                                        ) : (
                                                            <div className="w-full h-full flex items-center justify-center">
                                                                <span className="text-4xl font-black text-white/40">{initials}</span>
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-black/50 to-transparent" />

                                                        {/* Kind badge */}
                                                        <span className={`absolute top-2.5 right-2.5 rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                                                            isStatic ? "bg-blue-600/90 text-white" :
                                                            isOverride ? "bg-amber-500/90 text-white" :
                                                            "bg-emerald-600/90 text-white"
                                                        }`}>
                                                            {isStatic ? "Built-in" : isOverride ? "Edited" : "Custom"}
                                                        </span>
                                                    </div>

                                                    {/* Body */}
                                                    <div className="flex flex-col flex-1 p-4">
                                                        {/* Dept badge */}
                                                        <span className={`self-start rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider mb-2 ${badgeColor}`}>
                                                            {deptLabel}
                                                        </span>

                                                        <h3 className="text-sm font-black text-slate-900 leading-snug">{nameTitled}</h3>
                                                        <p className="text-xs font-bold text-blue-600 mt-0.5">{doc.designation}</p>

                                                        <div className="mt-2.5 space-y-1.5 pt-2.5 border-t border-slate-50">
                                                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                                                <GraduationCap className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                                                <span className="truncate">{doc.qualification || "—"}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                                                <Clock className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                                                <span className="truncate">{doc.timing || "—"}</span>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                                                <Star className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                                                                <span>{doc.experience}+ yrs experience</span>
                                                            </div>
                                                        </div>

                                                        {/* Actions */}
                                                        <div className="mt-auto pt-3 flex gap-2">
                                                            <button
                                                                type="button"
                                                                onClick={() => isStatic ? openEditStaticDoctor(doc) : openEditDoctor(doc)}
                                                                className="flex-1 flex items-center justify-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 py-2 text-xs font-bold text-blue-700 hover:bg-blue-100 transition"
                                                            >
                                                                <Pencil className="h-3 w-3" /> Edit
                                                            </button>
                                                            <a
                                                                href={`/doctors/${doc._id || doc.id}`}
                                                                target="_blank"
                                                                rel="noreferrer"
                                                                className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                                                                title="View profile"
                                                            >
                                                                <ExternalLink className="h-3 w-3" />
                                                            </a>
                                                            {!isStatic && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setPendingDeleteDoctor(doc)}
                                                                    className="flex items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-100 transition"
                                                                    title="Delete"
                                                                >
                                                                    <Trash2 className="h-3 w-3" />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </section>
                    );
                })()}
            </div>

            {/* ── Delete Appointment/Feedback Confirmation ─────────────── */}
            {pendingDelete && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-[28px] border border-red-200 bg-white p-7 shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-red-100 p-3 text-red-700">
                                <Trash2 className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">Delete {pendingDelete.type === "feedback" ? "Feedback" : "Appointment"}?</h3>
                                <p className="text-sm text-slate-500">This action cannot be undone.</p>
                            </div>
                        </div>
                        <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                            {pendingDelete.name || "This record"} will be removed permanently.
                        </p>
                        <div className="mt-7 flex justify-end gap-3">
                            <button type="button" onClick={() => setPendingDelete(null)} className="rounded-2xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</button>
                            <button type="button" onClick={handleDelete} className="rounded-2xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">Delete now</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Staff Confirmation ─────────────────────────────── */}
            {pendingDeleteStaff && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-[28px] border border-red-200 bg-white p-7 shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-red-100 p-3 text-red-700">
                                <Trash2 className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">Remove Staff Member?</h3>
                                <p className="text-sm text-slate-500">This cannot be undone.</p>
                            </div>
                        </div>
                        <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                            <strong>{pendingDeleteStaff.name}</strong> ({pendingDeleteStaff.employeeId}) will be permanently removed.
                        </p>
                        <div className="mt-7 flex justify-end gap-3">
                            <button type="button" onClick={() => setPendingDeleteStaff(null)} className="rounded-2xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</button>
                            <button type="button" onClick={handleDeleteStaff} className="rounded-2xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">Remove now</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Delete Doctor Confirmation ───────────────────────────── */}
            {pendingDeleteDoctor && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-[28px] border border-red-200 bg-white p-7 shadow-2xl">
                        <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-red-100 p-3 text-red-700"><Trash2 className="h-5 w-5" /></div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900">Remove Doctor?</h3>
                                <p className="text-sm text-slate-500">This cannot be undone.</p>
                            </div>
                        </div>
                        <p className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                            <strong>{pendingDeleteDoctor.name}</strong> will be permanently removed from the website.
                        </p>
                        <div className="mt-7 flex justify-end gap-3">
                            <button type="button" onClick={() => setPendingDeleteDoctor(null)} className="rounded-2xl border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</button>
                            <button type="button" onClick={handleDeleteDoctor} className="rounded-2xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700">Remove now</button>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Add / Edit Doctor Modal ───────────────────────────────── */}
            {showAddDoctor && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm overflow-y-auto py-8">
                    <div className="w-full max-w-2xl rounded-[28px] border border-blue-100 bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-blue-100 px-6 py-5">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">{editingDoctor ? "Edit Doctor" : "Add New Doctor"}</h3>
                                <p className="mt-0.5 text-sm text-slate-500">Fill in the details — the profile appears live on the website.</p>
                            </div>
                            <button type="button" onClick={() => { setShowAddDoctor(false); setEditingDoctor(null); }} className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSaveDoctor} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
                            {doctorFormError && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{doctorFormError}</div>
                            )}

                            {/* Photo upload */}
                            <div className="flex flex-col gap-1.5">
                                <span className="text-sm font-semibold text-slate-700">Doctor Photo</span>
                                <label className="flex items-center gap-3 cursor-pointer rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50 px-4 py-4 hover:bg-blue-100 transition">
                                    <ImagePlus className="h-6 w-6 text-blue-400 shrink-0" />
                                    <div>
                                        <p className="text-sm font-semibold text-blue-700">Click to upload photo</p>
                                        <p className="text-xs text-slate-500">JPG, PNG — auto-compressed to small size</p>
                                    </div>
                                    <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        const b64 = await compressImage(file);
                                        setDoctorForm((p) => ({ ...p, photo: b64 }));
                                    }} />
                                </label>
                                {doctorForm.photo && (
                                    <div className="mt-2 flex items-center gap-3">
                                        <img src={doctorForm.photo} alt="preview" className="h-16 w-16 rounded-xl object-cover border border-slate-200" />
                                        <button type="button" onClick={() => setDoctorForm((p) => ({ ...p, photo: "" }))} className="text-xs text-red-600 hover:underline">Remove photo</button>
                                    </div>
                                )}
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    { label: "Full Name *", key: "name", placeholder: "e.g. DR. RAVI SHARMA", required: true },
                                    { label: "Designation *", key: "designation", placeholder: "CONSULTANT / SR. CONSULTANT", required: true },
                                    { label: "Department *", key: "dept", placeholder: "e.g. CARDIOLOGY", required: true },
                                    { label: "Qualification *", key: "qualification", placeholder: "e.g. MBBS/MD/DM", required: true },
                                    { label: "Timing *", key: "timing", placeholder: "e.g. 10:00 AM – 5:00 PM", required: true },
                                    { label: "Experience (years) *", key: "experience", placeholder: "e.g. 12", required: true, type: "number" },
                                    { label: "Camp / Special Note", key: "camp", placeholder: "e.g. Every Sunday – Camp", required: false },
                                ].map(({ label, key, placeholder, required, type }) => (
                                    <label key={key} className={`flex flex-col gap-1.5 text-sm font-semibold text-slate-700 ${key === "camp" ? "sm:col-span-2" : ""}`}>
                                        {label}
                                        <input
                                            type={type || "text"}
                                            required={required}
                                            value={doctorForm[key]}
                                            placeholder={placeholder}
                                            onChange={(e) => setDoctorForm((p) => ({ ...p, [key]: e.target.value }))}
                                            className="rounded-2xl border border-slate-200 px-4 py-2.5 font-normal outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        />
                                    </label>
                                ))}
                            </div>

                            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                                Expertise (comma-separated)
                                <input
                                    type="text"
                                    value={doctorForm.expertise}
                                    placeholder="e.g. Angioplasty, Heart Failure, ECG"
                                    onChange={(e) => setDoctorForm((p) => ({ ...p, expertise: e.target.value }))}
                                    className="rounded-2xl border border-slate-200 px-4 py-2.5 font-normal outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                />
                            </label>

                            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                                Bio / About
                                <textarea
                                    rows={4}
                                    value={doctorForm.bio}
                                    placeholder="Write a short professional bio about the doctor..."
                                    onChange={(e) => setDoctorForm((p) => ({ ...p, bio: e.target.value }))}
                                    className="rounded-2xl border border-slate-200 px-4 py-2.5 font-normal outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
                                />
                            </label>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => { setShowAddDoctor(false); setEditingDoctor(null); }} className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</button>
                                <button type="submit" disabled={isSavingDoctor} className="rounded-2xl bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60">
                                    {isSavingDoctor ? "Saving…" : editingDoctor ? "Save Changes" : "Add Doctor"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── Add Staff Modal ───────────────────────────────────────── */}
            {showAddStaff && (
                <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
                    <div className="w-full max-w-lg rounded-[28px] border border-blue-100 bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-blue-100 px-6 py-5">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Add Staff Member</h3>
                                <p className="mt-0.5 text-sm text-slate-500">Fill in all required fields to create a new account.</p>
                            </div>
                            <button type="button" onClick={() => setShowAddStaff(false)} className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleAddStaff} className="p-6 space-y-4">
                            {addStaffError && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{addStaffError}</div>
                            )}

                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                                    Employee ID *
                                    <input
                                        required
                                        value={addStaffForm.employeeId}
                                        onChange={(e) => setAddStaffForm((p) => ({ ...p, employeeId: e.target.value.toUpperCase() }))}
                                        placeholder="e.g. TH001"
                                        className="rounded-2xl border border-slate-200 px-4 py-2.5 font-mono uppercase outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </label>
                                <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                                    Full Name *
                                    <input
                                        required
                                        value={addStaffForm.name}
                                        onChange={(e) => setAddStaffForm((p) => ({ ...p, name: e.target.value }))}
                                        placeholder="Full name"
                                        className="rounded-2xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </label>
                                <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                                    Role *
                                    <input
                                        required
                                        value={addStaffForm.role}
                                        onChange={(e) => setAddStaffForm((p) => ({ ...p, role: e.target.value }))}
                                        placeholder="e.g. Staff Nurse, Office Boy"
                                        className="rounded-2xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </label>
                                <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                                    Department
                                    <input
                                        value={addStaffForm.department}
                                        onChange={(e) => setAddStaffForm((p) => ({ ...p, department: e.target.value }))}
                                        placeholder="e.g. ICU, OPD, Pharmacy"
                                        className="rounded-2xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </label>
                                <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                                    Shift
                                    <select value={addStaffForm.shift} onChange={(e) => setAddStaffForm((p) => ({ ...p, shift: e.target.value }))} className="rounded-2xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500">
                                        <option value="morning">Morning</option>
                                        <option value="evening">Evening</option>
                                        <option value="night">Night</option>
                                    </select>
                                </label>
                                <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                                    Phone
                                    <input
                                        value={addStaffForm.phone}
                                        onChange={(e) => setAddStaffForm((p) => ({ ...p, phone: e.target.value }))}
                                        placeholder="+91 98765 43210"
                                        className="rounded-2xl border border-slate-200 px-4 py-2.5 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                </label>
                            </div>

                            <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
                                PIN * (4–8 digits)
                                <div className="relative">
                                    <input
                                        required
                                        type={showPin ? "text" : "password"}
                                        inputMode="numeric"
                                        pattern="[0-9]{4,8}"
                                        value={addStaffForm.pin}
                                        onChange={(e) => setAddStaffForm((p) => ({ ...p, pin: e.target.value.replace(/\D/g, "") }))}
                                        placeholder="4–8 digit PIN"
                                        className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />
                                    <button type="button" onClick={() => setShowPin((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                                        {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </label>

                            <div className="flex justify-end gap-3 pt-2">
                                <button type="button" onClick={() => setShowAddStaff(false)} className="rounded-2xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">Cancel</button>
                                <button type="submit" disabled={isAddingStaff} className="rounded-2xl bg-blue-700 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:opacity-60">
                                    {isAddingStaff ? "Adding…" : "Add Staff Member"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
