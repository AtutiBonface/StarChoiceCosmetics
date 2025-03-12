'use client'

import { CreditCard, Plus, Trash2, Phone } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type PaymentMethod = 'card' | 'mpesa'

// Mock data for saved payment methods
const savedPayments = {
  cards: [
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expMonth: '12',
      expYear: '2025',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '5555',
      expMonth: '08',
      expYear: '2024',
      isDefault: false
    }
  ],
  mpesa: [
    {
      id: 1,
      phoneNumber: '+254712345678',
      name: 'John Doe',
      isDefault: true
    }
  ]
}

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState<PaymentMethod>('card')
  const [showAddForm, setShowAddForm] = useState(false)

  const handleSetDefault = (id: number, type: PaymentMethod) => {
    // Add set default logic here
    console.log(`Setting default ${type}:`, id)
  }

  const handleDelete = (id: number, type: PaymentMethod) => {
    // Add delete logic here
    console.log(`Deleting ${type}:`, id)
  }

  return (
    <div className="bg-primary px-4 py-4 shadow-sm rounded-[4px]  w-full">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Payment Methods</h1>
          <p className="text-gray-500 mt-1">Manage your saved payment methods</p>
        </div>
      </div>

      {/* Payment Method Tabs */}
      <div className="flex border-b border-medium mb-2">
        <button
          onClick={() => setActiveTab('card')}
          className={`
            flex items-center gap-2 px-6 py-3 font-medium text-sm
            ${activeTab === 'card'
              ? 'text-accent-1 border-b-2 border-accent-1'
              : 'text-secondary hover:text-accent-1'
            }
          `}
        >
          <CreditCard className="w-4 h-4" />
          Credit/Debit Cards
        </button>
        <button
          onClick={() => setActiveTab('mpesa')}
          className={`
            flex items-center gap-2 px-6 py-3 font-medium text-sm
            ${activeTab === 'mpesa'
              ? 'text-accent-1 border-b-2 border-accent-1'
              : 'text-secondary hover:text-accent-1'
            }
          `}
        >
          <Phone className="w-4 h-4" />
          M-PESA
        </button>
      </div>

      {/* Add Payment Method Button */}
      <button
        onClick={() => setShowAddForm(true)}
        className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-accent-1 text-white rounded-[4px] hover:bg-accent-1/90 transition-colors"
      >
        <Plus className="w-4 h-4" />
        Add {activeTab === 'card' ? 'New Card' : 'M-PESA Number'}
      </button>

      {/* Cards Section */}
      {activeTab === 'card' && (
        <div className="space-y-4">
          {savedPayments.cards.length > 0 ? (
            savedPayments.cards.map((card) => (
              <div
                key={card.id}
                className="bg-secondary p-4 rounded-[4px] border border-medium flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-8 relative">
                    <Image
                      src={`/icons/${card.type}.svg`}
                      alt={card.type}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-secondary">
                        •••• {card.last4}
                      </p>
                      {card.isDefault && (
                        <span className="text-xs font-medium text-accent-1 bg-pink-50 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      Expires {card.expMonth}/{card.expYear}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {!card.isDefault && (
                    <button
                      onClick={() => handleSetDefault(card.id, 'card')}
                      className="text-sm text-accent-1 hover:text-pink-700"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(card.id, 'card')}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-secondary rounded-[4px] border border-medium">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-lg font-medium text-secondary mb-2">No cards saved</h2>
              <p className="text-gray-500 mb-6">Add a card to make checkout easier</p>
            </div>
          )}
        </div>
      )}

      {/* M-PESA Section */}
      {activeTab === 'mpesa' && (
        <div className="space-y-4">
          {savedPayments.mpesa.length > 0 ? (
            savedPayments.mpesa.map((mpesa) => (
              <div
                key={mpesa.id}
                className="bg-secondary p-4 rounded-[4px] border border-medium flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center relative">
                    <Image alt='mpesa payment' src={"/icons/mpesa.png"} fill/>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-secondary">{mpesa.phoneNumber}</p>
                      {mpesa.isDefault && (
                        <span className="text-xs font-medium text-accent-1 bg-pink-50 px-2 py-1 rounded-full">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{mpesa.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  {!mpesa.isDefault && (
                    <button
                      onClick={() => handleSetDefault(mpesa.id, 'mpesa')}
                      className="text-sm text-accent-1 hover:text-pink-700"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(mpesa.id, 'mpesa')}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-secondary rounded-[4px] border border-medium">
              <Phone className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h2 className="text-lg font-medium text-secondary mb-2">No M-PESA numbers saved</h2>
              <p className="text-gray-500 mb-6">Add an M-PESA number for faster checkout</p>
            </div>
          )}
        </div>
      )}

      {/* Add Form Modal - You'll need to implement this separately */}
      {showAddForm && (
        <div>
          {/* Add your form modal here based on activeTab */}
        </div>
      )}
    </div>
  )
}