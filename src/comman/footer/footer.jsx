import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
  <footer className="bg-gradient-to-b from-[#f8ede3] via-[#fdf4ee] to-[#f8ede3] relative z-10 border-t border-[#e7bfb3]/30">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand & About */}
        <div className="space-y-4">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d9a79a] via-[#e7bfb3] to-[#f6d6cb]">
            YOBHA
          </div>
          <p className="text-[#7a5650] text-sm">
            Premium sleepwear for your ultimate comfort. Designed with care, elegance, and style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#8b5f4b]">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[#a2786b]">
            <li>
              <Link to="/" className="hover:text-[#d9a79a] transition-colors">Home</Link>
            </li>
            <li>
              <a href="#!" className="hover:text-[#d9a79a] transition-colors">Collections</a>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#d9a79a] transition-colors">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#d9a79a] transition-colors">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#8b5f4b]">Policies</h3>
          <ul className="space-y-2 text-sm text-[#a2786b]">
            <li>
              <a href="#!" className="hover:text-[#d9a79a] transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#!" className="hover:text-[#d9a79a] transition-colors">Terms of Service</a>
            </li>
            <li>
              <a href="#!" className="hover:text-[#d9a79a] transition-colors">Refund Policy</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#8b5f4b]">Follow Us</h3>
          <div className="flex items-center gap-4">
            <button aria-label="Facebook" className="text-[#a2786b] hover:text-[#d9a79a] transition-colors">
              <Facebook size={20} />
            </button>
            <button aria-label="Twitter" className="text-[#a2786b] hover:text-[#d9a79a] transition-colors">
              <Twitter size={20} />
            </button>
            <button aria-label="Instagram" className="text-[#a2786b] hover:text-[#d9a79a] transition-colors">
              <Instagram size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e7bfb3]/40 py-4 mt-6 text-sm text-[#a2786b] flex flex-col md:flex-row items-center justify-between px-6">
        <p>© 2025 YOBHA. All rights reserved.</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <Link to="/privacy" className="hover:text-[#d9a79a] transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-[#d9a79a] transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
