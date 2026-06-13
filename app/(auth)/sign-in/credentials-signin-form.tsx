"use client";

import { useActionState, useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  signInDefaultValues,
  socialProviders,
  trustBadges,
} from "@/lib/constants";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import { useFormStatus } from "react-dom";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

const CredentialsSignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  console.log(callbackUrl);

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-5">
        {/* Social buttons */}
        <div className="grid grid-cols-3 gap-2">
          {socialProviders.map(({ provider, label, Icon, color }) => (
            <button
              key={provider}
              type="button"
              onClick={() => signIn(provider, { callbackUrl })}
              className="flex items-center justify-center gap-2 h-10 border border-border rounded-lg text-sm text-foreground hover:bg-muted transition-colors"
            >
              <Icon size={14} color={color} />
              {label}
            </button>
          ))}
        </div>

        {/* sign in with credentials */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-border" />
          <span className="text-xs text-muted-foreground">
            or continue with email
          </span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            defaultValue={signInDefaultValues.email}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              defaultValue={signInDefaultValues.password}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <SignInButton />

        {data?.message?.length > 0 && !data.success && (
          <Alert variant="destructive" className="max-w-md">
            <AlertCircleIcon />
            <AlertDescription>
              <AlertTitle>Sign in failed</AlertTitle>
              {data.message}
            </AlertDescription>
          </Alert>
        )}
        {/* Sign up link */}
        <p className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>

        {/* Trust badges */}
        <div className="flex justify-center gap-5 pt-4 border-t border-border">
          {trustBadges.map((badge) => (
            <span
              key={badge.label}
              className="flex items-center gap-1.5 text-[11px] text-muted-foreground"
            >
              <span className="w-2.5 h-2.5 rounded-full border border-muted-foreground/40 inline-block" />
              {badge.label}
            </span>
          ))}
        </div>
      </div>
    </form>
  );
};

export default CredentialsSignInForm;
