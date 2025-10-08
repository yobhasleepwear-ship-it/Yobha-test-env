import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/productDetail/${product.id}`);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition transform hover:-translate-y-1 border border-rose-200 p-4 flex flex-col items-center text-center">
      <div className="w-full h-60 overflow-hidden rounded-xl mb-4">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {product.name}
      </h2>
      <p className="text-rose-600 font-bold text-lg mb-3">{product.price}</p>
      <button
        onClick={handleViewDetails}
        className="bg-gradient-to-r from-rose-400 to-amber-300 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:opacity-90 transition-all"
      >
        View Details
      </button>
    </div>
  );
};

export default ProductCard;
