import React from "react";
import { useNavigate } from "react-router-dom";
import MEN_IMAGE from "../../../assets/Men.png";
import WOMEN_IMAGE from "../../../assets/Women.png";

const GenderGrid = () => {
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/products/${category.toLowerCase()}`);
  };

  return (
    <div className="bg-gradient-to-b from-[#fffaf7] via-[#fff5ef] to-[#fffaf7] mt-8 md:mt-12">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 md:pt-16 pb-20">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#b97b68] via-[#e7bfb3] to-[#d9a79a] drop-shadow-sm">
              Discover Luxury
            </h2>
            <p className="text-neutral-600 text-sm md:text-lg mt-2 font-light tracking-wide">
              Explore timeless elegance for every occasion
            </p>
          </div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* MEN CARD */}
          <button
            onClick={() => handleNavigate("men")}
            className="relative group rounded-[2rem] overflow-hidden border border-[#e7bfb3]/40 bg-white/80 backdrop-blur-md shadow-[0_8px_40px_rgba(233,200,185,0.25)] hover:shadow-[0_12px_60px_rgba(233,200,185,0.35)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#fff2ea]/80 via-transparent to-[#f8e8e3]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={MEN_IMAGE}
              alt="Men"
              className="h-[340px] md:h-[480px] w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fffaf7]/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 md:left-10">
              <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c79381] via-[#e7bfb3] to-[#b97b68]">
                Men
              </div>
              <div className="text-[#8c6b5b] text-sm md:text-base tracking-wide mt-1 font-medium">
                Classic sophistication redefined
              </div>
            </div>
          </button>

          {/* WOMEN CARD */}
          <button
            onClick={() => handleNavigate("women")}
            className="relative group rounded-[2rem] overflow-hidden border border-[#e7bfb3]/40 bg-white/80 backdrop-blur-md shadow-[0_8px_40px_rgba(233,200,185,0.25)] hover:shadow-[0_12px_60px_rgba(233,200,185,0.35)] transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#fff2ea]/80 via-transparent to-[#f8e8e3]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <img
              src={WOMEN_IMAGE}
              alt="Women"
              className="h-[340px] md:h-[480px] w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#fffaf7]/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 md:left-10">
              <div className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c79381] via-[#e7bfb3] to-[#b97b68]">
                Women
              </div>
              <div className="text-[#8c6b5b] text-sm md:text-base tracking-wide mt-1 font-medium">
                The art of elegance and grace
              </div>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};

export default GenderGrid;
