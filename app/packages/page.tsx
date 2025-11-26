"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import SectionHeader from "@/components/section-header"
import PackageCard from "@/components/package-card"
import ChatBubble from "@/components/chat-bubble"
import { packages } from "@/data/packages"

export default function PackagesPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [selectedCategory, setSelectedCategory] = useState<"Travel" | "Work" | "Academic" | "All">(
    categoryParam === "travel"
      ? "Travel"
      : categoryParam === "work"
        ? "Work"
        : categoryParam === "academic"
          ? "Academic"
          : "All",
  )

  const categories = ["All", "Travel", "Work", "Academic"] as const

  const filteredPackages = useMemo(() => {
    if (selectedCategory === "All") {
      return packages
    }
    return packages.filter((pkg) => pkg.category === selectedCategory)
  }, [selectedCategory])

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <HeroSection
        title="Explore Our Packages"
        subtitle="Discover tailored programs designed to open doors to global opportunities."
      />

      {/* Packages Section */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionHeader
              title="All Programs"
              subtitle="Filter by category to find the perfect opportunity for your goals."
            />

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground hover:border-primary border border-border"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Package Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.length > 0 ? (
              filteredPackages.map((pkg) => <PackageCard key={pkg.id} {...pkg} />)
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-lg text-muted-foreground">No packages found in this category.</p>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mt-12 text-center text-muted-foreground">
            <p className="text-sm">
              Showing {filteredPackages.length} of {packages.length} packages
            </p>
          </div>
        </div>
      </section>

      <Footer />
      <ChatBubble />
    </main>
  )
}
