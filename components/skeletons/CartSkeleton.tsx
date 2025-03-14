import React from 'react'
const CartSkeleton = () => {
  return (
    <div className="animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="h-4 w-32 bg-light rounded"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-2 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            {/* Desktop Items */}
            <div className="hidden sm:block space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-primary p-4 rounded-[4px]">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <div className="w-32 h-32 bg-light rounded-[4px]"></div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="h-6 w-3/4 bg-light rounded mb-2"></div>
                      <div className="h-4 w-24 bg-light rounded mb-2"></div>
                      <div className="h-6 w-32 bg-light rounded mb-2"></div>
                      <div className="h-4 w-20 bg-light rounded"></div>

                      {/* Controls */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="h-10 w-32 bg-light rounded"></div>
                        <div className="h-10 w-40 bg-light rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Items */}
            <div className="sm:hidden space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-primary p-4 rounded-[4px]">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 bg-light rounded-[4px]"></div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="h-4 w-full bg-light rounded mb-2"></div>
                      <div className="h-4 w-24 bg-light rounded mb-2"></div>
                      <div className="h-3 w-32 bg-light rounded mb-2"></div>
                      <div className="h-3 w-20 bg-light rounded"></div>
                    </div>
                  </div>

                  {/* Mobile Controls */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="h-8 w-20 bg-light rounded"></div>
                    <div className="h-8 w-32 bg-light rounded"></div>
                  </div>
                </div>
              ))}

              <div className="bg-secondary p-4 rounded-[4px] border border-medium">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="h-4 w-24 bg-light rounded mb-2"></div>
                    <div className="h-6 w-32 bg-light rounded"></div>
                  </div>
                  <div className="h-10 w-24 bg-light rounded"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary - Desktop */}
          <div className="hidden lg:block bg-secondary p-6 rounded-[4px] shadow-sm border border-medium h-fit">
            <div className="h-6 w-40 bg-light rounded mb-6"></div>
            
            <div className="space-y-4">
              <div className="flex justify-between pb-2">
                <div className="h-4 w-32 bg-light rounded"></div>
                <div className="h-4 w-24 bg-light rounded"></div>
              </div>
              <div className="flex justify-between pb-2">
                <div className="h-4 w-20 bg-light rounded"></div>
                <div className="h-4 w-16 bg-light rounded"></div>
              </div>
              
              <div className="border-t border-medium pt-4">
                <div className="flex justify-between">
                  <div className="h-6 w-16 bg-light rounded"></div>
                  <div className="h-6 w-32 bg-light rounded"></div>
                </div>
              </div>
            </div>

            <div className="h-12 w-full bg-light rounded-[4px] mt-6"></div>
            <div className="h-8 w-40 bg-light rounded mx-auto mt-4"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartSkeleton