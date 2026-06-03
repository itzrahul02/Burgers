import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="bg-neutral-900/80 border-t border-neutral-800 text-neutral-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-2xl font-bold text-orange-400 mb-3">Burgers</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Crafting the finest burgers with premium ingredients since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-400 transition-colors">Home</Link></li>
              <li><Link to="/order" className="hover:text-orange-400 transition-colors">Menu</Link></li>
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">About</Link></li>
              <li><Link to="/orders" className="hover:text-orange-400 transition-colors">Track Order</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Phone: (123) 456-7890</li>
              <li>Email: hello@burgers.com</li>
              <li>123 Burger Street, Food City</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-neutral-500 mb-3">Subscribe for offers & updates</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-l-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-500"
              />
              <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-r-lg text-white text-sm font-medium transition-colors">
                Go
              </button>
            </div>
          </div>
        </div>

        {/* Divider + Bottom */}
        <div className="border-t border-neutral-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-neutral-600 text-sm">© 2024 Burgers. All rights reserved.</p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <a href="#" className="text-neutral-500 hover:text-orange-400 transition-colors text-lg">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#" className="text-neutral-500 hover:text-orange-400 transition-colors text-lg">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="#" className="text-neutral-500 hover:text-orange-400 transition-colors text-lg">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
