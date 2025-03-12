'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart, Star, ChevronRight } from 'lucide-react'

// Mock data for offers
const offers = [
  {
    id: 1,
    name: 'Nivea Perfect & Radiant',
    slug: 'nivea-perfect-radiant',
    image: '/nivea-oil.webp',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.5,
    reviews: 128,
    isNew: true,
    hasVariants: false,
  },
  {
    id: 2,
    name: 'Nivea Perfect & Radiant',
    slug: 'nivea-perfect-radiant',
    image: '/nivea-oil.webp',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    rating: 4.5,
    reviews: 128,
    isNew: true,
    hasVariants: false,
  },
  // Add more offer items...
]

export default function OffersPage() {  

  return (
    <div className="bg-primary text-primary">
      {/* Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1">Home</Link>
            <ChevronRight size={16} />
            <span className="text-accent-1">Special Offers</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-4">
        <div className="grid md:grid-cols-2 gap-2">
          {offers.map(offer => (
            <div key={offer.id} className="border border-medium rounded-[4px] p-4">
              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24">
                  <Image src={offer.image} alt={offer.name} fill className="object-contain" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-primary">{offer.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-secondary">
                    <Star size={16} className="text-accent-1" />
                    <span>{offer.rating}</span>
                    <span>({offer.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-accent-1">KES {offer.price}</span>
                    {offer.originalPrice && <span className="text-sm text-secondary line-through">KES {offer.originalPrice}</span>}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="bg-accent-1 text-contrast px-4 py-2 rounded-[4px] hover:bg-accent-1/90 transition-colors">
                      Add to Cart
                    </button>
                    <button className="text-error hover:text-error/90 transition-colors">
                      <Heart size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}