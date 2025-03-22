'use client'

import axios from 'axios';
import { Package, MessageSquare, Star, Heart, Clock, ChevronRight,  User, LogOut, Lock, CreditCard, MapPin, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCart } from '@/services/cartWishlistContext';


interface UserData {
  name: string;
  email: string;
}


const userData: UserData = {
  name: "Admin",
  email: "admin@atuti.com"
}

// Update the navigation array type and items
interface NavItem {
  name: string
  href: string
  icon: LucideIcon
  isMobileStatic?: boolean
  showBadge?: boolean
  badge?: number | null
  badgeColor?: string
}


const ProfileSidebar = () => {
  const pathname = usePathname()
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const {wishlist} = useCart()


  const navigation: NavItem[] = [
    { 
      name: 'My Account',
      href: '/customer/account', 
      icon: User, 
      isMobileStatic: true
    },
    { 
      name: 'My Orders', 
      href: '/customer/orders', 
      icon: Package,
      showBadge: true,
      badge: 2,
      badgeColor: 'bg-accent-1'
    },
    { 
      name: 'My Inbox', 
      href: '/customer/inbox', 
      icon: MessageSquare,
      showBadge: true,
      badge: 2,
      badgeColor: 'bg-blue-500'
    },
    { 
      name: 'Pending Reviews', 
      href: '/customer/reviews', 
      icon: Star,
      showBadge: true,
      badge: 2, 
      badgeColor: 'bg-yellow-500'
    },
    { 
      name: 'My Wishlist', 
      href: '/wishlist', 
      icon: Heart,
      showBadge: true,
      badge: wishlist.length,
      badgeColor: 'bg-red-500'
    },
    { name: 'Recently Viewed', href: '/customer/recently-viewed', icon: Clock },
    { name: 'Payment Settings', href: '/customer/payment', icon: CreditCard },
    { name: 'Address Book', href: '/customer/address', icon: MapPin },
    { name: 'Account Management', href: '/customer/profile', icon: Lock },
  ]
   

  const handleLogout = async() => {
      
      await axios.get('/api/logout').then(()=>{
        window.location.href = "/"
      }).catch((error)=>{
        alert("Failed to logout")
        console.error(error)
      })
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
                  flex items-center justify-between w-full p-3 np rounded-[4px] transition-colors
                  ${isActive 
                    ? 'bg-secondary text-accent-1' 
                    : 'text-secondary hover:bg-gray-50'
                  }
                  ${isStatic ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                {!isStatic ? (
                  <Link href={item.href} className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center relative">
                        <Icon className="w-5 h-5" />
                        <span className="text-sm  ml-3 font-medium">{item.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.showBadge && item.badge !== null && (
                        <span className={`
                          ${item.badgeColor || 'bg-accent-1'} 
                          text-white text-xs px-2 py-0.5 rounded-full
                          min-w-[20px] text-center
                        `}>
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className={`
                        w-4 h-4 md:hidden
                        ${isActive ? 'text-accent-1' : 'text-gray-400'}
                      `} />
                    </div>
                  </Link>
                ) : (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    {item.showBadge && item.badge !== null && (
                      <span className={`
                        ${item.badgeColor || 'bg-accent-1'} 
                         text-white text-xs px-2 py-0.5 rounded-full
                        min-w-[20px] text-center
                      `}>
                        {item.badge}
                      </span>
                    )}
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