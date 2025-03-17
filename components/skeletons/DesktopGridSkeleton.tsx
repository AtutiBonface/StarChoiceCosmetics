const DesktopGridSkeleton = () => {
  return (
    <div className="hidden md:block animate-pulse max-w-6xl mx-auto px-2 py-2">
      {/* Title skeleton */}
      <div className="flex justify-center mb-6">
        <div className="h-8 w-48 bg-secondary rounded"></div>
      </div>

      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="bg-primary p-4 rounded-lg">
            {/* Image skeleton */}
            <div className="aspect-square bg-secondary rounded-lg mb-4"></div>
            
            {/* Title skeleton */}
            <div className="h-4 bg-secondary rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-secondary rounded w-1/2 mb-4"></div>
            
            {/* Rating skeleton */}
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-secondary rounded"></div>
              ))}
            </div>
            
            {/* Price skeleton */}
            <div className="h-6 bg-secondary rounded w-24 mb-4"></div>
            
            {/* Button skeleton */}
            <div className="h-10 bg-secondary rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesktopGridSkeleton;
