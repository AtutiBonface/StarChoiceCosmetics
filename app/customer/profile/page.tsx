'use client'

import { useState } from 'react'
import { User, Lock, Eye, EyeOff, AlertTriangle, ChevronRight } from 'lucide-react'
import Link from 'next/link'

type Tab = 'profile' | 'security'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [profileData, setProfileData] = useState({
    name: 'Atuti Bonface',
    email: 'admin@atuti.com',
    phone: '+254712345678'
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add profile update logic here
    console.log('Updating profile:', profileData)
  }

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add password update logic here
    console.log('Updating password:', passwordData)
  }

  const handleDeleteAccount = () => {
    // Add account deletion logic here
    console.log('Deleting account...')
  }

  return (
    <div className="w-full">
        <div className="w-full bg-secondary">
          <div className="max-w-7xl mx-auto px-4 py-2">
            <div className="flex items-center gap-2 text-sm text-secondary">
              <Link href="/" className="hover:text-accent-1">Home</Link>
              <ChevronRight size={16} />
              <span className="text-accent-1">My profile</span>
            </div>
          </div>
        </div>
        <div className='px-4 py-4 bg-primary shadow-sm rounded-[1px]'>
            <div className="mb-2">
                <h1 className="text-2xl font-bold text-secondary">Account Settings</h1>
                <p className="text-gray-500 mt-1">Manage your account details and security</p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-medium mb-6">
                <button
                onClick={() => setActiveTab('profile')}
                className={`
                    flex items-center gap-2 px-6 py-3 font-medium text-sm
                    ${activeTab === 'profile'
                    ? 'text-accent-1 border-b-2 border-pink-600'
                    : 'text-secondary hover:text-accent-1'
                    }
                `}
                >
                <User className="w-4 h-4" />
                Profile Details
                </button>
                <button
                onClick={() => setActiveTab('security')}
                className={`
                    flex items-center gap-2 px-6 py-3 font-medium text-sm
                    ${activeTab === 'security'
                    ? 'text-accent-1 border-b-2 border-pink-600'
                    : 'text-secondary hover:text-accent-1'
                    }
                `}
                >
                <Lock className="w-4 h-4" />
                Security
                </button>
            </div>

            {/* Profile Details Form */}
            {activeTab === 'profile' && (
                <form onSubmit={handleProfileSubmit} className="space-y-6 max-w-lg">
                <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                    Full Name
                    </label>
                    <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    className="w-full md:w-96 px-4 py-2 border border-medium rounded-[1px] focus:outline-none focus:ring-1 focus:ring-pink-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                    Email Address
                    </label>
                    <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    className="w-full md:w-96 px-4 py-2 border border-medium rounded-[1px] focus:outline-none focus:ring-1 focus:ring-pink-600"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                    Phone Number
                    </label>
                    <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full md:w-96 px-4 py-2 border border-medium rounded-[1px] focus:outline-none focus:ring-1 focus:ring-pink-600"
                    />
                </div>

                <button
                    type="submit"
                    className="px-8 py-2 bg-accent-1 text-white rounded-[1px] hover:bg-accent-1/90 transition-colors"
                >
                    Update Profile
                </button>
                </form>
            )}

            {/* Security Form */}
            {activeTab === 'security' && (
            <div className="space-y-8">
                <form onSubmit={handlePasswordSubmit} className="space-y-6 max-w-lg">
                    <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                        Current Password
                    </label>
                    <div className="relative md:w-96">
                        <input
                        type={showPassword ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                        className="w-full md:w-96 px-4 py-2 border border-medium rounded-[1px] focus:outline-none focus:ring-1 focus:ring-pink-600"
                        />
                        <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                        New Password
                    </label>
                    <div className="relative md:w-96">
                        <input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                        className="w-full md:w-96 px-4 py-2 border border-medium rounded-[1px] focus:outline-none focus:ring-1 focus:ring-pink-600"
                        />
                        <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                        {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                    </div>

                    <div>
                    <label className="block text-sm font-medium text-secondary mb-2">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                        className="w-full md:w-96 px-4 py-2 border border-medium rounded-[1px] focus:outline-none focus:ring-1 focus:ring-pink-600"
                    />
                    </div>

                    <button
                    type="submit"
                    className="px-8 py-2 bg-accent-1 text-white rounded-[1px] hover:bg-accent-1/90 transition-colors"
                    >
                    Update Password
                    </button>
                </form>

                {/* Delete Account Section */}
                <div className="border-t border-medium pt-8">
                    <div className="bg-red-50 border border-red-200 rounded-[1px] p-4">
                    <h3 className="text-lg font-medium text-red-600 mb-1">Delete Account</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    
                    {!showDeleteConfirm ? (
                        <button
                        type="button"
                        onClick={() => setShowDeleteConfirm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 border border-red-600 text-red-600 rounded-[1px] hover:bg-red-50 transition-colors"
                        >
                        <AlertTriangle className="w-4 h-4" />
                        Delete Account
                        </button>
                    ) : (
                        <div className="space-y-4">
                        <div className="flex items-center gap-2 text-red-600">
                            <AlertTriangle className="w-5 h-5" />
                            <p className="text-sm font-medium">Are you sure you want to delete your account?</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                            type="button"
                            onClick={handleDeleteAccount}
                            className="px-4 py-2 bg-red-600 text-white rounded-[1px] hover:bg-red-700 transition-colors"
                            >
                            Yes, Delete My Account
                            </button>
                            <button
                            type="button"
                            onClick={() => setShowDeleteConfirm(false)}
                            className="px-4 py-2 border border-medium text-secondary rounded-[1px] hover:bg-gray-50 transition-colors"
                            >
                            Cancel
                            </button>
                        </div>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            )}

            </div>
      
    </div>
  )
}