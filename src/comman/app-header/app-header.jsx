import React, { useState, useEffect } from "react";
import { LogOut, Menu, X, User, Heart, Package } from "lucide-react";
import { BsBag } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { LocalStorageKeys } from "../../constants/localStorageKeys";
import * as localStorageService from "../../service/localStorageService";

const HeaderWithSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const menuItems = ["Home", "Collections", "About", "Contact"];
  const collectionItems = ["Nightwear", "Loungewear", "Couple Sets", "Silk Series"];

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorageService.getValue(LocalStorageKeys.AuthToken);
      setIsAuthenticated(!!token);
    };

    checkAuth();
    window.addEventListener("storage", checkAuth); // update if storage changes
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorageService.clearAll(); // clear all keys
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-[#e7bfb3]/10 shadow-[0_6px_24px_rgba(15,15,15,0.06)] fixed top-0 left-0 w-full z-50 transition-colors duration-300">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between px-6 md:px-8 lg:px-12 py-4">

        {/* Logo */}
        <Link 
          to="/" 
          className="text-3xl font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#e7bfb3] via-[#f6d6cb] to-[#d9a79a] drop-shadow-[0_0_10px_rgba(255,182,193,0.3)] cursor-pointer hover:opacity-90 transition-opacity"
        >
          YOBHA
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-[15px] font-medium">
          {menuItems.map((item) => (
            <div key={item} className="relative group">
              {item === "Collections" ? (
                <button className="text-[#a2786b] hover:text-[#8b5f4b] transition-all duration-300 tracking-wide">
                  {item}
                </button>
              ) : (
                <Link
                  to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                  className="text-[#a2786b] hover:text-[#8b5f4b] transition-all duration-300 tracking-wide"
                >
                  {item}
                </Link>
              )}
              {item === "Collections" && (
                <div className="absolute top-8 left-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-150 bg-white rounded-xl p-4 min-w-[200px] animate-slideDown">
                  {collectionItems.map((cat) => (
                    <Link
                      key={cat}
                      to={`/products/${cat.toLowerCase().replace(/\s/g, "-")}`}
                      className="block px-4 py-2 rounded-lg hover:bg-[#f6d6cb]/20 transition-colors duration-300 text-sm text-[#a2786b] hover:text-[#8b5f4b]"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-8 md:gap-10">
          {/* User Account Icon with Dropdown */}
          {isAuthenticated ? (
            <div className="relative group">
              <button 
                className="text-[#a2786b] hover:text-[#8b5f4b] transition-colors duration-300 flex items-center cursor-pointer"
                title="My Account"
              >
                <User size={22} strokeWidth={1.8} />
              </button>
              
              {/* User Dropdown Menu */}
              <div className="absolute top-full right-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white rounded-xl shadow-xl border border-[#e7bfb3]/20 p-2 min-w-[200px]">
                  <Link
                    to="/account"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[#f6d6cb]/20 transition-colors duration-300 text-sm text-[#a2786b] hover:text-[#8b5f4b]"
                  >
                    <User size={16} />
                    <span>My Account</span>
                  </Link>
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[#f6d6cb]/20 transition-colors duration-300 text-sm text-[#a2786b] hover:text-[#8b5f4b]"
                  >
                    <Package size={16} />
                    <span>Orders</span>
                  </Link>
                  <Link
                    to="/wishlist"
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg hover:bg-[#f6d6cb]/20 transition-colors duration-300 text-sm text-[#a2786b] hover:text-[#8b5f4b]"
                  >
                    <Heart size={16} />
                    <span>Wishlist</span>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <Link 
              to="/login"
              className="text-[#a2786b] hover:text-[#8b5f4b] transition-colors duration-300 flex items-center"
              title="Login"
            >
              <User size={22} strokeWidth={1.8} />
            </Link>
          )}

          {/* Cart Icon - Always visible with unique design */}
          <Link 
            to="/cart" 
            className="text-[#a2786b] hover:text-[#8b5f4b] transition-colors duration-300 flex items-center"
            title="Shopping Cart"
          >
            <BsBag size={22} />
          </Link>

          {/* Logout Icon - Only when authenticated and on desktop */}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="hidden md:flex items-center text-[#a2786b] hover:text-[#8b5f4b] transition-colors duration-300"
              title="Logout"
            >
              <LogOut size={20} strokeWidth={1.8} />
            </button>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[#a2786b] focus:outline-none hover:opacity-80 transition"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>

          <div className="relative w-72 bg-gradient-to-b from-[#f8ede3] via-[#fdf4ee] to-[#fdf7f2] shadow-2xl animate-slideInLeft">
            <div className="flex items-center justify-between px-6 py-5 border-b border-[#e7bfb3]/30">
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d9a79a] via-[#e7bfb3] to-[#f6d6cb] drop-shadow-sm">
                YOBHA
              </div>
              <button
                className="text-[#a2786b] hover:text-[#d9a79a] transition-all duration-300"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col p-6 space-y-3 text-[#7a5650] text-base">
              {menuItems.map((item) => (
                <div key={item} className="w-full">
                  {item === "Collections" ? (
                    <span className="block w-full text-[#8b5f4b] font-semibold">{item}</span>
                  ) : (
                    <Link
                      to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="block w-full text-[#a2786b] hover:text-[#d9a79a] transition-colors duration-300 font-medium"
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item}
                    </Link>
                  )}
                  {item === "Collections" && (
                    <div className="pl-4 mt-3 space-y-2">
                      {collectionItems.map((cat) => (
                        <Link
                          key={cat}
                          to={`/products/${cat.toLowerCase().replace(/\s/g, "-")}`}
                          className="block text-[#7a5650] hover:text-[#e7bfb3] transition-colors duration-300 py-1"
                          onClick={() => setSidebarOpen(false)}
                        >
                          {cat}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Sidebar Login/Logout */}
              <div className="pt-4 border-t border-[#e7bfb3]/30 mt-2">
                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    className="block text-[#a2786b] hover:text-[#d9a79a] transition-colors duration-300 font-semibold"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      setSidebarOpen(false);
                      handleLogout();
                    }}
                    className="flex items-center gap-3 text-[#a2786b] hover:text-[#d9a79a] transition-colors duration-300 text-left w-full font-semibold"
                  >
                    <LogOut size={20} />
                    <span>Logout</span>
                  </button>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease forwards;
        }
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease forwards;
        }
      `}</style>
    </header>
  );
};

export default HeaderWithSidebar;
