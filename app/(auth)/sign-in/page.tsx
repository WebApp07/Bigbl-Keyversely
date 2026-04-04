import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { APP_NAME } from "@/lib/constants";
import CredentialsSignInForm from "./credentials-signin-form";

export const metadata = {
  title: "Sign In",
};

const SignInPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-2 rounded-2xl overflow-hidden border border-border shadow-sm">
        {/* Left panel — branding */}
        <div className="hidden lg:flex flex-col justify-between bg-[#000000] p-10">
          <div className="flex items-center justify-center">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <Image
                src="/images/logo.svg"
                alt={`${APP_NAME} logo`}
                width={20}
                height={20}
              />
            </div>
            <span className="text-2xl font-semibold text-white">
              {APP_NAME}
            </span>
          </div>

          <div>
            <h2 className="text-white text-3xl font-medium leading-snug mb-3">
              Your trusted source for
              <br />
              genuine Microsoft software{" "}
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
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
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

          <p className="text-white/35 text-xs">
            © 2025 {APP_NAME}. All rights reserved.
          </p>
        </div>

        {/* Right panel — auth card */}
        <div className="bg-background flex items-center justify-center p-8">
          <div className="w-full max-w-sm">
            <Card>
              <CardHeader className="space-y-1 pb-4">
                {/* Logo visible on mobile only (left panel hidden on small screens) */}
                <div className="flex justify-center mb-2 lg:hidden">
                  <Link href="/">
                    <Image
                      src="/images/logo.svg"
                      alt={`${APP_NAME} logo`}
                      width={48}
                      height={48}
                    />
                  </Link>
                </div>

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
  );
};

export default SignInPage;
