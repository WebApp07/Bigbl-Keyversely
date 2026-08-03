import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import GuestCheckoutButton from './guest-checkout-button';

export const metadata: Metadata = {
  title: 'Checkout Options',
  description: 'Choose how you want to proceed with your checkout.',
};

const CheckoutOptionsPage = async () => {
  const session = await auth();

  if (session) {
    redirect('/shipping-address');
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Checkout as Guest */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Guest Checkout</CardTitle>
            <CardDescription>
              Don&apos;t want to create an account? No problem. You can complete your purchase as a guest.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end">
            <GuestCheckoutButton />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              You&apos;ll have the option to create an account after your purchase.
            </p>
          </CardContent>
        </Card>
        {/* Sign In / Create Account */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Returning Customer?</CardTitle>
            <CardDescription>
              Sign in to your account for a faster checkout experience and to track your orders.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end">
            <Button asChild className="w-full">
              <Link href="/sign-in?callbackUrl=/shipping-address">Sign In</Link>
            </Button>
            <p className="mt-4 text-center text-sm text-muted-foreground">
              New customer? <Link href="/sign-up?callbackUrl=/shipping-address" className="text-primary hover:underline">Create an account</Link>
            </p>
          </CardContent>
        </Card>


      </div>
    </div>
  );
};

export default CheckoutOptionsPage;
