import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";

const WishlistPage = () => {
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Luxe Silk Night Shirt",
      category: "Nightwear",
      image: "https://i.etsystatic.com/19870219/r/il/9939a4/3877887290/il_fullxfull.3877887290_o82x.jpg",
      price: 4990,
      originalPrice: 6990,
    },
    {
      id: 2,
      name: "Premium Loungewear Set",
      category: "Loungewear",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5d96e88?w=600",
      price: 5499,
      originalPrice: 7999,
    },
    {
      id: 3,
      name: "Silk Couple Set",
      category: "Couple Sets",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5d96e88?w=600",
      price: 8999,
      originalPrice: 12999,
    },
    {
      id: 4,
      name: "Satin Night Dress",
      category: "Nightwear",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5d96e88?w=600",
      price: 3499,
      originalPrice: 5999,
    },
  ]);

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const moveToBag = (id) => {
    // In a real app, this would add the item to cart
    alert("Item added to bag!");
    removeFromWishlist(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fdfbf9] to-[#faf6f2] pt-4 lg:pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8b5f4b] mb-2">
                My Wishlist
              </h1>
              <p className="text-sm sm:text-base text-[#a2786b]">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            {wishlistItems.length > 0 && (
              <button
                onClick={() => navigate("/products")}
                className="hidden sm:flex items-center gap-2 text-[#8b5f4b] hover:text-[#d9a79a] font-medium transition-colors"
              >
                Continue Shopping
                <ArrowRight size={20} />
              </button>
            )}
          </div>
        </div>

        {wishlistItems.length === 0 ? (
          /* Empty Wishlist */
          <div className="text-center py-16 sm:py-20 md:py-24">
            <Heart size={64} className="mx-auto text-[#e7bfb3] mb-6" />
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#8b5f4b] mb-3">Your wishlist is empty</h2>
            <p className="text-base text-[#a2786b] mb-8">Save items you love for later</p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6d6cb] via-[#e7bfb3] to-[#d9a79a] text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Explore Products
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          /* Wishlist Grid - 3 items per row */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white border border-[#e7bfb3]/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-[#faf6f2]">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 hover:text-red-500 text-[#8b5f4b] transition-all"
                  >
                    <Trash2 size={18} />
                  </button>

                  {/* Discount Badge */}
                  {item.originalPrice > item.price && (
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-[#d9a79a] to-[#e7bfb3] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-3.5 sm:p-4">
                  <p className="text-xs text-[#a2786b] mb-1 uppercase tracking-wide">{item.category}</p>
                  <h3 className="font-bold text-[#8b5f4b] text-sm sm:text-base mb-2 line-clamp-2 min-h-[2.5rem]">
                    {item.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-lg sm:text-xl font-bold text-[#8b5f4b]">
                      ₹{item.price.toLocaleString()}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-xs sm:text-sm text-[#a2786b] line-through">
                        ₹{item.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Move to Bag Button */}
                  <button
                    onClick={() => moveToBag(item.id)}
                    className="w-full bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] hover:shadow-lg text-[#8b5f4b] font-bold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 text-sm"
                  >
                    <ShoppingBag size={16} />
                    Move to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;

