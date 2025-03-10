'use client'

import { useState, useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface AddressFormData {
  name: string
  phone: string
  address: string
  city: string
  isDefault: boolean
}

export default function AddressEditPage() {
  const router = useRouter()
  const params = useParams()
  const isEditing = params?.id 

  const initialFormData: AddressFormData = {
    name: '',
    phone: '',
    address: '',
    city: '',
    isDefault: false
  }

  const [formData, setFormData] = useState<AddressFormData>(initialFormData)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Reset form when switching between create/edit
    if (!isEditing) {
      setFormData(initialFormData)
      return
    }

    // Fetch address data if editing
    // Replace with your actual data fetching logic
    setFormData({
      name: 'John Doe',
      phone: '+254712345678',
      address: 'Karen Road',
      city: 'Nairobi',
      isDefault: false
    })
  }, [isEditing])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Add your API call here
      if (isEditing) {
        console.log('Updating address:', formData)
      } else {
        console.log('Creating new address:', formData)
      }
      router.push('/customer/address')
    } catch (error) {
      console.error('Error saving address:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full mx-auto bg-primary shadow-sm rounded-[1px]">
      <div className="bg-primary p-2">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pb-2 border-b border-[#A9BA9D]">
          <Link
            href="/customer/address"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#333333]" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[#333333]">
              {isEditing ? 'Edit Address' : 'Add New Address'}
            </h1>
            <p className="text-sm text-gray-500">
              {isEditing ? 'Update your delivery address' : 'Add a new delivery address'}
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full md:w-96 px-4 py-2 border border-[#A9BA9D] rounded-[1px] focus:outline-none focus:ring-1 focus:ring-pink-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full md:w-96 px-4 py-2 border border-[#A9BA9D] rounded-[1px] focus:outline-none focus:ring-1 focus:ring-pink-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              Street Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full md:w-96 px-4 py-2 border border-[#A9BA9D] rounded-[1px] focus:outline-none focus:ring-1 focus:ring-pink-600"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#333333] mb-2">
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className="w-full md:w-96 px-4 py-2 border border-[#A9BA9D] rounded-[1px] focus:outline-none focus:ring-1 focus:ring-pink-600"
              required
            />
          </div>

          <div className="pt-6 border-t border-[#A9BA9D]">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isDefault}
                onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                className="rounded-[1px] text-pink-600 focus:ring-pink-600 cursor-pointer"
              />
              <span className="text-sm text-[#333333]">Set as default delivery address</span>
            </label>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Link
              href="/customer/address"
              className="px-2 py-2 text-[#333333] hover:bg-gray-50 rounded-[1px] transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-pink-600 text-white rounded-[1px] hover:bg-pink-600/90 transition-colors disabled:opacity-50"
            >
              {isLoading 
                ? 'Saving...' 
                : isEditing 
                  ? 'Update Address' 
                  : 'Add Address'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}