import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ChatBubble from "@/components/chat-bubble"
import AuthForm from "@/components/auth-form"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <main>
      <Navbar />

      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Start Your Journey</h1>
            <p className="text-muted-foreground">
              Create a CFAT account to unlock global opportunities in travel, work, and education.
            </p>
          </div>

          {/* Auth Form */}
          <AuthForm type="signup" />

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-secondary rounded-lg text-center text-sm text-muted-foreground">
            <p>
              Already have an account?{" "}
              <Link href="/signin" className="text-primary hover:underline font-medium">
                Sign in
              </Link>{" "}
              to continue.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <ChatBubble />
    </main>
  )
}
