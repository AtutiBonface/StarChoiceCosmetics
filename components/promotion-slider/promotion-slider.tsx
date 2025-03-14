'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
const PromotionSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const promotions = [
    {
      id: 1,
      image: "/banner-2.webp",
      alt: "Promotion 1"
    },
    {
      id: 2,
      image: "/banner-3.jpg",
      alt: "Promotion 2"
    },
    {
      id: 3,
      image: "/banner-1.jpg",
      alt: "Promotion 3"
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
    <section className="w-full">
      <div className="relative w-full aspect-[16/8] sm:aspect-[16/5] md:aspect-[16/6]  lg:aspect-[16/6] overflow-hidden">
        {promotions.map((promotion, index) => (
          <div
            key={promotion.id}
            className={`absolute inset-0 transition-all duration-500 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 translate-x-full'
            }`}
          >
            <Image
              src={promotion.image}
              alt={promotion.alt}
              className="object-cover"
              fill
              sizes="100vw"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {promotions.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentSlide === index 
                  ? 'bg-accent-1 scale-110' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation arrows */}
        <div className="max-w-7xl mx-auto w-full h-full relative">
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-accent-1 hover:bg-accent-2 text-contrast p-2 rounded-[4px] hidden md:block z-10"
            onClick={() => setCurrentSlide(prev => (prev === 0 ? promotions.length - 1 : prev - 1))}
            aria-label="Previous slide"
          >
            ←
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-accent-1 hover:bg-accent-2 text-contrast p-2 rounded-[4px] hidden md:block z-10"
            onClick={() => setCurrentSlide(prev => (prev === promotions.length - 1 ? 0 : prev + 1))}
            aria-label="Next slide"
          >
            →
          </button>
        </div>
      </div>
    </section>
  )
}

export default PromotionSlider