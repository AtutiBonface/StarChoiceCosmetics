'use client'
import React, { useState } from 'react'
import { Mail, Lock, ArrowLeft, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Loading from '../loading'
type TabType = 'login' | 'register'
type FormStage = 'credentials' | 'verification' | 'success'

const Accounts = () => {
  const [activeTab, setActiveTab] = useState<TabType>('login')
  const [formStage, setFormStage] = useState<FormStage>('credentials')
  const [loginformData, setLoginFormData] = useState({email: "", password:""})
  const [isloading , setIsLoading] = useState(false)
  const [registerformData, setRegisterFormData] = useState({first_name: "",last_name: "", email: "", register_password:"", confirm_password:""})

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try{
      setIsLoading(true)
      const resp = await  axios.post('/api/login', JSON.stringify(loginformData))
      console.log(resp)
      window.location.href = "/cart"

    }catch(error){
      console.error(error)
    }finally{
      setIsLoading(false)
    }

    /* setFormStage('verification') */
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()


    alert("This has not been set up yet")


    /* setFormStage('verification') */
  }

  /* const handleVerification = (e: React.FormEvent) => {
    e.preventDefault()
    setFormStage('success')
    // Redirect to dashboard after 2 seconds
    setTimeout(() => {
      router.push('/customer/profile')
    }, 2000)
  }
 */
  /* const resetForm = () => {
    setFormStage('credentials')
  } */


  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setLoginFormData({...loginformData, [e.target?.name]: e.target.value})

  }
  const handleRegisterFormChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setRegisterFormData({...registerformData, [e.target?.name]: e.target.value})

  }

  if (isloading) return <Loading/>
  return (
    <div className="fixed inset-0 z-50 w-full h-screen bg-primary">
      <div className="h-full flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-6xl grid md:grid-cols-2 gap-8 items-center">
          {/* Back Button - Only on Mobile */}
          <button 
            onClick={() => router.back()}
            className="absolute top-4 left-4 p-2 text-secondary md:hidden hover:text-accent-1 transition-colors"
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
          <div className="w-full max-w-md mx-auto bg-secondary p-6 rounded-[1px] border border-medium shadow-sm">
            {/* Logo and Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-10 h-10">
                <Image
                  src="/icons/starchoice-logo.svg"
                  alt="StarChoice"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <p className="text-sm text-secondary">StarChoice Cosmetics</p>
                <h2 className="text-lg font-medium text-secondary">
                  {formStage === 'credentials' && (
                    activeTab === 'login' ? 'Sign in to continue' : 'Create your account'
                  )}
                  {formStage === 'verification' && 'Verify your account'}
                  {formStage === 'success' && 'Success!'}
                </h2>
              </div>
            </div>

            {/* Different form stages */}
            <div className="transition-all duration-300">
              {/* Credentials Stage */}
              {formStage === 'credentials' && (
                <div className={`transition-opacity duration-300 ${formStage === 'credentials' ? 'opacity-100' : 'opacity-0'}`}>
                  {activeTab === 'login' ? (
                    <>
                      <form className="space-y-4" onSubmit={handleLogin}>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
                            Email address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name='email'
                              value={loginformData.email}
                              onChange={handleLoginFormChange}
                              className="block w-full px-3 py-2 pl-10 text-secondary border border-medium  focus:outline-none focus:ring-2 focus:ring-pink-600"
                              placeholder="Enter your email"
                              required
                            />
                            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="password" className="block text-sm font-medium text-secondary mb-1">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              name="password"
                              className="block w-full px-3 py-2 pl-10 text-secondary border border-medium  focus:outline-none focus:ring-2 focus:ring-pink-600"
                              placeholder="Enter your password"
                              required
                              value={loginformData.password}
                              onChange={handleLoginFormChange}
                            />
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded-[1px] text-accent-1 focus:ring-pink-500" />
                            <span className="text-sm text-secondary">Remember me</span>
                          </label>
                          <Link href="/forgot-password" className="text-sm text-accent-1 hover:text-pink-700 font-medium">
                            Forgot password?
                          </Link>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-accent-1 text-white py-2.5 rounded-[1px] hover:bg-pink-700 transition-colors font-medium shadow-sm mt-4"
                        >
                          Sign in
                        </button>
                      </form>

                      <p className="mt-5 text-center text-sm text-secondary">
                        Not registered?{' '}
                        <button
                          onClick={() => setActiveTab('register')}
                          className="text-accent-1 hover:text-pink-700 font-medium"
                        >
                          Create an account
                        </button>
                      </p>
                    </>
                  ) : (
                    <>
                      <form className="space-y-4" onSubmit={handleRegister}>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="first-name" className="block text-sm font-medium text-secondary mb-1">
                              First Name
                            </label>
                            <input
                              type="text"
                              id="first-name"
                              name = 'first_name'
                              className="w-full px-4 py-2 border border-medium focus:outline-none focus:ring-2 focus:ring-pink-600 rounded-[1px]"
                              placeholder="First name"
                              required
                              onChange={handleRegisterFormChange}
                            />
                          </div>
                          <div>
                            <label htmlFor="last-name" className="block text-sm font-medium text-secondary mb-1">
                              Last Name
                            </label>
                            <input
                              type="text"
                              id="last-name"
                              name='last_name'
                              className="w-full px-4 py-2 border border-medium focus:outline-none focus:ring-2 focus:ring-pink-600 rounded-[1px]"
                              placeholder="Last name"
                              required
                              onChange={handleRegisterFormChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="register-email" className="block text-sm font-medium text-secondary mb-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              id="register-email"
                              name='register_email'
                              onChange={handleRegisterFormChange}
                              className="w-full px-4 py-2 pl-10 border border-medium focus:outline-none focus:ring-2 focus:ring-pink-600 rounded-[1px]"
                              placeholder="Enter your email"
                              required
                            />
                            <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="register-password" className="block text-sm font-medium text-secondary mb-1">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              id="register-password"
                              name = 'register_password'
                              className="w-full px-4 py-2 pl-10 border border-medium focus:outline-none focus:ring-2 focus:ring-pink-600 rounded-[1px]"
                              placeholder="Create a password"
                              required
                              onChange={handleRegisterFormChange}
                            />
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="register-password" className="block text-sm font-medium text-secondary mb-1">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              id="register-password"
                              name = 'confirm_password'
                              className="w-full px-4 py-2 pl-10 border border-medium focus:outline-none focus:ring-2 focus:ring-pink-600 rounded-[1px]"
                              placeholder="Confirm a password"
                              required
                              onChange={handleRegisterFormChange}
                            />
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-accent-1 text-white py-2.5 rounded-[1px] hover:bg-pink-700 transition-colors font-medium shadow-sm mt-4"
                        >
                          Create Account
                        </button>
                      </form>

                      <p className="mt-5 text-center text-sm text-secondary">
                        Already have an account?{' '}
                        <button
                          onClick={() => setActiveTab('login')}
                          className="text-accent-1 hover:text-pink-700 font-medium"
                        >
                          Sign in
                        </button>
                      </p>
                    </>
                  )}
                </div>
              )}

              {/* Verification Stage - Made more compact */}
              {formStage === 'verification' && (

               /*  <div className="transition-opacity duration-300 opacity-100">
                  <form onSubmit={handleVerification}>
                    <div className="mb-4">
                      <p className="text-center text-gray-600 mb-4">
                        We&apos;ve sent a verification code to <span className="font-semibold">{email || 'your email'}</span>
                      </p>
                      <div className="flex justify-center gap-2 mb-5">
                        {[...Array(4)].map((_, index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            className="w-12 h-12 text-center text-xl font-bold text-secondary border border-medium rounded-[1px] focus:outline-none focus:ring-2 focus:ring-pink-600"
                            required
                            autoFocus={index === 0}
                            onChange={(e) => {
                              if (e.target.value && index < 3) {
                                const nextInput = e.target.nextElementSibling as HTMLInputElement;
                                if (nextInput) nextInput.focus();
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && index > 0 && !e.currentTarget.value) {
                                const prevInput = e.currentTarget.previousElementSibling as HTMLInputElement;
                                if (prevInput) prevInput.focus();
                              }
                            }}
                          />
                        ))}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-accent-1 text-white py-2.5 rounded-[1px] hover:bg-pink-700 transition-colors font-medium shadow-sm"
                      >
                        Verify
                      </button>

                      <div className="mt-4 text-center space-y-2">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-sm text-gray-600">Didn&apos;t receive a code?</span>
                          <button type="button" className="text-sm text-accent-1 hover:text-pink-700 font-medium">
                            Resend
                          </button>
                        </div>
                        <button 
                          type="button"
                          onClick={resetForm}
                          className="block mx-auto text-sm text-gray-500 hover:text-gray-700 mt-3"
                        >
                          Go back
                        </button>
                      </div>
                    </div>
                  </form>
                </div> */
                <div></div>
              )}

              {/* Success Stage - Made more compact */}
              {formStage === 'success' && (
                <div className="text-center py-4">
                  {/* <div className="flex justify-center mb-3">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    {activeTab === 'login' ? 'Login Successful!' : 'Account Created!'}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {activeTab === 'login' 
                      ? 'You are being redirected to your profile...' 
                      : 'Your account has been created successfully. Redirecting...'}
                  </p>
                  <div className="w-full max-w-xs mx-auto">
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full animate-[progress_2s_ease-in-out]"></div>
                    </div>
                  </div> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Accounts