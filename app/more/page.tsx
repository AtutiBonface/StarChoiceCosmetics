'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Facebook, Instagram, Twitter, MapPin } from 'lucide-react'

// Menu sections
const menuSections = [
  {
    title: 'Shop',
    items: [
      { name: 'All Brands', href: '/brands' },
      { name: 'New Arrivals', href: `/search?category=${encodeURIComponent("New Arrivals")}` },
      { name: 'Best Sellers', href: `/search?category=${encodeURIComponent("best-sellers")}` },
      { name: 'Special Offers', href: '/offers' },
    ]
  },
  {
    title: 'Support & Help',
    items: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'FAQs', href: '/faqs' },
      { name: 'Shipping Information', href: '/shipping' },
      { name: 'Returns Policy', href: '/returns' }
    ]
  },
  {
    title: 'About Us',
    items: [
      { name: 'Our Story', href: '/about'  },
      { name: 'Blog', href: '/blog' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Privacy Policy', href: '/privacy' }
    ]
  }
]

export default function MorePage() {
  return (
    <div className="min-h-screen bg-primary pb-16">
      {/* Header */}
      <div className="bg-primary border-b border-medium">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-xl font-semibold text-primary">More</h1>
        </div>
      </div>

      {/* Location Selector */}
      <div className="border-b border-medium">
        <div className="max-w-7xl mx-auto px-4">
          <button className="w-full py-4 flex items-center justify-between text-primary">
            <div className="flex items-center gap-2">
              <MapPin size={20} />
              <div>
                <p className="text-sm font-medium">Delivery Location</p>
                <p className="text-xs text-secondary">Nairobi, Kenya</p>
              </div>
            </div>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="max-w-7xl mx-auto py-6 space-y-8">
        {menuSections.map((section) => (
          <div key={section.title}>
            <h2 className="text-lg text-primary font-medium text-primary mb-4 border-b border-medium px-4">{section.title}</h2>
            <div className="space-y-1 px-4 ">
              {section.items.map((item) => (
                <Link
                  key={item.name}
                  href={section.title === "About Us"? "#": item.href }
                  className="flex items-center justify-between py-3 px-2 rounded-lg hover:bg-secondary/5 text-secondary"
                >
                  <span>{item.name}</span>
                  <ChevronRight size={18} className="text-secondary" />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {/* Social Links */}
        <div>
          <h2 className="text-lg font-medium text-primary mb-4 px-4 border-b border-medium  pb-2">Connect With Us</h2>
          <div className="flex gap-6 px-2 px-4">
            <a href="#" className="p-2 hover:text-accent-1 transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="p-2 hover:text-accent-1 transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="p-2 hover:text-accent-1 transition-colors">
              <Twitter size={24} />
            </a>
          </div>
        </div>

        {/* App Info */}
        <div className="pt-8 border-t border-medium px-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="relative w-8 h-8">
              <Image
                src="/icons/starchoice-logo.svg"
                alt="Star Choice Cosmetics"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-sm font-medium text-primary">StarChoice Cosmetics</span>
          </div>
          <p className="text-xs text-secondary">Version Beta 0.1</p>
        </div>
      </div>
    </div>
  )
}