'use client'
import { Heart, House, Menu, ShoppingCart, User } from 'lucide-react'
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

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
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
    <div className="md:hidden h-16 fixed bottom-0 left-0 w-full bg-primary text-secondary border-t border-medium px-2 flex justify-between items-center z-50">
      {navItems.map((item) => {
        const Icon = item.icon
        const active = isActive(item.href)
        
        return (
          <Link 
            key={item.href}
            href={item.href}
            prefetch = {true}
            className="cursor-pointer h-full w-[60px] relative flex items-center justify-center"
          >
            <Icon className={active ? 'text-accent-1' : 'text-primary'} />
            <div 
              className={`absolute inset-0 h-[5px] w-full rounded-b-lg ${
                active ? 'bg-accent-1 shadow-lg' : ''
              }`} 
            />
          </Link>
        )
      })}
    </div>
  )
}

export default BottomBar