import { MessageCircle } from 'lucide-react'
import { site, waLink } from '@/data/site'
import { LinkButton } from '@/components/ui/Button'

export default function WhatsAppCta() {
  return (
    <section className="bg-ink">
      <div className="container-lk flex flex-col items-center gap-5 py-16 text-center sm:py-20">
        <p className="font-display text-3xl leading-snug text-marfil sm:text-4xl">
          ¿Ya sabes cuál es tu par?
        </p>
        <p className="max-w-sm text-sm text-marfil/65">Escríbenos y te ayudamos a confirmar color, talla y envío.</p>
        <LinkButton
          as="a"
          href={waLink(`Hola ${site.name} 👋, quiero conocer más sobre el calzado disponible.`)}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          icon={<MessageCircle size={18} />}
        >
          Escríbenos por WhatsApp
        </LinkButton>
      </div>
    </section>
  )
}
