export default function CareersPage() {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Join Our Team</h1>
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070"
                  alt="Career Opportunities"
                  className="w-full h-[400px] object-cover rounded-lg mb-6"
                />
                <p className="text-xl text-gray-600 mb-4">
                  Be part of a dynamic team shaping the future of fashion retail.
                </p>
                <p className="text-gray-600 mb-8">
                  At KAPRA, we're building a team of passionate individuals who share our vision for quality and innovation in fashion.
                </p>
              </div>
  
              <div className="grid md:grid-cols-2 gap-8">
                <div className="text-left">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Current Openings</h2>
                  <ul className="space-y-4 text-gray-600">
                    <li className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <h3 className="font-semibold text-gray-900">Senior Fashion Designer</h3>
                      <p className="text-sm mb-2">New York, NY | Full-time</p>
                      <p className="text-sm text-gray-500">
                        Lead design initiatives for our upcoming collections.
                      </p>
                    </li>
                    <li className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <h3 className="font-semibold text-gray-900">Retail Store Manager</h3>
                      <p className="text-sm mb-2">Los Angeles, CA | Full-time</p>
                      <p className="text-sm text-gray-500">
                        Manage operations for our new flagship store.
                      </p>
                    </li>
                    <li className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                      <h3 className="font-semibold text-gray-900">E-commerce Specialist</h3>
                      <p className="text-sm mb-2">Remote | Full-time</p>
                      <p className="text-sm text-gray-500">
                        Drive our online retail strategy and growth.
                      </p>
                    </li>
                  </ul>
                </div>
  
                <div className="text-left">
                  <h2 className="text-2xl font-bold mb-4 text-gray-900">Why Join Us?</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <span className="text-xl mr-3">🌟</span>
                      <div>
                        <p className="font-semibold text-gray-900">Growth Opportunities</p>
                        <p className="text-sm text-gray-600">Career development and advancement paths</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-xl mr-3">💪</span>
                      <div>
                        <p className="font-semibold text-gray-900">Competitive Benefits</p>
                        <p className="text-sm text-gray-600">Health insurance, 401(k), and generous discounts</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="text-xl mr-3">🎯</span>
                      <div>
                        <p className="font-semibold text-gray-900">Innovation Focus</p>
                        <p className="text-sm text-gray-600">Be part of shaping the future of fashion retail</p>
                      </div>
                    </li>
                  </ul>
  
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-900">Apply Now</h3>
                    <p className="text-gray-600 mb-4">
                      Send your resume and cover letter to:
                    </p>
                    <a 
                      href="mailto:careers@kapra.com" 
                      className="text-black font-semibold hover:text-gray-700 transition-colors"
                    >
                      careers@kapra.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
  
            <div className="text-gray-600">
              <p className="mb-4">Don't see a position that matches your skills?</p>
              <p className="font-semibold">Send us your resume for future opportunities!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }