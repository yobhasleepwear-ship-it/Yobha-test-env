import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Plus, Minus } from "lucide-react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(0);

  const handleCardClick = () => {
    navigate(`/productDetail/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    setQuantity(1);
  };

  const handleIncrement = (e) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    } else {
      setQuantity(0);
    }
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case "New":
        return "bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] text-white";
      case "Bestseller":
        return "bg-gradient-to-r from-[#d9a79a] to-[#8b5f4b] text-white";
      case "Premium":
        return "bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] text-white";
      default:
        return "bg-[#8b5f4b] text-white";
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#e7bfb3]/20 overflow-hidden cursor-pointer"
    >
      {/* Badge */}
      {product.badge && (
        <div className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-semibold ${getBadgeStyle(product.badge)} shadow-md`}>
          {product.badge}
        </div>
      )}

      {/* Wishlist Icon */}
      <button 
        onClick={(e) => e.stopPropagation()}
        className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white"
      >
        <Heart size={18} className="text-[#d9a79a] hover:fill-[#d9a79a] transition-all" />
      </button>

      {/* Image Container */}
      <div className="relative w-full h-32 sm:h-36 md:h-40 lg:h-44 overflow-hidden bg-gradient-to-br from-[#fdf7f2] to-[#f8ede3]">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-2 sm:p-2.5 md:p-3">
        {/* Product Name */}
        <h3 className="text-[#8b5f4b] font-semibold text-xs sm:text-sm md:text-base mb-1 sm:mb-1.5 line-clamp-2 min-h-[2rem] sm:min-h-[2.5rem] group-hover:text-[#d9a79a] transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between mb-1.5 sm:mb-2">
          <span className="text-sm sm:text-base md:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d9a79a] to-[#8b5f4b]">
            {product.price}
          </span>
        </div>

        {/* Add to Cart Section */}
        {quantity === 0 ? (
          <button
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-[#f6d6cb] via-[#e7bfb3] to-[#d9a79a] text-white py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <ShoppingBag size={16} className="sm:w-[18px] sm:h-[18px]" />
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={handleDecrement}
              className="bg-white border-2 border-[#e7bfb3] p-2 sm:p-2.5 rounded-lg hover:bg-[#faf6f2] hover:border-[#d9a79a] transition-all duration-300 hover:scale-110"
            >
              <Minus size={14} className="text-[#d9a79a] sm:w-4 sm:h-4" />
            </button>
            
            <div className="flex-1 bg-gradient-to-r from-[#f6d6cb]/20 to-[#e7bfb3]/20 border-2 border-[#e7bfb3] rounded-lg py-2 sm:py-2.5 text-center">
              <span className="text-[#8b5f4b] font-bold text-base sm:text-lg">{quantity}</span>
            </div>
            
            <button
              onClick={handleIncrement}
              className="bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] p-2 sm:p-2.5 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-110"
            >
              <Plus size={14} className="text-white sm:w-4 sm:h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#f6d6cb] via-[#e7bfb3] to-[#d9a79a] transition-all duration-500"></div>
    </div>
  );
};

export default ProductCard;
