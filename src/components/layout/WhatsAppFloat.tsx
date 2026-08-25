import { MessageCircle } from 'lucide-react'
import { whatsappFloatLink } from '@/lib/whatsapp'

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappFloatLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-24 right-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-soft-hover transition-transform hover:scale-105 sm:bottom-6 sm:right-6 sm:h-14 sm:w-14"
    >
      <MessageCircle size={26} fill="white" className="text-[#25D366]" />
    </a>
  )
}
