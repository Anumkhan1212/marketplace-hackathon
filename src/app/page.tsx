import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-gray-100">
        {/* Background Image with Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070')",
          }}
        >
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center text-center text-white px-4">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              Latest Collection Of
              <span className="block mt-3">2025</span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90">
              Discover the latest trends in fashion
            </p>
            <Link 
              href="/products" 
              className="inline-block bg-white text-[#1A1A1A] px-12 py-4 text-lg font-medium rounded-full hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link href="/shirts" className="relative h-96 group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?q=80&w=2070')",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all" />
            </div>
            <div className="relative h-full flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Shirts</h2>
            </div>
          </Link>
          <Link href="/pants" className="relative h-96 group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1997')",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all" />
            </div>
            <div className="relative h-full flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Pants</h2>
            </div>
          </Link>
          <Link href="/suits" className="relative h-96 group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=2080')",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all" />
            </div>
            <div className="relative h-full flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Complete Suits</h2>
            </div>
          </Link>
          <Link href="/kids" className="relative h-96 group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=2072')",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all" />
            </div>
            <div className="relative h-full flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">Kids</h2>
            </div>
          </Link>
        </div>
      </div>

      {/* USP Section (Unique Selling Points) */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="text-3xl mb-4">🔄</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Easy Returns</h3>
            <p className="text-gray-800 text-base font-medium">30-day return policy</p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-4">👕</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Premium Quality</h3>
            <p className="text-gray-800 text-base font-medium">Handpicked materials</p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-4">💳</div>
            <h3 className="text-xl font-bold mb-3 text-gray-900">Secure Payment</h3>
            <p className="text-gray-800 text-base font-medium">100% secure checkout</p>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="py-16 text-center bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Join Our Newsletter</h2>
          <p className="text-gray-800 text-lg mb-8 font-medium">
            Subscribe to receive updates, access to exclusive deals, and more.
          </p>
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400 text-gray-900 text-base"
            />
            <button className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium text-base">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}