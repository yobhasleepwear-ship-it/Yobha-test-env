import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product,setProduct] = useState({
    id: 1,
    title: "Silk Night Shirt",
    description:
      "Hand-finished mulberry silk with mother-of-pearl buttons. Perfect for luxurious lounging and ultimate comfort.",
    price: "₹4,990",
    image:
      "https://i.etsystatic.com/19870219/r/il/9939a4/3877887290/il_fullxfull.3877887290_o82x.jpg",
  })
   

  return (
    <div className="min-h-screen bg-[#FAF6F2] pt-24 px-4 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12">

        <div className="flex-1 rounded-3xl overflow-hidden shadow-xl border border-[#e7bfb3]/30">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

     
        <div className="flex-1 flex flex-col justify-center gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#e7bfb3] via-[#f6d6cb] to-[#d9a79a]">
            {product.title}
          </h1>
          <p className="text-neutral-700 text-lg md:text-xl">{product.description}</p>
          <span className="text-2xl md:text-3xl font-semibold text-[#8b5f4b]">
            {product.price}
          </span>

          <button className="mt-4 w-full md:w-1/2 bg-gradient-to-r from-[#f6d6cb] via-[#e7bfb3] to-[#d9a79a] text-white font-semibold py-3 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
            Add to Cart
          </button>
        </div>
      </div>

      
      <div className="max-w-6xl mx-auto mt-12 bg-white rounded-3xl p-8 shadow-lg border border-[#e7bfb3]/20">
        <h2 className="text-2xl font-semibold text-[#8b5f4b] mb-4">
          Product Details
        </h2>
        <p className="text-neutral-700 text-base leading-relaxed">
          {product.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Vivamus lacinia odio vitae vestibulum vestibulum. Cras venenatis euismod malesuada. 
          A luxury product designed to elevate your style and comfort. Perfect for gifting 
          or treating yourself to the finest.
        </p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
