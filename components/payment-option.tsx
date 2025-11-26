"use client"

import { Check } from "lucide-react"
import type { ReactNode } from "react"

interface PaymentOptionProps {
  icon: ReactNode
  name: string
  description: string
  isSelected: boolean
  onSelect: () => void
}

export default function PaymentOption({ icon, name, description, isSelected, onSelect }: PaymentOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
        isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="text-2xl mt-1">{icon}</div>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
        {isSelected && (
          <div className="flex-shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
            <Check size={16} className="text-primary-foreground" />
          </div>
        )}
      </div>
    </button>
  )
}
