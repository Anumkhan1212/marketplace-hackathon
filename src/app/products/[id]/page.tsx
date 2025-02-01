'use client'
import { useEffect, useState, use } from 'react';
import { client } from '../../../sanity/client';
import { useCart } from '../../../context/CartContext';
import Link from 'next/link';
import { urlFor } from '../../../sanity/lib/image';
import { ImageSlideshow } from '../../../components/ImageSlideshow';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    _type: 'image';
  };
  images: {
    _key: string;
    asset: {
      _ref: string;
      _type: 'reference';
    };
    color?: string;
    alt?: string;
  }[];
  filters: {
    color: string[];
  };
}

const formatPrice = (price: number) => {
  return PKR ${price.toLocaleString()};
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | undefined>();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await client.fetch(
          *[_type == "product" && _id == $id][0],
          { id: resolvedParams.id }
        );
        setProduct(data);
        if (data?.filters?.color?.length > 0) {
          setSelectedColor(data.filters.color[0]);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [resolvedParams.id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0 md:w-1/2">
            <ImageSlideshow 
              images={product.images} 
              selectedColor={selectedColor}
            />
          </div>
          <div className="p-8 md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {product.name}
            </h1>
            
            {/* Color Selection */}
            {product.filters?.color?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Colors</h3>
                <div className="flex space-x-2">
                  {product.filters.color.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full ${
                        selectedColor === color 
                          ? 'border-2 border-black' 
                          : color === 'white'
                            ? 'border border-gray-300 bg-gray-50 hover:bg-white'
                            : 'border-transparent'
                      } transition-all duration-200`}
                      style={{ backgroundColor: color }}
                      aria-label={Select ${color} color}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Rest of your product details */}
          </div>
        </div>
      </div>
    </div>
  );
}