'use client'
import { Heart, House, Menu, ShoppingCart, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useCallback, useMemo } from 'react'
import { initialCartItems, initialWishlistItems } from '@/mockData'

const BottomBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false) 

  const handleNavigation = useCallback(async (href: string) => {
    if (isNavigating || pathname === href) return
    
    setIsNavigating(true)   
   
      const targetRoute =  href      
      router.push(targetRoute)    
      
      setTimeout(() => setIsNavigating(false), 200)
    
  }, [isNavigating, pathname, , router])

  // Memoize counts
  const cartCount = useMemo(() => 
    initialCartItems.reduce((sum, item) => sum + item.quantity, 0),
    []
  )

  const wishlistCount = useMemo(() => 
    initialWishlistItems.length,
    []
  )

  // Memoize nav items to prevent recreating on each render
  const navItems = useMemo(() => [
    { 
      icon: House, 
      href: '/', 
      label: 'Home',
      authRequired: false 
    },
    { 
      icon: Heart, 
      href: '/wishlist', 
      label: 'Wishlist',
      showBadge: true,
      badge: wishlistCount || null,
      authRequired: true
    },
    { 
      icon: ShoppingCart, 
      href: '/cart', 
      label: 'Cart',
      showBadge: true,
      badge: cartCount || null,
      authRequired: true
    },
    { 
      icon: User, 
      href: '/customer/account', 
      label: 'Account',
      showBadge: false,
      authRequired: false
    },
    { 
      icon: Menu, 
      href: '/more', 
      label: 'More',
      showBadge: false,
      authRequired: false
    }
  ], [cartCount, wishlistCount])

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

  if (!shouldShowBottomBar) return null

  return (
    <>
      <nav className="md:hidden h-16 fixed bottom-0 left-0 w-full bg-primary text-secondary border-t border-medium px-2 flex justify-between items-center z-50">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = isActive(item.href)
          
          return (
            <button 
              key={item.href}
              onClick={() => handleNavigation(item.href)}
              disabled={isNavigating && pathname === item.href}
              className={`cursor-pointer h-full w-[60px] relative flex items-center justify-center
                ${isNavigating && pathname !== item.href ? 'animate-pulse' : ''}`}
            >
              <div className="relative">
                <Icon 
                  className={`transition-colors duration-200 ${
                    active ? 'text-accent-1' : 'text-primary'
                  }`} 
                />
                {item.showBadge && item.badge !== null && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent-1 text-contrast text-xs rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <div 
                className={`absolute top-0 h-[5px] w-full rounded-lg transition-all duration-200 ${
                  active ? 'bg-accent-1 shadow-lg' : ''
                }`} 
              />
            </button>
          )
        })}
      </nav>
    </>
  )
}

export default BottomBar