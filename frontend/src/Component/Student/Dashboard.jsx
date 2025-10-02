import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


import Sidebar from "../Student/Sidebar";
import Header from "../Student/Header";
import StatCard from "../Student/StatCard";
import MainCard from "../Student/MainCard";
import ProfileCard from "../Student/ProfileCard";
import NoticeList from "../Student/NoticeList";
import ComplaintBox from "../Student/ComplaintBox"; 
// Note: Fee submission/status change component (e.g., FeePaymentForm) will need to be imported here later

// Define the Base URL constant for API calls
const BASE_URL = 'http://localhost:5000/api'; 

// Framer Motion Variants (Unchanged)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};


const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState("dashboard"); 
  const [error, setError] = useState(null);
  
  // ⭐ नया स्टेट: डेटा रीफ़्रेश को मजबूर करने के लिए
  const [refreshKey, setRefreshKey] = useState(0); 

  const navigate = useNavigate();

  // ⭐ नया फ़ंक्शन: इस फ़ंक्शन को चाइल्ड कंपोनेंट्स (जैसे FeePaymentForm) में पास किया जा सकता है
  // ताकि फीस अपडेट होने के बाद मुख्य डैशबोर्ड डेटा रीफ़्रेश हो जाए।
  const handleRefreshData = useCallback(() => {
    setRefreshKey(prevKey => prevKey + 1);
    toast.info("Refreshing dashboard data...");
  }, []);


  // --- Data Fetching Logic (UPDATED URL) ---
  const fetchStudentProfile = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      // ✅ URL UPDATED: Using /api/student/profile/:id
      const res = await fetch(`${BASE_URL}/student/profile/${id}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch student profile.");
      }

      setStudent(data);
      toast.success("Profile data loaded/refreshed successfully!");
    } catch (err) {
      setError(err.message);
      toast.error(`Error loading profile: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }, []); // useCallback dependency array is empty

  
  useEffect(() => {
    const studentDataString = localStorage.getItem("studentData");

    if (!studentDataString) {
      toast.error("Please log in to access the dashboard.");
      // ⚠️ FIX: /login/student navigate path is incorrect. It should be just '/login' or handle routing correctly. 
      // Assuming routing logic handles this, keeping original path convention for now.
      navigate("/login/student"); 
      return;
    }

    let studentId;
    try {
      const storedStudentData = JSON.parse(studentDataString);
      studentId = storedStudentData._id;

      if (!studentId) {
        throw new Error(
          "Student ID (_id) not found in session. Please clear storage and log in again."
        );
      }
    } catch (e) {
      console.error("Local Storage Error:", e);
      setError("Session data is corrupt. Please log in again.");
      setLoading(false);
      return;
    }
    
    // ⭐ अब fetchStudentProfile को refreshKey के बदलने पर भी कॉल करें
    fetchStudentProfile(studentId);
    
  }, [navigate, fetchStudentProfile, refreshKey]); // 👈 UPDATED dependency array


  // --- Helper Function for Logout (Unchanged) ---
  const handleLogout = () => {
    localStorage.removeItem("studentData");
    toast.info("You have been logged out.");
    navigate("/login/student");
  };

  // --- Loading and Error Screens (Unchanged) ---
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <p className="text-2xl text-indigo-600">Loading Dashboard...</p>
      </div>
    );
  }

  if (error || !student) {
    // ... (Error JSX unchanged) ...
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-8">
        <h1 className="text-3xl text-red-600 mb-4 font-bold">
          Error: {error || "Profile data unavailable"}
        </h1>
        <p className="text-gray-600 mb-6">
          Could not load student data. Please ensure the backend is running.
        </p>
        <button
          onClick={handleLogout}
          className="bg-indigo-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-600 transition"
        >
          Return to Login
        </button>
      </div>
    );
  }

  // --- Data Destructuring (Unchanged) ---
  const {
    name,
    roomAllotted,
    status,
    feeStatus,
    feeAmountDue,
    feeDueDate,
    ...profileData
  } = student;

  // --- Render Logic (Unchanged) ---
  return (
    <div className="min-h-screen bg-gray-50 grid grid-cols-[280px_1fr] transition-all duration-300">
      <Sidebar
        studentName={name}
        currentView={activeView}
        onNavigate={setActiveView}
        onLogout={handleLogout}
      />
      

      <main className="p-8">
        <Header
          studentName={name}
          roomNumber={roomAllotted || "N/A"}
          studentPhotoUrl="/path/to/alex.jpg"
        />

        <AnimatePresence mode="wait">
          
          {/* View 1: Default Dashboard (Home) */}
          {activeView === "dashboard" && (
            <motion.div
              key="dashboard-home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Key Hostel Stats Section (Unchanged) */}
              <motion.section
                className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <StatCard
                  title="Application Status"
                  value={status.toUpperCase()}
                  icon={
                    status === "approved"
                      ? "✅"
                      : status === "rejected"
                      ? "❌"
                      : "⏳"
                  }
                  color={
                    status === "approved"
                      ? "green"
                      : status === "rejected"
                      ? "red"
                      : "yellow"
                  }
                  variants={itemVariants}
                />
                <StatCard
                  title="Room Allotment"
                  value={roomAllotted || "Not Allotted"}
                  icon="🏠"
                  color={roomAllotted ? "blue" : "gray"}
                  variants={itemVariants}
                />
                <StatCard
                  title="Hostel Fees Status"
                  value={`₹ ${feeAmountDue} ${
                    feeStatus === "Pending" || feeStatus === "Overdue"
                      ? "DUE"
                      : "PAID"
                  }`}
                  icon="💰"
                  color={feeStatus === "Paid" ? "green" : "red"} 
                  variants={itemVariants}
                />
              </motion.section>

              {/* Main Content Grid: Notices and Profile (Unchanged) */}
              <motion.div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <MainCard
                  title="Student Profile"
                  variants={itemVariants}
                  className="lg:col-span-1"
                >
                  <ProfileCard studentData={student} />
                </MainCard>
                <MainCard
                  title="Hostel Notices & Updates"
                  variants={itemVariants}
                  className="lg:col-span-2"
                >
                  <NoticeList />
                </MainCard>
              </motion.div>
            </motion.div>
          )}

          {/* View 2: Complaint Box */}
          {activeView === "complaint" && (
            <motion.div
              key="complaint-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <ComplaintBox 
                studentData={student} 
                // ⭐ Optional: यदि शिकायत सबमिट करने के बाद भी डेटा रीफ़्रेश करना हो
                onComplaintSubmitted={handleRefreshData} 
              />
            </motion.div>
          )}
          
          {/* ⭐ Future View for Fees - Example of how to use handleRefreshData */}
          {/* {activeView === "fees" && (
            <motion.div>
                <FeePaymentForm 
                    studentData={student} 
                    onPaymentSuccess={handleRefreshData} // फीस जमा होने पर डेटा रीफ़्रेश होगा
                />
            </motion.div>
          )} */}

          {/* Add conditional rendering for 'grades' and 'settings' here later */}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
