import { auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Footer from "@/components/footer";
import Header from "@/components/shared/header";
import { redirect } from "next/navigation";
import SignUpForm from "./sign-up-form";

export const metadata = {
  title: "Sign Up",
};

const SignUpPage = async () => {
  const session = await auth();
  if (session) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4 bg-background">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-border shadow-lg dark:shadow-none items-stretch">
          {/* Left panel — branding */}
          <div className="hidden lg:flex flex-col justify-between bg-[#1e1e20] p-10 relative">
            {/* Top yellow accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600" />

            <div>
              {/* Logo mark */}
              <div className="mb-8">
                <span className="text-yellow-400 font-bold text-lg tracking-widest uppercase">
                  Keyversely
                </span>
              </div>

              <h2 className="text-white text-3xl font-semibold leading-snug mb-4">
                Start your journey
                <br />
                with <span className="text-yellow-400">genuine Microsoft</span>
                <br />
                software
              </h2>

              <p className="text-white/70 text-base leading-relaxed mb-10 max-w-xs">
                Create your account to access licenses, order history, and
                exclusive partner-only deals on Windows, Office, and more.
              </p>

              <ul className="space-y-4">
                {[
                  "Genuine OEM & retail licenses",
                  "Instant digital delivery in your inbox in minutes",
                  "Safe & Secure shopping experience",
                  "24/7 live support from our friendly team",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-yellow-400/20 border border-yellow-400/30 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="#facc15"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-white/90 text-base font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom trust note */}
            <div className="mt-10 pt-6 border-t border-white/10">
              <p className="text-white/40 text-xs">
                Microsoft Partner ID: 7033319
              </p>
            </div>
          </div>

          {/* Right panel — auth card */}
          <div className="bg-background flex items-center justify-center p-8">
            <div className="w-full max-w-sm">
              <Card className="border-0 shadow-none bg-transparent">
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="flex items-center justify-center text-2xl font-semibold">
                    Create Account
                  </CardTitle>
                  <CardDescription className="text-center">
                    Enter your information below to sign up
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <SignUpForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignUpPage;
