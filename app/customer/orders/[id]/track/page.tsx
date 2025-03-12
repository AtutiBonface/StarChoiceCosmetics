'use client'

import { ChevronRight, Clock, CheckSquare } from 'lucide-react'
import Link from 'next/link'

// Define tracking status steps
const trackingSteps = [
  {
    status: 'Order Placed',
    date: '13-01',
    time: '10:30 AM',
    isCompleted: true,
    description: 'Your order has been placed successfully'
  },
  {
    status: 'Pending Confirmation',
    date: '13-01',
    time: '11:45 AM',
    isCompleted: true,
    description: 'Order is being reviewed'
  },
  {
    status: 'Waiting to be Shipped',
    date: '13-01',
    time: '2:30 PM',
    isCompleted: true,
    description: 'Order is being prepared for shipping'
  },
  {
    status: 'Shipped',
    date: '13-01',
    time: '4:15 PM',
    isCompleted: true,
    description: 'Your order is on the way'
  },
  {
    status: 'Available for pickup',
    date: '15-01',
    time: '9:00 AM',
    isCompleted: false,
    description: 'Order is ready for collection'
  },
  {
    status: 'Delivered',
    date: '15-01',
    time: '2:45 PM',
    isCompleted: false,
    description: 'Your item/order has been delivered'
  }
]

export default function TrackingPage({ params }: { params: { id: string } }) {
  return (
    <div className="w-full">
      {/* Header with Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-primary">
            <Link href="/" className="hover:text-pink-600">Home</Link>
            <ChevronRight size={16} />
            <Link href="/customer/orders" className="hover:text-pink-600">My Orders</Link>
            <ChevronRight size={16} />
            <Link href={`/customer/orders/${params.id}`} className="hover:text-pink-600">
              Order #{params.id}
            </Link>
            <ChevronRight size={16} />
            <span className="text-pink-600">Track Order</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-4 bg-primary shadow-sm rounded-[4px] w-full">
        <div className="bg-primary border border-medium rounded-[4px] p-4">
          <h1 className="text-xl font-bold text-primary mb-4">
            Track Order #{params.id}
          </h1>

          {/* Vertical Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[11px] top-3 bottom-3 w-[2px] bg-secondary" />

            {/* Timeline Steps */}
            <div className="space-y-8">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex gap-4">
                  {/* Timeline Marker */}
                  <div className={`
                    relative w-6 h-6 flex items-center justify-center flex-shrink-0
                    ${step.isCompleted 
                      ? 'border-pink-600 bg-pink-50' 
                      : 'border-medium bg-primary'
                    }
                  `}>
                    {step.isCompleted ? (
                      <CheckSquare className="w-6 h-6 text-pink-600" />
                    ) : (
                      <Clock className="w-6 h-6 text-gray-400" />
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 -mt-2">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className={`font-medium ${
                          step.isCompleted ? 'text-primary' : 'text-gray-500'
                        }`}>
                          {step.status}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {step.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-primary">
                          {step.date}
                        </p>
                        <p className="text-sm text-gray-500">
                          {step.time}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}