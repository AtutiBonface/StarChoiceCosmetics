const BrandsSkeleton = () => {
  return (
    <section className="bg-secondary py-4 w-full animate-pulse">
      <div className="max-w-6xl mx-auto px-2">
        {/* Title skeleton */}
        <div className="flex justify-center mb-6">
          <div className="h-8 w-48 bg-primary/20 rounded"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-primary p-4 rounded-md shadow-md">
              {/* Logo skeleton */}
              <div className="relative h-28 md:h-36 bg-secondary/20 rounded-lg mb-4"></div>
              {/* Brand name skeleton */}
              <div className="h-4 bg-secondary/20 rounded w-24 mx-auto"></div>
            </div>
          ))}
        </div>

        {/* Mobile view all button skeleton */}
        <div className="flex justify-center mt-8 sm:hidden">
          <div className="h-10 w-32 bg-secondary/20 rounded"></div>
        </div>
      </div>
    </section>
  );
};

export default BrandsSkeleton;
