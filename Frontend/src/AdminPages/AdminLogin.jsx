import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { AdminAuthContext } from "../context/AdminAuthContext"; // Import context

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { loginAdmin } = useContext(AdminAuthContext); // ✅ Use context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/admin/login", form);

      // ✅ Use context login function instead of manual localStorage
      await loginAdmin(res.data.token);

      toast.success("Admin login successful");
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
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
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-xl ring-4 ring-white/50 dark:ring-gray-800/50 mx-auto mb-4" style={{ backgroundColor: '#0ea5e9' }}>
            A
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Admin Login
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
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
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300/40 dark:border-gray-700/30 rounded-lg bg-white/50 dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300/40 dark:border-gray-700/30 rounded-lg bg-white/50 dark:bg-white/5 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: '#0ea5e9' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0284c7'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#0ea5e9'}
          >
            Login
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
