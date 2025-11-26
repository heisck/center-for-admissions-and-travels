import { ArrowRight, Globe, Briefcase, BookOpen } from "lucide-react"
import Link from "next/link"

interface PackageCardProps {
  id: string
  title: string
  category: "Travel" | "Work" | "Academic"
  price: number
  description: string
  duration: string
  image: string
  highlights: string[]
}

export default function PackageCard({
  id,
  title,
  category,
  price,
  description,
  duration,
  image,
  highlights,
}: PackageCardProps) {
  const getCategoryIcon = () => {
    switch (category) {
      case "Travel":
        return <Globe size={20} />
      case "Work":
        return <Briefcase size={20} />
      case "Academic":
        return <BookOpen size={20} />
    }
  }

  const getCategoryColor = () => {
    switch (category) {
      case "Travel":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
      case "Work":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
      case "Academic":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
    }
  }

  return (
    <div className="group bg-card rounded-lg overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative h-56 overflow-hidden bg-muted">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor()}`}
          >
            {getCategoryIcon()}
            {category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground">{duration}</p>
        </div>

        <p className="text-foreground/80 text-sm leading-relaxed">{description}</p>

        {/* Highlights */}
        <ul className="space-y-2">
          {highlights.map((highlight, index) => (
            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        {/* Price and CTA */}
        <div className="pt-4 border-t border-border flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-2xl font-bold text-primary">${price.toLocaleString()}</p>
          </div>
          <Link
            href={`/packages/${id}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm group/btn"
          >
            Book Now
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
