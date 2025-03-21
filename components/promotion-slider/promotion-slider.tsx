'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { promotions } from '@/mockData';
import { useRouter } from 'next/navigation';

const PromotionSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter()
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % promotions.length)
    }, 5000)

    return () => clearInterval(timer)
  }, []) // Remove promotions.length from dependencies

  return (
    <section className="w-full">
      <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-112 overflow-hidden">
        {promotions.map((promotion, index) => (
          <div
            key={promotion.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-full'
            }`}
          >
            {/* Image layer */}
            <Image
              src={promotion.image}
              alt={promotion.alt}
              className="object-cover"
              fill
              sizes="100vw"
              priority={index === currentSlide}
              {...(index !== currentSlide && { loading: index === 0 ? "eager" : "lazy" })}
            />
            
            
            <div className="max-w-6xl mx-auto w-full h-full relative">
                {/* Desktop and tablet content overlay */}
              <div className="absolute inset-0 hidden md:flex items-center">
                <div className={`w-full md:w-1/3 lg:w-1/3  ${
                  promotion.position === 'right' 
                    ? 'ml-auto mr-4 md:mr-10 lg:mr-18'
                    : promotion.position === 'left'
                    ? 'ml-4 md:ml-10 lg:ml-18'
                    : 'hidden' 
                }`}>
                  <div className=" promotion-card bg-white/90 p-4 md:p-6 lg:p-8 rounded-[4px] shadow-lg relative z-10">
                    <span className="bg-orange-400 h-6  text-contrast text-xs font-medium px-2 py-1 rounded-[1px] absolute top-2 -right-3 z-10">
                     {promotion.discount}% OFF
                    </span>              
                    
                    <div className="text-accent-1 font-bold text-lg mb-2">{promotion.brand}</div>
                    <h2 className="text-primary text-md md:text-lg lg:text-lg font-bold  leading-tight">{promotion.title}.</h2>
                    <p className="text-secondary text-sm md:text-sm lg:text-sm font-bold mt-2">{promotion.subtitle}.</p>
                    <button 
                      onClick={()=> router.push(`/search?brand=${encodeURIComponent(promotion.brand)}`)}
                      className="bg-accent-1 text-white cursor-pointer text-sm md:text-base font-medium py-2 px-6 rounded-[4px] mt-4 transition-all"
                      aria-label={promotion.buttonText}
                    >
                      {promotion.buttonText}
                    </button>
                  </div>
                </div>
              </div>           
               
            </div>

          
            {/* Mobile content - compact version */}
            <div className="absolute inset-x-0 bottom-0 md:hidden">
              <div className="bg-white/90 px-2 py-1 shadow-lg">
                <div className="text-accent-1 font-bold text-sm">{promotion.brand}</div>
                <div className="flex justify-between items-center">
                  <span className="text-primary text-xs font-medium truncate pr-2 max-w-[60%]">
                    {promotion.title}
                  </span>
                  <button 
                    onClick={()=> router.push(`/search?brand=${encodeURIComponent(promotion.brand)}`)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-accent-1 text-white cursor-pointer text-sm font-medium py-1.5 px-3 rounded-[4px] transition-all"
                    aria-label={promotion.buttonText}
                  >
                    {promotion.buttonText}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation dots */}
        <div className="absolute bottom-20 md:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-[4px] transition-all ${
                currentSlide === index
                  ? 'bg-accent-1 scale-110'
                  : 'bg-white/70 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Navigation arrows */}
        <div className="max-w-6xl mx-auto w-full h-full relative">
          <button
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-accent-1 text-white cursor-pointer p-1 md:p-2 rounded-[4px] w-8 h-8 md:w-10 md:h-10 flex items-center justify-center z-10"
            onClick={() => setCurrentSlide(prev => (prev === 0 ? promotions.length - 1 : prev - 1))}
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-accent-1 text-white cursor-pointer p-1 md:p-2 rounded-[4px] w-8 h-8 md:w-10 md:h-10 flex items-center justify-center z-10"
            onClick={() => setCurrentSlide(prev => (prev === promotions.length - 1 ? 0 : prev + 1))}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromotionSlider;