import React, { useMemo, useRef, useState, useLayoutEffect, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFilteredProducts } from "../../../service/productAPI";

const TrendingNewArrivals = () => {
  const [index, setIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(() =>
    typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1
  );
  const navigate = useNavigate();
  const trackRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [gapPx, setGapPx] = useState(0);

  // ✅ Fetch your API data
  useEffect(() => {
    fetchProducts();

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

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const payload = {
        q: "",
        category: "",
        subCategory: "",
        minPrice: null,
        maxPrice: null,
        pageNumber: null,
        pageSize: 10,
        sort: "latest",
        country: null,
      };

      const response = await getFilteredProducts(payload);
      if (response && response.success && response.data) {
        setProducts(response.data.items || []);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Format product for display
  const displayProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) return [];
    return products
      .filter((p) => p.available)
      .map((p) => ({
        id: p.id,
        title: p.name || "Untitled Product",
        price: p.price ? `₹${p.price.toLocaleString("en-IN")}` : "Price not available",
        image: p.images?.[0] || "https://via.placeholder.com/400x300?text=No+Image",
        badge: p.productMainCategory || "New",
        slug: p.productId,
      }));
  }, [products]);

  const maxIndex = Math.max(0, displayProducts.length - visibleCount);
  const clampedIndex = Math.max(0, Math.min(index, maxIndex));

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
      className="relative max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 py-20 bg-premium-cream overflow-hidden"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <div className="flex items-end justify-between mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-wide text-black uppercase mb-3">
            Trending Collections
          </h2>
          <p className="text-text-medium text-base md:text-lg">
            New Arrivals crafted for elevated living
          </p>
        </div>
        <div className="hidden md:flex gap-4">
          <button
            onClick={prev}
            disabled={clampedIndex === 0}
            className="h-12 w-12 rounded-sm border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ‹
          </button>
          <button
            onClick={next}
            disabled={clampedIndex === maxIndex}
            className="h-12 w-12 rounded-sm border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            ›
          </button>
        </div>
      </div>

      <div className="relative">
        <div className="md:hidden absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 z-10">
          <button
            onClick={prev}
            disabled={clampedIndex === 0}
            className="h-10 w-10 rounded-sm border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30"
          >
            ‹
          </button>
          <button
            onClick={next}
            disabled={clampedIndex === maxIndex}
            className="h-10 w-10 rounded-sm border-2 border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-30"
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
            {isLoading ? (
              <div className="col-span-full text-center py-16 text-text-medium">
                <p className="text-lg">Loading products...</p>
              </div>
            ) : displayProducts.length > 0 ? (
              displayProducts.map((p) => (
                <article
                  key={p.id}
                  className="group bg-white border border-text-light/20 overflow-hidden shadow-sm hover:shadow-lg flex flex-col h-full cursor-pointer transition-all duration-300"
                  onClick={() => navigate(`/productDetail/${p.slug}`)}
                >
                  <div className="relative aspect-square overflow-hidden bg-premium-beige">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/400x300?text=Image+Not+Found")
                      }
                    />
                    {p.badge && (
                      <span className="absolute top-3 left-3 text-xs px-2.5 py-1 bg-black text-white font-medium uppercase tracking-wider">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1 bg-white">
                    <h3 className="text-text-dark font-semibold text-base tracking-tight group-hover:text-black transition-colors mb-1 uppercase">
                      {p.title}
                    </h3>
                    <p className="text-text-medium text-xs mt-1 line-clamp-2 flex-1 leading-relaxed">
                      {p.category || "No description available"}
                    </p>
                    <div className="mt-3 pt-3 border-t border-text-light/20">
                      <span className="text-black font-bold text-lg">
                        {p.price}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="col-span-full text-center py-16 text-text-medium">
                <p className="text-lg">No products available at the moment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingNewArrivals;
