import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  /* Contact information is now editable from admin but has default values */
  const defaultContact = {
    email: "hello@cfat.com",
    phone: "+1 (234) 567-890",
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img src="/images/logo.png" alt="CFAT Logo" className="w-8 h-8" />
              <span className="font-semibold text-lg">CFAT</span>
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
                <a href={`mailto:${defaultContact.email}`} className="hover:underline">
                  {defaultContact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href={`tel:${defaultContact.phone}`} className="hover:underline">
                  {defaultContact.phone}
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
          <p>
            &copy; {currentYear} CFAT - Center for Admission and Travel. All rights reserved. Built with precision and
            care.
          </p>
        </div>
      </div>
    </footer>
  )
}
