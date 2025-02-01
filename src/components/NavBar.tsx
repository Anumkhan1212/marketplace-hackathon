'use client'
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Search from './Search';
import { Menu } from '@headlessui/react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Add User interface
interface User {
  id: string;
  email: string | null;
}

export default function NavBar() {
  // const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  // const dropdownRef = useRef<HTMLDivElement>(null);
  const { cartItems } = useCart();
  // const { user, signOut } = useAuth();
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [userState, setUserState] = useState<User | null>(null);
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUserState(session?.user ? {
        id: session.user.id,
        email: session.user.email || null
      } : null);
    });

    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserState(session?.user ? {
        id: session.user.id,
        email: session.user.email || null
      } : null);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Return Policy', href: '/return-policy' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Track Order', href: '/track-order' },
  ];

  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-[#1A1A1A] py-6">
        <div className="container mx-auto px-4">
          <Link 
            href="/" 
            className="text-4xl font-bold tracking-[0.2em] text-[#F8F8F8] hover:text-[#DCD6D0] block text-center transition-colors"
          >
            ALMIRA
          </Link>
        </div>
      </div>

      <div className="bg-[#F4F4F4] border-b border-[#E5E5E5]">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button 
              className="p-2 hover:bg-gray-200 rounded transition-colors"
              onClick={() => setIsNavDropdownOpen(!isNavDropdownOpen)}
            >
              <div className="space-y-1.5">
                <div className="w-6 h-0.5 bg-[#333333]"></div>
                <div className="w-6 h-0.5 bg-[#333333]"></div>
                <div className="w-6 h-0.5 bg-[#333333]"></div>
              </div>
            </button>

            {isNavDropdownOpen && (
              <div className="absolute top-full left-0 w-64 bg-white shadow-lg rounded-b-lg mt-1 py-2 z-50">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsNavDropdownOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}

            <div className="flex space-x-12 text-xs tracking-widest">
              <Link href="/shirts" className="text-[#333333] hover:text-[#1A1A1A] transition-colors">
                SHIRTS
              </Link>
              <Link href="/pants" className="text-[#333333] hover:text-[#1A1A1A] transition-colors">
                PANTS
              </Link>
              <Link href="/suits" className="text-[#333333] hover:text-[#1A1A1A] transition-colors">
                COMPLETE SUITS
              </Link>
              <Link href="/kids" className="text-[#333333] hover:text-[#1A1A1A] transition-colors">
                KIDS
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <Search />

              <Link href="/cart" className="text-[#333333] hover:text-[#1A1A1A] transition-colors relative">
                CART
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-4 bg-[#1A1A1A] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>

              <Menu as="div" className="relative">
                <Menu.Button className="flex items-center text-[#333333] hover:text-[#1A1A1A]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </Menu.Button>

                <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                  {userState ? (
                    <>
                      <Menu.Item>
                        <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          My Profile
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link 
                          href="/my-orders" 
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          My Orders
                        </Link>
                      </Menu.Item>
                      {userState.email?.toLowerCase() === process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase() && (
                        <Menu.Item>
                          <Link 
                            href="/admin" 
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Admin Dashboard
                          </Link>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </Menu.Item>
                    </>
                  ) : (
                    <>
                      <Menu.Item>
                        <Link href="/login" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Login
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <Link href="/register" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Register
                        </Link>
                      </Menu.Item>
                    </>
                  )}
                </Menu.Items>
              </Menu>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
} 