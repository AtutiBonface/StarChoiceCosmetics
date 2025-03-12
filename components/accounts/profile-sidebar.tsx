'use client'

import axios from 'axios';
import { Package, MessageSquare, Star, Heart, Clock, ChevronRight,  User, LogOut, Lock, CreditCard, MapPin } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// Add user data type
interface UserData {
  name: string;
  email: string;
}

// Mock user data - replace with your auth context/data
const userData: UserData = {
  name: "Admin",
  email: "admin@atuti.com"
}

// Update navigation array to remove isStatic and add isMobileStatic
const navigation = [
  { name: 'My Account', href: '/customer/account', icon: User, isMobileStatic: true },
  { name: 'My Orders', href: '/customer/orders', icon: Package },
  { name: 'My Inbox', href: '/customer/inbox', icon: MessageSquare },
  { name: 'Pending Reviews', href: '/customer/reviews', icon: Star },
  { name: 'My Wishlist', href: '/wishlist', icon: Heart },
  { name: 'Recently Viewed', href: '/customer/recently-viewed', icon: Clock },
  { name: 'Payment Settings', href: '/customer/payment', icon: CreditCard },
  { name: 'Address Book', href: '/customer/address', icon: MapPin },
  { name: 'Account Management', href: '/customer/profile', icon: Lock },
]
 
const ProfileSidebar = () => {
  const pathname = usePathname()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768


  const handleLogout = async() => {
      try{
        const resp = await axios.get('/api/logout')

        window.location.href = "/"
        alert("Logged out successfully")
        
      }catch(error){
        alert("Failed to logout")
        console.error(error)
      }
  }

  return (
    <div>
      <div className="bg-primary h-full">
        <div className="md:hidden">
          <div className="flex flex-col p-4 bg-secondary border-b border-medium">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-medium text-secondary">Welcome  {userData.name}</h2>
            </div>
            <p className="text-sm text-gray-500">{userData.email}</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-0  space-y-1 flex flex-col h-[calc(100%-180px)] md:h-[calc(100%-80px)]">
          {navigation.map((item) => {
            const Icon = item.icon
            const isStatic = isMobile && item.isMobileStatic
            const isActive = pathname.startsWith(item.href) || isStatic

            return (
              <div
                key={item.name}
                className={`
                  flex items-center justify-between w-full p-3 rounded-[4px] transition-colors
                  ${isActive 
                    ? 'bg-secondary text-pink-600' 
                    : 'text-secondary hover:bg-gray-50'
                  }
                  ${isStatic ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                {!isStatic ? (
                  <Link href={item.href} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <ChevronRight className={`
                      w-4 h-4 md:hidden
                      ${isActive ? 'text-pink-600' : 'text-gray-400'}
                    `} />
                  </Link>
                ) : (
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                )}
              </div>
            )
          })}
          
          {/* Logout Button */}
          <div className="mt-auto pt-4 border-t  border-medium md:border-none">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 text-red-600 hover:bg-red-50 rounded-[4px] transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default ProfileSidebar