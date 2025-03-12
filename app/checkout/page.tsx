'use client'

import { useState } from 'react'
import { CreditCard, Phone, MapPin, Store, Truck, ChevronRight, Edit2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type PaymentMethod = 'card' | 'mpesa' | 'pay_on_delivery' | 'pay_at_store'
type DeliveryMethod = 'store' | 'courier'

// Mock user address
const userAddress = {
  name: 'John Doe',
  phone: '+254712345678',
  address: 'Karen Road',
  city: 'Nairobi',
  isDefault: true
}

const deliveryMethods = {
  store: {
    id: 'store',
    name: 'Collect at Store',
    description: 'Free collection from our store',
    price: 0,
    icon: Store
  },
  courier: {
    id: 'courier',
    name: 'Delivery by Courier',
    description: 'Door to door delivery',
    price: 250,
    icon: Truck
  }
}



export default function CheckoutPage() {
  // Set initial delivery method
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('courier')
  
  // Set initial payment method based on delivery method
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    'pay_on_delivery' // This will be the default for courier delivery
  )

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      name: 'Nivea Perfect & Radiant',
      price: 1299,
      quantity: 2,
      image: '/nivea-oil.webp'
    }
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const deliveryFee = deliveryMethods[deliveryMethod].price
  const total = subtotal + deliveryFee

  // Update the delivery method change handler
  const handleDeliveryMethodChange = (method: DeliveryMethod) => {
    setDeliveryMethod(method)
    // Set payment method based on delivery type
    setPaymentMethod(method === 'store' ? 'pay_at_store' : 'pay_on_delivery')
  }

  return (
    <div className="min-h-screen bg-primary pt-2">
      <div className="max-w-7xl mx-auto px-2 pb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Order Details */}
          <div className="space-y-8">
            {/* Delivery Details */}
            <div className="bg-primary p-6 rounded-[4px] border border-medium">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-secondary">Delivery Details</h2>
                <Link
                  href="/customer/address"
                  className="text-sm text-accent-1 hover:text-pink-700 flex items-center gap-2"
                >
                  <Edit2 className="w-4 h-4" />
                  Change Address
                </Link>
              </div>

              {/* Delivery Method Selection */}
              <div className="space-y-4 mb-6">
                {Object.values(deliveryMethods).map((method) => {
                  const Icon = method.icon
                  return (
                    <label
                      key={method.id}
                      className={`
                        flex items-center justify-between p-4 rounded-[4px] border cursor-pointer
                        ${deliveryMethod === method.id 
                            ?'border-accent-1  bg-secondary' 
                            :'border-medium hover:bg-secondary'
                        }
                      `}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="radio"
                          name="delivery"
                          value={method.id}
                          checked={deliveryMethod === method.id}
                          onChange={(e) => handleDeliveryMethodChange(e.target.value as DeliveryMethod)}
                          className="text-accent-1 focus:ring-pink-600"
                        />
                        <div className="flex items-center gap-3">
                          <Icon className="w-5 h-5 text-secondary" />
                          <div>
                            <p className="font-medium text-secondary">{method.name}</p>
                            <p className="text-sm text-gray-500">{method.description}</p>
                          </div>
                        </div>
                      </div>
                      <span className="font-medium text-secondary">
                        {method.price === 0 ? 'FREE' : `KES ${method.price.toLocaleString()}`}
                      </span>
                    </label>
                  )
                })}
              </div>

              {/* Delivery Address - Show only for courier delivery */}
              {deliveryMethod === 'courier' && (
                <div className="mt-6 pt-6 border-t border-medium">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-accent-1" />
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary mb-1">Delivery Address</h3>
                      <p className="text-sm text-secondary">{userAddress.name}</p>
                      <p className="text-sm text-gray-500">{userAddress.phone}</p>
                      <p className="text-sm text-gray-500">{userAddress.address}</p>
                      <p className="text-sm text-gray-500">{userAddress.city}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Store Address - Show only for store collection */}
              {deliveryMethod === 'store' && (
                <div className="mt-6 pt-6 border-t border-medium">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                      <Store className="w-4 h-4 text-accent-1" />
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary mb-1">Collection Point</h3>
                      <p className="text-sm text-secondary">Star Choice Cosmetics</p>
                      <p className="text-sm text-gray-500">Karen Shopping Center</p>
                      <p className="text-sm text-gray-500">Nairobi, Kenya</p>
                      <p className="text-sm text-gray-500">Mon-Sat: 9AM-6PM</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-primary p-6 rounded-[4px] border border-medium">
              <h2 className="text-lg font-bold text-secondary mb-4">Payment Method</h2>
              <div className="space-y-4">
                {/* Pay at Store - Show first when store collection is selected */}
                {deliveryMethod === 'store' && (
                  <label
                    className={`
                      flex items-center gap-4 p-4 rounded-[4px] border cursor-pointer
                      ${paymentMethod === 'pay_at_store' 
                        ? 'border-accent-1  bg-secondary' 
                        : 'border-medium hover:bg-secondary'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="pay_at_store"
                      checked={paymentMethod === 'pay_at_store'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="text-accent-1 focus:ring-pink-600"
                    />
                    <div className="flex items-center gap-3">
                      <Store className="w-5 h-5 text-secondary" />
                      <div>
                        <span className="font-medium text-secondary">Pay at Store</span>
                        <p className="text-sm text-gray-500">Pay when you collect your order</p>
                      </div>
                    </div>
                  </label>
                )}

                {/* Pay on Delivery - Show first when courier delivery is selected */}
                {deliveryMethod === 'courier' && (
                  <label
                    className={`
                      flex items-center gap-4 p-4 rounded-[4px] border cursor-pointer
                      ${paymentMethod === 'pay_on_delivery' 
                        ? 'border-accent-1  bg-secondary' 
                        : 'border-medium hover:bg-secondary'
                      }
                    `}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="pay_on_delivery"
                      checked={paymentMethod === 'pay_on_delivery'}
                      onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                      className="text-accent-1 focus:ring-pink-600"
                    />
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-secondary" />
                      <div>
                        <span className="font-medium text-secondary">Pay on Delivery</span>
                        <p className="text-sm text-gray-500">Cash or card payment to courier</p>
                      </div>
                    </div>
                  </label>
                )}

                {/* M-PESA */}
                <label
                  className={`
                    flex items-center gap-4 p-4 rounded-[4px] border cursor-pointer
                    ${paymentMethod === 'mpesa' 
                      ? 'border-accent-1  bg-secondary' 
                      : 'border-medium hover:bg-secondary'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="mpesa"
                    checked={paymentMethod === 'mpesa'}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="text-accent-1 focus:ring-pink-600"
                  />
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-secondary">M-PESA</span>
                  </div>
                </label>

                {/* Card Payment */}
                <label
                  className={`
                    flex items-center gap-4 p-4 rounded-[4px] border cursor-pointer
                    ${paymentMethod === 'card' 
                      ? 'border-accent-1  bg-secondary' 
                      : 'border-medium hover:bg-secondary'
                    }
                  `}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                    className="text-accent-1 focus:ring-pink-600"
                  />
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-secondary" />
                    <span className="font-medium text-secondary">Credit/Debit Card</span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-secondary p-6 rounded-[4px] border border-medium h-fit">
            <h2 className="text-lg font-bold text-secondary mb-4">Order Summary</h2>
            
            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded-[4px]"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-secondary">{item.name}</h3>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    <p className="text-sm font-medium text-accent-1">
                      KES {item.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Totals */}
            <div className="space-y-3 py-4 border-y border-medium">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-secondary">KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Delivery Fee</span>
                <span className="text-secondary">KES {deliveryFee.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-secondary">Total</span>
                <span className="text-accent-1">KES {total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="w-full mt-6 px-6 py-3 bg-accent-1 text-white font-medium rounded-[4px] hover:bg-pink-600/90 transition-colors flex items-center justify-center gap-2"
            >
              Place Order
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}