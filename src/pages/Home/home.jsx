import React from "react";
import heroVideo from "../../assets/heroVideo.mp4";
import TrendingNewArrivals from './components/TrendingNewArrivals'
import GenderGrid from './components/GenderGrid'
import AccessoriesSection from './components/AccessoriesSection'

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-[#FAF6F2]">
      {/* Premium Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Enhanced gradient overlay for premium feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/70"></div>

        {/* Premium content with enhanced spacing */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 md:px-0 max-w-7xl mx-auto">
          {/* Large YOBHA Logo - Enhanced Gucci Style */}
          <h1 className="text-8xl md:text-[12rem] lg:text-[15rem] font-bold text-white/25 tracking-widest mb-12 select-none transform hover:scale-105 transition-transform duration-700">
            YOBHA
          </h1>
          
          {/* Premium tagline */}
          <p className="text-white/80 text-lg md:text-xl uppercase tracking-widest mb-8 font-light">
            Luxury Redefined
          </p>
          
          {/* Enhanced SHOP NOW Button */}
          <button className="px-16 py-5 bg-white border-2 border-black text-black font-medium text-xl uppercase tracking-wider hover:bg-black hover:text-white transition-all duration-500 transform hover:scale-105 shadow-2xl hover:shadow-black/20">
            SHOP NOW
          </button>
        </div>
      </section>

      {/* Premium sections with enhanced spacing */}
      <div className="space-y-0">
        <TrendingNewArrivals />
        <GenderGrid />
        <AccessoriesSection />
      </div>
    </div>
  );
};

export default HomePage;
