'use client'
import {  Heart, House,  Menu,  ShoppingCart, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BottomBar = () => {
  const pathname = usePathname()

  const navItems = [
    { icon: House, href: '/', label: 'Home' },
    { icon: Heart, href: '/wishlist', label: 'Wishlist' },
    { icon: ShoppingCart, href: '/cart', label: 'Cart' },
    { icon: User, href: '/customer/account', label: 'customer account' },
    { icon: Menu, href: '/menu', label: 'menu' }
  ]

  const isActive = (href : string) => {
    // For root path, only match exactly
    if (href === '/') {
      return pathname === '/'
    }
    
    // For customer paths, we want any path starting with /customer/ to be active
    if (href.startsWith('/customer/')) {
      return pathname.startsWith('/customer/')
    }    
    return pathname === href || pathname.startsWith(href + '/')
  }

  const shouldShowBottomBar = navItems.some(item => isActive(item.href))

  if (!shouldShowBottomBar) {
    return null
  }

  return (
    <div className="md:hidden h-16 fixed bottom-0 left-0 w-full bg-primary text-gray-800 border-t border-[#A9BA9D] px-2 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.href)
        
        return (
          <Link 
            key={item.href}
            href={item.href}
            className="cursor-pointer h-full w-[60px] relative flex items-center justify-center"
          >
            <Icon className={active ? 'text-pink-600' : 'text-[#333333]'} />
            <div 
              className={`absolute inset-0 h-[5px] w-full rounded-b-lg ${
                active ? 'bg-pink-600 shadow-lg' : ''
              }`} 
            />
          </Link>
        )
      })}
    </div>
  )
}

export default BottomBar