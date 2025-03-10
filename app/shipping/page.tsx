'use client'

import { ChevronRight, Truck, Clock, MapPin, Info } from 'lucide-react'
import Link from 'next/link'

const shippingMethods = [
  {
    name: "Standard Delivery",
    time: "2-5 business days",
    cost: "KES 250",
    description: "Available for all locations within Kenya",
    icon: Truck
  },
  {
    name: "Express Delivery",
    time: "Next business day",
    cost: "KES 450",
    description: "Available in Nairobi and major towns",
    icon: Clock
  },
  {
    name: "Store Pickup",
    time: "Same day",
    cost: "Free",
    description: "Available at our Nairobi store locations",
    icon: MapPin
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
    <div className="w-full mt-28 md:mt-38">
      {/* Breadcrumb */}
      <div className="w-full bg-[#A9BA9D]">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-[#333333]">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <ChevronRight size={16} />
            <span className="text-pink-600">Shipping Information</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-4">
        {/* Title */}
        <h1 className="text-3xl font-bold text-[#333333] mb-8">
          Shipping Information
        </h1>

        {/* Shipping Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {shippingMethods.map((method, index) => {
            const Icon = method.icon
            return (
              <div 
                key={index}
                className="border border-[#A9BA9D] rounded-[1px] p-6 bg-secondary"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-pink-50 rounded-full">
                    <Icon className="w-5 h-5 text-pink-600" />
                  </div>
                  <h3 className="font-semibold text-[#333333]">{method.name}</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-gray-600">{method.description}</p>
                  <p className="font-medium text-[#333333]">
                    Delivery Time: <span className="text-gray-600">{method.time}</span>
                  </p>
                  <p className="font-medium text-[#333333]">
                    Cost: <span className="text-pink-600">{method.cost}</span>
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
              className="border border-[#A9BA9D] rounded-[1px] p-6 bg-secondary"
            >
              <h3 className="font-semibold text-[#333333] mb-2">{info.title}</h3>
              <p className="text-gray-600">{info.content}</p>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-pink-50 border border-pink-100 rounded-[1px] p-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-pink-600 mt-1" />
            <div>
              <h3 className="font-semibold text-[#333333] mb-2">Important Notice</h3>
              <p className="text-gray-600">
                Delivery times may vary during peak seasons and holidays. For urgent 
                deliveries or special arrangements, please contact our customer service team.
              </p>
              <Link 
                href="/contact"
                className="inline-block mt-4 text-pink-600 hover:text-pink-700"
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