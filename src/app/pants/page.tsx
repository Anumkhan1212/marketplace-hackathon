'use client'
import { client } from '../../sanity/client';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import { urlFor } from '../../sanity/lib/image';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  gender?: string;
  sortBy?: string;
  stockQuantity: number;
  image: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    _type: 'image';
  };
}

export default function PantsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 0,
    gender: 'all',
    sortBy: 'default'
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(*[_type == "product" && category == "pants"]);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const resetFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 0,
      gender: 'all',
      sortBy: 'default'
    });
  };

  const applyFilters = () => {
    let filtered = products.filter(product => {
      const priceMatch = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      const genderMatch = filters.gender === 'all' || product.gender === filters.gender;
      return priceMatch && genderMatch;
    });

    // Handle sorting separately
    if (filters.sortBy === 'price-low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
    setShowFilters(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900">
          Pants Collection
        </h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Filters
        </button>
      </div>

      {/* Filter Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setShowFilters(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Price Range (PKR)
                </label>
                <div className="flex gap-4">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minPrice}
                    onChange={(e) => setFilters({...filters, minPrice: Number(e.target.value)})}
                    className="w-1/2 px-3 py-2 border rounded-lg text-gray-900 placeholder-gray-500"
                  />
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: Number(e.target.value)})}
                    className="w-1/2 px-3 py-2 border rounded-lg text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Gender
                </label>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters({...filters, gender: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-white"
                >
                  <option value="all">All</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Sort By
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                  className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-white"
                >
                  <option value="default">Default</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                </select>
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={resetFilters}
                  className="w-1/2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
                >
                  Reset
                </button>
                <button
                  onClick={applyFilters}
                  className="w-1/2 bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <Link href={/products/${product._id}}>
              <div className="relative h-64 cursor-pointer">
                <img
                  src={urlFor(product.image).width(800).height(600).url()}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                </div>
              </div>
            </Link>
            <div className="px-6 pb-6">
              <button
                onClick={() => addToCart(product)}
                className="w-full bg-[#1A1A1A] text-white py-2 px-4 rounded-full hover:bg-[#333333] transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}