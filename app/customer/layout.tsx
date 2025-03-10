import ProfileSidebar from '@/components/accounts/profile-sidebar'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | My Account',
    default: 'My Account | StarChoice Cosmetics'
  },
  description: 'Manage your StarChoice Cosmetics account, view orders, update profile, and track your beauty purchases.',
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    nocache: true,
    nosnippet: true,
  },
  alternates: {
    canonical: 'https://starchoice.co.ke/customer'
  },
  
  
}

export default function AccountLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="min-h-screen bg-primary pt-28 md:pt-38 ">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex gap-8 w-full">
          {/* Sidebar */}
          <div className="hidden md:block px-4">
            <ProfileSidebar/>
          </div>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}