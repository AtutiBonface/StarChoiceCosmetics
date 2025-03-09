'use client'
import React, { useState } from 'react'
import { Mail, Lock, User, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

type TabType = 'login' | 'register'

const Accounts = () => {
  const [activeTab, setActiveTab] = useState<TabType>('login')
  const router = useRouter()

  return (
    <div className="fixed inset-0 z-200 w-full h-screen bg-secondary">
      <div className="h-full flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          {/* Back Button - Only on Mobile */}
          <button 
            onClick={() => router.back()}
            className="absolute top-4 left-4 p-2 text-white md:hidden rounded-full bg-pink-600 shadow-lg"
            aria-label="Go back"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>

          {/* Illustration - Hidden on mobile */}
          <div className="hidden md:block">
            <Image
              src={"/auth/login.svg"}
              alt={activeTab === 'login' ? "Login illustration" : "Register illustration"}
              width={500}
              height={500}
              className="w-full"
              priority
            />
          </div>

          {/* Forms Container */}
          <div className="w-full max-w-md mx-auto my-auto bg-white p-8 rounded-[1px] shadow-sm">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="text-center text-2xl font-bold text-[#333333] mb-8">
                {activeTab === 'login' ? 'Sign in to your account' : 'Create an account'}
              </h2>
            </div>

            {activeTab === 'login' ? (
              <>
                <form className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#333333]">
                      Email address
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="email"
                        id="email"
                        className="block w-full px-3 py-2 pl-10 text-[#333333] ring-1 ring-[#A9BA9D] rounded-[1px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
                        placeholder="Enter your email"
                      />
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-[#333333]">
                      Password
                    </label>
                    <div className="relative mt-2">
                      <input
                        type="password"
                        id="password"
                        className="block w-full px-3 py-2 pl-10 text-[#333333] ring-1 ring-[#A9BA9D] rounded-[1px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-600"
                        placeholder="Enter your password"
                      />
                      <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded-[1px] text-pink-600" />
                      <span className="text-sm text-[#333333]">Remember me</span>
                    </label>
                    <Link href="/forgot-password" className="text-sm text-pink-600 hover:text-pink-700">
                      Forgot password?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-pink-600 text-white py-2.5 rounded-[1px] hover:bg-pink-600/90 transition-colors font-medium"
                  >
                    Sign in
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-[#333333]">
                  Not registered?{' '}
                  <button
                    onClick={() => setActiveTab('register')}
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Create an account
                  </button>
                </p>
              </>
            ) : (
              <>
                <form className="space-y-6">
                  <div className="space-y-1">
                    <label htmlFor="name" className="text-sm font-medium text-[#333333]">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 pl-10 ring-1 ring-[#A9BA9D] focus:outline-none focus:ring-pink-600 rounded-[1px]"
                        placeholder="Enter your full name"
                      />
                      <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="register-email" className="text-sm font-medium text-[#333333]">
                      Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="register-email"
                        className="w-full px-4 py-2 pl-10 ring-1 ring-[#A9BA9D] focus:outline-none focus:ring-pink-600 rounded-[1px]"
                        placeholder="Enter your email"
                      />
                      <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="register-password" className="text-sm font-medium text-[#333333]">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="register-password"
                        className="w-full px-4 py-2 pl-10 ring-1 ring-[#A9BA9D] focus:outline-none focus:ring-pink-600 rounded-[1px]"
                        placeholder="Create a password"
                      />
                      <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="confirm-password" className="text-sm font-medium text-[#333333]">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type="password"
                        id="confirm-password"
                        className="w-full px-4 py-2 pl-10 ring-1 ring-[#A9BA9D] focus:outline-none focus:ring-pink-600 rounded-[1px]"
                        placeholder="Confirm your password"
                      />
                      <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-pink-600 text-white py-2 rounded-[1px] hover:bg-pink-600/90 transition-colors"
                  >
                    Create Account
                  </button>
                </form>

                <p className="mt-8 text-center text-sm text-[#333333]">
                  Already have an account?{' '}
                  <button
                    onClick={() => setActiveTab('login')}
                    className="text-pink-600 hover:text-pink-700 font-medium"
                  >
                    Sign in
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accounts