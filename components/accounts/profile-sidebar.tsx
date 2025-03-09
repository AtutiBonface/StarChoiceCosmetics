'use client'

import { Package, MessageSquare, Star, Heart, Clock, CreditCard, MapPin, ChevronRight, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Orders', href: '/customer/orders', icon: Package },
  { name: 'Inbox', href: '/customer/inbox', icon: MessageSquare },
  { name: 'Pending Reviews', href: '/customer/reviews', icon: Star },
  { name: 'Wishlist', href: '/customer/wishlist', icon: Heart },
  { name: 'Recently Viewed', href: '/customer/recently-viewed', icon: Clock },
  { name: 'Payment Settings', href: '/customer/payment', icon: CreditCard },
  { name: 'Address Book', href: '/customer/address', icon: MapPin },
]

interface ProfileSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const ProfileSidebar = ({ isOpen = true, onClose }: ProfileSidebarProps) => {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:sticky top-0 md:top-32 left-0 w-full md:w-64 h-screen md:h-[calc(100vh-8rem)]
        bg-white z-50 md:z-0 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#A9BA9D] md:hidden">
          <h2 className="text-lg font-medium text-[#333333]">My Account</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:text-pink-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center justify-between w-full p-3 rounded-[1px] transition-colors
                  ${isActive 
                    ? 'bg-pink-50 text-pink-600' 
                    : 'text-[#333333] hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <ChevronRight className={`
                  w-4 h-4 md:hidden
                  ${isActive ? 'text-pink-600' : 'text-gray-400'}
                `} />
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

export default ProfileSidebar