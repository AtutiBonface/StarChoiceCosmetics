'use client'
import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/mockData';

const CategoryCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerView, setItemsPerView] = useState(5);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Calculate dimensions and scrolling parameters
  useEffect(() => {
    const handleResize = () => {
      if (!scrollRef.current) return;
      
      const containerWidth = scrollRef.current.clientWidth;
      const gap = 32; // 8rem gap between items
      
      // Determine items per view based on screen width
      let itemsToShow = 5; // Default for large screens
      if (window.innerWidth < 768) {
        itemsToShow = 3; // Mobile
      } else if (window.innerWidth < 1024) {
        itemsToShow = 4; // Tablet
      }
      
      // Calculate item width based on container width, number of items, and gap
      const calculatedItemWidth = (containerWidth - (gap * (itemsToShow - 1))) / itemsToShow;
      
      setItemsPerView(itemsToShow);
      setItemWidth(calculatedItemWidth);
      
      // Calculate total pages (each scroll advances by 2 items)
      const scrollSteps = Math.ceil((categories.length - itemsToShow) / 2) + 1;
      setTotalPages(Math.max(1, scrollSteps));
      
      // Reset current page if it's now out of bounds
      if (currentPage >= scrollSteps) {
        setCurrentPage(0);
        setScrollOffset(0);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) < minSwipeDistance) return;

    if (distance > 0) {
      // Swiped left
      if (currentPage < totalPages - 1) nextPage();
    } else {
      // Swiped right
      if (currentPage > 0) prevPage();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const goToPage = (pageIndex: number) => {
    if (pageIndex !== currentPage) {
      setCurrentPage(pageIndex);
      
      // Progressive scrolling: scroll by itemsPerView
      const scrollAmount = pageIndex * itemsPerView * (itemWidth + 32); // width + gap
      
      setScrollOffset(scrollAmount);
    }
  };

  const nextPage = () => {
    const nextPageIndex = Math.min(currentPage + 1, totalPages - 1);
    goToPage(nextPageIndex);
  };

  const prevPage = () => {
    const prevPageIndex = Math.max(currentPage - 1, 0);
    goToPage(prevPageIndex);
  };

  return (
    <section className="bg-primary py-8 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative mb-8 text-center">
          <h2 className="text-3xl font-bold text-accent-1 inline-block relative z-10 px-4 bg-primary">
            Top Categories
          </h2>
          <div className="absolute w-full h-px bg-gray-200 top-1/2 left-0 z-0"></div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              ref={scrollRef}
              className="flex gap-8 transition-all duration-300 touch-pan-y"
              style={{ 
                transform: `translateX(-${scrollOffset}px)`,
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {categories.map((category) => (
                <Link 
                  href={category.href} 
                  key={category.id}
                  className="flex-none group"
                  style={{ width: `${itemWidth}px` }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-28 h-28 md:w-36 md:h-36  rounded-full bg-gray-100 overflow-hidden relative group-hover:shadow-lg transition-all duration-300">
                      <div className="absolute inset-0 bg-secondary bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
                      <Image 
                        src={category.image} 
                        alt={category.name}
                        fill
                        sizes="(max-width: 768px) 112px, 144px"
                        className="object-contain p-1 rounded-full"
                      />
                    </div>
                    <h3 className="mt-4 text-lg font-medium text-primary">{category.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Pagination dots */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`transition-all ${
                    currentPage === index 
                      ? 'w-6 h-2 bg-accent-1 rounded-full' 
                      : 'w-2 h-2 bg-secondary rounded-full'
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;