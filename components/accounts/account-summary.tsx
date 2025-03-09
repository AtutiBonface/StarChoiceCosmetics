'use client'

import { User, Mail, Phone, Package, Heart, Star, MapPin } from 'lucide-react'
import Link from 'next/link'

interface AccountSummaryProps {
  isDesktop?: boolean
}

const AccountSummary = ({ isDesktop = false }: AccountSummaryProps) => {
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+254712345678"
  }

  return (
    <div className={`bg-white rounded-[1px] border border-[#A9BA9D] ${isDesktop ? 'p-6' : 'p-4'}`}>
      {/* User Info */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-pink-600 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#333333]">{userData.name}</h1>
          <p className="text-gray-500">Member since March 2024</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-[#333333]">{userData.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-[#333333]">{userData.phone}</span>
        </div>
      </div>

      {/* Quick Links - Only show on mobile */}
      {!isDesktop && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          {[
            { name: 'Orders', href: '/customer/orders', icon: Package },
            { name: 'Wishlist', href: '/customer/wishlist', icon: Heart },
            { name: 'Reviews', href: '/customer/reviews', icon: Star },
            { name: 'Addresses', href: '/customer/address', icon: MapPin },
          ].map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-[1px] hover:bg-pink-50 transition-colors"
              >
                <Icon className="w-6 h-6 text-pink-600" />
                <span className="text-sm font-medium text-[#333333]">{item.name}</span>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default AccountSummary