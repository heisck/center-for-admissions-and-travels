"use client"

import type React from "react"

import { useState } from "react"
import { X, Upload, Save } from "lucide-react"

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

interface AdminPackageFormProps {
  package: Package
  onSave: (updatedPackage: Package) => void
  onCancel: () => void
}

export default function AdminPackageForm({ package: initialPackage, onSave, onCancel }: AdminPackageFormProps) {
  const [package_, setPackage_] = useState<Package>(initialPackage)
  const [highlightInput, setHighlightInput] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setPackage_((prev) => ({
      ...prev,
      [name]: name === "price" ? Number.parseFloat(value) || 0 : value,
    }))
  }

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setPackage_((prev) => ({
        ...prev,
        highlights: [...prev.highlights, highlightInput.trim()],
      }))
      setHighlightInput("")
    }
  }

  const handleRemoveHighlight = (index: number) => {
    setPackage_((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPackage_((prev) => ({
          ...prev,
          image: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    setTimeout(() => {
      onSave(package_)
      setIsSaving(false)
    }, 500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border flex items-center justify-between p-6">
          <h2 className="text-2xl font-semibold">Edit Package</h2>
          <button onClick={onCancel} className="p-2 hover:bg-secondary rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-2">Package Title</label>
            <input
              type="text"
              name="title"
              value={package_.title}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Price ($)</label>
              <input
                type="number"
                name="price"
                value={package_.price}
                onChange={handleInputChange}
                min="0"
                step="100"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <input
                type="text"
                name="duration"
                value={package_.duration}
                onChange={handleInputChange}
                placeholder="e.g., 14 days"
                className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              name="description"
              value={package_.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Package Image</label>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                  <Upload size={18} />
                  <span className="text-sm">Upload Image</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              {package_.image && (
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-border">
                  <img
                    src={package_.image || "/placeholder.svg"}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Highlights */}
          <div>
            <label className="block text-sm font-medium mb-2">Package Highlights</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddHighlight()}
                placeholder="Add a highlight and press Enter"
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                onClick={handleAddHighlight}
                className="px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors font-medium text-sm"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {package_.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center justify-between px-3 py-2 bg-secondary rounded-lg">
                  <span className="text-sm">{highlight}</span>
                  <button
                    onClick={() => handleRemoveHighlight(index)}
                    className="p-1 hover:bg-border rounded transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-card border-t border-border flex justify-end gap-3 p-6">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-border text-foreground rounded-lg hover:bg-secondary transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors font-medium"
          >
            <Save size={18} />
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  )
}
