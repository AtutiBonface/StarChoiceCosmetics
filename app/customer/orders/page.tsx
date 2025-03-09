'use client'

import { Clock, Package, ShoppingBag, Truck } from 'lucide-react'
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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-[#333333] mb-6">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const status = orderStatuses[order.status as keyof typeof orderStatuses]
          const StatusIcon = status.icon

          return (
            <div 
              key={order.id}
              className="bg-white rounded-[1px] shadow-sm border border-[#A9BA9D] overflow-hidden"
            >
              {/* Order Header */}
              <div className="p-4 border-b border-[#A9BA9D] flex flex-col sm:flex-row justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className={`
                  flex items-center gap-2 px-3 py-1 rounded-full
                  ${status.bg} ${status.border} ${status.color}
                  text-sm font-medium
                `}>
                  <StatusIcon className="w-4 h-4" />
                  {status.label}
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-[1px]"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-[#333333]">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-pink-600">
                        KES {item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer */}
              <div className="p-4 border-t border-[#A9BA9D] bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-sm">
                  <span className="text-gray-500">Total: </span>
                  <span className="font-bold text-[#333333]">
                    KES {order.total.toLocaleString()}
                  </span>
                </div>
                <Link
                  href={`/customer/orders/${order.id}`}
                  className="inline-flex items-center justify-center px-4 py-2 bg-pink-600 text-white text-sm font-medium rounded-[1px] hover:bg-pink-600/90 transition-colors"
                >
                  See Details
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-[#333333] mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">When you place an order, it will appear here</p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-pink-600 text-white font-medium rounded-[1px] hover:bg-pink-600/90 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  )
}