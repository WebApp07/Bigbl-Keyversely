'use client';

import { useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { setGuestCheckout } from '@/lib/actions/user.actions';
import { Loader } from 'lucide-react';

export default function GuestCheckoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleGuestCheckout = () => {
    startTransition(async () => {
      await setGuestCheckout();
      router.push('/shipping-address');
    });
  };

  return (
    <Button 
      variant="outline" 
      className="w-full" 
      onClick={handleGuestCheckout}
      disabled={isPending}
    >
      {isPending ? (
        <Loader className="w-4 h-4 animate-spin mr-2" />
      ) : null}
      Checkout as Guest
    </Button>
  );
}
