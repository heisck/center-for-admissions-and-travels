"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Apple, Chrome } from "lucide-react"

interface AuthFormProps {
  type: "signin" | "signup"
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    agreedToTerms: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type: inputType, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("cfat_admin_logged_in", "true")
    localStorage.setItem("cfat_user_email", formData.email)
    console.log(`${type} submitted:`, formData)
    // Redirect to home after signup/signin
    router.push("/")
  }

  const isSignIn = type === "signin"
  const isFormValid = isSignIn
    ? formData.email && formData.password
    : formData.email && formData.password && formData.confirmPassword && formData.name && formData.agreedToTerms

  return (
    <div className="w-full max-w-md">
      {/* Social Auth */}
      <div className="space-y-3 mb-8">
        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors font-medium text-foreground">
          <Apple size={20} />
          Sign {isSignIn ? "in" : "up"} with Apple
        </button>
        <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-border rounded-lg hover:bg-secondary transition-colors font-medium text-foreground">
          <Chrome size={20} />
          Sign {isSignIn ? "in" : "up"} with Google
        </button>
      </div>

      {/* Divider */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {!isSignIn && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1.5 text-foreground">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground placeholder-muted-foreground transition-colors"
            />
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5 text-foreground">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground placeholder-muted-foreground transition-colors"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1.5 text-foreground">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground placeholder-muted-foreground transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {!isSignIn && (
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1.5 text-foreground">
              Confirm Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-background text-foreground placeholder-muted-foreground transition-colors"
            />
          </div>
        )}

        {isSignIn && (
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <input type="checkbox" className="rounded" />
              Remember me
            </label>
            <Link href="#" className="text-sm text-primary hover:underline transition-colors">
              Forgot password?
            </Link>
          </div>
        )}

        {!isSignIn && (
          <label className="flex items-start gap-2 text-sm text-muted-foreground">
            <input
              type="checkbox"
              name="agreedToTerms"
              checked={formData.agreedToTerms}
              onChange={handleChange}
              className="mt-1 rounded"
            />
            <span>
              I agree to the{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </span>
          </label>
        )}

        <button
          type="submit"
          disabled={!isFormValid}
          className="w-full px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium mt-6"
        >
          {isSignIn ? "Sign In" : "Create Account"}
        </button>
      </form>

      {/* Footer Text */}
      <p className="text-center text-sm text-muted-foreground mt-6">
        {isSignIn ? "Don't have an account? " : "Already have an account? "}
        <Link
          href={isSignIn ? "/signup" : "/signin"}
          className="text-primary hover:underline font-medium transition-colors"
        >
          {isSignIn ? "Sign Up" : "Sign In"}
        </Link>
      </p>
    </div>
  )
}
