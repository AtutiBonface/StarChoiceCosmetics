'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
const PromotionSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const promotions = [
    {
      id: 1,
      image: "/Nice_Lovely_Banner.webp",
      alt: "Promotion 1"
    },
    {
      id: 2,
      image: "/Home-Layer-Banner.webp",
      alt: "Promotion 2"
    }
  ]

  // Auto slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === promotions.length - 1 ? 0 : prev + 1
      )
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full overflow-hidden">
      {/* Main slider container */}
      <div className="relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[400px]">
        {promotions.map((promotion, index) => (
          <div
            key={promotion.id}
            className={`absolute w-full h-full transition-all duration-500 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-full'
            }`}
          >
            <Image
                src={promotion.image}
                alt={promotion.alt}
                className="w-full h-full object-cover"
                fill
            />
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {promotions.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index 
                ? 'bg-[var(--accent-color-1)] scale-110' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-[var(--accent-color-1)] hover:bg-[#A9BA9D] text-white p-2  rounded-[4px] hidden md:block"
        onClick={() => setCurrentSlide(prev => (prev === 0 ? promotions.length - 1 : prev - 1))}
        aria-label="Previous slide"
      >
        ←
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-[var(--accent-color-1)] hover:bg-[#A9BA9D] text-white p-2 rounded-[4px] hidden md:block"
        onClick={() => setCurrentSlide(prev => (prev === promotions.length - 1 ? 0 : prev + 1))}
        aria-label="Next slide"
      >
        →
      </button>
    </div>
  )
}

export default PromotionSlider