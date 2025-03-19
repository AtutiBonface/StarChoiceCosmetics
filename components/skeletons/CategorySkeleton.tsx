const CategorySkeleton = () => {
  return (
    <section className="bg-primary py-8 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative mb-8 text-center">
          <div className="h-8 w-48 bg-secondary rounded mx-auto"></div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-8">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex-none animate-pulse">
                <div className="flex flex-col items-center">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-secondary"></div>
                  <div className="mt-4 h-6 w-24 bg-secondary rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-secondary rounded-full"
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySkeleton;
