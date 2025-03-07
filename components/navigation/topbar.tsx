import React from 'react'
import { Search, User, ShoppingCart, Gift } from 'lucide-react'
import Link from 'next/link'
import AnnouncementBar from './announcementbar'

const TopBar = () => {
  return (
    <div className='fixed top-0 left-0 w-full z-50 border-b border-[#A9BA9D]'>
      <AnnouncementBar/>
      <div className="h-16 w-full bg-primary text-gray-800 border-b border-gray-200 px-4 flex justify-between items-center z-50">
        {/* Logo Section - Hidden on mobile */}
        <Link href="/" className="hidden md:block text-xl font-bold">
          StarChoice<span className="text-pink-600">Cosmetics</span>
        </Link>

        {/* Search Section - Always visible */}
        <div className="flex-1 max-w-2xl mx-auto md:mx-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2  ring-1 ring-[#A9BA9D] focus:outline-none focus:ring-[#B7410E] rounded-[4px]"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2">
              <Search className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Actions Section - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/offers" className="flex items-center gap-1 hover:text-pink-600">
            <Gift className="w-5 h-5" />
            <span className="hidden sm:inline">Offers</span>
          </Link>
          <Link href="/account" className="flex items-center gap-1 hover:text-pink-600">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline">Account</span>
          </Link>
          <Link href="/cart" className="flex items-center gap-1 hover:text-pink-600">
            <ShoppingCart className="w-5 h-5" />
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopBar