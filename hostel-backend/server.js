import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js'; // DB Configuration

// Import all route modules
import studentRoutes from './src/routes/studentRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import hostelRoutes from './src/routes/hostelRoutes.js'; // Consolidated Admin/Hostel Management Routes

const app = express();

// --- Global Middleware ---
app.use(cors());
app.use(express.json());

// --- Database Connection ---
connectDB();

// --- Routing ---
// Student related actions (Registration, Login, Profile)
app.use('/api/student', studentRoutes);

// Admin Authentication (Registration, Login)
app.use('/api/admin', adminRoutes);

// Hostel Management Actions (Applications, Rooms, Fees, Admin Complaints)
app.use('/api/hostel', hostelRoutes); 


// --- Server Start ---
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));