import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../product/components/product-card";

const ProductsPage = () => {
  const { category } = useParams();

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Rose Gold Luxe Watch",
      price: "₹12,999",
      category: "accessories",
      img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    },
    {
      id: 2,
      name: "Velvet Glow Bag",
      price: "₹8,499",
      category: "bags",
      img: "https://images.unsplash.com/photo-1618354691373-d851c5d96e88?w=600",
    },
    {
      id: 3,
      name: "Champagne Glow Shoes",
      price: "₹9,999",
      category: "footwear",
      img: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600",
    },
  ]);



  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-rose-100 p-6">
      <h1 className="text-center text-3xl md:text-5xl font-bold text-rose-700 mb-8">
        {category ? `${category} Collection` : "Premium Products"}
      </h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
