import { aurh, auth } from "@/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import CredentialsSignInForm from "./credentials-signin-form";
import Footer from "@/components/footer";
import Header from "@/components/shared/header";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Sign In",
};

const SignInPage = async () => {
  const session = await auth();
  if (session) {
    return redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-border shadow-sm">
          {/* Left panel — branding */}
          <div className="hidden lg:flex flex-col justify-between bg-[#2F2F31] p-10">
            <div>
              <h2 className="text-white text-3xl font-medium leading-snug mb-3">
                Your trusted source for
                <br />
                genuine Microsoft software
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-xs">
                Sign in to access your licenses, order history, and exclusive
                partner-only deals on Windows, Office, and more.
              </p>
              <ul className="space-y-3">
                {[
                  "Genuine OEM & retail licenses",
                  "Instant digital delivery in your inbox in minutes",
                  "Safe & Secure shopping experience",
                  "24/7 live support from our friendly team",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                      >
                        <path
                          d="M2 5l2 2 4-4"
                          stroke="white"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-white/80 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right panel — auth card */}
          <div className="bg-background flex items-center justify-center p-8">
            <div className="w-full max-w-sm">
              <Card>
                <CardHeader className="space-y-1 pb-4">
                  <CardTitle className="flex items-center justify-center text-2xl font-semibold">
                    Log in
                  </CardTitle>
                  <CardDescription>
                    Welcome back! Please enter your details.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <CredentialsSignInForm />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SignInPage;
