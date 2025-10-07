import React, { useMemo, useRef, useState } from "react";
import SILK_NIGHT_DRESS from "../assets/silk night dress.png";

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    title: "Silk Night Shirt",
    description: "Hand-finished mulberry silk with mother-of-pearl buttons",
    price: "₹4,990",
    image: SILK_NIGHT_DRESS,
    badge: "New",
  },
  {
    id: 2,
    title: "Cashmere Lounge Set",
    description: "Featherlight knit with breathable comfort",
    price: "₹6,450",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    badge: "Trending",
  },
  {
    id: 3,
    title: "Satin Camisole",
    description: "Lustrous drape with adjustable straps",
    price: "₹2,490",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    badge: "Bestseller",
  },
  {
    id: 4,
    title: "Velour Robe",
    description: "Ultra-plush warmth, hotel-grade finish",
    price: "₹5,290",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800&auto=format&fit=crop",
    badge: "New",
  },
];

const TrendingNewArrivals = () => {
  const [index, setIndex] = useState(0);
  const visibleDesktop = 3;
  const clampedIndex = useMemo(() => Math.max(0, Math.min(index, Math.max(0, SAMPLE_PRODUCTS.length - visibleDesktop))), [index]);
  const trackRef = useRef(null);

  const next = () => setIndex((i) => Math.min(i + 1, SAMPLE_PRODUCTS.length - visibleDesktop));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <section className="relative max-w-7xl mx-auto px-6 py-12 md:py-16">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#e7bfb3] via-[#f6d6cb] to-[#d9a79a]">Trending Collections</h2>
          <p className="text-neutral-600 text-sm md:text-base mt-1">New Arrivals crafted for elevated lounging</p>
        </div>
        <div className="hidden md:flex gap-3">
          <button onClick={prev} aria-label="Previous" className="h-10 w-10 rounded-full border border-[#e7bfb3]/40 text-neutral-700 hover:text-black hover:border-[#e7bfb3]/70 transition">‹</button>
          <button onClick={next} aria-label="Next" className="h-10 w-10 rounded-full border border-[#e7bfb3]/40 text-neutral-700 hover:text-black hover:border-[#e7bfb3]/70 transition">›</button>
        </div>
      </div>

      <div className="relative mt-6">


        {/* Mobile arrows inside track edges */}
        <div className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-10">
          <button onClick={prev} aria-label="Previous" className="h-9 w-9 rounded-full border border-[#e7bfb3]/40 bg-white/90 text-neutral-700">‹</button>
          <button onClick={next} aria-label="Next" className="h-9 w-9 rounded-full border border-[#e7bfb3]/40 bg-white/90 text-neutral-700">›</button>
        </div>

        <div className="overflow-hidden md:px-4">
          <div
            ref={trackRef}
            className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[85%] md:auto-cols-[calc((100%-40px)/3)] gap-5 transition-transform duration-500"
            style={{ transform: `translateX(-${clampedIndex * (100 / visibleDesktop)}%)` }}
          >
            {SAMPLE_PRODUCTS.map((p) => (
              <article key={p.id} className="group bg-white border border-[#e7bfb3]/30 rounded-2xl overflow-hidden shadow-[0_6px_26px_rgba(15,15,15,0.06)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} className="h-full w-full object-cover group-hover:scale-105 transition" />
                  {p.badge && (
                    <span className="absolute top-3 left-3 text-xs px-2 py-1 rounded-full bg-[#f6d6cb] text-black font-medium">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-neutral-900 font-semibold">{p.title}</h3>
                  <p className="text-neutral-600 text-sm mt-1 line-clamp-2">{p.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[#a2786b] font-semibold">{p.price}</span>
                    <button className="text-sm px-3 py-1.5 rounded-full bg-neutral-900/5 hover:bg-neutral-900/10 text-neutral-900 border border-neutral-900/10">View</button>
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

export default TrendingNewArrivals;


