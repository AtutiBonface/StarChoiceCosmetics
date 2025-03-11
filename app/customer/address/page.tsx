'use client'

import { MapPin, Plus, Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'

// Mock data for addresses
const addresses = [
  {
    id: 1,
    name: 'Home',
    recipient: 'John Doe',
    phone: '+254712345678',
    address: 'Karen Road',
    city: 'Nairobi',
    isDefault: true
  },
  {
    id: 2,
    name: 'Office',
    recipient: 'John Doe',
    phone: '+254712345678',
    address: 'Westlands Road',
    city: 'Nairobi',
    isDefault: false
  }
]

export default function AddressPage() {
  const handleDelete = (id: number) => {
    // Add delete logic here
    console.log('Deleting address:', id)
  }

  const handleSetDefault = (id: number) => {
    // Add set default logic here
    console.log('Setting default address:', id)
  }

  return (
    <div className="px-4 py-4 bg-primary w-full h-full shadow-sm rounded-[1px]">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-secondary">Address Book</h1>
        <Link 
          href="/customer/address/create"
          className="inline-flex items-center gap-2 px-4 py-2 bg-accent-1 text-white rounded-[1px] hover:bg-accent-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add New Address
        </Link>
      </div>

      {addresses.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {addresses.map((address) => (
            <div 
              key={address.id}
              className="bg-primary p-4  border border-medium overflow-hidden relative"
            >
              {address.isDefault && (
                <span className="absolute top-4 right-4 text-xs font-medium text-accent-1 bg-pink-50 px-2 py-1 rounded-full">
                  Default
                </span>
              )}
              
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-accent-1" />
                </div>
                <div>
                  <h3 className="font-medium text-secondary">{address.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{address.recipient}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4 text-sm text-secondary">
                <p>{address.phone}</p>
                <p>{address.address}</p>
                <p>{address.city}</p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-medium">
                <Link
                  href={`/customer/address/edit/${address.id}`}
                  className="inline-flex items-center gap-2 text-sm text-secondary hover:text-accent-1"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(address.id)}
                  className="inline-flex items-center gap-2 text-sm text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => handleSetDefault(address.id)}
                    className="ml-auto text-sm text-accent-1 hover:text-accent-2"
                  >
                    Set as Default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-primary rounded-[1px] border border-medium">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-lg font-medium text-secondary mb-2">No addresses saved</h2>
          <p className="text-gray-500 mb-6">Add a delivery address to speed up checkout</p>
          <Link
            href="/customer/address/new"
            className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-[1px] hover:bg-pink-600/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add New Address
          </Link>
        </div>
      )}
    </div>
  )
}