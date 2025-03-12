"use client"

import { HomeIcon, RotateCcw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="fixed inset-0 z-100 grid min-h-screen place-items-center bg-primary px-6 py-12">
      <div className="text-center">
        {/* Error Image */}
        <div className="relative h-48 w-48 md:h-64 md:w-64 mx-auto mb-8">
          <Image 
            src="/icons/error.svg" 
            alt="Error occurred" 
            fill 
            priority
            className="object-contain"
          />
        </div>

        {/* Error Content */}
        <h1 className="text-2xl md:text-3xl font-bold text-secondary mb-4">
          Something went wrong!
        </h1>
        <p className="text-[#5C4033] mb-8 max-w-md mx-auto">
          We apologize for the inconvenience. Please try again or return to homepage.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 
              bg-accent-1 hover:bg-pink-600/90 text-white px-6 py-3 
              rounded-[4px] transition-colors"
          >
            <RotateCcw size={20} />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 
              bg-secondary  hover:text-pink-600/90 
              text-secondary px-6 py-3 rounded-[4px] transition-colors"
          >
            <HomeIcon size={20} />
            Go Home
          </Link>
        </div>
      </div>
    </main>
  )
}
