import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Truck, CheckCircle2, XCircle, Clock, MapPin, X, Phone } from "lucide-react";

const OrdersPage = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("current"); // current or history
  const [selectedOrder, setSelectedOrder] = useState(null);

  const currentOrders = [
    {
      id: "ORD-2024-001",
      date: "2024-01-15",
      status: "shipped",
      items: [
        {
          id: 1,
          name: "Luxe Silk Night Shirt",
          image: "https://i.etsystatic.com/19870219/r/il/9939a4/3877887290/il_fullxfull.3877887290_o82x.jpg",
          price: 4990,
          quantity: 1,
          size: "M"
        }
      ],
      total: 4990,
      address: "123, MG Road, Bangalore, Karnataka - 560001",
      phone: "+91 9876543210",
      email: "priya.sharma@example.com",
      expectedDelivery: "2024-01-20",
      trackingId: "YOBHA1234567890",
      trackingSteps: [
        { status: "Order Placed", completed: true, date: "2024-01-15", time: "10:30 AM" },
        { status: "Order Confirmed", completed: true, date: "2024-01-15", time: "11:00 AM" },
        { status: "Shipped", completed: true, date: "2024-01-16", time: "02:30 PM" },
        { status: "In Transit", completed: false, date: "2024-01-18", time: "" },
        { status: "Out for Delivery", completed: false, date: "2024-01-20", time: "" },
        { status: "Delivered", completed: false, date: "2024-01-20", time: "" }
      ]
    },
    {
      id: "ORD-2024-002",
      date: "2024-01-18",
      status: "processing",
      items: [
        {
          id: 2,
          name: "Premium Loungewear Set",
          image: "https://images.unsplash.com/photo-1618354691373-d851c5d96e88?w=600",
          price: 5499,
          quantity: 2,
          size: "L"
        }
      ],
      total: 10998,
      address: "456, Sector 18, Noida, Uttar Pradesh - 201301",
      phone: "+91 9876543210",
      email: "priya.sharma@example.com",
      expectedDelivery: "2024-01-25",
      trackingSteps: [
        { status: "Order Placed", completed: true, date: "2024-01-18", time: "03:45 PM" },
        { status: "Order Confirmed", completed: true, date: "2024-01-18", time: "04:00 PM" },
        { status: "Processing", completed: false, date: "2024-01-19", time: "" },
        { status: "Shipped", completed: false, date: "2024-01-20", time: "" },
        { status: "Out for Delivery", completed: false, date: "2024-01-25", time: "" },
        { status: "Delivered", completed: false, date: "2024-01-25", time: "" }
      ]
    }
  ];

  const orderHistory = [
    {
      id: "ORD-2023-045",
      date: "2023-12-20",
      status: "delivered",
      items: [
        {
          id: 3,
          name: "Silk Couple Set",
          image: "https://images.unsplash.com/photo-1618354691373-d851c5d96e88?w=600",
          price: 8999,
          quantity: 1,
          size: "M"
        }
      ],
      total: 8999,
      address: "123, MG Road, Bangalore, Karnataka - 560001",
      phone: "+91 9876543210",
      deliveredDate: "2023-12-23",
      trackingId: "YOBHA9876543210",
      trackingSteps: [
        { status: "Order Placed", completed: true, date: "2023-12-20", time: "09:15 AM" },
        { status: "Order Confirmed", completed: true, date: "2023-12-20", time: "09:30 AM" },
        { status: "Shipped", completed: true, date: "2023-12-21", time: "10:00 AM" },
        { status: "In Transit", completed: true, date: "2023-12-22", time: "08:30 AM" },
        { status: "Out for Delivery", completed: true, date: "2023-12-23", time: "09:00 AM" },
        { status: "Delivered", completed: true, date: "2023-12-23", time: "02:30 PM" }
      ]
    },
    {
      id: "ORD-2023-042",
      date: "2023-12-10",
      status: "delivered",
      items: [
        {
          id: 4,
          name: "Satin Night Dress",
          image: "https://images.unsplash.com/photo-1618354691373-d851c5d96e88?w=600",
          price: 3499,
          quantity: 1,
          size: "S"
        }
      ],
      total: 3499,
      address: "456, Sector 18, Noida, Uttar Pradesh - 201301",
      phone: "+91 9876543210",
      deliveredDate: "2023-12-13",
      trackingId: "YOBHA8765432109",
      trackingSteps: [
        { status: "Order Placed", completed: true, date: "2023-12-10", time: "11:20 AM" },
        { status: "Order Confirmed", completed: true, date: "2023-12-10", time: "11:35 AM" },
        { status: "Shipped", completed: true, date: "2023-12-11", time: "01:00 PM" },
        { status: "In Transit", completed: true, date: "2023-12-12", time: "10:15 AM" },
        { status: "Out for Delivery", completed: true, date: "2023-12-13", time: "08:45 AM" },
        { status: "Delivered", completed: true, date: "2023-12-13", time: "03:15 PM" }
      ]
    }
  ];

  const getStatusInfo = (status) => {
    const statusMap = {
      processing: {
        icon: Clock,
        text: "Processing",
        color: "text-blue-600",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200"
      },
      shipped: {
        icon: Truck,
        text: "Shipped",
        color: "text-orange-600",
        bgColor: "bg-orange-50",
        borderColor: "border-orange-200"
      },
      delivered: {
        icon: CheckCircle2,
        text: "Delivered",
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200"
      },
      cancelled: {
        icon: XCircle,
        text: "Cancelled",
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200"
      }
    };
    return statusMap[status] || statusMap.processing;
  };

  const OrderCard = ({ order }) => {
    const statusInfo = getStatusInfo(order.status);
    const StatusIcon = statusInfo.icon;

    return (
      <div className="bg-white border border-[#e7bfb3]/20 rounded-2xl shadow-md hover:shadow-lg transition-all overflow-hidden flex flex-col h-full">
        {/* Order Header */}
        <div className="bg-gradient-to-r from-[#fdf9f6] to-[#faf6f2] px-4 sm:px-5 py-3.5 sm:py-4 border-b border-[#e7bfb3]/30">
          <div className="mb-2">
            <h3 className="font-bold text-[#8b5f4b] text-sm sm:text-base">Order {order.id}</h3>
            <p className="text-xs text-[#a2786b] mt-0.5">
              {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border ${statusInfo.borderColor} ${statusInfo.bgColor}`}>
            <StatusIcon size={14} className={statusInfo.color} />
            <span className={`text-xs font-semibold ${statusInfo.color}`}>{statusInfo.text}</span>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-4 sm:p-5 flex-1">
          <div className="space-y-3 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-3">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border border-[#e7bfb3]/30 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-[#8b5f4b] text-xs sm:text-sm mb-1 line-clamp-2">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#7a5650] mb-1">
                    Size: {item.size} | Qty: {item.quantity}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#8b5f4b]">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Details */}
          <div className="border-t border-[#e7bfb3]/20 pt-3 space-y-2.5">
            {order.address && (
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#d9a79a] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#7a5650] line-clamp-2">{order.address}</p>
              </div>
            )}
            
            {order.expectedDelivery && order.status !== "delivered" && (
              <div className="flex items-start gap-2">
                <Truck size={14} className="text-[#d9a79a] mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#7a5650]">
                  Expected: <span className="font-semibold text-[#8b5f4b]">
                    {new Date(order.expectedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </p>
              </div>
            )}

            {order.deliveredDate && (
              <div className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-green-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-[#7a5650]">
                  Delivered: <span className="font-semibold text-[#8b5f4b]">
                    {new Date(order.deliveredDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2.5 border-t border-[#e7bfb3]/20">
              <span className="text-xs text-[#7a5650]">Total</span>
              <span className="text-lg font-bold text-[#8b5f4b]">₹{order.total.toLocaleString()}</span>
            </div>
          </div>

        </div>

        {/* Actions */}
        <div className="p-4 sm:p-5 pt-0 mt-auto">
          <button 
            onClick={() => setSelectedOrder(order)}
            className="w-full max-w-[200px] mx-auto block bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] hover:shadow-lg text-[#8b5f4b] font-bold py-2.5 rounded-lg transition-all text-sm"
          >
            View Details
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#fdfbf9] to-[#faf6f2] pt-4 lg:pt-4 pb-12">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#8b5f4b] mb-2">
            My Orders
          </h1>
          <p className="text-sm sm:text-base text-[#a2786b]">
            Track and manage your orders
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-[#e7bfb3]/30">
          <button
            onClick={() => setActiveTab("current")}
            className={`pb-3 px-4 font-semibold transition-all relative ${
              activeTab === "current"
                ? "text-[#8b5f4b] border-b-2 border-[#d9a79a]"
                : "text-[#a2786b] hover:text-[#8b5f4b]"
            }`}
          >
            Current Orders ({currentOrders.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`pb-3 px-4 font-semibold transition-all relative ${
              activeTab === "history"
                ? "text-[#8b5f4b] border-b-2 border-[#d9a79a]"
                : "text-[#a2786b] hover:text-[#8b5f4b]"
            }`}
          >
            Order History ({orderHistory.length})
          </button>
        </div>

        {/* Orders List */}
        {activeTab === "current" ? (
          currentOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentOrders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package size={64} className="mx-auto text-[#e7bfb3] mb-4" />
              <h3 className="text-xl font-semibold text-[#8b5f4b] mb-2">No current orders</h3>
              <p className="text-[#a2786b] mb-6">Start shopping to see your orders here</p>
              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#f6d6cb] via-[#e7bfb3] to-[#d9a79a] text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Shop Now
              </button>
            </div>
          )
        ) : (
          orderHistory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {orderHistory.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Package size={64} className="mx-auto text-[#e7bfb3] mb-4" />
              <h3 className="text-xl font-semibold text-[#8b5f4b] mb-2">No order history</h3>
              <p className="text-[#a2786b]">Your past orders will appear here</p>
            </div>
          )
        )}

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#fdf9f6] to-[#faf6f2] px-6 py-5 border-b border-[#e7bfb3]/30 sticky top-0 z-10 flex items-center justify-between">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#8b5f4b]">Order Details</h2>
                  <p className="text-sm text-[#a2786b] mt-1">Order {selectedOrder.id}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-white/50 rounded-lg transition-all"
                >
                  <X size={24} className="text-[#8b5f4b]" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                
                {/* Order Tracking Timeline */}
                {selectedOrder.trackingSteps && (
                  <div className="bg-gradient-to-br from-[#faf6f2] to-[#fef9f5] border border-[#e7bfb3]/30 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-[#8b5f4b] mb-6 flex items-center gap-2">
                      <Package size={20} className="text-[#d9a79a]" />
                      Order Tracking
                    </h3>
                    
                    {/* Timeline */}
                    <div className="space-y-6">
                      {selectedOrder.trackingSteps.map((step, index) => (
                        <div key={index} className="flex gap-4">
                          {/* Timeline Icon */}
                          <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              step.completed 
                                ? 'bg-gradient-to-br from-green-400 to-green-500 shadow-lg' 
                                : 'bg-gray-200'
                            }`}>
                              {step.completed ? (
                                <CheckCircle2 size={20} className="text-white" />
                              ) : (
                                <Clock size={20} className="text-gray-400" />
                              )}
                            </div>
                            {index < selectedOrder.trackingSteps.length - 1 && (
                              <div className={`w-0.5 h-12 ${
                                step.completed ? 'bg-green-400' : 'bg-gray-200'
                              }`} />
                            )}
                          </div>

                          {/* Timeline Content */}
                          <div className="flex-1 pb-4">
                            <h4 className={`font-bold text-sm sm:text-base mb-1 ${
                              step.completed ? 'text-[#8b5f4b]' : 'text-gray-400'
                            }`}>
                              {step.status}
                            </h4>
                            <div className="flex flex-wrap gap-2 text-xs text-[#7a5650]">
                              <span>{new Date(step.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                              {step.time && (
                                <>
                                  <span>•</span>
                                  <span>{step.time}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tracking ID & Actions */}
                    {selectedOrder.trackingId && (
                      <div className="mt-6 pt-6 border-t border-[#e7bfb3]/30">
                        <div className="bg-white rounded-lg p-4 border border-[#e7bfb3]/30">
                          <p className="text-xs text-[#7a5650] mb-2 font-semibold">Tracking Number</p>
                          <p className="text-sm font-mono font-bold text-[#8b5f4b] mb-4">{selectedOrder.trackingId}</p>
                          <div className="flex gap-3">
                            {selectedOrder.status !== "delivered" && (
                              <button className="flex-1 bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] hover:shadow-lg text-[#8b5f4b] font-bold py-3 rounded-lg transition-all text-sm flex items-center justify-center gap-2">
                                <Truck size={18} />
                                Track Order
                              </button>
                            )}
                            {selectedOrder.status === "delivered" && (
                              <button className="flex-1 bg-gradient-to-r from-[#f6d6cb] to-[#e7bfb3] hover:shadow-lg text-[#8b5f4b] font-bold py-3 rounded-lg transition-all text-sm flex items-center justify-center gap-2">
                                <Package size={18} />
                                Reorder
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Order Items */}
                <div className="bg-white border border-[#e7bfb3]/20 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-[#8b5f4b] mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex gap-4 pb-4 border-b border-[#e7bfb3]/20 last:border-0 last:pb-0">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border border-[#e7bfb3]/30 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-[#8b5f4b] text-sm sm:text-base mb-2">{item.name}</h4>
                          <p className="text-xs sm:text-sm text-[#7a5650] mb-2">
                            Size: {item.size} | Quantity: {item.quantity}
                          </p>
                          <p className="text-base sm:text-lg font-bold text-[#8b5f4b]">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Delivery Address */}
                  <div className="bg-gradient-to-br from-[#faf6f2] to-[#fef9f5] border border-[#e7bfb3]/30 rounded-2xl p-5">
                    <h3 className="text-base font-bold text-[#8b5f4b] mb-3 flex items-center gap-2">
                      <MapPin size={18} className="text-[#d9a79a]" />
                      Delivery Address
                    </h3>
                    <p className="text-sm text-[#7a5650] leading-relaxed">{selectedOrder.address}</p>
                    {selectedOrder.phone && (
                      <div className="flex items-center gap-2 mt-3 text-xs text-[#7a5650]">
                        <Phone size={14} className="text-[#d9a79a]" />
                        <span>{selectedOrder.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="bg-gradient-to-br from-[#faf6f2] to-[#fef9f5] border border-[#e7bfb3]/30 rounded-2xl p-5">
                    <h3 className="text-base font-bold text-[#8b5f4b] mb-3">Order Summary</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#7a5650]">Order Date</span>
                        <span className="text-[#8b5f4b] font-semibold">
                          {new Date(selectedOrder.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      {selectedOrder.expectedDelivery && (
                        <div className="flex justify-between">
                          <span className="text-[#7a5650]">Expected Delivery</span>
                          <span className="text-[#8b5f4b] font-semibold">
                            {new Date(selectedOrder.expectedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                      )}
                      <div className="flex justify-between pt-2 border-t border-[#e7bfb3]/20">
                        <span className="text-[#8b5f4b] font-semibold">Total Amount</span>
                        <span className="text-lg font-bold text-[#8b5f4b]">₹{selectedOrder.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

