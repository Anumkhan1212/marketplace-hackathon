'use client'
import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Subscribed:', email);
    setEmail('');
  };

  return (
    <footer className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Clothes</h3>
            <p className="text-gray-400">
              Premium clothing for those who appreciate quality and style.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-gray-400">
              {[
                { text: 'Contact Us', href: '/contact' },
                { text: 'Shipping Policy', href: '#' },
                { text: 'Returns & Exchanges', href: '#' },
                { text: 'FAQs', href: '/faqs' }
              ].map((item) => (
                <li key={item.text} className="hover:text-white cursor-pointer transition-colors">
                  <Link href={item.href}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400">
              {[
                { text: 'Size Guide', href: '/size-guide' },
                { text: 'Store Locator', href: '/store-locator' },
                { text: 'Careers', href: '/careers' }
              ].map((item) => (
                <li key={item.text} className="hover:text-white cursor-pointer transition-colors">
                  <Link href={item.href}>{item.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form onSubmit={handleSubscribe}>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 rounded focus:outline-none focus:border-gray-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
                >
                  Join
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Facebook</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
          </div>
          <p>&copy; 2024 Clothes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 