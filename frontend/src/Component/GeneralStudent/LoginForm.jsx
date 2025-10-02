import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

// Define the Base URL constant for API calls
const BASE_URL = 'http://localhost:5000/api'; 

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentIdentifier: '',
    adminIdentifier: '', // Used for Admin Email/ID
    password: '',        // Used only for Password login now
    userType: 'student', // default: student
  });

  // State to manage Admin login type: 'password' or 'otp'
  const [adminLoginMethod, setAdminLoginMethod] = useState('password');
  // State to manage OTP sending stage
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // ⭐ NEW STATE: Separate state for OTP value
  const [otpValue, setOtpValue] = useState(''); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdminMethodChange = (e) => {
    setAdminLoginMethod(e.target.value);
    setOtpSent(false); // Reset OTP stage when method changes
    setFormData((prev) => ({ ...prev, password: '' })); // Clear password field
    setOtpValue(''); // ⭐ Clear OTP value when switching method
  };
  
  // Handler for sending OTP for login
  const handleSendOTP = async (email) => {
    setLoading(true);
    try {
      // ✅ URL UPDATED: Using /api/admin/login/send-otp
      const res = await fetch(`${BASE_URL}/admin/login/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to send OTP!');

      toast.info('OTP has been sent to your email. Please check your inbox.', { position: 'top-center' });
      setOtpSent(true); // Move to OTP input stage
      setOtpValue(''); // ⭐ Ensure OTP input is clear before user types
      
    } catch (err) {
      toast.error(`OTP Error: ${err.message}`, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    let loginPath = '';
    let payload = {};

    // --- Student Login Logic ---
    if (formData.userType === 'student') {
      // ✅ URL UPDATED: Using /api/student/login
      loginPath = '/student/login'; 
      payload = {
        applicationNumber: formData.studentIdentifier,
        password: formData.password,
      };
    }
    // --- Admin Login Logic ---
    else if (formData.userType === 'admin') {
      const adminEmail = formData.adminIdentifier;
      
      // If method is OTP and OTP is not yet sent (STAGE 1: SEND OTP)
      if (adminLoginMethod === 'otp' && !otpSent) {
          // Send OTP and stop the form submission here, wait for the next submit button click
          await handleSendOTP(adminEmail);
          setLoading(false);
          return; 
      }
      
      // Admin Login with Password
      if (adminLoginMethod === 'password') {
        // ✅ URL UPDATED: Using /api/admin/login
        loginPath = '/admin/login'; 
        payload = { email: adminEmail, password: formData.password };
      } 
      // Admin Login with OTP Verification (STAGE 2: VERIFY OTP)
      else if (adminLoginMethod === 'otp' && otpSent) {
        // ✅ URL UPDATED: Using /api/admin/login/verify-otp-login
        loginPath = '/admin/login/verify-otp-login';
        payload = { email: adminEmail, otp: otpValue }; 
      }
    }

    // --- API Call and Navigation ---
    try {
      // Prevent API call if waiting for OTP send or if student/password login path is not set
      if (!loginPath) {
        setLoading(false);
        return; 
      }
      
      // Using BASE_URL for all final fetches now
      const res = await fetch(`${BASE_URL}${loginPath}`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed!');

      // Successful Login
      if (formData.userType === 'admin') {
        localStorage.setItem('adminData', JSON.stringify(data.admin));
        toast.success('Admin login successful!', { position: 'top-center' });
        setOtpSent(false); // Reset OTP state after successful login
        setOtpValue(''); // ⭐ Clear OTP value on success
        navigate('/admin/dashboard');
      } else {
        localStorage.setItem('studentData', JSON.stringify(data.student));
        toast.success('Student login successful!', { position: 'top-center' });
        navigate('/student/dashboard');
      }
    } catch (err) {
      toast.error(`Login failed: ${err.message}`, { position: 'top-center' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Hostel Login</h2>

        {/* Select User Type */}
        <select
          name="userType"
          value={formData.userType}
          onChange={(e) => {
            handleChange(e);
            setAdminLoginMethod('password'); // Reset method when switching to/from student
            setOtpSent(false); 
          }}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="student">Student Login</option>
          <option value="admin">Admin Login</option>
        </select>

        {/* Student field */}
        {formData.userType === 'student' && (
          <input
            type="text"
            name="studentIdentifier"
            placeholder="Application Number"
            value={formData.studentIdentifier}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        )}

        {/* Admin fields (Email and Method Selector) */}
        {formData.userType === 'admin' && (
          <>
            <input
              type="email"
              name="adminIdentifier"
              placeholder="Admin Email"
              value={formData.adminIdentifier}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            
            {/* Admin Login Method Selection */}
            <div className="flex justify-around items-center bg-gray-50 p-2 rounded-lg">
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                        type="radio" 
                        value="password" 
                        checked={adminLoginMethod === 'password'} 
                        onChange={handleAdminMethodChange} 
                        className="form-radio text-blue-600"
                    />
                    <span>Login with Password</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                        type="radio" 
                        value="otp" 
                        checked={adminLoginMethod === 'otp'} 
                        onChange={handleAdminMethodChange} 
                        className="form-radio text-blue-600"
                    />
                    <span>Login with OTP</span>
                </label>
            </div>
          </>
        )}

        {/* ⭐ FIX: Password Input field moved out and its visibility condition updated */}
        {/* This input shows for: 1) Student Login OR 2) Admin Password Login */}
        {(formData.userType === 'student' || adminLoginMethod === 'password') && (
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        )}
        
        {/* OTP Input (Only visible after OTP is sent for Admin) */}
        {formData.userType === 'admin' && adminLoginMethod === 'otp' && otpSent && (
          <input
            type="text"
            name="otpValue"
            placeholder="Enter 6-Digit OTP"
            value={otpValue}
            onChange={(e) => setOtpValue(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            maxLength={6}
            required
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
          disabled={loading || (formData.userType === 'admin' && adminLoginMethod === 'otp' && otpSent && otpValue.length !== 6)}
        >
          {loading 
            ? 'Loading...' 
            : formData.userType === 'admin' && adminLoginMethod === 'otp' && !otpSent
            ? 'Send OTP'
            : 'Login'
          }
        </button>
        
        {/* Reset OTP stage button */}
        {formData.userType === 'admin' && adminLoginMethod === 'otp' && otpSent && (
            <button
                type="button"
                onClick={() => { setOtpSent(false); setFormData((prev) => ({ ...prev, password: '' })); setOtpValue(''); }}
                className="w-full text-sm text-red-500 py-2 rounded-lg hover:text-red-700 transition duration-200"
            >
                Cancel / Change Email
            </button>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
