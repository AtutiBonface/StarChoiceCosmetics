'use client'

import { useState } from 'react'
import { ChevronRight, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface PendingReview {
  id: number
  productName: string
  productImage: string
  orderDate: string
  orderNumber: string
  isExpanded: boolean
}

export default function ReviewsPage() {
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([
    {
      id: 1,
      productName: "Nivea Body Lotion",
      productImage: "/nivea-oil.webp",
      orderDate: "2024-03-01",
      orderNumber: "ORD-12345",
      isExpanded: false
    },
    {
      id: 2,
      productName: "Dove Shower Gel",
      productImage: "/cerave-oil.webp",
      orderDate: "2024-02-28",
      orderNumber: "ORD-12346",
      isExpanded: false
    },
    // Add more pending reviews as needed
  ])

  const [rating, setRating] = useState<number>(0)
  const [reviewText, setReviewText] = useState<string>('')

  const toggleReview = (id: number) => {
    setPendingReviews(reviews =>
      reviews.map(review =>
        review.id === id
          ? { ...review, isExpanded: !review.isExpanded }
          : review
      )
    )
  }

  const handleSubmitReview = (id: number) => {
    // Add review submission logic here
    console.log('Submitting review:', { id, rating, reviewText })
    
    // Reset form
    setRating(0)
    setReviewText('')
    
    // Remove from pending reviews
    setPendingReviews(reviews => 
      reviews.filter(review => review.id !== id)
    )
  }

  return (
    <div className="w-full">
        <div className="w-full bg-secondary">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Link href="/" className="hover:text-accent-1">Home</Link>
              <ChevronRight size={16} />
              <span className="text-accent-1">Pending Reviews</span>
            </div>
          </div>
        </div>

        <div className='px-4 py-4 bg-primary shadow-sm rounded-[1px] h-full'>
             {/* Header */}
            <div className="mb-6">
                <p className="text-gray-600">Share your experience with products you&apos;ve purchased</p>
            </div>
             {/* Reviews List */}
            <div className="space-y-4">
                {pendingReviews.length === 0 ? (
                <div className="text-center py-8 border border-medium rounded-[1px] bg-primary text-gray-500">
                    <p className="text-lg mb-1">No pending reviews</p>
                    <p className="text-sm">Your future purchases will appear here for review</p>
                </div>
                ) : (
                pendingReviews.map((review) => (
                    <div key={review.id} className="border border-medium rounded-[1px] bg-primary">
                    {/* Product Info */}
                    <div className="h-24 p-4 relative"> {/* Changed to relative positioning */}
                        <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 rounded-[1px] overflow-hidden">
                            <Image
                            src={review.productImage}
                            alt={review.productName}
                            fill
                            className="object-cover"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-secondary truncate">{review.productName}</h3>
                            <p className="text-sm text-gray-500 mt-1">
                            Order: {review.orderNumber} | Purchased: {new Date(review.orderDate).toLocaleDateString()}
                            </p>
                        </div>
                        </div>
                        
                        {!review.isExpanded && (
                        <button
                            onClick={() => toggleReview(review.id)}
                            className="absolute top-2 right-2 px-4 py-2 bg-transparent text-accent-1   hover:bg-pink-50 transition-colors text-sm whitespace-nowrap"
                        >
                            Write Review
                        </button>
                        )}
                    </div>

                        {/* Review Form */}
                    {review.isExpanded && (
                        <div className="p-4 border-t border-medium bg-primary">
                        <div className="space-y-4">
                            {/* Star Rating */}
                            <div>
                            <label className="block text-sm font-medium text-secondary mb-2">
                                Your Rating
                            </label>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`p-1 ${
                                    star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                >
                                    <Star className="w-6 h-6 fill-current" />
                                </button>
                                ))}
                            </div>
                            </div>

                            {/* Review Text */}
                            <div>
                            <label className="block text-sm font-medium text-secondary mb-2">
                                Your Review
                            </label>
                            <textarea
                                value={reviewText}
                                onChange={(e) => setReviewText(e.target.value)}
                                rows={4}
                                className="w-full px-4 py-2 border border-medium rounded-[1px] focus:outline-none focus:ring-1 focus:ring-pink-600"
                                placeholder="Share your experience with this product..."
                            />
                            </div>

                            <div className="flex gap-3">
                            {/* Cancel Button */}
                            <button
                                onClick={() => toggleReview(review.id)}
                                className="flex-1 bg-transparent text-red-600  py-2 px-4 rounded-[1px] hover:text-accent-1 transition-colors"
                            >
                                Cancel
                            </button>
                            
                            {/* Submit Button */}
                            <button
                                onClick={() => handleSubmitReview(review.id)}
                                disabled={!rating || !reviewText.trim()}
                                className="flex-1 bg-accent-1 text-white py-2 px-4 rounded-[1px] hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Submit Review
                            </button>
                            </div>
                        </div>
                        </div>
                    )}
                    </div>
                ))
                )}
            </div>

        </div> 
     

     
    </div>
  )
}