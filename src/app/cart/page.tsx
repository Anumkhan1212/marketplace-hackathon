'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import { supabase } from '../../lib/supabase';
import { urlFor } from '../../sanity/lib/image';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setLoading(false);
    };

    checkAuth();
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number, stockQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= stockQuantity) {
      updateQuantity(productId, newQuantity);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Please Log In</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to view your cart</p>
          <Link
            href="/login?redirectTo=/cart"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Log In
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
          <Link 
            href="/products" 
            className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Explore Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {cart.map((item) => (
            <div key={item._id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm mb-4">
              <img
                src={urlFor(item.image).width(80).height(80).url()}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <div className="text-sm text-gray-600 mt-1">
                  {item.selectedColor && (
                    <span className="mr-4">Color: {item.selectedColor}</span>
                  )}
                  {item.selectedSize && (
                    <span>Size: {item.selectedSize}</span>
                  )}
                </div>
                <div className="text-gray-900 mt-1">
                  PKR {item.price.toLocaleString()}
                </div>
                <div className="flex items-center gap-4 mt-2">
                  {/* Quantity Controls */}
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1, item.stockQuantity)}
                      className="px-3 py-1 hover:bg-gray-100 text-gray-600 rounded-l-lg"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-x text-center min-w-[40px]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1, item.stockQuantity)}
                      className="px-3 py-1 hover:bg-gray-100 text-gray-600 rounded-r-lg"
                      disabled={item.quantity >= item.stockQuantity}
                    >
                      +
                    </button>
                  </div>
                  {/* Stock Info */}
                  <span className="text-sm text-gray-500">
                    {item.stockQuantity} available
                  </span>
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="text-right text-gray-900 font-semibold">
                PKR {(item.price * item.quantity).toLocaleString()}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm h-fit">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span>PKR {total.toLocaleString()}</span>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>PKR {total.toLocaleString()}</span>
            </div>
          </div>
          <button
            onClick={() => clearCart()}
            className="w-full bg-red-600 text-white py-2 rounded-lg mt-6 hover:bg-red-700"
          >
            Clear Cart
          </button>
          {cart.length > 0 && (
            <Link
              href="/checkout"
              className="w-full bg-black text-white py-2 rounded-lg mt-4 hover:bg-gray-800 block text-center"
            >
              Proceed to Checkout
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}