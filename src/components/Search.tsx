'use client'
import { useState, useRef, useEffect } from 'react';
import { client } from '../sanity/client';
import { urlFor } from '../sanity/lib/image';
import Link from 'next/link';
import { useClickOutside } from '@/hooks/useClickOutside';

interface SearchProduct {
  _id: string;
  name: string;
  price: number;
  image: any;
  category: string;
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<SearchProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchRef, () => {
    setIsOpen(false);
    setSearchTerm('');
    setResults([]);
  });

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.length >= 2) {
        setLoading(true);
        try {
          const query = `*[_type == "product" && name match "*${searchTerm}*"] {
            _id,
            name,
            price,
            category,
            image
          }[0...5]`;
          const data = await client.fetch(query);
          setResults(data);
        } catch (error) {
          console.error('Search error:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div ref={searchRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-700 hover:text-gray-900 focus:outline-none p-2 rounded-full hover:bg-gray-100"
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
          <div className="p-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              autoFocus
            />
          </div>

          {loading && (
            <div className="px-4 py-3 text-gray-500">Searching...</div>
          )}

          {results.length > 0 && (
            <div className="max-h-96 overflow-y-auto">
              {results.map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  onClick={() => setIsOpen(false)}
                  className="block hover:bg-gray-50"
                >
                  <div className="flex items-center px-4 py-3 border-b border-gray-100">
                    <img
                      src={urlFor(product.image).width(50).height(50).url()}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.category}</p>
                      <p className="text-sm font-medium text-gray-900">PKR {product.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {searchTerm.length >= 2 && results.length === 0 && !loading && (
            <div className="px-4 py-3 text-gray-500">No products found</div>
          )}
        </div>
      )}
    </div>
  );
} 