'use client'
import { X, ChevronDown } from "lucide-react"
import { useState } from "react"

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

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  return (
    <div className={`
      fixed lg:static left-0 top-28 md:top-32 z-40 
      w-full lg:w-64 h-[calc(100vh-7rem)] lg:h-auto 
      bg-primary lg:bg-transparent transition-all duration-300
      ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
    `}>
      <div className="flex flex-col h-full max-w-md mx-auto lg:max-w-none">
        {/* Header */}
        <div className="p-4 border-b border-medium flex justify-between items-center bg-primary">
          <h2 className="font-bold text-lg text-secondary">Filter Products</h2>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:text-pink-600 transition-colors"
            aria-label="Close filters"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 overflow-y-auto flex-1">
          <div className="space-y-4">
            {/* Brand Filter */}
            <div className="border-b border-medium pb-4">
              <button 
                onClick={() => toggleSection('brands')} 
                className="w-full flex justify-between items-center font-medium py-1"
              >
                <span>Brands</span>
                <ChevronDown 
                  size={18} 
                  className={`transition-transform ${expandedSections.brands ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {expandedSections.brands && (
                <div className="space-y-2 mt-2">
                  {filterOptions.brands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 py-1 px-1 hover:bg-gray-50 rounded transition-colors">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={(e) => {
                          const newBrands = e.target.checked
                            ? [...filters.brands, brand]
                            : filters.brands.filter(b => b !== brand)
                          setFilters({ ...filters, brands: newBrands })
                        }}
                        className="rounded text-pink-600"
                      />
                      <span className="text-sm">{brand}</span>
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
        <div className="p-4 border-t border-[#A9BA9D] bg-white lg:hidden">
          <div className="flex gap-3">
            <button 
              className="flex-1 border border-[#A9BA9D] py-2 rounded-[1px] hover:bg-gray-50 transition-colors"
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
              className="flex-1 bg-pink-600 text-white py-2 rounded-[1px] hover:bg-pink-600/90 transition-colors"
              onClick={onClose}
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar