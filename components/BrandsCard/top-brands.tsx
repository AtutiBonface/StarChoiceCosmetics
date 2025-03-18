'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Brand {
  id: number
  name: string
  logo: string
  description: string
  productCount: number
}

const TopBrands = () => {
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)

  const router = useRouter()
  

  const brands: Brand[] = [
    { 
      id: 1, 
      name: "Nice & Lovely", 
      logo: "/nice-and-lovely.png", 
      description: "Quality skincare products for everyday use",
      productCount: 32
    },
    { 
      id: 2, 
      name: "Nivea", 
      logo: "/nivea.png", 
      description: "Trusted skincare since 1911",
      productCount: 45
    },
    { 
      id: 3, 
      name: "Garnier", 
      logo: "/garnier.jpg", 
      description: "Natural beauty products powered by science",
      productCount: 28
    },
    { 
      id: 4, 
      name: "L'Oreal", 
      logo: "/loreal.webp", 
      description: "Because you're worth it",
      productCount: 50
    }
  ]

  const handleGoShopping = (brandName: string) => {
    router.push(`/search?brand=${encodeURIComponent(brandName)}`)
  }

  const handleViewAllBrands = () => {
    router.push('/brands')
  }

  return (
    <section className="bg-secondary py-4 w-full">
      <div className="max-w-6xl mx-auto px-2">
        <div className="product-title relative flex justify-center items-center mb-4">
          <h2 className="text-3xl font-bold text-accent-1 bg-secondary px-3 z-10">
            Our Top Brands
          </h2>
        </div>

        <AnimatePresence>
          {selectedBrand && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="absolute inset-0 bg-black/50" onClick={() => setSelectedBrand(null)} />
              <motion.div
                initial={{ y: 50 }}
                animate={{ y: 0 }}
                exit={{ y: 50 }}
                className="relative bg-primary rounded-lg shadow-2xl p-6 w-full max-w-lg mx-auto"
              >
                <button 
                  className="absolute right-4 top-4 text-secondary hover:text-primary transition-colors"
                  onClick={() => setSelectedBrand(null)}
                >
                  <X size={24} />
                </button>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 relative mb-4">
                    <Image
                      src={selectedBrand.logo}
                      alt={selectedBrand.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-2">{selectedBrand.name}</h3>
                  <p className="text-secondary mb-2">{selectedBrand.description}</p>
                  <p className="text-accent-1 mb-6">{selectedBrand.productCount} Products Available</p>
                  
                  <button 
                    onClick={() => {
                      handleGoShopping(selectedBrand.name)
                      setSelectedBrand(null)
                    }}
                    className="w-full bg-accent-1 text-contrast py-3 px-6 rounded-[4px] hover:bg-accent-1/90 transition-colors flex items-center justify-center gap-2"
                  >
                    Shop {selectedBrand.name} Products
                    <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {brands.map((brand) => (
            <div 
              key={brand.id} 
              onClick={() => setSelectedBrand(brand)} 
              className="bg-primary p-4 rounded-md shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden relative cursor-pointer"
            >
              <div className="absolute -right-12 -top-12 w-24 h-24 bg-accent-light rounded-full group-hover:bg-accent-1/20 transition-all duration-300"></div>
              <div className="absolute -left-12 -bottom-12 w-24 h-24 bg-secondary rounded-full group-hover:bg-secondary/20 transition-all duration-300"></div>
              
              <div className="relative h-28 md:h-36 flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading={brand.id === 1 ? "eager" : "lazy"}
                  className="object-contain p-3 group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <h3 className="text-center font-medium text-primary mt-3 truncate">
                {brand.name}
              </h3>
              <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-300">
                <button className="mx-auto mt-3 bg-accent-1 text-contrast text-sm px-4 py-1 block rounded-[4px] hover:bg-accent-1/90 transition-colors">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mt-8 sm:hidden"
        >
          <button
            onClick={handleViewAllBrands}
            className="inline-flex items-center gap-2 px-6 py-2 bg-accent-1 text-contrast rounded-[4px] hover:bg-accent-1/90 transition-colors"
          >
            View All Brands <ArrowRight size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default TopBrands