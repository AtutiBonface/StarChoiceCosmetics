'use client'

import { useState } from 'react'
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'

interface FAQ {
  id: number
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    id: 1,
    question: "How do I place an order?",
    answer: "You can place an order by browsing our products, adding items to your cart, and proceeding to checkout. You'll need to create an account or sign in, provide shipping details, and complete payment.",
    category: "Orders"
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: "We accept M-Pesa, credit/debit cards, and bank transfers. All payments are processed securely through our payment partners.",
    category: "Payment"
  },
  {
    id: 3,
    question: "How long does delivery take?",
    answer: "Delivery times vary by location. Within Nairobi, delivery takes 1-2 business days. For other regions in Kenya, it takes 2-5 business days.",
    category: "Shipping"
  },
  {
    id: 4,
    question: "What is your return policy?",
    answer: "We accept returns within 14 days of delivery. Items must be unused, in original packaging, and accompanied by the receipt. Contact our customer service to initiate a return.",
    category: "Returns"
  },
  {
    id: 5,
    question: "Are your products authentic?",
    answer: "Yes, all our products are 100% authentic and sourced directly from authorized distributors and manufacturers. We provide genuine products with manufacturer warranty where applicable.",
    category: "Products"
  }
]

const categories = Array.from(new Set(faqs.map(faq => faq.category)))

export default function FAQsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')

  const filteredFAQs = activeCategory === 'All' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory)

  return (
    <div>
      {/* Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1">Home</Link>
            <ChevronRight size={16} />
            <span className="text-accent-1">FAQs</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-secondary text-center mb-2">
          Frequently Asked Questions
        </h1>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveCategory('All')}
            className={`px-4 py-2 rounded-[1px] text-sm font-medium transition-colors
              ${activeCategory === 'All' 
                ? 'bg-accent-1 text-white' 
                : 'bg-transparent text-gray-600 hover:bg-gray-200'
              }`}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-[1px] text-sm font-medium transition-colors
                ${activeCategory === category 
                  ? 'bg-accent-1 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <div 
              key={faq.id}
              className="border border-medium bg-secondary rounded-[1px] overflow-hidden"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <span className="font-medium text-secondary">{faq.question}</span>
                {openFAQ === faq.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {openFAQ === faq.id && (
                <div className="px-4 pb-4  bg-secondary">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Can&apos;t find what you&apos;re looking for?{' '}
            <Link href="/contact" className="text-accent-1 hover:text-pink-700">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}