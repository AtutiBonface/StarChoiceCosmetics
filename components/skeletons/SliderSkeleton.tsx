const SliderSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="relative w-full h-[200px] sm:h-[300px] md:h-[400px] bg-secondary rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          {/* Navigation buttons */}
          <div className="absolute left-4 w-10 h-10 rounded-full bg-primary/20"></div>
          <div className="absolute right-4 w-10 h-10 rounded-full bg-primary/20"></div>
        </div>
        {/* Dots indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-primary/20"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SliderSkeleton;
