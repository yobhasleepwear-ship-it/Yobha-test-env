import React from "react";
import heroImage from "../../assets/heroImage.jpg";
import TrendingNewArrivals from './components/TrendingNewArrivals'
import GenderGrid from './components/GenderGrid'
const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-[#FAF6F2]">
   

      <section className="relative h-screen w-full flex items-center justify-center text-center overflow-hidden">
      
        <img
          src={heroImage}
          alt="YOBHA Premium Sleepwear"
          className="absolute inset-0 w-full h-full object-cover"
        />

     
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60"></div>

    
        <div className="relative z-10 flex flex-col items-center px-4 md:px-0">
          <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e7bfb3] via-[#f6d6cb] to-[#d9a79a] drop-shadow-[0_0_20px_rgba(255,182,193,0.3)]">
            YOBHA
          </h1>
          <p className="mt-4 text-white/80 text-lg md:text-2xl max-w-xl">
            Premium Sleepwear for Your Ultimate Comfort and Luxury
          </p>

          <button className="mt-8 px-8 py-3 rounded-full bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] text-white font-semibold text-lg shadow-lg hover:scale-105 transform transition-all duration-300">
            Shop Now
          </button>

  
        </div>
      </section>
      {/* Render Trending arrivals and Gender grid below the hero */}
      <TrendingNewArrivals />
      <GenderGrid />
    </div>
  );
};

export default HomePage;
