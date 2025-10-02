import React from 'react';
import gpg_logo from './../../assets/gpg_logo_no_bg.png'

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 mt-10">
      <div className="container mx-auto  grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About Us</h3>
          <p className="text-sm">
            Welcome to Government Polytechnic Hostel, a premier residence for students since 1938.
            We provide a safe and supportive environment with modern facilities.
            Managed by a dedicated committee, we cater to both boys and girls.
            Our goal is to enhance student life with amenities like a gym and sports courts.
            Join us for a comfortable stay and enriching college experience!
          </p>
          
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-teal-300">Home</a></li>
            <li><a href="#" className="hover:text-teal-300">Registration</a></li>
            <li><a href="#" className="hover:text-teal-300">Facilities</a></li>
            <li><a href="#" className="hover:text-teal-300">Administration</a></li>
            <li><a href="#" className="hover:text-teal-300">Guidelines</a></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <p className="text-sm">
            Email: hostel@gpg.ac.in<br />
            Phone: +91-987-654-3210<br />
            Location: Shastri Nagr D-block , Police Line , Ghaziabad
          </p>
          <div className="mt-5 md:block">
          <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.4640138547247!2d77.46719987502266!3d28.67576318211705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf18a012b899f%3A0x5877fd5186901cdc!2sGovernment%20Polytechnic%20Ghaziabad!5e0!3m2!1sen!2sin!4v1757866248193!5m2!1sen!2sin"
        width="200"
        height="200"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
        </div>
        </div>

        
        
      </div>

      {/* Copyright */}
      <div className="text-center mt-6 border-t border-gray-700 pt-4 text-sm">
        <p>&copy; 2025 Government Polytechnic Ghaziabad Hostel. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;