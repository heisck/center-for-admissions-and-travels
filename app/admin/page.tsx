"use client"

import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Edit2, Trash2, Plus, Settings, LogOut } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AdminPackageForm from "@/components/admin-package-form"
import { packages as initialPackages } from "@/data/packages"

interface Package {
  id: string
  title: string
  category: "Travel" | "Work" | "Academic"
  price: number
  description: string
  duration: string
  image: string
  highlights: string[]
}

interface ContactInfo {
  email: string
  phone: string
}

export default function AdminPage() {
  const router = useRouter()
  const [packages, setPackages] = useState<Package[]>(initialPackages)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Travel" | "Work" | "Academic">("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewForm, setShowNewForm] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    email: "hello@cfat.com",
    phone: "+1 (234) 567-890",
  })
  const [editingContact, setEditingContact] = useState<ContactInfo>({
    email: "hello@cfat.com",
    phone: "+1 (234) 567-890",
  })
  const [userEmail, setUserEmail] = useState("")

  const categories = ["All", "Travel", "Work", "Academic"] as const

  useEffect(() => {
    const email = localStorage.getItem("cfat_user_email")
    if (email) {
      setUserEmail(email)
    }
  }, [])

  const filteredPackages = useMemo(() => {
    return packages.filter((pkg) => {
      const matchesCategory = selectedCategory === "All" || pkg.category === selectedCategory
      const matchesSearch =
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.description.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [packages, selectedCategory, searchQuery])

  const handleSavePackage = (updatedPackage: Package) => {
    setPackages((prev) => prev.map((pkg) => (pkg.id === updatedPackage.id ? updatedPackage : pkg)))
    setSelectedPackage(null)
  }

  const handleDeletePackage = (id: string) => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      setPackages((prev) => prev.filter((pkg) => pkg.id !== id))
    }
  }

  const handleAddPackage = (newPackage: Package) => {
    setPackages((prev) => [...prev, newPackage])
    setShowNewForm(false)
  }

  const handleSaveContact = () => {
    setContactInfo(editingContact)
    setShowContactForm(false)
    alert("Contact information updated successfully!")
  }

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("cfat_admin_logged_in")
      localStorage.removeItem("cfat_user_email")
      router.push("/")
    }
  }

  const getCategoryColor = (category: "Travel" | "Work" | "Academic") => {
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
    <main>
      <Navbar />

      {/* Admin Header */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 border-b border-border py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage packages, update prices, and contact information</p>
              {userEmail && (
                <p className="text-sm text-muted-foreground mt-2">
                  Logged in as: <span className="font-medium text-foreground">{userEmail}</span>
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-3 w-fit">
              <button
                onClick={() => setShowNewForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <Plus size={20} />
                Add Package
              </button>
              <button
                onClick={() => setShowContactForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
              >
                <Settings size={20} />
                Contact Info
              </button>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 px-6 py-3 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors font-medium"
              >
                <LogOut size={20} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Admin Controls */}
      <section className="bg-background py-8 border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search packages by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-border rounded-lg bg-card focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
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
        </div>
      </section>

      {/* Packages Table */}
      <section className="bg-background py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results Info */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredPackages.length}</span> of{" "}
              <span className="font-semibold text-foreground">{packages.length}</span> packages
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPackages.length > 0 ? (
                  filteredPackages.map((pkg) => (
                    <tr key={pkg.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{pkg.title}</p>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{pkg.description}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(pkg.category)}`}
                        >
                          {pkg.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-primary">${pkg.price.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{pkg.duration}</td>
                      <td className="px-6 py-4">
                        <div className="w-12 h-12 rounded border border-border overflow-hidden bg-secondary">
                          <img
                            src={pkg.image || "/placeholder.svg"}
                            alt={pkg.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedPackage(pkg)}
                            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                          >
                            <Edit2 size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeletePackage(pkg.id)}
                            className="inline-flex items-center justify-center p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <p className="text-muted-foreground">No packages found matching your filters.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <Footer />

      {/* Edit Package Modal */}
      {selectedPackage && (
        <AdminPackageForm
          package={selectedPackage}
          onSave={handleSavePackage}
          onCancel={() => setSelectedPackage(null)}
        />
      )}

      {/* New Package Modal */}
      {showNewForm && (
        <AdminPackageForm
          package={{
            id: `package-${Date.now()}`,
            title: "New Package",
            category: "Travel",
            price: 2000,
            description: "Package description",
            duration: "14 days",
            image: "",
            highlights: [],
          }}
          onSave={handleAddPackage}
          onCancel={() => setShowNewForm(false)}
        />
      )}

      {/* Contact Information Modal */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-lg border border-border max-w-md w-full p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Edit Contact Information</h2>
              <p className="text-muted-foreground text-sm mt-1">Update CFAT contact details displayed on the website</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">Email Address</label>
                <input
                  type="email"
                  value={editingContact.email}
                  onChange={(e) => setEditingContact({ ...editingContact, email: e.target.value })}
                  placeholder="hello@cfat.com"
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1.5 text-foreground">Phone Number</label>
                <input
                  type="tel"
                  value={editingContact.phone}
                  onChange={(e) => setEditingContact({ ...editingContact, phone: e.target.value })}
                  placeholder="+1 (234) 567-890"
                  className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowContactForm(false)}
                className="flex-1 px-4 py-2.5 border border-border rounded-lg text-foreground hover:bg-secondary transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveContact}
                className="flex-1 px-4 py-2.5 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
