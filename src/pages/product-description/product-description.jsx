import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { 
  ShoppingBag, Heart, Share2, Star, ChevronLeft, ChevronRight,
  Package, Truck, RefreshCw, Shield, Grid3x3, Image as ImageIcon,
  Minus, Plus
} from "lucide-react";

const ProductDetailPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { productId } = useParams();
  
  const [product] = useState({
    id: 1,
    title: "Luxe Silk Night Shirt",
    shortDescription: "Hand-finished mulberry silk with mother-of-pearl buttons",
    price: "₹4,990",
    originalPrice: "₹6,990",
    rating: 4.8,
    reviews: 124,
    images: [
      "https://i.etsystatic.com/19870219/r/il/9939a4/3877887290/il_fullxfull.3877887290_o82x.jpg",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600",
      "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600",
    ],
    colors: [
      { name: "Rose Gold", hex: "#e7bfb3" },
      { name: "Champagne", hex: "#f6d6cb" },
      { name: "Dusty Rose", hex: "#d9a79a" },
      { name: "Ivory", hex: "#fdf7f2" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    fabric: "100% Mulberry Silk",
    care: ["Hand wash cold", "Do not bleach", "Lay flat to dry", "Iron on low heat"],
    features: [
      "Premium 22 momme silk",
      "Mother-of-pearl button closures",
      "French seam construction",
      "Adjustable fit",
      "Breathable & hypoallergenic",
      "Temperature regulating"
    ],
    details: {
      fabric: "100% Mulberry Silk (22 momme)",
      fit: "Relaxed, true to size",
      length: "Hip length",
      care: "Hand wash or dry clean",
      origin: "Made in India",
    }
  });

  const [selectedImage, setSelectedImage] = useState(0);
  const [imageViewMode, setImageViewMode] = useState("single"); // "single" or "grid"
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [activeTab, setActiveTab] = useState("size-guide");

  const handleAddToCart = () => {
    setQuantity(1);
  };

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    } else {
      setQuantity(0);
    }
  };

  // Size Guide Data
  const sizeGuide = [
    { size: "XS", chest: "32-34", waist: "24-26", hips: "34-36", length: "24" },
    { size: "S", chest: "34-36", waist: "26-28", hips: "36-38", length: "25" },
    { size: "M", chest: "36-38", waist: "28-30", hips: "38-40", length: "26" },
    { size: "L", chest: "38-40", waist: "30-32", hips: "40-42", length: "27" },
    { size: "XL", chest: "40-42", waist: "32-34", hips: "42-44", length: "28" },
    { size: "XXL", chest: "42-44", waist: "34-36", hips: "44-46", length: "29" },
  ];

  const handlePrevImage = () => {
    setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf7f2] via-[#faf6f2] to-[#f8ede3] ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Image View Toggle */}
            <div className="flex justify-end gap-2 mb-3">
              <button
                onClick={() => setImageViewMode("single")}
                className={`p-2 rounded-lg transition-all ${
                  imageViewMode === "single"
                    ? "bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] text-white"
                    : "bg-white text-[#8b5f4b] border border-[#e7bfb3]/30"
                }`}
              >
                <ImageIcon size={18} />
              </button>
              <button
                onClick={() => setImageViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${
                  imageViewMode === "grid"
                    ? "bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] text-white"
                    : "bg-white text-[#8b5f4b] border border-[#e7bfb3]/30"
                }`}
              >
                <Grid3x3 size={18} />
              </button>
            </div>

            {imageViewMode === "single" ? (
              <>
                {/* Main Image */}
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#e7bfb3]/30 bg-white aspect-square">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
                  >
                    <ChevronLeft size={24} className="text-[#8b5f4b]" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-all"
                  >
                    <ChevronRight size={24} className="text-[#8b5f4b]" />
                  </button>

                  {/* Image Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === selectedImage
                            ? "bg-[#d9a79a] w-6"
                            : "bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-lg overflow-hidden border-2 transition-all ${
                        index === selectedImage
                          ? "border-[#d9a79a] shadow-md"
                          : "border-[#e7bfb3]/30 hover:border-[#e7bfb3]"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`View ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              /* Grid View */
              <div className="grid grid-cols-2 gap-4">
                {product.images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-2xl overflow-hidden shadow-lg border border-[#e7bfb3]/30 bg-white aspect-square"
                  >
                    <img
                      src={image}
                      alt={`${product.title} - View ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Information */}
          <div className="space-y-6">
            {/* Product Title & Rating */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d9a79a] via-[#e7bfb3] to-[#f6d6cb] mb-3">
                {product.title}
              </h1>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating) ? "fill-[#d9a79a] text-[#d9a79a]" : "text-[#e7bfb3]"}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#7a5650]">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-[#7a5650] text-sm sm:text-base leading-relaxed">
                {product.shortDescription}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d9a79a] to-[#8b5f4b]">
                {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-[#a2786b] line-through">
                  {product.originalPrice}
                </span>
              )}
              <span className="bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] text-white px-3 py-1 rounded-full text-xs font-semibold">
                30% OFF
              </span>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-semibold text-[#8b5f4b] mb-3 uppercase tracking-wide">
                Select Color: <span className="text-[#d9a79a]">{product.colors[selectedColor].name}</span>
              </h3>
              <div className="flex gap-3 flex-wrap">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`relative w-12 h-12 rounded-full border-4 transition-all ${
                      index === selectedColor
                        ? "border-[#d9a79a] scale-110 shadow-lg"
                        : "border-[#e7bfb3]/30 hover:border-[#e7bfb3]"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {index === selectedColor && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full shadow-md"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-sm font-semibold text-[#8b5f4b] mb-3 uppercase tracking-wide">
                Select Size
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 sm:py-3 rounded-lg font-semibold text-sm transition-all ${
                      selectedSize === size
                        ? "bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] text-white shadow-md"
                        : "bg-white text-[#7a5650] border border-[#e7bfb3]/30 hover:border-[#e7bfb3]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart / Quantity Section */}
            <div className="pt-4">
              {quantity === 0 ? (
                /* Add to Cart Button */
                <div className="flex gap-3">
                  <button 
                    onClick={handleAddToCart}
                    className="flex-1 bg-gradient-to-r from-[#f6d6cb] via-[#e7bfb3] to-[#d9a79a] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={20} />
                    Add to Cart
                  </button>
                  <button className="bg-white border-2 border-[#e7bfb3] p-4 rounded-xl hover:bg-[#faf6f2] transition-all">
                    <Heart size={20} className="text-[#d9a79a]" />
                  </button>
                  <button className="bg-white border-2 border-[#e7bfb3] p-4 rounded-xl hover:bg-[#faf6f2] transition-all">
                    <Share2 size={20} className="text-[#d9a79a]" />
                  </button>
                </div>
              ) : (
                /* Quantity Counter + Action Buttons */
                <>
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-[#8b5f4b] mb-3 uppercase tracking-wide">
                      Quantity
                    </h3>
                    <div className="flex items-center gap-3 w-48">
                      <button
                        onClick={handleDecrement}
                        className="bg-white border-2 border-[#e7bfb3] p-3 rounded-lg hover:bg-[#faf6f2] hover:border-[#d9a79a] transition-all hover:scale-110"
                      >
                        <Minus size={18} className="text-[#d9a79a]" />
                      </button>
                      <div className="flex-1 bg-gradient-to-r from-[#f6d6cb]/20 to-[#e7bfb3]/20 border-2 border-[#e7bfb3] rounded-lg py-3 text-center">
                        <span className="text-2xl font-bold text-[#8b5f4b]">{quantity}</span>
                      </div>
                      <button
                        onClick={handleIncrement}
                        className="bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] p-3 rounded-lg hover:shadow-lg transition-all hover:scale-110"
                      >
                        <Plus size={18} className="text-white" />
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-gradient-to-r from-[#f6d6cb] via-[#e7bfb3] to-[#d9a79a] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2">
                      <ShoppingBag size={20} />
                      Go to Cart ({quantity})
                    </button>
                    <button className="bg-white border-2 border-[#e7bfb3] p-4 rounded-xl hover:bg-[#faf6f2] transition-all">
                      <Heart size={20} className="text-[#d9a79a]" />
                    </button>
                    <button className="bg-white border-2 border-[#e7bfb3] p-4 rounded-xl hover:bg-[#faf6f2] transition-all">
                      <Share2 size={20} className="text-[#d9a79a]" />
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-5 border border-[#e7bfb3]/30 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] p-2 rounded-lg">
                    <Truck size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#a2786b]">Free Delivery</p>
                    <p className="text-sm font-semibold text-[#8b5f4b]">2-3 Days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] p-2 rounded-lg">
                    <RefreshCw size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#a2786b]">Easy Returns</p>
                    <p className="text-sm font-semibold text-[#8b5f4b]">7 Days</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] p-2 rounded-lg">
                    <Shield size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#a2786b]">Secure Payment</p>
                    <p className="text-sm font-semibold text-[#8b5f4b]">100% Safe</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] p-2 rounded-lg">
                    <Package size={18} className="text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-[#a2786b]">Premium Pack</p>
                    <p className="text-sm font-semibold text-[#8b5f4b]">Gift Ready</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#e7bfb3]/30 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-[#e7bfb3]/30">
            {[
              { id: "size-guide", label: "Size Guide" },
              { id: "details", label: "Details" },
              { id: "reviews", label: "Reviews" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-4 px-4 font-semibold text-sm sm:text-base transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#f6d6cb]/20 to-[#e7bfb3]/20 text-[#8b5f4b] border-b-2 border-[#d9a79a]"
                    : "text-[#a2786b] hover:bg-[#faf6f2]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8">
            {activeTab === "size-guide" && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-[#8b5f4b] mb-6">Size Guide</h3>
                <p className="text-sm text-[#7a5650] mb-6">All measurements are in inches</p>
                
                {/* Size Guide Table */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gradient-to-r from-[#f6d6cb]/30 to-[#e7bfb3]/30">
                        <th className="border border-[#e7bfb3]/30 px-4 py-3 text-left text-sm font-semibold text-[#8b5f4b]">Size</th>
                        <th className="border border-[#e7bfb3]/30 px-4 py-3 text-left text-sm font-semibold text-[#8b5f4b]">Chest (in)</th>
                        <th className="border border-[#e7bfb3]/30 px-4 py-3 text-left text-sm font-semibold text-[#8b5f4b]">Waist (in)</th>
                        <th className="border border-[#e7bfb3]/30 px-4 py-3 text-left text-sm font-semibold text-[#8b5f4b]">Hips (in)</th>
                        <th className="border border-[#e7bfb3]/30 px-4 py-3 text-left text-sm font-semibold text-[#8b5f4b]">Length (in)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sizeGuide.map((row, index) => (
                        <tr key={index} className="hover:bg-[#faf6f2] transition-colors">
                          <td className="border border-[#e7bfb3]/30 px-4 py-3 font-semibold text-[#d9a79a]">{row.size}</td>
                          <td className="border border-[#e7bfb3]/30 px-4 py-3 text-[#7a5650]">{row.chest}</td>
                          <td className="border border-[#e7bfb3]/30 px-4 py-3 text-[#7a5650]">{row.waist}</td>
                          <td className="border border-[#e7bfb3]/30 px-4 py-3 text-[#7a5650]">{row.hips}</td>
                          <td className="border border-[#e7bfb3]/30 px-4 py-3 text-[#7a5650]">{row.length}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Size Guide Tips */}
                <div className="mt-6 bg-[#faf6f2] rounded-xl p-4 border border-[#e7bfb3]/30">
                  <h4 className="font-semibold text-[#8b5f4b] mb-2">How to Measure</h4>
                  <ul className="space-y-2 text-sm text-[#7a5650]">
                    <li>• <strong>Chest:</strong> Measure around the fullest part of your chest</li>
                    <li>• <strong>Waist:</strong> Measure around your natural waistline</li>
                    <li>• <strong>Hips:</strong> Measure around the fullest part of your hips</li>
                    <li>• <strong>Length:</strong> Measured from shoulder to hem</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "details" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#8b5f4b] mb-4">Product Specifications</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(product.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-[#e7bfb3]/20 pb-2">
                        <span className="text-[#a2786b] font-medium capitalize">{key}:</span>
                        <span className="text-[#8b5f4b] font-semibold">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="text-xl font-bold text-[#8b5f4b] mb-4">Key Features</h3>
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#d9a79a] mt-2"></div>
                        <span className="text-[#7a5650]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Care Instructions */}
                <div>
                  <h3 className="text-xl font-bold text-[#8b5f4b] mb-4">Care Instructions</h3>
                  <ul className="space-y-3">
                    {product.care.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-[#d9a79a] mt-2"></div>
                        <span className="text-[#7a5650]">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-[#8b5f4b] mb-4">Customer Reviews</h3>
                
                {/* Overall Rating */}
                <div className="bg-[#faf6f2] rounded-xl p-6 border border-[#e7bfb3]/30">
                  <div className="flex items-center gap-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d9a79a] to-[#8b5f4b]">
                        {product.rating}
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < Math.floor(product.rating) ? "fill-[#d9a79a] text-[#d9a79a]" : "text-[#e7bfb3]"}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-[#a2786b] mt-1">{product.reviews} reviews</p>
                    </div>
                    <div className="flex-1 space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-2">
                          <span className="text-sm text-[#7a5650] w-8">{stars}★</span>
                          <div className="flex-1 h-2 bg-[#e7bfb3]/30 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] rounded-full"
                              style={{ width: `${stars === 5 ? 75 : stars === 4 ? 20 : 5}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-[#a2786b] w-10">{stars === 5 ? 93 : stars === 4 ? 25 : 6}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sample Reviews */}
                <div className="space-y-4">
                  <div className="border border-[#e7bfb3]/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} className="fill-[#d9a79a] text-[#d9a79a]" />
                        ))}
                      </div>
                      <span className="text-xs text-[#a2786b]">2 days ago</span>
                    </div>
                    <h4 className="font-semibold text-[#8b5f4b] mb-2">Absolutely luxurious!</h4>
                    <p className="text-sm text-[#7a5650] leading-relaxed">
                      The silk quality is exceptional. Perfect for a comfortable night's sleep. Highly recommend!
                    </p>
                    <p className="text-xs text-[#a2786b] mt-3">- Priya S.</p>
                  </div>

                  <div className="border border-[#e7bfb3]/30 rounded-xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(4)].map((_, i) => (
                          <Star key={i} size={14} className="fill-[#d9a79a] text-[#d9a79a]" />
                        ))}
                        <Star size={14} className="text-[#e7bfb3]" />
                      </div>
                      <span className="text-xs text-[#a2786b]">1 week ago</span>
                    </div>
                    <h4 className="font-semibold text-[#8b5f4b] mb-2">Great quality</h4>
                    <p className="text-sm text-[#7a5650] leading-relaxed">
                      Beautiful nightwear with premium feel. The color is exactly as shown.
                    </p>
                    <p className="text-xs text-[#a2786b] mt-3">- Anjali M.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
