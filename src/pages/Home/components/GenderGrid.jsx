import React, { useRef, useState, useLayoutEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MEN_IMAGE from "../../../assets/Men.png";
import WOMEN_IMAGE from "../../../assets/Women.png";

const GenderGrid = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [gapPx, setGapPx] = useState(0);

  // Define all gender categories with their details
  const genderCategories = [
    {
      id: "women",
      title: "Women",
      description: "The art of elegance and grace",
      image: WOMEN_IMAGE,
      gradient: "from-pink-500/20 via-purple-500/10 to-transparent"
    },
    {
      id: "men", 
      title: "Men",
      description: "Classic sophistication redefined",
      image: MEN_IMAGE,
      gradient: "from-blue-500/20 via-indigo-500/10 to-transparent"
    },
    {
      id: "kids",
      title: "Kids",
      description: "Playful comfort for little ones",
      image: "https://images.unsplash.com/photo-1506629905996-4f673cbd3a0c?w=800&h=600&fit=crop",
      gradient: "from-yellow-500/20 via-orange-500/10 to-transparent"
    },
    {
      id: "pets",
      title: "Pets", 
      description: "Luxury comfort for your furry friends",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=600&fit=crop",
      gradient: "from-green-500/20 via-teal-500/10 to-transparent"
    },
    {
      id: "couple",
      title: "Couple",
      description: "Matching elegance for two",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop",
      gradient: "from-red-500/20 via-pink-500/10 to-transparent"
    },
    {
      id: "family",
      title: "Family",
      description: "Comfort for the whole family",
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800&h=600&fit=crop",
      gradient: "from-indigo-500/20 via-purple-500/10 to-transparent"
    }
  ];

  const handleNavigate = (category) => {
    navigate(`/products/${category.toLowerCase()}`);
  };

  // Responsive visible count
  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window !== "undefined" && window.innerWidth >= 1024 ? 3 : 
    typeof window !== "undefined" && window.innerWidth >= 768 ? 2 : 1
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCount(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCount(2);
      } else {
        setVisibleCount(1);
      }
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, genderCategories.length - visibleCount);
  const clampedIndex = useMemo(
    () => Math.max(0, Math.min(index, maxIndex)),
    [index, maxIndex]
  );

  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  useLayoutEffect(() => {
    if (!trackRef.current) return;
    const measure = () => {
      const first = trackRef.current.querySelector("article");
      if (!first) {
        setCardWidth(0);
        setGapPx(0);
        return;
      }
      const rect = first.getBoundingClientRect();
      const w = Math.round(rect.width);
      const cs = window.getComputedStyle(trackRef.current);
      const gapStr = cs.columnGap || cs.gap || "0px";
      const gap = Math.round(parseFloat(gapStr) || 0);
      setCardWidth(w);
      setGapPx(gap);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [visibleCount]);

  return (
    <section 
      className="relative max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 py-20 bg-premium-beige overflow-hidden"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-black uppercase mb-3">
            Discover Luxury
          </h2>
          <p className="text-text-medium text-base md:text-lg">
            Explore timeless elegance for every occasion
          </p>
        </div>
        <div className="hidden md:flex gap-4">
          <button
            onClick={prev}
            disabled={clampedIndex === 0}
            className="h-12 w-12 rounded-sm border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={next}
            disabled={clampedIndex === maxIndex}
            className="h-12 w-12 rounded-sm border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-black disabled:cursor-not-allowed"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative">
        {/* Mobile arrows */}
        <div className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-10">
          <button
            onClick={prev}
            disabled={clampedIndex === 0}
            className="h-10 w-10 rounded-sm border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={next}
            disabled={clampedIndex === maxIndex}
            className="h-10 w-10 rounded-sm border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30"
            aria-label="Next"
          >
            ›
          </button>
        </div>

        <div className="overflow-hidden md:px-4">
          <div
            ref={trackRef}
            className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[85%] md:auto-cols-[calc((100%-20px)/2)] lg:auto-cols-[calc((100%-40px)/3)] gap-6 transition-transform duration-500"
            style={{
              transform: cardWidth
                ? `translateX(-${clampedIndex * (cardWidth + gapPx)}px)`
                : `translateX(-${clampedIndex * (100 / visibleCount)}%)`,
            }}
          >
            {genderCategories.map((category) => (
              <article
                key={category.id}
                className="group bg-white border border-text-light/20 overflow-hidden shadow-sm hover:shadow-lg cursor-pointer transition-all duration-300 flex flex-col"
                onClick={() => handleNavigate(category.id)}
              >
                <div className="relative h-[350px] md:h-[400px] overflow-hidden bg-premium-cream">
                  <img
                    src={category.image}
                    alt={`${category.title} Collection`}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/800x600?text=Image+Not+Found";
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent ${category.gradient}`}></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <div className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider mb-2">
                      {category.title}
                    </div>
                    <div className="text-white/90 text-sm md:text-base tracking-wide">
                      {category.description}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderGrid;
