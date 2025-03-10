import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account | Sign In or Register',
  description: 'Sign in to your StarChoice Cosmetics account or create a new one. Manage your orders, wishlist, and personal details.',
  robots: {
    index: false,
    follow: true,
  }
}

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}