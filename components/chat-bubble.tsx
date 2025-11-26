"use client"

import { useState } from "react"
import { MessageCircle, X, MapPin, Briefcase, BookOpen, Globe } from "lucide-react"
import Link from "next/link"

export default function ChatBubble() {
  const [isOpen, setIsOpen] = useState(false)

  const options = [
    { icon: Globe, label: "View All Packages", href: "/packages" },
    { icon: MapPin, label: "I want to travel", href: "/packages?category=travel" },
    { icon: Briefcase, label: "I want to work abroad", href: "/packages?category=work" },
    { icon: BookOpen, label: "I want a scholarship", href: "/packages?category=academic" },
  ]

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 w-80 bg-card border border-border rounded-lg shadow-lg p-6 z-40 animate-in slide-in-from-bottom-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">How can we help?</h3>
            <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-secondary rounded transition-colors">
              <X size={18} />
            </button>
          </div>

          <p className="text-sm text-muted-foreground mb-4">Select an option below:</p>

          <div className="space-y-2">
            {options.map((option) => {
              const Icon = option.icon
              return (
                <Link
                  key={option.label}
                  href={option.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors text-sm text-foreground"
                >
                  <Icon size={18} className="text-primary flex-shrink-0" />
                  {option.label}
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Chat Bubble */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-all flex items-center justify-center z-50 hover:scale-110"
      >
        <MessageCircle size={24} />
      </button>
    </>
  )
}
