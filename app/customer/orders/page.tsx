'use client'

import { ChevronRight, Clock, Package, ShoppingBag, Truck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Define order status types and their properties
const orderStatuses = {
  pending: {
    label: 'Order Pending',
    icon: Clock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200'
  },
  processing: {
    label: 'Processing',
    icon: Package,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200'
  },
  shipped: {
    label: 'Shipped',
    icon: Truck,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200'
  },
  delivered: {
    label: 'Delivered',
    icon: ShoppingBag,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200'
  }
}

// Mock orders data
const orders = [
  {
    id: '1234',
    date: '2024-03-09',
    status: 'delivered',
    total: 2499,
    items: [
      {
        id: 1,
        name: "Nivea Perfect & Radiant",
        price: 1299,
        quantity: 1,
        image: "/nivea-oil.webp"
      }
    ]
  },
  {
    id: '1235',
    date: '2024-03-08',
    status: 'shipped',
    total: 3699,
    items: [
      {
        id: 2,
        name: "L'Oreal Paris Revitalift",
        price: 2499,
        quantity: 1,
        image: "/nivea-oil.webp"
      }
    ]
  }
]

export default function OrdersPage() {
  return (


    <div className="w-full">
      <div className="w-full bg-secondary">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Link href="/" className="hover:text-accent-1">Home</Link>
              <ChevronRight size={16} />
              <span className="text-accent-1">My Orders</span>
            </div>
          </div>
        </div>

      <div className="px-2 md:px-4 py-4 bg-primary shadow-sm rounded-[1px] w-full">        

          <div className="space-y-4">
            {orders.map((order) => {
              const status = orderStatuses[order.status as keyof typeof orderStatuses]
              const StatusIcon = status.icon

              return (
                <div 
                  key={order.id}
                  className="bg-primary rounded-[1px] border border-medium p-4 relative"
                >
                  {/* View Details Button - Moved to top right */}
                  <Link
                    href={`/customer/orders/${order.id}`}
                    className="absolute top-4 right-4 inline-flex items-center px-3 py-1.5 text-sm font-medium text-accent-1 hover:bg-pink-50 rounded-[1px] transition-colors"
                  >
                    View Details
                  </Link>

                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-start pr-24"> {/* Added right padding for button space */}
                      {/* Left - Image */}
                      <div className="relative w-20 h-20 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover rounded-[1px]"
                        />
                      </div>

                      {/* Center - Order Details */}
                      <div className="flex-1 px-4">
                        <div className="text-left">
                          {/* Order ID */}
                          <p className="text-sm text-gray-500 mb-2">Order #{order.id}</p>
                          
                          {/* Product Name */}
                          <h3 className="font-medium text-gray-800 mb-2">{item.name}</h3>
                          
                          {/* Status and Date Row */}
                          <div className="flex items-center gap-3">
                            <div className={`
                              inline-flex items-center gap-1.5 px-3 py-1 rounded-[20px] text-sm font-medium
                              border ${status.border} ${status.bg} ${status.color}
                            `}>
                              <StatusIcon className="w-4 h-4" />
                              {status.label}
                            </div>
                            <span className="text-gray-300">•</span>
                            <p className="text-sm text-gray-500">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

        {orders.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-lg font-medium text-gray-800 mb-2">No orders yet</h2>
            <p className="text-gray-500 mb-6">When you place an order, it will appear here</p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-pink-600 text-white font-medium rounded-md hover:bg-pink-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}