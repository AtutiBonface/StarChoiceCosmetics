'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronDown, ChevronUp } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Brand {
  id: number
  name: string
  logo: string
  description: string
}

const TopBrands = () => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const router = useRouter()

  const initialBrandsCount = 4

  const brands: Brand[] = [
    { id: 1, name: "Nice & Lovely", logo: "/nice-and-lovely.png", description: "Quality skincare products for everyday use" },
    { id: 2, name: "Nivea", logo: "/nivea.png", description: "Trusted skincare since 1911" },
    { id: 3, name: "Garnier", logo: "/garnier.jpg", description: "Natural beauty products powered by science" },
    { id: 4, name: "L'Oreal", logo: "/loreal.webp", description: "Because you're worth it" },
    { id: 5, name: "Maybelline", logo: "/maybelline-new-york.webp", description: "Maybe she's born with it" },
    { id: 6, name: "MAC", logo: "/MAC_Cosmetics.png", description: "Professional quality makeup for all" },
    { id: 7, name: "Neutrogena", logo: "/neutrogena.png", description: "Dermatologist recommended skincare" },
    { id: 8, name: "Dove", logo: "/Dove.png", description: "Real beauty for real people" },
  ]

  const visibleBrands = isExpanded ? brands : brands.slice(0, initialBrandsCount)

  const handleGoShopping = (brandName: string) => {
    router.push(`/search?brand=${encodeURIComponent(brandName)}`)
  }

  return (
    <section className="bg-secondary py-6 w-full">
      <div className="max-w-6xl mx-auto px-2">
        <div className="product-title relative flex justify-center items-center mb-6">
          <h2 className="text-3xl font-bold text-primary bg-secondary px-3 z-10">
            Our Top Brands
          </h2>
         
        </div>

        {/* Selected Brand Showcase */}
        <AnimatePresence>
          {selectedBrand && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 0.95 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative bg-primary rounded-md shadow-2xl p-6 mb-10 max-w-3xl mx-auto"
            >
              <button 
                className="absolute right-4 top-4 text-secondary hover:text-primary"
                onClick={() => setSelectedBrand(null)}
              >
                <X size={24} />
              </button>
              <div className="flex flex-col md:flex-row items-center">
                <div className="w-32 h-32 md:w-48 md:h-48 relative mb-4 md:mb-0">
                  <Image
                    src={selectedBrand.logo}
                    alt={selectedBrand.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="md:ml-8 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-primary">{selectedBrand.name}</h3>
                  <p className="mt-2 text-secondary">{selectedBrand.description}</p>
                  <button 
                    onClick={() => handleGoShopping(selectedBrand.name)}
                    className="mt-4 bg-accent-1 text-contrast px-6 py-2 rounded-[4px] hover:bg-accent-1/90 transition-colors"
                  >
                    Go Shopping
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {visibleBrands.map((brand) => (
              <div key={brand.id} onClick={() => setSelectedBrand(brand)} className="bg-primary p-4 rounded-md shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                <div className="absolute -right-12 -top-12 w-24 h-24 bg-accent-light rounded-full group-hover:bg-accent-1/20 transition-all duration-300"></div>
                <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-secondary rounded-full group-hover:bg-secondary/20 transition-all duration-300"></div>
                
                <div className="relative h-28 md:h-36 flex items-center justify-center">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain p-3"
                  />
                </div>
                <h3 className="text-center font-medium text-primary mt-3 truncate">{brand.name}</h3>
                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                  <button className="mx-auto mt-3 bg-accent-1 text-contrast text-sm px-4 py-1 block rounded-[4px] hover:bg-accent-1/90 transition-colors">
                    View
                  </button>
                </div>
              </div>
           
          ))}
        </div>

        {/* View More/Less Button */}
        {brands.length > initialBrandsCount && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center mt-8"
          >
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2 px-6 py-2 bg-accent-1 text-contrast rounded-[4px] hover:bg-accent-1/90 transition-colors"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp size={20} />
                </>
              ) : (
                <>
                  View More <ChevronDown size={20} />
                </>
              )}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default TopBrands