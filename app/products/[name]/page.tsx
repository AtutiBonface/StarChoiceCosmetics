'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight, Heart, Minus, Plus, ShoppingCart, Star } from 'lucide-react'
import Toast from '@/components/Products/toast-notification'
import { RelatedProducts } from '@/components/Products/relatedProducts'
import { Product, products } from '@/mockData'
import { useParams } from 'next/navigation'
import { ProductSkeleton } from '@/components/skeletons'
import { useCart } from '@/services/cartWishlistContext'


type TabType = 'info' | 'reviews'

const ProductPreview = () => {
  const [selectedImage, setSelectedImage] = useState(0)
  const params = useParams()
  const name = params?.name
  const [isWishlist, setIsWishlist] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')
  const [activeTab, setActiveTab] = useState<TabType>('info')
  const [isLoading, setIsLoading] = useState(true)
  const [product, setProduct] = useState<Product | null>(null)  
  const {addToCart,cartItemQuantity, removeFromCart, isInCart , isInWishlist,addToWishlist ,removeFromWishlist, updateCartQuantity,} = useCart()


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        const decodedName = decodeURIComponent(name as string)
        const productFetched = name ? products.find(p => 
          p.id.toString().toLowerCase() === decodedName.toLowerCase()
        ) : null
        setProduct(productFetched || null)
      } catch (error) {
        console.error('Failed to fetch product:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [name])

  if (isLoading) return <ProductSkeleton />

  // Return early if product not found
  if (product === null) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center -mt-28">
        <div className="relative h-48 w-48 md:h-64 md:w-64 mx-auto mb-8">
                  <Image 
                    src="/icons/error.svg" 
                    alt="Error occurred" 
                    fill 
                    priority
                    className="object-contain"
                  />
          </div>
        <p className="text-2xl text-secondary text-bold ">Product not found!</p>
      </div>
    )
  }

  const handleAddToCart = () => {
    try {
      if(isInCart(product.id)){
        setToastMessage('Product is already in cart.')
        setToastType('info')
        setShowToast(true)
        return
      }
      addToCart(product)
      setToastMessage('Product added to cart successfully!')
      setToastType('success')
      setShowToast(true)
    }catch{  
      setToastMessage('Failed to add to cart')
      setToastType('error')
      setShowToast(true)
    }

  }
  const handleAddToWishList = () => {
    try { 
      if(isInWishlist(product.id)){
        removeFromWishlist(product.id)
        setToastMessage('Product removed from wishlist successfully!')
        setToastType('info')
        setShowToast(true)
        return
      }
      addToWishlist(product)
      setToastMessage('Product added to wishlist successfully!')
      setToastType('success') 
      setShowToast(true)
    }catch{ 
      setToastMessage('Failed to add to wishlist')
      setToastType('error')
      setShowToast(true)
    }
  }

  // Rating stars renderer
  const renderRating = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={14} 
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-200'}`} 
      />
    ))
  }

  return (
    <div className="bg-primary text-primary mb-18 md:mb-0">
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      
      {/* Sticky Mobile Actions */}
      <div className="fixed h-18 bottom-0 left-0 right-0 bg-primary border-t border-medium p-2 md:hidden z-50">
        <div className="flex items-center gap-4 justify-center px-2">   

          {isInCart(product.id) ? (
            <div className="flex flex-1 h-12 items-center justify-between  rounded-[4px]">
              <button
                onClick={() => {
                  const newQuantity = cartItemQuantity(product.id) - 1;
                  if (newQuantity < 1) {
                    removeFromCart(product.id);
                  } else {
                    updateCartQuantity(product.id, newQuantity);
                  }
                }
                }
                className="p-2  bg-accent-1 h-12 w-12 flex items-center justify-center rounded-[4px] hover:bg-gray-100"
              >
                <Minus size={16} className='text-white ' />
              </button>
              <span className="w-12 text-xl text-center">{cartItemQuantity(product.id)}</span>
              <button
                onClick={() => {
                  const newQuantity = cartItemQuantity(product.id) + 1;
                  if (newQuantity > product.stock) {
                    setToastMessage('Product is out of stock.')
                    setToastType('error')
                    setShowToast(true)
                    return
                  }
                  updateCartQuantity(product.id, newQuantity);
                }}

                className="p-2 bg-accent-1 h-12 w-12 flex items-center justify-center rounded-[4px] hover:bg-gray-100"
              >
                <Plus size={16} className='text-white' />
              </button>
            </div>
            ) : (
              <button onClick={handleAddToCart} className="flex-1 bg-accent-1 text-white py-3 px-6 rounded-[4px] hover:bg-accent-1/90 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart size={20} />
                  Add to Cart
              </button>
            )}    



          <button
            onClick={() => {
              handleAddToWishList()
              setIsWishlist(!isWishlist)}
            }
            className={`ml-2  rounded-[4px] text-red-500 h-12 w-12 flex items-center justify-center`}
          >
            <Heart                        
              className={`h-10 w-10 ${isWishlist || isInWishlist(product.id) ? 'fill-red-500' : 'fill-white'}`} 
            />
          </button>
            
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full pb-2  md:pb-0"> 
        {/* Breadcrumb */}
        <div className="w-full bg-secondary">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Link href="/" className="hover:text-accent-1 flex-shrink-0">
                Home
              </Link>
              <ChevronRight size={16} className="flex-shrink-0" />
              <Link 
                href={`/search?brand=${encodeURIComponent(product.brand)}`} 
                className="hover:text-accent-1 flex-shrink-0"
              >
                {product.brand}
              </Link>
              <ChevronRight size={16} className="flex-shrink-0" />
              <span className="text-accent-1 truncate max-w-[200px] sm:max-w-[300px] md:max-w-[400px]">
                {product.name}
              </span>
            </div>
          </div>
        </div>

        {/* Product Info Section */}
        <div className="max-w-7xl mx-auto px-4 py-4 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image Gallery */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden"> {/* Changed from aspect-square */}
                <Image
                  src={product ? product.images[selectedImage]?.url || '' : ''}
                  alt={product ? product?.name || '' : ""}
                  fill
                  className="object-contain" // Changed from object-cover to maintain aspect ratio
                  priority
                />
              </div>

              {/* Scrollable Thumbnails */}
              <div className="relative">
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
                  {product &&  product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`relative w-20 h-20 flex-shrink-0 snap-start rounded-[4px] overflow-hidden ${
                        selectedImage === index ? 'border-2 border-accent-1' : ''
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`Product view ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <h1 className="text-2xl font-bold text-secondary">{product && product.name}</h1>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-accent-1">
                  KES {product && product.price.toLocaleString()}
                </span>
                {product && product.oldPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    KES {product.oldPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <h2 className="text-md font-medium text-primary">Description</h2>
                <p className="text-sm text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Rating - Add this section too */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {renderRating(product.rating || 0)}
                </div>
                <span className="text-sm text-secondary">
                  ({product.reviews?.length || 0} Reviews)
                </span>
              </div>

              {/* Quantity Selector */}
             

              {/* Actions */}
              <div className="flex gap-4 hidden md:flex">
                  {isInCart(product.id) ? (
                    <div className="flex gap-4 h-12 items-center justify-between  rounded-[4px]">
                      <button
                        onClick={() => {
                          const newQuantity = cartItemQuantity(product.id) - 1;
                          if (newQuantity < 1) {
                            removeFromCart(product.id);
                          } else {
                            updateCartQuantity(product.id, newQuantity);
                          }
                        }
                        }
                        className="p-2  bg-accent-1 h-12 w-12 flex items-center justify-center rounded-[4px] hover:bg-gray-100"
                      >
                        <Minus size={16} className='text-white ' />
                      </button>
                      <span className="w-12 text-xl text-center">{cartItemQuantity(product.id)}</span>
                      <button
                        onClick={() => {
                          const newQuantity = cartItemQuantity(product.id) + 1;
                          if (newQuantity > product.stock) {
                            setToastMessage('Product is out of stock.')
                            setToastType('error')
                            setShowToast(true)
                            return
                          }
                          updateCartQuantity(product.id, newQuantity);
                        }}

                        className="p-2 bg-accent-1 h-12 w-12 flex items-center justify-center rounded-[4px] hover:bg-gray-100"
                      >
                        <Plus size={16} className='text-white' />
                      </button>
                    </div>
                  ) : (
                    <button onClick={handleAddToCart} className="flex-1 bg-accent-1 text-white py-3 px-6 rounded-[4px] hover:bg-accent-1/90 transition-colors flex items-center justify-center gap-2">
                        <ShoppingCart size={20} />
                        Add to Cart
                    </button>
                  )}    



                <button
                  onClick={() => {
                    handleAddToWishList()
                    setIsWishlist(!isWishlist)}
                  }
                  className={`ml-2  rounded-[4px] text-red-500 h-12 w-12 flex items-center justify-center`}
                >
                  <Heart                        
                    className={`h-10 w-10 ${isWishlist || isInWishlist(product.id) ? 'fill-red-500' : 'fill-white'}`} 
                  />
                </button>
              </div>

              {/* Stock Status */}
              <p className="text-sm text-secondary">
                <span className="font-medium">Availability:</span>{' '}
                {product && product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </p>
            </div>
          </div>

          {/* Centered Tabs */}
          <div className="mt-8 w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-secondary">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-center border-b border-medium">
                <button
                  onClick={() => setActiveTab('info')}
                  className={`py-3 px-6 text-sm font-medium border-b-2 -mb-[2px] transition-colors ${
                    activeTab === 'info'
                      ? 'border-accent-1 text-accent-1'
                      : 'border-transparent text-secondary hover:text-accent-1'
                  }`}
                >
                  Product Info
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`py-3 px-6 text-sm font-medium border-b-2 -mb-[2px] transition-colors ${
                    activeTab === 'reviews'
                      ? 'border-accent-1 text-accent-1'
                      : 'border-transparent text-secondary hover:text-accent-1'
                  }`}
                >
                  Reviews ({product.reviews?.length || 0})
                </button>
              </div>

              {/* Tab Content */}
              <div className="py-2 max-w-3xl mx-auto">
                <div className="min-h-[400px] max-h-[400px] overflow-y-auto scrollbar-hide pr-4">
                  {activeTab === 'info' && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-xl font-bold text-secondary sticky top-0 bg-secondary py-2">
                          Product Details
                        </h2>
                        <p className="text-sm text-secondary whitespace-pre-line leading-relaxed">
                          {product.info.details}
                        </p>
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-secondary sticky top-0 bg-secondary py-2">
                          Ingredients
                        </h2>
                        <p className="text-sm text-secondary leading-relaxed">
                          {product.info.ingredients}
                        </p>
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-secondary sticky top-0 bg-secondary py-2">
                          How to Use
                        </h2>
                        <p className="text-sm text-secondary leading-relaxed">
                          {product.info.howToUse}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-6">
                      {!product.reviews?.length ? (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No reviews yet</p>
                        </div>
                      ) : (
                        product.reviews.map(review => (
                          <div 
                            key={review.id} 
                            className="bg-primary p-4 rounded-[4px] border border-medium hover:border-accent-1/20 transition-colors"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium text-secondary">{review.user}</h3>
                                  <span className="text-xs text-gray-500">
                                    {new Date(review.date).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    })}
                                  </span>
                                </div>
                                <div className="flex items-center mt-1 mb-3">
                                  {renderRating(review.rating)}
                                </div>
                                <p className="text-sm text-secondary leading-relaxed">
                                  {review.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

        </div>


      </div>
      <h2 className="product-title   relative text-3xl font-bold text-center mb-6  flex items-center  justify-center">
        <span className='bg-primary px-2 z-20'>Related Products</span>
      </h2>
      <RelatedProducts/>
    </div>
  )
}

export default ProductPreview