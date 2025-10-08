import React, { useMemo, useRef, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const SAMPLE_PRODUCTS = [
  {
    id: 1,
    title: "Silk Night Shirt",
    description:
      "Hand-finished mulberry silk with mother-of-pearl buttons, crafted for ultimate comfort and timeless elegance.",
    price: "₹4,990",
    image:
      "https://i.etsystatic.com/19870219/r/il/9939a4/3877887290/il_fullxfull.3877887290_o82x.jpg",
    badge: "New",
  },
  {
    id: 2,
    title: "Cashmere Lounge Set",
    description:
      "Featherlight knit, designed for all-day luxury comfort in soft pastel tones.",
    price: "₹6,450",
    image:
      "https://i.ebayimg.com/images/g/F8gAAOSw5RldMuSB/s-l400.jpg",
    badge: "Trending",
  },
  {
    id: 3,
    title: "Satin Camisole",
    description:
      "Lustrous satin drape with delicate adjustable straps, made for graceful ease.",
    price: "₹2,490",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlDdRDL3DAbUYYbvbijqJDG6btkfNZYECbz2IG3Y1hCknNZrt01pYWKCofaaUiCX-DVKM&usqp=CAU",
    badge: "Bestseller",
  },
  {
    id: 4,
    title: "Velour Robe",
    description:
      "Ultra-plush warmth with a hotel-grade finish — comfort meets elegance.",
    price: "₹5,290",
    image:
      "https://i.pinimg.com/236x/7e/6d/a5/7e6da53be4b66e464fd76766878c9b7c.jpg",
    badge: "New",
  },
];

const TrendingNewArrivals = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1
  );

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(min-width: 768px)");
    const handle = (e) => setVisibleCount(e.matches ? 3 : 1);
    handle(mq);
    if (mq.addEventListener) mq.addEventListener("change", handle);
    else mq.addListener(handle);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", handle);
      else mq.removeListener(handle);
    };
  }, []);

  const maxIndex = Math.max(0, SAMPLE_PRODUCTS.length - visibleCount);
  const clampedIndex = useMemo(
    () => Math.max(0, Math.min(index, maxIndex)),
    [index, maxIndex]
  );
  const trackRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [gapPx, setGapPx] = useState(0);

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
    <section className="relative max-w-7xl mx-auto px-6 py-16 bg-gradient-to-b from-[#fffdfa] via-[#fffaf6] to-[#fef7f4] overflow-hidden">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight bg-gradient-to-r from-[#b07a6e] via-[#d8a79c] to-[#e9c1b5] bg-clip-text text-transparent">
            Trending Collections
          </h2>
          <p className="text-neutral-500 text-sm md:text-base mt-1 italic">
            New Arrivals crafted for elevated living
          </p>
        </div>
        <div className="hidden md:flex gap-3">
          <button
            onClick={prev}
            className="h-10 w-10 rounded-full border border-[#d8a79c]/40 text-[#b07a6e] hover:border-[#d8a79c] hover:bg-[#fef5f3] transition-all"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="h-10 w-10 rounded-full border border-[#d8a79c]/40 text-[#b07a6e] hover:border-[#d8a79c] hover:bg-[#fef5f3] transition-all"
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative mt-10">
        {/* Mobile arrows */}
        <div className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-10">
          <button
            onClick={prev}
            className="h-9 w-9 rounded-full border border-[#d8a79c]/40 bg-white/90 text-[#b07a6e]"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="h-9 w-9 rounded-full border border-[#d8a79c]/40 bg-white/90 text-[#b07a6e]"
          >
            ›
          </button>
        </div>

        <div className="overflow-hidden md:px-4">
          <div
            ref={trackRef}
            className="grid grid-flow-col auto-cols-[100%] sm:auto-cols-[85%] md:auto-cols-[calc((100%-40px)/3)] gap-6 transition-transform duration-500"
            style={{
              transform: cardWidth
                ? `translateX(-${clampedIndex * (cardWidth + gapPx)}px)`
                : `translateX(-${clampedIndex * (100 / visibleCount)}%)`,
            }}
          >
            {SAMPLE_PRODUCTS.map((p) => (
              <article
                key={p.id}
                className="group bg-white/90 backdrop-blur-md border border-[#e8c1b5]/30 rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(200,150,130,0.1)] hover:shadow-[0_20px_60px_rgba(200,150,130,0.25)] flex flex-col h-full cursor-pointer transform hover:-translate-y-2 transition-all duration-500"
                onClick={() => navigate(`/products/${p.badge}`)}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  />
                  {p.badge && (
                    <span className="absolute top-3 left-3 text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-[#e8c1b5] to-[#f3d7cd] text-[#5a3c2a] font-medium shadow-sm">
                      {p.badge}
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-[#a67663] font-semibold text-lg tracking-tight group-hover:text-[#8b5f4b] transition">
                    {p.title}
                  </h3>
                  <p className="text-neutral-700 text-sm mt-1 line-clamp-2 flex-1">
                    {p.description}
                  </p>
                  <div className="mt-4">
                    <span className="text-[#a67663] font-semibold text-lg">
                      {p.price}
                    </span>
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
