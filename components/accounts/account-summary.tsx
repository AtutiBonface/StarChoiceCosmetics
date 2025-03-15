'use client'

import { User, Mail, Phone, Package, Heart, Star, MapPin, ChevronRight } from 'lucide-react'
import Link from 'next/link'

const AccountSummary = () => {
  const userData = {
    name: "Admin",
    email: "admin@atuti.com",
    phone: "+254712345678"
  }

  return (
    <div className="w-full">
        <div className="w-full bg-secondary">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Link href="/" className="hover:text-accent-1">Home</Link>
              <ChevronRight size={16} />
              <span className="text-accent-1">My Account</span>
            </div>
          </div>
        </div>
        <div className="bg-primary shadow-sm rounded-[4px] p-4 w-full">

      {/* User Info */}
      <div className="flex items-center gap-4 mb-2 border-b border-medium pb-2">
        <div className="w-16 h-16 rounded-full bg-accent-1 flex items-center justify-center">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-secondary">{userData.name}</h1>
          <p className="text-gray-500 text-sm">Member since March 2024</p>
        </div>
      </div>

      {/* Contact Details */}
      <div className="space-y-4 mb-2 bg-secondary p-4 rounded-[4px] border border-medium">
        <h2 className="font-medium text-secondary mb-3">Personal Information</h2>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <Mail className="w-4 h-4 text-accent-1" />
          </div>
          <span className="text-sm text-secondary">{userData.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
            <Phone className="w-4 h-4 text-accent-1" />
          </div>
          <span className="text-sm text-secondary">{userData.phone}</span>
        </div>
      </div>
      
      <h2 className="font-medium text-secondary mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'My Orders', href: '/customer/orders', icon: Package, description: 'Track your orders' },
          { name: 'Wishlist', href: '/wishlist', icon: Heart, description: 'Saved items' },
          { name: 'Reviews', href: '/customer/reviews', icon: Star, description: 'Rate products' },
          { name: 'Addresses', href: '/customer/address', icon: MapPin, description: 'Delivery locations' },
        ].map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col p-4 bg-white rounded-[4px] hover:bg-secondary transition-colors border border-medium  group"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-secondary group-hover:bg-white flex items-center justify-center transition-colors">
                  <Icon className="w-5 h-5 text-accent-1" />
                </div>
                <span className="text-sm font-medium text-secondary">{item.name}</span>
              </div>
              <p className="text-xs text-gray-500 pl-13">{item.description}</p>
            </Link>
          )
        })}
      </div>
    </div>
    </div>
    
  )
}

export default AccountSummary