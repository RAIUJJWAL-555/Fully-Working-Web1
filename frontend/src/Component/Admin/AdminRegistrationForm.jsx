import { useState } from 'react';

// Define the Base URL constant to avoid repeating the base path
const BASE_URL = 'http://localhost:5000/api'; 

// Placeholder for the Header component
const Header = () => (
  <header className="bg-gray-800 text-white p-4 shadow-md">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <h1 className="text-xl font-bold">Admin Portal</h1>
    </div>
  </header>
);

const AdminRegistrationForm = () => {
  // State to manage form data for registration
  const [formData, setFormData] = useState({
    adminId: '',
    name: '',
    email: '',
    role: '',
    password: ''
  });
  // State to hold the OTP entered by the user
  const [otp, setOtp] = useState('');
  // State to control the form display: 'register' or 'verify'
  const [step, setStep] = useState('register'); // 'register' | 'verify'
  // State for displaying success or error messages
  const [message, setMessage] = useState('');
  // State to hold the email used for registration, used during OTP verification
  const [registrationEmail, setRegistrationEmail] = useState('');
  // State for loading status
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handler for the first step: Register and send OTP
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);
    
    try {
      // ⭐ UPDATED URL: Changed from /register/admin to /api/admin/register
      const res = await fetch(`${BASE_URL}/admin/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    
      if (!res.ok) throw new Error(data.message || 'Registration failed');
      
      // If registration is successful (OTP sent), move to the verification step
      setRegistrationEmail(formData.email);
      setStep('verify');
      setMessage(`✅ OTP sent to ${formData.email}. Please check your inbox.`);

    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handler for the second step: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      const verificationData = {
        email: registrationEmail,
        otp: otp
      };

      // ⭐ UPDATED URL: Changed from /register/admin/verify-otp to /api/admin/register/verify-otp
      const res = await fetch(`${BASE_URL}/admin/register/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verificationData),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'OTP verification failed');

      // If verification is successful, clear form and show final success
      setFormData({ adminId: '', name: '', email: '', role: '', password: '' });
      setOtp('');
      setStep('register'); // Resetting state, perhaps navigate to login page later
      setMessage('🎉 Registration complete! Admin account is now verified.');

    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };


  const renderRegistrationForm = () => (
    <form onSubmit={handleRegister} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-4">
      <h2 className="text-2xl font-bold text-center text-gray-800">Admin Registration</h2>
      
      <input
        type="text"
        name="adminId"
        placeholder="Admin ID (Access Key)"
        value={formData.adminId}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <input
        type="text"
        name="role"
        placeholder="Role in Administration"
        value={formData.role}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Enter your password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Sending OTP...' : 'Register & Send OTP'}
      </button>
    </form>
  );

  const renderVerificationForm = () => (
    <form onSubmit={handleVerifyOTP} className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Verify OTP</h2>
      <p className="text-center text-sm text-gray-600">
        An OTP has been sent to **{registrationEmail}**. Please check your inbox and enter the 6-digit code below.
      </p>
      
      <input
        type="text"
        name="otp"
        placeholder="Enter 6-Digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full p-3 border text-center text-xl tracking-widest rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        maxLength="6"
        required
      />

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200 disabled:opacity-50"
        disabled={loading || otp.length !== 6}
      >
        {loading ? 'Verifying...' : 'Verify Account'}
      </button>
      
      <p className="text-center text-xs text-gray-500 cursor-pointer hover:underline" 
        onClick={() => { setStep('register'); setMessage('Please re-enter your details to resend OTP.'); }}>
        Go back to registration
      </p>
    </form>
  );


  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md">
          {step === 'register' ? renderRegistrationForm() : renderVerificationForm()}
          {message && (
            <p className={`text-center mt-4 p-3 rounded-lg text-sm font-medium ${
              message.startsWith('✅') || message.startsWith('🎉') ? 'bg-green-100 text-green-700' : 
              'bg-red-100 text-red-700'
            }`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminRegistrationForm;
