'use client'

import { Facebook, Instagram, Twitter, Send } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const footerLinks = {
  shop: [
    { name: 'New Arrivals', href: `/search?category=${encodeURIComponent("New Arrivals")}` },
    { name: 'Best Sellers', href:  `/search?category=${encodeURIComponent("best-sellers")}` },
    { name: 'Special Offers', href: '/offers' },
    { name: 'Brands', href: '/brands' }
  ],
  support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' }
  ],
  about: [
    { name: 'Our Story', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Terms & Conditions', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' }
  ]
}

export default function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add newsletter signup logic
  }

  return (
    <footer className="bg-[#333333] text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Updated grid with better column sizing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Section - 4 columns */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/icons/starchoice-logo.svg"
                  alt="Star Choice Cosmetics"
                  fill
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
              <span className="text-xl font-bold text-white">StarChoice</span>
            </Link>
            
            {/* Rest of the brand section */}
            <p className="text-gray-400 mb-6 max-w-md">
              Your one-stop destination for authentic beauty and skincare products.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-pink-600 transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links - 2 columns each */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Shop</h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-pink-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-400 hover:text-pink-600 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter - 4 columns */}
          <div className="lg:col-span-4">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4 max-w-md">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex max-w-md"> {/* Added max-width to form container */}
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 min-w-0 bg-[#444444] text-white px-4 py-2 rounded-l-[1px] focus:outline-none focus:ring-1 focus:ring-pink-600"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 bg-pink-600 px-4 py-2 rounded-r-[1px] hover:bg-pink-700 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar - unchanged */}
        <div className="pt-8 border-t border-[#444444] text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Star Choice Cosmetics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}