"use client";

import React, { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { paymentMethodSchema } from "@/lib/validators";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { ArrowRight, Loader, ShieldCheck, Zap, Undo2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { updateUserPaymentMethod } from "@/lib/actions/user.actions";
import { toast } from "sonner";

/* -----------------------------
   Types (IMPORTANT FIX)
------------------------------*/
type PaymentMethod = (typeof PAYMENT_METHODS)[number];

type PaymentConfig = {
  name: string;
  description: string;
  badge?: string;
  logo: React.ReactNode;
};

/* -----------------------------
   Payment UI Config
------------------------------*/
const PAYMENT_CONFIG: Record<PaymentMethod, PaymentConfig> = {
  PayPal: {
    name: "PayPal",
    description: "Balance or linked card",
    badge: "Recommended",
    logo: (
      <span className="text-base font-semibold">
        <span style={{ color: "#003087" }}>Pay</span>
        <span style={{ color: "#009cde" }}>Pal</span>
      </span>
    ),
  },
  Stripe: {
    name: "Credit / Debit card",
    description: "Visa, Mastercard, Amex",
    logo: (
      <span className="text-base font-semibold" style={{ color: "#635BFF" }}>
        Stripe
      </span>
    ),
  },
};

/* -----------------------------
   Component
------------------------------*/
const PaymentMethodForm = ({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: PaymentMethod | null;
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof paymentMethodSchema>>({
    resolver: zodResolver(paymentMethodSchema),
    defaultValues: {
      method: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const onSubmit = (values: z.infer<typeof paymentMethodSchema>) => {
    startTransition(async () => {
      try {
        const res = await updateUserPaymentMethod(values);

        if (!res.success) {
          toast.error("Couldn't save payment method", {
            description: res.message || "Please try again.",
          });
          return;
        }

        router.push("/place-order");
      } catch (error) {
        console.error("Payment method error:", error);
        toast.error("Something went wrong. Please try again.");
      }
    });
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
        <p className="text-lg font-semibold text-muted-foreground">
          One last step
        </p>
      </div>

      {/* Form */}
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="method"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex flex-col gap-2.5" role="radiogroup">
                    {PAYMENT_METHODS.map((method) => {
                      const config = PAYMENT_CONFIG[method];
                      const selected = field.value === method;

                      return (
                        <div
                          key={method}
                          role="radio"
                          aria-checked={selected}
                          tabIndex={0}
                          onClick={() => field.onChange(method)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              field.onChange(method);
                            }
                          }}
                          className={cn(
                            "flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all select-none",
                            selected
                              ? "border-foreground ring-1 ring-foreground/10"
                              : "border-border hover:border-foreground/40",
                          )}
                        >
                          {/* Radio */}
                          <div
                            className={cn(
                              "w-[18px] h-[18px] rounded-full border-[1.5px] flex items-center justify-center shrink-0 transition-colors",
                              selected ? "border-foreground" : "border-border",
                            )}
                          >
                            <div
                              className={cn(
                                "w-[9px] h-[9px] rounded-full bg-foreground transition-all",
                                selected
                                  ? "opacity-100 scale-100"
                                  : "opacity-0 scale-50",
                              )}
                            />
                          </div>

                          {/* Logo */}
                          <div className="w-16 shrink-0">{config.logo}</div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{config.name}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {config.description}
                            </p>
                          </div>

                          {/* Badge */}
                          {config.badge && (
                            <span className="text-[11px] px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 shrink-0">
                              {config.badge}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ArrowRight className="w-4 h-4 mr-2" />
                Continue to Payment
              </>
            )}
          </Button>
        </form>
      </Form>

      {/* Trust signals */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <span>Secure 256-bit SSL encrypted checkout</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Zap className="h-4 w-4 text-yellow-500" />
          <span>Instant access after payment</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <Undo2 className="h-4 w-4 text-blue-500" />
          <span>30-day money-back guarantee</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodForm;
