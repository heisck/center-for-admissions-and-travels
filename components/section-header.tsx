interface SectionHeaderProps {
  title: string
  subtitle?: string
  centered?: boolean
}

export default function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? "text-center" : ""}`}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
      {subtitle && (
        <p className={`text-lg text-muted-foreground leading-relaxed ${centered ? "max-w-2xl mx-auto" : "max-w-3xl"}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
