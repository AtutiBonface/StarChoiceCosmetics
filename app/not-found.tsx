import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const NotFound = () => {
  return (
    <main className="fixed inset-0 z-100 grid min-h-screen place-items-center bg-[#A9BA9D] px-6 py-12">
      <div className="text-center">
        {/* Image Container */}
        <div className="relative h-48 w-48 md:h-64 md:w-64 mx-auto mb-8">
          <Image 
            src="/icons/404.svg" 
            alt="404 not found" 
            fill 
            priority
            className="object-contain"
          />
        </div>

        {/* Content */}
        <p className="text-base font-semibold text-pink-600">404</p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#333333] sm:text-6xl">
          Page not found!
        </h1>
        <p className="mt-6 text-lg leading-8 text-[#5C4033] max-w-2xl mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/" 
            className="w-full sm:w-auto bg-pink-600 hover:bg-pink-600/90 px-8 py-3 
              text-sm font-semibold text-white transition-colors rounded-[1px]"
          >
            Go back home
          </Link>
          <Link 
            href="/contact" 
            className="w-full sm:w-auto text-sm font-semibold text-[#333333] 
              hover:text-pink-600 transition-colors flex items-center justify-center gap-2"
          >
            Contact support 
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default NotFound