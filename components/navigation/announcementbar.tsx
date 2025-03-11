import { MessageSquare, Phone } from "lucide-react"

const AnnouncementBar = () => {
  return (
    <div className="bg-accent-1 h-10 hidden md:block text-white py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto  overflow-hidden">
        <div className="marquee whitespace-nowrap flex gap-4">
          <span className="text-white mx-4">
            Free delivery on orders above Ksh 5000!
          </span>
          <span className="flex items-center mx-4">
            <Phone className="w-4 h-4 mr-2" /> Call us: +254 712 345 678
          </span>
          <span className="flex items-center mx-4">
            <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp: +254 712 345 678
          </span>
        </div>
      </div>
    </div>
  )
}

export default AnnouncementBar