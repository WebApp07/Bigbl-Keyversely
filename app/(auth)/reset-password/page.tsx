import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ResetPasswordForm from "./reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) {
  const { token } = await searchParams;

  // If no token in URL, show 404
  if (!token) notFound();

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold">Reset your password</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Enter your new password below
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <ResetPasswordForm token={token} />
        </div>

        {/* Back to sign in */}
        <div className="text-center text-sm">
          Remember your password?{" "}
          <Link href="/sign-in" className="font-medium underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
