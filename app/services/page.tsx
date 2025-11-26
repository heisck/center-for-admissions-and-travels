import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import ChatBubble from "@/components/chat-bubble"
import { Globe, Briefcase, BookOpen } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Globe,
      title: "Travel Agency",
      description:
        "We specialize in crafting unforgettable travel experiences across the globe. From beach escapes to mountain adventures, cultural immersions to luxury retreats.",
      features: [
        "Destination planning and research",
        "Visa and travel documentation",
        "Flight and accommodation booking",
        "Travel insurance coverage",
        "24/7 travel support",
        "Personalized itineraries",
      ],
    },
    {
      icon: Briefcase,
      title: "Work Abroad Programs",
      description:
        "Launch your international career with our comprehensive work abroad solutions. We connect professionals with opportunities in leading global companies.",
      features: [
        "Job search and placement",
        "Work visa sponsorship",
        "Pre-departure training",
        "Housing assistance",
        "Monthly living stipends",
        "Career mentorship",
      ],
    },
    {
      icon: BookOpen,
      title: "Academic & Scholarships",
      description:
        "Pursue higher education worldwide with our scholarship and admissions support. We guide you through university selection, applications, and financial aid.",
      features: [
        "University selection guidance",
        "Scholarship search and application",
        "Application document preparation",
        "Visa and immigration support",
        "Pre-departure orientation",
        "Post-arrival support",
      ],
    },
  ]

  return (
    <main>
      <Navbar />

      <HeroSection
        title="Our Services"
        subtitle="Comprehensive solutions designed to open doors to global opportunities."
      />

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? "md:grid-cols-2 md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div>
                  <div className="mb-6 inline-flex p-4 bg-accent/10 rounded-lg">
                    <Icon className="w-8 h-8 text-accent" />
                  </div>
                  <h2 className="text-3xl font-bold mb-4">{service.title}</h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-foreground">
                        <span className="text-primary font-bold mt-1">•</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-secondary rounded-lg h-64 flex items-center justify-center text-muted-foreground">
                  <span>Service illustration</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <Footer />
      <ChatBubble />
    </main>
  )
}
