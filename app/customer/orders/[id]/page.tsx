'use client'

import { Package, Clock, Truck, ShoppingBag, ChevronRight, CreditCard, MapPin, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Order status configuration with timeline tracking
const orderStatuses = {
  pending: {
    label: 'Pending',
    icon: Clock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    step: 1
  },
  processing: {
    label: 'Processing',
    icon: Package,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    step: 2
  },
  shipped: {
    label: 'Shipped',
    icon: Truck,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    step: 3
  },
  delivered: {
    label: 'Delivered',
    icon: ShoppingBag,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
    step: 4
  }
}

// Mock order data - replace with actual data fetching
const order = {
  id: '1234',
  date: '2024-03-09',
  status: 'processing',
  total: 2499,
  items: [
    {
      id: 1,
      name: "Nivea Perfect & Radiant",
      price: 1299,
      quantity: 2,
      image: "/nivea-oil.webp",
      variants: {
        size: "50ml",
        color: "Pink"
      }
    }
  ],
  shipping: {
    name: "John Doe",
    phone: "+254712345678",
    address: "Karen Road",
    city: "Nairobi",
    method: "Standard Delivery",
    estimatedDelivery: "March 15, 2024"
  },
  payment: {
    method: "Credit Card",
    cardNumber: "**** **** **** 1234",
    cardType: "Visa",
    status: "Paid"
  },
  trackingDetails: {
    number: "KE9876543210",
    carrier: "DHL Express",
    updates: [
      { date: "2024-03-09", time: "09:15 AM", status: "Order Confirmed", location: "Processing Center" },
      { date: "2024-03-10", time: "02:30 PM", status: "Package Prepared", location: "Warehouse" },
      { date: "2024-03-11", time: "10:45 AM", status: "Shipped", location: "Dispatch Center" },
      { date: "2024-03-12", time: "03:20 PM", status: "Delivered", location: "Customer Address" }
    ]
  }
}



export default function OrderDetailsPage() {
  const status = orderStatuses[order.status as keyof typeof orderStatuses]
  const StatusIcon = status.icon
  
  return (
    <div className="w-full">
      {/* Header with Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1">Home</Link>
            <ChevronRight size={16} />
            <Link href="/customer/orders" className="hover:text-accent-1">My Orders</Link>
            <ChevronRight size={16} />
            <span className="text-accent-1">Order #{order.id}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl px-4 py-4 bg-primary shadow-sm rounded-[4px] w-full">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Order Header with Status and Track Button */}
            <div className="bg-primary border border-medium rounded-[4px] p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-xl font-bold text-secondary">
                    Order #{order.id}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Placed on {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`
                    inline-flex items-center gap-1.5 px-3 py-1 rounded-[20px] text-sm font-medium
                    border ${status.border} ${status.bg} ${status.color}
                  `}>
                    <StatusIcon className="w-4 h-4" />
                    {status.label}
                  </div>
                  <Link 
                    href={`/customer/orders/${order.id}/track`}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-accent-1 bg-secondary rounded-[4px] hover:bg-pink-50 transition-colors"
                  >
                    Track Order
                  </Link>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-primary border border-medium rounded-[4px] p-6">
              <h2 className="text-lg font-medium text-secondary mb-4">Order Items</h2>
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <div className="relative w-24 h-24 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-[4px]"
                      />
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="flex justify-between">
                        <h3 className="font-medium text-secondary">{item.name}</h3>
                        <div className="text-sm font-medium text-accent-1">
                          KES {item.price.toLocaleString()}
                        </div>
                      </div>
                      {item.variants && (
                        <div className="mt-1 flex flex-wrap gap-2">
                          {Object.entries(item.variants).map(([key, value]) => (
                            <span key={key} className="text-xs px-2 py-0.5 bg-gray-100 rounded-[4px] text-gray-600">
                              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="mt-2 text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-1 space-y-6">
            {/* Order Summary */}
            <div className="bg-primary border border-medium rounded-[4px] p-6">
              <h2 className="text-lg font-medium text-secondary mb-4">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-secondary">
                    KES {order.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-secondary">KES 250</span>
                </div>
                <div className="pt-2 mt-2 border-t border-medium">
                  <div className="flex justify-between font-medium">
                    <span className="text-secondary">Total</span>
                    <span className="text-accent-1">
                      KES {(order.total + 250).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="bg-primary border border-medium rounded-[4px] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-secondary">Payment Information</h2>
                <CreditCard className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Method</span>
                  <span className="text-secondary">{order.payment.method}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Card</span>
                  <span className="text-secondary">{order.payment.cardNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="flex items-center gap-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    {order.payment.status}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Shipping Details */}
            <div className="bg-primary border border-medium rounded-[4px] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-secondary">Shipping Details</h2>
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-2 text-sm">
                <p className="font-medium text-secondary">{order.shipping.name}</p>
                <p className="text-gray-500">{order.shipping.phone}</p>
                <p className="text-gray-500">{order.shipping.address}</p>
                <p className="text-gray-500">{order.shipping.city}</p>
                <div className="pt-2 mt-2 border-t border-medium">
                  <p className="text-gray-500">Method: <span className="text-secondary">{order.shipping.method}</span></p>
                  <p className="text-gray-500">Estimated Delivery: <span className="text-secondary">{order.shipping.estimatedDelivery}</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}