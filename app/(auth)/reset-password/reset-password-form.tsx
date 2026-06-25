"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { resetPassword } from "@/lib/actions/user.actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gray-900 hover:bg-gray-700 text-white"
    >
      {pending ? "Resetting..." : "Reset Password"}
    </Button>
  );
}

export default function ResetPasswordForm({ token }: { token: string }) {
  const [state, action] = useActionState(resetPassword, null);

  // Show success state
  if (state?.success) {
    return (
      <div className="flex flex-col items-center gap-4 py-4 text-center">
        <div className="bg-green-50 text-green-700 rounded-full p-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold">Password reset successfully!</h2>
        <p className="text-sm text-muted-foreground">{state.message}</p>
        <Link
          href="/sign-in"
          className="w-full text-center bg-gray-900 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm font-medium"
        >
          Sign in now
        </Link>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      {/* Hidden token field */}
      <input type="hidden" name="token" value={token} />

      {/* Error message */}
      {state?.success === false && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-md">
          {state.message}
        </div>
      )}

      {/* New Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="password">New Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Enter new password"
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm new password"
          required
        />
      </div>

      <SubmitButton />
    </form>
  );
}
