import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { authService } from "../services/authService";
import { jwtDecode } from "jwt-decode";

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  // Helper to decode JWT token
  const decodeToken = (token) => {
    try {
      return jwtDecode(token); // will return { id, email, isRegisteredBefore }
    } catch (err) {
      console.error("Invalid token:", err);
      return null;
    }
  };

  // Fetch full student data from backend
  const fetchStudentData = async (token) => {
    try {
      const response = await authService.getCurrentUser();
      return response.student;
    } catch (err) {
      console.error("Error fetching student data:", err);
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");
      const storedStudent = localStorage.getItem("student");
      if (token) {
        const decoded = decodeToken(token);
        if (decoded) {
          const fullStudent = await fetchStudentData(token);
          if (fullStudent) {
            setIsLoggedIn(true);
            setStudent(fullStudent);
            localStorage.setItem("student", JSON.stringify(fullStudent));
          }
          else if (storedStudent) {
            // fallback if backend fetch fails
            setIsLoggedIn(true);
            setStudent(JSON.parse(storedStudent));
          }
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (token, student) => {
    authService.storeUser(token, student);
    setIsLoggedIn(true);
    setStudent(student);
  };

  const logout = () => {
    authService.logout();
    setIsLoggedIn(false);
    setStudent(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,   
        student,
        setStudent,     
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}