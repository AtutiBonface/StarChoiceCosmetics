'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

const returnPolicySections = [
  {
    title: "Return Window",
    content: "You have 14 days from the date of delivery to initiate a return. Items must be unused, in their original packaging, and in resalable condition."
  },
  {
    title: "Eligible Items",
    content: "Most beauty products are eligible for return. However, for hygiene reasons, we cannot accept returns on:\n- Opened cosmetics\n- Used skincare products\n- Damaged or tampered packaging\n- Intimate hygiene products"
  },
  {
    title: "Return Process",
    steps: [
      "Contact our customer service team to initiate your return",
      "Receive a return authorization number",
      "Pack the item(s) securely in original packaging",
      "Attach the return label provided",
      "Drop off at designated courier location"
    ]
  },
  {
    title: "Refund Process",
    content: "Once we receive and inspect your return, we will process your refund within 3-5 business days. The refund will be issued to your original payment method. Shipping costs are non-refundable."
  },
  {
    title: "Damaged or Incorrect Items",
    content: "If you receive damaged or incorrect items, please contact us within 48 hours of delivery. We will arrange for collection and replacement at no additional cost."
  }
]

export default function ReturnsPage() {
  return (
    <div className="w-full mt-28 md:mt-38">
      {/* Breadcrumb */}
      <div className="w-full bg-[#A9BA9D]">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-[#333333]">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <ChevronRight size={16} />
            <span className="text-pink-600">Returns Policy</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#333333] mb-2">Returns Policy</h1>

        {/* Introduction */}
        <p className="text-gray-600 mb-8">
          At Star Choice Cosmetics, we want you to be completely satisfied with your purchase. 
          If you&apos;re not happy with your order, we offer a simple returns process.
        </p>

        {/* Policy Sections */}
        <div className="space-y-8">
          {returnPolicySections.map((section, index) => (
            <div key={index} className="bg-secondary border border-[#A9BA9D] rounded-[1px] p-6">
              <h2 className="text-xl font-semibold text-[#333333] mb-4">
                {section.title}
              </h2>
              
              {'steps' in section ? (
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  {section.steps?.map((step, stepIndex) => (
                    <li key={stepIndex} className="pl-2">{step}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-600 whitespace-pre-line">
                  {section.content}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 bg-pink-50 border border-pink-100 rounded-[1px] p-6">
          <h2 className="text-xl font-semibold text-[#333333] mb-4">
            Need Help with a Return?
          </h2>
          <p className="text-gray-600 mb-4">
            Our customer service team is here to assist you with the returns process.
          </p>
          <div className="flex gap-4">
            <Link 
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-2 bg-pink-600 text-white rounded-[1px] hover:bg-pink-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              href="/faqs"
              className="inline-flex items-center justify-center px-6 py-2 border border-pink-600 text-pink-600 rounded-[1px] hover:bg-pink-50 transition-colors"
            >
              View FAQs
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}