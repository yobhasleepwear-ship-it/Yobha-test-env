import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Star, ChevronLeft, ChevronRight } from "lucide-react";

const ProductCard = ({ product }) => {
  console.log(product,"fromhere")
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Product images (use multiple if available, otherwise fallback to single image)
  const images = product.images || [product.img];
  const hasMultipleImages = images.length > 1;

  const handleCardClick = () => {
    navigate(`/productDetail/${product.id}`);
  };

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index, e) => {
    e.stopPropagation();
    setCurrentImageIndex(index);
  };

  const getBadgeStyle = (badge) => {
    switch (badge) {
      case "New":
        return "bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] text-white";
      case "Bestseller":
        return "bg-gradient-to-r from-[#d9a79a] to-[#8b5f4b] text-white";
      case "Premium":
        return "bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] text-[#8b5f4b]";
      default:
        return "bg-[#8b5f4b] text-white";
    }
  };

  // Mock rating (in real app would come from product data)
  const rating = product.rating || 4.5;
  const reviewCount = product.reviewCount || 128;

  return (
    <div 
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl overflow-hidden border border-[#e7bfb3]/20 hover:border-[#d9a79a]/40 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col"
    >
      {/* Image Container with Carousel */}
      <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden bg-gradient-to-br from-[#fdf9f6] to-[#faf6f2]">
        {/* Carousel Images */}
        <div className="relative w-full h-full">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${product.name} - ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                index === currentImageIndex 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-95'
              } group-hover:scale-105`}
            />
          ))}
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Navigation Arrows - Only show if multiple images and on hover */}
        {hasMultipleImages && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 hover:bg-white transition-all z-20"
            >
              <ChevronLeft size={16} className="text-[#8b5f4b]" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md opacity-0 group-hover:opacity-100 hover:bg-white transition-all z-20"
            >
              <ChevronRight size={16} className="text-[#8b5f4b]" />
            </button>
          </>
        )}

        {/* Badge */}
        {product.badge && (
          <div className={`absolute top-2 left-2 z-10 px-2.5 py-1 rounded-full text-xs font-bold ${getBadgeStyle(product.badge)} shadow-md`}>
            {product.badge}
          </div>
        )}

        {/* Wishlist Icon */}
        <button 
          onClick={handleWishlist}
          className={`absolute top-2 right-2 z-10 p-2 rounded-full shadow-md backdrop-blur-sm transition-all duration-300 ${
            isWishlisted 
              ? 'bg-[#d9a79a]' 
              : 'bg-white/90 hover:bg-white'
          }`}
        >
          <Heart 
            size={16} 
            className={`transition-all ${
              isWishlisted 
                ? 'text-white fill-white' 
                : 'text-[#d9a79a]'
            }`} 
          />
        </button>

        {/* Image Indicator Dots - Only show if multiple images */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => goToImage(index, e)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentImageIndex 
                    ? 'w-6 bg-white' 
                    : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {/* Product Name */}
        <h3 className="text-[#8b5f4b] font-bold text-sm sm:text-base mb-1.5 line-clamp-2 group-hover:text-[#d9a79a] transition-colors leading-snug">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-[#a2786b] text-xs mb-2 line-clamp-2 leading-relaxed">
          {product.description || "Luxurious comfort meets timeless elegance. Crafted with premium materials for the perfect night's rest."}
        </p>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                size={12}
                className={`${
                  index < Math.floor(rating)
                    ? 'fill-[#d9a79a] text-[#d9a79a]'
                    : index < rating
                    ? 'fill-[#d9a79a]/50 text-[#d9a79a]'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-[#a2786b]">
            {rating} ({reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto">
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-[#d9a79a] to-[#8b5f4b] bg-clip-text text-transparent">
            {product.price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
