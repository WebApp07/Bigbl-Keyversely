"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trackOrderSchema } from "@/lib/validators";
import { trackOrder } from "@/lib/actions/order.actions";
import { Order, TrackOrderFormValues } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TIMELINE_STEPS } from "@/lib/constants";
import { formatCurrency, formatDateTime } from "@/lib/utils";

function OrderTimeline({ order }: { order: Order }) {
  return (
    <ol className="relative border-l-2 border-border ml-3 space-y-6">
      {TIMELINE_STEPS.map((step) => {
        const completed = step.isComplete(order);
        const timestamp = step.getTimestamp(order);
        return (
          <li key={step.key} className="ml-6">
            <span
              className={`absolute -left-[11px] flex h-5 w-5 items-center justify-center rounded-full ring-4 ring-background ${
                completed ? "bg-green-500" : "bg-muted"
              }`}
            >
              {completed ? (
                <svg
                  className="h-3 w-3 text-white"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 011.414-1.414L8.5 12.086l6.793-6.793a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <span className="h-2 w-2 rounded-full bg-muted-foreground" />
              )}
            </span>
            <div className={completed ? "" : "opacity-40"}>
              <p className="text-sm font-semibold text-foreground">
                {step.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {step.description}
              </p>
              {completed && timestamp && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatDateTime(timestamp).dateTime}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function TrackOrderClient() {
  const [order, setOrder] = useState<Order | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<TrackOrderFormValues>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: { orderId: "", email: "" },
  });

  function onSubmit(values: TrackOrderFormValues) {
    setOrder(null);
    startTransition(async () => {
      const res = await trackOrder(values.orderId, values.email);
      if (res.success && res.data) {
        setOrder(res.data as Order);
      } else {
        form.setError("root", { message: res.message });
      }
    });
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 space-y-8">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Track Your Order</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Enter your order ID and the email address used at checkout.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 border rounded-lg p-6"
        >
          <FormField
            control={form.control}
            name="orderId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Order ID</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. clxyz123…" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.formState.errors.root && (
            <p className="text-sm text-destructive">
              {form.formState.errors.root.message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? "Looking up…" : "Track Order"}
          </Button>
        </form>
      </Form>

      {order && (
        <div className="space-y-6">
          {/* Order header */}
          <div className="border rounded-lg p-6 space-y-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Order ID
                </p>
                <p className="text-sm font-mono break-all">{order.id}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Placed {formatDateTime(order.createdAt).dateTime}
                </p>
              </div>
              <span
                className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                  order.isDelivered
                    ? "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20"
                    : order.isPaid
                      ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                      : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20"
                }`}
              >
                {order.isDelivered
                  ? "Delivered"
                  : order.isPaid
                    ? "Processing"
                    : "Awaiting Payment"}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Payment method: {order.paymentMethod}
            </p>
          </div>

          {/* Timeline */}
          <div className="border rounded-lg p-6">
            <h2 className="text-sm font-semibold mb-5">Order Progress</h2>
            <OrderTimeline order={order} />
          </div>

          {/* Items */}
          <div className="border rounded-lg p-6">
            <h2 className="text-sm font-semibold mb-3">
              Items ({order.orderitems.reduce((s, i) => s + i.qty, 0)})
            </h2>
            <div className="divide-y divide-border">
              {order.orderitems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 py-4"
                >
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded border bg-muted">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      className="text-sm font-medium hover:underline line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Qty: {item.qty}
                    </p>
                  </div>
                  <p className="text-sm font-semibold tabular-nums">
                    {formatCurrency(Number(item.price) * item.qty)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Price summary */}
          <div className="border rounded-lg p-6 space-y-2">
            <h2 className="text-sm font-semibold mb-3">Summary</h2>
            {[
              { label: "Items", value: formatCurrency(order.itemsPrice) },
              { label: "Tax", value: formatCurrency(order.taxPrice) },
              { label: "Shipping", value: formatCurrency(order.shippingPrice) },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between text-sm text-muted-foreground"
              >
                <span>{label}</span>
                <span className="tabular-nums">{value}</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between text-sm font-semibold">
              <span>Total</span>
              <span className="tabular-nums">
                {formatCurrency(order.totalPrice)}
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Need help?{" "}
            <Link href="/contact" className="underline">
              Contact support
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}
