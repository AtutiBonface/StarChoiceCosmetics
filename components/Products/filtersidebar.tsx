'use client'
import { X, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"

interface PriceRange {
  min: number
  max: number | null
}

interface FilterOptions {
  brands: string[]
  categories: string[]
  priceRanges: PriceRange[]
  skinType: string[]
  concerns: string[]
  formulation: string[]
}

interface Filters {
  brands: string[]
  categories: string[]
  priceRange: PriceRange | null
  skinType: string[]
  concerns: string[]
  formulation: string[]
}

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filters: Filters
  setFilters: (filters: Filters) => void
  filterOptions: FilterOptions
}

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  setFilters, 
  filterOptions 
}: FilterSidebarProps) => {
  const [expandedSections, setExpandedSections] = useState({
    brands: true,
    priceRange: true,
    categories: true,
    skinType: true,
    concerns: true,
    formulation: true
  })

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <>      

      <aside className={`
        fixed lg:static inset-0 left-0 z-50  lg:z-0
        w-[280px] lg:w-64 h-full lg:h-auto 
        bg-primary shadow-lg lg:shadow-none
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="sticky top-0 z-10 p-4 border-b border-medium flex justify-between items-center bg-primary">
            <h2 className="font-medium text-lg text-primary">Filters</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:text-accent-1 transition-colors"
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400">
            <div className="p-4 space-y-6">
              {/* Filter Sections */}
              {/* Brand Filter */}
              <div className="border-b border-medium pb-4">
                <button 
                  onClick={() => toggleSection('brands')} 
                  className="w-full flex justify-between items-center font-medium py-2 hover:text-accent-1"
                >
                  <span>Brands</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform duration-200 ${
                      expandedSections.brands ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
                
                {expandedSections.brands && (
                  <div className="space-y-2 mt-3">
                    {filterOptions.brands.map(brand => (
                      <label 
                        key={brand} 
                        className="flex items-center gap-2 py-1.5 px-2 hover:bg-secondary/5 rounded-md transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.brands.includes(brand)}
                          onChange={(e) => {
                            const newBrands = e.target.checked
                              ? [...filters.brands, brand]
                              : filters.brands.filter(b => b !== brand)
                            setFilters({ ...filters, brands: newBrands })
                          }}
                          className="rounded border-medium text-accent-1 focus:ring-accent-1"
                        />
                        <span className="text-sm text-primary">{brand}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Range Filter */}
              <div className="border-b border-gray-200 pb-4">
                <button 
                  onClick={() => toggleSection('priceRange')} 
                  className="w-full flex justify-between items-center font-medium py-1"
                >
                  <span>Price Range</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${expandedSections.priceRange ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {expandedSections.priceRange && (
                  <div className="space-y-2 mt-2">
                    {filterOptions.priceRanges.map((range, index) => (
                      <label key={index} className="flex items-center gap-2 py-1 px-1 hover:bg-gray-50 rounded transition-colors">
                        <input
                          type="radio"
                          name="priceRange"
                          checked={filters.priceRange?.min === range.min}
                          onChange={() => setFilters({ ...filters, priceRange: range })}
                          className="text-pink-600"
                        />
                        <span className="text-sm">
                          {range.max
                            ? `KES ${range.min.toLocaleString()} - ${range.max.toLocaleString()}`
                            : `Above KES ${range.min.toLocaleString()}`}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Categories Filter */}
              <div className="border-b border-gray-200 pb-4">
                <button 
                  onClick={() => toggleSection('categories')} 
                  className="w-full flex justify-between items-center font-medium py-1"
                >
                  <span>Categories</span>
                  <ChevronDown 
                    size={18} 
                    className={`transition-transform ${expandedSections.categories ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                {expandedSections.categories && (
                  <div className="space-y-2 mt-2">
                    {filterOptions.categories.map(category => (
                      <label key={category} className="flex items-center gap-2 py-1 px-1 hover:bg-gray-50 rounded transition-colors">
                        <input
                          type="checkbox"
                          checked={filters.categories.includes(category)}
                          onChange={(e) => {
                            const newCategories = e.target.checked
                              ? [...filters.categories, category]
                              : filters.categories.filter(c => c !== category)
                            setFilters({ ...filters, categories: newCategories })
                          }}
                          className="rounded text-pink-600"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Add other filter sections following the same pattern */}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="sticky bottom-0 p-4 border-t border-medium bg-primary lg:hidden">
            <div className="flex gap-3">
              <button 
                className="flex-1 border border-medium py-2.5 rounded-md hover:bg-secondary/5 transition-colors text-primary"
                onClick={() => {
                  setFilters({
                    brands: [],
                    categories: [],
                    priceRange: null,
                    skinType: [],
                    concerns: [],
                    formulation: []
                  })
                }}
              >
                Clear All
              </button>
              <button 
                className="flex-1 bg-accent-1 text-contrast py-2.5 rounded-md hover:bg-accent-1/90 transition-colors"
                onClick={onClose}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default FilterSidebar