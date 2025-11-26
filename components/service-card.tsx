import type { LucideIcon } from "lucide-react"

interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  features: string[]
}

export default function ServiceCard({ icon: Icon, title, description, features }: ServiceCardProps) {
  return (
    <div className="p-8 bg-card border border-border rounded-lg hover:border-primary/50 transition-all duration-300 hover:shadow-md">
      <div className="mb-4 inline-flex p-3 bg-accent/10 rounded-lg">
        <Icon className="w-6 h-6 text-accent" />
      </div>

      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4 leading-relaxed">{description}</p>

      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-sm flex items-start gap-2 text-foreground">
            <span className="text-primary font-bold mt-0.5">→</span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}
