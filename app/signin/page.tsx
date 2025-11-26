import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import ChatBubble from "@/components/chat-bubble"
import AuthForm from "@/components/auth-form"
import Link from "next/link"

export default function SignInPage() {
  return (
    <main>
      <Navbar />

      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Voyage account to continue your journey.</p>
          </div>

          {/* Auth Form */}
          <AuthForm type="signin" />

          {/* Additional Info */}
          <div className="mt-12 p-6 bg-secondary rounded-lg text-center text-sm text-muted-foreground">
            <p>
              New to Voyage?{" "}
              <Link href="/signup" className="text-primary hover:underline font-medium">
                Create an account
              </Link>{" "}
              to explore opportunities worldwide.
            </p>
          </div>
        </div>
      </div>

      <Footer />
      <ChatBubble />
    </main>
  )
}
