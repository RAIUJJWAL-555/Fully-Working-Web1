import React from 'react';
import Header from '../Component/GeneralStudent/Header';

const staffMembers = [
  {
    name: "Shivkumar Sir",
    position: "Warden(Boys Hostel)",
    phone: "+91 98765 43210",
    email: "rk.sharma@hostel.edu",
    image: "https://placehold.co/150x150/E0E7FF/4338CA?text=SS",
  },
  {
    name: "Smt. Puja Mam",
    position: "Warden (Girls Hostel)",
    phone: "+91 98765 43211",
    email: "s.devi@hostel.edu",
    image: "https://placehold.co/150x150/FBCFE8/C026D3?text=SP",
  },
  {
    name: "Shri. Vipul Singh",
    position: "Mess Owner",
    phone: "+91 98765 43212",
    email: "v.singh@hostel.edu",
    image: "https://placehold.co/150x150/C7D2FE/4338CA?text=VS",
  },
  {
    name: "Durgesh",
    position: "Mess Worker",
    phone: "+91 98765 43213",
    email: "a.kumar@hostel.edu",
    image: "https://placehold.co/150x150/E2E8F0/1E293B?text=DK",
  },
  {
  name: "Durga2",
  position: "Mess Worker2",
  phone: "+91 98765 432132",
  email: "a.kumar@hostel.edu",
  image: "https://placehold.co/150x150/E2E8F0/1E293B?text=DS",
},
{
  name: "werth",
  position: "Mess Worker2",
  phone: "+91 98765 432132",
  email: "a.kumar@hostel.edu",
  image: "https://placehold.co/150x150/E2E8F0/1E293B?text=WK",
},
];

const App = () => {
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">Our Staff</h1>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
          Meet the dedicated team that ensures a comfortable and safe environment for all our students.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {staffMembers.map((member, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform hover:scale-105">
            <div className="relative">
              <img
                src={member.image}
                alt={`Profile of ${member.name}`}
                className="w-full h-48 object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "https://placehold.co/150x150/CCCCCC/FFFFFF?text=No+Image";
                }}
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-indigo-600 font-medium">{member.position}</p>
              <div className="mt-4 text-left space-y-2">
                <p className="flex items-center text-gray-600 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 16V4a2 2 0 012-2h6a2 2 0 012 2v12a4 4 0 01-4 4H9a4 4 0 01-4-4zm4 2a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                  <span>{member.phone}</span>
                </p>
                <p className="flex items-center text-gray-600 text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-indigo-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H8a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>{member.email}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default App;
