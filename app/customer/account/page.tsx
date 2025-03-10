import React from 'react'
import ProfileSidebar from '@/components/accounts/profile-sidebar'
import AccountSummary from '@/components/accounts/account-summary'
const Account = () => {
  return (
    <div>
        <div className="mobile-account-page md:hidden ">
            <ProfileSidebar/>
        </div>
        <div className="desktop-account-page  hidden md:block   w-full px-2">
            <AccountSummary/>
        </div>
    </div>
  )
}

export default Account