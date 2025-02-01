'use client'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderConfirmation() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-4">Thank you for your purchase</p>
          <p className="text-sm text-gray-500 mb-8">Order Number: {orderNumber}</p>
          <Link 
            href="/products" 
            className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}