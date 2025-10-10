import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../product/components/product-card";
import { Filter, X, ChevronDown, ChevronUp, SlidersHorizontal, Package } from "lucide-react";

const ProductsPage = () => {
  const { category } = useParams();
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("all");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [lastSelectedCategory, setLastSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("featured");
  
  // Infinite scroll states
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const productsPerPage = 12;
  
  // Accordion states - only one open at a time
  const [openAccordion, setOpenAccordion] = useState("categories");

  // Product Segments
  const segments = ["All", "Women", "Men", "Kids", "Pets", "Couple", "Family"];

  // Main Categories
  const categories = [
    { id: "sleepwear", name: "Sleepwear" },
    { id: "loungewear", name: "Loungewear" },
    { id: "homewear", name: "Homewear / Daywear" },
    { id: "accessories", name: "Accessories" },
  ];

  // Sub-Categories mapped to parent categories
  const categorySubOptions = {
    sleepwear: [
      { id: "sleepwear-sets", name: "Sleepwear Sets" },
      { id: "nightgowns", name: "Nightgowns" },
      { id: "pajama-sets", name: "Pajama Sets" },
      { id: "robes", name: "Robes & Kaftans" },
    ],
    loungewear: [
      { id: "coord-sets", name: "Co-ord Sets" },
      { id: "lounge-pants", name: "Lounge Pants" },
      { id: "lounge-tops", name: "Lounge Tops" },
      { id: "casual-robes", name: "Casual Robes" },
    ],
    homewear: [
      { id: "day-dresses", name: "Day Dresses" },
      { id: "casual-sets", name: "Casual Sets" },
      { id: "comfort-wear", name: "Comfort Wear" },
    ],
    accessories: [
      { id: "slippers", name: "Slippers" },
      { id: "scrunchies", name: "Hair Scrunchies" },
      { id: "eye-masks", name: "Eye Masks" },
      { id: "headbands", name: "Headbands" },
      { id: "socks", name: "Socks" },
      { id: "cushion-covers", name: "Cushion Covers" },
      { id: "pet-accessories", name: "Pet Accessories" },
    ],
  };

  // Get available sub-categories based on last selected category only
  const getAvailableSubCategories = () => {
    if (!lastSelectedCategory || !categorySubOptions[lastSelectedCategory]) {
      return [];
    }
    return categorySubOptions[lastSelectedCategory];
  };

  // Handle category checkbox toggle
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories(prev => {
      if (prev.includes(categoryId)) {
        // Remove category and its sub-categories
        const newCategories = prev.filter(id => id !== categoryId);
        // Also remove sub-categories of this category
        const subCatsToRemove = categorySubOptions[categoryId]?.map(sub => sub.id) || [];
        setSelectedSubCategories(prevSubs => 
          prevSubs.filter(subId => !subCatsToRemove.includes(subId))
        );
        // Update last selected category
        if (lastSelectedCategory === categoryId) {
          setLastSelectedCategory(newCategories.length > 0 ? newCategories[newCategories.length - 1] : null);
        }
        return newCategories;
      } else {
        // Add category and set as last selected
        setLastSelectedCategory(categoryId);
        return [...prev, categoryId];
      }
    });
  };

  // Remove individual filter
  const removeFilter = (type, value) => {
    if (type === 'segment') {
      setSelectedSegment('all');
    } else if (type === 'category') {
      handleCategoryToggle(value);
    } else if (type === 'subCategory') {
      handleSubCategoryToggle(value);
    }
  };

  // Toggle accordion - only one open at a time
  const toggleAccordion = (accordionName) => {
    setOpenAccordion(openAccordion === accordionName ? null : accordionName);
  };

  // Get filter name by ID
  const getCategoryName = (id) => {
    return categories.find(cat => cat.id === id)?.name || id;
  };

  const getSubCategoryName = (id) => {
    for (let catId in categorySubOptions) {
      const found = categorySubOptions[catId].find(sub => sub.id === id);
      if (found) return found.name;
    }
    return id;
  };

  // Handle sub-category checkbox toggle
  const handleSubCategoryToggle = (subCategoryId) => {
    setSelectedSubCategories(prev => 
      prev.includes(subCategoryId)
        ? prev.filter(id => id !== subCategoryId)
        : [...prev, subCategoryId]
    );
  };

  // Sorting Options
  const sortOptions = [
    { id: "featured", name: "Featured" },
    { id: "price-low", name: "Price: Low to High" },
    { id: "price-high", name: "Price: High to Low" },
    { id: "newest", name: "Newest First" },
    { id: "popular", name: "Most Popular" },
  ];

  const [products] = useState([
    {
      id: 1,
      name: "Silk Night Dress",
      price: "₹4,990",
      category: "sleepwear",
      segment: "women",
      subCategory: "sleepwear-sets",
      img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600",
      images: [
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600",
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600"
      ],
      badge: "New",
      rating: 4.5,
      reviewCount: 128
    },
    {
      id: 2,
      name: "Premium Loungewear Set",
      price: "₹5,499",
      category: "loungewear",
      segment: "men",
      subCategory: "coord-sets",
      img: "https://images.unsplash.com/photo-1618354691373-d851c5d96e88?w=600",
      images: [
        "https://images.unsplash.com/photo-1618354691373-d851c5d96e88?w=600",
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
      ],
      rating: 4.8,
      reviewCount: 89
    },
    {
      id: 3,
      name: "Velvet Robe",
      price: "₹6,999",
      category: "sleepwear",
      segment: "women",
      subCategory: "robes",
      img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600",
      images: [
        "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600",
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600"
      ],
      badge: "Bestseller",
      rating: 4.9,
      reviewCount: 245
    },
    {
      id: 4,
      name: "Kids Pajama Set",
      price: "₹2,499",
      category: "sleepwear",
      segment: "kids",
      subCategory: "pajama-sets",
      img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600",
      images: [
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600"
      ],
      rating: 4.6,
      reviewCount: 52
    },
    {
      id: 5,
      name: "Couple Matching Set",
      price: "₹8,999",
      category: "loungewear",
      segment: "couple",
      subCategory: "coord-sets",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
      images: [
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
        "https://images.unsplash.com/photo-1618354691373-d851c5d96e88?w=600"
      ],
      badge: "Premium",
      rating: 4.7,
      reviewCount: 76
    },
    {
      id: 6,
      name: "Silk Hair Scrunchies",
      price: "₹499",
      category: "accessories",
      segment: "women",
      subCategory: "scrunchies",
      img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600",
      images: [
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600"
      ],
      rating: 4.3,
      reviewCount: 34
    },
    {
      id: 7,
      name: "Luxury Slippers",
      price: "₹1,999",
      category: "accessories",
      segment: "women",
      subCategory: "slippers",
      img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600",
      images: [
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600"
      ],
      badge: "New",
      rating: 4.4,
      reviewCount: 41
    },
    {
      id: 8,
      name: "Nightgown Collection",
      price: "₹4,499",
      category: "sleepwear",
      segment: "women",
      subCategory: "nightgowns",
      img: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600",
      images: [
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600"
      ],
      rating: 4.6,
      reviewCount: 92
    },
  ]);

  // Filter products based on selections
  const filteredProducts = products.filter((product) => {
    const matchSegment = selectedSegment === "all" || product.segment === selectedSegment.toLowerCase();
    const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchSubCategory = selectedSubCategories.length === 0 || selectedSubCategories.includes(product.subCategory);
    return matchSegment && matchCategory && matchSubCategory;
  });

  // Load more products
  const loadMoreProducts = () => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      const startIndex = (page - 1) * productsPerPage;
      const endIndex = startIndex + productsPerPage;
      const newProducts = filteredProducts.slice(startIndex, endIndex);
      
      if (newProducts.length === 0 || endIndex >= filteredProducts.length) {
        setHasMore(false);
      }
      
      setDisplayedProducts(prev => [...prev, ...newProducts]);
      setPage(prev => prev + 1);
      setIsLoading(false);
    }, 800);
  };

  // Reset pagination when filters change
  useEffect(() => {
    setDisplayedProducts([]);
    setPage(1);
    setHasMore(true);
    
    // Load initial products
    const initialProducts = filteredProducts.slice(0, productsPerPage);
    setDisplayedProducts(initialProducts);
    setPage(2);
    
    if (filteredProducts.length <= productsPerPage) {
      setHasMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSegment, selectedCategories, selectedSubCategories, sortBy, productsPerPage]);

  // Scroll to top on category change
  useEffect(() => {
    const mainElement = document.getElementById('products-main');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
  }, [category]);

  // Accordion Component
  const FilterAccordion = ({ title, isOpen, onToggle, children }) => (
    <div className="border-b border-[#e7bfb3]/20 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 px-5 hover:bg-[#faf6f2]/50 transition-colors group"
      >
        <span className="font-bold text-[#8b5f4b] text-sm uppercase tracking-wider group-hover:text-[#d9a79a] transition-colors">
          {title}
        </span>
        {isOpen ? (
          <ChevronUp size={18} className="text-[#d9a79a]" />
        ) : (
          <ChevronDown size={18} className="text-[#8b5f4b] group-hover:text-[#d9a79a] transition-colors" />
        )}
      </button>
      {isOpen && <div className="px-5 pb-5">{children}</div>}
    </div>
  );

  // Filter Sidebar Component
  const FilterSidebar = ({ showHeader = true }) => (
    <div className="bg-white rounded-2xl shadow-lg border border-[#e7bfb3]/20 overflow-hidden">
      {/* Sidebar Header - Only show when showHeader is true (desktop) */}
      {showHeader && (
        <div className="px-5 py-4 bg-gradient-to-r from-[#fdf9f6] to-[#faf6f2] border-b border-[#e7bfb3]/30 flex items-center justify-between">
          <h2 className="font-bold text-[#8b5f4b] text-base uppercase tracking-wide flex items-center gap-2">
            <Filter size={20} className="text-[#d9a79a]" />
            Filters
          </h2>
          {(selectedSegment !== 'all' || selectedCategories.length > 0 || selectedSubCategories.length > 0) && (
            <button
              onClick={() => {
                setSelectedSegment("all");
                setSelectedCategories([]);
                setSelectedSubCategories([]);
                setLastSelectedCategory(null);
              }}
              className="text-xs text-[#d9a79a] hover:text-[#8b5f4b] font-bold uppercase transition-colors"
            >
              Clear All
            </button>
          )}
        </div>
      )}

      {/* Gender & Type Accordion */}
      <FilterAccordion
        title="Gender & Type"
        isOpen={openAccordion === "gender"}
        onToggle={() => toggleAccordion("gender")}
      >
        <div className="space-y-2.5">
          {segments.map((segment) => (
            <label
              key={segment}
              className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-[#faf6f2] hover:to-transparent p-2.5 rounded-lg transition-all group"
            >
              <input
                type="radio"
                name="segment"
                checked={selectedSegment === segment.toLowerCase()}
                onChange={() => setSelectedSegment(segment.toLowerCase())}
                className="w-4 h-4 border-[#e7bfb3] text-[#d9a79a] focus:ring-[#d9a79a]/20 cursor-pointer accent-[#d9a79a]"
              />
              <span className={`text-sm transition-colors ${
                selectedSegment === segment.toLowerCase() 
                  ? "text-[#d9a79a] font-bold" 
                  : "text-[#7a5650] group-hover:text-[#8b5f4b] font-medium"
              }`}>
                {segment}
              </span>
            </label>
          ))}
        </div>
      </FilterAccordion>

      {/* Category Accordion */}
      <FilterAccordion
        title="Category"
        isOpen={openAccordion === "categories"}
        onToggle={() => toggleAccordion("categories")}
      >
        <div className="space-y-2.5">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-[#faf6f2] hover:to-transparent p-2.5 rounded-lg transition-all group"
            >
              <input
                type="checkbox"
                checked={selectedCategories.includes(cat.id)}
                onChange={() => handleCategoryToggle(cat.id)}
                className="w-4 h-4 rounded border-[#e7bfb3] text-[#d9a79a] focus:ring-[#d9a79a]/20 cursor-pointer accent-[#d9a79a]"
              />
              <span className={`text-sm transition-colors ${
                selectedCategories.includes(cat.id) 
                  ? "text-[#d9a79a] font-bold" 
                  : "text-[#7a5650] group-hover:text-[#8b5f4b] font-medium"
              }`}>
                {cat.name}
              </span>
            </label>
          ))}
        </div>
      </FilterAccordion>

      {/* Sub-Category Accordion - Only show if categories are selected */}
      {getAvailableSubCategories().length > 0 && (
        <FilterAccordion
          title="Styles & Options"
          isOpen={openAccordion === "styles"}
          onToggle={() => toggleAccordion("styles")}
        >
          <p className="text-xs text-[#a2786b] mb-3 italic bg-[#faf6f2] px-3 py-2 rounded-lg">
            For: <span className="font-bold text-[#d9a79a]">{getCategoryName(lastSelectedCategory)}</span>
          </p>
          <div className="space-y-2.5">
            {getAvailableSubCategories().map((subCat) => (
              <label
                key={subCat.id}
                className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-[#faf6f2] hover:to-transparent p-2.5 rounded-lg transition-all group"
              >
                <input
                  type="checkbox"
                  checked={selectedSubCategories.includes(subCat.id)}
                  onChange={() => handleSubCategoryToggle(subCat.id)}
                  className="w-4 h-4 rounded border-[#e7bfb3] text-[#d9a79a] focus:ring-[#d9a79a]/20 cursor-pointer accent-[#d9a79a]"
                />
                <span className={`text-sm transition-colors ${
                  selectedSubCategories.includes(subCat.id) 
                    ? "text-[#d9a79a] font-bold" 
                    : "text-[#7a5650] group-hover:text-[#8b5f4b] font-medium"
                }`}>
                  {subCat.name}
                </span>
              </label>
            ))}
          </div>
        </FilterAccordion>
      )}

      {/* Sort Accordion */}
      <FilterAccordion
        title="Sort By"
        isOpen={openAccordion === "sort"}
        onToggle={() => toggleAccordion("sort")}
      >
        <div className="space-y-2.5">
          {sortOptions.map((option) => (
            <label
              key={option.id}
              className="flex items-center gap-3 cursor-pointer hover:bg-gradient-to-r hover:from-[#faf6f2] hover:to-transparent p-2.5 rounded-lg transition-all group"
            >
              <input
                type="radio"
                name="sortBy"
                checked={sortBy === option.id}
                onChange={() => setSortBy(option.id)}
                className="w-4 h-4 border-[#e7bfb3] text-[#d9a79a] focus:ring-[#d9a79a]/20 cursor-pointer accent-[#d9a79a]"
              />
              <span className={`text-sm transition-colors ${
                sortBy === option.id 
                  ? "text-[#d9a79a] font-bold" 
                  : "text-[#7a5650] group-hover:text-[#8b5f4b] font-medium"
              }`}>
                {option.name}
              </span>
            </label>
          ))}
        </div>
      </FilterAccordion>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fdfbf9] to-[#faf6f2] h-screen overflow-hidden">
      {/* Mobile Filter Sidebar */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setShowMobileFilters(false)}
          ></div>
          
          {/* Sidebar */}
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto animate-slideInLeft scrollbar-hide border-r border-[#e7bfb3]/20">
            <div className="sticky top-0 bg-gradient-to-r from-[#fdf7f2] to-[#f8ede3] z-10 px-4 py-4 border-b border-[#e7bfb3]/30">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-bold text-[#8b5f4b] uppercase tracking-wide flex items-center gap-2">
                  <Filter size={20} />
                  Filters
                </h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="text-[#8b5f4b] hover:text-[#d9a79a] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              {/* Clear All Button in Mobile Header */}
              {(selectedSegment !== 'all' || selectedCategories.length > 0 || selectedSubCategories.length > 0) && (
                <button
                  onClick={() => {
                    setSelectedSegment("all");
                    setSelectedCategories([]);
                    setSelectedSubCategories([]);
                    setLastSelectedCategory(null);
                  }}
                  className="text-xs text-[#d9a79a] hover:text-[#8b5f4b] font-semibold uppercase"
                >
                  Clear All Filters
                </button>
              )}
            </div>
            <FilterSidebar showHeader={false} />
          </div>
        </div>
      )}

      {/* Two-Column Layout: Filters + Products */}
      <div className="flex h-full overflow-hidden">
        {/* Left Column: Filter Sidebar */}
        <aside className="hidden lg:block lg:w-64 xl:w-72 overflow-y-auto bg-white/50 backdrop-blur-sm border-r border-[#e7bfb3]/20 scrollbar-hide">
          <div className="p-6">
            <FilterSidebar />
          </div>
        </aside>

        {/* Right Column: Products */}
        <main id="products-main" className="flex-1 overflow-y-auto scrollbar-hide">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 lg:py-8">
            
            {/* Page Header */}
            <div className="mb-8 lg:mb-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#8b5f4b] mb-3 tracking-tight">
                  {category ? `${category} Collection` : "Discover YOBHA"}
                </h1>
                <p className="text-[#a2786b] text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                  Timeless essentials crafted for serene nights and refined comfort
                </p>
              </div>
              
              {/* Decorative Divider */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#e7bfb3]"></div>
                <div className="w-2 h-2 rounded-full bg-[#d9a79a]"></div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#e7bfb3]"></div>
              </div>
            </div>

          {/* Mobile Filter Toggle & Product Count */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <button
              onClick={() => setShowMobileFilters(true)}
              className="lg:hidden flex items-center gap-2 bg-white px-5 py-3 rounded-xl shadow-md border border-[#e7bfb3]/30 text-[#8b5f4b] font-bold hover:shadow-lg transition-all"
            >
              <SlidersHorizontal size={20} />
              <span>Filters</span>
            </button>
            <div className="hidden lg:block text-[#8b5f4b] font-semibold text-base">
              {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''}
            </div>
          </div>

          {/* Selected Filters Display */}
          {(selectedSegment !== 'all' || selectedCategories.length > 0 || selectedSubCategories.length > 0) && (
            <div className="bg-white rounded-xl p-4 sm:p-5 mb-6 border border-[#e7bfb3]/20 shadow-md">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#8b5f4b]">Active Filters:</span>
                
                {/* Segment Filter */}
                {selectedSegment !== 'all' && (
                  <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm">
                    <span className="capitalize">{selectedSegment}</span>
                    <button
                      onClick={() => removeFilter('segment', selectedSegment)}
                      className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                      aria-label="Remove filter"
                    >
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Category Filters */}
                {selectedCategories.map((catId) => (
                  <div key={catId} className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] text-[#8b5f4b] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                    <span>{getCategoryName(catId)}</span>
                    <button
                      onClick={() => removeFilter('category', catId)}
                      className="hover:bg-white/40 rounded-full p-0.5 transition-colors"
                      aria-label="Remove category"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {/* Sub-Category Filters */}
                {selectedSubCategories.map((subCatId) => (
                  <div key={subCatId} className="inline-flex items-center gap-1.5 bg-[#faf6f2] text-[#7a5650] border border-[#e7bfb3]/40 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm">
                    <span>{getSubCategoryName(subCatId)}</span>
                    <button
                      onClick={() => removeFilter('subCategory', subCatId)}
                      className="hover:bg-[#e7bfb3]/30 rounded-full p-0.5 transition-colors"
                      aria-label="Remove sub-category"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                {/* Clear All Button */}
                <button
                  onClick={() => {
                    setSelectedSegment("all");
                    setSelectedCategories([]);
                    setSelectedSubCategories([]);
                    setLastSelectedCategory(null);
                  }}
                  className="text-xs sm:text-sm text-[#d9a79a] hover:text-[#8b5f4b] font-semibold underline ml-2"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
              ))
            ) : !isLoading ? (
              <div className="col-span-full text-center py-20">
                <Package size={64} className="mx-auto text-[#e7bfb3] mb-4" />
                <p className="text-[#8b5f4b] text-xl font-semibold mb-2">No products found</p>
                <p className="text-[#a2786b] mb-6">Try adjusting your filters</p>
                <button
                  onClick={() => {
                    setSelectedSegment("all");
                    setSelectedCategories([]);
                    setSelectedSubCategories([]);
                    setLastSelectedCategory(null);
                  }}
                  className="bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] text-[#8b5f4b] px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            ) : null}
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <div className="relative">
                <div className="w-16 h-16 rounded-full border-4 border-[#faf6f2] border-t-[#d9a79a] animate-spin"></div>
                <p className="text-[#8b5f4b] text-sm mt-4 text-center font-semibold">Loading...</p>
              </div>
            </div>
          )}

          {/* Load More Button */}
          {!isLoading && hasMore && displayedProducts.length > 0 && (
            <div className="flex justify-center mt-12 mb-8">
              <button
                onClick={loadMoreProducts}
                className="bg-gradient-to-r from-[#f6d6cb] via-[#e7bfb3] to-[#d9a79a] text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 text-base"
              >
                Load More Products
              </button>
            </div>
          )}

          {/* End of Products Message */}
          {!hasMore && displayedProducts.length > 0 && (
            <div className="text-center py-12">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-[#faf6f2] to-[#fef9f5] rounded-full border border-[#e7bfb3]/30">
                <p className="text-[#a2786b] text-sm font-medium">You've viewed all products in this collection</p>
              </div>
            </div>
          )}
          </div>
        </main>
      </div>

      {/* Animation and scrollbar styles */}
      <style jsx>{`
        @keyframes slideInLeft {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease forwards;
        }
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;
