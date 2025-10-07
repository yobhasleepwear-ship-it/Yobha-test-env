import React, { useEffect, useState } from "react";
import { LogIn, Menu, X, User, ShoppingCart } from "lucide-react";

const HeaderWithSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = ["Home", "Collections", "About", "Contact"];
  const collectionItems = ["Nightwear", "Loungewear", "Couple Sets", "Silk Series"];

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY >= 1);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`${isScrolled ? "bg-white-100 border-b border-rose-200/30 shadow-[0_2px_24px_rgba(20,20,20,0.06)]" : "backdrop-blur-lg bg-gradient-to-b from-[#1a1a1a]/40 via-[#1f1b1a]/30 to-transparent border-b border-rose-200/20"} fixed top-0 left-0 w-full z-50 transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between pl-6 pr-6 md:pr-8 py-4">

        <div className="text-3xl font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#e7bfb3] via-[#f6d6cb] to-[#d9a79a] drop-shadow-[0_0_10px_rgba(255,182,193,0.3)] cursor-pointer">
          YOBHA
        </div>

        <nav className="hidden md:flex space-x-8 text-[15px] font-medium">
          {menuItems.map((item) => (
            <div key={item} className="relative group">
              <a
                href="#"
                className={`${isScrolled ? "text-neutral-700" : "text-[#fefefe]/90 hover:text-[#f5c1b1]"} transition-all duration-300 tracking-wide`}
              >
                {item}
              </a>
              <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] transition-all duration-500 group-hover:w-full rounded-full"></span>

              {item === "Collections" && (
                <div className="absolute top-8 left-0 right-0 opacity-0 invisible  group-hover:visible transition-all duration-300 delay-150 flex flex-col md:flex-row md:justify-center items-start md:items-center p-4 min-w-full   rounded-xl shadow-2xl text-white space-y-2 md:space-y-0 md:space-x-6 animate-slideDown">
                  {collectionItems.map((cat) => (
                    <a
                      key={cat}
                      href="#"
                      className="px-3 py-2 rounded-lg hover:bg-[#f6d6cb]/10 transition-colors duration-300 text-sm text-[#fefefe]/90 hover:text-[#f6d6cb]"
                    >
                      {cat}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>


        <div className="flex items-center gap-5">
          <button className={`${isScrolled ? "text-neutral-700" : "text-white/90 hover:text-[#f5c1b1]"} transition-all duration-300`} aria-label="User">
            <User size={22} />
          </button>
          <button className={`${isScrolled ? "text-neutral-700" : "text-white/90 hover:text-[#f5c1b1]"} transition-all duration-300`} aria-label="Cart">
            <ShoppingCart size={22} />
          </button>
          <button className={`${isScrolled ? "text-neutral-700" : "text-white/90 hover:text-[#f5c1b1]"} transition-all duration-300`} aria-label="Login">
            <LogIn size={22} />
          </button>

          <button
            className={`md:hidden ${isScrolled ? "text-neutral-700" : "text-white"} focus:outline-none hover:opacity-80 transition`}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>


      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">

          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          ></div>


          <div className="relative w-64 bg-[#1a1a1a]/95 backdrop-blur-md shadow-2xl animate-slideInLeft">
            <div className="flex items-center justify-between px-6 py-4 border-b border-rose-200/20">
              <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e7bfb3] via-[#f6d6cb] to-[#d9a79a]">
                YOBHA
              </div>
              <button
                className="text-white hover:text-[#f5c1b1] transition"
                onClick={() => setSidebarOpen(false)}
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col p-6 space-y-4 text-white text-sm">
              {menuItems.map((item) => (
                <div key={item} className="w-full">
                  <a
                    href="#"
                    className="block w-full text-white/90 hover:text-[#f6d6cb] transition"
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item}
                  </a>

                  {item === "Collections" && (
                    <div className="pl-4 mt-2 space-y-2">
                      {collectionItems.map((cat) => (
                        <a
                          key={cat}
                          href="#"
                          className="block text-white/70 hover:text-[#f6d6cb] transition"
                          onClick={() => setSidebarOpen(false)}
                        >
                          {cat}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
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
