'use client'
import { Heart, House, Menu, ShoppingCart, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const BottomBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Authentication check - similar to TopBar
  const checkAuth = useCallback(async () => {
    try {
      const resp = await axios("/api/auth/status", {
        headers: {
          'Cache-Control': 'no-cache'
        }
      })
      setIsAuthenticated(resp.data?.isAuthenticated)
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
    } finally {
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Temporary data - replace with your actual data store
  const wishlistItems = [
    { id: 1, name: "Nivea Perfect & Radiant", price: 1299, image: "/nivea-oil.webp" },
    { id: 2, name: "L'Oreal Paris Revitalift", price: 2499, image: "/nivea-oil.webp" }
  ]

  const cartItems = [
    { id: 1, name: "Nivea Perfect & Radiant", price: 1299, quantity: 1, image: "/nivea-oil.webp" }
  ]

  const navItems = [
    { icon: House, href: '/', label: 'Home' },
    { 
      icon: Heart, 
      href: '/wishlist', 
      label: 'Wishlist',
      showBadge: true,
      badge: isAuthenticated && wishlistItems.length > 0 ? wishlistItems.length : null
    },
    { 
      icon: ShoppingCart, 
      href: '/cart', 
      label: 'Cart',
      showBadge: true,
      badge: isAuthenticated && cartItems.length > 0 ? 
        cartItems.reduce((sum, item) => sum + item.quantity, 0) : null
    },
    { 
      icon: User, 
      href: '/customer/account', 
      label: 'Account',
      showBadge: false
    },
    { 
      icon: Menu, 
      href: '/more', 
      label: 'More',
      showBadge: false
    }
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

  const handleNavigation = async (href: string) => {
    if (isNavigating || pathname === href) return
    
    try {
      setIsNavigating(true)
      if ((href === '/cart' || href === '/wishlist') && !isAuthenticated) {
        router.push('/account')
      } else {
        router.push(href)
      }
    } catch (error) {
      console.error('Navigation failed:', error)
    } finally {
      setIsNavigating(false)
    }
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
              disabled={isNavigating}
              className={`cursor-pointer h-full w-[60px] relative flex items-center justify-center
                ${isNavigating ? 'opacity-50 pointer-events-none' : ''}`}
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