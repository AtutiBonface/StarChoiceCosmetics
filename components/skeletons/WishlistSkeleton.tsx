import React from 'react'

const WishlistSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="h-4 w-32 bg-light rounded"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-4">
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:mx-12">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="bg-transparent p-4 rounded-[4px]">
              <div className="relative aspect-square mb-4 bg-light rounded-[4px]"></div>
              
              <div className="h-4 bg-light rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-light rounded mb-4 w-1/2"></div>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-24 bg-light rounded"></div>
                <div className="h-4 w-16 bg-light rounded"></div>
              </div>
              
              <div className="flex items-center gap-1 mb-4">
                <div className="h-4 w-32 bg-light rounded"></div>
              </div>
              
              <div className="h-10 bg-light rounded-[4px]"></div>
            </div>
          ))}
        </div>

        <div className="sm:hidden space-y-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex rounded-[4px] overflow-hidden relative py-2">
              <div className="w-32 h-32 bg-light rounded-[4px] ml-2"></div>
              
              <div className="flex-1 p-3 flex flex-col justify-between">
                <div className="h-4 bg-light rounded mb-2 w-3/4"></div>
                
                <div className="h-3 bg-light rounded mb-2 w-1/2"></div>
                
                <div className="h-5 bg-light rounded mb-4 w-24"></div>
                
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-8 bg-light rounded-[4px]"></div>
                  <div className="h-8 w-8 bg-light rounded-[4px]"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WishlistSkeleton