'use client'
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BottomBar from "@/components/navigation/bottombar";
import Whatsapp from "@/components/navigation/whatsapp";
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const TopBar = dynamic(() => import('@/components/navigation/topbar'), {
  ssr: true,
  loading: () => <div className="h-16 bg-primary animate-pulse" />
})

const Footer = dynamic(() => import('@/components/utils/footer'), {
  ssr: true,
  loading: () => <div className="h-40 bg-secondary animate-pulse" />
})

const shouldShowBottomNav = (pathname: string) => {
  const bottomNavPaths = ['/', '/cart', '/wishlist', '/customer', '/menu']
  return bottomNavPaths.some(path => pathname === path || pathname.startsWith(path + '/'))
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname()
  const hasBottomNav = shouldShowBottomNav(pathname)

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <TopBar />
        <main className={`flex-1 ${hasBottomNav ? 'pb-16' : ''} w-full mt-16 md:mt-38`}>
          {children}
        </main>
        <Whatsapp />        
        <BottomBar />
        <div className="hidden md:block mt-auto">
          <Footer />
        </div>
      </body>
    </html>
  );
}
