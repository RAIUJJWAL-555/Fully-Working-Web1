// File: src/Student/Sidebar.jsx (Now Responsive)
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // Import X icon for mobile close button

const navItems = [
    { name: 'Home', icon: '🏠', view: 'dashboard' },
    { name: 'Complaint box', icon: '📮', view: 'complaint' },
    { name: 'Grades', icon: '📈', view: 'grades' },
    { name: 'Settings', icon: '⚙️', view: 'settings' },
];

// ⭐ NEW PROPS: isMobileOpen and onClose for responsiveness
const Sidebar = ({ studentName, currentView, onNavigate, onLogout, isMobileOpen, onClose }) => {
    
    const displayName = studentName || 'Guest';

    // FRAMER MOTION VARIANT for responsive entry/exit
    const sidebarVariants = {
        // Desktop: Always visible
        desktop: { x: 0, opacity: 1 }, 
        // Mobile hidden state
        hidden: { x: -256, opacity: 1 }, 
        // Mobile visible state
        visible: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.3 } }
    };

    return (
        <>
            <motion.aside 
                // ⭐ RESPONSIVE CLASSES:
                className={`
                    fixed top-0 left-0 h-screen w-64 p-6 flex flex-col justify-between 
                    bg-gray-800 text-white shadow-2xl z-50 transition-transform duration-300
                    
                    // DESKTOP: Show block, default position
                    lg:block lg:translate-x-0 
                    
                    // MOBILE: Hide by default, controlled by state
                    ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} 
                `}
                variants={sidebarVariants}
                // Determine initial and animate based on screen size/state
                initial={isMobileOpen ? "hidden" : "desktop"} 
                animate={isMobileOpen ? "visible" : "desktop"}
                // The desktop class lg:translate-x-0 ensures it stays put on large screens
            >
                {/* Mobile Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-400 hover:text-white lg:hidden"
                    aria-label="Close Menu"
                >
                    <X size={24} />
                </button>
                
                {/* Logo/Title Section */}
                <div className="text-3xl font-extrabold text-indigo-400 mb-10 border-b border-gray-700 pb-4">
                    Hostel<span className="text-indigo-200">Portal</span>
                    <p className="text-xs font-light text-gray-500 mt-1">Student Dashboard</p>
                </div>
                
                {/* Navigation Section */}
                <nav className="space-y-3 flex-grow">
                    {navItems.map((item, index) => (
                        <motion.div
                            key={index}
                            onClick={() => { onNavigate(item.view); onClose(); }} // Close after navigating
                            className={`p-3 rounded-xl flex items-center space-x-3 cursor-pointer select-none font-semibold ${
                                item.view === currentView
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' 
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200' 
                            }`}
                            whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 20 } }}
                        >
                            <span className="text-xl">{item.icon}</span> 
                            <span className="text-base">{item.name}</span>
                        </motion.div>
                    ))}
                </nav>

                {/* User Info & Logout Block */}
                <div className="mt-auto pt-6 border-t border-gray-700">
                    <div className="mb-4 p-3 bg-gray-700 rounded-lg">
                        <p className="text-xs text-gray-400 mb-1">Logged in as:</p>
                        <span className='font-bold text-gray-50 text-base'>{displayName}</span>
                    </div>
                    
                    <motion.button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center p-3 text-red-400 bg-gray-700 rounded-lg hover:bg-red-500 hover:text-white transition-colors space-x-2 font-medium"
                        whileHover={{ scale: 1.02 }} 
                        whileTap={{ scale: 0.98 }}
                    >
                        <span className="text-xl">🚪</span>
                        <span>Logout</span>
                    </motion.button>
                </div>
            </motion.aside>

            {/* Mobile Backdrop Overlay */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                        onClick={onClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Sidebar;