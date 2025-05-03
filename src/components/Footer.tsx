
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-booba-dark text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo className="text-white" />
            <p className="text-gray-300 mt-4">
              Your reliable transportation partner for taxi bookings and car rentals.
            </p>
          </div>
          
          <div>
            <h5 className="text-lg font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-booba-yellow">Home</Link></li>
              <li><Link to="/taxi" className="text-gray-300 hover:text-booba-yellow">Book Taxi</Link></li>
              <li><Link to="/rental" className="text-gray-300 hover:text-booba-yellow">Rent Car</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-booba-yellow">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-bold mb-4">Support</h5>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-300 hover:text-booba-yellow">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-booba-yellow">Contact Us</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-booba-yellow">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-booba-yellow">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-bold mb-4">Contact</h5>
            <address className="not-italic text-gray-300 space-y-2">
              <p>123 Transport Street</p>
              <p>City, Country</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@boobataxi.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Booba Taxi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
