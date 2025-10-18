import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Banknote, Truck, RotateCcw, Shield, ChevronDown, Pencil } from "lucide-react";
import { getAddresses, addAddress, updateAddress } from "../../service/address";
import { getCartDetails } from "../../service/productAPI";
import { CreateOrder } from "../../service/order";
import { message } from "../../comman/toster-message/ToastContainer";
import { getCoupons } from "../../service/coupans";

const CheckoutPage = () => {
  const navigate = useNavigate();

  // Address State
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    landmark: '',
  });
  const [addressErrors, setAddressErrors] = useState({});
  const [userAddresses, setUserAddresses] = useState([]);
  const [useSavedAddress, setUseSavedAddress] = useState(true);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [isDeliveryExpanded, setIsDeliveryExpanded] = useState(true);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

  // Payment State
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Order & Cart State
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartSummary, setCartSummary] = useState({
    totalItems: 0,
    distinctItems: 0,
    subTotal: 0,
    shipping: 0,
    tax: 0,
    discount: 0,
    grandTotal: 0,
    currency: "INR"
  });
  const [userId, setUserId] = useState("")

  // Payment Methods
  const paymentMethods = [
    {
      id: "prepaid",
      name: "Prepaid",
      icon: CreditCard,
      description: "Pay online via card or UPI"
    },
    {
      id: "cod",
      name: "Cash on Delivery",
      icon: Banknote,
      description: "Pay when you receive"
    },
  ];

  // Fetch addresses and cart
  useEffect(() => {
    const raw = localStorage.getItem("user");
    const user = JSON.parse(raw); // first parse
    const parsedUser = typeof user === "string" ? JSON.parse(user) : user;
    setUserId(parsedUser.id);
    fetchAddresses();
    fetchCart();
    CoupansUser();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getAddresses();
      const addresses = response.data || [];
      setUserAddresses(addresses);
      
      // If addresses exist, use the first one by default
      if (addresses.length > 0) {
        setAddress(addresses[0]);
        setUseSavedAddress(true);
      } else {
        // If no addresses exist, set to manual entry mode
        setUseSavedAddress(false);
      }
    } catch (err) {
      console.log("Failed to fetch addresses");
      // If API fails, default to manual entry
      setUseSavedAddress(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await getCartDetails();
      const items = response.data.items || [];
      setCartItems(items);

      // Calculate summary dynamically using same logic as cart page
      const subTotal = items.reduce((sum, item) => {
        const product = item?.product || {};
        const priceList = product?.priceList || [];
        
        if (!priceList || priceList.length === 0) {
          return sum + (product?.unitPrice || 0) * item.quantity;
        }

        // Find matching price based on currency and size
        const matchingPrice = priceList.find(price => 
          price.currency === product.currency && 
          price.size === product.size
        );

        const correctPrice = matchingPrice ? matchingPrice.priceAmount : (product?.unitPrice || 0);
        return sum + (correctPrice * item.quantity);
      }, 0);

      // Calculate shipping using countryPrice like cart page
      let totalShipping = 0;
      items.forEach(item => {
        const countryPrice = item?.product?.countryPrice;
        if (countryPrice && countryPrice.priceAmount !== undefined) {
          totalShipping += countryPrice.priceAmount;
        }
      });

      const discount = 0;
      const tax = 0;
      const grandTotal = subTotal + totalShipping + tax - discount;

      setCartSummary({
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
        distinctItems: items.length,
        subTotal,
        shipping: totalShipping,
        tax,
        discount,
        grandTotal,
        currency: "INR"
      });
    } catch (err) {
      console.log(err || "Failed to fetch cart");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
    if (addressErrors[name]) {
      setAddressErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddAddress = async () => {
    // Validate required fields
    const requiredFields = ['fullName', 'phone', 'addressLine1', 'city', 'state', 'pincode'];
    const errors = {};
    
    requiredFields.forEach(field => {
      if (!address[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    if (Object.keys(errors).length > 0) {
      setAddressErrors(errors);
      return;
    }
    
    try {
      setIsAddingAddress(true);
      
      // Map form fields to API expected fields
      const addressPayload = {
        fullName: address.fullName,
        phone: address.phone,
        line1: address.addressLine1,
        line2: address.addressLine2 || '',
        city: address.city,
        state: address.state,
        zip: address.pincode,
        country: address.country,
        landmark: address.landmark || ''
      };
      
      // Log the address object being sent
      console.log("Sending address data:", addressPayload);
      
      const response = await addAddress(addressPayload);
      
      console.log("Add address response:", response);
      
      if (response.success) {
        message.success("Address added successfully!");
        // Refresh addresses list
        await fetchAddresses();
        // Switch to saved address mode and select the new address
        setUseSavedAddress(true);
        setAddress(response.data);
      }
    } catch (err) {
      console.error("Failed to add address - Full error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      message.error(`Failed to add address: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsAddingAddress(false);
    }
  };

  const handleEditAddress = (addressToEdit) => {
    setIsEditingAddress(true);
    setEditingAddressId(addressToEdit.id);
    setAddress({
      fullName: addressToEdit.fullName,
      phone: addressToEdit.phone,
      addressLine1: addressToEdit.line1,
      addressLine2: addressToEdit.line2 || '',
      city: addressToEdit.city,
      state: addressToEdit.state,
      pincode: addressToEdit.zip,
      country: addressToEdit.country,
      landmark: addressToEdit.landmark || ''
    });
    setUseSavedAddress(false);
  };

  const handleUpdateAddress = async () => {
    // Validate required fields
    const requiredFields = ['fullName', 'phone', 'addressLine1', 'city', 'state', 'pincode'];
    const errors = {};
    
    requiredFields.forEach(field => {
      if (!address[field]) {
        errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });
    
    if (Object.keys(errors).length > 0) {
      setAddressErrors(errors);
      return;
    }
    
    try {
      setIsAddingAddress(true);
      
      // Map form fields to API expected fields
      const addressPayload = {
        fullName: address.fullName,
        phone: address.phone,
        line1: address.addressLine1,
        line2: address.addressLine2 || '',
        city: address.city,
        state: address.state,
        zip: address.pincode,
        country: address.country,
        landmark: address.landmark || ''
      };
      
      const response = await updateAddress(editingAddressId, addressPayload);
      
      if (response.success) {
        message.success("Address updated successfully!");
        // Refresh addresses list
        await fetchAddresses();
        // Reset edit state
        setIsEditingAddress(false);
        setEditingAddressId(null);
        // Switch to saved address mode and select the updated address
        setUseSavedAddress(true);
        setAddress(response.data);
      }
    } catch (err) {
      console.error("Failed to update address:", err);
      message.error(`Failed to update address: ${err.response?.data?.message || err.message}`);
    } finally {
      setIsAddingAddress(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingAddress(false);
    setEditingAddressId(null);
    setAddress({
      fullName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      pincode: '',
      country: 'India',
      landmark: '',
    });
    setAddressErrors({});
  };

  const validateAddress = (addr) => {
    const errors = {};
    if (!addr.fullName) errors.fullName = "Full name is required";
    if (!addr.phone) errors.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(addr.phone.replace(/\D/g, ''))) errors.phone = "Enter valid 10-digit number";
    if (!addr.addressLine1) errors.addressLine1 = "Address Line 1 is required";
    if (!addr.city) errors.city = "City is required";
    if (!addr.state) errors.state = "State is required";
    if (!addr.pincode) errors.pincode = "Pincode is required";
    else if (!/^[0-9]{6}$/.test(addr.pincode)) errors.pincode = "Enter valid 6-digit pincode";
    return errors;
  };

  const handlePlaceOrder = () => {
    // const errors = validateAddress(address);
    // if (Object.keys(errors).length > 0) {
    //   setAddressErrors(errors);
    //   message.error("please provide correct address")
    //   return;
    // }
    if (!selectedPayment) {
      message.error("Please select a payment method");
      return;
    }

    // console.log(user,"user")
    // const userId = user.id || "anonymous";
    // console.log(userId)
    const payload = {
  "couponCode": "FIRST100",
  "loyaltyDiscountAmount": 150,
  "paymentMethod": "COD",
  "shippingAddress": {
    "fullName": "Samrat Sarotra",
    "line1": "Flat 302, Yuhanns Empire",
    "line2": "Murugeshpalya",
    "city": "Bangalore",
    "state": "Karnataka",
    "zip": "560017",
    "country": "India",
    "isDefault": true
  }
};


    console.log("Order Payload:", payload);


    setIsProcessing(true);
    try {
      const response = CreateOrder(payload)
      console.log(response);
      message.success("Order Created SuccessFully");
      // navigate("/orders")

    }
    catch (err) {
      console.log(err)
      message.error("Please Try Again")
    }
    finally{
      setIsProcessing(false)
    }
  };

const CoupansUser = async()=>{
  try{
    const response =await getCoupons(1200);

  }
  catch(err){
    console.log(err)
  }
}
  const formatPrice = (price) => {
    return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  return (
    <div className="min-h-screen bg-premium-cream font-sans">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 md:py-12">

        {/* Back Button & Header */}
        <div className="mb-8 md:mb-12">
          <button onClick={() => navigate("/cart")} className="flex items-center gap-2 text-text-medium hover:text-black mb-4 transition-colors">
            <ArrowLeft size={20} strokeWidth={1.5} />
            <span className="text-sm uppercase tracking-wider">Back to Cart</span>
          </button>
          <h1 className="text-3xl md:text-5xl font-bold text-black uppercase tracking-wide mb-2">
            Checkout
          </h1>
          <p className="text-text-medium text-sm md:text-base">Complete your order details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">

            {/* Delivery Address */}
            <div className="bg-white border border-text-light/20">
              <div 
                className="px-4 md:px-6 py-4 md:py-5 border-b border-text-light/20 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setIsDeliveryExpanded(!isDeliveryExpanded)}
              >
                <h2 className="text-base md:text-lg font-bold text-black uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={20} strokeWidth={1.5} />
                  Delivery Address
                </h2>
                <ChevronDown 
                  size={20} 
                  className={`text-text-medium transition-transform duration-200 ${
                    isDeliveryExpanded ? 'rotate-180' : ''
                  }`} 
                  strokeWidth={1.5} 
                />
              </div>

              {isDeliveryExpanded && (
                <div className="p-4 md:p-6">
                  {/* Radio Button Toggle - Only show when addresses exist */}
                  {userAddresses.length > 0 && (
                    <div className="mb-6 pb-4 border-b border-text-light/20">
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="radio"
                            checked={useSavedAddress}
                            onChange={() => setUseSavedAddress(true)}
                            className="accent-black"
                          />
                          <span className="font-medium">Use Saved Address</span>
                        </label>
                        <label className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="radio"
                            checked={!useSavedAddress}
                            onChange={() => setUseSavedAddress(false)}
                            className="accent-black"
                          />
                          <span className="font-medium">Enter Manually</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Address Content */}
                  {userAddresses.length > 0 && useSavedAddress ? (
                    <div className="space-y-3">
                      {userAddresses.map((addr, index) => (
                        <div 
                          key={addr.id} 
                          className={`p-4 border-2  cursor-pointer transition-all ${
                            address.id === addr.id 
                              ? 'border-black bg-premium-beige' 
                              : 'border-text-light/20 hover:border-text-dark bg-white'
                          }`}
                          onClick={() => setAddress(addr)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <input
                                  type="radio"
                                  checked={address.id === addr.id}
                                  onChange={() => setAddress(addr)}
                                  className="accent-black"
                                />
                                <h3 className="font-semibold text-black text-sm md:text-base">
                                  {addr.fullName}
                                </h3>
                              </div>
                              <div className="text-xs md:text-sm text-text-medium space-y-1 ml-6">
                                <p>{addr.line1}</p>
                                {addr.line2 && <p>{addr.line2}</p>}
                                <p>{addr.city}, {addr.state} - {addr.zip}</p>
                                <p>{addr.country}</p>
                                {addr.landmark && <p>Landmark: {addr.landmark}</p>}
                              </div>
                            </div>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAddress(addr);
                              }}
                              className="ml-3 px-3 py-2 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors flex items-center gap-1"
                            >
                              <Pencil size={12} strokeWidth={1.5} />
                              Edit
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Form Header */}
                      {isEditingAddress && (
                        <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 ">
                          <p className="text-sm text-blue-800 font-medium">Editing Address</p>
                          <button
                            onClick={handleCancelEdit}
                            className="text-xs text-blue-600 hover:text-blue-800 underline"
                          >
                            Cancel Edit
                          </button>
                        </div>
                      )}
                      
                      {/* Form Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                          <input
                            type="text"
                            name="fullName"
                            value={address.fullName}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-3 border-2 focus:outline-none text-sm transition-colors ${
                              addressErrors.fullName 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-300 focus:border-black hover:border-gray-400'
                            }`}
                          />
                          {addressErrors.fullName && <p className="text-xs text-red-500 mt-1">{addressErrors.fullName}</p>}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={address.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className={`w-full px-4 py-3 border-2 focus:outline-none text-sm transition-colors ${
                              addressErrors.phone 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-300 focus:border-black hover:border-gray-400'
                            }`}
                          />
                          {addressErrors.phone && <p className="text-xs text-red-500 mt-1">{addressErrors.phone}</p>}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 1 *</label>
                          <input
                            type="text"
                            name="addressLine1"
                            value={address.addressLine1}
                            onChange={handleInputChange}
                            placeholder="Street address, building, house number"
                            className={`w-full px-4 py-3 border-2 focus:outline-none text-sm transition-colors ${
                              addressErrors.addressLine1 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-300 focus:border-black hover:border-gray-400'
                            }`}
                          />
                          {addressErrors.addressLine1 && <p className="text-xs text-red-500 mt-1">{addressErrors.addressLine1}</p>}
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address Line 2</label>
                          <input
                            type="text"
                            name="addressLine2"
                            value={address.addressLine2}
                            onChange={handleInputChange}
                            placeholder="Apartment, suite, unit, etc. (Optional)"
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black hover:border-gray-400 focus:outline-none text-sm  transition-colors"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={address.city}
                            onChange={handleInputChange}
                            placeholder="Enter city"
                            className={`w-full px-4 py-3 border-2 focus:outline-none text-sm  transition-colors ${
                              addressErrors.city 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-300 focus:border-black hover:border-gray-400'
                            }`}
                          />
                          {addressErrors.city && <p className="text-xs text-red-500 mt-1">{addressErrors.city}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                          <input
                            type="text"
                            name="state"
                            value={address.state}
                            onChange={handleInputChange}
                            placeholder="Enter state"
                            className={`w-full px-4 py-3 border-2 focus:outline-none text-sm  transition-colors ${
                              addressErrors.state 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-300 focus:border-black hover:border-gray-400'
                            }`}
                          />
                          {addressErrors.state && <p className="text-xs text-red-500 mt-1">{addressErrors.state}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Pincode *</label>
                          <input
                            type="text"
                            name="pincode"
                            value={address.pincode}
                            onChange={handleInputChange}
                            placeholder="Enter pincode"
                            maxLength={6}
                            className={`w-full px-4 py-3 border-2 focus:outline-none text-sm  transition-colors ${
                              addressErrors.pincode 
                                ? 'border-red-500 bg-red-50' 
                                : 'border-gray-300 focus:border-black hover:border-gray-400'
                            }`}
                          />
                          {addressErrors.pincode && <p className="text-xs text-red-500 mt-1">{addressErrors.pincode}</p>}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                          <input
                            type="text"
                            name="landmark"
                            value={address.landmark}
                            onChange={handleInputChange}
                            placeholder="Nearby landmark (Optional)"
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:border-black hover:border-gray-400 focus:outline-none text-sm  transition-colors"
                          />
                        </div>
                      </div>
                    </div>
                )}
                
                {/* Action Buttons - Show when no addresses exist OR when in manual entry mode */}
                {(userAddresses.length === 0 || !useSavedAddress) && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={isEditingAddress ? handleUpdateAddress : handleAddAddress}
                        disabled={isAddingAddress}
                        className="flex-1 bg-black text-white py-3 px-6 font-semibold hover:bg-gray-800 transition-colors uppercase tracking-wider text-sm flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed "
                      >
                        {isAddingAddress ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>{isEditingAddress ? 'Updating...' : 'Adding...'}</span>
                          </>
                        ) : (
                          <>
                            <MapPin size={16} strokeWidth={1.5} />
                            {isEditingAddress ? 'Update Address' : 'Add Address'}
                          </>
                        )}
                      </button>
                      
                      {isEditingAddress && (
                        <button
                          onClick={handleCancelEdit}
                          disabled={isAddingAddress}
                          className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed "
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                )}
                </div>
              )}
            </div>

            {/* Payment Section */}
            <div className="bg-white border border-text-light/20">
              <div className="px-4 md:px-6 py-4 md:py-5 border-b border-text-light/20">
                <h2 className="text-base md:text-lg font-bold text-black uppercase tracking-wider flex items-center gap-2">
                  <CreditCard size={20} strokeWidth={1.5} />
                  Payment Method
                </h2>
                <p className="text-xs md:text-sm text-text-medium mt-1">
                  Choose your payment option
                </p>
              </div>
              <div className="p-4 md:p-6 space-y-3">
                {paymentMethods.map(method => {
                  const IconComponent = method.icon;
                  return (
                    <label
                      key={method.id}
                      className={`block p-4 border-2 cursor-pointer transition-all ${selectedPayment?.id === method.id ? "border-black bg-premium-beige" : "border-text-light/20 hover:border-text-dark bg-white"}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={selectedPayment?.id === method.id}
                        onChange={() => setSelectedPayment(method)}
                        className="hidden"
                      />
                      <div className="flex items-center gap-4">
                        <div className={`p-3 ${selectedPayment?.id === method.id ? "bg-black text-white" : "bg-premium-beige text-black"}`}>
                          <IconComponent size={22} strokeWidth={1.5} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-semibold text-black text-sm md:text-base">{method.name}</span>
                          </div>
                          <p className="text-xs md:text-sm text-text-medium mt-1">{method.description}</p>
                        </div>
                        {selectedPayment?.id === method.id && (
                          <div className="flex-shrink-0">
                            <div className="w-5 h-5 border-2 border-black bg-black flex items-center justify-center">
                              <div className="w-2 h-2 bg-white"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-text-light/20 lg:sticky lg:top-24">
              <div className="p-4 md:p-6 border-b border-text-light/20">
                <h2 className="text-base md:text-lg font-bold text-black uppercase tracking-wider mb-1">
                  Order Summary
                </h2>
                <p className="text-xs md:text-sm text-text-medium">{cartSummary.distinctItems} {cartSummary.distinctItems === 1 ? 'item' : 'items'}</p>
              </div>

              <div className="p-4 md:p-6 space-y-3">
                {cartItems.map(item => {
                  // Calculate correct price using same logic as cart page
                  const product = item?.product || {};
                  const priceList = product?.priceList || [];
                  
                  let correctPrice = product?.unitPrice || 0;
                  
                  if (priceList && priceList.length > 0) {
                    // Find matching price based on currency and size
                    const matchingPrice = priceList.find(price => 
                      price.currency === product.currency && 
                      price.size === product.size
                    );
                    
                    if (matchingPrice) {
                      correctPrice = matchingPrice.priceAmount;
                    }
                  }
                  
                  const itemTotal = correctPrice * item.quantity;
                  
                  return (
                    <div key={item.id} className="flex items-center gap-3 border-b border-text-light/10 pb-3">
                      <img src={item.product.thumbnailUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-black">{item.product.name}</p>
                        <p className="text-xs text-text-medium">{item.quantity} × {formatPrice(correctPrice)}</p>
                      </div>
                      <div className="text-sm font-semibold text-black">{formatPrice(itemTotal)}</div>
                    </div>
                  );
                })}

                <div className="pt-4 border-t border-text-light/20 space-y-2">
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-text-medium">Subtotal</span>
                    <span className="text-black font-semibold">{formatPrice(cartSummary.subTotal)}</span>
                  </div>
                  {cartSummary.discount > 0 && (
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-text-medium">Discount</span>
                      <span className="text-luxury-rose-gold font-semibold">-{formatPrice(cartSummary.discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs md:text-sm">
                    <span className="text-text-medium">Shipping</span>
                    {cartSummary.shipping === 0 ? (
                      <span className="text-black font-semibold">FREE</span>
                    ) : (
                      <span className="text-black font-semibold">{formatPrice(cartSummary.shipping)}</span>
                    )}
                  </div>
                  {cartSummary.tax > 0 && (
                    <div className="flex justify-between text-xs md:text-sm">
                      <span className="text-text-medium">Tax</span>
                      <span className="text-black font-semibold">{formatPrice(cartSummary.tax)}</span>
                    </div>
                  )}
                </div>

                <div className="flex justify-between pt-4 pb-4 md:pb-6 border-t border-text-light/20">
                  <span className="text-base md:text-lg font-bold text-black uppercase tracking-wider">Total</span>
                  <span className="text-xl md:text-2xl font-bold text-black">{formatPrice(cartSummary.grandTotal)}</span>
                </div>

                {cartSummary.shipping === 0 && (
                  <div className="space-y-3 py-4 border-b border-text-light/20">
                    <div className="flex items-start gap-3">
                      <Truck size={16} className="text-text-medium mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-medium text-black">Free Shipping</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <RotateCcw size={16} className="text-text-medium mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs md:text-sm font-medium text-black">Easy Returns</p>
                        <p className="text-xs text-text-medium">30-day return policy</p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full bg-black text-white py-3 md:py-4 font-semibold hover:bg-text-dark transition-colors uppercase tracking-wider text-xs md:text-sm flex items-center justify-center gap-3 disabled:bg-text-light disabled:cursor-not-allowed mt-6"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Shield size={18} strokeWidth={1.5} />
                      <span>Place Order</span>
                    </>
                  )}
                </button>

                <div className="mt-6 pt-4 border-t border-text-light/10">
                  <div className="flex items-center gap-2 text-xs text-text-medium justify-center">
                    <Shield size={14} strokeWidth={1.5} />
                    <span>100% Secure Payment</span>
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
