import { useState, useEffect } from "react";
import { AdminAuthContext } from "./AdminAuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export default function AdminAuthProvider({ children }) {
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 < Date.now(); // Convert to milliseconds
    } catch (err) {
      return true; // If decode fails, treat as expired
    }
  };

  // ✅ Decode JWT
  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (err) {
      console.error("Invalid admin token:", err);
      return null;
    }
  };

  // ✅ Fetch admin data
  const fetchAdminData = async (token) => {
    try {
      const res = await axios.get("http://localhost:8080/api/admin/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.admin;
    } catch (err) {
      console.error("Error fetching admin data:", err);
      return null;
    }
  };

  // ✅ On load — check admin token with cleanup
  useEffect(() => {
    let isMounted = true; // ✅ Prevent memory leak

    const initAuth = async () => {
      const token = localStorage.getItem("adminToken");
      
      if (token && !isTokenExpired(token)) {
        const decoded = decodeToken(token);
        
        if (decoded && isMounted) {
          const fullAdmin = await fetchAdminData(token);
          
          if (fullAdmin && isMounted) {
            setIsAdminLoggedIn(true);
            setAdmin(fullAdmin);
            localStorage.setItem("admin", JSON.stringify(fullAdmin));
          }
        }
      } else {
        // Token expired or doesn't exist - clear storage
        localStorage.removeItem("adminToken");
        localStorage.removeItem("admin");
      }
      
      if (isMounted) {
        setLoading(false);
      }
    };

    initAuth();

    // ✅ Cleanup function
    return () => {
      isMounted = false;
    };
  }, []);

  // ✅ Login
  const loginAdmin = async (token) => {
    localStorage.setItem("adminToken", token);
    const decoded = decodeToken(token);
    
    if (decoded) {
      const fullAdmin = await fetchAdminData(token);
      
      if (fullAdmin) {
        setIsAdminLoggedIn(true);
        setAdmin(fullAdmin);
        localStorage.setItem("admin", JSON.stringify(fullAdmin));
      }
    }
  };

  // ✅ Logout
  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    setIsAdminLoggedIn(false);
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAdminLoggedIn,
        admin,
        loginAdmin,
        logoutAdmin,
        loading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}
