import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, LogIn, User } from "lucide-react";
// We can leave this import here, but we are bypassing it for the fix
import { buildApiUrl } from "../utils/api";
import hospitalLogo from "../assets/images/reallogo1.png";

const AdminLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // ✅ FIX IS HERE: Hardcoded the backend link to port 5000
            const response = await fetch(buildApiUrl("/api/admin/login"), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const rawText = await response.text();
            let data = null;
            if (rawText) {
                try {
                    data = JSON.parse(rawText);
                } catch (_parseError) {
                    data = null;
                }
            }

            if (!response.ok) {
                const message =
                    data?.message ||
                    rawText ||
                    response.statusText ||
                    "Invalid username or password";
                throw new Error(message);
            }

            if (!data?.token) {
                throw new Error("Login failed. No token received.");
            }

            localStorage.setItem("adminToken", data.token);
            navigate("/admin/dashboard");
        } catch (err) {
            const fallback =
                err?.message === "Failed to fetch"
                    ? "Unable to reach server. Check backend URL and CORS."
                    : "Login failed";
            setError(err?.message || fallback);
            setTimeout(() => setError(""), 3000);
        }
    };

    const handleEnterToSubmit = (event) => {
        if (event.key === "Enter") {
            event.currentTarget.form?.requestSubmit();
        }
    };

    return (
        <div
            className="min-h-screen flex items-center justify-center px-4"
            style={{ backgroundColor: "#041AA9" }}
        >
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl shadow-black/20 overflow-hidden">
                    {/* Logo header */}
                    <div className="flex justify-center pt-8 pb-2">
                        <img src={hospitalLogo} alt="Trinay Hospital" className="h-14 w-auto object-contain" />
                    </div>

                    <div className="px-8 pb-8 pt-4">
                        <h1 className="text-2xl font-bold text-center text-blue-900 mb-1">
                            Admin Login
                        </h1>
                        <p className="text-center text-gray-500 text-sm mb-8">
                            Trinay Hospital Management
                        </p>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm mb-6 flex items-center gap-2">
                                <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-red-500" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-5">
                            <div>
                                <label
                                    htmlFor="username"
                                    className="block text-xs font-semibold text-blue-800 mb-1.5 ml-1"
                                >
                                    Username
                                </label>
                                <div className="relative">
                                    <User className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                                    <input
                                        type="text"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        onKeyDown={handleEnterToSubmit}
                                        className="w-full rounded-xl border border-blue-200/80 bg-white px-4 py-3 pl-11 text-sm text-blue-900 placeholder:text-gray-400 outline-none shadow-sm transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:shadow-md"
                                        placeholder="Enter username"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-semibold text-blue-800 mb-1.5 ml-1"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="w-4 h-4 text-blue-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" aria-hidden="true" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        onKeyDown={handleEnterToSubmit}
                                        className="w-full rounded-xl border border-blue-200/80 bg-white px-4 py-3 pl-11 pr-11 text-sm text-blue-900 placeholder:text-gray-400 outline-none shadow-sm transition-all duration-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:shadow-md"
                                        placeholder="Enter password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800 transition-colors"
                                        tabIndex={-1}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="w-full inline-flex items-center justify-center gap-2 text-white py-3 rounded-xl font-semibold shadow-md shadow-blue-700/25 hover:shadow-lg transition-all duration-200 hover:scale-[1.01] active:scale-[0.98]"
                                style={{ background: "linear-gradient(to right, #041AA9, #0320c5)" }}
                            >
                                <LogIn className="w-4 h-4" />
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;