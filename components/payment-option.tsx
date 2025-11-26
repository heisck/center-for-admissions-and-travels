"use client"

import { Check } from "lucide-react"

interface PaymentOptionProps {
  name: string
  description: string
  isSelected: boolean
  onSelect: () => void
}

export default function PaymentOption({ name, description, isSelected, onSelect }: PaymentOptionProps) {
  const getPaymentBadge = () => {
    switch (name) {
      case "Visa / Mastercard":
        return (
          <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded flex items-center justify-center text-white text-xs font-bold">
            CARD
          </div>
        )
      case "Mobile Money (MTN)":
        return (
          <div className="w-10 h-6 bg-yellow-500 rounded flex items-center justify-center text-white text-xs font-bold">
            MTN
          </div>
        )
      case "Vodafone Cash":
        return (
          <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">
            VODA
          </div>
        )
      case "AirtelTigo Money":
        return (
          <div className="w-10 h-6 bg-green-600 rounded flex items-center justify-center text-white text-xs font-bold">
            AIRT
          </div>
        )
      default:
        return null
    }
  }

  return (
    <button
      onClick={onSelect}
      className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
        isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {getPaymentBadge()}
          <div>
            <p className="font-semibold text-sm">{name}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
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
