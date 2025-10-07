import React from "react";
import TrendingNewArrivals from "../../components/TrendingNewArrivals";
import GenderGrid from "../../components/GenderGrid";
import heroImage from "../../assets/heroImage.jpg";

// Stock placeholder images (royalty-free providers like Unsplash/Pexels). Replace with branded assets later.

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Premium Banner */}
      <section className="relative h-[78vh] md:h-[86vh] w-full flex items-center justify-center text-center overflow-hidden">
        <img
          src={heroImage}
          alt="YOBHA Premium Nightwear"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-black/40"></div>
        <div className="relative z-10 flex flex-col items-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e7bfb3] via-[#f6d6cb] to-[#d9a79a] drop-shadow-[0_0_20px_rgba(255,182,193,0.25)]">
            Night Elegance
          </h1>
          <p className="mt-3 md:mt-5 text-white/85 text-base md:text-xl max-w-2xl">
            Lounge in refined comfort. Meticulous materials, timeless silhouettes, elevated details.
          </p>
          <div className="mt-7 md:mt-9 flex gap-4">
            <button className="px-7 py-3 rounded-full bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] text-black font-semibold text-base md:text-lg shadow-lg hover:scale-[1.03] transition">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Carousel Section: Trending/New Arrivals (light surface) */}
      <div className="bg-white">
        <TrendingNewArrivals />
      </div>

      {/* Gender Grid */}
      <GenderGrid />
    </div>
  );
};

export default HomePage;
