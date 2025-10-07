import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#1a1a1a]/90 via-[#2b1e1e]/80 to-[#1a1a1a]/90 text-white relative z-50">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand & About */}
        <div className="space-y-4">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e7bfb3] via-[#f6d6cb] to-[#d9a79a]">
            YOBHA
          </div>
          <p className="text-[#fefefe]/80 text-sm">
            Premium sleepwear for your ultimate comfort. Designed with care, elegance, and style.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#f6d6cb]">Quick Links</h3>
          <ul className="space-y-2 text-sm text-[#fefefe]/90">
            <li>
              <a href="#!" className="hover:text-[#e7bfb3] transition-colors">Home</a>
            </li>
            <li>
              <a href="#!" className="hover:text-[#e7bfb3] transition-colors">Collections</a>
            </li>
            <li>
              <a href="#!" className="hover:text-[#e7bfb3] transition-colors">About</a>
            </li>
            <li>
              <a href="#!" className="hover:text-[#e7bfb3] transition-colors">Contact</a>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#f6d6cb]">Policies</h3>
          <ul className="space-y-2 text-sm text-[#fefefe]/90">
            <li>
              <a href="#!" className="hover:text-[#e7bfb3] transition-colors">Privacy Policy</a>
            </li>
            <li>
              <a href="#!" className="hover:text-[#e7bfb3] transition-colors">Terms of Service</a>
            </li>
            <li>
              <a href="#!" className="hover:text-[#e7bfb3] transition-colors">Refund Policy</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-[#f6d6cb]">Follow Us</h3>
          <div className="flex items-center gap-4">
            <a href="#!" className="hover:text-[#f6d6cb] transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#!" className="hover:text-[#f6d6cb] transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#!" className="hover:text-[#f6d6cb] transition-colors">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#e7bfb3]/20 py-4 mt-6 text-sm text-[#fefefe]/70 flex flex-col md:flex-row items-center justify-between px-6">
        <p>© 2025 YOBHA. All rights reserved.</p>
        <div className="flex gap-6 mt-2 md:mt-0">
          <a href="#!" className="hover:text-[#f6d6cb] transition-colors">Privacy</a>
          <a href="#!" className="hover:text-[#f6d6cb] transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
