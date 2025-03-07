'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const TopBrands = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [brandsPerSlide, setBrandsPerSlide] = useState(2)
  
  const brands = [
    { id: 1, name: "Nice & Lovely", logo: "/nice-and-lovely.png" },
    { id: 2, name: "Nivea", logo: "/nivea.png" },
    { id: 3, name: "Garnier", logo: "/garnier.jpg" },
    { id: 4, name: "L'Oreal", logo: "/loreal.webp" },
    { id: 5, name: "Maybelline", logo: "/maybelline-new-york.webp" },
    { id: 6, name: "MAC", logo: "/MAC_Cosmetics.png" },
    { id: 7, name: "Neutrogena", logo: "/neutrogena.png" },
    { id: 8, name: "Dove", logo: "/Dove.png" },
  ]

  useEffect(() => {
    const updateBrandsPerSlide = () => {
      if (window.innerWidth < 640) setBrandsPerSlide(2)
      else if (window.innerWidth < 1024) setBrandsPerSlide(3)
      else setBrandsPerSlide(4)
    }

    updateBrandsPerSlide()
    window.addEventListener('resize', updateBrandsPerSlide)
    return () => window.removeEventListener('resize', updateBrandsPerSlide)
  }, [])

  const totalSlides = Math.ceil(brands.length / brandsPerSlide)

  // Functions for touch swiping
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)
  
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 30) {
      // Swiped left
      handleNextSlide()
    }
    
    if (touchStart - touchEnd < -30) {
      // Swiped right
      handlePrevSlide()
    }
  }
  
  const handleNextSlide = () => {
    setCurrentSlide(current => current === totalSlides - 1 ? 0 : current + 1)
  }
  
  const handlePrevSlide = () => {
    setCurrentSlide(current => current === 0 ? totalSlides - 1 : current - 1)
  }

  return (
    <section className="bg-[#A9BA9D] py-5 w-full">
      <div className="mx-auto">
        <div className="product-title relative  flex justify-center items-center mb-2 mx-3">
          <h2 className="text-3xl font-bold text-[#333333] bg-[#A9BA9D] px-3 z-10 ">
            Our Top Brands
          </h2>
        </div>

        
        <div className="relative">
          <div 
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentSlide * (100 / totalSlides)}%)`,
                width: `${totalSlides * 100}%`
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div 
                  key={slideIndex} 
                  className="flex flex-nowrap"
                  style={{ width: `${100 / totalSlides}%` }}
                >
                  {brands.slice(
                    slideIndex * brandsPerSlide, 
                    slideIndex * brandsPerSlide + brandsPerSlide
                  ).map((brand) => (
                    <div 
                      key={brand.id}
                      className="px-2 md:px-4"
                      style={{ width: `${100 / brandsPerSlide}%` }}
                    >
                      <div className="bg-[#F8F1E9] p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-[4px] ">
                        <div className="relative h-22 md:h-32  rounded-[4px] overflow-hidden">
                          <Image
                            src={brand.logo}
                            alt={brand.name}
                            fill
                            className="object-contain p-2"
                          />
                        </div>
                        <h3 className="text-center font-semibold text-[#333333] mt-4">{brand.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={handlePrevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-[#F8F1E9]/80 p-2 rounded-r-lg shadow-md z-10 hidden md:block"
            aria-label="Previous slide"
          >
            <ChevronLeft/>
          </button>
          
          <button 
            onClick={handleNextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#F8F1E9]/80 p-2 rounded-l-lg shadow-md z-10 hidden md:block"
            aria-label="Next slide"
          >
            <ChevronRight/>
          </button>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-300 ${
                  currentSlide === index 
                    ? 'w-8 h-2 bg-[#F8F1E9]' 
                    : 'w-2 h-2 bg-[#F8F1E9]/50'
                } rounded-full`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TopBrands