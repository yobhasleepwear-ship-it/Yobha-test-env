import React from "react";
import { useNavigate } from "react-router-dom";
import MEN_IMAGE from "../../../assets/Men.png";
import WOMEN_IMAGE from "../../../assets/Women.png";

const GenderGrid = () => {
  const navigate = useNavigate();

  // Define all gender categories with their details
  const genderCategories = [
    {
      id: "women",
      title: "Women",
      description: "The art of elegance and grace",
      image: WOMEN_IMAGE,
      gradient: "from-pink-500/20 via-purple-500/10 to-transparent",
      size: "large" // Featured category
    },
    {
      id: "men", 
      title: "Men",
      description: "Classic sophistication redefined",
      image: MEN_IMAGE,
      gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
      size: "large" // Featured category
    },
    {
      id: "kids",
      title: "Kids",
      description: "Playful comfort for little ones",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPktpZHMgQ29sbGVjdGlvbjwvdGV4dD4KPC9zdmc+",
      gradient: "from-yellow-500/20 via-orange-500/10 to-transparent",
      size: "medium"
    },
    {
      id: "pets",
      title: "Pets", 
      description: "Luxury comfort for your furry friends",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPlBldHMgQ29sbGVjdGlvbjwvdGV4dD4KPC9zdmc+",
      gradient: "from-green-500/20 via-teal-500/10 to-transparent",
      size: "medium"
    },
    {
      id: "couple",
      title: "Couple",
      description: "Matching elegance for two",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkNvdXBsZSBDb2xsZWN0aW9uPC90ZXh0Pgo8L3N2Zz4=",
      gradient: "from-red-500/20 via-pink-500/10 to-transparent",
      size: "small"
    },
    {
      id: "family",
      title: "Family",
      description: "Comfort for the whole family",
      image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkZhbWlseSBDb2xsZWN0aW9uPC90ZXh0Pgo8L3N2Zz4=",
      gradient: "from-indigo-500/20 via-purple-500/10 to-transparent",
      size: "small"
    }
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
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-widest text-black uppercase mb-4">
          Discover Luxury
        </h2>
        <div className="w-16 h-1 bg-luxury-gold mx-auto mb-6"></div>
        <p className="text-text-medium text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
          Explore timeless elegance for every occasion
        </p>
      </div>

      {/* Premium Masonry Grid Layout - Enhanced Mobile Responsiveness */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {/* Featured Categories - Large Cards */}
        {genderCategories.filter(cat => cat.size === 'large').map((category) => (
          <article
            key={category.id}
            className="group md:col-span-2 lg:col-span-2 bg-white border border-text-light/10 overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-700 flex flex-col relative"
            onClick={() => handleNavigate(category.id)}
          >
            {/* Luxury Gold Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
            
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden bg-premium-cream">
              <img
                src={category.image}
                alt={`${category.title} Collection`}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+";
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent ${category.gradient}`}></div>
              
              {/* Luxury border overlay */}
              <div className="absolute inset-0 border-2 border-white/20 group-hover:border-luxury-gold/40 transition-all duration-500"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider mb-3 group-hover:scale-105 transition-transform duration-300">
                  {category.title}
                </div>
                <div className="text-white/90 text-sm sm:text-base lg:text-lg tracking-wide mb-4">
                  {category.description}
                </div>
                <div className="text-luxury-gold text-xs sm:text-sm uppercase tracking-widest group-hover:text-white transition-colors duration-300">
                  Explore Collection →
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Medium Categories */}
        {genderCategories.filter(cat => cat.size === 'medium').map((category) => (
          <article
            key={category.id}
            className="group bg-white border border-text-light/10 overflow-hidden shadow-lg hover:shadow-xl cursor-pointer transition-all duration-700 flex flex-col relative"
            onClick={() => handleNavigate(category.id)}
          >
            {/* Luxury Gold Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
            
            <div className="relative h-[250px] sm:h-[280px] md:h-[300px] lg:h-[350px] overflow-hidden bg-premium-cream">
              <img
                src={category.image}
                alt={`${category.title} Collection`}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+";
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent ${category.gradient}`}></div>
              
              {/* Luxury border overlay */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white uppercase tracking-wider mb-2 group-hover:scale-105 transition-transform duration-300">
                  {category.title}
                </div>
                <div className="text-white/90 text-xs sm:text-sm lg:text-base tracking-wide">
                  {category.description}
                </div>
              </div>
            </div>
          </article>
        ))}

        {/* Small Categories */}
        {genderCategories.filter(cat => cat.size === 'small').map((category) => (
          <article
            key={category.id}
            className="group bg-white border border-text-light/10 overflow-hidden shadow-lg hover:shadow-lg cursor-pointer transition-all duration-700 flex flex-col relative"
            onClick={() => handleNavigate(category.id)}
          >
            {/* Luxury Gold Accent Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-luxury-gold"></div>
            
            <div className="relative h-[200px] sm:h-[220px] md:h-[250px] lg:h-[280px] overflow-hidden bg-premium-cream">
              <img
                src={category.image}
                alt={`${category.title} Collection`}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                onError={(e) => {
                  e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDgwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjRjVGNUY1Ii8+Cjx0ZXh0IHg9IjQwMCIgeT0iMzAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM5OTk5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD4KPC9zdmc+";
                }}
              />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent ${category.gradient}`}></div>
              
              {/* Luxury border overlay */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-luxury-gold/30 transition-all duration-500"></div>
              
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5">
                <div className="text-base sm:text-lg lg:text-xl font-bold text-white uppercase tracking-wider mb-1 sm:mb-2 group-hover:scale-105 transition-transform duration-300">
                  {category.title}
                </div>
                <div className="text-white/90 text-xs sm:text-sm lg:text-sm tracking-wide">
                  {category.description}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Luxury Call-to-Action */}
      <div className="text-center mt-12 md:mt-16">
        <button className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-black to-text-dark text-white font-semibold text-base sm:text-lg uppercase tracking-widest hover:bg-luxury-gold hover:text-white transition-all duration-500 transform hover:scale-105 border-2 border-black hover:border-luxury-gold shadow-lg hover:shadow-2xl">
          View All Collections
        </button>
      </div>
    </section>
  );
};

export default GenderGrid;
