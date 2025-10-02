// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import bcrypt from 'bcryptjs';
// import nodemailer from 'nodemailer'; 
// import crypto from 'crypto'; 

// const app = express();
// app.use(cors());
// app.use(express.json());

// const ADMIN_ACCESS_KEY = 'GPG1101@gmail.com'; 

// // --- ⚙️ Nodemailer Configuration ---f
// const transporter = nodemailer.createTransport({
//     service: 'gmail', 
//     auth: {
//         user: 'ur069119@gmail.com', 
//         pass: 'kaosnlfkhrxoxqci' 
//     }
// });
// // ------------------------------------

// // ✅ MongoDB connection
// mongoose.connect('mongodb://127.0.0.1:27017/hostelDB', {})
// .then(() => console.log('✅ MongoDB Connected'))
// .catch(err => console.error('❌ Mongo Error:', err));

// // ✅ Schemas aur Models
// const studentSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   applicationNumber: { type: String, required: true, unique: true },
//   email: { type: String, required: true },
//   dob:{type: String, required:true},
//   year:{type: String, required:true},
//   branch:{type: String, required:true},
//   distance: { type: Number, required: true },
//   rank: { type: Number, required: true },
//   counselingRound: { type: String, required: true },
//   password: { type: String, required: true },
//   status: { type: String, required: true, default: 'pending' },
//   roomAllotted: { type: String, default: null }, // ⭐ NEW: Allotted Room Number
//   messFeePerMonth: { type: Number, default: 3500 }, // 👈 प्रति माह मेस फीस
//   monthsDue: { type: Number, default: 0 },     
//   feeStatus: { 
//     type: String, 
//     enum: ['Paid', 'Pending', 'Overdue'], 
//     default: 'Pending' 
//   },
//   feeAmountDue: { 
//     type: Number, 
//     default: 0 
//   },
//   feeDueDate: { 
//     type: Date, 
//     default: Date.now 
//   },
// });

// const adminSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true }, 
//   role: { type: String, required: true },
//   password: { type: String, required: true },
  
//   // ✅ FIELDS FOR OTP VERIFICATION AND LOGIN
//   isVerified: { type: Boolean, default: false }, 
//   otp: String, 
//   otpExpires: Date, 
// });

// // ✅ Room Schema (UPDATED)
// const roomSchema = new mongoose.Schema({
//     roomNumber: { type: String, required: true, unique: true }, 
//     capacity: { type: Number, required: true, min: 1 }, 
//     type: { type: String, enum: ['Single', 'Double', 'Triple', 'Quad'], default: 'Double' }, 
//     status: { type: String, enum: ['Available', 'Full', 'Maintenance'], default: 'Available' },
//     occupancyCount: { type: Number, default: 0, min: 0 } // ⭐ NEW: Current students in room
// });
// // ✅ Complaint Schema and Model
// const complaintSchema = new mongoose.Schema({
//     studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
//     studentName: { type: String, required: true },
//     applicationNumber: { type: String, required: true }, // For easy reference
//     roomAllotted: { type: String, default: 'N/A' },
    
//     category: { type: String, enum: ['Room Maintenance', 'Mess & Food', 'Washroom/Sanitation', 'Security & Safety', 'Other'], required: true },
//     subject: { type: String, required: true, trim: true, maxlength: 100 },
//     details: { type: String, required: true },
    
//     status: { type: String, enum: ['Pending', 'In Progress', 'Resolved'], default: 'Pending' }, // Admin tracks this
//     filedAt: { type: Date, default: Date.now },
// });




// const Student = mongoose.model('Student', studentSchema);
// const Admin = mongoose.model('Admin', adminSchema);
// const Room = mongoose.model('Room', roomSchema); 
// const Complaint = mongoose.model('Complaint', complaintSchema); 


// /**
//  * Helper function to send the OTP via email
//  */
// const sendOTP = async (email, otp, purpose) => {
//     const subject = purpose === 'LOGIN' 
//         ? 'Admin Login Verification OTP' 
//         : 'Admin Registration Verification OTP';
        
//     const title = purpose === 'LOGIN' 
//         ? 'OTP Verification for Admin Login' 
//         : 'OTP Verification for Admin Registration';

