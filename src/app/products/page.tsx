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
  stockQuantity: number;
  category: string;
  image: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
    _type: 'image';
  };
}

const formatPrice = (price: number) => {
  return PKR ${price.toLocaleString()};
};

const ProductsPage = () => {
  const [productsByCategory, setProductsByCategory] = useState<{ [key: string]: Product[] }>({});
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch 2 products from each category
        const categories = ['shirts', 'pants', 'suits', 'kids'];
        const productsData: { [key: string]: Product[] } = {};

        for (const category of categories) {
          const data = await client.fetch(
            `*[_type == "product" && category == $category][0...2]{
              _id,
              name,
              description,
              price,
              stockQuantity,
              category,
              image
            }`,
            { category }
          );
          productsData[category] = data;
        }

        setProductsByCategory(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
        Our Collections
      </h1>

      {Object.entries(productsByCategory).map(([category, products]) => (
        <div key={category} className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 capitalize">
              {category}
            </h2>
            <Link 
              href={/${category}}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <Link href={/products/${product._id}}>
                  <div className="relative h-96 cursor-pointer">
                    <img
                      src={urlFor(product.image).width(800).height(600).url()}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="px-6 pb-6">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-black text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsPage;