"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

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

interface PackageContextType {
  selectedPackage: Package | null
  setSelectedPackage: (pkg: Package) => void
}

const PackageContext = createContext<PackageContextType | undefined>(undefined)

export function PackageProvider({ children }: { children: React.ReactNode }) {
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)

  return <PackageContext.Provider value={{ selectedPackage, setSelectedPackage }}>{children}</PackageContext.Provider>
}

export function usePackage() {
  const context = useContext(PackageContext)
  if (!context) {
    throw new Error("usePackage must be used within PackageProvider")
  }
  return context
}
