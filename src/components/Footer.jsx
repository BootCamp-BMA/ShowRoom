import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#171719] to-[#171719] text-[#F1F1F1] py-12">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {/* Column 1: Quick Links */}
          <div>
            <h4 className="text-2xl font-bold mb-6">Menu</h4>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className="block py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className="block py-2 text-gray-400 hover:text-white transition-colors"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="block py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 2: Social Media */}
          <div>
            <h4 className="text-2xl font-bold mb-6">Social Media</h4>
            <div className="flex space-x-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaFacebookF className="text-3xl" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaTwitter className="text-3xl" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FaInstagram className="text-3xl" />
              </a>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-2xl font-bold mb-6">Contact</h4>
            <p className="flex items-center text-gray-400 mb-4">
              <FaEnvelope className="mr-3 text-xl" />
              support@revora.com
            </p>
            <p className="flex items-center text-gray-400 mb-4">
              <FaPhone className="mr-3 text-xl" />
              +213 556606665
            </p>
            <p className="text-gray-400">19000 Citè, Sètif, Algeria</p>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-400">
            &copy; 2025 Revora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
