'use client'
import { CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react'
import { useEffect } from 'react'

type ToastType = 'success' | 'error' | 'info'

interface ToastProps {
  message: string
  type: ToastType
  isVisible: boolean
  onClose: () => void
}

const Toast = ({ message, type, isVisible, onClose }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000) // Auto hide after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-success-color" />,
    error: <XCircle className="w-5 h-5 text-error-color" />,
    info: <AlertCircle className="w-5 h-5 text-accent-2" />
  }

  const backgrounds = {
    success: 'bg-success border-medium',
    error: 'bg-error border-error-color',
    info: 'bg-accent-2 border-accent-2'
  }

  return (
    <div className="fixed inset-0 w-full z-50 animate-slide-in">
      <div className={`
        flex items-center justify-between gap-3 px-4 py-3 rounded-[1px] border 
        ${backgrounds[type]}
      `}>
        {icons[type]}
        <p className="text-sm text-contrast">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 hover:opacity-75 transition-opacity"
          aria-label="Close notification"
        >
          <X className="w-4 h-4 text-contrast" />
        </button>
      </div>
    </div>
  )
}

export default Toast