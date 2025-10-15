import React from "react";
import { useNavigate } from "react-router-dom";
import MEN_IMAGE from "../../../assets/Men.png";
import WOMEN_IMAGE from "../../../assets/Women.png";
import KID_IMAGE from "../../../assets/kids-hero.jpg";
import PET_IMAGE from "../../../assets/pet-hero.jpg";
import COUPLE_IMAGE from "../../../assets/couple-hero1.jpg";
import FAMILY_IMAGE from "../../../assets/family-hero.jpg";

const GenderGrid = () => {
  const navigate = useNavigate();

  const genderCategories = [
    {
      id: "women",
      title: "Women",
      description: "The art of elegance and grace",
      image: WOMEN_IMAGE,
      gradient: "from-pink-500/20 via-purple-500/10 to-transparent",
      size: "large",
    },
    {
      id: "men",
      title: "Men",
      description: "Classic sophistication redefined",
      image: MEN_IMAGE,
      gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
      size: "large",
    },
    {
      id: "kids",
      title: "Kids",
      description: "Playful comfort for little ones",
      image: KID_IMAGE,
      gradient: "from-yellow-500/20 via-orange-500/10 to-transparent",
      size: "medium",
    },
    {
      id: "pets",
      title: "Pets",
      description: "Luxury comfort for your furry friends",
      image: PET_IMAGE,
      gradient: "from-green-500/20 via-teal-500/10 to-transparent",
      size: "medium",
    },
    {
      id: "couple",
      title: "Couple",
      description: "Matching elegance for two",
      image: COUPLE_IMAGE,
      gradient: "from-red-500/20 via-pink-500/10 to-transparent",
      size: "small",
    },
    {
      id: "family",
      title: "Family",
      description: "Comfort for the whole family",
      image: FAMILY_IMAGE,
      gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
      size: "small",
    },
  ];

  const handleNavigate = (category) => {
    navigate(`/products/${category.toLowerCase()}`);
  };

  return (
    <section
      className="relative w-full px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-20 bg-premium-beige overflow-hidden"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border border-luxury-gold/30 rotate-45"></div>
        <div className="absolute top-20 right-16 w-16 h-16 border border-luxury-gold/30 rotate-12"></div>
        <div className="absolute bottom-16 left-16 w-18 h-18 border border-luxury-gold/30 -rotate-12"></div>
        <div className="absolute bottom-10 right-10 w-14 h-14 border border-luxury-gold/30 rotate-45"></div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-12 md:mb-16">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-widest text-black uppercase mb-4">
          Indulge in Luxury
        </h2>
        <div className="w-20 h-1 bg-luxury-gold mx-auto mb-6"></div>
        <p className="text-text-medium text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
          Discover timeless elegance, curated collections, and the art of refined living.  
          Every choice whispers sophistication, every detail sparkles.
        </p>
      </div>

      {/* Masonry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {genderCategories.map((category) => {
          const heights = {
            large: "h-[400px] lg:h-[500px]",
            medium: "h-[300px] lg:h-[350px]",
            small: "h-[250px] lg:h-[280px]",
          };
          const slogans = {
            large: "Step into elegance →",
            medium: "Curated for you →",
            small: "Luxury at a glance →",
          };
          return (
            <article
              key={category.id}
              className={`group relative overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 flex flex-col
                ${category.size === "large" ? "md:col-span-2 lg:col-span-2" : ""}
              `}
              onClick={() => handleNavigate(category.id)}
            >
              {/* Gold Accent Bar */}
              <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>

              {/* Image Container */}
              <div className={`relative ${heights[category.size]} overflow-hidden bg-premium-cream`}>
                <img
                  src={category.image}
                  alt={`${category.title} Collection`}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.target.src =
                      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+";
                  }}
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent ${category.gradient}`}
                ></div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform duration-300">
                    {category.title}
                  </div>
                  <div className="text-white/90 text-sm sm:text-base lg:text-lg tracking-wide mb-2">
                    {category.description}
                  </div>
                  <div className="text-luxury-gold text-xs sm:text-sm uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                    {slogans[category.size]}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Call-to-Action */}
      <div className="text-center mt-12 md:mt-16">
        {/* <button className="px-8 py-4 bg-gradient-to-r from-black to-text-dark text-white font-semibold text-lg uppercase tracking-widest hover:bg-luxury-gold hover:text-white transition-all duration-500 transform hover:scale-105 border-2 border-black hover:border-luxury-gold shadow-lg hover:shadow-2xl">
          Explore All Collections
        </button> */}
      </div>
    </section>
  );
};

export default GenderGrid;
