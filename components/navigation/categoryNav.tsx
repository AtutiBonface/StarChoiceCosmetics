'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, MapPin } from 'lucide-react'

const categories = [
  { id: 1, name: "New + Best Sellers", href: `/search?category=${encodeURIComponent("New arrivals, Best Selling")}` },
  { id: 2, name: "All Brands", href: "/brands" , hasDropdown: true},
  { id: 3, name: "Offers", href: "/offers" }
]

const CategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  return (
    <nav className="border-b border-[#A9BA9D] bg-[#F8F1E9] h-12">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <div className="mx-auto px-2 flex items-center justify-between">
          {/* Categories Container with max width */}
          <div className="flex-1 overflow-hidden mr-4">
            <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={category.href}
                  className={`
                    py-4 px-2 whitespace-nowrap text-sm font-medium
                    hover:text-pink-600 transition-colors relative flex items-center gap-1
                    ${activeCategory === category.id ? 'text-pink-600' : 'text-[#333333]'}
                  `}
                  onMouseEnter={() => setActiveCategory(category.id)}
                  onMouseLeave={() => setActiveCategory(null)}
                >
                  {category.name}
                  {category.hasDropdown && <ChevronDown size={14} />}
                </Link>
              ))}
            </div>
          </div>

          {/* Location Indicator - Visible on all screens */}
          <div className="flex items-center gap-2 text-sm text-[#333333] cursor-pointer hover:text-pink-600 transition-colors shrink-0">
            <MapPin size={16} />
            <span className="text-xs sm:text-sm">Nairobi, Kenya</span>
            <ChevronDown size={16} />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default CategoryNav