import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  MapPin, Plus, Edit3, Trash2, CreditCard, 
  Wallet, Building2, Smartphone, Shield, ArrowLeft, CheckCircle2
} from "lucide-react";

const CheckoutPage = () => {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: "Home",
      fullName: "Priya Sharma",
      address: "123, MG Road, Bangalore",
      city: "Bangalore",
      state: "Karnataka",
      pincode: "560001",
      phone: "+91 9876543210",
    },
    {
      id: 2,
      name: "Office",
      fullName: "Priya Sharma",
      address: "456, Sector 18, Noida",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      phone: "+91 9876543210",
    },
  ]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);
  
  const [addressForm, setAddressForm] = useState({
    name: "",
    fullName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  });

  const paymentMethods = [
    { 
      id: "upi", 
      name: "UPI", 
      icon: Smartphone, 
      description: "Google Pay, PhonePe, Paytm & more",
      popular: true
    },
    { 
      id: "card", 
      name: "Credit / Debit Card", 
      icon: CreditCard, 
      description: "Visa, Mastercard, Amex, Rupay"
    },
    { 
      id: "netbanking", 
      name: "Net Banking", 
      icon: Building2, 
      description: "All major banks supported"
    },
    { 
      id: "wallet", 
      name: "Wallets", 
      icon: Wallet, 
      description: "Paytm, PhonePe, Amazon Pay"
    },
    { 
      id: "cod", 
      name: "Cash on Delivery", 
      icon: Shield, 
      description: "Pay when you receive"
    },
  ];

  // Order summary (would come from cart in real app)
  const orderSummary = {
    subtotal: 15488,
    discount: 4501,
    couponDiscount: 0,
    deliveryCharges: 0,
    total: 10987
  };

  const removeAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    if (selectedAddress === id) {
      setSelectedAddress(null);
    }
  };

  const editAddress = (id) => {
    const addr = addresses.find(a => a.id === id);
    if (addr) {
      setAddressForm(addr);
      setEditingAddress(id);
      setShowAddressForm(true);
    }
  };

  const handleSaveAddress = () => {
    if (editingAddress) {
      setAddresses(addresses.map(addr => 
        addr.id === editingAddress ? { ...addressForm, id: editingAddress } : addr
      ));
    } else {
      const newAddress = {
        ...addressForm,
        id: Date.now()
      };
      setAddresses([...addresses, newAddress]);
    }
    setShowAddressForm(false);
    setEditingAddress(null);
    setAddressForm({
      name: "",
      fullName: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
    });
  };

  const handlePlaceOrder = () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }
    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }
    
    // Handle order placement
    alert("Order placed successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fdfbf9] to-[#faf6f2] pt-4 lg:pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2 lg:py-4">
        
        {/* Back Button & Page Title */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-[#8b5f4b] hover:text-[#d9a79a] mb-3 transition-colors"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Back to Cart</span>
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8b5f4b] mb-2">
            Checkout
          </h1>
          <p className="text-sm sm:text-base text-[#a2786b]">
            Complete your order details
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Column - Address & Payment */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Delivery Address Section */}
            <div className="bg-white border border-[#e7bfb3]/20 rounded-2xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#fdf9f6] to-[#faf6f2] px-5 sm:px-6 py-4 sm:py-5 border-b border-[#e7bfb3]/30 flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-[#8b5f4b] flex items-center gap-2">
                    <MapPin size={20} className="text-[#d9a79a]" />
                    Delivery Address
                  </h2>
                  <p className="text-xs sm:text-sm text-[#a2786b] mt-1">Select where to deliver your order</p>
                </div>
                <button
                  onClick={() => {
                    setShowAddressForm(!showAddressForm);
                    setEditingAddress(null);
                    setAddressForm({
                      name: "",
                      fullName: "",
                      address: "",
                      city: "",
                      state: "",
                      pincode: "",
                      phone: "",
                    });
                  }}
                  className="bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] hover:shadow-lg text-[#8b5f4b] px-3 sm:px-4 py-2 rounded-lg font-semibold flex items-center gap-1.5 transition-all text-xs sm:text-sm shadow-sm"
                >
                  <Plus size={16} />
                  <span className="hidden sm:inline">Add New</span>
                  <span className="sm:hidden">Add</span>
                </button>
              </div>

              <div className="p-4 sm:p-6">
                {/* Address List */}
                {addresses.length > 0 ? (
                  <div className="space-y-3 mb-4">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`block p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all shadow-sm ${
                          selectedAddress === addr.id
                            ? "border-[#d9a79a] bg-gradient-to-br from-[#fdf7f2] to-[#fef9f5] shadow-md"
                            : "border-[#e7bfb3]/20 hover:border-[#e7bfb3] hover:shadow-md bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddress === addr.id}
                          onChange={() => setSelectedAddress(addr.id)}
                          className="hidden"
                        />
                        <div className="flex justify-between items-start gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
                              <span className="font-bold text-[#8b5f4b] text-sm sm:text-base">{addr.name}</span>
                              {selectedAddress === addr.id && (
                                <CheckCircle2 size={16} className="text-[#d9a79a] flex-shrink-0" />
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-[#7a5650] font-medium">{addr.fullName}</p>
                            <p className="text-xs sm:text-sm text-[#7a5650]">{addr.address}</p>
                            <p className="text-xs sm:text-sm text-[#7a5650]">
                              {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                            <p className="text-xs sm:text-sm text-[#7a5650] mt-1">Phone: {addr.phone}</p>
                          </div>

                          {/* Edit & Remove Buttons */}
                          <div className="flex gap-1.5 sm:gap-2 flex-shrink-0">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                editAddress(addr.id);
                              }}
                              className="p-2 rounded-lg border border-[#e7bfb3]/30 hover:bg-[#faf6f2] hover:border-[#d9a79a]/30 transition-all"
                              title="Edit Address"
                            >
                              <Edit3 size={14} className="text-[#d9a79a]" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                removeAddress(addr.id);
                              }}
                              className="p-2 rounded-lg border border-[#e7bfb3]/30 hover:bg-red-50 hover:border-red-300 transition-all"
                              title="Remove Address"
                            >
                              <Trash2 size={14} className="text-red-400 hover:text-red-500" />
                            </button>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <MapPin size={48} className="mx-auto text-[#e7bfb3] mb-3" />
                    <p className="text-[#7a5650] mb-4">No saved addresses</p>
                  </div>
                )}

                {/* Add/Edit Address Form */}
                {showAddressForm && (
                  <div className="mt-4 p-4 sm:p-5 bg-gradient-to-br from-[#faf6f2] to-[#fef9f5] rounded-xl border border-[#e7bfb3]/30 shadow-sm">
                    <h3 className="font-bold text-[#8b5f4b] mb-3 sm:mb-4 text-sm sm:text-base">
                      {editingAddress ? "Edit Address" : "Add New Address"}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <input
                        type="text"
                        placeholder="Address Label (e.g., Home, Office)"
                        value={addressForm.name}
                        onChange={(e) => setAddressForm({...addressForm, name: e.target.value})}
                        className="sm:col-span-2 px-4 py-2.5 sm:py-3 rounded-lg border border-[#e7bfb3]/30 focus:border-[#d9a79a] focus:ring-2 focus:ring-[#d9a79a]/10 outline-none text-sm bg-white shadow-sm transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={addressForm.fullName}
                        onChange={(e) => setAddressForm({...addressForm, fullName: e.target.value})}
                        className="sm:col-span-2 px-4 py-2.5 sm:py-3 rounded-lg border border-[#e7bfb3]/30 focus:border-[#d9a79a] focus:ring-2 focus:ring-[#d9a79a]/10 outline-none text-sm bg-white shadow-sm transition-all"
                      />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={addressForm.phone}
                        onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                        className="sm:col-span-2 px-4 py-2.5 sm:py-3 rounded-lg border border-[#e7bfb3]/30 focus:border-[#d9a79a] focus:ring-2 focus:ring-[#d9a79a]/10 outline-none text-sm bg-white shadow-sm transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Address (House No, Building, Street)"
                        value={addressForm.address}
                        onChange={(e) => setAddressForm({...addressForm, address: e.target.value})}
                        className="sm:col-span-2 px-4 py-2.5 sm:py-3 rounded-lg border border-[#e7bfb3]/30 focus:border-[#d9a79a] focus:ring-2 focus:ring-[#d9a79a]/10 outline-none text-sm bg-white shadow-sm transition-all"
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                        className="px-4 py-2.5 sm:py-3 rounded-lg border border-[#e7bfb3]/30 focus:border-[#d9a79a] focus:ring-2 focus:ring-[#d9a79a]/10 outline-none text-sm bg-white shadow-sm transition-all"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({...addressForm, state: e.target.value})}
                        className="px-4 py-2.5 sm:py-3 rounded-lg border border-[#e7bfb3]/30 focus:border-[#d9a79a] focus:ring-2 focus:ring-[#d9a79a]/10 outline-none text-sm bg-white shadow-sm transition-all"
                      />
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={addressForm.pincode}
                        onChange={(e) => setAddressForm({...addressForm, pincode: e.target.value})}
                        className="sm:col-span-2 px-4 py-2.5 sm:py-3 rounded-lg border border-[#e7bfb3]/30 focus:border-[#d9a79a] focus:ring-2 focus:ring-[#d9a79a]/10 outline-none text-sm bg-white shadow-sm transition-all"
                      />
                      <div className="sm:col-span-2 flex gap-3 pt-2">
                        <button 
                          onClick={handleSaveAddress}
                          className="flex-1 bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] hover:shadow-lg text-[#8b5f4b] font-bold py-3 rounded-lg transition-all text-sm"
                        >
                          {editingAddress ? "Update Address" : "Save Address"}
                        </button>
                        <button
                          onClick={() => {
                            setShowAddressForm(false);
                            setEditingAddress(null);
                            setAddressForm({
                              name: "",
                              fullName: "",
                              address: "",
                              city: "",
                              state: "",
                              pincode: "",
                              phone: "",
                            });
                          }}
                          className="px-6 bg-white border-2 border-[#e7bfb3]/30 hover:bg-[#faf6f2] hover:border-[#e7bfb3] text-[#7a5650] font-semibold py-3 rounded-lg transition-all text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white border border-[#e7bfb3]/20 rounded-2xl shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#fdf9f6] to-[#faf6f2] px-5 sm:px-6 py-4 sm:py-5 border-b border-[#e7bfb3]/30">
                <h2 className="text-lg sm:text-xl font-bold text-[#8b5f4b] flex items-center gap-2">
                  <CreditCard size={20} className="text-[#d9a79a]" />
                  Payment Method
                </h2>
                <p className="text-xs sm:text-sm text-[#a2786b] mt-1">Choose how you'd like to pay</p>
              </div>

              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <label
                        key={method.id}
                        className={`block p-4 sm:p-5 rounded-xl border-2 cursor-pointer transition-all shadow-sm ${
                          selectedPayment === method.id
                            ? "border-[#d9a79a] bg-gradient-to-br from-[#fdf7f2] to-[#fef9f5] shadow-md"
                            : "border-[#e7bfb3]/20 hover:border-[#e7bfb3] hover:shadow-md bg-white"
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          checked={selectedPayment === method.id}
                          onChange={() => setSelectedPayment(method.id)}
                          className="hidden"
                        />
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg ${
                            selectedPayment === method.id 
                              ? "bg-[#d9a79a]/10 text-[#d9a79a]" 
                              : "bg-[#faf6f2] text-[#8b5f4b]"
                          }`}>
                            <IconComponent size={24} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#8b5f4b] text-sm sm:text-base">{method.name}</span>
                              {method.popular && (
                                <span className="text-xs bg-[#d9a79a] text-white px-2 py-0.5 rounded-full font-semibold">
                                  Popular
                                </span>
                              )}
                              {selectedPayment === method.id && (
                                <CheckCircle2 size={16} className="text-[#d9a79a] ml-auto" />
                              )}
                            </div>
                            <p className="text-xs sm:text-sm text-[#7a5650] mt-0.5">{method.description}</p>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-[#e7bfb3]/20 rounded-2xl shadow-lg overflow-hidden lg:sticky lg:top-24">
              {/* Header */}
              <div className="bg-gradient-to-r from-[#fdf9f6] to-[#faf6f2] px-5 sm:px-6 py-4 border-b border-[#e7bfb3]/30">
                <h2 className="text-lg sm:text-xl font-bold text-[#8b5f4b]">Order Summary</h2>
                <p className="text-xs sm:text-sm text-[#a2786b] mt-1">Review your order</p>
              </div>

              <div className="p-4 sm:p-6">
                <div className="space-y-3 pb-4 border-b border-[#e7bfb3]/20">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#7a5650]">Subtotal</span>
                    <span className="text-[#8b5f4b] font-semibold">₹{orderSummary.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#7a5650]">Discount</span>
                    <span className="text-[#d9a79a] font-bold">-₹{orderSummary.discount.toLocaleString()}</span>
                  </div>
                  {orderSummary.couponDiscount > 0 && (
                    <div className="flex justify-between text-sm bg-gradient-to-r from-[#fdf7f2] to-transparent px-2 py-1.5 rounded-lg -mx-2">
                      <span className="text-[#7a5650]">Coupon Discount</span>
                      <span className="text-[#d9a79a] font-bold">-₹{orderSummary.couponDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-[#7a5650]">Delivery Charges</span>
                    {orderSummary.deliveryCharges === 0 ? (
                      <span className="text-[#d9a79a] font-bold">FREE</span>
                    ) : (
                      <span className="text-[#8b5f4b] font-semibold">₹{orderSummary.deliveryCharges}</span>
                    )}
                  </div>
                </div>

                <div className="flex justify-between pt-4 pb-5 bg-gradient-to-br from-[#fdf9f6] to-transparent -mx-6 px-6 mb-6">
                  <span className="text-lg font-bold text-[#8b5f4b]">Total Amount</span>
                  <span className="text-lg font-bold text-[#8b5f4b]">₹{orderSummary.total.toLocaleString()}</span>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={!selectedAddress || !selectedPayment}
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all text-base shadow-lg flex items-center justify-center gap-2 ${
                    selectedAddress && selectedPayment
                      ? "bg-gradient-to-r from-[#f6d6cb] via-[#e7bfb3] to-[#d9a79a] hover:shadow-xl hover:scale-[1.02] cursor-pointer"
                      : "bg-[#e7bfb3]/50 cursor-not-allowed"
                  }`}
                >
                  <Shield size={20} />
                  Place Order
                </button>

                {(!selectedAddress || !selectedPayment) && (
                  <p className="text-xs text-[#a2786b] text-center mt-3">
                    {!selectedAddress && "Please select a delivery address"}
                    {!selectedAddress && !selectedPayment && " and "}
                    {!selectedPayment && "Please select a payment method"}
                  </p>
                )}

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-[#e7bfb3]/20">
                  <div className="flex items-center gap-2 text-xs text-[#7a5650] justify-center">
                    <Shield size={16} className="text-[#d9a79a]" />
                    <span>100% Secure & Safe Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

