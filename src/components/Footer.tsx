
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-white text-black pt-12 pb-8 shadow-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Logo />
            <p className="mt-4">
              Your reliable transportation partner for chauffeur services and hourly rentals.
            </p>
          </div>
          
          <div>
            <h5 className="text-lg font-bold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-fleet-red">Home</Link></li>
              <li><button className="hover:text-fleet-red">Book Chauffeur</button></li>
              <li><button className="hover:text-fleet-red">Hourly</button></li>
              <li><Link to="/about" className="hover:text-fleet-red">About Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-bold mb-4">Support</h5>
            <ul className="space-y-2">
              <li><Link to="/faq" className="hover:text-fleet-red">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-fleet-red">Contact Us</Link></li>
              <li><Link to="/terms" className="hover:text-fleet-red">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-fleet-red">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-bold mb-4">Contact</h5>
            <address className="not-italic space-y-2">
              <p>123 Transport Street</p>
              <p>City, Country</p>
              <p>Phone: (123) 456-7890</p>
              <p>Email: info@firstclassfleet.com</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-6 text-center text-gray-600">
          <p>© {new Date().getFullYear()} First Class Fleet. All rights reserved. Powered by <a href="https://jezx.in" target="_blank" rel="noopener noreferrer" className="text-fleet-red hover:underline">JezX</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
