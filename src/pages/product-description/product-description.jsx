import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Star,
  Truck,
  RotateCcw,
} from "lucide-react";
import { addToCart, getCartDetails, getProductDescription, updateCartQuantity, submitReview } from "../../service/productAPI";
import { useDispatch } from "react-redux";
import { setCartCount } from "../../redux/cartSlice";
import { addToWishlist } from "../../service/wishlist";
import { message } from "../../comman/toster-message/ToastContainer";

const formatProductData = (apiData) => {
  if (!apiData) return null;

  const data = apiData.data || apiData;

  return {
    id: data?.id || data?.productId || '',
    productId: data?.productId || data?.id || '',
    name: data?.name || 'Untitled Product',
    slug: data?.slug || '',
    description: data?.description || '',

    // Images with null checks
    images: Array.isArray(data?.images) && data.images.length > 0
      ? data.images.map(img => ({
        url: img?.url || 'https://via.placeholder.com/800x800?text=No+Image',
        thumbnailUrl: img?.thumbnailUrl || img?.url || 'https://via.placeholder.com/150x150?text=No+Image',
        alt: img?.alt || 'Product image',
      }))
      : [{
        url: 'https://via.placeholder.com/800x800?text=No+Image',
        thumbnailUrl: 'https://via.placeholder.com/150x150?text=No+Image',
        alt: 'Product image',
      }],

    // Pricing with null checks
    price: data?.prices?.IN || data?.prices?.default || 0,
    compareAtPrice: data?.compareAtPrice || null,

    // Variants and inventory
    variants: Array.isArray(data?.variants) ? data.variants.filter(v => v?.isActive !== false) : [],
    inventory: Array.isArray(data?.inventory) ? data.inventory : [],

    // Product attributes
    colors: Array.isArray(data?.colors) && data.colors.length > 0 ? data.colors : [],
    sizes: Array.isArray(data?.sizeOfProduct) && data.sizeOfProduct.length > 0
      ? data.sizeOfProduct
      : [],
    fabricType: Array.isArray(data?.fabricType) ? data.fabricType : [],

    // Categories
    productMainCategory: data?.productMainCategory || '',
    productCategory: data?.productCategory || '',
    productSubCategory: data?.productSubCategory || '',

    // Ratings and reviews
    averageRating: typeof data?.averageRating === 'number' ? data.averageRating : 0,
    reviewCount: typeof data?.reviewCount === 'number' ? data.reviewCount : 0,
    reviews: Array.isArray(data?.reviews)
      ? data.reviews.filter(r => r?.approved !== false)
      : [],

    // Additional info
    isFeatured: data?.isFeatured === true,
    salesCount: data?.salesCount || 0,
    isActive: data?.isActive !== false,

    // Specifications
    specifications: data?.specifications || {},
    keyFeatures: Array.isArray(data?.keyFeatures) ? data.keyFeatures : [],
    careInstructions: Array.isArray(data?.careInstructions) ? data.careInstructions : [],

    // Metadata
    createdAt: data?.createdAt || null,
    updatedAt: data?.updatedAt || null,
  };
};

/**
 * Get available quantity for a specific color/size combination
 */
const getAvailableQuantity = (inventory, color, size) => {
  if (!Array.isArray(inventory) || inventory.length === 0) return 0;

  const item = inventory.find(
    inv => inv?.color === color && inv?.size === size && inv?.quantity > 0
  );

  return item ? (item.quantity - (item.reserved || 0)) : 0;
};

/**
 * Format price to INR
 */
const formatPrice = (price, currency = 'INR') => {
  if (typeof price !== 'number') return '0';

  return price.toLocaleString(undefined, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const ProductDetailPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  // UI State
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // API State
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Review Form State
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const countryOptions = [
    { code: "IN", label: "India" },
    { code: "AE", label: "United Arab Emirates (UAE)" },
    { code: "SA", label: "Saudi Arabia" },
    { code: "QA", label: "Qatar" },
    { code: "KW", label: "Kuwait" },
    { code: "OM", label: "Oman" },
    { code: "BH", label: "Bahrain" },
    { code: "JO", label: "Jordan" },
    { code: "LB", label: "Lebanon" },
    { code: "EG", label: "Egypt" },
    { code: "IQ", label: "Iraq" },
  ];

  useEffect(() => {


    if (productId) {
      fetchProductDetail(productId);
    }
  }, [productId]);

  useEffect(() => {
    if (product) {
      if (product.availableColors.length > 0 && !selectedColor) {
        setSelectedColor(product.availableColors[0]);
      }
      if (product.sizeOfProduct.length > 0 && !selectedSize) {
        setSelectedSize(product.sizeOfProduct[0]);
      }
    }
  }, [product, selectedColor, selectedSize]);

  const fetchProductDetail = async (productId) => {
    setIsLoading(true)
    try {
      const response = await getProductDescription(productId);
      console.log("Product details:");
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
    finally {
      setIsLoading(false)
    }
  };

  // Handle review submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!reviewComment.trim()) {
      message.error("Please enter a review comment");
      return;
    }

    setIsSubmittingReview(true);
    try {
      const reviewData = {
        rating: reviewRating,
        comment: reviewComment.trim()
      };

      await submitReview(productId, reviewData);
      message.success("Review submitted successfully!");

      // Reset form
      setReviewComment('');
      setReviewRating(5);
      setShowReviewForm(false);

      // Refresh product data to show updated reviews
      await fetchProductDetail(productId);

    } catch (error) {
      console.error("Error submitting review:", error);
      message.error("Failed to submit review. Please try again.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // Get available quantity for current selection
  const availableQuantity = product
    ? getAvailableQuantity(product.inventory, selectedColor, selectedSize)
    : 0;

  // Image navigation
  const handlePrevImage = () => {
    if (!product || product.images.length === 0) return;
    setSelectedImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!product || product.images.length === 0) return;
    setSelectedImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  // Quantity controls
  const handleIncrement = () => {
    if (quantity < availableQuantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const fetchCart = async () => {

    try {
      const response = await getCartDetails()
      console.log(response.data.items.length);
      dispatch(setCartCount(response.data.items.length));
    }
    catch (err) {
      console.log(err || "something went wrong")
    }
    finally {

    }

  }
  // Add to cart
  const handleAddToCart = async () => {
    if (!selectedColor || !selectedSize || availableQuantity === 0) {
      message.error('Please select color and size');
      return;
    }

    // Find the variant SKU for selected color + size
    const selectedVariant = product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );

    const payload = {
      productId: product.productId,                    // required
      variantSku: '',          // optional
      quantity: quantity,                              // required
      currency: product?.priceList?.find(
        (item) => item.country === selectedCountry && item.size === selectedSize
      ).currency,                                 // optional
      note: ""
    };

    try {
      const response = await addToCart(payload);
      console.log("Added to cart:", response);
      message.success("Product added to cart successfully!");
      fetchCart()
    } catch (err) {
      console.error("Error adding to cart:", err);
      message.error("Failed to add product to cart. Please try again.");
    }
  };


  // Wishlist toggle
  const handleAddToWishlist = async (productId) => {
    const selectedVariant = product.variants.find(
      (v) => v.color === selectedColor && v.size === selectedSize
    );

    const payload = {
      productId: product.productId,                    // required
      variantSku: selectedVariant?.sku || '',          // optional
      desiredQuantity: quantity,
      "desiredSize": "S",
      "desiredColor": "Navy Blue",
      "notifyWhenBackInStock": true,

    }

    try {
      const result = await addToWishlist(productId, payload);
      console.log("Added to wishlist:", result);
      message.success("Product added to wishlist!");
    } catch (err) {
      console.error("Failed to add to wishlist:", err);
      message.error("Failed to add to wishlist");
    }
  };
  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    // TODO: Implement actual wishlist API call
  };

  // Loading state
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-premium-cream flex items-center justify-center"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-premium-beige border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-medium text-sm uppercase tracking-wider">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <div
        className="min-h-screen bg-premium-cream flex items-center justify-center"
        style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
      >
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-black mb-4 uppercase tracking-wider">
            Product Not Found
          </h2>
          <p className="text-text-medium mb-8">
            {error || 'The product you are looking for does not exist or is no longer available.'}
          </p>
          <a
            href="/products"
            className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-text-dark transition-colors uppercase tracking-wider text-sm"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  const currentImage = product.images[selectedImageIndex] || product.images[0];
  const hasMultipleImages = product.images.length > 1;
  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
    // You can also trigger other logic here if needed
    console.log('Selected Country:', e.target.value);
  };
  const matchedPrice = product?.priceList?.find(
    (item) =>
      item.country === selectedCountry &&
      item.size === selectedSize
  );

  const shippingInfo = product.countryPrices.find(
    (item) => item.country === selectedCountry
  );
  return (
    <div
      className="min-h-screen bg-premium-cream"
      style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-8 lg:px-12 py-12">

        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-text-medium">
          <a href="/" className="hover:text-black transition-colors">Home</a>
          <span className="mx-2">/</span>
          <a href="/products" className="hover:text-black transition-colors">Products</a>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-white overflow-hidden group">
              <img
                src={currentImage.url}
                alt={currentImage.alt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x800?text=Image+Not+Found';
                }}
              />

              {/* Navigation Arrows */}
              {hasMultipleImages && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 hover:bg-white transition-all"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={24} className="text-black" strokeWidth={1.5} />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 opacity-0 group-hover:opacity-100 hover:bg-white transition-all"
                    aria-label="Next image"
                  >
                    <ChevronRight size={24} className="text-black" strokeWidth={1.5} />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`h-1 rounded-full transition-all ${index === selectedImageIndex
                        ? 'w-6 bg-black'
                        : 'w-1 bg-black/30'
                        }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {hasMultipleImages && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square bg-white overflow-hidden transition-all ${index === selectedImageIndex
                      ? 'ring-2 ring-black'
                      : 'ring-1 ring-text-light/20 hover:ring-text-light'
                      }`}
                  >
                    <img
                      src={image.thumbnailUrl}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/150x150?text=No+Image';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-8">

            {/* Product Name */}
            <div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black uppercase tracking-wide mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              {product.reviewCount > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(product.averageRating)
                            ? "fill-black text-black"
                            : "fill-none text-text-light"
                        }
                        strokeWidth={1.5}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-text-medium">
                    {product.averageRating} ({product.reviewCount} review{product.reviewCount !== 1 ? 's' : ''})
                  </span>
                </div>
              )}

              {/* Description */}
              <p className="text-text-medium text-base leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Country Selector */}
            <div className="mt-4">
              <label htmlFor="country" className="block text-sm text-text-light mb-1">
                Select Country
              </label>
              <select
                id="country"
                name="country"
                value={selectedCountry}
                onChange={handleCountryChange}
                className="w-full px-4 py-2 border border-text-light/20 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                    {countryOptions.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
              </select>
            </div>

            {/* Debug or use selected country */}
            <div className="mt-2 text-sm text-text-light">
              Selected Country: <span className="font-medium">{selectedCountry}</span>
            </div>
            {/* Price */}
            {/* <div className="py-6 border-y border-text-light/20">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-black">
                  {formatPrice(product.price)}
                </span>
                {product.compareAtPrice && (
                  <span className="text-xl text-text-light line-through">
                    {formatPrice(product.compareAtPrice)}
                  </span>
                )}
              </div>
            </div> */}
            {/* Price - Based on selectedCountry and selectedSize */}
            <div className="py-6 border-y border-text-light/20">
              <div className="flex items-baseline gap-4">
                {(() => {
                  const matchedPrice = product.priceList?.find(
                    (item) =>
                      item.country === selectedCountry &&
                      item.size === selectedSize
                  );

                  return matchedPrice ? (
                    <>
                      <span className="text-4xl font-bold text-black">
                        {formatPrice(matchedPrice.priceAmount)}
                      </span>

                      {/* Uncomment below if compareAtPrice exists in data */}
                      {/* {matchedPrice.compareAtPrice && (
            <span className="text-xl text-text-light line-through">
              {formatPrice(matchedPrice.compareAtPrice)}
            </span>
          )} */}
                    </>
                  ) : (
                    <span className="text-xl text-red-500">Item not available</span>
                  );
                })()}
              </div>
            </div>
            {/* Color Selection */}
            {product?.availableColors?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-black mb-4 uppercase tracking-widest">
                  Color: <span className="font-normal text-text-medium">{selectedColor}</span>
                </h3>
                <div className="flex gap-3 flex-wrap">
                  {product?.availableColors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-6 py-3 border-2 transition-all uppercase text-sm tracking-wider ${selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-text-light/30 text-black hover:border-text-dark'
                        }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizeOfProduct.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-black mb-4 uppercase tracking-widest">
                  Size: <span className="font-normal text-text-medium">{selectedSize}</span>
                </h3>
                <div className="grid grid-cols-4 gap-3">
                  {product.sizeOfProduct.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 border-2 transition-all uppercase text-sm tracking-wider font-medium ${selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-text-light/30 text-black hover:border-text-dark'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="text-sm font-semibold text-black mb-4 uppercase tracking-widest">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-text-light/30">
                  <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-premium-beige transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} strokeWidth={2} />
                  </button>
                  <span className="px-6 py-3 font-semibold text-lg min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrement}
                    disabled={quantity >= availableQuantity}
                    className="p-3 hover:bg-premium-beige transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} strokeWidth={2} />
                  </button>
                </div>
                {availableQuantity > 0 && (
                  <span className="text-sm text-text-medium">
                    {availableQuantity} available
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={
                  availableQuantity === 0 ||
                  !selectedColor ||
                  !selectedSize ||
                  !matchedPrice
                }
                className="flex-1 bg-black text-white py-4 px-6 font-semibold hover:bg-text-dark transition-colors uppercase tracking-wider text-sm flex items-center justify-center gap-3 disabled:bg-text-light disabled:cursor-not-allowed"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {availableQuantity === 0
                  ? 'Out of Stock'
                  : !matchedPrice
                    ? 'Price Not Available'
                    : 'Add to Cart'}
              </button>

              <button
                onClick={() => handleAddToWishlist(product.id)}
                className={`p-4 border-2 transition-all ${isWishlisted
                  ? 'border-black bg-black'
                  : 'border-text-light/30 hover:border-black'
                  }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  size={20}
                  strokeWidth={1.5}
                  className={isWishlisted ? 'fill-white text-white' : 'text-black'}
                />
              </button>
            </div>

            {/* Shipping Info */}
          {shippingInfo && (
  <div className="flex items-start gap-3">
    <Truck size={20} className="text-text-medium mt-0.5" strokeWidth={1.5} />
    <div>
      <p className="text-sm font-medium text-black">Shipping Charges</p>
      <p className="text-xs text-text-medium">
        {shippingInfo.priceAmount === 0
          ? "Free Shipment"
          : `${shippingInfo.priceAmount.toLocaleString()} ${shippingInfo.currency}`}
      </p>
    </div>
  </div>
)}
            {/* <div className="space-y-3 pt-6 border-t border-text-light/20">
              <div className="flex items-start gap-3">
                <Truck size={20} className="text-text-medium mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-black">Free Shipping</p>
                  <p className="text-xs text-text-medium">Estimated delivery: 3-5 business days</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw size={20} className="text-text-medium mt-0.5" strokeWidth={1.5} />
                <div>
                  <p className="text-sm font-medium text-black">Easy Returns</p>
                  <p className="text-xs text-text-medium">30-day return policy</p>
                </div>
              </div>
            </div> */}

            {/* Product Details */}
            {(product.keyFeatures.length > 0 || Object.keys(product.specifications).length > 0 || product.fabricType.length > 0) && (
              <div className="space-y-6 pt-6 border-t border-text-light/20">

                {/* Key Features */}
                {product.keyFeatures.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-widest">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {product.keyFeatures.map((feature, index) => (
                        <li key={index} className="text-sm text-text-medium flex items-start">
                          <span className="mr-2">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Fabric Type */}
                {product.fabricType.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-widest">
                      Fabric
                    </h3>
                    <p className="text-sm text-text-medium">
                      {product.fabricType.join(', ')}
                    </p>
                  </div>
                )}

                {/* Care Instructions */}
                {product.careInstructions.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-widest">
                      Care Instructions
                    </h3>
                    <ul className="space-y-2">
                      {product.careInstructions.map((instruction, index) => (
                        <li key={index} className="text-sm text-text-medium flex items-start">
                          <span className="mr-2">•</span>
                          <span>{instruction}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Review Form Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-12 border-t border-text-light/20">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-black uppercase tracking-wide mb-6 sm:mb-8">
            Customer Reviews
          </h2>

          {/* Add Review Button */}
          {!showReviewForm && (
            <div className="mb-6 sm:mb-8">
              <button
                onClick={() => setShowReviewForm(true)}
                className="w-full sm:w-auto bg-black hover:bg-text-dark text-white font-semibold py-4 sm:py-3 px-6 sm:px-8 transition-all duration-200 flex items-center justify-center gap-3 uppercase tracking-wider hover:scale-[1.02] text-sm sm:text-base"
              >
                <Star size={18} />
                Write a Review
              </button>
            </div>
          )}

          {/* Review Form */}
          {showReviewForm && (
            <div className="mb-8 sm:mb-12 p-4 sm:p-6 lg:p-8 bg-premium-beige border border-text-light/20">
              <h3 className="text-lg sm:text-xl font-bold text-black mb-4 sm:mb-6 uppercase tracking-wide">
                Share Your Experience
              </h3>

              <form onSubmit={handleSubmitReview} className="space-y-4 sm:space-y-6">
                {/* Rating Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-text-medium mb-2 sm:mb-3 uppercase tracking-[0.15em]">
                    Rating
                  </label>
                  <div className="flex items-center gap-1 sm:gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() => setReviewRating(rating)}
                        className="p-1 sm:p-2 transition-all duration-200 hover:scale-110 active:scale-95"
                      >
                        <Star
                          size={20}
                          className={`sm:w-6 sm:h-6 ${rating <= reviewRating
                            ? "fill-black text-black"
                            : "fill-none text-text-light"
                            }`}
                          strokeWidth={1.5}
                        />
                      </button>
                    ))}
                    <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-text-medium">
                      {reviewRating} out of 5 stars
                    </span>
                  </div>
                </div>

                {/* Comment Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-text-medium mb-2 sm:mb-3 uppercase tracking-[0.15em]">
                    Your Review
                  </label>
                  <textarea
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share your thoughts about this product..."
                    rows={4}
                    className="w-full px-3 sm:px-5 py-3 sm:py-4 border-2 border-text-light/20 focus:border-black focus:outline-none text-black bg-white placeholder:text-text-light transition-colors font-medium resize-none text-sm sm:text-base"
                    required
                  />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    type="submit"
                    disabled={isSubmittingReview}
                    className="w-full sm:w-auto bg-black hover:bg-text-dark text-white font-semibold py-4 sm:py-3 px-6 sm:px-8 transition-all duration-200 flex items-center justify-center gap-3 uppercase tracking-wider hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    {isSubmittingReview ? "Submitting..." : "Submit Review"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowReviewForm(false);
                      setReviewComment('');
                      setReviewRating(5);
                    }}
                    className="w-full sm:w-auto bg-text-light/10 hover:bg-text-light/20 text-black font-semibold py-4 sm:py-3 px-6 sm:px-8 transition-all duration-200 uppercase tracking-wider text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>

        {/* Existing Reviews Section */}
        {product.reviews.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <h3 className="text-lg sm:text-xl font-bold text-black uppercase tracking-wide mb-6 sm:mb-8">
              Customer Reviews ({product.reviews.length})
            </h3>
            <div className="space-y-4 sm:space-y-6">
              {product.reviews.map((review, index) => (
                <div key={review.id || index} className="border-b border-text-light/10 pb-4 sm:pb-6 last:border-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={`sm:w-4 sm:h-4 ${i < review.rating
                            ? "fill-black text-black"
                            : "fill-none text-text-light"
                            }`}
                          strokeWidth={1.5}
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-text-medium">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-text-dark leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {product.variants?.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-text-light/20 ">
            <h3 className="text-sm font-semibold text-black mb-3 uppercase tracking-widest">
              Available Variants
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 ">
              {product.variants
                .filter(v => v.isActive)
                .map((variant) => (
                  <div
                    key={variant.id}
                    className="group border border-text-light/20 hover:border-black transition-all rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md"
                  >
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={variant.image}
                        alt={`${variant.color} ${variant.size}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) =>
                          (e.target.src = "https://via.placeholder.com/300x300?text=No+Image")
                        }
                      />
                    </div>
                    <div className="p-4 text-center space-y-2">
                      <p className="text-sm font-semibold text-black uppercase tracking-widest">
                        {variant.color}
                      </p>
                      <p className="text-xs text-text-medium uppercase">
                        Size: {variant.size}
                      </p>
                      <p className="text-xs text-text-medium">
                        Qty: {variant.quantity > 0 ? variant.quantity : "Out of Stock"}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
      {/* Product Variants */}


    </div>
  );
};

export default ProductDetailPage;
