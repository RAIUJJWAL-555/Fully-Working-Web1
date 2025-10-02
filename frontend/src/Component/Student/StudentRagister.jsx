import { useState } from 'react';
import { useNavigate } from 'react-router-dom';   // ✅ Hook for navigation
import Header from '../GeneralStudent/Header';
import { toast} from 'react-toastify';
// ❌ Error fix: CSS import removed. You should import this CSS globally (e.g., in main.jsx)
// import 'react-toastify/dist/ReactToastify.css';   

// Define the Base URL constant for API calls
const BASE_URL = 'http://localhost:5000/api'; 

const RegistrationForm = () => {
  const navigate = useNavigate();   // ✅ Hook for navigation

  const [formData, setFormData] = useState({
    name: '',
    applicationNumber: '',
    email: '',
    dob:'',
    year:'',
    branch:'',
    distance: '',
    rank: '',
    counselingRound: '',
    password:''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ URL UPDATED: Using the correct modular path /api/student/register
      const res = await fetch(`${BASE_URL}/student/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Registration Failed');

      // ⭐ SUCCESS
      toast.success('🎉 Registration successful! Please log in.', {
        position: 'top-center',
        autoClose: 2000,  // 2s
        onClose: () => navigate('/login'), // ✅ Redirect after toast closes
      });

    } catch (err) {
      toast.error(`❌ Registration failed: ${err.message}`, {
        position: 'top-center',
      });
    }
  };

  return (
    <>
      {/* ⚠️ NOTE: Header component needs to exist at the specified path or be replaced */}
      <Header /> 
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-center">Apply For Hostel</h2>

          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />

          <input type="text" name="applicationNumber" placeholder="Application Number" value={formData.applicationNumber} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />

          <input type="date" name="dob" placeholder="DDMMYYYY" value={formData.dob} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />

          <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />

          <input type="text" name="branch" placeholder="Branch" value={formData.branch} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />

          <input type="number" name="distance" placeholder="Distance from Home (in km)" value={formData.distance} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />

          <input type="number" name="rank" placeholder="Rank" value={formData.rank} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />

          <input type="text" name="counselingRound" placeholder="Counseling Round" value={formData.counselingRound} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />

          <input type="password" name="password" placeholder="Enter your password" value={formData.password} onChange={handleChange} className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" required />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            Apply
          </button>
        </form>
      </div>
    </>
  );
};

export default RegistrationForm;
