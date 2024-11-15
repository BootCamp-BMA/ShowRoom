import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Column 1: Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul>
              <li>
                <NavLink to="/" className="block py-1 hover:text-gray-400">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className="block py-1 hover:text-gray-400">
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className="block py-1 hover:text-gray-400"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 2: Social Media */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f text-2xl hover:text-gray-400"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter text-2xl hover:text-gray-400"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram text-2xl hover:text-gray-400"></i>
              </a>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="mb-2">ShowRoom Inc.</p>
            <p className="mb-2">1234 Car Avenue, City, Country</p>
            <p>Email: support@showroom.com</p>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p>&copy; 2024 ShowRoom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
