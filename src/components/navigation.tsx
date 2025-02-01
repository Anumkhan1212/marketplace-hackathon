'use client'
import React, { useRef, useState, useEffect } from 'react';
import { useClickOutside } from '@/hooks/useClickOutside';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Search from './Search';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { cartItems } = useCart();
  const { user, signOut } = useAuth();

  useEffect(() => {
    setMounted(true);
    // Add a small delay to ensure auth state is loaded
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  // Prevent hydration issues and loading state
  if (!mounted || isLoading) return null;

  console.log('Navigation user:', user); // Debug log
  console.log('Admin email check:', user?.email?.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase()); // Debug log

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              LOGO
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shirts" className="text-gray-700 hover:text-gray-900">
              Shirts
            </Link>
            <Link href="/pants" className="text-gray-700 hover:text-gray-900">
              Pants
            </Link>
            <Link href="/suits" className="text-gray-700 hover:text-gray-900">
              Suits
            </Link>
            <Link href="/kids" className="text-gray-700 hover:text-gray-900">
              Kids
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Search />
            <Link href="/cart" className="text-gray-700 hover:text-gray-900 relative">
              Cart
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center text-gray-700 hover:text-gray-900 focus:outline-none"
              >
                <span>Menu</span>
                <svg
                  className={`ml-2 h-5 w-5 transform transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {user ? (
                    <>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Profile
                      </Link>
                      {user.email?.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() && (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsOpen(false)}
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/register"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsOpen(false)}
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
} 