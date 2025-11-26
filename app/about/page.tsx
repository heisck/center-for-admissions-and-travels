import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import ChatBubble from "@/components/chat-bubble"

export default function AboutPage() {
  return (
    <main>
      <Navbar />

      <HeroSection title="About Center for Admmission and Travel" subtitle="Transforming lives through global opportunities since 2020." />

      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Our Story */}
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Founded in 2020, Center for Admmission and Travel emerged from a simple belief: everyone deserves access to global opportunities.
              What started as a small team of travel enthusiasts and career coaches has grown into a comprehensive
              platform serving thousands of travelers, professionals, and students worldwide.
            </p>
          </div>

          {/* Mission & Values */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-secondary p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To empower individuals through transformative travel, career, and educational experiences that broaden
                horizons and unlock unlimited potential.
              </p>
            </div>
            <div className="bg-secondary p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-3">Our Values</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Integrity in every transaction</li>
                <li>• Excellence in service delivery</li>
                <li>• Inclusivity for all backgrounds</li>
                <li>• Innovation in solutions</li>
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-8">
            {[
              { label: "Happy Clients", value: "10,000+" },
              { label: "Countries", value: "150+" },
              { label: "Programs", value: "500+" },
              { label: "Success Rate", value: "98%" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Team */}
          <div>
            <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our diverse team of travel experts, career counselors, and admissions specialists brings years of
              experience and genuine passion for helping people achieve their dreams.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { name: "Sarah Johnson", role: "Travel Director" },
                { name: "Marcus Chen", role: "Career Counselor" },
                { name: "Amara Okafor", role: "Academic Advisor" },
              ].map((member) => (
                <div key={member.name} className="bg-secondary p-6 rounded-lg text-center">
                  <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-4"></div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBubble />
    </main>
  )
}
