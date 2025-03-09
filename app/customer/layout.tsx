'use client'

import { useState } from 'react'
import ProfileSidebar from '@/components/accounts/profile-sidebar'
import { Menu } from 'lucide-react'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 pt-28 md:pt-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="md:flex gap-8">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden mb-4 p-2 hover:text-pink-600 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Sidebar */}
          <ProfileSidebar 
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
          />

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}