'use client'
import { Heart, House, Menu, ShoppingCart, User } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import { initialCartItems, initialWishlistItems } from '@/mockData'

const BottomBar = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const isMounted = useRef(false)

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

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
      
      // Prefetch all possible routes
      const routesToPrefetch = [
        '/',
        '/wishlist',
        '/cart', 
        '/customer/account',
        '/more',
        '/account'
      ]

      routesToPrefetch.forEach(route => {
        router.prefetch(route)
      })
    }
  }, [router])

  const handleNavigation = useCallback(async (href: string, authRequired: boolean) => {
    if (isNavigating || pathname === href) return
    
    setIsNavigating(true)
    
    try {
      const targetRoute = authRequired && !isAuthenticated ? '/account' : href
      
      router.push(targetRoute)

    } catch (error) {
      console.error('Navigation failed:', error)

    } finally {
      
      setTimeout(() => setIsNavigating(false), 200)
    }
  }, [isNavigating, pathname, isAuthenticated, router])

  const navItems = [
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
      badge: isAuthenticated && initialWishlistItems.length > 0 ? initialWishlistItems.length : null,
      authRequired: true
    },
    { 
      icon: ShoppingCart, 
      href: '/cart', 
      label: 'Cart',
      showBadge: true,
      badge: isAuthenticated && initialCartItems.length > 0 ? 
      initialCartItems.reduce((sum, item) => sum + item.quantity, 0) : null,
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
              onClick={() => handleNavigation(item.href, item.authRequired)}
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