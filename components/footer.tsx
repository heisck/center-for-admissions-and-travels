import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <span className="text-primary font-bold">V</span>
              </div>
              <span className="font-semibold text-lg">Voyage</span>
            </div>
            <p className="text-primary-foreground/80 text-sm">Your gateway to global opportunities.</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wide">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services#travel" className="hover:underline transition-colors">
                  Travel Planning
                </Link>
              </li>
              <li>
                <Link href="/services#work" className="hover:underline transition-colors">
                  Work Abroad
                </Link>
              </li>
              <li>
                <Link href="/services#academic" className="hover:underline transition-colors">
                  Scholarships
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wide">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:underline transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/packages" className="hover:underline transition-colors">
                  Packages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm uppercase tracking-wide">Get In Touch</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:hello@voyage.com" className="hover:underline">
                  hello@voyage.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+1234567890" className="hover:underline">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5" />
                <span>Global Offices</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/80">
          <p>&copy; {currentYear} Voyage. All rights reserved. Built with precision and care.</p>
        </div>
      </div>
    </footer>
  )
}
