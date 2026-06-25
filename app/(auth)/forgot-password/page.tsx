import { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "./forgot-password-form";
import Header from "@/components/shared/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1.5 w-full" />

            <div className="p-8">
              {/* Heading */}
              <div className="text-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">
                  Forgot your password?
                </h1>
                <p className="text-sm text-muted-foreground mt-2">
                  No worries enter your email and we&apos;ll send you a reset
                  link.
                </p>
              </div>

              {/* Form */}
              <ForgotPasswordForm />

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Back to sign in */}
              <div className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link
                  href="/sign-in"
                  className="font-semibold text-gray-900 hover:text-yellow-500 transition-colors"
                >
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
