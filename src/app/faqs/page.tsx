import Link from 'next/link';

export default function FAQsPage() {
  const faqs = [
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "How long will it take to receive my order?",
          a: "Standard shipping typically takes 3-5 business days within the US. Express shipping (1-2 business days) is available at checkout. International shipping may take 7-14 business days."
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. You can view specific shipping details during checkout."
        },
        {
          q: "How can I track my order?",
          a: "Once your order ships, you'll receive a confirmation email with a tracking number and link to monitor your package's journey."
        },
        {
          q: "How much is shipping?",
          a: "Standard shipping is PKR 1000 for all orders within Pakistan. International shipping rates vary by location."
        }
      ]
    },
    {
      category: "Sizing & Fit",
      questions: [
        {
          q: "How do I find my correct size?",
          a: "We provide detailed size guides for all our products. You can find our comprehensive size guide in the footer menu. Each product page also includes specific measurements."
        },
        {
          q: "What if my item doesn't fit?",
          a: "No worries! You can return items that don't fit within 30 days of delivery. Make sure items are unworn with original tags attached."
        },
        {
          q: "Do your sizes run true to size?",
          a: "Our items generally run true to size. We recommend checking the size guide and product-specific fit notes for the most accurate sizing information."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer free returns within 30 days of delivery. Items must be unworn, unwashed, and have original tags attached. Certain items like intimates and face masks are final sale for hygiene reasons."
        },
        {
          q: "How do I start a return?",
          a: "Log into your account, go to your orders, and select 'Start Return'. Follow the prompts to generate a return label. If you checked out as a guest, use our returns portal and enter your order number."
        },
        {
          q: "How long does it take to process a return?",
          a: "Once we receive your return, it typically takes 3-5 business days to process. Refunds will be issued to your original payment method and may take an additional 2-5 business days to appear."
        }
      ]
    },
    {
      category: "Payment & Security",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Shop Pay. All transactions are secured with SSL encryption."
        },
        {
          q: "Is it safe to shop on your website?",
          a: "Yes, our website uses industry-standard SSL encryption to protect your personal and payment information. We never store your full credit card details."
        },
        {
          q: "Do you offer installment payments?",
          a: "Yes, we partner with Klarna and Afterpay to offer installment payment options. You can select these options during checkout."
        }
      ]
    },
    {
      category: "Product & Care",
      questions: [
        {
          q: "How should I care for my items?",
          a: "Each item comes with specific care instructions on the label. Generally, we recommend following the care label, washing in cold water, and air drying when possible to maintain quality."
        },
        {
          q: "Are your products true to the pictures shown?",
          a: "We strive to show our products as accurately as possible. While we make every effort to display colors accurately, slight variations may occur depending on your screen settings."
        },
        {
          q: "What materials do you use?",
          a: "We use a variety of high-quality materials. Each product page lists detailed material information. We prioritize both comfort and durability in our fabric selection."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-900">Frequently Asked Questions</h1>
          <p className="text-gray-600 text-center mb-12">
            Find answers to common questions about shopping with KAPRA
          </p>

          <div className="space-y-8">
            {faqs.map((category, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">{category.category}</h2>
                <div className="space-y-6">
                  {category.questions.map((faq, faqIdx) => (
                    <div key={faqIdx} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">{faq.q}</h3>
                      <p className="text-gray-600">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              We're here to help! Contact our customer service team.
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}