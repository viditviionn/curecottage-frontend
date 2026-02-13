
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-bold text-qure-teal">QureHome</Link>
            <p className="text-gray-500 leading-relaxed">
              Purpose-built recovery residences for patients seeking comfort, care, and convenience near major hospitals.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-qure-teal transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-qure-teal transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-qure-teal transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-qure-teal transition-colors"><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/listings" className="text-gray-600 hover:text-qure-teal">Recovery Homes</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-qure-teal">Services & Care</Link></li>
              <li><Link to="/partners" className="text-gray-600 hover:text-qure-teal">Partner With Us</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-qure-teal">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
            <ul className="space-y-3">
              <li><Link to="/faq" className="text-gray-600 hover:text-qure-teal">FAQ</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-qure-teal">Contact Us</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-qure-teal">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-qure-teal">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-600">
                <MapPin className="h-5 w-5 text-qure-teal shrink-0 mt-0.5" />
                <span>Bannerghatta Road Corridor,<br/>Bangalore, India</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Phone className="h-5 w-5 text-qure-teal shrink-0" />
                <span>+91 7892341731</span>
              </li>
              <li className="flex items-center gap-3 text-gray-600">
                <Mail className="h-5 w-5 text-qure-teal shrink-0" />
                <span>info@qurehome.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} QureHome. All rights reserved.</p>
          <div className="flex gap-6">
            <span>English (IN)</span>
            <span>INR</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;