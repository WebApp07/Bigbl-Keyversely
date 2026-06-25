"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { forgotPassword } from "@/lib/actions/user.actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gray-900 hover:bg-gray-700 text-white"
    >
      {pending ? "Sending..." : "Send aminezouguig3Reset Link"}
    </Button>
  );
}

export default function ForgotPasswordForm() {
  const [state, action] = useActionState(forgotPassword, null);

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
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h2 className="text-lg font-semibold">Check your email</h2>
        <p className="text-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="flex flex-col gap-5">
      {/* Error message */}
      {state?.success === false && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-md">
          {state.message}
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <SubmitButton />
    </form>
  );
}
