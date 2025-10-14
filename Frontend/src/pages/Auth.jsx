import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // ✅ Added Link import
import axios from "axios";
import { authService } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "../hooks/useToast";
import ToastContainer from "../components/ToastContainer";
import { Loader2, Lock, User } from "lucide-react";

export default function Auth() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ rollno: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [hasValidRollno, setHasValidRollno] = useState(false);
  const [hasWrongPassword, setHasWrongPassword] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
    
    // Reset wrong password flag when roll number changes
    if (e.target.name === "rollno") {
      setHasWrongPassword(false);
    }
  };

  // Check if roll number exists in database
  const checkRollnoExists = async (rollno) => {
    if (!rollno || rollno.trim().length === 0) {
      setHasValidRollno(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/check-rollno", {
        rollno: rollno.trim()
      });
      
      if (response.data.exists) {
        setHasValidRollno(true);
      } else {
        setHasValidRollno(false);
      }
    } catch (error) {
      setHasValidRollno(false);
    }
  };

  // Debounced effect to check roll number
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkRollnoExists(form.rollno);
    }, 500); // 500ms delay

    return () => clearTimeout(timeoutId);
  }, [form.rollno]);

  // Check if roll number starts with 24, 25, 26, etc. (junior years)
  const isJuniorYear = (rollno) => {
    if (!rollno || rollno.length < 2) return false;
    const firstTwoDigits = rollno.substring(0, 2);
    return ['24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35'].includes(firstTwoDigits);
  };

  // Handle Enter key press for junior year redirect
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && isJuniorYear(form.rollno.trim())) {
      e.preventDefault(); // Prevent form submission
      navigate("/resources", {
        state: { 
          showJuniorMessage: true,
          message: "You still have time to learn a lot!"
        }
      }); // Immediate redirect with state
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.rollno.trim()) {
      newErrors.rollno = "Roll number is required";
    } else if (!hasValidRollno) {
      newErrors.rollno = "Enter a valid roll number";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      if (!hasValidRollno && form.rollno.trim()) {
        toast.error("Enter a valid roll number");
      } else {
        toast.error("Please fix the errors before submitting");
      }
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        rollno: form.rollno,
        password: form.password,
      });

      login(res.data.token, res.data.student);
      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      
      // Check if it's a wrong password error
      if (err.response?.status === 401 || errorMessage.toLowerCase().includes("password")) {
        setHasWrongPassword(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-6 text-gray-900 dark:text-gray-200 max-w-7xl mx-auto">
      <ToastContainer toasts={toast.toasts} removeToast={toast.removeToast} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="bg-white/80 dark:bg-dark-800/30 border border-gray-300/40 dark:border-gray-700/30 shadow-lg dark:shadow-none rounded-2xl w-full max-w-md p-8 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-6 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 mb-3 p-2">
            <img
              src="/ag logo bw.png"
              alt="TheAlumniGate Logo"
              className="w-full h-full object-contain dark:brightness-100 dark:invert-0"
            />
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Sign in to access your account
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Roll Number Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                name="rollno"
                placeholder="Enter your roll number"
                value={form.rollno}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className={`w-full pl-11 pr-4 py-3 border ${
                  errors.rollno
                    ? "border-red-500"
                    : "border-gray-300/40 dark:border-gray-700/30"
                } bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed`}
              />
            </div>
            <AnimatePresence>
              {errors.rollno && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-400 text-xs mt-1 ml-1"
                >
                  {errors.rollno}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Password Field - Only show if valid roll number */}
          <AnimatePresence>
            {hasValidRollno && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    disabled={loading}
                    className={`w-full pl-11 pr-4 py-3 border ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300/40 dark:border-gray-700/30"
                    } bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none transition disabled:opacity-50 disabled:cursor-not-allowed`}
                  />
                </div>
                <AnimatePresence>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-400 text-xs mt-1 ml-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign In Button - Only show if valid roll number and password field is visible */}
          <AnimatePresence>
            {hasValidRollno && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                type="submit"
                disabled={loading}
                className={`relative bg-gradient-to-r from-primary-600 to-primary-500 dark:from-primary-500 dark:to-primary-400 text-white py-3 rounded-lg font-semibold shadow-lg transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:shadow-primary-500/50 dark:hover:shadow-primary-400/50"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </motion.button>
            )}
          </AnimatePresence>

          {/* Forgot Password Link - Only show if wrong password */}
          <AnimatePresence>
            {hasWrongPassword && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-center mt-2"
              >
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 hover:underline transition-colors"
                >
                  Forgot Password?
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>
    </div>
  );
}
