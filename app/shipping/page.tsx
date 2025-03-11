'use client'

import { ChevronRight,  Info } from 'lucide-react'
import Link from 'next/link'

const shippingMethods = [
  {
    name: 'Standard Shipping',
    description: 'Delivered within 5-7 business days',
    time: '5-7 days',
    cost: 'KES 500',
    icon: ChevronRight
  },
  {
    name: 'Express Shipping',
    description: 'Delivered within 2-3 business days',
    time: '2-3 days',
    cost: 'KES 1000',
    icon: ChevronRight
  }
]

const deliveryInfo = [
  {
    title: "Delivery Areas",
    content: "We deliver to all major towns and cities across Kenya. Remote areas might experience longer delivery times."
  },
  {
    title: "Tracking Orders",
    content: "Once your order is dispatched, you'll receive a tracking number via email and SMS to monitor your delivery."
  },
  {
    title: "Order Processing",
    content: "Orders are processed within 24 hours during business days (Monday-Friday, excluding public holidays)."
  }
]

export default function ShippingPage() {
  return (
    <div className="bg-primary text-primary">
      {/* Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1">Home</Link>
            <ChevronRight size={16} />
            <span className="text-accent-1">Shipping Information</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-primary mb-8">
          Shipping Information
        </h1>

        {/* Shipping Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {shippingMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <div 
                key={index}
                className="border border-medium rounded-[1px] p-6 bg-secondary"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-accent-1 rounded-full">
                    <Icon className="w-5 h-5 text-contrast" />
                  </div>
                  <h3 className="font-semibold text-primary">{method.name}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-secondary">{method.description}</p>
                  <p className="font-medium text-primary">
                    Delivery Time: <span className="text-secondary">{method.time}</span>
                  </p>
                  <p className="font-medium text-primary">
                    Cost: <span className="text-accent-1">{method.cost}</span>
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Delivery Information */}
        <div className="space-y-6">
          {deliveryInfo.map((info, index) => (
            <div 
              key={index}
              className="border border-medium rounded-[1px] p-6 bg-secondary"
            >
              <h3 className="font-semibold text-primary mb-2">{info.title}</h3>
              <p className="text-secondary">{info.content}</p>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-accent-1/10 border border-medium rounded-[1px] p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-accent-1 mt-1" />
            <div>
              <h3 className="font-semibold text-primary mb-2">Important Notice</h3>
              <p className="text-secondary">
                Delivery times may vary during peak seasons and holidays. For urgent 
                deliveries or special arrangements, please contact our customer service team.
              </p>
              <Link 
                href="/contact"
                className="inline-block mt-4 text-accent-1 hover:text-accent-2"
              >
                Contact Customer Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}