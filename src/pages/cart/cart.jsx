import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Plus, Minus, Heart, Trash2, Tag, 
  ChevronRight, Gift, Shield, Package, ShoppingBag, ArrowRight
} from "lucide-react";

const CartPage = () => {
  const navigate = useNavigate();
  
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Luxe Silk Night Shirt",
      size: "M",
      color: "Rose Gold",
      image: "https://i.etsystatic.com/19870219/r/il/9939a4/3877887290/il_fullxfull.3877887290_o82x.jpg",
      price: 4990,
      originalPrice: 6990,
      quantity: 1,
      selected: true,
    },
    {
      id: 2,
      name: "Premium Loungewear Set",
      size: "L",
      color: "Champagne",
      image: "https://images.unsplash.com/photo-1618354691373-d851c5d96e88?w=600",
      price: 5499,
      originalPrice: 7999,
      quantity: 2,
      selected: true,
    },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const coupons = [
    { code: "YOBHA30", discount: 30, description: "Flat 30% off on all products" },
    { code: "FIRST100", discount: 100, description: "₹100 off on first order" },
    { code: "SILK20", discount: 20, description: "20% off on silk collection" },
  ];

  // Handle quantity change
  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  // Toggle item selection
  const toggleSelection = (id) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  // Remove item
  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  // Move to wishlist
  const moveToWishlist = (id) => {
    removeItem(id);
  };

  // Apply coupon
  const applyCoupon = () => {
    const coupon = coupons.find(c => c.code === couponCode);
    if (coupon) {
      setAppliedCoupon(coupon);
    } else {
      alert("Invalid coupon code");
    }
  };

  // Calculate totals
  const selectedItems = cartItems.filter(item => item.selected);
  const originalTotal = selectedItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountOnMRP = originalTotal - subtotal;
  const couponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
  const deliveryCharges = subtotal > 1000 ? 0 : 99;
  const totalAmount = subtotal - couponDiscount + deliveryCharges;

  const handleProceedToCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Please select items to checkout");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fdfbf9] to-[#faf6f2] pt-4 lg:pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Page Title */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8b5f4b] mb-2">
            Shopping Cart
          </h1>
          <p className="text-sm sm:text-base text-[#a2786b]">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <div className="text-center py-16 sm:py-20 md:py-24">
            <ShoppingBag size={64} className="mx-auto text-[#e7bfb3] mb-6" />
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#8b5f4b] mb-3">Your cart is empty</h2>
            <p className="text-base text-[#a2786b] mb-8">Discover our premium collection</p>
            <button
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6d6cb] via-[#e7bfb3] to-[#d9a79a] text-white px-8 py-3.5 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Continue Shopping
              <ArrowRight size={20} />
            </button>
          </div>
        ) : (
          /* Cart Content */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left Column - Cart Items & Coupons */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cart Items Card */}
              <div className="bg-white border border-[#e7bfb3]/20 rounded-2xl shadow-lg overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#fdf9f6] to-[#faf6f2] px-5 sm:px-6 py-4 sm:py-5 border-b border-[#e7bfb3]/30">
                  <h2 className="text-lg sm:text-xl font-bold text-[#8b5f4b]">
                    Your Items ({cartItems.length})
                  </h2>
                  <p className="text-xs sm:text-sm text-[#a2786b] mt-1">Review and manage your selections</p>
                </div>

                {/* Cart Items List */}
                <div className="divide-y divide-[#e7bfb3]/20">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-6 hover:bg-[#fdfbf9] transition-colors"
                    >
                      <div className="flex gap-4">
                        {/* Checkbox */}
                        <div className="flex items-start pt-1">
                          <input
                            type="checkbox"
                            checked={item.selected}
                            onChange={() => toggleSelection(item.id)}
                            className="w-5 h-5 rounded border-[#e7bfb3] text-[#d9a79a] focus:ring-[#e7bfb3] cursor-pointer accent-[#d9a79a]"
                          />
                        </div>

                        {/* Product Image */}
                        <div className="w-20 sm:w-24 md:w-28 h-28 sm:h-32 md:h-36 rounded-xl overflow-hidden border border-[#e7bfb3]/30 flex-shrink-0 shadow-sm">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-[#8b5f4b] text-sm sm:text-base md:text-lg mb-1 sm:mb-2 line-clamp-2">
                            {item.name}
                          </h3>
                          <div className="flex flex-wrap gap-2 sm:gap-3 mb-2 sm:mb-3 text-xs sm:text-sm text-[#7a5650]">
                            <span>Size: <span className="font-semibold">{item.size}</span></span>
                            <span className="hidden sm:inline">•</span>
                            <span>Color: <span className="font-semibold">{item.color}</span></span>
                          </div>
                          
                          {/* Price */}
                          <div className="flex flex-wrap items-baseline gap-2 mb-3 sm:mb-4">
                            <span className="text-lg sm:text-xl md:text-2xl font-bold text-[#8b5f4b]">
                              ₹{item.price.toLocaleString()}
                            </span>
                            <span className="text-sm sm:text-base text-[#a2786b] line-through">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-xs sm:text-sm text-[#d9a79a] font-bold bg-[#fdf7f2] px-2 py-0.5 rounded-full">
                              {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                            </span>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                            {/* Quantity Selector */}
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm text-[#7a5650] mr-1">Qty:</span>
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border-2 border-[#e7bfb3] rounded-lg hover:bg-[#faf6f2] transition-all"
                              >
                                <Minus size={14} className="text-[#d9a79a]" />
                              </button>
                              <span className="w-10 text-center font-bold text-sm sm:text-base text-[#8b5f4b]">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center border-2 border-[#e7bfb3] rounded-lg hover:bg-[#faf6f2] transition-all"
                              >
                                <Plus size={14} className="text-[#d9a79a]" />
                              </button>
                            </div>

                            {/* Move to Wishlist */}
                            <button
                              onClick={() => moveToWishlist(item.id)}
                              className="flex items-center gap-1.5 text-xs sm:text-sm text-[#7a5650] hover:text-[#d9a79a] transition-colors font-medium"
                            >
                              <Heart size={16} />
                              <span className="hidden sm:inline">Wishlist</span>
                            </button>

                            {/* Remove */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="flex items-center gap-1.5 text-xs sm:text-sm text-[#7a5650] hover:text-red-500 transition-colors font-medium"
                            >
                              <Trash2 size={16} />
                              <span className="hidden sm:inline">Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Coupons Section - Inside Cart Items Card */}
                <div className="border-t border-[#e7bfb3]/20">
                  <div className="bg-gradient-to-r from-[#fdf9f6] to-[#faf6f2] px-5 sm:px-6 py-4 border-b border-[#e7bfb3]/30">
                    <h2 className="text-lg sm:text-xl font-bold text-[#8b5f4b] flex items-center gap-2">
                      <Tag size={20} className="text-[#d9a79a]" />
                      Apply Coupon
                    </h2>
                    <p className="text-xs sm:text-sm text-[#a2786b] mt-1">Save more on your order</p>
                  </div>

                  <div className="p-4 sm:p-6">
                  {/* Coupon Input */}
                  <div className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Enter code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 px-4 py-3 rounded-lg border border-[#e7bfb3]/30 focus:border-[#d9a79a] focus:ring-2 focus:ring-[#d9a79a]/10 outline-none text-sm uppercase font-medium shadow-sm transition-all"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] hover:shadow-lg text-[#8b5f4b] font-bold px-5 sm:px-6 py-3 rounded-lg transition-all text-sm"
                    >
                      Apply
                    </button>
                  </div>

                  {/* Applied Coupon */}
                  {appliedCoupon && (
                    <div className="bg-gradient-to-br from-[#fdf7f2] to-[#fef9f5] border-2 border-[#d9a79a] rounded-xl p-4 mb-4 flex items-center justify-between shadow-sm">
                      <div>
                        <p className="text-sm font-bold text-[#d9a79a]">{appliedCoupon.code}</p>
                        <p className="text-xs text-[#7a5650] mt-0.5">You saved ₹{couponDiscount}!</p>
                      </div>
                      <button
                        onClick={() => {
                          setAppliedCoupon(null);
                          setCouponCode("");
                        }}
                        className="text-[#a2786b] hover:text-red-500 p-2 hover:bg-white/50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}

                  {/* Available Coupons */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold text-[#7a5650] uppercase tracking-wide">Available Coupons</p>
                    {coupons.map((coupon) => (
                      <button
                        key={coupon.code}
                        onClick={() => {
                          setCouponCode(coupon.code);
                          setAppliedCoupon(coupon);
                        }}
                        className="w-full p-3.5 sm:p-4 border border-[#e7bfb3]/30 rounded-xl hover:bg-gradient-to-br hover:from-[#faf6f2] hover:to-[#fef9f5] hover:border-[#d9a79a]/30 hover:shadow-md transition-all text-left group"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-[#8b5f4b] mb-1">{coupon.code}</p>
                            <p className="text-xs text-[#7a5650] leading-relaxed">{coupon.description}</p>
                          </div>
                          <ChevronRight size={16} className="text-[#d9a79a] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </button>
                    ))}
                  </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Price Details Only */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[#e7bfb3]/20 rounded-2xl shadow-lg overflow-hidden lg:sticky lg:top-24">
                <div className="bg-gradient-to-r from-[#fdf9f6] to-[#faf6f2] px-5 sm:px-6 py-4 border-b border-[#e7bfb3]/30">
                  <h2 className="text-lg sm:text-xl font-bold text-[#8b5f4b]">Price Details</h2>
                  <p className="text-xs sm:text-sm text-[#a2786b] mt-1">Summary of your order</p>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="space-y-3 pb-4 border-b border-[#e7bfb3]/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#7a5650]">Total MRP</span>
                      <span className="text-[#8b5f4b] font-semibold">₹{originalTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#7a5650]">Discount on MRP</span>
                      <span className="text-[#d9a79a] font-bold">-₹{discountOnMRP.toLocaleString()}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between text-sm bg-gradient-to-r from-[#fdf7f2] to-transparent px-2 py-1.5 rounded-lg -mx-2">
                        <span className="text-[#7a5650]">Coupon Discount</span>
                        <span className="text-[#d9a79a] font-bold">-₹{couponDiscount}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-[#7a5650]">Delivery Charges</span>
                      {deliveryCharges === 0 ? (
                        <span className="text-[#d9a79a] font-bold">FREE</span>
                      ) : (
                        <span className="text-[#8b5f4b] font-semibold">₹{deliveryCharges}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 pb-5 bg-gradient-to-br from-[#fdf9f6] to-transparent -mx-6 px-6 mb-5">
                    <span className="text-lg font-bold text-[#8b5f4b]">Total Amount</span>
                    <span className="text-lg font-bold text-[#8b5f4b]">₹{totalAmount.toLocaleString()}</span>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-2.5 mb-6 bg-gradient-to-br from-[#faf6f2] to-[#fef9f5] -mx-6 px-6 py-4 border-y border-[#e7bfb3]/20">
                    <p className="text-xs font-semibold text-[#7a5650] uppercase tracking-wide mb-2">Why Shop With Us</p>
                    <div className="flex items-center gap-2.5 text-xs text-[#7a5650]">
                      <Shield size={14} className="text-[#d9a79a]" />
                      <span>Safe and secure payments</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-[#7a5650]">
                      <Package size={14} className="text-[#d9a79a]" />
                      <span>Premium packaging & fast delivery</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-[#7a5650]">
                      <Gift size={14} className="text-[#d9a79a]" />
                      <span>Free gift wrap on request</span>
                    </div>
                  </div>

                  {/* Proceed to Checkout Button */}
                  <button
                    onClick={handleProceedToCheckout}
                    disabled={selectedItems.length === 0}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all text-base shadow-lg flex items-center justify-center gap-2 ${
                      selectedItems.length > 0
                        ? "bg-gradient-to-r from-[#f6d6cb] via-[#e7bfb3] to-[#d9a79a] hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                        : "bg-[#e7bfb3]/50 cursor-not-allowed"
                    }`}
                  >
                    Proceed to Checkout
                    <ArrowRight size={20} />
                  </button>

                  {selectedItems.length === 0 && (
                    <p className="text-xs text-[#a2786b] text-center mt-3">
                      Please select items to checkout
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
