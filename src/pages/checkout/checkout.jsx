import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, CreditCard, Banknote, Truck, RotateCcw, Shield } from "lucide-react";
import { getAddresses } from "../../service/address";
import { getCartDetails } from "../../service/productAPI";
import { CreateOrder } from "../../service/order";
import { message } from "../../comman/toster-message/ToastContainer";

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
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await getAddresses();
      setUserAddresses(response.data || []);
      if (response.data?.length > 0) {
        setAddress(response.data[0]);
      }
    } catch (err) {
      console.log("Failed to fetch addresses");
    }
  };

  const fetchCart = async () => {
    try {
      const response = await getCartDetails();
      const items = response.data.items || [];
      setCartItems(items);

      // Calculate summary dynamically
      const subTotal = items.reduce((sum, item) => sum + item.lineTotal, 0);
      const shipping = items.some(item => !item.product.freeShipping) ? 50 : 0;
      const discount = 0;
      const tax = 0;
      const grandTotal = subTotal + shipping + tax - discount;

      setCartSummary({
        totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
        distinctItems: items.length,
        subTotal,
        shipping,
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
      userId: userId,
      items: cartItems.map(item => ({
        productId: item.product.productId,
        price: item.product.unitPrice,
        quantity: item.quantity
      })),
      shippingAddress: {
        line1: address.addressLine1,
        city: address.city,
        pincode: address.pincode
      },
      paymentMethod: selectedPayment.id === "cod" ? "COD" : "Prepaid",
      couponCode: "NEWYEAR25"
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
              <div className="px-4 md:px-6 py-4 md:py-5 border-b border-text-light/20 flex justify-between items-center">
                <h2 className="text-base md:text-lg font-bold text-black uppercase tracking-wider flex items-center gap-2">
                  <MapPin size={20} strokeWidth={1.5} />
                  Delivery Address
                </h2>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      checked={useSavedAddress}
                      onChange={() => setUseSavedAddress(true)}
                      className="accent-black"
                    />
                    Use Saved
                  </label>
                  <label className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      checked={!useSavedAddress}
                      onChange={() => setUseSavedAddress(false)}
                      className="accent-black"
                    />
                    Enter Manually
                  </label>
                </div>
              </div>

              <div className="p-4 md:p-6">
                {useSavedAddress ? (
                  <select
                    value={address.id || ""}
                    onChange={(e) => {
                      const selected = userAddresses.find(a => a.id === e.target.value);
                      if (selected) setAddress(selected);
                    }}
                    className="w-full px-4 py-3 border-2 border-text-light/30 focus:border-black focus:outline-none text-sm"
                  >
                    {userAddresses.map(addr => (
                      <option key={addr.id} value={addr.id}>
                        {addr.fullName}, {addr.line1}, {addr.city} - {addr.zip}
                      </option>
                    ))}
                  </select>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        name="fullName"
                        value={address.fullName}
                        onChange={handleInputChange}
                        placeholder="Full Name"
                        className={`w-full px-4 py-3 border-2 focus:outline-none text-sm ${addressErrors.fullName ? 'border-red-500' : 'border-text-light/30 focus:border-black'}`}
                      />
                      {addressErrors.fullName && <p className="text-xs text-red-500">{addressErrors.fullName}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="tel"
                        name="phone"
                        value={address.phone}
                        onChange={handleInputChange}
                        placeholder="Phone"
                        className={`w-full px-4 py-3 border-2 focus:outline-none text-sm ${addressErrors.phone ? 'border-red-500' : 'border-text-light/30 focus:border-black'}`}
                      />
                      {addressErrors.phone && <p className="text-xs text-red-500">{addressErrors.phone}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        name="addressLine1"
                        value={address.addressLine1}
                        onChange={handleInputChange}
                        placeholder="Address Line 1"
                        className={`w-full px-4 py-3 border-2 focus:outline-none text-sm ${addressErrors.addressLine1 ? 'border-red-500' : 'border-text-light/30 focus:border-black'}`}
                      />
                      {addressErrors.addressLine1 && <p className="text-xs text-red-500">{addressErrors.addressLine1}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        name="addressLine2"
                        value={address.addressLine2}
                        onChange={handleInputChange}
                        placeholder="Address Line 2 (Optional)"
                        className="w-full px-4 py-3 border-2 border-text-light/30 focus:border-black focus:outline-none text-sm"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="city"
                        value={address.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className={`w-full px-4 py-3 border-2 focus:outline-none text-sm ${addressErrors.city ? 'border-red-500' : 'border-text-light/30 focus:border-black'}`}
                      />
                      {addressErrors.city && <p className="text-xs text-red-500">{addressErrors.city}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="state"
                        value={address.state}
                        onChange={handleInputChange}
                        placeholder="State"
                        className={`w-full px-4 py-3 border-2 focus:outline-none text-sm ${addressErrors.state ? 'border-red-500' : 'border-text-light/30 focus:border-black'}`}
                      />
                      {addressErrors.state && <p className="text-xs text-red-500">{addressErrors.state}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="pincode"
                        value={address.pincode}
                        onChange={handleInputChange}
                        placeholder="Pincode"
                        maxLength={6}
                        className={`w-full px-4 py-3 border-2 focus:outline-none text-sm ${addressErrors.pincode ? 'border-red-500' : 'border-text-light/30 focus:border-black'}`}
                      />
                      {addressErrors.pincode && <p className="text-xs text-red-500">{addressErrors.pincode}</p>}
                    </div>
                    <div>
                      <input
                        type="text"
                        name="landmark"
                        value={address.landmark}
                        onChange={handleInputChange}
                        placeholder="Landmark (Optional)"
                        className="w-full px-4 py-3 border-2 border-text-light/30 focus:border-black focus:outline-none text-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
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
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3 border-b border-text-light/10 pb-3">
                    <img src={item.product.thumbnailUrl} alt={item.product.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-black">{item.product.name}</p>
                      <p className="text-xs text-text-medium">{item.quantity} × {formatPrice(item.product.unitPrice)}</p>
                    </div>
                    <div className="text-sm font-semibold text-black">{formatPrice(item.lineTotal)}</div>
                  </div>
                ))}

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

                <div className="space-y-3 py-4 border-b border-text-light/20">
                  <div className="flex items-start gap-3">
                    <Truck size={16} className="text-text-medium mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs md:text-sm font-medium text-black">Free Shipping</p>
                      <p className="text-xs text-text-medium">Delivery in 3-5 business days</p>
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