//     const mailOptions = {
//         from: 'Admin System <ur069119@gmail.com>', 
//         to: email,
//         subject: subject,
//         html: `
//             <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
//                 <h2 style="color: #333;">${title}</h2>
//                 <p>Please use the following One-Time Password (OTP) to complete your action:</p>
//                 <p style="font-size: 24px; font-weight: bold; color: #007bff; background-color: #f4f4f4; padding: 10px; border-radius: 4px; text-align: center;">${otp}</p>
//                 <p>This OTP is valid for 10 minutes.</p>
//                 <p style="margin-top: 30px; font-size: 12px; color: #777;">Regards, <br>The System Administrator</p>
//             </div>
//         `
//     };

//     try {
//         await transporter.sendMail(mailOptions);
//         console.log(`${purpose} OTP sent successfully to ${email}`);
//     } catch (error) {
//         console.error(`Error sending email to ${email}:`, error);
//         throw new Error('Failed to send verification email.');
//     }
// };

// // --- STUDENT ROUTES (Registration and Login remain unchanged) ---

// app.post('/register/student', async (req, res) => {
//   try {
//     const { name, applicationNumber, email,dob,year,branch, distance, rank, counselingRound, password, } = req.body;
//     const existing = await Student.findOne({ applicationNumber });
//     if (existing) {
//       return res.status(400).json({ message: 'Application number already exists!' });
//     }
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newStudent = new Student({
//       name, applicationNumber, email,dob, year,branch, distance, rank, counselingRound, password: hashedPassword,
//     });
//     await newStudent.save();
//     res.status(201).json({ message: 'Student registered successfully!' });
//   } catch (err) {
//     console.error('Student registration error:', err); 
//     res.status(500).json({ message: 'Error saving student', error: err.message });
//   }
  
// });

// app.post('/login/student', async (req, res) => {
//   try {
//     const { applicationNumber, password } = req.body;
//     const student = await Student.findOne({ applicationNumber });
//     if (!student) {
//       return res.status(400).json({ message: 'Invalid application number or password!' });
//     }
//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid application number or password!' });
//     }
//     const { password: pwd, ...studentData } = student.toObject();
//     res.status(200).json({ message: 'Login successful!', student: studentData });
//   } catch (err) {
//     console.error('Student login error:', err);
//     res.status(500).json({ message: 'Login failed', error: err.message });
//   }
// });
// // --- STUDENT DASHBOARD ROUTE ---

// // ✅ Endpoint to fetch a single student's profile by ID
// // server.js (Check this code carefully)
// app.get('/student/profile/:studentId', async (req, res) => {
//     try {
//         const { studentId } = req.params;
        
//         // ⭐ CRITICAL CHECK 1: Ensure you are using findById
//         const student = await Student.findById(studentId); 

//         if (!student) {
//             // ⭐ This is the line generating your current error response
//             return res.status(404).json({ message: 'Student profile not found!' }); 
//         }
        
//         const { password, ...studentData } = student.toObject();
//         res.status(200).json(studentData);

//     } catch (err) {
//         // If the ID format is totally wrong (e.g., too short), Mongoose might throw an error here, 
//         // leading to a 500 error instead of the 404 you're currently seeing.
//         console.error('Error fetching student profile by ID:', err); 
//         res.status(500).json({ message: 'Failed to fetch profile data.', error: err.message });
//     }
// });
// // --- ADMIN REGISTRATION ROUTES ---

// // ✅ Admin Registration (Step 1: Save unverified user & Send OTP)
// app.post('/register/admin', async (req, res) => {
//     try {
//         const { adminId, name, email, role, password } = req.body;
//         if (adminId !== ADMIN_ACCESS_KEY) {
//             return res.status(403).json({ message: 'Unauthorized. Invalid Admin Access Key.' });
//         }
//         let admin = await Admin.findOne({ email });
//         if (admin && admin.isVerified) {
//              return res.status(400).json({ message: 'Email already registered and verified!' });
//         }

//         const otpCode = crypto.randomInt(100000, 999999).toString(); 
//         const otpExpires = new Date(Date.now() + 10 * 60000); 
//         const hashedPassword = await bcrypt.hash(password, 10);

//         if (admin) {
//             admin.name = name;
//             admin.role = role;
//             admin.password = hashedPassword;
//             admin.otp = otpCode;
//             admin.otpExpires = otpExpires;
//             admin.isVerified = false; 
//             await admin.save();
//         } else {
//             admin = new Admin({
//                 name, email, role, password: hashedPassword, isVerified: false, otp: otpCode, otpExpires: otpExpires,
//             });
//             await admin.save();
//         }
        
//         await sendOTP(email, otpCode, 'REGISTER');

//         res.status(202).json({ 
//             message: 'Registration data saved, OTP sent for verification.',
//             email: email
//         });

//     } catch (err) {
//         console.error('Admin registration error:', err);
//         res.status(500).json({ 
//             message: err.message || 'Error saving Admin or sending OTP', 
//             error: err.message 
//         });
//     }
// });

// // ✅ Endpoint for Registration OTP Verification (Step 2)
// app.post('/register/admin/verify-otp', async (req, res) => {
//     try {
//         const { email, otp } = req.body;
//         const admin = await Admin.findOne({ email });

//         if (!admin || admin.isVerified || admin.otp !== otp || admin.otpExpires < new Date()) {
//             return res.status(400).json({ message: 'Invalid or expired OTP. Please try again.' });
//         }

//         admin.isVerified = true;
//         admin.otp = undefined;
//         admin.otpExpires = undefined;
//         await admin.save();

//         res.status(200).json({ message: 'Admin account successfully verified and activated!' });

//     } catch (err) {
//         console.error('OTP verification error:', err);
//         res.status(500).json({ message: 'Error verifying OTP', error: err.message });
//     }
// });


// // --- ADMIN LOGIN ROUTES (Password and OTP login) ---

// // ✅ Endpoint to send OTP for Login
// app.post('/login/admin/send-otp', async (req, res) => {
//     try {
//         const { email } = req.body;
//         const admin = await Admin.findOne({ email });
//         if (!admin || !admin.isVerified) {
//             return res.status(400).json({ message: 'Invalid email or unverified account.' });
//         }

//         const otpCode = crypto.randomInt(100000, 999999).toString(); 
//         const otpExpires = new Date(Date.now() + 5 * 60000); 

//         admin.otp = otpCode;
//         admin.otpExpires = otpExpires;
//         await admin.save();

//         await sendOTP(email, otpCode, 'LOGIN');
//         res.status(200).json({ message: 'Login OTP sent successfully.' });

//     } catch (err) {
//         console.error('Send Login OTP error:', err);
//         res.status(500).json({ message: 'Failed to send login OTP.', error: err.message });
//     }
// });

// // ✅ Endpoint to verify OTP and complete Login
// app.post('/login/admin/verify-otp-login', async (req, res) => {
//     try {
//         const { email, otp } = req.body;
//         const admin = await Admin.findOne({ email });

//         if (!admin || !admin.isVerified) {
//             return res.status(400).json({ message: 'Invalid email or unverified account.' });
//         }

//         if (admin.otp !== otp || !admin.otp || admin.otpExpires < new Date()) {
//             if (admin.otpExpires < new Date()) {
//                  admin.otp = undefined;
//                  admin.otpExpires = undefined;
//                  await admin.save();
//             }
//             return res.status(400).json({ message: 'Invalid or expired OTP.' });
//         }

//         admin.otp = undefined;
//         admin.otpExpires = undefined;
//         await admin.save();

//         const { password, otp: otpData, otpExpires: expiryData, ...adminData } = admin.toObject(); 
//         res.status(200).json({ message: 'Login successful!', admin: adminData });

//     } catch (err) {
//         console.error('Verify Login OTP error:', err);
//         res.status(500).json({ message: 'OTP login failed', error: err.message });
//     }
// });

// // ✅ Admin Login (Password-based Login)
// app.post('/login/admin', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const admin = await Admin.findOne({ email });
//     if (!admin) {
//       return res.status(400).json({ message: 'Invalid email or password' });
//     }
    
//     if (!admin.isVerified) {
//         return res.status(403).json({ message: 'Account not verified. Please check your email for the OTP.' });
//     }

//     const isMatch = await bcrypt.compare(password, admin.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Invalid email or password!' });
//     }

//     admin.otp = undefined;
//     admin.otpExpires = undefined;
//     await admin.save();

//     const { password: pwd, otp, otpExpires, ...adminData } = admin.toObject(); 
//     res.status(200).json({ message: 'Login successful!', admin: adminData });
//   } catch (err) {
//     console.error('Admin login error:', err);
//     res.status(500).json({ message: 'Login failed', error: err.message });
//   }
// });


// // --- STUDENT APPLICATION ROUTES ---

// // ✅ Endpoint to fetch all student applications
// app.get('/applications', async (req, res) => {
//   try {
//     const applications = await Student.find({});
//     res.status(200).json(applications);
//   } catch (err) {
//     console.error('Error fetching applications:', err);
//     res.status(500).json({ message: 'Error fetching applications', error: err.message });
//   }
// });
// app.get('/applications-student', async (req, res) => {
//     try {
//       const applications = await Student.find({});
//       res.status(200).json(applications);
//     } catch (err) {
//       console.error('Error fetching applications:', err);
//       res.status(500).json({ message: 'Error fetching applications', error: err.message });
//     }
//   });


// // ✅ Endpoint to update application status (Approve/Reject) (UPDATED with Room Cleanup)
// app.patch('/applications/:applicationNumber', async (req, res) => {
//     try {
//         const { applicationNumber } = req.params;
//         const { status } = req.body;

//         if (!['approved', 'rejected'].includes(status)) {
//             return res.status(400).json({ message: 'Invalid status provided.' });
//         }
        
//         // Fetch the student first to check their current room allotment before updating
//         const studentToUpdate = await Student.findOne({ applicationNumber });
//         if (!studentToUpdate) {
//             return res.status(404).json({ message: 'Application not found!' });
//         }

//         const updateData = { status: status };
//         let roomToVacate = null;
        
//         // Check if student is being REJECTED AND had a room allotted
//         if (status === 'rejected' && studentToUpdate.roomAllotted) {
//             roomToVacate = studentToUpdate.roomAllotted;
//             // Clear room allotment on student document
//             updateData.roomAllotted = null; 
//         }

//         const updatedApplication = await Student.findOneAndUpdate(
//             { applicationNumber: applicationNumber },
//             { $set: updateData },
//             { new: true, runValidators: true }
//         );

//         // --- Room Cleanup Logic: Decrement room occupancy count ---
//         if (roomToVacate) {
//             // Decrement room occupancy and set status back to 'Available'
//             await Room.updateOne(
//                 { roomNumber: roomToVacate, occupancyCount: { $gt: 0 } },
//                 { 
//                     $inc: { occupancyCount: -1 }, 
//                     $set: { status: 'Available' } 
//                 }
//             );
//         }
//         // ---------------------------------------------------------

//         res.status(200).json({ message: `Application ${status} successfully!`, application: updatedApplication });
//     } catch (err) {
//         console.error('Error updating application status:', err);
//         res.status(500).json({ message: 'Error updating application status', error: err.message });
//     }
// });

// // ⭐ Endpoint to Allot Room to an Approved Student (UPDATED with Capacity Logic)
// app.patch('/applications/:applicationNumber/allot-room', async (req, res) => {
//     try {
//         const { applicationNumber } = req.params;
//         const { roomNumber } = req.body;

//         if (!roomNumber) {
//             return res.status(400).json({ message: 'Room number is required for allotment.' });
//         }

//         const student = await Student.findOne({ applicationNumber });

//         if (!student || student.status !== 'approved' || student.roomAllotted) {
//             const message = !student 
//                 ? 'Student application not found!' 
//                 : student.status !== 'approved' 
//                     ? 'Only approved applications can be allotted a room.' 
//                     : `Student already allotted room ${student.roomAllotted}. Unallot first.`;
//             return res.status(400).json({ message: message });
//         }
        
//         // Find the room to check its capacity and status
//         const room = await Room.findOne({ roomNumber });
//         if (!room || room.status === 'Maintenance') {
//             return res.status(400).json({ message: 'The selected room is unavailable or does not exist.' });
//         }
        
//         // Check occupancy BEFORE allotment
//         if (room.occupancyCount >= room.capacity) {
//             return res.status(400).json({ message: `Room ${roomNumber} is already full.` });
//         }


//         // Perform Allotment on Student
//         const updatedApplication = await Student.findOneAndUpdate(
//             { applicationNumber: applicationNumber },
//             { $set: { roomAllotted: roomNumber } },
//             { new: true }
//         );

//         if (!updatedApplication) {
//             return res.status(404).json({ message: 'Student application not found during update!' });
//         }
        
//         // --- Update Room Occupancy ---
//         const newOccupancyCount = room.occupancyCount + 1;
//         let newRoomStatus = room.status;

//         if (newOccupancyCount >= room.capacity) {
//             newRoomStatus = 'Full';
//         } else if (room.status !== 'Maintenance') {
//             newRoomStatus = 'Available'; // Ensure it remains Available if not full
//         }
        
//         await Room.updateOne(
//             { roomNumber: roomNumber },
//             { 
//                 $inc: { occupancyCount: 1 }, // Increment counter
//                 $set: { status: newRoomStatus } // Set new status
//             }
//         );
//         // ----------------------------

//         res.status(200).json({ 
//             message: `Room ${roomNumber} allotted successfully to ${applicationNumber}!`, 
//             application: updatedApplication 
//         });

//     } catch (err) {
//         console.error('Error during room allotment:', err);
//         res.status(500).json({ message: 'Room allotment failed.', error: err.message });
//     }
// });


// // --- ROOM INVENTORY ROUTES ---

// // ✅ 1. POST /rooms: Add a new room
// app.post('/rooms', async (req, res) => {
//     try {
//         const { roomNumber, capacity, type, status } = req.body;
//         const existingRoom = await Room.findOne({ roomNumber });
//         if (existingRoom) {
//             return res.status(400).json({ message: 'Room number already exists.' });
//         }
//         const newRoom = new Room({ roomNumber, capacity, type, status, occupancyCount: 0 }); // Initialize count
//         await newRoom.save();
//         res.status(201).json({ message: 'Room added successfully!', room: newRoom });
//     } catch (err) {
//         console.error('Error adding room:', err);
//         res.status(500).json({ message: 'Failed to add room.', error: err.message });
//     }
// });

// // ✅ 2. GET /rooms: Get all rooms
// app.get('/rooms', async (req, res) => {
//     try {
//         const rooms = await Room.find({});
//         res.status(200).json(rooms);
//     } catch (err) {
//         console.error('Error fetching rooms:', err);
//         res.status(500).json({ message: 'Failed to fetch rooms.', error: err.message });
//     }
// });

// // ✅ 3. PATCH /rooms/:id: Update room details
// app.patch('/rooms/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const updates = req.body;
//         // Do not allow direct update of occupancyCount, only through allotment/unallotment
//         delete updates.occupancyCount; 
        
//         const updatedRoom = await Room.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
//         if (!updatedRoom) {
//             return res.status(404).json({ message: 'Room not found!' });
//         }
//         res.status(200).json({ message: 'Room updated successfully!', room: updatedRoom });
//     } catch (err) {
//         console.error('Error updating room:', err);
//         res.status(500).json({ message: 'Failed to update room.', error: err.message });
//     }
// });

// // ✅ 4. DELETE /rooms/:id: Delete a room
// app.delete('/rooms/:id', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const room = await Room.findById(id);
        
//         if (!room) {
//             return res.status(404).json({ message: 'Room not found!' });
//         }

//         // ⭐ Safety Check: Cannot delete an occupied room
//         if (room.occupancyCount > 0) {
//             return res.status(400).json({ message: `Cannot delete room ${room.roomNumber}. It is currently occupied by ${room.occupancyCount} students.` });
//         }
        
//         await Room.findByIdAndDelete(id);

//         res.status(200).json({ message: 'Room deleted successfully!' });
//     } catch (err) {
//         console.error('Error deleting room:', err);
//         res.status(500).json({ message: 'Failed to delete room.', error: err.message });
//     }
// });
// // --- FEE MANAGEMENT ROUTES (Admin Control) ---

// // ✅ 1. GET /fees: Fetch all students' fee status (Admin View)
// app.get('/fees', async (req, res) => {
//     try {
//         // Fetch only necessary fields for a fee overview
//         const feeData = await Student.find({}, 'name applicationNumber roomAllotted feeStatus feeAmountDue feeDueDate');
//         res.status(200).json(feeData);
//     } catch (err) {
//         console.error('Error fetching fee data:', err);
//         res.status(500).json({ message: 'Failed to fetch fee data.', error: err.message });
//     }
// });

// // ✅ 2. PATCH /fees/:applicationNumber: Update fee status and amount
// // ✅ 2. PATCH /fees/:applicationNumber: Update fee status and monthsDue
// app.patch('/fees/:applicationNumber', async (req, res) => {
//     try {
//         const { applicationNumber } = req.params;
//         const updates = req.body;
        
//         // 1. Student का current data fetch करें
//         const student = await Student.findOne({ applicationNumber: applicationNumber });
//         if (!student) {
//             return res.status(404).json({ message: 'Student not found!' });
//         }

//         // 2. updates को apply करें
//         let feeAmountToSet = updates.feeAmountDue;
        
//         // Check if monthsDue is being updated
//         if (updates.monthsDue !== undefined) {
//             const newMonthsDue = parseInt(updates.monthsDue);
//             // Calculate the new feeAmountDue based on monthsDue * fixed rate
//             feeAmountToSet = newMonthsDue * student.messFeePerMonth; 
//             updates.feeAmountDue = feeAmountToSet; // Update the fee amount in the updates object
//         } 
        
//         // Final update query
//         const updatedStudent = await Student.findOneAndUpdate(
//             { applicationNumber: applicationNumber },
//             { $set: updates },
//             { new: true, runValidators: true }
//         );

//         res.status(200).json({ 
//             message: 'Fee details updated successfully!', 
//             student: updatedStudent 
//         });

//     } catch (err) {
//         console.error('Error updating fee status:', err);
//         res.status(500).json({ message: 'Failed to update fee details.', error: err.message });
//     }
// });
// // --- COMPLAINT MANAGEMENT ROUTES (Student Side) ---


// // ✅ Endpoint to fetch all complaints (Admin View)
// // --- COMPLAINT MANAGEMENT ROUTES (Student Side) ---

// // ✅ 1. POST /complaints: Submit a new complaint
// app.post('/complaints', async (req, res) => {
//     try {
//         // Required fields from the student form
//         const { studentId, studentName, applicationNumber, roomAllotted, category, subject, details } = req.body;
        
//         if (!studentId || !studentName || !category || !subject || !details) {
//             return res.status(400).json({ message: 'Missing required complaint fields.' });
//         }

//         const newComplaint = new Complaint({
//             studentId, 
//             studentName, 
//             applicationNumber, 
//             roomAllotted, 
//             category, 
//             subject, 
//             details,
//             // Status defaults to 'Pending'
//         });

//         await newComplaint.save();

//         res.status(201).json({ 
//             message: 'Complaint filed successfully!', 
//             complaint: newComplaint 
//         });

//     } catch (err) {
//         console.error('Error submitting complaint:', err);
//         res.status(500).json({ message: 'Failed to submit complaint.', error: err.message });
//     }
// });



// // --- COMPLAINT MANAGEMENT ROUTES (Admin Side) ---

// // ✅ 2. GET /complaints: Fetch all complaints for Admin view
// app.get('/complaints', async (req, res) => {
//     try {
//         // Fetches all complaints, newest first
//         const complaints = await Complaint.find({}).sort({ filedAt: -1 }); 
//         res.status(200).json(complaints);
//     } catch (err) {
//         console.error('Error fetching complaints:', err);
//         res.status(500).json({ message: 'Failed to fetch complaints.', error: err.message });
//     }
// });

// // ✅ 3. PATCH /complaints/:id/status: Update the status of a specific complaint
// app.patch('/complaints/:id/status', async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { status } = req.body; // Expecting status: 'In Progress' or 'Resolved'

//         // Input validation: Ensure the new status is valid
//         if (!['Pending', 'In Progress', 'Resolved'].includes(status)) {
//             return res.status(400).json({ message: 'Invalid status value provided.' });
//         }

//         const updatedComplaint = await Complaint.findByIdAndUpdate(
//             id,
//             { $set: { status: status } },
//             { new: true, runValidators: true } // Returns the updated document
//         );

//         if (!updatedComplaint) {
//             return res.status(404).json({ message: 'Complaint not found.' });
//         }

//         res.status(200).json({ 
//             message: `Complaint ${id} status updated to ${status}.`,
//             complaint: updatedComplaint 
//         });

//     } catch (err) {
//         console.error('Error updating complaint status:', err);
//         res.status(500).json({ message: 'Failed to update complaint status.', error: err.message });
//     }
// });

// app.listen(5000, () => console.log('🚀 Server running on http://localhost:5000'));
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