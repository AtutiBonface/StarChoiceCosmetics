const MobileGridSkeleton = () => {
  return (
    <div className="md:hidden animate-pulse max-w-7xl mx-auto px-2 py-2">
      {/* Title skeleton */}
      <div className="flex justify-center mb-4">
        <div className="h-6 w-40 bg-secondary rounded"></div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-primary p-2 rounded-lg">
            {/* Image skeleton */}
            <div className="aspect-square bg-secondary rounded-lg mb-2"></div>
            
            {/* Title skeleton */}
            <div className="h-3 bg-secondary rounded w-3/4 mb-1"></div>
            <div className="h-3 bg-secondary rounded w-1/2 mb-2"></div>
            
            {/* Rating skeleton */}
            <div className="flex gap-1 mb-2">
              <div className="w-3 h-3 bg-secondary rounded"></div>
              <div className="w-8 h-3 bg-secondary rounded"></div>
            </div>
            
            {/* Price skeleton */}
            <div className="h-4 bg-secondary rounded w-20 mb-2"></div>
            
            {/* Button skeleton */}
            <div className="h-8 bg-secondary rounded"></div>
          </div>
        ))}
      </div>

      {/* Loading indicator */}
      <div className="flex justify-center mt-4">
        <div className="w-6 h-6 bg-secondary rounded-full"></div>
      </div>
    </div>
  );
};

export default MobileGridSkeleton;
