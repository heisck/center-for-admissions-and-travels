"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ChatBubble from "@/components/chat-bubble"
import PaymentOption from "@/components/payment-option"
import { usePackage } from "@/context/package-context"
import { packages } from "@/data/packages"
import Link from "next/link"
import { Check, ArrowLeft } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { selectedPackage, setSelectedPackage } = usePackage()
  const [selectedPayment, setSelectedPayment] = useState("card")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  })
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    if (!selectedPackage) {
      const defaultPackage = packages[0]
      setSelectedPackage(defaultPackage)
    }
  }, [selectedPackage, setSelectedPackage])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      alert("Booking successful! Check your email for confirmation.")
    }, 2000)
  }

  if (!selectedPackage) {
    return (
      <main>
        <Navbar />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Loading package details...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const tax = Math.round(selectedPackage.price * 0.1)
  const total = selectedPackage.price + tax

  return (
    <main>
      <Navbar />

      <div className="min-h-screen bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link href="/packages" className="inline-flex items-center gap-2 text-primary hover:underline mb-8">
            <ArrowLeft size={18} />
            Back to Packages
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
                <div className="p-4 rounded-lg border border-border flex items-start gap-4 bg-secondary/30">
                  <img
                    src={selectedPackage.image || "/placeholder.svg"}
                    alt={selectedPackage.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{selectedPackage.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{selectedPackage.duration}</p>
                    <p className="text-primary font-semibold mt-2">${selectedPackage.price.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Your Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-foreground">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-foreground">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-foreground">Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <PaymentOption
                    name="Visa / Mastercard"
                    description="Secure card payment"
                    isSelected={selectedPayment === "card"}
                    onSelect={() => setSelectedPayment("card")}
                  />
                  <PaymentOption
                    name="Mobile Money (MTN)"
                    description="Fast and secure mobile payment"
                    isSelected={selectedPayment === "mtn"}
                    onSelect={() => setSelectedPayment("mtn")}
                  />
                  <PaymentOption
                    name="Vodafone Cash"
                    description="Instant transfer via Vodafone"
                    isSelected={selectedPayment === "vodafone"}
                    onSelect={() => setSelectedPayment("vodafone")}
                  />
                  <PaymentOption
                    name="AirtelTigo Money"
                    description="Money transfer service"
                    isSelected={selectedPayment === "airteltigo"}
                    onSelect={() => setSelectedPayment("airteltigo")}
                  />
                </div>
              </div>

              {/* Card Details (shown only when card payment selected) */}
              {selectedPayment === "card" && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-lg font-semibold mb-4">Card Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-foreground">Card Number</label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-foreground">Expiry Date</label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5 text-foreground">CVV</label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleChange}
                          placeholder="123"
                          maxLength="3"
                          className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms */}
              <div className="p-4 bg-secondary rounded-lg">
                <label className="flex items-start gap-3 text-sm text-foreground">
                  <input type="checkbox" className="mt-1 rounded" defaultChecked />
                  <span>
                    I agree to the booking terms and conditions. I have read and understand the{" "}
                    <Link href="#" className="text-primary hover:underline">
                      cancellation policy
                    </Link>
                    .
                  </span>
                </label>
              </div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card border border-border rounded-lg p-6 space-y-6">
                <h3 className="text-lg font-semibold">Booking Summary</h3>

                {/* Package Info */}
                <div className="space-y-3 pb-6 border-b border-border">
                  <div className="flex items-start gap-4">
                    <img
                      src={selectedPackage.image || "/placeholder.svg"}
                      alt={selectedPackage.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm">{selectedPackage.title}</p>
                      <p className="text-xs text-muted-foreground">{selectedPackage.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Package Price</span>
                    <span>${selectedPackage.price.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Tax (10%)</span>
                    <span>${tax}</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold text-lg pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="text-primary">${total.toLocaleString()}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-2 p-4 bg-secondary rounded-lg">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                    Package Includes
                  </p>
                  {selectedPackage.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-foreground">
                      <Check size={16} className="text-primary flex-shrink-0" />
                      {highlight}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  {isProcessing ? "Processing..." : "Complete Booking"}
                </button>

                {/* Security Badge */}
                <div className="text-center text-xs text-muted-foreground">
                  <p>Secure payment processed safely</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <ChatBubble />
    </main>
  )
}
