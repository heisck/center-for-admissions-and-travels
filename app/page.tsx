import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import SectionHeader from "@/components/section-header"
import ServiceCard from "@/components/service-card"
import { packages } from "@/data/packages"
import PackageCard from "@/components/package-card"
import ChatBubble from "@/components/chat-bubble"
import { Globe, Briefcase, BookOpen, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const services = [
    {
      icon: Globe,
      title: "Travel Agency",
      description:
        "Curated travel experiences to destinations worldwide with local expertise and personalized itineraries.",
      features: ["Destination planning", "Visa assistance", "Travel insurance", " 24/7 support"],
    },
    {
      icon: Briefcase,
      title: "Work Abroad",
      description:
        "Career opportunities internationally with job placement and visa sponsorship for professional growth.",
      features: ["Job placement", "Visa sponsorship", "Pre-departure training", "Monthly stipend"],
    },
    {
      icon: BookOpen,
      title: "Academic Programs",
      description:
        "Scholarship opportunities and university admissions support for undergraduate and graduate studies.",
      features: ["University selection", "Scholarship search", "Application support", "Visa guidance"],
    },
  ]

  const featuredPackages = packages.slice(0, 3)

  return (
    <main>
      <Navbar />

      {/* Hero Section */}
      <HeroSection
        title="Your Gateway to Global Opportunities"
        subtitle="Explore exceptional travel experiences, rewarding work abroad programs, and world-class educational opportunities."
        cta={{ text: "Explore Packages", href: "/packages" }}
      />

      {/* Services Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Services"
            subtitle="We specialize in three core areas to help you achieve your global ambitions."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Packages */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Popular Packages"
            subtitle="Browse our most sought-after programs across travel, work, and academic opportunities."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            {featuredPackages.map((pkg) => (
              <PackageCard key={pkg.id} {...pkg} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium group"
            >
              View All Packages
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 leading-relaxed">
            Join thousands of professionals and students who have transformed their lives through our programs.
          </p>
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 transition-colors font-medium group"
          >
            Browse Programs
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <Footer />
      <ChatBubble />
    </main>
  )
}
