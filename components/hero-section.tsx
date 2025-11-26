import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface HeroSectionProps {
  title: string
  subtitle: string
  cta?: {
    text: string
    href: string
  }
  backgroundImage?: string
}

export default function HeroSection({ title, subtitle, cta, backgroundImage }: HeroSectionProps) {
  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `url(${backgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : undefined
      }
    >
      {backgroundImage && <div className="absolute inset-0 bg-foreground/40"></div>}

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
          {backgroundImage ? <span className="text-background">{title}</span> : title}
        </h1>

        <p
          className={`text-xl md:text-2xl mb-8 text-balance leading-relaxed ${
            backgroundImage ? "text-background/90" : "text-muted-foreground"
          }`}
        >
          {subtitle}
        </p>

        {cta && (
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-medium group"
          >
            {cta.text}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        )}
      </div>
    </section>
  )
}
