'use client'
import React, { useState } from 'react'
import { ChevronRight, Filter } from 'lucide-react'
import Link from 'next/link'
import FilterSidebar from '@/components/Products/filtersidebar'
import { ProductItem } from '@/components/Products/productItem'
type PriceRange = {
  min: number
  max: number | null
}

interface FilterState {
  brands: string[]
  categories: string[]
  priceRange: PriceRange | null
  skinType: string[]
  concerns: string[]
  formulation: string[]
}


const SearchResults = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    categories: [],
    priceRange: null,
    skinType: [],
    concerns: [],
    formulation: []
  })

  // Mock data - replace with your actual data
  const products = [
    {
      id: 12,
      name: "CeraVe Moisturizing Cream 539g",
      image: "/cerave-oil.webp",
      price: 4100,
      originalPrice: 4500,
      rating: 4.9,
      reviews: 782,
      discount: 9,
      isNew: false,
      hasVariants: true
    },
    {
      id: 13,
      name: "Neutrogena Oil-Free Acne Wash 177ml",
      image: "/Neutrogena-oil.jpg",
      price: 1850,
      originalPrice: 2000,
      rating: 4.2,
      reviews: 254,
      discount: 7,
      isNew: false,
      hasVariants: false
    },
  ]

  const filterOptions = {
    brands: ["Nivea", "L'Oreal", "Maybelline", "MAC", "Fenty Beauty"],
    categories: ["Skincare", "Makeup", "Hair Care", "Fragrance"],
    priceRanges: [
      { min: 0, max: 1000 },
      { min: 1000, max: 3000 },
      { min: 3000, max: 5000 },
      { min: 5000, max: null }
    ],
    skinType: ["Normal", "Dry", "Oily", "Combination", "Sensitive"],
    concerns: ["Anti-aging", "Acne", "Dark spots", "Hydration"],
    formulation: ["Cream", "Serum", "Oil", "Gel", "Lotion"]
  }

  // Count active filters
  const activeFilterCount = filters.brands.length + 
                            filters.categories.length + 
                            (filters.priceRange ? 1 : 0) + 
                            filters.skinType.length +
                            filters.concerns.length +
                            filters.formulation.length;

  const handleAddToCart = (e: React.MouseEvent, productId: string) => {

    
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1">Home</Link>
            <ChevronRight size={16} />
            <span className="text-accent-1">Search Results</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* Filter overlay for mobile */}
        {isFilterOpen && (
          <div 
            className="overlay fixed inset-0  bg-opacity-10 z-50 lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          ></div>
        )}

        <div className="flex flex-col lg:flex-row gap-2">
          {/* Filter Button - Mobile Only */}
          <div className="flex items-center justify-between lg:hidden">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 border border-medium rounded shadow-sm hover:bg-gray-50 transition-colors"
            >
              <Filter size={18} />
              <span>Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}</span>
            </button>
            
            {/* You could add sorting options here */}
            <select className="border border-medium rounded py-2 px-3 shadow-sm">
              <option>Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>

          {/* Filters Sidebar Component */}
          <FilterSidebar 
            isOpen={isFilterOpen} 
            onClose={() => setIsFilterOpen(false)} 
            filters={filters} 
            setFilters={setFilters} 
            filterOptions={filterOptions} 
          />

          {/* Products Grid */}
          <div className="flex-1">
            {/* Desktop sort and result count */}
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{products.length}</span> results
              </p>
              <select className="border border-medium rounded py-2 px-3">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            {/* Products */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map(product => (
                <ProductItem handleAddToCart={handleAddToCart} product={product} key={product.id}/>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResults