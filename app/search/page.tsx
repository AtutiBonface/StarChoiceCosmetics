'use client'
import React, { useState } from 'react'
import { ChevronRight, Filter } from 'lucide-react'
import Link from 'next/link'
import FilterSidebar from '@/components/Products/filtersidebar'
import { products } from '@/mockData'
import { useSearchParams } from 'next/navigation'
import  DesktopProductGrid  from '@/components/Products/desktopProductGrid'
import  MobileProductGrid  from '@/components/Products/mobileProductGrid'


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
  const searchParams = useSearchParams()
  const brand = searchParams.get('brand')
  const category = searchParams.get('category')
  const query = searchParams.get('q')

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    categories: [],
    priceRange: null,
    skinType: [],
    concerns: [],
    formulation: []
  })



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

  

  const getBreadcrumbText = () => {
    if (query) return `Search results for "${query}"`
    if (brand && category) return `${brand} - ${category}`
    if (brand) return `${brand} Products`
    if (category) return `${category}`
    return 'All Products'
  }

  const filteredProducts = products.filter(product => {
    const matchesBrand = filters.brands.length === 0 || filters.brands.includes(product.brand)
    //const matchesCategory = filters.categories.length === 0 || filters.categories.includes(product.category)
    const matchesPriceRange = !filters.priceRange || 
      (product.price >= filters.priceRange.min && 
      (filters.priceRange.max === null || product.price <= filters.priceRange.max))
    //const matchesSkinType = filters.skinType.length === 0 || filters.skinType.includes(product.skinType)
    //const matchesConcerns = filters.concerns.length === 0 || filters.concerns.some(concern => product.concerns.includes(concern))
    //const matchesFormulation = filters.formulation.length === 0 || filters.formulation.includes(product.formulation)

    return matchesBrand  && matchesPriceRange 
  })


  return (
    <div>
      {/* Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1 flex-shrink-0">
              Home
            </Link>
            <ChevronRight size={16} className="flex-shrink-0" />
            {brand && (
              <>
                <Link 
                  href="/brands" 
                  className="hover:text-accent-1 flex-shrink-0"
                >
                  Brands
                </Link>
                <ChevronRight size={16} className="flex-shrink-0" />
              </>
            )}
            {category && (
              <>
                <Link 
                  href="/categories" 
                  className="hover:text-accent-1 flex-shrink-0"
                >
                  Categories
                </Link>
                <ChevronRight size={16} className="flex-shrink-0" />
              </>
            )}
            <span className="text-accent-1 truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]">
              {getBreadcrumbText()}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto  py-2">
        {/* Filter overlay for mobile */}
        {isFilterOpen && (
          <div 
            className="overlay fixed inset-0  bg-opacity-10 z-50  lg:hidden"
            onClick={() => setIsFilterOpen(false)}
          ></div>
        )}

        <div className="flex flex-col lg:flex-row gap-2">
          {/* Filter Button - Mobile Only */}
          <div className="flex items-center justify-between lg:hidden px-2">
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

            <>
              <DesktopProductGrid 
                title="" 
                products={filteredProducts} 
              />
              <MobileProductGrid 
                title=""
                products={filteredProducts} 
              />
            </>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchResults