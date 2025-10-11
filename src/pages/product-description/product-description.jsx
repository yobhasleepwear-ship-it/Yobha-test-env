import React, { useEffect, useState } from "react";
import {
  ShoppingBag,
  Heart,
  Share2,
  Star,
  ChevronLeft,
  ChevronRight,
  Grid3x3,
  Image as ImageIcon,
  Minus,
  Plus,
} from "lucide-react";
import { getFilteredProducts } from "../../service/productAPI";

const ProductDetailPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageViewMode, setImageViewMode] = useState("single");
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState("S");
  const [quantity, setQuantity] = useState(0);

  const [product ,setProducts] = useState({
    _id: { $oid: "68eb00000000000000000001" },
    ProductId: "PID10004",
    Name: "Luxury Cotton Nightshirt",
    Slug: "luxury-cotton-nightshirt",
    Description:
      "Premium cotton nightshirt offering ultimate comfort and breathability for a perfect night's sleep.",
    Price: { $numberDecimal: "1499.00" },
    CompareAtPrice: { $numberDecimal: "1799.00" },
    DiscountPercent: 17,
    Stock: 60,
    Variants: [
      {
        _id: "v1",
        Sku: "PID10004-NAV-S",
        Color: "navy",
        Size: "S",
        Quantity: 10,
        PriceOverride: { $numberDecimal: "1499.00" },
        Images: null,
        IsActive: true,
      },
      {
        _id: "v2",
        Sku: "PID10004-NAV-M",
        Color: "navy",
        Size: "M",
        Quantity: 15,
        PriceOverride: { $numberDecimal: "1499.00" },
        Images: null,
        IsActive: true,
      },
    ],
    Images: [
      {
        Url: "https://i.etsystatic.com/19870219/r/il/9939a4/3877887290/il_fullxfull.3877887290_o82x.jpg",
        ThumbnailUrl:
          "https://i.etsystatic.com/19870219/r/il/9939a4/3877887290/il_fullxfull.3877887290_o82x.jpg",
        Alt: "Luxury Cotton Nightshirt front view",
        UploadedByUserId: null,
        UploadedAt: { $date: "2025-10-11T15:00:00.000Z" },
      },
      {
        Url: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600",
        ThumbnailUrl:
          "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600",
        Alt: "Luxury Cotton Nightshirt back view",
        UploadedByUserId: null,
        UploadedAt: { $date: "2025-10-11T15:00:00.000Z" },
      },
      {
        Url: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600",
        ThumbnailUrl:
          "https://dummyimage.com/150x200/cccccc/000000&text=Side+Thumb",
        Alt: "Luxury Cotton Nightshirt side view",
        UploadedByUserId: null,
        UploadedAt: { $date: "2025-10-11T15:00:00.000Z" },
      },
      {
        Url: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600",
        ThumbnailUrl:
          "https://dummyimage.com/150x200/cccccc/000000&text=Fabric+Thumb",
        Alt: "Luxury Cotton Nightshirt fabric closeup",
        UploadedByUserId: null,
        UploadedAt: { $date: "2025-10-11T15:00:00.000Z" },
      },
    ],
    VariantSkus: ["PID10004-NAV-S", "PID10004-NAV-M"],
    ProductVariationIds: [
      {
        _id: "pv1",
        Name: "Luxury Cotton Nightshirt - Navy Small",
        Image: "https://dummyimage.com/600x800/000080/ffffff&text=Navy+S",
      },
      {
        _id: "pv2",
        Name: "Luxury Cotton Nightshirt - Navy Medium",
        Image: "https://dummyimage.com/600x800/000080/ffffff&text=Navy+M",
      },
      {
        _id: "pv3",
        Name: "Luxury Cotton Nightshirt - Black Large",
        Image: "https://dummyimage.com/600x800/000000/ffffff&text=Black+L",
      },
      {
        _id: "pv4",
        Name: "Luxury Cotton Nightshirt - White XL",
        Image: "https://dummyimage.com/600x800/ffffff/000000&text=White+XL",
      },
      {
        _id: "pv5",
        Name: "Luxury Cotton Nightshirt - Black Medium",
        Image: "https://dummyimage.com/600x800/000000/ffffff&text=Black+M",
      },
    ],
    AverageRating: 4.5,
    ReviewCount: 2,
    Reviews: [
      {
        _id: "r1",
        ReviewerName: "Ananya Sharma",
        Rating: 5,
        Comment:
          "Super soft and very comfortable! Perfect for sleep.",
        CreatedAt: { $date: "2025-10-10T10:00:00.000Z" },
      },
      {
        _id: "r2",
        ReviewerName: "Rohit Verma",
        Rating: 4,
        Comment:
          "Nice quality, but wish the sleeve was slightly shorter.",
        CreatedAt: { $date: "2025-10-09T12:30:00.000Z" },
      },
    ],
    IsFeatured: true,
    SalesCount: 0,
    IsActive: true,
    IsDeleted: false,
    CreatedAt: { $date: "2025-10-11T15:00:00.000Z" },
    UpdatedAt: { $date: "2025-10-11T15:00:00.000Z" },
    ProductMainCategory: "sleepwear",
    ProductCategory: "nightwear",
    ProductSubCategory: "nightshirts",
    SizeOfProduct: ["S", "M", "L", "XL"],
    AvailableColors: ["navy", "black", "white"],
    FabricType: ["cotton"],
    PriceList: [
      {
        _id: "pl1",
        Size: "S",
        PriceAmount: { $numberDecimal: "1499.00" },
        Currency: "INR",
        Quantity: 1,
        Country: "IN",
      },
    ],
    CountryPrices: [
      {
        _id: "cp1",
        Country: "IN",
        PriceAmount: { $numberDecimal: "1499.00" },
        Currency: "INR",
      },
    ],
    Specifications: {
      Material: "100% cotton",
      SleeveType: "Full sleeve",
      Care: "Machine wash cold",
    },
    KeyFeatures: [
      "100% cotton",
      "Soft and breathable",
      "Durable stitching",
      "Machine washable",
    ],
    CareInstructions: [
      "Cold wash",
      "Do not bleach",
      "Tumble dry low",
      "Iron on medium heat",
    ],
    Inventory: [
      {
        _id: "inv1",
        VariantId: null,
        Sku: "PID10004-NAV-S",
        Size: "S",
        Color: "navy",
        Quantity: 10,
        Reserved: 0,
        WarehouseId: "WH1",
        UpdatedAt: { $date: "2025-10-11T15:00:00.000Z" },
      },
      {
        _id: "inv2",
        VariantId: null,
        Sku: "PID10004-NAV-M",
        Size: "M",
        Color: "navy",
        Quantity: 15,
        Reserved: 0,
        WarehouseId: "WH1",
        UpdatedAt: { $date: "2025-10-11T15:00:00.000Z" },
      },
    ],
    FreeDelivery: true,
    ReturnPolicy: "30-day returns",
    ShippingInfo: {
      FreeShipping: true,
      EstimatedDelivery: "3-5 business days",
      ShippingPrice: { $numberDecimal: "0.00" },
      CashOnDelivery: true,
    },
    MetaTitle: "Luxury Cotton Nightshirt - Yobha",
    MetaDescription:
      "Premium cotton nightshirt for ultimate comfort and style.",
    Views: { $numberLong: "0" },
    UnitsSold: { $numberLong: "0" },
  });
  useEffect(() => {
    fetchProducts()
  }, [])

  // api call 
  const payload = {
    q: "night",
    category: "sleepwear",
    minPrice: 500,
    maxPrice: 2000,
    page: 1,
    pageSize: 10,
    sort: "latest",
    country: "IN"
  };

  const fetchProducts = async () => {
    try {
      const products = await getFilteredProducts(payload);
      console.log("Filtered Products:", products);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };
  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? product.Images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === product.Images.length - 1 ? 0 : prev + 1
    );
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  const handleAddToCart = () => {
    console.log("Add to cart:", quantity, selectedColor, selectedSize);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdf7f2] via-[#faf6f2] to-[#f8ede3] ">
      <div className="px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 ">
          <div className="space-y-4">
            <div className="flex justify-end gap-2 mb-3">
              <button
                onClick={() => setImageViewMode("single")}
                className={`p-2 rounded-lg transition-all ${imageViewMode === "single"
                    ? "bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] text-white"
                    : "bg-white text-[#8b5f4b] border border-[#e7bfb3]/30"
                  }`}
              >
                <ImageIcon size={18} />
              </button>
              <button
                onClick={() => setImageViewMode("grid")}
                className={`p-2 rounded-lg transition-all ${imageViewMode === "grid"
                    ? "bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] text-white"
                    : "bg-white text-[#8b5f4b] border border-[#e7bfb3]/30"
                  }`}
              >
                <Grid3x3 size={18} />
              </button>
            </div>

            {imageViewMode === "single" ? (
              <>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#e7bfb3]/30 bg-white aspect-square">
                  <img
                    src={product.Images[selectedImage].Url}
                    alt={product.Images[selectedImage].Alt}
                    className="w-full h-full object-cover"
                  />
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
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {product.Images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === selectedImage ? "bg-[#d9a79a] w-6" : "bg-white/60"
                          }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {product.Images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-lg overflow-hidden border-2 transition-all ${index === selectedImage
                          ? "border-[#d9a79a] shadow-md"
                          : "border-[#e7bfb3]/30 hover:border-[#e7bfb3]"
                        }`}
                    >
                      <img
                        src={image.Url}
                        alt={image.Alt}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {product.Images.map((image, index) => (
                  <div
                    key={index}
                    className="rounded-2xl overflow-hidden shadow-lg border border-[#e7bfb3]/30 bg-white aspect-square"
                  >
                    <img
                      src={image.Url}
                      alt={`${product.Name} - View ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* --- Right Column --- */}
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d9a79a] via-[#e7bfb3] to-[#f6d6cb] mb-3">
                {product.Name}
              </h1>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.AverageRating)
                          ? "fill-[#d9a79a] text-[#d9a79a]"
                          : "text-[#e7bfb3]"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-[#7a5650]">
                  {product.AverageRating} ({product.ReviewCount} reviews)
                </span>
              </div>
              <p className="text-[#7a5650] text-sm sm:text-base leading-relaxed">
                {product.Description}
              </p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d9a79a] to-[#8b5f4b]">
                {product.Price.$numberDecimal}
              </span>
              {product.CompareAtPrice && (
                <span className="text-lg text-[#a2786b] line-through">
                  {product.CompareAtPrice.$numberDecimal}
                </span>
              )}
              {product.DiscountPercent && (
                <span className="bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {product.DiscountPercent}% OFF
                </span>
              )}
            </div>

            {/* --- Color Selection --- */}
            <div>
              <h3 className="text-sm font-semibold text-[#8b5f4b] mb-3 uppercase tracking-wide">
                Select Color:{" "}
                <span className="text-[#d9a79a]">{product.AvailableColors[selectedColor]}</span>
              </h3>
              <div className="flex gap-3 flex-wrap">
                {product.AvailableColors.map((color, index) => {
                  const colorHex =
                    color === "navy"
                      ? "#001f3f"
                      : color === "black"
                        ? "#000000"
                        : "#ffffff";
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`relative w-12 h-12 rounded-full border-4 transition-all ${index === selectedColor
                          ? "border-[#d9a79a] scale-110 shadow-lg"
                          : "border-[#e7bfb3]/30 hover:border-[#e7bfb3]"
                        }`}
                      style={{ backgroundColor: colorHex }}
                      title={color}
                    >
                      {index === selectedColor && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full shadow-md"></div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* --- Size Selection --- */}
            <div>
              <h3 className="text-sm font-semibold text-[#8b5f4b] mb-3 uppercase tracking-wide">
                Select Size
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {product.SizeOfProduct.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 sm:py-3 rounded-lg font-semibold text-sm transition-all ${selectedSize === size
                        ? "bg-gradient-to-r from-[#e7bfb3] to-[#d9a79a] text-white shadow-md"
                        : "bg-white text-[#7a5650] border border-[#e7bfb3]/30 hover:border-[#e7bfb3]"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* --- Quantity & Add to Cart --- */}
            <div className="pt-4">
              {quantity === 0 ? (
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
                        <Minus size={16} className="text-[#d9a79b]" />
                      </button>
                      <span className="font-semibold text-lg">{quantity}</span>
                      <button
                        onClick={handleIncrement}
                        className="bg-white border-2 border-[#e7bfb3] p-3 rounded-lg hover:bg-[#faf6f2] hover:border-[#d9a79a] transition-all hover:scale-110"
                      >
                        <Plus size={16} className="text-[#d9a79b]" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-[#f6d6cb] via-[#e7bfb3] to-[#d9a79a] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={20} />
                    Update Cart
                  </button>
                </>
              )}
            </div>

            {/* --- Key Features / Specs / Care --- */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-semibold text-[#8b5f4b] mb-3 uppercase tracking-wide">
                Key Features
              </h3>
              <ul className="list-disc list-inside text-[#7a5650] space-y-1">
                {(product.KeyFeatures || []).map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h3 className="text-sm font-semibold text-[#8b5f4b] mb-3 uppercase tracking-wide">
                Specifications
              </h3>
              <ul className="list-disc list-inside text-[#7a5650] space-y-1">
                {product.Specifications &&
                  Object.entries(product.Specifications).map(([key, value], index) => (
                    <li key={index}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
              </ul>

              <h3 className="text-sm font-semibold text-[#8b5f4b] mb-3 uppercase tracking-wide">
                Care Instructions
              </h3>
              <ul className="list-disc list-inside text-[#7a5650] space-y-1">
                {(product.CareInstructions || []).map((care, index) => (
                  <li key={index}>{care}</li>
                ))}
              </ul>

              {/* --- Reviews --- */}
              <h3 className="text-sm font-semibold text-[#8b5f4b] mb-3 uppercase tracking-wide">
                Reviews
              </h3>
              <div className="space-y-4">
                {product.Reviews.map((review) => (
                  <div
                    key={review._id}
                    className="border border-[#e7bfb3]/30 p-4 rounded-xl bg-white shadow-sm"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < review.Rating ? "fill-[#d9a79a] text-[#d9a79a]" : "text-[#e7bfb3]"}
                        />
                      ))}
                      <span className="text-sm text-[#7a5650] font-semibold">
                        {review.ReviewerName}
                      </span>
                    </div>
                    <p className="text-sm text-[#7a5650]">{review.Comment}</p>
                  </div>
                ))}
              </div>

              {/* --- Product Variations --- */}
              <h3 className="text-sm font-semibold text-[#8b5f4b] mb-3 uppercase tracking-wide">
                Product Variations
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {product.ProductVariationIds.map((variation) => (
                  <div
                    key={variation._id}
                    className="border border-[#e7bfb3]/30 p-2 rounded-xl bg-white shadow-sm"
                  >
                    <img
                      src={variation.Image}
                      alt={variation.Name}
                      className="w-full h-32 object-cover rounded-lg mb-2"
                    />
                    <p className="text-sm text-[#7a5650] font-semibold">{variation.Name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
