import React from 'react'
import Image from 'next/image'

const WhatsApp = () => {
  return (
    <a 
      href="https://wa.me/+254721564198" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-1/2 -translate-y-1/2 md:top-3/4 md:translate-y-3/4 right-4 z-[999] bg-[#25D366] p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 cursor-pointer"
      aria-label="Chat with us on WhatsApp"
    >
      <Image
        src="/icons/whatsapp.svg"
        alt="WhatsApp"
        width={32}
        height={32}
        className="" 
      />
    </a>
  )
}

export default WhatsApp