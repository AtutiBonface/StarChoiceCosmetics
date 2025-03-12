'use client'

import { useState } from 'react'
import { Phone, Mail, MapPin, ChevronRight, Send } from 'lucide-react'
import Link from 'next/link'

interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Add your form submission logic here
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 2000)
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="w-full bg-secondary">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-secondary">
            <Link href="/" className="hover:text-accent-1">Home</Link>
            <ChevronRight size={16} />
            <span className="text-accent-1">Contact Us</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h1 className="text-3xl font-bold text-secondary mb-6">Get in Touch</h1>
            <p className="text-gray-600 mb-8">
              Have questions about our products or services? We&apos;re here to help. Contact us using any of the methods below.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-3 rounded-full">
                  <Phone className="w-6 h-6 text-accent-1" />
                </div>
                <div>
                  <h3 className="font-medium text-secondary mb-1">Phone</h3>
                  <p className="text-gray-600">+254 712 345 678</p>
                  <p className="text-gray-600">Mon - Fri, 9am - 6pm EAT</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-3 rounded-full">
                  <Mail className="w-6 h-6 text-accent-1" />
                </div>
                <div>
                  <h3 className="font-medium text-secondary mb-1">Email</h3>
                  <p className="text-gray-600">info@starchoice.co.ke</p>
                  <p className="text-gray-600">We reply within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-3 rounded-full">
                  <MapPin className="w-6 h-6 text-accent-1" />
                </div>
                <div>
                  <h3 className="font-medium text-secondary mb-1">Location</h3>
                  <p className="text-gray-600">123 Mama Ngina Street</p>
                  <p className="text-gray-600">Nairobi, Kenya</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-secondary p-6 border border-medium rounded-[4px]">
            <h2 className="text-2xl font-bold text-secondary mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-medium rounded-[4px] focus:outline-none ring-custom focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-medium rounded-[4px] focus:outline-none ring-custom focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-2 border border-medium rounded-[4px] focus:outline-none ring-custom focus:ring-accent"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-secondary mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-medium rounded-[4px] focus:outline-none ring-custom focus:ring-accent"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent-1 text-white py-2 px-4 rounded-[4px] hover:bg-accent-2 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}