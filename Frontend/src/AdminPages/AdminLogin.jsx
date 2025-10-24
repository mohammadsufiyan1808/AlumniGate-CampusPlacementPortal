import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { AdminAuthContext } from "../context/AdminAuthContext";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [hasValidEmail, setHasValidEmail] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { loginAdmin } = useContext(AdminAuthContext);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    // Clear password error when user types
    if (e.target.name === "password") {
      setPasswordError("");
    }
  };

  // Check if admin email exists in database
  const checkEmailExists = async (email) => {
    if (!email || email.trim().length === 0) {
      setHasValidEmail(false);
      setEmailError("");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/admin/check-email", {
        email: email.trim()
      });
      
      if (response.data.exists) {
        setHasValidEmail(true);
        setEmailError("");
      } else {
        setHasValidEmail(false);
        setEmailError("Enter a valid email");
      }
    } catch (error) {
      setHasValidEmail(false);
      setEmailError("Enter a valid email");
    }
  };

  // Debounced effect to check email
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      checkEmailExists(form.email);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [form.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous errors
    setPasswordError("");
    
    // Validate form
    if (!form.email.trim()) {
      toast.error("Email is required");
      return;
    }
    
    if (!hasValidEmail) {
      toast.error("Enter a valid email");
      return;
    }
    
    if (!form.password) {
      setPasswordError("Password is required");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const res = await axios.post("http://localhost:8080/api/admin/login", form);

      await loginAdmin(res.data.token);

      toast.success("Admin login successful");
      navigate("/admin");
    } catch (err) {
      setIsLoading(false);
      
      // Handle specific error cases
      if (err.response?.status === 401) {
        setPasswordError("Invalid password");
      } else {
        setPasswordError(err.response?.data?.message || "Invalid credentials");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="bg-white/80 dark:bg-dark-800/30 border border-gray-300/40 dark:border-gray-700/30 shadow-lg dark:shadow-none rounded-2xl p-8 w-full max-w-md backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
          className="text-center mb-8"
        >
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl mx-auto mb-4" 
            style={{ backgroundColor: '#0ea5e9' }}
          >
            A
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
            Admin Login
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Access the admin dashboard
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Email Field */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
              className={`w-full px-4 py-3 border ${
                emailError
                  ? "border-red-500"
                  : "border-gray-300/40 dark:border-gray-700/30"
              } rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
              required
            />
            <AnimatePresence>
              {emailError && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 dark:text-red-400 text-xs mt-1 ml-1"
                >
                  {emailError}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          
          {/* Password Field - Only show if valid email */}
          <AnimatePresence>
            {hasValidEmail && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border ${
                    passwordError
                      ? "border-red-500"
                      : "border-gray-300/40 dark:border-gray-700/30"
                  } rounded-lg bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
                  required
                />
                <AnimatePresence>
                  {passwordError && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-500 dark:text-red-400 text-xs mt-1 ml-1"
                    >
                      {passwordError}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign In Button - Only show if valid email and password field is visible */}
          <AnimatePresence>
            {hasValidEmail && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
                className={`w-full text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg flex items-center justify-center gap-2 ${
                  isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-xl"
                }`}
                style={{ backgroundColor: isLoading ? '#0284c7' : '#0ea5e9' }}
                onMouseEnter={(e) => {
                  if (!isLoading) e.target.style.backgroundColor = '#0284c7';
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) e.target.style.backgroundColor = '#0ea5e9';
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <span>Login</span>
                )}
              </motion.button>
            )}
          </AnimatePresence>
        </motion.form>
      </motion.div>
    </div>
  );
}
