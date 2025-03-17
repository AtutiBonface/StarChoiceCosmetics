const ProductSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="h-4 w-16 bg-secondary rounded"></div>
            <div className="h-4 w-4"></div>
            <div className="h-4 w-24 bg-secondary rounded"></div>
            <div className="h-4 w-4"></div>
            <div className="h-4 w-32 bg-secondary rounded"></div>
          </div>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <div className="relative h-[400px] md:h-[500px] bg-secondary rounded-lg"></div>
            
            {/* Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-20 h-20 bg-secondary rounded-[4px] flex-shrink-0"></div>
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="h-8 w-3/4 bg-secondary rounded"></div>
            
            <div className="flex items-center gap-4">
              <div className="h-10 w-36 bg-secondary rounded"></div>
              <div className="h-8 w-24 bg-secondary rounded"></div>
            </div>

            <div className="space-y-2">
              <div className="h-6 w-32 bg-secondary rounded"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-secondary rounded"></div>
                <div className="h-4 w-full bg-secondary rounded"></div>
                <div className="h-4 w-2/3 bg-secondary rounded"></div>
              </div>
            </div>

            {/* Rating Skeleton */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-secondary rounded"></div>
                ))}
              </div>
              <div className="h-4 w-24 bg-secondary rounded"></div>
            </div>

            {/* Quantity Selector Skeleton */}
            <div className="flex items-center gap-4">
              <div className="h-6 w-20 bg-secondary rounded"></div>
              <div className="h-10 w-32 bg-secondary rounded"></div>
            </div>

            {/* Actions Skeleton */}
            <div className="flex gap-4">
              <div className="flex-1 h-12 bg-secondary rounded-[4px]"></div>
              <div className="h-12 w-12 bg-secondary rounded-[4px]"></div>
            </div>

            {/* Stock Status Skeleton */}
            <div className="h-5 w-40 bg-secondary rounded"></div>
          </div>
        </div>

        {/* Tabs Skeleton */}
        <div className="mt-8 w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-secondary">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center border-b border-medium">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="h-10 w-32 bg-secondary/20 mx-2"></div>
              ))}
            </div>

            {/* Tab Content Skeleton */}
            <div className="py-6 max-w-3xl mx-auto">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-6 w-48 bg-secondary rounded"></div>
                    <div className="h-4 w-full bg-secondary rounded"></div>
                    <div className="h-4 w-full bg-secondary rounded"></div>
                    <div className="h-4 w-3/4 bg-secondary rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Actions Skeleton */}
      <div className="fixed h-18 bottom-0 left-0 right-0 bg-primary border-t border-medium p-2 md:hidden">
        <div className="flex items-center gap-4">
          <div className="h-10 w-32 bg-secondary rounded-[4px]"></div>
          <div className="flex-1 h-10 bg-secondary rounded-[4px]"></div>
        </div>
      </div>
    </div>
  )
}

export default ProductSkeleton
