'use client'
import React, { useState } from 'react'
import { Mail, Lock, ArrowLeft, Loader} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Toast from '@/components/Products/toast-notification'

type TabType = 'login' | 'register'
type FormStage = 'credentials' | 'verification' | 'success'


const Accounts = () => {
  const [activeTab, setActiveTab] = useState<TabType>('login')
  const [formStage, setFormStage] = useState<FormStage>('credentials')
  const [loginformData, setLoginFormData] = useState({email: "", password:""})
  const [isloading , setIsLoading] = useState(false)
  const [registerformData, setRegisterFormData] = useState({first_name: "",last_name: "", email: "", register_password:"", confirm_password:""})
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState<'success' | 'error' | 'info'>('success')
  const [verificationCode, setVerificationCode] = useState(['', '', '', ''])
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const startCountdown = (seconds: number) => {
    setCanResend(false);
    setCountdown(seconds);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      await axios.post('/api/auth/login', JSON.stringify(loginformData))   
      setToastMessage('Verification Code has been sent to your email.')
      setToastType('success')
      setShowToast(true)
      setFormStage('verification')  
     
    } catch(error) {
      setToastType('error')
      setToastMessage('Login failed. Please try again.')
      setShowToast(true)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()

     setFormStage('verification') 
  }

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = verificationCode.join('')
    
    await axios.post('/api/auth/verification', JSON.stringify({
      verificationId: code, 
      email: loginformData.email || "admin@gmail.com"
    })).then((resp)=>{
      setToastMessage('Login successful! Redirecting...')
      setToastType('success')
      setShowToast(true)
      console.log(resp.data?.message)
      
      setTimeout(() => {
        window.location.href = "/cart"
      }, 1500)
    }).catch((resp)=>{
      setToastType('error')
      console.log(resp)
      setToastMessage('Verification failed. Please try again.')
      setShowToast(true)
      if (resp.response?.data?.waitTime) {
        startCountdown(resp.response.data.waitTime);
      }
    })
    

  }

  const handleVerificationInput = (index: number, value: string) => {
    const newCode = [...verificationCode]
    newCode[index] = value
    setVerificationCode(newCode)
  }

  const handlePaste = (e: React.ClipboardEvent, index: number) => {
    e.preventDefault()
    const paste = e.clipboardData.getData('text')
    if (paste.length >= 4) {
      // If pasted text is 4 or more characters, distribute across inputs
      const chars = paste.slice(0, 4).split('')
      setVerificationCode(chars)
    } else {
      // If pasted text is less than 4 characters, start from current input
      const newCode = [...verificationCode]
      const chars = paste.split('')
      chars.forEach((char, i) => {
        if (index + i < 4) {
          newCode[index + i] = char
        }
      })
      setVerificationCode(newCode)
    }
  }

  const resetForm = () => {
    setFormStage('credentials')
  } 


  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Debounce form updates
    requestAnimationFrame(() => {
      setLoginFormData(prev => ({...prev, [e.target.name]: e.target.value}))
    })
  }

  const handleRegisterFormChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setRegisterFormData({...registerformData, [e.target?.name]: e.target.value})

  }

  return (
    <div className="fixed inset-0 z-50 w-full h-screen bg-secondary">
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
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
          <div className="w-full max-w-md mx-auto bg-primary p-6 rounded-[4px] border border-medium shadow-sm">
            {/* Logo and Title */}
            <div className="mb-4 px-1 text-center">
              <div className="flex center w-full justify-center mb-1">
                <div className="relative  h-8 w-30">
                  <Image alt='logo' src={"/icons/starchoice-logo.png"} fill></Image>
                </div>
              </div>
              <h2 className="text-2xl font-semibold text-primary">
                {formStage === 'credentials' && (
                  activeTab === 'login' ? 'Sign in to continue' : 'Create your account'
                )}
                {formStage === 'verification' && 'Verify your account'}
                {formStage === 'success' && 'Success!'}
              </h2>
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
                          <label htmlFor="email" className="block text-md font-medium text-secondary mb-1">
                            Email address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name='email'
                              onChange={handleLoginFormChange}
                              className="block w-full px-3 py-3 pl-10 text-md text-secondary border border-medium rounded-[4px]  focus:outline-none text-input"
                              placeholder="Enter your email"
                              required
                            />
                            <Mail className="w-4 h-4 text-accent-1 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="password" className="block text-md font-medium text-secondary mb-1">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              name="password"
                              className="block w-full px-3 py-3 pl-10 text-md text-secondary border border-medium  rounded-[4px] focus:outline-none text-input"
                              placeholder="Enter your password"
                              required
                              onChange={handleLoginFormChange}
                            />
                            <Lock className="w-4 h-4 text-accent-1 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <label className="flex items-center gap-2">
                            <input type="checkbox" className="rounded-[4px] text-accent-1 focus:ring-pink-500" />
                            <span className="text-md text-secondary">Remember me</span>
                          </label>
                          <Link href="/forgot-password" className="text-sm text-accent-1 hover:text-pink-700 font-medium">
                            Forgot password?
                          </Link>
                        </div>

                        <button
                          type="submit"
                          disabled={isloading}
                          className={`w-full bg-accent-1 text-white py-2.5 rounded-[4px] hover:bg-pink-700 transition-colors font-medium shadow-sm mt-4 
                            ${isloading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                          {isloading ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader className="h-5 w-5 animate-spin text-white" />
                              Signing in...
                            </span>
                          ) : (
                            'Sign in'
                          )}
                        </button>
                      </form>

                      <p className="mt-5 text-center text-md text-secondary">
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
                            <label htmlFor="first-name" className="block text-md font-medium text-secondary mb-1">
                              First Name
                            </label>
                            <input
                              type="text"
                              name = 'first_name'
                              className="w-full px-4 py-2 border border-medium text-md text-secondary focus:outline-none text-input rounded-[4px]"
                              placeholder="First name"
                              required
                              onChange={handleRegisterFormChange}
                            />
                          </div>
                          <div>
                            <label htmlFor="last-name" className="block text-md font-medium text-secondary mb-1">
                              Last Name
                            </label>
                            <input
                              type="text"
                              name='last_name'
                              className="w-full px-4 py-2 border border-medium text-md text-secondary focus:outline-none text-input rounded-[4px]"
                              placeholder="Last name"
                              required
                              onChange={handleRegisterFormChange}
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="register-email" className="block text-md font-medium text-secondary mb-1">
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              type="email"
                              name='register_email'
                              onChange={handleRegisterFormChange}
                              className="w-full px-4 py-2 pl-10 border border-medium text-md text-secondary focus:outline-none text-input rounded-[4px]"
                              placeholder="Enter your email"
                              required
                            />
                            <Mail className="w-4 h-4 text-accent-1 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="register-password" className="block text-md font-medium text-secondary mb-1">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              name = 'register_password'
                              className="w-full px-4 py-2 pl-10 border border-medium text-md text-secondary focus:outline-none text-input rounded-[4px]"
                              placeholder="Create a password"
                              required
                              onChange={handleRegisterFormChange}
                            />
                            <Lock className="w-4 h-4 text-accent-1 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="register-password" className="block text-md font-medium text-secondary mb-1">
                            Confirm Password
                          </label>
                          <div className="relative">
                            <input
                              type="password"
                              id="register-password"
                              name = 'confirm_password'
                              className="w-full px-4 py-2 pl-10 border border-medium text-md text-secondary focus:outline-none text-input rounded-[4px]"
                              placeholder="Confirm a password"
                              required
                              onChange={handleRegisterFormChange}
                            />
                            <Lock className="w-4 h-4 text-accent-1 absolute left-3 top-1/2 -translate-y-1/2" />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-accent-1 text-white py-2.5 rounded-[4px] hover:bg-pink-700 transition-colors font-medium shadow-sm mt-4"
                        >
                          Create Account
                        </button>
                      </form>

                      <p className="mt-5 text-center text-md text-secondary">
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

                <div className="transition-opacity duration-300 opacity-100">
                  <form onSubmit={handleVerification}>
                    <div className="mb-4">
                      <p className="text-center text-gray-600 mb-4">
                        We&apos;ve sent a verification code to <span className="font-semibold">{(loginformData.email || registerformData.email) || 'your email'}</span>
                      </p>
                      <div className="flex justify-center gap-2 mb-5">
                        {[0, 1, 2, 3].map((index) => (
                          <input
                            key={index}
                            type="text"
                            maxLength={1}
                            value={verificationCode[index]}
                            className="w-12 h-12 text-center text-xl font-bold text-secondary border border-medium rounded-[4px] focus:outline-none text-input"
                            required
                            onChange={(e) => {
                              handleVerificationInput(index, e.target.value)
                              if (e.target.value && index < 3) {
                                const nextInput = e.target.nextElementSibling as HTMLInputElement;
                                if (nextInput) nextInput.focus();
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Backspace' && index > 0 && !verificationCode[index]) {
                                const prevInput = e.currentTarget.previousElementSibling as HTMLInputElement;
                                if (prevInput) prevInput.focus();
                              }
                            }}
                            onPaste={(e) => handlePaste(e, index)}
                          />
                        ))}
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-accent-1 text-white py-2.5 rounded-[4px] hover:bg-pink-700 transition-colors font-medium shadow-sm"
                      >
                        Verify
                      </button>

                      <div className="mt-4 text-center space-y-2">
                        <div className="flex items-center justify-center gap-1">
                          <span className="text-sm text-gray-600">Didn&apos;t receive a code?</span>
                          {canResend ? (
                            <button 
                              type="button" 
                              className="text-sm text-accent-1 hover:text-pink-700 font-medium"
                              onClick={() => startCountdown(30)}
                            >
                              Resend
                            </button>
                          ) : (
                            <span className="text-sm text-gray-500">
                              Wait {countdown}s to resend
                            </span>
                          )}
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